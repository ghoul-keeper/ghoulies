import { useMemo, useCallback } from "react";
import Notification from "./Notification";
import { WalletError } from "@solana/wallet-adapter-base";
import Hero from "./Hero";
import SimpleWallet from "./SimpleWallet";
import toast, { Toaster } from "react-hot-toast";

import * as anchor from "@project-serum/anchor";
import { clusterApiUrl } from "@solana/web3.js";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import {
  getPhantomWallet,
  getSolletWallet,
} from "@solana/wallet-adapter-wallets";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";

interface CandyMachineProps {
  candyMachineId: anchor.web3.PublicKey;
  config: anchor.web3.PublicKey;
  connection: anchor.web3.Connection;
  startDate: number;
  treasury: anchor.web3.PublicKey;
  txTimeout: number;
}

const network = process.env
  .NEXT_PUBLIC_REACT_APP_SOLANA_NETWORK as WalletAdapterNetwork;
const treasury = new anchor.web3.PublicKey(
  process.env.NEXT_PUBLIC_REACT_APP_TREASURY_ADDRESS!
);
const config = new anchor.web3.PublicKey(
  process.env.NEXT_PUBLIC_REACT_APP_CANDY_MACHINE_CONFIG!
);
const candyMachineId = new anchor.web3.PublicKey(
  process.env.NEXT_PUBLIC_REACT_APP_CANDY_MACHINE_ID!
);
const rpcHost = process.env.NEXT_PUBLIC_REACT_APP_SOLANA_RPC_HOST!;
const connection = new anchor.web3.Connection(rpcHost);
const startDateSeed = parseInt(
  process.env.NEXT_PUBLIC_REACT_APP_CANDY_START_DATE!,
  10
);

const txTimeout = 30000;

export default function ClientWalletProvider(props): JSX.Element {
  const endpoint = useMemo(() => clusterApiUrl(network), []);

  const onError = useCallback(
    (error: WalletError) =>
      toast.custom(
        <Notification
          message={
            error.message ? `${error.name}: ${error.message}` : error.name
          }
          variant="error"
        />
      ),
    []
  );
  const wallets = useMemo(() => [getPhantomWallet(), getSolletWallet()], []);

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} onError={onError} {...props}>
        <WalletModalProvider logo="/ghoulie-gang-logo.png">
          {props.rarity ? (
            <SimpleWallet
              connection={connection}
              passPropsUp={props.passPropsUp}
            />
          ) : (
            <Hero
              candyMachineId={candyMachineId}
              config={config}
              connection={connection}
              startDate={startDateSeed}
              treasury={treasury}
              txTimeout={txTimeout}
            />
          )}
        </WalletModalProvider>
        <Toaster position="bottom-left" reverseOrder={false} />
      </WalletProvider>
    </ConnectionProvider>
  );
}
