import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import KeplrWallet from '../infrastructure/wallets/KeplrWallet';
import { useNotification } from './NotificationContext.tsx';

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
  const { showSuccess, showError } = useNotification();

  const [wallet] = useState(new KeplrWallet());

  const connectWallet = async () => {
    try {
      await wallet.connect();
      if (wallet.account) {
        setAddress(wallet.account.address);
        setConnected(true);
        const balance = await wallet.getBalance();
        setBalance(balance);
        console.log('Wallet connected:', wallet.account.address);
        showSuccess('Wallet connected successfully. 🎉');
      }
    } catch (error) {
      showError('Failed to connect to Keplr Wallet');
      console.error('Failed to connect to Keplr Wallet:', error);
    }
  };

  const disconnectWallet = () => {
    setConnected(false);
    setAddress('');
    setBalance(0);
    showSuccess('Wallet disconnected successfully.');
  };

  const burnUSDC = async (amount: number, recipient: string) => {
    try {
      if (!wallet.account || !wallet.offlineSigner) {
        console.error('Wallet is not connected properly');
        showError('Wallet not connected');
        throw new Error('Wallet not connected');
      }
      const result = await wallet.burnUSDC(amount, recipient);
      showSuccess('USDC burned successfully. 🔥');
      return result;
    } catch (error) {
      showError('Failed to burn USDC');
      console.error('Failed to burn USDC:', error);
      throw error;
    }
  };

  const mintUSDC = async (txHash: string) => {
    try {
      if (!wallet.account || !wallet.offlineSigner) {
        console.error('Wallet is not connected properly');
        showError('Wallet not connected');
        throw new Error('Wallet not connected');
      }
      await wallet.mintUSDC(txHash);
      showSuccess('USDC minted successfully. 💰');
    } catch (error) {
      showError('Failed to mint USDC');
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
    <KeplrWalletContext.Provider
      value={{ wallet, connected, address, balance, connectWallet, disconnectWallet, burnUSDC, mintUSDC }}
    >
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
