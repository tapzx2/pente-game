var grid = 3;


var gridContainerOpen = '<div class="grid-container">\n'
var gridContainerClose = '</div>';

let output = '';
for (let i = 1; i <= gridItems; i++){
  output+= `<div class="grid-item">${i}</div>\n`
}
console.log(output);

console.log(gridContainerOpen + gridContainerClose);

function printGrid(grid){
  let output = '';

  output += '<div class="grid-container">\n'
  for (let i = 1; i <= (grid*grid); i++){
    output+= `  <div class="grid-item">${i}</div>\n`
  output += gridContainerClose = '</div>';
  console.log(output);
}
