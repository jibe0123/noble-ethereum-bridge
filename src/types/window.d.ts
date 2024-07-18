import { Window as KeplrWindow, OfflineSigner, Keplr } from '@keplr-wallet/types';
import Web3 from 'web3';

declare global {
  interface Window extends KeplrWindow {
    ethereum: EthereumProvider;
    web3: Web3;
    getOfflineSigner: (chainId: string) => OfflineSigner;
    keplr?: Keplr & {
      ethereum: EthereumProvider;
      getChainInfoWithoutEndpoints: (chainId: string) => Promise<ChainInfoWithoutEndpoints>;
    };
  }
}
