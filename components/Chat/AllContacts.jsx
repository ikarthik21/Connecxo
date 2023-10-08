'use client';
import { use, useEffect } from 'react';
import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';
import { getContacts } from '@store/userSlice'
import { currentMessageUser } from '@store/currentMessageSlice';

const AllContacts = () => {

    const dispatch = useDispatch();
    const users = useSelector(state => (state.users.data))

    useEffect(() => {
        dispatch(getContacts());
    }, [dispatch])


    return (
        <div className='flex flex-col'>
            {
                Object.keys(users).map((key) => {
                    const contacts = users[key];

                    return (
                        <div key={key}>

                            <p className='ml-4 mt-1 mb-1 '>{key}</p>
                            {
                                contacts.map((user) => (
                                    <div
                                        className="flex border-b-[1px] border-color-1 py-4 px-2 hover:bg-slate-700"
                                        key={user.id}
                                        onClick={() => {
                                            dispatch(currentMessageUser(user))
                                        }}>
                                        <Image
                                            src={user.profileImg}
                                            className="h-12 w-12 rounded-3xl"
                                            height={40}
                                            width={40}
                                            alt="contact img"
                                        />

                                        <div className="flex flex-col ml-4">
                                            <h2 className="tracking-wider">{user.display_name}</h2>
                                            <h2 className="tracking-wider text-sm">{user.about}</h2>
                                        </div>
                                    </div>
                                ))}
                        </div>
                    );
                })
            }

        </div>

    )
}

export default AllContacts