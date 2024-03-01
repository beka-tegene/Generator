import { Delete, Edit, MoreHoriz, PersonPin } from '@mui/icons-material';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Menu, MenuItem, Modal } from '@mui/material';
import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component';
import { useDispatch, useSelector } from 'react-redux';
import { getUserData, setDeleteIdUser } from '../Store/Hook/UserHook';
import jwt_decode from "jwt-decode";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import UserRegister from '../layout/UserRegister';
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: '#F3EEEA',
    boxShadow: 10,
    borderRadius: 4,
};
const UserManagementClient = () => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const dispatch = useDispatch();
    const token = Cookies.get("token");
    const detoken = jwt_decode(token);
    const userId = detoken?.userId;
    const allUser = useSelector((state) => state.UserHook.OutputUser);
    useEffect(() => {
        dispatch(getUserData());
    }, []);
    const filterUser = allUser?.filter((item) => item._id !== userId);
    const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
    const [deleteItemId, setDeleteItemId] = useState(null);
    const deleteHandler = (_id) => {
        setDeleteItemId(_id);
        setDeleteConfirmationOpen(true);
    };
    const [editData, setEditData] = useState();
    const [openModal, setOpenModal] = useState(false);
    const handleOpenModal = (row) => {
        setEditData(row);
        setOpenModal(true);
    };
    const handleCloseModal = () => setOpenModal(false);
    const columns = [
        {
            cell: () => <PersonPin style={{ fill: '#654654' }} />,
            width: '55px',
            style: {
                borderBottom: '1px solid #FFFFFF',
            },
        },
        {
            name: "Name",
            selector: (row) => row?.fullname,
            sortable: true,
        },
        {
            name: "Position",
            selector: (row) => row?.position,
            sortable: true,
        },
        {
            name: "Email",
            selector: (row) => row?.email,
            sortable: true,
        },
        {
            name: "Role",
            selector: (row) => row?.role,
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
                        <MenuItem
                            sx={{ color: '#3f51b5', fontSize: "11px" }}
                            onClick={() => {
                                handleOpenModal(() => row);
                                handleClose();
                            }}
                        >
                            <Edit
                                sx={{ color: '#3f51b5', fontSize: "11px" }}
                            />
                            Edit
                        </MenuItem>
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
        dispatch(setDeleteIdUser({ data: { id: deleteItemId } }));
        setDeleteConfirmationOpen(false);
    };
    return (
        <div className='h-[89vh] w-full px-4 pt-2'>
            <ToastContainer />
            <div>
                <h1 className='text-[24px] font-medium'>User list</h1>
            </div>
            <div className='m-auto flex flex-col items-end justify-start'>
                <DataTable
                    columns={columns}
                    data={filterUser}
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
                <DialogTitle>Users Deletion</DialogTitle>
                <DialogContent>
                    Are you sure you want to delete this User Information?
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
                open={openModal}
                onClose={handleCloseModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <UserRegister editData={editData} />
                </Box>
            </Modal>
        </div>
    )
}

export default UserManagementClient