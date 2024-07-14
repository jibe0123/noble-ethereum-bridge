import React, {ChangeEvent, useState, FocusEvent} from 'react';
import {useKeplrWallet} from '../contexts/KeplrWalletContext';

const TransferForm: React.FC = () => {
    const {burnUSDC, mintUSDC} = useKeplrWallet();
    const [amount, setAmount] = useState<string>("");
    const [recipient, setRecipient] = useState<string>('');
    const [txHash, setTxHash] = useState<string>('');

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;

        if (value === '' || /^\d*\.?\d{0,2}$/.test(value)) {
            setAmount(value);
        }
    };

    const handleBlur = (event: FocusEvent<HTMLInputElement>) => {
        console.log(event)
        const value = parseFloat(amount);
        if (!isNaN(value)) {
            setAmount(value.toFixed(2));
        } else {
            setAmount('');
        }
    };

    const handleBurnSubmit = async () => {
        try {
            const txHash = await burnUSDC(parseFloat(amount), recipient);
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
                        type='text'
                        value={amount}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="Ex : 100.00"
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