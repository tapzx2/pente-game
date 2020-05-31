console.log('it works');


var clickGrid = document.querySelectorAll('.click-grid .grid-item');
var gridSize = clickGrid.length**.5;
var player = [0,1];
var playerColors = ['red', 'green'];
var playerTurn = player[0];
var nNeededToWin = 5;


//add button color, check for win condition
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
  //horizontal check
  var clickGrid = document.querySelectorAll('.click-grid .grid-item');
  console.log(clickGrid);

  var nodeAccess

  for (var i = 0; i<clickGrid.length; i+=gridSize){
    console.log('starting with row: ' + i);
    var totalInRow = 0;
    console.log('current total in row : ' + totalInRow);
    for (var j = 0; j<gridSize; j++){
      nodeAccess = i + j;
      console.log('accessing node: ' + nodeAccess);
      if (clickGrid[nodeAccess].style.background === playerColors[playerTurn]) {
        totalInRow++;
        console.log('total in row now: ' + totalInRow);
        if (totalInRow === nNeededToWin) {
          console.log('winner!!!');
          alert('winner')
        }
      }
    }
  }

  //vertical check
  for (var k = 0; k<clickGrid.length/gridSize; k++){
    console.log('starting with column: ' + k);
    var totalInColumn = 0;
    console.log('current total in column: ' + totalInColumn);
    for (let l = 0; l<clickGrid.length; l+=gridSize){
      nodeAccess = l + k;
      console.log('accessing node: ' + nodeAccess);
      if (clickGrid[nodeAccess].style.background === playerColors[playerTurn]) {
        totalInColumn++;
        console.log('total in column now: ' + totalInColumn);
        if (totalInColumn === nNeededToWin) {
          console.log('winner!!!');
        }
      }

    }
  }

}
