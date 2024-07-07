export default interface WalletRepository {
    connect(): Promise<void>;
    getBalance(): Promise<number>;
    mint(transactionId: string, attestation: string): Promise<void>;
}