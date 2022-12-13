document.addEventListener("DOMContentLoaded",()=>{
    const dino = document.querySelector(".dino");
    const grid = document.querySelector(".grid");
    const alert = document.getElementById("alert");
    let isJumping = false //solo saltará si esta sobre el suelo
    let gravity = 0.9  
    let isGameOver = false  
    
    function control(e){
        if(e.keyCode === 32){
            if(!isJumping){
                isJumping = true
                jump()
            }
            
        }
        if(e.keyCode !== 32){
            return false
        }
    }
    document.addEventListener("keyup",control)

    let position = 0
    function jump(){
        let count = 0 ;
        let timeId = setInterval(function(){
            //move down
            if(count === 15){
                clearInterval(timeId)
                let downTimeId = setInterval(function(){
                    if(count === 0){
                        clearInterval(downTimeId)
                        isJumping = false
                    }
                    position -=5
                    count--
                    position *= gravity
                    dino.style.bottom = position +"px"
                },20)
                
            }
            //move up
            position +=30
            count++
            position = position * gravity
            dino.style.bottom = position +"px"
            //console.log(dino.style.bottom)
        },20)
    }

    function generateObstacules(){
        //generamos obstaculos random
        let randomTime = Math.random() * 8000
        let obstaclePosition=1000
        const obstacle = document.createElement("div")
        if(!isGameOver) obstacle.classList.add("obstacle")
        grid.appendChild(obstacle)
        obstacle.style.left = obstaclePosition + "px"

        let timeId = setInterval(function(){
            if(obstaclePosition > 0 && obstaclePosition < 60 && position <60){
                clearInterval(timeId)
                alert.innerHTML = "Game Over!"
                isGameOver = true
                //eliminando los children
                while(grid.firstChild){
                    grid.removeChild(grid.lastChild)
                }
            }

            obstaclePosition -=10
            obstacle.style.left = obstaclePosition + "px"
            
        },20)
        if(!isGameOver) setInterval(generateObstacules, randomTime)
    }
    generateObstacules()
})




