"use client"

import Image from 'next/image';
import React from 'react'
import { stackList } from '@/data/stacklist';
import Button from '../../ui/Button';
import { useRouter } from 'next/navigation';
import GlidingStack from './GlidingStack';
import Code from "@/assets/code.png"

const Hero = () => {
    const router = useRouter()



    return (
        <div className='relative pt-10'>
            <div className='pad-auto relative'>


                <div className='md:text-center' >
                    <div className=' mb-10 md:mb-0'>
                        <p className='opacity-10 mb-4 md:hidden  leading-8  '>React + React Native + Next.js +  Redux + Node
                        </p>
                        <div >
                            <h1 className='text-3xl md:text-6xl mx-auto font-semibold max-w-200 leading-10 mb-6 md:leading-18 '>
                                Transforming Ideas into Digital Realities                     </h1>
                            <p className='text-white/80 mx-auto max-w-120'>I Build Responsive, Modern, and Scalable Solutions that connects Bussiness with people</p>

                        </div>
                        <div className='flex item-center md:justify-center mt-8 gap-4'>
                            <Button>See my work</Button>
                            <Button variant='white'>Get in Touch</Button>
                        </div>


                    </div>

                </div>


            </div>


            <div style={{ backgroundImage: `url(${Code.src})` }} className=' md:block w-17/20 max-w-[1020px] mx-auto mt-10  rounded-t-2xl bg-no-repeat bg-cover bg-top h-30 md:h-60'></div>

            <GlidingStack />

        </div>
    )
}

export default Hero



