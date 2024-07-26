// models/Task.js
const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
        unique: true // Ensure the ID is unique
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ['Pending', 'In Progress', 'Completed'],
        default: 'Pending',
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Task', TaskSchema);
