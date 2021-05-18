import { createReducer, createAction } from "redux-starter-kit";
//import { state } from "../store/state";
import { SET_PLANS_TO_COMPARE_ON_DESKTOP, SET_PLANS_TO_COMPARE_ON_MOBILE, SET_CHECKED_PLANS } from "../actions/types"

const initialState = {
    compare_plans_mobile_indexes: [],
    compare_plans_desktop_indexes: [],
    checked_plans_list: [],
}

let state = {};

export const compareReducer = createReducer(state = initialState, {
    SET_PLANS_TO_COMPARE_ON_MOBILE: (state, action) => {
        //state.compare_plans_mobile_indexes = action.payload;
        return {
            ...state,
            compare_plans_mobile_indexes: action.payload
        }
    },

    SET_PLANS_TO_COMPARE_ON_DESKTOP: (state, action) => {
        //state.compare_plans_desktop_indexes = action.payload;
        return {
            ...state,
            compare_plans_desktop_indexes: action.payload
        }
    },

    SET_CHECKED_PLANS: (state, action) => {
        //state.checked_plans_list = action.payload;
        return {
            ...state,
            checked_plans_list: action.payload
        }
    },
})

createAction(SET_PLANS_TO_COMPARE_ON_MOBILE);
createAction(SET_PLANS_TO_COMPARE_ON_DESKTOP);
createAction(SET_CHECKED_PLANS);