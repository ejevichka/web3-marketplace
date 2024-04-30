import NFTCard from "~/components/card"
import { mockNFT } from "~/components/mocks/mock"
import { useWalletProvider } from "~/hooks/useWalletProvider";



const Grid = () => {
    const { hasProvider, handleConnect, wallet } = useWalletProvider();
    const cards = Array.from({ length: 11 }).map((_, index) => (
        <div key={index} className="mb-4 text-center">
            <NFTCard nft={mockNFT} />
        </div>
    ));
    return (
        <>
            <div className="bg-white px-4 py-2 rounded-md text-black bg-opacity-60 cursor-pointer">
                Injected Provider {hasProvider ? "DOES" : "DOES NOT"} Exist
            </div>
            {hasProvider && (
                <div className="bg-white px-4 py-2 rounded-md text-black bg-opacity-60 cursor-pointer" onClick={handleConnect}>Connect MetaMask</div>
            )}

            {wallet.accounts.length > 0 && (
                <div className="bg-white px-4 py-2 rounded-md text-black bg-opacity-60 cursor-pointer" >Wallet Accounts: {wallet.accounts[0]}</div>
            )}

            <div className="overflow-hidden text-center">
                {cards}
            </div>
        </>
    );
};

export default Grid;