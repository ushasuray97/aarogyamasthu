import React , { useEffect, useState }  from 'react';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { TableContainer, Paper, Table, TableHead, TableRow, Box, TableBody, TableCell } from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';
import EditIcon from '@mui/icons-material/Edit';
import Tooltip from '@mui/material/Tooltip';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import { useSelector, useDispatch } from "react-redux";
//custom files
import { ManageRoleStyles } from "./ManageRoleStyles";
import ManageRolePopup from './ManageRolePopup.js';
import DeleteRolePopup from './DeleteRolePopup';
import { manageRole, clearState } from '../../../../store/reducers/resourceAllocation/manageRole/GetManageRole';



const ManageRole= () => {
    const dispatch = useDispatch();
    const {  isSuccess, responseData } = useSelector((state) => state.manageRole);

    const { isSuccessAdd } = useSelector((state) => state.postManageRole);
    const { isSuccessEdit } = useSelector((state) => state.putManageRole);
    const { isSuccessDelete } = useSelector((state) => state.deleteManageRole);
    const [addrole, setAddrole] = useState(false);
    const [deleteRole, setDeleteRole] = useState(false);
    const [resData, setResData] = useState([]);
    const [trigerDialog, setTrigerDialog] = useState([]);
    const [data, setData] = useState([]);
    const handleModalAddOpen = () => {
        setAddrole(true);
        setTrigerDialog("Add");
    }

    const handleModalEdit = (row) => {
        setAddrole(true)
        setTrigerDialog(row);
        setData(row);
    }
    
    const handleDelete = (e) => {
        setDeleteRole(true);
        setTrigerDialog(e);
    }
    useEffect(() => {
        dispatch(manageRole());
    }, [])

    useEffect(() => {
        if (isSuccess) {
            setResData(responseData);
            dispatch(clearState());
        }
        else if (isSuccessAdd) {
            dispatch(manageRole());
        }
        else if (isSuccessEdit) {
            dispatch(manageRole());
        }
        else if (isSuccessDelete) {
            dispatch(manageRole());
        }
    }, [isSuccess, isSuccessAdd, isSuccessEdit,isSuccessDelete]);

  
    return (
        <Box sx={ManageRoleStyles.manageuserTop}>
            <Box sx={ManageRoleStyles.manageUserBox}>
                <Typography>Manage Employees Role</Typography>
                <Typography onClick={handleModalAddOpen} sx={ManageRoleStyles.addRoleHeading}>
                    <AddCircleRoundedIcon fontSize='0.9rem' />
                    Add Role
                </Typography>
            </Box>

            <Box sx={{ p: 2 }}>
                <TableContainer component={Paper} sx={ManageRoleStyles.TableMain}>
                    <Table size="small" stickyHeader aria-label="sticky table">
                        <TableHead sx={{ boxShadow: 4 }}>
                            <TableRow >
                                <TableCell align='center' sx={{ backgroundColor: '#e2dbdb' }}>
                                    <Typography fontWeight='bold'>Role</Typography>
                                    </TableCell>
                                <TableCell align="center" sx={{ backgroundColor: '#e2dbdb' }}>
                                    <Typography fontWeight='bold'>Action</Typography>
                                    </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody sx={{ boxShadow: 4, }} >
                            {resData.slice(0).reverse()?.map((row, i) => (
                                <TableRow
                                    key={i}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row" align='center' >
                                        {row.name}
                                    </TableCell>
                                    <TableCell component="th" scope="row" align="center" key={i}>
                                    <Tooltip title="Edit">
                                        <IconButton>
                                            <EditIcon sx={{ color: "#FF971E", fontSize: 18 }} onClick={() => handleModalEdit(row)} />
                                        </IconButton>
                                        </Tooltip>
                                        <Tooltip title="Delete">
                                        <IconButton>
                                            <CancelIcon sx={{ color: "#EF4F2C", fontSize: 18 }} onClick={() => handleDelete(row.id)} />
                                        </IconButton>
                                        </Tooltip>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
            <ManageRolePopup addrole={addrole} setAddrole={setAddrole} setTrigerDialog={setTrigerDialog} trigerDialog={trigerDialog} data={data} setData={setData}/>
            <DeleteRolePopup deleteRole={deleteRole} setDeleteRole={setDeleteRole} trigerDialog={trigerDialog} />
        </Box>
    );
}

export default ManageRole;