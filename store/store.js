import { configureStore } from "@reduxjs/toolkit";
import { userSlice } from "./userSlice";
import { currentMessageSlice } from "./currentMessageSlice";
import { messagesSlice } from "./messagesSlice";

const store = configureStore({
    reducer: {
        users: userSlice.reducer,
        cmuser: currentMessageSlice.reducer,
        messages: messagesSlice.reducer
    }
})


export default store;
