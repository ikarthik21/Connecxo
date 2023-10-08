"use client";
import Image from "next/image";
import { Black_Ops_One } from "next/font/google";
import { FcGoogle } from "react-icons/fc";
import { useState, useEffect } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";

const bpone = Black_Ops_One({
    weight: "400",
    subsets: ["latin-ext"],
});

export const HomeComp = () => {

    return <div className="flex flex-col m-auto items-center">
        <Image
            src="/images/logo.png"
            priority={true}
            width={"150"}
            height={"150"}
            alt="no Img"
            className="mb-2 logo"
        />
        <h1
            className={`font-semibold text-5xl ${bpone.className}  mb-4 mt-12 tracking-wide font-1 text-cyan-400  `}
        >
            Connecxo

        </h1>

        <p className="text-justify font-mono text-[15px] md:text-[18px]  md:w-auto m-4" >
            A platform for instant messaging, voice and video callling.
        </p>
    </div>
}



const Login = () => {
    const { data: session } = useSession();

    const [providers, setProviders] = useState(null);

    useEffect(() => {
        (async () => {
            const res = await getProviders();
            setProviders(res);
        })();
    }, []);

    return (
        <div className="flex flex-col m-auto items-center">
            <HomeComp />

            {
                session?.user ? (

                    <>
                        <button
                            className=" bg-cyan-500 flex justify-center items-center  py-[10px] px-4  rounded"
                            onClick={() => {
                                signOut();
                            }}
                        >
                            <FcGoogle size={30} />
                            <p className="ml-4">Sign Out</p>
                        </button>
                    </>
                ) : (
                    <div>
                        {providers &&
                            Object.values(providers).map((provider) => {
                                return (
                                    <button
                                        className=" bg-cyan-500 mt-12  mb-8 flex justify-center items-center py-[10px]  px-4  rounded"
                                        onClick={() => {
                                            signIn(provider.id);
                                        }}
                                        key={provider.id}
                                    >
                                        <FcGoogle size={30} />
                                        <p className="ml-4 text-[16px]">Login with Google</p>
                                    </button>
                                );
                            })}
                    </div>
                )
            }
        </div >
    );
};

export default Login;
