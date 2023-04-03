import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"; 

export const getRoles = createAsyncThunk(
    "api/role/",
    async (thunkAPI) => {
      try {              
        const response = await fetch(`${process.env.REACT_APP_API_PATH}/api/role/`, {
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
    
  export const getRolesSlice = createSlice({
    name: "api/role/",
    initialState: {
      getRolesData:"",
      getRolesDataSuccess:false,
      getRolesDataError:false,
    },
    reducers: {
      cleargetRolesState: (state) => {
      state.getRolesDataSuccess=false;
      state.getRolesDataError=false;
        return state;
      },
      GetRolesSuccessData:(state,action)=>{
        state.GetRolesSuccessData = action.payload;
      }
    },
    extraReducers: {
      [getRoles.fulfilled]:(state,{payload})=>{
        state.getRolesData=payload.data;
        state.getRolesDataSuccess=true;
        state.getRolesDataError = false;
      },
      [getRoles.rejected]:(state)=>{
        state.getRolesDataSuccess=false;
        state.getRolesDataError = true;
      }
    },
  });
  
  export const {cleargetRolesState,fulfilled,rejected} = getRolesSlice.actions;

  export const userSelector = (state) => state.getRoles; 


  