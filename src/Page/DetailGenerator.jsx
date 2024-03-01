import React from 'react'
import Sidebar from '../layout/Sidebar'
import Navbar from '../layout/Navbar'
import DetailGeneratorClient from '../client/DetailGeneratorClient'

const DetailGenerator = () => {
    return (
        <div className='w-full flex items-start justify-start'>
            <Sidebar />
            <div className='w-[85%] flex items-start justify-start flex-col'>
                <Navbar />
                <DetailGeneratorClient />
            </div>
        </div>
    )
}

export default DetailGenerator