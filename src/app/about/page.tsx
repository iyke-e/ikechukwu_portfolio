"use client"

import React, { useState } from 'react'

import { MdOutlineKeyboardDoubleArrowRight } from "react-icons/md";
import Link from 'next/link';
import FullExperience from '@/components/about/FullExperience';
import TechStack from '@/components/home/About/TechStack';
import Education from '@/components/about/Education';
import MyStory from '@/components/about/MyStory';


const About = () => {


    return (
        <div className='py-4'>
            <div className='pad-auto mb-6'>
                <p className='mb-6 px-4 py-2 rounded-full gradientAnimate w-fit '>More About Me</p>


                <h1 className='text-[32px] leading-10 mb-4 md:text-5xl max-w-200 mt-4 md:leading-16 '>
                    Ikechukwu here, curious developer creating digital experiences
                </h1>

                <MyStory />

            </div>
            <TechStack />
            <Education />
            <FullExperience />

            <div className='pad-auto py-14 border-t border-white/20  space-y-6  items-center'>

                <h1 className='text-2xl md:text-4xl leading-12 md:leading-16 text-center'>FROM CONCEPT TO <b>CREATION</b>
                    <br /> LET's MAKE IT <b>HAPPEN</b>
                </h1>

                <div className='grid  place-content-center'>
                    <Link href="/contact" className='text-center' >
                        <div className='flex gradientAnimate bg-white/20 rounded-[500px] p-2 pr-6 gap-2 w-fit h-fit pl-2 items-center'>
                            <div className='bg-background w-12 h-12 grid place-content-center rounded-full'>
                                <MdOutlineKeyboardDoubleArrowRight className='w-8 h-8' />
                            </div>
                            Get In Touch
                        </div>
                    </Link>

                </div>


            </div>






        </div>
    )
}

export default About