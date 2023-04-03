import React,{useState} from "react";
import Dialog from "@mui/material/Dialog"; 
import Box from "@mui/material/Box"; 
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper"; 
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";  
import Slide from "@mui/material/Slide";  
import {Button} from '@mui/material';
import { styled } from "@mui/material/styles"; 
import loginImage from "../../../../assets/images/REALTOPRIGHT.png";  
import { Link as RouterLink } from 'react-router-dom'; 
import Cross from "../../../../assets/images/closebtn.svg";
import {registerPopupStyle} from "./RegisterStyles";
import Login from "../login/Login";  
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const StyledPaper = styled(Paper)`
  background-color: #fff;
  overflow: hidden !important;
  border-radius: 30px 30px 0px 0px !important;
`;  
const Register = ({ registerOpen, setRegisterOpen}) => {  
  const [loading, setLoading] = useState(false);  
  const [loginModal, setLoginModal] = useState(false); 
  const loginPopupClose = () => { 
    setRegisterOpen(false)
  }; 
  const loginPopupStyle = {
    position: "fixed",
    right: "0",
    bottom: "0",
    top: "75px",
    left: "0",
  };  
  const onHandleRegister = ()=>{
    setRegisterOpen(false) 
  }
  return (
    <>
      <div className="mainContent">
        <Dialog
          fullScreen
          open={registerOpen}
          onClose={loginPopupClose}
          TransitionComponent={Transition}
          sx={loginPopupStyle}
          className="loginModalDialog"
          PaperComponent={StyledPaper}
        >
          <div>
            <Box>
              <Grid container sx={registerPopupStyle.loginRow} spacing={2}>
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
                  <Box sx={registerPopupStyle.paperContainer}></Box>
                </Grid>
                <Grid item xs={8}>
                  <Box sx={registerPopupStyle.loginFormArea}>
                    <Link
                      type="button"
                      onClick={loginPopupClose}
                      sx={registerPopupStyle.loginPopupCloseBtn}
                      aria-label="Close"
                    >
                      <img src={Cross} />
                    </Link>
                    <Box sx={registerPopupStyle.loginFormContainer}>
                      {/* Login Module */} 
                        <Box sx={{ mt: 1 }}>
                          <form onSubmit={onHandleRegister}>
                            <Typography
                              component="h1"
                              align="left"
                              variant="h3"
                              color="primary"
                              sx={registerPopupStyle.LoginPageHeader} 
                            >
                              Register Now
                            </Typography>
                            <Grid container maxWidth="lg" spacing={2} sx={{ mb: 0 }}>
                              <Grid item lg={6} md={6} sm={12} xs={12}>
                                <TextField
                                  label="First name"
                                  name='first_name'
                                  margin="normal" size="medium" 
                                  onKeyUp={(e) =>  e.target.value[0] === " " ? (e.target.value = e.target.value.replace(/\s/g, "" )) : null}
                                  onKeyDown={(evt) => {
                                    if (evt.which === 38 || evt.which === 40 || evt.which === 32) { evt.preventDefault()  }
                                   }}
                                  fullWidth />
                              </Grid>
                              <Grid item lg={6} md={6} sm={12} xs={12}>
                                <TextField
                                  label="Last name"
                                  name='last_name'
                                  size="medium" margin="normal"
                                  onKeyUp={(e) =>e.target.value[0] === " "  ? (e.target.value = e.target.value.replace( /\s/g,  "" )) : null}
                                  onKeyDown={(evt) => {
                                      if (evt.which === 38 || evt.which === 40 || evt.which === 32) { evt.preventDefault() }}}
                                  fullWidth />
                              </Grid>
                            </Grid>
                            <TextField
                                  label="Phone number"
                                  name='phone_number'
                                  margin="normal"
                                  onKeyUp={(e) =>e.target.value[0] === " "  ? (e.target.value = e.target.value.replace( /\s/g,  "" )) : null}
                                  onKeyDown={(evt) => { if (evt.which === 38 || evt.which === 40 || evt.key === "e") { evt.preventDefault()}}}
                                  fullWidth />            
                            <TextField
                              margin="normal"
                              fullWidth
                              id="email"
                              label="Email ID"
                              name="email"
                              autoComplete="email"
                              color="primary" 
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
                            /> 
                             <TextField
                              margin="normal"
                              fullWidth
                              name="password"
                              label="Password"
                              type="password"
                              id="password"
                              color="primary" 
                              onKeyDown={(evt) => {
                                if (evt.which === 38 || evt.which === 40 || evt.which === 32) {
                                  evt.preventDefault()
                                }
                              }} 
                            />
                            <Button 
                              fullWidth
                              variant="contained"
                              type="submit"
                              loading={loading}
                              color="primary"
                              sx={{ p: 2, borderRadius: "2rem",fontWeight : "500", fontSize:"16px" }}
                            >
                             Register
                            </Button>
                            <Box sx={registerPopupStyle.HrLine}>
                              <Typography
                                variant="subtitle2"
                                sx={registerPopupStyle.OrLine}
                              >
                                <span sx={registerPopupStyle.OrText}>OR</span>
                              </Typography>
                            </Box> 
                            <Grid container>
                              <Typography variant="subtitle1" sx={registerPopupStyle.notAMemberLink}>
                              Already registered? {" "}
                                <span
                                  onClick={() =>{ setRegisterOpen(false);setLoginModal(true)}}
                                  style={{ color: "#FE1722", marginLeft : "5px" }}
                                >
                                  <RouterLink to="">
                                   Login now
                                  </RouterLink>
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
         {loginModal ?  <Login loginOpen={loginModal} setloginOpen={setLoginModal} />:null} 
      </div >
    </>
  );
};

export default Register;
