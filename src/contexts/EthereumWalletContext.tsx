import React, { createContext, useContext, ReactNode, useState, useEffect } from 'react';
import { ethers } from 'ethers';

interface EthereumWalletContextType {
    connected: boolean;
    address: string;
    balance: number;
    usdcBalance: number; // Ajout de la balance USDC
    connectWallet: () => Promise<void>;
    disconnectWallet: () => void;
}

const EthereumWalletContext = createContext<EthereumWalletContextType | undefined>(undefined);

export const EthereumWalletProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [connected, setConnected] = useState(false);
    const [address, setAddress] = useState('');
    const [balance, setBalance] = useState(0);
    const [usdcBalance, setUsdcBalance] = useState(0); // État pour la balance USDC

    const connectWallet = async () => {
        if (!window.ethereum) {
            console.error('MetaMask is not installed');
            return;
        }
        const provider = new ethers.BrowserProvider(window.ethereum);
        await provider.send('eth_requestAccounts', []);
        const signer = await provider.getSigner();
        const address = await signer.getAddress();
        console.log("Account:", address);
        setAddress(address);
        setConnected(true);
        const balance = await provider.getBalance(address);
        console.log(balance)
        setBalance(Number(ethers.formatEther(balance)));

        // Récupérer la balance USDC
        const usdcContractAddress = '0x1c7d4b196cb0c7b01d743fbc6116a902379c7238'; // Adresse du contrat USDC sur Sepolia
        const usdcAbi = [
            "function balanceOf(address owner) view returns (uint256)"
        ];
        const usdcContract = new ethers.Contract(usdcContractAddress, usdcAbi, provider);
        const usdcBalance = await usdcContract.balanceOf(address);
        setUsdcBalance(Number(ethers.formatUnits(usdcBalance, 6))); // USDC a 6 décimales
    };

    const disconnectWallet = () => {
        setConnected(false);
        setAddress('');
        setBalance(0);
        setUsdcBalance(0); // Réinitialiser la balance USDC
    };

    useEffect(() => {
        if (connected && address) {
            // Fetch balance when connected and address changes
        }
    }, [connected, address]);

    return (
        <EthereumWalletContext.Provider value={{ connected, address, balance, usdcBalance, connectWallet, disconnectWallet }}>
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