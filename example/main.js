/**
 * Assemble all scripts here to build your custom game.
 */
(function () {
  router.onchange = (e) => {
    console.log(e);

    /**
     * Note: Script handling is project-specific.
     * The router don't know anything about script loading.
     */
    scriptLoader.reset();
    if (e.routeMap[e.currentRoute]) {
      scriptLoader.loadScripts(false, e.routeMap[e.currentRoute].scripts);
    }
  };

  const mainRoot = document.createElement("div");
  const mainDiv = document.createTextNode(
    "this text is not affected by route changes"
  );
  mainRoot.appendChild(mainDiv);

  /* Modifying router UI example: */
  // const navButtons = router.createNavigation("button");
  // const customNav = document.createElement("div");
  // customNav.style.background = "pink";
  // customNav.style.padding = "10px";
  // customNav.appendChild(navButtons);
  // mainRoot.appendChild(customNav);

  document.body.appendChild(mainRoot);
})();
