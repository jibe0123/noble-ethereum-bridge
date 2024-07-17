import axios from 'axios';
import {Attestation} from "../domain/entities/Attestation.ts";

const IRIS_MESSAGES_API_URL = 'https://iris-api-sandbox.circle.com/messages/4/';

interface MessageResponse {
    attestation: Attestation;
    message: string;
    eventNonce: string;
}

interface MessagesResponse {
    messages: MessageResponse[];
}

export const getMessages = async (txHash: string): Promise<MessagesResponse> => {
    let attempts = 0;
    const maxAttempts = 30;
    const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

    while (attempts < maxAttempts) {
        try {
            const response = await axios.get(`${IRIS_MESSAGES_API_URL}${txHash}`);
            if (response.status === 200) {
                return response.data;
            } else {
                console.error('Error fetching messages:', response.statusText);
            }
        } catch (error) {
            console.error('Error fetching messages:', error);
        }
        attempts += 1;
        await delay(2000); // wait for 2 seconds before retrying
    }

    throw new Error('Failed to fetch messages after 30 attempts');
};