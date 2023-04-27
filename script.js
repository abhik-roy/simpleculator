const result = document.querySelector(".result");
const clearButton = document.querySelector(".clear");
const numberButtons = document.querySelectorAll(".number");
const operatorButtons = document.querySelectorAll(".operator");
const equalsButton = document.querySelector(".equals");

let currentInput = "";
let currentOperator = "";
let previousInput = "";

numberButtons.forEach((button) => {
  button.addEventListener("click", () => {
    currentInput += button.textContent;
    updateResult(currentInput);
  });
});

operatorButtons.forEach((button) => {
  button.addEventListener("click", () => {
    if (currentInput === "") return;
    if (previousInput !== "") calculate();
    currentOperator = button.textContent;
    previousInput = currentInput;
    currentInput = "";
  });
});

equalsButton.addEventListener("click", () => {
  if (previousInput === "" || currentInput === "") return;
  calculate();
});

clearButton.addEventListener("click", () => {
  currentInput = "";
  currentOperator = "";
  previousInput = "";
  updateResult("");
});

function updateResult(value) {
  result.textContent = value;
}

function calculate() {
  let result;
  const a = parseFloat(previousInput);
  const b = parseFloat(currentInput);

  switch (currentOperator) {
    case "+":
      result = a + b;
      break;
    case "-":
      result = a - b;
      break;
    case "*":
      result = a * b;
      break;
    case "/":
      result = a / b;
      break;
    default:
      return;
  }

  updateResult(result.toFixed(2));
  currentInput = result.toString();
  previousInput = "";
  currentOperator = "";
}
