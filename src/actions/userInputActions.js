import {
    GET_RECOMMENDED_PLANS,
    GET_CLICKED_PLAN,

    CHANGE_PAGE,
    CHANGE_PLAN_TYPE,
    UPDATE_PREFS,
    UPDATE_TEXT_RESPONSE,
    RESET_RESPONSES,
    UPDATE_PLANS,
    UPDATE_SORT_ORDER,
    FILTER_LOCATIONS,
    UPDATE_BEST_PLAN,
    UPDATE_CHEAPEST_PLAN,
    UPDATE_MOSTEXPENSIVE_PLAN,
    UPDATE_BUDGET,
    TOGGLE_FAMILY_PLAN_SELECTED,
    UPDATE_COVERS,
    RESET_PLANS,
    TOGGLE_DESKTOP_MODAL,
    TOGGLE_MOBILE_MODAL,
    TOGGLE_OTHERS_MODAL,
    UPDATE_GENDER,
    UPDATE_TYPE,
    TOGGLE_DESKTOP_VIEW,
    UPDATE_PHONE,
    UPDATE_FULL_NAME,
    UPDATE_INDIVIDUAL_AGE,
    UPDATE_FATHER_AGE,
    UPDATE_MOTHER_AGE,
    UPDATE_GRAND_FATHER_AGE,
    UPDATE_GRAND_MOTHER_AGE,
    UPDATE_FATHER_IN_LAW_AGE,
    UPDATE_MOTHER_IN_LAW_AGE,
    UPDATE_SPOUSE_AGE,
    UPDATE_CHILD_1_AGE,
    UPDATE_CHILD_2_AGE,
    UPDATE_CHILD_3_AGE,
    UPDATE_CHILD_4_AGE,
    UPDATE_CHILD_5_AGE,
    UPDATE_CHILD_6_AGE,
    UPDATE_CHILD_7_AGE,
    UPDATE_CHILD_8_AGE,
    UPDATE_SON_CHECKED,
    UPDATE_DAUGHTER_CHECKED,
    INCREMENT_SON_COUNT,
    DECREMENT_SON_COUNT,
    INCREMENT_DAUGHTER_COUNT,
    DECREMENT_DAUGHTER_COUNT,
    UPDATE_PLAN_DURATION,
    TOGGLE_FEATURES_MODAL,
    UPDATE_FEATURES_TAB_OPENED,
    TOGGLE_FEATURE_POPUP,
    UPDATE_NUM_OF_PEOPLE,
    RESET_NUM_OF_PEOPLE,
    GET_NUM_OF_PEOPLE,
    UPDATE_PRICE_RANGE,
    IS_FETCHING_SERVICES,
    SET_PLAN_ID,
    SET_HMO_ID,
    RESET_TYPE,
    RESET_RANGE,
    FORMAT_PRICES,
    FILTER_PROVIDERS,
    FILTER_PRESCRIPTIONS,
    UPDATE_SELECTED_PROVIDERS,

    IS_FILTERING_BY_PLAN_TYPE,
    IS_FILTERING_BY_PLAN_RANGE,
    IS_FILTERING_BY_PLAN_ID
} from "./types"
import { CAN_LOG } from "../utils/homeUtils"

export const updatePriceRange = (range) => (dispatch, getState) => {
    let ranges = [...getState().quiz.responses.price_range];


    let isRangeChecked = ranges.indexOf(range);

    if (range == "all") {
        ranges = []
    }

    if (isRangeChecked > -1) {
        ranges.splice(isRangeChecked, 1)
    } else {
        ranges.push(range)
    }

    CAN_LOG && console.log("ranges", ranges)

    dispatch({
        type: UPDATE_PRICE_RANGE,
        payload: ranges
    })
}

export const changePlanType = (type) => (dispatch, getState) => {
    dispatch({
        type: CHANGE_PLAN_TYPE,
        payload: type
    })
}

export const updateBudget = (budget) => (dispatch, getState) => {

    dispatch({
        type: UPDATE_BUDGET,
        payload: budget
    })
}

export const updateTextResponse = (resObj) => (dispatch, getState) => {
    dispatch({
        type: UPDATE_TEXT_RESPONSE,
        payload: resObj
    })
}

