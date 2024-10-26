import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  transactions: [],
};

const transactionsSlice = createSlice({
  name: "transactions",
  initialState,
  reducers: {
    setTransactions: (state, action) => {
      state.transactions = action.payload;
    },
  },
});

export default transactionsSlice.reducer;

export const transactionsActions = transactionsSlice.actions;
