import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"; 

export const getUsers = createAsyncThunk(
    "api/employee/",
    async (params,thunkAPI) => {
      try {              
      const response = await fetch(`${process.env.REACT_APP_API_PATH}/api/employee/?status=${params}`, {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            token: `${localStorage.getItem("token")}`,
          }, 
        });
        let data = await response.json();
        if (response.status === 200) {
          return data;
        } else {
          return thunkAPI.rejectWithValue(data);
        }
      } catch (e) {
        thunkAPI.rejectWithValue(e.response.data);
      }
    }
   );
    
  export const getUsersSlice = createSlice({
    name: "api/employee/",
    initialState: {
      getUsersData:[],
      getUsersDataSuccess:false,
      getUsersDataError:false,
    },
    reducers: {
      cleargetUsersState: (state) => {
      state.getUsersDataSuccess=false;
      state.getUsersDataError=false;
        return state;
      },
      getUsersSuccessData:(state,action)=>{
        state.getUsersSuccessData = action.payload;
      }
    },
    extraReducers: {
      [getUsers.fulfilled]:(state,{payload})=>{
        state.getUsersData=payload.data;
        state.getUsersDataSuccess=true;
        state.getUsersDataError = false;
      },
      [getUsers.rejected]:(state)=>{
        state.getUsersDataSuccess=false;
        state.getUsersDataError = true;
      }
    },
  });
  
  export const {cleargetUsersState,fulfilled,rejected} = getUsersSlice.actions;

  export const userSelector = (state) => state.getUsers; 


  