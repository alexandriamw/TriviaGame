// curated from https://www.dyn-web.com/tutorials/forms/radio/get-selected.php
function getRadioVal(form, name) {
    var val;
    // get list of radio buttons with specified name
    var radios = form.elements[name];

    // loop through list of radio buttons
    for (var i = 0, len = radios.length; i < len; i++) {
        if (radios[i].checked) { // radio checked?
            val = radios[i].value; // if so, hold its value in val
            break; // and break out of for loop
        }
    }
    return val; // return value of checked radio or undefined if none checked
}



//computer waits for user to press start, then hides intro and shows questions
document.getElementById("startTrivia").addEventListener("click", function () {
    document.getElementById("intro").style.display = "none";
    document.getElementById("questions").style.display = "block";

    const timerEl = document.getElementById("timer");
    let timeLeft = 30;
    const timerInterval = setInterval(function () {
        timeLeft--;
        timerEl.textContent = timeLeft;
        if (timeLeft === 0) {
            tally();
            clearInterval(timerInterval);
        }
    }, 1000);
});

document.getElementById("questions").addEventListener("submit", function (event) {
    event.preventDefault();
    tally();
});

function tally() {
    let answers = ["b", "c", "a", "d", "c", "b", "a", "b"];
    let correct = 0;
    let wrong = 0;
    let unanswered = 0;
    const correctEl = document.getElementById("correct");
    const wrongEl = document.getElementById("wrong");
    const unansweredEl = document.getElementById("unanswered");

    for (let i = 0; i < answers.length; i++) {
        const answer = getRadioVal(document.getElementById("questions"), "q" + (i + 1));

        if (answer === answers[i]) {
            correct++;
        } else {
            if (answer === undefined) {
                unanswered++;
            } else {
                wrong++;
            }
        }
    }

    document.getElementById("questions").style.display = "none";
    document.getElementById("results").style.display = "block";
    correctEl.textContent = correct;
    wrongEl.textContent = wrong;
    unansweredEl.textContent = unanswered;
}