import { BsFillEmojiWinkFill, BsFillMicFill } from 'react-icons/bs';
import { AiOutlinePlus } from 'react-icons/ai';

const InputBox = () => {
    return (
        <div className="bg-slate-600 px-2 py-[10px] rounded-r-md ">

            <div className='flex items-center rounded-r-md'>
                <div className='flex  flex-t-2  item-center justify-between'>
                    <BsFillEmojiWinkFill size={30} className='ml-4' cursor="pointer" />
                    <AiOutlinePlus size={30} className='ml-4' cursor="pointer" />
                </div>

                <div className='flex flex-2 items-center ml-4'>
                    <input type="text" className='rounded-lg outline-none border-none  text-black p-[6px] mr-2 w-[54vw]' placeholder='Type a message' />
                    <BsFillMicFill size={27} cursor="pointer" />
                </div>
            </div>

        </div>
    )
}

export default InputBox