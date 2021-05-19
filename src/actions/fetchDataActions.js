import axios from "axios";
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
    GET_NUM_OF_PEOPLE,
    IS_FETCHING_PLANS_BY_HMO,
    GET_PLANS_BY_HMO,
    GET_CHEAPEST_PLAN,
    GET_PROVIDER_INFO,
    GET_CHEAPEST_PLAN_BY_HMO,
    GET_SERVICES,

    IS_FILTERING_BY_BUDGET,
    IS_FILTERING_BY_PLAN_TYPE,
    IS_FILTERING_BY_PLAN_RANGE,
    IS_FILTERING_BY_PLAN_ID,
    FILTER_BY_BUDGET,
    FILTER_BY_HMO,
    FILTER_BY_PLAN_ID
} from "../actions/types";
import { tokenConfig } from "../actions/authActions";
import { returnErrors } from "../actions/errorActions";
import { type } from "jquery";

import { stripNonNumeric } from "../utils/homeUtils"

const API_URL = "https://instacareconnect.pmglobaltechnology.com";

export const getPlans = () => async (dispatch, getState) => {
    dispatch(setIsFetchingPlans());
    await dispatch(getHMOs());
    //console.log("getState().fetchData.is_filtering_by_budget", getState().fetchData.is_filtering_by_budget);
    // if (getState().fetchData.is_filtering_by_budget == false) {
    //     await dispatch(getServices());
    // }
    await axios
        .get(`${API_URL}/api/plans`
            //, tokenConfig(getState)
        )
        .then((res) => {
            let plans = [];
            if (res.data.length > 0) {
                plans = res.data.map(obj => obj.data);

                for (let i = 0; i < plans.length; i++) {
                    let hmoID = plans[i]["hmo_id"];
                    let hmos = getState().fetchData.hmos;
                    // let services = getState().fetchData.services;

                    let planHMO = hmos.filter(hmo => hmo.hmo_id === hmoID);
                    //let planServices = services.filter(service => service.plan_id === plans[i]["plan_id"])

                    if (planHMO) {
                        plans[i]["hmo_id"] = planHMO[0];
                    }

                    // if (planServices) {
                    //     plans[i]["packages"] = planServices
                    // }
                }

                dispatch({
                    type: GET_PLANS,
                    payload: plans
                })

                // dispatch({
                //     type: IS_FILTERING_BY_BUDGET,
                //     payload: false
                // })
            }

        }).catch((err) => {
            console.log("err", err);

            err.response && dispatch(returnErrors(err.response.data, err.response.status))
        })
}

export const getPlansByID = (planID) => async (dispatch, getState) => {
    dispatch({
        type: IS_FILTERING_BY_PLAN_ID,
        payload: true
    });

    let services = getState().fetchData.services;
    console.log("planID", planID);
    console.log("services", services);
    let plansByID = services.filter(plan => {
        console.log("plan_id", plan.plan_id);
        return plan.plan_id == planID
    });

    console.log("plansByID", plansByID);

    dispatch({
        type: FILTER_BY_PLAN_ID,
        payload: plansByID
    })
}

export const getHMOs = () => async (dispatch, getState) => {
    dispatch(setIsFetchingHMOs());
    await axios
        .get(`${API_URL}/api/hmos`
            //, tokenConfig(getState)
        )
        .then((res) => {
            let hmos = [];
            //console.log("res at 74", res);
            if (res.data.length > 0) {
                hmos = res.data.map(obj => {
                    return {
                        ...obj.data
                    }
                })
                //}
                dispatch({
                    type: GET_HMOS,
                    payload: hmos
                })
            }

        }).catch((err) => {
            err.response && dispatch(returnErrors(err.response.data, err.response.status))
        })
}

export const getProviders = () => (dispatch, getState) => {
    dispatch(setIsFetchingProviders());
    axios
        .get(`${API_URL}/api/providers`)
        .then((res) => {
            dispatch({
                type: GET_PROVIDERS,
                payload: res
            })
        }).catch((err) => {
            console.log("err", err);
            err.response && dispatch(returnErrors(err.response.data, err.response.status))
        })
}

export const getServices = () => async (dispatch, getState) => {
    dispatch(setIsFetchingServices());

    let services = [];

    await axios
        .get(`${API_URL}/api/services`
            //, tokenConfig(getState)
        )
        .then((res) => {
            if (res.data.length > 0) {
                services = res.data.map(obj => obj.data);
                for (let i = 0; i < services.length; i++) {
                    let hmoID = services[i]["hmo_id"];
                    let planID = services[i]["plan_id"];

                    let hmos = getState().fetchData.hmos;
                    let plans = getState().fetchData.plans;

                    // console.log("plans", plans);

                    let servicePlan = plans.filter(plan => plan.plan_id === planID);
                    // console.log("planID", planID, "servicePlan", servicePlan);

                    let planHMO = hmos.filter(hmo => hmo.hmo_id === hmoID);

                    if (planHMO) {
                        services[i]["hmo_id"] = planHMO[0];
                    }

                    if (servicePlan) {
                        services[i]["plan_id"] = servicePlan[0];
                    }
                }
            }

            dispatch({
                type: GET_SERVICES,
                payload: services
            })
        }).catch((err) => {
            console.log("err", err);
            err.response && dispatch(returnErrors(err.response.data, err.response.status))
        })
}

