import axios from "axios";
import {
    GET_PLANS,
    GET_HMOS,
    GET_PROVIDERS,
    GET_RECOMMENDED_PLANS,
    IS_FETCHING_PLANS,
    IS_FETCHING_HMOS,
    IS_FETCHING_SERVICES,
    IS_FETCHING_PROVIDERS,
    IS_FETCHING_RECOMMENDED_PLANS,
    IS_FETCHING_PLANS_BY_HMO,
    GET_PLANS_BY_HMO,
    GET_CHEAPEST_PLAN,
    GET_PROVIDER_INFO,
    GET_CHEAPEST_PLAN_BY_HMO,
    GET_SERVICES,

    IS_FILTERING_BY_BUDGET,
    IS_FILTERING_BY_PLAN_TYPE,
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
import { tokenConfig } from "../actions/authActions";
import { returnErrors } from "../actions/errorActions"

import { stripNonNumeric, CAN_LOG } from "../utils/homeUtils"

const API_URL = "https://instacareconnect.pmglobaltechnology.com";

export const filterByBudget = (budget) => (dispatch, getState) => {
    dispatch({
        type: IS_FILTERING_BY_BUDGET,
        payload: true
    })

    let min = budget[0];
    let max = budget[1];

    let plans = getState().fetchData.services;

    let filteredPlansByBudget = plans
        .filter(plan => {
            return stripNonNumeric(plan.price) >= min && stripNonNumeric(plan.price) <= max
        })

    dispatch({
        type: FILTER_BY_BUDGET,
        payload: filteredPlansByBudget
    })
}

export const filterByBudget_and_or_Type = (params) => async (dispatch, getState) => {
    CAN_LOG && console.log("params", params);
    dispatch(setIsFetchingRecPlans())
    await dispatch(getServices());
    let budget = params.budget;
    let type = params.type;
    let range = params.range;

    let min = budget[0];
    let max = budget[1];

    let plans = getState().fetchData.services;

    let plansByPlanType = await groupPlansByType(plans, type);

    let packages = type.length > 0 ? plansByPlanType : plans;

    let recommended_plans = range.length > 0 ?
        // return stripNonNumeric(pckg.price) >= min && stripNonNumeric(pckg.price) <= max
        groupPlansByRange(packages, range)
        : budget.length > 0 ?
            packages.filter(pckg => {
                return stripNonNumeric(pckg.price) >= min && stripNonNumeric(pckg.price) <= max
            })
            : plansByPlanType;

    CAN_LOG && console.log("packages", packages);
    CAN_LOG && console.log("recommended_plans", recommended_plans);

    dispatch({
        type: GET_RECOMMENDED_PLANS,
        payload: recommended_plans
    })
}

export const filterByPlanRange = () => async (dispatch, getState) => {
    await dispatch(getServices());
    let plans = getState().fetchData.services;
    let range = getState().quiz.responses.price_range

    let plansByRange = groupPlansByRange(plans, range);

    console.log("plansByRange", plansByRange);
    dispatch({
        type: GET_RECOMMENDED_PLANS,
        payload: plansByRange
    })
}

export const filterByPlanType = (type) => (dispatch, getState) => {
    dispatch({
        type: IS_FILTERING_BY_PLAN_TYPE,
        payload: true
    })

    let plans = getState().fetchData.services;

    let filteredPlansByPlanType = groupPlansByType(plans, type);

    dispatch({
        type: FILTER_BY_PLAN_TYPE,
        payload: filteredPlansByPlanType
    })
}

export const filterByTotalBenefitLimit = (limit) => (dispatch, getState) => {
    let min = limit[0];
    let max = limit [1];

    let plans = getState().fetchData.services;

    let filteredPlansByTotalBenefitLimit = plans
        .filter(plan => {
            let totalBL = stripNonNumeric(plan.in_patient_limit) + stripNonNumeric(plan.out_patient_limit)
            return totalBL  >= min && totalBL <= max
        })

    dispatch({
        type: FILTER_BY_TOTAL_BENEFIT_LIMIT,
        payload: filteredPlansByTotalBenefitLimit
    })
}

export const filterByBenefits = (benefits) => async (dispatch, getState) => {
    await dispatch(getServices());
    let plans = getState().fetchData.services;
    let benefits = getState().quiz.responses.benefits

    let plansByBenefit = groupPlansByBenefit(plans, benefits);

    console.log("plansByBenefit", plansByBenefit);
    dispatch({
        type: GET_RECOMMENDED_PLANS,
        payload: plansByBenefit
    })
}

export const getCheapestPlan = () => (dispatch, getState) => {
    let cheapest_plan = getState().fetchData.cheapest_plan
    if (!cheapest_plan) {
        let lowest = Number.POSITIVE_INFINITY;
        let highest = Number.NEGATIVE_INFINITY;
        let tmp;

        let arr = getState().fetchData.services;//this.props.planServices;
        // console.log("arr", arr);

        for (let i = arr.length - 1; i >= 0; i--) {
            tmp = stripNonNumeric(arr[i]["price"]);
            // console.log("arr[i]['price']", stripNonNumeric(arr[i]["price"]));

            if (tmp > 1000) {
                if (tmp < lowest) lowest = tmp;
                if (tmp > highest) highest = tmp;
            }
        }
        console.log("most expensive plan", highest, "cheapest plan", lowest);


        dispatch({
            type: GET_CHEAPEST_PLAN,
            data: lowest
        })
    }

}

export const getCheapestPlanByHMO = (plan) => (dispatch, getState) => {
    dispatch({
        type: GET_CHEAPEST_PLAN_BY_HMO,
        data: plan
    })
}

export const getHMOs = () => async (dispatch, getState) => {
    dispatch({
        type: IS_FETCHING_HMOS,
        payload: true
    })
    await axios
        .get(`${API_URL}/api/hmos`
            //, tokenConfig(getState)
        )
        .then((res) => {
            let hmos = [];
            let providers = getState().fetchData.providers;

            if (res.data.length > 0) {
                hmos = res.data.map(obj => obj.data);

                if (providers.length > 0) {
                    for (let i = 0; i < hmos.length; i++) {
                        let hmoID = hmos[i]["hmo_id"]

                        let hmoProviders = providers.filter(provider => provider.hmo_id === hmoID);
                        if (hmoProviders.length > 0) {
                            hmos[i]["providers"] = hmoProviders;
                        }
                    }
                }
                dispatch({
                    type: GET_HMOS,
                    payload: hmos
                })
            }

        }).catch((err) => {
            console.log("err", err);
            err.response && dispatch(returnErrors(err.response.data, err.response.status))
        })
}

export const getPlanByID = (planID) => async (dispatch, getState) => {
    await dispatch(getServices());
    dispatch({
        type: IS_FILTERING_BY_PLAN_ID,
        payload: true
    });

    let plans = getState().fetchData.services;
    CAN_LOG && console.log("planID", planID);
    let planByID = plans.filter(plan => {
        return plan.service_id == planID
    });

    CAN_LOG && console.log("plansByID", planByID);

    dispatch({
        type: FILTER_BY_PLAN_ID,
        payload: planByID
    })
}

export const getPlansByHMO = (hmoId) => async (dispatch, getState) => {
    let plansByHMO;

    if (hmoId) {
        dispatch({
            type: IS_FETCHING_PLANS_BY_HMO,
            data: true
        });
        let HMO = getState().fetchData.hmos.filter(hmo => hmo.hmo_id == hmoId)
        // console.log("plansByHMO", plansByHMO);

        await dispatch({
            type: GET_HMO,
            payload: HMO
        })

        plansByHMO = getState().fetchData.services.filter(plan => plan.hmo_id.hmo_id === hmoId)

        dispatch({
            type: GET_PLANS_BY_HMO,
            payload: plansByHMO
        })
    }
}

export const getPlanDetail = (serviceID) => async (dispatch, getState) => {
    let plans = getState().fetchData.services;

    let plan = plans.filter(plan => plan.service_id === serviceID)[0];
    dispatch(getSimilarPlans(plan));
    dispatch({
        type: GET_PLAN,
        payload: plan
    })
}

export const getProviderInfo = (provider) => (dispatch, getState) => {
    dispatch({
        type: GET_PROVIDER_INFO,
        data: provider
    })
}

export const getProviders = () => (dispatch, getState) => {
    dispatch(setIsFetchingProviders());
    axios
        .get(`${API_URL}/api/providers`)
        .then((res) => {
            let providers = [];
            if (res.data.length > 0) {
                providers = res.data.map(obj => obj.data)
            }

            dispatch({
                type: GET_PROVIDERS,
                payload: providers
            })
        }).catch((err) => {
            console.log("err", err);
            err.response && dispatch(returnErrors(err.response.data, err.response.status))
        })
}

export const getRecommendedPlans = (params) => async (dispatch, getState) => {
    console.log("params", params);
    if (params) {

    }
    dispatch(setIsFetchingRecPlans())

    await dispatch(getServices());

    let hmoID = params.hmoID ? params.hmoID : ""
    //let planID = getState().quiz.responses.planID;
    let budget = params.budget ? params.budget : []
    let planType = params.type ? params.type : []

    console.log("planType", planType);

    let planRange = params.range ? params.range : [];

    let min = stripNonNumeric(budget[0]);
    let max = stripNonNumeric(budget[1]);

    CAN_LOG &&
        console.log("min", min, "max", max);

    let plans = await getState().fetchData.services

    let plansByPlanType = groupPlansByType(plans, planType);

    CAN_LOG && console.log("plansByPlanType", plansByPlanType);

    let recommended_plans;
    let packages = planType.length > 0 ? plansByPlanType : plans;

    if (hmoID && budget.length == 0) {
        CAN_LOG && console.log("hmoID && budget.length == 0");
        recommended_plans = packages.filter(pckage => {
            return pckage.hmo_id.hmo_id === hmoID
        })
    }

    if (!hmoID && budget.length > 0) {
        CAN_LOG && console.log("!hmoID && budget.length > 0");
        recommended_plans = packages.filter(pckage => {
            return (stripNonNumeric(pckage.price) >= min && stripNonNumeric(pckage.price) <= max)
        })
    }

    if (hmoID && budget.length > 0) {
        CAN_LOG && console.log("hmoID && budget.length > 0");
        recommended_plans = packages.filter(pckage => {
            return pckage.hmo_id.hmo_id === hmoID && (stripNonNumeric(pckage.price) >= min && stripNonNumeric(pckage.price) <= max)
        });
    }

    if (planType.length > 0 && !hmoID && budget.length == 0) {
        CAN_LOG && console.log("planType.length > 0 && !hmoID && budget.length == 0");
        recommended_plans = plansByPlanType
    }

    console.log("planRange", planRange);

    if (planRange.length > 0) {
        console.log("recommended_plans", recommended_plans);
        recommended_plans = groupPlansByRange(
            recommended_plans ? recommended_plans : packages, planRange);
    }

    CAN_LOG && console.log("packages", packages);
    CAN_LOG && console.log("recommended_plans", recommended_plans);
    dispatch({
        type: GET_RECOMMENDED_PLANS,
        payload: recommended_plans
    })

}

export const getServices = () => async (dispatch, getState) => {
    dispatch(setIsFetchingServices());
    
    await dispatch(getProviders());
    await dispatch(getHMOs())
    //await dispatch(getPlans());

    let plans = [];
    let budget = getState().quiz.responses.budget;

    let min = budget[0];
    let max = budget[1];

    await axios
        .get(`${API_URL}/api/services`
            //, tokenConfig(getState)
        )
        .then((res) => {
            if (res.data.length > 0) {
                plans = res.data.map(obj => obj.data);
                plans = plans.filter(plan => stripNonNumeric(plan.price) > 100
                    //  stripNonNumeric(plan.price) >= min && stripNonNumeric(plan.price) <= max
                )
                for (let i = 0; i < plans.length; i++) {
                    let hmoID = plans[i]["hmo_id"];
                    let planID = plans[i]["plan_id"];

                    let hmos = getState().fetchData.hmos;
                    //let plans = getState().fetchData.plans;

                   // let planService = plans.filter(plan => plan.plan_id === planID);

                    let planHMO = hmos.filter(hmo => hmo.hmo_id === hmoID);

                    if (planHMO.length > 0) {
                        plans[i]["hmo_id"] = planHMO[0];
                    }

                    // if (planService.length > 0) {
                    //     plans[i]["plan_id"] = planService[0];
                    // }
                }
            }

            dispatch({
                type: GET_SERVICES,
                payload: plans
            })
        }).catch((err) => {
            console.log("err", err);
            err.response && dispatch(returnErrors(err.response.data, err.response.status))
        })
}

export const getSimilarPlans = (plan) => async (dispatch, getState) => {
    if (plan) {
        await dispatch(getServices())
        if (plan.plan_id.category) {
            let type = plan.plan_id.category.map(cat => cat.name.toLowerCase());
            let planID = plan.service_id;

           CAN_LOG && console.log("type", type, "planID", planID);

            let plans = getState().fetchData.services;
            let res = groupPlansByType(plans, type);

            let similar_plans = res.filter(plan => {
                return plan.service_id !== planID
            })

            similar_plans = similar_plans.filter((plan, index, self) =>
                index === self.findIndex((p) => (
                    p.place === plan.place && p.name === plan.name
                ))
            )

            CAN_LOG && console.log("similar_plans", similar_plans);

            dispatch({
                type: GET_SIMILAR_PLANS,
                payload: similar_plans
            })
        }

    }

}

export const groupPlansByBenefit = (packages, benefit) => async (dispatch, getState) => {
    let filteredPlansByBenefit = [];
    let filt;

    for (let i = 0; i < benefit.length; i++) {
        switch(benefit[i].toLowerCase()) {

        }
    }
}

const groupPlansByRange = (packages, range) => {
    CAN_LOG && console.log("range", range);
    let filteredPlansByRange = [];
    let filt;
    for (let i = 0; i < range.length; i++) {
        CAN_LOG && console.log("range[i]", range[i]);
        switch (range[i].toLowerCase()) {
            case "bronze":
                filt = packages.filter(pckage => pckage.category.toLowerCase() === "bronze");
                filteredPlansByRange.push(...filt);
                break;
            case "silver":
                filt = packages.filter(pckage => pckage.category.toLowerCase() === "silver");
                filteredPlansByRange.push(...filt);
                break;
            case "gold":
                filt = packages.filter(pckage => pckage.category.toLowerCase() === "gold");
                filteredPlansByRange.push(...filt)
                break;
            case "diamond":
                filt = packages.filter(pckage => pckage.category.toLowerCase() === "diamond");
                filteredPlansByRange.push(...filt)
                break;
            case "platinum":
                filt = packages.filter(pckage => pckage.category.toLowerCase() === "platinum");
                filteredPlansByRange.push(...filt)
                break;
            case "platinum_plus":
                filt = packages.filter(pckage => pckage.category.toLowerCase() === "platinum plans");
                filteredPlansByRange.push(...filt)
                break;
            default:
                filteredPlansByRange = packages
                console.log("default", filteredPlansByRange);
                break;
        }


    }
    CAN_LOG && console.log("filteredPlansByRange", filteredPlansByRange);
    return filteredPlansByRange;
}

const groupPlansByType = (packages, type) => {
    let individual_plans = [];
    let group_plans = [];
    let family_plans = [];
    let couple_plans = [];
    let international_plans = [];
    let senior_plans = [];
    let corporate_plans = [];

    CAN_LOG && console.log("packages", packages);
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

        if (CAN_LOG) {
            console.log("individual_plans", individual_plans);
            console.log("group_plans", group_plans);
            console.log("family_plans", family_plans);
            console.log("couple_plans", couple_plans);
            console.log("international_plans", international_plans);
            console.log("senior_plans", senior_plans);
            console.log("corporate_plans", corporate_plans);
        }

    }
    // CAN_LOG && 
    // console.log("type", type, typeof type);

    let filteredPackagesByPlanType = [];

    if (typeof type == "object") {
        for (let i = 0; i < type.length; i++) {
            // CAN_LOG &&
            //  console.log("type[i]", type[i]);
            switch (type[i]) {
                case "single":
                case "individual":
                case "individuals":
                    console.log("single");
                    filteredPackagesByPlanType.push(...individual_plans)
                    break

                case "couple":
                    console.log("couple");
                    filteredPackagesByPlanType.push(...couple_plans)
                    break;;

                case "parents":
                case "senior citizen":
                    console.log("senior");
                    filteredPackagesByPlanType.push(...senior_plans)
                    break;;

                case "corporate":
                    console.log("corporate");
                    filteredPackagesByPlanType.push(...corporate_plans)
                    break;


                case "fam-of-4":
                case "family":
                    console.log("family");
                    filteredPackagesByPlanType.push(...couple_plans,
                        ...family_plans)
                    break;

                case "smes":
                case "group":
                    console.log("group");
                    filteredPackagesByPlanType.push(...group_plans)
                    break;

                case "intl_coverage":
                    console.log("intl");
                    filteredPackagesByPlanType.push(...international_plans)
                    break;


                default:
                    // CAN_LOG && 
                    console.log("default", packages);
                    filteredPackagesByPlanType = packages
                    break


            }
        }

    } else {
        switch (type) {
            case "single":

                filteredPackagesByPlanType.push(...individual_plans)
                break;

            case "couple":

                filteredPackagesByPlanType.push(...couple_plans)
                break;

            case "parents":

                filteredPackagesByPlanType.push(...senior_plans)
                break;


            case "corporate":

                filteredPackagesByPlanType.push(...corporate_plans)
                break;


            case "fam-of-4":

                filteredPackagesByPlanType.push(...couple_plans,
                    ...family_plans)
                break;

            case "smes":
            case "group":

                filteredPackagesByPlanType.push(...group_plans)
                break;

            case "intl_coverage":

                filteredPackagesByPlanType.push(...international_plans)
                break;


            default:
                //  CAN_LOG && 
                console.log("default", packages);
                filteredPackagesByPlanType = packages
                break


        }
    }
    //  console.log("filteredPackagesByPlanType", filteredPackagesByPlanType);
    return filteredPackagesByPlanType;
}

