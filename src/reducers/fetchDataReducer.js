import {
    GET_PLANS,
    GET_HMOS,
    GET_PROVIDERS,
    GET_RECOMMENDED_PLANS,
    GET_CLICKED_PLAN,
    IS_FETCHING_PLANS,
    IS_FETCHING_HMOS,
    IS_FETCHING_SERVICES,
    IS_FETCHING_PROVIDERS,
    IS_FETCHING_RECOMMENDED_PLANS,
    GET_SERVICES,
    GET_CHEAPEST_PLAN_BY_HMO,
    GET_CHEAPEST_PLAN,
    GET_PLANS_BY_HMO,
    IS_FETCHING_PLANS_BY_HMO,

    IS_FILTERING_BY_BUDGET,
    IS_FILTERING_BY_PLAN_TYPE,
    IS_FILTERING_BY_PLAN_RANGE,
    IS_FILTERING_BY_PLAN_ID,
    FILTER_BY_BUDGET,
    FILTER_BY_PLAN_ID,
    FILTER_BY_PLAN_TYPE,
    GET_PLAN,
    GET_SIMILAR_PLANS,
    GET_HMO,

    TOGGLE_PLAN_PROVIDERS,
    UPDATE_INFINITE_SCROLL_DATA,
    SET_IS_INFINNITE_SCROLL_HAS_MORE,
    RESET_INFINITE_SCROLL_DATA,

    FILTER_BY_TOTAL_BENEFIT_LIMIT,
    FILTER_BY_BENEFITS,
    FILTER_BY_DOCTOR,
    FILTER_BY_PROXIMITY,
    GET_DOCTORS,
    GET_SPECIALTIES,
    SET_LOCATION,
    HANDLE_GEOCODING,
    HANDLE_REVERSE_GEOCODING,

    RESET_BENEFITS,
    RESET_LOCATION,
    FILTER_PROVIDERS,
    FILTER_DOCTORS,
    FILTER_BENEFITS,

    IS_FETCHING_DATA,
    UPDATE_URL_PARAMS,
    TOGGLE_IS_FILTER_DEEP_LINK
} from "../actions/types";

