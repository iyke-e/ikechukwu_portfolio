import Link from 'next/link'
import React from 'react'
import { MdOutlineKeyboardDoubleArrowRight } from "react-icons/md";

const Connect = () => {
    return (
        <div className='pad-auto py-14 space-y-6 items-center'>

            <h1 className='text-4xl md:text-7xl leading-12 md:leading-20 text-center '>Lets Connect <br /> There</h1>

            <div className='grid  place-content-center'>
                <Link href="/contact" className='text-center' >
                    <div className='flex gradientAnimate bg-white/20 rounded-[500px] p-2 pr-6 gap-2 w-fit h-fit pl-2 items-center'>
                        <div className='bg-background w-12 h-12 grid place-content-center rounded-full'>
                            <MdOutlineKeyboardDoubleArrowRight className='w-8 h-8' />
                        </div>
                        Drop a Message
                    </div>
                </Link>

            </div>


        </div>
    )
}

export default Connect