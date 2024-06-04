const box = document.querySelector(".top-display-container");
const displayBox = document.createElement("div")
box.appendChild(displayBox);
displayBox.style.cssText = "color: White; background-color: #0D5C63; height: 95px; text-align: end; line-height: 95px; font-size: 40px;";

let operator = "";
let operand1 = "";
let operand2 = "";
displayBox.textContent = "0";
let isOperatorClicked = false; // Flag to track if an operator button is clicked

const buttons = document.querySelectorAll("button");

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const buttonText = button.textContent;
    if(!isNaN(parseInt(buttonText)) || buttonText === '.'){
      if (isOperatorClicked) {
        // If an operator button is clicked, start new operand
        operand2 = "";
        isOperatorClicked = false;
      }
      if(operator){
        operand2 += buttonText;
        displayBox.textContent = displayBox.textContent + buttonText;
      }  else {
        operand1 += buttonText;
        displayBox.textContent += buttonText;
      }
    } else if(button.id === "clear"){
      clearDisplay();
    } else if(button.id === "="){
      operate(parseFloat(operand1), parseFloat(operand2), operator);
    } else if(button.id === "undo"){
      displayBox.textContent = displayBox.textContent.substring(0, displayBox.textContent.length - 1);
    } else {
      if (operator !== "") {
        // If an operator already exists, perform calculation before setting new operator
        operate(parseFloat(operand1), parseFloat(operand2), operator);
      }
      operator = buttonText;
      isOperatorClicked = true; // Set the flag to true when an operator button is clicked
      displayBox.textContent += buttonText;
    }
  });
});

function add(x,y){
  let result = x + y;
  display(result);
}

function sub(x,y){
  let result = x - y;
  display(result);
}

function mul(x,y){
  let result = x*y;
  display(result);
}

function divide(x,y){
  let result = x/y;
  display(result);
}

function power(x,y){
  let result = x**y;
  display(result);
}

function operate(x,y,operator){
  switch(operator){
    case "+":
      add(x,y);
      break;
    case "-":
      sub(x,y);
      break;
    case "*":
      mul(x,y);
      break;
    case "/":
      if(y==0)
        displayBox.textContent = "undefined";
      else
        divide(x,y);
      break;
    case "^":
      power(x,y);
      break;
  }
}

function display(res){
  operand1 = parseFloat(res);
  operand2 = ""; // Reset operand2 after calculation
  displayBox.textContent = res;
}

function clearDisplay(){
    displayBox.textContent = "";
    operand1 = 0;
    operand2 = 0;
    operator = 0;
}