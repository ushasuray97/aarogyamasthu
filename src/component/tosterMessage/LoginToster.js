import React from 'react'; 
import CancelIcon from '@mui/icons-material/Cancel';
import { LoginTosterStyles } from './LoginTosterStyles';
import { Box } from '@mui/material';




const LoginToster = ({tosterColor,message,setSuccessToster}) => {

    // alert("Success")
    const handleCloseToster = ()=>{
        setSuccessToster(false)
    }
    // const handleErrorToster = ()=>{
    //     setErrorToster(true)
    // }
    return ( 
    <div sx={LoginTosterStyles.mainToster}>
        {tosterColor === "Success" ? 
        <Box sx={LoginTosterStyles.logOutSuccessToster}>
            
             {message}
    
            <Box sx={LoginTosterStyles.logoutCloseBtn}>
                <CancelIcon color='black' onClick={handleCloseToster}/>
            </Box>
        </Box>
        :null}
        {tosterColor === "Error" ?

        <Box sx={LoginTosterStyles.errorToster}>
         {message}
        <Box sx={LoginTosterStyles.closeBtn}>
                <CancelIcon onClick={handleCloseToster}/>
            </Box>
            
            </Box>
        :null}
    </div>
    );
}
 
export default LoginToster;