export const getRecommendedPlans = (num_of_people) => (dispatch, getState) => {
    dispatch(setIsFetchingRecPlans())

    let rec_plans = [];
    let individual_plans = [];
    let group_plans = [];
    let family_plans = [];
    let couple_plans = [];
    let international_plans = [];
    let senior_plans = [];

    let plans = getState().fetchData.plans;

    if (plans.length > 0) {
        for (let i = 0; i < plans.length; i++) {
            let categoryArr = plans[i].category;

            let individualPlans = categoryArr.filter(cat => cat.name.toLowerCase() == "individual").length > 0;
            let groupPlans = categoryArr.filter(cat => cat.name.toLowerCase() == "group").length > 0;
            let familyPlans = categoryArr.filter(cat => cat.name.toLowerCase() == "family").length > 0;
            let couplePlans = categoryArr.filter(cat => cat.name.toLowerCase() == "couple").length > 0;
            let internationalPlans = categoryArr.filter(cat => cat.name.toLowerCase() == "international").length > 0;
            let seniorCitizenPlans = categoryArr.filter(cat => cat.name.toLowerCase() == "senior citizen").length > 0;

            if (individualPlans) {
                individual_plans.push(plans[i])
            }

            if (groupPlans) {
                group_plans.push(plans[i])
            }

            if (familyPlans) {
                family_plans.push(plans[i])
            }

            if (couplePlans) {
                couple_plans.push(plans[i])
            }

            if (internationalPlans) {
                international_plans.push(plans[i])
            }

            if (seniorCitizenPlans) {
                senior_plans.push(plans[i])
            }
        }

        dispatch({
            type: GET_NUM_OF_PEOPLE,
            payload: num_of_people
        })

        dispatch({
            type: IS_FETCHING_RECOMMENDED_PLANS,
            payload: false
        })

    }
}

export const getPlansByHMO = (hmoId) => (dispatch, getState) => {
    let plansByHMO;

    if (hmoId) {
        dispatch({
            type: IS_FETCHING_PLANS_BY_HMO,
            data: true
        })

        dispatch({
            type: GET_PLANS_BY_HMO,
            payload: plansByHMO
        })
    }
}

export const getProviderInfo = (provider) => (dispatch, getState) => {
    dispatch({
        type: GET_PROVIDER_INFO,
        data: provider
    })
}

export const getCheapestPlan = (lowest) => (dispatch, getState) => {
    dispatch({
        type: GET_CHEAPEST_PLAN,
        data: lowest
    })
}

export const getCheapestPlanByHMO = (plan) => (dispatch, getState) => {
    dispatch({
        type: GET_CHEAPEST_PLAN_BY_HMO,
        data: plan
    })
}

export const filterByBudget = (budget) => (dispatch, getState) => {
    dispatch({
        type: IS_FILTERING_BY_BUDGET,
        payload: true
    })

    let min = budget[0];
    let max = budget[1];

    //console.log("min", min, "max", max);
    //console.log("typeof min", typeof min, "typeof max", typeof max);

    let packages = getState().fetchData.services;

    let filteredPackagesByBudget = packages
        .filter(pckg => {
            // console.log("typeof pckg.price", typeof stripNonNumeric(pckg.price));
            // console.log("pckg.price", stripNonNumeric(pckg.price));
            return stripNonNumeric(pckg.price) >= min && stripNonNumeric(pckg.price) <= max
        })

    dispatch({
        type: FILTER_BY_BUDGET,
        payload: filteredPackagesByBudget
    })
}


export const setIsFetchingPlansByHMO = () => (dispatch, getState) => {

}

export const setIsFetchingPlans = () => (dispatch, getState) => {
    return {
        type: IS_FETCHING_PLANS
    }
}

export const setIsFetchingHMOs = () => (dispatch, getState) => {
    return {
        type: IS_FETCHING_HMOS
    }
}

export const setIsFetchingServices = () => (dispatch, getState) => {
    return {
        type: IS_FETCHING_SERVICES
    }
}

export const setIsFetchingProviders = () => (dispatch, getState) => {
    return {
        type: IS_FETCHING_PROVIDERS
    }
}

export const setIsFetchingRecPlans = () => (dispatch, getState) => {
    return {
        type: IS_FETCHING_RECOMMENDED_PLANS
    }
}

export const setIsFilteringByBudget = () => (dispatch, getState) => {
    return {
        type: IS_FILTERING_BY_BUDGET
    }
}
