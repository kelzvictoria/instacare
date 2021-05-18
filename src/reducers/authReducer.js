import { createReducer, createAction } from "redux-starter-kit";
//import { state } from "../store/state";
import { AUTH_SUCCESS, AUTH_FAIL, AUTH_ERROR } from "../actions/types";

const initialState = {
    access_token: localStorage.getItem("access_token"),
    isAuthenticated: null,
}

let state = {};

export const authReducer = createReducer(state = initialState, {

    AUTH_SUCCESS: (state, action) => {
        localStorage.setItem("access_token", action.payload);
        return {
            ...state,
            access_token: action.payload,
            isAuthenticated: true
        }
    },

    AUTH_ERROR: (state, action) => {
        return {
            ...state,
            access_token: null,

            isAuthenticated: false
        }
    }
})

createAction(AUTH_SUCCESS);
createAction(AUTH_FAIL);
createAction(AUTH_ERROR)