// Hover & Click
const mainButtons = document.querySelectorAll('div.main div');
const otherButtons = document.querySelectorAll('aside div');
let outPut = document.querySelector(".display h1");
mainButtons.forEach(button => {
  button.classList.add("hover");
})
otherButtons.forEach(button => {
  button.classList.add("hover");
})
// Equation
let equation = "";
// Calc Functions
function display() {
  let msg = equation;
  outPut.innerHTML = msg;
}

function remove(type) {
  if (type === "ac") {
    equation = "";
  } else {
    equation = equation.slice(0, equation.length - 1);
  }
  display();
}

function solve() {
  // All the functions
}
// User Input
function enter(input) {
  if (input === "ac" || input === "del") {
    remove(input);
  } else {
    equation += input;
  }
  display();
}