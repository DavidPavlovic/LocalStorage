const addItems = document.querySelector('.add-items');
const itemsList = document.querySelector('.plates');
const items = JSON.parse(localStorage.getItem('items')) || [];

function addItem(e) {
    e.preventDefault();
    const text = (this.querySelector('[name=item]')).value;
    const item = {
        text,
        done: false
    }
    items.push(item);
    populateList(items, itemsList);
    localStorage.setItem('items', JSON.stringify(items));
    console.log(item);
    this.reset();
}

function populateList(plates = [], platesList) {
    platesList.innerHTML = plates.map((plate, i) => {
        return `
            <li>
                <input type="checkbox" data-index="${i}" id="${i}" ${plate.done ? 'checked' : ''}/>
                <label for="${i}">${plate.text}</label>
            </li>
        `;
    }).join('');
}


function toggleDone(e) {
    const el = e.target;
    const index = el.dataset.index;
    // Skip this unless it's an input
    if(!e.target.matches('input')) return;
    items[index].done = !items[index].done;
    localStorage.setItem('items', JSON.stringify(items));
}

addItems.addEventListener('submit', addItem);
itemsList.addEventListener('click', toggleDone);

populateList(items, itemsList);