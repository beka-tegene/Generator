import { Avatar } from '@mui/material';
import React from 'react'
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
const DashboardClient = () => {
    const ReportData = [
        {
            name: "Generator",
            Count: 12,
        },
        {
            name: "User",
            Count: 15,
        },
        {
            name: "Region",
            Count: 3,
        },
    ];
    return (
        <div className='w-full pt-2 px-6 '>
            <ToastContainer />
            <div className='flex items-start justify-start gap-6 pb-4'>
                {ReportData.map((item, index) => (
                    <div className='flex-grow bg-[#B0A69590] p-2  flex items-center justify-start gap-4' key={index}>
                        <Avatar />
                        <div className='w-full'>
                            <h1>{item.name}</h1>
                            <p>{item.Count}</p>
                        </div>
                    </div>
                ))}
            </div>
            <div className='flex items-start justify-start gap-6 pb-4'>
                {ReportData.map((item, index) => (
                    <div className='flex-grow bg-[#B0A69590] p-2  flex items-start justify-start gap-4 h-[50vh]' key={index}>
                        <Avatar />
                        <div className='w-full'>
                            <h1>{item.name}</h1>
                            <p>{item.Count}</p>
                        </div>
                    </div>
                ))}
            </div>
            <div className='flex items-start justify-start gap-6 pb-4'>
                <div className='flex-grow bg-[#B0A69590] p-2  flex items-start justify-start gap-4 h-[25vh]'>
                    <Avatar />
                    <div className='w-full'>
                        <h1>ewre</h1>
                        <p>454</p>
                    </div>
                </div>
                <div className='flex-grow bg-[#B0A69590] p-2  flex items-start justify-start gap-4 h-[25vh]'>
                    <Avatar />
                    <div className='w-full'>
                        <h1>ewre</h1>
                        <p>454</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DashboardClient