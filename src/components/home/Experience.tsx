import { experiences } from '@/data/experiences'
import React from 'react'

const Experience = () => {
    return (
        <div className='pt-10 '>
            <div className='pad-auto mb-6'>
                <p className='mb-6 px-4 py-2 bg-gradient-to-r from-white/20  to-white/0 w-fit '>Experience</p>
                <div className='md:flex justify-between items-start'>
                    <h1 className='text-[32px] md:text-5xl max-w-80 md:max-w-140 md:leading-16 mb-4'>My Most Recent Experiences </h1>
                </div>
            </div>
            <div className='grid'>
                {
                    experiences.slice(0, 1).map((item, index) => (
                        <div key={index} className={`${index % 2 === 0 ? "bg-white/2 " : ""} pad-auto py-6 md:py-1 md:grid md:grid-cols-[5fr_4fr] md:items-center`}>
                            <div className='mb-4 lg:mb-0'>
                                <h3 className='font-bold mb-2 text-lg md:text-xl'>{item.role} at {item.company} ({item.type})</h3>
                                <p className='text-white/70'>{item.description}</p>
                            </div>

                            <div>
                                <p className='text-right md:text-2xl font-bold'>{item.year}</p>
                            </div>
                        </div>
                    ))
                }

            </div>

        </div>
    )
}

export default Experience



