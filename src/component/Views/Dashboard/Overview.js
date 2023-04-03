import React from 'react'
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import { HomeStyles } from "./DashboardStyles";
import { CustomIconButton } from "../../../styles/styled-components/iconbutton.style";
import totalResorces from "../../../assets/icons/total_resorces.png";
import total_project_rgt from "../../../assets/icons/total_project_rgt.png";
import total_project_in_ebay from "../../../assets/icons/total_project_in_ebay.png";
import ongoing_project_in_ebay from "../../../assets/icons/ongoing_project_in_ebay.png";
import available_resources from "../../../assets/icons/available_resources.png";
import ongoing_project_rgt from "../../../assets/icons/ongoing_project_rgt.png";


const TopList = {
  menu: [
    { topvalue: "345", description: "Total Users", icon: totalResorces },
    { topvalue: "14", description: "Total Teams", icon: total_project_rgt },
    { topvalue: "112", description: "Total Hospitals", icon: total_project_in_ebay },
    { topvalue: "51+", description: "Total Enquiries", icon: ongoing_project_in_ebay },
    { topvalue: "21", description: "Today Enquiries", icon: available_resources },
    { topvalue: "14", description: "Week Enquiries", icon: ongoing_project_rgt },

  ],
};
const Overview = () => {
  return (
    <>
      <Box sx={HomeStyles.TopContainer}>
        <Grid container>
          {TopList.menu.map((item, index) => (
            <Grid key={index} item xs={2} sx={HomeStyles.TopBoxSetting}>
              <Stack direction="row" alignItems="center" gap={1}>
                <CustomIconButton sx={HomeStyles.avatarBtn}>
                  <img alt="Bemy Sharp" src={item.icon} />
                </CustomIconButton>
                <Typography variant="div" sx={HomeStyles.TextTypography}>
                  <Box sx={HomeStyles.FirstHeading}>{item.topvalue}</Box>
                  <Box sx={HomeStyles.SecondHeading}>{item.description}</Box>
                </Typography>
              </Stack>
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  )
}

export default Overview