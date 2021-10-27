// @ts-nocheck
import rawGhoulies from "./../Final-Mint-Public/final-ghoulies.json";
import traitCounts from "./../Final-Mint-Public/trait_counts.json";
import { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import fuzzysort from "fuzzysort";
import { XIcon } from "@heroicons/react/outline";

let sortedByRank = rawGhoulies.sort((a, b) =>
  parseInt(a.ranking) > parseInt(b.ranking) ? 1 : -1
);
let topGhoulies = sortedByRank.slice(0, 100);

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function Ghoulies({ setViewGhoulie, currentGhoulies }) {
  return (
    <>
      <ul role="list" className="inline-grid grid-cols-4 gap-y-6 gap-x-11">
        {currentGhoulies &&
          currentGhoulies.map((ghoulie) => (
            <li
              onClick={() => setViewGhoulie(ghoulie)}
              key={ghoulie.name}
              className="col-span-1 flex flex-col text-center rounded-lg shadow divide-y divide-gray-200 cursor-pointer gh"
              style={{ backgroundColor: "#031423" }}
            >
              <div className="flex-1 flex flex-col pt-8 px-8 pb-4 items-center">
                <img
                  className="h-52 w-auto rounded-md"
                  src={ghoulie.image}
                  alt=""
                />
                <h3 className="text-3xl mt-6 text-white letter-spacing-2">
                  {ghoulie.name}
                </h3>
                <p
                  className="letter-spacing-1 pt-2"
                  style={{ color: "rgb(255, 208, 81)" }}
                >
                  Ranked {ghoulie.ranking}
                </p>
              </div>
            </li>
          ))}
      </ul>
    </>
  );
}

let getTraitScore = (trait, subTrait) => {
  let totalAmountOfSubTrait = traitCounts[trait][subTrait];
  let totalAmountOfGhoulies = 7500;

  // https://raritytools.medium.com/ranking-rarity-understanding-rarity-calculation-methods-86ceaeb9b98c
  let traitScore = 1 / totalAmountOfSubTrait / totalAmountOfGhoulies;

  let simplifiedScore = Math.round(traitScore * 100000000 * 100) / 100;

  return simplifiedScore;
};

let getTraitProgressWidthAndColor = (score) => {
  if (score < 25) {
    return ["bg-gray-500", "bg-gray-300", "25%"];
  } else if (score >= 25 && score < 76) {
    return ["bg-blue-500", "bg-blue-300", "50%"];
  } else if (score >= 76 && score < 200) {
    return ["bg-red-500", "bg-red-300", "75%"];
  } else {
    return ["bg-yellow-500", "bg-yellow-300", "100%"];
  }
};

const PaginatedGhoulies = ({
  viewGhoulie,
  setViewGhoulie,
  ghoulies,
  ghouliesPerPage,
}) => {
  const [currentGhoulies, setCurrentGhoulies] = useState(null);
  const [pageCount, setPageCount] = useState(0);
  const [ghoulieOffset, setGhoulieOffset] = useState(0);
  const [remountComponent, setRemountComponent] = useState(0);

  useEffect(() => {
    setRemountComponent(Math.random());
  }, [ghoulies]);

  useEffect(() => {
    const endOffset = ghoulieOffset + ghouliesPerPage;

    setCurrentGhoulies(ghoulies.slice(ghoulieOffset, endOffset));
    setPageCount(Math.ceil(ghoulies.length / ghouliesPerPage));
  }, [ghoulieOffset, ghouliesPerPage, ghoulies]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * ghouliesPerPage) % ghoulies.length;

    setGhoulieOffset(newOffset);
  };

  return (
    <>
      {viewGhoulie ? (
        <div
          style={{ backgroundColor: "#031423" }}
          className="rounded-md w-9/12 center-pls"
        >
          <div className="flex items-center flex-col w-full pt-8 pb-4 relative">
            <XIcon
              onClick={() => setViewGhoulie(null)}
              className="absolute top-4 left-4 w-8 h-8 text-red-600 cursor-pointer hover:opacity-60"
            />

            <h3 className="text-5xl text-white letter-spacing-2 mb-4">
              {viewGhoulie.name}
            </h3>
            <div
              style={{ backgroundColor: "#14548a" }}
              className="letter-spacing-1 text-white inline-flex items-baseline px-4 py-1 rounded-full text-xl font-medium md:mt-2 lg:mt-0"
            >
              Rarity Score: {viewGhoulie.rarityScore}
            </div>
          </div>
          <div className="flex-1 flex px-10 pt-4 pb-6 items-center justify-between">
            <div className="w-auto">
              <img
                className="h-96 w-auto rounded-md"
                src={viewGhoulie.image}
                alt=""
              />
              <p
                className="letter-spacing-1 pt-4 text-center text-3xl"
                style={{ color: "rgb(255, 208, 81)" }}
              >
                Ranked {viewGhoulie.ranking}
              </p>
            </div>
            <div className="flex h-full items-center flex-col w-1/2 pl-10 -mt-18">
              <span className="w-full my-1">
                <h2 className="text-white text-xl pb-1 letter-spacing-1">
                  Background:{" "}
                  <span style={{ color: "rgb(255, 208, 81)" }}>
                    {viewGhoulie.background}
                  </span>
                </h2>
                <div className="relative pt-1">
                  <div
                    className={
                      "overflow-hidden h-4 mb-4 text-xs flex rounded-full " +
                      getTraitProgressWidthAndColor(
                        getTraitScore("background", viewGhoulie.background)
                      )[1]
                    }
                  >
                    <div
                      style={{
                        width: getTraitProgressWidthAndColor(
                          getTraitScore("background", viewGhoulie.background)
                        )[2],
                      }}
                      className={
                        "shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center " +
                        getTraitProgressWidthAndColor(
                          getTraitScore("background", viewGhoulie.background)
                        )[0]
                      }
                    ></div>
                  </div>
                </div>
              </span>
              <span className="w-full my-1">
                <h2 className="text-white text-xl pb-1 letter-spacing-1">
                  Environment:{" "}
                  <span style={{ color: "rgb(255, 208, 81)" }}>
                    {viewGhoulie.environment}
                  </span>
                </h2>
                <div className="relative pt-1">
                  <div
                    className={
                      "overflow-hidden h-4 mb-4 text-xs flex rounded-full " +
                      getTraitProgressWidthAndColor(
                        getTraitScore("environment", viewGhoulie.environment)
                      )[1]
                    }
                  >
                    <div
                      style={{
                        width: getTraitProgressWidthAndColor(
                          getTraitScore("environment", viewGhoulie.environment)
                        )[2],
                      }}
                      className={
                        "shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center " +
                        getTraitProgressWidthAndColor(
                          getTraitScore("environment", viewGhoulie.environment)
                        )[0]
                      }
                    ></div>
                  </div>
                </div>
              </span>
              <span className="w-full my-1">
                <h2 className="text-white text-xl pb-1 letter-spacing-1">
                  Body:{" "}
                  <span style={{ color: "rgb(255, 208, 81)" }}>
                    {viewGhoulie.body}
                  </span>
                </h2>
                <div className="relative pt-1">
                  <div
                    className={
                      "overflow-hidden h-4 mb-4 text-xs flex rounded-full " +
                      getTraitProgressWidthAndColor(
                        getTraitScore("body", viewGhoulie.body)
                      )[1]
                    }
                  >
                    <div
                      style={{
                        width: getTraitProgressWidthAndColor(
                          getTraitScore("body", viewGhoulie.body)
                        )[2],
                      }}
                      className={
                        "shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center " +
                        getTraitProgressWidthAndColor(
                          getTraitScore("body", viewGhoulie.body)
                        )[0]
                      }
                    ></div>
                  </div>
                </div>
              </span>
              <span className="w-full my-1">
                <h2 className="text-white text-xl pb-1 letter-spacing-1">
                  Eyes:{" "}
                  <span style={{ color: "rgb(255, 208, 81)" }}>
                    {viewGhoulie.eyes}
                  </span>
                </h2>
                <div className="relative pt-1">
                  <div
                    className={
                      "overflow-hidden h-4 mb-4 text-xs flex rounded-full " +
                      getTraitProgressWidthAndColor(
                        getTraitScore("eyes", viewGhoulie.eyes)
                      )[1]
                    }
                  >
                    <div
                      style={{
                        width: getTraitProgressWidthAndColor(
                          getTraitScore("eyes", viewGhoulie.eyes)
                        )[2],
                      }}
                      className={
                        "shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center " +
                        getTraitProgressWidthAndColor(
                          getTraitScore("eyes", viewGhoulie.eyes)
                        )[0]
                      }
                    ></div>
                  </div>
                </div>
              </span>
              <span className="w-full my-1">
                <h2 className="text-white text-xl pb-1 letter-spacing-1">
                  Mouth:{" "}
                  <span style={{ color: "rgb(255, 208, 81)" }}>
                    {viewGhoulie.mouth}
                  </span>
                </h2>
                <div className="relative pt-1">
                  <div
                    className={
                      "overflow-hidden h-4 mb-4 text-xs flex rounded-full " +
                      getTraitProgressWidthAndColor(
                        getTraitScore("mouth", viewGhoulie.mouth)
                      )[1]
                    }
                  >
                    <div
                      style={{
                        width: getTraitProgressWidthAndColor(
                          getTraitScore("mouth", viewGhoulie.mouth)
                        )[2],
                      }}
                      className={
                        "shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center " +
                        getTraitProgressWidthAndColor(
                          getTraitScore("mouth", viewGhoulie.mouth)
                        )[0]
                      }
                    ></div>
                  </div>
                </div>
              </span>
              <span className="w-full my-1">
                <h2 className="text-white text-xl pb-1 letter-spacing-1">
                  Headgear:{" "}
                  <span style={{ color: "rgb(255, 208, 81)" }}>
                    {viewGhoulie.headgear}
                  </span>
                </h2>
                <div className="relative pt-1">
                  <div
                    className={
                      "overflow-hidden h-4 mb-4 text-xs flex rounded-full " +
                      getTraitProgressWidthAndColor(
                        getTraitScore("headgear", viewGhoulie.headgear)
                      )[1]
                    }
                  >
                    <div
                      style={{
                        width: getTraitProgressWidthAndColor(
                          getTraitScore("headgear", viewGhoulie.headgear)
                        )[2],
                      }}
                      className={
                        "shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center " +
                        getTraitProgressWidthAndColor(
                          getTraitScore("headgear", viewGhoulie.headgear)
                        )[0]
                      }
                    ></div>
                  </div>
                </div>
              </span>
              <span className="w-full my-1">
                <h2 className="text-white text-xl pb-1 letter-spacing-1">
                  Accessories:{" "}
                  <span style={{ color: "rgb(255, 208, 81)" }}>
                    {viewGhoulie.accessories}
                  </span>
                </h2>
                <div className="relative pt-1">
                  <div
                    className={
                      "overflow-hidden h-4 mb-4 text-xs flex rounded-full " +
                      getTraitProgressWidthAndColor(
                        getTraitScore("accessories", viewGhoulie.accessories)
                      )[1]
                    }
                  >
                    <div
                      style={{
                        width: getTraitProgressWidthAndColor(
                          getTraitScore("accessories", viewGhoulie.accessories)
                        )[2],
                      }}
                      className={
                        "shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center " +
                        getTraitProgressWidthAndColor(
                          getTraitScore("accessories", viewGhoulie.accessories)
                        )[0]
                      }
                    ></div>
                  </div>
                </div>
              </span>
            </div>
          </div>
        </div>
      ) : (
        <div key={remountComponent}>
          <Ghoulies
            setViewGhoulie={setViewGhoulie}
            currentGhoulies={currentGhoulies}
          />
          <div className="w-full flex items-center justify-center mt-4">
            <ReactPaginate
              breakLabel="..."
              nextLabel="next >"
              onPageChange={handlePageClick}
              pageRangeDisplayed={5}
              pageCount={pageCount}
              previousLabel="< previous"
              renderOnZeroPageCount={null}
              initialPage={0}
              containerClassName="pagination"
              activeClassName="active"
              breakClassName="break-me"
            />
          </div>
        </div>
      )}
    </>
  );
};

