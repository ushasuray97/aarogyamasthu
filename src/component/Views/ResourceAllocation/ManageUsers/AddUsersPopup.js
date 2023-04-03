import React, { useEffect, useState } from 'react';
import { Box, Typography, Grid, Checkbox, TextField, Stack, Chip, Autocomplete } from '@mui/material';
import { createFilterOptions } from '@mui/material/Autocomplete';
import OutlinedInput from '@mui/material/OutlinedInput';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import CloseIcon from '@mui/icons-material/Close';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useSelector, useDispatch } from "react-redux";
import { CustomTextField } from '../../../../styles/styled-components/textField.styles';
import { CustomButton } from '../../../../styles/styled-components/button.style';
import { ManageUserStyles } from './ManageUserStyles';
import { CustomIconButton } from '../../../../styles/styled-components/iconbutton.style';
import { getRoles } from "../../../../store/reducers/resourceAllocation/manageUser/getRoleSlice";
import { getDepartments } from "../../../../store/reducers/resourceAllocation/manageUser/getDepartmentSlice";
import { createUser, clearcreateUserState } from "../../../../store/reducers/resourceAllocation/manageUser/createuserSlice";
import { updateUser, clearUpdateUserState } from '../../../../store/reducers/resourceAllocation/manageUser/updateUser';
import { CustomSelect } from '../../../../styles/styled-components/select.style';
import CustomAutocomplete from '../../CustomComponent/CustomAutocomplete';


const ITEM_HEIGHT = 30;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 200,

    },
  },
};

