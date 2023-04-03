import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Divider } from "@mui/material";
import { Stack } from "@mui/system";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
//formik
import { useFormik } from 'formik';
import * as yup from 'yup';
// custom files
import { ForgotPasswordStyles } from "./ForgotPasswordStyle";
import { CustomTextField } from "../../../../styles/styled-components/textField.styles";
import { CustomCheckbox } from "../../../../styles/styled-components/checkbox.style";
import { CustomButton } from "../../../../styles/styled-components/button.style";
//image 
import facebook from "../../../../assets/images/facebook.svg"; 
import instagram from "../../../../assets/images/instagram.svg"; 

//toster notification
import LoginToster from "../../../tosterMessage/LoginToster";
import { loginUser } from "../../../../store/reducers/LoginSlice"; 
import logo from "../../../../assets/images/LMS-logo.png";
import loginBanner from '../../../../assets/images/best_real_estate.jpg'



export default function ForgotPassword() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [successToster, setSuccessToster] = useState(false);
  const [tosterColor, setTosterColor] = useState("")
  const [tosterMessage, setTosterMessage] = useState("");
  const { isError, isFetching, isSuccess } = useSelector((state) => state.loginUser);
  
  const Loginformik = useFormik({
    enableReinitialize: true,
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: yup.object({
      email: yup
        .string()
        .matches(
          /([a-z0-9]+)([{1}])?([a-zA-Z0-9]+)([a-zA-Z0-9]+)([a-z]+)/g,
          "Enter registered Email Id"
        )
        .required("Enter Email Id")
        .email("Enter Email Id")
        .max(40, "Email ID must be atmost 40 characters"),

      password: yup
        .string()
        .required("Enter Password")
        .min(8, "Password must be at least 8 characters"),
    }),
    onSubmit: values => {
      dispatch(loginUser(values))
    },
  });

  useEffect(() => {
    if (isSuccess) {
      setSuccessToster(true);
      setTosterColor("Succes");
      setTosterMessage("Logged in Successfully")
      navigate('/');
      setTimeout(() => {
        setSuccessToster(false);
      }, 3000);
    } else if (isFetching) {
      console.log("fetching!");
    } else if (isError) {
      setSuccessToster(true);
      setTosterColor("Error");
      setTosterMessage("Please Enter Correct Details")
      setTimeout(() => {
        setSuccessToster(false);
      }, 1000);
    }
  }, [isSuccess, isError, isFetching, navigate])

  const checkBoxChecked = () => {
    window.localStorage.setItem("isLoggedIn", true)

  }
  return (
    <>
      <Grid container spacing={0} sx={ForgotPasswordStyles.mainGrid} overflow="hidden">
        <Grid item md={7} xs={12}>
          <Box sx={ForgotPasswordStyles.mainBox}>
            <img
              src={loginBanner}
              alt="login_main_img"
              height="100%"
              width="100%"
            />
            <Box sx={ForgotPasswordStyles.Resource}>
              <Typography variant="h3" sx={{ 'fontWeight': '600', color: '#000', paddingLeft:'150px'}}>LMS</Typography> 
            </Box>
          </Box>
        </Grid>
        <Grid item md={5} xs={12}>
          <Box sx={ForgotPasswordStyles.mainBox1}>
            <Container maxWidth="xs">
              <form onSubmit={Loginformik.handleSubmit}>
                <Grid container spacing={0}>
                  <Grid item md={12} xs={12} sx={ForgotPasswordStyles.rgtLogoGrid}>
                    <img src={logo} alt="login_main_img" height="100%" width="60%" />
                  </Grid>
                  <Grid item md={12} xs={12} sx={ForgotPasswordStyles.formGrid}>
                    <Grid container spacing={2}>
                      <Grid item xs={12} md={12}>
                        <CustomTextField
                          label="Enter Email id"
                          variant="outlined"
                          fullWidth
                          name="email"
                          id="email"
                          type="email"
                          value={Loginformik.values.email}
                          onChange={Loginformik.handleChange}
                          error={
                            Loginformik.touched.email &&
                            Boolean(Loginformik.errors.email)
                          }
                          helperText={
                            Loginformik.touched.email && Loginformik.errors.email
                          }
                        />
                      </Grid>
                      <Grid item xs={12} md={12}>
                        <CustomTextField
                          id="outlined-password-input"
                          label="Enter Password"
                          type="password"
                          name="password"
                          fullWidth
                          value={Loginformik.values.password}
                          onChange={Loginformik.handleChange}
                          error={
                            Loginformik.touched.password &&
                            Boolean(Loginformik.errors.password)
                          }
                          helperText={
                            Loginformik.touched.password &&
                            Loginformik.errors.password
                          }
                        />
                      </Grid>
                      <Grid item xs={12} md={12}>
                        <CustomTextField
                          id="outlined-password-input"
                          label="Confirm Password"
                          type="password"
                          name="password"
                          fullWidth
                          value={Loginformik.values.password}
                          onChange={Loginformik.handleChange}
                          error={
                            Loginformik.touched.password &&
                            Boolean(Loginformik.errors.password)
                          }
                          helperText={
                            Loginformik.touched.password &&
                            Loginformik.errors.password
                          }
                        />
                      </Grid> 
                      <Grid item xs={12} sx={ForgotPasswordStyles.btnLogin}>
                        <CustomButton type="submit" variant="contained" fullWidth sx={ForgotPasswordStyles.Login_btn}>
                          Reset Password
                        </CustomButton>
                      </Grid>
                    
                      <Grid item xs={12} sx={{mt:1,mb:1}}>
                        <Stack direction="row">
                        <Grid item xs={5.5} >
                          <Divider />
                        </Grid>
                        <Grid item xs={1} sx={{marginTop:"-8px",pl:0.5}}>
                          OR
                        </Grid>
                        <Grid item xs={5.5}>
                        <Divider />
                        </Grid>
                        </Stack>

                      </Grid>
                      <Grid item xs={12} md={8}>
                        <Typography>
                         Did you remember password?
                        </Typography>
                      </Grid>
                      <Grid item xs={12} md={4}>
                        <Link to="/login">Login Now
                        </Link>
                      </Grid>


                    </Grid>
                  </Grid>
                </Grid>
              </form>
            </Container>
          </Box>
        </Grid>
        {successToster && <LoginToster tosterColor={tosterColor} message={tosterMessage} setSuccessToster={setSuccessToster} />}
      </Grid>
    </>
  );
}


