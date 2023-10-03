import axios from "axios";

const B_URL = process.env.NEXT_PUBLIC_BACKEND_URL;



export const getAllusersF = async () => {
    try {
        const res = await axios.get(`${B_URL}/user/all`)
        return res.data;
    }
    catch (error) {
        console.log(error);
    }
}


export const getProfileF = async (id) => {
    try {
        const res = await axios.get(`${B_URL}/user/profile/${id}`)
        return res.data;
    }
    catch (error) {
        console.log(error);
    }
}

export const updateProfileF = async (user) => {
    try {
        const res = await axios.patch(`${B_URL}/user/profile/update`, user)
        return res.data;
    }
    catch (error) {
        console.log(error);
    }
}