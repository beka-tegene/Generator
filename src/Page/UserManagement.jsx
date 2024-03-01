import React from 'react'
import Sidebar from '../layout/Sidebar'
import Navbar from '../layout/Navbar'
import UserManagementClient from '../client/UserManagementClient'

const UserManagement = () => {
    return (
        <div className='w-full flex items-start justify-start'>
            <Sidebar />
            <div className='w-[85%] flex items-start justify-start flex-col'>
                <Navbar />
                <UserManagementClient />
            </div>
        </div>
    )
}

export default UserManagement