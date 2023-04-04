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
import logo from "../../../assets/images/aarogya-logo.jpeg"; 
  import LinkedInIcon from '@mui/icons-material/LinkedIn';
  import WhatsAppIcon from '@mui/icons-material/WhatsApp';
  import FacebookIcon from '@mui/icons-material/Facebook';
  import InstagramIcon from '@mui/icons-material/Instagram';
  import TwitterIcon from '@mui/icons-material/Twitter';
import { Container } from '@mui/system';
import {footerStyle} from './FooterStyles';
import DownloadIcon from '../../../assets/images/logo/download.jpg' 
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
                    
                  </div>
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
            <Grid  item xs={6}>
                <List sx={footerStyle.footerList}>
                  <Typography variant="h6" >DOWNLOAD OUR APPS</Typography>
                  <nav aria-label="secondary mailbox folders">
                  <Box sx={footerStyle.socialMedia} paddingLeft={10}>
                  <Box sx={footerStyle.socialLinks}>
                  <img src={DownloadIcon} alt="logo" width="100px"/>
                  </Box> 
                    </Box>   
                  </nav>
                </List>
                </Grid>
              <Grid item xs={6}>

                <List sx={footerStyle.footerList}>
                  <Typography variant="h6">Connect with Us:</Typography>
                  <nav aria-label="secondary mailbox folders">
                  <Box sx={footerStyle.socialMedia} paddingLeft={10}>
                  <Box sx={footerStyle.socialLinks}>
                        <WhatsAppIcon/>
                      </Box> 
                      <Box sx={footerStyle.socialLinks}>
                        <FacebookIcon />
                      </Box>
                      <Box sx={footerStyle.socialLinks}>
                        <InstagramIcon/>
                      </Box>
                      <Box sx={footerStyle.socialLinks}>
                        <LinkedInIcon />
                      </Box>
                      <Box sx={footerStyle.socialLinks}>
                        <TwitterIcon />
                      </Box>
                    </Box>  
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