export const setInfiniteScrollHasMore = () => (dispatch, getState) => {
    dispatch({
        type: SET_IS_INFINNITE_SCROLL_HAS_MORE
    })
}

export const setIsFetchingHMOs = () => (dispatch, getState) => {
    dispatch({
        type: IS_FETCHING_HMOS,
        payload: true
    })
}

export const setIsFetchingPlans = () => (dispatch, getState) => {
    console.log("in here");
    dispatch({
        type: IS_FETCHING_PLANS,
        payload: true
    })
}

export const setIsFetchingPlansByHMO = () => (dispatch, getState) => {

}

export const setIsFetchingProviders = () => (dispatch, getState) => {
    dispatch({
        type: IS_FETCHING_PROVIDERS,
        payload: true
    })
}

export const setIsFetchingRecPlans = () => (dispatch, getState) => {
    dispatch({
        type: IS_FETCHING_RECOMMENDED_PLANS,
        payload: true
    })

}

export const setIsFetchingServices = () => (dispatch, getState) => {
    dispatch({
        type: IS_FETCHING_SERVICES,
        payload: true
    })
}

export const setIsFilteringByBudget = () => (dispatch, getState) => {
    dispatch({
        type: IS_FILTERING_BY_BUDGET,
        payload: true
    })
}

