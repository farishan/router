// Define and initialize router
const router = new Router();
router.init();

// Create routes
router.createRoute({
  path: "/",
  name: "Root",
  links: ["/", "/test", "/inventory"],
  payload: {
    hello: "hello",
  },
});
router.createRoute({
  path: "/test",
  name: "Test",
  links: ["/"],
  scripts: ["test"],
});
router.createRoutes([
  {
    path: "/inventory",
    name: "Inventory",
    links: ["/"],
    scripts: ["inventory"],
  },
  {
    path: "/pocket",
    name: "Pocket",
    links: ["/", "/inventory"],
    scripts: ["pocket"],
  },
]);

// (Optional) Render router interface
const routerDOM = router.getDOM([
  router.createNavigation("button"),
  router.createNavigation("input"),
]);
document.body.appendChild(routerDOM);
