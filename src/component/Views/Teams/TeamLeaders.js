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




function TotalAvatars() {
  return (
    <CustomAvatarGroup total={5}>
      <CustomAvatar alt="Remy Sharp" src={img1} />
      <CustomAvatar alt="Travis Howard" src={img2} />
      <CustomAvatar alt="Travis Howard" src={img3} />
    </CustomAvatarGroup>
  );
}



export default function TeamLeaders() {
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


  const columns = [
    
    {
      field: "sno",
      headerName: "SNO",
      width: 190,
      editable: false,
      sortable: false,
    },
    {
      field: "name",
      headerName: "Name",
      width: 190,
      editable: false,
      sortable: false,
    },
    {
      field: "address",
      headerName: "Address",
      width: 150,
      editable: false,
      sortable: false,
    },
    

    {
      field: "action",
      headerName: "Action",
      description: "",
      sortable: false,
      editable: false,
      width: 120,
      renderCell: () => (
        <Stack spacing={1} sx={{ width: 1, py: 1 }}>
          <Grid container>
            <Grid item sx={{ pr: 1 }}>
              <Link to="/admin/editadmin/1" className="routerLink"><EditIcon sx={{ color: "orange" }} /></Link>
            </Grid>
            <Grid item>
              <img src={DeleteIcon} alt="Delete" />
            </Grid>
            <Grid item>
              <ArrowForwardIosIcon sx={AdminsStyles.iconStyle} />
            </Grid>
          </Grid>
        </Stack>
      ),
    },
  ];

 useEffect(() => {
  if(value ){
    dispatch(getAdmins({params:value}))
  }
 },[value]);

  useEffect(() => {
    if (getAdminsData) {
      setAdminsData(getAdminsData);
    }
  }, [getAdminsData]);


  return (
    <>
      <CustomBox.CustomMainBox>
        
        <Box sx={AdminsStyles.adminListContainer}>
          
              <CustomDataGrid
                rows={adminData.slice().reverse()}
                columns={columns}
                pageSize={10}
                rowsPerPageOptions={[10]}
                disableSelectionOnClick
                sx={AdminsStyles.datagridContainer}
                experimentalFeatures={{ newEditingApi: true }}
                initialState={{
                  pinnedColumns: { left: ["id"], right: ["action"] },
                }}
              />
        </Box>
        <ManageAdminPopup addAdmin={addAdmin} setAdmin={setAdmin} adminDetails={adminDetails}/>
      </CustomBox.CustomMainBox>
    </>
  );
}
