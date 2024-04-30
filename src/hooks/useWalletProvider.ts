import { useState, useEffect } from "react";
import detectEthereumProvider from "@metamask/detect-provider";

type Account = {
  accounts: string[];
}
interface WalletProvider {
  hasProvider: boolean | null;
  handleConnect: () => Promise<void>;
  wallet: Account;
}

export function useWalletProvider(): WalletProvider {
  const [hasProvider, setHasProvider] = useState<boolean | null>(null);
    const initialState = { accounts: [] };              /* New */
    const [wallet, setWallet] = useState(initialState); /* New */

    useEffect(() => {
        const getProvider = async () => {
            const provider = await detectEthereumProvider({ silent: true });
            console.log(provider);
            setHasProvider(Boolean(provider));
        };

        getProvider();
    }, []);
    const updateWallet = async (accounts: any) => {     
    setWallet({ accounts });                      
  };                                              

  const handleConnect = async () => {             
    let accounts = await window.ethereum.request({
      method: "eth_requestAccounts",              
    });                                           
    updateWallet(accounts);                       
  }; 
  

  return { hasProvider, handleConnect, wallet };
}
