import { type Address as ViemAddress } from "viem";
import { type IEVMAddress } from "./evm";

export function toViemAddress(address: IEVMAddress) {
  return address as ViemAddress;
}
