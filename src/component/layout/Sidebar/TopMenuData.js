import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import GridViewIcon from '@mui/icons-material/GridView';
import AccountTreeOutlinedIcon from '@mui/icons-material/AccountTreeOutlined';
import Diversity1OutlinedIcon from '@mui/icons-material/Diversity1Outlined';
import PunchClockOutlinedIcon from '@mui/icons-material/PunchClockOutlined';
import AttachMoneyOutlinedIcon from '@mui/icons-material/AttachMoneyOutlined';
import SummarizeOutlinedIcon from '@mui/icons-material/SummarizeOutlined';
import GrassOutlinedIcon from '@mui/icons-material/GrassOutlined';
import AddTaskOutlinedIcon from '@mui/icons-material/AddTaskOutlined';
import EditRoadOutlinedIcon from '@mui/icons-material/EditRoadOutlined';
import PeopleOutlinedIcon from '@mui/icons-material/PeopleOutlined';
import managescreen from '../../../assets/icons/Manage Screen.png';
import manageroles from '../../../assets/icons/Manage Roles.jpg';
import manageuser from '../../../assets/icons/Manage User.png';
import managescreenpermission from '../../../assets/icons/ManageScreenPermission.png';



export const menu = [
  { title: "Home", link: "dashboard", icon: <HomeOutlinedIcon />, items: [] },
  {
    title: "Admin", link: "adminhome", icon: <GridViewIcon />,
  },

  

 
  { title: "Users", link: "manageprofile", icon: <PeopleOutlinedIcon />, items: [] },

  { title: "Teams", link: "#", icon: <PunchClockOutlinedIcon />, items: [] },
  { title: "Hospitals", link: "billingmanagement", icon: <AttachMoneyOutlinedIcon />, items: [] },
  { title: "CaseTypes", link: "#", icon: <SummarizeOutlinedIcon />, items: [] },
  { title: "Logout", link: "#", icon: <GrassOutlinedIcon />, items: [] },
]