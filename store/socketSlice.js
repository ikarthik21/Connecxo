import { createSlice } from "@reduxjs/toolkit";


export const socketSlice = createSlice({
    name: "socket",
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
    initialState: {},
    reducers: {
        addSocket(state, action) {
            state = action.payload;
        }
    }
});

export const { addSocket } = socketSlice.actions;

