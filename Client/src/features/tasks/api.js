import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const getTasks = createAsyncThunk('Tasks/getTasks', async (payload, thunkapi) => {
    console.log(thunkapi.getState())
    try {
        const data = await fetch('api/tasks', {
            headers: {
                'X-CSRF-Token': thunkapi.getState().auth.csrfToken
            }
        })
        const results = await data.json();
        return results
    } catch (err) {
        return thunkapi.rejectWithValue(err.message);
    }

})

export const addTasks = createAsyncThunk('Tasks/addTask', async (payload, thunkAPI) => {
    const state = thunkAPI.getState();
    const csrfToken = state.auth.csrfToken;
    try {
        const response = await fetch('api/tasks', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-Token': csrfToken,
            },
            body: JSON.stringify(payload),
            credentials: 'include'
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const results = await response.json();
        toast.success('Task added successfully!');
        thunkAPI.dispatch(getTasks());
        return results;
    } catch (err) {
        toast.error(err.message);
        return thunkAPI.rejectWithValue(err.message);
    }
});


export const updatedTask = createAsyncThunk('Task/updatedTask', async (payload, thunkapi) => {
    try {
        const response = await fetch(`api/tasks/${payload.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-Token': thunkapi.getState().auth.csrfToken
            },
            credentials: 'include',
            body: JSON.stringify(payload),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result = await response.json();
        thunkapi.dispatch(getTasks());
        toast.success('Task updated successfully!');
        return result;
    } catch (err) {
        toast.error('Failed to update task!');
        return thunkapi.rejectWithValue(err.message);
    }
})


export const deleteTask = createAsyncThunk('Task/deleteTask', async (payload, thunkapi) => {
    console.log(payload);
    try {
        const url = `api/tasks/${payload}`;
        const response = await fetch(url, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-Token': thunkapi.getState().auth.csrfToken
            },
            credentials: 'include'
        });

        if (!response.ok) {
            // If the response status is not OK (status 200), throw an error
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        toast.success("deleted successfully")
        thunkapi.dispatch(getTasks())
        const results = await response.json();
        return results;
    } catch (err) {
        toast.error("failed")
        return thunkapi.rejectWithValue(err.message);
    }

})

export default getTasks;