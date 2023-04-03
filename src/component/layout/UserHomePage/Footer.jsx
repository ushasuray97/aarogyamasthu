import React from 'react';
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid"; 
import { Divider, Typography } from "@mui/material"; 
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import {
  ThemeProvider,
  createTheme, 
} from '@mui/material/styles';
import logo from "../../../assets/images/LMS-logo.png";
// import facebookIcon from "../../../assets/images/facebook.svg";
// import twitterIcon from "../../../assets/images/twitter.svg";
// import instaIcon from "../../../assets/images/instagram.svg";
import { Container } from '@mui/system';
import {footerStyle} from './FooterStyles';
 
const footerLinks = createTheme({
  components: {
    MuiListItemButton: {
      styleOverrides: {
        root: {
          paddingLeft: '0px',
          paddingRight: '0px',
        },
      },
    },

  },

}); 
const Footer = () => { 
  return (
    <> 
      <Container maxWidth="xl" sx={{paddingTop:'50px'}}>
        <Divider sx={footerStyle.footerDivider} />
        <Grid container spacing={2}>
          <Grid item xs={5}>
            <Box>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <div>
                    <img src={logo} alt="logo" sx={footerStyle.logo} width={"70%"} height={"70%"} />
                    {/* <div sx={footerStyle.socialMedia} paddingLeft={10}>
                      <div sx={footerStyle.socialLinks}>
                        <img src={facebookIcon} alt="logo" sx={footerStyle.facebookIcon} />
                      </div>
                      <div sx={footerStyle.socialLinks}>
                        <img src={twitterIcon} alt="logo" sx={footerStyle.twitterIcon} />
                      </div>
                      <div sx={footerStyle.socialLinks}>
                        <img src={instaIcon} alt="logo" sx={footerStyle.instaIcon} />
                      </div>
                    </div>   */}
                  </div>
                </Grid>
                <Grid  item xs={6}>
                <List sx={footerStyle.footerList}>
                  <Typography variant="h6" >About Us</Typography>
                  <nav aria-label="secondary mailbox folders">
                    <ThemeProvider theme={footerLinks}>
                      <List>
                        <ListItem disablePadding>
                          <ListItemButton sx={footerStyle.listItemBtn}>
                            <ListItemText sx={footerStyle.footerItemList} primary="Testimonials | Blog" />
                          </ListItemButton>
                        </ListItem>
                        <ListItem disablePadding>
                          <ListItemButton sx={footerStyle.listItemBtn}>
                            <ListItemText sx={footerStyle.footerItemList} primary="Feedback" />
                          </ListItemButton>
                        </ListItem>
                        <ListItem disablePadding>
                          <ListItemButton sx={footerStyle.listItemBtn}>
                            <ListItemText sx={footerStyle.footerItemList} primary="Help Center" />
                          </ListItemButton>
                        </ListItem>
                        <ListItem disablePadding>
                          <ListItemButton sx={footerStyle.listItemBtn}>
                            <ListItemText sx={footerStyle.footerItemList} primary="Careers" />
                          </ListItemButton>
                        </ListItem> 
                      </List>
                    </ThemeProvider>
                  </nav>
                </List>
                </Grid>
              </Grid>
            </Box>
          </Grid>
          <Grid item xs={7}>
            <Box 
              sx={{
                display: 'flex',
                justifyContent: 'center',
              }}
            >
            <Grid container spacing={2}>
              <Grid item xs={4}>

                <List sx={footerStyle.footerList}>
                  <Typography variant="h6">Properties in India</Typography>
                  <nav aria-label="secondary mailbox folders">
                    <ThemeProvider theme={footerLinks}>
                      <List>
                        <ListItem disablePadding>
                          <ListItemButton sx={footerStyle.listItemBtn}>
                            <ListItemText sx={footerStyle.footerItemList} primary="Property in New Delhi" />
                          </ListItemButton>
                        </ListItem>
                        <ListItem disablePadding>
                          <ListItemButton sx={footerStyle.listItemBtn}>
                            <ListItemText sx={footerStyle.footerItemList} primary="Property in Mumbai " />
                          </ListItemButton>
                        </ListItem>
                        <ListItem disablePadding>
                          <ListItemButton sx={footerStyle.listItemBtn}>
                            <ListItemText sx={footerStyle.footerItemList} primary="Property in Bangalore" />
                          </ListItemButton>
                        </ListItem>
                        <ListItem disablePadding>
                          <ListItemButton sx={footerStyle.listItemBtn}>
                            <ListItemText sx={footerStyle.footerItemList} primary="Property in Hyderabad" />
                          </ListItemButton>
                        </ListItem> 
                      </List>
                    </ThemeProvider>
                  </nav>
                </List>
              </Grid>
              <Grid item xs={4}>
                <List sx={footerStyle.footerList}>
                  <Typography variant="h6">New Projects in India</Typography>
                  <nav aria-label="secondary mailbox folders">
                    <ThemeProvider theme={footerLinks}>
                      <List>
                        <ListItem disablePadding>
                          <ListItemButton sx={footerStyle.listItemBtn}>
                            <ListItemText sx={footerStyle.footerItemList} primary="New Projects in New Delhi" />
                          </ListItemButton>
                        </ListItem>
                        <ListItem disablePadding>
                          <ListItemButton sx={footerStyle.listItemBtn} component="a" href="#simple-list">
                            <ListItemText sx={footerStyle.footerItemList} primary="New Projects in Mumbai " />
                          </ListItemButton>
                        </ListItem>
                        <ListItem disablePadding>
                          <ListItemButton sx={footerStyle.listItemBtn} component="a" href="#simple-list">
                            <ListItemText sx={footerStyle.footerItemList} primary="New Projects in Bangalore" />
                          </ListItemButton>
                        </ListItem>
                        <ListItem disablePadding>
                          <ListItemButton sx={footerStyle.listItemBtn} component="a" href="#simple-list">
                            <ListItemText sx={footerStyle.footerItemList} primary="New Projects in Hyderabad" />
                          </ListItemButton>
                        </ListItem>
                      </List>
                    </ThemeProvider>
                  </nav>
                </List>
              </Grid>
              <Grid item xs={4}>
                <List sx={footerStyle.footerList}>
                  <Typography variant="h6">Privacy Policy</Typography>
                  <nav aria-label="secondary mailbox folders">
                    <ThemeProvider theme={footerLinks}>
                      <List>
                        <ListItem disablePadding>
                          <ListItemButton sx={footerStyle.listItemBtn}>
                            <ListItemText sx={footerStyle.footerItemList} primary="Terms & Conditions" />
                          </ListItemButton>
                        </ListItem>
                        <ListItem disablePadding>
                          <ListItemButton sx={footerStyle.listItemBtn} component="a" href="#simple-list">
                            <ListItemText sx={footerStyle.footerItemList} primary="Location" />
                          </ListItemButton>
                        </ListItem>
                      </List>
                    </ThemeProvider>
                  </nav>
                </List>
              </Grid>

            </Grid>
            </Box>
          </Grid>

        </Grid>
      </Container>
      <Container maxWidth="xl" sx={{ backgroundColor:'#3f3d3d', minHeight:"50px",paddingTop:'10px'}}> 
        <Grid container sx={{ display: 'flex',justifyContent: 'center', color:'#fff'  }}>
        Copyright &copy; 2022-2023 by LMS. All Rights Reserved.
        </Grid>
      </Container> 
    </>
  );
}
export default Footer;