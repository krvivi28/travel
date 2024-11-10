import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { APIRequestState } from "../utils";
import axios from "axios";
import { baseURL } from "@src/constants/api";

interface ITravelAgency {
  agency_details: any;
  error: any;
  message: string;
  status: APIRequestState;
  token: string | null;
}

const initialState: ITravelAgency = {
  agency_details: null,
  error: null,
  message: "",
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
      .addCase(login.rejected, (state, action: PayloadAction<any>) => {
        state.error = action.payload?.response?.data?.message;
        state.status = APIRequestState.ERROR;
      })
      .addCase(forgotPassword.pending, (state) => {
        state.status = APIRequestState.LOADING;
        state.error = null;
      })
      .addCase(
        forgotPassword.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.message = action.payload.msg;
          state.token = action.payload.token;
          state.error = null;
          state.status = APIRequestState.SUCCESS;
        }
      )
      .addCase(forgotPassword.rejected, (state, action) => {
        state.error = action.payload;
        state.status = APIRequestState.ERROR;
      })
      .addCase(resetPassword.pending, (state) => {
        state.status = APIRequestState.LOADING;
        state.error = null;
      })
      .addCase(resetPassword.fulfilled, (state, action: PayloadAction<any>) => {
        state.message = action.payload.message;
        state.agency_details = action.payload.user;
        state.token = action.payload.token;
        state.error = null;
        state.status = APIRequestState.SUCCESS;
      })
      .addCase(resetPassword.rejected, (state, action: PayloadAction<any>) => {
        state.error = action.payload?.response?.data?.message;
        state.status = APIRequestState.ERROR;
      })
      .addCase(signup.pending, (state) => {
        state.status = APIRequestState.LOADING;
        state.error = null;
      })
      .addCase(signup.fulfilled, (state, action: PayloadAction<any>) => {
        state.agency_details = action.payload.user;
        state.token = action.payload.token;
        state.error = null;
        state.status = APIRequestState.SUCCESS;
      })
      .addCase(signup.rejected, (state, action) => {
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

export const forgotPassword = createAsyncThunk(
  "auth/password/forget",
  async (credentials: { email: string }, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        `${baseURL}/auth/password/forget`,
        credentials
      );
      return res.data;
    } catch (error: any) {
      const errorMessage = error?.response?.data?.error || error;
      return rejectWithValue(errorMessage);
    }
  }
);

export const resetPassword = createAsyncThunk(
  "auth/password/reset",
  async (
    credentials: { password: string; confirmPassword: string; token: string },
    { rejectWithValue }
  ) => {
    try {
      const creds = {
        password: credentials.password,
        confirmPassword: credentials.confirmPassword,
      };
      const res = await axios.put(
        `${baseURL}/auth/password/reset/${credentials?.token}`,
        creds
      );
      return res.data;
    } catch (error: any) {
      const errorMessage = error?.response?.data?.error || error;
      return rejectWithValue(errorMessage);
    }
  }
);
export const signup = createAsyncThunk(
  "auth/signup",
  async (
    credentials: {
      agency_name: string;
      contact_person: string;
      contact_number: string;
      email: string;
      password: string;
    },
    { rejectWithValue }
  ) => {
    try {
      const res = await axios.post(`${baseURL}/auth/signup`, credentials);
      return res.data;
    } catch (error: any) {
      const errorMessage = error?.response?.data?.error || error;
      return rejectWithValue(errorMessage);
    }
  }
);

export default authSlice.reducer;
