let key = 0;
let minutecounter = 0;
let secondcounter = 0;
let miliseccounter = 0;
let minuteInterval, secondInterval, milisecInterval;

function startClock() {
    const startButton = document.getElementById("start-button");
    const lapButton = document.getElementById("lap-button");
    const resetButton = document.getElementById("reset-button");
    const ring = document.querySelector(".ring");

    if (key === 0) {
        startButton.innerHTML = "Pause";
        lapButton.classList.remove("inactive");
        resetButton.classList.add("inactive");
        ring.style.display = "block";

        milisecInterval = setInterval(() => {
            miliseccounter++;
            if (miliseccounter === 100) {
                miliseccounter = 0;
                secondcounter++;
                if (secondcounter === 60) {
                    secondcounter = 0;
                    minutecounter++;
                    document.querySelector(".min").innerHTML = ('0' + minutecounter).slice(-2);
                }
                document.querySelector(".sec").innerHTML = ('0' + secondcounter).slice(-2);
            }
            document.querySelector(".mili").innerHTML = ('0' + miliseccounter).slice(-2);
        }, 10);

        key = 1;
    } else {
        startButton.innerHTML = "Start";
        lapButton.classList.add("inactive");
        resetButton.classList.remove("inactive");
        ring.style.display = "none";

        clearInterval(milisecInterval);

        key = 0;
    }
}

function lapClick() {
    const lapList = document.getElementById("lap-1");
    const currentLapTime = `${('0' + minutecounter).slice(-2)} : ${('0' + secondcounter).slice(-2)} : ${('0' + miliseccounter).slice(-2)}`;

    const newLap = document.createElement("li");
    newLap.classList.add("detail");
    newLap.innerHTML = `<span class="num">#${lapList.childElementCount + 1}</span><span class="record">${currentLapTime}</span>`;

    lapList.prepend(newLap);
    lapList.style.display = "block";
}

function resetClick() {
    clearInterval(milisecInterval);

    minutecounter = 0;
    secondcounter = 0;
    miliseccounter = 0;
    document.querySelector(".min").innerHTML = ('0' + minutecounter).slice(-2);
    document.querySelector(".sec").innerHTML = ('0' + secondcounter).slice(-2);
    document.querySelector(".mili").innerHTML = ('0' + miliseccounter).slice(-2);

    document.getElementById("lap-1").innerHTML = "";
    document.getElementById("lap-1").style.display = "none";

    document.getElementById("start-button").innerHTML = "Start";
    document.getElementById("lap-button").classList.add("inactive");
    document.getElementById("reset-button").classList.add("inactive");

    document.querySelector(".ring").style.display = "none";

    key = 0;
}
