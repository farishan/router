const mainRoot = document.createElement('div')

const input = document.createElement('input')
mainRoot.appendChild(input)

input.addEventListener('keydown', e => {
  if(e.key.toLowerCase() === 'enter'){
    const p = document.createElement('p')
    p.innerHTML = input.value
    document.body.appendChild(p)

    sideEffect(input.value)

    input.value = null
    input.focus()
  }
})

function sideEffect(value){
  // if(value === 'inventory'){
  //   const inventory = document.createElement('div')
  //   inventory.innerHTML = 'inventory'
  //   document.body.appendChild(inventory)
  // }
}

document.body.appendChild(mainRoot)