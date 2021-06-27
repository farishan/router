router.loadContent('inventory', function(){
  const inventory = document.createElement('div')
  inventory.innerHTML = 'inventory'
  document.body.appendChild(inventory)

  return inventory
})
