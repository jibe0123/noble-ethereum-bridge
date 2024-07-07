import { ethers } from 'ethers';

export const contractAddress = '0x7865fAfC2db2093669d92c0F33AeEF291086BEFD'; // Address of the MessageTransmitter contract on Sepolia

export const contractABI = [
    "event MessageSent(bytes message)",
    "function receiveMessage(bytes message, bytes attestation) external"
];

export const getContract = (provider: ethers.Provider | ethers.Signer) => {
    return new ethers.Contract(contractAddress, contractABI, provider);
};