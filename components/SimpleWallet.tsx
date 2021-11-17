import React, { FC } from "react";
import { useEffect, useState, useMemo } from "react";

import * as anchor from "@project-serum/anchor";

import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useAnchorWallet, useWallet } from "@solana/wallet-adapter-react";

const SimpleWallet = (props) => {
  const wallet = useAnchorWallet();
  const { disconnecting } = useWallet();

  const base58 = useMemo(() => wallet?.publicKey?.toBase58(), [wallet]);
  const content = !base58
    ? "Connect Wallet"
    : base58.slice(0, 4) + ".." + base58.slice(-4);

  useEffect(() => {
    (async () => {
      if (wallet) {
        props.passPropsUp(wallet, props.connection);
      }

      if (disconnecting) {
        props.passPropsUp(null, props.connection);
      }
    })();
  }, [wallet, disconnecting]);

  return (
    <WalletMultiButton
      className="wal-rarity"
      style={{
        textTransform: content == "Connect Wallet" ? "uppercase" : "none",
      }}
    >
      {content}
    </WalletMultiButton>
  );
};

export default SimpleWallet;
