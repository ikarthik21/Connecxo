'use client';

import SingleChat from "./SingleChat/chat/SingleChat";
import ChatMenu from './Navigations/ChatMenu';

const ChatHome = () => {
    return (
        <div className="flex h-screen justify-center">
            <ChatMenu />
            <SingleChat />
        </div>
    )
}

export default ChatHome