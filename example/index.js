const scriptLoader = new ScriptLoader({
  statics: ["../index", "router"],
  main: "main",
});

scriptLoader.init();
