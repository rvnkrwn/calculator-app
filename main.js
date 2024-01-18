const display = document.getElementById('display')

function appendToDisplay(value) {
    if(display.value == '0') {
        display.value = value
    } else {
        display.value += value
    }
}

function backspace() {
    display.value = display.value.slice(0, -1)
}

function clearDisplay() {
    display.value = '0'
}

function calculate() {
    let expression = display.value
    try {
        expression = expression.replace(/%/g, '/100')
        const result = eval(expression)
        display.value = result
    } catch (error) {
        display.value = error
    }
}