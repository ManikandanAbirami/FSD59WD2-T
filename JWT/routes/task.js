const express = require("express");
const {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
} = require("../controllers/task");
const protect = require("../middleware/auth");

const router = express.Router();

// Route to get all tasks
router.get("/", protect, getTasks);

// Route to create a new task
router.post("/", protect, createTask);

// Route to update an existing task
router.put("/:id", protect, updateTask);

// Route to delete an existing task
router.delete("/:id", protect, deleteTask);

module.exports = router;
