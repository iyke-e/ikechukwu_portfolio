"use client"

import Image from 'next/image';
import React from 'react'
import { stackList } from '@/data/stacklist';
import Button from '../ui/Button';
import { useRouter } from 'next/navigation';
import Chatbot from '../chatbot/Chatbot';




const Hero = () => {
    const router = useRouter()



    const duplicateStackList = [...stackList, ...stackList]
    return (
        <div className='relative pt-10 md:pt-20'>
            <div className='pad-auto relative'>


                <div className='md:flex gap-16 items-center' >
                    <div className='w-fit mb-10 md:mb-0'>
                        <p className='opacity-10 mb-4 w-fit leading-8  '>React + React Native + Next.js +  Redux + Node
                        </p>
                        <div >
                            <h1 className='text-3xl md:text-6xl  max-w-220 leading-10 mb-6 md:leading-16 '>
                                Frontend Developer building fast, clean & user-friendly experiences
                            </h1>
                            <p className='text-gray-500 max-w-150'>I build fast, responsive, and user-friendly applications with React, Next.js, and modern UI tools.</p>

                        </div>
                        <div className='flex mt-8 gap-4'>
                            <Button>Explore Project</Button>
                            <Button variant='white'>Get in Touch</Button>
                        </div>



                    </div>


                    {/* 
                    <ProfileCard
                        name="Egwim Iyke"
                        title="Frontend Developer"
                        handle="IykeCodes"
                        status="Online"
                        contactText="Contact Me"
                        avatarUrl="/bgMobile.jpg"
                        showUserInfo={true}
                        enableTilt={true}
                        enableMobileTilt={false}
                        onContactClick={() => router.push("/contact")}
                        className='hidden md:block'
                    /> */}








                </div>


            </div>



            <div className='sliderparent overflow-hidden  mb-5 my-16 md:my-20'>
                <ul className='flex slider w-max border-t  border-b py-3 border-white/20'>
                    {
                        duplicateStackList.map((stack, index) => <li
                            className='flex mr-4 gap-2 grow-0 shrink-0 opacity-80 items-center border border-white/15 rounded-4xl bg-white/10 px-4 py-2 '
                            key={index}>
                            <Image
                                src={stack.icon.src}
                                width={20}
                                height={20}
                                alt={stack.name + "icon"}

                            />
                            <p>
                                {stack.name}
                            </p>
                        </li>
                        )
                    }

                </ul>

            </div>



        </div>
    )
}

export default Hero



