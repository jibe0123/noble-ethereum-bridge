export default interface WalletRepository {
  connect(): Promise<void>;

  getBalance(): Promise<number>;

  mintUSDC(txHash: string): Promise<void>;
}
