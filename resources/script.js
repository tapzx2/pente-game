console.log('it works');

var gridItem = document.querySelector('.grid-item')

window.addEventListener('click', function(){
  if (event.target.matches('.click-grid .grid-item')) {
    event.target.style.background = 'yellow';
  }
});
