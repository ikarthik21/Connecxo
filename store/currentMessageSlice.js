import { createSlice } from "@reduxjs/toolkit";

export const currentMessageSlice = createSlice({
    name: "cmuser",
    initialState: {},
    reducers: {
        currentMessageUser(state, action) {
            return state = action.payload;
        }
    }
});


export const { currentMessageUser } = currentMessageSlice.actions;

