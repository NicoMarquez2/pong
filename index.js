let canvas = document.getElementById("canvas")
let ctx = canvas.getContext("2d")

const screenWidth = document.documentElement.clientWidth
const screenHeight = document.documentElement.clientHeight

canvas.width =  screenWidth 
canvas.height = screenHeight

ctx.fillStyle = "#ffffff";

function seleccionarAleatorio(num1, num2) {
    let random = Math.random();
    if (random < 0.5) {
      return num1;
    } else {
      return num2;
    }
  }

class Ball {
    constructor(){
        this.height = 20
        this.width = 20

        this.speedX = seleccionarAleatorio(-3, 3)
        this.speedY = seleccionarAleatorio(-2, 2)

        this.positionX = canvas.width / 2
        this.positionY = canvas.height / 2
    }

    drawBall(){
        ctx.beginPath();
        ctx.arc(this.positionX, this.positionY, 10, 0, Math.PI*2);
        ctx.fillStyle = "#0095DD";
        ctx.fill();
        ctx.closePath();
    }


}

class Paddle{
    constructor(positionX){
        this.height = 100
        this.width = 20

        this.speed = 4

        this.positionY = canvas.height / 2 - this.height / 2;
        this.positionX = positionX
    }

    draw(){
        ctx.fillRect(this.positionX, this.positionY, this.width, this.height)
    }
}
const leftPaddle = new Paddle(0)
const rightPaddle = new Paddle(canvas.width - 20)
const ball = new Ball

let pressedKeys = {
    upArrow: false,
    downArrow: false,
    upW: false,
    downS: false
}

document.addEventListener("keydown", (e) => {
    if (e.key == "ArrowUp"){
        pressedKeys.upArrow = true
    } else if (e.key == "ArrowDown"){
        pressedKeys.downArrow = true
    } 

    if (e.key == "w"){
        pressedKeys.upW = true
    } else if (e.key == "s"){
        pressedKeys.downS = true
    }
})

document.addEventListener("keyup", (e) => {
    if (e.key == "ArrowUp"){
        pressedKeys.upArrow = false
    } else if (e.key == "ArrowDown"){
        pressedKeys.downArrow = false
    } 

    if (e.key == "w"){
        pressedKeys.upW = false
    } else if (e.key == "s"){
        pressedKeys.downS = false
    }     
})

function drawBall(){
    ball.drawBall()
    checkPaddlePuch()

    if(ball.positionY + ball.speedY > canvas.height - ball.height/2 || ball.positionY + ball.speedY < ball.height/2) {
        ball.speedY = -(ball.speedY);
    }

    ball.positionX += ball.speedX
    ball.positionY += ball.speedY
}

function checkPaddlePuch() {
    if (ball.positionX + ball.width > canvas.width - rightPaddle.width
        && ball.positionY + ball.width / 2 > rightPaddle.positionY
        && ball.positionY + ball.width / 2 < rightPaddle.positionY + rightPaddle.height) {
        ball.speedX = -(ball.speedX)
    }

    if (ball.positionX < 50
        && ball.positionY + ball.width / 2 > leftPaddle.positionY
        && ball.positionY + ball.width / 2 < leftPaddle.positionY + leftPaddle.height) {
        ball.speedX = -(ball.speedX)
    }
}

function drawGame(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall()
    leftPaddle.draw()
    rightPaddle.draw()

    if(pressedKeys.downArrow && rightPaddle.positionY + rightPaddle.height < canvas.height){
        rightPaddle.positionY += rightPaddle.speed
    } else if (pressedKeys.upArrow && rightPaddle.positionY > 0){
        rightPaddle.positionY -= rightPaddle.speed
    }

    if(pressedKeys.downS && leftPaddle.positionY + leftPaddle.height < canvas.height){
        leftPaddle.positionY += leftPaddle.speed
    } else if (pressedKeys.upW && leftPaddle.positionY > 0){
        leftPaddle.positionY -= leftPaddle.speed
    }
}


function gameLoop(){
    drawGame()
}
setInterval(gameLoop, 10)