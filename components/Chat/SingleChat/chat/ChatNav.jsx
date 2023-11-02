import { IoCall } from 'react-icons/io5';
import { BsCameraVideoFill, BsThreeDotsVertical } from 'react-icons/bs';
import { AiOutlineSearch } from 'react-icons/ai';
import Image from 'next/image';
import { useSelector } from 'react-redux';

const ChatNav = ({ user, setShowSearch, initVideoCall, initAudioCall }) => {

    const users = useSelector(state => (state.onlineusers.data));



    return <div className="bg-slate-600 rounded-r-lg  flex justify-between py-[8px] px-4 items-center">

        <div className='flex'>
            <Image src={user?.profileImg} className="h-12 w-12 rounded-3xl" height={2} width={40}
                alt='profile img' />
            <div className='flex item-center justify-center flex-col ml-4 '>
                <h1 className='text font-bold tracking-wide'>{user?.display_name}</h1>
                {users.includes(user.id) && <div className='flex items-center'>
                    <div className='p-1 relative top-[2px] h-2  w-2 mr-1  bg-green-600  rounded-full'></div>
                    <div>
                        <p className='text-sm'>online</p>
                    </div>
                </div>
                }
            </div>
        </div>

        <div className="flex justify-end ">
            <div className="flex">
                <IoCall size={25} className="ml-8" cursor="pointer" onClick={initAudioCall} />
                <BsCameraVideoFill size={25} className="ml-8" cursor="pointer" onClick={initVideoCall} />
                <AiOutlineSearch size={25} className="ml-8" cursor="pointer" onClick={() => setShowSearch(prev => !prev)} />
                <BsThreeDotsVertical size={25} className="ml-8" cursor="pointer" />
            </div>
        </div>
    </div>


}


export default ChatNav;