import axios from "axios";

const B_URL = process.env.NEXT_PUBLIC_BACKEND_URL;


export const addMessageF = async (message) => {
    try {
        const res = await axios.post(`${B_URL}/api/message/add-message`, message)
        return res.data;
    }
    catch (error) {
        console.log(error);
    }
}

export const getMessagesF = async (from, to) => {
    try {
        const res = await axios.get(`${B_URL}/api/message/get-messages/${from}/${to}`);
        return res.data;    }
    catch (error) {
        console.log(error);
    }
}
