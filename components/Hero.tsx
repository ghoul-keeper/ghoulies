import React, { FC } from "react";
import { useEffect, useState } from "react";
import Countdown from "react-countdown";

import * as anchor from "@project-serum/anchor";

import { useWallet } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { CircularProgress, Snackbar } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";

import {
  CandyMachine,
  awaitTransactionSignatureConfirmation,
  getCandyMachineState,
  mintOneToken,
  shortenAddress,
} from "./candy-machine";

export interface HomeProps {
  candyMachineId: anchor.web3.PublicKey;
  config: anchor.web3.PublicKey;
  connection: anchor.web3.Connection;
  startDate: number;
  treasury: anchor.web3.PublicKey;
  txTimeout: number;
}

const GhoulieCountdown = (props) => {
  let startDate = props.startDate;
  let setIsActive = props.setIsActive;

  return (
    <div className="mt-8 sm:mt-10 text-base sm:text-xl lg:text-lg xl:text-xl">
      <p
        className="sm:text-center md:text-center lg:text-left font-bold pb-3 block bg-clip-text text-transparent bg-gradient-to-r from-teal-200 to-cyan-400 sm:pb-5 text-left"
        style={{ color: "#46ddeb" }}
      >
        Launching Friday, Sept 24, 2021 @ 1am UTC
      </p>
      <Countdown
        date={startDate.getTime()}
        onMount={({ completed }) => completed && setIsActive(true)}
        onComplete={() => setIsActive(true)}
        renderer={rendererForCountdown}
      />
    </div>
  );
};

const rendererForCountdown = ({ days, hours, minutes, seconds, completed }) => {
  if (completed) {
    return (
      <span
        className="font-bold pb-3 bg-clip-text text-transparent bg-gradient-to-r from-teal-200 to-cyan-400 sm:pb-5 flex justify-evenly mt-8 lg:text-3xl md:text-3xl sm:text-2xl"
        style={{ color: "#46ddeb" }}
      >
        Please connect your wallet.
      </span>
    );
  } else {
    return (
      <div
        className="flex font-bold pb-3 sm:pb-5 justify-evenly mt-8 lg:text-3xl md:text-3xl sm:text-2xl"
        style={{ color: "#46ddeb" }}
      >
        <span className="text-center">
          {days} <br /> Days
        </span>
        <span className="text-center">
          {hours} <br /> Hours
        </span>
        <span className="text-center">
          {minutes} <br /> Minutes
        </span>
        <span className="text-center">
          {seconds} <br /> Seconds
        </span>
      </div>
    );
  }
};

interface AlertState {
  open: boolean;
  message: string;
  severity: "success" | "info" | "warning" | "error" | undefined;
}

