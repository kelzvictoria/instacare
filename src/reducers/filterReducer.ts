import { createReducer, createAction } from "redux-starter-kit";

import { state } from "../store/state";

export const filterReducer = createReducer(state, {
  CHANGE_PAGE: (state, action) => {
    if (action.data === "next") {
      state.quiz.page++;
    } else if (action.data === "prev") {
      state.quiz.page--;
      //console.log("state.quiz.page--", state.quiz.page--);
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
    //console.log("action.data", action.data);

    for (let key in action.data) {
      state.quiz.responses[key] = action.data[key];
    }

    //state.quiz.responses = action.data;
    //console.log("state.quiz.responses", state.quiz.responses);
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
  TOGGLE_DESKTOP_MODAL: (state, actions) => {
    state.quiz.isOpen = actions.data.value;
  },
  TOGGLE_MOBILE_MODAL: (state, actions) => {
    state.quiz.isMobileViewModalOpen = actions.data.value;
  },
  TOGGLE_OTHERS_MODAL: (state, actions) => {
    state.quiz.isOthersInputOpen = actions.data.value;
  },
  UPDATE_GENDER: (state, actions) => {
    state.quiz.responses.gender = actions.data.value;
  },
  UPDATE_TYPE: (state, actions) => {
    state.quiz.responses.type = actions.data.value;
  },
  TOGGLE_DESKTOP_VIEW: (state, actions) => {
    state.quiz.isDesktopView = actions.data.value;
  },
  UPDATE_PHONE: (state, actions) => {
    state.quiz.responses.phone_num = actions.data.value;
  },
  UPDATE_FULL_NAME: (state, actions) => {
    state.quiz.responses.full_name = actions.data.value;
  },
  UPDATE_INDIVIDUAL_AGE: (state, action) => {
    // state.quiz.responses.individual_age = actions.data.value;
    if (action.data.key) {
      state.quiz.responses[action.data.key] = action.data.value;
    }
    return state;
  },
  UPDATE_FATHER_AGE: (state, actions) => {
    state.quiz.responses.father_age = actions.data.value;
  },
  UPDATE_MOTHER_AGE: (state, actions) => {
    state.quiz.responses.mother_age = actions.data.value;
  },
  UPDATE_GRAND_FATHER_AGE: (state, actions) => {
    state.quiz.responses.grand_father_age = actions.data.value;
  },
  UPDATE_GRAND_MOTHER_AGE: (state, actions) => {
    state.quiz.responses.grand_mother_age = actions.data.value;
  },
  UPDATE_FATHER_IN_LAW_AGE: (state, actions) => {
    state.quiz.responses.father_in_law_age = actions.data.value;
  },
  UPDATE_MOTHER_IN_LAW_AGE: (state, actions) => {
    state.quiz.responses.mother_in_law_age = actions.data.value;
  },
  UPDATE_SPOUSE_AGE: (state, actions) => {
    state.quiz.responses.spouse_age = actions.data.value;
  },
  UPDATE_CHILD_1_AGE: (state, actions) => {
    state.quiz.responses.child_1_age = actions.data.value;
  },
  UPDATE_CHILD_2_AGE: (state, actions) => {
    state.quiz.responses.child_2_age = actions.data.value;
  },
  UPDATE_CHILD_3_AGE: (state, actions) => {
    state.quiz.responses.child_3_age = actions.data.value;
  },
  UPDATE_CHILD_4_AGE: (state, actions) => {
    state.quiz.responses.child_4_age = actions.data.value;
  },
  UPDATE_CHILD_5_AGE: (state, actions) => {
    state.quiz.responses.child_5_age = actions.data.value;
  },
  UPDATE_CHILD_6_AGE: (state, actions) => {
    state.quiz.responses.child_6_age = actions.data.value;
  },
  UPDATE_CHILD_7_AGE: (state, actions) => {
    state.quiz.responses.child_7_age = actions.data.value;
  },
  UPDATE_CHILD_8_AGE: (state, actions) => {
    state.quiz.responses.child_8_age = actions.data.value;
  },
  UPDATE_SON_CHECKED: (state, actions) => {
    state.quiz.isSonCheckboxChecked = actions.data.value;
  },
  UPDATE_DAUGHTER_CHECKED: (state, actions) => {
    state.quiz.isDaughterCheckboxChecked = actions.data.value;
  },
  INCREMENT_SON_COUNT: (state, actions) => {
    state.quiz.sonCount = actions.data.value;
  },
  DECREMENT_SON_COUNT: (state, actions) => {
    state.quiz.sonCount = actions.data.value;
  },
  INCREMENT_DAUGHTER_COUNT: (state, actions) => {
    state.quiz.daughterCount = actions.data.value;
  },
  DECREMENT_DAUGHTER_COUNT: (state, actions) => {
    state.quiz.daughterCount = actions.data.value;
  },
  UPDATE_PLAN_DURATION: (state, actions) => {
    state.quiz.responses.plan_duration = actions.data.value;
  },
  TOGGLE_FEATURES_MODAL: (state, actions) => {
    state.quiz.isFeaturesModalOpen = actions.data.value;
  },

  UPDATE_FEATURES_TAB_OPENED: (state, actions) => {
    state.quiz.tab_opened = actions.data.value;
  },
  TOGGLE_FEATURE_POPUP: (state, actions) => {
    state.quiz.isFeaturePopUpOpen = actions.data.value;
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
createAction("TOGGLE_DESKTOP_MODAL");
createAction("TOGGLE_MOBILE_MODAL");
createAction("TOGGLE_OTHERS_MODAL");
createAction("UPDATE_GENDER");
createAction("UPDATE_TYPE");
createAction("TOGGLE_DESKTOP_VIEW");
createAction("UPDATE_PHONE");
createAction("UPDATE_FULL_NAME");
createAction("UPDATE_INDIVIDUAL_AGE");
createAction("UPDATE_FATHER_AGE");
createAction("UPDATE_MOTHER_AGE");
createAction("UPDATE_GRAND_FATHER_AGE");
createAction("UPDATE_GRAND_MOTHER_AGE");
createAction("UPDATE_FATHER_IN_LAW_AGE");
createAction("UPDATE_MOTHER_IN_LAW_AGE");
createAction("UPDATE_SPOUSE_AGE");
createAction("UPDATE_CHILD_1_AGE");
createAction("UPDATE_CHILD_2_AGE");
createAction("UPDATE_CHILD_3_AGE");
createAction("UPDATE_CHILD_4_AGE");
createAction("UPDATE_CHILD_5_AGE");
createAction("UPDATE_CHILD_6_AGE");
createAction("UPDATE_CHILD_7_AGE");
createAction("UPDATE_CHILD_8_AGE");
createAction("UPDATE_SON_CHECKED");
createAction("UPDATE_DAUGHTER_CHECKED");
createAction("INCREMENT_SON_COUNT");
createAction("DECREMENT_SON_COUNT");
createAction("INCREMENT_DAUGHTER_COUNT");
createAction("DECREMENT_DAUGHTER_COUNT");
createAction("UPDATE_PLAN_DURATION");
createAction("TOGGLE_FEATURES_MODAL");
createAction("UPDATE_FEATURES_TAB_OPENED");
createAction("TOGGLE_FEATURE_POPUP");
