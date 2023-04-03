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
import { ProjectsStyles } from "./ProjectsStyles";
import { CustomTextField } from "../../../styles/styled-components/textField.styles";
import { CustomButton } from "../../../styles/styled-components/button.style";
import * as CustomBox from "../../../styles/styled-components/box.style";
import { CustomSelect } from "../../../styles/styled-components/select.style";
import { getDepartments } from "../../../store/reducers/resourceAllocation/manageUser/getDepartmentSlice";
import {addProject, clearaddProjectState } from "../../../store/reducers/manageProjects/addProjectSlice";
//images
import UploadImage from '../../../assets/images/avatar/UploadImage.png'

export default function AddProject() {
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
    name: yup.string().required("Enter Project Name"),
    description:yup.string().required("Enter Project Description"),
    client_name: yup.string().required("Enter Client Name"),
    // technologies: yup.string().required("Select Technologies "),
    start_date: yup.date().nullable().required("Enter Start Date"),
    end_date: yup.date().nullable().required("Enter End Date"),
    sub_type: yup.string().required("Select Type "),
    status: yup.string().required("Select Status "),

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
            <Typography sx={ProjectsStyles.mainHeading}>
              Add Project
            </Typography>
          </Grid>
        </Grid>
        <form onSubmit={formik.handleSubmit}>
          <Box sx={ProjectsStyles.projectAddContainer}>
            <Grid container>
              <Grid item xs={12}>
                <FormControl >
                  <FormLabel id="demo-controlled-radio-buttons-group">Project Type</FormLabel>
                  <RadioGroup
                    aria-labelledby="demo-controlled-radio-buttons-group"
                    name="flag"
                    id="flag"  
                    defaultValue="Buy Properties"
                    value={formik.values.flag}
                    onChange={formik.handleChange}
                    sx={{ flexDirection: "row" }}
                  >
                    <FormControlLabel value="Buy Properties" control={<Radio />} label="Buy Properties" />
                    <FormControlLabel value="Sell Properties" control={<Radio />} label="Sell Properties" />
                  </RadioGroup>
                </FormControl>
                {formik.values.flag === "Buy Properties" ?
                  <Grid container spacing={3}>
                    <Grid item md={8} sm={12} xs={12}>
                      <Grid item xs={12} sx={ProjectsStyles.textfield}>
                        <FormControl fullWidth>
                          <InputLabel id="demo-simple-select-label">Type</InputLabel>
                          <CustomSelect
                            labelId="demo-simple-select-label"
                            id="sub_type"
                            name="sub_type"
                            value={formik.values.sub_type}
                            label="Type"
                            onChange={formik.handleChange}
                            error={formik.touched.sub_type && Boolean(formik.errors.sub_type)}
                            helperText={formik.touched.sub_type && formik.errors.sub_type}
                          >
                            <MenuItem value="Internal">Internal</MenuItem>
                            <MenuItem value="External">External</MenuItem>
                          </CustomSelect>
                        </FormControl>
                        <Box sx={{color:"#d32f2f",fontSize:'12px'}}>{
                      formik.touched.sub_type && formik.errors.sub_type
                    }</Box>
                      </Grid>
                      <Grid item xs={12} sx={ProjectsStyles.textfield}>
                        <CustomTextField
                          id="name"
                          label="Project Name"
                          placeholder="Project Name"
                          fullWidth
                          name="name"
                          value={formik.values.name}
                          onChange={formik.handleChange}
                          error={formik.touched.name && Boolean(formik.errors.name)}
                          helperText={formik.touched.name && formik.errors.name}
                        />
                      </Grid>
                      <Grid item xs={12} sx={ProjectsStyles.textfield}>
                        <CustomTextField
                          id="description"
                          label="Project Description"
                          placeholder="Add description regarding the project and technology used [250 words]. "
                          multiline
                          fullWidth
                          name="description"
                          value={formik.values.description}
                          onChange={formik.handleChange}
                          error={formik.touched.description && Boolean(formik.errors.description)}
                          helperText={formik.touched.description && formik.errors.description}
                        />
                      </Grid>
                      <Grid item xs={12} sx={ProjectsStyles.textfield}>
                        <CustomTextField
                          id="outlined-textarea"
                          label="Client Name"
                          placeholder="Client Name"
                          name="client_name"
                          value={formik.values.client_name}
                          onChange={formik.handleChange}
                          fullWidth
                          error={formik.touched.client_name && Boolean(formik.errors.client_name)}
                          helperText={formik.touched.client_name && formik.errors.client_name}
                        />
                      </Grid>
                      <Grid item xs={12} sx={ProjectsStyles.textfield}>
                        <CustomTextField
                          id="outlined-textarea"
                          label="Client Email"
                          placeholder="Client Email"
                          name="client_email"
                          value={formik.values.client_email}
                          onChange={formik.handleChange}
                          fullWidth
                          error={formik.touched.client_email && Boolean(formik.errors.client_email)}
                          helperText={formik.touched.client_email && formik.errors.client_email}
                        />
                      </Grid>
                      {/* <Grid item xs={12} sx={ProjectsStyles.textfield}>
                        <Box sx={{
                          '& .MuiFormControl-root': {
                            width: "100%"
                          },
                        }}>
                          <LocalizationProvider dateAdapter={AdapterDateFns}
                          >
                            <DesktopDatePicker
                              label="Select start date"
                              name="start_date"
                              disablePast
                              fullWidth
                              value={startDate}
                              onChange={(newValue) => {
                                setStartDate(newValue);
                              }}
                              renderInput={(params) => <TextField {...params} error={formik.touched.start_date && Boolean(formik.errors.start_date)}
                                helperText={formik.touched.start_date && formik.errors.start_date}
                                inputProps={
                                  {
                                    ...params.inputProps,
                                    placeholder: "dd/MM/yyyy"
                                  }
                                }
                              />}
                            />
                          </LocalizationProvider>
                        </Box>
                      </Grid> */}
                      <Grid item xs={12} sx={ProjectsStyles.textfield}>
                        <Box sx={{
                          '& .MuiFormControl-root': {
                            width: "100%"
                          },
                        }}>
                          <LocalizationProvider dateAdapter={AdapterDateFns}
                          >
                            <DesktopDatePicker
                              label="Select end date"
                              name="end_date"
                              disablePast
                              fullWidth
                              value={endDate}
                              onChange={(newValue) => {
                                setEndDate(newValue);
                              }}
                              renderInput={(params) => <TextField {...params} error={formik.touched.end_date && Boolean(formik.errors.end_date)}
                                helperText={formik.touched.end_date && formik.errors.end_date}
                                inputProps={
                                  {
                                    ...params.inputProps,
                                    placeholder: "dd/MM/yyyy"
                                  }
                                }
                              />}
                            />
                          </LocalizationProvider>
                        </Box>
                      </Grid>
                      <Grid item xs={12} sx={ProjectsStyles.textfield}>
                        <CustomAutocomplete
                          disablePortal
                          options={allDepartments}
                          id={"technologies"}
                          label={"Technologies"}
                          setOptionsSelected={setOptionsSelected}
                          error={formik.touched.technologies && Boolean(formik.errors.technologies)}
                        />
                         <Box sx={{color:"#d32f2f",fontSize:'12px'}}>{
                      formik.touched.technologies && formik.errors.technologies
                    }</Box>
                      </Grid>

                      <Grid item xs={12} sx={ProjectsStyles.textfield}>
                        <CustomTextField
                          id="outlined-textarea"
                          label="Team size"
                          placeholder="Team size"
                          name="team_size"
                          value={formik.values.team_size}
                          onChange={formik.handleChange}
                          fullWidth
                          error={formik.touched.team_size && Boolean(formik.errors.team_size)}
                          helperText={formik.touched.team_size && formik.errors.team_size}
                        />
                      </Grid>
                      <Grid item xs={12} sx={ProjectsStyles.textfield}>
                        <FormControl fullWidth>
                          <InputLabel id="demo-simple-select-label">Status</InputLabel>
                          <CustomSelect
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            label="Status"
                            name="status"
                            value={formik.values.status}
                            onChange={formik.handleChange}
                            error={formik.touched.status && Boolean(formik.errors.status)}
                            helperText={formik.touched.status && formik.errors.status}
                          >
                            <MenuItem value="Active">Active</MenuItem>
                            <MenuItem value="InActive">InActive</MenuItem>
                            <MenuItem value="Completed">Completed</MenuItem>
                            <MenuItem value="Cancelled">Cancelled</MenuItem>

                          </CustomSelect>
                        </FormControl>
                        <Box sx={{color:"#d32f2f",fontSize:'12px'}}>{
                      formik.touched.status && formik.errors.status
                    }</Box>
                      </Grid>

                      <Grid item xs={12} sx={ProjectsStyles.textfield}>
                        <Typography>Upload Document</Typography>
                        <Box sx={ProjectsStyles.uploadDoc} >
                          {/* <Typography>
                          
                            <Button >
                             upload
                              <input
                                type="file"
                                accept=".csv,.pdf,.txt,.doc,.docx"
                                id="FileUpload1"
                                name="attachments.fileName"
                                onChange={fundraiseImageOnchange}
                              />
                            </Button>
                            </Typography> */}
                          <Button component="label">
                            Upload Documents of Properties  
                            <input hidden 
                             multiple 
                            type="file"
                                accept=".csv,.pdf,.txt,.doc,.docx"
                                id="FileUpload1"
                                name="attachments.fileName"
                                onChange={fundraiseImageOnchange} />
                          </Button>
                        </Box>
                      </Grid>
                      {upload_2_FileName !== "" ? 
                      <Box sx={ProjectsStyles.docDisplay}>
                      <Typography>{upload_2_FileName}</Typography>
                      <CloseIcon onClick={handleClose}/>
                    </Box>
                    : null}
                      
                      <Grid item xs={12} sx={ProjectsStyles.textfield}>
                        <Typography>Comments/Reason</Typography>
                        <CustomTextField
                          id="outlined-textarea"
                          placeholder="Add Comments/Reason  for issues related to project [150 words]."
                          fullWidth
                          sx={{ mt: 2 }}
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
                      <Box component="img" src={image} sx={ProjectsStyles.uploadImage}
                        onClick={() => imageClick()} alt="vGive" />
                      <Box>
                        <Stack direction="row"
                          sx={ProjectsStyles.changeImgStack}
                          onClick={() => imageClick()} >
                          <Typography variant="h6" sx={ProjectsStyles.changeImage}>Change image</Typography>
                        </Stack>
                      </Box>
                    </Grid>
                  </Grid>
                  :
                  <Grid container spacing={3}>
                    <Grid item md={8} sm={12} xs={12}>
                      <Grid item xs={12} sx={ProjectsStyles.textfield}>
                        <FormControl fullWidth>
                          <InputLabel id="demo-simple-select-label">Type</InputLabel>
                          <CustomSelect
                            labelId="demo-simple-select-label"
                            id="sub_type"
                            name="sub_type"
                            value={formik.values.sub_type}
                            label="Type"
                            onChange={formik.handleChange}
                            error={formik.touched.sub_type && Boolean(formik.errors.sub_type)}
                            helperText={formik.touched.sub_type && formik.errors.sub_type}
                          >
                            <MenuItem value="Support">Support</MenuItem>
                            <MenuItem value="Development">Development</MenuItem>
                          </CustomSelect>
                        </FormControl>
                        <Box sx={{color:"#d32f2f",fontSize:'12px'}}>{
                      formik.touched.sub_type && formik.errors.sub_type
                    }</Box>
                      </Grid>
                      <Grid item xs={12} sx={ProjectsStyles.textfield}>
                        <CustomTextField
                          id="name"
                          label="Project Name"
                          placeholder="Project Name"
                          fullWidth
                          name="name"
                          value={formik.values.name}
                          onChange={formik.handleChange}
                          error={formik.touched.name && Boolean(formik.errors.name)}
                          helperText={formik.touched.name && formik.errors.name}
                        />
                      </Grid>
                      <Grid item xs={12} sx={ProjectsStyles.textfield}>
                        <CustomTextField
                          id="description"
                          label="Project Description"
                          placeholder="Add description regarding the project and technology used [250 words]. "
                          multiline
                          fullWidth
                          name="description"
                          value={formik.values.description}
                          onChange={formik.handleChange}
                          error={formik.touched.description && Boolean(formik.errors.description)}
                          helperText={formik.touched.description && formik.errors.description}
                        />
                      </Grid>
                      <Grid item xs={12} sx={ProjectsStyles.textfield}>
                        <CustomTextField
                          id="outlined-textarea"
                          label="Client Name"
                          placeholder="Client Name"
                          name="client_name"
                          value={formik.values.client_name}
                          onChange={formik.handleChange}
                          fullWidth
                          error={formik.touched.client_name && Boolean(formik.errors.client_name)}
                          helperText={formik.touched.client_name && formik.errors.client_name}
                        />
                      </Grid>
                      <Grid item xs={12} sx={ProjectsStyles.textfield}>
                        <CustomTextField
                          id="outlined-textarea"
                          label="Client Email"
                          placeholder="Client Email"
                          name="client_email"
                          value={formik.values.client_email}
                          onChange={formik.handleChange}
                          fullWidth
                          error={formik.touched.client_email && Boolean(formik.errors.client_email)}
                          helperText={formik.touched.client_email && formik.errors.client_email}
                        />
                      </Grid>
                      <Grid item xs={12} sx={ProjectsStyles.textfield}>
                        <Box sx={{
                          '& .MuiFormControl-root': {
                            width: "100%"
                          },
                        }}>
                          <LocalizationProvider dateAdapter={AdapterDateFns}
                          >
                            <DesktopDatePicker
                              label="Select start date"
                              name="start_date"
                              disablePast
                              fullWidth
                              value={startDate}
                              onChange={(newValue) => {
                                setStartDate(newValue);
                              }}
                              renderInput={(params) => <TextField {...params} error={formik.touched.start_date && Boolean(formik.errors.start_date)}
                                helperText={formik.touched.start_date && formik.errors.start_date}
                                inputProps={
                                  {
                                    ...params.inputProps,
                                    placeholder: "dd/MM/yyyy"
                                  }
                                }
                              />}
                            />
                          </LocalizationProvider>
                        </Box>
                      </Grid>
                      <Grid item xs={12} sx={ProjectsStyles.textfield}>
                        <Box sx={{
                          '& .MuiFormControl-root': {
                            width: "100%"
                          },
                        }}>
                          <LocalizationProvider dateAdapter={AdapterDateFns}
                          >
                            <DesktopDatePicker
                              label="Select end date"
                              name="end_date"
                              disablePast
                              fullWidth
                              value={endDate}
                              onChange={(newValue) => {
                                setEndDate(newValue);
                              }}
                              renderInput={(params) => <TextField {...params} error={formik.touched.end_date && Boolean(formik.errors.end_date)}
                                helperText={formik.touched.end_date && formik.errors.end_date}
                                inputProps={
                                  {
                                    ...params.inputProps,
                                    placeholder: "dd/MM/yyyy"
                                  }
                                }
                              />}
                            />
                          </LocalizationProvider>
                        </Box>
                      </Grid>
                      <Grid item xs={12} sx={ProjectsStyles.textfield}>
                        <CustomAutocomplete
                          disablePortal
                          options={allDepartments}
                          id={"technologies"}
                          label={"Technologies"}
                          setOptionsSelected={setOptionsSelected}
                          error={formik.touched.technologies && Boolean(formik.errors.technologies)}
                        />
                         <Box sx={{color:"#d32f2f",fontSize:'12px'}}>{
                      formik.touched.technologies && formik.errors.technologies
                    }</Box>
                      </Grid>

                      <Grid item xs={12} sx={ProjectsStyles.textfield}>
                        <CustomTextField
                          id="outlined-textarea"
                          label="Team size"
                          placeholder="Team size"
                          name="team_size"
                          value={formik.values.team_size}
                          onChange={formik.handleChange}
                          fullWidth
                          error={formik.touched.team_size && Boolean(formik.errors.team_size)}
                          helperText={formik.touched.team_size && formik.errors.team_size}
                        />
                      </Grid>
                      <Grid item xs={12} sx={ProjectsStyles.textfield}>
                        <FormControl fullWidth>
                          <InputLabel id="demo-simple-select-label">Status</InputLabel>
                          <CustomSelect
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            label="Status"
                            name="status"
                            value={formik.values.status}
                            onChange={formik.handleChange}
                            error={formik.touched.status && Boolean(formik.errors.status)}
                            helperText={formik.touched.status && formik.errors.status}
                          >
                            <MenuItem value="Active">Active</MenuItem>
                            <MenuItem value="InActive">InActive</MenuItem>
                            <MenuItem value="Completed">Completed</MenuItem>
                            <MenuItem value="Cancelled">Cancelled</MenuItem>

                          </CustomSelect>
                        </FormControl>
                        <Box sx={{color:"#d32f2f",fontSize:'12px'}}>{
                      formik.touched.status && formik.errors.status
                    }</Box>
                      </Grid>

                      <Grid item xs={12} sx={ProjectsStyles.textfield}>
                        <Typography>Upload Document</Typography>
                        <Box sx={ProjectsStyles.uploadDoc} >
                          {/* <Typography>
                          
                            <Button >
                             upload
                              <input
                                type="file"
                                accept=".csv,.pdf,.txt,.doc,.docx"
                                id="FileUpload1"
                                name="attachments.fileName"
                                onChange={fundraiseImageOnchange}
                              />
                            </Button>
                            </Typography> */}
                          <Button component="label">
                            Upload Documents for Project
                            <input hidden 
                             multiple 
                            type="file"
                                accept=".csv,.pdf,.txt,.doc,.docx"
                                id="FileUpload1"
                                name="attachments.fileName"
                                onChange={fundraiseImageOnchange} />
                          </Button>
                        </Box>
                      </Grid>
                      {upload_2_FileName !== "" ? 
                      <Box sx={ProjectsStyles.docDisplay}>
                      <Typography>{upload_2_FileName}</Typography>
                      <CloseIcon onClick={handleClose}/>
                    </Box>
                    : null}
                      
                      <Grid item xs={12} sx={ProjectsStyles.textfield}>
                        <Typography>Comments/Reason</Typography>
                        <CustomTextField
                          id="outlined-textarea"
                          placeholder="Add Comments/Reason  for issues related to project [150 words]."
                          fullWidth
                          sx={{ mt: 2 }}
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
                      <Box component="img" src={image} sx={ProjectsStyles.uploadImage}
                        onClick={() => imageClick()} alt="vGive" />
                      <Box>
                        <Stack direction="row"
                          sx={ProjectsStyles.changeImgStack}
                          onClick={() => imageClick()} >
                          <Typography variant="h6" sx={ProjectsStyles.changeImage}>Change image</Typography>
                        </Stack>
                      </Box>
                    </Grid>
                  </Grid>
                }
              </Grid>

            </Grid>

            <Box sx={{ textAlign: "right", mt: 3, mb: 3 }}>
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
