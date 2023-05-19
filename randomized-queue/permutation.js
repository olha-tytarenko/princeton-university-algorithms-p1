const stringInput = document.getElementById('originalString');
const numberInput = document.getElementById('numberOfCharacters');
const actionButton = document.getElementById('actionButton');
const resultContainer = document.getElementById('characterContainer');
let string = '';
let numberOfDisplayedCharacters = 0;


stringInput.addEventListener('input', (event) => {
    string = event.target.value;
});

numberInput.addEventListener('input', (event) => {
    numberOfDisplayedCharacters = Number(event.target.value);
});

actionButton.addEventListener('click', () => {
    if (string.length === 0) {
        throw 'Empty string error';
    }

    if (numberOfDisplayedCharacters === 0) {
        throw 'Zero or Empty number error';
    }

    if (numberOfDisplayedCharacters > string.length) {
        throw 'Can not display more characters than were entered';
    }

    const randomizedQueue = new RandomizedQueue();
    for (let i = 0; i < string.length; i++) {
        randomizedQueue.enqueue(string[i]);
    }
    
    let result = '';
    const iterator = randomizedQueue[Symbol.iterator]();

    for (let i = 0; i < numberOfDisplayedCharacters; i++) {
        result += iterator.next().value;
    }

    resultContainer.innerHTML = result;
});
