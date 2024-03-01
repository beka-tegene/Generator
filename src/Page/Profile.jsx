import React from 'react'
import Sidebar from '../layout/Sidebar'
import Navbar from '../layout/Navbar'
import ProfileClient from '../client/ProfileClient'

const Profile = () => {
    return (
        <div className='w-full flex items-start justify-start'>
            <Sidebar />
            <div className='w-[85%] flex items-start justify-start flex-col'>
                <Navbar />
                <ProfileClient />
            </div>
        </div>
    )
}

export default Profile