const grid = document.getElementById("grid")
const reset = document.getElementById("reset-button")
const scoreDisplay = document.getElementById("score")

let gameOver = false
let width = 11

function createGrid(){
    for(let i = 0; i <121; i++){
        let square = document.createElement('div')
        square.classList = "gridSquare"
        if(i > width*6-1 && i < width*9){
            square.classList.add("road")
        }
        if( i > width*2-1 && i < width*4){
            square.classList.add("log")
        }
        grid.appendChild(square)
    }
}

createGrid()
let gridSquares = Array.from(document.querySelectorAll(".grid div"))
let logSquare = Array.from(document.querySelectorAll(".log"))
let roadSquare = Array.from(document.querySelectorAll(".road"))

let frog = width * (width-1) + ((width-1)/2)
let carOnePosition = 0
let carTwoPosition = 0
let carThreePosition = 0
let score = 0

let water1 = [width+2, width+3 ,width+5, width+6, width+9, width+10]
let water2 = [0, 1, 2, 5, 6, 8]
let car1 = [width*2, width*2+1, width*2+4, width*2+5, width*2+8, width*2+9]
let car2 = [width+2, width+3, width+4, width+6, width+9, width+10]
let car3 = [1, 2, 5, 6, 9, 10]

function createCarOne(){
    car1.forEach(index =>{
        if(carOnePosition === width){
            carOnePosition = 0
        }
        if(index+carOnePosition >= width*3){
            roadSquare[(index+carOnePosition) - width].classList.add("car")
        }
        else{
        roadSquare[index+carOnePosition].classList.add("car")}
    })
}

function resetFrog(){
    eraseFrog()
    frog = width * (width-1) + ((width-1)/2)
    createFrog()
    gameOver = false
}

reset.addEventListener("click", resetFrog)



function eraseCarOne(){
    car1.forEach(index =>{
        if(index+carOnePosition >= width*3){
            roadSquare[(index+carOnePosition) - width].classList.remove("car")
        }
        else{
            roadSquare[index+carOnePosition].classList.remove("car")
        }
    })
}

function createCarTwo(){
    car2.forEach(index =>{
        if(carTwoPosition === width){
            carTwoPosition = 0
        }
        if(index-carTwoPosition <= width-1){
            roadSquare[(index-carTwoPosition) + width].classList.add("car")
        }
        else{
        roadSquare[index-carTwoPosition].classList.add("car")}
    })
}

function eraseCarTwo(){
    car2.forEach(index =>{
        if(index-carTwoPosition <= width-1){
            roadSquare[(index-carTwoPosition) + width].classList.remove("car")
        }
        else{
            roadSquare[index-carTwoPosition].classList.remove("car")
        }
    })
}

function createcarThree(){
    car3.forEach(index =>{
        if(carThreePosition === width){
            carThreePosition = 0
        }
        if(index+carThreePosition >= width){
            roadSquare[(index+carThreePosition) - width].classList.add("car")
        }
        else{
        roadSquare[index+carThreePosition].classList.add("car")}
    })
}

function erasecarThree(){
    car3.forEach(index =>{
        if(index+carThreePosition >= width){
            roadSquare[(index+carThreePosition) - width].classList.remove("car")
        }
        else{
            roadSquare[index+carThreePosition].classList.remove("car")
        }
    })
}

function createWaterOne(){
    water1.forEach(index =>{
        if(carOnePosition === width){
            carOnePosition = 0
        }
        if(index+carOnePosition >= width*2){
            logSquare[(index+carOnePosition) - width].classList.add("water")
        }
        else{
        logSquare[index+carOnePosition].classList.add("water")}
    })
}

function eraseWaterOne(){
    water1.forEach(index =>{
        if(index+carOnePosition >= width*2){
            logSquare[(index+carOnePosition) - width].classList.remove("water")
        }
        else{
            logSquare[index+carOnePosition].classList.remove("water")
        }
    })
}

