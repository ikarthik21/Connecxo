'use client';
import SingleChat from "./SingleChat/SingleChat";
import ChatMenu from './Navigations/ChatMenu';

const ChatHome = () => {
    return (
        <div className="flex h-screen">
            <ChatMenu />
            <SingleChat />
        </div>
    )
}

export default ChatHome