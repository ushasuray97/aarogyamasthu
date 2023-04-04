import React, { useState, useEffect, useRef } from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import { Button, Stack } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
//formik
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
//custom files
import CustomAutocomplete from "../CustomComponent/CustomAutocomplete";
import { AdminsStyles } from "./AdminsStyles";
import { CustomTextField } from "../../../styles/styled-components/textField.styles";
import { CustomButton } from "../../../styles/styled-components/button.style";
import * as CustomBox from "../../../styles/styled-components/box.style";
import { CustomSelect } from "../../../styles/styled-components/select.style";
import { getDepartments } from "../../../store/reducers/resourceAllocation/manageUser/getDepartmentSlice";
import {addProject, clearaddProjectState } from "../../../store/reducers/manageProjects/addProjectSlice";
//images
import UploadImage from '../../../assets/images/avatar/UploadImage.png'

export default function AddAdmin() {
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const { getDepartmentsData, getDepartmentsDataSuccess } = useSelector((state) => state.getDepartmentsSlice);
  const { isErrorAdd, isFetchingAdd, isSuccessAdd } = useSelector((state) => state.addProject);

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [allDepartments, setAllDepartments] = useState([]);
  const [ImgFileName, setImgFileName] = useState("");

  const inputFile = useRef(null)

  const [image, setImage] = useState(UploadImage)
  const [upload_1_FileData, setUpload_1_FileData] = useState("");
  const [upload_2_FileName, setUpload_2_FileName] = useState("");
  const [upload_2_FileData, setUpload_2_FileData] = useState("");
  const [attachment, setAttachment] = useState([])
  const [optionsSelected, setOptionsSelected] = useState([]);
  // setAttachment([...attachment,
  // {
  //   item: "project",
  //   item_name: "document",
  //   fileName: "",
  //   data: "",
  // }])


  console.log(upload_2_FileData)

  const userId = localStorage.getItem("userId");
  // dispatch(addProject())
  useEffect(() => {
    dispatch(addProject())
  }, []);
  useEffect(() => {
    dispatch(getDepartments())
    
    if (getDepartmentsDataSuccess) {
      setAllDepartments(getDepartmentsData);
    }
  }, [getDepartmentsDataSuccess]);
  console.log(getDepartmentsData)

  const validationSchema = yup.object({
    client_email: yup
      .string()
      .matches(
        /([a-z0-9]+)([{1}])?([a-zA-Z0-9]+)([a-zA-Z0-9]+)([a-z]+)/g,
        "Enter registered Email Id"
      )
      .required("Enter Email Id")
      .email("Enter Email Id")
      .max(50, "Email ID must be atmost 40 characters"),
       name: yup.string().required("Enter Name"),
    
  });
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      user_id: userId,
      name: "",
      description: "",
      client_name: "",
      client_email: "",
      start_date: "",
      end_date: "",
      team_size: "0",
      technologies: "",
      flag: "Buy Properties",
      sub_type: "",
      status: "",
      // attachments: attachment, 
    },

    validationSchema: validationSchema,
    onSubmit: (values, { resetForm }) => {
      dispatch(addProject({values:values, attachments:attachment}))
      navigate("/projects")
    },
  });
  console.log(formik.values)

  useEffect(() => {
    const technologies = []
    optionsSelected.map((item) => technologies.push(item.name))
    formik.setValues((preValue) => {
      return {
        ...preValue,
        technologies: technologies.toString()
      }
    })

  }, [optionsSelected])


  useEffect(() => {
    formik.setValues((preValue) => {
      return {
        ...preValue,
        end_date: endDate
      }
    })
  }, [endDate])

  useEffect(() => {
    formik.setValues((preValue) => {
      return {
        ...preValue,
        start_date: startDate
      }
    })
  }, [startDate])

  useEffect(() => {
    setAttachment([
      {
        item: "project",
        item_name: "logo",
        fileName: upload_1_FileData,
        data: image.slice(image.indexOf(",") + 1)
          .trim(),
      },
      {
        item: "project",
        item_name: "document",
        fileName: upload_2_FileName,
        data: upload_2_FileData.slice(upload_2_FileData.indexOf(",") + 1)
          .trim(),
      },

    ]);
  }, [
    image,
    upload_1_FileData,
    upload_2_FileData,
    upload_2_FileName

  ]);


  const imageClick = () => {
    inputFile.current.click();
  }

  const onchangeImage = (event) => {
    var fileElement = document.getElementById("FundraiserImage");
    var fileExtension = "";
    if (fileElement.value.lastIndexOf(".") > 0) {
      fileExtension = fileElement.value.substring(
        fileElement.value.lastIndexOf(".") + 1,
        fileElement.value.length
      );
    }
    if (
      fileExtension.toLowerCase() === "png" ||
      fileExtension.toLowerCase() === "jpg" ||
      fileExtension.toLowerCase() === "jpeg"
    ) {
      setUpload_1_FileData(event.target.files[0].name)
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(event.target.files[0]);
    }

  }

  const fundraiseImageOnchange = (event) => {
    var fileElement = document.getElementById("FileUpload1");
    var fileExtension = "";
    if (fileElement.value.lastIndexOf(".") > 0) {
      fileExtension = fileElement.value.substring(
        fileElement.value.lastIndexOf(".") + 1,
        fileElement.value.length
      );
    }
    if (
      fileExtension.toLowerCase() == "pdf" ||
      fileExtension.toLowerCase() == "txt" ||
      fileExtension.toLowerCase() == "doc" ||
      fileExtension.toLowerCase() == "docx"
    ) {
      setUpload_2_FileName(event.target.files[0].name);
      const reader = new FileReader();
      reader.onload = () => {
        setUpload_2_FileData(reader.result);
      };
      reader.readAsDataURL(event.target.files[0]);
      return true;
    }
  };

