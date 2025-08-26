"use client";
import Image from "next/image";
import Link from "next/link";


import LogoDark from "@/assets/logo.svg";

const LogoIcon = ({ size = 80, onClick }: { size?: number, onClick?: (item: boolean) => void }) => {



    return (
        <Link href={"/"}>
            <Image
                onClick={() => onClick}
                width={size}
                height={size}
                src={LogoDark}
                alt="Logo"
                priority
            />
        </Link>
    );
};

export default LogoIcon;
