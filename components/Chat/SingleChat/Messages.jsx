import { TiTick } from 'react-icons/ti';
import { BsCheckAll } from 'react-icons/bs';
import { format, parseISO } from "date-fns";
import Image from 'next/image';
const Messages = ({ messages, userId }) => {


    const timeString = dateString => {
        const dateObject = parseISO(dateString);
        return format(dateObject, "h:mm a");
    }

    return (

        <div className="flex p-2 flex-col h-[82vh]  overflow-scroll overflow-x-hidden" >
            {messages?.map((message, idx) => {
                return (
                    <div key={idx} className={`m-1 flex ${userId === message.senderId ? "justify-end" : "justify-start"}  `}>

                        {message.type === "text" && <p className={` ${userId === message.senderId ? "bg-cyan-500" : "bg-red-400"} flex items-center  px-4 py-2 text-white rounded-2xl`}>{message.message}

                            <span className='text-xs mt-1 ml-2'>{timeString(message.createdAt)}</span>

                            {userId === message.senderId && message.messageStatus === "sent" ? <TiTick size={18} className='mt-1 ml-2' /> : ""

                            }
                            {userId === message.senderId && message.messageStatus === "delivered" ? <BsCheckAll size={18} className='mt-1 ml-2' /> : ""

                            }
                            {userId === message.senderId && message.messageStatus === "read" ? <BsCheckAll size={18} color='blue' className='mt-1 ml-2' /> : ""

                            }
                        </p>
                        }

                        {message.type === "image" &&
                            <div className={` rounded-md  pt-1 px-1 pb-1 ${userId === message.senderId ? "bg-cyan-500" : "bg-red-400"}  `}>
                                <Image src={message.message} height={200} width={250} className="rounded-md" alt='chat_img' />

                                <div className='justify-end mr-2  flex'>
                                    <span className='text-xs mt-1 ml-2'>{timeString(message.createdAt)}</span>

                                    {userId === message.senderId && message.messageStatus === "sent" ? <TiTick size={18} className='mt-1 ml-2' /> : ""

                                    }
                                    {userId === message.senderId && message.messageStatus === "delivered" ? <BsCheckAll size={18} className='mt-1 ml-2' /> : ""

                                    }
                                    {userId === message.senderId && message.messageStatus === "read" ? <BsCheckAll size={18} color='blue' className='mt-1 ml-2' /> : ""

                                    }

                                </div>
                            </div>}






                    </div>
                );
            })}
        </div >

    )
}

export default Messages