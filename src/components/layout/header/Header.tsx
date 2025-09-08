'use client'

import { useEffect, useState } from 'react'
import { IoMenu } from "react-icons/io5";
import { IoClose } from "react-icons/io5";
import Link from 'next/link';
import MobileMenu from './MobileMenu';
import Button from '@/components/ui/Button';
import { usePathname } from 'next/navigation';
import LogoIcon from '@/components/ui/LogoIcon';

const Header = () => {
    const [menuOpen, setMenuOpen] = useState(false)
    const pathname = usePathname()

    const [docBody, setDocBody] = useState<HTMLElement | null>(null);

    useEffect(() => {
        setDocBody(document.body);
    }, []);

    const toggleScroll = () => {
        if (!docBody) return;
        docBody.classList.toggle("stop-scroll");
        console.log(docBody)
    };



    return (
        <header className='fixed inset-x-0 bg-background/30 backdrop-blur-xs top-0 isolation-auto z-99999'>
            <div className='flex justify-between items-center h-15  pad-auto'>
                <LogoIcon onClick={() => setMenuOpen(false)} />
                <div onClick={() => { setMenuOpen(!menuOpen), toggleScroll() }} className='flex gap-2 items-center md:hidden'>
                    <p className='text-lg leading-0'>Menu</p>
                    {menuOpen ? <IoClose className='w-5 h-5' /> : <IoMenu className='w-5 h-5' />}
                </div>




                <nav className='hidden md:block'>
                    <ul className='flex gap-4 items-center'>
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
                </nav>

                <div className='hidden md:block   cursor-pointer'>
                    <a target='_blank' href={"/Egwim_Ikechukwu_Resume.pdf"} >
                        <Button variant='white' className='rotate-10 transition duration-200 cursor-pointer hover:rotate-0'>Resume</Button>
                    </a>
                </div>


            </div>
            {
                !menuOpen ? "" : <MobileMenu menuOpen={menuOpen} setMenuOpen={setMenuOpen} toggleScroll={toggleScroll} />
            }


        </header>
    )
}

export default Header

const navLinks = [
    { name: "Portfolio", href: "/portfolio" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
];