export default function GhoulieList({ ghoulieField, filters }) {
  const [ghoulies, setGhoulies] = useState(topGhoulies);
  const [viewGhoulie, setViewGhoulie] = useState(null);

  useEffect(() => {
    let hash = window.location.hash.split("#")[1];

    let g = hash == "top-100" ? topGhoulies : rawGhoulies;

    let updatedGhoulies = g.filter((gh) => {
      if (filters.length > 0) {
        return !filters
          .map((filter) => {
            let key = Object.keys(filter)[0].toLowerCase();
            let values = Object.values(filter);
            let a = values[0];

            if (a.length > 0) {
              return a.includes(gh[key]);
            } else {
              return true;
            }
          })
          .includes(false);
      } else {
        return g;
      }
    });

    let uGhoulies = updatedGhoulies.map((a) => {
      return a.name;
    });

    const gNames =
      ghoulieField !== ""
        ? fuzzysort.go(ghoulieField, uGhoulies).map((a) => {
            return a.target;
          })
        : uGhoulies;

    let finalGhoulies = updatedGhoulies.filter((g) => {
      return gNames.includes(g.name);
    });

    setGhoulies(finalGhoulies);
    setViewGhoulie(null);
  }, [
    filters,
    typeof window !== "undefined" ? window.location.hash : "",
    ghoulieField,
  ]);

  return (
    <div>
      {ghoulies.length == 0 ? (
        <div className="flex items-center flex-col mt-12">
          <img
            className="h-24 w-auto opacity-50"
            src="/ghoulie-gang-logo.png"
          />
          <h1 className="text-white text-2xl mt-12 letter-spacing-1 opacity-50">
            Spooky....no Ghoulies here....
          </h1>
        </div>
      ) : null}
      <PaginatedGhoulies
        viewGhoulie={viewGhoulie}
        setViewGhoulie={setViewGhoulie}
        ghoulies={ghoulies}
        ghouliesPerPage={20}
      />
    </div>
  );
}
