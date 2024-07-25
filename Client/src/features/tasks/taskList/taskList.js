import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeTask } from '../taskSlice';
import { Card, CardContent, Typography, Grid, CardActions, Button } from '@mui/material';
import './taskList.css';

const TaskList = () => {
    const tasks = useSelector((state) => state.tasks.tasks);
    const dispatch = useDispatch();

    return (
        <div className="task-list">
            <Typography variant="h5" component="h2" gutterBottom>
                Task List
            </Typography>
            <Grid container spacing={3}>
                {tasks.map((task) => (
                    <Grid item xs={12} md={6} key={task.id}>
                        <Card className="task-list-card">
                            <CardContent>
                                <Typography variant="h6" component="div">
                                    {task.title}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {task.description}
                                </Typography>
                            </CardContent>
                            <CardActions className="task-list-actions">
                                <Button size="small" color="primary">Edit</Button>
                                <Button size="small" color="secondary" onClick={() => dispatch(removeTask(task.id))}>Delete</Button>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </div>
    );
};

export default TaskList;
