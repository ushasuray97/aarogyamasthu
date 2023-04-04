import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import "react-toastify/dist/ReactToastify.css";

export const addAdmin = createAsyncThunk(
    "/api/admin/",
    async ({ values, attachments,

    }, thunkAPI) => {

        try {
            const response = await fetch(`${process.env.REACT_APP_API_PATH}/api/admin/`, {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    token: `${localStorage.getItem("token")}`,
                },
                body: JSON.stringify({
                    user_id: values.userId,
                    name: values.name,
                   

                }),
            });
            let data = await response.json();
            if (response.status === 200) {
                console.log(data)
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

export const addAdminSlice = createSlice({
    name: "addAdmin",
    initialState: {
        addAdminData: "",
        isFetchingAdd: false,
        isSuccessAdd: false,
        isErrorAdd: false,
        errorMessage: "",
    },
    reducers: {
        clearaddAdminState: (state) => {
            state.isErrorAdd = false;
            state.isSuccessAdd = false;
            state.isFetchingAdd = false;

            return state;
        },
    },
    extraReducers: {
        [addAdmin.fulfilled]: (state, { payload }) => {
            state.addAdminData = payload.data;
            state.isErrorAdd = false;
            state.isFetchingAdd = false;
            state.isSuccessAdd = true;
            return state;
        },
        [addAdmin.rejected]: (state, { payload }) => {
            state.isFetchingAdd = false;
            state.isErrorAdd = true;
            state.isSuccessAdd = false;
            state.errorMessage = payload.message;
        },
        [addAdmin.pending]: (state) => {
            state.isFetchingAdd = true;
        },
    },
});

export const { clearaddAdminState } = addAdminSlice.actions;

