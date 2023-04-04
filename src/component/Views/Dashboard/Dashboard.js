import * as React from "react";
import DeleteIcon from "../../../assets/icons/Delete.png";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import EditIcon from '@mui/icons-material/Edit';
import { Link } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
//custom files
import { CustomDataGrid } from "../../../styles/styled-components/datagrid.style";
import { CustomAvatar } from "../../../styles/styled-components/avatar/avatar.style";
import { CustomAvatarGroup } from "../../../styles/styled-components/avatar/avatargroup.style";
import LinearWithValueLabel from "../Admin/LinearProgressWithLabel";
import * as CustomBox from "../../../styles/styled-components/box.style";
import { HomeStyles } from "./DashboardStyles";
import Overview from "./Overview";
import OrganicSearch from "./OrganicSearch";
//images
import img1 from '../../../assets/images/avatar/1.jpg'
import img2 from '../../../assets/images/avatar/2.jpg'
import img3 from '../../../assets/images/avatar/3.jpg'
import img4 from '../../../assets/images/avatar/4.jpg'
import img5 from '../../../assets/images/avatar/5.jpg'




function TotalAvatars() {
  return (
    <CustomAvatarGroup total={8}>
      <CustomAvatar alt="Remy Sharp" src={img1} />
      <CustomAvatar alt="Travis Howard" src={img2} />
      <CustomAvatar alt="Travis Howard" src={img3} />
      <CustomAvatar alt="Agnes Walker" src={img4} />
      <CustomAvatar alt="Trevor Henderson" src={img5} />
    </CustomAvatarGroup>
  );
}

const columns = [
  { field: "id", headerName: "S/N", width: 50 },
  {
    field: "projectname",
    headerName: "Project name",

    width: 190,
    editable: false,
    sortable: false,
  },
  {
    field: "clientname",
    headerName: "Client name",

    width: 130,
    editable: false,
    sortable: false,
  },
  {
    field: "starttime",
    headerName: "Start time",

    width: 130,
    editable: false,
    sortable: false,
  },
  {
    field: "deadline",
    headerName: "Deadline",

    width: 150,
    editable: false,
    sortable: false,
  },
  {
    field: "team",
    headerName: "Team members",
    description: "",
    sortable: false,
    editable: false,
    width: 230,
    renderCell: () => (
      <TotalAvatars />
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
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    editable: false,
    width: 200,
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
            <Link to="/projects/editproject/1" className="routerLink"><EditIcon sx={{color:"orange"}} /></Link>
          </Grid>
          <Grid item>
            <img src={DeleteIcon} alt="Delete" />
          </Grid>
        </Grid>
      </Stack>
    ),
  },
];

const rows = [
  {
    id: 1,
    projectname: "Snow",
    clientname: "Bobby",
    starttime: "12 Dec 2022",
    status: "Inprogress",
    deadline: "12 Feb 2023",
  },
  {
    id: 2,
    projectname: "Lannister",
    clientname: "Bobby",
    starttime: "12 Dec 2022",
    status: "Inprogress",
    deadline: "12 Feb 2023",

  },
  {
    id: 3,
    projectname: "Lannister",
    clientname: "Bobby",
    starttime: "12 Dec 2022",
    status: "Inprogress",
    deadline: "12 Feb 2023",

  },
  {
    id: 4,
    projectname: "Stark",
    clientname: "Bobby",
    starttime: "12 Dec 2022",
    status: "Inprogress",
    deadline: "12 Feb 2023",

  },
  {
    id: 5,
    projectname: "Targaryen",
    clientname: "Bobby",
    starttime: "12 Dec 2022",
    status: "Inprogress",
    deadline: "12 Feb 2023",
  },
  {
    id: 6,
    projectname: "Melisandre",
    clientname: "Bobby",
    starttime: "12 Dec 2022",
    status: "Inprogress",
    deadline: "12 Feb 2023",

  },
  {
    id: 7,
    projectname: "Clifford",
    clientname: "Bobby",
    starttime: "12 Dec 2022",
    status: "Inprogress",
    deadline: "12 Feb 2023",

  },
  {
    id: 8,
    projectname: "Frances",
    clientname: "Bobby",
    starttime: "12 Dec 2022",
    status: "Inprogress",
    deadline: "12 Feb 2023",

  },
  {
    id: 9,
    projectname: "Roxie",
    clientname: "Bobby",
    starttime: "12 Dec 2022",
    status: "Inprogress",
    deadline: "12 Feb 2023",

  },
];

export default function Home() {
  return (
    <>
      <CustomBox.CustomMainBox>
        <Typography sx={HomeStyles.mainHeading}>Aarogya Overview</Typography>
        <Overview />
        {/* <OrganicSearch /> */}

        {/* <Box sx={HomeStyles.projectListContainer}>
          <Typography sx={HomeStyles.mainSubHeading}>
            New Plans Detail
          </Typography>

          <CustomDataGrid
            rows={rows}

            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            showCellRightBorder={false}
            hideFooterPagination={true}
            disableSelectionOnClick
            experimentalFeatures={{ newEditingApi: true }}
            initialState={{
              pinnedColumns: { left: ["id"], right: ["action"] },
            }}
            sx={{
              border: 0,
              '& .MuiDataGrid-cell': {
              },
              '& .MuiDataGrid-footerContainer': {
                border: 0,
              }
            }}
          />
        </Box> */}
      </CustomBox.CustomMainBox>
    </>
  );
}
