// Hover & Click
const mainButtons = document.querySelectorAll('div.main div');
const otherButtons = document.querySelectorAll('aside div');
mainButtons.forEach(button => {
  button.classList.add("hover");
})
otherButtons.forEach(button => {
  button.classList.add("hover");
})
// Equation
let equation = [];
// User Input
function enter(input) {
  if (typeof input === "number") {
    equation.push({
      value: input,
      type: "number"
    });
  } else if (input === '+' || input === '-' || input === '*' || input === '/') {
    equation.push({
      value: input,
      type: "operator"
    })
  } else {
    equation.push({
      value: input,
      type: "symbol"
    });
  }
  console.log(equation);
}