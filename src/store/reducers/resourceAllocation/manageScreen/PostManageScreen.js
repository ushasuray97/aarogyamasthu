import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"; 

export const postManageScreen = createAsyncThunk(
  "/api/module/add",
  async ({name}, thunkAPI) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_PATH}/api/module/`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          token: `${sessionStorage.getItem("token")}`,
        },
        body: JSON.stringify({
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

export const postManageScreenSlice = createSlice({
  name: "Add manageScreen",
  initialState: {
    responseData: "",
    isFetchingAdd: false,
    isSuccessAdd: false,
    isErrorAdd: false,
    errorMessage: "",
  },
  reducers: {
    clearStateAdd: (state) => {
      state.isErrorAdd = false;
      state.isSuccessAdd = false;
      state.isFetchingAdd = false;

      return state;
    },
  },
  extraReducers: {
    [postManageScreen.fulfilled]: (state, { payload }) => {
      state.responseData = payload.data;
      state.isErrorAdd = false;
      state.isFetchingAdd = false;
      state.isSuccessAdd = true;
      return state;
    },
    [postManageScreen.rejected]: (state, { payload }) => { 
      state.isFetchingAdd = false;
      state.isErrorAdd = true;
      state.isSuccessAdd = false;
      state.errorMessage = payload.message;
    },
    [postManageScreen.pending]: (state) => {
      state.isFetchingAdd = true;
    },
  },
});

export const { clearStateAdd } = postManageScreenSlice.actions;

