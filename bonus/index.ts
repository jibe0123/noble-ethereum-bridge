const INFURA_URL = "https://mainnet.infura.io/v3/f1b70935143f4b22b3c165d6bdfd3021";

type Address = `0x${string}`;

const pendingRequests = new Map<Address, (balance: bigint) => void>();
let timeout: Timer;

async function fetchBalancesBatch(addresses: Address[]): Promise<void> {
    const response = await fetch(INFURA_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            jsonrpc: "2.0",
            method: "eth_getBalance",
            params: addresses.map(address => [address, "latest"])[0],
            id: 1
        })
    });

    const data = await response.json();

    addresses.forEach((address, index) => {
        const balance = BigInt(data.result[index]);
        pendingRequests.get(address)?.(balance);
        pendingRequests.delete(address);
    });
}

async function fetchBalance(address: Address): Promise<bigint> {
    return new Promise((resolve) => {
        pendingRequests.set(address, resolve);

        if (!timeout) {
            timeout = setTimeout(() => {
                fetchBalancesBatch(Array.from(pendingRequests.keys()))
                    .then(() => {
                        timeout.unref();
                    });
            }, 0);  // Set timeout to 0 to group requests in the same microtask
        }
    });
}


const addresses = [
    "0xF7B31119c2682c88d88D455dBb9d5932c65Cf1bE",
    "0x3CBdeD43EFdAf0FC77b9C55F6fC9988fCC9b757d",
    "0x53b6936513e738f44FB50d2b9476730C0Ab3Bfc1",
    "0x72a5843cc08275C8171E582972Aa4fDa8C397B2A",
    "0x1da5821544e25c636c1417Ba96Ade4Cf6D2f9B5A"
] as const;

async function test() {
    const balances = await Promise.all(addresses.map(fetchBalance));
    console.log(balances);
}

test();