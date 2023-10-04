import { BsFillEmojiWinkFill, BsFillMicFill } from 'react-icons/bs';
import { ImAttachment } from 'react-icons/im';
import { MdSend } from 'react-icons/md';

const InputBox = ({ setMessage, sendMessage, message }) => {


    return (
        <div className="bg-slate-600 px-2 py-[10px] rounded-r-md ">

            <div className='flex items-center rounded-r-md'>
                <div className='flex  flex-t-2  item-center justify-between'>
                    <BsFillEmojiWinkFill size={27} className='ml-4' cursor="pointer" />
                    <ImAttachment size={25} className='ml-4' cursor="pointer" />
                </div>

                <div className='flex flex-2 items-center ml-4'>
                    <input type="text" className='rounded-lg outline-none border-none  text-black p-[6px] mr-2 w-[54vw]' placeholder='Type a message' onChange={(e) => setMessage(e.target.value)} value={message}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                sendMessage();
                            }
                        }}
                    />
                    <BsFillMicFill size={25} cursor="pointer" />
                    <MdSend size={25} className='ml-4' cursor="pointer" onClick={sendMessage} />
                </div>
            </div>
        </div>
    )
}

export default InputBox