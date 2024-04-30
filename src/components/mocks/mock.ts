export const mockNFT = {
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