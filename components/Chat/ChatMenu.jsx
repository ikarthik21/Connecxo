
import { useSession } from "next-auth/react";
import Image from "next/image";
import { RiContactsBook2Fill } from 'react-icons/ri';
import { BiSolidMessageSquareDetail } from 'react-icons/bi';
import AllContacts from './AllContacts';
import { useState } from "react";

const Nav = ({ user, setToggle }) => {

    return <div className="bg-slate-600 py-[12px] px-2  rounded-l-md" >
        <div className="flex items-center justify-between">
            <BiSolidMessageSquareDetail size={32} cursor="pointer" onClick={() => setToggle({
                messages: true,
                contacts: false
            })} />
            <div className="flex items-center">
                <RiContactsBook2Fill size={32} className="mr-4" cursor="pointer" onClick={() => setToggle({
                    messages: false,
                    contacts: true
                })} />
                <Image src={user?.profileImg} className="rounded-3xl" height={40} width={40} alt="profile img" />
            </div>
        </div>
    </div>
}

const Contact = ({ img, name, lastchat }) => {
    return <div className="flex border-b-[1px] border-color-1
    py-4 px-2   hover:bg-slate-700
    ">        <Image src={img} className="h-12 w-12" height={2} width={40} alt="contact img" />

        <div className="flex flex-col ml-4">
            <h2 className=" tracking-wider">{name}</h2>
            <p className="text-sm">{lastchat}</p>
        </div>
    </div>
}


const Messages = () => {
    return <div className="flex flex-col flex-main-1 bg-slate-800 rounded-l-md cursor-pointer">
        <input type="text" className="ml-2 mt-4  mb-1 bg-zinc-300 text-black mr-8 p-1 rounded-lg border-none outline-none" />
        <div className="flex flex-col " >
            <Contact img="/images/gamer.png" name="Karthik" lastchat="Good night" />
            <Contact img="/images/gamer.png" name="Karthik" lastchat="Good night" />
            <Contact img="/images/gamer.png" name="Karthik" lastchat="Good night" />
            <Contact img="/images/gamer.png" name="Karthik" lastchat="Good night" />
            <Contact img="/images/gamer.png" name="Karthik" lastchat="Good night" />
        </div>
    </div>
}


const ChatMenu = () => {
    const { data: session } = useSession();

    const [toggle, setToggle] = useState({
        messages: true,
        contacts: false
    })

    return (
        <div className="flex flex-col flex-main-1 bg-slate-800 rounded-l-md cursor-pointer">

            <Nav user={session?.user} setToggle={setToggle} />

            {toggle.contacts && <AllContacts />}
            {toggle.messages && <Messages />}

        </div>
    )
}

export default ChatMenu