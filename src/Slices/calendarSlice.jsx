// calendarSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    events: [],
};

const calendarSlice = createSlice({
    name: 'calendar',
    initialState,
    reducers: {
        addEvent: (state, action) => {
            state.events.push(action.payload);
        },
    },
});

export const { addEvent } = calendarSlice.actions;
export default calendarSlice.reducer;
