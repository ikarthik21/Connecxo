import { BsFillEmojiWinkFill, BsFillMicFill } from 'react-icons/bs';
import { ImAttachment } from 'react-icons/im';
import { MdSend } from 'react-icons/md';
import EmojiPicker from 'emoji-picker-react';
import { useState, useRef, useEffect } from 'react';

const InputBox = ({ setMessage, sendMessage, message }) => {
    const [showEmoji, setShowEmoji] = useState(false);
    const emojiButtonRef = useRef(null);
    const emojiPickerRef = useRef(null);

    useEffect(() => {

        const handleClickOutside = (event) => {
            if (
                emojiButtonRef.current &&
                emojiPickerRef.current &&
                !emojiButtonRef.current.contains(event.target) &&
                !emojiPickerRef.current.contains(event.target)
            ) {
                setShowEmoji(false);
            }
        };

        document.addEventListener('click', handleClickOutside);


        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    const emojiHandler = () => {
        setShowEmoji((prev) => !prev);
    };

    return (
        <div className="bg-slate-600 px-2 py-[10px] rounded-r-md">
            <div className='flex  flex-t-2  item-center justify-between'>
                <div ref={emojiButtonRef}>
                    <BsFillEmojiWinkFill size={27} className='ml-4' cursor="pointer" onClick={emojiHandler} />
                    {showEmoji && (
                        <div className='zi-2 ' ref={emojiPickerRef}>
                            <EmojiPicker onEmojiClick={(emoji) => setMessage((prev) => prev += emoji.emoji)} />
                        </div>
                    )}
                </div>
                <ImAttachment size={25} className='ml-4' cursor="pointer" />



                <div className='flex flex-2 items-center ml-4'>
                    <input
                        type="text"
                        className='rounded-lg outline-none border-none  text-black p-[6px] mr-2 w-[54vw]'
                        placeholder='Type a message'
                        onChange={(e) => setMessage(e.target.value)}
                        value={message}
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
    );
};

export default InputBox;
