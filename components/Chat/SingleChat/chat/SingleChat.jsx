'use client';

import { HomeComp } from "@components/Auth/Login";
import { addMessageF, getMessagesF } from '@utils/apis/messageApi';
import { getMessages, addMessages } from '@store/messagesSlice';
import { getISOTime } from "@components/Utils";
import { io } from 'socket.io-client';
import { useSession } from "next-auth/react";
import { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import ChatNav from "./ChatNav";
import InputBox from "./InputBox";
import Messages from "../messages/Messages";

const SingleChat = () => {

    const { data: session } = useSession();
    const dispatch = useDispatch();
    const user = useSelector(state => state.cmuser);
    const messages = useSelector(state => state.messages);
    const [message, setMessage] = useState("");
    const [showSearch, setShowSearch] = useState(false);
    const [files, setFiles] = useState([]);
    const socket = useRef();

    // Function for sending messages 
    const sendMessage = async (message, messtype) => {
        if (message === "") return;

        const mess = {
            message: message,
            from: session.user.id,
            to: user.id,
            type: messtype
        }

        const sendData = {
            senderId: mess.from,
            receiverId: mess.to,
            type: messtype,
            message: mess.message,
            messageStatus: "delivered",
            createdAt: getISOTime()
        }

        socket.current.emit('send-msg', mess);
        setMessage("");
        setFiles([]);
        await addMessageF(mess);
        dispatch(addMessages(sendData));
    }

    // Messages Fetching
    useEffect(() => {
        const fetchMessages = async () => {
            if (session.user.id && user.id) {
                const res = await getMessagesF(session.user.id, user.id);
                dispatch(getMessages(res.messages));
            }
        }
        fetchMessages();
    }, [user]);


    // connecting user with socket
    useEffect(() => {
        if (session?.user) {
            socket.current = io(process.env.NEXT_PUBLIC_BACKEND_URL);
            socket.current.emit("add-user", session?.user.id);
        }
    }, [session?.user]);


    // socket message receive
    useEffect(() => {
        if (socket.current) {
            socket.current.on('msg-receive', (data) => {
                dispatch(addMessages(data));
            })

        }
    }, [socket.current]);


    return (
        <div className="flex flex-col flex-main-2 bg-[#111A30]  justify-between  rounded-r-lg" >
            {
                user.id ?
                    <div className="flex flex-col justify-between  h-[96vh] ">

                        <ChatNav user={user} setShowSearch={setShowSearch} />

                        <Messages messages={messages} userId={session.user.id} showSearch={showSearch} setShowSearch={setShowSearch} />

                        <InputBox setMessage={setMessage} files={files} setFiles={setFiles} message={message} sendMessage={sendMessage} />

                    </div>
                    :

                    <HomeComp />
            }
        </div>
    );
}

export default SingleChat;
