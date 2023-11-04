//assign canvas to variables
const board = document.getElementById("gameCanvas");
const boardCTX = board.getContext("2d");

//assign colours
const boardBackground = 'lightgrey';
const boardBorder = 'black';
const snakeColor = 'lightgreen';
const snakeBorder = 'darkgreen';

//create snake
let snake = [ {x: 300, y: 300}, {x: 285, y: 300}, {x: 270, y: 300}, {x: 255, y: 300}, {x: 240, y: 300}];

//initialise snake moving right
let dx = 15;
let dy = 0;

//function to draw each part of the snake
function drawSnakeBlock(snakeBlock) {
    boardCTX.fillStyle = snakeColor;
    boardCTX.strokeStyle = snakeBorder;
    boardCTX.fillRect(snakeBlock.x, snakeBlock.y, 15, 15);
    boardCTX.strokeRect(snakeBlock.x, snakeBlock.y, 15, 15);
};

//function to draw whole snake
function drawSnake() {
    snake.forEach(drawSnakeBlock);
};

//function to clear canvas
function clearCanvas() {
    boardCTX.fillStyle = boardBackground; 
    boardCTX.strokeStyle = boardBorder;
    boardCTX.fillRect(0, 0, board.width, board.height);
    boardCTX.strokeRect(0, 0, board.width, board.height);
};

//function to move shake
function moveSnake() {
    const head = {x: snake[0].x + dx, y: snake[0].y + dy};
    snake.unshift(head);
    snake.pop();
};

//function to change snake direction
function changeDirection(event) {
    const leftKey = 37;
    const rightKey = 39;
    const upKey = 38;
    const downKey = 40;

    const keyPressed = event.keyCode;
    const movingLeft = (dx === -15);
    const movingRight = (dx === 15);
    const movingUp = (dy === -15);
    const movingDown = (dy === 15);

    if (keyPressed === leftKey && !movingRight) {
        dx = -15;
        dy = 0;
    };

    if (keyPressed === rightKey && !movingLeft) {
        dx = 15;
        dy = 0;
    };

    if (keyPressed === upKey && !movingDown) {
        dx = 0;
        dy = -15;
    };

    if (keyPressed === downKey && !movingUp) {
        dx = 0;
        dy = 15;
    };

};

//add event listener for key press
document.addEventListener('keydown', changeDirection);

//this function will loop to keep game running
function main() {
    setTimeout(function onTick() {
        clearCanvas();
        moveSnake();
        drawSnake();
        main();
    }, 100);
};

//start game
main();
