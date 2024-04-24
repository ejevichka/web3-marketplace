import Head from "next/head";
import NFTCard from "~/components/card"

import { api } from "~/utils/api";

export default function Home() {
  const hello = api.post.hello.useQuery({ text: "from tRPC" });
  const mockNFT = {
    id: "12345",
    name: "CryptoKitty #12345",
    image: "/", // Replace with a placeholder image URL or an actual IPFS hash
    description: "This is a unique and adorable CryptoKitty with a rare fur pattern. It is part of a limited edition collection.",
    owner: "0x1234567890AbCdEf1234567890AbCdEf1234",
    attributes: [
      { trait_type: "Fur Pattern", value: "Striped" },
      { trait_type: "Eye Color", value: "Green" },
      { trait_type: "Rarity", value: "Rare" },
    ],
    price: 0.1, // Optional, in ETH
    animation_url: "/", // Optional, URL to an animation file (e.g., GIF)
    contractAddress: "0x...", // Optional, address of the ERC-721 contract for this NFT
  };

  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
          <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
            Pet Nat
          </h1>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-8">
            <NFTCard nft={mockNFT}/>
          </div>
          <p className="text-2xl text-white">
            {hello.data ? hello.data.greeting : "Loading tRPC query..."}
          </p>
        </div>
      </main>
    </>
  );
}
