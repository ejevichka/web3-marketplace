import type { EIP1193Provider } from "viem";
import type { Wallet } from "~/components/wallet/types";
import { publicClient } from '~/utils/client';
import { toWalletAddresss } from "~/domains/blockchain/types";

export type ConnectFunction = (
  provider: EIP1193Provider | null,
  setWallet: (wallet: Wallet) => void,
  setHasError: (message: string) => void
) => Promise<void>;

export const connect: ConnectFunction = async (provider, setWallet, setHasError) => {
  if (!provider) return; // This line might still cause a type error, see explanation below
  try {
    const accounts = await provider.request({ method: "eth_requestAccounts" });
    if (accounts[0]) {
      const balance = await publicClient.getBalance({ address: toWalletAddresss(accounts[0]) });
      setWallet({ balance, accounts: accounts.map(toWalletAddresss) });
    }
  } catch (error) {
    let message
    if (error instanceof Error) message = error.message
    else message = String(error)
    setHasError(message);
  }
};