const handleClose =() =>{
  document.getElementById("FileUpload1").value = "";
  setUpload_2_FileName("")
}

  return (
    <>
      <CustomBox.CustomMainBox>
        <Grid container>
          <Grid item xs={12} >
            <Typography sx={AdminsStyles.mainHeading}>
              Add Admin
            </Typography>
          </Grid>
        </Grid>
        <form onSubmit={formik.handleSubmit}>
          <Box sx={AdminsStyles.adminAddContainer}>
            <Grid container>
              <Grid item xs={12}>
                {formik.values.flag === "" ?
                  <Grid container spacing={3}>
                    <Grid item md={8} sm={12} xs={12}>
                      
                      <Grid item xs={12} sx={AdminsStyles.textfield}>
                        <CustomTextField
                          id="name"
                          label="Name"
                          placeholder="Name"
                          fullWidth
                          name="name"
                          value={formik.values.name}
                          onChange={formik.handleChange}
                          error={formik.touched.name && Boolean(formik.errors.name)}
                          helperText={formik.touched.name && formik.errors.name}
                        />
                      </Grid>
                      
                      <Grid item xs={12} sx={AdminsStyles.textfield}>
                        <CustomTextField
                          id="email"
                          label="Email id"
                          placeholder="email id"
                          name="email_id"
                          value={formik.values.email}
                          onChange={formik.handleChange}
                          fullWidth
                          error={formik.touched.email && Boolean(formik.errors.email)}
                          helperText={formik.touched.email && formik.errors.email}
                        />
                      </Grid>
                      <Grid item xs={12} sx={AdminsStyles.textfield}>
                        <CustomTextField
                          id="password"
                          label="Password"
                          placeholder="password"
                          name="password"
                          value={formik.values.password}
                          onChange={formik.handleChange}
                          fullWidth
                          error={formik.touched.client_email && Boolean(formik.errors.password)}
                          helperText={formik.touched.client_email && formik.errors.password}
                        />
                      </Grid>
                     
                    </Grid>
                    <Grid item md={3} sm={12} xs={12} sx={{ position: 'relative' }} >
                      <input type="file" name=""
                        hidden
                        multiple
                        onChange={onchangeImage}
                        accept=".jpg, .jpeg, .png" id="FundraiserImage"
                        ref={inputFile}
                        style={{ display: 'none' }} />
                      <Box component="img" src={image} sx={AdminsStyles.uploadImage}
                        onClick={() => imageClick()} alt="vGive" />
                      <Box>
                        <Stack direction="row"
                          sx={AdminsStyles.changeImgStack}
                          onClick={() => imageClick()} >
                          <Typography variant="h6" sx={AdminsStyles.changeImage}>Change image</Typography>
                        </Stack>
                      </Box>
                    </Grid>
                  </Grid>
                  :
                  <Grid container spacing={3}>
                    <Grid item md={8} sm={12} xs={12}>
                      <Grid item xs={12} sx={AdminsStyles.textfield}>
                        
                        <Box sx={{color:"#d32f2f",fontSize:'12px'}}>{
                      formik.touched.sub_type && formik.errors.sub_type
                    }</Box>
                      </Grid>
                      <Grid item xs={12} sx={AdminsStyles.textfield}>
                        <CustomTextField
                          id="name"
                          label="Name"
                          placeholder="Name"
                          fullWidth
                          name="name"
                          value={formik.values.name}
                          onChange={formik.handleChange}
                          error={formik.touched.name && Boolean(formik.errors.name)}
                          helperText={formik.touched.name && formik.errors.name}
                        />
                      </Grid>
                      <Grid item xs={12} sx={AdminsStyles.textfield}>
                        <CustomTextField
                          id="email"
                          label="Email id"
                          placeholder="email id"
                          name="email_id"
                          value={formik.values.email}
                          onChange={formik.handleChange}
                          fullWidth
                          error={formik.touched.email && Boolean(formik.errors.email)}
                          helperText={formik.touched.email && formik.errors.email}
                        />
                      </Grid>
                      <Grid item xs={12} sx={AdminsStyles.textfield}>
                        <CustomTextField
                          id="password"
                          label="Password"
                          placeholder="password"
                          name="password"
                          value={formik.values.password}
                          onChange={formik.handleChange}
                          fullWidth
                          error={formik.touched.client_email && Boolean(formik.errors.password)}
                          helperText={formik.touched.client_email && formik.errors.password}
                        />
                      </Grid>
                      <Grid item md={3} sm={12} xs={12} sx={{ position: 'relative',left:900,top:-220}} >
                      <input type="file" name=""
                        hidden
                        multiple
                        onChange={onchangeImage}
                        accept=".jpg, .jpeg, .png" id="FundraiserImage"
                        ref={inputFile}
                        style={{ display: 'none' }} />
                      <Box component="img" src={image} sx={AdminsStyles.uploadImage}
                        onClick={() => imageClick()} alt="vGive" />
                      <Box>
                        <Stack direction="row"
                          sx={AdminsStyles.changeImgStack}
                          onClick={() => imageClick()} >
                          <Typography variant="h6" sx={AdminsStyles.changeImage}>Change image</Typography>
                        </Stack>
                      </Box>
                    </Grid>
                      
                    </Grid>
                   
                  </Grid>
                }
              </Grid>

            </Grid>

            <Box sx={{ textAlign: "left", mt: 3, mb: 3 }}>
              <CustomButton variant="outlined" sx={{ mr: 2 }}>
                Cancel
              </CustomButton>
              <CustomButton variant="contained" type="submit">Save</CustomButton>
            </Box>
          </Box>
        </form>
      </CustomBox.CustomMainBox>
    </>
  );
}
