const taskForm = document.getElementById("taskForm");
const taskList = document.getElementById("taskList");

const API_URL = "http://localhost:5000/tasks";

// 🔹 Load all tasks when page opens
window.addEventListener("load", fetchTasks);

// 🔹 Add Task
taskForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById("taskName").value;
    const description = document.getElementById("taskDesc").value;

    const taskData = {
        name,
        description
    };

    await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(taskData)
    });

    taskForm.reset();
    fetchTasks();
});

// 🔹 Fetch Tasks from backend
async function fetchTasks() {
    const res = await fetch(API_URL);
    const tasks = await res.json();

    taskList.innerHTML = "";

    tasks.forEach(task => {
        renderTask(task);
    });
}

// 🔹 Render each task in UI
function renderTask(task) {
    const div = document.createElement("div");
    div.classList.add("task");

    div.innerHTML = `
        <div class="task-left">
            <input type="checkbox" ${task.status === "completed" ? "checked" : ""}>
            <div>
                <h3 class="${task.status === "completed" ? "completed" : ""}">${task.name}</h3>
                <p>${task.description}</p>
            </div>
        </div>

        <button class="delete-btn">Delete</button>
    `;

    // 🔹 Mark complete toggle
    const checkbox = div.querySelector("input");

    checkbox.addEventListener("change", async () => {
        await fetch(`${API_URL}/${task.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                status: checkbox.checked ? "completed" : "pending"
            })
        });

        fetchTasks();
    });

    // 🔹 Delete task
    const deleteBtn = div.querySelector(".delete-btn");

    deleteBtn.addEventListener("click", async () => {
        await fetch(`${API_URL}/${task.id}`, {
            method: "DELETE"
        });

        fetchTasks();
    });

    taskList.appendChild(div);
}