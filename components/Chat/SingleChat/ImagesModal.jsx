'use client';

import React, { useState } from 'react'
import Image from 'next/image';

const ImagesModal = ({ isOpen, onClose, image }) => {

    if (!isOpen) return null;

    return (
        <div className="fixed z-10 inset-0 overflow-y-auto ">
            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                <div className="fixed inset-0 transition-opacity" onClick={onClose}>
                    <div className="absolute inset-0 bg-gray-800 opacity-70"></div>
                </div>
                <div className="flex  flex-col relative top-10 left-[25vw] align-bottom bg-[#111A30] rounded-xl text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-top w-[800px] p-4 " >
                    <Image src={image} height={1200} width={1200} alt='chat_img' />
                </div>
            </div>
        </div >
    );
};

export default ImagesModal;
