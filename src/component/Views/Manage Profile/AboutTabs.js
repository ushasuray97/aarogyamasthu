import * as React from 'react';
import Box from '@mui/material/Box';
import { Button, Card, Divider, Grid, Typography } from '@mui/material';
import { ManageProfileStyles } from './ManageProfileStyles';


export default function AboutTabs({ setOpenEdit, userData }) {
  const handleEdit = () => {
    setOpenEdit(true)
  }

  return (
    <Box sx={{ width: '50%', typography: 'body1', boxShadow: 12, }}>
      <Grid container spacing={0}>
        <Grid itemn md={6}>
          <Typography variant='h5' sx={{ m: 2 }}>Primary Details</Typography>
        </Grid>
        <Grid itemn md={6}>
          <Button sx={ManageProfileStyles.tabEditButton} onClick={handleEdit}>Edit</Button>
        </Grid>
      </Grid>
      <Divider />
      <Grid container spacing={2} sx={ManageProfileStyles.tabContainer}>
        <Grid item md={6}>
          <Typography  variant="body2">First name<br />{userData?.first_name}</Typography>
        </Grid>
        <Grid item md={6} >
          <Typography  variant="body2">Last name<br />{userData?.last_name}</Typography>
        </Grid>
      </Grid>
      <Grid container spacing={2} sx={ManageProfileStyles.tabContainer}>
        <Grid item md={6} >
          <Typography  variant="body2">Email Id<br />{userData?.email}</Typography>
        </Grid>
        <Grid item md={6} >
          <Typography  variant="body2">Phone No<br />{userData?.phone_number}</Typography>
        </Grid>
      </Grid>
      <Grid container spacing={2} sx={ManageProfileStyles.tabContainer}>
        <Grid item md={6} >
          <Typography  variant="body2">Emp Id<br />{userData?.emp_no}</Typography>
        </Grid>
        <Grid item md={6} >
          <Typography  variant="body2">Reporting To<br />{userData?.reporting_to}</Typography>
        </Grid>
      </Grid>
      <Grid container spacing={2} sx={ManageProfileStyles.tabContainer}>
        <Grid item md={6} >
          <Typography  variant="body2">Designation<br />{userData?.job_title}</Typography>
        </Grid>
        <Grid item md={6} >
          <Typography  variant="body2">Department<br />{userData.department?.name}</Typography>
        </Grid>
      </Grid>
    </Box>
  );
}