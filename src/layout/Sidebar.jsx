import React, { useEffect, useState } from 'react'
import logo from '../assets/logo.png'
import { Link, useMatch } from 'react-router-dom'
import { ArrowDropDown, ArrowDropUp, Circle, Dashboard, List, ManageAccounts, Map, People } from '@mui/icons-material';
import { Avatar } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { getRegisterGenData } from '../Store/Hook/GenHook';
const Sidebar = (props) => {
    const dashboard = useMatch('/dashboard')
    const map = useMatch('/map')
    const table = useMatch('/table')
    const user = useMatch('/user/management')
    const profile = useMatch('/account/profile')
    const [isMapDropdownOpen, setMapDropdownOpen] = useState(false);
    const [isDistrictDropdownOpen, setDistrictDropdownOpen] = useState(false);
    const [useData, setUseData] = useState();
    const [useDataDistrict, setUseDataDistrict] = useState();
    const toggleMapDropdown = (index, region, districts) => {
        props?.handlerMap({ region, districts })
        setMapDropdownOpen(!isMapDropdownOpen);
        setUseData(index)
        setDistrictDropdownOpen(false);
    };

    const toggleDistrictDropdown = (subIndex, districtName, districtData) => {
        props?.handlerMap({ districtName, districtData })
        setDistrictDropdownOpen(!isDistrictDropdownOpen);
        setUseDataDistrict(subIndex)
    };
    const allGen = useSelector((state) => state.GenHook.OutputRegisterGen);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getRegisterGenData());
    }, []);
    const groupedData = {};

    allGen.forEach((item) => {
        if (!groupedData[item.Region]) {
            groupedData[item.Region] = {};
        }

        if (!groupedData[item.Region][item.district]) {
            groupedData[item.Region][item.district] = {
                coordinates: [],
                serial_number: [],
            };
        }
        groupedData[item.Region][item.district].serial_number.push(item.serial_number);
        groupedData[item.Region][item.district].coordinates.push(item.coordinates);
    });
    return (
        <div className='sticky top-0 w-[245px] h-screen bg-[#776B5D] flex flex-col items-start justify-start gap-2 '>
            <div className='flex items-center justify-start gap-4 w-full p-2'>
                <img src={logo} alt="logo" className='w-[50px]' />
                <h1 className='text-[17px]'>GeneratorX</h1>
            </div>
            <div className='flex flex-col items-start justify-start gap-2 w-full pl-2 p-2'>
                <p className='text-[#929292]'>main</p>
                <ul className='w-full flex flex-col items-start justify-start gap-2'>
                    <li className='pl-2 w-full'>
                        <Link to='/dashboard' className={`flex items-start justify-start gap-3 p-1 ${dashboard ? 'bg-[#F3EEEA] text-[#776B5D] rounded' : 'text-[#F3EEEA]'}`} ><Dashboard /> Dashboard</Link>
                    </li>
                    <li className='pl-2 w-full'>
                        <Link to='/map' className={`flex items-start justify-start gap-3 p-1 ${map ? 'bg-[#F3EEEA] text-[#776B5D] rounded' : 'text-[#F3EEEA]'}`}><Map /> Map's</Link>
                    </li>
                    <li className='pl-2 w-full'>
                        <Link to='/table' className={`flex items-start justify-start gap-3 p-1 ${table ? 'bg-[#F3EEEA] text-[#776B5D] rounded' : 'text-[#F3EEEA]'}`}><List /> Table List</Link>
                    </li>
                    <li className='pl-2 w-full'>
                        <Link to='/user/management' className={`flex items-start justify-start gap-3 p-1 ${user ? 'bg-[#F3EEEA] text-[#776B5D] rounded' : 'text-[#F3EEEA]'}`}><People /> User Management</Link>
                    </li>
                    <li className='pl-2 w-full'>
                        <Link to='/account/profile' className={`flex items-start justify-start gap-3 p-1 ${profile ? 'bg-[#F3EEEA] text-[#776B5D] rounded' : 'text-[#F3EEEA]'}`}><ManageAccounts /> My Account</Link>
                    </li>
                </ul>
                {(table || map) && (
                    <>
                        <p className='text-[#929292]'>map</p>
                        <ul className='w-full h-[40vh] overflow-y-scroll bg-[#685c5080] rounded'>
                            {Object?.entries(groupedData)?.map(([region, districts], index) => (
                                <li className='flex items-start justify-start gap-2 pl-2 flex-col text-[15px]' key={index}>
                                    <Link onClick={() => { toggleMapDropdown(index, region, districts) }} className='flex items-start justify-start w-full text-[#F3EEEA] rounded'>
                                        {region}
                                        <div className='flex-grow'></div>
                                        {(!isMapDropdownOpen && (useData === index)) ? <ArrowDropDown /> : <ArrowDropUp />}
                                    </Link>
                                    {isMapDropdownOpen && useData === index && (
                                        <ul className='w-full'>
                                            {Object.entries(districts)?.map(([districtName, districtData], subIndex) => (
                                                <li className='flex items-start justify-start gap-2 pl-2 flex-col text-[14px]' key={subIndex}>
                                                    <Link onClick={() => { toggleDistrictDropdown(subIndex, districtName, districtData) }} className='flex items-start justify-start w-full text-[#F3EEEA] rounded'>
                                                        {districtName}
                                                        <div className='flex-grow'></div>
                                                        {!isDistrictDropdownOpen && useDataDistrict === subIndex ? <ArrowDropDown /> : <ArrowDropUp />}
                                                    </Link>
                                                    {isDistrictDropdownOpen && useDataDistrict === subIndex && (
                                                        <ul className='w-full'>
                                                            {districtData.serial_number.map((serial_number, coordinateIndex) => (
                                                                <li className='flex items-start justify-start gap-2 pl-2 flex-col text-[13px]' key={coordinateIndex}><Link className='w-full text-[#F3EEEA] rounded' onClick={() => props?.handlerMap({ serial_number, districtData })}>{serial_number}</Link></li>
                                                            ))}
                                                        </ul>
                                                    )}
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </>
                )}
            </div>
            <div className='w-full h-[10vh] absolute bottom-0 flex items-center justify-start pl-3 gap-2'>
                <Avatar />
                <div>
                    <p className='text-[#2f2b27] text-[15px]'>Welcome, Beka Tegene</p>
                    <p className='text-[14px] flex items-center justify-start gap-1'><Circle className='text-[#45c868]' sx={{ fontSize: "12px" }} />online</p>
                </div>
            </div>
        </div>
    )
}

export default Sidebar