const startBtn = document.querySelector('.start');
const stopBtn = document.querySelector('.stop');
const resetBtn = document.querySelector('.reset');
const timer = document.querySelector('.timer');

let time = 0, timeUpdated, interval, offset, now, up = false;

startBtn.addEventListener('click', () => {
  if (up) {
    startBtn.textContent = 'Start';
    pause();
  } else {
    startBtn.textContent = 'Pause';
    start();
  }
});

stopBtn.addEventListener('click', () => {
  startBtn.textContent = 'Start';
  stop();
});

resetBtn.addEventListener('click', () => {
  reset();
});

const start = () => {
  interval = setInterval(update.bind(), 10);
  offset = Date.now();
  up = true;
}

const update = () => {
  if (up) time += delta();

  timer.textContent = formatter(time);
}

const delta = () => {
  now = Date.now();
  timeUpdated = now - offset;
  offset = now;

  return timeUpdated;
}

const pause = () => {
  clearInterval(interval);
  interval = null;
  up = false;
}

const stop = () => {
  pause();
  reset();
}

const reset = () => {
  time = 0;
  update();
}

const formatter = (time) => {
  const t = new Date(time);
  let mins = t.getMinutes().toString();
  let secs = t.getSeconds().toString();
  let msecs = t.getMilliseconds().toString();

  if (mins.length < 2) mins = '0' + mins;
  if (secs.length < 2) secs = '0' + secs;
  while (msecs.length < 3) msecs = '0' + msecs;

  return `${mins}:${secs}.${msecs}`;
}
