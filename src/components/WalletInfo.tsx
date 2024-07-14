import React from 'react';
import { useKeplrWallet } from '../contexts/KeplrWalletContext';
import { useEthereumWallet } from '../contexts/EthereumWalletContext';

const WalletInfo: React.FC = () => {
    const { connected: keplrConnected, address: keplrAddress, balance: keplrBalance, connectWallet: connectKeplr, disconnectWallet: disconnectKeplr } = useKeplrWallet();
    const { connected: ethConnected, address: ethAddress, ethBalance: ethBalance, usdcBalance: ethUsdcBalance, connectWallet: connectEth, disconnectWallet: disconnectEth } = useEthereumWallet();

    return (
        <div className='bg-gray-100 p-4 rounded shadow w-full'>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                <div className='p-2'>
                    <h2 className='text-xl mb-2'>Keplr Wallet Info</h2>
                    {keplrConnected ? (
                        <>
                            <p className='truncate'><strong>Address:<br/></strong> {keplrAddress}</p>
                            <p><strong>Balance:</strong> {keplrBalance} USDC</p>
                            <button className='bg-red-500 text-white px-4 py-2 rounded mt-2 w-full' onClick={disconnectKeplr}>Disconnect</button>
                        </>
                    ) : (
                        <button className='bg-green-500 text-white px-4 py-2 rounded mt-2 w-full' onClick={connectKeplr}>Connect Wallet</button>
                    )}
                </div>

                <div className='p-2'>
                    <h2 className='text-xl mb-2'>Ethereum Wallet Info</h2>
                    {ethConnected ? (
                        <>
                            <p className='truncate'><strong>Address:<br/></strong> {ethAddress}</p>
                            <p><strong>ETH Balance:</strong> {ethBalance} ETH</p>
                            <p><strong>USDC Balance:</strong> {ethUsdcBalance} USDC</p>
                            <button className='bg-red-500 text-white px-4 py-2 rounded mt-2 w-full' onClick={disconnectEth}>Disconnect</button>
                        </>
                    ) : (
                        <button className='bg-green-500 text-white px-4 py-2 rounded mt-2 w-full' onClick={connectEth}>Connect Wallet</button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default WalletInfo;