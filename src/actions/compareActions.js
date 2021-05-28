import { SET_PLANS_TO_COMPARE_ON_DESKTOP, SET_PLANS_TO_COMPARE_ON_MOBILE, SET_CHECKED_PLANS } from "../actions/types";

export const setPlansToCompareOnDesktop = (plans) => (dispatch, getState) => {
    dispatch({
        type: SET_PLANS_TO_COMPARE_ON_DESKTOP,
        payload: plans
    })
}

export const setPlansToCompareOnMobile = (plans) => (dispatch, getState) => {
    dispatch({
        type: SET_PLANS_TO_COMPARE_ON_MOBILE,
        payload: plans
    })
}

export const setCheckedPlans = (plans) => (dispatch, getState) => {
    dispatch({
        type: SET_CHECKED_PLANS,
        payload: plans
    })
}
