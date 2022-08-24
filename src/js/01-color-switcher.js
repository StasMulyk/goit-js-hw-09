const refs = {
  startBtn: document.querySelector('button[data-start]'),
  stopBtn: document.querySelector('button[data-stop]'),
};
// console.log(refs.stopBtn);

let colorChangeInterval = null;

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

refs.startBtn.addEventListener('click', startColorChange);

refs.stopBtn.addEventListener('click', stoptColorChange);

refs.stopBtn.disabled = true;

function startColorChange() {
  colorChangeInterval = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor();
  }, 1000);
  refs.startBtn.disabled = true;
  refs.stopBtn.disabled = false;
}

function stoptColorChange() {
  clearInterval(colorChangeInterval);
  refs.startBtn.disabled = false;
  refs.stopBtn.disabled = true;
}
