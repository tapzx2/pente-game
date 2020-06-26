/*debug capture check*/
/*5 in a row tests break if checking at edge of the board */

//MODEL
//cordinates go row, column
const players = [1, 2];

var grid;
var playerTurn;
var oppositePlayerTurn;
var record;
var captures;
var capturePattern;

function init () {
  grid = 
  [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  ];

  playerTurn = players[0];
  oppositePlayerTurn = players[1];
  captures = [];
  record = [];
  capturePattern = [playerTurn, oppositePlayerTurn, oppositePlayerTurn, playerTurn];

};

//VIEW
//on click pass click coordinate location to JS
function showGrid() {
  console.log(grid);
} 

function showPlayerTurn(){
  console.log(playerTurn);
}

//CONTROLER v2

function onClick(click){
  if(grid[click[0]][click[1]] === 0){
    console.log('turn: ' + (record.length + 1));
    //console.log(capturePattern);
    makeRecord(click)
    updateBoard(click);
    //showGrid();
    checkfor5win(click);
    checkforCapture(click);
    checkforCaptureWin();
    //add check for capture win
    //showGrid();
    updatePlayerTurn();
  }
}

//check for capture win
function checkforCaptureWin(); {
  if (captures[0] >= 5) {
    console.log(`player ${players[0]} wins!`)
  } else if (captures[1] >= 5) {
    console.log(`player ${players[1]} wins!`)
  }
}

// check for capture
function checkforCapture(click){
  //console.log('checking for capture...');
  //console.log('capture pattern: ' + capturePattern);
  for (let i = -1; i<2; i++){
    for (let j = -1; j<2; j++){
      //console.log(`in row direction: ${i} and col direction: ${j}`)
      if (checkCaptureDirection(click, i, j)) {
        //removePieces(click, i, j)
        console.log('******capture!******\n\n\n')
        grid[click[0]+i][click[1]+j] = 0;
        grid[click[0]+i+i][click[1]+j+j] = 0;
        //showGrid();
      }
    }
  }
}

////check Capture Direction
function checkCaptureDirection(click, rowVec, colVec){
  for (let i = 0; i<capturePattern.length; i++){
    //console.log(`click[0]: ${click[0]}, click[1]: ${click[1]}`);
    //console.log('rowVec * i: ' + (rowVec * i))
    //console.log('colVec * i: ' + (colVec * i))
    //console.log('[click[0] + (rowVec * i)][click[1] + (colVec * i)]: ' + [click[0] + (rowVec * i)] + ',' + [click[1] + (colVec * i)]);
    //console.log(`grid value at above loc: ${grid[click[0] + (rowVec * i)][click[1] + (colVec * i)]}`)
    //console.log(`capture pattern to match: ${capturePattern[i]}\n`)
    if (
      click[0] + (rowVec * i) < 0 ||
      click[1] + (colVec * i) < 0 ||
      (rowVec === 0 && colVec === 0)
    ) {
      //console.log('does not exist on grid, returning false, ending this direction\n')
      return false
    } else if (grid[click[0] + (rowVec * i)][click[1] + (colVec * i)] !== capturePattern[i]) {
      //console.log(`grid value at above loc: ${grid[click[0] + (rowVec * i)][click[1] + (colVec * i)]}`)
      //console.log(`capture pattern to match: ${capturePattern[i]}`)
      //console.log('location value does not match capture pattern, returning false, ending this direction\n')
      return false;
    } else if (i === 3){
      //console.log(`grid value at above loc: ${grid[click[0] + (rowVec * i)][click[1] + (colVec * i)]}`)
      //console.log(`capture pattern to match: ${capturePattern[i]}`)
      //console.log(`made it to the end of capture pattern i === ${i} returning true \n`)
      return true
    }
  }
}


////// remove Pieces

//check for 5 in a row
function checkfor5win(click) {
  if (
    checkVertical(click) || 
    checkHorizontal(click) ||
    checkDiagULDR(click) ||
    checkDiagURDL(click)) {
    console.log('win!')
  }
}

////check for diagURDL up left down right
function checkDiagURDL(click) {
  return (1 + checkUpRight(click) + checkDownLeft(click) >= 5)
}

//////checkUpRight
function checkUpRight(click){
  var matchingUpRight = 0;
  var rowDirection = -1;
  var colDirection = 1
  while(
    click[0] + rowDirection >= 0 &&
    click[1] + colDirection >= 0 &&
    grid[click[0] + rowDirection][click[1] + colDirection] === playerTurn) 
    {
    matchingUpRight += 1;
    rowDirection -= 1;
    colDirection += 1
  }
  return matchingUpRight
}

