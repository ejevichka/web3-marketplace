import type { IConnection } from "../evm";

export type IConnector<Id extends string> = {
  id: Id;
  connect: () => Promise<IConnection>;
};
