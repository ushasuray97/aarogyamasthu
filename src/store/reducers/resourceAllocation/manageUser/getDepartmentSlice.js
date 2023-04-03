import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getDepartments = createAsyncThunk(
    "api/department",
    async (thunkAPI) => {
      try {              
        const response = await fetch(`${process.env.REACT_APP_API_PATH}/api/department`, {
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

export const getDepartmentsByName = createAsyncThunk(
  "api/department",
  async ({params}, thunkAPI) => {
    try {
  
          const response = await fetch(`${process.env.REACT_APP_API_PATH}/api/department?name=${params}`, {
            method: "GET",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              token: `${localStorage.getItem("token")}`,
            },
          })
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


export const getDepartmentsSlice = createSlice({
  name: "api/department",
  initialState: {
    getDepartmentsData: [],
    getDepartmentsDataSuccess: false,
    getDepartmentsDataError: false,
    getDepartmentsByNameData: [],
    getDepartmentsByNameDataSuccess: false,
    getDepartmentsByNameDataError: false,
  },
  reducers: {
    cleargetDepartmentsState: (state) => {
      state.getDepartmentsDataSuccess = false;
      state.getDepartmentsDataError = false;
      return state;
    },
    getDepartmentsSuccessData: (state, action) => {
      state.getDepartmentsSuccessData = action.payload;
    },
    cleargetDepartmentsByNameState: (state) => {
      state.getDepartmentsByNameDataSuccess = false;
      state.getDepartmentsByNameDataError = false;
      return state;
    },
    getDepartmentsByNameSuccessData: (state, action) => {
      state.getDepartmentsByNameSuccessData = action.payload;
    }

  },
  extraReducers: {
    [getDepartments.fulfilled]: (state, { payload }) => {
      state.getDepartmentsData = payload.data;
      state.getDepartmentsDataSuccess = true;
      state.getDepartmentsDataError = false;
    },
    [getDepartments.rejected]: (state) => {
      state.getDepartmentsDataSuccess = false;
      state.getDepartmentsDataError = true;
    },
    [getDepartmentsByName.fulfilled]: (state, { payload }) => {
      state.getDepartmentsByNameData = payload.data;
      state.getDepartmentsByNameDataSuccess = true;
      state.getDepartmentsByNameDataError = false;
    },
    [getDepartmentsByName.rejected]: (state) => {
      state.getDepartmentsByNameDataSuccess = false;
      state.getDepartmentsByNameDataError = true;
    }
  },
  
});

export const { cleargetDepartmentsState,cleargetDepartmentsByNameState, fulfilled, rejected } = getDepartmentsSlice.actions;





