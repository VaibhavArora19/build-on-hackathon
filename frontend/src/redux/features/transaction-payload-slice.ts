import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  toChain: "",
  toToken: "",
  protcolName: "",
};

const transactionPayloadSlice = createSlice({
  name: "transactionPayload",
  initialState,
  reducers: {
    setToChain: (state, action) => {
      state.toChain = action.payload;
    },
    setToToken: (state, action) => {
      state.toToken = action.payload;
    },
    setProtocolName: (state, action) => {
      state.protcolName = action.payload;
    },
  },
});

export default transactionPayloadSlice.reducer;

export const transactionPayloadActions = transactionPayloadSlice.actions;
