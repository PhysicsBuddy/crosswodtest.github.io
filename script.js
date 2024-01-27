const words = document.querySelectorAll('.word');
const maxTrials = 3;
var current_point = 0;

words.forEach(word => {
    const cells = word.querySelectorAll('.cell');

    cells.forEach(cell => {
        cell.addEventListener('input', () => {
            cell.style.backgroundColor = '';
        });
    });
});

const prompts = document.querySelectorAll('.prompt');

prompts.forEach(prompt => {
    const wordName = prompt.getAttribute('data-prompt-for');
    const word = document.querySelector(`[self-word="${wordName}"]`);
    const cells = word.querySelectorAll('.cell');
    const trialsDisplay = prompt.querySelector('#trials');
    const pointDisplay = document.getElementById('point');

    const checkButton = prompt.querySelector('.check-button');
    let trials = 0;

    checkButton.addEventListener('click', () => {
        if (isWordCompleted(cells)) {
            cells.forEach(cell => {
                cell.disabled = true;
                ontop(cell);
                cell.style.backgroundColor = 'green';
                if (cell.getAttribute('link') === '1'){
                    lockcell(cell, 'green');
                }
            });
            checkButton.disabled = true;
            if (trials == 0){
                pointDisplay.textContent = current_point += 3;
            }
            if (trials == 1){
                pointDisplay.textContent = current_point += 2;
            }
            if (trials == 2){
                pointDisplay.textContent = current_point += 1;
            }
            trialsDisplay.textContent = "Correct on " + (trials+1) + "(Ans:" + word.getAttribute('self-word')+ ")";
            checkButton.disabled = true;
        } else {
            trials++;
            trialsDisplay.textContent = 'Check (Trials-left: ' + (3-trials) + ")";
            if (trials >= maxTrials) {
                trialsDisplay.textContent = "Run out of trials - answer has been revealed";
                revealAnswer(cells);
                checkButton.style.backgroundColor = 'red';
                checkButton.disabled = true;
            } else {
                cells.forEach(cell => {
                    ontop(cell);
                    if(cell.disabled){
                        console.log('pass')
                    } else{
                        cell.style.backgroundColor = 'red';
                    }
                })
            }
        }
    });
});

function ontop(cell){
    var elements = document.getElementsByClassName("cell");
    var highest_index = 0;

    for (var i = 0; i < elements.length - 1; i++) 
    {
        if (parseInt(elements[i].style.zIndex) > highest_index) 
        {        
            highest_index = parseInt(elements[i].style.zIndex);
        }
    }

    cell.style.zIndex = highest_index + 1;
}


function revealAnswer(cells) {
    cells.forEach(cell => {
        cell.value = cell.dataset.char;
        if(cell.disabled){
            console.log('pass')
        } else{
            cell.style.backgroundColor = 'yellow';
        }
        cell.disabled = true;
        if (cell.getAttribute('link') === '1'){
            updateOtherInput(cell);
            lockcell(cell, 'yellow');
        }
        if (cell.getAttribute('link') === '2'){
            updateOtherInput2(cell);
            lockcell2(cell, 'yellow');
        }
    });
}

function isWordCompleted(cells) {
    return [...cells].every(cell => cell.value.toLowerCase() === cell.dataset.char);
}

function updateOtherInput(childElement) {
    var element = childElement.closest('div');
    var word1 = element.getAttribute("self-word");
    var word2 = element.getAttribute("go-word");
    var goIndex = element.getAttribute("go-link-index")
    var index = element.getAttribute("self-link-index")
    console.log(word2)
    console.log(goIndex)
    var word2text = document.querySelector(`[self-word="${word2}"]`);
    var word1text = document.querySelector(`[self-word="${word1}"]`);
    var inputText = word1text.querySelector(`[data-index="${index}"]`).value;
    console.log(inputText)
    word2text.querySelector(`[data-index="${goIndex}"]`).value = inputText;
}

function lockcell(childElement, color) {
    var element = childElement.closest('div');
    var word1 = element.getAttribute("self-word");
    var word2 = element.getAttribute("go-word");
    var goIndex = element.getAttribute("go-link-index")
    var index = element.getAttribute("self-link-index")
    var word2text = document.querySelector(`[self-word="${word2}"]`);
    var word1text = document.querySelector(`[self-word="${word1}"]`);
    var inputText = word1text.querySelector(`[data-index="${index}"]`).value;
    word2text.querySelector(`[data-index="${goIndex}"]`).disabled = true;
    word2text.querySelector(`[data-index="${goIndex}"]`).style.backgroundColor = color;
}

