var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var toDraw = [];
var flippedImage = false;

canvas.width = document.getElementById("mainContent").offsetWidth
canvas.height = document.getElementById("mainContent").offsetHeight

function generateSquares() {
    // get the text from text box
    var paragraphInput = document.getElementById("paragraphInput");
    generateSquaresInput(paragraphInput.value)
}

function generateSquaresInput(paragraphInput) {
    // list of squares we need to draw
    toDraw = []
    var mainContent = document.getElementById("mainContent");

    paragraphInput = paragraphInput.trim()
    var inputValues = paragraphInput.split("\n");

    if (inputValues.length == 0 || inputValues[0].length == 0) {
        inputValues = ["1.0 255 0 0", "0.8 0 255 0", "0.1 0 0 255"]
    }

    // keep track of total scale of squares
    var totalScale = 0
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
        totalScale += parseFloat(values[0])
    }

    // scale to multiply size of squares by, divided by total scale to ensure any pattern is the same size
    var scale = (mainContent.offsetHeight*0.75)/totalScale

    // draw the first square at (0, 0)
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
    var colour = "rgb(" + red + ", " + green + ", " + blue + ")";

    if (!toDraw[depth]) {
        toDraw[depth] = []
    }
    // push square at depth so the draw function knows what order to draw the squares in
    toDraw[depth].push([x, y, size, colour])

    // recursive call to create next square in each corner of the square
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
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (flippedImage) {
        toDraw = toDraw.reverse()
    }
    toDraw.forEach(depth => {
        depth.forEach(square => {
            drawSquareOnCanvas(square);
        })
    })
}

function drawSquareOnCanvas(square) {
    var color = square[3]
    ctx.fillStyle = color;
    var centerX = canvas.width / 2;
    var centerY = canvas.height / 2;
    var squareLeft =  square[0]
    var squareTop =  square[1]
    var squareWidth =  square[2]
    var squareHeight =  square[2]
    ctx.fillRect(centerX + squareLeft - squareWidth/2, centerY + squareTop - squareHeight/2, squareWidth, squareHeight);
}

// Function to save the canvas as an image
function exportImage() {
    var link = document.createElement('a');
    link.download = 'quilt.png';
    link.href = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
    link.click();
}

// flip display of image
function flip() {
    flippedImage = !flippedImage
    generateSquares()
}

// create square using examples
function example1() {
    input = `
128 204 204 204
64 204 204 204
32 0 0 0
16 0 0 0
8 0 0 0
4 0 0 0
2 0 0 0
1 0 0 0
    `
    document.getElementById("paragraphInput").value = input.trim()

    generateSquaresInput(input)
}

function example2() {
    input = `
81 255 0 0
27 0 255 0
9 0 0 255
3 255 0 0
1 0 255 0
    `
    document.getElementById("paragraphInput").value = input.trim()

    generateSquaresInput(input)
}

function example3() {
    input = `
1 255 0 0
0.8 0 255 0
0.1 0 0 255
0.5 255 0 255
    `
    document.getElementById("paragraphInput").value = input.trim()

    generateSquaresInput(input)
}

