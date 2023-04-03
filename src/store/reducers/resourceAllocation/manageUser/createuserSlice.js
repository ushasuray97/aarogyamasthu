import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

export const createUser = createAsyncThunk(
  "/api/employee/",
  async ({
    emp_no,
    first_name,
    last_name,
    email,
    department_id,
    job_title,
    role_id,
    phone_number,
    reporting_to,

  }, thunkAPI) => {
   
    try {
      const response = await fetch(`${process.env.REACT_APP_API_PATH}/api/employee/`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          token: `${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          emp_no,
          first_name,
          last_name,
          email,
          department_id,
          job_title,
          role_id,
          phone_number,
          reporting_to,

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

export const createUserSlice = createSlice({
  name: "createUser",
  initialState: {
    userData: "",
    isFetchingAdd: false,
    isSuccessAdd: false,
    isErrorAdd: false,
    errorMessage: "",
  },
  reducers: {
    clearUserState: (state) => {
      state.isErrorAdd = false;
      state.isSuccessAdd = false;
      state.isFetchingAdd = false;

      return state;
    },
  },
  extraReducers: {
    [createUser.fulfilled]: (state, { payload }) => {
      state.userData = payload.data;
      state.isErrorAdd = false;
      state.isFetchingAdd = false;
      state.isSuccessAdd = true;
      return state;
    },
    [createUser.rejected]: (state, { payload }) => {
      state.isFetchingAdd = false;
      state.isErrorAdd = true;
      state.isSuccessAdd = false;
      state.errorMessage = payload.message;
    },
    [createUser.pending]: (state) => {
      state.isFetchingAdd = true;
    },
  },
});

export const { clearUserState } = createUserSlice.actions;

