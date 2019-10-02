// Hover & Click
const mainButtons = document.querySelectorAll('div.main div');
const otherButtons = document.querySelectorAll('aside div');
mainButtons.forEach(button => {
  button.classList.add("hover");
})
otherButtons.forEach(button => {
  button.classList.add("hover");
})

function yay(num) {
  console.log(`Pressed ${num}`);
}