import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


export const loginUser = createAsyncThunk(
  "/login",
  async ({ email, password }, thunkAPI) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_PATH}/api/auth/session/login`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        }
      );
      let data = await response.json();
      if (response.status === 200) {
        // localStorage.setItem("token", data.data.session.token);
        // localStorage.setItem("firstName", data.data.employees.first_name);
        // localStorage.setItem("designation", data.data.employees.job_title);
        // localStorage.setItem("userId", data.data.employees.id)
        // localStorage.setItem("sessionId", data.data.session.id); 
        // sessionStorage.setItem("token", data.data.session.token)
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

export const loginSlice = createSlice({
  name: "user",
  initialState: {
    isFetching: false,
    isSuccess: false,
    isError: false,
    errorMessage: "",
    responseData: '',
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
    [loginUser.fulfilled]: (state, { payload }) => {
      state.responseData = payload.data;
      state.isError = false;
      state.isFetching = false;
      state.isSuccess = true;

      return state;
    },
    [loginUser.rejected]: (state, { payload }) => {
      state.isFetching = false;
      state.isError = true;
      state.isSuccess = false;
      state.errorMessage = payload.message;
    },
    [loginUser.pending]: (state) => {
      state.isFetching = true;
    },
  },
});

export const { clearState } = loginSlice.actions;
