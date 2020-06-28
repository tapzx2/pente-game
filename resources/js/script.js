/* add playing at the bottom and left / right sizes game tests*/

//MODEL
//cordinates go row, column
const players = [1, 2];

var grid;
var playerTurn;
var oppositePlayerTurn;
var record;
var captures;
var capturePattern;
var playingGame;
var playerColors;

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
  record = [];
  captures = [0, 0];
  capturePattern = [playerTurn, oppositePlayerTurn, oppositePlayerTurn, playerTurn];
  playingGame = true;
  playerColors = ['rgb(234, 228, 174)', 'rgb(189, 235, 255)'];
  document.querySelector('.message-box p').textContent = 'Player Turn';
};

//VIEW
//on click pass click coordinate location to JS

function showGrid() {
  for (let i = 0; i<10; i++){
    for (let j = 0; j<10; j++) {
      if (grid[i][j] === players[0]){
        document.querySelector(`.click-grid [data-coordinates="${i}-${j}"]`).style.backgroundColor = playerColors[0];
      } 
      if (grid[i][j] === players[1]){
        document.querySelector(`.click-grid [data-coordinates="${i}-${j}"]`).style.backgroundColor = playerColors[1];
      }
      if (grid[i][j] === 0){
        document.querySelector(`.click-grid [data-coordinates="${i}-${j}"]`).style.backgroundColor = '';
      }
    }
  }
}

function showPlayerTurn(){
  console.log(playerTurn);
}

//CONTROLER

init();
window.addEventListener('click', function(){
  if (event.target.matches('.click-grid .grid-item')) {
    console.log(formatClick(event.target.dataset.coordinates))
    var playerClick = formatClick(event.target.dataset.coordinates)
    onClick(playerClick);
  }
})

function formatClick(input){
  var output = [];
  var asArray = input.split('-');
  for (let i = 0; i<asArray.length;i++){
    output.push(Number.parseInt(asArray[i]));
  }
  return output
}

//I think this is all model stuff

function onClick(click){
  if(playingGame && grid[click[0]][click[1]] === 0){
    console.log('turn: ' + (record.length + 1));
    //console.log(capturePattern);
    makeRecord(click)
    updateBoard(click);
    showGrid();
    checkfor5win(click);
    checkforCapture(click);
    checkforCaptureWin();
    //add check for capture win
    showGrid();
    updatePlayerTurn();
    showWinMsg();
  }
}

// show win message
function showWinMsg(){
  if (playingGame === false){
    document.querySelector('.message-box p').textContent = 'Wins!';
  }
}

//check for capture win
function checkforCaptureWin() {
  if (captures[0] >= 5) {
    console.log(`player ${players[0]} wins!`)
    playingGame = false;
  } else if (captures[1] >= 5) {
    console.log(`player ${players[1]} wins!`)
    playingGame = false;
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
        captures[playerTurn-1] += 1;
        console.log(captures);
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
      click[0] + (rowVec * i) > 9 ||
      click[1] + (colVec * i) > 9 ||
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
    playingGame = false;
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
    click[0] + rowDirection <= 9 &&
    click[1] + colDirection <= 9 &&
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
    click[0] + rowDirection <= 9 &&
    click[1] + colDirection <= 9 &&
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
    click[0] + rowDirection <= 9 &&
    click[1] + colDirection <= 9 &&
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
  console.log(click[0] + direction);
  while(
    click[0] + direction <= 9 &&
    grid[click[0] + direction][click[1]] === playerTurn)
    {
    matchingDown += 1;
    direction += 1;
  }
  return matchingDown
}

//update model functions

function updatePlayerTurn(){
  if (playingGame === true){
    playerTurn === players[0] ? playerTurn = players[1] : playerTurn = players[0];
    oppositePlayerTurn === players[1] ? oppositePlayerTurn = players[0] : oppositePlayerTurn = players[1];
    capturePattern = [playerTurn, oppositePlayerTurn, oppositePlayerTurn, playerTurn];
    
    //change message-box div color
    console.log('playerTurn:' + playerTurn)
    console.log('playerColors[0]: ' + playerColors[0]);
    console.log('playerColors[1]: ' + playerColors[1]);
  
    if (playerTurn === players[0]){
      document.querySelector('.game-screen .first').style.backgroundColor = playerColors[0]
    }
    if (playerTurn === players[1]){
      document.querySelector('.game-screen .first').style.backgroundColor = playerColors[1]
    }
  }
}

function updateBoard(click){
  grid[click[0]][click[1]] = playerTurn;
}

function makeRecord(click) {
  record.push(click);
}


/* ----------------------- */
/* START SCREEN */
/* ----------------------- */
document.querySelector('.start-screen .play').addEventListener('click', function(){
  document.querySelector('.start-screen').style.display = 'none';
  document.querySelector('.game-screen').style.display = 'flex';
})

document.querySelector('.start-screen .rules').addEventListener('click', function(){
  document.querySelector('.start-screen').style.display = 'none';
  document.querySelector('.rules-screen').style.display = 'flex';
})

/* ----------------------- */
/* RULES SCREEN */
/* ----------------------- */

document.querySelector('.back').addEventListener('click', function(){
  document.querySelector('.rules-screen').style.display = 'none';
  document.querySelector('.start-screen').style.display = 'flex';
})

document.querySelector('.captures').addEventListener('click', function(){
  document.querySelector('.rules-screen').style.display = 'none';
  document.querySelector('.capture-screen').style.display = 'flex';
})

/* ----------------------- */
/* CAPTURE SCREEN */
/* ----------------------- */
document.querySelector('.capture-screen .play').addEventListener('click', function(){
  document.querySelector('.capture-screen').style.display = 'none';
  document.querySelector('.game-screen').style.display = 'flex';
})

document.querySelector('.capture-screen .rules').addEventListener('click', function(){
  document.querySelector('.capture-screen').style.display = 'none';
  document.querySelector('.rules-screen').style.display = 'flex';
})

/* ----------------------- */
/* GAME SCREEN */
/* ----------------------- */

/* message box color update is in function updatePlayerTurn*/

/* bottom menu */
document.querySelector('.game-screen .rules').addEventListener('click', function(){
  document.querySelector('.game-screen').style.display = 'none';
  document.querySelector('.rules-screen').style.display = 'flex';
})

document.querySelector('.game-screen .play').addEventListener('click', function(){
  init();
  showGrid();
});


/*

//GAME TESTS

//end game functionality test
init();
var gameClicks = [
  [1,1], [1,2],
  [2,1], [2,2],
  [5,1], [3,2],
  [4,1], [4,2],
  [3,1], [6,6]
];
console.log('end game on 5 in a row win functionality test')
console.log('should not have turn 10')
for (let i = 0; i<gameClicks.length;i++){
  onClick(gameClicks[i])
}

//capture tests

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



*/