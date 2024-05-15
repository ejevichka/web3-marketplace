import { useEffect, useState } from "react";
import { connectionManager } from "~/domains/blockchain/connection-manager";
import type { IConnection } from "~/domains/blockchain/evm";

export function useConnection() {
  const [connection, setConnection] = useState<IConnection | null>(null);

  useEffect(() => {
    const sub = connectionManager.connection$.subscribe((x) => {
      setConnection(x);
    });
    return () => sub.unsubscribe();
  }, []);

  return connection;
}
