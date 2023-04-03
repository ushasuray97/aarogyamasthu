import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"; 

export const deleteUser = createAsyncThunk(
  "/api/employee/delete",
  async ({id}, thunkAPI) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_PATH}/api/employee/`, {
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

export const deleteUserSlice = createSlice({
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
    [deleteUser.fulfilled]: (state, { payload }) => {
      state.isErrorDelete = false;
      state.isFetchingDelete = false;
      state.isSuccessDelete = true;
      return state;
    },
    [deleteUser.rejected]: (state, { payload }) => { 
      state.isFetchingDelete = false;
      state.isErrorDelete = true;
      state.isSuccessDelete = false;
      state.errorMessage = payload.message;
    },
    [deleteUser.pending]: (state) => {
      state.isFetchingDelete = true;
    },
  },
});

export const { clearStateDelete } = deleteUserSlice.actions;