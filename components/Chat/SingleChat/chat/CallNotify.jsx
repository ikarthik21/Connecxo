import Image from "next/image";
import { MdOutlineCallEnd } from 'react-icons/md'
import { IoMdCall } from 'react-icons/io'
import { BiSolidPhoneCall } from 'react-icons/bi'
import { useSelector } from "react-redux";
import { FcVideoCall } from 'react-icons/fc'
const CallNotify = ({ DenyCall }) => {

    const calls = useSelector(state => state.calls);

    return (
        <div className=" flex items-center justify-center ">
            <div className="bg-[#1d2a4a] absolute top-10 z-50 w-96 flex  items-center justify-between p-4 rounded-md">
                <div className="flex items-center">
                    <BiSolidPhoneCall size={25} className="mr-4" />
                    <Image src={calls.INCOMING_VIDEO_CALL.user.user.profileImg} className="rounded-full mr-4" width={30} height={30} alt="user_img" />
                    <h1 className="mr-2 text-lg">{calls.INCOMING_VIDEO_CALL.user.user.name}</h1>
                </div>
                <div className="flex items-center justify-between">
                    <div className="flex items-center ">
                        <div className="bg-green-500 p-2 rounded-full  ml-4 mr-2 cursor-pointer">
                            {
                                calls.INCOMING_VIDEO_CALL.user.type === "audio" ? <IoMdCall size={12} color="white" /> : <FcVideoCall size={12} color="white" />


                            }
                        </div>
                        <div className="bg-red-500 p-2 rounded-full   cursor-pointer" onClick={DenyCall}>
                            <MdOutlineCallEnd size={12} color="white" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CallNotify