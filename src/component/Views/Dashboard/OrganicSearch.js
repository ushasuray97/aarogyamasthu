import React from 'react'
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import { HomeStyles } from "./DashboardStyles";
import { CustomIconButton } from "../../../styles/styled-components/iconbutton.style";
import DashboardChart from "./DashboardChart";

import keyword_in_first_position from "../../../assets/icons/keyword_in_first_position.png";
import estimated_organic_traffic from "../../../assets/icons/estimated_organic_traffic.png";
import keywords_in_top_3 from "../../../assets/icons/keywords_in_top_3.png";
import in_new from "../../../assets/icons/in_new.png";
import is_up from "../../../assets/icons/is_up.png";
import is_down from "../../../assets/icons/is_down.png";
import is_lost from "../../../assets/icons/is_lost.png";


const TopList = {
  menu: [
    { topvalue: "100", description: "Keywords in First Position", icon: keyword_in_first_position },
    { topvalue: "19,293", description: "Estimated Oragic Traffic", icon: estimated_organic_traffic },
    { topvalue: "3", description: "Keywords in Top 3", icon: keywords_in_top_3 },
    { topvalue: "7", description: "Keywords in Tpo 10", icon: keywords_in_top_3 },
    { topvalue: "3", description: "In New", icon: in_new },
    { topvalue: "2", description: "Is Up", icon: is_up },
    { topvalue: "1", description: "Is Down", icon: is_down },
    { topvalue: "2", description: "Is Lost", icon: is_lost },

  ],
};
const OrganicSearch = () => {
  return (
    <>
      <Box sx={HomeStyles.graphContainer}>
        <Typography sx={HomeStyles.mainSubHeading}>Organic Search</Typography>
        <Grid container>
          <Grid item xs={6}>
            <Grid container>
              {TopList.menu.map((item, index) => (
                <Grid key={index} item xs={6} sx={HomeStyles.BoxSetting}>
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
          </Grid>
          <Grid item xs={6}>
            <DashboardChart />
          </Grid>
        </Grid>
      </Box>
    </>
  )
}

export default OrganicSearch