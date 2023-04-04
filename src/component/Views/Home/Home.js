import React, { useEffect, useState } from "react";
import { CustomMainBox } from "../../../styles/styled-components/box.style";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Grid, Box } from "@mui/material";
import GroupIcon from '@mui/icons-material/Group';
import Stack from "@mui/material/Stack";
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import { useSelector, useDispatch } from "react-redux";
//custom files
import LinearWithValueLabel from "../Admin/LinearProgressWithLabel";
import { HomeStyles } from "./HomeStyles";
import { CustomDataGrid } from "../../../styles/styled-components/datagrid.style";
import { CustomAvatar } from "../../../styles/styled-components/avatar/avatar.style";
import { CustomAvatarGroup } from "../../../styles/styled-components/avatar/avatargroup.style";
import MultiColorProgressBar from "./MultiColorProgressBar";
import { clearState } from "../../../store/reducers/LoginSlice";
import LoginToster from "../../tosterMessage/LoginToster";
//images
import img1 from '../../../assets/images/avatar/1.jpg';
import img2 from '../../../assets/images/avatar/2.jpg';
import img3 from '../../../assets/images/avatar/3.jpg';
import img4 from '../../../assets/images/avatar/4.jpg';
import img5 from '../../../assets/images/avatar/5.jpg';




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
    headerName: "Project Name",

    width: 190,
    editable: false,
    sortable: false,
  },
  {
    field: "clientname",
    headerName: "Client Name",

    width: 150,
    editable: false,
    sortable: false,
  },
  {
    field: "startdate",
    headerName: " Start Date",

    width: 190,
    editable: false,
    sortable: false,
  },
  {
    field: "deadline",
    headerName: "Deadline",

    width: 180,
    editable: false,
    sortable: false,
  },
  {
    field: "team",
    headerName: "Team Members",
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
];

const rows = [
  {
    id: 1,
    projectname: "Snow",
    clientname: "Bobby",
    startdate: '12 Feb 2022',
    deadline: "12 Dec 2022",
    status: "Completed",

  },
  {
    id: 2,
    projectname: "Lannister",
    clientname: "Bobby",
    startdate: '12 Mar 2022',
    deadline: "12 Dec 2022",
    status: "In-Progress",


    enddate: "12 Feb 2023",
  },
  {
    id: 3,
    projectname: "Lannister",
    clientname: "Bobby",
    startdate: '02 May 2022',
    deadline: "12 Dec 2022",
    status: "Completed",


    enddate: "12 Feb 2023",
  },
  {
    id: 4,
    projectname: "Stark",
    clientname: "Bobby",
    startdate: '20 Jun 2022',
    deadline: "12 Dec 2022",
    status: "In-Progress",


    enddate: "12 Feb 2023",
  },
  {
    id: 5,
    projectname: "Targaryen",
    clientname: "Bobby",
    startdate: '17 Jan 2022',
    deadline: "12 Dec 2022",
    status: "Completed",


    enddate: "12 Feb 2023",
  },
  {
    id: 6,
    projectname: "Melisandre",
    clientname: "Bobby",
    startdate: '23 Jul 2022',
    deadline: "12 Dec 2022",
    status: "In-Progress",


    enddate: "12 Feb 2023",
  },
  {
    id: 7,
    projectname: "Clifford",
    clientname: "Bobby",
    startdate: '19 Aug 2022',
    deadline: "12 Dec 2022",
    status: "Completed",


    enddate: "12 Feb 2023",
  },
  {
    id: 8,
    projectname: "Frances",
    clientname: "Bobby",
    startdate: '22 Apr 2022',
    deadline: "12 Dec 2022",
    status: "In-Progress",
    enddate: "12 Feb 2023",
  },
  {
    id: 9,
    projectname: "Roxie",
    clientname: "Bobby",
    startdate: '11 Sep 2022',
    deadline: "12 Dec 2022",
    status: "Completed",


    enddate: "12 Feb 2023",
  },
];
export default function Home() {
  const dispatch = useDispatch();
  const [successToster, setSuccessToster] = useState(false);
  const [tosterColor, setTosterColor] = useState("")
  const [tosterMessage, setTosterMessage] = useState("");
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


  const cardData = [
    {
      heading: "Employees",
      icon: <GroupIcon sx={HomeStyles.icon} />,
      totalHead: "Total",
      total: '14',
      availableStatus: 'Available',
      availableStatusCount: '324',
    },
    {
      heading: "New Projects",
      icon: <BusinessCenterIcon sx={HomeStyles.icon} />,
      totalHead: "Total",
      total: '14',
      availableStatus: 'Ongoing',
      availableStatusCount: '100',
    },
    {
      heading: "New Plans",
      icon: <BusinessCenterIcon sx={HomeStyles.icon} />,
      totalHead: "Total",
      total: '14',
      availableStatus: 'Ongoing',
      availableStatusCount: '50',
    },
  ]

  let readings = [
    {
      name: "Apples",
      value: 19.8,
      msg:"Billable "
    },
    {
      name: "Blueberries",
      value: 9.9,
      msg:"Non-billable "
    },
    {
      name: "Guavas",
      value: 19.8,
      msg:"On Bench "
    },
    {
      name: "Grapes",
      value: 5.1,
      msg:"Billable "
    },
  ];

  const COLORS = ["#279FFF", "#652CDF", "#F7C844", "#F63B3B"];

  return (
    <>
      <CustomMainBox
        sx={HomeStyles.customContainer}>
        <Grid container flexDirection="row" spacing={2} sx={HomeStyles.homeContainer} >
          <Grid item xs={9} md={9} >
            <Card sx={[HomeStyles.cardContainer, { height: "200px" }]}>
              <Typography variant="h6" > Recently added Properties</Typography>
            </Card>
            <Stack direction="row" sx={{ mt: 3 }} spacing={2}>
              <Grid item xs={6} md={6}>
                <Card sx={[HomeStyles.cardContainer, { height: "200px" }]}>
                <Typography variant="h5" > Recently added Plans</Typography>
                </Card>
              </Grid>
              <Grid item xs={6} md={6}>
                <Card sx={[HomeStyles.cardContainer, { height: "200px" }]}>
                <Typography variant="h5" >All Employees</Typography>
                </Card>
              </Grid>
            </Stack>
          </Grid>
          <Grid item xs={3} md={3}>
            {cardData.map((ele, i) => (
              <Grid item xs={10} md={10} key={i} sx={{ mb: 2 }}>
                <Card sx={HomeStyles.cardContainer}>
                  <CardContent>
                    <Stack direction="row" sx={HomeStyles.cardhead}>
                      <Typography sx={{ fontSize: 16 }} gutterBottom>
                        {ele.heading}
                      </Typography>
                      {ele.icon}
                    </Stack>
                    <Stack direction="row" sx={HomeStyles.cardContent}>
                    <MultiColorProgressBar readings={readings} colors={COLORS} />
                    </Stack>
                    <Stack direction="row" sx={HomeStyles.cardContent}>
                      <Typography>Total</Typography>
                      <Typography>{ele.availableStatusCount}</Typography>
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Grid>
        <Box sx={HomeStyles.projectContainer}>
          <Typography sx={{ p: 2 }}>Recent Projects</Typography>
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
        </Box>
        {/* <LoginToster tosterColor={tosterColor} message={tosterMessage} setSuccessToster={setSuccessToster} /> */}
      </CustomMainBox>

    </>
  );
}

