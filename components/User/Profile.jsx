'use client';

import { useState, useEffect, useRef } from "react";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from '@utils/fireBaseConfig';
import Image from "next/image";
import { useSession } from "next-auth/react";
import { getProfileF, updateProfileF } from '@utils/apis/userApi';
import { FaUserEdit } from 'react-icons/fa'
import { BsFillCameraFill } from "react-icons/bs";
 
const Profile = () => {
    const dispatch = useDispatch();
    const { data: session } = useSession();
    const [user, setUser] = useState({ id: "", email: "", display_name: "", about: "", profileImg: "" });
    const [showEdit, setShowEdit] = useState(true);
    const [status, setStatus] = useState("Update")
    const fileInputRef = useRef(null);

    useEffect(() => {
        (async () => {
            const data = await getProfileF(session?.user.id);
            dispatch(adduser(data));
            setUser(data);
            if (data?.display_name === "" && data?.about === "") {
                setShowEdit(false);
            }
        }
        )();
    }, [session?.user.id])



    const handleImageClick = () => {
        fileInputRef.current.click();
    };


    const uploadFile = async (event) => {

        try {
            const imageRef = ref(storage, `profileimages/${event.target.files[0].name}`);
            const snapshot = await uploadBytes(imageRef, event.target.files[0]);
            const url = await getDownloadURL(snapshot.ref);
            setUser({ ...user, profileImg: url })

        } catch (error) {
            console.log(error);
        }
    };



    const updateUser = async () => {

        try {
            setStatus("updating....");
            const res = await updateProfileF(user);
            if (res.status === true) {
                setStatus("Update");
                setShowEdit(true);
            }
        }
        catch (error) {
            console.log(error);
        }
    }
    return (

        <div className="mt-4 flex flex-col">

            <div className="flex flex-col items-center  justify-center md:flex-row gap-10 m-16  ">

                <div className="h-32" style={showEdit ? { pointerEvents: "none", opacity: "0.55" } : { pointerEvents: "auto" }}>

                    <Image src={user?.profileImg === "" ? "/images/gamer.png" : `${user?.profileImg}`} className="profile-imagem-2 rounded-full z-10" alt="Profile Image" width={130} height={150} />


                    {showEdit ? "" :
                        <BsFillCameraFill size={30} cursor="pointer" onClick={handleImageClick} className="edit-icon" />
                    }


                    <input type="file" ref={fileInputRef} onChange={uploadFile} style={{ display: 'none' }} />

                </div>


                <div className="flex flex-col gap-2 h-44" style={showEdit ? { pointerEvents: "none", opacity: "0.55" } : { pointerEvents: "auto" }}>



                    <label htmlFor=""  >Name</label>

                    <input type="text" className="border-none outline-none bg-slate-300 text-black rounded-md p-[5px] text-lg" value={user?.display_name} onChange={(e) => {
                        setUser({ ...user, display_name: e.target.value })
                    }} />

                    <label htmlFor="">About</label>
                    <input type="text" className="border-none outline-none bg-slate-300 text-black rounded-md p-[5px] text-lg" value={user?.about} onChange={(e) => {
                        setUser({ ...user, about: e.target.value })
                    }} />


                    {showEdit ? "" : <button className="bg-cyan-500 py-[7px] rounded-md mt-2" onClick={updateUser}>{status}</button>
                    }


                </div>

                <div className="flex flex-col justify-start h-44">
                    <FaUserEdit size={30} cursor="pointer" onClick={() => setShowEdit((prev) => !prev)} />
                </div>

            </div >


        </div>
    )
}

export default Profile