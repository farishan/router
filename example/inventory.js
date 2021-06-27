router.loadContent('inventory', function(){
  const root = document.createElement('div')
  root.innerHTML = 'inventory'

  const pocketButton = document.createElement('button')
  pocketButton.innerHTML = 'open pocket'
  pocketButton.onclick = () => {
    router.setRoute('/pocket')
  }
  root.appendChild(pocketButton)

  return root
})
