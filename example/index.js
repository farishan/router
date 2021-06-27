const scriptLoader = new ScriptLoader({
  statics: ["../dist/router", "router"],
  main: "main",
});

scriptLoader.init();
