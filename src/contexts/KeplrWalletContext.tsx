import React, {createContext, ReactNode, useContext, useEffect, useState} from 'react';
import KeplrWallet from '../infrastructure/wallets/KeplrWallet';
import {ethers} from "ethers";

interface KeplrWalletContextType {
    wallet: KeplrWallet;
    connected: boolean;
    address: string;
    balance: number;
    connectWallet: () => Promise<void>;
    disconnectWallet: () => void;
    burnUSDC: (amount: number, recipient: string) => Promise<string>;
    mintUSDC: (txHash: string) => Promise<void>;
}

const KeplrWalletContext = createContext<KeplrWalletContextType | undefined>(undefined);

export const KeplrWalletProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [connected, setConnected] = useState(false);
    const [address, setAddress] = useState('');
    const [balance, setBalance] = useState(0);

    const [wallet] = useState(new KeplrWallet());

    const connectWallet = async () => {
        try {
            await wallet.connect();
            if (wallet.account) {
                setAddress(wallet.account.address);
                setConnected(true);
                const balance = await wallet.getBalance();
                setBalance(balance);
                console.log("Wallet connected:", wallet.account.address); // Log the connected address
            }
        } catch (error) {
            console.error('Failed to connect to Keplr Wallet:', error);
        }
    };

    const disconnectWallet = () => {
        setConnected(false);
        setAddress('');
        setBalance(0);
    };

    const burnUSDC = async (amount: number, recipient: string) => {
        try {
            if (!wallet.account || !wallet.offlineSigner) {
                console.error("Wallet is not connected properly");
                throw new Error("Wallet not connected");
            }
            return await wallet.burnUSDC(amount, recipient);
        } catch (error) {
            console.error('Failed to burn USDC:', error);
            throw error;
        }
    };

    const mintUSDC = async (txHash: string) => {
        try {
            console.log('txHash: ', txHash);
            const provider = new ethers.BrowserProvider(window.ethereum);
            await provider.send('eth_requestAccounts', []);
            const signer = await provider.getSigner();
            const contractAddress = '0x7865fAfC2db2093669d92c0F33AeEF291086BEFD'; // Address of the MessageTransmitter contract on Sepolia

            const abi = [
                "function receiveMessage(bytes message, bytes attestation) external"
            ];

            const contract = new ethers.Contract(contractAddress, abi, signer);
            await contract.on("MessageSent", async (message) => {
                console.log("Received message:", message);
            })
            const tx = await contract.receiveMessage("messageBytes", "attestation");

            await tx.wait();
            console.log('Minted USDC on Sepolia');
        } catch (error) {
            console.error('Failed to mint USDC:', error);
            throw error;
        }
    };


    useEffect(() => {
        if (connected && address) {
            wallet.getBalance().then(setBalance);
        }
    }, [connected, address, wallet]);

    return (
        <KeplrWalletContext.Provider value={{ wallet, connected, address, balance, connectWallet, disconnectWallet, burnUSDC, mintUSDC }}>
            {children}
        </KeplrWalletContext.Provider>
    );
};

export const useKeplrWallet = () => {
    const context = useContext(KeplrWalletContext);
    if (context === undefined) {
        throw new Error('useKeplrWallet must be used within a KeplrWalletProvider');
    }
    return context;
};