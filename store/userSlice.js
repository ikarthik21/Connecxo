import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({

    name: 'user',
    initialState: {

    },
    reducers: {
        adduser(state, action) {
            return state = action.payload;
        }
    }



});

export const { adduser } = userSlice.actions;
