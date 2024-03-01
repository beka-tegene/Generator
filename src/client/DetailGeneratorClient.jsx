import React, { useEffect } from 'react'
import DataTable from 'react-data-table-component'
import { IconButton, Menu, MenuItem } from '@mui/material'
import { Add, Delete, Edit, MoreHoriz } from '@mui/icons-material'
import { useDispatch, useSelector } from 'react-redux'
import { getByIdRegisterGenData } from '../Store/Hook/GenHook'
import { useParams } from 'react-router-dom'
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
const DetailGeneratorClient = () => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const { id } = useParams();
    const dispatch = useDispatch();
    const allGen = useSelector((state) => state.GenHook.OutputByIdRegisterGen);
    useEffect(() => {
        dispatch(getByIdRegisterGenData({ data: { id } }));
    }, []);
    console.log(allGen);
    const columns = [
        {
            name: "Service Date",
            selector: (row) => (
                <span>
                    {new Date(row?.service_date).toLocaleDateString("en-US")}
                </span>
            ),
            sortable: true,
        },
        {
            name: "Work Hours",
            selector: (row) => row?.workhour,
            sortable: true,
        },
        {
            name: "Details",
            selector: (row) => row?.details,
            sortable: true,
        },
        {
            name: "Action",
            cell: (row) => (
                <>
                    <MoreHoriz style={{ fill: '#654654' }} id="basic-button"
                        aria-controls={open ? 'basic-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        onClick={handleClick} />
                    <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        MenuListProps={{
                            'aria-labelledby': 'basic-button',
                        }}
                    >
                        <MenuItem sx={{ color: '#3f51b5', fontSize: "11px" }}><Edit sx={{ color: '#3f51b5', fontSize: "11px" }} /> Edit</MenuItem>
                        <MenuItem onClick={handleClose} sx={{ color: '#e91e63', fontSize: "11px" }}><Delete sx={{ color: '#e91e63', fontSize: "11px" }} /> Delete</MenuItem>
                    </Menu>
                </>
            ),
            width: '55px',
            style: {
                borderBottom: '1px solid #FFFFFF',
            }
        },
    ];
    const customStyle = {
        rows: {
            style: {
                cursor: "pointer",
                backgroundColor: "#ededed",
                color: "#272727",
                "&:hover": {
                    backgroundColor: "#D2CDC3",
                    color: "#fff",
                },
            },
        },
        headCells: {
            style: {
                borderRadius: 2,
                backgroundColor: "#D2CDC3",
                color: "#fff",
            },
        },
    };
    return (
        <div className='w-[70%] m-auto flex flex-col gap-8 border-2 rounded p-2 px-10 my-2 relative bg-[#F9F9F9]'>
             <ToastContainer />
            <div className=' absolute w-[50px] h-[50px] bg-[#FFFFFF] rounded-[50%] left-0 top-[55%] translate-x-[-50%] translate-y-[-50%] border-r-2'></div>
            <div className=' absolute w-[50px] h-[50px] bg-[#FFFFFF] rounded-[50%] right-0 top-[55%] translate-x-[50%] translate-y-[-50%] border-l-2'></div>
            <p className='text-[24px] font-semibold text-[#B0A695]'>Generator detail information</p>
            <div >
                <p className='text-[18px] font-normal text-[#b7b6b4] border-solid border-b-2 border-[#b7b6b4]'>Detail</p>
                <div className='grid grid-cols-2 w-full gap-4'>
                    <div>
                        <span className='font-normal text-[#b7b6b4] border-solid border-b-2 '>Manufacture : </span>
                        <span> {allGen?.model_manufactural}</span>
                    </div>
                    <div>
                        <span className='font-normal text-[#b7b6b4] border-solid border-b-2 '>Model Number : </span>
                        <span> {allGen?.model_number}</span>
                    </div>
                    <div>
                        <span className='font-normal text-[#b7b6b4] border-solid border-b-2 '>Serial Number : </span>
                        <span> {allGen?.serial_number}</span>
                    </div>
                    <div>
                        <span className='font-normal text-[#b7b6b4] border-solid border-b-2 '>Capacity : </span>
                        <span> {allGen?.capacity}</span>
                    </div>
                    <div>
                        <span className='font-normal text-[#b7b6b4] border-solid border-b-2 '>Engine oil Capacity : </span>
                        <span> {allGen?.engine_oil_capacity}</span>
                    </div>
                    <div>
                        <span className='font-normal text-[#b7b6b4] border-solid border-b-2 '>Coolant Capacity : </span>
                        <span> {allGen?.coolant_capacity}</span>
                    </div>
                    <div>
                        <span className='font-normal text-[#b7b6b4] border-solid border-b-2 '>Battery Capacity : </span>
                        <span> {allGen?.battery_capacity}</span>
                    </div>
                    <div>
                        <span className='font-normal text-[#b7b6b4] border-solid border-b-2 '>Installation Date : </span>
                        <span> {allGen?.installation_date}</span>
                    </div>
                </div>
            </div>
            <div>
                <p className='text-[18px] font-normal text-[#b7b6b4] border-solid border-b-2 border-[#b7b6b4]'>Location</p>
                <div className='grid grid-cols-2 w-full gap-4'>
                    <div>
                        <span className='font-normal text-[#b7b6b4] border-solid border-b-2 '>Coordinates : </span>
                        <span> [{allGen?.coordinates?.[0]} , {allGen?.coordinates?.[1]}]</span>
                    </div>
                    <div>
                        <span className='font-normal text-[#b7b6b4] border-solid border-b-2 '>Region : </span>
                        <span> {allGen?.Region}</span>
                    </div>
                    <div>
                        <span className='font-normal text-[#b7b6b4] border-solid border-b-2 '>District : </span>
                        <span> {allGen?.district}</span>
                    </div>
                    <div>
                        <span className='font-normal text-[#b7b6b4] border-solid border-b-2 '>Pictures</span>
                        <div className='grid grid-cols-2 w-full gap-2'>
                            {allGen?.pictures?.map((item, index) => (
                                <div key={index}>
                                    <img src={item} alt={`pic - ${index}`} className='w-full h-auto' />
                                </div>
                            ))}
                        </div>

                    </div>
                </div>
            </div>
            <div>
                <div className='flex items-center border-solid border-b-2 border-[#b7b6b4]'>
                    <p className='text-[18px] font-normal text-[#b7b6b4] '>Service History</p>
                    <div className='flex-grow'></div>
                    <IconButton>
                        <Add />
                    </IconButton>
                </div>
                <div className='m-auto flex flex-col items-end justify-start'>
                    <DataTable
                        columns={columns}
                        data={allGen?.service_history}
                        fixedHeader
                        pagination
                        selectableRows
                        customStyles={customStyle}
                        onRowClicked={(row) => rowHandler(row)}
                    />
                </div>
            </div>
        </div>
    )
}

export default DetailGeneratorClient