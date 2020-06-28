//set number to desired grid dimentions, will generate the click and display grids for pente.

var grid = 10;

printGrids(grid);
printGridCSS(grid);


function printGrids(grid){
  let output;
  let clickGrid = grid*grid;
  let displayGrid = clickGrid - grid;

  printGrid(grid, 'click-grid');
  printGrid(grid-1, 'display-grid');

  function printGrid(grid, secondClass){
    output = '';
    output += `<div class="grid-container ${secondClass}">\n`
    var counter = 1;
    for (let i = 0; i < grid; i++){
      for (let j = 0; j < grid; j++){
      output+= `  <div data-coordinates="${i}-${j}" class="grid-item">${counter}</div>\n`;
      counter++;
      }
    }
    output += gridContainerClose = '</div>';
    console.log(output);
  }
};


function printGridCSS(grid){
  let output = '';
  output += `.grid-container {\n`;
  output += `  display: grid;\n`
  output += `  grid-template-columns: repeat(${grid}, 50px);\n`;
  output += `  grid-template-rows: repeat(${grid}, 50px);\n`;
  output += `}`
  console.log(output);
}
