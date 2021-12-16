const drawingBoard = document.querySelector(".drawing-container");
//Primitive functionality no argument.Small steps//
drawingBoard.setAttribute(
  "style",
  "grid-template-columns:repeat(16,1fr);grid-template-rows(16,1fr);"
);

function drawBoard() {
  for (i = 0; i < 16 * 16; i++) {
    newDiv = document.createElement("div");
    drawingBoard.appendChild(newDiv);
  }
}


function eraseBoard(){
    boardNodes.forEach((boardNode) =>{
    boardNode.classList.remove('paint-it-yellow');
  });
}



drawBoard();
let boardNodes = document.querySelectorAll(".drawing-container div");
console.log(boardNodes);
//Colouring behaviour//
boardNodes.forEach((boardNode) =>
  boardNode.addEventListener("mouseover", (e) => {
    e.target.classList.add('paint-it-yellow');
  })
);
//Reset button//
const resetButton=document.querySelector('#clear');
resetButton.addEventListener('click',eraseBoard);
