import React, { useEffect, useState, useRef } from 'react'
import { ManageProfileStyles } from './ManageProfileStyles'
import AboutTabs from './AboutTabs';
import { Box, Divider, Grid, Typography, Stack } from '@mui/material'
import Tab from '@mui/material/Tab';
import { useSelector, useDispatch } from "react-redux";
import { getUser, clearState } from '../../../store/reducers/manageProfile/getUser';
///Icons
import EmailIcon from '@mui/icons-material/Email';
import CallIcon from '@mui/icons-material/Call';
///Custom Component
import { CustomTab } from '../../../styles/styled-components/Tab.style';
import PrimaryDetailsPopup from '../Manage Profile/PrimaryDetailsPopup'
import { updateUser, clearUpdateState } from '../../../store/reducers/resourceAllocation/manageUser/updateUser'; 
import profileIMG from '../../../assets/images/avatar/5.jpg';
function TabPanel(props) {
    const { children, value, index, ...other } = props;
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

function ManageProfile() {
    const userId = localStorage.getItem("userId");
    const dispatch = useDispatch();
    const { isFetching, isSuccess, isError, responseData } = useSelector((state) => state.getUser);
    const { isSuccessEdit } = useSelector((state) => state.updateUserSlice);
    const inputFile = useRef(null)
    const [value, setValue] = useState(0);
    const [openEdit, setOpenEdit] = React.useState(false);
    const [userData, setUserData] = useState("");
    const [profileImg, setProfileImg] = useState(profileIMG);
    const [attachment, setAttachment] = useState({
        item: "employee",
        fileName: "",
        data: "",
    })
    console.log("attachment-->", profileImg);
    const trimImg = (image) => {
        const path = image?.split("/");
        return path && path.slice(path.length - 2).join("/")
    }
    // useEffect(() => { 
    //     setProfileImg("../../../assets/images/avatar/5.jpg");
    // }, [userData])
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    useEffect(() => {
        dispatch(getUser({id:"id",value:userId}));
        if (attachment.data !== "" && attachment.fileName !== "") {
            dispatch(updateUser({ id: Number(userId), attachment: attachment }));
        }
    }, [userId, attachment])
    useEffect(() => {
        if (isSuccess) {
            setUserData(responseData[0]);
            dispatch(clearState());
        }

        if (isSuccessEdit) {
            dispatch(getUser(userId));
            dispatch(clearUpdateState());
        }
    }, [isSuccess, isSuccessEdit])

    const imageClick = () => {
        inputFile.current.click();
    }
    const onchangeImage = (event) => {
        var fileElement = document.getElementById("FundraiserImage");
        var fileExtension = "";
        if (fileElement.value.lastIndexOf(".") > 0) {
            fileExtension = fileElement.value.substring(
                fileElement.value.lastIndexOf(".") + 1,
                fileElement.value.length
            );
        }
        if (
            fileExtension.toLowerCase() === "png" ||
            fileExtension.toLowerCase() === "jpg" ||
            fileExtension.toLowerCase() === "jpeg"
        ) {
            setAttachment((preValue) => {
                return {
                    ...preValue,
                    fileName: event.target.files[0].name,
                }
            })
            const reader = new FileReader();
            reader.onload = () => {
                setAttachment((preValue) => {
                    return {
                        ...preValue,
                        fileName: event.target.files[0].name,
                        data: reader.result?.slice(reader.result?.indexOf(",") + 1).trim()
                    }
                })
            };
            reader.readAsDataURL(event.target.files[0]);
        }
    };
    return (
        <>
            <Box>
                <Box sx={{ px: 4 }}>
                    <Grid container spacing={0} overflow="hidden" sx={{ mt: 4, borderRadius: '5px', boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px' }}>
                        <Grid item md={3} sm={12} xs={12} sx={{ position: 'relative' }}>
                            <Box>
                                <input
                                    type="file"
                                    name="" 
                                    onChange={onchangeImage}
                                    accept=".jpg, .jpeg, .png"
                                    id="FundraiserImage"
                                    ref={inputFile}
                                    style={{ display: 'none' }}
                                />
                                <img  
                                    src={profileImg}
                                    style={{
                                        position: "absolute",
                                        width: "95%",
                                        height: "100%",
                                        borderRadius: "5px"
                                    }}
                                    onClick={() => imageClick()}
                                    alt="img" />
                            </Box> 
                        </Grid>
                        <Grid item md={9} sm={9} xs={9}>
                            <Grid container spacing={0}>
                                <Grid item md={12} sm={12} xs={12}>
                                    <Box sx={{ mt: 2 }}>
                                        <Typography variant='h4'>{userData?.first_name} {userData?.last_name}</Typography>
                                    </Box>
                                </Grid>
                            </Grid>
                            <Grid container spacing={-40} sx={{ pt: 2 }}>
                                <Grid item md={6} sm={12} xs={12}>
                                    <Box sx={{ display: "flex", alignItems: "center" }}>
                                        <EmailIcon sx={{ color: '#F29528' }} /><Typography variant='h5' sx={ManageProfileStyles.Email}>{userData?.email}</Typography>
                                    </Box>
                                </Grid>

                                <Grid item md={6} sm={12} xs={12}>
                                    <Box sx={{ display: "flex", alignItems: "center" }}>
                                        <CallIcon sx={{ color: '#F29528' }} /><Typography variant='h5' sx={ManageProfileStyles.Phone}>{userData?.phone_number}</Typography>
                                    </Box>
                                </Grid>
                            </Grid>
                            <Divider sx={{ p: 1 }} />
                            <Grid container spacing={0} sx={{ pt: 2 }}>
                                <Grid item md={2.4} sm={12} xs={12}>
                                    <Box>
                                        <Typography sx={{ fontSize: '0.8rem' }}>Job Title<br />{userData?.job_title}</Typography>
                                    </Box>
                                </Grid>
                                <Grid item md={2.4} sm={12} xs={12}>
                                    <Box>
                                        <Typography sx={{ fontSize: '0.8rem' }}>Department<br />{userData?.department?.name}</Typography>
                                    </Box>
                                </Grid>
                                <Grid item md={2.4} sm={12} xs={12}>
                                    <Box>
                                        <Typography sx={{ fontSize: '0.8rem' }}>Business Unit<br />Hi-tech City, Hyderabad</Typography>
                                    </Box>
                                </Grid>
                                <Grid item md={2.4} sm={12} xs={12}>
                                    <Box>
                                        <Typography sx={{ fontSize: '0.8rem' }}>Reporting Manager<br /><Typography sx={{ fontSize: 13, color: '#2986CE' }}>{userData?.reporting_to}</Typography></Typography>
                                    </Box>
                                </Grid>
                                <Grid item md={2.4} sm={12} xs={12}>
                                    <Box>
                                        <Typography sx={{ fontSize: '0.8rem' }}>Emp Id<br /><Typography sx={{ fontSize: 13, }}>{userData?.emp_no}</Typography></Typography>
                                    </Box>
                                </Grid>
                                <Grid container sx={{ pt: 4 }}>
                                    <Grid item md={12} sm={12} xs={12}>
                                        <Box>
                                            <Box>
                                                <CustomTab value={value} onChange={handleChange} aria-label="basic tabs example" TabIndicatorProps={{
                                                    style: { display: 'none', color: 'black' }
                                                }}
                                                >
                                                    <Tab label="ABOUT" {...a11yProps(0)} />
                                                    <Tab label="PROFIE" {...a11yProps(1)} />
                                                    <Tab label="JOB" {...a11yProps(2)} />
                                                    <Tab label="DOCUMENTS" {...a11yProps(3)} />
                                                    <Tab label="ASSETS" {...a11yProps(4)} />
                                                </CustomTab>
                                            </Box>
                                        </Box>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Box>
                <Box sx={{ px: 1 }}>
                    <Grid container spacing={0} overflow="hidden">
                        <Grid item md={12} sm={12} xs={12} >
                            <TabPanel value={value} index={0}>
                                <AboutTabs setOpenEdit={setOpenEdit} userData={userData} />
                            </TabPanel>
                            <TabPanel value={value} index={1}>
                                Item Two
                            </TabPanel>
                            <TabPanel value={value} index={2}>
                                Item Three
                            </TabPanel>
                            <TabPanel value={value} index={3}>
                                Item Four
                            </TabPanel>
                            <TabPanel value={value} index={4}>
                                Item Five
                            </TabPanel>
                        </Grid>
                    </Grid>
                </Box>
            </Box >
            <PrimaryDetailsPopup openEdit={openEdit} setOpenEdit={setOpenEdit} userData={userData} />
        </>
    )
}
export default ManageProfile