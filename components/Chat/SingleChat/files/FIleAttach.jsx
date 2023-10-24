import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from '@utils/fireBaseConfig';
import { useSession } from 'next-auth/react';
import { ImAttachment } from 'react-icons/im';
import { useState, useRef } from "react";
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
        if (files.length > 0) {
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


export default FileAttach;