console.log('it works');

var player = [0,1];
var playerColors = ['red', 'green'];
var playerTurn = player[0];



//add button
window.addEventListener('click', function(){
  if (event.target.matches('.click-grid .grid-item')) {
    if (event.target.style.background === '') {
      event.target.style.background = playerColors[playerTurn];

      checkGridColors()
      playerTurn === player[0] ? playerTurn = player[1] : playerTurn = player[0];
    }
  }
});



function checkGridColors(){
  //doesn't work yet because not properly itterating through node list
  var clickGrid = document.querySelectorAll('.click-grid .grid-item');
  console.log(clickGrid);

  for (var i = 0; i<clickGrid.length; i+=3){
    console.log('starting with row: ' + i);
    var totalInRow = 0;
    console.log('current total in row : ' + totalInRow);
    for (var j = 0; j<3; j++){
      var nodeAccess = i + j;
      console.log('accessing node: ' + nodeAccess);
      if (clickGrid[nodeAccess].style.background === playerColors[playerTurn]) {
        totalInRow++;
        console.log('total in row now: ' + totalInRow);
        if (totalInRow === 3) {
          console.log('winner!!!')
        }
      }
    }
  }
}
