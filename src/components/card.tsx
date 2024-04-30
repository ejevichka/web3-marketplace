// components/NFTCard.tsx
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface NFTCardProps {
  nft: {
    id: string;
    name: string;
    image: string;
    owner: string;
    price?: number; // Optional property for price
  };
}

const NFTCard: React.FC<NFTCardProps> = ({ nft }) => {
  return (
    <div className="nft-card bg-white bg-opacity-60 shadow-md rounded-lg overflow-hidden cursor-pointer">
      <Link href={`/nft/${nft.id}`}>
          <Image
            src={nft.image}
            alt={nft.name}
            width={100}
            height={100}
            className="object-cover"
          />
      </Link>
      <div className="p-4">
        <h4 className="text-lg font-medium text-gray-900">{nft.name}</h4>
        <p className="text-gray-700 text-sm">Owner: {nft.owner}</p>
        {nft.price && (
          <p className="text-green-500 font-bold text-xl">Price: {nft.price} ETH</p>
        )}
      </div>
    </div>
  );
};

export default NFTCard;