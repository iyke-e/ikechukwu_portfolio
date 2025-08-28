"use client"

import React, { useState } from 'react'
import Aipics from "@/assets/iyke.jpg"
import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa6";
import ProfileCard from '../ui/animations/ProfileCard';
import { useRouter } from 'next/navigation';

const MyStory = () => {
    const [showMore, setShowMore] = useState(false);
    const router = useRouter()

    const handleToggle = () => setShowMore(!showMore);
    return (
        <div className='grid md:grid-cols-[3fr_2fr] gap-6 md:gap-16 '>

            <ProfileCard
                name="Egwim Iyke"
                title="Frontend Developer"
                handle="IykeCodes"
                status="Online"
                contactText="Contact Me"
                avatarUrl="/iyke.jpg"
                showUserInfo={true}
                enableTilt={true}
                enableMobileTilt={false}
                onContactClick={() => router.push("/contact")}
                className=' md:order-2 mx-auto md:block'
            />

            <div className='md:order-1'>
                {/* Always visible intro */}
                <p className='text-lg leading-8 mt-6'>
                    Hey there again! You probably know my name by now, but I’m Ikechukwu Egwim. I’m a Computer Science graduate and frontend developer obsessed with crafting smooth, interactive digital experiences. I love solving tricky problems and turning messy code into something elegant and efficient.
                </p>

                <p className='text-lg leading-8 mt-4'>
                    Professionally, I build web and mobile apps using <strong>React, Next.js, and Node.js</strong>. From designing responsive interfaces to integrating APIs, I thrive on projects that challenge me to think creatively and code thoughtfully.
                </p>

                {/* Collapsible content */}
                {showMore && (
                    <>
                        <p className='text-lg leading-8 mt-4'>
                            My journey into tech began in 2019, right after finishing high school. Back then, I had no experience and didn’t even own a laptop. My first job as a computer operator taught me basic Microsoft tools and a bit of graphic design, but everything changed when my cousin gave me her old laptop and introduced me to coding. I started with Python, learning the basics, but soon discovered a YouTube tutorial on building simple web pages with HTML and CSS—and I was hooked.
                        </p>

                        <p className='text-lg leading-8 mt-4'>
                            Post-COVID, I gained admission into university to study Computer Science, completed two internships, and I’m currently enrolled in a mobile development training program at Rise. Every challenge taught me something new, and I continue to push myself to grow and improve every day.
                        </p>

                        <p className='text-lg leading-8 mt-4'>
                            When I step away from the screen, I dive into things that keep me inspired and energized:
                        </p>

                        <ul className='list-none mt-2 flex flex-col gap-3'>
                            <li className='ml-4 pl-4 list-disc'> I love listening to music; it has seen me through so many stages of life, and I always have a song for every mood.</li>
                            <li className='ml-4 pl-4 list-disc'>Gaming is my go-to way to unwind, especially console games like PES 5 and other soccer titles.</li>
                            <li className='ml-4 pl-4 list-disc'>I enjoy driving and exploring new roads and cities—it gives me perspective and a sense of adventure.</li>
                            <li className='ml-4 pl-4 list-disc'>I’m always on the lookout for great food, discovering new restaurants and unique dishes along the way.</li>
                            <li className='ml-4 pl-4 list-disc'>Sleek and well-designed cars always catch my eye, and I love learning about them whenever I can.</li>
                            <li className='ml-4 pl-4 list-disc'>I enjoy tech gadgets that make life easier and add a bit of fun to everyday routines.</li>
                        </ul>

                        <p className='text-lg leading-8 mt-4'>
                            Fun fact: I’m not very social and usually get tired after a few hours of hanging out. I can play a bit of drums and keyboard, and I find random songs in other languages surprisingly interesting!
                        </p>
                    </>
                )}

                <div className='grid place-content-end'>
                    <button
                        onClick={handleToggle}
                        className='mt-4 text-blue-300 cursor-pointer hover:underline font-medium'
                    >
                        {showMore ? 'Show Less' : 'Read More'}
                    </button>

                </div>


                {/* Social links (always visible) */}
                <ul className='flex items-center mt-4 gap-4 cursor-pointer'>
                    <li className='w-fit'>
                        <a target='_blank' href="https://github.com/iyke-e" className='flex items-center gap-4'>
                            <FaGithub className='w-8 h-8' />
                        </a>
                    </li>
                    <li className='w-fit'>
                        <a target='_blank' href="https://linkedin.com/in/iyke-gp" className='flex items-center gap-4'>
                            <FaLinkedin className='w-8 h-8' />
                        </a>
                    </li>
                </ul>
            </div>

        </div>
    )
}

export default MyStory