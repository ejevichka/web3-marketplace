import { useState, useEffect, useMemo } from "react";
import type { EIP1193Provider } from "viem";
import detectEthereumProvider from "@metamask/detect-provider";
import {
  type WalletAddress,
} from "~/domains/blockchain/types";
import { connect }  from "~/utils/connect";

type Provider = {
  provider: EIP1193Provider;
  connect: Promise<void>;
};

type Wallet = {
  accounts: WalletAddress[];
  balance: bigint;
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


  useEffect(() => {
    detectEthereumProvider({ silent: true })
      .then(async (x) => {
        const eip1193 = toEIP1193Provider(x);
        setProvider({
          provider: eip1193,
          connect: connect(eip1193, setWallet, setHasError)
        });
      })
      .catch((err) => setHasError(err.message));
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
