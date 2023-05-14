document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('canvasGame')
    const context = canvas.getContext('2d')


    const grid = 20
    const cell = canvas.width / grid


    let snake = [ 
        {x: 10, y: 10},
        {x: 9, y:10},
        {x: 8, y:10}
    ]

    let food = {x: 10, y: 15}

    let direction = 'right'

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
        }else{
            snake.pop()
        }

        // Se a cobrinha atingir as laterais, resetar o jogo

        if(head.x < 0 || head.x >= grid || head.y < 0 || head.y >= grid){
            snake = [ 
                {x: 10, y: 10},
                {x: 9, y:10},
                {x: 8, y:10}
            ];
            direction = 'right'
        }
        for (let i = 1; i < snake.length; i++) {
            if (snake[i].x === head.x && snake[i].y === head.y){
                snake = [ 
                    {x: 10, y: 10},
                    {x: 9, y:10},
                    {x: 8, y:10}
                ];
                direction = 'right'
                break
            }
        }

        context.clearRect(0, 0, canvas.width, canvas.height)

        for (let i = 0; i < snake.length; i++) {
            context.fillStyle = "#00000"
            context.fillRect(snake[i].x * cell,snake[i].y * cell, cell, cell )
        }

        context.fillStyle = "#483D8B"
        context.fillRect(food.x * cell,food.y * cell, cell, cell)

        setTimeout(update, 150)

    }

    document.addEventListener('keydown', (e)=>{
        if(e.key === 'ArrowUp' && direction !== 'down'){
            direction = 'up'
        }else if(e.key === 'ArrowDown' && direction !== 'up'){
            direction = 'down'
        }else if(e.key === 'ArrowLeft' && direction !== 'right'){
            direction = 'left'
        } else if(e.key === 'ArrowRight' && direction !== 'left'){
            direction = 'right'
        }

    })
update()
})
