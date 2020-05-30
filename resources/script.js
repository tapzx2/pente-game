console.log('it works');

var gridItem = document.querySelector('.grid-item')

var player = [0,1];
var playerColors = ['red', 'green'];
var playerTurn = player[0];



//add button
window.addEventListener('click', function(){
  if (event.target.matches('.click-grid .grid-item')) {
    if (event.target.style.background === '') {
      event.target.style.background = playerColors[playerTurn];
      changeTurn();

    }
  }
});

function changeTurn() {
  playerTurn === player[0] ? playerTurn = player[1] : playerTurn = player[0];
}
