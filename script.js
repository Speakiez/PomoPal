const clockDisplay = document.getElementsByClassName("clock")[0];
const startButton = document.getElementsByClassName("start btn")[0];
const focusButton = document.getElementsByClassName("focus btn")[0];
const shortBreakButton = document.getElementsByClassName("short-break btn")[0];
const longBreakButton = document.getElementsByClassName("long-break btn")[0];
const audioBtnPress = document.getElementById("btnPress");
const audiotimerEnd = document.getElementById("timerEnd");

const focusDuration = [25, 0, "focus"]; // minutes, seconds, state
const shortBreakDuration = [5, 0, "shortBreak"]; // minutes, seconds, state
const longBreakDuration = [15, 0, "longBreak"]; // minutes, seconds, state
const clockSpeed = 1000; // milliseconds

let isRunning;
let currentState = {
    minutes: focusDuration[0],
    seconds: focusDuration[1],
    state: focusDuration[2]
};

startButton.addEventListener("click", () => {
    if (!startButton.classList.contains("active")) {
        startClock();
        
    } else {
        pauseClock();
    }
    audioBtnPress.play();
});

focusButton.addEventListener("click", () => {
    if (isRunning) pauseClock();
    setClock(focusDuration);
    audioBtnPress.play();
    updateDisplay();
    updateButtons();
});

shortBreakButton.addEventListener("click", () => {
    if (isRunning) pauseClock();
    setClock(shortBreakDuration);
    audioBtnPress.play();
    updateDisplay();
    updateButtons();
});

longBreakButton.addEventListener("click", () => {
    if (isRunning) pauseClock();
    setClock(longBreakDuration);
    audioBtnPress.play();
    updateDisplay();
    updateButtons();
});

const startClock = () => {
    if (!isRunning) isRunning = setInterval(clockEngine, clockSpeed);
    startButton.innerHTML = "PAUSE";
    startButton.classList.toggle("active");
};

const pauseClock = () => {
    clearInterval(isRunning);
    isRunning = undefined;
    startButton.innerHTML = "START";
    startButton.classList.toggle("active");
}

const setClock = (durationArr) => {
    currentState.minutes = durationArr[0];
    currentState.seconds = durationArr[1];
    currentState.state = durationArr[2];
};

const updateDisplay = () => {
    let displayMinutes = currentState.minutes < 10 ? `0${currentState.minutes}` : currentState.minutes;
    let displaySeconds = currentState.seconds < 10 ? `0${currentState.seconds}` : currentState.seconds;
    clockDisplay.innerHTML = `${displayMinutes}:${displaySeconds}`;
};

const updateButtons = () => {
    switch (currentState.state) {
        case "focus":
            focusButton.classList.add("active");
            shortBreakButton.classList.remove("active");
            longBreakButton.classList.remove("active");
            break;
        case "shortBreak":
            focusButton.classList.remove("active");
            shortBreakButton.classList.add("active");
            longBreakButton.classList.remove("active");
            break;
        case "longBreak":
            focusButton.classList.remove("active");
            shortBreakButton.classList.remove("active");
            longBreakButton.classList.add("active");
            break;
    }
}

const updateState = () => {
    switch (currentState.state) {
        case "focus":
            setClock(shortBreakDuration)
            break;
        case "shortBreak":
            setClock(focusDuration)
            break;
        case "longBreak":
            setClock(focusDuration)
            
            break;
    }
    updateButtons();
}

const clockEngine = () => {
    currentState.seconds--;
    if (currentState.seconds < 0) {
        currentState.minutes--;
        currentState.seconds = 59;
    } else if (!currentState.minutes && !currentState.seconds) {
        audiotimerEnd.play();
        pauseClock();
        updateState();
    }
    
    updateDisplay();
};
