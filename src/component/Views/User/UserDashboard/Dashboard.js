import React,{useEffect, useState} from 'react' 
import { Container} from "@mui/material"; 
import Grid from "@mui/material/Grid";   
import { Divider } from "@mui/material"; 
import LandPlan from '../../../../assets/images/landPlan.jpg'; 
import {userHomeStyle} from "./DashboardStyle";  
import Header from '../../../layout/UserDashboardHeader/Header';
import Footer from '../../../layout/UserDashboardHeader/Footer'; 
import Box from "@mui/material/Box"; 
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";   
import { Link } from "react-router-dom"; 
import IconButton from '@mui/material/IconButton'; 
import Typography from "@mui/material/Typography"; 
import { styled } from '@mui/material/styles';  
import './DashboardStyle.css'
import slider1 from '../../../../assets/images/SliderImg/best_real_estate.jpg'
import slider2 from '../../../../assets/images/SliderImg/real-estate-investing.jpg'
import slider3 from '../../../../assets/images/SliderImg/REALTOPRIGHT.png'
import slider4 from '../../../../assets/images/SliderImg/slider1.png'
import slider5 from '../../../../assets/images/SliderImg/slider2.webp'
import slider6 from '../../../../assets/images/SliderImg/Slider3.jpg'
import slider7 from '../../../../assets/images/SliderImg/slider4.jpg'
import AliceCarousel from 'react-alice-carousel';
import "react-alice-carousel/lib/alice-carousel.css";
import CountUp from 'react-countup';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem'; 
import ListItemText from '@mui/material/ListItemText'; 
const ExpandMore = styled((IconButtonProps) => {
  const { expand, ...other } = IconButtonProps;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));
 
