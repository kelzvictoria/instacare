import {
    GET_CLICKED_PLAN,
    IS_FETCHING_RECOMMENDED_PLANS,
    CHANGE_PAGE,
    UPDATE_PRICE_RANGE,
    CHANGE_PLAN_TYPE,
    UPDATE_TEXT_RESPONSE,

    RESET_RESPONSES,
    UPDATE_BUDGET,
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
    SET_PLAN_ID,
    SET_HMO_ID,
    RESET_TYPE,
    RESET_BUDGET,
    RESET_RANGE,
    FORMAT_PRICES,

    GET_PROVIDER_INFO,

    FILTER_BENEFITS,
    FILTER_DOCTORS,
    FILTER_PRESCRIPTIONS,
    UPDATE_SELECTED_PROVIDERS,

    FILTER_LOCATIONS,
    SET_PROVIDERS,
    SET_DOCTORS,
    SET_BENEFITS,

    RESET_SELECTED_PROVIDERS,
    SET_IS_LOADING_ON,
    SET_IS_LOADING_OFF,

    ADD_COMPARE_URL_PARAM,
    REMOVE_COMPARE_URL_PARAM,
    TOGGLE_DATA_CAPTURE_MODAL,
    TOGGLE_FILTER_BOX,

    COMPARE_TOP_THREE_PLANS,

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
    UPDATE_APPLIED_FILTERS,
    TOGGLE_JUMP_TO_FILTER_BOX,
    UPDATE_URL_PARAMS,
    SET_DEEP_LINK_PARAMS_ARR,

    UPDATE_PAGE_INDEX
} from "../actions/types";

const initialState = {
    recommended_plans: [],
    fetching_recommended_plans: false,
    clicked_plan: [],
    page: 2,
    minPage: 1,
    maxPage: 4,
    checked: [],
    covers: "",
    isOpen: false,
    isMobileViewModalOpen: false,
    isOthersInputOpen: false,
    isFeaturesModalOpen: false,
    isFeaturePopUpOpen: false,
    isDesktopView: true,
    isSonCheckboxChecked: false,
    isDaughterCheckboxChecked: false,
    sonCount: 1,
    daughterCount: 1,
    tab_opened: "highlights",
    responses: {
        budget: [],
        // type: "single",
        // price_range: "silver",
        type: [],
        price_range: [],
        hmoID: "",
        planID: "",

        num_of_people: 1,
        firstName: "",
        lastName: "",
        email: "",
        state: "",
        provider: "",
        doctor: "",
        benefit: "",
        prescription: "",
        adult: 1,
        children: 0,
        infants: 0,
        gender: "m",
        full_name: "",
        phone_num: "",
        individual_age: 19,
        father_age: 0,
        mother_age: 0,
        grand_father_age: 0,
        grand_mother_age: 0,
        father_in_law_age: 0,
        mother_in_law_age: 0,
        spouse_age: 0,
        child_1_age: 0,
        child_2_age: 0,
        child_3_age: 0,
        child_4_age: 0,
        child_5_age: 0,
        child_6_age: 0,
        child_7_age: 0,
        child_8_age: 0,
        plan_duration: "1",
        providers: [],
        doctors: [],
        benefits: [],
        compare_plan_id_param: [],
        compare_top_three_plans: false
    },
    // doctorsDataSource: localStorage["doctors"] ?
    //     JSON.parse(localStorage["doctors"]).map(
    //         (doctor) => doctor.doctor_name
    //     ) : [],
    dataSource:
        //localStorage["providers"] ? 
        // JSON.parse(localStorage["providers"]).map(
        //    (provider) => provider.provider_name
        // ),
        [],
    is_loading: false,
    is_data_capture_modal_open: false,
    is_filter_box_open: false,
    filter_params: {
        annual_range_min: undefined,
        annual_range_max: undefined,
        annual_deductible_min: undefined,
        annual_deductible_max: undefined,
        plan_types_checked: [],
        plan_range_checked: [],
        planID: "",
        hmo_selected: "",
        total_benefit_min: undefined,
        total_benefit_max: undefined,
        location: undefined,
        benefits_selected: [],
        doctors_selected: [],
        mgt_program_selected: [],
        providers_selected: [],
        prescriptions_selected: [],
        enableSearchByProximity: false,
        user_address: "",
    },

    applied_filters: {
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
    },
    jump_to_filter_box: false,
    doctors: [],
    hospitals: [],
    total_benefit_limit: [],
    location: [],
    plan_metal_levels:
        [
            "bronze",
            "gold",
            "silver",
            "diamond",
            "platinum",
            "platinum_plus",
            "all"],
    plan_types:
        ["single",
            "couple",
            "parents",
            "corporate",
            "fam-of-4",
            "smes",
            "intl_coverage",
            "all"],
    hmo_ids: [],
    plan_ids: [],
    filter_url: "",
    deep_link_params_arr: [],
    current: 1,
    minIndex: 0,
    maxIndex: 0,
    pageSize: 5
}

