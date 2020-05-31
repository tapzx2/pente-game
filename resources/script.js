//WILL RETURN WINNER IF 5 in either column or row, NOT NECESARLLY IN ORDER, FIX THIS

console.log('it works');


var clickGrid = document.querySelectorAll('.click-grid .grid-item');
var gridSize = clickGrid.length**.5;
var player = [0,1];
var playerColors = ['red', 'green'];
var playerTurn = player[0];
var nNeededToWin = 5;

var gridNodeArray = [];
var pushToGrid = [];

for (let i = 0; i<clickGrid.length; i+=gridSize){
  pushToGrid = [];
  console.log(i);
  for (let j = 0; j<gridSize; j++){
    var gridAccess = i + j;
    console.log('accessing node: ' + gridAccess);
    pushToGrid.push(clickGrid[gridAccess]);
  }
  gridNodeArray.push(pushToGrid)
}
console.log(gridNodeArray)


//add button color, check for win condition
window.addEventListener('click', function(){
  if (event.target.matches('.click-grid .grid-item')) {
    if (event.target.style.background === '') {
      event.target.style.background = playerColors[playerTurn];

      //checkGridColors()

      playerTurn === player[0] ? playerTurn = player[1] : playerTurn = player[0];
    }
  }
});



/*

//This is brute force method. Works currently, but if game scales up, could be a disaster!


function checkGridColors(){
  //horizontal check
  var clickGrid = document.querySelectorAll('.click-grid .grid-item');
  console.log(clickGrid);

  var nodeAccess

  for (var i = 0; i<clickGrid.length; i+=gridSize){
    //console.log('starting with row: ' + i);
    var totalInRow = 0;
    //console.log('current total in row : ' + totalInRow);
    for (var j = 0; j<gridSize; j++){
      nodeAccess = i + j;
      //console.log('accessing node: ' + nodeAccess);
      if (clickGrid[nodeAccess].style.background === playerColors[playerTurn]) {
        totalInRow++;
        //console.log('total in row now: ' + totalInRow);
        if (totalInRow === nNeededToWin) {
          //console.log('winner!!!');
          alert('winner')
        }
      } else {
        totalInRow = 0;
      }
    }
  }

  //vertical check
  for (var k = 0; k<clickGrid.length/gridSize; k++){
    //console.log('starting with column: ' + k);
    var totalInColumn = 0;
    //console.log('current total in column: ' + totalInColumn);
    for (let l = 0; l<clickGrid.length; l+=gridSize){
      nodeAccess = l + k;
      //console.log('accessing node: ' + nodeAccess);
      if (clickGrid[nodeAccess].style.background === playerColors[playerTurn]) {
        totalInColumn++;
        //console.log('total in column now: ' + totalInColumn);
        if (totalInColumn === nNeededToWin) {
          //console.log('winner!!!');
          alert('winner');
        }
      } else {
        totalInColumn = 0;
      }

    }
  }
  //diagonal top right to bottom left check

  //establish win grid length
  var winGrid = gridSize - (nNeededToWin - 1);
  var accessNode = gridSize - winGrid;
  console.log(accessNode);
  //start itteration at nodeAcces of winGrid

}
*/
