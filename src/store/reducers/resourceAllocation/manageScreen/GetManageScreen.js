import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


export const manageScreen = createAsyncThunk(
  "/api/module/get",
  async (thunkAPI) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_PATH}/api/module/`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            token:`${sessionStorage.getItem("token")}`
          }
        }
      );
      let data = await response.json();
      if (response.status === 200) {
        return data;
      }
      else {
        return thunkAPI.rejectWithValue(data);
      }
    } catch (e) {
      thunkAPI.rejectWithValue(e.response.data);
    }
  }
);

export const manageScreenSlice = createSlice({
  name: "manageScreen",
  initialState: {
    isFetching: false,
    isSuccess: false,
    isError: false,
    errorMessage: "",
    responseData: "",
  },
  reducers: {
    clearState: (state) => {
      state.isError = false;
      state.isSuccess = false;
      state.isFetching = false;
      return state;
    },
  },
  extraReducers: {
    [manageScreen.fulfilled]: (state, { payload }) => {
      state.responseData = payload.data;
      state.isError = false;
      state.isFetching = false;
      state.isSuccess = true;

      return state;
    },
    [manageScreen.rejected]: (state, { payload }) => {
      state.isFetching = false;
      state.isError = true;
      state.isSuccess = false;
      state.errorMessage = payload.message;
    },
    [manageScreen.pending]: (state) => {
      state.isFetching = true;
    },
  },
});

export const { clearState } = manageScreenSlice.actions;
