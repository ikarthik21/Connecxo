'use client';

import ChatNav from "./ChatNav";
import InputBox from "./InputBox";
import { useSelector } from 'react-redux'
import Image from "next/image";
import Login from "@components/Login";


const SingleChat = () => {

    const user = useSelector(state => state.cmuser)
    console.log(user);

    return (

        <>
            <div className="flex flex-col flex-main-2 bg-[#111A30] border-l-[0.2px] border- color-2 justify-between rounded-r-md">

                {
                    user.id ?
                        <>
                            < ChatNav user={user} /> <InputBox />
                        </>
                        :
                        <Login />

                }

            </div>

        </>

    )
}

export default SingleChat