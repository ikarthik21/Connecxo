'use client';

import SingleChat from "./Chat/SingleChat/SingleChat";
import ChatMenu from './Chat/ChatMenu';


const ChatHome = () => {
    return (
        <div className="flex h-screen">
            <ChatMenu />
            <SingleChat />
        </div>
    )
}

export default ChatHome