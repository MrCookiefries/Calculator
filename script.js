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
// Native Extensions
Array.prototype.clean = function() {
  for (let i = 0; i < this.length; i++) {
    if (this[i] === "") {
      this.splice(i, 1);
    }
  }
  return this;
}
String.prototype.isNumeric = function() {
  return !isNaN(parseFloat(this)) && isFinite(this);
}
// Equation
let equation = "";
// Calc Functions
function display() {
  let msg = equation;
  msg = msg.replace(/\*\*/g, "&Hat;");
  msg = msg.replace(/\*/g, "&times;");
  msg = msg.replace(/\+/g, "&plus;");
  msg = msg.replace(/\-/g, "&minus;");
  msg = msg.replace(/\//g, "&divide;");
  msg = msg.replace(/\|/g, "&radic;");
  msg = msg.replace(/\~/g, "&sup2;");
  outPut.innerHTML = msg;
}

function convert(string) {
  let result = "";
  let stack = [];
  let operatorInfo = {
    "+": {
      hierarchy: 1,
      affects: "left"
    },
    "-": {
      hierarchy: 1,
      affects: "left"
    },
    "*": {
      hierarchy: 2,
      affects: "left"
    },
    "/": {
      hierarchy: 2,
      affects: "left"
    },
    "^": {
      hierarchy: 3,
      affects: "right"
    }
  }
  string = string.replace(/\s/g, "");
  string = string.split(/([\+\-\*\/\^\(\)])/).clean();
  let key;
  let item1;
  let item2;
  for (let i = 0; i < string.length; i++) {
    key = string[i];
    if (key.isNumeric()) {
      result += `${key} `;
    } else if ("+-*/^".indexOf(key) >= 0) {
      item1 = key;
      item2 = stack[stack.length - 1];
      while ("+-*/^".indexOf(item2) >= 0 && ((operatorInfo[item1].affects === "left" && operatorInfo[item1].hierarchy <= operatorInfo[item2].hierarchy) || (operatorInfo[item1].affects === "right" && operatorInfo[item1].hierarchy < operatorInfo[item2].hierarchy))) {
        result += `${stack.pop()} `;
        item2 = stack[stack.length - 1];
      }
      stack.push(item1);
    } else if (key === "(") {
      stack.push(key);
    } else if (key === ")") {
      while (stack[stack.length - 1] !== "(") {
        result += `${stack.pop()} `;
      }
      stack.pop();
    }
  }
  while (stack.length > 0) {
    result += `${stack.pop()} `;
  }
  return result;
}

function solve(result) {
  let stack = [];
  result = result.split(" ");
  result.pop();
  let item1;
  let item2;
  for (let i = 0; i < result.length; i++) {
    if (result[i].isNumeric()) {
      stack.push(result[i]);
    } else {
      item1 = stack.pop();
      item2 = stack.pop();
      if (result[i] === "+") {
        stack.push(parseFloat(item1) + parseFloat(item2));
      } else if (result[i] === "-") {
        stack.push(parseFloat(item2) - parseFloat(item1));
      } else if (result[i] === "*") {
        stack.push(parseFloat(item1) * parseFloat(item2));
      } else if (result[i] === "/") {
        stack.push(parseFloat(item2) / parseFloat(item1));
      } else if (result[i] === "^") {
        stack.push(parseFloat(item2) ** parseFloat(item1));
      }
    }
  }
  if (stack.length > 1) {
    return "Error";
  }
  return stack.pop().toString();
}

function remove(type) {
  if (type === "ac") {
    equation = "";
  } else {
    equation = equation.slice(0, equation.length - 1);
  }
  display();
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

function fix(string) {
  string = string.split(/([\~\|\!\%\+\-\*\/\^\(\)])/).clean();
  let item;
  for (i = 0; i < string.length; i++) {
    if (string[i] === "|") {
      item = string[i + 1];
      item = Math.sqrt(parseFloat(item)).toString();
      string[i + 1] = item;
      string.splice(i, 1);
    } else if (string[i] === "!") {
      item = string[i - 1];
      item = factorialize(parseFloat(item)).toString();
      string[i - 1] = item;
      string.splice(i, 1);
    } else if (string[i] === "%") {
      item = string[i - 1];
      item = (parseFloat(item) / 100).toString();
      string[i - 1] = item;
      string.splice(i, 1);
    } else if (string[i] === "~") {
      item = string[i - 1];
      item = parseFloat(item ** 2).toString();
      string[i - 1] = item;
      string.splice(i, 1);
    }

  }
  return string.join("");
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
    equation = solve(convert(fix(equation)));
  } else if (input === "|") {
    if (check()) {
      equation += "*";
    }
    equation += "|";
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
  } else if (input === "~") {
    if (check()) {
      equation += "~";
    } else {
      window.alert("Missing the number before the exponent!");
    }
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