import { useState, useEffect, useMemo } from "react";
import type { EIP1193Provider } from "viem";
import detectEthereumProvider from "@metamask/detect-provider";
import {
  toWalletAddresss,
  type WalletAddress,
} from "~/domains/blockchain/types";

type Provider = {
  provider: EIP1193Provider;
  connect: () => Promise<void>;
};

type Wallet = {
  accounts: WalletAddress[];
};

type Connection =
  | {
      type: "disconnected";
      provider: Provider | null;
    }
  | {
      type: "connected";
      wallet: Wallet;
      provider: Provider;
    };

export function useWalletProvider(): Connection {
  const [provider, setProvider] = useState<Provider | null>(null);
  const [wallet, setWallet] = useState<Wallet | null>(null);
  const [hasError, setHasError] = useState<unknown>(null);
  // const initialState = { accounts: [] };              /* New */
  // const [wallet, setWallet] = useState(initialState); /* New */

  useEffect(() => {
    detectEthereumProvider({ silent: true })
      .then(async (x) => {
        const eip1193 = toEIP1193Provider(x);
        setProvider({
          provider: eip1193,
          connect: () =>
            eip1193
              .request({ method: "eth_requestAccounts" })
              .then((accounts) => {
                setWallet({ accounts: accounts.map(toWalletAddresss) });
              }),
        });
      })
      .catch((err) => setHasError(err));
  }, []);

  return useMemo(() => {
    if (wallet && provider) {
      return {
        type: "connected",
        wallet,
        provider,
      };
    }
    return {
      type: "disconnected",
      provider,
    };
  }, [provider, wallet]);
}

function toEIP1193Provider(provider: unknown) {
  // @todo add custom logic for specific wallets
  return provider as EIP1193Provider;
}
