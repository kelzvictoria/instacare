import {createReducer, createAction} from "redux-starter-kit";
import {state} from "../store/state";

export const detailsAndPaymentReducer = createReducer(state,{
    UPDATE_PRICE:(state,action) => {
        if(action.price > 0){
            state.details.price = action.price;
        }
        return state;
    },
    UPDATE_NOTGETTINGPROVIDERS:(state,action) => {
            state.details.notGettingProviders = action.status
        
    },
    TOGGLE_BUYING_PLAN:(state,action) => {
        state.details.buyingPlan = action.status
    }
});
const updatePrice= createAction("UPDATE_PRICE");
const updateNotGettingProviders = createAction("UPDATE_NOTGETTINGPROVIDERS")
const toggleBuyingPlan = createAction("TOGGLE_BUYING_PLAN")
export{
    updatePrice,
    updateNotGettingProviders,
    toggleBuyingPlan
};


    
    