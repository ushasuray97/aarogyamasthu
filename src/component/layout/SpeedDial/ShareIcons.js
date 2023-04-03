import React from 'react'
import SpeedDialAction from '@mui/material/SpeedDialAction';
import UpIcon from '@mui/icons-material/KeyboardArrowUp';
import Box from "@mui/material/Box";
import Link from '@mui/material/Link';
//Custom files
import { CustomSpeedDial } from '../../../styles/styled-components/speeddial.style';
import { shareIconsStyles } from './shareIconsStyles';
//images
import Jira from '../../../assets/shareIcons/Jira.png';
import Keka from '../../../assets/shareIcons/Keka.png';
import Outlook from '../../../assets/shareIcons/Outlook.png';
import Sharepoint from '../../../assets/shareIcons/Sharepoint.png';


const actions = [
    { icon: 
    <Link href="https://id.atlassian.com/login?continue=https%3A%2F%2Fauth.atlassian.com%2Fauthorize%3Fredirect_uri%3Dhttps%253A%252F%252Fjira.atlassian.com%252Fplugins%252Fservlet%252Fauthentication%253Fauth_plugin_original_url%253Dhttps%25253A%25252F%25252Fjira.atlassian.com%26client_id%3DIxYiM0Mnu4QwMrWq0GqEaPnHV5s4fX2O%26scope%3Dopenid%2520email%2520profile%26state%3Dddfaa84f-e29c-4a2c-a60e-4df8702153e1%26response_type%3Dcode%26native%3Dtrue" target="_blank">
        <Box component="img" src={Jira} sx={shareIconsStyles.iconStyle}/>
        </Link>, name: "Jira" },
    { icon: 
    <Link href="https://app.keka.com/Account/Login?ReturnUrl=%2F" target="_blank">
        <Box component="img" src={Keka} sx={shareIconsStyles.iconStyle}/>
        </Link>, name: 'Keka' },
    { icon: <Link href="https://outlook.office.com/mail/" target="_blank">
        <Box component="img" src={Outlook} sx={shareIconsStyles.iconStyle}/>
        </Link>, name: 'Outlook' },
    { icon: 
    <Link href="https://www.microsoft.com/en-in/microsoft-365/sharepoint/collaboration" target="_blank">
        <Box component="img" src={Sharepoint} sx={shareIconsStyles.iconStyle}/>
        </Link>, name: 'Sharepoint' },

];

const ShareIcons = () => {
    return (
        <Box sx={shareIconsStyles.boxContainer}>
            <CustomSpeedDial
                ariaLabel="SpeedDial openIcon example"
                icon={<UpIcon />}
            >
                {actions.map((action) => (
                    <SpeedDialAction
                        key={action.name}
                        icon={action.icon}
                        target={action.link}
                        tooltipTitle={action.name}
                    />
                ))}
            </CustomSpeedDial>
        </Box>
    )
}
export default ShareIcons;