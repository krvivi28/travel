import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { APIRequestState } from "../utils";
import { IUser } from "./interfaces";
import axios from "axios";
import { baseURL } from "@src/constants/api";
import { getHeader } from "@src/utils/api";
import toast from "react-hot-toast";
interface IState {
  userDetails: null | IUser;
  isUserDetailsLoading: APIRequestState;
  error: any;
  action: "fetch" | "update" | null;
}

const initialState: IState = {
  userDetails: null,
  isUserDetailsLoading: APIRequestState.IDLE,
  error: null,
  action: null,
};

const userSlice = createSlice({
  name: "user-details",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUserDetails.pending, (state) => {
        state.isUserDetailsLoading = APIRequestState.LOADING;
        state.error = null;
        state.action = null;
      })
      .addCase(
        getUserDetails.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.userDetails = action.payload;
          state.isUserDetailsLoading = APIRequestState.SUCCESS;
          state.error = null;
          state.action = "fetch";
        }
      )
      .addCase(getUserDetails.rejected, (state, action: PayloadAction<any>) => {
        state.isUserDetailsLoading = APIRequestState.ERROR;
        state.error = action.payload;
        state.action = null;
      })
      .addCase(updateUserDetails.pending, (state) => {
        state.isUserDetailsLoading = APIRequestState.LOADING;
        state.error = null;
        state.action = null;
      })
      .addCase(
        updateUserDetails.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.userDetails = action.payload;
          state.isUserDetailsLoading = APIRequestState.SUCCESS;
          state.error = null;
          state.action = "update";
        }
      )
      .addCase(
        updateUserDetails.rejected,
        (state, action: PayloadAction<any>) => {
          state.isUserDetailsLoading = APIRequestState.ERROR;
          state.error = action.payload;
          state.action = null;
        }
      );
  },
});

export const getUserDetails = createAsyncThunk("get-user-details", async () => {
  try {
    const res = await axios.get(`${baseURL}/auth/details`, {
      headers: getHeader(),
    });
    if (!res.data.userDetails?.isVerified)
      toast.error(
        "Profile under verification, make sure to update required documents and details.",
        { duration: 5000 }
      );
    return res.data.userDetails;
  } catch (error: any) {
    const errorMessage = error?.response?.data?.error || error;
    return errorMessage;
  }
});

export const updateUserDetails = createAsyncThunk(
  "update-user-details",
  async (data: IUser) => {
    try {
      const res = await axios.put(`${baseURL}/auth/profile/update`, data, {
        headers: getHeader(),
      });
      toast.success("Profile Updated Successfully!", { duration: 5000 });
      return res.data.updatedUserDetails;
    } catch (error: any) {
      const errorMessage = error?.response?.data?.error || error;
      return errorMessage;
    }
  }
);

export default userSlice.reducer;
