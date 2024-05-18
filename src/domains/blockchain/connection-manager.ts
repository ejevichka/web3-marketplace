import { BehaviorSubject } from "rxjs";
import type { IConnection } from "./evm";
import type { IConnector } from "./providers/types";

export class ConnectionManager {
  readonly connection$ = new BehaviorSubject<IConnection | null>(null);

  connect = async (connector: IConnector<string>) => {
    const connection = await connector.connect();
    this.connection$.next(connection);
  };

  disconnect = () => this.connection$.next(null);
}

export const connectionManager = new ConnectionManager();