const Hero = (props: HomeProps) => {
  const [balance, setBalance] = useState<number>();
  const [isActive, setIsActive] = useState(false); // true when countdown completes
  const [isSoldOut, setIsSoldOut] = useState(false); // true when items remaining is zero
  const [isMinting, setIsMinting] = useState(false); // true when user got to press MINT

  const [alertState, setAlertState] = useState<AlertState>({
    open: false,
    message: "",
    severity: undefined,
  });

  const [startDate, setStartDate] = useState(new Date(props.startDate * 1000));
  const wallet = useWallet();
  const [candyMachine, setCandyMachine] = useState<CandyMachine>();
  console.log(props);
  console.log(startDate);

  const onMint = async () => {
    try {
      setIsMinting(true);
      if (wallet.connected && candyMachine?.program && wallet.publicKey) {
        const mintTxId = await mintOneToken(
          candyMachine,
          props.config,
          wallet.publicKey,
          props.treasury
        );

        const status: any = await awaitTransactionSignatureConfirmation(
          mintTxId,
          props.txTimeout,
          props.connection,
          "singleGossip",
          false
        );

        if (!status?.err) {
          setAlertState({
            open: true,
            message: "Congratulations! Mint succeeded!",
            severity: "success",
          });
        } else {
          setAlertState({
            open: true,
            message: "Mint failed! Please try again!",
            severity: "error",
          });
        }
      }
    } catch (error: any) {
      // TODO: blech:
      let message = error.msg || "Minting failed! Please try again!";
      if (!error.msg) {
        if (error.message.indexOf("0x138")) {
        } else if (error.message.indexOf("0x137")) {
          message = `SOLD OUT!`;
        } else if (error.message.indexOf("0x135")) {
          message = `Insufficient funds to mint. Please fund your wallet.`;
        }
      } else {
        if (error.code === 311) {
          message = `SOLD OUT!`;
          setIsSoldOut(true);
        } else if (error.code === 312) {
          message = `Minting period hasn't started yet.`;
        }
      }

      setAlertState({
        open: true,
        message,
        severity: "error",
      });
    } finally {
      if (wallet?.publicKey) {
        const balance = await props.connection.getBalance(wallet?.publicKey);
        setBalance(balance / LAMPORTS_PER_SOL);
      }
      setIsMinting(false);
    }
  };

  useEffect(() => {
    (async () => {
      if (wallet?.publicKey) {
        const balance = await props.connection.getBalance(wallet.publicKey);
        setBalance(balance / LAMPORTS_PER_SOL);
      }
    })();
  }, [wallet, props.connection]);

  useEffect(() => {
    (async () => {
      if (
        !wallet ||
        !wallet.publicKey ||
        !wallet.signAllTransactions ||
        !wallet.signTransaction
      ) {
        return;
      }

      const anchorWallet = {
        publicKey: wallet.publicKey,
        signAllTransactions: wallet.signAllTransactions,
        signTransaction: wallet.signTransaction,
      } as anchor.Wallet;

      const { candyMachine, goLiveDate, itemsRemaining } =
        await getCandyMachineState(
          anchorWallet,
          props.candyMachineId,
          props.connection
        );

      setIsSoldOut(itemsRemaining === 0);
      setStartDate(goLiveDate);
      setCandyMachine(candyMachine);
    })();
  }, [wallet, props.candyMachineId, props.connection]);

  return (
    <div className="pt-10 bg-gray-900 sm:pt-16 lg:pt-8 lg:pb-14 lg:overflow-hidden pb-8">
      <div className="mx-auto max-w-7xl lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-8">
          <div className="mx-auto max-w-md px-4 sm:max-w-2xl sm:px-6 sm:text-center lg:px-0 lg:text-left lg:flex lg:items-center">
            <div className="lg:py-24">
              <h1 className="mt-4 text-4xl tracking-tight font-extrabold text-white sm:mt-5 sm:text-6xl lg:mt-6 xl:text-6xl">
                <span className="block">Ghoulies on the</span>
                <span
                  className="pb-3 block bg-clip-text text-transparent bg-gradient-to-r from-teal-200 to-cyan-400 sm:pb-5"
                  style={{ color: "#46ddeb" }}
                >
                  Solana chain.
                </span>
              </h1>
              <p className="text-base text-gray-300 sm:text-xl lg:text-lg xl:text-xl">
                10,000 <b>unique</b> algorithmically generated Ghoulies on the
                Solana blockchain. Using Candy Machine for our smart contract to
                guarantee we don't over-collect.
              </p>

              {/* --------------------------------- */}
              <div
                className="main-mint-cont text-base text-gray-300 sm:text-xl lg:text-lg xl:text-xl text-center mt-14"
                style={{ color: "#46ddeb" }}
              >
                {/* {wallet.connected && (
                  <p>
                    Address:{" "}
                    {shortenAddress(wallet.publicKey?.toBase58() || "")}
                  </p>
                )}

                {wallet.connected && (
                  <p>Balance: {(balance || 0).toLocaleString()} SOL</p>
                )} */}

                <div className="mint-container">
                  {!wallet.connected ? (
                    <GhoulieCountdown
                      startDate={startDate}
                      setIsActive={setIsActive}
                    />
                  ) : isActive ? (
                    <button
                      className="mint-button"
                      disabled={isSoldOut || isMinting || !isActive}
                      onClick={onMint}
                      // variant="contained"
                    >
                      {isSoldOut ? (
                        "SOLD OUT"
                      ) : isActive ? (
                        isMinting ? (
                          <CircularProgress />
                        ) : (
                          "MINT"
                        )
                      ) : (
                        // Shouldn't get here.
                        <GhoulieCountdown
                          startDate={startDate}
                          setIsActive={setIsActive}
                        />
                      )}
                    </button>
                  ) : (
                    <GhoulieCountdown
                      startDate={startDate}
                      setIsActive={setIsActive}
                    />
                  )}
                </div>

                <Snackbar
                  open={alertState.open}
                  autoHideDuration={6000}
                  onClose={() => setAlertState({ ...alertState, open: false })}
                >
                  <Alert
                    onClose={() =>
                      setAlertState({ ...alertState, open: false })
                    }
                    severity={alertState.severity}
                  >
                    {alertState.message}
                  </Alert>
                </Snackbar>
              </div>
              {/* --------------------------------- */}
            </div>
          </div>
          <div className="mt-12 lg:m-0 lg:relative">
            <div className="mx-auto max-w-md px-4 sm:max-w-2xl sm:px-6 lg:max-w-none lg:px-0">
              {/* Illustration taken from Lucid Illustrations: https://lucid.pixsellz.io/ */}
              <img
                className="w-full lg:absolute lg:inset-y-0 lg:left-0 lg:h-full lg:w-auto lg:max-w-none rounded-md"
                src="/ghoulies-collage.jpg"
                alt="Collage of Ghoulies - NFT Collection"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
