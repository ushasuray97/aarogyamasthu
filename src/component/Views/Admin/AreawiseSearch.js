import React, { useEffect,useState } from "react";
import { Link } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import EditIcon from '@mui/icons-material/Edit';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { useDispatch, useSelector } from "react-redux";
//custom files
import LinearWithValueLabel from "./LinearProgressWithLabel";
import { CustomDataGrid } from "../../../styles/styled-components/datagrid.style";
import { CustomAvatar } from "../../../styles/styled-components/avatar/avatar.style";
import { CustomAvatarGroup } from "../../../styles/styled-components/avatar/avatargroup.style";
import * as CustomBox from "../../../styles/styled-components/box.style";
import { AdminsStyles } from "./AdminsStyles";
import ManageAdminPopup from "./ManageAdminPopup";
//images
import DeleteIcon from "../../../assets/icons/Delete.png";
import img1 from '../../../assets/images/avatar/1.jpg'
import img2 from '../../../assets/images/avatar/2.jpg'
import img3 from '../../../assets/images/avatar/3.jpg'
import ManageTeam from '../../../assets/shareIcons/ManageTeam.png';
import { getAdmins } from "../../../store/reducers/manageAdmins/getAdminSlice";








export default function AreawiseSearch() {
  const dispatch = useDispatch();
  const { getAdminsData} = useSelector((state) => state.getAdmins);

  const [value, setValue] = React.useState('');
  const [addAdmin, setAdmin] = React.useState(false);
  const [adminData,setAdminsData] = useState([]);
  const [adminDetails,setAdminDetails] = useState([])
  
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleAdmin = (data) => {
    setAdmin(true)
    setAdminDetails(data.row)
  }


  

   
  return (
    <>
      <CustomBox.CustomMainBox>
        <Grid container>
          <Grid item xs={9} ><Typography sx={AdminsStyles.mainHeading}>Areawise Search</Typography></Grid>
          
        </Grid>
        <Grid container>
        <Grid item xs={3} ><Button sx={AdminsStyles.addButton}>
            <Link to="/team/teamleaders" className="routerLink">Team Leaders</Link></Button>
         </Grid>
        </Grid>
        <Grid container>
        <Grid item xs={3} ><Button sx={AdminsStyles.addButton}>
            <Link to="/admin/addadmin" className="routerLink">Team Members</Link></Button>
         </Grid>
        </Grid>
        
        <ManageAdminPopup addAdmin={addAdmin} setAdmin={setAdmin} adminDetails={adminDetails}/>
      </CustomBox.CustomMainBox>
    </>
  );
}