const UserDashboardPage = ()=>{   
  const [galleryItems, setGalleryItems] = useState([slider4,slider1,slider6,slider2,slider3,slider5,slider7])
  const [sliderList, setsliderList] = useState([[]])
  const [expanded, setExpanded] = useState(false);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const responsive = {
    0: { items: 1 },
    1024: { items: 2 },
  }
  useEffect(()=>{
    const imgList = galleryItems.map(ele => <img src={ele} alt=""/> ) 
    setsliderList( imgList)
  },[])
  return (
    <>
    <Header/>
     <Container maxWidth="xl">
        <Divider className={userHomeStyle.headerDivider} />
        <AliceCarousel
        items={sliderList}
        responsive={responsive}
        autoPlayInterval={2000}
        autoPlayDirection="rtl"
        autoPlay={true}
        fadeOutAnimation={true}
        mouseTrackingEnabled={true}
        disableAutoPlayOnAction={true}
      /> 
      <Divider className={userHomeStyle.headerDivider} />
        <Grid container spacing={2} columns={12} >
          <Grid item xs={6}> 
          <Box sx={{ flexGrow: 1  }}>
             <img src={LandPlan} width={"100%"} /> 
             </Box>
          </Grid>
          <Grid item xs={6}> 
          <h1>
          STAR HOME 
          </h1>
          <Typography>
          Bannerghatta-Jigani Road receives a healthy <br/>
          demand for residential properties quality <br/>
          housing in all budget categories.<br/>
          Bannerghatta-Jigani Road receives a healthy <br/>
          demand for residential properties quality <br/>
          housing in all budget categories.<br/>
          Bannerghatta-Jigani Road receives a healthy <br/>
          demand for residential properties quality <br/>
          housing in all budget categories.<br/>
          Bannerghatta-Jigani Road receives a healthy <br/>
          demand for residential properties quality <br/>
          housing in all budget categories.<br/>
           </Typography>  
          <Link  to="/userviewmore"> View More...</Link>  
          </Grid>
        </Grid>
        <Divider className={userHomeStyle.headerDivider} />
        <Grid container spacing={2} columns={12} >
          <Grid item xs={6}> 
          <Box sx={{ flexGrow: 1  }}>
             <img src={LandPlan} width={"100%"} /> 
             </Box>
          </Grid>
          <Grid item xs={6}> 
          <h1>
          High Point: Luxury Villa Plots
          </h1>
          <Typography>
          Bannerghatta-Jigani Road receives a healthy <br/>
          demand for residential properties quality <br/>
          housing in all budget categories.<br/>
          Bannerghatta-Jigani Road receives a healthy <br/>
          demand for residential properties quality <br/>
          housing in all budget categories.<br/>
          Bannerghatta-Jigani Road receives a healthy <br/>
          demand for residential properties quality <br/>
          housing in all budget categories.<br/>
          Bannerghatta-Jigani Road receives a healthy <br/>
          demand for residential properties quality <br/>
          housing in all budget categories.<br/>
           </Typography> 
          <Link to="/userviewmore"> View More...</Link> 
          </Grid>
        </Grid>
        <Divider className={userHomeStyle.headerDivider} />

        <Grid container spacing={2} pt={5} sx={{paddingLeft:'20px' }}>
          <Box sx={{ flexGrow: 1  }}> 
          <Grid
            container
            spacing={{ xs: 2, md: 3 }}
            columns={{ xs: 4, sm: 8, md: 12 }}
          >
            <Grid item xs={2} sm={3} md={3}>
                <Card sx={{ maxWidth: 345 }}> 
                  <CardContent sx={userHomeStyle.userExperianceSection}>
                    
                  <CountUp  end={2000} /> +
                    <Typography gutterBottom variant="h4" component="div">
                    Years of experience
                    </Typography>
                  </CardContent> 
                </Card>
              </Grid>
              <Grid item xs={2} sm={3} md={3}>
                <Card sx={{ maxWidth: 345 }}> 
                  <CardContent sx={userHomeStyle.userExperianceSection}>
                  <CountUp end={15000} /> 
                    <Typography gutterBottom variant="h4" component="div">
                    Satisfied customers
                    </Typography> 
                  </CardContent> 
                </Card>
              </Grid>
              <Grid item xs={2} sm={3} md={3}>
                <Card sx={{ maxWidth: 345 }}> 
                  <CardContent sx={userHomeStyle.userExperianceSection}>
                  <CountUp end={246667} /> +
                    <Typography gutterBottom variant="h4" component="div">
                    Complete projects
                    </Typography>
                   
                  </CardContent> 
                </Card>
              </Grid> 
              <Grid item xs={2} sm={3} md={3}>
                <Card sx={{ maxWidth: 345 }}> 
                  <CardContent sx={userHomeStyle.userExperianceSection}>
                  <CountUp end={9800} /> 
                    <Typography gutterBottom variant="h4" component="div">
                    Plots Sold
                    </Typography>
                   
                  </CardContent> 
                </Card>
              </Grid> 
          </Grid>
          </Box>
          <Divider className={userHomeStyle.headerDivider} />
          </Grid>   
          <Divider className={userHomeStyle.headerDivider} />
        <Grid container spacing={2} pt={5} sx={{paddingLeft:'20px' }}>
          <Box sx={{ flexGrow: 1,textAlign:'center'  }}>
            
          <h1>Browse Residential Projects in Top Cities</h1>
          <br/>
          <Grid
            container
            spacing={{ xs: 2, md: 3 }}
            columns={{ xs: 4, sm: 8, md: 12 }}
          > 
              <Grid item xs={2} sm={4} md={4} >
                <Card sx={{ maxWidth: 445 }}> 
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                    Flats for Sale in Bangalore
                    </Typography>
                    <List >
                    <ListItem disablePadding alignItems="flex-start">   <ListItemText  primary="Flats for Sale in Whitefield	"   />  </ListItem> 
                    <ListItem disablePadding alignItems="flex-start">   <ListItemText   primary=" Flats for Sale in Indira Nagar"   />  </ListItem> 
                    <ListItem disablePadding alignItems="flex-start">   <ListItemText   primary="Flats for Sale in Bellandur"  />  </ListItem>
                    <ListItem disablePadding alignItems="flex-start">   <ListItemText   primary="Flats for Sale in Chandra Layout		"  />  </ListItem>
                    <ListItem disablePadding alignItems="flex-start">   <ListItemText   primary=" Flats for Sale in J. P. Nagar				"  />  </ListItem>
                    <ListItem disablePadding alignItems="flex-start">   <ListItemText   primary="Flats for Sale in BTM Layout"  />  </ListItem>
                    <ListItem disablePadding alignItems="flex-start">   <ListItemText   primary=" Flats for Sale in Jayanagar	"  />  </ListItem>
                    <ListItem disablePadding alignItems="flex-start">   <ListItemText   primary=" Flats for Sale in Bangalore Below 10 Lakhs	"  />  </ListItem>
                    <ListItem disablePadding alignItems="flex-start">   <ListItemText   primary=" Flats for Sale in Bangalore Below 15 Lakhs"  />  </ListItem>
                    <ListItem disablePadding alignItems="flex-start">   <ListItemText   primary="Flats for Sale in Bangalore Below 20 Lakhs"  />  </ListItem>
                    <ListItem disablePadding alignItems="flex-start">   <ListItemText   primary="Flats for Sale in Bangalore Below 25 Lakhs"  />  </ListItem> 
                    <ListItem disablePadding alignItems="flex-start">   <ListItemText   primary="Flats for Sale in Bangalore Below 30 Lakhs"  />  </ListItem>
                    <ListItem disablePadding alignItems="flex-start">   <ListItemText   primary="Flats for Sale in Bangalore Below 35 Lakhs"  />  </ListItem>
                    <ListItem disablePadding alignItems="flex-start">   <ListItemText   primary="Flats for Sale in Bangalore Below 40 Lakhs"  />  </ListItem>
                    <ListItem disablePadding alignItems="flex-start">   <ListItemText   primary=" Flats for Sale in Bangalore Below 45 Lakhs"  />  </ListItem>
                    <ListItem disablePadding alignItems="flex-start">   <ListItemText   primary=" Flats for Sale in Bangalore Below 50 Lakhs	"  />  </ListItem>
                 </List>
                  </CardContent> 
                </Card>
              </Grid> 
              <Grid item xs={2} sm={4} md={4} >
                <Card sx={{ maxWidth: 445 }}> 
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                    Flats for Sale in Chennai
                    </Typography>
                    <List >
                    <ListItem disablePadding alignItems="flex-start">   <ListItemText  primary=" Flats for Sale in Thoraipakkam"   />  </ListItem> 
                    <ListItem disablePadding alignItems="flex-start">   <ListItemText  primary=" Flats for Sale in Sholinganallur"   />  </ListItem> 
                    <ListItem disablePadding alignItems="flex-start">   <ListItemText  primary="Flats for Sale in Medavakkam	"   />  </ListItem> 
                    <ListItem disablePadding alignItems="flex-start">   <ListItemText  primary="Flats for Sale in Mylapore"   />  </ListItem> 
                    <ListItem disablePadding alignItems="flex-start">   <ListItemText  primary="Flats for Sale in Adyar	"   />  </ListItem> 
                    <ListItem disablePadding alignItems="flex-start">   <ListItemText  primary="Flats for Sale in T Nagar	"   />  </ListItem> 
                    <ListItem disablePadding alignItems="flex-start">   <ListItemText  primary=" Flats for Sale in Perungudi	"   />  </ListItem> 
                    <ListItem disablePadding alignItems="flex-start">   <ListItemText  primary="Flats for Sale in Chennai Below 10 Lakhs	"   />  </ListItem> 
                    <ListItem disablePadding alignItems="flex-start">   <ListItemText  primary="Flats for Sale in Chennai Below 15 Lakhs	"   />  </ListItem> 
                    <ListItem disablePadding alignItems="flex-start">   <ListItemText  primary="Flats for Sale in Chennai Below 20 Lakhs"   />  </ListItem> 
                    <ListItem disablePadding alignItems="flex-start">   <ListItemText  primary="Flats for Sale in Chennai Below 25 Lakhs"   />  </ListItem> 
                    <ListItem disablePadding alignItems="flex-start">   <ListItemText  primary="Flats for Sale in Chennai Below 30 Lakhs"   />  </ListItem> 
                    <ListItem disablePadding alignItems="flex-start">   <ListItemText  primary="Flats for Sale in Chennai Below 35 Lakhs"   />  </ListItem> 
                    <ListItem disablePadding alignItems="flex-start">   <ListItemText  primary="Flats for Sale in Chennai Below 40 Lakhs"   />  </ListItem> 
                    <ListItem disablePadding alignItems="flex-start">   <ListItemText  primary="Flats for Sale in Chennai Below 45 Lakhs"   />  </ListItem> 
                    <ListItem disablePadding alignItems="flex-start">   <ListItemText  primary="Flats for Sale in Chennai Below 50 Lakhs"   />  </ListItem> 
                   </List> 
                  </CardContent> 
                </Card>
              </Grid> 
              <Grid item xs={2} sm={4} md={4} >
                <Card sx={{ maxWidth: 445 }}> 
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                    Flats for Sale in Andhrs Pradesh
                    </Typography>
                    <List >
                    <ListItem disablePadding alignItems="flex-start">   <ListItemText  primary="Flats for Sale in Tirupati"   />  </ListItem> 
                    <ListItem disablePadding alignItems="flex-start">   <ListItemText  primary="Flats for Sale in kadapa	"   />  </ListItem> 
                    <ListItem disablePadding alignItems="flex-start">   <ListItemText  primary="Flats for Sale in  Nellore	"   />  </ListItem> 
                    <ListItem disablePadding alignItems="flex-start">   <ListItemText  primary="Flats for Sale in Guntur	"   />  </ListItem> 
                    <ListItem disablePadding alignItems="flex-start">   <ListItemText  primary=" Flats for Sale in rajimundry"   />  </ListItem> 
                    <ListItem disablePadding alignItems="flex-start">   <ListItemText  primary=" Flats for Sale in Hindupur	"   />  </ListItem> 
                    <ListItem disablePadding alignItems="flex-start">   <ListItemText  primary=" Flats for Sale in  Tenali	"   />  </ListItem> 
                    <ListItem disablePadding alignItems="flex-start">   <ListItemText  primary="Flats for Sale in Andhra Pradesh Below 10 Lakhs"   />  </ListItem> 
                    <ListItem disablePadding alignItems="flex-start">   <ListItemText  primary="Flats for Sale in AndhraPradesh Below 15 Lakhs			"   />  </ListItem> 
                    <ListItem disablePadding alignItems="flex-start">   <ListItemText  primary="Flats for Sale in AndhraPradesh Below 20Lakhs			"   />  </ListItem> 
                    <ListItem disablePadding alignItems="flex-start">   <ListItemText  primary="Flats for Sale in AndhraPradesh Below 25 Lakhs			"   />  </ListItem> 
                    <ListItem disablePadding alignItems="flex-start">   <ListItemText  primary="Flats for Sale in AndhraPradesh Below 30 Lakhs			"   />  </ListItem> 
                    <ListItem disablePadding alignItems="flex-start">   <ListItemText  primary="Flats for Sale in AndhraPradesh Below 35 Lakhs			"   />  </ListItem> 
                    <ListItem disablePadding alignItems="flex-start">   <ListItemText  primary="Flats for Sale in AndhraPradesh Below 40 Lakhs			"   />  </ListItem> 
                    <ListItem disablePadding alignItems="flex-start">   <ListItemText  primary="Flats for Sale in AndhraPradesh Below 45 Lakhs			"   />  </ListItem> 
                    <ListItem disablePadding alignItems="flex-start">   <ListItemText  primary="Flats for Sale in AndhraPradesh Below 50 Lakhs			"   />  </ListItem> 
                    </List>   
                  </CardContent> 
                </Card>
              </Grid> 
          </Grid>
          </Box>
          <Divider className={userHomeStyle.headerDivider} />
          </Grid>   
          <Divider className={userHomeStyle.headerDivider} />
          <Grid container spacing={2} pt={5} sx={{paddingLeft:'20px'}}>
          <Box sx={{ flexGrow: 1,textAlign:'center' }}>
            
          <h1> MR SANDEEP Reviews - See What Our Valuable Customers Says</h1>
          <br/> 
          <Grid pt={5}
            container
            spacing={{ xs: 2, md: 2 }}
            columns={{ xs: 4, sm: 8, md: 12 }}
          >
            {Array.from(Array(8)).map((_, index) => (
              <Grid item xs={1} sm={3} md={3} key={index}>
                <Card sx={{ maxWidth: 345 }}> 
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                    PIC
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                    I am Mohamed Kouse. The NoBroker app is very useful for home seekers looking for homes to rent. I have also earned money by using the Refer & Earn option. I am so happy to use this app because I got a good house for the right amount. I have also earned 21000 in last 30 days with the Refer & Earn option. The NoBroker company customer care is excellent at handling their customers. They always give correct responses and updates every day. So I am giving them a 5-star rating.
                    </Typography>
                  </CardContent>
                  <CardActions> 
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
          </Box>
          </Grid>  
      </Container>
      <Footer/>
       </>
  )
}

export default UserDashboardPage