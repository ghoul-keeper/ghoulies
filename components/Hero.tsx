// @ts-nocheck
import React, { FC } from "react";
import { useEffect, useState, useMemo } from "react";
import Countdown from "react-countdown";

import * as anchor from "@project-serum/anchor";

import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useAnchorWallet } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { CircularProgress, Snackbar } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import Navigation from "../components/Navigation";

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
  let content = props.content;

  return (
    <div className="mt-4 text-base sm:text-xl lg:text-lg xl:text-xl letter-spacing3 text-center">
      <p style={{ color: "#FFD051" }}>Full release now available</p>
      <Countdown
        date={startDate.getTime()}
        onMount={({ completed }) => completed && setIsActive(true)}
        onComplete={() => setIsActive(true)}
        renderer={(props) =>
          rendererForCountdown({
            days: props.days,
            hours: props.hours,
            minutes: props.minutes,
            seconds: props.seconds,
            completed: props.completed,
            content: content,
          })
        }
      />
    </div>
  );
};

const rendererForCountdown = ({
  days,
  hours,
  minutes,
  seconds,
  completed,
  content,
}) => {
  if (completed) {
    return (
      <span className="flex my-2 text-center items-center w-full justify-center">
        <WalletMultiButton
          className="wal-banner"
          style={{
            textTransform: content == "Connect Wallet" ? "uppercase" : "none",
          }}
        >
          {content}
        </WalletMultiButton>
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
  const [isOpen, setIsOpen] = useState(false);
  const [itemsAvailable, setItemsAvailable] = useState(0);
  const [itemsRedeemed, setItemsRedeemed] = useState(0);
  const [itemsRemaining, setItemsRemaining] = useState(0);

  const [alertState, setAlertState] = useState<AlertState>({
    open: false,
    message: "",
    severity: undefined,
  });

  const [startDate, setStartDate] = useState(
    new Date(props.startDate * 1000000)
  );
  const [candyMachine, setCandyMachine] = useState<CandyMachine>();

  let startDateInThePast = startDate <= new Date();

  const wallet = useAnchorWallet();

  const base58 = useMemo(() => wallet?.publicKey?.toBase58(), [wallet]);
  const content = !base58
    ? "Connect Wallet"
    : base58.slice(0, 4) + ".." + base58.slice(-4);

  const refreshCandyMachineState = () => {
    (async () => {
      if (!wallet) return;

      const {
        candyMachine,
        goLiveDate,
        itemsAvailable,
        itemsRemaining,
        itemsRedeemed,
      } = await getCandyMachineState(
        wallet as anchor.Wallet,
        props.candyMachineId,
        props.connection
      );

      setItemsAvailable(itemsAvailable);
      setItemsRemaining(itemsRemaining);
      setItemsRedeemed(itemsRedeemed);

      setIsSoldOut(itemsRemaining === 0);
      setStartDate(goLiveDate);
      setCandyMachine(candyMachine);
    })();
  };

  const onMint = async () => {
    try {
      setIsMinting(true);
      if (wallet && candyMachine?.program) {
        const mintTxId = await mintOneToken(
          candyMachine,
          props.config,
          wallet.publicKey,
          props.treasury
        );

        const status = await awaitTransactionSignatureConfirmation(
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
      if (wallet) {
        const balance = await props.connection.getBalance(wallet.publicKey);
        setBalance(balance / LAMPORTS_PER_SOL);
      }
      setIsMinting(false);
      refreshCandyMachineState();
    }
  };

  useEffect(() => {
    (async () => {
      if (wallet) {
        const balance = await props.connection.getBalance(wallet.publicKey);
        setBalance(balance / LAMPORTS_PER_SOL);
      }
    })();
  }, [wallet, props.connection]);

  useEffect(refreshCandyMachineState, [
    wallet,
    props.candyMachineId,
    props.connection,
  ]);

  return (
    <div>
      <WalletMultiButton
        className="wal"
        style={{
          textTransform: content == "Connect Wallet" ? "uppercase" : "none",
        }}
      >
        {content}
      </WalletMultiButton>
      <a
        href="https://solana.com/"
        target="_blank"
        className="hover:opacity-60"
      >
        <img src="/solana.png" className="sol-log" />
      </a>
      <Navigation setIsOpen={setIsOpen} isOpen={isOpen} />
      <div className="hero">
        <div className="inside px-8 md:px-0 pb-8">
          <img
            className="m-auto w-96 pt-24 pb-24 md:pb-16 md:pt-16"
            src="/ghoulie-gang-logo.png"
          />
          <div className="welcome w-full flex flex-col md:flex-row text-white overflow-visible">
            <div className="logo-bg-cont h-auto" style={{ width: "25rem" }}>
              {startDateInThePast ? (
                wallet ? (
                  <div className="very-large-logo-bg"></div>
                ) : (
                  <div className="very-large-logo-bg-adjusted"></div>
                )
              ) : (
                <div className="logo-bg"></div>
              )}
            </div>
            <div className="ml-0 md:ml-4 py-0 md:pt-8 -mt-14 md:mt-0 text-center md:text-left px-8 md:px-0 pt-20">
              <h2 className="uppercase text-xl letter-spacing-2">Season 1:</h2>
              <h1 className="uppercase text-4xl letter-spacing-3">Halloween</h1>
              <p className="reg-font max-w-lg pt-3">
                <b>Soft launch</b>:{" "}
                <span style={{ color: "rgb(255, 208, 81)" }}>
                  <b>SOLD OUT </b>
                </span>
                <strike>
                  Oct. 19th for the first 750 Ghoulies, 0.25 SOL each (limit 1
                  per wallet)
                </strike>
              </p>
              <p className="reg-font max-w-lg mt-3">
                <b>Full release</b>:{" "}
                <span style={{ color: "rgb(255, 208, 81)" }}>
                  <b>SOLD OUT </b>
                </span>
                <strike>
                  Monday{" "}
                  <span style={{ color: "rgb(255, 208, 81)" }}>
                    <b>8PM UTC/4PM EST</b>
                  </span>
                  , Oct. 25th for 6,624 remaining Ghoulies, 0.05 SOL each
                  (no-limit)
                </strike>
              </p>
              <p className="reg-font max-w-lg pb-3 mt-3">
                7,500 Total Mint. Follow along on{" "}
                <a
                  className="underline hover:opacity-60"
                  target="_blank"
                  href="https://twitter.com/GhouliesNFT"
                >
                  Twitter
                </a>{" "}
                and{" "}
                <a
                  className="underline hover:opacity-60"
                  target="_blank"
                  href="https://discord.gg/vhhs3t3xqK"
                >
                  Discord
                </a>
                .
              </p>
              <div className="main-mint-cont text-base text-gray-300 sm:text-xl lg:text-lg xl:text-xl">
                <div className="mint-container">
                  {!wallet ? (
                    <GhoulieCountdown
                      startDate={startDate}
                      setIsActive={setIsActive}
                      content={content}
                    />
                  ) : isActive ? (
                    <div className="mt-4 text-base sm:text-xl lg:text-lg xl:text-xl letter-spacing3 text-center">
                      <p style={{ color: "#FFD051" }}>
                        Full release now available
                      </p>
                      <button
                        className="mint-button my-6"
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
                            "MINT FOR 0.05"
                          )
                        ) : (
                          // Shouldn't get here.
                          <GhoulieCountdown
                            startDate={startDate}
                            setIsActive={setIsActive}
                            content={content}
                          />
                        )}
                      </button>
                    </div>
                  ) : (
                    <GhoulieCountdown
                      startDate={startDate}
                      setIsActive={setIsActive}
                      content={content}
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
              <ul className="flex justify-center items-center space-x-1 md:space-x-3 px-2 md:px-0">
                <li className="pos-gho">
                  <img src="/ghoulie-no-bg/Ghoulie-sm-01.png" />
                </li>
                <li className="pos-gho">
                  <img src="/ghoulie-no-bg/Ghoulie-sm-02.png" />
                </li>
                <li className="pos-gho-tra">
                  <img src="/ghoulie-no-bg/Ghoulie-sm-03.png" />
                </li>
                <li className="pos-gho">
                  <img src="/ghoulie-no-bg/Ghoulie-sm-04.png" />
                </li>
                <li>
                  <img src="/ghoulie-no-bg/Ghoulie-sm-05.png" />
                </li>
                <li className="pos-gho">
                  <img src="/ghoulie-no-bg/Ghoulie-sm-06.png" />
                </li>
                <li className="pos-gho-tra-s">
                  <img src="/ghoulie-no-bg/Ghoulie-sm-07.png" />
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
