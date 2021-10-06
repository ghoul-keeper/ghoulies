import React from "react";
import { elastic as Menu } from "react-burger-menu";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Navigation = (props) => {
  return (
    <div id="outer-container">
      <Menu
        onOpen={() => props.setIsOpen(true)}
        onClose={() => props.setIsOpen(false)}
        disableAutoFocus
        right
        pageWrapId={"page-wrap"}
        outerContainerId={"outer-container"}
        customBurgerIcon={<img src="/hamburger-menu.png" />}
        isOpen={props.isOpen}
      >
        <main id="page-wrap">
          <a id="home" className="menu-item" href="/">
            Spawn a Ghoulie
          </a>
          <a
            onClick={() => {
              props.setIsOpen(false);
            }}
            id="book-of-ghoulie"
            className="pt-4 menu-item"
            href="#book-of-ghoulie"
          >
            Book of Ghoulie
          </a>
          <a
            onClick={() => props.setIsOpen(false)}
            id="docs"
            className="pt-4 menu-item"
            href=""
            target="_blank"
          >
            Docs(coming soon)
          </a>
          <a
            onClick={() => props.setIsOpen(false)}
            id="kensa-korbi"
            className="pt-4 menu-item"
            href="#kensa-korbi"
          >
            Kensa Korbi
          </a>
          <a
            onClick={() => props.setIsOpen(false)}
            id="cap-log"
            className="pt-4 menu-item"
            href="#captain-log"
          >
            Captain Ralju's Log
          </a>
          <a
            onClick={() => props.setIsOpen(false)}
            id="flight-plan"
            className="pt-4 menu-item"
            href="#flight-plan"
          >
            Flight Plan
          </a>
          {/* <a
            onClick={() => props.setIsOpen(false)}
            className="pt-4 menu-item"
            href="/provenance"
          >
            Provenance
          </a> */}
        </main>
        <a href="/" className="hover:opacity-60">
          <img
            className="absolute bottom-10 custom-left"
            src="/space-ghoulies-badge.svg"
          />
        </a>
      </Menu>
    </div>
  );
};

export default Navigation;
