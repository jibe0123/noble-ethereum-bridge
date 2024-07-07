import {AbiCoder, ethers} from 'ethers';
import axios from 'axios';

const IRIS_ATTESTATION_API_URL = 'https://iris-api-sandbox.circle.com/v1';

export const getAttestation = async (messageHash: string) => {
    try {
        const response = await axios.get(`${IRIS_ATTESTATION_API_URL}/attestations/${messageHash}`);
        if (response.data.status === 'complete') {
            return response.data.attestation;
        } else {
            throw new Error('Attestation is not complete');
        }
    } catch (error) {
        console.error('Error fetching attestation:', error);
        throw error;
    }
};

export const fetchAttestation = async (txHash: string, adress: string) => {
    try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const eventSignature = ethers.id('MessageSent(bytes)');
        console.log("eventSignature", eventSignature);
        const formattedTxHash = `0x${txHash}`;

        const logs = await provider.getLogs({
            address: adress
        });
        console.log(logs);

        await provider.send('eth_requestAccounts', []);

        const receipt = await provider.getTransactionReceipt(formattedTxHash);
        if (!receipt) {
            throw new Error('Transaction receipt not found');
        }

        const log = receipt.logs.find(log => log.topics[0] === eventSignature);
        if (!log) {
            throw new Error('MessageSent event not found');
        }

        const messageBytes = AbiCoder.defaultAbiCoder().decode(['bytes'], log.data)[0];
        const messageHash = ethers.keccak256(messageBytes);

        return { messageHash, messageBytes };
    } catch (error) {
        console.error('Failed to fetch transaction receipt:', error);
        throw error;
    }
};