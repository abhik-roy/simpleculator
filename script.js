const result = document.querySelector(".result");
const clear = document.querySelector(".clear");
const equals = document.querySelector(".equals");
const numbers = document.querySelectorAll(".number");
const operators = document.querySelectorAll(".operator");
let currentNumber = "0";
let currentOperator = "";
let previousNumber = "";

function clearAll() {
  currentNumber = "0";
  currentOperator = "";
  previousNumber = "";
  result.textContent = currentNumber;
}

function updateResult() {
  result.textContent = currentNumber;
}

function handleNumberClick(event) {
  if (currentNumber === "0") {
    currentNumber = event.target.textContent;
  } else {
    currentNumber += event.target.textContent;
  }
  updateResult();
}

function handleOperatorClick(event) {
  if (currentOperator !== "") {
    handleEqualsClick();
  }
  currentOperator = event.target.textContent;
  previousNumber = currentNumber;
  currentNumber = "0";
}

function handleEqualsClick() {
  const a = parseFloat(previousNumber);
  const b = parseFloat(currentNumber);
  let resultValue;
  switch (currentOperator) {
    case "+":
      resultValue = a + b;
      break;
    case "-":
      resultValue = a - b;
      break;
    case "*":
      resultValue = a * b;
      break;
    case "/":
      resultValue = a / b;
      break;
  }
  currentNumber = resultValue.toString();
  currentOperator = "";
  previousNumber = "";
  updateResult();
}

clear.addEventListener("click", clearAll);
equals.addEventListener("click", handleEqualsClick);
numbers.forEach((number) =>
  number.addEventListener("click", handleNumberClick)
);
operators.forEach((operator) =>
  operator.addEventListener("click", handleOperatorClick)
);
