
const form = document.querySelector('form');
let updateForm = document.querySelector('#update-form');
let todosContainer = document.querySelector('.to-do');
let headingEmpty = document.querySelector('h2');
let context = document.querySelector('h1');
let addToDo = document.querySelector('#add-to-do');
let AllToDo = document.querySelector('#all-to-do');
let incompleteToDo = document.querySelector('#incomplete');
let completeToDo = document.querySelector('#complete');
let dateError = document.querySelector('#date-error');
let updateDateError = document.querySelector('#update-date-error');
let todos = [];


if (todos.length > 0) {
    todosContainer.style.display = 'flex';
    headingEmpty.style.display = 'none';
} else {
    todosContainer.style.display = 'none';
    headingEmpty.style.display = 'block';
}
addToDo.addEventListener('click', () => {
    context.innerText = 'Add To Do';
    headingEmpty.style.display = 'none';
    todosContainer.style.display = 'none';
    form.style.display = 'block';
})

AllToDo.addEventListener('click', () => {
    if (todos.length > 0) {
        context.innerText = 'All To Do';
        headingEmpty.style.display = 'none';
        todosContainer.style.display = 'flex';
        form.style.display = 'none';
        displayTodos();
    } else {
        todosContainer.style.display = 'none';
        headingEmpty.innerText = 'Your to do is empty';
        headingEmpty.style.display = 'block';
        form.style.display = 'none';
    }
})

/**
 * 
 * @returns 
 */
const generateId = () => {
    
    return Math.floor(Math.random() * 100000000);
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const title = form.title.value;
    const description = form.description.value;
    const date = form.date.value;
    // check date error
    if (new Date(date) - new Date() < 0) {
        dateError.style.display = 'block';
        dateError.innerText = 'Date must be greater than today';
        dateError.style.color = 'red';
        
        return;
    } else {
        dateError.style.display = 'none';
    }
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

/**
 * 
 * empty the todos array
 * Hide the todos container
 * Show the heading
 * 
 */
const deleteAll = () => {
    todos = [];
    todosContainer.style.display = 'none';
    headingEmpty.style.display = 'block';
}

/**
 * 
 * @param {Number} id The id of todo to be deleted
 */
const deleteTodo = (id) => {
    todos = todos.filter(todo => todo.id !== id);
    displayTodos();
}

/**
 * Display the todos in the DOM
 * hide the heading if there are todos
 * hide the todos container if there are no todos
 * 
 * */
const displayTodos = () => {
    if (todos.length > 0) {
        context.innerText = 'All To Do';
        headingEmpty.style.display = 'none';
        updateForm.style.display = 'none';
        const todosContainer = document.querySelector('.to-do');
        todosContainer.innerHTML = '';
        todos.forEach(todo => {const todoHTML = `
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
/**
 * Update the todo
 * populate the form with the todo details
 * hide the todos container
 * hide the heading
 * show the form
 * @param {Number} id The id of the be updated
 * 
 */
const updateTodo = (id) => {
    let todo = todos.find(todo => todo.id === id);
    updateForm.title.value = todo.title;
    updateForm.description.value = todo.description;
    updateForm.date.value = todo.date;
    updateForm.id.value = todo.id;
    updateForm.style.display = 'block';
    todosContainer.style.display = 'none';
    headingEmpty.style.display = 'none';
    context.innerText = 'Update To Do';
    form.style.display = 'none';
}


updateForm.addEventListener('submit', (e) => {
    e.preventDefault();
    let title = updateForm.title.value;
    let description = updateForm.description.value;
    let date = updateForm.date.value;
    let id = Number(updateForm.id.value);
    if (new Date(date) - new Date() < 0) {
        updateDateError.style.display = 'block';
        updateDateError.innerText = 'Date must be greater than today';
        updateDateError.style.color = 'red';
        
        return;
    } else {
        updateDateError.style.display = 'none';
    }
    let todo = todos.find(todo => todo.id === id);
    todo.title = title;
    todo.description = description;
    todo.date = date;
    todo.DateCompleted = null;
    updateForm.style.display = 'none';
    
    displayTodos();
})
/**
 * mark the todo as complete
 * set the date completed to the current date
 * display the todos
 * @param {Number} id 
 */
const complete = (id) => {
    
    let todo = todos.find(todo => todo.id === id);
    todo.complete = true;
    todo.DateCompleted = new Date();
    displayTodos();
}

/**
 * mark the todo as incomplete
 * set the date completed to null
 * display the todos
 * 
 * @param {Number} id 
 */
const incomplete = (id) => {
    let todo = todos.find(todo => todo.id === id);
    todo.complete = false;
    todo.DateCompleted = null;
    displayTodos();
}

/**
 * show the todos that are incomplete and or message that there are no incomplete todos
 */
const showIncomplete = () => {
    if (todos.length > 0) {
        headingEmpty.style.display = 'none';
        context.innerText = 'Incomplete To Do';
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
        context.innerText = 'Incomplete To Do';
        headingEmpty.innerText = 'No Incomplete Todos';
        form.style.display = 'none';
        updateForm.style.display = 'none';
    }
}
/**
 * show the todos that are complete and or message that there are no complete todos
 * 
 * 
 */
const showComplete = () => {
    if (todos.length > 0) {
        headingEmpty.style.display = 'none';
        context.innerText = 'Complete To Do';
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
        context.innerText = 'Complete To Do';
        todosContainer.style.display = 'none';
        headingEmpty.style.display = 'block';
        headingEmpty.innerText = 'No Complete Todos';
        form.style.display = 'none';
        updateForm.style.display = 'none';
    }
}

incompleteToDo.addEventListener('click', showIncomplete)
completeToDo.addEventListener('click', showComplete)
