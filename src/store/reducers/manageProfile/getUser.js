import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getUser = createAsyncThunk(
    "api/employee/",
    async ({id,value}, thunkAPI) => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_PATH}/api/employee/?${id}=${value}`, {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    token: `${localStorage.getItem("token")}`,
                },
            });
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

export const getUserSlice = createSlice({
    name: "api/employee/",
    initialState: {
        isFetching: false,
        isSuccess: false,
        isError: false,
        errorMessage: "",
        responseData:[],
    },
    reducers: {
        clearState: (state) => {
            state.isSuccess = false;
            state.isError = false;
            state.isFetching= false;
            return state;
        }
    },
    extraReducers: {
        [getUser.fulfilled]: (state, { payload }) => {
            state.responseData = payload.data;
            state.isSuccess = true;
            state.isError = false;
            state.isFetching= false;
        },
        [getUser.rejected]: (state) => {
            state.isSuccess = false;
            state.isError = true;
            state.isFetching= false;
        },
        [getUser.pending]: (state) => {
            state.isFetching = true;
        },
    },
});

export const { clearState } = getUserSlice.actions;


