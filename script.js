//assign canvas to variables
const board = document.getElementById("gameCanvas");
const board_ctx = board.getContext("2d");

//create snake
let snake = [ {x: 300, y: 300}, {x: 290, y: 300}, {x: 280, y: 300}, {x: 270, y: 300}, {x: 260, y: 200}];

//function to draw each part of the snake
function drawSnakeBlock(snakeBlock) {
    board_ctx.fillStyle = 'lightgreen';
    board_ctx.strokeStyle = 'green';
    board_ctx.fillRect(snakeBlock.x, snakeBlock.y, 10, 10);
    board_ctx.strokeRect(snakeBlock.x, snakeBlock.y, 10, 10);
};

function drawSnake() {
    snake.forEach(drawSnakeBlock);
    console.log('draw snake run');
}

drawSnake();