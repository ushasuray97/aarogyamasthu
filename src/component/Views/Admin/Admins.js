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
import { getProjects } from "../../../store/reducers/manageProjects/getProjectSlice";
//images
import DeleteIcon from "../../../assets/icons/Delete.png";
import img1 from '../../../assets/images/avatar/1.jpg'
import img2 from '../../../assets/images/avatar/2.jpg'
import img3 from '../../../assets/images/avatar/3.jpg'
import ManageTeam from '../../../assets/shareIcons/ManageTeam.png';




function TotalAvatars() {
  return (
    <CustomAvatarGroup total={5}>
      <CustomAvatar alt="Remy Sharp" src={img1} />
      <CustomAvatar alt="Travis Howard" src={img2} />
      <CustomAvatar alt="Travis Howard" src={img3} />
    </CustomAvatarGroup>
  );
}



export default function Admins() {
  const dispatch = useDispatch();
  const { getProjectsData} = useSelector((state) => state.getProjects);

  const [value, setValue] = React.useState('BuyProperties');
  const [addAdmin, setAdmin] = React.useState(false);
  const [projectData,setProjectData] = useState([]);
  const [projectDetails,setProjectDetails] = useState([])
  
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleAdmin = (data) => {
    setAdmin(true)
    setProjectDetails(data.row)
  }


  const columns = [
    { field: "s/n", 
    headerName: "S/N",
     width: 50 ,
    renderCell: (index) => index.api.getRowIndex(index.row.id) + 1,},
    {
      field: "name",
      headerName: "Properties name",
      width: 190,
      editable: false,
      sortable: false,
    },
    {
      field: "client_name",
      headerName: "Client name",
      width: 130,
      editable: false,
      sortable: false,
    },
    {
      field: "start_date",
      headerName: "Start Date",
      width: 130,
      editable: false,
      sortable: false,
    },
    {
      field: "end_date",
      headerName: "End Date",
      width: 150,
      editable: false,
      sortable: false,
    },
    {
      field: "Admin",
      headerName: "Admin members",
      description: "",
      sortable: false,
      editable: false,
      width: 280,
      renderCell: (projectData) => (
        <Stack direction="row" spacing={1} >
          <Grid container >
            <Grid item sx={{ pr: 1, pt: 0.5 }}>
              <TotalAvatars />
            </Grid>
            <Grid item>
              <Box component="img" src={ManageTeam} sx={{ width: "60px", cursor: "pointer" }} onClick={() =>handleAdmin(projectData)} />
            </Grid>
  
          </Grid>
        </Stack>
      ),
  
     
    },
    {
      field: "status",
      headerName: "Status",
      width: 150,
      editable: false,
      sortable: false,
    },

    {
      field: "progress",
      headerName: "Progress",
      sortable: false,
      editable: false,
      width: 150,
      renderCell: () => (
        <LinearWithValueLabel />
      ),
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
              <Link to="/projects/editproject/1" className="routerLink"><EditIcon sx={{ color: "orange" }} /></Link>
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
    dispatch(getProjects({params:value}))
  }
 },[value]);

  useEffect(() => {
    if (getProjectsData) {
      setProjectData(getProjectsData);
    }
  }, [getProjectsData]);


  return (
    <>
      <CustomBox.CustomMainBox>
        <Grid container>
          <Grid item xs={11} ><Typography sx={AdminsStyles.mainHeading}>Properties List</Typography></Grid>
          <Grid item xs={1} ><Button sx={AdminsStyles.addButton}>
            <Link to="/projects/addproject" className="routerLink">Add Properties</Link></Button> </Grid>
        </Grid>
        <Box sx={AdminsStyles.projectListContainer}>
          <TabContext value={value}>
            <Box >
              <TabList onChange={handleChange} aria-label="lab API tabs example">
                <Tab label="Buy Properties" value="BuyProperties" />
                {/* <Tab label="Sell Properties" value="SellProperties" /> */}
              </TabList>
            </Box>
            <TabPanel value="BuyProperties" sx={AdminsStyles.tabContainer}>
              <CustomDataGrid
                rows={projectData.slice().reverse()}
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
            </TabPanel>
            {/* <TabPanel value="SellProperties" sx={AdminsStyles.tabContainer}>
              <CustomDataGrid
                rows={projectData.slice().reverse()}
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
            </TabPanel> */}
          </TabContext>


        </Box>
        <ManageAdminPopup addAdmin={addAdmin} setAdmin={setAdmin} projectDetails={projectDetails}/>
      </CustomBox.CustomMainBox>
    </>
  );
}