const experience_years = [
  {
    id: '1',
    label: 'Fresher',
  },
  {
    id: '2',
    label: '1',
  },
  {
    id: '3',
    label: '2',
  },
  {
    id: '4',
    label: '3',
  },
  {
    id: '5',
    label: '4',
  },
  {
    id: '6',
    label: '5',
  },
  {
    id: '7',
    label: '6',
  },
  {
    id: '8',
    label: '7',
  },
  {
    id: '9',
    label: '8',
  },
  {
    id: '10',
    label: '9',
  },
  {
    id: '11',
    label: '10',
  },
  {
    id: '12',
    label: '15+',
  },
  {
    id: '13',
    label: '20+',
  },
];
export default function AddUsersPopup({ addusers, allUsers, setAddusers, trigerDialog }) {
  const dispatch = useDispatch();
  const { getRolesData, getRolesDataSuccess } = useSelector((state) => state.getRolesSlice);
  const { getDepartmentsData, getDepartmentsDataSuccess } = useSelector((state) => state.getDepartmentsSlice);
  const { isErrorAdd, isFetchingAdd, isSuccessAdd } = useSelector((state) => state.createUserSlice);
  const { isErrorEdit, isFetchingEdit, isSuccessEdit } = useSelector((state) => state.updateUserSlice);
  const [allRoles, setAllRoles] = React.useState("");
  const [roles, setRoles] = useState([]);
  const [allDepartments, setAllDepartments] = React.useState("");


  const handleClose = () => {
    setAddusers(false);
    formik.resetForm();
  };

  const validationSchema = yup.object({
    email: yup
      .string()
      .matches(
        /([a-z0-9]+)([{1}])?([a-zA-Z0-9]+)([a-zA-Z0-9]+)([a-z]+)/g,
        "Enter registered Email Id"
      )
      .required("Enter Email Id")
      .email("Enter Email Id")
      .max(50, "Email ID must be atmost 40 characters"),
    role_id: yup.array().min(1).required("Role id have  least one item needs to be here"),
    department_id: yup.string().required("Select Department"),
    first_name: yup.string().required("Enter First Name"),
    last_name: yup.string().required("Enter Last Name"),
    phone_number: yup.string().required("Enter Phone Number"),
    emp_no: yup.string().required("Enter Employee Id"),
    job_title: yup.string().required("Enter Job Title"),
    reporting_to: yup.string().required("Select Reporting To"),
    experience: yup.string().required("Select Experience")
  });


  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      first_name: "",
      last_name: "",
      email: "",
      phone_number: "",
      emp_no: "",
      department_id: "",
      job_title: "",
      role_id: "",
      reporting_to: "",
      experience: ""
    },

    validationSchema: validationSchema,
    onSubmit: (values, { resetForm }) => {

      if (trigerDialog !== "Add") {
        dispatch(updateUser(values = {
          first_name: values.first_name,
          last_name: values.last_name,
          email: values.email,
          phone_number: values.phone_number,
          emp_no: values.emp_no,
          job_title: values.job_title,
          role_id: values.role_id,
          department_id: values.department_id,
          reporting_to: values.reporting_to,
          experience: values.experience,
          id: trigerDialog.id
        }));
      } else {
        dispatch(createUser(values));
      }
    },
  });

  useEffect(() => {
    dispatch(createUser())
  }, []);

  useEffect(() => {
    dispatch(getRoles())
    if (getRolesDataSuccess) {
      setAllRoles(getRolesData);
    }
  }, [getRolesDataSuccess]);

  useEffect(() => {
    dispatch(getDepartments())
    if (getDepartmentsDataSuccess) {
      setAllDepartments(getDepartmentsData);
    }
  }, [getDepartmentsDataSuccess]);
  const  MyRoleArr = [];

  useEffect(() => {
    if (trigerDialog !== "Add" && trigerDialog.length !== 0) {

      trigerDialog.employeeRole?.map((event) => {
        MyRoleArr.push(event.role_id);
      })
      formik.setValues((preValue) => {
        return {
          ...preValue,
          first_name: trigerDialog.first_name,
          last_name: trigerDialog.last_name,
          email: trigerDialog.email,
          phone_number: trigerDialog.phone_number,
          emp_no: trigerDialog.emp_no,
          job_title: trigerDialog.job_title,
          department_id: trigerDialog.department_id,
          reporting_to: trigerDialog.reporting_to,
          experience: trigerDialog.experience,
          role_id: MyRoleArr
        };
      });
    }

  }, [trigerDialog]) 
  
  useEffect(() => {
    if (isSuccessAdd) {
      setAddusers(false);
      formik.resetForm();
    }
    if (isSuccessEdit) {
      setAddusers(false);
      formik.resetForm();
    }
  }, [isSuccessAdd, isSuccessEdit])

  useEffect(() => {
    const rolesArray = [];
  roles.map((item) => rolesArray.push(item.id))
    formik.setValues((preValue) => {
      return {
        ...preValue,
        role_id: rolesArray
      }
    })

  }, [roles])

  return (
    <div>
      <Dialog
        open={addusers}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
        PaperProps={{
          sx: ManageUserStyles.addUserPopup
        }}
      >
        <Box sx={ManageUserStyles.addUserheadbox}>
          {trigerDialog !== "Add" ? <Typography>Edit Employee</Typography> : <Typography>Add Employee</Typography>}
          <CustomIconButton
            aria-label="close"
            onClick={handleClose}
            sx={ManageUserStyles.iconButton}
          >
            <CloseIcon sx={{ border: 1, }} />
          </CustomIconButton>
        </Box>
        <DialogContent>
          <form onSubmit={formik.handleSubmit} sx={ManageUserStyles.muiError}>
            <Box>
              <Typography sx={{ borderBottom: "1px solid #000" }}>Login Details</Typography>
              <Box sx={ManageUserStyles.addUserSelect}>
                <Grid container>
                  <Grid item xs={3} >
                    <Typography>Select Role : &nbsp;</Typography>
                  </Grid>
                  <Grid item xs={9}>
                    <FormControl sx={{ width: "100%" }}>
                      <CustomAutocomplete
                          disablePortal
                          options={allRoles}
                          defaultValue={formik.values.role_id}
                          id={"role_id"}
                          label={"Select Role"}
                          setOptionsSelected={setRoles}
                        error={formik.touched.role_id && Boolean(formik.errors.role_id)}
                        />
                    </FormControl>
                    <Typography sx={ManageUserStyles.errorMsg}>
                      {formik.touched.role_id && formik.errors.role_id}
                    </Typography>
                  </Grid>
                </Grid>
              </Box>
            </Box>
            <Box >
              <Typography sx={ManageUserStyles.userDetails}> Personal Details</Typography>
              <Stack
                //  sx={{height:"400px",overflowY:"scroll"}} 
                spacing={2}>
                <Grid container sx={{ textAlign: "center", }} spacing={1}>
                  <Grid item xs={6} md={6} >
                    <CustomTextField
                      label="First name"
                      name='first_name'
                      SX={{ mb: 0 }}
                      value={formik.values.first_name}
                      onChange={formik.handleChange}
                      error={formik.touched.first_name && Boolean(formik.errors.first_name)}
                      helperText={formik.touched.first_name && formik.errors.first_name}
                      margin="normal" size="medium"
                      onInput={(e) =>
                        (e.target.value = e.target.value.replace(/[-!$%^&*()_+|~=`{}\[\]:";,°'<>?£¥§€#¢@\\/0-9]/, ""))
                          (
                            e.target.value.length > 20
                              ? (e.target.value = formik.values.first_name)
                              : null
                          )
                      }
                      onKeyUp={(e) =>
                        e.target.value[0] === " "
                          ? (e.target.value = e.target.value.replace(
                            /\s/g,
                            ""
                          ))
                          : null
                      }
                      onKeyDown={(evt) => {
                        if (evt.which === 38 || evt.which === 40 || evt.which === 32) {
                          evt.preventDefault()
                        }
                      }}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={6} md={6} >
                    <CustomTextField
                      label="Last name"
                      name='last_name'
                      value={formik.values.last_name}
                      onChange={formik.handleChange}
                      error={formik.touched.last_name && Boolean(formik.errors.last_name)}
                      helperText={formik.touched.last_name && formik.errors.last_name}
                      size="medium" margin="normal"
                      onInput={(e) =>
                        (e.target.value = e.target.value.replace(/[-!$%^&*()_+|~=`{}\[\]:";,°'<>?£¥§€#¢@\\/0-9]/, ""))
                          (
                            e.target.value.length > 20
                              ? (e.target.value = formik.values.last_name)
                              : null
                          )
                      }
                      onKeyUp={(e) =>
                        e.target.value[0] === " "
                          ? (e.target.value = e.target.value.replace(
                            /\s/g,
                            ""
                          ))
                          : null
                      }
                      onKeyDown={(evt) => {
                        if (evt.which === 38 || evt.which === 40 || evt.which === 32) {
                          evt.preventDefault()
                        }
                      }}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={6} md={6} >
                    <CustomTextField
                      label="Email ID"
                      size="medium"
                      margin="normal"
                      variant="outlined"
                      name='email'
                      sx={{ mt: 0 }}
                      color="primary"
                      value={formik.values.email}
                      onChange={formik.handleChange}
                      error={formik.touched.email && Boolean(formik.errors.email)}
                      helperText={formik.touched.email && formik.errors.email}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={6} md={6} >
                    <CustomTextField
                      sx={{ width: "100%", mt: 0 }}
                      type="number"
                      name='phone_number'
                      label="Phone number"
                      placeholder='Phone number (optional)'
                      value={formik.values.phone_number}
                      onChange={formik.handleChange}
                      error={formik.touched.phone_number && Boolean(formik.errors.phone_number)}
                      helperText={formik.touched.phone_number && formik.errors.phone_number}
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
                  <Grid item xs={6} md={6} >
                    <CustomTextField
                      id="employee_id"
                      label="Employee Id"
                      variant="outlined"
                      margin="normal"
                      name='emp_no'
                      sx={{ mt: 0 }}
                      value={formik.values.emp_no}
                      onChange={formik.handleChange}
                      error={formik.touched.emp_no && Boolean(formik.errors.emp_no)}
                      helperText={formik.touched.emp_no && formik.errors.emp_no}
                      onInput={(e) =>
                        (e.target.value = e.target.value.replace(/[-!$%^&*()_+|~=`{}\[\]:";,°'<>?£¥§€#¢@\\/]/, ""))
                          (
                            e.target.value.length > 8
                              ? (e.target.value = formik.values.emp_no)
                              : null
                          )
                      }
                      onKeyUp={(e) =>
                        e.target.value[0] === " "
                          ? (e.target.value = e.target.value.replace(
                            /\s/g,
                            ""
                          ))
                          : null
                      }

                      onKeyDown={(evt) => {
                        if (evt.which === 38 || evt.which === 40 || evt.which === 32) {
                          evt.preventDefault()
                        }
                      }}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={6} md={6} >
                    <CustomTextField
                      id="job_title"
                      label="Designation"
                      variant="outlined"
                      margin="normal"
                      sx={{ mt: 0 }}
                      name='job_title'
                      value={formik.values.job_title}
                      onChange={formik.handleChange}
                      error={formik.touched.job_title && Boolean(formik.errors.job_title)}
                      helperText={formik.touched.job_title && formik.errors.job_title}
                      onInput={(e) =>
                        (e.target.value = e.target.value.replace(
                          /[!$%^&*()_+|~=`{}\[\]:";°'<>?£¥§€#¢@\/]/,
                          ""
                        ))(
                          e.target.value.split(" ").length > 5
                            ? (e.target.value = formik.values.job_title)
                            : null
                        )
                      }
                      onKeyUp={(e) =>
                        e.target.value[0] === " "
                          ? (e.target.value = e.target.value.replace(
                            /\s/g,
                            ""
                          ))
                          : null
                      }

                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={6} md={6} >
                    <FormControl sx={{ width: "100%" }}>
                      <InputLabel id="demo-simple-select-label"> Department</InputLabel>
                      <CustomSelect
                        id="department_id"
                        labelId="demo-multiple-checkbox-label"
                        name="department_id"
                        value={formik.values.department_id}
                        onChange={formik.handleChange}
                        input={<OutlinedInput label="Department" />}
                        MenuProps={MenuProps}
                        sx={{
                          "& .MuiSelect-nativeInput": {
                            position: "inherit"
                          }
                        }}
                        error={formik.touched.department_id && Boolean(formik.errors.department_id)}
                        helperText={formik.touched.department_id && formik.errors.department_id}
                      >
                        {allDepartments && allDepartments?.map((variant) => (

                          <MenuItem key={variant.id} value={variant.id}>
                            {variant.name}
                          </MenuItem>
                        ))}
                      </CustomSelect>
                      <Typography sx={ManageUserStyles.errorMsg}>
                        {formik.touched.department_id && formik.errors.department_id}
                      </Typography>
                    </FormControl>
                  </Grid>
                  <Grid item xs={6} md={6} >
                    <FormControl sx={{ width: "100%" }}>
                      <InputLabel id="demo-simple-select-label">Reporting</InputLabel>
                      <CustomSelect
                        id="reporting_to"
                        labelId="demo-multiple-checkbox-label"
                        name="reporting_to"
                        value={formik.values.reporting_to}
                        onChange={formik.handleChange}
                        input={<OutlinedInput label="Reporting" />}
                        MenuProps={MenuProps}
                        sx={{
                          "& .MuiSelect-nativeInput": {
                            position: "inherit"
                          }
                        }}
                        error={formik.touched.reporting_to && Boolean(formik.errors.reporting_to)}
                      >
                        {allUsers && allUsers.map((variant) => (
                          <MenuItem key={variant.id} value={variant.id}>
                            {variant.first_name}
                          </MenuItem>
                        ))}
                      </CustomSelect>
                      <Typography sx={ManageUserStyles.errorMsg}>
                        {formik.touched.reporting_to && formik.errors.reporting_to}
                      </Typography>
                    </FormControl>
                  </Grid>
                  <Grid item xs={6} md={6} >
                    <FormControl sx={{ width: "100%" }}>
                      <InputLabel id="demo-simple-select-label">Select Experience(in years)</InputLabel>
                      <CustomSelect
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label="Select Experience(in years)"
                        name="experience"
                        value={formik.values.experience}
                        onChange={formik.handleChange}
                        MenuProps={MenuProps}
                        sx={{
                          "& .MuiSelect-nativeInput": {
                            position: "inherit"
                          }
                        }}
                        error={formik.touched.experience && Boolean(formik.errors.experience)}
                      >
                        {experience_years && experience_years?.map((variant) => (
                          <MenuItem key={variant.id} value={variant.label}>
                            {variant.label}
                          </MenuItem>
                        ))}
                      </CustomSelect>
                      <Typography sx={ManageUserStyles.errorMsg}>
                        {formik.touched.experience && formik.errors.experience}
                      </Typography>

                    </FormControl>
                  </Grid>
                </Grid>
                <Box sx={ManageUserStyles.buttonBox}>
                  <CustomButton variant="contained" color="warning" sx={{ mr: 2 }} type="submit">Save</CustomButton>
                  <CustomButton variant="contained" color="info" onClick={handleClose}>Cancel</CustomButton>
                </Box>
              </Stack>
            </Box>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}