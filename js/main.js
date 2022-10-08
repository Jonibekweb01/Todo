const body = document.querySelector('body')
const elForm = document.querySelector(".js-form");
const elInput = document.querySelector(".js-input");
const elList = document.querySelector('.js-list');
const elBtn = document.querySelector('.js-btn');
const all = document.querySelector('.js-all');
const complates = document.querySelector('.js-complate')
const unComplate = document.querySelector('.js-unComplate');
const btnAll = document.querySelector('.btns');
const modeBtn = document.querySelector('.js-mode')

const getItem = JSON.parse(window.localStorage.getItem('list'))

const todos = getItem || [];

elForm.addEventListener("submit", function (e) {
    e.preventDefault();

    let inputVal = elInput.value;

    todos.push({
        id: todos.length ? todos[todos.length - 1].id + 1 : 1,
        text: inputVal,
        isComplated: false
    });

    all.textContent = todos.length;

    let unComplated = todos.filter((el) => !el.isComplated)
    unComplate.textContent = unComplated.length;

    renderTodos(todos, elList);

    window.localStorage.setItem('list', JSON.stringify(todos));
})

let renderTodos = (array, node) => {
    all.textContent = todos.length;

    let complate = todos.filter(el => el.isComplated)
    complates.textContent = complate.length;

    let unComplated = todos.filter(ele => !ele.isComplated);
    unComplate.textContent = unComplated.length;

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

renderTodos(todos, elList);

elList.addEventListener('click', function (e) {
    if (e.target.matches('.js-btn')) {
        let toDoId = e.target.dataset.toDoId;

        let findedIndex = todos.findIndex(el => el.id == toDoId)

        todos.splice(findedIndex, 1);

        renderTodos(todos, elList);
        window.localStorage.setItem('list', JSON.stringify(todos))

    }
    if (e.target.matches('.js-checkbox')) {
        let toDoid = e.target.dataset.toDoId;

        let finded = todos.find(el => el.id == toDoid)

        finded.isComplated = !finded.isComplated

        renderTodos(todos, elList);
        window.localStorage.setItem('list', JSON.stringify(todos))
    }

})


btnAll.addEventListener('click', function (evt) {
    if (evt.target.matches('.js-alls')) {
        renderTodos(todos, elList);
    }
    if (evt.target.matches('.js-complates')) {
        let filteredArr = todos.filter(el => el.isComplated);
        renderTodos(filteredArr, elList);
    }
    if (evt.target.matches('.js-unComplates')) {
        let filteredArr = todos.filter(el => !el.isComplated);
        renderTodos(filteredArr, elList);
    }
    if (evt.target.matches(".js-remove")) {
        window.localStorage.removeItem('list');
        window.location.reload();
        renderTodos(filteredArr, elList);
    }
})



var total = false;
modeBtn.addEventListener('click', function () {
    total = !total;
    modeBtn.textContent = "Dark";
    window.localStorage.setItem('theme', total ? 'dark' : 'light');
    changeTheme();
});

function changeTheme() {
    if (window.localStorage.getItem('theme') == 'dark') {
        document.body.classList.add('dark');
    } else {
        modeBtn.textContent = "Light";
        document.body.classList.remove('dark');
    }
}
changeTheme();