//////checkDownLeft
function checkDownLeft(click){
  var matchingDownLeft = 0;
  var rowDirection = 1;
  var colDirection = -1
  while(
    click[0] + rowDirection >= 0 &&
    click[1] + colDirection >= 0 &&
    grid[click[0] + rowDirection][click[1] + colDirection] === playerTurn) 
    {
    matchingDownLeft += 1;
    rowDirection += 1;
    colDirection -= 1
  }
  return matchingDownLeft
}

////check for diagULDR up left down right
function checkDiagULDR(click) {
  return (1 + checkUpLeft(click) + checkDownRight(click) >= 5)
}

//////checkUpLeft
function checkUpLeft(click){
  var matchingUpLeft = 0;
  var rowDirection = -1;
  var colDirection = -1
  while(
    click[0] + rowDirection >= 0 &&
    click[1] + colDirection >= 0 &&
    grid[click[0] + rowDirection][click[1] + colDirection] === playerTurn) 
    {
    matchingUpLeft += 1;
    rowDirection -= 1;
    colDirection -= 1
  }
  return matchingUpLeft
}

//////checkDownRight
function checkDownRight(click){
  var matchingDownRight = 0;
  var rowDirection = 1;
  var colDirection = 1
  while(
    click[0] + rowDirection >= 0 &&
    click[1] + colDirection >= 0 &&
    grid[click[0] + rowDirection][click[1] + colDirection] === playerTurn) 
    {
    matchingDownRight += 1;
    rowDirection += 1;
    colDirection += 1
  }
  return matchingDownRight
}

////check for Horizontal Total
function checkHorizontal(click) {
  return (1 + checkLeft(click) + checkRight(click) >= 5)
}

//////checkLeft
function checkLeft(click){
  var matchingLeft = 0;
  var direction = -1;
  while(
    click[1] + direction >= 0 &&
    grid[click[0]][click[1] + direction] === playerTurn)
    {
    matchingLeft += 1;
    direction -= 1;
  }
  return matchingLeft
}

//////checkRight
function checkRight(click){
  var matchingRight = 0;
  var direction = 1;
  while(
    click[1] + direction &&
    grid[click[0]][click[1] + direction] === playerTurn)
    {
    matchingRight += 1;
    direction += 1;
  }
  return matchingRight
}

////check for Vertical Total
function checkVertical(click) {
  return (1 + checkUp(click) + checkDown(click) >= 5)
}

//////checkUp
function checkUp(click){
  var matchingUp = 0;
  var direction = -1;
  while(
    click[0] + direction >= 0 &&
    grid[click[0] + direction][click[1]] === playerTurn)
    {
    matchingUp += 1;
    direction -= 1;
  }
  return matchingUp
}

//////checkDown
function checkDown(click){
  var matchingDown = 0;
  var direction = 1;
  while(
    click[0] + direction >= 0 &&
    grid[click[0] + direction][click[1]] === playerTurn)
    {
    matchingDown += 1;
    direction += 1;
  }
  return matchingDown
}

//update model functions

function updatePlayerTurn(){
  playerTurn === players[0] ? playerTurn = players[1] : playerTurn = players[0];
  oppositePlayerTurn === players[1] ? oppositePlayerTurn = players[0] : oppositePlayerTurn = players[1];
  capturePattern = [playerTurn, oppositePlayerTurn, oppositePlayerTurn, playerTurn];
}

function updateBoard(click){
  grid[click[0]][click[1]] = playerTurn;
}

function makeRecord(click) {
  record.push(click);
}

//GAME TEST

//make capture test vertical, horizontal, both diagonals

//vertical capture test

var verticalCapture = [
  [2,2], [1,2],
  [3,2], [4,2]
];

var horizontalCapture = [
  [0,1], [0,3],
  [0,2], [0,0]
];

var uldrCapture = [
  [0,2], [1,1],
  [0,0], [2,2],
  [3,3]
];

var dlurCapture = [
  [0,0], [2,1],
  [3,0], [1,2],
  [0,3]
];

var doubleCapture = [
  [3,1], [3,0],
  [1,3], [0,3],
  [3,2], [1,1],
  [2,3], [3,3]
];

function captureTest(clickArray) {
  init(); // new game
  for (let i = 0; i<clickArray.length;i++){
    //console.log('clicking: ' + clickArray[i]);
    onClick(clickArray[i])
  }
}

