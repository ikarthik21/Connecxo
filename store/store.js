import { configureStore } from "@reduxjs/toolkit";
import { userSlice } from "./userSlice";
import { currentMessageSlice } from "./currentMessageSlice";

const store = configureStore({
    reducer: {
        users: userSlice.reducer,
        cmuser: currentMessageSlice.reducer
    }
})


export default store;
