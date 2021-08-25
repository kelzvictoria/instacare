import axios from "axios";
import { returnErrors } from "./errorActions";
import { AUTH_SUCCESS, AUTH_FAIL, AUTH_ERROR } from "./types";

const API_URL = process.env.REACT_APP_INSTACARE_REALM_URL;
const CLIENT_SECRET = process.env.REACT_APP_CLIENT_SECRET;
const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
const DEV_LAB_API_URL = "localhost:5000"//process.env.REACT_APP_DEV_LAB_REALM_URL;
const DEV_LAB_CLIENT_SECRET = process.env.REACT_APP_DEV_LAB_CLIENT_SECRET;
const DEV_LAB_CLIENT_ID = process.env.REACT_APP_DEV_LAB_CLIENT_ID

export const getToken = () => (dispatch) => {
    let enc = encodeURIComponent || escape;

    axios.post(
        DEV_LAB_API_URL + "/oauth/token?scope=" + enc("*.*") + "&client_id=" +
        enc(DEV_LAB_CLIENT_ID) + "&client_secret=" + enc(DEV_LAB_CLIENT_SECRET) + "&grant_type=" + enc(
            "client_credentials"
        ),
        {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
        }
    ).then(res => {
        dispatch({
            type: AUTH_SUCCESS,
            payload: res.data.access_token
        })
        //token = res.data.access_token

    }).catch((err) => {
        dispatch({
            type: AUTH_FAIL
        })
    })
}

export const tokenConfig = (getState) => {
    const access_token = getState().auth.access_token;
    const config = {
        headers: {
            "Content-type": "application/json"
        }
    }

    if (access_token) {
        config.headers["Authorization"] = `Bearer ${access_token}`
    }

    return config;
}