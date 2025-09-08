import React from 'react'
import ProjectAnimatedSection from './old/ProjectAnimatedSection'
import Button from '@/components/ui/Button'
import Link from 'next/link'
import ProjectSection from './ProjectSection'

const Projects = () => {
    return (
        <div className='py-20'>
            <div className='pad-auto'>
                <div className='pad-auto mb-16'>
                    <p className=' md:mb-6 text-green-500 text-center'>Porfolio</p>
                    <h1 className='text-[32px] md:text-5xl text-center'>Recent Case Studies </h1>
                </div>


            </div>
            {/* <ProjectAnimatedSection /> */}
            <ProjectSection />

            <div className="grid mt-6 place-content-center">
                <Link href="/portfolio">
                    <Button variant='white'>View More</Button>

                </Link>
            </div>


        </div>
    )
}

export default Projects