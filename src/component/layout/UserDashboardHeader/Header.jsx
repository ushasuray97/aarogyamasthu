import React,{useState} from "react";
import {
  AppBar,
  Toolbar,
  CssBaseline, 
  Container,
  Button,
} from "@mui/material";
import { Link } from "react-router-dom"; 
import logo from "../../../assets/images/LMS-logo.png";
import userlogin from "../../../assets/images/user.svg"; 
import Box from "@mui/material/Box"; 
import { IconButton } from '@mui/material';
import SearchOutlined from '@mui/icons-material/Search'; 
import Typography from "@mui/material/Typography";
import TextField from '@mui/material/TextField';
import {headerStyle} from "./HeaderStyle"; 
import Login from "../LoginRegisterPopUp/login/Login";
import Register from "../LoginRegisterPopUp/Register/Register";
const Header = () => { 
  const [loginOpen, setloginOpen] = useState("");
  const [registerOpen, setRegisterOpen] = useState(""); 
  const [loading, setLoading] = React.useState(false);
  const [search,setSearch]=useState('');
  const loginPopupOpen = () => { 
    setloginOpen(true);
  };
  const registerPopupOpen = () => { 
    setRegisterOpen(true);
  }; 
return (
    <>
    <AppBar position="sticky" sx={headerStyle.topNavbar}>
        <CssBaseline />
        <Container maxWidth="xl">
          <Toolbar sx={headerStyle.topBarHeader}>
            <Box sx={headerStyle.navbarBrand}> 
            </Box>
            <Box pr={2}>
              <Typography sx={headerStyle.topLink}>
               Phone Number : +919606666812
              </Typography> 
            </Box>
            <Box> 
              <Typography  sx={headerStyle.topLink}>
               Mr. Sandeep
              </Typography> 
            </Box>
          </Toolbar> 
        </Container>
      </AppBar>
      <AppBar position="static" sx={headerStyle.mainNavbar}>
        <CssBaseline />
        <Container maxWidth="xl">
          <Toolbar sx={headerStyle.mainHeader}>
            <Box sx={headerStyle.navbarBrand}>
              <Box>
              <Link to="/"> 
              <img src={logo} alt="logo" sx={headerStyle.logo} width={"50%"} /> 
              </Link>
              </Box>
              <Box sx={headerStyle.subLogo}>
              <TextField 
                        fullWidth
                        id="standard-bare"
                        variant="outlined"
                        defaultValue="Search"
                        onChange={(e) => setSearch(e.target.value)}
                        InputProps={{
                            startAdornment: ( 
                                <IconButton>
                                  <SearchOutlined/>
                                </IconButton>
                            ),
                        }}
                    /> 
            </Box> 
            </Box>
            <Box sx={headerStyle.navlinks}> 
            <Box sx={headerStyle.link}>
                  <Box sx={headerStyle.loginNavlink}>
                  <Typography>
                  <Link to="/userDashboradpage">Home </Link> 
              </Typography> 
                  </Box>
                </Box> 
                <Box sx={headerStyle.link}>
                  <Box sx={headerStyle.loginNavlink}>
                  <Typography>
                  <Link to="/useraboutus">  About Us</Link>
                   
              </Typography> 
                  </Box>
                </Box> 
                <Box sx={headerStyle.link}>
                  <Box sx={headerStyle.loginNavlink}>
                  <Typography>
                  <Link to="/">  My Cart </Link>
                   
              </Typography> 
                  </Box>
                </Box> 
            </Box>
          </Toolbar> 
        </Container>
      </AppBar>
      <Login loginOpen={loginOpen} setloginOpen={setloginOpen} />
      <Register registerOpen={registerOpen} setRegisterOpen={setRegisterOpen} />
    </>
  );
};
export default Header;