const initialState = {
    plans:
        localStorage["plans"] ? JSON.parse(localStorage["plans"]) :
            [],
    filtered_plans: [],
    is_filter_applied: true,
    hmos:
        localStorage["hmos"] ? JSON.parse(localStorage["hmos"]) :
            [],
    services:
     //   localStorage["services"] ? JSON.parse(localStorage["services"]) :
            [],
    providers:
        localStorage["providers"] ? JSON.parse(localStorage["providers"]) :
            [],
    doctors:
        localStorage["doctors"] ? JSON.parse(localStorage["doctors"]) :
            [],

    benefits:
        [
            {
                id: "accidents_emergencies",
                title: "Accidents & Emergencies"
            },
            {
                id: "evacuations",
                title: "Evacuation"
            },
            {
                id: "dental_care",
                title: "Dental Care"
            },
            {
                id: "optical_care",
                title: "Optical Care"
            },
            {
                id: "additional_ammunization",
                title: "Additional Immunizations"
            },
            {
                id: "routine_immunization",
                title: "Routine Immunizations"
            },
            {
                id: "admission_feeding",
                title: "Admission Feeding"
            },
            {
                id: "hospital_addmissions",
                title: "Hospital Admission"
            },
            {
                id: "admissions_per_annum",
                title: "Admission per Annum"
            },
            {
                id: "antenatal_care_delivery",
                title: "Antenatal Care"
            },
            {
                id: "fertility_services",
                title: "Fertility Services"
            },
            {
                id: "family_planning_services",
                title: "Family Planning"
            },
            {
                id: "neonatal_care",
                title: "Neonatal Care"
            },
            {
                id: "postnatal_care",
                title: "Postnatal Care"
            },
            {
                id: "cancer_care",
                title: "Cancer Care"
            }, {
                id: "hiv_aids_treatment",
                title: "HIV/ AIDS Treatment"
            },
            {
                id: "outpatient_prescribed_drugs",
                title: "Outpatient Prescribed Drugs"
            },
            {
                id: "lab_investigations",
                title: "Lab Investigations"
            },
            {
                id: "renal_dialysis",
                title: "Renal Dialysis"
            },
            {
                id: "ultrasound_plans",
                title: "Ultrasound Scans"
            }, {
                id: "plain_contrast_xrays",
                title: "Plain Contrast X-rays"
            },
            {
                id: "general_consultation",
                title: "General Consultations"
            },
            {
                id: "specialist_consultation",
                title: "Specialist Consultation"
            },
            {
                id: "physiotherapy",
                title: "Physiotherapy"
            },
            {
                id: "intensive_care",
                title: "Intensive Care"
            }, {
                id: "covid_19_treatment",
                title: "Covid 19 Treatment"
            },
            {
                id: "plastic_surgeries",
                title: "Plastic Surgeries"
            },
            {
                id: "mental_health_services",
                title: "Mental Health Services"
            },
            {
                id: "telemedicine",
                title: "Telemedicine"
            },

            {
                id: "congenital_abnormalities",
                title: "Congenital Abnormalities"
            },

            {
                id: "chronic_conditions_management",
                title: "Chronic Conditions Mgt"
            },
            // {
            //     id: "",
            //     title: ""
            // },

        ],
    specialties: 
    //localStorage["specialties"] ? JSON.parse(localStorage["specialties"]) :
    [],
    plansByHMO: [],
    plan: [],
    similar_plans: [],
    hmo: [],
    fetching_plans: false,
    is_fetching_plan: false,
    is_fetching_hmos: false,
    is_fetching_services: false,
    is_fetching_providers: false,
    is_fetching_plans_by_hmo: false,
    is_fetching_data: false,
    cheapest_plan_by_hmo: 0,
    cheapest_plan: localStorage["cheapest_plan"] ? localStorage.getItem("cheapest_plan") : 0,
    is_filtering_by_budget: false,
    is_filtering_by_plan_id: false,
    is_filtering_by_plan_type: false,
    collapse_providers: true,
    infiniteScrollData: [],
    infiniteScrollDataHasMore: false,
    pageSize: 5,
    location: [],
    user_address: "",
    providersDataSource: 
    localStorage["providers"] ? JSON.parse(localStorage["providers"]).map((provider) => provider.name) : 
        [],
    doctorsDataSource: 
        localStorage["doctors"] ? JSON.parse(localStorage["doctors"]).map((doctor) => doctor.name) : 
            [],
    benefitsDataSource: 
    localStorage["benefits"] ? JSON.parse(localStorage["benefits"]).map((benefit) => benefit.title) : 
        [],
    url_params: [],
    is_filter_deep_link: false
}

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_PLANS:
           // console.log("action.payload", action.payload);
            localStorage["plans"] = JSON.stringify(action.payload)
            return {
                ...state,
                plans: action.payload,
                is_filter_applied: false,
                //is_fetching_plans: false,
                is_fetching_data: false

            }
        case GET_PLAN:
            return {
                ...state,
                plan: action.payload,
                is_fetching_plan: false,
            }

        case GET_HMOS:
            localStorage["hmos"] = JSON.stringify(action.payload)
            return {
                ...state,
                hmos: action.payload,
                is_fetching_hmos: false
            }

        case GET_HMO:
            return {
                ...state,
                hmo: action.payload
            }

        case GET_PROVIDERS:
            localStorage["providers"] = JSON.stringify(action.payload);
            localStorage["providersDataSource"] = JSON.stringify(action.payload);
            return {
                ...state,
                providers: action.payload,
                providersDataSource: action.payload.map((provider) => provider.name),
                is_fetching_providers: false
            }

        case GET_SERVICES:
            localStorage["services"] = JSON.stringify(action.payload)
            localStorage["benefits"] = JSON.stringify(state.benefits)
            return {
                ...state,
                services: action.payload,
                is_fetching_services: false,
                //is_fetching_data: false
            }

        case GET_RECOMMENDED_PLANS:
            //console.log("action.payload", action.payload);
            return {
                ...state,
                //plans: action.payload,
                filtered_plans: action.payload,
                is_filter_applied: true,
                is_fetching_recommended_plans: false
            }

        case GET_PLANS_BY_HMO:
            return {
                ...state,
                plansByHMO: action.payload,
                is_fetching_plans_by_hmo: false
            }

        case GET_CHEAPEST_PLAN_BY_HMO:
            return {
                ...state,
                cheapest_plan_by_hmo: action.data
            }

        case GET_CHEAPEST_PLAN:
            localStorage.setItem("cheapest_plan", action.data)
            return {
                ...state,
                cheapest_plan: action.data
            }

        case GET_SIMILAR_PLANS:
            return {
                ...state,
                similar_plans: action.payload
            }

        case IS_FETCHING_DATA:
            return {
                ...state,
                is_fetching_data: action.payload
            }

        case IS_FETCHING_PLANS_BY_HMO:
            return {
                ...state,
                is_fetching_plans_by_hmo: action.payload,

            }

        case IS_FETCHING_PLANS:
            return {
                ...state,
                is_fetching_plans: action.payload,
               // is_fetching_data: action.payload
            }

        case IS_FETCHING_HMOS:
            return {
                ...state,
                is_fetching_hmos: action.payload,
               // is_fetching_data: action.payload
            }

        case IS_FETCHING_SERVICES:
            return {
                ...state,
                fetching_services: action.payload
            }

        case IS_FETCHING_PROVIDERS:
            return {
                ...state,
                is_fetching_providers: action.payload
            }

        case FILTER_BY_BUDGET:
            return {
                ...state,
                services: action.payload,
                is_filtering_by_budget: false
            }

        case FILTER_BY_PLAN_ID:
            return {
                ...state,
                services: action.payload,
                is_filtering_by_plan_id: false
            }

        case FILTER_BY_PLAN_TYPE:
            return {
                ...state,
                services: action.payload,
                is_filtering_by_plan_type: false
            }

        case FILTER_BY_TOTAL_BENEFIT_LIMIT:
            return {
                ...state,
                services: action.payload
            }

        case IS_FILTERING_BY_BUDGET:
            return {
                ...state,
                is_filtering_by_budget: action.payload
            }

        case IS_FILTERING_BY_PLAN_TYPE:
            return {
                ...state,
                is_filtering_by_plan_type: action.payload
            }

        case TOGGLE_PLAN_PROVIDERS:
            return {
                ...state,
                collapse_providers: !state.collapse_providers
            }

        case UPDATE_INFINITE_SCROLL_DATA:
              localStorage["infiniteScrollData"] = JSON.stringify(action.payload)
            // console.log("action.payload", action.payload);
            return {
                ...state,
                infiniteScrollData: action.payload
            }

        case SET_IS_INFINNITE_SCROLL_HAS_MORE:
            localStorage[""] = JSON.stringify(action.payload);
            return {
                ...state,
                infiniteScrollDataHasMore: !state.infiniteScrollDataHasMore
            }

        case RESET_INFINITE_SCROLL_DATA:
            return {
                ...state,
                infiniteScrollData: [],
                infiniteScrollDataHasMore: false
            }

        case GET_DOCTORS:
            localStorage["doctors"] = JSON.stringify(action.payload)
           localStorage["doctorsDataSource"] = JSON.stringify(action.payload)
            return {
                ...state,
                doctors: action.payload,
                doctorsDataSource: action.payload.map((d) => d.name)
            }

        case GET_SPECIALTIES:
            localStorage["specialties"] = JSON.stringify(action.payload)
            return {
                ...state,
                specialties: action.payload
            }

        case SET_LOCATION:
            return {
                ...state,
                location: action.payload,

            }

        case HANDLE_REVERSE_GEOCODING:
            return {
                ...state,
                user_address: action.payload
            }

        case HANDLE_GEOCODING:
            return {
                ...state,
                user_address: action.payload.user_address,
                location: action.payload.location
            }

        case RESET_LOCATION:
            return {
                ...state,

                user_address: "",
                location: [],
            }
        case FILTER_PROVIDERS:
            console.log("action.payload", action.payload);
            if (action.payload) {

                let data_source = [];
                data_source.push(...action.payload);
                return {
                    ...state,
                    providersDataSource: data_source
                }
            }
            break;
        
        case FILTER_DOCTORS:
            console.log("action.payload", action.payload);
            if (action.payload) {

                let data_source = [];
                data_source.push(...action.payload);
                return {
                    ...state,
                    doctorsDataSource: data_source
                }
            }
        case FILTER_BENEFITS:
            console.log("action.payload", action.payload);
            if (action.payload) {

                let data_source = [];
                data_source.push(...action.payload);
                return {
                    ...state,
                    benefitsDataSource: data_source
                }
            }
            break;

        case TOGGLE_IS_FILTER_DEEP_LINK:
            return {
                ...state,
                is_filter_deep_link: !state.is_filter_deep_link
            }

            break;

            default:
            return state

    }
}