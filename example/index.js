const scriptObject = new ScriptObject({
  statics: ['../index', 'router'],
  main: 'main'
})
const scriptLoader = new ScriptLoader()
scriptLoader.init(scriptObject)
