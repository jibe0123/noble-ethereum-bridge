import {AbiCoder, ethers} from 'ethers';

export const getMessageHash = async (txHash: string, provider: ethers.BrowserProvider): Promise<string> => {
    console.log(txHash)
    console.log(provider)

    const transactions = await provider.getTransaction(txHash);
    console.log(transactions)
    const txReceipt = await provider.getTransactionReceipt(txHash);
    if (!txReceipt) throw new Error("Transaction receipt not found");

    const eventTopic = ethers.id("MessageSent(bytes)");
    const log = txReceipt.logs.find(l => l.topics[0] === eventTopic);

    if (!log) throw new Error("Event log not found");

    const messageBytes = AbiCoder.defaultAbiCoder().decode(['bytes'], log.data)[0];
    return ethers.keccak256(messageBytes);
};