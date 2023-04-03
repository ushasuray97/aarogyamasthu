import  React,{useEffect} from 'react';
import { Button, Box, Typography, Grid } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import { useSelector, useDispatch } from "react-redux";
//custom files
import { ManageUserStyles } from './ManageUserStyles';
import { deleteUser, clearStateDelete } from "../../../../store/reducers/resourceAllocation/manageUser/deleteUserSlice";


export default function DeletePopup({ deleteUserOpen, setdeleteUserOpen, trigerDialog }) {
    const dispatch = useDispatch();
    const { isSuccessDelete } = useSelector((state) => state.deleteUser);

    const handleDelete = () => {
        dispatch(deleteUser({ id: trigerDialog }));
    }
    const handleClose = () => {
        setdeleteUserOpen(false);
    };
 useEffect(() => {
        if (isSuccessDelete) {
            setdeleteUserOpen(false);
            dispatch(clearStateDelete());
        }
    }, [isSuccessDelete])
    return (
        <Box>
            <Dialog
                open={deleteUserOpen}
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
                    <Box sx={ManageUserStyles.deleteMain}>
                        <Typography align='center' >Are you Sure you want to Delete</Typography>
                    </Box>
                    <Box container spacing={0} sx={ManageUserStyles.delAddBtn} >
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