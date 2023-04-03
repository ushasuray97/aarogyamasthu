import React, { useEffect, useState } from 'react';
import { Button, Box, Typography, Grid } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import CloseIcon from '@mui/icons-material/Close';
import {  FormControlLabel } from '@mui/material';
import { useSelector, useDispatch } from "react-redux";
//formik
import { useFormik } from 'formik';
import * as yup from 'yup';
//custom files
import {CustomCheckbox} from '../../../../styles/styled-components/checkbox.style';
import { CustomTextField } from '../../../../styles/styled-components/textField.styles';
import { ManageUserStyles } from '../ManageUsers/ManageUserStyles';
import { CustomIconButton } from '../../../../styles/styled-components/iconbutton.style';
import { postManageRole, clearStateAdd } from '../../../../store/reducers/resourceAllocation/manageRole/PostMangeRole';
import { putManageRole, clearStateEdit } from '../../../../store/reducers/resourceAllocation/manageRole/EditManageRole';
import { manageScreen, clearState } from '../../../../store/reducers/resourceAllocation/manageScreen/GetManageScreen';

const checkBoxData = [
  { name: "Add", checked: false },
  { name: "Edit", checked: false },
  { name: "View", checked: false },
  { name: "Delete", checked: false },
  { name: "DeActivate", checked: false }
];

