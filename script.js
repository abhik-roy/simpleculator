// Select all the necessary DOM elements
const buttons = document.querySelectorAll(".calculator button");
const result = document.querySelector(".result");

// Initialize the calculation variables
let currentOperand = "";
let previousOperand = "";
let currentOperator = null;
let shouldResetScreen = false;

// Function to reset the calculator
function resetCalculator() {
  currentOperand = "";
  previousOperand = "";
  currentOperator = null;
  shouldResetScreen = false;
}

// Function to update the calculator screen
function updateScreen() {
  result.value = currentOperand;
}

// Function to handle number button clicks
function handleNumberClick(number) {
  if (currentOperand === "0" || shouldResetScreen) {
    currentOperand = "";
    shouldResetScreen = false;
  }
  currentOperand += number;
  updateScreen();
}

// Function to handle operator button clicks
function handleOperatorClick(operator) {
  if (currentOperator !== null) {
    performCalculation();
  }
  currentOperator = operator;
  previousOperand = currentOperand;
  currentOperand = "";
}

// Function to handle equals button click
function handleEqualsClick() {
  performCalculation();
  currentOperator = null;
}

// Function to perform the actual calculation
function performCalculation() {
  if (currentOperator === null || shouldResetScreen) return;
  if (currentOperator === "+") {
    currentOperand = parseFloat(previousOperand) + parseFloat(currentOperand);
  } else if (currentOperator === "-") {
    currentOperand = parseFloat(previousOperand) - parseFloat(currentOperand);
  } else if (currentOperator === "*") {
    currentOperand = parseFloat(previousOperand) * parseFloat(currentOperand);
  } else if (currentOperator === "/") {
    currentOperand = parseFloat(previousOperand) / parseFloat(currentOperand);
  }
  shouldResetScreen = true;
  updateScreen();
}

// Function to handle clear button click
function handleClearClick() {
  resetCalculator();
  updateScreen();
}

// Loop through all the buttons and add event listeners to them
buttons.forEach((button) => {
  button.addEventListener("click", () => {
    if (button.classList.contains("number")) {
      handleNumberClick(button.innerText);
    } else if (button.classList.contains("operator")) {
      handleOperatorClick(button.innerText);
    } else if (button.classList.contains("equals")) {
      handleEqualsClick();
    } else if (button.classList.contains("clear")) {
      handleClearClick();
    }
  });
});
