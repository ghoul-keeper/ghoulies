import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useWallet } from "@solana/wallet-adapter-react";
import React, { FC, Fragment } from "react";
import { Popover, Transition } from "@headlessui/react";
import { MenuIcon, XIcon } from "@heroicons/react/outline";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const menuItems = [
  {
    name: "Spawn a ghoulie",
    href: "#spawn-a-ghoulie",
  },
  {
    name: "Roadmap",
    href: "#roadmap",
  },
  {
    name: "Docs",
    href: "",
  },
  {
    name: "Kensa Korbi",
    href: "#kensa-korbi",
  },
  {
    name: "Captain's Log",
    href: "#captains-log",
  },
  {
    name: "Provenance",
    href: "/provenance",
  },
];

const NavOnHomePage = (props) => {
  return (
    <Popover.Group
      as="nav"
      className="hidden md:flex space-x-6 items-center text-white uppercase"
    >
      <a
        href="#spawn-a-ghoulie"
        onClick={(e) => {
          props.scrollObject.spawnAGhoulie();
        }}
        className="text-sm na-hov"
      >
        Spawn a Ghoulie
      </a>
      <a
        href="#roadmap"
        onClick={(e) => {
          props.scrollObject.roadmap();
        }}
        className="text-sm na-hov"
      >
        Roadmap
      </a>
      <a href="" target="_blank" className="text-sm na-hov">
        Docs
      </a>
      <a
        href="#kensa-korbi"
        onClick={(e) => {
          props.scrollObject.kensaKorbi();
        }}
        className="text-sm na-hov"
      >
        Kensa Korbi
      </a>
      <a
        href="#captains-log"
        onClick={(e) => {
          props.scrollObject.captainsLog();
        }}
        className="text-sm na-hov"
      >
        Captain's log
      </a>
      <a href="/provenance" className="text-sm na-hov">
        Provenance
      </a>
      <WalletMultiButton
        className="rounded-md text-base border border-transparent font-medium text-white gg-but"
        style={{ backgroundColor: "#3E849B" }}
      />
    </Popover.Group>
  );
};

const NavOnProvenancePage = (props) => {
  return (
    <Popover.Group
      as="nav"
      className="hidden md:flex space-x-6 items-center text-white uppercase"
    >
      <a href="/home#spawn-a-ghoulie" className="text-sm na-hov">
        Spawn a Ghoulie
      </a>
      <a href="/home#roadmap" className="text-sm na-hov">
        Roadmap
      </a>
      <a href="" target="_blank" className="text-sm na-hov">
        Docs
      </a>
      <a href="/home#kensa-korbi" className="text-sm na-hov">
        Kensa Korbi
      </a>
      <a href="/home#captains-log" className="text-sm na-hov">
        Captain's log
      </a>
      <a
        href="/provenance"
        className="text-sm prov-hov"
        style={{ color: "#3e849b" }}
      >
        Provenance
      </a>
      <WalletMultiButton
        className="rounded-md text-base border border-transparent font-medium text-white gg-but"
        style={{ backgroundColor: "#3E849B" }}
      />
    </Popover.Group>
  );
};

const Navigation = (props) => {
  const { wallet } = useWallet();
  let url = typeof window !== "undefined" ? window.location.href : "";
  let isHomePage = url.includes("home");
  let scrollObject = props.objectOfScrolls;

  return (
    <div>
      <div className="w-full md:w-auto">
        <Popover className="relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="flex justify-end items-center border-b border-indigo-400 border-opacity-25 py-6 md:justify-start md:space-x-10">
              <div className="md:hidden">
                <Popover.Button
                  style={{ backgroundColor: "rgb(62, 132, 155)" }}
                  className="rounded-md p-2 inline-flex items-center justify-center text-white hover:text-indigo-300 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                >
                  <span className="sr-only">Open menu</span>
                  <MenuIcon className="h-6 w-6" aria-hidden="true" />
                </Popover.Button>
              </div>
              {props.onProvenancePage ? (
                <NavOnProvenancePage />
              ) : (
                <NavOnHomePage scrollObject={scrollObject} />
              )}
            </div>
          </div>

          <Transition
            as={Fragment}
            enter="duration-200 ease-out"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="duration-100 ease-in"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Popover.Panel
              focus
              className="absolute z-10 top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden"
            >
              {({ close }) => (
                <div className="rounded-md shadow-lg bg-black ring-1 ring-black ring-opacity-5 divide-y-2 divide-gray-50 border-2">
                  <div className="pt-5 pb-6 px-5 space-y-6">
                    <div className="items-center grid justify-center grid-cols-3 grid-rows-1">
                      <span></span>
                      <WalletMultiButton
                        className="rounded-md text-base border border-transparent font-medium text-white gg-but"
                        style={{
                          backgroundColor: "#3E849B",
                          marginLeft: "15px",
                        }}
                      />
                      <div className="flex justify-end">
                        <Popover.Button
                          style={{
                            backgroundColor: "rgb(62, 132, 155)",
                          }}
                          className="rounded-md p-2 inline-flex items-center justify-center text-white hover:text-gray-400 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                        >
                          <span className="sr-only">Close menu</span>
                          <XIcon className="h-6 w-6" aria-hidden="true" />
                        </Popover.Button>
                      </div>
                    </div>
                    <div className="mt-6">
                      <nav className="grid gap-y-8">
                        {menuItems.map((item) => (
                          <a
                            key={item.name}
                            href={item.href}
                            target="{{item.name == 'Docs' ? '_blank' : '_self'}}"
                            onClick={(e) => {
                              if (item.href == "#kensa-korbi") {
                                close();
                                scrollObject.kensaKorbi();
                              } else if (item.href == "#spawn-a-ghoulie") {
                                close();
                                scrollObject.spawnAGhoulie();
                              } else if (item.href == "#captains-log") {
                                close();
                                scrollObject.captainsLog();
                              } else if (item.href == "#roadmap") {
                                close();
                                scrollObject.roadmap();
                              }
                            }}
                            className="-m-3 p-3 flex items-center justify-center rounded-md nav-hov"
                          >
                            <span className="ml-3 text-base font-medium text-white uppercase">
                              {item.name}
                            </span>
                          </a>
                        ))}
                      </nav>
                    </div>
                  </div>
                </div>
              )}
            </Popover.Panel>
          </Transition>
        </Popover>
      </div>
    </div>
  );
};

export default Navigation;
