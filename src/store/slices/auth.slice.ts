import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { APIRequestState } from "../utils";
import axios from "axios";
import { baseURL } from "@src/constants/api";

interface ITravelAgency {
  agency_details: any;
  error: any;
  status: APIRequestState;
  token: string | null;
}

const initialState: ITravelAgency = {
  agency_details: null,
  error: null,
  status: APIRequestState.IDLE,
  token: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = APIRequestState.LOADING;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action: PayloadAction<any>) => {
        state.agency_details = action.payload.user;
        state.token = action.payload.token;
        state.error = null;
        state.status = APIRequestState.SUCCESS;
      })
      .addCase(login.rejected, (state, action) => {
        state.error = action.payload;
        state.status = APIRequestState.ERROR;
      });
  },
});

export const login = createAsyncThunk(
  "auth/login",
  async (
    credentials: { email: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const res = await axios.post(`${baseURL}/auth/login`, credentials);
      return res.data;
    } catch (error: any) {
      const errorMessage = error?.response?.data?.error || error;
      return rejectWithValue(errorMessage);
    }
  }
);

export default authSlice.reducer;
