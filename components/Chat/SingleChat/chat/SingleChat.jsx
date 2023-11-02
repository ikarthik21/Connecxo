'use client';

import { HomeComp } from "@components/Auth/Login";
import { addMessageF, getMessagesF } from '@utils/apis/messageApi';
import { getMessages, addMessages } from '@store/messagesSlice';
import { initVideo, initAudio, incomingCall, closeIncoming, endCall } from '@store/callSlice';
import { getISOTime } from "@components/Utils";
import { io } from 'socket.io-client';
import { useSession } from "next-auth/react";
import { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import ChatNav from "./ChatNav";
import InputBox from "./InputBox";
import Messages from "../messages/Messages";
import Audio from "../call/audio/Audio";
import Video from "../call/video/Video";
import CallNotify from './CallNotify';


const SingleChat = () => {

    const { data: session } = useSession();
    const dispatch = useDispatch();
    const user = useSelector(state => state.cmuser);
    const messages = useSelector(state => state.messages);
    const [message, setMessage] = useState("");
    const [showSearch, setShowSearch] = useState(false);
    const [files, setFiles] = useState([]);
    const socket = useRef();
    const calls = useSelector(state => state.calls);
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
            // dispatch(addSocket(socket.));
            socket.current.emit("add-user", session?.user.id);
        }
    }, [session?.user]);


    // socket message receive
    useEffect(() => {
        if (socket.current) {
            socket.current.on('msg-receive', (data) => {
                dispatch(addMessages(data));
            })

            socket.current.on('receive-call', (data) => {
                dispatch(incomingCall(data));
            })

            socket.current.on('close-call', () => {
                dispatch(endCall());
            })

            socket.current.on('close-incoming-call', () => {
                dispatch(closeIncoming())
            })

        }
    }, [socket.current]);


    const initVideoCall = () => {
        dispatch(initVideo());
    }

    const initAudioCall = () => {
        dispatch(initAudio());
        const audio = {
            from: session.user.id,
            to: user.id,
            type: "audio",
            user: session.user
        }
        socket.current.emit('init-call', audio);
    }

    const DenyCall = () => {
        const call = {
            to: calls.INCOMING_VIDEO_CALL.user.user.id
        }
        socket.current.emit('end-call', call);
        dispatch(endCall());
    }

    const cancelCall = () => {
        const userobj = {
            to: user.id,
        }
        socket.current.emit('cancel-call', userobj);
    }



    return (

        calls.VIDEO_CALL ? <Video /> : calls.AUDIO_CALL ? <Audio cancelCall={cancelCall} /> :

            <div className="flex flex-col flex-main-2 bg-[#111A30]  justify-between  rounded-r-lg">

                {calls.INCOMING_VIDEO_CALL.visible && <CallNotify DenyCall={DenyCall} />}

                {

                    user.id ?
                        <div className="flex flex-col justify-between  h-[96vh] ">


                            <ChatNav user={user} setShowSearch={setShowSearch} initVideoCall={initVideoCall} initAudioCall={initAudioCall} />

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
