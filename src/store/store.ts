import filterReducer from "../reducers/filterReducer";
import { detailsAndPaymentReducer } from "../reducers/detailsAndPaymentReducer";
import { compareReducer } from "../reducers/compareReducer";
import fetchDataReducer from "../reducers/fetchDataReducer";
import userInputReducer from "../reducers/userInputReducer";
import { authReducer } from "../reducers/authReducer";

import { configureStore } from "redux-starter-kit";

export const store = configureStore({
  reducer: {
    filter: filterReducer,
    details: detailsAndPaymentReducer,
    compare: compareReducer,
    fetchData: fetchDataReducer,
    quiz: userInputReducer,
    auth: authReducer,
  },
});
