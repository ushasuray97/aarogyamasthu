import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"; 

export const resetLink = createAsyncThunk(
  "/api/employee/resetLink",
  async ({id}, thunkAPI) => {
    debugger
    try {
      const response = await fetch(`${process.env.REACT_APP_API_PATH}/api/employee/resetLink`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          token: `${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          id
        }),
      });   
      let data = await response.json();   
      if (response.status === 200) { 
        debugger
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

export const resetLinkSlice = createSlice({
  name: "Reset Link",
  initialState: {
    responseData: "",
    isFetchingReset: false,
    isSuccessReset: false,
    isErrorReset: false,
    errorMessage: "",
  },
  reducers: {
    clearStateReset: (state) => {
      state.isErrorReset = false;
      state.isSuccessReset = false;
      state.isFetchingReset = false;

      return state;
    },
  },
  extraReducers: {
    [resetLink.fulfilled]: (state, { payload }) => {
      state.responseData = payload.data;
      state.isErrorReset = false;
      state.isFetchingReset = false;
      state.isSuccessReset = true;
      return state;
    },
    [resetLink.rejected]: (state, { payload }) => { 
      state.isFetchingReset = false;
      state.isErrorReset = true;
      state.isSuccessReset = false;
      state.errorMessage = payload.message;
    },
    [resetLink.pending]: (state) => {
      state.isFetchingReset = true;
    },
  },
});

export const { clearStateReset } = resetLinkSlice.actions;

