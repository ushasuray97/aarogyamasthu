import * as React from "react";
import { Link } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import ListItemText from "@mui/material/ListItemText";
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import ContactSupportOutlinedIcon from '@mui/icons-material/ContactSupportOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import { Box } from "@mui/material";
// custom files
import { CustomDrawer } from "../../../styles/styled-components/sideMenu/drawer.style";
import { CustomListItem } from "../../../styles/styled-components/sideMenu/listitem.style";
import { CustomListItemIcon } from "../../../styles/styled-components/sideMenu/listitemicon.style";
import { CustomListItemButton } from "../../../styles/styled-components/sideMenu/listitembutton.style";
import { CustomList } from "../../../styles/styled-components/sideMenu/list.style";
import { SidebarStyles } from "./SidebarStyle";
import TopMenu from "./TopMenu";
//image
import LOGO1 from '../../../assets/images/LMS-logo.png';
import Logo from '../../../assets/images/LMS-logo.png';
const BottomList = {
  menu: [
    { name: "Settings", link: "#", icon: <SettingsOutlinedIcon /> },
    { name: "Contact us", link: "#", icon: <ContactSupportOutlinedIcon /> },
    { name: "Logout", link: "#", icon: <LogoutOutlinedIcon /> },
  ],
};

export default function Sidebar() {
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={SidebarStyles.mainBox}>
      <CssBaseline />
      <CustomDrawer
        variant="permanent"
        open={open}
        onMouseOver={handleDrawerOpen}
        onMouseOut={handleDrawerClose}
      >
        <CustomList>
          <CustomListItem sx={SidebarStyles.customListItem}>
            {open ?  <img src={Logo} alt="Logo" style={{ height: '100%', width: "100px"}} /> 
            : <img src={LOGO1} alt="Logo" style={{ height: '100%', width: "75px"}} />}

          </CustomListItem>
          <TopMenu />
        </CustomList>

        <CustomList sx={{ mt: 10 }}>
          {BottomList.menu.map((textBottom, index) => (
            <CustomListItem
              key={textBottom.name}
              disablePadding
              sx={{ display: "block" }}
            >
              <Link to={`/${textBottom.link}`} className="routerLink">
                <CustomListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 1.5,
                  }}
                >
                  <CustomListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                    }}
                  >
                    {textBottom.icon}
                  </CustomListItemIcon>
                  <ListItemText
                    primary={textBottom.name}
                    sx={{ opacity: open ? 1 : 0 }}
                  />
                </CustomListItemButton>
              </Link>
            </CustomListItem>
          ))}
        </CustomList>
      </CustomDrawer>
    </Box>
  );
}
