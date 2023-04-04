import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"; 

export const getAdmins = createAsyncThunk(
    "api/admin/",
    async ({params},thunkAPI) => {
      try {              
        const response = await fetch(`${process.env.REACT_APP_API_PATH}/api/admin/?flag=${params}`, {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            token: `${localStorage.getItem("token")}`,
          }, 
        });
        let data = await response.json();
        if (response.status === 200) {
            // console.log(data);
          return data;
        } else {
          return thunkAPI.rejectWithValue(data);
        }
      } catch (e) {
        thunkAPI.rejectWithValue(e.response.data);
      }
    }
   );
    
  export const getAdminsSlice = createSlice({
    name: "api/admin/",
    initialState: {
      getAdminsData:"",
      getAdminsDataSuccess:false,
      getAdminsDataError:false,
    },
    reducers: {
      cleargetRolesState: (state) => {
      state.getAdminsDataSuccess=false;
      state.getAdminsDataError=false;
        return state;
      },
      getAdminsSuccessData:(state,action)=>{
        state.getAdminsDataSuccess = action.payload;
      }
    },
    extraReducers: {
      [getAdmins.fulfilled]:(state,{payload})=>{
        state.getAdminsData=payload.data;
        state.getAdminsDataSuccess=true;
        state.getAdminsDataError = false;
      },
      [getAdmins.rejected]:(state)=>{
        state.getAdminsDataSuccess=false;
        state.getAdminsDataError = true;
      }
    },
  });
  
  export const {cleargetAdminsState,fulfilled,rejected} = getAdminsSlice.actions;

  export const userSelector = (state) => state.getAdmins; 


  