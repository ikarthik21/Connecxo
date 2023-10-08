import axios from "axios";

const B_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export const SignInF = async (email, name) => {
    try {
        const res = await axios.post(`${B_URL}/api/auth/check-user`, { email, name })
        return res.data;
    }
    catch (error) {
        console.log(error);
    }
}

export const userIdF = async (email) => {
    try {
        const res = await axios.post(`${B_URL}/api/auth/userId`, { email: email })
        return res.data;
    }
    catch (error) {
        console.log(error);
    }
}