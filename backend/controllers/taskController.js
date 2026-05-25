const db = require("../db");

// 🔹 Get all tasks
exports.getAllTasks = (req, res) => {
    const sql = "SELECT * FROM tasks";

    db.query(sql, (err, results) => {
        if (err) {
            console.log("Error fetching tasks:", err);
            return res.status(500).json({ error: "Database error" });
        }

        res.json(results);
    });
};

// 🔹 Add new task
exports.addTask = (req, res) => {
    const { name, description } = req.body;

    if (!name || !description) {
        return res.status(400).json({ message: "Name and description required" });
    }

    const sql = "INSERT INTO tasks (name, description, status) VALUES (?, ?, ?)";

    db.query(sql, [name, description, "pending"], (err, result) => {
        if (err) {
            console.log("Error adding task:", err);
            return res.status(500).json({ error: "Database error" });
        }

        res.json({
            message: "Task added successfully",
            taskId: result.insertId
        });
    });
};

// 🔹 Update task status (complete / pending)
exports.updateTask = (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    const sql = "UPDATE tasks SET status = ? WHERE id = ?";

    db.query(sql, [status, id], (err, result) => {
        if (err) {
            console.log("Error updating task:", err);
            return res.status(500).json({ error: "Database error" });
        }

        res.json({ message: "Task updated successfully" });
    });
};

// 🔹 Delete task
exports.deleteTask = (req, res) => {
    const { id } = req.params;

    const sql = "DELETE FROM tasks WHERE id = ?";

    db.query(sql, [id], (err, result) => {
        if (err) {
            console.log("Error deleting task:", err);
            return res.status(500).json({ error: "Database error" });
        }

        res.json({ message: "Task deleted successfully" });
    });
};