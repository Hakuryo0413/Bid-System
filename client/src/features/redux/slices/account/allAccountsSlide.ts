import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { allAccounts } from "../../../axios/api/account/AccountsDetail";

export const fetchAllAccounts = createAsyncThunk("accounts/fetchAll", async () => {
  try {
    const response = await allAccounts();
    return response.allAccounts;
  } catch (error) {
    throw Error("Error fetching accounts");
  }
});

interface accountDetailsState {
  accounts: any;
  error: string | null;
  status: string;
}

const initialState: accountDetailsState = {
  accounts: null,
  error: null,
  status: "idle",
};

const accountsSlice = createSlice({
  name: "accounts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllAccounts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAllAccounts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.accounts = action.payload;
      })
      .addCase(fetchAllAccounts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? null;
      });
  },
});

export default accountsSlice.reducer;