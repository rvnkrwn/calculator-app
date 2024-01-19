class Player {
    constructor(name, initialScore) {
        this.name = name
        this.score = initialScore || 0
    }

    show() {
        const tempName = document.getElementById('name');
        tempName.textContent = this.name || 'anon'
        const tempScore = document.getElementById('score');
        tempScore.textContent = this.score || 0
    }

    increaseScore() {
        this.score += 10;
        localStorage.setItem('score', this.score)
    }

}

const display = document.getElementById('display');
let statusGame = false // false is game over

function appendToDisplay(value) {
    if (display.value == '0') {
        display.value = value;
    } else {
        display.value += value;
    }
}

function backspace() {
    display.value = display.value.slice(0, -1);
}

function clearDisplay() {
    display.value = '0';
}

window.addEventListener('keydown', e => {
    switch (e.key) {
        case '1':
            appendToDisplay('1')
            break
        case '2':
            appendToDisplay('2')
            break
        case '3':
            appendToDisplay('3')
            break
        case '4':
            appendToDisplay('4')
            break
        case '5':
            appendToDisplay('5')
            break
        case '6':
            appendToDisplay('6')
            break
        case '7':
            appendToDisplay('7')
            break
        case '8':
            appendToDisplay('8')
            break
        case '9':
            appendToDisplay('9')
            break
        case '0':
            appendToDisplay('0')
            break
        case '-':
            appendToDisplay('-')
            break
        case '+':
            appendToDisplay('+')
            break
        case '/':
            appendToDisplay('/')
            break
        case '*':
            appendToDisplay('*')
            break
        case '.':
            appendToDisplay('.')
            break
        case '%':
            appendToDisplay('%')
            break
        case 'Enter':
            calculate()
            break
    }
})

function randomNumber() {
    const a = Math.ceil((Math.random() * 10))
    const b = parseFloat(Math.random().toFixed(2))
    const x = Math.ceil(Math.random() * 10);

    return {
        a, b, x
    };
}

let resQuestion;
function getQuestions() {
    const { a, b, x } = randomNumber()
    resQuestion = parseFloat(eval(a * x + b))

    // console.log(a, x, b)
    // console.log(`${a}x + ${b} = ${resQuestion}`)

    const tempQuestion = document.getElementById('tempQuestion');
    tempQuestion.textContent = `${a}x + ${b} = ${resQuestion} ?`
    return resQuestion
}

let player = new Player(getDataPlayer().name, getDataPlayer().score)
function getDataPlayer() {
    const name = localStorage.getItem('name') || prompt("What's your name? ");
    name ? localStorage.setItem('name', name) : ''
    const score = localStorage.getItem('score') || 0

    return { name, score }
}

function evaluate(res) {
    statusGame = res === resQuestion
    if(statusGame) {
        player.increaseScore()
    }
}

function calculate() {
    let expression = display.value;
    try {
        expression = expression.replace(/%/g, '/100').replace(/×/g, '*').replace(/÷/g, '/');
        const result = eval(expression);
        display.value = result;
        evaluate(result)
    } catch (error) {
        display.value = error;
    }
}

function mainGame(game) {
    if (game) {
        getQuestions()
        const indicator = document.getElementById('indicator');
        let countdown = 20;

        const countdownInterval = setInterval(() => {
            indicator.children[0].children[0].children[1].classList.add('active')
            countdown--;
            indicator.children[1].textContent = countdown;
            if (countdown == 1) {
                
            }
            if (countdown <= 0) {
                clearInterval(countdownInterval)
                indicator.children[0].children[0].children[1].classList.remove('active')
            }
        }, 1000)

        setTimeout(() => {
            mainGame(statusGame)
            statusGame = false
        }, 1000 * 20)
    } else {
        localStorage.setItem('score', 0)
        let userResponse = window.confirm("Game over, start over?");
        if (userResponse) {
            window.location.reload()
        } else {
            window.alert("close the tab");
            setTimeout(() => {
                // window.close()
            }, 3000)
        }
    }
}

function playGame() {
    if (player.name) {
        player.show()
        mainGame(true)
    } else {
        window.location.reload()
    }
}

playGame()