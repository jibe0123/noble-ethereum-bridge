const INFURA_URL = "https://mainnet.infura.io/v3/f1b70935143f4b22b3c165d6bdfd3021";
const headers = {"Content-Type": "application/json"};

export async function fetchBalance(address: `0x${string}`): Promise<bigint> {

    const queue: string[] = [];
    let batchInProgress = false;
    const resolveMap = new Map<string, (value: bigint) => void>();

    const sendBatch = async () => {
        if (batchInProgress || queue.length === 0) return;
        batchInProgress = true;
        const batch = queue.splice(0, 20);
        const body = JSON.stringify(batch.map((address, index) => ({
            jsonrpc: "2.0",
            method: "eth_getBalance",
            params: [address, "latest"],
            id: index + 1,
        })));

        try {
            const response = await fetch(INFURA_URL, {method: "POST", headers, body});
            if (!response.ok) {
                throw new Error(`Network response was not ok: ${response.statusText}`);
            }
            const data: { result: string; id: number }[] = await response.json();
            data.forEach((item) => {
                const address = batch[item.id - 1];
                const resolve = resolveMap.get(address);
                if (resolve) {
                    resolve(BigInt(item.result));
                }
            });
        } catch (error) {
            batch.forEach((address) => {
                const resolve = resolveMap.get(address);
                if (resolve) {
                    resolve(BigInt(0)); // Resolve with 0 in case of error
                }
            });
            console.error("Failed to fetch balances:", error);
        } finally {
            batchInProgress = false;
            if (queue.length > 0) {
                queueMicrotask(sendBatch);
            }
        }
    };

    return new Promise((resolve) => {
        queue.push(address);
        resolveMap.set(address, resolve);

        if (!batchInProgress) {
            queueMicrotask(sendBatch);
        }
    });
}

const addresses = [
    "0xF7B31119c2682c88d88D455dBb9d5932c65Cf1bE",
    "0x3CBdeD43EFdAf0FC77b9C55F6fC9988fCC9b757d",
    "0x53b6936513e738f44FB50d2b9476730C0Ab3Bfc1",
    "0x72a5843cc08275C8171E582972Aa4fDa8C397B2A",
    "0x1da5821544e25c636c1417Ba96Ade4Cf6D2f9B5A",
] as const;

(async () => {
    const balances = await Promise.all(addresses.map(fetchBalance));
    const balances_2 = await Promise.all(addresses.map(fetchBalance));
    const balances_3 = await Promise.all([...addresses.map(fetchBalance), ...addresses.map(fetchBalance)]);

    console.log(balances, balances_2, balances_3);
})();