function createWaterTwo(){
    water2.forEach(index =>{
        if(carTwoPosition === width){
            carTwoPosition = 0
        }
        if(index-carTwoPosition < 0){
            
            logSquare[(index-carTwoPosition) + width].classList.add("water")
        }
        else{
        logSquare[index-carTwoPosition].classList.add("water")}
    })
}

function eraseWaterTwo(){
    water2.forEach(index =>{
        if(index-carTwoPosition < 0){
            logSquare[(index-carTwoPosition) + width].classList.remove("water")
        }
        else{
            logSquare[index-carTwoPosition].classList.remove("water")
        }
    })
}

createCarOne()
createCarTwo()
createcarThree()
createWaterOne()
createWaterTwo()

function createFrog(){
    gridSquares[frog].classList.add("frog")
}

createFrog()

function eraseFrog(){
    gridSquares[frog].classList.remove("frog")
}

function controls(e){
    if(!gameOver){
        if(e.keyCode === 37){
            moveLeft()
        
        }

        if(e.keyCode === 39){
            moveRight()
            
        }

        if(e.keyCode === 40){
            moveDown()
            
        }
        if(e.keyCode === 38){
            moveUp()
            
        }
    }
}

addEventListener("keyup", controls)

function moveLeft(){
    if(frog % width === 0)return
    eraseFrog()
    if(gridSquares[frog-1].classList.contains("water") || gridSquares[frog-1].classList.contains("car")){
        gameOver = true
        return
    }
    frog -= 1
    
    createFrog()
}
function moveRight(){
    if((frog + 1) % width === 0){
        return
    }
    eraseFrog()
    if(gridSquares[frog+1].classList.contains("water") || gridSquares[frog+1].classList.contains("car")){
        gameOver = true
        return
    }
    frog += 1
    createFrog()
}
function moveUp(){
    if((frog - width) < 0){
        resetFrog()
        score += 1
        scoreDisplay.innerText = score
        return
    }
    eraseFrog()
    if(gridSquares[frog-width].classList.contains("water") || gridSquares[frog-width].classList.contains("car")){
        gameOver = true
        return
    }
        frog -= width

    createFrog()
}
function moveDown(){
    if((frog + width ) > width*11-1) return
    eraseFrog()
    if(gridSquares[frog+width].classList.contains("water") || gridSquares[frog+width].classList.contains("car")){
        gameOver = true
        return
    }
        frog += width
    
    createFrog()
}

function moveCarOne(){
    eraseCarOne()
    eraseWaterOne()
    carOnePosition += 1
    createCarOne()
    createWaterOne()
    if(gridSquares[frog].classList.contains("log") && frog >width*3-1 && frog < width*4){
        eraseFrog()
        frog +=1
        if(frog === 28){
            gameOver = true
            return
        }
        createFrog()
    }
    if(gridSquares[frog].classList.contains("car")){
        gameOver = true
        eraseFrog()
    }
    if(gridSquares[frog].classList.contains("water")){
        gameOver = true
        eraseFrog()
    }
}

function moveCarTwo(){
    eraseCarTwo()
    eraseWaterTwo()
    carTwoPosition += 1
    createCarTwo()
    createWaterTwo()
    if(gridSquares[frog].classList.contains("log") && frog > (width*2-1) && frog < width*3){
        eraseFrog()
        frog -=1
        if(frog === width*2-1){
            gameOver = true
            return
        }
        createFrog()
    }
    if(gridSquares[frog].classList.contains("car")){
        gameOver = true
        eraseFrog()
    }
    if(gridSquares[frog].classList.contains("water")){
        gameOver = true
        eraseFrog()
    }
}

function moveCarThree(){
    erasecarThree()
    carThreePosition += 1
    createcarThree()
    if(gridSquares[frog].classList.contains("car")){
        gameOver = true
        eraseFrog()
    }
}

let moveCarOneTimer = setInterval(moveCarOne, 1000)
let moveCarTwoTimer = setInterval(moveCarTwo, 2000)
let moveCarThreeTimer = setInterval(moveCarThree, 1500)