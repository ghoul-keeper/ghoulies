// @ts-nocheck
import Head from "next/head";
import React, { useCallback } from "react";
import { Fragment, useState, useEffect } from "react";
import { Dialog, Menu, Transition } from "@headlessui/react";
import { useDebounce } from "use-debounce";
import dynamic from "next/dynamic";
import {
  CollectionIcon,
  HeartIcon,
  StarIcon,
  MenuAlt1Icon,
  XIcon,
} from "@heroicons/react/outline";
import { SearchIcon } from "@heroicons/react/solid";

import { useWalletNfts } from "@nfteyez/sol-rayz-react";

import GhoulieList from "./../components/GhoulieList";

const WalletProvider = dynamic(
  () => import("../components/ClientWalletProvider"),
  {
    ssr: false,
  }
);

const traits = [
  { name: "Background", href: "#", bgColorClass: "bg-indigo-500" },
  { name: "Environment", href: "#", bgColorClass: "bg-green-500" },
  { name: "Body", href: "#", bgColorClass: "bg-yellow-500" },
  { name: "Eyes", href: "#", bgColorClass: "bg-red-500" },
  { name: "Mouth", href: "#", bgColorClass: "bg-blue-500" },
  { name: "Headgear", href: "#", bgColorClass: "bg-pink-500" },
  { name: "Accessories", href: "#", bgColorClass: "bg-purple-500" },
];

const bgTraits = [
  { name: "Best Grey", href: "#", bgColorClass: "bg-indigo-500" },
  { name: "Bahamas", href: "#", bgColorClass: "bg-indigo-500" },
  { name: "Fav Green", href: "#", bgColorClass: "bg-indigo-500" },
  { name: "Pompus", href: "#", bgColorClass: "bg-indigo-500" },
  { name: "Matilda", href: "#", bgColorClass: "bg-indigo-500" },
  { name: "Bluwu", href: "#", bgColorClass: "bg-indigo-500" },
  { name: "Perry Winkle", href: "#", bgColorClass: "bg-indigo-500" },
  { name: "That One Blue", href: "#", bgColorClass: "bg-indigo-500" },
  { name: "Mint", href: "#", bgColorClass: "bg-indigo-500" },
  { name: "Alien Ant Farm", href: "#", bgColorClass: "bg-indigo-500" },
  { name: "Rusted Root", href: "#", bgColorClass: "bg-indigo-500" },
  { name: "Blowfish", href: "#", bgColorClass: "bg-indigo-500" },
  { name: "Candy Red", href: "#", bgColorClass: "bg-indigo-500" },
  { name: "Sol", href: "#", bgColorClass: "bg-indigo-500" },
];

const envTraits = [
  { name: "None", href: "#", bgColorClass: "bg-green-500" },
  { name: "Bubbles", href: "#", bgColorClass: "bg-green-500" },
  { name: "Galaxy", href: "#", bgColorClass: "bg-green-500" },
  { name: "Snow", href: "#", bgColorClass: "bg-green-500" },
];

const bodyTraits = [
  { name: "Robot", href: "#", bgColorClass: "bg-yellow-500" },
  { name: "Bear", href: "#", bgColorClass: "bg-yellow-500" },
  { name: "Cat", href: "#", bgColorClass: "bg-yellow-500" },
  { name: "Monke", href: "#", bgColorClass: "bg-yellow-500" },
  { name: "Hoodlum", href: "#", bgColorClass: "bg-yellow-500" },
  { name: "Banshee", href: "#", bgColorClass: "bg-yellow-500" },
  { name: "Satyr", href: "#", bgColorClass: "bg-yellow-500" },
  { name: "Punk", href: "#", bgColorClass: "bg-yellow-500" },
  { name: "Zombie", href: "#", bgColorClass: "bg-yellow-500" },
  { name: "Bear Ghost", href: "#", bgColorClass: "bg-yellow-500" },
  { name: "Ghost", href: "#", bgColorClass: "bg-yellow-500" },
  { name: "Robot Gold", href: "#", bgColorClass: "bg-yellow-500" },
  { name: "Bear Gold", href: "#", bgColorClass: "bg-yellow-500" },
  { name: "Cat Gold", href: "#", bgColorClass: "bg-yellow-500" },
  { name: "Brass Monke", href: "#", bgColorClass: "bg-yellow-500" },
  { name: "Hoodlum Gold", href: "#", bgColorClass: "bg-yellow-500" },
  { name: "Banshee Gold", href: "#", bgColorClass: "bg-yellow-500" },
  { name: "Satyr Gold", href: "#", bgColorClass: "bg-yellow-500" },
  { name: "Punk Gold", href: "#", bgColorClass: "bg-yellow-500" },
  { name: "Zombie Gold", href: "#", bgColorClass: "bg-yellow-500" },
  { name: "Bear Rainbow", href: "#", bgColorClass: "bg-yellow-500" },
  { name: "White Ghost", href: "#", bgColorClass: "bg-yellow-500" },
  { name: "Bear Sol", href: "#", bgColorClass: "bg-yellow-500" },
];

