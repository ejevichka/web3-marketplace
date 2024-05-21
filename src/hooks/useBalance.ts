import { useEffect, useState } from "react";
import { useConnection } from "./useConnection";
import { publicClient } from "~/utils/client";
import { toViemAddress } from "~/domains/blockchain/utils";

export function useBalance() {
  const [balance, setBalance] = useState<string | null>(null);
  const connection = useConnection();

  useEffect(() => {
    const getWalletBalance = async () => {
      if (connection?.address) {
        try {
          const response = await publicClient.getBalance({
            address: toViemAddress(connection.address), // Use the validated address
          });

          const balanceString = response.toString();
          setBalance(balanceString);
        } catch (error) {
          console.error("Error fetching balance:", error);
          // Handle errors gracefully
        }
      }
    };

    if (connection) {
        void getWalletBalance();
    }

  }, [connection]);

  return balance;
}
