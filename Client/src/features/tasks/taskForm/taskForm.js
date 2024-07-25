import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTask } from '../taskSlice';
import { Button, TextField, Card, CardContent, CardActions, Typography, Grid } from '@mui/material';
import './taskForm.css';

const TaskForm = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(addTask({ id: Date.now(), title, description }));
        setTitle('');
        setDescription('');
    };

    return (
        <Card className="task-form-card">
            <CardContent>
                <Typography variant="h5" component="div" gutterBottom>
                    Create New Task
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
                            />
                        </Grid>
                    </Grid>
                    <CardActions className="task-form-actions">
                        <Button
                            variant="contained"
                            color="primary"
                            type="submit"
                        >
                            Add Task
                        </Button>
                    </CardActions>
                </form>
            </CardContent>
        </Card>
    );
};

export default TaskForm;