const eyesTraits = [
  { name: "Stare", href: "#", bgColorClass: "bg-red-500" },
  { name: "Happi", href: "#", bgColorClass: "bg-red-500" },
  { name: "Derp", href: "#", bgColorClass: "bg-red-500" },
  { name: "Hero", href: "#", bgColorClass: "bg-red-500" },
  { name: "Shades", href: "#", bgColorClass: "bg-red-500" },
  { name: "Do Not Press", href: "#", bgColorClass: "bg-red-500" },
  { name: "Bowie", href: "#", bgColorClass: "bg-red-500" },
  { name: "Key Lime Pie", href: "#", bgColorClass: "bg-red-500" },
  { name: "Spooky", href: "#", bgColorClass: "bg-red-500" },
  { name: "Jaundice", href: "#", bgColorClass: "bg-red-500" },
  { name: "X", href: "#", bgColorClass: "bg-red-500" },
  { name: "Dialated", href: "#", bgColorClass: "bg-red-500" },
  { name: "Burned Out", href: "#", bgColorClass: "bg-red-500" },
  { name: "High", href: "#", bgColorClass: "bg-red-500" },
  { name: "Hung", href: "#", bgColorClass: "bg-red-500" },
  { name: "Laser Red", href: "#", bgColorClass: "bg-red-500" },
  { name: "Laser Gold", href: "#", bgColorClass: "bg-red-500" },
  { name: "CrushCrushCrush", href: "#", bgColorClass: "bg-red-500" },
  { name: "Pain", href: "#", bgColorClass: "bg-red-500" },
  { name: "Hard Forks", href: "#", bgColorClass: "bg-red-500" },
  { name: "Tranquility", href: "#", bgColorClass: "bg-red-500" },
  { name: "Piranhas", href: "#", bgColorClass: "bg-red-500" },
  { name: "Vipers", href: "#", bgColorClass: "bg-red-500" },
  { name: "3D Glasses", href: "#", bgColorClass: "bg-red-500" },
  { name: "Snake", href: "#", bgColorClass: "bg-red-500" },
  { name: "Squish", href: "#", bgColorClass: "bg-red-500" },
  { name: "Three of Diamonds", href: "#", bgColorClass: "bg-red-500" },
  { name: "Filthy Lucre", href: "#", bgColorClass: "bg-red-500" },
];

const mouthTraits = [
  { name: "Snaggletooth", href: "#", bgColorClass: "bg-blue-500" },
  { name: "Good Grin", href: "#", bgColorClass: "bg-blue-500" },
  { name: "Cheshire", href: "#", bgColorClass: "bg-blue-500" },
  { name: "D Smile", href: "#", bgColorClass: "bg-blue-500" },
  { name: "King Vamp", href: "#", bgColorClass: "bg-blue-500" },
  { name: "Drippy Purple", href: "#", bgColorClass: "bg-blue-500" },
  { name: "Purple People Eater", href: "#", bgColorClass: "bg-blue-500" },
  { name: "Ogre", href: "#", bgColorClass: "bg-blue-500" },
  { name: "Gum", href: "#", bgColorClass: "bg-blue-500" },
  { name: "Zim", href: "#", bgColorClass: "bg-blue-500" },
  { name: "Stitch", href: "#", bgColorClass: "bg-blue-500" },
  { name: "Buck", href: "#", bgColorClass: "bg-blue-500" },
  { name: "Yellow Smile", href: "#", bgColorClass: "bg-blue-500" },
  { name: "Sweet Tooth", href: "#", bgColorClass: "bg-blue-500" },
  { name: "Purp", href: "#", bgColorClass: "bg-blue-500" },
  { name: "Toof", href: "#", bgColorClass: "bg-blue-500" },
  { name: "Whimsy", href: "#", bgColorClass: "bg-blue-500" },
  { name: "420", href: "#", bgColorClass: "bg-blue-500" },
  { name: "None", href: "#", bgColorClass: "bg-blue-500" },
  { name: "Smokie", href: "#", bgColorClass: "bg-blue-500" },
  { name: "Smile Slime", href: "#", bgColorClass: "bg-blue-500" },
  { name: "Fish", href: "#", bgColorClass: "bg-blue-500" },
  { name: "Drippy Gold", href: "#", bgColorClass: "bg-blue-500" },
  { name: "Cookie", href: "#", bgColorClass: "bg-blue-500" },
  { name: "One Fang Gold", href: "#", bgColorClass: "bg-blue-500" },
  { name: "Sharp Gold", href: "#", bgColorClass: "bg-blue-500" },
  { name: "Lick", href: "#", bgColorClass: "bg-blue-500" },
  { name: "Buck Gold", href: "#", bgColorClass: "bg-blue-500" },
  { name: "Slurp", href: "#", bgColorClass: "bg-blue-500" },
  { name: "Yellow Tongue", href: "#", bgColorClass: "bg-blue-500" },
  { name: "Pumpkin Bites", href: "#", bgColorClass: "bg-blue-500" },
  { name: "Toast", href: "#", bgColorClass: "bg-blue-500" },
  { name: "Diamond", href: "#", bgColorClass: "bg-blue-500" },
];

