import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"; 

export const deleteManageScreen = createAsyncThunk(
  "/api/module/delete",
  async ({id}, thunkAPI) => {
    console.log(id)
    try {
      const response = await fetch(`${process.env.REACT_APP_API_PATH}/api/module/`, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          token: `${sessionStorage.getItem("token")}`,
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

export const deleteManageScreenSlice = createSlice({
  name: "Delete ManageScreen",
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
    [deleteManageScreen.fulfilled]: (state, { payload }) => {
      state.isErrorDelete = false;
      state.isFetchingDelete = false;
      state.isSuccessDelete = true;
      return state;
    },
    [deleteManageScreen.rejected]: (state, { payload }) => { 
      state.isFetchingDelete = false;
      state.isErrorDelete = true;
      state.isSuccessDelete = false;
      state.errorMessage = payload.message;
    },
    [deleteManageScreen.pending]: (state) => {
      state.isFetchingDelete = true;
    },
  },
});

export const { clearStateDelete } = deleteManageScreenSlice.actions;