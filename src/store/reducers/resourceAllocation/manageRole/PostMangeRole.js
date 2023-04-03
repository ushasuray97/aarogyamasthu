import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const postManageRole = createAsyncThunk(
    "/api/role/add",
    async ({ name,modulePermissions}, thunkAPI) => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_PATH}/api/role/`, {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    token: `${localStorage.getItem("token")}`,
                },
                body: JSON.stringify({
                    name,
                    modulePermissions,
            
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

export const postManageRoleSlice = createSlice({
    name: "Add ManageRole",
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
        [postManageRole.fulfilled]: (state, { payload }) => {
            state.responseData = payload.data;
            state.isErrorAdd = false;
            state.isFetchingAdd = false;
            state.isSuccessAdd = true;
            return state;
        },
        [postManageRole.rejected]: (state, { payload }) => {
            state.isFetchingAdd = false;
            state.isErrorAdd = true;
            state.isSuccessAdd = false;
            state.errorMessage = payload.message;
        },
        [postManageRole.pending]: (state) => {
            state.isFetchingAdd = true;
        },
    },
});

export const { clearStateAdd } = postManageRoleSlice.actions;

