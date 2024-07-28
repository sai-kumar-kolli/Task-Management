import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Card, CardContent, Typography, Grid, CardActions, Button } from '@mui/material';
import './taskList.css';
import getTasks, { deleteTask } from '../api';

const TaskList = (props) => {
    const tasks = useSelector((state) => state.tasks.tasks);
    console.log(useSelector(state=> state.tasks))
    const dispatch = useDispatch();

    useEffect(() => {
        console.log('im called')
        dispatch(getTasks());
    }, [])

    const handleEdit = (task) => {
        props.setEditableTask(task)
    }


    return (
        <div className="task-list">
            <Typography variant="h5" component="h2" gutterBottom>
                Task List
            </Typography>
            <Grid container spacing={3}>
                {tasks?.length > 0 && tasks?.map((task) => (
                    <Grid item xs={12} md={6} key={task.id}>
                        <Card className="task-list-card">
                            <CardContent>
                                <Typography variant="h6" component="div">
                                    {task.title}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {task.description}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Status: {task.status}
                                </Typography>
                            </CardContent>
                            <CardActions className="task-list-actions">
                                <Button size="small" color="primary" onClick={() => handleEdit(task)}>
                                    Edit
                                </Button>
                                <Button size="small" color="secondary" onClick={() => dispatch(deleteTask(task.id))}>
                                    Delete
                                </Button>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </div>
    );
};

export default TaskList;
