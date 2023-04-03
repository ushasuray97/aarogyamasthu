import  React,{useState,useEffect} from "react";
import Avatar from "@mui/material/Avatar";
import { Tooltip, Box, Typography, Stack, Container } from "@mui/material";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import NotificationsIcon from '@mui/icons-material/Notifications';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import KeyIcon from '@mui/icons-material/Key';
import SearchIcon from "@mui/icons-material/Search";
// custom component
import { CustomAppBar } from "../../../styles/styled-components/appbar/appbar.style";
import { CustomStyledInputBase } from "../../../styles/styled-components/search/styledinputbase.style";
import { CustomSearch } from "../../../styles/styled-components/search/search.style";
import { CustomMenu } from "../../../styles/styled-components/menu/menu.style";
import { CustomMenuItem } from "../../../styles/styled-components/menu/menuitem.style";
import { CustomToolbar } from "../../../styles/styled-components/appbar/toolbar.style";
import { CustomSearchIconWrapper } from "../../../styles/styled-components/search/searchiconwrapper.style";
import { CustomIconButton } from "../../../styles/styled-components/iconbutton.style";
import { CustomListItemIcon } from "../../../styles/styled-components/sideMenu/listitemicon.style";
// custom files
import { HeaderStyles } from "./HeaderStyle";
import LoginToster from "../../tosterMessage/LoginToster";
import { useDispatch, useSelector } from "react-redux";
import { clearState } from "../../../store/reducers/LoginSlice";
import { logoutSlice, logoutUser } from "../../../store/reducers/logoutSlice";
import { Link } from "react-router-dom";

const settings = [
  { name: "Profile", icon: <AccountCircleIcon />, link:'/manageprofile' },
  { name: "Change Password", icon: <KeyIcon /> ,link:'/manageprofile' },
  { name: "Logout", icon: <PowerSettingsNewIcon />,link:'/' },
];

function Header() {
  const dispatch = useDispatch();
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [successToster, setSuccessToster] = useState(false);
  const [tosterColor, setTosterColor] = useState("")
  const [tosterMessage, setTosterMessage] = useState("hello");
  const [loggedIn,setLoggedin] = useState(localStorage.getItem("isLoggedIn"))
  const { isSuccess } = useSelector((state) => state.loginUser);
 
  useEffect(() => {
    if (isSuccess) {
      setSuccessToster(true);
      setTosterColor("Success");
      setTosterMessage("Logged in Successfully")
      setTimeout(() => {
        setSuccessToster(false);
      }, 3000);
      dispatch(clearState());
    }
  }, [isSuccess])

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = (setting) => {
    let id = localStorage.getItem("sessionId"); 
    setAnchorElUser(null);
    if (setting.name === "Logout" && id) {
      dispatch(logoutUser({id})).then((result) => {
        if (result.payload.status === true) {
          setSuccessToster(true);
          setTimeout(() => { 
            setSuccessToster(false); 
          }, 3000);
          localStorage.clear();
          localStorage.clear();
          localStorage.clear()
          localStorage.removeItem("isLoggedIn")
          setLoggedin(false)
          window.onload = function () { 
            window.location = "/login"; 
          } 
          window.onload()
        }
      });
    }
  };

  let userName = localStorage.getItem("firstName");
  let Designation = localStorage.getItem("designation");
  return (
    <CustomAppBar position="sticky" boxShadow={12}>
      <Container maxWidth="xl">
        <CustomToolbar disableGutters>
          <CustomSearch >
            <CustomSearchIconWrapper>
              <SearchIcon sx={HeaderStyles.searchIcon} />
            </CustomSearchIconWrapper>
            <CustomStyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
            />
          </CustomSearch>
          <Box sx={HeaderStyles.flexGrow1} >
            {successToster && <LoginToster tosterColor={tosterColor} message={tosterMessage} setSuccessToster={setSuccessToster} />}
          </Box>
          <Box sx={HeaderStyles.flexGrow0}>

            <Stack direction="row" alignItems="center" gap={1}>
              <NotificationsIcon sx={{ color: "#000" }} />
              <Typography variant="div" sx={HeaderStyles.adminTypography}>
                <Box sx={HeaderStyles.adminName}>{userName}</Box>
                <Box sx={HeaderStyles.adminDesignation}>{Designation}</Box>
              </Typography >

              <Tooltip title="">
                <CustomIconButton
                  onClick={handleOpenUserMenu}
                  sx={HeaderStyles.avatarBtn}
                >
                  <Avatar alt="Bemy Sharp" src="/static/images/avatar/2.jpg" />
                </CustomIconButton>
              </Tooltip>
              <CustomMenu
                sx={HeaderStyles.avatarMenu}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <CustomMenuItem key={setting} onClick={() => handleCloseUserMenu(setting)}> 
                    <CustomListItemIcon
                      sx={{
                        minWidth: 0,
                        mr: 2,
                        justifyContent: "center",
                      }}
                    >
                      {setting.icon}
                    </CustomListItemIcon>
                    <Link to={setting.link}>
                    <Typography textAlign="left">{setting.name}</Typography> 
                    </Link>
                  </CustomMenuItem>
                ))}
              </CustomMenu>
            </Stack>
          </Box>
        </CustomToolbar>
      </Container>
    </CustomAppBar>
  );
}
export default Header;
