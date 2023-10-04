'use client';

import ChatNav from "./ChatNav";
import InputBox from "./InputBox";
import { useSelector, useDispatch } from 'react-redux'
import { HomeComp } from "@components/Login";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { addMessageF, getMessagesF } from '@utils/apis/messageApi';
import { getMessages } from '@store/messagesSlice';
import Messages from "./Messages";

const SingleChat = () => {

    const { data: session } = useSession();
    const dispatch = useDispatch();

    const user = useSelector(state => state.cmuser)
    const messages = useSelector(state => state.messages)
    const [message, setMessage] = useState("");

    const sendMessage = async () => {

        if (message === "") {
            return;
        }

        const mess = {
            message: message,
            from: session.user.id,
            to: user.id
        }
        setMessage("");

        await addMessageF(mess);


    }


    useEffect(() => {
        (async () => {
            if (session.user.id && user.id) {
                const res = await getMessagesF(session.user.id, user.id);
                dispatch(getMessages(res.messages));
            }
        }
        )();
    }, [user])


    return (
        <div className="flex flex-col flex-main-2 bg-[#111A30]  justify-between  rounded-r-lg" >
            {
                user.id ?
                    <div className="flex flex-col justify-between  h-[96vh] ">
                        <ChatNav user={user} />
                        <Messages messages={messages} userId={session.user.id} />
                        <InputBox setMessage={setMessage} message={message} sendMessage={sendMessage}
                        />
                    </div>
                    :
                    <HomeComp />
            }

        </div>



    )
}

export default SingleChat