const headgearTraits = [
  { name: "None", href: "#", bgColorClass: "bg-pink-500" },
  { name: "Candy Corn", href: "#", bgColorClass: "bg-pink-500" },
  { name: "Diablos", href: "#", bgColorClass: "bg-pink-500" },
  { name: "Einstein", href: "#", bgColorClass: "bg-pink-500" },
  { name: "Crown", href: "#", bgColorClass: "bg-pink-500" },
  { name: "Webbies", href: "#", bgColorClass: "bg-pink-500" },
  { name: "Antennae", href: "#", bgColorClass: "bg-pink-500" },
  { name: "Party Animal", href: "#", bgColorClass: "bg-pink-500" },
  { name: "Candle", href: "#", bgColorClass: "bg-pink-500" },
  { name: "Snaily", href: "#", bgColorClass: "bg-pink-500" },
  { name: "Hari-kiri", href: "#", bgColorClass: "bg-pink-500" },
  { name: "Audiophile", href: "#", bgColorClass: "bg-pink-500" },
  { name: "Gold Horns", href: "#", bgColorClass: "bg-pink-500" },
  { name: "Halo", href: "#", bgColorClass: "bg-pink-500" },
  { name: "Over Easy", href: "#", bgColorClass: "bg-pink-500" },
  { name: "Unicorn", href: "#", bgColorClass: "bg-pink-500" },
  { name: "Potted", href: "#", bgColorClass: "bg-pink-500" },
  { name: "Sailor", href: "#", bgColorClass: "bg-pink-500" },
  { name: "Bloody Scream", href: "#", bgColorClass: "bg-pink-500" },
  { name: "Huntress Mask", href: "#", bgColorClass: "bg-pink-500" },
  { name: "Beak Mask", href: "#", bgColorClass: "bg-pink-500" },
  { name: "Ganja", href: "#", bgColorClass: "bg-pink-500" },
  { name: "Kabuki", href: "#", bgColorClass: "bg-pink-500" },
  { name: "Rainbow Horns", href: "#", bgColorClass: "bg-pink-500" },
  { name: "Pumpkin", href: "#", bgColorClass: "bg-pink-500" },
];

const accessoriesTraits = [
  { name: "None", href: "#", bgColorClass: "bg-purple-500" },
  { name: "Cakey", href: "#", bgColorClass: "bg-purple-500" },
  { name: "Flying Pig", href: "#", bgColorClass: "bg-purple-500" },
  { name: "Crow", href: "#", bgColorClass: "bg-purple-500" },
  { name: "Kitty Charm", href: "#", bgColorClass: "bg-purple-500" },
  { name: "IT", href: "#", bgColorClass: "bg-purple-500" },
  { name: "Coffee", href: "#", bgColorClass: "bg-purple-500" },
  { name: "Super Cape", href: "#", bgColorClass: "bg-purple-500" },
  { name: "Ramsey", href: "#", bgColorClass: "bg-purple-500" },
  { name: "Wings", href: "#", bgColorClass: "bg-purple-500" },
  { name: "UFO", href: "#", bgColorClass: "bg-purple-500" },
  { name: "Dice", href: "#", bgColorClass: "bg-purple-500" },
  { name: "Bat", href: "#", bgColorClass: "bg-purple-500" },
  { name: "Magic Mirror", href: "#", bgColorClass: "bg-purple-500" },
  { name: "Whelpling", href: "#", bgColorClass: "bg-purple-500" },
  { name: "Vine", href: "#", bgColorClass: "bg-purple-500" },
  { name: "Slimy Snek", href: "#", bgColorClass: "bg-purple-500" },
  { name: "Flower Vines", href: "#", bgColorClass: "bg-purple-500" },
  { name: "Snikkity Snek", href: "#", bgColorClass: "bg-purple-500" },
  { name: "Balloons", href: "#", bgColorClass: "bg-purple-500" },
  { name: "Mistweaver", href: "#", bgColorClass: "bg-purple-500" },
  { name: "Diamond Sash", href: "#", bgColorClass: "bg-purple-500" },
];

let getSubTraits = (trait) => {
  if (trait.name == "Background") {
    return bgTraits;
  } else if (trait.name == "Environment") {
    return envTraits;
  } else if (trait.name == "Body") {
    return bodyTraits;
  } else if (trait.name == "Eyes") {
    return eyesTraits;
  } else if (trait.name == "Mouth") {
    return mouthTraits;
  } else if (trait.name == "Headgear") {
    return headgearTraits;
  } else if (trait.name == "Accessories") {
    return accessoriesTraits;
  }
};

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

let subTraitIncluded = (currentFilters, trait, subTrait) => {
  if (currentFilters.filter((e) => e[trait.name]).length > 0) {
    return currentFilters
      .filter((e) => e[trait.name])[0]
      [trait.name].includes(subTrait.name);
  } else {
    return false;
  }
};

let filterAlreadyClickedTrait = (
  trait,
  subTrait,
  currentFilters,
  setCurrentFilters
) => {
  let wasClicked = false;
  let filteredOut = currentFilters
    .filter((e) => e[trait.name])[0]
    [trait.name].filter((f) => {
      if (!wasClicked) {
        wasClicked = f == subTrait.name;
      }

      return f !== subTrait.name;
    });

  let updatedValues;

  if (wasClicked) {
    updatedValues = currentFilters
      .map((e) => {
        if (e[trait.name]) {
          if (filteredOut.length == 0) {
            return null;
          } else {
            return { [trait.name]: filteredOut };
          }
        } else {
          return e;
        }
      })
      .filter((e) => e !== null);
  } else {
    let update = currentFilters.reduce((prevValue, currValue) => {
      if (currValue[trait.name]) {
        let update = currValue[trait.name].concat([subTrait.name]);
        currValue[trait.name] = update;
        return prevValue.concat([currValue]);
      } else {
        return prevValue.concat([currValue]);
      }
    }, []);

    updatedValues = update;
  }

  setCurrentFilters(updatedValues);
};

