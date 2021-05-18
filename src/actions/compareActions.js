import axios from "axios";
import { SET_PLANS_TO_COMPARE_ON_DESKTOP, SET_PLANS_TO_COMPARE_ON_MOBILE, SET_CHECKED_PLANS } from "../actions/types";
import { tokenConfig } from "../actions/authActions";
import { returnErrors } from "../actions/errorActions";

const API_URL = process.env.REACT_APP_INSTACARE_REALM_URL;

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
