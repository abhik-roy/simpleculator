// Select all of the necessary elements from the HTML
const display = document.querySelector(".result");
const clearButton = document.querySelector(".clear");
const numberButtons = document.querySelectorAll(".number");
const operatorButtons = document.querySelectorAll(".operator");
const equalsButton = document.querySelector(".equals");

let currentNumber = "";
let firstOperand = null;
let operator = null;
let shouldResetDisplay = false;

// This function updates the display with the current number
function updateDisplay() {
  display.textContent = currentNumber;
}

// This function clears the current number and resets the calculator state
function clear() {
  currentNumber = "";
  firstOperand = null;
  operator = null;
  shouldResetDisplay = false;
}

// This function handles when a number button is clicked
function handleNumberClick(event) {
  const number = event.target.textContent;
  if (shouldResetDisplay) {
    currentNumber = number;
    shouldResetDisplay = false;
  } else {
    currentNumber += number;
  }
  updateDisplay();
}

// This function handles when an operator button is clicked
function handleOperatorClick(event) {
  const nextOperator = event.target.textContent;
  const inputValue = parseFloat(currentNumber);
  if (firstOperand === null && !isNaN(inputValue)) {
    firstOperand = inputValue;
  } else if (operator) {
    const result = calculate(firstOperand, inputValue, operator);
    currentNumber = String(result);
    firstOperand = result;
  }
  shouldResetDisplay = true;
  operator = nextOperator;
}

// This function handles when the equals button is clicked
function handleEqualsClick() {
  const inputValue = parseFloat(currentNumber);
  if (firstOperand !== null && operator) {
    currentNumber = calculate(firstOperand, inputValue, operator);
    firstOperand = null;
    operator = null;
    shouldResetDisplay = true;
    updateDisplay();
  }
}

// This function calculates the result of the current expression
function calculate(firstOperand, secondOperand, operator) {
  if (operator === "+") {
    return firstOperand + secondOperand;
  } else if (operator === "-") {
    return firstOperand - secondOperand;
  } else if (operator === "*") {
    return firstOperand * secondOperand;
  } else if (operator === "/") {
    return firstOperand / secondOperand;
  }
}

// Add event listeners to all of the buttons
clearButton.addEventListener("click", () => {
  clear();
  updateDisplay();
});

numberButtons.forEach((button) => {
  button.addEventListener("click", handleNumberClick);
});

operatorButtons.forEach((button) => {
  button.addEventListener("click", handleOperatorClick);
});

equalsButton.addEventListener("click", handleEqualsClick);
