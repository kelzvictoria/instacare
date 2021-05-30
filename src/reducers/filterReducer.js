import { createReducer, createAction } from "redux-starter-kit";

//import { state } from "../store/state";
import {
  FORMAT_PRICES,

  GET_PROVIDER_INFO,

  FILTER_PROVIDERS,
  FILTER_PRESCRIPTIONS,
  UPDATE_SELECTED_PROVIDERS,

  FILTER_LOCATIONS,



} from "../actions/types";

const initialState = {
  plansByHMO: [],
  plansByBudget: [],
  filter_plans_by_hmo: false,
  provider_info: [],
  dataSource: [],
  selected_providers: [],
};

export default function (state = initialState, action) {
  switch (action.type) {



    default:
      return state

  }
}

/*let state;

export const filterReducer = createReducer(state = initialState, {
  FORMAT_PRICES: (value) => {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  },

  GET_CHEAPEST_PLAN_BY_HMO: (state,action) => {
    state.cheapest_plan_by_hmo =action.data;
  },

  GET_CHEAPEST_PLAN: (state,action) => {
    state.cheapest_plan =action.data;
  },



  GET_PROVIDER_INFO: (state,action) => {
    state.provider_info =action.data;
  },


  FILTER_PROVIDERS: (state, action) => {
    if (action.data) {
      state.dataSource = [];
      state.dataSource.push(...action.data);
    }
    return state;
  },

  FILTER_PRESCRIPTIONS: (state, action) => {
    if (action.data) {
      state.dataSource = [];
      state.dataSource.push(...action.data);
    }
    return state;
  },

  UPDATE_SELECTED_PROVIDERS: (state,action) => {
    state.selected_providers =action.data;
  },

  FILTER_LOCATIONS: (state, action) => {
    if (action.data) {
      state.quiz.dataSource = [];
      state.quiz.dataSource.push(...action.data);
    }
    return state;
  },
});

createAction(FORMAT_PRICES);

createAction(GET_PROVIDER_INFO);

createAction(FILTER_PROVIDERS);
createAction(FILTER_PRESCRIPTIONS);
createAction(UPDATE_SELECTED_PROVIDERS);


createAction(FILTER_LOCATIONS);
*/