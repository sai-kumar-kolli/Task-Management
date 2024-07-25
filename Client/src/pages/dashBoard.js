import React from "react";
import { Container } from "@mui/material";
import TaskForm from "../features/tasks/taskForm/taskForm";
import TaskList from "../features/tasks/taskList/taskList";


const Dashboard = () => {

    return (
        <>
            <Container>
                <TaskForm />
                <TaskList />
            </Container>
        </>
    )
}
export default Dashboard