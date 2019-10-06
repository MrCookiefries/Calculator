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
  msg = msg.replace("**", "&Hat;");
  msg = msg.replace("*", "&times;");
  msg = msg.replace("+", "&plus;");
  msg = msg.replace("-", "&minus;");
  msg = msg.replace("/", "&divide;");
  msg = msg.replace(/Math.sqrt/g, "&radic;");
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

function operator(op) {
  if (equation.indexOf(op) === -1) {
    return;
  }
  let parts = equation.split(op);
  parts.forEach(part => {
    part = parseFloat(part);
  })
  let index = null;
  let left = null;
  let right = null;
  let result = null;
  parts.forEach(part => {
    if (typeof part === "number") {
      let key = parts.indexOf(part);
      parts.splice(key + 1, 0, op);
    }
  })
  console.log(parts);
  while (parts.indexOf(op) !== -1) {
    index = parts.indexOf(op);
    if (index === 0) {
      parts = parts.shift();
    } else {
      left = parseFloat(parts[index - 1]);
      right = parseFloat(parts[index + 1]);
      switch (op) {
        case "+":
          result = left + right;
          break;
        case "-":
          result = left - right;
          break;
        case "*":
          result = left * right;
          break;
        case "/":
          result = left / right;
          break;
        default:
          console.log("Error with operator switch!");
          break;
      }
      console.log(left, right);
      parts.splice(parts.indexOf(left), 1);
      parts.splice(parts.indexOf(right), 1);
      parts.splice(index, 0, result);
      parts.splice(index, 1);
    }
  }
  equation = parts.join();
  equation = equation.replace(/,/g, "");
}

function solve() {
  operator("*");
  operator("/");
  operator("+");
  operator("-");
  console.log(equation);
}

function check() {
  if (equation.length > 0 && equation[equation.length - 1] !== "+" && equation[equation.length - 1] !== "-" && equation[equation.length - 1] !== "*" && equation[equation.length - 1] !== "/") {
    return true;
  }
  return false;
}

function factorialize(num) {
  if (num < 0) {
    return -1;
  } else if (num === 0) {
    return 1;
  }
  return (num * factorialize(num - 1));
}
// User Input
function enter(input) {
  if (input === "ac" || input === "del") {
    remove(input);
  } else if (input === "pie") {
    if (check()) {
      equation += "*";
    }
    equation += Math.PI;
  } else if (input === "=") {
    solve();
  } else if (input === "sqr") {
    if (check()) {
      equation += "*";
    }
    equation += "Math.sqrt(";
  } else if (input === "^") {
    if (check()) {
      equation += "^";
    } else {
      window.alert("Missing the number before the exponent!");
    }
  } else if (input === "%") {
    if (check()) {
      equation += "%";
    } else {
      window.alert("Percentages come after numbers!");
    }
  } else if (input === "+") {
    if (check()) {
      equation += "+";
    } else {
      window.alert("Can't add to an operator!");
    }
  } else if (input === "-") {
    if (check()) {
      equation += "-";
    } else {
      window.alert("Can't subtract from an operator!");
    }
  } else if (input === "*") {
    if (check()) {
      equation += "*";
    } else {
      window.alert("Can't multiply by an operator!");
    }
  } else if (input === "/") {
    if (check()) {
      equation += "/";
    } else {
      window.alert("Can't divide by an operator!");
    }
  } else if (input === "sq") {
    if (check()) {
      equation += "**";
    } else {
      window.alert("Missing the number before the exponent!");
    }
    equation += "(";
  } else if (input === "!") {
    if (check()) {
      equation += "!"
    } else {
      window.alert("Can't factorialize an operator!");
    }
  } else if (input === "(") {
    if (check()) {
      equation += "*";
    }
    equation += "(";
  } else if (input === ")") {
    if (check()) {
      equation += ")";
    } else {
      window.alert("Can't close parenthesis after an operator!");
    }
  } else {
    equation += input;
  }
  display();
}