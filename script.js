let timerInterval;
let timeLeft = 25 * 60; // Initial time in seconds (25 minutes)
let isRunning = false;
let pausedTime = 0;
let isPomodoroMode = true; // Initially in pomodoro mode
let breakDuration = 5 * 60; // Default break duration in seconds (5 minutes)

// Function to play notification sound
function playNotificationSound() {
    const audio = new Audio('assets/notification.mp3'); 
    audio.play();
}

// Function to update browser tab title with remaining time
function updateTitle() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    const remainingTime = `${padZero(minutes)}:${padZero(seconds)}`;
    document.title = `${remainingTime} - Pomodoro Timer`;
}

function startTimer(duration) {
    if (!isRunning) {
        if (pausedTime === 0) {
            timeLeft = duration;
        }
        updateTimer();
        timerInterval = setInterval(updateTimer, 1000);
        isRunning = true;
    }
}

function pauseTimer() {
    clearInterval(timerInterval);
    isRunning = false;
    pausedTime = timeLeft;
}

function resetTimer() {
    clearInterval(timerInterval);
    timeLeft = isPomodoroMode ? 25 * 60 : breakDuration; // Reset to default pomodoro or break time
    updateTimer();
    isRunning = false;
    pausedTime = 0;
}

function updateTimer() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    document.getElementById('timer').innerText = `${padZero(minutes)}:${padZero(seconds)}`;
    updateTitle(); // Update browser tab title with remaining time

    if (timeLeft <= 3 && timeLeft > 0) {
        playNotificationSound(); // Play notification sound when timer reaches last 3 seconds
    }

    if (timeLeft === 0) {
        clearInterval(timerInterval);
        alert(isPomodoroMode ? 'Pomodoro Timer Completed!' : 'Break Timer Completed!');
        isRunning = false;
    }

    timeLeft--;
}


function switchMode() {
    isPomodoroMode = !isPomodoroMode;
    resetTimer();
    document.getElementById('mode').innerText = isPomodoroMode ? 'Pomodoro' : 'Break';
    updateBreakButtonsVisibility();
}

function setBreakDuration(duration) {
    breakDuration = duration * 60;
    resetTimer();
}

function padZero(num) {
    return num < 10 ? `0${num}` : num;
}

function updateBreakButtonsVisibility() {
    const shortBreakBtn = document.getElementById('short-break-btn');
    const longBreakBtn = document.getElementById('long-break-btn');
    if (isPomodoroMode) {
        shortBreakBtn.style.display = 'none';
        longBreakBtn.style.display = 'none';
    } else {
        shortBreakBtn.style.display = 'inline-block';
        longBreakBtn.style.display = 'inline-block';
    }
}

document.getElementById('start-btn').addEventListener('click', function() {
    startTimer(isPomodoroMode ? 25 * 60 : breakDuration);
});

document.getElementById('short-break-btn').addEventListener('click', function() {
    setBreakDuration(5);
});

document.getElementById('long-break-btn').addEventListener('click', function() {
    setBreakDuration(15);
});

document.getElementById('pause-btn').addEventListener('click', pauseTimer);
document.getElementById('reset-btn').addEventListener('click', resetTimer);
document.getElementById('switch-mode-btn').addEventListener('click', switchMode);

// Initial setup
document.getElementById('mode').innerText = isPomodoroMode ? 'Pomodoro' : 'Break';
updateBreakButtonsVisibility();
