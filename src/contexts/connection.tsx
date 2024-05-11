import React, {
  type PropsWithChildren,
  useEffect,
  useState,
  useMemo,
  useContext,
} from "react";
import detectEthereumProvider from "@metamask/detect-provider";
import type { EIP1193Provider } from "viem";
import {
  toWalletAddresss,
  type WalletAddress,
} from "~/domains/blockchain/types";

export type Wallet = {
  accounts: WalletAddress[];
};

export type Connection =
  | {
      type: "no-provider";
    }
  | {
      type: "disconnected";
      connect: () => Promise<void>;
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
      connect: () =>
        provider.request({ method: "eth_requestAccounts" }).then((accounts) => {
          setWallet({ accounts: accounts.map(toWalletAddresss) });
        }),
    };
  }, [provider, wallet]);

  return <connectionContext.Provider value={connection} {...props} />;
}

export function useConnectionContext() {
  return useContext(connectionContext);
}

function toEIP1193Provider(provider: unknown) {
  // @todo add custom logic for specific wallets
  return provider as EIP1193Provider;
}
