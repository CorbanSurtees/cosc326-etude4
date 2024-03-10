var toDraw = []

function generateSquares() {
    toDraw = []
    var paragraphInput = document.getElementById("paragraphInput");
    var mainContent = document.getElementById("mainContent");

    // Remove any existing square
    var existingSquare = mainContent.querySelector(".square");
    while (existingSquare) {
        mainContent.removeChild(existingSquare);
        existingSquare = mainContent.querySelector(".square");
    }

    paragraphInput.value = paragraphInput.value.trim()
    var inputValues = paragraphInput.value.split("\n");

    console.log(inputValues)
    if (inputValues.length == 0 || inputValues[0].length == 0) {
        inputValues = ["1.0 255 0 0", "0.8 0 255 0", "0.1 0 0 255"]
    }

    var total = 0
    for (var i = 0; i < inputValues.length; i++) {
        var square = inputValues[i]
        var values = square.trim().split(" ")
        if (values.length != 4) {
            alert("Line " + (i+1) + ": Expected 4 values but recieved " + values.length)
            return 0
        }
        if (values[0] < 0) {
            alert("Line " + (i+1) + ": Scale must be 0 or higher")
            return -1
        }
        if (values[1] > 255 || values[1] < 0 || values[2] > 255 || values[2] < 0 || values[3] > 255 || values[3] < 0) {
            alert("Line " + (i+1) + ": Colour values outside of range (0-255)")
            return 0
        }
        total += parseFloat(values[0])
    }

    var scale = (mainContent.offsetHeight*0.75)/total
    console.log(scale)

    createSquareAt(0, 0, inputValues, scale, 0)
}

function createSquareAt(x, y, squares, scale, depth) {

    if (depth >= squares.length) {
        return
    }

    // Extract size and RGB values
    var values = squares[depth].split(" ");
    var size = parseFloat(values[0]) * scale;
    var red = parseFloat(values[1]);
    var green = parseFloat(values[2]);
    var blue = parseFloat(values[3]);

    // Create a square element
    var square = document.createElement("div");
    square.className = "square";

    // Set the size and color of the square
    square.style.width = size + "px";
    square.style.height = size + "px";
    square.style.backgroundColor = "rgb(" + red + ", " + green + ", " + blue + ")";
    square.style.marginTop = y + 'px'
    square.style.marginLeft = x + 'px'

    if (!toDraw[depth]) {
        toDraw[depth] = []
    }
    toDraw[depth].push(square)

    createSquareAt(x + size/2, y + size/2, squares, scale, depth + 1)
    createSquareAt(x + size/2, y - size/2, squares, scale, depth + 1)
    createSquareAt(x - size/2, y + size/2, squares, scale, depth + 1)
    createSquareAt(x - size/2, y - size/2, squares, scale, depth + 1)

    // recursive algorithm is complete
    if (depth == 0) {
        drawSquares()
    }
}

function drawSquares() {
    toDraw.forEach(x => {
        x.forEach(square => {
            mainContent.appendChild(square)
        })
    })
}
