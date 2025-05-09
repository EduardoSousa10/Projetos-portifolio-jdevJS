let timerInterval;
let minutes = 0;
let seconds = 0;

const minutesDisplay = document.getElementById('minutes');
const secondsDisplay = document.getElementById('seconds');

function updateTimer() {
    seconds++;
    if (seconds === 60) {
        seconds = 0;
        minutes++;
    }
    minutesDisplay.textContent = minutes.toString().padStart(2, '0');
    secondsDisplay.textContent = seconds.toString().padStart(2, '0');
}

document.getElementById('start').addEventListener('click', () => {
    if (!timerInterval) {
        timerInterval = setInterval(updateTimer, 1000);
    }
});

document.getElementById('stop').addEventListener('click', () => {
    clearInterval(timerInterval);
    timerInterval = null;
});

document.getElementById('reset').addEventListener('click', () => {
    clearInterval(timerInterval);
    timerInterval = null;
    minutes = 0;
    seconds = 0;
    minutesDisplay.textContent = '00';
    secondsDisplay.textContent = '00';
})