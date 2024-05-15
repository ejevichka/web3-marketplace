import { useConnection } from "~/hooks/useConnection";

export default function WalletComponent() {
  const connection = useConnection();

  if (connection) {
    return (
      <div className="text-white">
        <h3>Address: {connection.address}</h3>
        <span>ChainId: {connection.chainId}</span>
      </div>
    );
  }

  return null;
}
