document.addEventListener('DOMContentLoaded', function () {
    const taskForm = document.getElementById('task-form');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');
    const clearButton = document.getElementById('clear-button');

    taskForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const taskText = taskInput.value.trim();

        if (taskText !== '') {
            addTask(taskText);
            taskForm.reset();
            saveTasksToLocalStorage();
        }
    });

    taskList.addEventListener('click', function (e) {
        const target = e.target;

        if (target.tagName === 'INPUT' && target.type === 'checkbox') {
            completeTask(target.parentElement);
            saveTasksToLocalStorage();
        } else if (target.tagName === 'BUTTON') {
            if (target.classList.contains('edit-btn')) {
                editTask(target.parentElement);
            } else {
                deleteTask(target.parentElement);
                saveTasksToLocalStorage();
            }
        }
    });

    clearButton.addEventListener('click', function () {
        clearTaskList();
        clearLocalStorage(); 
    });

    function addTask(taskText) {
        const li = document.createElement('li');
        li.innerHTML = `
            <input type="checkbox" class="complete-checkbox">
            <span>${taskText}</span>
            <button class="edit-btn">Edit</button>
            <button>Delete</button>
        `;
        taskList.appendChild(li);
    }

    function completeTask(taskElement) {
        const span = taskElement.querySelector('span');
        span.classList.toggle('completed');
    }

    function editTask(taskElement) {
        const span = taskElement.querySelector('span');
        const newText = prompt('Edit task:', span.textContent);

        if (newText !== null) {
            span.textContent = newText;
            saveTasksToLocalStorage();
        }
    }

    function deleteTask(taskElement) {
        taskElement.remove();
        saveTasksToLocalStorage();
    }

    function clearTaskList() {
        taskList.innerHTML = '';
        saveTasksToLocalStorage();
    }

    function saveTasksToLocalStorage() {
        const tasks = [];
        document.querySelectorAll('#task-list li span').forEach(task => {
            tasks.push(task.textContent);
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function clearLocalStorage() {
        localStorage.removeItem('tasks'); 
    }

    function loadTasksFromLocalStorage() {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    
        if (tasks.length > 0) {
            tasks.forEach(taskText => {
                addTask(taskText);
            });
        }
    }

    loadTasksFromLocalStorage();
});
