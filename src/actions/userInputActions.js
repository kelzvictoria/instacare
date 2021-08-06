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
    RESET_BUDGET,
    RESET_RANGE,
    FORMAT_PRICES,
    FILTER_PROVIDERS,
    FILTER_PRESCRIPTIONS,
    FILTER_BENEFITS,
    FILTER_DOCTORS,
    UPDATE_SELECTED_PROVIDERS,

    IS_FILTERING_BY_PLAN_TYPE,
    IS_FILTERING_BY_PLAN_RANGE,
    IS_FILTERING_BY_PLAN_ID,
    SET_PROVIDERS,
    SET_DOCTORS,
    SET_BENEFITS,

    RESET_SELECTED_PROVIDERS,
    ADD_COMPARE_URL_PARAM,
    REMOVE_COMPARE_URL_PARAM,
    TOGGLE_DATA_CAPTURE_MODAL,
    TOGGLE_FILTER_BOX,

    COMPARE_TOP_THREE_PLANS,
    GET_TOP_THREE_PLANS,
    RESET_SELECTED_DOCTOR,
    RESET_BENEFITS,
    RESET_PLAN_ID,

    HANDLE_PLAN_RANGE_CHECK,
    HANDLE_PLAN_TYPES_CHECK,
    HANDLE_PROVIDER_SELECTED,
    HANDLE_PRESCRIPTION_SELECTED,
    HANDLE_MIN_RANGE_CHANGE,
    HANDLE_MAX_RANGE_CHANGE,
    HANDLE_TOTAL_BENEFIT_MIN_CHANGE,
    HANDLE_TOTAL_BENEFIT_MAX_CHANGE,
    HANDLE_PLAN_ID_CHANGE,
    ENABLE_SEARCH_BY_PROXIMITY,
    HANDLE_MIN_DED_CHANGE,
    HANDLE_MAX_DED_CHANGE,
    HANDLE_HMO_SELECTED,
    RESET_FILTER_PARAMS,
    SET_COORDINATES_AND_ADDRESS,
    HANDLE_ADDRESS_IMPUT,
    CLEAR_DOCTORS_FILTER,
    CLEAR_PROVIDERS_FILTER,
    CLEAR_BUDGET_FILTER,
    CLEAR_PLAN_TYPE_FILTER,
    CLEAR_PLAN_METAL_LEVEL_FILTER,
    CLEAR_PLAN_ID_FILTER,
    CLEAR_HMO_ID_FILTER,
    CLEAR_PROXIMITY_FILTER,
    CLEAR_BENEFITS_FILTER,
    CLEAR_TOTAL_BENEFIT_RANGE_FILTER,
    UPDATE_APPLIED_FILTERS
} from "./types"
import { CAN_LOG } from "../utils/homeUtils";


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

export const resetPlanID = () => (dispatch, getState) => {
    dispatch({
        type: RESET_PLAN_ID
    })
}

export const setHMOID = (hmoID) => (dispatch, getState) => {
    dispatch({
        type: SET_HMO_ID,
        payload: hmoID
    })
}

