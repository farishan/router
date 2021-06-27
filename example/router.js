const router = new Router({
  useLogger: true
})

router.init()

router.onchange = (e) => {
  scriptLoader.reset()
  scriptLoader.loadScripts(false, e.routeMap[e.currentRoute].scripts)
  if(document.getElementById(`dynamicRoot${e.lastRoute}`)){
    document.getElementById(`dynamicRoot${e.lastRoute}`).remove()
  }

  const navButtons = router.createNavigation('button')
  const navInput = router.createNavigation('input')

  if(document.getElementById('router-nav-buttons')){
    document.getElementById('router-nav-buttons').replaceWith(navButtons)
  }

  if(document.getElementById('router-nav-input')){
    document.getElementById('router-nav-input').replaceWith(navInput)
  }
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
const navInput = router.createNavigation('input')

const routerDOM = router.getDOM([
  // navButtons,
  navInput
])

document.body.appendChild(routerDOM)