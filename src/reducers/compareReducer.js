import { SET_PLANS_TO_COMPARE_ON_DESKTOP, SET_PLANS_TO_COMPARE_ON_MOBILE, SET_CHECKED_PLANS } from "../actions/types"

const initialState = {
    compare_plans_mobile_indexes: [],
    compare_plans_desktop_indexes: [],
    checked_plans_list: [],
}

export default function (state = initialState, action) {
    switch (action.type) {
        case SET_PLANS_TO_COMPARE_ON_MOBILE:
            return {
                ...state,
                compare_plans_mobile_indexes: action.payload
            }

        case SET_PLANS_TO_COMPARE_ON_DESKTOP:
            console.log("action.payload", action.payload);
            return {
                ...state,
                compare_plans_desktop_indexes: action.payload
            }

        case SET_CHECKED_PLANS:
            return {
                ...state,
                checked_plans_list: action.payload
            }
        default:
            return state
    }
}
