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
    FILTER_BY_PROXIMITY
} from "../actions/types";

const initialState = {
    plans:
        localStorage["plans"] ? JSON.parse(localStorage["plans"]) :
            [],
    hmos:
        localStorage["hmos"] ? JSON.parse(localStorage["hmos"]) :
            [],
    services:
        localStorage["services"] ? JSON.parse(localStorage["services"]) :
            [],
    providers:
        localStorage["providers"] ? JSON.parse(localStorage["providers"]) :
            [],
    doctors:
        localStorage["doctors"] ? JSON.parse(localStorage["doctors"]) : 
        [
            {
                address: "Bida, Niger State, P.M.B. 14 Bida, Niger State",
                city: "Bida",
                state: "Niger",
                hospital: "Bida, Niger State, P.M.B. 14 Bida, Niger State",
                full_name: "Dr. Babakura Audu Gubio",
                taxonomy: "MEDICINE AND SURGERY",
                specialties: ["General Practioner"]
            },

            {
                address: "3. Owodumi Street, Off Toyin Street Ikeja Lagos",
                city: "Ikeja",
                state: "Lagos",
                hospital: "Motayo Hospital Limited",
                full_name: "Dr. Nnaedozie Umeani",
                taxonomy: "MEDICINE AND SURGERY",
                specialties: ["General Practioner",
                 "Family Physician"]
            },
            {
                address: "Maitama Abuja",
                city: "",
                state: "",
                hospital: "Maitama District Hospital",
                full_name: "Dr. Ohams Henry",
                taxonomy: "MEDICINE AND SURGERY",
                specialties:["General Practioner",
                "Family Physician"]
            },
            {
                address: "5/7 Umocham Road Aba",
                city: "",
                state: "",
                hospital: "Living Word mission Hospital",
                full_name: "Dr. Ezinne Okeoma",
                taxonomy: "MEDICINE AND SURGERY",
                specialties: ["General Practioner",
                "Family Physician"]
            },
            {
                address: "Millionaire Quarters, Off Kaura Namoda Road, Lebin-Lebin, P.O.Box 792, Gusau, Zamfara State, Nigeria",
                city: "",
                state: "",
                hospital: "First care Multi Specialist Hospital",
                full_name: "Dr. Chibitam Hope Obia",
                taxonomy: "MBBS",
                specialties: ["General Practioner",
                "Family Physician"]
            }
        ],

    benefits: localStorage["benefits"] ?
     JSON.parse(localStorage["benefits"]) :
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
        },{
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
        },{
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
        },{
            id: "covid_19_treatment",
            title: "Covid 19 Treatment"
        },
        {
            id: "plastic_surgeries",
            title: "Plastic Surgeries"
        },
        // {
        //     id: "",
        //     title: ""
        // },
   
    ],
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
    pageSize: 5
}

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_PLANS:
            localStorage["plans"] = JSON.stringify(action.payload)
            return {
                ...state,
                plans: action.payload,
                is_fetching_plans: false,

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
            localStorage["providers"] = JSON.stringify(action.payload)
            return {
                ...state,
                providers: action.payload,
                is_fetching_providers: false
            }

        case GET_SERVICES:
            localStorage["services"] = JSON.stringify(action.payload)
            return {
                ...state,
                services: action.payload,
                is_fetching_services: false,
                is_fetching_data: false
            }

        case GET_RECOMMENDED_PLANS:
            return {
                ...state,
                services: action.payload,
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

        case IS_FETCHING_PLANS_BY_HMO:
            return {
                ...state,
                is_fetching_plans_by_hmo: action.payload,

            }

        case IS_FETCHING_PLANS:
            return {
                ...state,
                is_fetching_plans: action.payload,
                is_fetching_data: action.payload
            }

        case IS_FETCHING_HMOS:
            return {
                ...state,
                is_fetching_hmos: action.payload,
                is_fetching_data: action.payload
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
            //  localStorage["infiniteScrollData"] = JSON.stringify(action.payload)
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

        default:
            return state

    }
}