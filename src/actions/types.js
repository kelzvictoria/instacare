//USER INPUT START
export const CHANGE_PAGE = "CHANGE_PAGE";
export const UPDATE_PREFS = "UPDATE_PREFS";
export const CHANGE_PLAN_TYPE = "CHANGE_PLAN_TYPE";
export const UPDATE_TEXT_RESPONSE = "UPDATE_TEXT_RESPONSE";
export const RESET_RESPONSES = "RESET_RESPONSES";
export const UPDATE_PLANS = "UPDATE_PLANS";
export const UPDATE_SORT_ORDER = "UPDATE_SORT_ORDER";
export const UPDATE_PRICE = "UPDATE_PRICE";
export const FILTER_LOCATIONS = "FILTER_LOCATIONS";
export const UPDATE_BEST_PLAN = "UPDATE_BEST_PLAN";
export const UPDATE_CHEAPEST_PLAN = "UPDATE_CHEAPEST_PLAN";
export const UPDATE_MOSTEXPENSIVE_PLAN = "UPDATE_MOSTEXPENSIVE_PLAN";
export const UPDATE_NOTGETTINGPROVIDERS = "UPDATE_NOTGETTINGPROVIDERS";
export const UPDATE_BUDGET = "UPDATE_BUDGET";
export const TOGGLE_FAMILY_PLAN_SELECTED = "TOGGLE_FAMILY_PLAN_SELECTED";
export const UPDATE_COVERS = "UPDATE_COVERS";
export const TOGGLE_BUYING_PLAN = "TOGGLE_BUYING_PLAN";
export const RESET_PLANS = "RESET_PLANS";
export const TOGGLE_DESKTOP_MODAL = "TOGGLE_DESKTOP_MODAL";
export const TOGGLE_MOBILE_MODAL = "TOGGLE_MOBILE_MODAL";
export const TOGGLE_OTHERS_MODAL = "TOGGLE_OTHERS_MODAL";
export const UPDATE_GENDER = "UPDATE_GENDER";
export const UPDATE_TYPE = "UPDATE_TYPE";
export const TOGGLE_DESKTOP_VIEW = "TOGGLE_DESKTOP_VIEW";
export const UPDATE_PHONE = "UPDATE_PHONE";
export const UPDATE_FULL_NAME = "UPDATE_FULL_NAME";
export const UPDATE_INDIVIDUAL_AGE = "UPDATE_INDIVIDUAL_AGE";
export const UPDATE_FATHER_AGE = "UPDATE_FATHER_AGE";
export const UPDATE_MOTHER_AGE = "UPDATE_MOTHER_AGE";
export const UPDATE_GRAND_FATHER_AGE = "UPDATE_GRAND_FATHER_AGE";
export const UPDATE_GRAND_MOTHER_AGE = "UPDATE_GRAND_MOTHER_AGE";
export const UPDATE_FATHER_IN_LAW_AGE = "UPDATE_FATHER_IN_LAW_AGE";
export const UPDATE_MOTHER_IN_LAW_AGE = "UPDATE_MOTHER_IN_LAW_AGE";
export const UPDATE_SPOUSE_AGE = "UPDATE_SPOUSE_AGE";
export const UPDATE_CHILD_1_AGE = "UPDATE_CHILD_1_AGE";
export const UPDATE_CHILD_2_AGE = "UPDATE_CHILD_2_AGE";
export const UPDATE_CHILD_3_AGE = "UPDATE_CHILD_3_AGE";
export const UPDATE_CHILD_4_AGE = "UPDATE_CHILD_4_AGE";
export const UPDATE_CHILD_5_AGE = "UPDATE_CHILD_5_AGE";
export const UPDATE_CHILD_6_AGE = "UPDATE_CHILD_6_AGE";
export const UPDATE_CHILD_7_AGE = "UPDATE_CHILD_7_AGE";
export const UPDATE_CHILD_8_AGE = "UPDATE_CHILD_8_AGE";
export const UPDATE_SON_CHECKED = "UPDATE_SON_CHECKED";
export const UPDATE_DAUGHTER_CHECKED = "UPDATE_DAUGHTER_CHECKED";
export const INCREMENT_SON_COUNT = "INCREMENT_SON_COUNT";
export const DECREMENT_SON_COUNT = "DECREMENT_SON_COUNT";
export const INCREMENT_DAUGHTER_COUNT = "INCREMENT_DAUGHTER_COUNT";
export const DECREMENT_DAUGHTER_COUNT = "DECREMENT_DAUGHTER_COUNT";
export const UPDATE_PLAN_DURATION = "UPDATE_PLAN_DURATION";
export const TOGGLE_FEATURES_MODAL = "TOGGLE_FEATURES_MODAL";
export const UPDATE_FEATURES_TAB_OPENED = "UPDATE_FEATURES_TAB_OPENED";
export const TOGGLE_FEATURE_POPUP = "TOGGLE_FEATURE_POPUP";
export const RESET_TYPE = "RESET_TYPE"
export const RESET_RANGE = "RESET_RANGE"
export const SET_PROVIDERS = "SET_PROVIDERS"
export const RESET_SELECTED_PROVIDERS = "RESET_SELECTED_PROVIDERS"
export const ADD_COMPARE_URL_PARAM = "ADD_COMPARE_URL_PARAM";
export const REMOVE_COMPARE_URL_PARAM = "REMOVE_COMPARE_URL_PARAM";
export const TOGGLE_DATA_CAPTURE_MODAL = "TOGGLE_DATA_CAPTURE_MODAL"

