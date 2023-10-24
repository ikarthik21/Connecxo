import { TiTick } from 'react-icons/ti';
import { BsCheckAll } from 'react-icons/bs';
import Image from 'next/image';
import { timeString } from '@components/Utils';


const RenderMessage = ({ message, userId, setImage, openModal }) => {

    const isCurrentUser = userId === message.senderId;

    const messageStatusIcon = isCurrentUser ? (
        message.messageStatus === 'sent' ? (
            <TiTick size={18} className='mt-1 ml-2' />
        ) : message.messageStatus === 'delivered' ? (
            <BsCheckAll size={18} className='mt-1 ml-2' />
        ) : message.messageStatus === 'read' ? (
            <BsCheckAll size={18} color='blue' className='mt-1 ml-2' />
        ) : null
    ) : null;

    if (message.type === 'text') {

        return (
            <p className={`${isCurrentUser ? 'bg-cyan-500' : 'bg-red-400'} flex items-center px-4 py-2 text-white rounded-2xl`}>
                {message.message}
                <span className='text-xs mt-1 ml-2'>{timeString(message.createdAt)}</span>
                {messageStatusIcon}
            </p>
        );
    } else if (message.type === 'image') {
        return (
            <div className={`rounded-md pt-1 px-1  cursor-pointer pb-1 ${isCurrentUser ? 'bg-cyan-500' : 'bg-red-400'}`} onClick={() => {
                setImage(message.message);
                openModal();
            }}>
                <Image src={message.message} height={200} width={250} className='rounded-md' alt='chat_img' loading="lazy" />
                <div className='justify-end mr-2 flex'>
                    <span className='text-xs mt-1 ml-2'>{timeString(message.createdAt)}</span>
                    {messageStatusIcon}
                </div>
            </div>
        );
    }

    return null;
};

export default RenderMessage

