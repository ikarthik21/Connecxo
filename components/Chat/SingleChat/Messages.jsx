import { TiTick } from 'react-icons/ti';
import { BsCheckAll } from 'react-icons/bs';
import { format, parseISO } from "date-fns";

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

                        <p className={` ${userId === message.senderId ? "bg-cyan-500" : "bg-red-400"} flex items-center  px-4 py-2 text-white rounded-2xl`}>{message.message}

                            <span className='text-xs mt-1 ml-2'>{timeString(message.createdAt)}</span>

                            {userId === message.senderId && message.messageStatus === "sent" ? <TiTick size={18} className='mt-1 ml-2' /> : ""

                            }
                            {userId === message.senderId && message.messageStatus === "delivered" ? <BsCheckAll size={18} className='mt-1 ml-2' /> : ""

                            }
                            {userId === message.senderId && message.messageStatus === "read" ? <BsCheckAll size={18} color='blue' className='mt-1 ml-2' /> : ""

                            }
                        </p>
                    </div>
                );
            })}
        </div>

    )
}

export default Messages