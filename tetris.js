const grid = document.getElementById("grid")

function createGrid(){
    for(let i = 0; i < 210; i++){
        let gridSquare = document.createElement('div');
        gridSquare.classList="gridSquare"
        if(i > 199){
            gridSquare.classList="filled"
        }
        grid.appendChild(gridSquare);
    }
}

createGrid()

function createNextShapeGrid(){
    for(let i = 0; i < 16; i++){
        let gridSquare = document.createElement('div');
        gridSquare.classList="gridSquare"
        document.getElementById("shape-grid").appendChild(gridSquare);
    }
}

createNextShapeGrid()

const width = 10
const scoreDsiplay = document.getElementById("score")
let score = 0
const startBtn = document.getElementById("start-button")
let gridSquares = Array.from(document.querySelectorAll(".grid div"))
let timerId = null
let gameover = false

const colors = ["green", "red", "yellow", "blue", "orange", "purple"]

const lTetro = [
    [1, width+1, width*2+1, 2],
    [width, width+1, width+2, width*2+2],
    [1, width+1, width*2+1, width*2],
    [width, width*2, width*2+1, width*2+2]
  ]

  const zTetro = [
    [0,width,width+1,width*2+1],
    [width+1, width+2,width*2,width*2+1],
    [0,width,width+1,width*2+1],
    [width+1, width+2,width*2,width*2+1]
  ]

  const tTetro = [
    [1,width,width+1,width+2],
    [1,width+1,width+2,width*2+1],
    [width,width+1,width+2,width*2+1],
    [1,width,width+1,width*2+1]
  ]

  const oTetro = [
    [0,1,width,width+1],
    [0,1,width,width+1],
    [0,1,width,width+1],
    [0,1,width,width+1]
  ]

  const iTetro = [
    [1,width+1,width*2+1,width*3+1],
    [width,width+1,width+2,width+3],
    [1,width+1,width*2+1,width*3+1],
    [width,width+1,width+2,width+3]
  ]

  const tetros = [lTetro, zTetro, tTetro, oTetro, iTetro]

  nextRandom = Math.floor(Math.random() * tetros.length)
  nextColor = colors[Math.floor(Math.random() * colors.length)]

  let currentPosition = 4
  let currentRotation = 0
  let randTetro = Math.floor(Math.random()*tetros.length)
  let current = tetros[randTetro][currentRotation]
  let color = colors[Math.floor(Math.random() * colors.length)]

  function draw(){
      current.forEach(index => {
          gridSquares[currentPosition + index].classList.add(`${color}`)
          gridSquares[currentPosition + index].classList.add(`tetro`)
      })
  }

  function undraw(){
    current.forEach(index => {
        gridSquares[currentPosition + index].classList.remove(`${color}`)
        gridSquares[currentPosition + index].classList.remove(`tetro`)
    })
  }
  

function controls(e){
    if(timerId === null || gameover) return
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
        rotate()
        
    }
}

  document.addEventListener("keyup", controls)

function stop(){
        current.forEach(index => gridSquares[currentPosition + index].classList.add("filled"))
        randTetro = nextRandom
        color = nextColor
        nextRandom = Math.floor(Math.random() * tetros.length)
        current = tetros[randTetro][currentRotation]
        currentPosition = 4
        nextColor = colors[Math.floor(Math.random() * colors.length)]
        addScore()
        if(current.some(index => gridSquares[currentPosition + index].classList.contains("filled"))){
            clearInterval(timerId)
            gameover = true
            return
        }
        draw() 
        displayShape()
}

  function moveDown() {
      console.log((500 *(1 +((score/1000)*5))))
    if(current.some(index => gridSquares[currentPosition + index + width].classList.contains("filled"))){
        stop()
        return
    }
    undraw()
    currentPosition += width
    draw()
}

function moveLeft(){
    undraw()
    const leftEdge = current.some(index => (currentPosition + index) % width === 0)

    if(!leftEdge){
        currentPosition -= 1
    }

    if(current.some( index => gridSquares[currentPosition + index].classList.contains("filled"))){
        currentPosition+=1
    }

    draw()
}

function moveRight(){
    undraw()
    const rightEdge = current.some(index => (currentPosition + index+1) % width === 0)

    if(!rightEdge){
        currentPosition += 1
    }

    if(current.some( index => gridSquares[currentPosition + index].classList.contains("filled"))){
        currentPosition-=1
    }

    draw()
}

function rotate(){
    undraw()
    currentRotation++
    
    if(currentRotation === current.length){
        currentRotation = 0
    }
    current = tetros[randTetro][currentRotation]
    if(current.some( index => gridSquares[currentPosition + index].classList.contains("filled"))){
        currentRotation-=1
        current = tetros[randTetro][currentRotation]
    }
    draw()
}

let shapeGridSquares = Array.from(document.querySelectorAll(".shape-grid div"))
const shapeGridWidth = 4
let shapeGridIndex = 0

const upNextTetro = [
    [1, shapeGridWidth+1, shapeGridWidth*2+1, 2 ],
    [0, shapeGridWidth, shapeGridWidth+1, shapeGridWidth*2+1],
    [1, shapeGridWidth, shapeGridWidth+1, shapeGridWidth+2],
    [shapeGridWidth+1, shapeGridWidth+2, shapeGridWidth*2+1, shapeGridWidth*2+2],
    [1, shapeGridWidth+1, shapeGridWidth*2+1, shapeGridWidth*3+1]
]

function displayShape(){
    shapeGridSquares.forEach(square => {
        square.classList.remove("tetro")
        square.classList.remove(`${color}`)
    })
    upNextTetro[nextRandom].forEach( index => {
        shapeGridSquares[shapeGridIndex + index].classList.add("tetro")
        shapeGridSquares[shapeGridIndex + index].classList.add(`${nextColor}`)
    })
}

startBtn.addEventListener("click", () =>{
    console.log(timerId)
    if(timerId === null && !gameover){
        console.log("works")
        draw()
        timerId = setInterval(moveDown, (500 *(1 +((score/1000)*5))))
        displayShape()
        return
    }
})

function addScore() {
    for(let i =0; i <199; i+=width){
        const row = [i, i+1, i+2, i+3, i+4, i+5, i+6, i+7, i+8, i+9]

        if(row.every(index => gridSquares[index].classList.contains("filled"))){
            score +=10
            scoreDsiplay.innerText = score
            row.forEach(index => {
                gridSquares[index].classList.remove("filled")
                gridSquares[index].classList.remove("tetro")
                colors.forEach(color =>{
                    gridSquares[index].classList.remove(color)
                })
            })
            const squaresRemoved = gridSquares.splice(i, width)
            gridSquares = squaresRemoved.concat(gridSquares)
            gridSquares.forEach(cell => grid.appendChild(cell))
        }

    }
}

