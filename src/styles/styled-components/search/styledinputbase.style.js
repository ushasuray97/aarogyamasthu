import InputBase from "@mui/material/InputBase";
import {styled}from '@mui/material';


export const CustomStyledInputBase = styled(InputBase)(({ theme }) => ({
    color: "#000",
    "& .MuiInputBase-input": {
      padding: theme.spacing(1, 1, 1, 0),
      
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create("width"),
      width: "100%",
      [theme.breakpoints.up("md")]: {
        width: "20ch",
      },
    },
  }));