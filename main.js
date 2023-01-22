
const form = document.querySelector('form');
let updateForm = document.querySelector('#update-form');
let todosContainer = document.querySelector('.to-do');
let headingEmpty = document.querySelector('h2');
let addToDo = document.querySelector('#add-to-do');
let AllToDo = document.querySelector('#all-to-do');
let incompleteToDo = document.querySelector('#incomplete');
let completeToDo = document.querySelector('#complete');

let todos = [];

if (todos.length > 0) {
    todosContainer.style.display = 'flex';
    headingEmpty.style.display = 'none';
} else {
    todosContainer.style.display = 'none';
    headingEmpty.style.display = 'block';
}
addToDo.addEventListener('click', () => {
    headingEmpty.style.display = 'none';
    todosContainer.style.display = 'none';
    form.style.display = 'block';
})

AllToDo.addEventListener('click', () => {
    if (todos.length > 0) {
        headingEmpty.style.display = 'none';
        todosContainer.style.display = 'flex';
        form.style.display = 'none';
        displayTodos();
    } else {
        todosContainer.style.display = 'none';
        headingEmpty.style.display = 'block';
        form.style.display = 'none';
    }
})


// generate a random id
const generateId = () => {
    return Math.floor(Math.random() * 100000000);
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const title = form.title.value;
    const description = form.description.value;
    const date = form.date.value;
    // create a to do array of objects
    const todo = {
        id: generateId(),
        title,
        description,
        date,
        complete: false,
        DateCompleted: null,

    }

    todos.push(todo);
    displayTodos();
    form.reset();
    form.style.display = 'none';
})

// create function to delete all todos
const deleteAll = () => {
    todos = [];
    todosContainer.style.display = 'none';
    headingEmpty.style.display = 'block';
}

// create function to delete a single todo
const deleteTodo = (id) => {
    todos = todos.filter(todo => todo.id !== id);
    displayTodos();
}

// display all todos in the DOM
const displayTodos = () => {
    if (todos.length > 0) {
        headingEmpty.style.display = 'none';
        const todosContainer = document.querySelector('.to-do');
        todosContainer.innerHTML = '';
        todos.forEach(todo => {
            const todoHTML = `
            <div class="todo">
                <h3> <h2>Title</h2> ${todo.title}</h3>
                <p> <h2>Description</h2> ${todo.description}</p>
                <div class="date"><h2>Due</h2> <p>${todo.date}</p> </div>
                <div class="status">
                    <h2>Status</h2> ${todo.complete ? '<p>Complete</p>' : '<p>pending</p>'}
                </div>
              
                ${todo.DateCompleted ? new Date(todo.DateCompleted) - new Date(todo.date) >0 ? `<div class="days">
                <h2>late by </h2> ${todo.DateCompleted ? Math.abs(Math.floor((new Date(todo.DateCompleted) - new Date(todo.date)) / (1000 * 60 * 60 * 24)) ): '0'} days
            </div>`: `<div class="days">
            <h2>earlier by</h2> ${todo.DateCompleted ? Math.abs(Math.floor((new Date(todo.DateCompleted) - new Date(todo.date)) / (1000 * 60 * 60 * 24)) ): '0'} days
        </div>`: `<div class="days">
        ${Math.floor(( new Date(todo.date)-new Date()) / (1000 * 60 * 60 * 24))<0?`<h2>late by </h2> ${Math.abs(Math.floor((new Date(todo.date) - new Date()) / (1000 * 60 * 60 * 24)) )} days`:`<h2>Days left</h2> ${Math.abs(Math.floor((new Date(todo.date) - new Date()) / (1000 * 60 * 60 * 24)) )} days` }
    </div>`}

                <div class="complete">
                    <h2>Mark</h2> ${todo.complete ? `<button onclick="incomplete(${todo.id})">Incomplete</button>` : `<button onclick="complete(${todo.id})">Complete</button>`}
                </div>
                <div class="actions">
                <button onclick="updateTodo(${todo.id})">Update</button>
                <button onclick="deleteTodo(${todo.id})">Delete</button>
                <button onclick="deleteAll()">delete all</button>
                </div>
                
            </div>
            `
            todosContainer.innerHTML += todoHTML;
            todosContainer.style.display = 'flex';
        })
    } else {
        todosContainer.style.display = 'none';
        headingEmpty.style.display = 'block';
    }

}

const updateTodo = (id) => {
    let todo = todos.find(todo => todo.id === id);
    updateForm.title.value = todo.title;
    updateForm.description.value = todo.description;
    updateForm.date.value = todo.date;
    updateForm.id.value = todo.id;
    updateForm.style.display = 'block';
    todosContainer.style.display = 'none';
    headingEmpty.style.display = 'none';
    form.style.display = 'none';
}

updateForm.addEventListener('submit', (e) => {
    e.preventDefault();
    let title = updateForm.title.value;
    let description = updateForm.description.value;
    let date = updateForm.date.value;
    let id = Number(updateForm.id.value);
    let todo = todos.find(todo => todo.id === id);
    todo.title = title;
    todo.description = description;
    todo.date = date;
    todo.DateCompleted = null;
    updateForm.style.display = 'none';
    displayTodos();
})

const complete = (id) => {
    let todo = todos.find(todo => todo.id === id);
    todo.complete = true;
    todo.DateCompleted = new Date();
    displayTodos();
}

const incomplete = (id) => {
    let todo = todos.find(todo => todo.id === id);
    todo.complete = false;
    todo.DateCompleted = null;
    displayTodos();
}


