// mudar grid so quando solta o cursor
// preview da cor na tela
// arrumar o clique
//

document.onload = createGrid(16);
changeGrid();
let trigger;
let currentMode = "black";
let color;
let j = 0;
let gridOff = true

function createGrid(numBox) {
  let container = document.getElementById("grid-container");
  container.style.gridTemplateColumns = `repeat(${numBox}, auto [col-start])`;
  totalBox = numBox * numBox;
  deleteGrid(container);
  let cells = document.getElementsByClassName("cell");
  paintCell();
}


function deleteGrid(container) {
  while (container.firstChild) {
    container.removeChild(container.lastChild);
  }
  for (let i = 0; i < totalBox; i++) {
    let cell = document.createElement("div");
    cell.classList.add("cell");
    container.appendChild(cell);
  }
}

function changeGrid() {
  let slider = document.getElementById("myRange");
  slider.addEventListener("input", function () {
    let sliderValue = slider.value;
    changeSliderValue(sliderValue);
    createGrid(sliderValue);
  });
}

function changeSliderValue(sliderValue) {
  document.getElementById("range-value").textContent = sliderValue;
}

function paintCell() {
  let cells = document.getElementsByClassName("cell");
  for (const cell of cells) {
    let i = 100;
     
    
    cell.addEventListener("click", () => {
       
          if (currentMode === "black") {
            i = paintBlack(i, cell);
          } else if (currentMode === "rainbow") {
            j = paintRainbow(j, cell);
          } else if (currentMode === "eraser") {
            eraser(cell);
          }
          else if (currentMode === "color-picker") {
              pickColor(cell);
          }
        
      });

    cell.addEventListener("mouseover", () => {
      if (trigger) {
        if (currentMode === "black") {
          i = paintBlack(i, cell);
        } else if (currentMode === "rainbow") {
          j = paintRainbow(j, cell);
        } else if (currentMode === "eraser") {
          eraser(cell);
        }
        else if (currentMode === "color-picker") {
            pickColor(cell);
        }
      }
    });
  }
}

document.addEventListener("mousedown", () => {
  trigger = true;
});

document.addEventListener("mouseup", () => {
  trigger = false;
});

function paintBlack(i, cell) {
  i -= 10;
  cell.style.backgroundColor = `hsla(0, 0%, ${i}%, 1)`;
  return i;
}
function eraser(cell) {
  cell.style.backgroundColor = `hsla(0, 100%, 100%, 1)`;
}

function paintRainbow(j, cell) {
  j += 1;
  cell.style.backgroundColor = `hsla(${j}, 100%, 50%, 1)`;
  return j;
}

function pickColor(cell) {
    color = colorPicker.value;
    cell.style.backgroundColor = color;
}

let rainbowBtn = document.getElementById("rainbowmode");
let blackBtn = document.getElementById("blackmode");
let eraserBtn = document.getElementById("eraser");
let colorPicker = document.getElementById("color-picker");
let gridBtn = document.getElementById("guide");
rainbowBtn.addEventListener("click", () => {
  currentMode = "rainbow";
});
blackBtn.addEventListener("click", () => {
  currentMode = "black";
});
eraserBtn.addEventListener("click", () => {
  currentMode = "eraser";
});
colorPicker.addEventListener("click", () => {
    currentMode = "color-picker";
  });
gridBtn.addEventListener("click", () => {
    let cells = document.getElementsByClassName("cell");
    toggleGrid(cells);
});
 function toggleGrid(cells) {
if (gridOff) {
    for (const cell of cells) {
        cell.style.border = "0.25px solid rgba(0,0,0,0.33)";
    }
    gridOff = false;
}
else {
    for (const cell of cells) {
        cell.style.border = "0px";
    }
    gridOff = true;
}
   
 }
