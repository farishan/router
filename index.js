/**
 * JS DOM Router
 *
 * @param {function} onchange - Function to handle router's state changes
 * @returns Router object
 */
function Router(options = {}) {
  const { initialRoute, useLogger = false, onchange } = options;
  const DYNAMIC_ROOT_PREFIX = "dynamicRoot";
  const NAVIGATOR_ID = {
    button: "router-nav-buttons",
    input: "router-nav-input",
  };

  this.useLogger = useLogger;

  this.currentRoute = initialRoute ? initialRoute : "/";
  this.currentLinks = [];
  this.lastRoute = null;
  this.routeMap = {};

  this.onchange = onchange ? onchange : null;

  this.logWindow = document.createElement("div");
  this.currentRouteWindow = document.createElement("div");

  this.init = () => {
    if (this.useLogger) {
      this.logWindow.setAttribute("style", "border:1px solid;padding:5px");
      const logWindowTitle = document.createTextNode("Router Log Window");
      this.logWindow.appendChild(logWindowTitle);

      this.currentRouteWindow.innerHTML = `Current route: <code>${this.currentRoute}</code>`;
      this.logWindow.appendChild(this.currentRouteWindow);

      document.body.appendChild(this.logWindow);
    }
  };

  this.setRoute = (route) => {
    if (route !== this.currentRoute) {
      const from = JSON.parse(JSON.stringify(this.currentRoute));
      this.lastRoute = from;
      this.currentRoute = route;
      this.currentRouteWindow.innerHTML = `Current route: <code>${this.currentRoute}</code>`;

      if (this.routeMap[route] && this.routeMap[route].links) {
        this.currentLinks = this.routeMap[route].links;
      }

      this.removeDynamicRoot();
      this.refreshNavigation();

      if (this.useLogger) {
        console.log("route changed.", { from, to: route });
      }

      if (this.onchange !== null) {
        this.onchange(this);
      }
    }
  };

  this.getDOM = (initialNodes) => {
    const div = document.createElement("div");
    div.dataset.name = "router";
    div.title = "Router DOM";

    if (this.useLogger) {
      div.style.border = "1px solid";
      div.style.padding = "10px";
    }

    if (initialNodes && initialNodes.length > 0) {
      for (let index = 0; index < initialNodes.length; index++) {
        const node = initialNodes[index];
        div.appendChild(node);
      }
    }

    return div;
  };

  this.createRoute = (options = {}) => {
    let route = new Route(options);
    const { path } = options;
    this.routeMap[path] = route;

    return route;
  };

  this.createRoutes = (options = []) => {
    for (let index = 0; index < options.length; index++) {
      const element = options[index];

      this.createRoute(element);
    }
  };

  this.createNavigation = (type) => {
    // Button Navigator
    if (type === "button") {
      const div = document.createElement("div");
      div.id = NAVIGATOR_ID.button;

      if (this.routeMap[this.currentRoute]) {
        const links = this.routeMap[this.currentRoute].links;

        for (let index = 0; index < links.length; index++) {
          const link = links[index];

          const button = document.createElement("button");
          const route = this.routeMap[link];

          if (route) {
            button.innerHTML = route.name;
            button.onclick = () => {
              this.setRoute(route.path);
            };

            div.appendChild(button);
          } else {
            console.error(`${link} is not found in routeMap.`);
          }
        }
      }

      return div;
    }

    // Input Navigator
    else if (type === "input") {
      const div = document.createElement("div");
      div.id = NAVIGATOR_ID.input;
      const input = document.createElement("input");
      const button = document.createElement("button");
      button.innerHTML = "submit";
      button.onclick = () => {
        const newRoute = input.value;
        this.setRoute(newRoute);
      };

      div.appendChild(input);
      div.appendChild(button);

      return div;
    }

    return document.createElement("div");
  };

  this.createDynamicRoot = (path) => {
    if (!document.getElementById(`${DYNAMIC_ROOT_PREFIX}/${path}`)) {
      const root = document.createElement("div");
      root.id = `${DYNAMIC_ROOT_PREFIX}/${path}`;

      return root;
    } else {
      return document.getElementById(`${DYNAMIC_ROOT_PREFIX}/${path}`);
    }
  };

  this.removeDynamicRoot = () => {
    const dom = document.getElementById(
      `${DYNAMIC_ROOT_PREFIX}${this.lastRoute}`
    );
    if (dom) dom.remove();
  };

  this.refreshNavigation = () => {
    if (document.getElementById(NAVIGATOR_ID.button)) {
      document
        .getElementById(NAVIGATOR_ID.button)
        .replaceWith(this.createNavigation("button"));
    }
    if (document.getElementById(NAVIGATOR_ID.input)) {
      document
        .getElementById(NAVIGATOR_ID.input)
        .replaceWith(this.createNavigation("input"));
    }
  };

  /**
   *
   * @param {string} path - path where content will be loaded
   * @param {Function} callback - callback function returning path content DOM Node
   */
  this.loadContent = (path, callback) => {
    const root = router.createDynamicRoot(path);
    root.appendChild(callback());
    document.body.appendChild(root);
  };

  return this;

  // Subtemplates
  function Route(options = {}) {
    const { path, name, links, payload, scripts = [] } = options;

    this.id = `Route${ID()}`;
    this.path = path;
    this.name = name;
    this.links = links;
    this.scripts = scripts;
    this.payload = payload;

    return this;
  }

  // Helper
  function ID() {
    return "_" + Math.random().toString(36).substr(2, 9);
  }
}
