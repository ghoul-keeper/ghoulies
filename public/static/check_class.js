var observeDOM = (function () {
  var MutationObserver =
    window.MutationObserver || window.WebKitMutationObserver;

  return function (obj, callback) {
    if (!obj || obj.nodeType !== 1) return;

    if (MutationObserver) {
      // define a new observer
      var mutationObserver = new MutationObserver(callback);

      // have the observer observe foo for changes in children
      mutationObserver.observe(obj, { childList: true, subtree: true });
      return mutationObserver;
    }

    // browser support fallback
    else if (window.addEventListener) {
      obj.addEventListener("DOMNodeInserted", callback, false);
      obj.addEventListener("DOMNodeRemoved", callback, false);
    }
  };
})();

let check = (checks) => {
  let mainEl = document.getElementById("r-wp");
  let mainElMob = document.getElementById("r-wp-mob");

  if (mainEl || mainElMob) {
    // Watches the specific element.
    observeDOM(mainEl, function (m) {
      var addedNodes = [],
        removedNodes = [];

      m.forEach(
        (record) =>
          record.addedNodes.length & addedNodes.push(...record.addedNodes)
      );

      m.forEach(
        (record) =>
          record.removedNodes.length & removedNodes.push(...record.removedNodes)
      );

      // console.clear();
      // console.log("Added:", addedNodes, "Removed:", removedNodes);

      let rarityElement = document.getElementsByClassName("wal-rarity")[0];

      if (rarityElement) {
        if (
          rarityElement.querySelectorAll(".wallet-adapter-button-start-icon")
            .length > 0
        ) {
          rarityElement.classList.add("r-justify-left");
          rarityElement.classList.remove("r-justify-center");
        } else {
          rarityElement.classList.add("r-justify-center");
          rarityElement.classList.remove("r-justify-left");
        }
      }
    });

    observeDOM(mainElMob, function (m) {
      var addedNodes = [],
        removedNodes = [];

      m.forEach(
        (record) =>
          record.addedNodes.length & addedNodes.push(...record.addedNodes)
      );

      m.forEach(
        (record) =>
          record.removedNodes.length & removedNodes.push(...record.removedNodes)
      );

      // console.clear();
      // console.log("Added:", addedNodes, "Removed:", removedNodes);

      let rarityElementMob = document.getElementsByClassName("wal-rarity")[1];

      if (
        rarityElementMob.querySelectorAll(".wallet-adapter-button-start-icon")
          .length > 0
      ) {
        rarityElementMob.classList.add("r-justify-left");
        rarityElementMob.classList.remove("r-justify-center");
      } else {
        rarityElementMob.classList.add("r-justify-center");
        rarityElementMob.classList.remove("r-justify-left");
      }
    });
  } else {
    if (checks < 5) {
      let updated = checks + 1;

      setTimeout(() => {
        check(updated);
      }, 500);
    } else {
      console.error("Too many checks...");
    }
  }
};

setTimeout(() => {
  check(0);
}, 1000);
