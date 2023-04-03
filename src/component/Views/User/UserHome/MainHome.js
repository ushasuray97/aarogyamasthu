import React,{useState} from 'react' 
import { Container} from "@mui/material"; 
import Grid from "@mui/material/Grid";   
import { Divider } from "@mui/material"; 
import LandPlan from '../../../../assets/images/landPlan.jpg';
import CartImage from '../../../../assets/images/real-estate-investing.jpg';
import {mainHomeStyle} from "./MainHomeStyles";  
import Header from '../../../layout/UserHomePage/Header';
import Footer from '../../../layout/UserHomePage/Footer'; 
import Box from "@mui/material/Box"; 
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button"; 
import Link from '@mui/material/Link'; 
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Typography from "@mui/material/Typography"; 
import { styled } from '@mui/material/styles';
 
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


const MainHome = ()=>{   
  const [expanded, setExpanded] = useState(false);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  return (
    <>
    <Header/>
     <Container maxWidth="xl">
        <Divider className={mainHomeStyle.headerDivider} />
        <Grid container spacing={2} columns={12} >
          <Grid item xs={6}> 
          <Box sx={{ flexGrow: 1  }}>
             <img src={LandPlan} width={"100%"} /> 
             </Box>
          </Grid>
          <Grid item xs={6}> 
          <h1>
          Find a home you'll love
          </h1>
          <Typography>
          LMS is a full stack service provider for all real estate needs, with 15+ services including home loans, pay rent, packers and movers, legal assistance, property valuation, and expert advice. As the largest platform for buyers and sellers of property to connect in a transparent manner, Magicbricks has an active base of over 15 lakh property listings. 
          <br/>
          LMS is a full stack service provider for all real estate needs, with 15+ services including home loans, pay rent, packers and movers, legal assistance, property valuation, and expert advice. As the largest platform for buyers and sellers of property to connect in a transparent manner, Magicbricks has an active base of over 15 lakh property listings. 
          </Typography> 
          </Grid>
        </Grid>
        <Divider className={mainHomeStyle.headerDivider} />
        <Grid container spacing={2} pt={5} sx={{paddingLeft:'20px' }}>
          <Box sx={{ flexGrow: 1  }}>
            
          <h1>Browse Residential Projects in Top 8 Cities</h1>
          <br/>
          <Grid
            container
            spacing={{ xs: 2, md: 3 }}
            columns={{ xs: 4, sm: 8, md: 12 }}
          >
            {Array.from(Array(8)).map((_, index) => (
              <Grid item xs={2} sm={3} md={3} key={index}>
                <Card sx={{ maxWidth: 345 }}>
                  <CardMedia
                    component="img"
                    alt="green iguana"
                    height="140"
                    image={CartImage}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      Lizard
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Lizards are a widespread group of squamate reptiles, with over
                      6,000 species, ranging across all continents except Antarctica
                    </Typography>
                  </CardContent>
                  <CardActions disableSpacing>
                  <IconButton aria-label="add to favorites">
                    <FavoriteIcon />
                  </IconButton>
                  <IconButton aria-label="share">
                    <ShareIcon />
                  </IconButton>
                  <ExpandMore
                    expand={expanded} 
                    aria-expanded={expanded} 
                    onClick={handleExpandClick}
                    aria-label="show more"
                  >
                    <ExpandMoreIcon />
                  </ExpandMore>
                </CardActions>
                  {/* <CardActions> 
                    <Button  variant="contained" size="small">Share</Button>
                    <Button variant="contained" size="small">Learn More</Button>
                  </CardActions> */}
                </Card>
              </Grid>
            ))}
          </Grid>
          </Box>
          <Divider className={mainHomeStyle.headerDivider} />
          </Grid>  
          <Grid container spacing={2} pt={5} sx={{paddingLeft:'20px' }}>
          <Box sx={{ flexGrow: 1  }}>
            
          <h1>New Properties</h1>
          <br/>
             <div>Being situated in a south-west region of Telangana, Hyderabad is also known as Cyberabad as it has established itself as the hub of IT, Biotech Industry and Pharmaceuticals. Including the amalgamation of ancient and modern lifestyle, Hyderabad is more likely a cosmopolitan city that features everything from 5-star hotels, trendy shopping malls to monuments like Charminar, Hitex Gate, Chowmahalla, Gulzar Houz, Qutb Shahi Tombs, Kaman Sher Dil. This city is not just known for its freshwater pearls and biryanis but has lagged several cities in terms of real estate business where you will find more than 1000 upcoming residential projects in Hyderabad. You will be amazed to know that Hyderabad has been announced as the best city that is offering the lavish living standards by the Mercer''s Quality of Living Report 2015. And this is the reason why people are seeking flats for rent in Hyderabad, PG in Hyderabad, apartments in Hyderabad. This is the fourth most populous city in India with more than 1300 IT/ITeS companies which are contributing 15% of India's exports in the IT sector. Some of the well-known companies located in Hyderabad are Accenture, Tata Consultancy Services, Genpact, Infosys, Oracle, Cognizant, Verizon, IBM, Google, Microsoft, Hewlett-Packard, Amazon, Capgemini, Dell, etc. Gachibowli, Kondapur, Nallagandla, Uppal are some well-known localities in Hyderabad that are very near to all the civic utilities and perfect for buying or renting a property in Hyderabad, where you can choose to buy your own house in Hyderabad, commercial space or office at an affordable price.</div>
          </Box>
          <Divider className={mainHomeStyle.headerDivider} />
          </Grid> 
          <Divider className={mainHomeStyle.headerDivider} />
          <Grid container spacing={2} pt={5} sx={{paddingLeft:'20px'}}>
          <Box sx={{ flexGrow: 1 }}>
            
          <h1>Recommended for You</h1>
          <br/> 
          <Grid pt={5}
            container
            spacing={{ xs: 2, md: 2 }}
            columns={{ xs: 4, sm: 8, md: 12 }}
          >
            {Array.from(Array(6)).map((_, index) => (
              <Grid item xs={1} sm={3} md={3} key={index}>
                <Card sx={{ maxWidth: 345 }}> 
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      New Plan
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      New Plan are a widespread group of squamate reptiles, with over
                      6,000 species, ranging across all continents except Antarctica
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

export default MainHome