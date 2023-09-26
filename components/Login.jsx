"use client";
import Image from "next/image";
import { Black_Ops_One } from "next/font/google";
import { FcGoogle } from "react-icons/fc";
import { useState, useEffect } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";
import Profile from "./User/Profile";

const bpone = Black_Ops_One({
    weight: "400",
    subsets: ["latin"],
});

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
        <div className="flex items-center md:h-screen h-auto justify-evenly flex-col" >
            <Image
                src="/images/logo1.gif"
                priority={true}
                width={150}
                height={200}
                alt="no IMf"
                className="mb-2"
            />
            <h1
                className={`font - semibold text-5xl mb-4 mt-12 ${bpone.className} tracking-wide font-1 text-cyan-400`}
            >
                Connecxo

            </h1>
            <p className="text-justify font-mono w-48 md:w-auto" >
                A platform for instant messaging, voice and video callling.
            </p>

            {session?.user ? (

                <>
                    <Profile />
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
                <>

                    {providers &&
                        Object.values(providers).map((provider) => {
                            return (
                                <button
                                    className=" bg-cyan-500 mb-8 flex justify-center items-center  py-[10px] px-4  rounded"
                                    onClick={() => {
                                        signIn(provider.id);
                                    }}
                                    key={provider.id}
                                >
                                    <FcGoogle size={30} />
                                    <p className="ml-4">Login with Google</p>
                                </button>
                            );
                        })}
                </>
            )}
        </div>
    );
};

export default Login;