function updateOtherInput2(childElement) {
    var element = childElement.closest('div');
    var word1 = element.getAttribute("self-word");
    var word2 = element.getAttribute("go-word2");
    var goIndex = element.getAttribute("go-link-index2")
    var index = element.getAttribute("self-link-index2")
    console.log(word2)
    console.log(goIndex)
    var word2text = document.querySelector(`[self-word="${word2}"]`);
    var word1text = document.querySelector(`[self-word="${word1}"]`);
    var inputText = word1text.querySelector(`[data-index="${index}"]`).value;
    console.log(inputText)
    word2text.querySelector(`[data-index="${goIndex}"]`).value = inputText;
}

function lockcell2(childElement, color) {
    var element = childElement.closest('div');
    var word1 = element.getAttribute("self-word");
    var word2 = element.getAttribute("go-word2");
    var goIndex = element.getAttribute("go-link-index2")
    var index = element.getAttribute("self-link-index2")
    var word2text = document.querySelector(`[self-word="${word2}"]`);
    var word1text = document.querySelector(`[self-word="${word1}"]`);
    var inputText = word1text.querySelector(`[data-index="${index}"]`).value;
    word2text.querySelector(`[data-index="${goIndex}"]`).disabled = true;
    word2text.querySelector(`[data-index="${goIndex}"]`).style.backgroundColor = color;
}

document.addEventListener("DOMContentLoaded", function() {
    const words = document.querySelectorAll('.word');

    words.forEach(word => {
        const x = parseInt(word.getAttribute('x'));
        const y = parseInt(word.getAttribute('y'));
        const cellWidth = 30; // Adjust this value according to your cell width
        const cellOffset = 1; // Offset for starting point

        const leftPosition = (x - cellOffset) * cellWidth;
        const topPosition = (y - cellOffset) * cellWidth;

        word.style.left = `${leftPosition}px`;
        word.style.top = `${topPosition}px`;
    });
});

function hasLinkAttribute(cellElement) {
    return cellElement.hasAttribute('link');
}

document.addEventListener("DOMContentLoaded", function() {
    // Timer countdown function
    function startTimer(duration, display) {
        let timer = duration, minutes, seconds;
        setInterval(function () {
            minutes = parseInt(timer / 60, 10);
            seconds = parseInt(timer % 60, 10);

            minutes = minutes < 10 ? "0" + minutes : minutes;
            seconds = seconds < 10 ? "0" + seconds : seconds;

            display.textContent = minutes + ":" + seconds;

            if (--timer < 0) {
                timer = duration;
                // Timer reaches zero - You can add your logic here
            }
        }, 1000);
    }

    // Set the timer duration in seconds
    const timerDuration = 40 * 60; // 30 minutes

    // Get the timer display element
    const timerDisplay = document.getElementById('timer');

    // Start the timer
    startTimer(timerDuration, timerDisplay);
});


// ----------------------log in---------------------------
//selecting all required elements
const start_btn_parent = document.querySelector(".start_btn");
const start_btn = document.querySelector(".start_btn button");
const info_box = document.querySelector(".info_box");
const container = document.querySelector(".container");
const exit_btn = info_box.querySelector(".buttons .quit");
const continue_btn = info_box.querySelector(".buttons .restart");
const time_line = document.querySelector("header .time_line");
const timeText = document.querySelector(".timer .time_left_txt");
const timeCount = document.querySelector(".timer .timer_sec");

// if startQuiz button clicked
start_btn.onclick = ()=>{
    info_box.classList.add("activeInfo"); //show info box
}

// if exitQuiz button clicked
exit_btn.onclick = ()=>{
    info_box.classList.remove("activeInfo"); //hide info box
}

// if continueQuiz button clicked
continue_btn.onclick = ()=>{
    info_box.classList.remove("activeInfo"); //hide info box
    container.classList.add("activeContainer"); //show quiz box
    start_btn_parent.classList.add('inactive')
}
