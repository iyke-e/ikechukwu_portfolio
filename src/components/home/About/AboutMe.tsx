import React from 'react'
import Aipics from "@/assets/nobg.png"
import TechStack from './TechStack'
import Image from 'next/image'

const AboutMe = () => {

    return (
        <div className='py-10 mt-10'>
            <div className='pad-auto mb-6'>
                <div className='pad-auto mb-16'>
                    <p className=' md:mb-6 text-center text-red-400 '>About Me</p>
                    <h1 className='text-[32px] md:text-5xl text-center'>The person behind the code.</h1>
                </div>




                <p className='leading-8 text-center max-w-220 mx-auto  mt-8 md:mt-0'>I’m Ikechukwu Egwim, a proactive Frontend developer passionate about crafting smooth, dynamic web and mobile experiences. I specialize in React, Next.js, and Node.js, and enjoy solving complex problems with clean, efficient code.

                    When I’m not coding, I love exploring new ideas, listening to music, and traveling. I believe that with consistency and the right mindset, any challenge can be an opportunity to grow.

                </p>

                {/* <Image className='w-100 mx-auto' src={Aipics} alt='aboutImage' /> */}



                <TechStack />


            </div>



        </div>
    )
}

export default AboutMe