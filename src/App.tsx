import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import WalletInfo from './components/WalletInfo';
import TransferForm from './components/TransferForm';
import { KeplrWalletProvider } from './contexts/KeplrWalletContext';
import { EthereumWalletProvider } from './contexts/EthereumWalletContext';

const App: React.FC = () => {
    return (
        <KeplrWalletProvider>
            <EthereumWalletProvider>
                <div className='min-h-screen flex flex-col'>
                    <Header />
                    <main className='flex-grow p-4'>
                        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                            <div className='w-full'>
                                <WalletInfo/>
                            </div>
                            <div className='w-full'>
                                <TransferForm/>
                            </div>
                        </div>
                    </main>
                    <Footer/>
                </div>
            </EthereumWalletProvider>
        </KeplrWalletProvider>
    );
};

export default App;