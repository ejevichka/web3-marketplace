import { BigNumber } from "bignumber.js";
import {
  type Observable,
  distinctUntilChanged,
  switchMap,
  timer,
  shareReplay,
} from "rxjs";
import { type PublicClient } from "viem";
import { type IEVMAddress } from "./evm";
import { toViemAddress } from "./utils";

// export function getBalance():  {

// }

// 1 ETH = 10**18 WEI
// 1 ETH = 100000000..00 WEI

// source (emitter)
// dependent childs

// source: timer (emits one event per timeout)
// dependent: map pipeline
// HOT observable because of shareReplay

export function getEVMBalanceObservable(
  client: PublicClient,
  address: IEVMAddress,
): Observable<BigNumber> {
  const timeout = 1000 * 60 * 5; // 5min
  return timer(0, timeout).pipe(
    switchMap(() => getEVMBalance(client, address)),
    distinctUntilChanged((a, b) => a.eq(b)),
    shareReplay({ bufferSize: 1, refCount: true }),
  );
}

// const balance = getEVMBalanceObservable(...)
// balance.subscribe(x => console.log("balance1", x))
// balance.subscribe(x => console.log("balance2", x))

export async function getEVMBalance(
  client: PublicClient,
  address: IEVMAddress,
): Promise<BigNumber> {
  const balance = await client.getBalance({ address: toViemAddress(address) });
  return new BigNumber(balance.toString());
}

// function getERC20Balance() {
//   // @todo
// }