export default function ManageRolePopup({ data, addrole, setAddrole, trigerDialog }) {
  const dispatch = useDispatch();
  const { isSuccessAdd } = useSelector((state) => state.postManageRole);
  const { isSuccessEdit } = useSelector((state) => state.putManageRole);
  const { isSuccess, responseData } = useSelector((state) => state.manageScreen);
  const [resData, setResData] = useState();
  const [formData, setFormData] = useState(checkBoxData);
  const [moduleChecked, setmoduleChecked] = useState(false)
  const [allChecked, setAllChecked] = useState(false);
  const [isChecked, setIsChecked] = useState([]);
  const [isPermissionChecked, setIsPermissionChecked] = useState({});
  const [propData, setPropData] = useState()

  useEffect(() => {
    dispatch(manageScreen())
  }, [])

  useEffect(() => {
    setPropData(data)
  },[data])

  useEffect(() => {
    if (isSuccess) {
      setResData(responseData);
      dispatch(clearState());
    }
    if (isSuccessAdd) {
      setAddrole(false);
      formik.resetForm();
      dispatch(clearStateAdd());
    }
    if (isSuccessEdit) {
      setAddrole(false);
      formik.resetForm();
      dispatch(clearStateEdit());
    }
  }, [isSuccess, isSuccessAdd, isSuccessEdit])


  useEffect(() => {
    if (trigerDialog !== "Add" && trigerDialog !== undefined) {
      let MyRoleArr = [];
      let my_object = {};

      trigerDialog.permission?.map((event, i) => {
        my_object.module_id = event.module_id;
        my_object.edit_permission = event.edit_permission;
        my_object.create_permission = event.create_permission;
        my_object.view_permission = event.view_permission;
        my_object.delete_permission = event.delete_permission;
        my_object.deactivate_permission = event.deactivate_permission;

        MyRoleArr.push({ ...my_object, my_object });
      })

      formik.setValues((preValue) => {
        return {
          ...preValue,
          name: trigerDialog.name,
          modulePermissions: MyRoleArr
        };

      });
    }
  }, [trigerDialog])


  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: "",
      modulePermissions: [
      ]
    },
    validationSchema: yup.object({
      name: yup.string().required("Enter Role Name"),
      edit_permission:false,
      create_permission:false,
      // modulePermissions: yup.array().of(yup.object().

      //   // when("modulePermissions",(create_permission,edit_permission)=>{
      //   //     if(create_permission||edit_permission){
      //   //       return yup.object().required("Enter Role");
      //   //     }

      //   // })
      //   shape(

      //     {
      //       create_permission: yup.string().required("Enter Role Name"),
      //       edit_permission: yup.string().when("edit permission", {
      //         is: (edit_permission) => true,
      //         then: yup.string().required('Field is required')
      //       })
      //     },
      //   )
      // ),
    }),
    onSubmit: values => {
      if (trigerDialog !== "Add") {
        dispatch(putManageRole({ name: values.name, modulePermissions: values.modulePermissions, id: trigerDialog.id }));

      } else {
        dispatch(postManageRole(values));
      }
    },
  });

  const handleClose = () => {
    setAddrole(false);
    formik.resetForm()
  };

  const handleCheckedPermission = (event, row, i) => {
    setIsPermissionChecked({ ...isPermissionChecked, [row.id]: event.target.checked });
    if (event.target.checked === true) {
      formik.setFieldValue(
        `modulePermissions.${i}.module_id`,
        `${row.id}`,
      );
    } else {
      let data = propData?.permission?.slice(i,1)
      console.log('slice-->', propData?.permission?.slice(i).reverse());
      console.log('data after slice-->', data);
      formik.setFieldValue(
        `modulePermissions`, data
      );
      //(data && data?.permission?.filter((item) => item.module_id === row.id))?.length
      // data?.permission?.[i] = {
      //   ...data?.permission[i],
      //   module_id:""
      // }
      console.log();
    }

  };

  const handleSingleCheck = (e, i) => {
    let data = [...isChecked];
    !data[i] ? data.push({ ...isChecked, [e.target.name]: e.target.checked }) : (data[i][e.target.name] = e.target.checked)
    setIsChecked(data);
    let xyz;
    switch (e.target.name) {
      case 'Edit':
        xyz = 'edit_permission';
        break;
      case 'Add':
        xyz = 'create_permission';
        break;
      case 'View':
        xyz = 'view_permission';
        break;
      case 'Delete':
        xyz = 'delete_permission';
        break;
      case 'DeActivate':
        xyz = 'deactivate_permission';
        break;

      default:
        break;
    }
    formik.setFieldValue(
      `modulePermissions.${i}.${xyz}`,
      `${e.target.checked}`,
    );
  };

  console.log(isChecked)
  console.log(formik.errors)
  
  const getPermissions = (data, test, index, id) => {
    let filteredVal = data.permission?.filter((item) => item.module_id === id)
    if (filteredVal) {
      let xyz;
      switch (test.name) {
        case 'Edit':
          xyz = 'edit_permission';
          break;
        case 'Add':
          xyz = 'create_permission';
          break;
        case 'View':
          xyz = 'view_permission';
          break;
        case 'Delete':
          xyz = 'delete_permission';
          break;
        case 'DeActivate':
          xyz = 'deactivate_permission';
          break;

        default:
          break;
      }
      return filteredVal[0] && filteredVal[0][xyz];
    }
  }

  return (
    <Box>
      <Dialog
        open={addrole}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
        PaperProps={{
          style: {
            maxWidth: "780px",
            width: "770px",
            borderRadius: "1.5rem"
          }
        }}
      >
        <Box sx={ManageUserStyles.addUserheadbox}>
          {trigerDialog !== "Add" ? <Typography>Edit Role</Typography> : <Typography>Add Role</Typography>}
          <CustomIconButton
            aria-label="close"
            onClick={handleClose}
            sx={ManageUserStyles.iconButton}
          >
            <CloseIcon sx={{ border: 1, }} />
          </CustomIconButton>
        </Box>
        <form onSubmit={formik.handleSubmit}>
          <DialogContent sx={{ p: 3 }}>
            <Box>
              <CustomTextField
                id="outlined-basic"
                fullWidth
                type="text"
                variant="outlined"
                label="Name"
                name='name'
                value={formik.values.name}
                onChange={formik.handleChange}
                error={
                  formik.touched.name &&
                  Boolean(formik.errors.name)
                }
                helperText={
                  formik.touched.name && formik.errors.name
                }
              />
            </Box>
            <Box sx={{ mt: 3 }}>
              <Typography sx={{ mb: 2 }}> Module/Screens</Typography>
              {resData && resData.map((row, i) => {
                console.log('filtere-->', (propData && propData?.permission?.filter((item) => item.module_id === row.id))?.length)
                console.log('isPermissionChecked-->', isPermissionChecked[row.id]);
                console.log('triggerDialog-->', trigerDialog)
                return (
                  <Grid container value={row.id}>
                    <Grid item md={3}>
                      <FormControlLabel
                        control={
                          <CustomCheckbox
                          size="small"
                            checked={
                              // moduleChecked
                              //   ? true
                              //   : 
                                (
                                  isPermissionChecked[row.id]
                                    || (
                                      trigerDialog !== "Add" &&
                                        ((propData && propData?.permission?.filter((item) => item.module_id === row.id))?.length && !isPermissionChecked[row.id])
                                        ? true
                                        : false
                                    )
                                )
                            }
                            // checked={
                            //   isPermissionChecked[row.id] 
                            //   ||  (getRolesPermissionData[0] && getRolesPermissionData[0]?.permission?.filter((item) => item.module_id === row.id))?.length
                            //   ? true : false
                            // }
                            onChange={(event) => handleCheckedPermission(event, row, i)} />
                        }
                        label={row.name}
                        name="modulePermissions"
                        value={formik.values.modulePermissions[i]?.module_id}
                      />
                    </Grid>
                    {formData.map((test, index) => {
                      return <Grid item md={1.5} sm={12} xs={12} >
                        <FormControlLabel
                          control={
                            <CustomCheckbox
                              size="small"
                              disabled={formik.values.modulePermissions[i]?.module_id === ""?.true}
                              // name="modulePermissions"
                              checked=
                              {
                                allChecked
                                  ? true : (
                                    isChecked?.[i]?.[test.name] ||
                                    (trigerDialog !== "Add" && getPermissions(data, test, index, row.id) ? true : false)
                                  )
                              }
                              onChange={(e) => handleSingleCheck(e, i)}
                              error={
                                formik.touched.modulePermissions &&
                                Boolean(formik.errors.modulePermissions)
                              }
                              helperText={
                                formik.touched.modulePermissions && formik.errors.modulePermissions
                              }
                            />
                          }
                          label={test.name}
                          name={test.name}
                        />
                      </Grid>
                    })}
                  </Grid>
                )
              })}
            </Box>
          </DialogContent>
          <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
            <Button variant="contained" color="info" type='submit'>Submit</Button>
          </Box>
        </form>
      </Dialog>
    </Box>
  );
}