import { BsFillEmojiWinkFill, BsFillMicFill } from 'react-icons/bs';
import { ImAttachment } from 'react-icons/im';
import { MdSend } from 'react-icons/md';
import EmojiPicker from 'emoji-picker-react';
import { useState, useRef, useEffect } from 'react';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from '@utils/fireBaseConfig';
import { useSession } from 'next-auth/react';

const ImagesPop = ({ setImageModal, files, sendMessage, selectedFile }) => {

    const { data: session } = useSession();
    const [status, setStatus] = useState("Send")

    const uploadToFBase = async () => {

        try {
            setStatus("Sending")
            const imageRef = ref(storage, `users/chat/${session.user.id}/${files[0].name}`);
            const snapshot = await uploadBytes(imageRef, files[0]);
            const url = await getDownloadURL(snapshot.ref);
            sendMessage(url, "image")
            setStatus("Sent")
            setImageModal(false);
        }
        catch (error) {
            console.log(error);
        }
    };


    return <div className='absolute top-32  left-[40vw] h-[65vh] w-[50vw]  flex flex-col bg-slate-700 p-4 rounded-xl'>

        <div className='flex items-center justify-between'>
            <h1>Images</h1>
            <button className='text-xl font-extrabold rounded-full' onClick={() => setImageModal(false)}>X</button>
        </div>

        <div className='flex  items-center justify-center  '>
            {
                Object.keys(files).map((key, idx) => {
                    const value = files[key];
                    return <div key={key} className='m-8   flex items-center justify-between flex-col'>
                        <img
                            src={selectedFile} className='h-64 w-64'
                            alt={`Selected ${idx}`}
                            width={80} height={80}
                        />
                        <p className='mt-4'>  {value.name}</p>
                    </div>

                })
            }

        </div>

        <div className=' justify-center items-center flex mt-6'>
            <button onClick={uploadToFBase} className='bg-cyan-400 px-4 py-1 border-none outline-none  rounded-xl' >{status}</button>
        </div>

    </div>
}

const EmojiBox = ({ setMessage }) => {

    const emojiButtonRef = useRef(null);
    const emojiPickerRef = useRef(null);
    const [showEmoji, setShowEmoji] = useState(false);


    //  Outsie click handler to close modal windows

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                (emojiButtonRef.current &&
                    emojiPickerRef.current &&
                    !emojiButtonRef.current.contains(event.target) &&
                    !emojiPickerRef.current.contains(event.target))
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

    return <div ref={emojiButtonRef}>
        <BsFillEmojiWinkFill size={27} className='ml-4' cursor="pointer" onClick={emojiHandler} />
        {showEmoji && (
            <div className='zi-2 ' ref={emojiPickerRef}>
                <EmojiPicker onEmojiClick={(emoji) => setMessage((prev) => prev += emoji.emoji)} />
            </div>
        )}
    </div>
}

const FileAttach = ({ files, setFiles, sendMessage }) => {
    const [selectedFile, setSelectedFile] = useState();
    const fileInputRef = useRef(null);
    const [imageModal, setImageModal] = useState(false);
    const handleImageClick = () => {
        fileInputRef.current.click();
    };

    // Image Handling
    const handleImageChange = (e) => {
        const files = e.target.files;
        setFiles(e.target.files);
        if (files) {
            setSelectedFile(null);
            setImageModal(true);
            const reader = new FileReader();
            reader.onload = (e) => {
                setSelectedFile(e.target.result);
            };
            reader.readAsDataURL(files[0]);

        } else {
            setSelectedFile(null);
        }
    };

    return <div>
        <ImAttachment size={25} className='ml-4' cursor="pointer" onClick={handleImageClick} />

        <input type="file" ref={fileInputRef} accept="image/*" onChange={handleImageChange} style={{ display: 'none' }} />

        {imageModal && <ImagesPop setImageModal={setImageModal} files={files} setFiles={setFiles} sendMessage={sendMessage} selectedFile={selectedFile} fileInputRef={fileInputRef} />}

    </div>

}


const VoiceRecorder = () => {
    const [audioStream, setAudioStream] = useState(null);
    const [recording, setRecording] = useState(false);
    const [audioBlob, setAudioBlob] = useState(null);
    const audioChunksRef = useRef([]);

    const startRecording = async () => {
        
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            setAudioStream(stream);

            const mediaRecorder = new MediaRecorder(stream);
            mediaRecorder.ondataavailable = (e) => {
                if (e.data.size > 0) {
                    audioChunksRef.current.push(e.data);
                }
            };

            mediaRecorder.onstop = () => {
                const blob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
                setAudioBlob(blob);
                audioChunksRef.current = [];
            };

            mediaRecorder.start();
            setRecording(true);
        } catch (error) {
            console.error('Error accessing the microphone:', error);
        }
    };

    const stopRecording = () => {
        if (audioStream) {
            audioStream.getTracks().forEach((track) => track.stop());
            setRecording(false);
        }
    };

    const playAudio = () => {
        if (audioBlob) {
            const audioElement = new Audio(URL.createObjectURL(audioBlob));
            audioElement.play();
        }
    };

    return (
        <div>
            {recording ? (
                <button onClick={stopRecording}>Stop Recording</button>
            ) : (
                <button onClick={startRecording}>Start Recording</button>
            )}
            {audioBlob && <button onClick={playAudio}>Play Recorded Audio</button>}
        </div>
    );
}

const InputBox = ({ setMessage, sendMessage, message, setFiles, files }) => {
    const [showvoice, setShowvoice] = useState(false);

    return (
        <div className="bg-slate-600 px-2 py-[10px] rounded-r-md" >
            {
                showvoice ? <VoiceRecorder /> :


                    <div>

                        <div className='flex  flex-t-2  item-center justify-between' >

                            <EmojiBox setMessage={setMessage} />

                            <FileAttach setFiles={setFiles} files={files} sendMessage={sendMessage} />

                            <div className='flex flex-2 items-center ml-4'>
                                <input
                                    type="text"
                                    className='rounded-lg outline-none border-none  text-black p-[6px] mr-2 w-[54vw]'
                                    placeholder='Type a message'
                                    onChange={(e) => setMessage(e.target.value)}
                                    value={message}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') {
                                            sendMessage(message, "text")
                                        }
                                    }}
                                />

                                <BsFillMicFill size={25} cursor="pointer" onClick={() => setShowvoice(true)} />

                                <MdSend size={25} className='ml-4' cursor="pointer" onClick={() => sendMessage(message, "text")} />

                            </div>
                        </div>
                    </div >
            }
        </div >

    );
};

export default InputBox;
