document.addEventListener("DOMContentLoaded", function () {
    const timerEl = document.getElementById("modal_timer_text");
    const step0 = document.getElementById("step0");
    const step1 = document.getElementById("step1");

    if (!timerEl || !step0 || !step1) return;

    let totalSeconds = 60;
    let timerStarted = false;
    let switched = false;

    function openStep1() {
        if (switched) return;
        switched = true;

        step0.classList.remove("active");
        step1.classList.add("active");
    }

    function renderTimer() {
        const minutes = String(Math.floor(totalSeconds / 60)).padStart(2, "0");
        const seconds = String(totalSeconds % 60).padStart(2, "0");
        timerEl.textContent = `${minutes}:${seconds}`;
    }

    function startTimer() {
        if (timerStarted) return;
        timerStarted = true;

        renderTimer();

        const intervalId = setInterval(function () {
            if (totalSeconds <= 0) {
                clearInterval(intervalId);
                openStep1();
                return;
            }

            totalSeconds -= 1;
            renderTimer();
        }, 1000);
    }

    renderTimer();

    setTimeout(function () {
        startTimer();
    }, 1550);
});




