import { configureStore } from "@reduxjs/toolkit";
import transactionPayloadReducer from "./features/transaction-payload-slice";

export const store = configureStore({
  reducer: {
    transactionPayload: transactionPayloadReducer,
  },
});
