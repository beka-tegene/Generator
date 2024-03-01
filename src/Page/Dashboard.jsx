import React from 'react'
import Sidebar from '../layout/Sidebar'
import Navbar from '../layout/Navbar'
import DashboardClient from '../client/DashboardClient'

const Dashboard = () => {
  return (
    <div className='w-full flex items-start justify-start'>
      <Sidebar />
      <div className='w-[85%] flex items-start justify-start flex-col'>
        <Navbar />
        <DashboardClient />
      </div>
    </div>
  )
}

export default Dashboard