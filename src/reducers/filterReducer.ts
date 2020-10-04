import { createReducer, createAction } from "redux-starter-kit";

import { state } from "../store/state";

export const filterReducer = createReducer(state, {
  CHANGE_PAGE: (state, action) => {
    if (action.data === "next") {
      state.quiz.page++;
    } else if (action.data === "prev") {
      state.quiz.page--;
      console.log("state.quiz.page--", state.quiz.page--);
    }
    return state;
  },
  CHANGE_PLAN_TYPE: (state, action) => {
    state.quiz.responses.type = action.data;
    return state;
  },
  UPDATE_PREFS: (state, action) => {
    if (action.data.length > 0 && Array.isArray(action.data)) {
      state.quiz.responses.services = {};
      action.data.forEach((item: string) => {
        state.quiz.responses.services[item] = true;
      });
      state.quiz.checked = action.data;
    }
    return state;
  },
  UPDATE_BUDGET: (state, action) => {
    if (action.budget.length === 2) {
      state.quiz.responses.budget = action.budget;
    }
    return state;
  },
  UPDATE_TEXT_RESPONSE: (state, action) => {
    if (action.data.key) {
      state.quiz.responses[action.data.key] = action.data.value;
    }
    return state;
  },
  RESET_RESPONSES: (state, action) => {
    state.quiz.responses = action.data;
  },
  UPDATE_PLANS: (state, action) => {
    if (action.data.length === 0) {
      state.quiz.didRequestReturnEmptyResult = true;
    } else if (action.data) {
      state.quiz.didRequestReturnEmptyResult = false;
      state.compare.plans = action.data;
    }
    return state;
  },
  UPDATE_SORT_ORDER: (state, action) => {
    if (action.data) {
      state.compare.sort = { ...action.data };
    }
    return state;
  },
  FILTER_LOCATIONS: (state, action) => {
    if (action.data) {
      state.quiz.dataSource = [];
      state.quiz.dataSource.push(...action.data);
    }
    return state;
  },
  UPDATE_BEST_PLAN: (state, actions) => {
    if (actions.data) {
      state.compare.bestPlan = actions.data;
    }
    return state;
  },
  UPDATE_CHEAPEST_PLAN: (state, actions) => {
    if (actions.data) {
      state.compare.cheapestPlan = actions.data;
    }
    return state;
  },
  UPDATE_MOSTEXPENSIVE_PLAN: (state, actions) => {
    if (actions.data) {
      state.compare.mostExpensivePlan = actions.data;
    }
  },
  TOGGLE_FAMILY_PLAN_SELECTED: (state, actions) => {
    state.quiz.familyPlanSelected = actions.data.value;
  },
  UPDATE_COVERS: (state, actions) => {
    state.quiz.covers = actions.data.value;
  },
  RESET_PLANS: (state, actions) => {
    state.compare.fetching = actions.data;
  },
});

createAction("CHANGE_PAGE");
createAction("CHANGE_PLAN_TYPE");
createAction("UPDATE_PREFS");
createAction("UPDATE_TEXT_RESPONSE");
createAction("RESET_RESPONSES");
createAction("UPDATE_PLANS");
createAction("UPDATE_SORT_ORDER");
createAction("FILTER_LOCATIONS");
createAction("UPDATE_BEST_PLAN");
createAction("UPDATE_CHEAPEST_PLAN");
createAction("UPDATE_MOSTEXPENSIVE_PLAN");
createAction("UPDATE_BUDGET");
createAction("TOGGLE_FAMILY_PLAN_SELECTED");
createAction("UPDATE_COVERS");
createAction("RESET_PLANS");
