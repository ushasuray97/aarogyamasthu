import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"; 

export const getProjects = createAsyncThunk(
    "api/project/",
    async ({params},thunkAPI) => {
      try {              
        const response = await fetch(`${process.env.REACT_APP_API_PATH}/api/project/?flag=${params}`, {
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
    
  export const getProjectsSlice = createSlice({
    name: "api/project/",
    initialState: {
      getProjectsData:"",
      getProjectsDataSuccess:false,
      getProjectsDataError:false,
    },
    reducers: {
      cleargetRolesState: (state) => {
      state.getProjectsDataSuccess=false;
      state.getProjectsDataError=false;
        return state;
      },
      GetProjectsSuccessData:(state,action)=>{
        state.getProjectsDataSuccess = action.payload;
      }
    },
    extraReducers: {
      [getProjects.fulfilled]:(state,{payload})=>{
        state.getProjectsData=payload.data;
        state.getProjectsDataSuccess=true;
        state.getProjectsDataError = false;
      },
      [getProjects.rejected]:(state)=>{
        state.getProjectsDataSuccess=false;
        state.getProjectsDataError = true;
      }
    },
  });
  
  export const {cleargetProjectsState,fulfilled,rejected} = getProjectsSlice.actions;

  export const userSelector = (state) => state.getProjects; 


  