import { configureStore } from "@reduxjs/toolkit";
import { userSlice } from "./userSlice";
import { currentMessageSlice } from "./currentMessageSlice";
import { messagesSlice } from "./messagesSlice";
import { socketSlice } from "./socketSlice";
import { onlineUserSlice } from './onlineUsers';
import { callSlice } from './callSlice';



const store = configureStore({
    reducer: {
        users: userSlice.reducer,
        cmuser: currentMessageSlice.reducer,
        messages: messagesSlice.reducer,
        socket: socketSlice.reducer,
        onlineusers: onlineUserSlice.reducer,
        calls: callSlice.reducer
    }
})


export default store;
