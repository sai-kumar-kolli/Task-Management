const Task = require('../model/model');

const getTasks = async (req, res) => {
    console.log('get tasks')
    try {
        const tasks = await Task.find();
        res.json(tasks);
    } catch (err) {
        console.log(err);
        res.status(500).send('Server Error');
    }
};

const createTask = async (req, res) => {
    console.log(req.body, "======> im called")
    const { id, title, description } = req.body;
    try {
        const newTask = new Task({ id, title, description });
        await newTask.save();
        res.json(newTask);
    } catch (err) {
        console.log(err);
        res.status(500).send('Server Error');
    }
};

const updateTask = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, status } = req.body;

        const updatedTask = await Task.findOneAndUpdate(
            { id: id }, // Use id instead of _id
            { title, description, status, updatedAt: Date.now() },
            { new: true, runValidators: true }
        );

        if (!updatedTask) {
            return res.status(404).json({ error: 'Task not found' });
        }

        res.json(updatedTask);
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: error.message });
    }
};

const deleteTask = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedTask = await Task.findOneAndDelete({ id: id });

        if (!deletedTask) {
            return res.status(404).json({ error: 'Task not found' });
        }

        res.json({ message: 'Task deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: error.message });
    }
};

module.exports = {
    getTasks: getTasks,
    createTask: createTask,
    deleteTask,
    updateTask
}



