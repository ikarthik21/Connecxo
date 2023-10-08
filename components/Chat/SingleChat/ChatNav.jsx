import { IoCall } from 'react-icons/io5';
import { BsCameraVideoFill, BsThreeDotsVertical } from 'react-icons/bs';
import Image from 'next/image';


const ChatNav = ({ user }) => {

    return <div className="bg-slate-600 flex justify-between py-[8px] px-4 items-center">

        <div className='flex'>
            <Image src={user?.profileImg} className="h-12 w-12 rounded-3xl" height={2} width={40}
                alt='profile img' />              
            <div className='flex item-center flex-col ml-4'>
                <h1 className='text font-bold tracking-wide'>{user?.display_name}</h1>
                <p className='text-sm'>Online</p>
            </div>
        </div>

        <div className="flex justify-end ">
            <div className="flex">
                <IoCall size={25} className="ml-8" cursor="pointer" />
                <BsCameraVideoFill size={25} className="ml-8" cursor="pointer" />
                <BsThreeDotsVertical size={25} className="ml-8" cursor="pointer" />
            </div>
        </div>

    </div>


}


export default ChatNav;