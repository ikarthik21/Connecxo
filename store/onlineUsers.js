import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    data: [],
};

export const onlineUserSlice = createSlice({
    name: "onlineusers",
    initialState: initialState,
    reducers: {
        onlineUsers(state, action) {
            state.data = action.payload;
        },
    }
});

export const { onlineUsers } = onlineUserSlice.actions;

