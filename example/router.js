const router = new Router()
router.onchange = (e) => {
  scriptLoader.reset()
  scriptLoader.loadScripts(false, e.routeMap[e.currentRoute].scripts)
  if(document.getElementById(`dynamicRoot${e.lastRoute}`)){
    document.getElementById(`dynamicRoot${e.lastRoute}`).remove()
  }

  const navButtons = router.createNavigation('button')

  document.getElementById('router-nav').replaceWith(navButtons.Node)
}

const routes = {
  '/': router.createRoute({
    path: '/',
    name: 'Root',
    links: ['/test', '/inventory'],
    payload: {
      hello: 'hello'
    }
  }),
  '/test': router.createRoute({
    path: '/test',
    name: 'Test',
    links: ['/'],
    scripts: ['test']
  }),
  '/inventory': router.createRoute({
    path: '/inventory',
    name: 'Inventory',
    links: ['/'],
    scripts: ['inventory']
  })
}

const navButtons = router.createNavigation('button')
const routerDOM = router.getDOM([navButtons.Node])

document.body.appendChild(routerDOM)