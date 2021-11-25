// @ts-nocheck
import rawGhoulies from "./../Final-Mint-Public/final-ghoulies.json";
import traitCounts from "./../Final-Mint-Public/trait_counts.json";
import { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
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
      <ul role="list" className="custom-grid-break-points test">
        {currentGhoulies &&
          currentGhoulies.map((ghoulie) => (
            <li
              onClick={() => setViewGhoulie(ghoulie)}
              key={ghoulie.name}
              className="mb-4 md:mb-0 col-span-1 flex flex-col text-center rounded-lg shadow divide-y divide-gray-200 cursor-pointer gh"
              style={{ backgroundColor: "#031423" }}
            >
              <div className="flex-1 flex flex-col pt-8 px-8 pb-4 items-center">
                <img
                  className="w-auto rounded-md ghoulie-img-height"
                  src={ghoulie.image}
                  alt=""
                />
                <h3 className="md:text-xl lg:text-3xl mt-6 text-white letter-spacing-2">
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
  let traitScore = 1 / (totalAmountOfSubTrait / totalAmountOfGhoulies);

  let simplifiedScore = Math.round(traitScore * 100) / 100;

  return simplifiedScore;
};

let getTraitProgressWidthAndColor = (score) => {
  if (score < 15) {
    return ["bg-gray-500", "bg-gray-300", "25%"];
  } else if (score >= 15 && score < 40) {
    return ["bg-blue-500", "bg-blue-300", "50%"];
  } else if (score >= 40 && score < 185) {
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
  const [hover, setHover] = useState("");

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
          className="rounded-md w-11/12 md:w-9/12 center-pls"
        >
          <div className="flex items-center flex-col w-full pt-8 pb-4 relative">
            <XIcon
              onClick={() => setViewGhoulie(null)}
              className="absolute top-4 left-4 w-8 h-8 text-red-600 cursor-pointer hover:opacity-60"
            />

            <h3 className="text-5xl text-white letter-spacing-2 mb-4 md:mt-0 mt-8">
              {viewGhoulie.name}
            </h3>
            <div
              style={{ backgroundColor: "#14548a" }}
              className="letter-spacing-1 text-white inline-flex items-baseline px-4 py-1 rounded-full text-xl font-medium md:mt-2 lg:mt-0"
            >
              Rarity Score: {viewGhoulie.rarityScore}
            </div>
          </div>
          <div className="flex-1 flex px-10 pt-4 pb-6 items-center justify-between flex-col md:flex-row">
            <div className="w-auto">
              <img
                className="h-60 md:h-96 w-auto rounded-md"
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
            <div className="flex h-full items-center flex-col w-full md:w-1/2 pl-0 md:pl-10 mt-8 md:-mt-18">
              <span className="w-full my-1">
                <h2 className="text-white text-xl pb-1 letter-spacing-1">
                  Background:{" "}
                  <span style={{ color: "rgb(255, 208, 81)" }}>
                    {viewGhoulie.background}
                  </span>
                </h2>
                <div className="relative pt-1">
                  <div
                    onMouseOver={() => setHover("background")}
                    onMouseOut={() => setHover("")}
                    className={
                      "overflow-hidden h-4 mb-4 text-xs flex rounded-full cursor-pointer relative " +
                      getTraitProgressWidthAndColor(
                        getTraitScore("background", viewGhoulie.background)
                      )[1]
                    }
                  >
                    {hover == "background" ? (
                      <div
                        style={{ left: "50%", marginLeft: "-189.5" }}
                        className="absolute letter-spacing-1"
                      >
                        {getTraitScore("background", viewGhoulie.background)}
                      </div>
                    ) : null}
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
                    onMouseOver={() => setHover("environment")}
                    onMouseOut={() => setHover("")}
                    className={
                      "overflow-hidden h-4 mb-4 text-xs flex rounded-full cursor-pointer relative " +
                      getTraitProgressWidthAndColor(
                        getTraitScore("environment", viewGhoulie.environment)
                      )[1]
                    }
                  >
                    {hover == "environment" ? (
                      <div
                        style={{ left: "50%", marginLeft: "-189.5" }}
                        className="absolute letter-spacing-1"
                      >
                        {getTraitScore("environment", viewGhoulie.environment)}
                      </div>
                    ) : null}
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
                    onMouseOver={() => setHover("body")}
                    onMouseOut={() => setHover("")}
                    className={
                      "overflow-hidden h-4 mb-4 text-xs flex rounded-full cursor-pointer relative " +
                      getTraitProgressWidthAndColor(
                        getTraitScore("body", viewGhoulie.body)
                      )[1]
                    }
                  >
                    {hover == "body" ? (
                      <div
                        style={{ left: "50%", marginLeft: "-189.5" }}
                        className="absolute letter-spacing-1"
                      >
                        {getTraitScore("body", viewGhoulie.body)}
                      </div>
                    ) : null}
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
                    onMouseOver={() => setHover("eyes")}
                    onMouseOut={() => setHover("")}
                    className={
                      "overflow-hidden h-4 mb-4 text-xs flex rounded-full cursor-pointer relative " +
                      getTraitProgressWidthAndColor(
                        getTraitScore("eyes", viewGhoulie.eyes)
                      )[1]
                    }
                  >
                    {hover == "eyes" ? (
                      <div
                        style={{ left: "50%", marginLeft: "-189.5" }}
                        className="absolute letter-spacing-1"
                      >
                        {getTraitScore("eyes", viewGhoulie.eyes)}
                      </div>
                    ) : null}
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
                    onMouseOver={() => setHover("mouth")}
                    onMouseOut={() => setHover("")}
                    className={
                      "overflow-hidden h-4 mb-4 text-xs flex rounded-full cursor-pointer relative " +
                      getTraitProgressWidthAndColor(
                        getTraitScore("mouth", viewGhoulie.mouth)
                      )[1]
                    }
                  >
                    {hover == "mouth" ? (
                      <div
                        style={{ left: "50%", marginLeft: "-189.5" }}
                        className="absolute letter-spacing-1"
                      >
                        {getTraitScore("mouth", viewGhoulie.mouth)}
                      </div>
                    ) : null}
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
                    onMouseOver={() => setHover("headgear")}
                    onMouseOut={() => setHover("")}
                    className={
                      "overflow-hidden h-4 mb-4 text-xs flex rounded-full cursor-pointer relative " +
                      getTraitProgressWidthAndColor(
                        getTraitScore("headgear", viewGhoulie.headgear)
                      )[1]
                    }
                  >
                    {hover == "headgear" ? (
                      <div
                        style={{ left: "50%", marginLeft: "-189.5" }}
                        className="absolute letter-spacing-1"
                      >
                        {getTraitScore("headgear", viewGhoulie.headgear)}
                      </div>
                    ) : null}
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
                    onMouseOver={() => setHover("accessories")}
                    onMouseOut={() => setHover("")}
                    className={
                      "overflow-hidden h-4 mb-4 text-xs flex rounded-full cursor-pointer relative " +
                      getTraitProgressWidthAndColor(
                        getTraitScore("accessories", viewGhoulie.accessories)
                      )[1]
                    }
                  >
                    {hover == "accessories" ? (
                      <div
                        style={{ left: "50%", marginLeft: "-189.5" }}
                        className="absolute letter-spacing-1"
                      >
                        {getTraitScore("accessories", viewGhoulie.accessories)}
                      </div>
                    ) : null}
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
              pageRangeDisplayed={3}
              marginPagesDisplayed={1}
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

export default function GhoulieList({ ghoulieField, filters, myGhoulies }) {
  const [ghoulies, setGhoulies] = useState(topGhoulies);
  const [viewGhoulie, _setViewGhoulie] = useState(null);

  let setViewGhoulie = (ghoulie) => {
    if (ghoulie) {
      window.location.hash =
        window.location.hash + "_" + encodeURIComponent(ghoulie.name);
    } else {
      let hash = window.location.hash.split("#")[1].split("_")[0];
      window.location.hash = hash;
    }

    _setViewGhoulie(ghoulie);
  };

  useEffect(() => {
    let hash = window.location.hash.split("#")[1];
    let possibleGhoulie = decodeURIComponent(
      window.location.hash.split("_")[1]
    );
    let foundGhoulie = ghoulies.filter((g) => {
      return g.name == possibleGhoulie;
    })[0];

    let g = hash == "top-100" ? topGhoulies : rawGhoulies;

    let updatedGhoulies = g.filter((gh) => {
      if (filters.length > 0) {
        return !filters
          .map((filter) => {
            let key = Object.keys(filter)[0].toLowerCase();
            let values = Object.values(filter);
            let a = values[0] == 420 ? "420" : values[0];

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

    let myGhouliesByName = myGhoulies.map((a) => {
      return a.data.name.toLowerCase();
    });

    let preFinalGhoulies =
      hash == "my-ghoulies"
        ? updatedGhoulies.filter((g) => {
            return myGhouliesByName.includes(g.name.toLowerCase());
          })
        : updatedGhoulies;

    let finalGhoulies = preFinalGhoulies.filter((g) => {
      return g.name.toLowerCase().includes(ghoulieField);
    });

    setGhoulies(finalGhoulies);
    _setViewGhoulie(foundGhoulie == undefined ? null : foundGhoulie);
  }, [
    filters,
    typeof window !== "undefined" ? window.location.hash : "",
    ghoulieField,
  ]);

  return (
    <div>
      {ghoulies.length == 0 ? (
        <div className="flex items-center flex-col mt-2 md:mt-12">
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
