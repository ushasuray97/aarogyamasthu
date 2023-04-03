import {styled,TextField} from "@mui/material";


export const CustomTextField=styled(TextField)(({theme})=>({

".MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":{
   borderColor:"rgb(233, 115, 44)",
   "&:hover .MuiOutlinedInput-notchedOutline": {
    borderColor: "rgb(233, 115, 44)"
  },
},
".MuiInputLabel-root.Mui-focused ":{
  color:"rgb(233, 115, 44)"
}
}))

export const CustomBottomLineTextField=styled(TextField)(({theme})=>({
  '.MuiOutlinedInput-notchedOutline':{
   borderColor:"#fffffff"
  },
".MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":{
   borderColor:"rgb(240, 144, 27)"
}
}))