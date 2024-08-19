import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button, TextField, Card, CardContent, CardActions, Typography, Grid } from '@mui/material';
import { MenuItem, Select, InputLabel, FormControl } from '@mui/material'; // Use only one library
import DOMPurify from 'dompurify';
import { v4 as uuid } from 'uuid';
import { addTasks, updatedTask } from '../api'; // Assuming `addTasks` and `updatedTask` are defined in the `api` file

const TaskForm = (props) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState('');
    const [errors, setErrors] = useState({});
    const dispatch = useDispatch();

    useEffect(() => {
        if (props.editableTask) {
            setTitle(props.editableTask.title || '');
            setDescription(props.editableTask.description || '');
            setStatus(props.editableTask.status || '');
        }
    }, [props.editableTask]);

    const validate = () => {
        const newErrors = {};
        if (!title.trim()) newErrors.title = 'Title is required';
        if (!description.trim()) newErrors.description = 'Description is required';
        if (!status) newErrors.status = 'Status is required';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validate()) return;

        // Sanitize inputs
        const sanitizedTitle = DOMPurify.sanitize(title.trim());
        const sanitizedDescription = DOMPurify.sanitize(description.trim());
        const sanitizedStatus = DOMPurify.sanitize(status.trim());

        if (props.editableTask.id) {
            dispatch(updatedTask({
                title: sanitizedTitle,
                description: sanitizedDescription,
                id: props.editableTask.id,
                status: sanitizedStatus
            }));
            props.setEditableTask({});
        } else {
            dispatch(addTasks({
                title: sanitizedTitle,
                description: sanitizedDescription,
                id: uuid(),
                status: sanitizedStatus
            }));
        }

        setTitle('');
        setDescription('');
        setStatus('');
    };

    return (
        <Card className="task-form-card">
            <CardContent>
                <Typography variant="h5" component="div" gutterBottom>
                    {props.editableTask.id ? 'Edit Task' : 'Create New Task'}
                </Typography>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                label="Task Title"
                                variant="outlined"
                                fullWidth
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                error={!!errors.title}
                                helperText={errors.title}
                                required
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Description"
                                variant="outlined"
                                fullWidth
                                multiline
                                rows={4}
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                error={!!errors.description}
                                helperText={errors.description}
                                required
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl variant="outlined" fullWidth error={!!errors.status} required>
                                <InputLabel>Status</InputLabel>
                                <Select
                                    value={status}
                                    onChange={(e) => setStatus(e.target.value)}
                                    label="Status"
                                >
                                    <MenuItem value="Pending">Pending</MenuItem>
                                    <MenuItem value="In Progress">In Progress</MenuItem>
                                    <MenuItem value="Completed">Completed</MenuItem>
                                </Select>
                                {errors.status && <Typography color="error" variant="caption">{errors.status}</Typography>}
                            </FormControl>
                        </Grid>
                    </Grid>
                    <CardActions className="task-form-actions">
                        <Button
                            variant="contained"
                            color="primary"
                            type="submit"
                        >
                            {props.editableTask.id ? 'Update Task' : 'Add Task'}
                        </Button>
                    </CardActions>
                </form>
            </CardContent>
        </Card>
    );
};

export default TaskForm;
