/*
//data-playCoordinates has been added
in css access with:
.click-grid [data-coordinates="0-0"]{
  background-color: orange;
}
in js script access with:
var playCoordinates = event.target.dataset.coordinates
*/

/* had a great convo with fernando about MCV. Now, I'm testing VS Code and git hub integration */

var hellGit = "are you working?"


var clickGrid = document.querySelectorAll('.click-grid .grid-item');
var gridSize = clickGrid.length**.5;
var playerColors = ['rgb(234, 228, 174)', 'rgb(189, 235, 255)'];
var currentColor = playerColors[0];
var captureCount = {};
var playing;

init();
window.addEventListener('click', function(){
  //if the clicked spaces is free, update color, check for capture, and check for win states
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
  //sets playing to true, clears all colors, clears capture count, sets player 0 turn, removes play-again button
  playing = true;
  var playingBoard = document.querySelectorAll('.click-grid .grid-item');
  //clear all colors from playingBoard
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

  //itterate around starting location coordinate, create 9 point grid
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
  //in the built check grid, checks for supplied pattern, starting at startLoc
  //two win conditions are coded in for 5 in a row and 5 captures
  console.log('\n')
  console.log(`checking for ${pattern}, starting at: ` + startLoc);
  //var startLoc = checkGrid.filter(function(coordinate, index){return index === 4;})
  var checkGridwoCenter = checkGrid.filter(function(coordinate, index){return index !== 4;})
  //itterate through check grid
  for (let i = 0; i<8; i++){
    var testLoc = [checkGridwoCenter[i][0], checkGridwoCenter[i][1]];
    var vector = [testLoc[0]-parseInt(startLoc[0]), testLoc[1]-parseInt(startLoc[1])];
    var testLocAsString = `${testLoc[0]}-${testLoc[1]}`
    var testLocColor = getTestLocColor(testLocAsString);
    var inarow = 1;
    for (let j = 1; j<pattern.length; j++){
      //console.log('testining location: ' + testLoc) //console.log(pattern[j]); //console.log(testLocColor);
      //check for pattern itteration to testLocColor match
      if (pattern[j] === testLocColor) {
        console.log('adding to in a row')
        inarow++
        console.log(inarow)
        //check for 5 in a row win state and end game if true
        if (pattern.length === 5 && inarow === 5) {
          alert('winner winner chicken dinner by 5 in a row!');
          playing = false;
          document.querySelector(".play-again").style.display = "block";
        //check for capture pattern and if true update capture count
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
          //check for captureCount winstate
          if (captureCount[pattern[0]] === 5){
            alert('winner winner chicken dinner by capture!');
            document.querySelector(".play-again").style.display = "block";
            playing = false;
          }
          //update test location along vector and get new color at new location
        } else {
          console.log('updating to new test loc along vector')
          testLoc = [testLoc[0] + vector[0], testLoc[1] + vector[1]];
          console.log('test loc along vector is now: ' + testLoc)
          //get new color at location
          testLocAsString = `${testLoc[0]}-${testLoc[1]}`
          testLocColor = getTestLocColor(testLocAsString);
        }
        //if no color match, stop the itteration
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
