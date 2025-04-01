import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Goal {
  id: string;
  name: string;
  target: number;
  saved: number;
  deadline: string;
}

interface FinanceState {
  goals: Goal[];
  sendModalOpen: boolean;
  receiveModalOpen: boolean;
}

const initialState: FinanceState = {
  goals: [],
  sendModalOpen: false,
  receiveModalOpen: false,
};

const financeSlice = createSlice({
  name: 'finance',
  initialState,
  reducers: {
    toggleSendModal(state) {
      state.sendModalOpen = !state.sendModalOpen;
    },
    toggleReceiveModal(state) {
      state.receiveModalOpen = !state.receiveModalOpen;
    },
    addGoal(state, action: PayloadAction<Goal>) {
      state.goals.push(action.payload);
    },
  },
});

export const {
  toggleSendModal,
  toggleReceiveModal,
  addGoal,
} = financeSlice.actions;

export default financeSlice.reducer;
