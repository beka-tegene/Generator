import { Delete, Edit, Info, MoreHoriz, OfflineBolt } from '@mui/icons-material';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Menu, MenuItem, Modal } from '@mui/material';
import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component';
import { useNavigate } from 'react-router-dom';
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { getRegisterGenData, setDeleteIdGen } from '../Store/Hook/GenHook';
import { useDispatch, useSelector } from 'react-redux';
import GenRegister from '../layout/GenRegister';
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: '#F3EEEA',
    boxShadow: 10,
    borderRadius: 4,
};
const TableClient = (props) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedRowId, setSelectedRowId] = useState(null);
    const navigate = useNavigate()
    const open = Boolean(anchorEl);
    const handleClick = (event, rowId) => {
        setAnchorEl(event.currentTarget);
        setSelectedRowId(rowId);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const dispatch = useDispatch();
    const allGen = useSelector((state) => state.GenHook.OutputRegisterGen);
    useEffect(() => {
        dispatch(getRegisterGenData());
    }, []);
    const filteredSideBar = allGen.filter((item) => {
        if (props.maps) {
            return (
                item.Region.includes(props.maps.region) ||
                item.district.includes(props.maps.districtName) ||
                item.serial_number.includes(props.maps.serial_number)
            );
        }
        return true;
    });
    const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
    const [deleteItemId, setDeleteItemId] = useState(null);
    const deleteHandler = (_id) => {
        setDeleteItemId(_id);
        setDeleteConfirmationOpen(true);
    };
    const [editData, setEditData] = useState();
    const [openModalGen, setOpenModalGen] = React.useState(false);
    const handleOpenModalGen = (row) => {
        setEditData(row);
        setOpenModalGen(true);
    };
    const handleCloseModalGen = () => setOpenModalGen(false);
    const columns = [
        {
            cell: () => <OfflineBolt style={{ fill: '#654654' }} />,
            width: '55px',
            style: {
                borderBottom: '1px solid #FFFFFF',
            },
        },
        {
            name: "Model Manufacture",
            selector: (row) => row?.model_manufactural,
            sortable: true,
        },
        {
            name: "Model Number",
            selector: (row) => row?.model_number,
            sortable: true,
        },
        {
            name: "Region",
            selector: (row) => row?.Region,
            sortable: true,
        },
        {
            name: "District",
            selector: (row) => row?.district,
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
                        onClick={(e) => handleClick(e, row._id)} />
                    <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        MenuListProps={{
                            'aria-labelledby': 'basic-button',
                        }}
                    >
                        <MenuItem onClick={() => navigate(`/table/${encodeURIComponent(selectedRowId)}/detail`)} sx={{ color: '#fff374', fontSize: "11px" }}><Info sx={{ color: '#fff374', fontSize: "11px" }} /> View</MenuItem>
                        <MenuItem sx={{ color: '#3f51b5', fontSize: "11px" }}
                            onClick={() => {
                                handleOpenModalGen(() => row);
                                handleClose();
                            }}
                        ><Edit sx={{ color: '#3f51b5', fontSize: "11px" }} /> Edit</MenuItem>
                        <MenuItem onClick={() => { handleClose(); deleteHandler(row._id); }} sx={{ color: '#e91e63', fontSize: "11px" }}><Delete sx={{ color: '#e91e63', fontSize: "11px" }} /> Delete</MenuItem>
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
    const handleDeleteConfirmation = () => {
        dispatch(setDeleteIdGen({ data: { id: deleteItemId } }));
        setDeleteConfirmationOpen(false);
    };
    return (
        <div className='h-[89vh] w-full px-4 pt-2'>
            <ToastContainer />
            <div>
                <h1 className='text-[24px] font-medium'>Generator list</h1>
            </div>
            <div className='m-auto flex flex-col items-end justify-start'>
                <DataTable
                    columns={columns}
                    data={filteredSideBar}
                    fixedHeader
                    pagination
                    selectableRows
                    customStyles={customStyle}
                    onRowClicked={(row) => rowHandler(row)}
                />
            </div>
            <Dialog
                open={deleteConfirmationOpen}
                onClose={() => setDeleteConfirmationOpen(false)}
                aria-labelledby="delete-confirmation-dialog"
            >
                <DialogTitle>Generator Deletion</DialogTitle>
                <DialogContent>
                    Are you sure you want to delete this Generator Information?
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={() => setDeleteConfirmationOpen(false)}
                        color="primary"
                    >
                        No
                    </Button>
                    <Button onClick={handleDeleteConfirmation} color="error">
                        Yes
                    </Button>
                </DialogActions>
            </Dialog>
            <Modal
                open={openModalGen}
                onClose={handleCloseModalGen}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <GenRegister editData={editData}/>
                </Box>
            </Modal>
        </div>
    )
}

export default TableClient