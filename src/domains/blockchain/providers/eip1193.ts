import detectEthereumProvider from "@metamask/detect-provider";
import { EVMAddress, EVMChainId } from "../evm";
import type { EIP1193Provider } from "viem";
import type { IConnector } from "./types";

export class EIP1193Connector implements IConnector<"eip-1193"> {
  readonly id = "eip-1193";

  connect = async () => {
    // @todo migrate to `mipd`
    const provider = await getEIP1193Provider();
    if (!provider) throw new Error("No ethereum provider found");

    const [account] = await provider.request({ method: "eth_requestAccounts" });
    if (!account) throw new Error("No account exposed");

    const chainId = await provider.request({ method: "eth_chainId" });
    return {
      address: EVMAddress.parse(account),
      chainId: EVMChainId.parse(chainId),
    };
  };
}

async function getEIP1193Provider(): Promise<EIP1193Provider> {
  const provider = await detectEthereumProvider({ silent: true });
  return provider as unknown as EIP1193Provider;
}
