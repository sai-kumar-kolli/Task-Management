import React, { useState } from "react";
import { Container } from "@mui/material";
import TaskForm from "../features/tasks/taskForm/taskForm";
import TaskList from "../features/tasks/taskList/taskList";
import { Button, Typography, Grid, Paper, Box } from '@mui/material';
import './dashboard.css';


const Dashboard = () => {

    const [editableTask, setEditableTask] = useState({})


    return (
        <>
            <Container>
                {true ?
                    <>
                        <TaskForm editableTask={editableTask} setEditableTask={setEditableTask}/>
                        <TaskList setEditableTask={setEditableTask} />
                    </>
                    : <div>
                        <section className="about">
                            <Container>
                                <Typography variant="h4" gutterBottom align='center'>About Us</Typography>
                                <Typography variant="body1" align='center'>
                                    Task Manager is designed to help you stay organized and manage your day-to-day tasks. Whether you're a student, professional, or entrepreneur, our tool can help you achieve your goals.
                                </Typography>
                            </Container>
                        </section>

                        <section className="features">
                            <Container>
                                <Typography variant="h4" gutterBottom align='center'>Features</Typography>
                                <Grid container spacing={4}>
                                    <Grid item xs={12} md={4}>
                                        <Paper className="feature-card">
                                            <Typography variant="h6">Easy Task Management</Typography>
                                            <Typography>Quickly add, edit, and delete tasks.</Typography>
                                        </Paper>
                                    </Grid>
                                    <Grid item xs={12} md={4}>
                                        <Paper className="feature-card">
                                            <Typography variant="h6">Collaboration</Typography>
                                            <Typography>Share tasks with team members and collaborate seamlessly.</Typography>
                                        </Paper>
                                    </Grid>
                                    <Grid item xs={12} md={4}>
                                        <Paper className="feature-card">
                                            <Typography variant="h6">Reminders</Typography>
                                            <Typography>Set reminders to never miss a deadline.</Typography>
                                        </Paper>
                                    </Grid>
                                </Grid>
                            </Container>
                        </section>

                        <section className="testimonials">
                            <Container>
                                <Typography variant="h4" gutterBottom align='center'>Testimonials</Typography>
                                <Grid container spacing={4}>
                                    <Grid item xs={12} md={4}>
                                        <Paper className="testimonial-card">
                                            <Typography variant="h6">John Doe</Typography>
                                            <Typography>"Task Manager has significantly improved my productivity!"</Typography>
                                        </Paper>
                                    </Grid>
                                    <Grid item xs={12} md={4}>
                                        <Paper className="testimonial-card">
                                            <Typography variant="h6">Jane Smith</Typography>
                                            <Typography>"The collaboration features are fantastic for team projects."</Typography>
                                        </Paper>
                                    </Grid>
                                    <Grid item xs={12} md={4}>
                                        <Paper className="testimonial-card">
                                            <Typography variant="h6">Mark Wilson</Typography>
                                            <Typography>"I love the reminder feature. It keeps me on track."</Typography>
                                        </Paper>
                                    </Grid>
                                </Grid>
                            </Container>
                        </section>

                        <section className="cta">
                            <Container>
                                <Typography variant="h4" gutterBottom align='center'>Get Started Today</Typography>
                                <Box textAlign='center'>
                                    <Button variant="contained" color="primary" size="large">
                                        Sign Up Now
                                    </Button>
                                </Box>
                            </Container>
                        </section>

                        <footer className="footer">
                            <Typography variant="body1">© 2023 Task Manager. All rights reserved.</Typography>
                        </footer>
                    </div>}
            </Container>
        </>
    )
}
export default Dashboard