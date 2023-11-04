//assign canvas to variables
const board = document.getElementById("gameCanvas");
const boardCTX = board.getContext("2d");

//assign colours
const boardBackground = 'lightgrey';
const boardBorder = 'black';
const snakeColor = 'lightgreen';
const snakeBorder = 'darkgreen';
const foodColor = 'lightblue';
const foodBorder = 'darkblue';

//assign vars to use in event loop
let changingDirection = false;
let score = 0;

//create snake
let snake = [ {x: 300, y: 300}, {x: 285, y: 300}, {x: 270, y: 300}, {x: 255, y: 300}, {x: 240, y: 300}];

//initialise snake and food
let dx = 15;
let dy = 0;
let foodX;
let foodY;

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

    if (snake[0].x === foodX && snake[0].y === foodY) {
        score += 10;
        document.getElementById('score').innerHTML = score;
        generateFood();
    } else {
        snake.pop();
    };
};

//function to change snake direction
function changeDirection(event) {
    const leftKey = 37;
    const rightKey = 39;
    const upKey = 38;
    const downKey = 40;

    if (changingDirection) return;
    changingDirection = true;

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

//function to end game if snake or wall hit
function endGame() {
    for (let i = 4; i < snake.length; i++) {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
            return true;
        };
    };

    const leftWallHit = (snake[0].x < 0);
    const rightWallHit = (snake[0].x > board.width - 15);
    const topWallHit = (snake[0].y < 0); 
    const bottomWallHit = (snake[0].y > board.height - 15);

    if (leftWallHit || rightWallHit || topWallHit || bottomWallHit) {
        return true;
    };
};

//function to generate random food location on canvas
function randomFoodLocation(min, max) {
    return Math.round((Math.random() * (max - min) + min) / 15) * 15;
};

//function to add food randomly
function generateFood() {
    foodX = randomFoodLocation(0, board.width - 15);
    foodY = randomFoodLocation(0, board.height - 15);

    snake.forEach(function hasSnakeEaten(part) {
        if (part.x == foodX && part.y == foodY) generateFood();
    });
};

//function to draw food to canvas
function drawFood() {
    boardCTX.fillStyle = foodColor;
    boardCTX.strokeStyle = foodBorder;
    boardCTX.fillRect(foodX, foodY, 15, 15);
    boardCTX.strokeRect(foodX, foodY, 15, 15);
};

//this function will loop to keep game running
function main() {
    if (endGame()) {
        document.getElementById('score').innerHTML = `Game Over! Score: ${score}`;
        document.addEventListener('keydown', startGame);
        snake = [ {x: 300, y: 300}, {x: 285, y: 300}, {x: 270, y: 300}, {x: 255, y: 300}, {x: 240, y: 300}];
        return;
    };

    changingDirection = false;

    setTimeout(function onTick() {
        clearCanvas();
        drawFood();
        moveSnake();
        drawSnake();
        main();
    }, 100);
};

//function to start game
function startGame(event) {
    if (event.keyCode === 37 || event.keyCode === 38 || event.keyCode === 39 || event.keyCode === 40) {
        //add event listener for key press
        document.addEventListener('keydown', changeDirection);
        //generate first food
        generateFood();
        main();
        document.removeEventListener('keydown', startGame);
    };
};

//add event listener to start game
document.addEventListener('keydown', startGame);







