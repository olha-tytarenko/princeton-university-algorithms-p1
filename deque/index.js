const insertFisrtButton = document.getElementById('indesrtFirst');
const insertLastButton = document.getElementById('insertLast');
const removeFisrtButton = document.getElementById('removeFirst');
const removeLastButton = document.getElementById('removeLast');

const dequeContainerElement = document.getElementById('dequeVisualisation');
const deque = new ArrayDeque();

insertFisrtButton.addEventListener('click', addItem('addFirst'));
insertLastButton.addEventListener('click', addItem('addLast'));
removeFisrtButton.addEventListener('click', removeItem('removeFirst'));
removeLastButton.addEventListener('click', removeItem('removeLast'));


function addItem(operator) {
    return () => {
        const value = generateColor();
        deque[operator](value);
        renderDeque();
    }
}


function removeItem(operator) {
    return () => {
        deque[operator]();
        renderDeque();
    }
}

function getItemHtml(value) {
    return `<div style="background-color: ${value};" class="deque-item"></div>`
}

function renderDeque() {
    let dequeHtml = '';

    for (let item of deque) {
        dequeHtml += getItemHtml(item);    
    }

    dequeContainerElement.innerHTML = dequeHtml;
}


function generateColor() {
    const R = Math.round(Math.random() * 255);
    const G = Math.round(Math.random() * 255);
    const B = Math.round(Math.random() * 255);

    return `rgb(${R}, ${G}, ${B})`;
}