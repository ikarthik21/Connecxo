
import { useSession } from "next-auth/react";
import Image from "next/image";
import { RiContactsBook2Fill } from 'react-icons/ri';
import { BiSolidMessageSquareDetail } from 'react-icons/bi';
import AllContacts from './AllContacts';
import { useState, useEffect } from "react";
import { signOut } from 'next-auth/react'
import Profile from "@components/User/Profile";
import { getInitMessages } from '@utils/apis/messageApi';
import { TiTick } from 'react-icons/ti';
import { BsCheckAll } from 'react-icons/bs';
import { timeString } from '@components/Utils';
import { BsFillCameraFill } from 'react-icons/bs'
import { currentMessageUser } from '@store/currentMessageSlice';
import { useDispatch } from "react-redux";
import { onlineUsers } from '@store/onlineUsers';




const Nav = ({ user, setToggle }) => {

    return <div className="bg-slate-600 py-[12px] px-2 rounded-l-lg border-color-1  border-r-[1px]  "  >
        <div className="flex items-center justify-between">

            <BiSolidMessageSquareDetail size={31} cursor="pointer" onClick={() => setToggle({
                messages: true,
                contacts: false,
                profile: false
            })} />

            <div className="flex items-center">
                <RiContactsBook2Fill size={32} className="mr-6" cursor="pointer" onClick={() => setToggle({
                    messages: false,
                    contacts: true,
                    profile: false
                })} />

                <div className="relative group">
                    <Image src={user?.profileImg} className="rounded-3xl" height={40} width={40} alt="profile img" />

                    <div className="absolute top-5 transform -translate-x-1/2 mt-4 bg-[#0d1425] rounded opacity-0   transition-all duration-300 ease-in-out -translate-y-2 group-hover:opacity-100 group-hover:-translate-y-0 z-50" >
                        <div className=" hover:bg-[#131c34]  px-4 py-3 rounded" onClick={() => setToggle({
                            messages: false,
                            contacts: false,
                            profile: true
                        })} >Profile</div>

                        <div className=" hover:bg-[#131c34]  px-4 py-3 rounded" onClick={() => {
                            signOut();
                        }}>Logout</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
}

const Contact = ({ user }) => {

    const dispatch = useDispatch();


    return <div className="flex border-b-[1px] border-color-1
    py-4 px-2     hover:bg-slate-700  
    "    onClick={() => {
            dispatch(currentMessageUser(user))
        }}>

        <Image src={(user.profileImg).toString()} className="h-12 rounded-full  w-12" height={2} width={40} alt="contact img" />
        <div className="flex flex-col ml-4 min-w-[368px]">
            <div className="flex items-center justify-between">
                <h1 className="tracking-wider">{user.display_name}</h1>
                <div>
                    <p className="text-xs">
                        {timeString(user.createdAt)}
                    </p>
                </div>

            </div>
            <div className=" flex items-center justify-between">
                {
                    user.type === "image" ?
                        <div className="flex items-center justify-center">
                            <BsFillCameraFill size={15} className="relative top-[0.5px]" />
                            <p className="text-sm  ml-2">Image</p>
                        </div>
                        :
                        <p className="text-sm overflow-hidden">{user.message}</p>
                }

                {
                    user.totalUnreadMessages ?
                        <div className="w-5 h-5 flex items-center justify-center bg-cyan-500 rounded-full ">
                            <p className="text-sm">{user.totalUnreadMessages}</p>
                        </div> : <div>
                            {user.messageStatus === "sent" ? <TiTick size={18} className='mt-1 ml-2' /> : user.messageStatus === "delivered" ? <BsCheckAll size={18} className='mt-1 ml-2' /> :
                                <BsCheckAll size={18} color='blue' className='mt-1 ml-2' />}
                        </div>
                }
            </div>
        </div>


    </div >
}


const Messages = () => {

    const [users, setUsers] = useState();
    const { data: session } = useSession();
    const [search, setSearch] = useState("");
    const dispatch = useDispatch();


    useEffect(() => {
        (async () => {
            if (session.user.id) {
                const users = await getInitMessages(session.user.id);
                dispatch(onlineUsers(users.onlineUsers));
                setUsers(users.users);
            }
        }
        )();
    }, [session?.user.id])





    return <div className="flex  flex-col flex-main-1 bg-slate-800 cursor-pointer rounded-l-lg  min-h-[87vh] overflow-y-scroll scrollbar ">

        <div className="sticky top-0 bg-slate-800 pb-3 pl-2 ">
            <input type="text" className="ml-2 mt-4  mb-1 text-black mr-8 px-2 py-1  rounded-xl  border-none outline-none  w-96" placeholder="search contact" value={search} onChange={(e) => {
                setSearch(e.target.value)
            }} />

        </div>


        <div className="flex flex-col  " >
            {
                users?.filter(user => (user.display_name.toLowerCase()).includes(search.toLowerCase())).map(user => {
                    return <Contact user={user} key={user.id} />
                })
            }
        </div >
    </div>
}


const ChatMenu = () => {

    const { data: session } = useSession();

    const [toggle, setToggle] = useState({
        messages: true,
        contacts: false,
        profile: false
    })

    return (
        <div className="flex flex-col flex-main-1  bg-slate-800 cursor-pointer rounded-l-xl  border-color-1  border-r-[1px]  min-w-[450px]">
            <div className="flex flex-col">
                <Nav user={session?.user} setToggle={setToggle} />



                {toggle.contacts && <AllContacts />}

                {toggle.messages && <Messages />}

                {toggle.profile && <Profile />}
            </div>

        </div>
    )
}

export default ChatMenu