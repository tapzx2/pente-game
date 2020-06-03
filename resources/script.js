/*
//data-playCoordinates has been added
in css access with:
.click-grid [data-coordinates="0-0"]{
  background-color: orange;
}
in js script access with:
var playCoordinates = event.target.dataset.coordinates
*/

//WORKING ON: currently rewriting function checkforPattern(checkGrid, pattern)


var clickGrid = document.querySelectorAll('.click-grid .grid-item');
var gridSize = clickGrid.length**.5;
var player = [0,1];
var playerColors = ['red', 'green'];
var playerTurn = player[0];
var currentColor = playerColors[playerTurn];
var oppositePlayer = player[1];
var nNeededToWin = 5;


//add button color, check for win condition
window.addEventListener('click', function(){
  if (event.target.matches('.click-grid .grid-item') && event.target.style.background === '') {
      event.target.style.background = currentColor;
      //check for win and capture patterns
      checkFor5Win(currentColor);
      //change player turn
      playerTurn === player[0] ? playerTurn = player[1] : playerTurn = player[0];
  }
});

function checkFor5Win(currentColor){
  //count row down, then column in... NOT x, y
  var fiveLongPattern = [currentColor, currentColor, currentColor, currentColor, currentColor];
  var capturePattern = [currentColor, oppositeColor, oppositeColor, currentColor];

  //starting point coordinates as array
  var startLoc = event.target.dataset.coordinates.split('-');

  //itterate around coordinate create 9 point grid, remove center coordinates
  var checkGrid = [];
  for (let i = -1; i<2; i++){
    for (let j = -1; j<2; j++){
      checkGrid.push([parseInt(startLoc[0]) + i, parseInt(startLoc[1]) + j])
    }
  }
  checkGrid.splice(4);

  function checkforPattern(checkGrid, pattern){
      for (let i = 0; i<8; i++){
        var testLoc = [checkGrid[i][0], checkGrid[i][1]];
        var vector = [testLoc[0]-startLoc[0], testLoc[1]-startLoc[1]];
        var testLocAsString = `${testLoc[0]}-${testLoc[1]}`
        var testLocColor = getTestLocColor(testLocAsString);
        for (let j = 0; j<pattern.length; j++){
          if (pattern match){
            update values
          } else { break }
        }
  }

  //function(pattern)
    //loop through checkGrid
      //define vector
      //while pattern match
        //keep going in that direction


  //itterate through check grid
  for (let i = 0; i<8; i++){


    var testLoc = [];
    testLoc.push(checkGrid[i][0], checkGrid[i][1]);
    console.log('test location: ' + testLoc);
    var vector = [];
    vector.push(testLoc[0]-startLoc[0], testLoc[1]-startLoc[1]);
    console.log('current vector: ' + vector);

    var testLocAsString = `${testLoc[0]}-${testLoc[1]}`
    var testLocColor = getTestLocColor();

    var inarow = 1;
    var breakLoop = 0;
    while(testLoc[0] >= 0 && testLoc[1] >= 0 && testLocColor === currentColor && breakLoop < 10){
      breakLoop++
      inarow++
      console.log('in a row: ' + inarow);
      if(inarow===5){
        alert('winner winner chicken dinner');
      } else {
        //change location var based on vector
        testLoc = [testLoc[0] + vector[0], testLoc[1]+vector[1]];
        //get new color at location
        testLocAsString = `${testLoc[0]}-${testLoc[1]}`
        testLocColor = getTestLocColor();
      }

    }



  }

  function getTestLocColor(testLocAsString) {
    //returns color if available, otherwise, returns empty string
    //exists because selecting style of a non existant element thows an error and breaks the program
    var output = document.querySelector(`.click-grid [data-coordinates="${testLocAsString}"]`)
    if (output !== null){
      return document.querySelector(`.click-grid [data-coordinates="${testLocAsString}"]`).style.backgroundColor;
    } else {
      return "";
    }
  }
}




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

/*
//may not need this, creates a sweet array of the playing grid, but because coordinates are already set in the class, it may not be needed!

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
*/
