import React, { type PropsWithChildren, useEffect } from "react";
import { connectionManager } from "~/domains/blockchain/connection-manager";
import { EIP1193Connector } from "~/domains/blockchain/providers/eip1193";

export function ConnectionProvider(props: PropsWithChildren) {
  useEffect(() => {
    const connector = new EIP1193Connector();
    connectionManager
      .connect(connector)
      .then(() => console.log("Connected"))
      .catch(console.error);
  }, []);

  return <React.Fragment {...props} />;
}
