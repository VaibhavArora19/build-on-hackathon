import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  toChain: "",
  toToken: "",
  protcolName: "",
  fromChain: "",
  fromToken: "",
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
    setFromChain: (state, action) => {
      console.log("action why are not you workinggggggggg");
      state.fromChain = action.payload;
    },
    setFromToken: (state, action) => {
      state.fromToken = action.payload;
    },
    resetState: (state) => {
      state.protcolName = "";
      state.toChain = "";
      state.toToken = "";
      state.fromChain = "";
      state.fromToken = "";
    },
  },
});

export default transactionPayloadSlice.reducer;

export const transactionPayloadActions = transactionPayloadSlice.actions;
