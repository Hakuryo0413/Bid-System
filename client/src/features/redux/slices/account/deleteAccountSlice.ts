import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { userInterface } from '../../../../types/UserInterface';

interface deleteAccountState {
  accounts: userInterface[]; 
  change: boolean;  
}

const initialState: deleteAccountState = {
  accounts: [],
  change: false

};

const deleteAccountSlice = createSlice({
  name: "deleteAccounts",
  initialState,
  reducers: {
    setAccountJobs: (state, action: PayloadAction<userInterface[]>) => {
      state.accounts = action.payload;
    },
    clearAccountJobs: (state) => {
      state.accounts = [];
    },
    deleted: (state) => {
      state.change = !state.change;
    }
  },
});

export const { setAccountJobs, clearAccountJobs, deleted } = deleteAccountSlice.actions;
export default deleteAccountSlice.reducer;
