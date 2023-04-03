import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"; 

export const putManageScreen = createAsyncThunk(
  "/api/module/edit",
  async ({name,id}, thunkAPI) => {
    console.log(name,id)
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
            name
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

export const putManageScreenSlice = createSlice({
  name: "Edit ManageScreen",
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
    [putManageScreen.fulfilled]: (state, { payload }) => {
      state.responseData = payload.data;
      state.isErrorEdit = false;
      state.isFetchingEdit = false;
      state.isSuccessEdit = true;
      return state;
    },
    [putManageScreen.rejected]: (state, { payload }) => { 
      state.isFetchingEdit = false;
      state.isErrorEdit = true;
      state.isSuccessEdit = false;
      state.errorMessage = payload.message;
    },
    [putManageScreen.pending]: (state) => {
      state.isFetchingEdit = true;
    },
  },
});

export const { clearStateEdit } = putManageScreenSlice.actions;

