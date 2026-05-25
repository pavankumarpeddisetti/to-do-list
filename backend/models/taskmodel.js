const db = require("../db");

// 🔹 Get all tasks
exports.getAllTasks = (callback) => {
    const sql = "SELECT * FROM tasks";
    db.query(sql, callback);
};

// 🔹 Add new task
exports.addTask = (name, description, callback) => {
    const sql = "INSERT INTO tasks (name, description, status) VALUES (?, ?, ?)";
    db.query(sql, [name, description, "pending"], callback);
};

// 🔹 Update task status
exports.updateTask = (id, status, callback) => {
    const sql = "UPDATE tasks SET status = ? WHERE id = ?";
    db.query(sql, [status, id], callback);
};

// 🔹 Delete task
exports.deleteTask = (id, callback) => {
    const sql = "DELETE FROM tasks WHERE id = ?";
    db.query(sql, [id], callback);
};