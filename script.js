const words = document.querySelectorAll('.word');
const message = document.getElementById('message');
const maxTrials = 3;

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
    const word = document.querySelector(`[data-word="${wordName}"]`);
    const cells = word.querySelectorAll('.cell');

    const checkButton = prompt.querySelector('.check-button');
    let trials = 0;

    checkButton.addEventListener('click', () => {
        if (isWordCompleted(cells)) {
            cells.forEach(cell => {
                cell.disabled = true;
                ontop(cell);
                cell.style.backgroundColor = 'green';
            });
            message.textContent = `You got the word "${wordName}" right!`;
        } else {
            trials++;
            if (trials >= maxTrials) {
                revealAnswer(cells);
                message.textContent = `You've exceeded the maximum trials for the word "${wordName}". The correct answer is revealed.`;
            } else {
                cells.forEach(cell => {
                    ontop(cell)
                    if (cell.value.toLowerCase() === cell.dataset.char) {
                        cell.style.backgroundColor = 'green';
                        cell.disabled = true;
                    } else {
                        cell.style.backgroundColor = 'red';
                    }
                });
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
        cell.disabled = true;
        cell.style.backgroundColor = 'yellow';
        if (cell.getAttribute('link') === '1'){
            updateOtherInput(cell);
        }
        else if (cell.getAttribute('link') === '2'){
            updateOtherInput2(cell);
        }
    });
}

function isWordCompleted(cells) {
    return [...cells].every(cell => cell.value.toLowerCase() === cell.dataset.char);
}

function updateOtherInput(childElement) {
    var element = childElement.closest('div');
    var word1 = element.getAttribute("data-word");
    var word2 = element.getAttribute("data-link");
    var goIndex = element.getAttribute("data-go-index")
    var index = element.getAttribute("data-link-index")
    console.log(word2)
    console.log(goIndex)
    var word2text = document.querySelector(`[data-word="${word2}"]`);
    var word1text = document.querySelector(`[data-word="${word1}"]`);
    var inputText = word1text.querySelector(`[data-index="${index}"]`).value;
    console.log(inputText)
    word2text.querySelector(`[data-index="${goIndex}"]`).value = inputText;
}

function updateOtherInput2(childElement) {
    var element = childElement.closest('div');
    var word1 = element.getAttribute("data-word");
    var word2 = element.getAttribute("data-link2");
    var goIndex = element.getAttribute("data-go-index2")
    var index = element.getAttribute("data-link-index2")
    console.log(word2)
    console.log(goIndex)
    var word2text = document.querySelector(`[data-word="${word2}"]`);
    var word1text = document.querySelector(`[data-word="${word1}"]`);
    var inputText = word1text.querySelector(`[data-index="${index}"]`).value;
    console.log(inputText)
    word2text.querySelector(`[data-index="${goIndex}"]`).value = inputText;
}