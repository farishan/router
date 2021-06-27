router.loadContent('test', function(){
  const div = document.createElement('div')
  div.innerHTML = 'hello from test'

  return div
})