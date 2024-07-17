import { describe, it, expect, mock } from "bun:test";
import { fetchBalance } from "./index";

// Define types for JSON-RPC request and response
interface JsonRpcRequest {
    jsonrpc: string;
    method: string;
    params: [string, string];
    id: number;
}

interface JsonRpcResponse {
    jsonrpc: string;
    id: number;
    result: string;
}

globalThis.fetch = mock(async (input: RequestInfo | URL, init?: RequestInit) => {
    const body = JSON.parse(init!.body as string) as JsonRpcRequest[];
    const responses: JsonRpcResponse[] = body.map((req) => {
        if (req.params[0] === "0x3CBdeD43EFdAf0FC77b9C55F6fC9988fCC9b757d") {
            return {
                jsonrpc: "2.0",
                id: req.id,
                result: "0x0", // Simulate error case
            };
        }
        return {
            jsonrpc: "2.0",
            id: req.id,
            result: "0x5f5e100", // Example balance in wei
        };
    });
    return {
        ok: true,
        json: async () => responses,
    } as Response;
});

describe("fetchBalance", () => {
    it("should fetch balance for a single address", async () => {
        const address = "0xF7B31119c2682c88d88D455dBb9d5932c65Cf1bE";
        const balance = await fetchBalance(address);
        expect(balance).toBe(BigInt("0x5f5e100"));
    });

    it("should batch multiple address requests", async () => {
        const addresses = [
            "0xF7B31119c2682c88d88D455dBb9d5932c65Cf1bE",
            "0x3CBdeD43EFdAf0FC77b9C55F6fC9988fCC9b757d",
            "0x53b6936513e738f44FB50d2b9476730C0Ab3Bfc1",
        ] as const;
        const balances = await Promise.all(addresses.map(fetchBalance));
        expect(balances[0]).toBe(BigInt("0x5f5e100"));
        expect(balances[1]).toBe(BigInt(0)); // Simulated error case
        expect(balances[2]).toBe(BigInt("0x5f5e100"));
    });

    it("should handle errors and resolve with 0", async () => {
        const addresses = [
            "0xF7B31119c2682c88d88D455dBb9d5932c65Cf1bE",
            "0x3CBdeD43EFdAf0FC77b9C55F6fC9988fCC9b757d",
        ] as const;
        const balances = await Promise.all(addresses.map(fetchBalance));
        console.log(balances);
        expect(balances[0]).toBe(BigInt("0x5f5e100"));
        expect(balances[1]).toBe(BigInt(0)); // Simulated error case
    });
});