export const resetResponses = (resObj) => (dispatch, getState) => {
    dispatch({
        type: RESET_RESPONSES,
        payload: resObj
    })
}

export const getClickedPlan = (plan) => (dispatch, getState) => {
    dispatch({
        type: GET_CLICKED_PLAN,
        payload: plan
    })
}

export const setIsFetchingRecPlans = (payload) => (dispatch, getState) => {
    dispatch({
        type: IS_FETCHING_SERVICES,
        payload
    })
}

export const changePage = (payload) => (dispatch, getState) => {
    dispatch({
        type: CHANGE_PAGE,
        payload
    })
}

export const toggleDesktopModal = (payload) => (dispatch, getState) => {
    dispatch({
        type: TOGGLE_DESKTOP_MODAL,
        payload
    })
}

export const toggleMobileModal = (payload) => (dispatch, getState) => {
    dispatch({
        type: TOGGLE_MOBILE_MODAL,
        payload
    })
}

export const toggleOthersModal = (data) => (dispatch, getState) => {
    dispatch({
        type: TOGGLE_OTHERS_MODAL,
        payload: data
    })
}

export const updateGender = (payload) => (dispatch, getState) => {
    dispatch({
        type: UPDATE_GENDER,
        payload
    })
}

export const updateType = (data) => (dispatch, getState) => {
    // console.log("data", data);
    let types = [...getState().quiz.responses.type];
    // console.log("types", types);


    let isTypeChecked = types.indexOf(data.value);

    if (data.value == "all") {
        types = []
    }

    if (isTypeChecked > -1) {
        types.splice(isTypeChecked, 1)
    } else {
        types.push(data.value)
    }

    // CAN_LOG && console.log("types", types);

    dispatch({
        type: UPDATE_TYPE,
        payload: types//data
    })
}

export const toggleDesktopView = (payload) => (dispatch, getState) => {
    dispatch({
        type: TOGGLE_DESKTOP_VIEW,
        payload
    })
}

export const updatePhone = (payload) => (dispatch, getState) => {
    dispatch({
        type: UPDATE_PHONE,
        payload
    })
}

export const updateFullName = (payload) => (dispatch, getState) => {
    dispatch({
        type: UPDATE_FULL_NAME,
        payload
    })
}

export const updateAge = (data) => (dispatch, getState) => {

    let type;
    let key = data.key;
    let value = data.value
    switch (key) {
        case "individual_age":
            type = UPDATE_INDIVIDUAL_AGE
            break;

        case "father_age":
            type = UPDATE_FATHER_AGE
            break;

        case "mother_age":
            type = UPDATE_MOTHER_AGE
            break;

        case "grand_father_age":
            type = UPDATE_GRAND_FATHER_AGE
            break;

        case "grand_mother_age":
            type = UPDATE_GRAND_MOTHER_AGE
            break;

        case "father_in_law_age":
            type = UPDATE_FATHER_IN_LAW_AGE
            break;

        case "mother_in_law_age":
            type = UPDATE_MOTHER_IN_LAW_AGE
            break;

        case "spouse_age":
            type = UPDATE_SPOUSE_AGE
            break;

        case "child_1_age":
            type = UPDATE_CHILD_1_AGE
            break;

        case "child_2_age":
            type = UPDATE_CHILD_2_AGE
            break;

        case "child_3_age":
            type = UPDATE_CHILD_3_AGE
            break;

        case "child_4_age":
            type = UPDATE_CHILD_4_AGE
            break;

        case "child_5_age":
            type = UPDATE_CHILD_5_AGE
            break;

        case "child_6_age":
            type = UPDATE_CHILD_6_AGE
            break;

        case "child_7_age":
            type = UPDATE_CHILD_7_AGE
            break;

        case "child_8_age":
            type = UPDATE_CHILD_8_AGE
            break;

        default:
            type = ""

    }
    dispatch({
        type,
        payload: data
    })
}

export const updateSonCheck = (payload) => (dispatch, getState) => {
    console.log("payload", payload);
    dispatch({
        type: UPDATE_SON_CHECKED,
        payload
    })
}

