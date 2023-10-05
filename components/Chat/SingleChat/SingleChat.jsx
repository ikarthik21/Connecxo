'use client';

import ChatNav from "./ChatNav";
import InputBox from "./InputBox";
import { useSelector, useDispatch } from 'react-redux'
import { HomeComp } from "@components/Login";
import { useEffect, useRef, useState } from "react";
import { useSession } from "next-auth/react";
import { addMessageF, getMessagesF } from '@utils/apis/messageApi';
import { getMessages, addMessages } from '@store/messagesSlice';
import Messages from "./Messages";
import { io } from 'socket.io-client';

const SingleChat = () => {

    const { data: session } = useSession();
    const dispatch = useDispatch();

    const user = useSelector(state => state.cmuser)
    const messages = useSelector(state => state.messages)
    const [message, setMessage] = useState("");
    const [socketEvent, setSocketEvent] = useState(false);
    const socket = useRef();




    const sendMessage = async () => {

        if (message === "") {
            return;
        }

        const mess = {
            message: message,
            from: session.user.id,
            to: user.id
        }

        const now = new Date();
        const formattedDate = now.toISOString();
        const sendData = {
            senderId: mess.from,
            receiverId: mess.to,
            type: "text",
            message: mess.message,
            messageStatus: "delivered",
            createdAt: formattedDate
        }

        socket.current.emit('send-msg', mess);
        setMessage("");
        await addMessageF(mess);
        dispatch(addMessages(sendData));





    }

    useEffect(() => {
        if (session?.user) {
            socket.current = io(process.env.NEXT_PUBLIC_BACKEND_URL);
            socket.current.emit("add-user", session?.user.id);
        }
    }, [session?.user])



    useEffect(() => {
        if (socket.current) {
            socket.current.on('msg-receive', (data) => {
                dispatch(addMessages(data));
            })
            setSocketEvent(true);
        }


    }, [socket.current])







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