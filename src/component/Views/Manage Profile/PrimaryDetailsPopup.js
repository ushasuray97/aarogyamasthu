import React, { useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import { Box, Grid, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
//formik
import { useFormik } from 'formik';
import * as yup from 'yup';
//custom files
import { CustomTextField } from '../../../styles/styled-components/textField.styles';
import { CustomButton } from '../../../styles/styled-components/button.style';
import { CustomIconButton } from '../../../styles/styled-components/iconbutton.style';
import { PrimaryDetailsStyles } from './PrimaryDetailsStyles';
import { updateUser } from '../../../store/reducers/resourceAllocation/manageUser/updateUser';
import { useSelector, useDispatch } from "react-redux";


const validationSchema = yup.object({
    first_name: yup.string().required("Enter First Name"),
    last_name: yup.string().required("Enter Last Name"),
    phone_number: yup.string().required("Enter Phone Number"),
});

const ManagePermissionPopup = ({ openEdit, setOpenEdit, userData }) => {
    const handleClose = () => {
        setOpenEdit(false);
    };
    const dispatch = useDispatch();
    const { isErrorEdit, isFetchingEdit, isSuccessEdit } = useSelector((state) => state.updateUserSlice);

    useEffect(() => {

        if (isSuccessEdit) {
            setOpenEdit(false);
            formik.resetForm();
        }
    }, [isSuccessEdit])

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            first_name: "",
            last_name: "",
            email: "",
            phone_number: "",
            emp_no: "",
            reporting_to: "",
            job_title: "",
            department: ""
        },
        validationSchema: validationSchema,
        onSubmit: (values, { resetForm }) => {
            dispatch(updateUser(values = {

                phone_number: values.phone_number,
                id: userData?.id

            }));


        },
    });

    useEffect(() => {
        formik.setValues((preValue) => {
            return {
                ...preValue,
                first_name: userData.first_name,
                last_name: userData.last_name,
                email: userData.email,
                phone_number: userData.phone_number,
                emp_no: userData.emp_no,
                reporting_to: userData.reporting_to,
                job_title: userData.job_title,
                department: userData.department?.name,
            }
        })
    }, [userData])
    return (
        <Box >
            <Dialog
                open={openEdit}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
                PaperProps={{
                    sx: PrimaryDetailsStyles.addUserPopup
                }}
            >
                <Box sx={PrimaryDetailsStyles.addUserheadbox} >
                    <Typography>Edit Details</Typography>
                    <CustomIconButton
                        aria-label="close"
                        onClick={handleClose}
                        sx={PrimaryDetailsStyles.iconButton}
                    >
                        <CloseIcon sx={{ border: 1, }} />
                    </CustomIconButton>
                </Box>
                <Box sx={{ p: 4, }}>
                    <form onSubmit={formik.handleSubmit}>
                        <Grid container spacing={2}>
                            <Grid item md={6} >
                                <CustomTextField
                                    id="outlined-basic"
                                    label="First Name"
                                    variant="outlined"
                                    name="first_name"
                                    disabled
                                    value={formik.values.first_name}
                                    onChange={formik.handleChange}
                                    fullWidth
                                />
                            </Grid>
                            <Grid item md={6} >
                                <CustomTextField
                                    id="outlined-basic"
                                    label="Last Name"
                                    variant="outlined"
                                    name="last_name"
                                    disabled
                                    value={formik.values.last_name}
                                    onChange={formik.handleChange}
                                    fullWidth
                                />
                            </Grid>
                        </Grid>
                        <Grid container spacing={2} sx={{ pt: 2 }}>
                            <Grid item md={6} >
                                <CustomTextField
                                    id="outlined-basic"
                                    label="Email id"
                                    variant="outlined"
                                    name="email"
                                    disabled
                                    value={formik.values.email}
                                    onChange={formik.handleChange}
                                    error={formik.touched.email && Boolean(formik.errors.email)}
                                    helperText={formik.touched.email && formik.errors.email}
                                    fullWidth
                                />
                            </Grid>
                            <Grid item md={6} >
                                <CustomTextField
                                    id="outlined-basic"
                                    label="Phone No"
                                    variant="outlined"
                                    name="phone_number"
                                    type='number'
                                    value={formik.values.phone_number}
                                    onChange={formik.handleChange}
                                    error={formik.touched.phone_number && Boolean(formik.errors.phone_number)}
                                    helperText={formik.touched.phone_number && formik.errors.phone_number}
                                    fullWidth
                                    onInput={(e) =>
                                        (e.target.value = e.target.value.replace(/[-!$%^&*()_|~=`{}+\[\]:";,°'<>?£¥§€#¢@\\/aA-zZ]/, ""))
                                            (
                                                e.target.value.length > 10
                                                    ? (e.target.value = formik.values.phone_number)
                                                    : null
                                            )
                                    }
                                    onKeyDown={(evt) => {
                                        if (evt.which === 38 || evt.which === 40 || evt.key === "e") {
                                            evt.preventDefault()
                                        }
                                    }}
                                />
                            </Grid>
                        </Grid>
                        <Grid container spacing={2} sx={{ pt: 2 }}>
                            <Grid item md={6} >
                                <CustomTextField
                                    id="outlined-basic"
                                    label="Emp Id"
                                    variant="outlined"
                                    name="emp_no"
                                    disabled
                                    value={formik.values.emp_no}
                                    onChange={formik.handleChange}
                                    error={formik.touched.emp_no && Boolean(formik.errors.emp_no)}
                                    helperText={formik.touched.emp_no && formik.errors.emp_no}
                                    fullWidth
                                />
                            </Grid>
                            <Grid item md={6} >
                                <CustomTextField
                                    id="outlined-basic"
                                    label="Reporting To"
                                    variant="outlined"
                                    name="reporting_to"
                                    disabled
                                    value={formik.values.reporting_to}
                                    onChange={formik.handleChange}
                                    error={formik.touched.reporting_to && Boolean(formik.errors.reporting_to)}
                                    helperText={formik.touched.reporting_to && formik.errors.reporting_to}
                                    fullWidth
                                />
                            </Grid>
                        </Grid>
                        <Grid container spacing={2} sx={{ pt: 2 }}>
                            <Grid item md={6} >
                                <CustomTextField
                                    id="outlined-basic"
                                    label="Designation"
                                    variant="outlined"
                                    name="job_title"
                                    disabled
                                    value={formik.values.job_title}
                                    onChange={formik.handleChange}
                                    error={formik.touched.job_title && Boolean(formik.errors.job_title)}
                                    helperText={formik.touched.job_title && formik.errors.job_title}
                                    fullWidth
                                />
                            </Grid>
                            <Grid item md={6} >
                                <CustomTextField
                                    id="outlined-basic"
                                    label="Department/Education"
                                    variant="outlined"
                                    name="department"
                                    disabled
                                    value={formik.values.department}
                                    onChange={formik.handleChange}
                                    error={formik.touched.department && Boolean(formik.errors.department)}
                                    helperText={formik.touched.department && formik.errors.department}
                                    fullWidth
                                />
                            </Grid>
                        </Grid>
                        <Grid container spacing={2} sx={{ pt: 2 }}>
                            <Grid md={12} sm={12}>
                                <CustomButton variant="contained" color="warning" sx={PrimaryDetailsStyles.Back_Btn} type="submit">Save</CustomButton>
                            </Grid>
                        </Grid>
                    </form>
                </Box>
            </Dialog>
        </Box>
    );
}
export default ManagePermissionPopup;