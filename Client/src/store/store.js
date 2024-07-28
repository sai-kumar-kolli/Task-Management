import { configureStore } from '@reduxjs/toolkit';
import tasksReducer from '../features/tasks/taskSlice';
import authReducer from '../auth/authSlice';

const store = configureStore({
  reducer: {
    tasks: tasksReducer,
    auth: authReducer
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
