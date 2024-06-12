import { useEffect, useState } from "react";
import { publicClient } from "~/utils/client";
import { getEVMBalance } from "~/domains/blockchain/balances";
import type BigNumber from "bignumber.js";
import type { IEVMAddress } from "~/domains/blockchain/evm";

export function useBalance(address: IEVMAddress) {
  const [balance, setBalance] = useState<BigNumber | null>(null);

  useEffect(() => {
    getEVMBalance(publicClient, address)
      .then(setBalance)
      .catch((err) => console.log(err));

    // const getWalletBalance = async () => {
    //   if (connection?.address) {
    //     try {
    //       const response = await publicClient.getBalance({
    //         address: toViemAddress(connection.address), // Use the validated address
    //       });

    //       const balanceString = response.toString();
    //       setBalance(balanceString);
    //     } catch (error) {
    //       console.error("Error fetching balance:", error);
    //       // Handle errors gracefully
    //     }
    //   }
    // };

    // if (connection) {
    //     void getWalletBalance();
    // }
  }, [address]);

  return balance;
}
