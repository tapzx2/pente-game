//set number to desired grid dimentions, will generate the click and display grids for pente.

var grid = 10;

printGrids(grid);
printGridCSS(grid);


function printGrids(grid){
  let output;
  let clickGrid = grid*grid;
  let displayGrid = clickGrid - grid;

  printGrid(clickGrid);
  printGrid(displayGrid);

  function printGrid(grid){
    output = '';
    output += '<div class="grid-container">\n'
    for (let i = 1; i <= (grid); i++){
      output+= `  <div class="grid-item">${i}</div>\n`
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
