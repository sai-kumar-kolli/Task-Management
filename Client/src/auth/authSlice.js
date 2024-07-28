import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Async thunk to fetch CSRF token
export const fetchCsrfToken = createAsyncThunk('auth/fetchCsrfToken', async (_, { rejectWithValue }) => {
    try {
        const response = await fetch('http://localhost:3001/api/csrf-token', {
            credentials: 'include',
        });
        const data = await response.json();
        console.log("kjhjkfhdsjfhjd")
        return data.csrfToken
    } catch (error) {
        console.error('Failed to fetch CSRF token:', error);
    }

});

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        csrfToken: '',
        status: 'idle',
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCsrfToken.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchCsrfToken.fulfilled, (state, action) => {
                console.log(action)
                state.csrfToken = action.payload;
                state.status = 'succeeded';
            })
            .addCase(fetchCsrfToken.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            });
    },
});

export default authSlice.reducer;
