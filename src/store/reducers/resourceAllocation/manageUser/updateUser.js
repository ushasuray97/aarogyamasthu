import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const updateUser = createAsyncThunk(
    "/api/employee/",
    async (
        values,
        thunkAPI
    ) => {
        try {
            const response = await fetch(
                `${process.env.REACT_APP_API_PATH}/api/employee/`,
                {
                    method: "PUT",
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                        token: `${localStorage.getItem("token")}`,
                        // refreshToken: `${sessionStorage.getItem("refreshToken")}`,
                    },
                    body: JSON.stringify(values),
                }
            );
            let data = await response.json();
            if (response.status === 200) {
                console.log(data)
                return data;

            } else {
                return thunkAPI.rejectWithValue(data);
            }
        } catch (e) {
            thunkAPI.rejectWithValue(e.response.data);
        }
    }
);


export const updateUserSlice = createSlice({
    name: "user",
    initialState: {
        isFetchingEdit: false,
        isSuccessEdit: false,
        isErrorEditEdit: false,
        errorMessage: "",
        updateUserData: "",
    },
    reducers: {
        clearUpdateState: (state) => {
            state.isErrorEdit = false;
            state.isSuccessEdit = false;
            state.isFetchingEdit = false;
            return state;
        },
    },
    extraReducers: {
        [updateUser.fulfilled]: (state, { payload }) => {
            state.isFetchingEdit = false;
            state.isSuccessEdit = true;
            state.isErrorEdit = false;
            state.updateUserData = payload.data;

        },
        [updateUser.pending]: (state) => {
            state.isFetchingEdit = true;
        },
        [updateUser.rejected]: (state, { payload }) => {
            state.isFetchingEdit = false;
            state.isErrorEdit = true;
            state.isSuccessEdit = false;
            state.errorMessage = payload.message;
        },
    },
})

export const { clearUpdateState } = updateUserSlice.actions;

