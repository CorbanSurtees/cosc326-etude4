var toDraw = ""

function generateSquares() {
    var paragraphInput = document.getElementById("paragraphInput");
    var mainContent = document.getElementById("mainContent");

    // Remove any existing square
    var existingSquare = mainContent.querySelector(".square");
    while (existingSquare) {
        mainContent.removeChild(existingSquare);
        existingSquare = mainContent.querySelector(".square");
    }

    // Get the value of the input
    var inputValues = paragraphInput.value.split("\n");

    createSquareAt(0, 0, inputValues, 0)

    if (inputValues.length > 1) {
        generateSquare()
    }
}

function createSquareAt(x, y, squares, depth) {

    if (depth >= squares.length) {
        return
    }

    // Extract size and RGB values
    var values = squares[depth].split(" ");
    var size = parseInt(values[0]);
    var red = parseInt(values[1]);
    var green = parseInt(values[2]);
    var blue = parseInt(values[3]);

    // Create a square element
    var square = document.createElement("div");
    square.className = "square";

    // Set the size and color of the square
    square.style.width = size + "px";
    square.style.height = size + "px";
    square.style.backgroundColor = "rgb(" + red + ", " + green + ", " + blue + ")";
    square.style.marginTop = y + 'px'
    square.style.marginLeft = x + 'px'

    // Append the square to the main content
    mainContent.appendChild(square);

    createSquareAt(x + size/2, y + size/2, squares, depth + 1)
    createSquareAt(x + size/2, y - size/2, squares, depth + 1)
    createSquareAt(x - size/2, y + size/2, squares, depth + 1)
    createSquareAt(x - size/2, y - size/2, squares, depth + 1)
}
