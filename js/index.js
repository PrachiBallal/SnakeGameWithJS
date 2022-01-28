//Game constants & variables
let gridSize = 38;
let inputDir={x:0, y:0};
let foodSound = new Audio("../media/music/food.mp3");
let gameOverSound = new Audio('../media/music/gameover.mp3');
let moveSound = new Audio('../media/music/move.mp3');
let musicSound = new Audio('../media/music/music.mp3');
let speed = 5;
let score =0;
let lastPaintTime = 0;
let snakeArr = [
    {x:13 , y:10}
]
food ={x: 6, y: 7}

//Game functions
function main(ctime){
    window.requestAnimationFrame(main);
    if((ctime - lastPaintTime)/1000 < 1/speed){
        return;
    }
    lastPaintTime = ctime;
    gameEngine();
}
function isCollide(snake) {
    // If you bump into yourself 
    for (let i = 1; i < snakeArr.length; i++) {
        if(snake[i].x === snake[0].x && snake[i].y === snake[0].y){
            return true;
        }
    }
    // If you bump into the wall
    if(snake[0].x >= gridSize || snake[0].x <=0 || snake[0].y >= gridSize || snake[0].y <=0){
        return true;
    }
        
    return false;
}

function gameEngine(){
    //  musicSound.play();
    //Part1 : Updating the Snake array and Food
    if(isCollide(snakeArr)){
        gameOverSound.play();
       
        inputDir = {x:0,y:0};
        if (confirm("Game Over, Press any key to play again!")){
            musicSound.pause();
            score=0;
            scoreBox.innerHTML = "Score: " + score;
        }
        else{
            musicSound.play();
        }
        snakeArr = [{x:13,y:10}];
        // musicSound.play();
        score = 0;
    }

    //If you have eaten the food, increment the score and regenerate the food
    if(food.y === snakeArr[0].y && food.x === snakeArr[0].x){
        foodSound.play();
        score +=1;
        if(score > highscoreVal){
            highscoreVal=score;
            localStorage.setItem("highscore",JSON.stringify(highscoreVal));
            highscoreBox.innerHTML = "High score: " +highscoreVal;
        }
        scoreBox.innerHTML = "Score: " + score;
        snakeArr.unshift({x: snakeArr[0].x + inputDir.x , y: snakeArr[0].y + inputDir.y})
        let a =10, b=gridSize-10;
        food = {x: Math.round(a+(b-a)* Math.random()),y: Math.round(a+(b-a)* Math.random())}
    }
    //Moving Snake
    for (let i = snakeArr.length -2; i >=0 ; i--) {
        const element = snakeArr[i];
        snakeArr[i+1] = {...snakeArr[i]}; //to avoid reference problem
    }

    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;

    //Part2 : Display the snake and food
    //Displaythe snake
    board.innerHTML = "";
    snakeArr.forEach((e,index)=>{
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        if(index === 0){
            snakeElement.classList.add('head');
        }
        else{
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);
    });
    //Display the food
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    board.appendChild(foodElement);
}

//Main logic
let highscore = localStorage.getItem("highscore");
if(highscore === null){
    highscoreVal= 0;
    localStorage.setItem("highscore",JSON.stringify(highscoreVal));
}
else{
    highscoreVal = JSON.parse(highscore);
    highscoreBox.innerHTML = "High Score: " +highscore;
}
window.requestAnimationFrame(main);
window.addEventListener('keydown',e=>{
    inputDir = {x:0, y:1} //starts the game
    moveSound.play();   //sound plays 
    musicSound.play();   //sound plays 
    switch (e.key) {
        case "ArrowUp":
                inputDir.x= 0;
                inputDir.y= -1;
            break;
            
        case "ArrowDown":
            inputDir.x= 0;
            inputDir.y= 1;
            break;
        case "ArrowLeft":
            inputDir.x= -1;
            inputDir.y= 0;
            break;
        case "ArrowRight":
            inputDir.x= 1;
            inputDir.y= 0;
            break;
    
        default:
            break;
    }
});


