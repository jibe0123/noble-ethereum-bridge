import { Window as KeplrWindow, OfflineSigner } from "@keplr-wallet/types";
import Web3 from "web3";

interface EthereumProvider {
    isMetaMask?: boolean;
    request: (...args: any[]) => Promise<any>;
    on: (event: string, handler: (...args: any[]) => void) => void;
    removeListener: (event: string, handler: (...args: any[]) => void) => void;
}

declare global {
    interface Window extends KeplrWindow {
        ethereum: EthereumProvider;
        web3: Web3;
        getOfflineSigner: (chainId: string) => OfflineSigner;
        keplr?: Keplr & {
            ethereum: EthereumProvider;
            getChainInfoWithoutEndpoints: (
                chainId: string
            ) => Promise<ChainInfoWithoutEndpoints>;
        };
    }
}