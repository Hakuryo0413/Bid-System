import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { allEmployersData } from "../../../axios/api/employer/EmployersDetail";

export const fetchAllEmployers = createAsyncThunk("employers/fetchAll", async () => {
    try {
      const response = await allEmployersData();
      return response.allEmployers;
    } catch (error) {
      throw Error("Error fetching employers");
    }
  });
  
  interface employerDetailsState {
    employers: any;
    error: string | null;
    status: string;
  }
  
  const initialState: employerDetailsState = {
    employers: null,
    error: null,
    status: "idle",
  };
  
  const employersSlice = createSlice({
    name: "employers",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(fetchAllEmployers.pending, (state) => {
          state.status = "loading";
        })
        .addCase(fetchAllEmployers.fulfilled, (state, action) => {
          state.status = "succeeded";
          state.employers = action.payload;
        })
        .addCase(fetchAllEmployers.rejected, (state, action) => {
          state.status = "failed";
          state.error = action.error.message ?? null;
        });
    },
  });
  
  export default employersSlice.reducer;