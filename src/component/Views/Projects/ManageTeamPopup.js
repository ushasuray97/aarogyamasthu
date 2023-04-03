import React, { useEffect, useState } from 'react';
import { Button, Box, Typography, Grid } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import CloseIcon from '@mui/icons-material/Close';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
//formik
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useDispatch, useSelector } from "react-redux";
//custom files
import { CustomTextField } from '../../../styles/styled-components/textField.styles';
import { CustomIconButton } from '../../../styles/styled-components/iconbutton.style';
import { CustomSelect } from '../../../styles/styled-components/select.style';
import CustomAutocomplete from "../CustomComponent/CustomAutocomplete";
import { ProjectsStyles } from './ProjectsStyles';
import { getDepartments, getDepartmentsByName} from "../../../store/reducers/resourceAllocation/manageUser/getDepartmentSlice";
import { getUser, clearState } from '../../../store/reducers/manageProfile/getUser';
import { setOptions } from 'highcharts';

export default function ManageTeamPopup({ addTeam, setTeam, projectDetails }) {
    const dispatch = useDispatch();
    const { getDepartmentsByNameData } = useSelector((state) => state.getDepartmentsSlice);
    const { isFetching, isSuccess, isError, responseData } = useSelector((state) => state.getUser);
    const techData = projectDetails?.technologies?.split(',')
    const [allDepartments, setAllDepartments] = React.useState("");
    const [department, setDepartment] = useState("")
    const [userData, setUserData] = useState(responseData);
    const [options,setOptions] = useState([])

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            department_id: ""
        },
        validationSchema: yup.object({
            name: yup.string().required("Enter Screen Name")
        }),
        onSubmit: values => {
        },
    });

    useEffect(() => {
        if (department) {
            dispatch(getDepartmentsByName({ params: department }));
        }
    }, [department]);

    useEffect(() => {
        if (getDepartmentsByNameData) {
            setAllDepartments(getDepartmentsByNameData[0]?.id);
        }
    }, [getDepartmentsByNameData]);
    console.log(allDepartments)

    useEffect(() => {
        if (allDepartments) {
            dispatch(getUser({ id: "department_id", value: allDepartments }));
        }
    }, [allDepartments])

    useEffect(() => {
        if (responseData) {
            setUserData(responseData);
            dispatch(clearState());
        }
    }, [responseData])

    const handleClose = () => {
        setTeam(false);
        formik.resetForm();
    };
    const handleDepartmentChange = (value) => {
        setDepartment(value.target.value)

    }
    return (
        <Box>
            <Dialog
                open={addTeam}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
                PaperProps={{
                    style: {
                        width: "770px",
                        borderRadius: "1.5rem"
                    }
                }}
            >
                <Box sx={ProjectsStyles.addUserheadbox}>
                    <Typography>Add Team</Typography>
                    <CustomIconButton
                        aria-label="close"
                        onClick={handleClose}
                        sx={ProjectsStyles.iconButton}
                    >
                        <CloseIcon sx={{ border: 1, }} />
                    </CustomIconButton>
                </Box>
                <form onSubmit={formik.handleSubmit}>
                    <DialogContent sx={{ p: 3 }}>
                        <Grid container xs={12} spacing={2}>
                            <Grid item xs={8}>
                                <CustomTextField
                                    id="name'"
                                    fullWidth
                                    type="text"
                                    variant="outlined"
                                    label="Project Name"
                                    name="name"
                                    value={projectDetails.name || ''}
                                    disabled
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <FormControl sx={{ width: "100%" }}>
                                    <InputLabel id="demo-simple-select-label"> Department</InputLabel>
                                    <CustomSelect
                                        labelId="demo-simple-select-label"
                                        id="department_id"
                                        label="Department"
                                        onChange={(variant) => handleDepartmentChange(variant)}
                                    >
                                        {techData && techData.map((variant) => (
                                            <MenuItem value={variant}>
                                                {variant}
                                            </MenuItem>
                                        ))}
                                    </CustomSelect>

                                </FormControl>
                               
                            </Grid>
                            <Grid item xs={6}>
                                {/* <FormControl sx={{ width: "100%" }}>
                                    <InputLabel id="department_id-label"> Department</InputLabel>
                                    <CustomSelect
                                        id="department_id"
                                        labelId="demo-multiple-checkbox-label"
                                        name="department_id"
                                        value={formik.values.department_id}
                                        onChange={formik.handleChange}
                                        input={<OutlinedInput label="Department" />}
                                        // MenuProps={MenuProps}
                                        sx={{
                                            "& .MuiSelect-nativeInput": {
                                                position: "inherit"
                                            }
                                        }}
                                        error={formik.touched.department_id && Boolean(formik.errors.department_id)}
                                        helperText={formik.touched.department_id && formik.errors.department_id}
                                    >

                                        {userData && userData.map((variant) => (
                                            <MenuItem key={variant.id} value={variant.id}>
                                                {variant.first_name}&nbsp;{variant.last_name}
                                            </MenuItem>
                                        ))}
                                    </CustomSelect>

                                </FormControl> */}
                                <CustomAutocomplete
                                    disablePortal
                                    options={userData}
                                    id={"technologies"}
                                    label={"Technologies"}
                                    setOptionsSelected={setOptions}
                                    error={formik.touched.technologies && Boolean(formik.errors.technologies)}
                                />
                            </Grid>
                        </Grid>
                    </DialogContent>
                    <Box sx={{ display: "flex", justifyContent: "center", mb: 20 }}>
                        <Button variant="contained" color="success" type="submit" >Submit</Button>
                    </Box>
                </form>
            </Dialog>
        </Box>
    );
}