//USER INPUT END

//DATA FETCH START
export const GET_PLANS = "GET_PLANS";
export const GET_HMOS = "GET_HMOS";
export const GET_SERVICES = "GET_SERVICES";
export const GET_PROVIDERS = "GET_PROVIDERS";
export const GET_RECOMMENDED_PLANS = "GET_RECOMMENDED_PLANS";
export const GET_CLICKED_PLAN = "GET_CLICKED_PLAN";

export const IS_FETCHING_PLANS = "IS_FETCHING_PLANS";
export const IS_FETCHING_HMOS = "IS_FETCHING_HMOS";
export const IS_FETCHING_SERVICES = "IS_FETCHING_SERVICES";
export const IS_FETCHING_PROVIDERS = "IS_FETCHING_PROVIDERS";
export const IS_FETCHING_RECOMMENDED_PLANS = "IS_FETCHING_RECOMMENDED_PLANS";

export const UPDATE_NUM_OF_PEOPLE = "UPDATE_NUM_OF_PEOPLE";
export const RESET_NUM_OF_PEOPLE = "RESET_NUM_OF_PEOPLE";
export const GET_NUM_OF_PEOPLE = "GET_NUM_OF_PEOPLE";

export const GET_CHEAPEST_PLAN = "GET_CHEAPEST_PLAN";
export const GET_CHEAPEST_PLAN_BY_HMO = "GET_CHEAPEST_PLAN_BY_HMO";
export const GET_PLANS_BY_HMO = "GET_PLANS_BY_HMO";
export const IS_FETCHING_PLANS_BY_HMO = "IS_FETCHING_PLANS_BY_HMO";
export const GET_PROVIDER_INFO = "GET_PROVIDER_INFO";

export const GET_PLAN = "GET_PLAN";
export const GET_SIMILAR_PLANS = "GET_SIMILAR_PLANS";
//DATA FETCH END

//COMPARE START
export const SET_PLANS_TO_COMPARE_ON_DESKTOP =
    "SET_PLANS_TO_COMPARE_ON_DESKTOP";
export const SET_PLANS_TO_COMPARE_ON_MOBILE = "SET_PLANS_TO_COMPARE_ON_MOBILE";
export const SET_CHECKED_PLANS = "SET_CHECKED_PLANS";
//COMPARE END

// FILTER BEGIN
export const FORMAT_PRICES = "FORMAT_PRICES";
export const UPDATE_PRICE_RANGE = "UPDATE_PRICE_RANGE";
export const FILTER_PROVIDERS = "FILTER_PROVIDERS";
export const FILTER_PRESCRIPTIONS = "FILTER_PRESCRIPTIONS";
export const UPDATE_SELECTED_PROVIDERS = "UPDATE_SELECTED_PROVIDERS";
//FILTER END

//AUTH BEGIN
export const AUTH_SUCCESS = "AUTH_SUCCESS";
export const AUTH_FAIL = "AUTH_FAIL";
export const AUTH_ERROR = "AUTH_ERROR";
//AUTH END

export const CLEAR_ERRORS = "CLEAR_ERRORS";
export const GET_ERRORS = "GET_ERRORS";

export const FILTER_BY_BUDGET = "FILTER_BY_BUDGET"
export const FILTER_BY_HMO = "FILTER_BY_HMO";
export const FILTER_BY_PLAN_ID = "FILTER_BY_PLAN_ID";
export const FILTER_BY_PLAN_TYPE = "FILTER_BY_PLAN_TYPE"

export const FILTER_BY_PLAN_RANGE = "FILTER_BY_PLAN_RANGE"

export const IS_FILTERING_BY_BUDGET = "IS_FILTERING_BY_BUDGET"
export const IS_FILTERING_BY_PLAN_TYPE = "IS_FILTERING_BY_PLAN_TYPE"
export const IS_FILTERING_BY_PLAN_RANGE = "IS_FILTERING_BY_PLAN_RANGE"
export const IS_FILTERING_BY_PLAN_ID = "IS_FILTERING_BY_PLAN_ID";

export const SET_PLAN_ID = "SET_PLAN_ID";
export const SET_HMO_ID = "SET_HMO_ID";

export const SET_IS_LOADING_ON = "SET_IS_LOADING_ON";
export const SET_IS_LOADING_OFF = "SET_IS_LOADING_OFF";

export const GET_HMO = "GET_HMO";

//export const IS_FILTERING_BY_HMO = "IS_FILTERING_BY_HMO";