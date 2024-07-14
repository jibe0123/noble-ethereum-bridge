import React, { createContext, useContext, ReactNode, useState } from 'react';
import Web3 from 'web3';

interface EthereumWalletContextType {
    connected: boolean;
    address: string;
    ethBalance: number;
    usdcBalance: number;
    connectWallet: () => Promise<void>;
    disconnectWallet: () => void;
    web3: Web3 | null;
}

const EthereumWalletContext = createContext<EthereumWalletContextType | undefined>(undefined);

export const EthereumWalletProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [connected, setConnected] = useState(false);
    const [address, setAddress] = useState('');
    const [ethBalance, setEthBalance] = useState(0);
    const [usdcBalance, setUsdcBalance] = useState(0);
    const [web3, setWeb3] = useState<Web3 | null>(null);

    const connectWallet = async () => {
        if (!window.ethereum) {
            console.error('MetaMask is not installed');
            return;
        }

        const web3Instance = new Web3(window.ethereum);
        setWeb3(web3Instance);

        try {
            await window.ethereum.request({ method: 'eth_requestAccounts' });
            const accounts = await web3Instance.eth.getAccounts();
            const account = accounts[0];
            setAddress(account);
            setConnected(true);

            const balanceInWei = await web3Instance.eth.getBalance(account);
            const balanceInEth = web3Instance.utils.fromWei(balanceInWei, 'ether');
            setEthBalance(parseFloat(balanceInEth));


            // Retrieve USDC balance
            const usdcContractAddress = '0x1c7d4b196cb0c7b01d743fbc6116a902379c7238'; // USDC contract address on Sepolia
            const usdcAbi = [
                {
                    "constant": true,
                    "inputs": [{ "name": "owner", "type": "address" }],
                    "name": "balanceOf",
                    "outputs": [{ "name": "balance", "type": "uint256" }],
                    "type": "function"
                }
            ];
            const usdcContract = new web3Instance.eth.Contract(usdcAbi, usdcContractAddress);
            const usdcBalanceInWei = await usdcContract.methods.balanceOf(account).call();

            if (usdcBalanceInWei) {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-expect-error
                setUsdcBalance(parseFloat(Web3.utils.fromWei(usdcBalanceInWei, 'mwei'))); // USDC has 6 decimals
            }
        } catch (error) {
            console.error('Failed to connect wallet:', error);
        }
    };

    const disconnectWallet = () => {
        setConnected(false);
        setAddress('');
        setEthBalance(0);
        setUsdcBalance(0);
        setWeb3(null);
    };

    return (
        <EthereumWalletContext.Provider value={{ connected, address, ethBalance, usdcBalance, connectWallet, disconnectWallet, web3 }}>
            {children}
        </EthereumWalletContext.Provider>
    );
};

export const useEthereumWallet = () => {
    const context = useContext(EthereumWalletContext);
    if (!context) {
        throw new Error('useEthereumWallet must be used within a EthereumWalletProvider');
    }
    return context;
};