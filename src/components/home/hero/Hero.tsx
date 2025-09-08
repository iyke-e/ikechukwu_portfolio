"use client"

import Image from 'next/image';
import React from 'react'
import { stackList } from '@/data/stacklist';
import Button from '../../ui/Button';
import { useRouter } from 'next/navigation';
import GlidingStack from './GlidingStack';
import Code from "@/assets/code.png"
import Bg from "@/assets/bg2.png"
import Link from 'next/link';

const Hero = () => {
    const router = useRouter()



    return (
        <div style={{ backgroundImage: `linear-gradient(to bottom, rgba(10,10,10,0.8), rgba(10,10,10,0.5), rgba(10,10,10,1)), url(${Bg.src})` }} className='relative pt-30 md:pt-40 bg-no-repeat bg-center bg-cover'>
            <div className='pad-auto relative'>


                <div className='md:text-center' >
                    <div className=' mb-10 md:mb-0'>
                        <p className='opacity-10 mb-4 md:hidden  leading-8  '>React + React Native + Next.js +  Redux + Node
                        </p>
                        <div >
                            <h1 className='text-3xl md:text-6xl mx-auto font-semibold max-w-200 leading-10 mb-6 md:leading-18 '>
                                Transforming Ideas into Digital Realities                     </h1>
                            <p className='text-white/80 mx-auto max-w-120'>I Build Responsive, Modern, and Scalable Software Solutions that connects Bussiness with people</p>

                        </div>
                        <div className='flex item-center md:justify-center mt-8 gap-4'>

                            <Link href="/portfolio">
                                <Button>View my work</Button>

                            </Link>
                            <Link href="/contact">
                                <Button variant='white'>Get in Touch</Button>
                            </Link>

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



