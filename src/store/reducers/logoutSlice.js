import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import "react-toastify/dist/ReactToastify.css";
export const logoutUser = createAsyncThunk(
  "/api/session/logout",
  async ({id}, thunkAPI) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_PATH}/api/session/logout?`,
        {
          method: "PUT",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            token: `${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            id
          }),
        }
      );
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
export const logoutSlice = createSlice({
  name: "logout",
  initialState: {
    isFetching: false,
    isSuccess: false,
    isError: false,
    errorMessage: "",
  },
  reducers: {},
  extraReducers: {
    [logoutUser.fulfilled]: (state, { payload }) => {
      sessionStorage.clear();
      sessionStorage.clear();
      state.isError = false;
      state.isFetching = false;
      state.isSuccess = true;
      return state;
    },
    [logoutUser.rejected]: (state, { payload }) => {
      state.isFetching = false;
      state.isError = true;
      state.isSuccess = false;
      state.errorMessage = payload.message;
    },
    [logoutUser.pending]: (state) => {
      state.isFetching = true;
    },
  },
});

export const selectAuth = (state) => state.logout;

export default logoutSlice.reducer;
