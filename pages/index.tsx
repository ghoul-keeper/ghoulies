import Head from "next/head";
import React, { useState, useRef, useEffect } from "react";
import { Disclosure } from "@headlessui/react";
import { PlusIcon, MinusIcon } from "@heroicons/react/outline";
import dynamic from "next/dynamic";
import Footer from "../components/Footer";
import Navigation from "../components/Navigation";

// Work around to use the Solana Wallet Adapter with Next.js
// https://github.com/solana-labs/wallet-adapter/issues/30
const WalletProvider = dynamic(
  () => import("../components/ClientWalletProvider"),
  {
    ssr: false,
  }
);

const faqs = [
  {
    question: "HOW MANY NFTS WILL BE SPAWNING?",
    answer:
      "There will be exactly 10,000 Ghoulies being released on Oct. ??. They will be 1.5 SOL each (make sure to have ~0.05 SOL for fees)",
  },
  {
    question: "WHEN IS THE LAUNCH?",
    answer: "October 25th",
  },
  {
    question: "WHY SPACE GHOULIES?",
    answer:
      "NFTs are the equivalent of the Renaissance in our humble opinion.\n\nGhoulies was the original name given to the 1-of-1 hand-drawings created by GHOULAREYOU. Those original 1-of-1's spawned the project you see before you today. On a technical level we wanted to build a project with intention and the longterm in mind. We built Space Ghoulies because we believe that decentralization will usher in the future of work.\n\nThe recipe of humans, machines, and blockchains has aligned incentives like never before possible in terrestrial society. Our mission is to create a culture of ultra ambitious ghoulie holders who will usher in a paradigm shift of commerce and value aboard the ISS GHOUL.",
  },
  {
    question: "HOW DO I SPAWN A GHOULIE ON SOLANA?",
    answer:
      "In order to purchase a Ghoulie, you’ll need to use Solana (SOL), which you can get at most of the exchanges (Coinbase, Binance, FTX, Gemini). Always remember to have extra Solana to cover the network transaction fee.\n\nOnce you've loaded up on the eco-friendly SOL, you’ll need a wallet to store it in. If you’re familiar with ether and their wallets (such as Metamask), let us introduce you to Phantom Wallet.\n\nCheckout our docs on step-by-step guides.",
  },
  {
    question: "WHAT DO I GET WITH MY GHOULIE?",
    answer:
      "Each ghoulie acts as your passport and as a non-dilutable share to vote on ISS GHOUL DAO proposals. We've also released all creative and commercial usage to you for any Ghoulies you hold in your wallet. ",
  },
  {
    question: "WHAT IS AN NFT?",
    answer:
      'NFT is an acronym for the technical term "non-fungible token." Each token is essentially a digital asset living permanently on the blockchain.\n\nThey may seem quite esoteric now but the smartest people in the world are building on the blockchain so humans can live happier and more fulfilling lives globally not just locally.\n\nCheck out our docs for more information.',
  },
  {
    question: "ARE YOU SENDING A GHOULIE HOLDER TO SPACE?",
    answer: "Yes.",
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);
  const [initialLoad, setIsInitialLoad] = useState(true);

  let bookOfGhoulie = useRef(null);
  let bookOfGhoulieId = "book-of-ghoulie";

  let kensaKorbi = useRef(null);
  let kensaKorbiId = "kensa-korbi";

  let capLog = useRef(null);
  let capLogId = "captain-log";

  let flightPlan = useRef(null);
  let flightPlanId = "flight-plan";

  let scrollToPos = () => {
    let anchorId =
      typeof window !== "undefined"
        ? window.location.href.slice(window.location.href.indexOf("#") + 1)
        : "";

    if (anchorId === bookOfGhoulieId) {
      bookOfGhoulie.current.scrollIntoView({ behavior: "smooth" });
    } else if (anchorId === kensaKorbiId) {
      kensaKorbi.current.scrollIntoView({ behavior: "smooth" });
    } else if (anchorId === capLogId) {
      capLog.current.scrollIntoView({ behavior: "smooth" });
    } else if (anchorId === flightPlanId) {
      flightPlan.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    if (initialLoad) {
      setTimeout(() => {
        scrollToPos();
      }, 1000);
    } else {
      scrollToPos();
    }
  }, [isOpen]);

  useEffect(() => {
    setIsInitialLoad(false);
  }, []);

  return (
    <div>
      <Head>
        <title>Ghoulies | Solana | NFT</title>
        <meta charSet="utf-8" />
        <link
          href="https://unpkg.com/tailwindcss@^2.0/dist/tailwind.min.css"
          rel="stylesheet"
        />
        <link
          rel="preload"
          href="/fonts/Spot/Spot-Normal.ttf"
          as="font"
          crossOrigin=""
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      <main className="relative overflow-hidden">
        {/* <WalletProvider objectOfScrolls={objOfScrolls} /> */}
        <Navigation setIsOpen={setIsOpen} isOpen={isOpen} />
        <div className="hero">
          <div className="inside px-8 md:px-0 pb-24">
            <img
              className="m-auto w-96 pt-24 pb-24 md:pb-20"
              src="/space-ghoulies-logo.png"
            />
            <div className="welcome w-full flex flex-col md:flex-row text-white overflow-visible">
              <div className="logo-bg-cont h-auto" style={{ width: "21rem" }}>
                <div className="logo-bg"></div>
              </div>
              <div className="py-0 md:py-8 -mt-14 md:mt-0 text-center md:text-left pb-6 px-4 md:px-0">
                <h1 className="uppercase text-4xl letter-spacing-3">
                  SPAWN ABOARD THE ISS GHOUL
                </h1>
                <p className="reg-font max-w-lg py-3">
                  Space Ghoulies is a collection of 10,000 algorithmically
                  unique NFTs on the Solana blockchain. Each ghoulie doubles as
                  your intergalactic passport on the ISS GHOUL, the mothership
                  for all Ghoulies.
                </p>
                <h3 className="uppercase text-2xl letter-spacing-2a">
                  ticket price: 1.5 sol
                </h3>
              </div>
            </div>
            <a
              href="https://discord.gg/SY4tmHx5NC"
              target="_blank"
              className="discord-bubble m-auto mt-24 p-6 px-10"
            >
              <svg
                className="h-auto w-12 md:w-8 mr-5"
                width="71"
                height="55"
                viewBox="0 0 71 55"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clipPath="url(#clip0)">
                  <path
                    d="M60.1045 4.8978C55.5792 2.8214 50.7265 1.2916 45.6527 0.41542C45.5603 0.39851 45.468 0.440769 45.4204 0.525289C44.7963 1.6353 44.105 3.0834 43.6209 4.2216C38.1637 3.4046 32.7345 3.4046 27.3892 4.2216C26.905 3.0581 26.1886 1.6353 25.5617 0.525289C25.5141 0.443589 25.4218 0.40133 25.3294 0.41542C20.2584 1.2888 15.4057 2.8186 10.8776 4.8978C10.8384 4.9147 10.8048 4.9429 10.7825 4.9795C1.57795 18.7309 -0.943561 32.1443 0.293408 45.3914C0.299005 45.4562 0.335386 45.5182 0.385761 45.5576C6.45866 50.0174 12.3413 52.7249 18.1147 54.5195C18.2071 54.5477 18.305 54.5139 18.3638 54.4378C19.7295 52.5728 20.9469 50.6063 21.9907 48.5383C22.0523 48.4172 21.9935 48.2735 21.8676 48.2256C19.9366 47.4931 18.0979 46.6 16.3292 45.5858C16.1893 45.5041 16.1781 45.304 16.3068 45.2082C16.679 44.9293 17.0513 44.6391 17.4067 44.3461C17.471 44.2926 17.5606 44.2813 17.6362 44.3151C29.2558 49.6202 41.8354 49.6202 53.3179 44.3151C53.3935 44.2785 53.4831 44.2898 53.5502 44.3433C53.9057 44.6363 54.2779 44.9293 54.6529 45.2082C54.7816 45.304 54.7732 45.5041 54.6333 45.5858C52.8646 46.6197 51.0259 47.4931 49.0921 48.2228C48.9662 48.2707 48.9102 48.4172 48.9718 48.5383C50.038 50.6034 51.2554 52.5699 52.5959 54.435C52.6519 54.5139 52.7526 54.5477 52.845 54.5195C58.6464 52.7249 64.529 50.0174 70.6019 45.5576C70.6551 45.5182 70.6887 45.459 70.6943 45.3942C72.1747 30.0791 68.2147 16.7757 60.1968 4.9823C60.1772 4.9429 60.1437 4.9147 60.1045 4.8978ZM23.7259 37.3253C20.2276 37.3253 17.3451 34.1136 17.3451 30.1693C17.3451 26.225 20.1717 23.0133 23.7259 23.0133C27.308 23.0133 30.1626 26.2532 30.1066 30.1693C30.1066 34.1136 27.28 37.3253 23.7259 37.3253ZM47.3178 37.3253C43.8196 37.3253 40.9371 34.1136 40.9371 30.1693C40.9371 26.225 43.7636 23.0133 47.3178 23.0133C50.9 23.0133 53.7545 26.2532 53.6986 30.1693C53.6986 34.1136 50.9 37.3253 47.3178 37.3253Z"
                    fill="#ffffff"
                  />
                </g>
                <defs>
                  <clipPath id="clip0">
                    <rect width="71" height="55" fill="white" />
                  </clipPath>
                </defs>
              </svg>
              <b>Join the community on Discord</b>
            </a>
          </div>
        </div>

        <div className="ghoulies-demo mt-4 overflow-hidden">
          <div className="demo-1 flex w-full items-center justify-center space-x-1 pb-1">
            <img className="h-auto w-52" src="/ghoulies/7.png" />
            <img className="h-auto w-52" src="/ghoulies/0.png" />
            <img className="h-auto w-52" src="/ghoulies/464.png" />
            <img className="h-auto w-52" src="/ghoulies/5.png" />
            <img className="h-auto w-52" src="/ghoulies/2.png" />
            <img className="h-auto w-52" src="/ghoulies/4.png" />
            <img className="h-auto w-52" src="/ghoulies/3.png" />
            <img className="h-auto w-52" src="/ghoulies/10.png" />
          </div>
          <div className="demo-2 flex w-full items-center justify-center space-x-1 pl-8 pr-8">
            <img className="h-auto w-52" src="/ghoulies/4.png" />
            <img className="h-auto w-52" src="/ghoulies/6.png" />
            <img className="h-auto w-52" src="/ghoulies/8.png" />
            <img className="h-auto w-52" src="/ghoulies/1.png" />
            <img className="h-auto w-52" src="/ghoulies/7.png" />
            <img className="h-auto w-52" src="/ghoulies/9.png" />
            <img className="h-auto w-52" src="/ghoulies/11.png" />
            <img className="h-auto w-52" src="/ghoulies/443.png" />
            <img className="h-auto w-52" src="/ghoulies/19.png" />
            <img className="h-auto w-52" src="/ghoulies/7.png" />
            <img className="h-auto w-52" src="/ghoulies/2.png" />
          </div>
        </div>

        <div className="dark-bg pb-4 md:pb-12 pt-8 mt-4"></div>

        <div className="welcome-section py-10 text-white relative">
          <div className="inside px-8 md:px-0">
            <div className="flex flex-col md:flex-row items-center">
              <span className="rectangle-frame spec">
                <img className="ship-class" src="/ship.png" />
              </span>
              <div className="w-full md:w-2/3 md:pl-24 leading-5 text-base pt-10 md:pt-0">
                <h2 className="uppercase text-4xl letter-spacing-2">
                  WHAT ARE SPACE GHOULIES?
                </h2>
                <p className="pt-4 reg-font">
                  Space Ghoulies is a collection of 10,000 algorithmically
                  unique NFTs on the Solana blockchain. Each ghoulie doubles as
                  your intergalactic passport aboard the ISS GHOUL, the
                  mothership for all ghoulies.
                </p>
                <br />
                <p className="reg-font">
                  Your ghoulie grants you passenger-only benefits, the first is
                  access to Captain Ralju's Log an ever-evolving lore written by
                  AI regarding the ghoulie's intergalactic DeFi adventures. When
                  all ghoulies have spawned aboard the ISS GHOUL, one holder
                  will be chosen to travel to space.
                </p>
              </div>
            </div>
          </div>
          <img
            className="absolute right-0 h-full w-auto top-0 pointer-events-none"
            src="/effects/b.png"
          />
        </div>

        <div className="dna-section py-10 text-white mt-16 md:mt-24 relative">
          <div className="inside px-8 md:px-0">
            <div className="flex flex-col md:flex-row items-center">
              <div className="w-full md:w-2/3 md:pr-14 leading-5 text-base">
                <h2 className="uppercase text-4xl letter-spacing-2">dna</h2>
                <p className="pt-4 reg-font">
                  Each ghoulie is unique and programmatically generated from
                  over 152 hand-drawn traits including mouth, headwear, eyes,
                  bodies, accessories, and more. All ghoulies are rare but some
                  spawns are more uncommon than others.
                </p>
                <br />
                <p className="reg-font">
                  Ghoulies are stored as SPL tokens on the Solana blockchain and
                  on Arweave. We use QuickNode as our dedicated RPC provider to
                  scale and handle high amounts of traffic without rate limits.
                  We use Candy Machine for our smart contract. Candy Machine
                  helps us and you to have fair mints. This protects us from
                  over collection and pre-launch spawning malfunctions.
                </p>
                <br />
                <a
                  href=""
                  target="_blank"
                  className="font-bold"
                  style={{ color: "#3a8097" }}
                >
                  <p className="reg-font hover:opacity-60">DOCS</p>
                </a>
                <a
                  href="https://github.com/ghoul-keeper/ghoulies"
                  target="_blank"
                  className="font-bold"
                  style={{ color: "#3a8097" }}
                >
                  <p className="reg-font hover:opacity-60">GITHUB REPO</p>
                </a>
                <a
                  target="_blank"
                  className="font-bold"
                  style={{ color: "#3a8097" }}
                >
                  <p className="reg-font">CANDY MACHINE ID COMING SOON...</p>
                </a>
                <br />
                <p className="reg-font">
                  To access passenger-only areas such as the Kensa Korbi,
                  Ghoulie holders will need to be signed in with their{" "}
                  <a
                    href="https://phantom.app/"
                    target="_blank"
                    className="font-bold hover:opacity-60"
                    style={{ color: "#3a8097" }}
                  >
                    Phantom{" "}
                  </a>
                  or
                  <a
                    href="https://www.sollet.io/"
                    target="_blank"
                    className="font-bold hover:opacity-60"
                    style={{ color: "#3a8097" }}
                  >
                    {" "}
                    Sollet{" "}
                  </a>
                  Wallet.
                </p>
              </div>
              <img
                className="w-full md:w-1/3 mt-8 md:mt-0 supa-rounded h-full border-4 border-black"
                src="/ghoulies/202.png"
              />
            </div>
          </div>
          <img
            className="absolute right-0 h-full w-auto top-0 pointer-events-none"
            src="/effects/a.png"
          />
        </div>

        <div
          className="book-ghoulie text-white mt-16 md:mt-24 py-10 relative"
          ref={bookOfGhoulie}
        >
          <div className="inside px-8 md:px-0">
            <div className="flex flex-col md:flex-row items-center">
              <span className="rectangle-frame mt-16 md:mt-0">
                <img className="book-icon" src="/icons/item_book.png" />
              </span>
              <div className="w-full md:w-2/3 md:pl-24 leading-5 text-base pt-12 md:pt-0">
                <h2 className="uppercase text-4xl letter-spacing-2">
                  THE BOOK OF GHOULIE
                </h2>
                <p className="pt-4 reg-font">
                  Following the Fiat Hard Fork, ghoulies were considered misfits
                  by their peers the Fiatbrains because of their belief in DeFi.
                  The ghoulies initially sought asylum on{" "}
                  <a
                    className="font-bold hover:opacity-60"
                    style={{ color: "#3a8097" }}
                    href="https://opensea.io/collection/stinkybinky-collection"
                    target="_blank"
                  >
                    Earthereum
                  </a>
                  . However, due to high gas fees, the ghoulies were forced to
                  venture into unknown parts of the universe.
                </p>
                <br />
                <p className="reg-font">
                  When Captain Ralju discovered these DeFi nomads, the ghoulies
                  were almost out of hope having wandered in space for years
                  without a home galaxy. Captain Ralju, a shadowy super coder
                  and pilot of the ISS GHOUL stumbled upon the Solana Galaxy
                  while in search of low gas fees and spawn latency.
                </p>
                <br />
                <p className="reg-font">
                  Once all 10,000 Ghoulies spawn aboard the ISS GHOUL, a member
                  of the ghoulie family will be designated as the First Friend
                  or "Pamoi Pendo." The Pamoi Pendo will be eligible to travel
                  to intergalactic space in the terrestrial world in 2025.
                </p>
              </div>
            </div>
          </div>
          <img
            className="absolute right-0 h-full w-auto top-0 pointer-events-none"
            src="/effects/c.png"
          />
        </div>

        <div className="all-a-bored text-white mt-16 md:mt-24 py-10 relative">
          <div className="inside px-8 md:px-0">
            <h2 className="uppercase text-3xl md:text-4xl letter-spacing-2">
              ALL A-BORED THE ISS GHOUL
            </h2>
            <br />
            <p className="reg-font">
              Captain Ralju loves making asymmetric bets so when you spawn a
              ghoulie, you're receiving much more than a decentralized avatar or
              provably-rare piece of art. Your ghoulie acts as a non-dilutable
              share in the ISS GHOUL DAO. A governance mechanism for the ship.
            </p>
            <br />
            <blockquote>
              When ghoulies of true value come together for a common purpose and
              speak the truth, great things can result. This is the nature of
              things. - Captain Ralju
            </blockquote>
            <br />
            <p className="reg-font">
              Each ghoulie you hold acts as one vote in the ISS GHOUL DAO and a
              1/10,000 chance to go to space. We're quite literally the cheapest
              ticket to space.
            </p>
            <div className="flex flex-col md:flex-row mt-8 font-medium text-sm text-center space-x-0 md:space-x-5 reg-font">
              <div className="flex items-center md:block mb-10 md:mb-4 w-full md:w-1/5 justify-center md:justify-start">
                <div className="w-1/3 md:w-auto relative">
                  <span className="bg-shad"></span>
                  <img
                    className="hid-small center-img w-16 h-auto md:h-60 md:w-auto pb-4 relative z-10"
                    src="/icons/item_cup.png"
                  />
                  <span className="bg-shad-mobile">
                    <img
                      className="center-img w-16 h-auto md:h-32 md:w-auto z-10 relative"
                      src="/icons/item_cup.png"
                    />
                  </span>
                </div>
                <p className="w-2/4 ml-6 text-left md:text-center md:w-full md:ml-0 pt-0 md:pt-2">
                  10,000 provably-rare Space Ghoulies.
                </p>
              </div>
              <div className="flex items-center md:block mb-10 md:mb-4 w-full md:w-1/5 justify-center md:justify-start">
                <div className="w-1/3 md:w-auto relative">
                  <span className="bg-shad"></span>
                  <img
                    className="hid-small center-img w-16 h-auto md:h-60 md:w-auto pb-4 z-10 relative"
                    src="/icons/item_ipa.png"
                  />
                  <span className="bg-shad-mobile">
                    <img
                      className="center-img w-16 h-auto md:h-32 md:w-auto z-10 relative"
                      src="/icons/item_ipa.png"
                    />
                  </span>
                </div>
                <p className="w-2/4 ml-6 text-left md:text-center md:w-full md:ml-0 pt-0 md:pt-2">
                  Fair launch, fair distribution: All Space Ghoulies cost 1.5
                  SOL.
                </p>
              </div>
              <div className="flex items-center md:block mb-10 md:mb-4 w-full md:w-1/5 justify-center md:justify-start">
                <div className="w-1/3 md:w-auto relative pt-0 md:pt-8">
                  <span className="bg-shad"></span>
                  <img
                    className="hid-small center-img w-24 h-auto md:h-52 md:w-auto pb-4 z-10 relative"
                    src="/icons/item_book.png"
                  />
                  <span className="bg-shad-mobile">
                    <img
                      className="center-img w-24 h-auto md:h-32 md:w-auto z-10 relative"
                      src="/icons/item_book.png"
                    />
                  </span>
                </div>
                <p className="w-2/4 ml-6 text-left md:text-center md:w-full md:ml-0 md:pt-2 pt-0">
                  Ownership and commercial usage rights.
                </p>
              </div>
              <div className="flex items-center md:block mb-10 md:mb-4 w-full md:w-1/5 justify-center md:justify-start">
                <div className="w-1/3 md:w-auto relative pt-0 md:pt-8">
                  <span className="bg-shad" style={{ top: "30px" }}></span>
                  <img
                    className="hid-small center-img w-24 h-auto md:h-44 md:w-auto pb-4 relative z-10"
                    src="/icons/item_pyramid.png"
                  />
                  <span className="bg-shad-mobile">
                    <img
                      className="center-img w-24 h-auto md:h-32 md:w-auto z-10 relative"
                      src="/icons/item_pyramid.png"
                    />
                  </span>
                </div>
                <p className="w-2/4 ml-6 text-left md:text-center md:w-full md:ml-0 pt-0 md:pt-10">
                  Kensa Korbi & Captain Ralju's Log: Tools and lore exclusively
                  for ghoulie holders.
                </p>
              </div>
              <div className="flex items-center md:block w-full md:w-1/5 justify-center md:justify-start">
                <div className="w-1/3 md:w-auto relative pt-0 md:pt-8">
                  <span className="bg-shad" style={{ top: "30px" }}></span>
                  <img
                    className="hid-small center-img w-24 h-auto md:h-44 md:w-auto z-10 relative"
                    src="/icons/item_shuttle.png"
                  />
                  <span className="bg-shad-mobile">
                    <img
                      className="center-img w-24 h-auto md:h-32 md:w-auto z-10 relative"
                      src="/icons/item_shuttle.png"
                    />
                  </span>
                </div>
                <p className="w-2/4 ml-6 text-left md:text-center md:w-full md:ml-0 pt-0 md:pt-10">
                  Space Perspective Flight: one small step for ghoulies, one
                  giant leap for DeFi.
                </p>
              </div>
            </div>
          </div>
          <img
            className="absolute right-0 h-full w-auto top-0 pointer-events-none"
            src="/effects/a.png"
          />
        </div>

        <div
          className="kensa-korbi text-white mt-16 md:mt-24 py-10 relative"
          ref={kensaKorbi}
        >
          <div className="inside px-8 md:px-0">
            <div className="flex flex-col md:flex-row items-center">
              <span className="rectangle-frame">
                <img className="tst-but" src="/icons/item_pyramid.png" />
              </span>
              <div className="w-full md:w-2/3 md:pl-24 leading-5 text-base pt-12 md:pt-0">
                <h2 className="uppercase text-4xl letter-spacing-2">
                  kensa korbi
                </h2>
                <p className="pt-4 reg-font">
                  The Kensa Korbi enables passengers to view all the planets,
                  stars and strange creatures found while zipping through the
                  Solana Galaxy.
                </p>
                <br />
                <p className="reg-font">
                  We're crypto-natives that combined our love for design,
                  software tools, and art to tell the Space Ghoulie story. We
                  want to build the world we want to live in. Rarity charts,
                  dashboards, governance and other software tools are not out of
                  the question for us.
                </p>
                <br />
                <p className="reg-font">
                  From time to time we will put community rewards into the Kensa
                  Korbi ranging from commemorative NFTs to Asteroid Mining
                  Pools.
                </p>
                <br />
                <p className="reg-font">
                  Always be cautious of lurking Fiatbrains as we build this new
                  world.
                </p>
              </div>
            </div>
          </div>
          <img
            className="absolute right-0 h-full w-auto top-0 pointer-events-none"
            src="/effects/c.png"
          />
        </div>

        <div
          className="cap-log py-10 text-white mt-16 md:mt-24 relative"
          ref={capLog}
        >
          <div className="inside px-8 md:px-0">
            <div className="flex flex-col md:flex-row items-center">
              <div className="w-full md:w-2/3 md:pr-20 leading-5 text-base">
                <h2 className="uppercase text-4xl letter-spacing-2">
                  Captain Ralju's Log
                </h2>
                <p className="pt-4 reg-font">
                  Some say Captain Ralju is a droid who became sentient, but the
                  truth is we don't know anything about their origins. Our only
                  insight into their adventures are via their flight journals.
                </p>
                <br />
                <p className="reg-font">
                  The ever-evolving lore exists exclusively for ghoulie holders.
                  Read the flight journal to unlock the secrets of Captain Ralju
                  as they teach us where we came from and where we're going.
                </p>
              </div>

              <span className="rectangle-frame mt-16 md:mt-0">
                <img className="cap-icon" src="/icons/item_hat.png" />
              </span>
            </div>
          </div>
          <img
            className="absolute right-0 h-full w-auto top-0 pointer-events-none"
            src="/effects/a.png"
          />
        </div>

        <div
          className="flight-plan text-white mt-16 md:mt-24 py-4 pb-14 md:pb-4"
          ref={flightPlan}
        >
          <div className="px-0 md:px-36 py-6">
            <div className="flex flex-col md:flex-row items-center">
              <img
                className="w-2/3 md:w-2/5 my-8 md:mt-0 supa-rounded h-full"
                src="/roadmap.png"
              />
              <div className="w-full md:w-2/3 md:pl-12 leading-5 text-base px-8 md:px-0">
                <h2 className="uppercase text-4xl letter-spacing-2">
                  Flight Plan
                </h2>
                <p className="pt-4 reg-font pb-6 pr-16">
                  The recipe of humans, machines, and blockchains has aligned
                  incentives like never before possible in terrestrial society.
                  Our mission is to create an ultra ambitious guild of ghoulie
                  holders who will usher in a paradigm shift of commerce and
                  value aboard the ISS GHOUL.
                </p>
                <div className="flex flex-col md:flex-row letter-spacing-1">
                  <div className="w-full p-0 md:pr-8">
                    <div className="py-4 flex">
                      <span
                        className="pr-12 text-3xl text-shadow"
                        style={{ color: "#A131C7" }}
                      >
                        20%
                      </span>
                      <div>
                        <span className="letter-spacing-2">
                          High-Res Image Files
                        </span>
                        <br />
                        <span className="reg-font">
                          Captain Ralju and the Crew would like to remain
                          anonymous but we'd like you to have full commercial
                          ownership rights to your ghoulies. Sometimes status
                          matters and when you own a ghoulie you own something
                          special. Exploit as needed. Wgmi.
                        </span>
                      </div>
                    </div>
                    <div className="py-4 flex">
                      <span
                        className="pr-12 text-3xl text-shadow"
                        style={{ color: "#A131C7" }}
                      >
                        40%
                      </span>
                      <div>
                        <span className="letter-spacing-2">
                          Terrestrial Economy Unlocked
                        </span>
                        <br />
                        <span className="reg-font">
                          Ghoulies gets a YouTube Channel, Prince Al Ghoul
                          releases a mixtape. 20% of revenue of both will go to
                          the TET (Terrestrial Economy Treasury)[coming soon].
                          The DAO will create and vote on proposals to determine
                          allocation of the funds.
                        </span>
                      </div>
                    </div>
                    <div className="py-4 flex">
                      <span
                        className="pr-12 text-3xl text-shadow"
                        style={{ color: "#A131C7" }}
                      >
                        69%
                      </span>
                      <div>
                        <span className="letter-spacing-2">Kensa Korbi</span>
                        <br />
                        <span className="reg-font">
                          The <b>Kensa Korbi</b> is unlocked and now you will be
                          able to catch a view of the ever changing space-scapes
                          of the Solana Galaxy - look out for commemorative NFT
                          drops and rewards but beware of fiatbrains.
                        </span>
                      </div>
                    </div>
                    <div className="py-4 flex">
                      <span
                        className="pr-12 text-3xl text-shadow"
                        style={{ color: "#A131C7" }}
                      >
                        80%
                      </span>
                      <div>
                        <span className="letter-spacing-2">
                          Captain Ralju's Log
                        </span>
                        <br />
                        <span className="reg-font">
                          Ghoulies can now can read Captain Ralju's Log. Read
                          their documentation for a chance to win one of the
                          five lost ghoulies.
                        </span>
                      </div>
                    </div>
                    <div className="py-4 flex">
                      <span
                        className="pr-8 text-3xl text-shadow"
                        style={{ color: "#A131C7" }}
                      >
                        100%
                      </span>
                      <div>
                        <span className="letter-spacing-2">
                          Space Perspective Flight - Converting the Un-Ghoul
                        </span>
                        <br />
                        <span className="reg-font">
                          The Pamoi Pendo is chosen and sent to outer space in
                          the terrestrial world in order to find and convert the
                          Fiatbrains to the truth of DeFi. The Pamoi Pendo will
                          receive a 1-of-1 mint hand-drawn ghoulie which acts as
                          your ticket to space.
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="fair-spawn text-white mt-16 md:mt-24 py-8 pb-12 md:pb-8">
          <div className="inside px-8 md:px-0">
            <div className="flex flex-col md:flex-row items-center">
              <img
                className="w-2/3 md:w-1/5 supa-rounded h-full mb-10 md:mb-0"
                src="/ghoulies/11.png"
              />
              <div className="w-full md:w-2/3 md:pl-12 leading-5 text-base">
                <h2 className="uppercase text-4xl letter-spacing-2">
                  Fair Spawn
                </h2>
                <p className="pt-2 reg-font">
                  We may have hidden a few easter eggs but there are no bonding
                  curves or price tiers. Each Space Ghoulie costs 1.5 SOL.
                </p>
                <br />
                <p className="reg-font pb-6">
                  1% of spawned ghoulies are withheld from the drop to be used
                  for giveaways, puzzles and for the Crew's passports to spawn
                  aboard the ISS GHOUL.
                </p>
                {/* <a
                  href="https://solanart.io/"
                  target="_blank"
                  className="ghoulie-button"
                >
                  Buy on Solanart
                </a> */}
              </div>
            </div>
          </div>
        </div>

        <div className="the-crew text-white mt-16 md:mt-24 py-8">
          <div className="inside px-8 md:px-0">
            <div className="w-full leading-5 text-base">
              <h2 className="uppercase text-3xl md:text-4xl letter-spacing-2">
                THE CAPTAIN'S CREW
              </h2>
              <p className="pt-2 reg-font">
                Space Ghoulies was created by five internet friends who became
                wanderers in the strange universe of DeFi. We'd like to help
                build the world we want to live in.
              </p>
            </div>
            <div className="flex flex-col md:flex-row items-center justify-between mt-8">
              <div className="flex flex-col items-center">
                <img
                  className="w-7/12 md:w-11/12 supa-rounded h-full border-4 border-black"
                  src="/ghoulies/4.png"
                />
                <a
                  className="uppercase text-sm letter-spacing-1 text-center pt-2 hover:opacity-75"
                  href="https://twitter.com/ghoulareyou"
                  target="_blank"
                >
                  <h3>@Ghoulareyou</h3>
                </a>
                <p className="reg-font text-center pt-2">
                  Always Raiding. Modern-Day Doodler.
                </p>
              </div>
              <div className="flex flex-col items-center mt-8 md:mt-0">
                <img
                  className="w-7/12 md:w-11/12 supa-rounded h-full border-4 border-black"
                  src="/ghoulies/3.png"
                />
                <a
                  className="uppercase text-sm letter-spacing-1 text-center pt-2 hover:opacity-75"
                  href="https://twitter.com/GrouchyGhoulie"
                  target="_blank"
                >
                  <h3>@2Ghoul4School</h3>
                </a>
                <p className="reg-font text-center pt-2">
                  Synth-Wave Simp. Discord Architect.
                </p>
              </div>
              <div className="flex flex-col items-center mt-8 md:mt-0">
                <img
                  className="w-7/12 md:w-11/12 supa-rounded h-full border-4 border-black"
                  src="/ghoulies/202.png"
                />
                <a
                  className="uppercase text-sm letter-spacing-1 text-center pt-2 hover:opacity-75"
                  href="https://twitter.com/ghoul_keeper"
                  target="_blank"
                >
                  <h3>@Ghoul_Keeper</h3>
                </a>
                <p className="reg-font text-center pt-2 w-10/12">
                  Candy Maxi.
                  <br className="hide-on-large" />
                  Not Your Average Dad.
                </p>
              </div>
              <div className="flex flex-col items-center mt-8 md:mt-0">
                <img
                  className="w-7/12 md:w-11/12 supa-rounded h-full border-4 border-black"
                  src="/ghoulies/44.png"
                />
                <a
                  className="uppercase text-sm letter-spacing-1 text-center pt-2 hover:opacity-75"
                  href="https://twitter.com/wb_ghoulie"
                  target="_blank"
                >
                  <h3>@Wooly Bully Ghoulie</h3>
                </a>
                <p className="reg-font text-center pt-2 w-10/12">
                  DeFi Immigrant. Don’t Panic!
                </p>
              </div>
              <div className="flex flex-col items-center mt-8 md:mt-0">
                <img
                  className="w-7/12 md:w-11/12 supa-rounded h-full border-4 border-black"
                  src="/ghoulies/166.png"
                />
                <a
                  className="uppercase text-sm letter-spacing-1 text-center pt-2 hover:opacity-75"
                  href="https://twitter.com/hicryptopete"
                  target="_blank"
                >
                  <h3>@pistolpete</h3>
                </a>
                <p className="reg-font text-center pt-2">
                  Apps To Dapps. Good Vibes Only.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="blur-bg">
          <div className="max-w-7xl mx-auto py-12 px-8 md:px-4 sm:py-16 sm:px-6 lg:px-8">
            <div className="mx-auto">
              <h2 className="uppercase text-left text-3xl md:text-4xl text-white letter-spacing-2 adjust-font">
                Frequently Asked Questions
              </h2>
              <dl className="mt-6 space-y-3">
                {faqs.map((faq) => (
                  <Disclosure
                    as="div"
                    key={faq.question}
                    className="pt-6 faq-item"
                  >
                    {({ open }) => (
                      <>
                        <dt className="text-lg">
                          <Disclosure.Button className="text-left w-full flex justify-between items-start text-white">
                            <span className="text-white text-2xl letter-spacing-1a adjust-font-small">
                              {faq.question}
                            </span>
                            <span className="ml-6 h-7 flex items-center">
                              {open ? (
                                <MinusIcon
                                  className="h-6 w-6"
                                  aria-hidden="true"
                                />
                              ) : (
                                <PlusIcon
                                  className="h-6 w-6"
                                  aria-hidden="true"
                                />
                              )}
                            </span>
                          </Disclosure.Button>
                        </dt>
                        <Disclosure.Panel as="dd" className="mt-2 pr-12">
                          <p className="whitespace-pre-wrap reg-font text-white">
                            {faq.answer}
                          </p>
                          {faq.question ==
                            "HOW DO I SPAWN A GHOULIE ON SOLANA?" ||
                          faq.question == "WHAT IS AN NFT?" ? (
                            <span>
                              <br />
                              <a
                                href=""
                                target="_blank"
                                style={{ color: "#202020" }}
                                className="hover:opacity-60 letter-spacing-2"
                              >
                                Link to docs
                              </a>
                            </span>
                          ) : null}
                        </Disclosure.Panel>
                      </>
                    )}
                  </Disclosure>
                ))}
              </dl>
            </div>
          </div>
        </div>

        <Footer />
      </main>
    </div>
  );
}