const showIncomplete = () => {
    if (todos.length > 0) {
        headingEmpty.style.display = 'none';
        form.style.display = 'none';
        updateForm.style.display = 'none';
        const todosContainer = document.querySelector('.to-do');
        todosContainer.innerHTML = '';
        if (todos.some(todo => todo.complete === false)) {
            todos.forEach(todo => {
                if (!todo.complete) {
                    const todoHTML = `
                    <div class="todo">
                        <h3> <h2>Title</h2> ${todo.title}</h3>
                        <p> <h2>Description</h2> ${todo.description}</p>
                        <div class="date"><h2>Due</h2> <p>${todo.date}</p> </div>
                        <div class="status">
                            <h2>Status</h2> ${todo.complete ? '<p>Complete</p>' : '<p>pending</p>'}
                        </div>
                      
                        ${todo.DateCompleted ? new Date(todo.DateCompleted) - new Date(todo.date) >0 ? `<div class="days">
                        <h2>late by </h2> ${todo.DateCompleted ? Math.abs(Math.floor((new Date(todo.DateCompleted) - new Date(todo.date)) / (1000 * 60 * 60 * 24)) ): '0'} days
                    </div>`: `<div class="days">
                    <h2>earlier by</h2> ${todo.DateCompleted ? Math.abs(Math.floor((new Date(todo.DateCompleted) - new Date(todo.date)) / (1000 * 60 * 60 * 24)) ): '0'} days
                </div>`: `<div class="days">
                ${Math.floor(( new Date(todo.date)-new Date()) / (1000 * 60 * 60 * 24))<0?`<h2>late by </h2> ${Math.abs(Math.floor((new Date(todo.date) - new Date()) / (1000 * 60 * 60 * 24)) )} days`:`<h2>Days left</h2> ${Math.abs(Math.floor((new Date(todo.date) - new Date()) / (1000 * 60 * 60 * 24)) )} days` }
            </div>`}
        
                        <div class="complete">
                            <h2>Mark</h2> ${todo.complete ? `<button onclick="incomplete(${todo.id})">Incomplete</button>` : `<button onclick="complete(${todo.id})">Complete</button>`}
                        </div>
                        <div class="actions">
                        <button onclick="updateTodo(${todo.id})">Update</button>
                        <button onclick="deleteTodo(${todo.id})">Delete</button>
                        <button onclick="deleteAll()">delete all</button>
                        </div>
                        
                    </div>
                    `
                    todosContainer.innerHTML += todoHTML;
                    todosContainer.style.display = 'flex';
                }
            })
        } else {
            todosContainer.style.display = 'none';
            headingEmpty.style.display = 'block';
            headingEmpty.innerText = 'No Incomplete Todos';
        }
    } else {
        todosContainer.style.display = 'none';
        headingEmpty.style.display = 'block';
        headingEmpty.innerText = 'No Incomplete Todos';
        form.style.display = 'none';
        updateForm.style.display = 'none';
    }
}

const showComplete = () => {
    if (todos.length > 0) {
        headingEmpty.style.display = 'none';
        form.style.display = 'none';
        updateForm.style.display = 'none';
        const todosContainer = document.querySelector('.to-do');
        todosContainer.innerHTML = '';

        if (todos.some(todo => todo.complete === true)) {
            todos.forEach(todo => {
                if (todo.complete) {
                    const todoHTML = `
                    <div class="todo">
                        <h3> <h2>Title</h2> ${todo.title}</h3>
                        <p> <h2>Description</h2> ${todo.description}</p>
                        <div class="date"><h2>Due</h2> <p>${todo.date}</p> </div>
                        <div class="status">
                            <h2>Status</h2> ${todo.complete ? '<p>Complete</p>' : '<p>pending</p>'}
                        </div>
                      
                        ${todo.DateCompleted ? new Date(todo.DateCompleted) - new Date(todo.date) >0 ? `<div class="days">
                        <h2>late by </h2> ${todo.DateCompleted ? Math.abs(Math.floor((new Date(todo.DateCompleted) - new Date(todo.date)) / (1000 * 60 * 60 * 24)) ): '0'} days
                    </div>`: `<div class="days">
                    <h2>earlier by</h2> ${todo.DateCompleted ? Math.abs(Math.floor((new Date(todo.DateCompleted) - new Date(todo.date)) / (1000 * 60 * 60 * 24)) ): '0'} days
                </div>`: `<div class="days">
                ${Math.floor(( new Date(todo.date)-new Date()) / (1000 * 60 * 60 * 24))<0?`<h2>late by </h2> ${Math.abs(Math.floor((new Date(todo.date) - new Date()) / (1000 * 60 * 60 * 24)) )} days`:`<h2>Days left</h2> ${Math.abs(Math.floor((new Date(todo.date) - new Date()) / (1000 * 60 * 60 * 24)) )} days` }
            </div>`}
        
                        <div class="complete">
                            <h2>Mark</h2> ${todo.complete ? `<button onclick="incomplete(${todo.id})">Incomplete</button>` : `<button onclick="complete(${todo.id})">Complete</button>`}
                        </div>
                        <div class="actions">
                        <button onclick="updateTodo(${todo.id})">Update</button>
                        <button onclick="deleteTodo(${todo.id})">Delete</button>
                        <button onclick="deleteAll()">delete all</button>
                        </div>
                        
                    </div>
                    `
                    todosContainer.innerHTML += todoHTML;
                    todosContainer.style.display = 'flex';
                }
            })
        } else {
            todosContainer.style.display = 'none';
            headingEmpty.style.display = 'block';
            headingEmpty.innerText = 'No Complete Todos';
        }

    } else {
        todosContainer.style.display = 'none';
        headingEmpty.style.display = 'block';
        headingEmpty.innerText = 'No Complete Todos';
        form.style.display = 'none';
        updateForm.style.display = 'none';
    }
}

incompleteToDo.addEventListener('click', showIncomplete)
completeToDo.addEventListener('click', showComplete)

