/*
//data-playCoordinates has been added
in css access with:
.click-grid [data-coordinates="0-0"]{
  background-color: orange;
}
in js script access with:
var playCoordinates = event.target.dataset.coordinates
*/



var clickGrid = document.querySelectorAll('.click-grid .grid-item');
var gridSize = clickGrid.length**.5;
var playerColors = ['rgb(234, 228, 174)', 'rgb(189, 235, 255)'];
var currentColor = playerColors[0];
var captureCount = {};
var playing;

init();
window.addEventListener('click', function(){
  if (event.target.matches('.click-grid .grid-item') && event.target.style.background === '' && playing === true) {
      event.target.style.background = currentColor;
      console.log(currentColor);
      checkForWin(currentColor);
      //change player turn
      currentColor === playerColors[0] ? currentColor = playerColors[1] : currentColor = playerColors[0];
  }
});
document.querySelector(".play-again").addEventListener('click', init);

function init() {
  //sets playing to true, clears all colors, clears capture count, sets player 0 turn
  playing = true;
  var playingBoard = document.querySelectorAll('.click-grid .grid-item');
  for (let i = 0; i<playingBoard.length; i++) {
    playingBoard[i].style.background = "";
  }
  captureCount[playerColors[0]] = 0;
  captureCount[playerColors[1]] = 0;
  currentColor = playerColors[0];
  document.querySelector(".play-again").style.display = "none";

}

function checkForWin(currentColor){
  //count row down, then column in... NOT x, y
  //defines 5 in a row pattern and capturePattern
  //checks for pattern and win states

  var fiveLongPattern = [currentColor, currentColor, currentColor, currentColor, currentColor];
  var oppositeColor;
  currentColor === playerColors[0] ? oppositeColor = playerColors[1] : oppositeColor = playerColors[0];
  var capturePattern = [currentColor, oppositeColor, oppositeColor, currentColor];

  //starting point coordinates as array
  var startLoc = event.target.dataset.coordinates.split('-');

  //itterate around coordinate create 9 point grid
  var checkGrid = [];
  for (let i = -1; i<2; i++){
    for (let j = -1; j<2; j++){
      checkGrid.push([(parseInt(startLoc[0]) + i), (parseInt(startLoc[1]) + j)])
    }
  }

  checkforPattern(checkGrid, fiveLongPattern, startLoc);
  checkforPattern(checkGrid, capturePattern, startLoc);
}

function checkforPattern(checkGrid, pattern, startLoc){
  console.log('\n')
  console.log(`checking for ${pattern}, starting at: ` + startLoc);
  //var startLoc = checkGrid.filter(function(coordinate, index){return index === 4;})
  var checkGridwoCenter = checkGrid.filter(function(coordinate, index){return index !== 4;})
  for (let i = 0; i<8; i++){
    var testLoc = [checkGridwoCenter[i][0], checkGridwoCenter[i][1]];
    var vector = [testLoc[0]-parseInt(startLoc[0]), testLoc[1]-parseInt(startLoc[1])];
    var testLocAsString = `${testLoc[0]}-${testLoc[1]}`
    var testLocColor = getTestLocColor(testLocAsString);
    var inarow = 1;
    for (let j = 1; j<pattern.length; j++){
      console.log('testining location: ' + testLoc)
      console.log(pattern[j]);
      console.log(testLocColor);
      if (pattern[j] === testLocColor) {
        console.log('adding to in a row')
        inarow++
        console.log(inarow)
        if (pattern.length === 5 && inarow === 5) {
          alert('winner winner chicken dinner by 5 in a row!');
          playing = false;
          document.querySelector(".play-again").style.display = "block";

        } else if (pattern.length === 4 && inarow === 4) {
          alert('capture');
          var remove1 = [testLoc[0] - vector[0], testLoc[1] - vector[1]];
          console.log('remove1 var: ' + remove1)
          var remove1AsString = `${remove1[0]}-${remove1[1]}`
          document.querySelector(`.click-grid [data-coordinates="${remove1AsString}"]`).style.backgroundColor = '';
          var remove2 = [testLoc[0] - vector[0]*2, testLoc[1] - vector[1]*2];
          console.log('remove2 var: ' + remove2)
          var remove2AsString = `${remove2[0]}-${remove2[1]}`
          document.querySelector(`.click-grid [data-coordinates="${remove2AsString}"]`).style.backgroundColor = '';
          //update capture captureCount
          captureCount[pattern[0]] += 1;
          console.log(captureCount);
          if (captureCount[pattern[0]] === 5){
            alert('winner winner chicken dinner by capture!');
            document.querySelector(".play-again").style.display = "block";
            playing = false;

          }
        } else {
          console.log('updating to new test loc along vector')
          testLoc = [testLoc[0] + vector[0], testLoc[1] + vector[1]];
          console.log('test loc along vector is now: ' + testLoc)
          //get new color at location
          testLocAsString = `${testLoc[0]}-${testLoc[1]}`
          testLocColor = getTestLocColor(testLocAsString);
        }
      } else { break; }
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



  //function(pattern)
    //loop through checkGrid
      //define vector
      //while pattern match
        //keep going in that direction





/*



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
