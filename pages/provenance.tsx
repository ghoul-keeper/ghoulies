import Head from "next/head";
import React, { useState } from "react";
import dynamic from "next/dynamic";

// Work around to use the Solana Wallet Adapter with Next.js
// https://github.com/solana-labs/wallet-adapter/issues/30
const WalletProvider = dynamic(
  () => import("../components/ClientWalletProvider"),
  {
    ssr: false,
  }
);

// Temp examples
const ghoulies = [
  {
    id: "#0000",
    hash: "a3e69b7f1f5d6b051339351e08d84f4fb5ba0f94e6dfd3cc60fa03be26502fa0",
    metadata: "https://arweave.net/Lf72-sn__qSUI1tF4KtqIfTLRXB4Ot62vRxu5cOc2vM",
    image:
      "https://www.arweave.net/IVu5-mHKKFh6E8nxdKv3piQwy3CPDcIggykHbTNHOik?ext=png",
  },
  {
    id: "#0001",
    hash: "4954e2a1674a7739aa01d60a4968adb7a1a31c334a60d63413dd6b2606757826",
    metadata: "https://arweave.net/Lf72-sn__qSUI1tF4KtqIfTLRXB4Ot62vRxu5cOc2vM",
    image:
      "https://www.arweave.net/IVu5-mHKKFh6E8nxdKv3piQwy3CPDcIggykHbTNHOik?ext=png",
  },
];

export default function Home() {
  const [isHovered, setHovered] = useState({ id: null, isHovered: false });

  return (
    <div>
      <Head>
        <title>Ghoulie Gang | Solana | NFT</title>
        <meta charSet="utf-8" />
        <link
          href="https://unpkg.com/tailwindcss@^2.0/dist/tailwind.min.css"
          rel="stylesheet"
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          rel="preload"
          href="/fonts/Spot/Spot-Normal.ttf"
          as="font"
          crossOrigin=""
        />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta
          name="description"
          content="Ghoulie Gang is a multi-season generative collection of 7,500 unique NFTs on the Solana blockchain. Creepy, weird, and unique just like each one of us. Spawn a Ghoulie to be be part of the Gang."
        />
        <meta name="keywords" content="Solana, Blockchain, NFT" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@GhouliesNFT" />
        <meta name="twitter:creator" content="@GhouliesNFT" />
        <meta property="og:title" content="Ghoulie Gang" />
        <meta property="og:url" content="https://www.ghouliegang.io/" />
        <meta property="og:type" content="website" />
        <meta
          property="og:image"
          content="https://www.ghouliegang.io/share-img.png"
        />
        <meta
          property="og:description"
          content="Ghoulie Gang is a multi-season generative collection of 7,500 unique NFTs on the Solana blockchain. Creepy, weird, and unique just like each one of us. Spawn a Ghoulie to be be part of the Gang."
        />
      </Head>

      <main className="relative overflow-hidden inside px-8 md:px-0">
        <h2 className="text-white text-center text-5xl pt-36">
          This page is under construction.
          <br />
          <br />- Ghoul Keeper
        </h2>
      </main>
    </div>
  );
}
