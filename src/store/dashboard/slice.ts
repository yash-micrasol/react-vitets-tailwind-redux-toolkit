import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialStates = {
  loading: false,
  error: false,
  data: null,
  errorMsg: "",
};

// ** Get Data Api
export const getDataApi = createAsyncThunk(
  "getDataApi",
  async (data: any, { rejectWithValue }: any) => {
    try {
      const response = await axios.post(`your_api`, data);
      return response;
    } catch (error: any) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  }
);

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState: initialStates,
  extraReducers: {
    [getDataApi.pending]: (state: any) => {
      state.loading = true;
    },
    [getDataApi.fulfilled]: (
      state: { data: any; loading: boolean },
      action: { payload: any }
    ) => {
      state.data = action.payload;
      state.loading = false;
    },
    [getDataApi.rejected]: (state: { error: boolean; loading: boolean }) => {
      state.error = true;
      state.loading = false;
    },
  },
  reducers: {},
});

const { reducer } = dashboardSlice;

export default reducer;
