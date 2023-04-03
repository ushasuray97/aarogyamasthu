import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

export const addProject = createAsyncThunk(
    "/api/project/",
    async ({ values, attachments,

    }, thunkAPI) => {

        try {
            const response = await fetch(`${process.env.REACT_APP_API_PATH}/api/project/`, {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    token: `${localStorage.getItem("token")}`,
                },
                body: JSON.stringify({
                    user_id: values.userId,
                    name: values.name,
                    description: values.description,
                    client_name: values.client_name,
                    client_email:values.client_email ,
                    start_date:values.start_date ,
                    end_date: values.end_date,
                    team_size:values.team_size ,
                    technologies:values.technologies ,
                    flag: values.flag,
                    sub_type:values.sub_type ,
                    status:values.status ,
                    attachments,

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

export const addProjectSlice = createSlice({
    name: "addProject",
    initialState: {
        addprojectData: "",
        isFetchingAdd: false,
        isSuccessAdd: false,
        isErrorAdd: false,
        errorMessage: "",
    },
    reducers: {
        clearaddProjectState: (state) => {
            state.isErrorAdd = false;
            state.isSuccessAdd = false;
            state.isFetchingAdd = false;

            return state;
        },
    },
    extraReducers: {
        [addProject.fulfilled]: (state, { payload }) => {
            state.addprojectData = payload.data;
            state.isErrorAdd = false;
            state.isFetchingAdd = false;
            state.isSuccessAdd = true;
            return state;
        },
        [addProject.rejected]: (state, { payload }) => {
            state.isFetchingAdd = false;
            state.isErrorAdd = true;
            state.isSuccessAdd = false;
            state.errorMessage = payload.message;
        },
        [addProject.pending]: (state) => {
            state.isFetchingAdd = true;
        },
    },
});

export const { clearaddProjectState } = addProjectSlice.actions;

