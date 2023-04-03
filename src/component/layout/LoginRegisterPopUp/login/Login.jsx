import React,{useState} from "react";
import Dialog from "@mui/material/Dialog"; 
import Box from "@mui/material/Box"; 
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";  
import Slide from "@mui/material/Slide";  
import Link from "@mui/material/Link";
import {Button} from '@mui/material';
import { styled } from "@mui/material/styles"; 
import loginImage from "../../../../assets/images/best_real_estate.jpg";  
import { Link as RouterLink } from 'react-router-dom'; 
import Cross from "../../../../assets/images/closebtn.svg";
import {loginPopupStyle} from "./LoginStyles"; 
import Register from '../Register/Register'; 
import { useNavigate } from "react-router-dom"; 
//formik
import { useFormik } from 'formik';
import * as yup from 'yup';
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const StyledPaper = styled(Paper)`
  background-color: #fff;
  overflow: hidden !important;
  border-radius: 30px 30px 0px 0px !important;
`;  
const Login = ({ loginOpen, setloginOpen }) => {  
  const [loading, setLoading] = React.useState(false); 
  const [registerModal,setRegisterModal]=useState("")
  const loginModalPopupStyle = {
    position: "fixed",
    right: "0",
    bottom: "0",
    top: "75px",
    left: "0",
  };  
  let navigate = useNavigate();
  const loginPopupClose = () => { 
    setloginOpen(false)
  }; 
  const handleOnSubmit = ()=>{
    navigate('/dashboard')
  }   
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
      navigate('/dashboard')
      // dispatch(loginUser(values))
    },
  }); 
  return (
    <>
      <div className="mainContent">
        <Dialog
          fullScreen
          open={loginOpen}
          onClose={loginPopupClose}
          TransitionComponent={Transition}
          sx={loginModalPopupStyle}
          className="loginModalDialog"
          PaperComponent={StyledPaper}
        >
          <div>
            <Box>
              <Grid container sx={loginPopupStyle.loginRow} spacing={2}>
                <Grid
                  item
                  xs={4}
                  sx={{ 
                    backgroundImage: `url(${loginImage})`,
                    width: '100%',
                    height: '100vh',
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                  }}
                >
                  <Box sx={loginPopupStyle.paperContainer}></Box>
                </Grid>
                <Grid item xs={8}>
                  <Box sx={loginPopupStyle.loginFormArea}>
                    <Link
                      type="button"
                      onClick={loginPopupClose}
                      sx={loginPopupStyle.loginPopupCloseBtn}
                      aria-label="Close"
                    >
                      <img src={Cross} />
                    </Link>
                    <Box sx={loginPopupStyle.loginFormContainer}>
                      {/* Login Module */} 
                        <Box sx={{ mt: 1 }}>
                          <form onSubmit={handleOnSubmit}>
                            <Typography
                              component="h1"
                              align="left"
                              variant="h3"
                              color="primary"
                              sx={loginPopupStyle.LoginPageHeader} 
                            >
                              Login
                            </Typography>
                            <TextField
                              margin="normal"
                              fullWidth
                              id="email"
                              label="Email ID"
                              name="email"
                              autoComplete="email"
                              color="primary" 
                              value={Loginformik.values.email}
                          onChange={Loginformik.handleChange}
                          error={
                            Loginformik.touched.email &&
                            Boolean(Loginformik.errors.email)
                          }
                          helperText={
                            Loginformik.touched.email && Loginformik.errors.email
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
                              }}   />
                            <TextField
                              margin="normal"
                              fullWidth
                              name="password"
                              label="Password"
                              type="password"
                              id="password"
                              color="primary" 
                              autoComplete="current-password"
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
                            <Box sx={loginPopupStyle.forgotPassword}>
                              <Link
                                href="#" 
                                variant="subtitle1"
                                underline="none"
                                sx={loginPopupStyle.forgotPasswordLink}
                              >
                                Forgot password
                              </Link>
                            </Box> 
                            <Button 
                              fullWidth
                              variant="contained"
                              type="submit"
                              loading={loading}
                              color="primary"
                              sx={{ p: 2, borderRadius: "2rem",fontWeight : "500", fontSize:"16px" }}
                            >
                              Login
                            </Button>
                            <Box sx={loginPopupStyle.HrLine}>
                              <Typography
                                variant="subtitle2"
                                sx={loginPopupStyle.OrLine}
                              >
                                <span sx={loginPopupStyle.OrText}>OR</span>
                              </Typography>
                            </Box> 
                            <Grid container>
                              <Typography variant="subtitle1" sx={loginPopupStyle.notAMemberLink}>
                                Not a member?{" "}
                                <span
                                  onClick={() => {setloginOpen(false);setRegisterModal(true)}}
                                  style={{ color: "#FE1722", marginLeft : "5px" }} 
                                >  <RouterLink to=""> Register now </RouterLink>
                                   
                                </span> 
                              </Typography>
                            </Grid>
                          </form>
                        </Box> 
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </div>
         </Dialog>
         {registerModal ? <Register  registerOpen={registerModal} setRegisterOpen={setRegisterModal} /> :null} 
      </div >
    </>
  );
};

export default Login;
