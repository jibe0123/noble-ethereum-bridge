import React from 'react';
import { useKeplrWallet } from '../contexts/KeplrWalletContext';
import { useEthereumWallet } from '../contexts/EthereumWalletContext';

export const WalletConnect: React.FC = () => {
  const {
    connected: keplrConnected,
    connectWallet: connectKeplr,
    disconnectWallet: disconnectKeplr,
  } = useKeplrWallet();
  const { connected: ethConnected, connectWallet: connectEth, disconnectWallet: disconnectEth } = useEthereumWallet();

  return (
    <div className="mb-4 flex justify-between">
      <button
        onClick={keplrConnected ? disconnectKeplr : connectKeplr}
        className={`px-4 py-2 rounded ${keplrConnected ? 'bg-red-500' : 'bg-green-500'} text-white mr-2`}
      >
        {keplrConnected ? 'Disconnect Keplr Wallet' : 'Connect Keplr Wallet'}
      </button>
      <button
        onClick={ethConnected ? disconnectEth : connectEth}
        className={`px-4 py-2 rounded ${ethConnected ? 'bg-red-500' : 'bg-blue-500'} text-white`}
      >
        {ethConnected ? 'Disconnect Sepolia Wallet' : 'Connect Sepolia Wallet'}
      </button>
    </div>
  );
};
