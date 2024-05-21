import { useConnection } from "~/hooks/useConnection";
import { useBalance } from "~/hooks/useBalance";
import type { IConnection } from "~/domains/blockchain/evm";

export default function WalletComponent() {
  const connection = useConnection();

  if (connection) {
    return (
      <div className="text-white">
        <h3>Address: {connection.address}</h3>
        <div>ChainId: {connection.chainId}</div>
        <div>
          Balance: <Balance connection={connection} />
        </div>
      </div>
    );
  }

  return null;
}

function Balance({ connection }: { connection: IConnection }) {
  const balance = useBalance(connection.address);
  return <span>{balance ? balance.toString() : "Loading.."}</span>;
}
