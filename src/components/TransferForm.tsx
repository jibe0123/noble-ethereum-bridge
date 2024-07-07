import React, { useState } from 'react';
import { useKeplrWallet } from '../contexts/KeplrWalletContext';

const TransferForm: React.FC = () => {
    const { burnUSDC, mintUSDC } = useKeplrWallet();
    const [amount, setAmount] = useState<number>(0);
    const [recipient, setRecipient] = useState<string>('');
    const [txHash, setTxHash] = useState<string>('');

    const handleBurnSubmit = async () => {
        try {
            const txHash = await burnUSDC(amount, recipient);
            setTxHash(txHash);
        } catch (error) {
            console.error('Error burning USDC:', error);
        }
    };

    const handleMintSubmit = async () => {
        try {
            await mintUSDC(txHash);
        } catch (error) {
            console.error('Error minting USDC:', error);
        }
    };

    return (
        <div className='bg-gray-100 p-4 rounded shadow w-full'>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                <div>
                    <h2 className='text-xl mb-4'>Burn USDC</h2>
                    <input
                        type='number'
                        value={amount}
                        onChange={(e) => setAmount(Number(e.target.value))}
                        placeholder='Amount'
                        className='border rounded p-2 mb-2 w-full'
                    />
                    <input
                        type='text'
                        value={recipient}
                        onChange={(e) => setRecipient(e.target.value)}
                        placeholder='Recipient'
                        className='border rounded p-2 mb-2 w-full'
                    />
                    <button
                        className='bg-red-500 text-white px-4 py-2 rounded w-full'
                        onClick={handleBurnSubmit}
                    >
                        Burn
                    </button>
                </div>

                <div>
                    <h2 className='text-xl mb-4'>Mint USDC</h2>
                    <input
                        type='text'
                        value={txHash}
                        onChange={(e) => setTxHash(e.target.value)}
                        placeholder='Transaction Hash'
                        className='border rounded p-2 mb-2 w-full'
                    />
                    <button
                        className='bg-green-500 text-white px-4 py-2 rounded w-full'
                        onClick={handleMintSubmit}
                    >
                        Mint
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TransferForm;