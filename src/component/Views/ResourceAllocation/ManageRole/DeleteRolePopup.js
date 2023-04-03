import React,{useEffect} from 'react';
import { Button, Box, Typography, Grid } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import { useSelector, useDispatch } from "react-redux";
//custom files
import { ManageRoleStyles } from './ManageRoleStyles';
import { deleteManageRole, clearStateDelete } from '../../../../store/reducers/resourceAllocation/manageRole/DeleteManageRole';


export default function DeleteRolePopup({ deleteRole,setDeleteRole, trigerDialog }) {
    const dispatch = useDispatch();
    const {  isSuccessDelete } = useSelector((state) => state.deleteManageRole);
    const handleDelete = () => {
        dispatch(deleteManageRole({ id: trigerDialog }));
    }
    const handleClose = () => {
        setDeleteRole(false);
    };
    useEffect(() => {
        if (isSuccessDelete) {
            setDeleteRole(false);
            dispatch(clearStateDelete());
        }
    }, [isSuccessDelete])
    return (
        <Box>
            <Dialog
                open={deleteRole}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
                PaperProps={{
                    style: {
                        width: "400px",
                        height: "200px",
                        borderRadius: "1.5rem"
                    }
                }}
            >
                <Box >
                    <Box sx={ManageRoleStyles.deleteMain}>
                        <Typography align='center' >Are you Sure you want to Delete</Typography>
                    </Box>
                    <Box container spacing={0} sx={ManageRoleStyles.delAddBtn} >
                        <Button variant="contained" color="error" onClick={handleDelete} >
                            Delete
                        </Button>
                        <Button variant="contained" color="inherit" sx={{ ml: 2 }} onClick={handleClose} >
                            keep
                        </Button>
                    </Box>
                </Box>
            </Dialog>
        </Box>
    );
}