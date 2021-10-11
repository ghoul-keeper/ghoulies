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
            id="solaunted-forest"
            className="pt-4 menu-item"
            href="#solaunted-forest"
          >
            Solaunted Forest
          </a>
          <a
            onClick={() => props.setIsOpen(false)}
            id="reason-for-season"
            className="pt-4 menu-item"
            href="#reason-for-season"
          >
            Reason For Season
          </a>
          <a
            onClick={() => props.setIsOpen(false)}
            id="whole-lotta-gang"
            className="pt-4 menu-item"
            href="#whole-lotta-gang"
          >
            Gang Sh*t
          </a>
          <a
            onClick={() => props.setIsOpen(false)}
            id="flight-plan"
            className="pt-4 menu-item"
            href="#flight-plan"
          >
            Roadmap
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
            src="/ghoulie-gang-logo.png"
          />
        </a>
      </Menu>
    </div>
  );
};

export default Navigation;