export default function (state = initialState, action) {
    switch (action.type) {
        case TOGGLE_FILTER_BOX:
            return {
                ...state,
                is_filter_box_open: !state.is_filter_box_open
            }

        case TOGGLE_DATA_CAPTURE_MODAL:
            return {
                ...state,
                is_data_capture_modal_open: action.payload
            }

        case UPDATE_PRICE_RANGE:
            //console.log("action.payload", action.payload);
            return {
                ...state,
                responses: {
                    ...state.responses,
                    price_range: action.payload
                }
            }

        case CHANGE_PLAN_TYPE:
            return {
                ...state,
                responses: {
                    ...state.responses,
                    type: action.payload.type
                }

            }

        case RESET_TYPE:
            return {
                ...state,
                responses: {
                    ...state.responses,
                    type: action.payload
                }
            }

        case RESET_BUDGET:
            return {
                ...state,
                responses: {
                    ...state.responses,
                    budget: action.payload
                }
            }

        case RESET_RANGE:
            return {
                ...state,
                responses: {
                    ...state.responses,
                    price_range: action.payload
                }
            }

        case UPDATE_BUDGET:
            // console.log("action.payload", action.payload);
            if (action.payload.length === 2) {
                return {
                    ...state,
                    responses: {
                        ...state.responses,
                        budget: action.payload
                    }
                }
            } else if (action.payload.length === 0) {
                return {
                    ...state,
                    responses: {
                        ...state.responses,
                        budget: []
                    }
                }
            }

            else {
                return state;
            }


        case UPDATE_TEXT_RESPONSE:
            // console.log("action.payload", action.payload);
            let key = action.payload.key;
            let value = action.payload.value;

            if (key) {
                return {
                    ...state,
                    responses: {
                        ...state.responses,
                        [key]: value
                    }
                }
            }
            return state;



        case RESET_RESPONSES:
            for (let key in action.payload.resObj) {
                let value = action.payload.resObj[key];

                return {
                    ...state,
                    responses: {
                        ...state.responses,
                        key: value
                    }
                }
            }
            break;

        case GET_CLICKED_PLAN:
            //state.clicked_plan = action.payload;
            return {
                ...state,
                clicked_plan: action.payload.plan,
            }

        case IS_FETCHING_RECOMMENDED_PLANS:
            // state.fetching_recommended_plans = action.payload;
            return {
                ...state,
                fetching_recommended_plans: action.payload.value
            }

        case CHANGE_PAGE:
            if (action.payload.value === "next") {
                return {
                    ...state,
                    page: state.page++
                }

            } else if (action.payload.value === "prev") {
                return {
                    ...state,
                    page: state.page--
                }

            }
            break;
        case TOGGLE_DESKTOP_MODAL:
            return {
                ...state,
                isOpen: action.payload.value
            }

        case TOGGLE_MOBILE_MODAL:
            return {
                ...state,
                isMobileViewModalOpen: action.payload.value
            }

        case TOGGLE_OTHERS_MODAL:
            // console.log("action.payload", action.payload.value);
            return {
                ...state,
                isOthersInputOpen: action.payload.value
            }

        case UPDATE_GENDER:
            return {
                ...state,
                responses: {
                    ...state.responses,
                    gender: action.payload.value
                }
            }

        case UPDATE_TYPE:
            return {
                ...state,
                responses: {
                    ...state.responses,
                    type: action.payload
                }
            }

        case TOGGLE_DESKTOP_VIEW:
            return {
                ...state,
                responses: {
                    ...state.responses,
                    isDesktopView: action.payload.value
                }
            }

        case UPDATE_PHONE:
            return {
                ...state,
                responses: {
                    ...state.responses,
                    phone_num: action.payload.value
                }
            }

        case UPDATE_FULL_NAME:
            return {
                ...state,
                responses: {
                    ...state.responses,
                    full_name: action.payload.value
                }

            }

        case UPDATE_INDIVIDUAL_AGE:
        case UPDATE_FATHER_AGE:
        case UPDATE_MOTHER_AGE:
        case UPDATE_GRAND_FATHER_AGE:
        case UPDATE_GRAND_MOTHER_AGE:
        case UPDATE_FATHER_IN_LAW_AGE:
        case UPDATE_MOTHER_IN_LAW_AGE:
        case UPDATE_SPOUSE_AGE:
        case UPDATE_CHILD_1_AGE:
        case UPDATE_CHILD_2_AGE:
        case UPDATE_CHILD_3_AGE:
        case UPDATE_CHILD_4_AGE:
        case UPDATE_CHILD_5_AGE:
        case UPDATE_CHILD_6_AGE:
        case UPDATE_CHILD_7_AGE:
        case UPDATE_CHILD_8_AGE:
            console.log("action.payload", action.payload);
            let age_key = action.payload.key;
            let age_value = action.payload.value
            if (age_key) {
                return {
                    ...state,
                    responses: {
                        ...state.responses,
                        [age_key]: age_value
                    }
                }

            }
            break;
        case UPDATE_SON_CHECKED:
            console.log("action.payload", action.payload);
            return {
                ...state,
                isSonCheckboxChecked: action.payload.value
            }

        case UPDATE_DAUGHTER_CHECKED:
            return {
                ...state,
                isDaughterCheckboxChecked: action.payload.value
            }

        case INCREMENT_SON_COUNT:
            return {
                ...state,
                sonCount: action.payload.value
            }

        case DECREMENT_SON_COUNT:
            return {
                ...state,
                sonCount: action.payload.value
            }

        case INCREMENT_DAUGHTER_COUNT:
            return {
                ...state,
                daughterCount: action.payload.value
            }

        case DECREMENT_DAUGHTER_COUNT:
            return {
                ...state,
                daughterCount: action.payload.value
            }

        case UPDATE_PLAN_DURATION:
            return {
                ...state,
                responses: {
                    ...state.responses,
                    plan_duration: action.payload.value
                }
            }

        case TOGGLE_FEATURES_MODAL:
            return {
                ...state,
                isFeaturesModalOpen: action.payload.value
            }

        case UPDATE_FEATURES_TAB_OPENED:
            return {
                ...state,
                tab_opened: action.payload.value
            }

        case TOGGLE_FEATURE_POPUP:
            return {
                ...state,
                isFeaturePopUpOpen: action.payload.value
            }


        case UPDATE_NUM_OF_PEOPLE:
            return {
                ...state,
                responses: {
                    ...state.responses,
                    num_of_people: state.responses.num_of_people + action.payload.value
                }
            }

        case RESET_NUM_OF_PEOPLE:
            return {
                ...state,
                responses: {
                    ...state.responses,
                    num_of_people: 0
                }
            }

        case RESET_PLANS:
            return {
                ...state,
                fetching_recommended_plans: action.payload
            }
        //   state.compare.fetching = actions.data;


        case GET_NUM_OF_PEOPLE:
            return {
                ...state,
                responses: {
                    ...state.responses,
                    num_of_people: action.payload.value
                }
            }

        case SET_PLAN_ID:
            return {
                ...state,
                responses: {
                    ...state.responses,
                    planID: action.payload
                }
            }

        case SET_HMO_ID:
            return {
                ...state,
                responses: {
                    ...state.responses,
                    hmoID: action.payload
                }
            }
        case FORMAT_PRICES:
            return action.value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

        case GET_PROVIDER_INFO:
            return {
                ...state,
                provider_info: action.data
            }


        case SET_PROVIDERS:
            return {
                ...state,
                responses: {
                    ...state.responses,
                    providers: action.payload
                }

            }

        case SET_DOCTORS:
            return {
                ...state,
                responses: {
                    ...state.responses,
                    doctors: action.payload
                }

            }

        case SET_BENEFITS:
            return {
                ...state,
                responses: {
                    ...state.responses,
                    benefits: action.payload
                }

            }
        case RESET_BENEFITS:
            return {
                ...state,
                responses: {
                    ...state.responses,
                    benefits: []
                }
            }


        case FILTER_DOCTORS:
            if (action.payload) {
                let data_source = [];
                data_source.push(...action.payload);
                return {
                    ...state,
                    dataSource: data_source
                }
            }
            break;
        case FILTER_BENEFITS:
            if (action.payload) {
                let data_source = [];
                data_source.push(...action.payload);
                return {
                    ...state,
                    dataSource: data_source
                }
            }

            break
        case FILTER_PRESCRIPTIONS:

            if (action.payload) {
                let data_source = [];
                data_source.push(...action.payload);
                return {
                    ...state,
                    dataSource: data_source
                }
            }
            break
        case UPDATE_SELECTED_PROVIDERS:
            return {
                ...state,
                selected_providers: action.data
            }

        case FILTER_LOCATIONS:

            if (action.data) {
                let data_source = [];
                data_source.push(...action.data);
                return {
                    ...state,
                    dataSource: data_source
                }

            }
            break
        case RESET_SELECTED_PROVIDERS:
            return {
                ...state,
                responses: {
                    ...state.responses,
                    providers: []
                }
            }

        case SET_IS_LOADING_ON:
            return {
                ...state,
                is_loading: true
            }
        case SET_IS_LOADING_OFF:
            return {
                ...state,
                is_loading: false
            }

        case ADD_COMPARE_URL_PARAM:
            console.log("action", action);
            return {
                ...state,
                responses: {
                    ...state.responses,
                    compare_plan_id_param: [
                        ...state.responses.compare_plan_id_param,
                        action.payload
                    ]
                }
            }
        case REMOVE_COMPARE_URL_PARAM:
            return {
                ...state,
                responses: {
                    ...state.responses,
                    compare_plan_id_param: state.responses.compare_plan_id_param.filter(
                        param => param !== action.payload
                    )
                }
            }

        case COMPARE_TOP_THREE_PLANS:
            return {
                ...state,
                responses: {
                    ...state.responses,
                    compare_top_three_plans: !state.responses.compare_top_three_plans
                }
            }

        case RESET_SELECTED_DOCTOR:
            return {
                ...state,
                responses: {
                    ...state.responses,
                    doctors: action.payload
                }
            }

        case RESET_PLAN_ID:
            return {
                ...state,
                responses: {
                    ...state.responses,
                    planID: action.payload
                }
            }

        case HANDLE_PLAN_RANGE_CHECK:
            return {
                ...state,
                filter_params: action.payload
            }

        case HANDLE_PLAN_TYPES_CHECK:
        case HANDLE_PROVIDER_SELECTED:
        case HANDLE_PRESCRIPTION_SELECTED:
        case HANDLE_MIN_RANGE_CHANGE:
        case HANDLE_MAX_RANGE_CHANGE:
        case HANDLE_TOTAL_BENEFIT_MIN_CHANGE:
        case HANDLE_TOTAL_BENEFIT_MAX_CHANGE:
        case HANDLE_PLAN_ID_CHANGE:
        case ENABLE_SEARCH_BY_PROXIMITY:
        case HANDLE_MIN_DED_CHANGE:
        case HANDLE_MAX_DED_CHANGE:
        case HANDLE_HMO_SELECTED:
        case SET_COORDINATES_AND_ADDRESS:
        case HANDLE_ADDRESS_IMPUT:
            return {
                ...state,
                filter_params: action.payload
            }

        case CLEAR_DOCTORS_FILTER:
            return {
                ...state,
                applied_filters: action.payload
            }

        case RESET_FILTER_PARAMS:
        case CLEAR_PROVIDERS_FILTER:
        case CLEAR_BUDGET_FILTER:
        case CLEAR_PLAN_TYPE_FILTER:
        case CLEAR_PLAN_METAL_LEVEL_FILTER:
        case CLEAR_PLAN_ID_FILTER:
        case CLEAR_HMO_ID_FILTER:
        case CLEAR_PROXIMITY_FILTER:
        case CLEAR_BENEFITS_FILTER:
        case CLEAR_TOTAL_BENEFIT_RANGE_FILTER:
            return {
                ...state,
                filter_params: action.payload.filter_params,
                applied_filters: action.payload.applied_filters
            }

        case UPDATE_APPLIED_FILTERS:
            return {
                ...state,
                applied_filters: {
                    ...state.applied_filters,
                    [action.payload.key]: action.payload.value
                }
            }

        case TOGGLE_JUMP_TO_FILTER_BOX:
            return {
                ...state,
                jump_to_filter_box: !state.jump_to_filter_box
            }

        case UPDATE_URL_PARAMS:
             console.log("state.applied_filters", state.applied_filters);
            let appliedFilters = [];
            const keys = Object.keys(state.applied_filters);
            for (let filter in state.applied_filters) {
                console.log("filter", filter);
                if (state.applied_filters[filter]) {
                    console.log("filter", filter);
                        if (
                    ( typeof state.applied_filters[filter] === "object" && state.applied_filters[filter].length) ||
                    (typeof state.applied_filters[filter] === "string" &&  state.applied_filters[filter] )
                    ) {
                    appliedFilters.push({
                        name: filter,
                        filter_value: state.applied_filters[filter]
                    })
                }
                }
                
            }
            console.log("appliedFilters", appliedFilters);

            let filter_params = "/";

            if (appliedFilters.length) {
                filter_params += "filter"
                for ( let i = appliedFilters.length; i > 0; i--) {
                    filter_params += "/" + appliedFilters[i - 1].name + "/" + appliedFilters[i - 1].filter_value
                }
            }
            console.log("filter_params", filter_params);
            // console.log("keys", keys);
            return {
                ...state,
                filter_url: filter_params
            }
                
        case SET_DEEP_LINK_PARAMS_ARR:
           // console.log("action.payload", action.payload);
            return {
                ...state,
                deep_link_params_arr: action.payload
            }  
            
        case UPDATE_PAGE_INDEX:
            const { current, minIndex, maxIndex } = action.payload
            return {
                ...state,
                current,
                minIndex,
                maxIndex
            }
        default:
            return state

    }
}