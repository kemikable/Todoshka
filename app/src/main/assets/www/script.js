

const taskForm = document.getElementById("taskForm");
const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");

let tasks = [];

let sortDirection = "asc";
const sortButton = document.getElementById("sortButton");
const sortArrow = document.querySelector(".sort-arrow");

function renderTasks() {
    taskList.innerHTML = "";
    tasks.forEach((task, index) => {
        const li = document.createElement("li");
        li.innerHTML = `
            <input type="text" class="task-edit" value="${task}">
            <button class="delete-button">
                <svg class="delete-icon" data-index="${index}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path fill="none" d="M0 0h24v24H0z" />
                    <path d="M12 10.586l-5.293-5.293a.999.999 0 1 1 1.414-1.414L12 8.758l4.879-4.879a.999.999 0 1 1 1.414 1.414L13.414 10l4.879 4.879a.999.999 0 1 1-1.414 1.414L12 11.414l-4.879 4.879a.999.999 0 1 1-1.414-1.414L10.586 10 5.707 5.121a.999.999 0 0 1 0-1.414 1 1 0 0 1 1.414 0L12 8.586l4.879-4.879a1 1 0 0 1 1.414 0 .999.999 0 0 1 0 1.414L13.414 10z" />
                </svg>
            </button>
        `;
        taskList.appendChild(li);
    });
}

taskForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const taskValue = taskInput.value.trim();//change to FormData
    if (taskValue !== "") {
        tasks.push(taskValue);
        renderTasks();
        taskInput.value = "";
    }
});

taskList.addEventListener("click", (event) => {
    if (event.target.classList.contains("delete-icon")) {
        const index = event.target.dataset.index;
        tasks.splice(index, 1);
        renderTasks();
    } else if (event.target.classList.contains("task-edit")) {
        const input = event.target;
        input.disabled = false;
        input.focus();
        input.addEventListener("blur", () => {
            const index = input.parentNode.querySelector(".delete-icon").dataset.index;
            const value = input.value.trim();
            if (value !== "") {
                tasks[index] = value;
                renderTasks();
            } else {
                input.value = tasks[index];
            }
            input.disabled = true;
        });
    }
});

sortButton.addEventListener("click", () => {
    tasks.reverse();
    renderTasks();
});