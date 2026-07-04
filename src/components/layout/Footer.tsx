"use client"

import React from 'react'
import LogoIcon from '../ui/LogoIcon'
import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa6";
import { TfiEmail } from "react-icons/tfi";
import Link from 'next/link';
import ThemeToggle from '../ui/ThemeToggle';
import { usePathname } from 'next/navigation';

const Footer = () => {
    const pathname = usePathname()


    return (
        <div className='border-t border-white/20 pt-10 w-full'>
            <div className='w-full max-w-[1400px] mx-auto px-4 md:px-8 pb-4'>
                <div className='mb-16'>
                    <LogoIcon size={100} />
                </div>

                <div className=' space-y-16'>

                    <ul className=' space-y-3 items-center cursor-pointer'>

                        <li className='w-fit '>
                            <a target='_blank' href="https://github.com/iyke-e" className='flex items-center gap-4'>
                                <FaGithub className='w-8 h-8' />
                                <span>github.com/iyke-e</span>
                            </a>
                        </li>
                        <li className='w-fit'>
                            <a target='_blank' href="https://www.linkedin.com/in/iyke-gp" className='flex items-center gap-4'>
                                <FaLinkedin className='w-8 h-8' />
                                <p>linkedin.com/in/iyke-gp</p>
                            </a>
                        </li>
                        <li className='flex items-center gap-4 w-fit'>
                            <TfiEmail className='w-8 h-8' />
                            <p>egwimikechukwu.gp@gmail.com</p>

                        </li>

                    </ul>


                    <ul className='flex gap-4 justify-end items-center'>
                        {navLinks.map((link) => {
                            const isActive = pathname === link.href;
                            return (
                                <li key={link.href}
                                >
                                    <Link
                                        href={link.href}
                                        className={`${isActive ? "text-accent" : ""
                                            } hover:text-accent-hover text-sm px-4 py-2 rounded-lg transition duration-600`}
                                    >
                                        {link.name}
                                    </Link>
                                </li>

                            );
                        })}
                    </ul>
                </div>

            </div>
            <div className='border-t py-4 border-white/20 w-full'>
                <div className='flex text-center gap-2 flex-col-reverse md:flex-row md:justify-between w-full max-w-[1400px] mx-auto px-4 md:px-8'>
                    <p >All Rights Reserved &copy; iykee 2025</p>
                </div>
            </div>
        </div>
    )
}

export default Footer

const navLinks = [
    { name: "Portfolio", href: "#portfolio" },
    { name: "About", href: "#about" },
    { name: "Contact", href: "#contact" },
];