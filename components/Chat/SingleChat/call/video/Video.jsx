import Image from "next/image";
import { useSelector, useDispatch } from "react-redux";
import { endCall } from '@store/callSlice';
import { MdOutlineCallEnd } from 'react-icons/md'
const Video = () => {
  const dispatch = useDispatch();

  const user = useSelector(state => state.cmuser);


  return (
    <div className='absolute z-50  flex items-center  justify-center top-1 rounded-md  h-[98vh] w-[98vw] text-black bg-slate-800 overflow-y-hidden '>


      <div className="flex flex-col justify-between min-h-[50vh] items-center ">
        <h1 className="text-xl  text-white ">Video Call</h1>

        <Image src={user.profileImg} width={140} height={140} alt="user_img" className="rounded-full m-4" />

        <h1 className="text-xl  text-white ">{user.display_name}</h1>
        <div className="bg-red-500 p-2 rounded-full mt-8 cursor-pointer">
          <MdOutlineCallEnd size={30} color="white" onClick={() => dispatch(endCall())} />
        </div>

      </div>


    </div>
  )
}

export default Video;
