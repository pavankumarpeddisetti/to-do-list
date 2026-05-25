const express = require("express");
const cors = require("cors");
const db = require("./db");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

// 🔹 GET all tasks
app.get("/tasks", (req, res) => {
    const sql = "SELECT * FROM tasks";

    db.query(sql, (err, results) => {
        if (err) {
            return res.status(500).json(err);
        }
        res.json(results);
    });
});

// 🔹 ADD task
app.post("/tasks", (req, res) => {
    const { name, description } = req.body;

    const sql = "INSERT INTO tasks (name, description, status) VALUES (?, ?, ?)";

    db.query(sql, [name, description, "pending"], (err, result) => {
        if (err) {
            return res.status(500).json(err);
        }
        res.json({ message: "Task added successfully", id: result.insertId });
    });
});

// 🔹 UPDATE task status (complete / pending)
app.put("/tasks/:id", (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    const sql = "UPDATE tasks SET status = ? WHERE id = ?";

    db.query(sql, [status, id], (err, result) => {
        if (err) {
            return res.status(500).json(err);
        }
        res.json({ message: "Task updated successfully" });
    });
});

// 🔹 DELETE task
app.delete("/tasks/:id", (req, res) => {
    const { id } = req.params;

    const sql = "DELETE FROM tasks WHERE id = ?";

    db.query(sql, [id], (err, result) => {
        if (err) {
            return res.status(500).json(err);
        }
        res.json({ message: "Task deleted successfully" });
    });
});

// 🔹 Start server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
const taskRoutes = require("./routes/taskRoutes");

app.use("/tasks", taskRoutes);