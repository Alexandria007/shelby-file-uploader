import * as dotenv from "dotenv";
import { Account, Ed25519Account, Ed25519PrivateKey, Network } from "@aptos-labs/ts-sdk";
import { ShelbyNodeClient } from "@shelby-protocol/sdk/node";

dotenv.config();

export function getNetwork(): Network {
  const net = process.env.SHELBY_NETWORK || "shelbynet";
  if (net === "testnet") return Network.TESTNET;
  return Network.CUSTOM; // shelbynet
}

export function getAccount(): Ed25519Account {
  const privateKey = process.env.APTOS_PRIVATE_KEY;
  if (!privateKey) {
    throw new Error("❌ APTOS_PRIVATE_KEY not found in .env — run: cp .env.example .env and fill it in");
  }
  return new Ed25519Account({
    privateKey: new Ed25519PrivateKey(privateKey),
  });
}

export function getShelbyClient(): ShelbyNodeClient {
  const network = getNetwork();
  const apiKey = process.env.APTOS_API_KEY;

  return new ShelbyNodeClient({
    network,
    ...(apiKey && { apiKey }),
  });
}