console.log('vertical capture');
captureTest(verticalCapture);
console.log('horizontal capture test');
captureTest(horizontalCapture);
console.log('uldr capture test');
captureTest(uldrCapture);
console.log('dlur capture test');
captureTest(dlurCapture);
console.log('double capture test');
captureTest(doubleCapture);

/*
//vertical capture test
init();
var gameClicks = [
  [2,2], [1,2],
  [3,2], [4,2]
];
console.log('vertical capture test')
for (let i = 0; i<gameClicks.length;i++){
  console.log('clicking: ' + gameClicks[i]);
  onClick(gameClicks[i])
}
*/

//diagonal win game test upRight downLeft
init();
var gameClicks = [
  [1,5], [1,6],
  [2,4], [2,5],
  [3,3], [3,4],
  [4,2], [4,3],
  [5,1]
];
console.log('diagonal game test up right down left')
for (let i = 0; i<gameClicks.length;i++){
  onClick(gameClicks[i])
}

//diagonal win game test Upleft Downrigth
init();
var gameClicks = [
  [1,1], [1,2],
  [2,2], [2,3],
  [5,5], [3,4],
  [4,4], [4,5],
  [3,3]
];
console.log('diagonal game test up left down right')
for (let i = 0; i<gameClicks.length;i++){
  onClick(gameClicks[i])
}

//horizontal win game test
init();
var gameClicks = [
  [1,1], [2,1],
  [1,2], [2,2],
  [1,5], [2,3],
  [1,4], [2,4],
  [1,3]
];
console.log('horizontal game test')
for (let i = 0; i<gameClicks.length;i++){
  onClick(gameClicks[i])
}

//vertical win test
init();
var gameClicks = [
  [1,1], [1,2],
  [2,1], [2,2],
  [5,1], [3,2],
  [4,1], [4,2],
  [3,1]
];
console.log('vertical game test')
for (let i = 0; i<gameClicks.length;i++){
  onClick(gameClicks[i])
}



/*
//CONTROLLER

function onClick(click, board, currentPlayer){
  console.log('player turn: ' + currentPlayer)
  console.log('click location: ' + click);
  if (checkifEmpty(click, board)) {
    console.log('location empty: true')
    console.log('updating value...new board:')
    updateValue(click, board, currentPlayer);
    console.log(board);
    //update view
    console.log('checking for win...')
    checkfor5win(click, board, currentPlayer);
    console.log('check completed');
    // check for capture
        // If capture remove 2 middle pieces from model
        // Send change to view
    // check for capture win
      // if true
        // apply end of game view state
        // stop taking inputs
    
    console.log('updating currentPlayer...')
    currentPlayer === players[0] ? currentPlayer = players[1] : currentPlayer = players[0];
    console.log(currentPlayer)
  }
}

function checkfor5win(click, board, currentPlayer) {
  if (
    checkVertical(click, board, currentPlayer) //||
    //checkHorizontal(click, board, currentPlayer) ||
    //checkDiagLR(click, board, currentPlayer) ||
    //checkDiagRL(click, board, currentPlayer)
  ) { console.log('in a row win vertical')
      // apply end of game view state
      // stop taking inputs
  }
}
  
function checkVertical(click, board, currentPlayer) {
  return 1 + checkUp(click, board, currentPlayer) + checkDown(click, board, currentPlayer) >= 5;
}
  
function checkUp(click, board, currentPlayer){
  var matchingUp = 0;
  var direction = -1;
  while(board[click[0] + direction][click[1]] === currentPlayer){
    matchingUp += 1;
    direction += direction;
  }
  return matchingUp
}

function checkDown(click, board, currentPlayer){
  var matchingDown = 0;
  var direction = 1;
  while(board[click[0] + direction][click[1]] === currentPlayer){
    matchingDown += 1;
    direction += direction;
  }
  return matchingDown
}

function checkifEmpty(click, board){
  if (board[click[0]][click[1]] === 0){
    return true
  } else {
    return false
  }
}

function updateValue(click, board, currentPlayer) {
  board[click[0]][click[1]] = currentPlayer;
}
  


//GAME TEST

var gameClicks = [
  [1,1], [1,2],
  [2,1], [2,2],
  [3,1], [3,2],
  [4,1], [4,2],
  [5,2], [5,2]
]

function vertWinTest(gameClicks, board, currentPlayer, players){
  
  for (let i = 0; i<gameClicks.length;i++){
    onClick(gameClicks[i], board, currentPlayer, players)
  }
}



//vertWinTest(gameClicks, theBoard, ourCurrentPlayer, players)

*/
/*

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
*/