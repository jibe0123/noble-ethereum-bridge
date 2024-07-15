import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import WalletInfo from './components/WalletInfo';
import TransferForm from './components/TransferForm';
import {KeplrWalletProvider} from './contexts/KeplrWalletContext';
import {EthereumWalletProvider} from './contexts/EthereumWalletContext';
import ErrorBoundaryWithNotifications from "./components/ErrorBoundary.tsx";
import Notifications from "./components/Notifications.tsx";
import {NotificationProvider} from "./contexts/NotificationContext.tsx";

const App: React.FC = () => {
    return (
        <NotificationProvider>
            <ErrorBoundaryWithNotifications>
                <KeplrWalletProvider>
                    <EthereumWalletProvider>
                        <div className='min-h-screen flex flex-col'>
                            <Header/>
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
                            <Notifications/>
                            <Footer/>
                        </div>
                    </EthereumWalletProvider>
                </KeplrWalletProvider>
            </ErrorBoundaryWithNotifications>
        </NotificationProvider>
    );
};

export default App;