export const togglePlanProviders = () => (dispatch, getState) => {
    dispatch({
        type: TOGGLE_PLAN_PROVIDERS
    })
}

export const updateInfiniteScrollData = (plans, hasMore, start_index, end_index) => async (dispatch, getState) => {
    let pageSize = await getState().fetchData.pageSize;
    let infiniteScrollData = await plans.slice(0, pageSize);
    let prevInfiniteScrollData = await getState().fetchData.infiniteScrollData;
    // let allPlans = await getState().fetchData.services;
    if (hasMore) {
        let data = prevInfiniteScrollData.concat(
            plans.slice(start_index, end_index)
        )

        dispatch({
            type: UPDATE_INFINITE_SCROLL_DATA,
            payload: data
        })

    } else {
        dispatch({
            type: UPDATE_INFINITE_SCROLL_DATA,
            payload: infiniteScrollData
        })
    }
}

export const resetInfiniteScrollData = () => (dispatch, getState) => {
    dispatch({
        type: RESET_INFINITE_SCROLL_DATA
    })
}


/*

export const getPlans = () => async (dispatch, getState) => {
    dispatch(setIsFetchingPlans());
    await dispatch(getHMOs());

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

                    let planHMO = hmos.filter(hmo => hmo.hmo_id === hmoID);

                    if (planHMO) {
                        plans[i]["hmo_id"] = planHMO[0];
                    }

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

export const getPlan = (plan) => (dispatch, getState) => {
    dispatch({
        type: GET_PLAN,
        payload: plan
    })
}
*/