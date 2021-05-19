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
    FILTER_BY_PLAN_ID,
    FILTER_BY_PLAN_TYPE
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
                    //console.log("planID", planID, "servicePlan", servicePlan);

                    let planHMO = hmos.filter(hmo => hmo.hmo_id === hmoID);

                    if (planHMO.length > 0) {
                        services[i]["hmo_id"] = planHMO[0];
                    }

                    if (servicePlan.length > 0) {
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

export const getRecommendedPlans = () => (dispatch, getState) => {
    dispatch(setIsFetchingRecPlans())

    let hmoID = getState().quiz.responses.hmoID;
    let planID = getState().quiz.responses.planID;
    let budget = getState().quiz.responses.budget;
    let planType = getState().quiz.responses.type;

    let min = budget[0];
    let max = budget[1];

    let services = getState().fetchData.services

    let plansByHMO = services.filter(plan => plan.hmo_id === hmoID);
    let plansByPlanID = services.filter(plan => {
        return plan.plan_id == planID
    });
    let plansByBudget = services
        .filter(pckg => {
            return stripNonNumeric(pckg.price) >= min && stripNonNumeric(pckg.price) <= max
        })

    let plansByPlanType = groupPlansByType(services, planType);

    console.log("plansByPlanType", plansByPlanType);

    let recommended_plans = [
        ...plansByHMO,
        ...plansByPlanID,
        ...plansByBudget,
        ...plansByPlanType
    ]

    console.log("recommended_plans", recommended_plans);
    dispatch({
        type: GET_RECOMMENDED_PLANS,
        payload: recommended_plans
    })

}

export const getPlansByHMO = (hmoId) => (dispatch, getState) => {
    let plansByHMO;

    if (hmoId) {
        dispatch({
            type: IS_FETCHING_PLANS_BY_HMO,
            data: true
        })

        plansByHMO = getState().fetchData.services.filter(plan => plan.hmo_id === hmoId)

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
            return stripNonNumeric(pckg.price) >= min && stripNonNumeric(pckg.price) <= max
        })

    dispatch({
        type: FILTER_BY_BUDGET,
        payload: filteredPackagesByBudget
    })
}

export const filterByPlanType = (type) => (dispatch, getState) => {
    dispatch({
        type: IS_FILTERING_BY_PLAN_TYPE,
        payload: true
    })

    let services = getState().fetchData.services;

    let filteredPackagesByPlanType = groupPlansByType(services, type);

    dispatch({
        type: FILTER_BY_PLAN_TYPE,
        payload: filteredPackagesByPlanType
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

const groupPlansByType = (packages, type) => {

    let rec_plans = [];
    let individual_plans = [];
    let group_plans = [];
    let family_plans = [];
    let couple_plans = [];
    let international_plans = [];
    let senior_plans = [];
    let corporate_plans = [];

    console.log("packages", packages);
    if (packages.length > 0) {
        for (let i = 0; i < packages.length; i++) {
            let categoryArr = packages[i].plan_id.category;

            let individualPlans = categoryArr.filter(cat => cat.name.toLowerCase() == "individual" || cat.name.toLowerCase() == "individuals").length > 0;
            let groupPlans = categoryArr.filter(cat => cat.name.toLowerCase() == "group").length > 0;
            let corporatePlans = categoryArr.filter(cat => cat.name.toLowerCase() == "corporate").length > 0;
            let familyPlans = categoryArr.filter(cat => cat.name.toLowerCase() == "family").length > 0;
            let couplePlans = categoryArr.filter(cat => cat.name.toLowerCase() == "couple").length > 0;
            let internationalPlans = categoryArr.filter(cat => cat.name.toLowerCase() == "international").length > 0;
            let seniorCitizenPlans = categoryArr.filter(cat => cat.name.toLowerCase() == "senior citizen").length > 0;

            if (individualPlans) {
                individual_plans.push(packages[i])
            }

            if (groupPlans) {
                group_plans.push(packages[i])
            }

            if (familyPlans) {
                family_plans.push(packages[i])
            }

            if (couplePlans) {
                couple_plans.push(packages[i])
            }

            if (internationalPlans) {
                international_plans.push(packages[i])
            }

            if (seniorCitizenPlans) {
                senior_plans.push(packages[i])
            }

            if (corporatePlans) {
                corporate_plans.push(packages[i])
            }
        }

        console.log("individual_plans", individual_plans);
        console.log("group_plans", group_plans);
        console.log("family_plans", family_plans);
        console.log("couple_plans", couple_plans);
        console.log("international_plans", international_plans);
        console.log("senior_plans", senior_plans);
        console.log("corporate_plans", corporate_plans);
    }
    console.log("type", type);

    let filteredPackagesByPlanType;

    switch (type) {
        case "single":
            filteredPackagesByPlanType = individual_plans
            break

        case "couple":
            filteredPackagesByPlanType = couple_plans
            break;;

        case "parents":
            filteredPackagesByPlanType = senior_plans
            break;;


        case "corporate":
            filteredPackagesByPlanType = corporate_plans
            break;


        case "fam-of-4":
            filteredPackagesByPlanType = [
                ...couple_plans,
                ...family_plans
            ]
            break;;

        case "smes":
            //console.log("smes oo");
            filteredPackagesByPlanType = group_plans
            break;

        case "intl_coverage":
            filteredPackagesByPlanType = international_plans
            break;


        default:
            filteredPackagesByPlanType = []
            break


    }
    console.log("filteredPackagesByPlanType", filteredPackagesByPlanType);
    return filteredPackagesByPlanType;
}