import { createSlice } from "@reduxjs/toolkit";

export const socketSlice = createSlice({
    name: "socket",
    initialState: {},
    reducers: {
        addSocket(state, action) {
            state = action.payload;
        },
        getSocket(state) {
            return state;
        }
    }
});


export const { addSocket, getSocket } = socketSlice.actions;

