import { TiTick } from 'react-icons/ti';
import { BsCheckAll } from 'react-icons/bs';

const Messages = ({ messages, userId }) => {

    return (

        <div className="flex p-2 flex-col h-[82vh]  justify-end" >
            {messages?.map(message => {
                return (
                    <div key={message.id} className={`m-1 flex ${userId === message.senderId ? "justify-end" : "justify-start"}  `}>
                        <p className={` ${userId === message.senderId ? "bg-cyan-500" : "bg-red-400"} flex items-center  px-4 py-2 rounded-2xl`}>{message.message}
                            {userId === message.senderId && message.messageStatus === "sent" ? <TiTick size={18} className='mt-1 ml-2' /> : ""

                            }
                            {userId === message.senderId && message.messageStatus === "deilvered" ? <BsCheckAll size={18} className='mt-1 ml-2' /> : ""

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