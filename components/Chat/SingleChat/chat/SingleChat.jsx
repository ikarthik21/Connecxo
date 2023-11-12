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
import { generateTokenF } from '@utils/apis/authApi';
import { ZegoExpressEngine } from 'zego-express-engine-webrtc';


const SingleChat = () => {

    const dispatch = useDispatch();
    const { data: session } = useSession();
    const user = useSelector(state => state.cmuser);
    const messages = useSelector(state => state.messages);
    const [message, setMessage] = useState("");
    const [showSearch, setShowSearch] = useState(false);
    const [files, setFiles] = useState([]);
    const socket = useRef(null);
    const [socketEvent, setSocketEvent] = useState(false);

    const calls = useSelector(state => state.calls);
    const [localStream, setLocalStream] = useState(undefined);
    const [publishStream, setPublishStream] = useState(undefined);
    const [callAccept, setCallAccept] = useState(false);
    const [token, setToken] = useState(undefined);                // zego token
    const [zegoinstance, setZegoInstance] = useState(undefined); // zego instance


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
        if (user) {
            const fetchMessages = async () => {
                if (session.user.id && user.id) {
                    const res = await getMessagesF(session.user.id, user.id);
                    dispatch(getMessages(res.messages));
                }
            }
            fetchMessages();
        }

    }, [user]);


    // connecting user with socket
    useEffect(() => {
        if (session.user) {
            socket.current = io(process.env.NEXT_PUBLIC_BACKEND_URL);
            socket.current.emit("add-user", session?.user.id);
        }
    }, [session.user]);


    // socket message && call receive
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

            setSocketEvent(true);
        }
    }, [socket.current]);



    useEffect(() => {
        if (callAccept) {
            (async () => {
                const res = await generateTokenF(user.id);
                setToken(res.token);
            }
            )();
        }
    }, [callAccept])


    useEffect(() => {
        if (token) {
            (
                async () => {
                    const zg = new ZegoExpressEngine(parseInt(process.env.NEXT_PUBLIC_ZEGO_APP_ID), process.env.NEXT_PUBLIC_ZEGO_SERVER_SECRET);

                    setZegoInstance(zg);

                    zg.on("roomStreamUpdate", async (roomId, updateType, streamList, extendedData) => {

                        if (updateType === "ADD") {
                            const rmVideo = document.getElementById("remote-video");
                            const vd = document.createElement(calls.INCOMING_VIDEO_CALL.visible ? "video" : "audio");
                            vd.id = streamList[0].streamID;
                            vd.autoplay = true;
                            vd.playsInline = true;
                            vd.muted = false;
                            if (rmVideo) {
                                rmVideo.appendChild(vd);
                            }
                            zg.startPlayingStream(streamList[0].streamID, {
                                audio: true,
                                video: true
                            }).then(stream => vd.srcObject = stream)
                        }
                        else if (updateType === "DELETE" && zg && localStream && streamList[0].streamID) {
                            zg.destroyStream(localStream);
                            zg.stopPublishingStream(streamList[0].streamID);
                            zg.logoutRoom(calls.INCOMING_VIDEO_CALL.user.roomId);
                            dispatch(endCall());
                        }
                    }
                    )

                    await zg.loginRoom(calls.INCOMING_VIDEO_CALL.user.roomId, token, { userID: calls.INCOMING_VIDEO_CALL.user.user.id, userName: calls.INCOMING_VIDEO_CALL.user.user.name }, { userUpdate: true });

                    const localStream = zg.createStream({
                        camera: true,
                        video: true

                    });

                    const localVideo = document.getElementById("local-video");
                    const videoele = document.createElement(calls.VIDEO_CALL ? "video" : "audio");
                    videoele.id = "video-local-zego";
                    videoele.className = "h-28 w-32";
                    videoele.autoplay = true;
                    videoele.playsInline = true;
                    videoele.muted = false;
                    if (localVideo) {
                        localVideo.appendChild(videoele);
                    }
                    const td = document.getElementById("video-local-zego");
                    td.srcObject = localStream;
                    const streamId = "123" + Date.now().toString();
                    setPublishStream(streamId);
                    setLocalStream(localStream);
                    zg.startPublishingStream(streamId, localStream);
                }
            )();
        }
    }, [token])





    const initVideoCall = () => {

        dispatch(initVideo());

        const video = {
            from: session.user.id,
            to: user.id,
            type: "video",
            user: session.user,
            roomId: Date.now().toString()
        }

        socket.current.emit('init-call', video);
    }

    const initAudioCall = () => {
        dispatch(initAudio());
        const audio = {
            from: session.user.id,
            to: user.id,
            type: "audio",
            user: session.user,
            roomId: Date.now().toString()
        }
        socket.current.emit('init-call', audio);
    }



    const DenyCall = () => {

        let call = {};
        if (calls.INCOMING_VIDEO_CALL.visible) {
            call = {
                to: calls.INCOMING_VIDEO_CALL.user.user.id
            }
        }

        if (calls.INCOMING_AUDIO_CALL.visible) {
            call = {
                to: calls.INCOMING_AUDIO_CALL.user.user.id
            }
        }

        if (zegoinstance && localStream && publishStream) {
            zegoinstance.destroyStream(localStream);
            zegoinstance.stopPublishingStream(publishStream);
            zegoinstance.logoutRoom(calls.INCOMING_VIDEO_CALL.user.roomId);
        }

        socket.current.emit('end-call', call);
        dispatch(endCall());
    }

    const cancelCall = () => {

        if (zegoinstance && localStream && publishStream) {
            zegoinstance.destroyStream(localStream);
            zegoinstance.stopPublishingStream(publishStream);
            zegoinstance.logoutRoom(calls.INCOMING_VIDEO_CALL.user.roomId);
        }

        socket.current.emit('cancel-call', { to: user.id });
    }



    return (

        calls.VIDEO_CALL ? <Video cancelCall={cancelCall} /> : calls.AUDIO_CALL ? <Audio cancelCall={cancelCall} /> :

            <div className="flex flex-col flex-main-2 bg-[#111A30]  justify-between  rounded-r-lg">

                {(calls.INCOMING_VIDEO_CALL.visible || calls.INCOMING_AUDIO_CALL.visible) && <CallNotify setCallAccept={setCallAccept} DenyCall={DenyCall} />}

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
