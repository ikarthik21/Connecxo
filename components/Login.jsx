'use client';
import Image from 'next/image'
import { Black_Ops_One } from 'next/font/google';
import { FcGoogle } from 'react-icons/fc';
import { useState, useEffect } from 'react';
import { signIn, signOut, useSession, getProviders } from "next-auth/react";





const bpone = Black_Ops_One({
    weight: '400',
    subsets: ['latin'],
})






const Login = () => {


    const { data: session } = useSession();
    console.log(session);
    const [providers, setProviders] = useState(null);
    const [toggleDropdown, setToggleDropdown] = useState(false);

    useEffect(() => {
        (async () => {
            const res = await getProviders();
            setProviders(res);
        })();
    }, []);




    const handleLogin = async () => {

    }




    return (
        <div className='flex items-center h-screen justify-evenly flex-col'>
            <Image src='/images/logo1.gif' priority={true} width={150} height={150} alt='no IMf' className='mb-2' />
            <h1 className={`font - semibold text-5xl mb-4 mt-12 ${bpone.className} tracking-wide font-1 text-cyan-400`}>Connecxo</h1>
            <p className='text-justify font-mono'>A platform for instant messaging, voice and video callling.</p>

            <>
                {providers &&
                    Object.values(providers).map((provider) => {

                        return <button className=' bg-cyan-500 flex justify-center items-center  py-[10px] px-4  rounded' onClick={() => {
                            signIn(provider.id);
                        }} key={provider.id}>
                            <FcGoogle size={30} />
                            <p className='ml-4'>Login with Google</p>
                        </button>
                    })}
            </>
        </div >
    )
}

export default Login