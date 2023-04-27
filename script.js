const calculator = document.querySelector(".calculator");
const result = document.querySelector(".result");
const clear = document.querySelector(".clear");
const equals = document.querySelector(".equals");

// Attach event listeners to all number and operator buttons
const buttons = calculator.querySelectorAll("button");
buttons.forEach((button) => {
  button.addEventListener("click", () => {
    // If clear button is clicked, clear the result display
    if (button.classList.contains("clear")) {
      result.innerText = "";
    }
    // If equals button is clicked, calculate the result and display it
    else if (button.classList.contains("equals")) {
      const expression = result.innerText;
      if (expression) {
        const answer = eval(expression);
        result.innerText = answer;
      }
    }
    // Otherwise, add the clicked button's text to the result display
    else {
      result.innerText += button.innerText;
    }
  });
});
