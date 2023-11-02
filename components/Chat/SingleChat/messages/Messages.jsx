import { TiTick } from 'react-icons/ti';
import { BsCheckAll } from 'react-icons/bs';
import Image from 'next/image';
import { timeString } from '@components/Utils';
import { useRef, useEffect, useState } from 'react';
import ImagesModal from '../chat/ImagesModal';
import { IoMdClose } from 'react-icons/io';

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

const Messages = ({ messages, userId, showSearch, setShowSearch }) => {
    const chatContainerRef = useRef(null);
    const [image, setImage] = useState();
    const [isModalOpen, setModalOpen] = useState(false);
    const [search, setSearch] = useState("");
    const [groupedMessages, setGroupedMessages] = useState({});

    const openModal = () => {
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
    };

    useEffect(() => {
        const grouped = {};
        messages.forEach((message) => {
            const date = new Date(message.createdAt).toDateString();
            if (!grouped[date]) {
                grouped[date] = [];
            }
            grouped[date].push(message);
        });
        setGroupedMessages(grouped);

        const scrollToBottom = () => {
            if (chatContainerRef.current) {
                chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
            }
        };

        setTimeout(scrollToBottom, 0);
    }, [messages]);


    return (
        <div ref={chatContainerRef} className='flex p-3 min-h-[79vh] flex-col overflow-scroll overflow-x-hidden  scrollbar'>
            <div className='flex flex-col   '>
                {showSearch && (
                    <div className='sticky top-0 flex justify-end  '>
                        <div className='bg-[#475569] p-2 absolute rounded-md flex items-center z-50'>
                            <input
                                type='text'
                                className='px-4 w-72 py-[2px] text-black bg-[#f5f5f5] outline-none border-none rounded-md'
                                onChange={(e) => setSearch(e.target.value)}
                                value={search}
                                autoFocus={showSearch}
                            />
                            <IoMdClose size={22} cursor={"pointer"} className='ml-2' onClick={() => {
                                setShowSearch(false)
                                setSearch("")
                            }} />
                        </div>
                    </div>
                )}

                {
                    Object.entries(groupedMessages)
                        .filter(([ , messagesForDate]) =>
                            messagesForDate.some(message => message.message.includes(search))
                        )
                        .map(([date, messagesForDate]) => (

                            <div key={date} className="flex flex-col">

                                <div className="mb-2 text-center bg-gray-700 flex justify-center px-2 py-1 rounded-lg m-auto sticky top-0 z-10">
                                    <p className='text-sm'>{date}</p>
                                </div>

                                {messagesForDate
                                    .filter(message => message.message.includes(search))
                                    .map((message, idx) => (
                                        <div key={idx} className={`m-1 flex ${userId === message.senderId ? 'justify-end' : 'justify-start'}`}>
                                            {renderMessageContent({ message, userId, setImage, openModal })}
                                        </div>
                                    ))
                                }
                            </div>
                        ))
                }

            </div>
            <ImagesModal isOpen={isModalOpen} onClose={closeModal} image={image} />
        </div>
    );
};

export default Messages;