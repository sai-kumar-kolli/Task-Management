import { createSlice } from '@reduxjs/toolkit';
import getTasks, { deleteTask, addTasks } from './api';

const initialState = {
    tasks: [],
    isDeleted: false,
    message: '',
    CSRFtoken:""
};

const tasksSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        removeTask: (state, action) => {
            state.tasks = state.tasks.filter(task => task.id !== action.payload);
        },
        addCsrfToken: (state, action) => {
            state.CSRFtoken = action.payload
        }
    },
    extraReducers: builder => {
        builder.addCase(getTasks.fulfilled, (state, { payload }) => {
            state.tasks = payload;
        })
        builder.addCase(deleteTask.pending, (state, { payload }) => {
            state.isDeleted = false;
            state.message = ""
        })
        builder.addCase(deleteTask.fulfilled, (state, { payload }) => {
            state.isDeleted = true;
            state.message = payload
        })
        builder.addCase(addTasks.fulfilled, (state, { payload }) => {
            state.isadded = true;
            state.message = payload
        })
    }


});

export const { removeTask ,addCsrfToken} = tasksSlice.actions;
export default tasksSlice.reducer;
