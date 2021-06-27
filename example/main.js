(function () {
  const mainRoot = document.createElement("div");
  const mainDiv = document.createTextNode(
    "this text is not affected by route changes"
  );
  mainRoot.appendChild(mainDiv);

  // Try to modify router
  const navButtons = router.createNavigation("button");
  const customNav = document.createElement("div");
  customNav.style.background = "pink";
  customNav.style.padding = "10px";
  customNav.appendChild(navButtons);
  mainRoot.appendChild(customNav);

  document.body.appendChild(mainRoot);
})();
