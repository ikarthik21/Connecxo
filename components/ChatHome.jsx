'use client';

import SingleChat from "./Chat/SingleChat";
import ChatMenu from './Chat/ChatMenu';
import Profile from "./User/Profile";

const ChatHome = () => {

    return (
        <div className="flex h-screen ">
            <ChatMenu />
            <SingleChat />

        </div>
    )
}

export default ChatHome