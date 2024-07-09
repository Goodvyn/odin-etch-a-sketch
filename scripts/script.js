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
        gridContainerChildren[i].style.opacity = 1;
    }
}

function chooseRandomColorRGB() {
    let red = Math.floor(Math.random() * 256);
    let green = Math.floor(Math.random() * 256);
    let blue = Math.floor(Math.random() * 256);
    let rgbValue = `rgb(${red},${green},${blue})`;
    return rgbValue;
}

function reduceElementOpacity(element) {
    let elementOpacity = element.style.opacity;

    if (elementOpacity <= 0) {
        elementOpacity = 1;
    } else {
        elementOpacity -= 0.1;
    }

    element.style.opacity = elementOpacity;
}

function resetElementOpacity(element) {
    element.style.opacity = 1;
}

function changeColorOnHover(element, startColor) {
    element.addEventListener("mouseenter", (e) => {
        if (isMouseDown && !isEraseActive) {

            element.style.backgroundColor = chooseRandomColorRGB();
            reduceElementOpacity(element);

        } else if (isMouseDown && isEraseActive) {

            element.style.backgroundColor = startColor;
            resetElementOpacity(element);
        }
    });

    element.addEventListener("mousedown", (e) => {
        if (!isEraseActive) {

            element.style.backgroundColor = chooseRandomColorRGB();
            reduceElementOpacity(element);

        } else {

            element.style.backgroundColor = startColor;
            resetElementOpacity(element);

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
        gridCell.style.opacity = 1;
        changeColorOnHover(gridCell, startColor);
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
    } while ((!userInputGridSize || isNaN(userInputGridSize)) ||
        (userInputGridSize < 1 || userInputGridSize > 100));

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
