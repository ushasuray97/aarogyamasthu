import {styled,alpha}from '@mui/material';


export const CustomSearch = styled("div")(({ theme }) => ({
    position: "relative",
    border: "1px solid  #00000014",
    background:"rgb(119, 113, 113)",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  }));