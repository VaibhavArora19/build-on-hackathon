import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  toChain: "",
  toToken: "",
  protocolName: "",
  fromChain: "",
  fromToken: "",
  fromDecimals: 0,
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
      state.protocolName = action.payload;
    },
    setFromChain: (state, action) => {
      state.fromChain = action.payload;
    },
    setFromToken: (state, action) => {
      state.fromToken = action.payload;
    },
    setFromDecimals: (state, action) => {
      state.fromDecimals = action.payload;
    },
    resetState: (state) => {
      state.protocolName = "";
      state.toChain = "";
      state.toToken = "";
      state.fromChain = "";
      state.fromToken = "";
    },
  },
});

export default transactionPayloadSlice.reducer;

export const transactionPayloadActions = transactionPayloadSlice.actions;
