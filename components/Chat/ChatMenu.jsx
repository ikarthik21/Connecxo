
import Image from "next/image";
import { IoMdContact } from 'react-icons/io';
import { RiContactsBook2Fill } from 'react-icons/ri';
import { useSelector } from "react-redux";

const Nav = () => {
    const user = useSelector(state => state.user)
    return <div className="bg-slate-600 p-[8px]  rounded-l-md" >
        <div className="flex items-center justify-between">
            <Image src={user.profileImg} className="h-12 w-12 rounded-full" height={2} width={40} alt="contact img" />
            <RiContactsBook2Fill size={32} className="ml-2" cursor="pointer" />
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


const ChatMenu = () => {
    return (
        <div className="flex flex-col flex-main-1 bg-slate-800 rounded-l-md cursor-pointer">

            <Nav />


            <input type="text" className="ml-2 mt-2 mb-1 bg-zinc-300 text-black mr-8 p-1 rounded-lg border-none outline-none" />
            <div className="flex flex-col " >
                <Contact img="/images/gamer.png" name="Karthik" lastchat="Good night" />
                <Contact img="/images/gamer.png" name="Karthik" lastchat="Good night" />
                <Contact img="/images/gamer.png" name="Karthik" lastchat="Good night" />
                <Contact img="/images/gamer.png" name="Karthik" lastchat="Good night" />
                <Contact img="/images/gamer.png" name="Karthik" lastchat="Good night" />
            </div>
        </div>
    )
}

export default ChatMenu