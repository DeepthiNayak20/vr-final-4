import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    message: "",
    data: {},
    isSuccess: false,
    loading: false,
   
};

export const regDetailsAsyncThunk = createAsyncThunk(
    "recent/regDetailsAsyncThunk",
    async (arg, { rejectWithValue }) => {
        console.log("arg", arg.email);

        try {
            const fetchedData = await axios({
                method: "post",
                url: "http://admin-env.eba-mh8pph25.ap-south-1.elasticbeanstalk.com/admin/register",
                data: {
                    emailId: arg.email,
                    fullName: arg.userName,
                    mobileNumber: arg.mobileNo,
                    designation: arg.designation,
                    description:arg.description,
                    url: arg.url
                },
            });
            console.log(fetchedData);

            return fetchedData;
        } catch (err) {
            let error = err;
            return rejectWithValue(error.response.data);
        }
    }
);

export const regDetailsSlice = createSlice({
    name: "regDetails",
    initialState,
    reducers: {
        storePass: (state, action) => {
            state.emailId = action.payload;

            console.log("storePass", action.payload);
        },
        // storeMobile: (state, action) => {
        //     state.mobile = action.payload;
        //     console.log("storeMobile", action.payload);
        // },
    },
    extraReducers: (builder) => {
        builder.addCase(regDetailsAsyncThunk.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(regDetailsAsyncThunk.fulfilled, (state, action) => {
            state.loading = false;
            state.data = action.payload;
            console.log(state.data);

            state.isSuccess = true;
        });
        builder.addCase(regDetailsAsyncThunk.rejected, (state, action) => {
            state.message = action.payload;
            state.data = state.loading = false;
            state.isSuccess = false;
        });
    },
});

export const { storePass } = regDetailsSlice.actions;

export default regDetailsSlice;
