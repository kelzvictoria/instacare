import { filterReducer } from "../reducers/filterReducer";
import { detailsAndPaymentReducer } from "../reducers/detailsAndPaymentReducer";

import { configureStore } from "redux-starter-kit";

export const store = configureStore({
    reducer: {
        quiz: filterReducer,
        details: detailsAndPaymentReducer
    }
});
