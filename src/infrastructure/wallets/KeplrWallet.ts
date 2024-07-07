import WalletRepository from "../../domain/repositories/WalletRepository";
import {AccountData, ChainInfo} from "@keplr-wallet/types";
import {GeneratedType, OfflineSigner, Registry} from "@cosmjs/proto-signing";
import {GasPrice, SigningStargateClient} from "@cosmjs/stargate";
import {MsgDepositForBurn} from "../../generated/tx";

export const cctpTypes: ReadonlyArray<[string, GeneratedType]> = [
    ["/circle.cctp.v1.MsgDepositForBurn", MsgDepositForBurn],
];

function createDefaultRegistry(): Registry {
    return new Registry(cctpTypes);
}

function hexToUint8Array(hexString: string): Uint8Array {
    if (hexString.length % 2 !== 0) {
        throw new Error("Hex string must have an even length");
    }
    const arrayBuffer = new Uint8Array(hexString.length / 2);
    for (let i = 0; i < hexString.length; i += 2) {
        const byteValue = parseInt(hexString.substr(i, 2), 16);
        arrayBuffer[i / 2] = byteValue;
    }
    return arrayBuffer;
}

const chainInfo: ChainInfo = {
    chainId: "grand-1",
    chainName: "Noble Testnet",
    rpc: "https://rpc.testnet.noble.strange.love",
    rest: "https://api.testnet.noble.strange.love",
    bip44: { coinType: 118 },
    bech32Config: {
        bech32PrefixAccAddr: "noble",
        bech32PrefixAccPub: "noblepub",
        bech32PrefixValAddr: "noblevaloper",
        bech32PrefixValPub: "noblevaloperpub",
        bech32PrefixConsAddr: "noblevalcons",
        bech32PrefixConsPub: "noblevalconspub",
    },
    currencies: [
        {
            coinDenom: "USDC",
            coinMinimalDenom: "uusdc",
            coinDecimals: 6,
            coinGeckoId: "usd-coin",
        },
    ],
    feeCurrencies: [
        {
            coinDenom: "USDC",
            coinMinimalDenom: "uusdc",
            coinDecimals: 6,
            coinGeckoId: "usd-coin",
        },
    ],
    stakeCurrency: {
        coinDenom: "USDC",
        coinMinimalDenom: "uusdc",
        coinDecimals: 6,
        coinGeckoId: "usd-coin",
    },
    features: ["stargate", "ibc-transfer"],
};

class KeplrWallet implements WalletRepository {
    private chainId: string = chainInfo.chainId;
    private rpcUrl: string = chainInfo.rpc;
    public offlineSigner: OfflineSigner | null = null;
    public account: AccountData | null = null;
    private client: SigningStargateClient | null = null;

    async connect(): Promise<void> {
        const { keplr } = window;
        if (!keplr) {
            alert("You need to install Keplr");
            return;
        }
        await keplr.experimentalSuggestChain(chainInfo);
        await keplr.enable(this.chainId);
        this.offlineSigner = window.getOfflineSigner(this.chainId);
        if (!this.offlineSigner) {
            throw new Error("Failed to get offline signer");
        }
        const accounts = await this.offlineSigner.getAccounts();
        this.account = accounts[0];
        console.log("Connected account:", this.account); // Log the account

        // Initialize the client once
        this.client = await SigningStargateClient.connectWithSigner(this.rpcUrl, this.offlineSigner, {
            registry: createDefaultRegistry(),
            gasPrice: GasPrice.fromString("0.025uusdc"),
        });
    }

    async getBalance(): Promise<number> {
        if (!this.account || !this.client) throw new Error("Not connected");
        const balances = await this.client.getAllBalances(this.account.address);
        const balance = balances.find((coin) => coin.denom === "uusdc");
        return balance ? parseFloat(balance.amount) / 1000000 : 0; // Convert from micro USDC to USDC
    }

    async burnUSDC(amount: number, recipient: string): Promise<string> {
        if (!this.account || !this.client) throw new Error("Not connected");

        console.log("Account for burn:", this.account.address); // Debug log

        // Left pad the mint recipient address with 0's to 32 bytes
        const cleanedRecipient = recipient.replace(/^0x/, '');
        const zeroesNeeded = 64 - cleanedRecipient.length;
        const mintRecipient = '0'.repeat(zeroesNeeded) + cleanedRecipient;
        const mintRecipientBytes = hexToUint8Array(mintRecipient);

        const msg = {
            typeUrl: "/circle.cctp.v1.MsgDepositForBurn",
            value: {
                from: this.account.address,
                amount: (amount * 1000000).toString(), // amount in uusdc
                destinationDomain: 0, // Utilisez 4 pour Noble, 0 pour Ethereum
                mintRecipient: mintRecipientBytes,
                burnToken: "uusdc",
            },
        };

        const fee = {
            amount: [
                {
                    denom: "uusdc",
                    amount: "0",
                },
            ],
            gas: "200000",
        };
        const memo = "";
        const result = await this.client.signAndBroadcast(this.account.address, [msg], fee, memo);

        console.log(`Burned on Noble: https://mintscan.io/noble-testnet/tx/${result.transactionHash}`);
        return result.transactionHash;
    }

    async mint(transactionId: string, attestation: string): Promise<void> {
        if (!this.account || !this.client) throw new Error("Not connected");

        console.log(transactionId)
        console.log(attestation)

        const messageBytes = hexToUint8Array(transactionId.replace(/^0x/, ''));
        const attestationBytes = hexToUint8Array(attestation.replace(/^0x/, ''));

        const msg = {
            typeUrl: "/circle.cctp.v1.MsgReceiveMessage",
            value: {
                from: this.account.address,
                message: messageBytes,
                attestation: attestationBytes,
            }
        };

        const fee = {
            amount: [
                {
                    denom: "uusdc",
                    amount: "0",
                },
            ],
            gas: "200000",
        };
        const memo = "";
        const result = await this.client.signAndBroadcast(this.account.address, [msg], fee, memo);

        console.log(`Minted on Noble: https://mintscan.io/noble-testnet/tx/${result.transactionHash}`);
    }
}

export default KeplrWallet;