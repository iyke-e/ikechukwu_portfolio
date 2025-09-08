import React from 'react';
import Link from 'next/link';
import Button from '@/components/ui/Button';
import { FaGithub } from 'react-icons/fa';
import { LuExternalLink } from 'react-icons/lu';

interface MProjectProps {
    project: {
        name: string;
        description: string;
        sourceUrl: string;
        liveUrl: string;
    }[];
    activeIndex: number;
    readMoreUrl?: string; // optional prop for the Read More link
}

const MProject: React.FC<MProjectProps> = ({ project, activeIndex, readMoreUrl = '/' }) => {
    const activeProject = project[activeIndex];

    return (
        <div className="flex flex-col pad-auto justify-between gap-8 py-10">
            <div>
                <ul className='flex items-center justify-end gap-4 cursor-pointer'>
                    <li>
                        <a target='_blank' rel="noopener noreferrer" href={activeProject.sourceUrl} className='flex items-center gap-4'>
                            <FaGithub className='w-8 h-8' />
                        </a>
                    </li>
                    <li>
                        <a target='_blank' rel="noopener noreferrer" href={activeProject.liveUrl} className='flex items-center gap-4'>
                            <LuExternalLink className="w-8 h-8 hover:scale-110 transition" />
                        </a>
                    </li>
                </ul>
                <p className="text-white mb-2"> Featured Project</p>
                <h2 className="text-3xl line-clamp-1 font-semibold mb-2">
                    {activeProject.name}
                </h2>
                <p className='line-clamp-2'>{activeProject.description}</p>
            </div>
            <div>
                <Link href={readMoreUrl}>
                    <Button>Read More</Button>
                </Link>
            </div>
        </div>
    );
};

export default MProject;