let getColor = (fl) => {
  let a = traits.find((x) => x["name"] == Object.keys(fl)[0]);
  return a.bgColorClass;
};

let getValues = (fl) => {
  let key = Object.keys(fl)[0];
  return fl[key];
};

let removeFromFilterList = (fl, v, currentFilters, setCurrentFilters) => {
  let key = Object.keys(fl)[0];
  let updated = currentFilters.map((fil) => {
    if (fil[key]) {
      return { [key]: fl[key].filter((b) => b !== v) };
    } else {
      return fil;
    }
  });
  setCurrentFilters(updated);
  return;
};

export default function Rarity() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentPage, setCurrentPage_0] = useState("top-100");
  const [openSubTrait, setOpenSubTrait] = useState("");
  const [currentFilters, setCurrentFilters] = useState([]);
  const [inputField, setInputField] = useState("");
  const [ghoulieField] = useDebounce(inputField, 500);
  const [wallet, setWallet] = useState(null);
  const [connection, setConnection] = useState(null);

  let setCurrentPage = (page) => {
    window.location.hash = page;
    setCurrentPage_0(page);
  };

  let passPropsUp = (incWallet, incConnection) => {
    setWallet(incWallet);
    setConnection(incConnection);
  };

  const { nfts, isLoading, error } = useWalletNfts({
    publicAddress: wallet?.publicKey?.toBase58(),
    connection: connection,
    sanitize: true,
    strictNftStandard: false,
    stringifyPubKeys: true,
    sort: true,
  });

  useEffect(() => {
    var searchParams = new URLSearchParams(window.location.search);

    let filtersWithoutEmptyArrays = currentFilters.filter((f) => {
      let keys = Object.keys(f);

      return !keys
        .map((key) => {
          return f[key].length > 0;
        })
        .includes(false);
    });

    let result = filtersWithoutEmptyArrays.map((cFilter) => {
      let key = Object.keys(cFilter)[0];
      let filterValues = cFilter[key];

      return key + "=" + filterValues.join(",");
    });

    for (var key of searchParams.keys()) {
      let k = key;

      let included = result
        .map((r) => {
          return r.includes(k);
        })
        .includes(true);

      if (!included) {
        searchParams.delete(k);

        var newRelativePathQuery =
          window.location.pathname +
          "?" +
          searchParams.toString() +
          window.location.hash;

        history.pushState(null, "", newRelativePathQuery);
      }
    }

    if (result.length == 0) {
      var newRelativePathQuery =
        window.location.pathname + window.location.hash;
      history.pushState(null, "", newRelativePathQuery);
    } else {
      result.forEach((r) => {
        let key = r.split("=")[0];
        let value = r.split("=")[1];

        searchParams.set(key, encodeURIComponent(value));

        var newRelativePathQuery =
          window.location.pathname +
          "?" +
          searchParams.toString() +
          window.location.hash;
        history.pushState(null, "", newRelativePathQuery);
      });
    }
  }, [currentFilters]);

  useEffect(() => {
    // next tick
    setTimeout(() => {
      const urlSearchParams = new URLSearchParams(window.location.search);
      const params = Object.fromEntries(urlSearchParams.entries());

      let keys = Object.keys(params);

      let filtersToSet = keys.map((key) => {
        let valuesStr = decodeURIComponent(params[key]);

        let values = valuesStr.split(",");

        return { [key]: values };
      });

      setCurrentFilters(filtersToSet);
    }, 500);
  }, []);

  useEffect(() => {
    let hash = window.location.hash.split("#")[1];

    if (window.location.hash == "") {
      setCurrentPage("top-100");
    } else {
      if (hash == "my-ghoulies" && !wallet) {
        setCurrentPage("top-100");
      } else {
        if (
          hash == "top-100" ||
          hash == "all-traits" ||
          hash == "all-ghoulies" ||
          hash == "my-ghoulies"
        ) {
          setCurrentPage(hash);
        }
      }
    }
  });

  useEffect(() => {
    document.querySelector("body").classList.add("h-full");
    document.querySelector("body").classList.add("overflow-hidden");
    document.querySelector("html").classList.add("h-full");
    document.querySelector("html").classList.add("bg-white");
    document.getElementById("__next").classList.add("h-full");
    document.getElementById("r").classList.add("h-full");
  });

  return (
    <div className="h-full">
      <Head>
        <title>Ghoulie Gang | Solana | NFT</title>
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
        <script type="text/javascript" src="/static/check_class.js"></script>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta
          name="description"
          content="Ghoulie Gang is a multi-season generative collection of 7,500 unique NFTs on the Solana blockchain. Creepy, weird, and unique just like each one of us. Spawn a Ghoulie to be be part of the Gang."
        />
        <meta name="keywords" content="Solana, Blockchain, NFT" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@GhouliesNFT" />
        <meta name="twitter:title" content="Ghoulie Gang | Solana | NFT" />
        <meta
          name="twitter:description"
          content="Ghoulie Gang is a multi-season generative collection of 7,500 unique NFTs on the Solana blockchain. Creepy, weird, and unique just like each one of us. Spawn a Ghoulie to be be part of the Gang."
        />
        <meta name="twitter:creator" content="@GhouliesNFT" />
        <meta
          name="twitter:image"
          content="https://www.ghouliegang.io/share-img.png"
        />
        <meta property="og:title" content="Ghoulie Gang | Solana | NFT" />
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
      <div className="h-full flex">
        <Transition.Root show={sidebarOpen} as={Fragment}>
          <Dialog
            as="div"
            className="fixed inset-0 flex z-40 lg:hidden"
            onClose={setSidebarOpen}
          >
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-gray-600 bg-opacity-75" />
            </Transition.Child>
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <div
                className="relative flex-1 flex flex-col max-w-xs w-full pt-5 pb-4"
                style={{ backgroundColor: "#031423" }}
              >
                <Transition.Child
                  as={Fragment}
                  enter="ease-in-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in-out duration-300"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="absolute top-0 right-0 -mr-12 pt-2">
                    <button
                      type="button"
                      className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                      onClick={() => setSidebarOpen(false)}
                    >
                      <span className="sr-only">Close sidebar</span>
                      <XIcon
                        className="h-6 w-6 text-white"
                        aria-hidden="true"
                      />
                    </button>
                  </div>
                </Transition.Child>
                <div className="flex-shrink-0 flex items-center px-4 w-full justify-center">
                  <a className="hover:opacity-60" href="/">
                    <img
                      className="h-20 w-auto hover:opacity-60"
                      src="/ghoulie-gang-logo.png"
                    />
                  </a>
                </div>
                <div className="mt-5 flex-1 h-0 overflow-y-auto">
                  <nav className="px-2">
                    <div className="space-y-1"></div>
                    <div className="mt-8">
                      {currentFilters.map((fl) => (
                        <div
                          key={"g_" + Object.keys(fl)[0]}
                          className="flex flex-wrap"
                        >
                          {getValues(fl).map((v) => {
                            return (
                              <span key={"w_" + v}>
                                <a
                                  onClick={() =>
                                    removeFromFilterList(
                                      fl,
                                      v,
                                      currentFilters,
                                      setCurrentFilters
                                    )
                                  }
                                  key={v}
                                  className={
                                    "cursor-pointer letter-spacing-1 group flex items-center px-2 py-2 text-sm font-medium text-white rounded-md r-nav-n"
                                  }
                                >
                                  <span
                                    key={"p_" + v}
                                    className={classNames(
                                      "truncate rounded-full p-2 px-4",
                                      getColor(fl)
                                    )}
                                  >
                                    {v}
                                  </span>
                                </a>
                              </span>
                            );
                          })}
                        </div>
                      ))}
                      <h3
                        className="mt-4 px-3 text-xs font-semibold text-white uppercase tracking-wider letter-spacing-1a flex justify-between"
                        id="mobile-headline"
                      >
                        Filter Traits{" "}
                        <a
                          className="text-gray-400 text-xs cursor-pointer hover:opacity-60"
                          onClick={() => {
                            setOpenSubTrait("");
                            setCurrentFilters([]);
                          }}
                        >
                          Reset
                        </a>
                      </h3>
                      <div
                        className="mt-1 space-y-1"
                        role="group"
                        aria-labelledby="desktop-teams-headline"
                      >
                        {traits.map((trait) => (
                          <span
                            key={"2_" + trait.name}
                            className="flex flex-col cursor-pointer"
                          >
                            <a
                              key={trait.name}
                              onClick={() => {
                                openSubTrait == trait.name
                                  ? setOpenSubTrait("")
                                  : setOpenSubTrait(trait.name);
                              }}
                              className={
                                "letter-spacing-1 group flex items-center px-3 py-2 text-sm font-medium text-white rounded-md"
                              }
                            >
                              <span
                                key={"0_" + trait.name}
                                className={classNames(
                                  trait.bgColorClass,
                                  "w-2.5 h-2.5 mr-3 rounded-full"
                                )}
                                aria-hidden="true"
                              />
                              <span
                                key={"1_" + trait.name}
                                className="pl-0.5 truncate"
                              >
                                {trait.name}
                              </span>
                            </a>
                            {openSubTrait == trait.name ? (
                              <ul className="w-2/3 self-center">
                                {getSubTraits(trait).map((subTrait) => {
                                  return (
                                    <li
                                      className="cursor-pointer"
                                      key={subTrait.name}
                                    >
                                      <a
                                        key={subTrait.name}
                                        onClick={() => {
                                          currentFilters.filter(
                                            (e) => e[trait.name]
                                          ).length > 0
                                            ? filterAlreadyClickedTrait(
                                                trait,
                                                subTrait,
                                                currentFilters,
                                                setCurrentFilters
                                              )
                                            : setCurrentFilters(
                                                currentFilters.concat([
                                                  {
                                                    [trait.name]: [
                                                      subTrait.name,
                                                    ],
                                                  },
                                                ])
                                              );
                                        }}
                                        className={classNames(
                                          "select-none my-2 letter-spacing-1 group flex items-center px-3 py-2 text-sm font-medium text-white rounded-md",
                                          subTraitIncluded(
                                            currentFilters,
                                            trait,
                                            subTrait
                                          )
                                            ? "r-nav"
                                            : ""
                                        )}
                                      >
                                        <span
                                          key={"0_" + subTrait.name}
                                          className={classNames(
                                            subTrait.bgColorClass,
                                            "w-2.5 h-2.5 mr-3 rounded-full"
                                          )}
                                          aria-hidden="true"
                                        />
                                        <span
                                          key={"1_" + subTrait.name}
                                          className="pl-0.5 truncate"
                                        >
                                          {subTrait.name}
                                        </span>
                                      </a>
                                    </li>
                                  );
                                })}
                              </ul>
                            ) : null}
                          </span>
                        ))}
                      </div>
                    </div>
                  </nav>
                </div>
              </div>
            </Transition.Child>
            <div className="flex-shrink-0 w-14" aria-hidden="true"></div>
          </Dialog>
        </Transition.Root>

        <div className="hidden lg:flex lg:flex-shrink-0">
          <div
            className="flex flex-col w-64 pt-5 pb-4"
            style={{ backgroundColor: "#031423" }}
          >
            <div className="flex items-center flex-shrink-0 px-6 justify-center">
              <a className="hover:opacity-60" href="/">
                <img
                  className="h-20 w-auto hover:opacity-60"
                  src="/ghoulie-gang-logo.png"
                />
              </a>
            </div>
            <div className="mt-6 h-0 flex-1 flex flex-col overflow-y-auto">
              <div className="px-3">
                <label htmlFor="search" className="sr-only">
                  Search
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div
                    className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
                    aria-hidden="true"
                  >
                    <SearchIcon
                      className="mr-3 h-4 w-4 text-gray-400"
                      aria-hidden="true"
                    />
                  </div>
                  <input
                    value={inputField}
                    onChange={(e) => setInputField(e.target.value)}
                    type="text"
                    name="search"
                    id="search"
                    className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-9 sm:text-sm border-gray-300 rounded-md py-2 letter-spacing-1"
                    placeholder="Ghoulie #0333"
                  />
                  {inputField !== "" ? (
                    <div
                      className="absolute inset-y-0 right-0 pl-3 flex items-center cursor-pointer z-30"
                      aria-hidden="true"
                    >
                      <XIcon
                        onClick={() => setInputField("")}
                        className="w-8 h-8 text-gray-400 cursor-pointer hover:opacity-60"
                      />
                    </div>
                  ) : null}
                </div>
              </div>
              <nav className="px-3 mt-6">
                <div className="space-y-1">
                  <a
                    onClick={() => setCurrentPage("top-100")}
                    className={classNames(
                      "letter-spacing-1 text-white group flex items-center px-2 py-2 text-sm font-medium rounded-md cursor-pointer r-nav-n",
                      currentPage == "top-100" ? "r-nav" : "bg-transparent"
                    )}
                  >
                    <StarIcon
                      className={classNames("mr-3 flex-shrink-0 h-6 w-6")}
                      aria-hidden="true"
                    />
                    Top 100 Ghoulies
                  </a>
                  {/* <a
                    onClick={() => setCurrentPage("all-traits")}
                    className={classNames(
                      "letter-spacing-1 text-white group flex items-center px-2 py-2 text-sm font-medium rounded-md cursor-pointer r-nav-n",
                      currentPage == "all-traits" ? "r-nav" : "bg-transparent"
                    )}
                  >
                    <SparklesIcon
                      className={classNames("mr-3 flex-shrink-0 h-6 w-6")}
                      aria-hidden="true"
                    />
                    All Trait Counts
                  </a> */}
                  <a
                    onClick={() => setCurrentPage("all-ghoulies")}
                    className={classNames(
                      "letter-spacing-1 text-white group flex items-center px-2 py-2 text-sm font-medium rounded-md cursor-pointer r-nav-n",
                      currentPage == "all-ghoulies" ? "r-nav" : "bg-transparent"
                    )}
                  >
                    <CollectionIcon
                      className={classNames("mr-3 flex-shrink-0 h-6 w-6")}
                      aria-hidden="true"
                    />
                    All Ghoulies
                  </a>
                  <a
                    onClick={() => {
                      if (wallet) {
                        setCurrentPage("my-ghoulies");
                      }
                    }}
                    className={classNames(
                      "letter-spacing-1 text-white group flex items-center px-2 py-2 text-sm font-medium rounded-md r-nav-n",
                      currentPage == "my-ghoulies" ? "r-nav" : "bg-transparent",
                      !wallet ? "cursor-not-allowed" : "cursor-pointer"
                    )}
                  >
                    <HeartIcon
                      className={classNames("mr-3 flex-shrink-0 h-6 w-6")}
                      aria-hidden="true"
                    />
                    My Ghoulies
                  </a>
                  <a id="r-wp">
                    <WalletProvider passPropsUp={passPropsUp} rarity={true} />
                  </a>
                </div>
                <div className="mt-8">
                  {currentFilters.map((fl) => (
                    <div
                      key={"ll_" + Object.keys(fl)[0]}
                      className="flex flex-wrap"
                    >
                      {getValues(fl).map((v) => {
                        return (
                          <span key={"a_" + v}>
                            <a
                              onClick={() =>
                                removeFromFilterList(
                                  fl,
                                  v,
                                  currentFilters,
                                  setCurrentFilters
                                )
                              }
                              key={v}
                              className={
                                "cursor-pointer letter-spacing-1 group flex items-center px-2 py-2 text-sm font-medium text-white rounded-md r-nav-n"
                              }
                            >
                              <span
                                key={"b_" + v}
                                className={classNames(
                                  "truncate rounded-full p-2 px-4",
                                  getColor(fl)
                                )}
                              >
                                {v}
                              </span>
                            </a>
                          </span>
                        );
                      })}
                    </div>
                  ))}
                  <h3
                    className="mt-4 px-3 text-xs font-semibold text-white uppercase tracking-wider letter-spacing-1a flex justify-between"
                    id="desktop-teams-headline"
                  >
                    Filter Traits{" "}
                    <a
                      className="text-gray-400 text-xs cursor-pointer hover:opacity-60"
                      onClick={() => {
                        setOpenSubTrait("");
                        setCurrentFilters([]);
                      }}
                    >
                      Reset
                    </a>
                  </h3>
                  <div
                    className="mt-1 space-y-1"
                    role="group"
                    aria-labelledby="desktop-teams-headline"
                  >
                    {traits.map((trait) => (
                      <span
                        key={"2_" + trait.name}
                        className="flex flex-col cursor-pointer"
                      >
                        <a
                          key={trait.name}
                          onClick={() => {
                            openSubTrait == trait.name
                              ? setOpenSubTrait("")
                              : setOpenSubTrait(trait.name);
                          }}
                          className={
                            "select-none letter-spacing-1 group flex items-center px-3 py-2 text-sm font-medium text-white rounded-md r-nav-n"
                          }
                        >
                          <span
                            key={"0_" + trait.name}
                            className={classNames(
                              trait.bgColorClass,
                              "w-2.5 h-2.5 mr-3 rounded-full"
                            )}
                            aria-hidden="true"
                          />
                          <span
                            key={"1_" + trait.name}
                            className="pl-0.5 truncate"
                          >
                            {trait.name}
                          </span>
                        </a>
                        {openSubTrait == trait.name ? (
                          <ul className="w-2/3 self-center">
                            {getSubTraits(trait).map((subTrait) => {
                              return (
                                <li
                                  className="cursor-pointer"
                                  key={subTrait.name}
                                >
                                  <a
                                    key={subTrait.name}
                                    onClick={() => {
                                      currentFilters.filter(
                                        (e) => e[trait.name]
                                      ).length > 0
                                        ? filterAlreadyClickedTrait(
                                            trait,
                                            subTrait,
                                            currentFilters,
                                            setCurrentFilters
                                          )
                                        : setCurrentFilters(
                                            currentFilters.concat([
                                              { [trait.name]: [subTrait.name] },
                                            ])
                                          );
                                    }}
                                    className={classNames(
                                      "select-none my-2 letter-spacing-1 group flex items-center px-3 py-2 text-sm font-medium text-white rounded-md r-nav-n",
                                      subTraitIncluded(
                                        currentFilters,
                                        trait,
                                        subTrait
                                      )
                                        ? "r-nav"
                                        : ""
                                    )}
                                  >
                                    <span
                                      key={"0_" + subTrait.name}
                                      className={classNames(
                                        subTrait.bgColorClass,
                                        "w-2.5 h-2.5 mr-3 rounded-full"
                                      )}
                                      aria-hidden="true"
                                    />
                                    <span
                                      key={"1_" + subTrait.name}
                                      className="pl-0.5 truncate"
                                    >
                                      {subTrait.name}
                                    </span>
                                  </a>
                                </li>
                              );
                            })}
                          </ul>
                        ) : null}
                      </span>
                    ))}
                  </div>
                </div>
              </nav>
            </div>
          </div>
        </div>
        <div className="flex flex-col w-0 flex-1 overflow-hidden">
          <div className="relative z-10 flex-shrink-0 flex h-16 bg-white border-b border-gray-200 lg:hidden">
            <button
              type="button"
              className="px-4 border-r border-gray-200 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-purple-500 lg:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <span className="sr-only">Open sidebar</span>
              <MenuAlt1Icon className="h-6 w-6" aria-hidden="true" />
            </button>
            <div className="flex-1 flex justify-between px-4 sm:px-6 lg:px-8">
              <div className="flex-1 flex">
                <label htmlFor="search-field" className="sr-only">
                  Search
                </label>
                <div className="relative w-full text-gray-400 focus-within:text-gray-600">
                  <div className="absolute inset-y-0 left-0 flex items-center pointer-events-none">
                    <SearchIcon className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <input
                    value={inputField}
                    onChange={(e) => setInputField(e.target.value)}
                    id="search"
                    name="search"
                    className="block w-full h-full pl-8 pr-3 py-2 border-transparent text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-0 focus:border-transparent focus:placeholder-gray-400 sm:text-sm"
                    placeholder="Ghoulie #0333"
                    type="text"
                  />
                  {inputField !== "" ? (
                    <div
                      className="absolute inset-y-0 right-0 pl-3 flex items-center cursor-pointer z-30"
                      aria-hidden="true"
                    >
                      <XIcon
                        onClick={() => setInputField("")}
                        className="w-8 h-8 text-gray-400 cursor-pointer hover:opacity-60"
                      />
                    </div>
                  ) : null}
                </div>
              </div>
              <div className="flex items-center">
                <Menu as="div" className="ml-3 relative">
                  <div>
                    <Menu.Button className="max-w-xs bg-white flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500">
                      <span className="sr-only">Open user menu</span>
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-200 focus:outline-none">
                      <div className="py-1">
                        <Menu.Item>
                          {({ active }) => (
                            <a
                              href="#"
                              className={classNames(
                                active
                                  ? "bg-gray-100 text-gray-900"
                                  : "text-gray-700",
                                "block px-4 py-2 text-sm"
                              )}
                            >
                              View profile
                            </a>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <a
                              href="#"
                              className={classNames(
                                active
                                  ? "bg-gray-100 text-gray-900"
                                  : "text-gray-700",
                                "block px-4 py-2 text-sm"
                              )}
                            >
                              Settings
                            </a>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <a
                              href="#"
                              className={classNames(
                                active
                                  ? "bg-gray-100 text-gray-900"
                                  : "text-gray-700",
                                "block px-4 py-2 text-sm"
                              )}
                            >
                              Notifications
                            </a>
                          )}
                        </Menu.Item>
                      </div>
                      <div className="py-1">
                        <Menu.Item>
                          {({ active }) => (
                            <a
                              href="#"
                              className={classNames(
                                active
                                  ? "bg-gray-100 text-gray-900"
                                  : "text-gray-700",
                                "block px-4 py-2 text-sm"
                              )}
                            >
                              Get desktop app
                            </a>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <a
                              href="#"
                              className={classNames(
                                active
                                  ? "bg-gray-100 text-gray-900"
                                  : "text-gray-700",
                                "block px-4 py-2 text-sm"
                              )}
                            >
                              Support
                            </a>
                          )}
                        </Menu.Item>
                      </div>
                      <div className="py-1">
                        <Menu.Item>
                          {({ active }) => (
                            <a
                              href="#"
                              className={classNames(
                                active
                                  ? "bg-gray-100 text-gray-900"
                                  : "text-gray-700",
                                "block px-4 py-2 text-sm"
                              )}
                            >
                              Logout
                            </a>
                          )}
                        </Menu.Item>
                      </div>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>
          <main
            className="flex-1 relative z-0 overflow-y-auto focus:outline-none"
            style={{ backgroundColor: "#194051" }}
          >
            <div className="border-b border-gray-200 px-6 py-4 sm:flex sm:items-center sm:justify-between sm:px-6 lg:px-8">
              <div className="flex-1 min-w-0">
                <h1 className="text-lg font-medium leading-6 text-white sm:truncate letter-spacing-1">
                  Rarity - How Rare Is My Ghoulie?
                </h1>
              </div>
            </div>

            <div className="py-2 sm:hidden border-b border-gray-200">
              <div className="px-4 sm:px-6">
                <a
                  onClick={() => setCurrentPage("top-100")}
                  className={classNames(
                    "letter-spacing-1 text-white group flex items-center px-2 py-2 text-sm font-medium rounded-md cursor-pointer r-nav-n",
                    currentPage == "top-100" ? "r-nav" : "bg-transparent"
                  )}
                >
                  <StarIcon
                    className={classNames("mr-3 flex-shrink-0 h-6 w-6")}
                    aria-hidden="true"
                  />
                  Top 100 Ghoulies
                </a>
                <a
                  onClick={() => setCurrentPage("all-ghoulies")}
                  className={classNames(
                    "letter-spacing-1 text-white group flex items-center px-2 py-2 text-sm font-medium rounded-md cursor-pointer r-nav-n",
                    currentPage == "all-ghoulies" ? "r-nav" : "bg-transparent"
                  )}
                >
                  <CollectionIcon
                    className={classNames("mr-3 flex-shrink-0 h-6 w-6")}
                    aria-hidden="true"
                  />
                  All Ghoulies
                </a>
                <a
                  onClick={() => {
                    if (wallet) {
                      setCurrentPage("my-ghoulies");
                    }
                  }}
                  className={classNames(
                    "letter-spacing-1 text-white group flex items-center px-2 py-2 text-sm font-medium rounded-md r-nav-n",
                    currentPage == "my-ghoulies" ? "r-nav" : "bg-transparent",
                    !wallet ? "cursor-not-allowed" : "cursor-pointer"
                  )}
                >
                  <HeartIcon
                    className={classNames("mr-3 flex-shrink-0 h-6 w-6")}
                    aria-hidden="true"
                  />
                  My Ghoulies
                </a>
                <a id="r-wp-mob">
                  <WalletProvider passPropsUp={passPropsUp} rarity={true} />
                </a>
              </div>
            </div>

            <div className="py-6 px-0 md:p-6 md:pl-8">
              <GhoulieList
                ghoulieField={ghoulieField}
                filters={currentFilters}
                myGhoulies={nfts}
              />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
