const express = require('express')
const { getTasks, createTask, deleteTask, updateTask } = require('./taskController/controller.js')


const router = express.Router()

console.log("imside router")

// CRUD routes
router.get('/tasks', getTasks);
router.post('/tasks', createTask);
router.put('/tasks/:id', updateTask);
router.delete('/tasks/:id', deleteTask);

module.exports = router;