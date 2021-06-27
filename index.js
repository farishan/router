function Router(options = {}){
  const { initialRoute, useLogger = false } = options

  this.useLogger = useLogger

  this.currentRoute = initialRoute ? initialRoute : '/'
  this.lastRoute = null
  this.routeMap = {}

  this.onchange = null

  this.setRoute = (route) => {
    if(route !== this.currentRoute){
      const from = JSON.parse(JSON.stringify(this.currentRoute))
      this.lastRoute = from
      this.currentRoute = route

      if(this.useLogger){
        console.log('route changed.', {from, to: route})
      }

      if(this.onchange !== null){
        this.onchange(this)
      }
    }
  }

  this.getRoute = () => {
    return this.currentRoute
  }

  this.getDOM = (initialNodes) => {
    const div = document.createElement('div')
    div.dataset.name = 'router'

    if(this.useLogger){
      div.style.border = '1px solid'
      div.style.padding = '10px'
      div.innerHTML += 'router'
      div.innerHTML += String(this.currentRoute)

      const input = document.createElement('input')
      const button = document.createElement('button')
      button.innerHTML = 'submit'
      button.onclick = () => {
        console.log(input.value)
        const newRoute = input.value
        this.setRoute(newRoute)
        div.appendChild(document.createTextNode(String(this.currentRoute)))
      }

      div.appendChild(input)
      div.appendChild(button)
    }

    if(initialNodes && initialNodes.length > 0){
      for (let index = 0; index < initialNodes.length; index++) {
        const node = initialNodes[index];
        div.appendChild(node)
      }
    }

    return div
  }

  this.createRoute = (options = {}) => {
    let route = new Route(options)
    const { path } = options
    this.routeMap[path] = route

    return route
  }

  this.createNavigation = (type) => {
    if(type === 'button'){
      const links = this.routeMap[this.currentRoute].links
      const routes = []

      for (let index = 0; index < links.length; index++) {
        const link = links[index];
        routes.push(this.routeMap[link])
      }

      const nav = new NavButtons({routes, router: this})
      return nav
    }

    return document.createElement('div')
  }

  this.createDynamicRoot = (path) => {
    const prefix = 'dynamicRoot'

    if(!document.getElementById(`${prefix}/${path}`)){
      const root = document.createElement('div')
      root.id = `${prefix}/${path}`

      return root
    } else {
      return document.getElementById(`${prefix}/${path}`)
    }
  }

  this.loadContent = (path, callback) => {
    const root = router.createDynamicRoot(path);
    root.appendChild(callback())
    document.body.appendChild(root)
  }

  return this

  // Subtemplates
  function Route(options = {}){
    const { path, name, links, payload, scripts = [] } = options

    this.id = `Route${ID()}`
    this.path = path
    this.name = name
    this.links = links
    this.scripts = scripts
    this.payload = payload

    return this
  }

  function NavButtons(options = {}){
    const { routes = [], router } = options

    this.Node = document.createElement('div')
    this.Node.id = 'router-nav'

    for (let index = 0; index < routes.length; index++) {
      const route = routes[index];

      const button = document.createElement('button')
      button.innerHTML = route.name
      button.onclick = () => {
        router.setRoute(route.path)
      }

      this.Node.appendChild(button)
    }

    return this
  }

  // Helper
  function ID() {
    return '_' + Math.random().toString(36).substr(2, 9);
  };
}