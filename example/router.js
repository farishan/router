const router = new Router()
router.onchange = (e) => {
  scriptLoader.reset()
  scriptLoader.loadScripts(false, e.routeMap[e.currentRoute].scripts)
  if(document.getElementById(`dynamicRoot${e.lastRoute}`)){
    document.getElementById(`dynamicRoot${e.lastRoute}`).remove()
  }
}

const routes = {
  '/': router.createRoute({
    path: '/',
    name: 'Root',
    links: ['/test'],
    payload: {
      hello: 'hello'
    }
  }),
  '/test': router.createRoute({
    path: '/test',
    name: 'Test',
    links: ['/'],
    scripts: ['test']
  })
}

const navButtons = router.createNavigation('button')
const routerDOM = router.getDOM([navButtons.Node])

document.body.appendChild(routerDOM)