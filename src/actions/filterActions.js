import {
    FORMAT_PRICES,
    FILTER_PROVIDERS,
    FILTER_DOCTORS,
    FILTER_PRESCRIPTIONS,
    UPDATE_SELECTED_PROVIDERS,
    FILTER_LOCATIONS,
    FILTER_BY_BUDGET,
    FILTER_BY_PLAN_TYPE,
    FILTER_BY_PLAN_RANGE,
    FILTER_BY_PLAN_ID,
    IS_FILTERING_BY_BUDGET,
    IS_FILTERING_BY_PLAN_TYPE,
    IS_FILTERING_BY_PLAN_RANGE,
    IS_FILTERING_BY_PLAN_ID,

} from "../actions/types";

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

export const filterDoctors = (doctors) => (dispatch) => {
    dispatch({
        type: FILTER_DOCTORS,
        payload: doctors
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
