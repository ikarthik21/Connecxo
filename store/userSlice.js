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
        const res = await axios.get(process.env.NEXT_PUBLIC_BACKEND_URL + '/user/all');
        const dict = {};

        res.data.forEach((user) => {
            const fl = user.display_name[0].toUpperCase();
            dict[fl] = (dict[fl] || []).concat(user);
        });

        const sortedDict = Object.fromEntries(
            Object.entries(dict).sort((a, b) => a[0].localeCompare(b[0]))
        );

        dispatch(fetchContacts(sortedDict));
    }
}
