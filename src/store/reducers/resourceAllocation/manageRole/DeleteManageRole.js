import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"; 

export const deleteManageRole = createAsyncThunk(
  "/api/role/delete",
  async ({id}, thunkAPI) => {
    console.log(id)
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
            status:"Deleted"
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

export const deleteManageRoleSlice = createSlice({
  name: "Delete ManageRole",
  initialState: {
    isFetchingDelete: false,
    isSuccessDelete: false,
    isErrorDelete: false,
    errorMessage: "",
  },
  reducers: {
    clearStateDelete: (state) => {
      state.isErrorDelete = false;
      state.isSuccessDelete = false;
      state.isFetchingDelete = false;
      return state;
    },
  },
  extraReducers: {
    [deleteManageRole.fulfilled]: (state, { payload }) => {
      state.isErrorDelete = false;
      state.isFetchingDelete = false;
      state.isSuccessDelete = true;
      return state;
    },
    [deleteManageRole.rejected]: (state, { payload }) => { 
      state.isFetchingDelete = false;
      state.isErrorDelete = true;
      state.isSuccessDelete = false;
      state.errorMessage = payload.message;
    },
    [deleteManageRole.pending]: (state) => {
      state.isFetchingDelete = true;
    },
  },
});

export const { clearStateDelete } = deleteManageRoleSlice.actions;