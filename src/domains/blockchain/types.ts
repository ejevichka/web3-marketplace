export type WalletAddress = `0x${string}`;

export function toWalletAddresss(addr: string): WalletAddress {
  if (addr.startsWith("0x")) return addr as WalletAddress;
  throw new Error("Not an address");
}
