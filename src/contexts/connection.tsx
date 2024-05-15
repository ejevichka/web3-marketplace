import React, {
  type PropsWithChildren,
  useEffect,
  useState,
  useMemo,
  useContext,
  useCallback
} from "react";
import detectEthereumProvider from "@metamask/detect-provider";
import {type EIP1193Provider, formatEther } from "viem";
import { publicClient } from '~/utils/client'
import {
  toWalletAddresss,
  type WalletAddress,
} from "~/domains/blockchain/types";
import { connect }  from "~/utils/connect";

export type Wallet = {
  accounts: WalletAddress[];
  balance: bigint;
};

export type Connection =
  | {
      type: "no-provider";
    }
  | {
      type: "disconnected";
      connect: Promise<void>;
    }
  | {
      type: "connected";
      wallet: Wallet;
      provider: EIP1193Provider;
    };

export const connectionContext = React.createContext<Connection>({
  type: "no-provider",
});

// 1. hit server request: no provider (server-side)
// 2. hit client: "no-provider" (client-side)
// 3. hit useEffect: "disconnected" | "connected" (client-side)
// 4. render app with disconnected or connected state

type ConnectionProviderProps = PropsWithChildren;

export function ConnectionProvider(props: ConnectionProviderProps) {
  const [provider, setProvider] = useState<EIP1193Provider | null>(null);
  const [wallet, setWallet] = useState<Wallet | null>(null);
  const [hasError, setHasError] = useState<unknown>(null);

  useEffect(() => {
    detectEthereumProvider({ silent: true })
      .then((x) => setProvider(toEIP1193Provider(x)))
      .catch((err) => setHasError(err));
  }, []);

  const connectWallet = useCallback(async () => {
    if (!provider) return;
    try {
      const accounts = await provider.request({ method: "eth_requestAccounts" });
      const balance = await publicClient.getBalance({ address: toWalletAddresss(accounts[0]) });
      console.log('balance', balance)
      setWallet({ balance, accounts: accounts.map(toWalletAddresss)});
    } catch (error) {
      console.error("Error fetching balance:", error);
    }
  }, [provider]);

  const connection: Connection = useMemo(() => {
    if (!provider) {
      return {
        type: "no-provider",
      };
    }
    if (wallet) {
      return {
        type: "connected",
        wallet,
        provider,
      };
    }
    return {
      type: "disconnected",
      connect: connectWallet,
    };
  }, [provider, wallet, connectWallet]);

  return <connectionContext.Provider value={connection} {...props} />;
}

export function useConnectionContext() {
  return useContext(connectionContext);
}

function toEIP1193Provider(provider: unknown) {
  // @todo add custom logic for specific wallets
  return provider as EIP1193Provider;
}
