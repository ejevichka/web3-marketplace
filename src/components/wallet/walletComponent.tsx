import { useConnection } from "~/hooks/useConnection";
import { useBalance } from "~/hooks/useBalance";

export default function WalletComponent() {
  const connection = useConnection();
  const balance = useBalance();

  if (connection) {
    return (
      <div className="text-white">
        <h3>Address: {connection.address}</h3>
        <div>ChainId: {connection.chainId}</div>
        <div>Balance: {balance}</div>
      </div>
    );
  }

  return null;
}