export const resetBudget = () => (dispatch, getState) => {
    dispatch({
        type: RESET_BUDGET,
        payload: []
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

export const resetSelectedDoctors = () => (dispatch, getState) => {
    dispatch({
        type: RESET_SELECTED_DOCTOR,
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

export const filterDoctors = (doctors) => (dispatch) => {
    dispatch({
        type: FILTER_DOCTORS,
        payload: doctors
    })
}

export const filterBenefits = (benefits) => (dispatch) => {
    dispatch({
        type: FILTER_BENEFITS,
        payload: benefits
    })
}

export const setProviders = (data) => (dispatch, getState) => {
    dispatch({
        type: SET_PROVIDERS,
        payload: data
    })
}

export const setDoctors = (data) => (dispatch, getState) => {
    dispatch({
        type: SET_DOCTORS,
        payload: data
    })
}

export const setBenefits = (data) => (dispatch, getState) => {
    dispatch({
        type: SET_BENEFITS,
        payload: data
    })
}

export const resetBenefits = () => (dispatch, getState) => {
    dispatch({
        type: RESET_BENEFITS
    })
}

export const resetSelectedProviders = () => (dispatch, getState) => {
    dispatch({
        type: RESET_SELECTED_PROVIDERS
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
    dispatch({
        type: IS_FILTERING_BY_PLAN_TYPE
    })
}

export const setIsFilteringByPlanRange = () => (dispatch, getState) => {
    dispatch({
        type: IS_FILTERING_BY_PLAN_RANGE
    })
}

export const setIsFilteringByPlanID = () => (dispatch, getState) => {
    dispatch({
        type: IS_FILTERING_BY_PLAN_ID
    })
}

export const addCompareURLParam = (param) => (dispatch, getState) => {
    // console.log("param", param);
    dispatch({
        type: ADD_COMPARE_URL_PARAM,
        payload: param
    })
}

export const removeCompareURLParam = (param) => (dispatch, getState) => {
    console.log("param", param);
    dispatch({
        type: REMOVE_COMPARE_URL_PARAM,
        payload: param
    })
}

export const toggleDataCaptureModal = (payload) => (dispatch, getState) => {
    console.log("payload", payload);
    dispatch({
        type: TOGGLE_DATA_CAPTURE_MODAL,
        payload
    })
}

export const toggleFilterBox = () => (dispatch, getState) => {
    dispatch({
        type: TOGGLE_FILTER_BOX,
    })
}

export const compareTopThreePlans = (val) => (dispatch, getState) => {
    dispatch({
        type: COMPARE_TOP_THREE_PLANS,
    })
}

export const handlePlanRangeCheck = (id) => (dispatch, getState) => {
    let arr = [...getState().quiz.filter_params.plan_range_checked];

    let isPlanRangeChecked = arr.indexOf(id);

    if (isPlanRangeChecked > -1) {
        arr.splice(isPlanRangeChecked, 1);
    } else {
        arr.push(id);
    }

    let filter_params = {
        ...getState().quiz.filter_params,
        plan_range_checked: arr,
    }

    dispatch({
        type: HANDLE_PLAN_RANGE_CHECK,
        payload: filter_params
    })
}

export const handlePlanTypesCheck = (id) => (dispatch, getState) => {
    let arr = [...getState().quiz.filter_params.plan_types_checked];
    let isPlanChecked = arr.indexOf(id);

    if (isPlanChecked > -1) {
        arr.splice(isPlanChecked, 1);
    } else {
        arr.push(id);
    }

    let filter_params = {
        ...getState().quiz.filter_params,
        plan_types_checked: arr,
    }

    dispatch({
        type: HANDLE_PLAN_TYPES_CHECK,
        payload: filter_params
    })
}

export const handleProviderSelected = (id) => (dispatch, getState) => {
    let filter_params = {
        ...getState().quiz.filter_params,
        providers_selected: id,
    }

    dispatch({
        type: HANDLE_PROVIDER_SELECTED,
        payload: filter_params
    })
};

export const handlePrescriptionSelected = (id) => (dispatch, getState) => {
    let arr = getState().quiz.filter_params.prescriptions_selected;
    arr.push(id);

    let filter_params = {
        ...getState().quiz.filter_params,
        arr,
    }
    dispatch({
        type: HANDLE_PRESCRIPTION_SELECTED,
        payload: filter_params
    })
};

export const handleMinRangeChange = (val) => (dispatch, getState) => {

    let filter_params = {
        ...getState().quiz.filter_params,
        annual_range_min: val,
    }
    dispatch({
        type: HANDLE_MIN_RANGE_CHANGE,
        payload: filter_params
    })
}

export const handleMaxRangeChange = (val) => (dispatch, getState) => {
    let filter_params = {
        ...getState().quiz.filter_params,
        annual_range_max: val,
    }
    dispatch({
        type: HANDLE_MAX_RANGE_CHANGE,
        payload: filter_params
    })
}

export const handleTotalBenefitMinChange = (val) => (dispatch, getState) => {
    let filter_params = {
        ...getState().quiz.filter_params,
        total_benefit_min: val,
    }

    dispatch({
        type: HANDLE_TOTAL_BENEFIT_MIN_CHANGE,
        payload: filter_params
    })
}

export const handleTotalBenefitMaxChange = (val) => (dispatch, getState) => {
    let filter_params = {
        ...getState().quiz.filter_params,
        total_benefit_max: val,
    }

    dispatch({
        type: HANDLE_TOTAL_BENEFIT_MAX_CHANGE,
        payload: filter_params
    })
}

export const handlePlanIDChange = (val) => (dispatch, getState) => {
    let filter_params = {
        ...getState().quiz.filter_params,
        planID: val,
    }

    dispatch({
        type: HANDLE_PLAN_ID_CHANGE,
        payload: filter_params
    })
}

export const enableSearchByProximity = () => (dispatch, getState) => {
    let v = getState().quiz.filter_params.enableSearchByProximity;

    let filter_params = {
        ...getState().quiz.filter_params,
        enableSearchByProximity: !v,
    }

    dispatch({
        type: ENABLE_SEARCH_BY_PROXIMITY,
        payload: filter_params
    })
}

export const handleMinDedChange = (val) => (dispatch, getState) => {
    let filter_params = {
        ...getState().quiz.filter_params,
        annual_deductible_min: val,
    }

    dispatch({
        type: HANDLE_MIN_DED_CHANGE,
        payload: filter_params
    })
}

export const handleMaxDedChange = (val) => (dispatch, getState) => {
    let filter_params = {
        ...getState().quiz.filter_params,
        annual_deductible_max: val,
    }

    dispatch({
        type: HANDLE_MAX_DED_CHANGE,
        payload: filter_params
    })
}

export const handleHMOSelected = (val) => (dispatch, getState) => {
    let filter_params = {
        ...getState().quiz.filter_params,
        hmo_selected: val,
    }
    dispatch({
        type: HANDLE_HMO_SELECTED,
        payload: filter_params
    })
}

export const resetFilterParams = () => (dispatch, getState) => {
    let applied_filters = {
        metal_level: [],
        hmoID: null,
        plan_ID: null,
        benefits: [],
        total_benefit_range: [],
        doctors: [],
        lat_lng: [],
        providers: [],
        plan_type: [],
        budget: [],
    }

    let filter_params = {
        ...this.state.filter_params,
        annual_range_min: "",
        annual_range_max: "",
        annual_deductible_min: "",
        annual_deductible_max: "",
        plan_types_checked: [],
        plan_range_checked: [],
        planID: "",
        hmo_selected: "",
        mgt_program_selected: [],
        providers_selected: [],
        prescriptions_selected: [],
        enableSearchByProximity: false,
    }

    dispatch({
        type: RESET_FILTER_PARAMS,
        payload: {
            filter_params,
            applied_filters
        }
    })
}

export const setCoordinatesAndAddress = (position) => (dispatch, getState) => {
    let filter_params = {
        ...getState().quiz.filter_params,
        location: `${position.coords.latitude}, ${position.coords.longitude}`,
        user_address: getState().fetchData.user_address,
    }
    dispatch({
        type: SET_COORDINATES_AND_ADDRESS,
        payload: filter_params
    })
}

export const handleAddressImput = (val) => (dispatch, getState) => {
    let filter_params = {
        ...getState().quiz.filter_params,
        user_address: val,
    }

    dispatch({
        type: HANDLE_ADDRESS_IMPUT,
        payload: filter_params
    })
}

export const clearDoctorsFilter = () => (dispatch, getState) => {
    let applied_filters = {
        ...getState().quiz.applied_filters,
        doctors: [],
    };

    dispatch({
        type: CLEAR_DOCTORS_FILTER,
        payload: applied_filters
    })

}

export const clearProvidersFilter = () => (dispatch, getState) => {
    let applied_filters = {
        ...getState().quiz.applied_filters,
        providers: [],
    };

    let filter_params = {
        ...getState().quiz.filter_params,
        providers_selected: [],
    }
    dispatch({
        type: CLEAR_PROVIDERS_FILTER,
        payload: {
            applied_filters,
            filter_params
        }
    })
}

export const clearBudgetFilter = () => async (dispatch, getState) => {
    await dispatch(updateBudget([]))
    let applied_filters = {
        ...getState().quiz.applied_filters,
        budget: [],
    }
    let filter_params = {
        ...getState().quiz.filter_params,
        annual_range_min: "",
        annual_range_max: "",
    }

    dispatch({
        type: CLEAR_BUDGET_FILTER,
        payload: {
            applied_filters,
            filter_params
        }
    })
};

export const clearPlanTypeFilter = () => (dispatch, getState) => {
    let applied_filters = {
        ...getState().quiz.applied_filters,
        plan_type: [],
    }
    let filter_params = {
        ...getState().quiz.filter_params,
        plan_types_checked: [],
    }

    dispatch({
        type: CLEAR_PLAN_TYPE_FILTER,
        payload: {
            applied_filters,
            filter_params
        }
    })
};

export const clearPlanMetalLevelFilter = () => (dispatch, getState) => {
    let applied_filters = {
        ...getState().quiz.applied_filters,
        metal_level: [],
    }
    let filter_params = {
        ...getState().quiz.filter_params,
        plan_range_checked: [],
    }

    dispatch({
        type: CLEAR_PLAN_METAL_LEVEL_FILTER,
        payload: {
            applied_filters,
            filter_params
        }
    })
};

export const clearPlanIDFilter = () => (dispatch, getState) => {
    let applied_filters = {
        ...getState().quiz.applied_filters,
        plan_ID: null,
    }
    let filter_params = {
        ...getState().quiz.filter_params,
        planID: "",
    }
    dispatch({
        type: CLEAR_PLAN_ID_FILTER,
        payload: {
            applied_filters,
            filter_params
        }
    })
}

export const clearHMOIDFilter = () => (dispatch, getState) => {
    let applied_filters = {
        ...getState().quiz.applied_filters,
        hmoID: null,
    }
    let filter_params = {
        ...getState().quiz.filter_params,
        hmo_selected: "",
    }
    dispatch({
        type: CLEAR_HMO_ID_FILTER,
        payload: {
            applied_filters,
            filter_params
        }
    })
}

export const clearProximityFilter = () => (dispatch, getState) => {
    let applied_filters = {
        ...getState().quiz.applied_filters,
        lat_lng: [],
    }
    let filter_params = {
        ...getState().quiz.filter_params,
        location: undefined,
        user_address: "",
        enableSearchByProximity: false,
    }
    dispatch({
        type: CLEAR_PROXIMITY_FILTER,
        payload: {
            applied_filters,
            filter_params
        }
    })
}

export const clearBenefitsFilter = () => (dispatch, getState) => {
    let applied_filters = {
        ...getState().quiz.applied_filters,
        benefits: [],
    }
    let filter_params = {
        ...getState().quiz.filter_params,
        benefits_selected: [],
    }
    dispatch({
        type: CLEAR_BENEFITS_FILTER,
        payload: {
            applied_filters,
            filter_params
        }
    })
}

export const clearTotalBenefitRangeFilter = () => (dispatch, getState) => {
    let applied_filters = {
        ...getState().quiz.applied_filters,
        total_benefit_range: [],
    }
    let filter_params = {
        ...getState().quiz.filter_params,
        total_benefit_range: [],
    }
    dispatch({
        type: CLEAR_TOTAL_BENEFIT_RANGE_FILTER,
        payload: {
            applied_filters,
            filter_params
        }
    })
}

export const updateAppliedFilters = (filter) => (dispatch, getState) => {
    dispatch({
        type: UPDATE_APPLIED_FILTERS,
        payload: filter
    })
}