import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"; 

export const putManageRole = createAsyncThunk(
  "/api/role/edit",
  async ({id,name,modulePermissions}, thunkAPI) => {
 
    try {
      const response = await fetch(`${process.env.REACT_APP_API_PATH}/api/role/`, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          token: `${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
            id,
            name,
            modulePermissions,
        }),
      });   
      let data = await response.json();   
      if (response.status === 200) { 
        return data;
      } 
      else {
        return thunkAPI.rejectWithValue(data);
      }
    } catch (e) { 
      thunkAPI.rejectWithValue(e.response);
    }
  }
);

export const putManageRoleSlice = createSlice({
  name: "Edit ManageRole",
  initialState: {
    responseData: "",
    isFetchingEdit: false,
    isSuccessEdit: false,
    isErrorEdit: false,
    errorMessage: "",
  },
  reducers: {
    clearStateEdit: (state) => {
      state.isErrorEdit = false;
      state.isSuccessEdit = false;
      state.isFetchingEdit = false;
      return state;
    },
  },
  extraReducers: {
    [putManageRole.fulfilled]: (state, { payload }) => {
      state.responseData = payload.data;
      state.isErrorEdit = false;
      state.isFetchingEdit = false;
      state.isSuccessEdit = true;
      return state;
    },
    [putManageRole.rejected]: (state, { payload }) => { 
      state.isFetchingEdit = false;
      state.isErrorEdit = true;
      state.isSuccessEdit = false;
      state.errorMessage = payload.message;
    },
    [putManageRole.pending]: (state) => {
      state.isFetchingEdit = true;
    },
  },
});

export const { clearStateEdit } = putManageRoleSlice.actions;

