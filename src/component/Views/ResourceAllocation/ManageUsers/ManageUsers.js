import React, { useEffect } from 'react';
import { Box, Typography} from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Tooltip from '@mui/material/Tooltip';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import LockResetOutlinedIcon from '@mui/icons-material/LockResetOutlined';
import EditIcon from '@mui/icons-material/Edit';
import CancelIcon from '@mui/icons-material/Cancel';
import BlockIcon from '@mui/icons-material/Block';
import { useSelector, useDispatch } from "react-redux";
//custom files
import { ManageUserStyles } from './ManageUserStyles';
import AddUsersPopup from './AddUsersPopup';
import { getUsers, cleargetUsersState } from '../../../../store/reducers/resourceAllocation/manageUser/getUsersSlice';
import { resetLink, clearStateReset } from '../../../../store/reducers/resourceAllocation/manageUser/resetLinkSlice';
import { updateUser,clearUpdateState } from '../../../../store/reducers/resourceAllocation/manageUser/updateUser';
import { createUser, clearUserState } from "../../../../store/reducers/resourceAllocation/manageUser/createuserSlice";
import DeletePopup from '../../../../component/Views/ResourceAllocation/ManageUsers/DeletePopup';


export default function ManageUsers() {
  const dispatch = useDispatch();
  const status = ["Active"]
  const [addusers, setAddusers] = React.useState(false);
  const { getUsersData, getUsersDataSuccess } = useSelector((state) => state.getUsersSlice);
  const { isSuccessAdd } = useSelector((state) => state.createUserSlice);
  const { isSuccessEdit } = useSelector((state) => state.updateUserSlice);
  // const { isSuccessReset } = useSelector((state) => state.resetLinkSlice)
  const { isSuccessDelete } = useSelector((state) => state.deleteUser);

  const [trigerDialog, setTrigerDialog] = React.useState([]);
  const [allUsers, setAllUsers] = React.useState("");
  const [deleteUserOpen, setdeleteUserOpen] = React.useState(false)

  const handleModalOpen = () => {
    setAddusers(true)
    setTrigerDialog("Add");
  }

  const handleEdit = (e) => {
    setAddusers(true)
    setTrigerDialog(e);
  }
  const handleReset = (id) => {
    dispatch(resetLink({ id }))
  }

  const handleDelete = (e) => {
    setdeleteUserOpen(true);
    setTrigerDialog(e);
  }
  
  useEffect(() => {
    dispatch(getUsers(status[0]));
  }, [status[0]])

  useEffect(() => {
    if (getUsersDataSuccess) {
      setAllUsers(getUsersData);
      dispatch(cleargetUsersState())
    }
    else if (isSuccessAdd) {
      dispatch(getUsers(status[0]));
      dispatch(clearUserState())

    } else if (isSuccessEdit) {
      dispatch(getUsers(status[0]));
      dispatch(clearUpdateState())

    } else if (isSuccessDelete) {
      dispatch(getUsers(status[0]));
      // dispatch(cleargetUsersState())
    }
  }, [status[0],getUsersDataSuccess, isSuccessAdd, isSuccessEdit, isSuccessDelete]);

  return (
    <Box sx={ManageUserStyles.manageuserTop}>
      <Box sx={ManageUserStyles.manageUserBox}>
        <Typography>Manage Employees</Typography>
        <Typography onClick={handleModalOpen} sx={{ cursor: "pointer" }}>
          <AddCircleRoundedIcon fontSize="0.9rem" />
          Add Employee
        </Typography>
      </Box>
      <Box sx={{ p: 2 }}>
        <TableContainer component={Paper} sx={ManageUserStyles.manageUserTable}>
          <Table size="small" aria-label="a dense table" >
            <TableHead sx={{ background: "#D9D9D9" }}>
              <TableRow>
                <TableCell>Role</TableCell>
                <TableCell >First Name</TableCell>
                <TableCell >Last Name</TableCell>
                <TableCell >Email Address</TableCell>
                <TableCell >Phone Number</TableCell>
                <TableCell >Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {allUsers && allUsers.slice(0).reverse()?.map((row, i) => {
                return (
                  <TableRow
                    key={i}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.employeeRole.map((event) => {
                        return (
                          <div>
                            {event.role.name}
                          </div>

                        );
                      })}
                    </TableCell>
                    <TableCell >{row.first_name}</TableCell>
                    <TableCell >{row.last_name}</TableCell>
                    <TableCell >{row.email}</TableCell>
                    <TableCell >{row.phone_number}</TableCell>
                    <TableCell key={i}>
                      <>
                        {row.isMailSent === true ?

                          <Tooltip title="Reset">
                            <IconButton>
                              < LockResetOutlinedIcon sx={ManageUserStyles.editIcon} onClick={() => handleReset(row.id)} />
                            </IconButton>
                          </Tooltip>
                          :
                          <Tooltip title="Share">
                            <IconButton>
                              <KeyboardDoubleArrowRightIcon onClick={() => handleReset(row.id)} />
                            </IconButton>
                          </Tooltip>
                        }
                        <Tooltip title="Edit">
                          <IconButton>
                            <EditIcon sx={[ManageUserStyles.editIcon]} onClick={() => handleEdit(row)} />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Delete">
                          <IconButton>
                            <CancelIcon sx={ManageUserStyles.cancelIcon} onClick={() => handleDelete(row.id)} />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Deactivate">
                          <IconButton>
                            <BlockIcon sx={ManageUserStyles.cancelIcon} />
                          </IconButton>
                        </Tooltip>
                      </>
                    </TableCell>

                  </TableRow>
                );

              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      {/* {addusers &&  */}
      <AddUsersPopup addusers={addusers} setAddusers={setAddusers} allUsers={allUsers} setAllUsers={setAllUsers} trigerDialog={trigerDialog} />
      {/* } */}
      <DeletePopup deleteUserOpen={deleteUserOpen} setdeleteUserOpen={setdeleteUserOpen} trigerDialog={trigerDialog} />
    </Box>
  );
}