export const updateDaughterCheck = (payload) => (dispatch, getState) => {
    dispatch({
        type: UPDATE_DAUGHTER_CHECKED,
        payload
    })
}

export const incrementSonCount = (payload) => (dispatch, getState) => {
    dispatch({
        type: INCREMENT_SON_COUNT,
        payload
    })
}

export const decrementSonCount = (payload) => (dispatch, getState) => {
    dispatch({
        type: DECREMENT_SON_COUNT,
        payload
    })
}

export const incrementDaughterCount = (payload) => (dispatch, getState) => {
    dispatch({
        type: INCREMENT_DAUGHTER_COUNT,
        payload
    })
}

export const decrementDaughterCount = (payload) => (dispatch, getState) => {
    dispatch({
        type: DECREMENT_DAUGHTER_COUNT,
        payload
    })
}

export const updatePlanDuration = (payload) => (dispatch, getState) => {
    dispatch({
        type: UPDATE_PLAN_DURATION,
        payload
    })
}

export const toggleFeaturesModal = (payload) => (dispatch, getState) => {
    dispatch({
        type: TOGGLE_FEATURES_MODAL,
        payload
    })
}

export const updateFeaturesTabOpened = (payload) => (dispatch, getState) => {
    dispatch({
        type: UPDATE_FEATURES_TAB_OPENED,
        payload
    })
}

export const toggleFeaturePopup = (payload) => (dispatch, getState) => {
    dispatch({
        type: TOGGLE_FEATURE_POPUP,
        payload
    })
}

export const updateNumOfPeople = (payload) => (dispatch, getState) => {
    dispatch({
        type: UPDATE_NUM_OF_PEOPLE,
        payload
    })
}

export const resetNumOfPeople = (payload) => (dispatch, getState) => {
    dispatch({
        type: RESET_NUM_OF_PEOPLE,
        payload
    })
}

export const getNumOfPeople = (payload) => (dispatch, getState) => {
    dispatch({
        type: GET_NUM_OF_PEOPLE,
        payload
    })
}

export const resetPlans = (plans) => (dispatch, getState) => {
    dispatch({
        type: RESET_PLANS,
        payload: plans
    })
}

export const setPlanID = (planID) => (dispatch, getState) => {
    dispatch({
        type: SET_PLAN_ID,
        payload: planID
    })
}

export const setHMOID = (hmoID) => (dispatch, getState) => {
    dispatch({
        type: SET_HMO_ID,
        payload: hmoID
    })
}

export const resetType = () => (dispatch, getState) => {
    dispatch({
        type: RESET_TYPE,
        payload: []
    })
}

export const resetRange = () => (dispatch, getState) => {
    dispatch({
        type: RESET_RANGE,
        payload: []
    })
}

export const formatPrices = (prices) => (dispatch) => {
    dispatch({
        type: FORMAT_PRICES,
        payload: prices
    })
}

// export const getProviderInfo = (provider) => (dispatch, getState) => {
//     dispatch({
//         type: GET_PROVIDER_INFO,
//         payload: provider
//     })
// }

export const filterProviders = (providers) => (dispatch) => {
    dispatch({
        type: FILTER_PROVIDERS,
        payload: providers
    })
}

export const filterPrescriptions = (prescriptions) => (dispatch) => {
    dispatch({
        type: FILTER_PRESCRIPTIONS,
        payload: prescriptions
    })
}

export const updateSelectedProviders = (providers) => (dispatch) => {
    dispatch({
        type: UPDATE_SELECTED_PROVIDERS,
        payload: providers
    })
}

export const filterLocations = (locations) => (dispatch) => {
    dispatch({
        type: FILTER_LOCATIONS,
        payload: locations
    })
}



export const setIsFilteringByPlanType = () => (dispatch, getState) => {
    return {
        type: IS_FILTERING_BY_PLAN_TYPE
    }
}

export const setIsFilteringByPlanRange = () => (dispatch, getState) => {
    return {
        type: IS_FILTERING_BY_PLAN_RANGE
    }
}

export const setIsFilteringByPlanID = () => (dispatch, getState) => {
    return {
        type: IS_FILTERING_BY_PLAN_ID
    }
}