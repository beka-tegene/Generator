import { Add, Notifications, Search } from '@mui/icons-material'
import React from 'react'
import { Avatar, Box, Button, Menu, MenuItem, Modal } from '@mui/material'
import UserRegister from './UserRegister';
import GenRegister from './GenRegister';
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: '#F3EEEA',
    boxShadow: 10,
    borderRadius: 4,
};
const Navbar = () => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const [openModal, setOpenModal] = React.useState(false);
    const handleOpenModal = () => setOpenModal(true);
    const handleCloseModal = () => setOpenModal(false);

    const [openModalGen, setOpenModalGen] = React.useState(false);
    const handleOpenModalGen = () => setOpenModalGen(true);
    const handleCloseModalGen = () => setOpenModalGen(false);
    return (
        <div className='flex p-4 items-center gap-5 w-full bg-[#B0A695]'>
            <Button className=' cursor-pointer '
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
                sx={{ color: "#776B5D" }}
            >
                <Add /> New
            </Button>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                <MenuItem onClick={() => { handleClose(); handleOpenModalGen(); }}>Register Generator</MenuItem>
                <MenuItem onClick={() => { handleClose(); handleOpenModal(); }}>Register User</MenuItem>
            </Menu>
            <Modal
                open={openModal}
                onClose={handleCloseModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <UserRegister />
                </Box>
            </Modal>
            <Modal
                open={openModalGen}
                onClose={handleCloseModalGen}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <GenRegister />
                </Box>
            </Modal>
            <div className='flex-grow'></div>
            <div className='flex items-center border-[2px] gap-2 rounded bg-[#F3EEEA]'>
                <input
                    type={'text'}
                    placeholder={'Search'}
                    id={"search"}
                    name={'search'}
                    className='px-[20px] py-[6px] border-none outline-none bg-transparent'
                />
                <hr className='w-[1px] bg-[#b5b5b5] h-6' />
                <Search />
            </div>
            <div>
                <Notifications />
            </div>
            <div>
                <Avatar />
            </div>
        </div>
    )
}

export default Navbar