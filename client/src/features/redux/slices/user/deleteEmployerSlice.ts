import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { employerInterface } from '../../../../types/EmployerInterface';

interface deleteEmployerState {
  employers: employerInterface[]; 
  change: boolean;  
}

const initialState: deleteEmployerState = {
  employers: [],
  change: false

};

const deleteEmployerSlice = createSlice({
  name: "deleteEmployers",
  initialState,
  reducers: {
    setEmployerJobs: (state, action: PayloadAction<employerInterface[]>) => {
      state.employers = action.payload;
    },
    clearEmployerJobs: (state) => {
      state.employers = [];
    },
    deleted: (state) => {
      state.change = !state.change;
    }
  },
});

export const { setEmployerJobs, clearEmployerJobs, deleted } = deleteEmployerSlice.actions;
export default deleteEmployerSlice.reducer;
