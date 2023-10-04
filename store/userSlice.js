import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";


const initialState = {
    data: [],
};

export const userSlice = createSlice({
    name: "users",
    initialState: initialState,
    reducers: {
        fetchContacts(state, action) {
            state.data = action.payload;
        }
    }
});


export const { fetchContacts } = userSlice.actions;


export function getContacts() {
    return async function (dispatch) {
        const res = await axios.get('http://localhost:3100/user/all');
        let dict = {};
      
        res.data.forEach(user => {
            const fl = (user.display_name).charAt(0).toUpperCase();
            if (!dict[fl]) {
                dict[fl] = [];
            } dict[fl].push(user);
        });
     
        dispatch(fetchContacts(dict));
    }
}
