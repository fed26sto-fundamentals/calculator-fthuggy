console.log("JavaScript is linked!");

let displayValue = "0"; 
let firstOperand = "";
let secondOperand = "";
let currentOperator = null;
let shouldResetScreen = false;

function updateDisplay() {
    const display = document.querySelector('.display'); 
    display.textContent = displayValue; 
}

const numberButtons = document.querySelectorAll('[data-value]'); 

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        appendNumber(button.dataset.value); 
    });
});

function appendNumber(number) {
    if (shouldResetScreen) {
        displayValue = number; 
        shouldResetScreen = false; 
    } else {
        displayValue === "0" ? displayValue = number : displayValue += number; 
    }
    updateDisplay(); 
}

const clearButton = document.querySelector('[data-action="clear"]');

clearButton.addEventListener('click', clearDisplay);

function clearDisplay() {
    displayValue = "0"; 
    firstOperand = "";
    secondOperand = "";
    currentOperator = null;
    shouldResetScreen = false;
    updateDisplay(); 
}

function add(a, b) {
    return parseFloat(a) + parseFloat(b);
}

function subtract(a, b) {
    return parseFloat(a) - parseFloat(b);
}

function multiply(a, b) {
    return parseFloat(a) * parseFloat(b);
}

function divide(a, b) {
    if (b === "0") {
        return "Error: Division by zero"; 
    }
    return parseFloat(a) / parseFloat(b);
}

function operate(operator, a, b) {
    switch (operator) {
        case "+":
            return add(a, b);
        case "-":
            return subtract(a, b);
        case "*":
            return multiply(a, b);
        case "/":
            return divide(a, b);
        default:
            return "Error: Invalid operator";
    }
}

const operatorButtons = document.querySelectorAll('[data-action="operator"]');

operatorButtons.forEach(button => {
    button.addEventListener('click', () => {
        chooseOperator(button.textContent); 
    });
});

function chooseOperator(operator) {
    if (currentOperator !== null) evaluate(); 
    firstOperand = displayValue; 
    currentOperator = operator; 
    shouldResetScreen = true; 
}

const equalsButton = document.querySelector('[data-action="calculate"]');

equalsButton.addEventListener('click', evaluate);

function evaluate() {
    if (currentOperator === null) return; 
    secondOperand = displayValue; 
    displayValue = roundResult(operate(currentOperator, firstOperand, secondOperand)); 
    currentOperator = null; 
    updateDisplay(); 
}

function roundResult(result) {
    return Math.round(result * 100) / 100; 
}


