//Canvas variables
let canvas = document.getElementById("snake");
let context = canvas.getContext("2d");

//Game variables
let box = 32;
let snake = [];
snake[0] = {
    x: 8 * box,
    y: 8 * box
}
let direction = "right";
let food = {
    x: Math.floor(Math.random() * 15 + 1) * box,
    y: Math.floor(Math.random() * 15 + 1) * box
}

//Page variables
let botao = document.getElementById("start");
let score = 0;
let level = 1;
let snakeskin = "blue";

let scoreValue = document.getElementById('scorevalue');

let gameover = document.getElementById('gameover');


document.addEventListener("keydown", function(event) {
    var containerUp = document.getElementById("container-up");
    var containerDown = document.getElementById("container-down");
    var containerLeft = document.getElementById("container-left");
    var containerRight = document.getElementById("container-right");

    // Reset all containers
    containerUp.classList.remove("active");
    containerDown.classList.remove("active");
    containerLeft.classList.remove("active");
    containerRight.classList.remove("active");

    // Add active class based on key press
    if (event.key === "ArrowUp") {
        containerUp.classList.add("active");
    } else if (event.key === "ArrowDown") {
        containerDown.classList.add("active");
    } else if (event.key === "ArrowLeft") {
        containerLeft.classList.add("active");
    } else if (event.key === "ArrowRight") {
        containerRight.classList.add("active");
    }
});

//Functions
function
criarBG() {
    context.fillStyle = "lightgreen";
    context.fillRect(0, 0, 16 * box, 16 * box);
};

function criarCobrinha() {
    for (i = 0; i < snake.length; i++) {
        context.fillStyle = snakeskin;
        context.fillRect(snake[i].x, snake[i].y, box, box);
    }
}

criarBG();
criarCobrinha();

function drawFood() {
    context.fillStyle = "red";
    context.fillRect(food.x, food.y, box, box);
}

document.addEventListener('keydown', update);

function update(event) {
    if (event.keyCode == 37 && direction != "right") direction = "left";
    if (event.keyCode == 38 && direction != "down") direction = "up";
    if (event.keyCode == 39 && direction != "left") direction = "right";
    if (event.keyCode == 40 && direction != "up") direction = "down";
}

function iniciarJogo() {
    if (snake[0].x > 15 * box && direction !== "left") snake[0].x = 0;
    if (snake[0].x < 0 && direction != "right") snake[0].x = 15 * box;
    if (snake[0].y > 15 * box && direction != "up") snake[0].y = 0;
    if (snake[0].y < 0 && direction != "down") snake[0].y = 15 * box;

    for (i = 1; i < snake.length; i++) {
        if (snake[0].x == snake[i].x && snake[0].y == snake[i].y) {
            clearInterval(jogo);
            gameOver();
            botao.disabled = false;
        }
    }


    criarBG();
    criarCobrinha();
    drawFood();


    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if (direction == "right") snakeX += box;
    if (direction == "left") snakeX -= box;
    if (direction == "up") snakeY -= box;
    if (direction == "down") snakeY += box;

    if (snakeX != food.x || snakeY != food.y) {
        snake.pop();
    } else {
        food.x = Math.floor(Math.random() * 15 + 1) * box;
        food.y = Math.floor(Math.random() * 15 + 1) * box;

        score += 50;
        scoreValue.innerHTML = score;

        console.log(scoreValue.defaulValue);
    }

    let newHead = {
        x: snakeX,
        y: snakeY
    }

    snake.unshift(newHead);
}



// Game start and restart
botao.addEventListener("click", function clicou() {
    jogo = setInterval(iniciarJogo, 100)
    this.style.display = "none";
});

function restart() {
    window.location.reload();
}

function gameOver() {
    clearInterval(jogo);
    gameover.style.display = "flex";
}