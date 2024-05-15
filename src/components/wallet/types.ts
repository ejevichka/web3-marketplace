
import {
    type WalletAddress,
} from "~/domains/blockchain/types";

abstract class AnyBlockchain {
    abstract getBlockchainName(): string;
    abstract getCurrentBlock(): Promise<number>;
    abstract getAddress(index: number): Promise<string>;
    // ... (add other common methods)
  
    // Methods specific to certain blockchains could be implemented here
  }

export type Wallet = {
    accounts: WalletAddress[];
    balance: bigint;
  };

abstract class AbstractWallet<Blockchain extends AnyBlockchain> {
    blockchain: Blockchain;

    constructor(blockchain: Blockchain) {
        this.blockchain = blockchain;
    }

    abstract sendTokens(recipient: string, amount: number): Promise<void>;
}

class EVMWallet implements AbstractWallet<EthereumBlockchain> {
    blockchain: EthereumBlockchain;

    constructor(blockchain: EthereumBlockchain) {
        this.blockchain = blockchain;
    }

    async sendTokens(recipient: string, amount: number): Promise<void> {
        console.log(`Sending ${amount} tokens to ${recipient} via EVM.`);
    }
}

interface EthereumBlockchain extends AnyBlockchain {

}

const ethereumBlockchain: EthereumBlockchain = {
};

const evmWallet = new EVMWallet(ethereumBlockchain);
