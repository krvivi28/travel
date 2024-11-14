import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { APIRequestState } from "../utils";
import axios from "axios";
import { imageUploadURL } from "@src/constants/api";

const initialState = {
  data: null,
  error: null,
  isFileUploading: APIRequestState.IDLE,
};

const fileUploadSlice = createSlice({
  name: "file-upload",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(uploadImage.pending, (state) => {
      state.isFileUploading = APIRequestState.LOADING;
      state.error = null;
    });
    builder.addCase(
      uploadImage.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.data = action.payload;
        state.isFileUploading = APIRequestState.SUCCESS;
        state.error = null;
      }
    );
    builder.addCase(
      uploadImage.rejected,
      (state, action: PayloadAction<any>) => {
        state.data = null;
        state.isFileUploading = APIRequestState.ERROR;
        state.error = action.payload;
      }
    );
  },
});

export const uploadImage = createAsyncThunk(
  "file-upload",
  async (file: any, { rejectWithValue }) => {
    try {
      const res = await axios.post(imageUploadURL, file);
      return res.data;
    } catch (error: any) {
      const errorMessage = error?.response?.data?.error || error;
      return rejectWithValue(errorMessage);
    }
  }
);

export default fileUploadSlice.reducer;
