const calculator = {
  displayValue: "0",
  firstOperand: null,
  operator: null,
  waitingForSecondOperand: false,
};

function updateDisplay() {
  const display = document.querySelector(".result");
  display.textContent = calculator.displayValue;
}

updateDisplay();

function inputDigit(digit) {
  const { displayValue, waitingForSecondOperand } = calculator;

  if (waitingForSecondOperand === true) {
    calculator.displayValue = digit;
    calculator.waitingForSecondOperand = false;
  } else {
    calculator.displayValue =
      displayValue === "0" ? digit : displayValue + digit;
  }
}

function inputDecimal(dot) {
  if (calculator.waitingForSecondOperand === true) {
    return;
  }

  if (!calculator.displayValue.includes(dot)) {
    calculator.displayValue += dot;
  }
}

function handleOperator(nextOperator) {
  const { firstOperand, displayValue, operator } = calculator;
  const inputValue = parseFloat(displayValue);

  if (operator && calculator.waitingForSecondOperand) {
    calculator.operator = nextOperator;
    return;
  }

  if (firstOperand === null) {
    calculator.firstOperand = inputValue;
  } else if (operator) {
    const currentValue = firstOperand || 0;
    const result = performCalculation[operator](currentValue, inputValue);

    calculator.displayValue = String(result);
    calculator.firstOperand = result;
  }

  calculator.waitingForSecondOperand = true;
  calculator.operator = nextOperator;
}

const performCalculation = {
  "/": (firstOperand, secondOperand) => firstOperand / secondOperand,

  "*": (firstOperand, secondOperand) => firstOperand * secondOperand,

  "+": (firstOperand, secondOperand) => firstOperand + secondOperand,

  "-": (firstOperand, secondOperand) => firstOperand - secondOperand,

  "=": (firstOperand, secondOperand) => secondOperand,
};

function resetCalculator() {
  calculator.displayValue = "0";
  calculator.firstOperand = null;
  calculator.operator = null;
  calculator.waitingForSecondOperand = false;
}

const clearButton = document.querySelector(".clear");

clearButton.addEventListener("click", () => {
  resetCalculator();
  updateDisplay();
});

const decimalButton = document.querySelector(".number:nth-child(16)");

decimalButton.addEventListener("click", () => {
  inputDecimal(".");
  updateDisplay();
});

const digitButtons = document.querySelectorAll(".number");

digitButtons.forEach((button) => {
  button.addEventListener("click", () => {
    inputDigit(button.textContent);
    updateDisplay();
  });
});

const operatorButtons = document.querySelectorAll(".operator");

operatorButtons.forEach((button) => {
  button.addEventListener("click", () => {
    handleOperator(button.textContent);
    updateDisplay();
  });
});
