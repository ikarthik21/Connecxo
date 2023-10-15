import { TiTick } from 'react-icons/ti';
import { BsCheckAll } from 'react-icons/bs';
import Image from 'next/image';
import { timeString } from '@components/Utils';
import { useRef, useEffect, useState } from 'react';
import ImagesModal from './ImagesModal';
const renderMessageContent = ({ message, userId, setImage, openModal }) => {

    const isCurrentUser = userId === message.senderId;

    const messageStatusIcon =
        isCurrentUser && message.messageStatus === 'sent' ? (
            <TiTick size={18} className='mt-1 ml-2' />
        ) : isCurrentUser && message.messageStatus === 'delivered' ? (
            <BsCheckAll size={18} className='mt-1 ml-2' />
        ) : isCurrentUser && message.messageStatus === 'read' ? (
            <BsCheckAll size={18} color='blue' className='mt-1 ml-2' />
        ) : null;

    if (message.type === 'text') {
        return (
            <p
                className={`${isCurrentUser ? 'bg-cyan-500' : 'bg-red-400'} flex items-center px-4 py-2 text-white rounded-2xl`}
            >
                {message.message}
                <span className='text-xs mt-1 ml-2'>{timeString(message.createdAt)}</span>
                {messageStatusIcon}
            </p>
        );
    }
    else if (message.type === 'image') {
        return (
            <div className={`rounded-md pt-1 px-1  cursor-pointer pb-1 ${isCurrentUser ? 'bg-cyan-500' : 'bg-red-400'}`} onClick={() => {
                setImage(message.message);
                openModal();
            }}>
                <Image src={message.message} height={200} width={250} className='rounded-md' alt='chat_img' />
                <div className='justify-end mr-2 flex'>
                    <span className='text-xs mt-1 ml-2'>{timeString(message.createdAt)}</span>
                    {messageStatusIcon}
                </div>
            </div>
        );
    }

    return null;
};

const Messages = ({ messages, userId }) => {


    const [isModalOpen, setModalOpen] = useState(false);

    const openModal = () => {
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
    };


    const chatContainerRef = useRef(null);
    const scrollToBottom = () => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const [image, setImage] = useState();


    return (
        <div ref={chatContainerRef} className='flex p-3 flex-col overflow-scroll overflow-x-hidden  scrollbar'>

            {messages?.map((message, idx) => (
                <div key={idx} className={`m-1 flex ${userId === message.senderId ? 'justify-end' : 'justify-start'}`}>
                    {renderMessageContent({ message, userId, setImage, openModal })}
                </div>
            ))
            }


            <ImagesModal isOpen={isModalOpen} onClose={closeModal} image={image} />

        
        </div>
    );
};

export default Messages;
