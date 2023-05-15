document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('canvasGame')
    const context = canvas.getContext('2d')

    const grid = 20
    let cell 
    let snake
    let food 
    let direction 
    let score 
    let gameSpeed 

    function adjustCanvastoScreen() {
        const screenWidth = window.innerWidth;
        const canvaSize = window.innerHeight;
      
        const gridSize = Math.floor(Math.min(screenWidth, canvaSize) * 0.9);
        canvas.width = gridSize;
        canvas.height = gridSize;
      
        cell = gridSize / grid;
    }

    function startGame() {
        snake  = [ 
            {x: 10, y: 10},
            {x: 9, y:10},
            {x: 8, y:10}
        ]
        food = {x: 10, y: 15}
        direction = 'right'
        gameSpeed = 200
        score = 0 
        update()
    }
    
    function update(){
        const head = {x: snake[0].x, y: snake[0].y}

        if (direction === 'right') head.x++
        else if (direction === 'left') head.x--
        else if (direction === 'up') head.y--
        else if (direction === 'down') head.y++

        snake.unshift(head)


        if (head.x === food.x && head.y === food.y){
            food.x = Math.floor(Math.random() * grid )
            food.y = Math.floor(Math.random() * grid )

            score++
            if(score % 5 === 0){
                gameSpeed -= 10
            }
        }else{
            snake.pop()
        }

        // colisao
        if(head.x < 0 || head.x >= grid || head.y < 0 || head.y >= grid || checkCollision(head)){
            endGame()
            return
        }
        render()

        setTimeout(update, gameSpeed)

    }
    function checkCollision(head){
        for (let i = 1; i< snake.length; i++){
            if (head.x === snake[i].x && head.y === snake[i].y){
                return true
            }
        }
        return false
        
    }
    function endGame(){
        snake = [ 
            {x: 10, y: 10},
            {x: 9, y:10},
            {x: 8, y:10}
        ];
        direction = 'right'
        score = 0
        gameSpeed = 200
        update()
    }
    
    function changeDirection(dir) {
        if (
            (dir === 'up' && direction !== 'down') ||
            (dir === 'down' && direction !== 'up') ||
            (dir === 'left' && direction !== 'right') ||
            (dir === 'right' && direction !== 'left')
        ) {
            direction = dir;
        }
    }
    function render(){
        context.clearRect(0, 0, canvas.width, canvas.height)

        for (let i = 0; i < snake.length; i++) {
            context.fillStyle = "#000000"
            context.fillRect(snake[i].x * cell,snake[i].y * cell, cell, cell )
        }

        context.fillStyle = "#333333"
        context.fillRect(food.x * cell,food.y * cell, cell, cell)

        context.font = '20px Verdana'
        context.fillText('Pontuação ' + score, 10, 30)
    }
    function haldleInput(e) {
        if(e.key === 'ArrowUp' && direction !== 'down'){
            direction = 'up'
        }else if(e.key === 'ArrowDown' && direction !== 'up'){
            direction = 'down'
        }else if(e.key === 'ArrowLeft' && direction !== 'right'){
            direction = 'left'
        } else if(e.key === 'ArrowRight' && direction !== 'left'){
            direction = 'right'
        }
    }

    function initilize(){
        adjustCanvastoScreen();
        window.addEventListener('resize', adjustCanvastoScreen)
        document.addEventListener('keydown', haldleInput)
        const upButton = document.getElementById('upButton');
        const downButton = document.getElementById('downButton');
        const leftButton = document.getElementById('leftButton');
        const rightButton = document.getElementById('rightButton');

        upButton.addEventListener('click', () => {
            changeDirection('up');
        });
        downButton.addEventListener('click', () => {
            changeDirection('down');
        });
        leftButton.addEventListener('click', () => {
            changeDirection('left');
        });
        rightButton.addEventListener('click', () => {
            changeDirection('right');
        });
        document.getElementById('toggle-mode').addEventListener('change', darkmode);
        startGame()

    }
    function darkmode() {
        document.body.classList.toggle( 'darkmode') 
    }
    initilize()
})



  
