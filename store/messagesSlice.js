import { createSlice } from "@reduxjs/toolkit";

export const messagesSlice = createSlice({
    name: "messages",
    initialState: [],
    reducers: {
        getMessages(state, action) {
            return state = action.payload;
        },
        addMessages(state, action) {
            return state = [...state, action.payload];
        }

    }
});


export const { getMessages, addMessages } = messagesSlice.actions;

