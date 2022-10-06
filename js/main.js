const elForm = document.querySelector(".js-form");
const elInput = document.querySelector(".js-input");
const elList = document.querySelector('.js-list');
const elBtn = document.querySelector('.js-btn');
const all = document.querySelector('.js-all');
const complates = document.querySelector('.js-complate')
const unComplate = document.querySelector('.js-unComplate')

const todos = [];

elForm.addEventListener("submit", function (e) {
    e.preventDefault();

    let inputVal = elInput.value;

    todos.push({
        id: todos.length + 1,
        text: inputVal,
        isComplated: false
    });

    all.textContent = todos.length;


    let unComplated = todos.filter((el) => !el.isComplated)
    unComplate.textContent = unComplated.length;


    renderTodos(todos, elList);
})

let renderTodos = (array, node) => {
    elInput.value = ''
    node.innerHTML = '';
    array.forEach(item => {
        let newItem = document.createElement('li');
        let newInput = document.createElement("input");
        let newSpan = document.createElement('span');
        let newBtn = document.createElement('button');

        newInput.type = "Checkbox";
        newSpan.textContent = item.text;
        newBtn.textContent = "DELETE";


        newItem.setAttribute('class', 'd-flex align-items-center mb-3')
        newInput.setAttribute('class', 'form-check-input me-2 js-checkbox');
        newBtn.setAttribute('class', 'ms-auto btn btn-danger js-btn');
        newBtn.dataset.toDoId = item.id;
        newInput.dataset.toDoId = item.id;
        newItem.appendChild(newInput);
        newItem.appendChild(newSpan);
        newItem.appendChild(newBtn);
        node.appendChild(newItem);

        if (item.isComplated) {
            newSpan.setAttribute('class', "text-decoration-line-through");
            newInput.checked = true;
        }
    });
}

elList.addEventListener('click', function (e) {
    if (e.target.matches('.js-btn')) {
        let toDoId = e.target.dataset.toDoId;

        let findedIndex = todos.findIndex(el => el.id == toDoId)

        todos.splice(findedIndex, 1);


        let complate = todos.filter(el => el.isComplated)
        complates.textContent = complate.length;

        let unComplated = todos.filter(el => !el.isComplated);
        unComplate.textContent = unComplated.length;

        renderTodos(todos, elList);
    }
    if (e.target.matches('.js-checkbox')) {
        let toDoid = e.target.dataset.toDoId;

        let finded = todos.find(el => el.id == toDoid)

        finded.isComplated = !finded.isComplated


        let complate = todos.filter(el => el.isComplated)
        complates.textContent = complate.length;

        let unComplated = todos.filter(el => !el.isComplated);
        unComplate.textContent = unComplated.length;

        renderTodos(todos, elList);
    }

})