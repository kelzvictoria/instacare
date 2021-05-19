import { createReducer, createAction } from "redux-starter-kit";

//import { state } from "../store/state";

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
    FILTER_BY_PLAN_ID
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
    plansByHMO: [],
    fetching_plans: false,
    is_fetching_hmos: false,
    is_fetching_services: false,
    is_fetching_providers: false,
    is_fetching_plans_by_hmo: false,
    cheapest_plan_by_hmo: 0,
    cheapest_plan: localStorage["cheapest_plan"] ? localStorage.getItem("cheapest_plan") : 0,
    is_filtering_by_budget: false,
    is_filtering_by_plan_id: false
}

export default function (state = initialState, action) {
    // console.log("initialState", initialState);
    // console.log("localStorage", localStorage);
    switch (action.type) {
        case GET_PLANS:
            //state.plans = action.payload;
            localStorage["plans"] = JSON.stringify(action.payload)
            return {
                ...state,
                plans: action.payload,
                is_fetching_plans: false,

            }

        case GET_HMOS:
            // state.hmos = action.payload;
            localStorage["hmos"] = JSON.stringify(action.payload)
            return {
                ...state,
                hmos: action.payload,
                is_fetching_hmos: false
            }

        case GET_PROVIDERS:
            //state.providers = action.payload;
            localStorage["providers"] = JSON.stringify(action.payload)
            return {
                ...state,
                providers: action.payload,
                is_fetching_providers: false
            }

        case GET_SERVICES:
            //state.services = action.payload;
            localStorage["services"] = JSON.stringify(action.payload)
            return {
                ...state,
                services: action.payload,
                is_fetching_services: false
            }

        case GET_RECOMMENDED_PLANS:
            // state.recommended_plans = action.payload;
            return {
                ...state,
                recommended_plans: action.payload,
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

        case IS_FETCHING_PLANS_BY_HMO:
            return {
                ...state,
                is_fetching_plans_by_hmo: action.payload
            }

        case IS_FETCHING_PLANS:
            return {
                ...state,
                is_fetching_plans: action.payload
            }

        case IS_FETCHING_HMOS:
            // state.is_fetching_hmos = action.payload;
            return {
                ...state,
                is_fetching_hmos: action.payload
            }

        case IS_FETCHING_SERVICES:
            //state.fetching_services = action.payload;
            return {
                ...state,
                fetching_services: action.payload
            }

        case IS_FETCHING_PROVIDERS:
            // state.is_fetching_providers = action.payload;
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

        case IS_FILTERING_BY_BUDGET:
            return {
                ...state,
                is_filtering_by_budget: action.payload
            }
        default:
            return state

    }

}

/*let state = {};

export const fetchDataReducer = createReducer(state = initialState, {
    GET_PLANS: (state = initialState, action) => {
        //state.plans = action.payload;
        return {
            ...state,
            plans: action.payload,
            is_fetching_plans: false,

        }
    },

    GET_HMOS: (state, action) => {
        // state.hmos = action.payload;
        return {
            ...state,
            hmos: action.payload,
            is_fetching_hmos: false
        }
    },

    GET_PROVIDERS: (state, action) => {
        //state.providers = action.payload;
        return {
            ...state,
            providers: action.payload,
            is_fetching_providers: false
        }
    },

    GET_SERVICES: (state, action) => {
        //state.services = action.payload;
        return {
            ...state,
            services: action.payload,
            is_fetching_services: false
        }
    },

    GET_RECOMMENDED_PLANS: (state, action) => {
        // state.recommended_plans = action.payload;
        return {
            ...state,
            recommended_plans: action.payload,
            is_fetching_recommended_plans: false
        }
    },

    GET_PLANS_BY_HMO: (state, action) => {
        return {
            ...state,
            plansByHMO: action.payload
        }
    },

    GET_CHEAPEST_PLAN_BY_HMO: (state, action) => {
        state.cheapest_plan_by_hmo = action.payload;
    },

    GET_CHEAPEST_PLAN: (state, action) => {
        state.cheapest_plan = action.payload;
    },

    IS_FETCHING_PLANS_BY_HMO: (state, action) => {
        return {
            ...state,
            is_fetching_plans_by_hmo: action.payload
        }

    },

    IS_FETCHING_PLANS: (state, action) => {
        return {
            ...state,
            is_fetching_plans: action.payload
        }
    },

    IS_FETCHING_HMOS: (state, action) => {
        // state.is_fetching_hmos = action.payload;
        return {
            ...state,
            is_fetching_hmos: action.payload
        }
    },

    IS_FETCHING_SERVICES: (state, action) => {
        //state.fetching_services = action.payload;
        return {
            ...state,
            fetching_services: action.payload
        }
    },

    IS_FETCHING_PROVIDERS: (state, action) => {
        // state.is_fetching_providers = action.payload;
        return {
            ...state,
            is_fetching_providers: action.payload
        }
    },
})

createAction(GET_PLANS);
createAction(GET_HMOS);
createAction(GET_SERVICES);
createAction(GET_PROVIDERS);
createAction(GET_RECOMMENDED_PLANS);
createAction(GET_PLANS_BY_HMO);

createAction(GET_CHEAPEST_PLAN_BY_HMO);
createAction(GET_CHEAPEST_PLAN);
createAction(IS_FETCHING_PLANS_BY_HMO);

createAction(IS_FETCHING_PLANS);
createAction(IS_FETCHING_HMOS);
createAction(IS_FETCHING_SERVICES);
createAction(IS_FETCHING_PROVIDERS);*/
