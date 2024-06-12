import { http, createPublicClient } from "viem";
import { mainnet } from "viem/chains";

// @todo make in context
// it depends on the selected chain

export const publicClient = createPublicClient({
  chain: mainnet,
  transport: http(),
});
