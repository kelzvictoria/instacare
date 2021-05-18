import { createReducer, createAction } from "redux-starter-kit";
//import { state } from "../store/state";

import {
    // GET_RECOMMENDED_PLANS,
    GET_CLICKED_PLAN,
    IS_FETCHING_RECOMMENDED_PLANS,
    CHANGE_PAGE,
    UPDATE_PRICE_RANGE,
    UPDATE_PREFS,
    CHANGE_PLAN_TYPE,
    UPDATE_TEXT_RESPONSE,
    RESET_RESPONSES,
    UPDATE_PLANS,
    UPDATE_SORT_ORDER,
    UPDATE_BUDGET,
    UPDATE_BEST_PLAN,
    UPDATE_CHEAPEST_PLAN,
    UPDATE_MOSTEXPENSIVE_PLAN,

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
    SET_PLANS_TO_COMPARE_ON_DESKTOP,
    SET_PLANS_TO_COMPARE_ON_MOBILE
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
        budget: [15000, 150000],
        num_of_people: 1,
        type: "single",
        firstName: "",
        lastName: "",
        email: "",
        state: "",
        provider: "",
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
        price_range: "silver",
    }
}

export default function (state = initialState, action) {
    switch (action.type) {
        case UPDATE_PRICE_RANGE:
            console.log("action.payload", action.payload);
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
            } else {
                return state;
            }


        case UPDATE_TEXT_RESPONSE:
            console.log("action.payload", action.payload);
            let key = action.payload.resObj.key;
            let value = action.payload.resObj.value;

            if (key) {
                return {
                    ...state,
                    responses: {
                        ...state.responses,
                        key: value
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

        case TOGGLE_DESKTOP_MODAL:
            return {
                ...state,
                isOpen: action.payload.action.payload.value
            }

        case TOGGLE_MOBILE_MODAL:
            return {
                ...state,
                isMobileViewModalOpen: action.payload.action.payload.value
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
            console.log("action.payload.value", action.payload.value);
            return {
                ...state,
                responses: {
                    ...state.responses,
                    type: action.payload.value
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


            default:
                return state

    }
}

    /*let state = {};
    
    export const userInputReducer = createReducer(state = initialState, {
    
        UPDATE_PRICE_RANGE: (state, actions) => {
            state.responses.price_range = actions.data;
        },
    
        CHANGE_PLAN_TYPE: (state, action) => {
            state.quiz.responses.type = action.payload.value;
            return state;
        },
    
        UPDATE_BUDGET: (state, action) => {
            if (action.budget.length === 2) {
                state.quiz.responses.budget = action.budget;
            }
            return state;
        },
    
        UPDATE_TEXT_RESPONSE: (state, action) => {
            if (action.payload.action.payload.key) {
                state.quiz.responses[action.payload.action.payload.key] = action.payload.action.payload.value;
            }
            return state;
        },
    
        RESET_RESPONSES: (state, action) => {
            for (let key in action.payload.value) {
                state.quiz.responses[key] = action.payload.value[key];
            }
        },
    
        GET_CLICKED_PLAN: (state, action) => {
            //state.clicked_plan = action.payload;
            return {
                ...state,
                clicked_plan: action.payload,
            }
        },
    
        IS_FETCHING_RECOMMENDED_PLANS: (state, action) => {
            // state.fetching_recommended_plans = action.payload;
            return {
                ...state,
                fetching_recommended_plans: action.payload
            }
        },
    
        CHANGE_PAGE: (state, action) => {
            if (action.payload.value === "next") {
                state.quiz.page++;
            } else if (action.payload.value === "prev") {
                state.quiz.page--;
            }
            return state;
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
            if (action.payload.action.payload.key) {
                state.quiz.responses[action.payload.action.payload.key] = action.payload.action.payload.value;
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
    
        UPDATE_NUM_OF_PEOPLE: (state, actions) => {
            state.quiz.responses.num_of_people =
                state.quiz.responses.num_of_people + actions.data;
        },
    
        RESET_NUM_OF_PEOPLE: (state) => {
            state.num_of_people = 0;
        },
    
        GET_NUM_OF_PEOPLE: (state, actions) => {
            state.num_of_people = actions.data;
        },
    */
    /*UPDATE_PREFS: (state, action) => {
     if (action.payload.action.payload.length > 0 && Array.isArray(action.payload.value)) {
       state.quiz.responses.services = {};
       action.payload.action.payload.forEach((item: string) => {
         state.quiz.responses.services[item] = true;
       });
       state.quiz.checked = action.payload.value;
     }
     return state;
   },
   UPDATE_PLANS: (state, action) => {
     if (action.payload.action.payload.length === 0) {
       state.quiz.didRequestReturnEmptyResult = true;
     } else if (action.payload.value) {
       state.quiz.didRequestReturnEmptyResult = false;
       state.compare.plans = action.payload.value;
     }
     return state;
   },
   UPDATE_SORT_ORDER: (state, action) => {
     if (action.payload.value) {
       state.compare.sort = { ...action.payload.value };
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
})*/


/*createAction(CHANGE_PAGE);

createAction(UPDATE_PREFS);


createAction(UPDATE_PLANS);
createAction(UPDATE_SORT_ORDER);

createAction(UPDATE_BEST_PLAN);
createAction(UPDATE_CHEAPEST_PLAN);
createAction(UPDATE_MOSTEXPENSIVE_PLAN);

createAction(TOGGLE_FAMILY_PLAN_SELECTED);
createAction(UPDATE_COVERS);
createAction(RESET_PLANS);

createAction(TOGGLE_DESKTOP_MODAL);
createAction(TOGGLE_MOBILE_MODAL);
createAction(TOGGLE_OTHERS_MODAL);
createAction(UPDATE_GENDER);
createAction(UPDATE_TYPE);
createAction(TOGGLE_DESKTOP_VIEW);
createAction(UPDATE_PHONE);
createAction(UPDATE_FULL_NAME);
createAction(UPDATE_INDIVIDUAL_AGE);
createAction(UPDATE_FATHER_AGE);
createAction(UPDATE_MOTHER_AGE);
createAction(UPDATE_GRAND_FATHER_AGE);
createAction(UPDATE_GRAND_MOTHER_AGE);
createAction(UPDATE_FATHER_IN_LAW_AGE);
createAction(UPDATE_MOTHER_IN_LAW_AGE);
createAction(UPDATE_SPOUSE_AGE);
createAction(UPDATE_CHILD_1_AGE);
createAction(UPDATE_CHILD_2_AGE);
createAction(UPDATE_CHILD_3_AGE);
createAction(UPDATE_CHILD_4_AGE);
createAction(UPDATE_CHILD_5_AGE);
createAction(UPDATE_CHILD_6_AGE);
createAction(UPDATE_CHILD_7_AGE);
createAction(UPDATE_CHILD_8_AGE);
createAction(UPDATE_SON_CHECKED);
createAction(UPDATE_DAUGHTER_CHECKED);
createAction(INCREMENT_SON_COUNT);
createAction(DECREMENT_SON_COUNT);
createAction(INCREMENT_DAUGHTER_COUNT);
createAction(DECREMENT_DAUGHTER_COUNT);
createAction(UPDATE_PLAN_DURATION);
createAction(TOGGLE_FEATURES_MODAL);
createAction(UPDATE_FEATURES_TAB_OPENED);
createAction(TOGGLE_FEATURE_POPUP);

createAction(UPDATE_NUM_OF_PEOPLE);
createAction(RESET_NUM_OF_PEOPLE);
createAction(GET_NUM_OF_PEOPLE);

createAction(GET_CLICKED_PLAN);

createAction(IS_FETCHING_RECOMMENDED_PLANS);

createAction(CHANGE_PLAN_TYPE);
createAction(UPDATE_BUDGET);
createAction(UPDATE_TEXT_RESPONSE);
createAction(RESET_RESPONSES);

createAction(UPDATE_PRICE_RANGE);

*/