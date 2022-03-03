const grid = document.getElementById("grid")
const displayScore = document.getElementById("score")
const resetBtn = document.getElementById("reset-btn")
let score = 0
let highScore = 0
const width = 17
const height = 15
let snake = [width*7+8]
let snakeLength = 4
let gameOver = false
let currentDirection=""
let timer = setInterval(intervalControls, 150)

function createGrid(){
    for(let i = 0; i < 255; i++){
       let square = document.createElement("div");
        square.classList = "gridSquare"
        if((i+1)% 2 === 0){
            square.classList = "colorSquare gridSquare"
        }
        grid.appendChild(square)
    }
}

createGrid()
const gridSquares = Array.from(document.querySelectorAll(".grid div"))
let food = Math.floor(Math.random() * gridSquares.length)

function drawSnake(){
    snake.forEach((number) =>{
        gridSquares[number].classList.add("snake")
        if(number === snake[0]){ 
            gridSquares[number].innerText = ":)"
            gridSquares[number].classList.add("snakeHead")
        }
    })

}

drawSnake()

function eraseSnake(){
    if(gameOver){
        snake.forEach(x => gridSquares[x].classList.remove("snake"))
        gridSquares[snake[1]].classList.remove("snakeHead")
        gridSquares[snake[0]].innerText = ""
        return
    }
    snake.forEach(number => {
        gridSquares[number].innerText = ""
    })
    gridSquares[snake[1]].innerText = ""
    gridSquares[snake[1]].classList.remove("snakeHead")
    if(snake.length > snakeLength){
        gridSquares[snake[snake.length - 1]].classList.remove("snake")
        snake.pop()
    }
}

function drawFood(){
    food = Math.floor(Math.random() * gridSquares.length)
    if(snake.includes(food)){
    food = Math.floor(Math.random() * gridSquares.length)
    drawFood()
    return
    }
    gridSquares[food].classList.add("food")

}

function eraseFood(){
    gridSquares[food].classList.remove("food")
    score += 1
    displayScore.innerText = score
}

drawFood()

function controls(e){
    if(!gameOver){
        if(e.keyCode === 37 && currentDirection !== "right" && currentDirection !== "left"){
            moveLeft()
        currentDirection="left"
        
        clearInterval(timer)
        timer = setInterval(intervalControls, 125)
        }

        if(e.keyCode === 39 && currentDirection !== "left" && currentDirection !== "right"){
            moveRight()
           
            currentDirection="right"
            clearInterval(timer)
            timer = setInterval(intervalControls, 125)
            
        }

        if(e.keyCode === 40 && currentDirection !== "up" && currentDirection !== "down"){
            currentDirection="down"
            moveDown()
            
            clearInterval(timer)
            timer = setInterval(intervalControls, 125)
        }
        if(e.keyCode === 38 && currentDirection !== "down" && currentDirection !== "up"){
            moveUp()
            
            currentDirection="up"
            clearInterval(timer)
            timer = setInterval(intervalControls, 125)
        }
        
    }
}

function intervalControls(){
    if(!gameOver){
        if(currentDirection === "left"){
            moveLeft()
        currentDirection="left"
        }

        if(currentDirection === "right"){
            moveRight()
            currentDirection="right"
            
        }

        if(currentDirection === "down"){
            moveDown()
            currentDirection="down"
            
        }
        if(currentDirection === "up"){
            moveUp()
            currentDirection="up"
        }
    }
}
document.addEventListener("keyup", controls)

function moveLeft(){
    if(snake[0] % width === 0){
        gameOver = true
        gridSquares[snake[0]].innerText = ":("
        return
    }
    if(gridSquares[snake[0] - 1].classList.contains("snake")){
        gameOver = true
        gridSquares[snake[0]].innerText = ":("
        return
    }
    if(gridSquares[snake[0]-1].classList.contains("food")){
        snakeLength += 3
        eraseFood()
        drawFood()
    }
    snake.unshift(snake[0] -1)
    eraseSnake()
    drawSnake()
}
function moveUp(){
    if(snake[0]-width < 0 ){
        gameOver = true
        gridSquares[snake[0]].innerText = ":("
        return
    }
    if(gridSquares[snake[0] - width].classList.contains("snake")){
        gameOver = true
        gridSquares[snake[0]].innerText = ":("
        return
    }
    if(gridSquares[snake[0]-width].classList.contains("food")){
        snakeLength += 3
        eraseFood()
        drawFood()
    }
    snake.unshift(snake[0] -width)
    eraseSnake()
    drawSnake()
}
function moveRight(){
    if((snake[0]+1) % width === 0){
        gameOver = true
        gridSquares[snake[0]].innerText = ":("
        return
    }
    if(gridSquares[snake[0] + 1].classList.contains("snake")){
        gameOver = true
        gridSquares[snake[0]].innerText = ":("
        return
    }
    if(gridSquares[snake[0]+1].classList.contains("food")){
        snakeLength += 3
        eraseFood()
        drawFood()
    }
    snake.unshift(snake[0] +1)
    eraseSnake()
    drawSnake()
}
function moveDown(){
    if(snake[0]+width > 254 ){
        gameOver = true
        gridSquares[snake[0]].innerText = ":("
        return
    }
    if(gridSquares[snake[0] + width].classList.contains("snake")){
        gameOver = true
        gridSquares[snake[0]].innerText = ":("
        return
    }
    if(gridSquares[snake[0]+width].classList.contains("food")){
        snakeLength += 3
        eraseFood()
        drawFood()
    }
    snake.unshift(snake[0] +width)
    eraseSnake()
    drawSnake()
}

function resetSnake(){
    if(!gameOver) return
    eraseSnake()
    currentDirection=""
    snakeLength = 4
    snake = [width*7+8]
    gameOver=false
    eraseFood()
    score = 0
    displayScore.innerText = "0"
    drawFood()
    drawSnake()
}
resetBtn.addEventListener("click", resetSnake)
