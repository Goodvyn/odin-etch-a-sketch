const gridContainer = document.querySelector(".grid-container");
const resetBtn = document.querySelector(".btn-reset");
const eraseBtn = document.querySelector(".btn-erase");
const sizeBtn = document.querySelector(".btn-change-canvas-size");

let startColor = "white";
let brushColor = "lightblue";

let gridAxisLength = 16;
let gridCellSizePercent = 0;

let isMouseDown = false;
let isEraseActive = false;

function clearGrid() {
    let gridContainerChild = gridContainer.lastElementChild;
    while (gridContainerChild) {
        gridContainer.removeChild(gridContainerChild);
        gridContainerChild = gridContainer.lastElementChild;
    }
}
function resetGridColors(grid, color) {

    let gridContainerChildren = grid.children;
    for (let i = 0; i < gridContainerChildren.length; i++) {
        gridContainerChildren[i].style.backgroundColor = color;
    }
}


function changeColorOnHover(element, brushColor, startColor) {

    element.addEventListener("mousemove", (e) => {
        if (isMouseDown && !isEraseActive) {
            element.style.backgroundColor = brushColor;
        } else if (isMouseDown && isEraseActive) {

            element.style.backgroundColor = startColor;
        }
    });

    element.addEventListener("mousedown", (e) => {
        if (!isEraseActive) {
            element.style.backgroundColor = brushColor;
        } else {
            element.style.backgroundColor = startColor;
        }
    });
}

function makeGrid() {
    clearGrid();
    gridCellSizePercent = 100 / gridAxisLength;
    for (let i = 0; i < gridAxisLength * gridAxisLength; i++) {
        let gridCell = document.createElement("div");
        gridCell.setAttribute("class", "grid-cell");
        gridCell.setAttribute("id", `cell-${i + 1}`);
        gridCell.style.backgroundColor = `${startColor}`;
        gridCell.style.width = `${gridCellSizePercent}%`;
        gridCell.style.height = `${gridCellSizePercent}%`;
        changeColorOnHover(gridCell, brushColor, startColor);
        gridContainer.appendChild(gridCell);
    }

}



document.addEventListener("mousedown", () => {
    isMouseDown = true;
});

document.addEventListener("mouseup", () => {
    isMouseDown = false;
});

sizeBtn.addEventListener("click", () => {
    let userInputGridSize = 0;
    do {
        userInputGridSize = prompt("Enter the grid size(up to 100)", gridAxisLength);
    } while (!userInputGridSize || isNaN(userInputGridSize));
    gridAxisLength = userInputGridSize;
    makeGrid();
});

resetBtn.addEventListener("click", () => {
    resetGridColors(gridContainer, startColor);
});

eraseBtn.addEventListener("click", () => {
    if (!isEraseActive) {
        isEraseActive = true;
        eraseBtn.style.backgroundColor = "lightgreen";
    } else {
        isEraseActive = false;
        eraseBtn.style.backgroundColor = "";
    }
});


window.addEventListener("load", makeGrid);