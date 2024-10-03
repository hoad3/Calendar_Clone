import { configureStore } from '@reduxjs/toolkit';
import calendarReducer from '../Slices/calendarSlice.jsx';

export const store = configureStore({
    reducer: {
        calendar: calendarReducer,
    },
});