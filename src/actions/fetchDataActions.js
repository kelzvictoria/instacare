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

    FILTER_BY_TOTAL_BENEFIT_LIMIT,
    GET_PLAN,
    GET_SIMILAR_PLANS,
    GET_HMO,

    TOGGLE_PLAN_PROVIDERS,
    UPDATE_INFINITE_SCROLL_DATA,
    SET_IS_INFINNITE_SCROLL_HAS_MORE,
    RESET_INFINITE_SCROLL_DATA,
    GET_DOCTORS,
    GET_SUB_SPECIALTIES,
    SET_LOCATION,
    HANDLE_GEOCODING,
    HANDLE_REVERSE_GEOCODING
} from "../actions/types";
import { returnErrors } from "../actions/errorActions"

import { stripNonNumeric, CAN_LOG } from "../utils/homeUtils"

const API_URL = "https://instacareconnect.pmglobaltechnology.com";
const GOOGLE_MAPS_API_KEY = "AIzaSyBzVuBuJJ7S4g8gVjy-udL823dQTShK16I";
const OPEN_CAGE_DATA_API_KEY = "6b7ff1e8e7834c6f91ff3c02903ca44c";

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

export const getPlan = (plan) => (dispatch) => {
    dispatch({
        type: GET_PLAN,
        payload: plan
    })
}

export const getPlanDetail = (serviceID) => async (dispatch, getState) => {

    //  await dispatch(getServices())


    let services = getState().fetchData.services;

    let service = services.filter(service => service.service_id === serviceID)[0];
    dispatch(getSimilarPlans(service));
    dispatch({
        type: GET_PLAN,
        payload: service
    })
}

export const getSimilarPlans = (plan) => async (dispatch, getState) => {
    if (plan) {
        await dispatch(getServices())
        if (plan.plan_id.category) {
            let type = plan.plan_id.category.map(cat => cat.name.toLowerCase());

            let planID = plan.service_id;

            console.log("type", type, "planID", planID);

            let packages = getState().fetchData.services;

            let res = groupPlansByType(packages, type);
            //console.log("res", res);

            let similar_plans = res.filter(plan => {
                // console.log("plan.service_id", plan.service_id);
                // console.log("planID", planID);
                return plan.service_id !== planID
            })

            similar_plans = similar_plans.filter((plan, index, self) =>
                index === self.findIndex((p) => (
                    p.place === plan.place && p.name === plan.name
                ))
            )

            console.log("similar_plans", similar_plans);

            dispatch({
                type: GET_SIMILAR_PLANS,
                payload: similar_plans
            })
        }
    }
}

export const getPlanByID = (planID) => async (dispatch, getState) => {
    await dispatch(getServices());
    dispatch({
        type: IS_FILTERING_BY_PLAN_ID,
        payload: true
    });

    let services = getState().fetchData.services;
    CAN_LOG && console.log("planID", planID);
    let plansByID = services.filter(plan => {
        return plan.service_id === planID
    });

    CAN_LOG && console.log("plansByID", plansByID);

    dispatch({
        type: FILTER_BY_PLAN_ID,
        payload: plansByID
    })
}

export const getHMOs = () => async (dispatch, getState) => {
    //  console.log("getHMOs");
    await dispatch(getProviders());
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
            // console.log("providers", providers);
            if (res.data.length > 0) {
                hmos = res.data.map(obj => obj.data);
                //console.log("providers.length", providers.length);
                if (providers.length > 0) {
                    for (let i = 0; i < hmos.length; i++) {
                        let hmoID = hmos[i]["hmo_id"]
                        // console.log("providers", providers);

                        let hmoProviders =
                            //providers.filter(provider => provider.hmo_id === hmoID);
                            providers.filter(provider => {
                                // console.log("provider", provider);
                                return provider.hmo_id && provider.hmo_id.includes(hmoID)
                            });

                        //  console.log("hmoID", hmoID, "hmoProviders", hmoProviders);
                        if (hmoProviders.length > 0) {
                            hmos[i]["providers"] = hmoProviders;
                        }
                    }
                }
                //  console.log("hmos", hmos);
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

export const getProviders = () => async (dispatch) => {
    dispatch(setIsFetchingProviders());
    await axios
        .get(`${API_URL}/api/providers`)
        .then((res) => {
            let providers = [];
            //console.log("res", res);
            if (res.data.length > 0) {
                providers = res.data.map(obj => obj.data)
                dispatch({
                    type: GET_PROVIDERS,
                    payload: providers
                })
                //  console.log("providers", providers);
            }


        }).catch((err) => {
            console.log("err", err);
            err.response && dispatch(returnErrors(err.response.data, err.response.status))
        })
}

export const getServices = () => async (dispatch, getState) => {
    dispatch(setIsFetchingServices());

    // await dispatch(getProviders());
    await dispatch(getPlans());
    dispatch(getDoctors())

    let services = [];

    let hmos = getState().fetchData.hmos;
    let plans = getState().fetchData.plans;

    await axios
        .get(`${API_URL}/api/services`
            //, tokenConfig(getState)
        )
        .then((res) => {
            if (res.data.length > 0) {
                services = res.data.map(obj => obj.data);
                services = services.filter(service => stripNonNumeric(service.price) > 100
                    //  stripNonNumeric(service.price) >= min && stripNonNumeric(service.price) <= max
                )

                for (let i = 0; i < services.length; i++) {
                    let hmoID = services[i]["hmo_id"];
                    let planID = services[i]["plan_id"];

                    let servicePlan = plans.filter(plan => plan.plan_id === planID);

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

export const getRecommendedPlans = (params) => async (dispatch, getState) => {
    // console.log("in here for fetchData");
    //console.log("params", params);
    if (params) {

    }
    dispatch(setIsFetchingRecPlans())

    await dispatch(getServices());

    let hmoID = params.hmoID ? params.hmoID : ""
    //let planID = getState().quiz.responses.planID;
    let budget = params.budget ? params.budget : []
    let planType = params.type ? params.type : []

    //console.log("planType", planType);

    let planRange = params.range ? params.range : [];

    let benefits = params.benefits ? params.benefits : [];

    let total_benefit_range = params.total_benefit_range ? params.total_benefit_range : [];

    let doctors = params.doctors ? params.doctors : [];

    let lat_lng = params.lat_lng ? params.lat_lng : [];

    let providers = params.providers ? params.providers : [];

    let allBenefits = getState().fetchData.benefits;

    let min = stripNonNumeric(budget[0]);
    let max = stripNonNumeric(budget[1]);

    CAN_LOG &&
        console.log("min", min, "max", max);

    let services = getState().fetchData.services
    //console.log("services", services);

    let plansByPlanType = await groupPlansByType(services, planType);

    // CAN_LOG &&
    planType.length && console.log("plansByPlanType", plansByPlanType);

    let recommended_plans;
    let packages = planType.length > 0 ? plansByPlanType : services;


    if (hmoID && budget.length === 0) {
        // CAN_LOG && 
        console.log("hmoID && budget.length === 0");
        recommended_plans = packages.filter(pckage => {
            return pckage.hmo_id.hmo_id === hmoID
        })
    }

    if (!hmoID && budget.length > 0) {
        //  CAN_LOG && 
        console.log("!hmoID && budget.length > 0");
        recommended_plans = packages.filter(pckage => {
            return (stripNonNumeric(pckage.price) >= min && stripNonNumeric(pckage.price) <= max)
        })
    }

    if (hmoID && budget.length > 0) {
        // CAN_LOG && 
        console.log("hmoID && budget.length > 0");
        recommended_plans = packages.filter(pckage => {
            return pckage.hmo_id.hmo_id === hmoID && (stripNonNumeric(pckage.price) >= min && stripNonNumeric(pckage.price) <= max)
        });
    }

    if (planType.length > 0 && !hmoID && budget.length === 0) {
        //CAN_LOG && 
        console.log("planType.length > 0 && !hmoID && budget.length === 0");
        recommended_plans = plansByPlanType
    }

    //console.log("planRange", planRange);

    if (planRange.length > 0) {
        console.log("planRange.length > 0");
        // console.log("recommended_plans", recommended_plans);
        recommended_plans = await groupPlansByRange(
            recommended_plans ? recommended_plans : packages, planRange);
    }

    if (benefits.length > 0) {
        console.log("benefits.length > 0");
        recommended_plans = groupPlansByBenefit(
            recommended_plans ? recommended_plans : packages,

            allBenefits, benefits);

        // await dispatch(filterByBenefits(benefits))

    }

    if (total_benefit_range.length > 0) {
        // console.log("total_benefit_range.length > 0");
        let data = recommended_plans ? recommended_plans : packages;
        recommended_plans = data.filter(d => {
            let totalBL = stripNonNumeric(d.in_patient_limit) + stripNonNumeric(d.out_patient_limit)
            return totalBL >= params.total_benefit_range[0] && totalBL <= params.total_benefit_range[1]
        })
    }

    if (doctors.length > 0) {
        console.log("doctors.length > 0");
        let data = recommended_plans ? recommended_plans : packages;
        let doctors_hosp = doctors.map(d => d.provider_id.provider_name);
        recommended_plans = data.filter(r => {
            return doctors_hosp.some(d => {
                //  console.log("doctors_hosp", doctors_hosp);
                //  console.log("r.hmo_id.providers", r.hmo_id.providers);
                return r.hmo_id.providers.map(p => p.provider_name).includes(d)
            })
        });

        console.log("recommended_plans by doctor", recommended_plans);
    }

    if (lat_lng.length > 0) {
        //  console.log("lat_lng");
        //  console.log("lat_lng", lat_lng);
        let data = recommended_plans ? recommended_plans : packages;
        recommended_plans = (filterByProximity(lat_lng, data))
        /* let lat = lat_lng[0];
            let lng = lat_lng[1];
    
          recommended_plans = data.filter(r => {
                for (let i = 0; i < r.hmo_id.providers.length; i++) {
                    if(r.hmo_id.providers[i].gps) {
                         if (r.hmo_id.providers[i].gps.latitude.toFixed(6) === lat){
                        return r;
                    }
                    }
                     
                }
            })*/

    }

    if (providers.length > 0) {
        console.log("providers.length > 0");
        // let data = recommended_plans ? recommended_plans : packages;
        // recommended_plans = data.filter(plan => {
        //     let provider_names = providers.map(
        //      (selected_prvdr) => selected_prvdr.provider_name
        //     );

        //     return provider_names.includes
        // })
        let data = recommended_plans ? recommended_plans : packages;
        let provider_names = providers.map(p => p.provider_name);
        recommended_plans = data.filter(r => {
            return provider_names.some(d => {
                return r.hmo_id.providers.map(p => p.provider_name).includes(d)
            })
        })
    }

    CAN_LOG && console.log("packages", packages);
    //CAN_LOG && 
    // console.log("final recommended_plans", recommended_plans);
    dispatch({
        type: GET_RECOMMENDED_PLANS,
        payload: recommended_plans
    })

}

export const getPlansByHMO = (hmoId) => async (dispatch, getState) => {
    let plansByHMO;

    if (hmoId) {
        dispatch({
            type: IS_FETCHING_PLANS_BY_HMO,
            data: true
        });
        let HMO = getState().fetchData.hmos.filter(hmo => hmo.hmo_id === hmoId)
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

export const getProviderInfo = (provider) => (dispatch) => {
    dispatch({
        type: GET_PROVIDER_INFO,
        data: provider
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
        // console.log("most expensive plan", highest, "cheapest plan", lowest);

        dispatch({
            type: GET_CHEAPEST_PLAN,
            data: lowest
        })
    }

}

export const getCheapestPlanByHMO = (plan) => (dispatch) => {
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

export const filterByBudget_and_or_Type = (params) => async (dispatch, getState) => {
    CAN_LOG && console.log("params", params);
    dispatch(setIsFetchingRecPlans())
    await dispatch(getServices());
    let budget = params.budget;
    let type = params.type;
    let range = params.range;

    let min = budget[0];
    let max = budget[1];

    let services = getState().fetchData.services;

    let plansByPlanType = await groupPlansByType(services, type);

    let packages = type.length > 0 ? plansByPlanType : services;

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
    let services = getState().fetchData.services;
    let range = getState().quiz.responses.price_range

    let plansByRange = groupPlansByRange(services, range);

    console.log("plansByRange", plansByRange);
    dispatch({
        type: GET_RECOMMENDED_PLANS,
        payload: plansByRange
    })
}

export const setIsFetchingPlansByHMO = () => () => {

}

export const setIsFetchingPlans = () => (dispatch) => {
    dispatch({
        type: IS_FETCHING_PLANS,
        payload: true
    })
}

export const setIsFetchingHMOs = () => (dispatch) => {
    dispatch({
        type: IS_FETCHING_HMOS,
        payload: true
    })
}

export const setIsFetchingServices = () => (dispatch) => {
    dispatch({
        type: IS_FETCHING_SERVICES,
        payload: true
    })
}

export const setIsFetchingProviders = () => (dispatch) => {
    dispatch({
        type: IS_FETCHING_PROVIDERS,
        payload: true
    })
}

export const setIsFetchingRecPlans = () => (dispatch) => {
    dispatch({
        type: IS_FETCHING_RECOMMENDED_PLANS,
        payload: true
    })

}

export const setIsFilteringByBudget = () => (dispatch) => {
    dispatch({
        type: IS_FILTERING_BY_BUDGET,
        payload: true
    })
}

export const togglePlanProviders = () => (dispatch) => {
    dispatch({
        type: TOGGLE_PLAN_PROVIDERS
    })
}

const groupPlansByType = (packages, type) => {
    let individual_plans = [];
    let group_plans = [];
    let family_plans = [];
    let couple_plans = [];
    let international_plans = [];
    let senior_plans = [];
    let corporate_plans = [];

    CAN_LOG &&
        console.log("packages", packages);
    if (packages.length > 0) {
        for (let i = 0; i < packages.length; i++) {
            let categoryArr = packages[i].plan_id.category;

            let individualPlans = categoryArr.filter(cat => cat.name.toLowerCase() === "individual" || cat.name.toLowerCase() === "individuals").length > 0;
            let groupPlans = categoryArr.filter(cat => cat.name.toLowerCase() === "group").length > 0;
            let corporatePlans = categoryArr.filter(cat => cat.name.toLowerCase() === "corporate").length > 0;
            let familyPlans = categoryArr.filter(cat => cat.name.toLowerCase() === "family").length > 0;
            let couplePlans = categoryArr.filter(cat => cat.name.toLowerCase() === "couple").length > 0;
            let internationalPlans = categoryArr.filter(cat => cat.name.toLowerCase() === "international").length > 0;
            let seniorCitizenPlans = categoryArr.filter(cat => cat.name.toLowerCase() === "senior citizen").length > 0;

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

    if (typeof type === "object") {
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

export const resetInfiniteScrollData = () => (dispatch) => {
    dispatch({
        type: RESET_INFINITE_SCROLL_DATA
    })
}

export const setInfiniteScrollHasMore = () => (dispatch) => {
    dispatch({
        type: SET_IS_INFINNITE_SCROLL_HAS_MORE
    })
}

export const filterByBenefits = (rec_plans, benefits) => async (dispatch, getState) => {
    // await dispatch(getServices());
    //let benefits = getState().quiz.responses.benefits;
    let allBenefits = getState().fetchData.benefits.map(b => b.id)
    console.log("allBenefits", allBenefits);

    let plansByBenefit = groupPlansByBenefit(rec_plans, allBenefits, benefits);

    console.log("plansByBenefit", plansByBenefit);
    return plansByBenefit;

}

export const groupPlansByBenefit = (packages, allBenefits, benefit) => {
    console.log("packages", packages);
    let filteredPlansByBenefit = [];
    let filt;

    let allBenefitsArr = allBenefits.map(b => b.id)
    console.log("allBenefitsArr", allBenefitsArr);

    benefit = benefit.map(b => b.id)

    //for (let j = 0; j < allBenefitsArr.length; j++ ) {

    for (let i = 0; i < benefit.length; i++) {
        console.log("benefit[i].toLowerCase()", benefit[i].toLowerCase());
        switch (benefit[i].toLowerCase()) {
            case "accidents_emergencies":
                filt = packages.filter(pckage => {
                    return pckage["accidents_emergencies"] !== "No" && pckage["accidents_emergencies"] !== ""
                })
                filteredPlansByBenefit.push(...filt);
                break;

            case "evacuations":
                filt = packages.filter(pckage => {
                    return pckage["evacuations"] !== "No" && pckage["evacuations"] !== ""
                })
                filteredPlansByBenefit.push(...filt);
                break;

            case "dental_care":
                filt = packages.filter(pckage => {
                    return pckage["dental_care"] !== "No" && pckage["dental_care"] !== ""
                })
                filteredPlansByBenefit.push(...filt);
                break;

            case "optical_care":
                filt = packages.filter(pckage => {
                    return pckage["optical_care"] !== "No" && pckage["optical_care"] !== ""
                })
                filteredPlansByBenefit.push(...filt);
                break;

            case "additional_ammunization":
                filt = packages.filter(pckage => {
                    return pckage["additional_ammunization"] !== "No" && pckage["additional_ammunization"] !== ""
                })
                filteredPlansByBenefit.push(...filt);
                break;

            case "routine_immunization":
                filt = packages.filter(pckage => {
                    return pckage["routine_immunization"] !== "No" && pckage["routine_immunization"] !== ""
                })
                filteredPlansByBenefit.push(...filt);
                break;

            case "admission_feeding":
                filt = packages.filter(pckage => {
                    return pckage["admission_feeding"] !== "No" && pckage["admission_feeding"] !== ""
                })
                filteredPlansByBenefit.push(...filt);
                break;

            case "hospital_addmissions":
                filt = packages.filter(pckage => {
                    return pckage["hospital_addmissions"] !== "No" && pckage["hospital_addmissions"] !== ""
                })
                filteredPlansByBenefit.push(...filt);
                break;

            case "admissions_per_annum":
                filt = packages.filter(pckage => {
                    return pckage["admissions_per_annum"] !== "No" && pckage["admissions_per_annum"] !== ""
                })
                filteredPlansByBenefit.push(...filt);
                break;

            case "antenatal_care_delivery":
                filt = packages.filter(pckage => {
                    return pckage["antenatal_care_delivery"] !== "No" && pckage["antenatal_care_delivery"] !== ""
                })
                filteredPlansByBenefit.push(...filt);
                break;

            case "fertility_services":
                filt = packages.filter(pckage => {
                    return pckage["fertility_services"] !== "No" && pckage["fertility_services"] !== ""
                })
                filteredPlansByBenefit.push(...filt);
                break;

            case "family_planning_services":
                filt = packages.filter(pckage => {
                    return pckage["family_planning_services"] !== "No" && pckage["family_planning_services"] !== ""
                })
                filteredPlansByBenefit.push(...filt);
                break;

            case "neonatal_care":
                filt = packages.filter(pckage => {
                    return pckage["neonatal_care"] !== "No" && pckage["neonatal_care"] !== ""
                })
                filteredPlansByBenefit.push(...filt);
                break;

            case "postnatal_care":
                filt = packages.filter(pckage => {
                    return pckage["postnatal_care"] !== "No" && pckage["postnatal_care"] !== ""
                })
                filteredPlansByBenefit.push(...filt);
                break;

            case "cancer_care":
                filt = packages.filter(pckage => {
                    return pckage["cancer_care"] !== "No" && pckage["cancer_care"] !== ""
                })
                filteredPlansByBenefit.push(...filt);
                break;

            case "hiv_aids_treatment":
                filt = packages.filter(pckage => {
                    return pckage["hiv_aids_treatment"] !== "No" && pckage["hiv_aids_treatment"] !== ""
                })
                filteredPlansByBenefit.push(...filt);
                break;

            case "outpatient_prescribed_drugs":
                filt = packages.filter(pckage => {
                    return pckage["outpatient_prescribed_drugs"] !== "No" && pckage["outpatient_prescribed_drugs"] !== ""
                })
                filteredPlansByBenefit.push(...filt);
                break;

            case "lab_investigations":
                filt = packages.filter(pckage => {
                    return pckage["lab_investigations"] !== "No" && pckage["lab_investigations"] !== ""
                })
                filteredPlansByBenefit.push(...filt);
                break;

            case "renal_dialysis":
                filt = packages.filter(pckage => {
                    return pckage["renal_dialysis"] !== "No" && pckage["renal_dialysis"] !== ""
                })
                filteredPlansByBenefit.push(...filt);
                break;

            case "ultrasound_plans":
                filt = packages.filter(pckage => {
                    return pckage["ultrasound_plans"] !== "No" && pckage["ultrasound_plans"] !== ""
                })
                filteredPlansByBenefit.push(...filt);
                break;

            case "plain_contrast_xrays":
                filt = packages.filter(pckage => {
                    return pckage["plain_contrast_xrays"] !== "No" && pckage["plain_contrast_xrays"] !== ""
                })
                filteredPlansByBenefit.push(...filt);
                break;

            case "general_consultation":
                filt = packages.filter(pckage => {
                    return pckage["general_consultation"] !== "No" && pckage["general_consultation"] !== ""
                })
                filteredPlansByBenefit.push(...filt);
                break;

            case "specialist_consultation":
                filt = packages.filter(pckage => {
                    return pckage["specialist_consultation"] !== "No" && pckage["specialist_consultation"] !== ""
                })
                filteredPlansByBenefit.push(...filt);
                break;

            case "physiotherapy":
                filt = packages.filter(pckage => {
                    return pckage["physiotherapy"] !== "No" && pckage["physiotherapy"] !== ""
                })
                filteredPlansByBenefit.push(...filt);
                break;

            case "intensive_care":
                filt = packages.filter(pckage => {
                    return pckage["intensive_care"] !== "No" && pckage["intensive_care"] !== ""
                })
                filteredPlansByBenefit.push(...filt);
                break;

            case "covid_19_treatment":
                filt = packages.filter(pckage => {
                    return pckage["covid_19_treatment"] !== "No" && pckage["covid_19_treatment"] !== ""
                })
                filteredPlansByBenefit.push(...filt);
                break;

            case "plastic_surgeries":
                console.log("plastic_surgeries");
                filt = packages.filter(pckage => {
                    return pckage["plastic_surgeries"] !== "No" && pckage["plastic_surgeries"] !== ""
                })
                filteredPlansByBenefit.push(...filt);
                break;

            case "mental_health_services":
                filt = packages.filter(pckage => {
                    return pckage["mental_health_services"] !== "No" && pckage["mental_health_services"] !== ""
                })
                filteredPlansByBenefit.push(...filt);
                break;

            case "telemedicine":
                filt = packages.filter(pckage => {
                    return pckage["telemedicine"] !== "No" && pckage["telemedicine"] !== ""
                })
                filteredPlansByBenefit.push(...filt);
                break;

            case "congenital_abnormalities":
                filt = packages.filter(pckage => {
                    return pckage["congenital_abnormalities"] !== "No" && pckage["congenital_abnormalities"] !== ""
                })
                filteredPlansByBenefit.push(...filt);
                break;

            case "chronic_conditions_management":
                filt = packages.filter(pckage => {
                    return pckage["chronic_conditions_management"] !== "No" && pckage["chronic_conditions_management"] !== ""
                })
                filteredPlansByBenefit.push(...filt);
                break;

            default:
                filteredPlansByBenefit = packages;
                console.log("default");
                break;
        }

    }
    //}
    console.log("filteredPlansByBenefit", filteredPlansByBenefit);

    return filteredPlansByBenefit;
}

export const filterByTotalBenefitLimit = (limit) => (dispatch, getState) => {
    let min = limit[0];
    let max = limit[1];

    let plans = getState().fetchData.services;

    let filteredPlansByTotalBenefitLimit = plans
        .filter(plan => {
            let totalBL = stripNonNumeric(plan.in_patient_limit) + stripNonNumeric(plan.out_patient_limit)
            return totalBL >= min && totalBL <= max
        })

    dispatch({
        type: FILTER_BY_TOTAL_BENEFIT_LIMIT,
        payload: filteredPlansByTotalBenefitLimit
    })
}

export const getSubSpecialties = () => async (dispatch) => {
    await axios.get(
        `${API_URL}/api/sub_specialties`
    ).then(res => {
        let subSpecialties;
        if (res.data.length > 0) {
            subSpecialties = res.data.map(d => d.data);

            dispatch({
                type: GET_SUB_SPECIALTIES,
                payload: subSpecialties
            })
        }
    }).catch(err => {
        err.response && dispatch(returnErrors(err.response.data, err.response.status))

    })
}

export const getDoctors = () => async (dispatch, getState) => {
    let doctors = [];

    await dispatch(getSubSpecialties());
    let all_sub_specialties = getState().fetchData.sub_specialties;

    await axios.get(
        `${API_URL}/api/doctors`
    ).then(res => {
        if (res.data.length > 0) {
            doctors = res.data.map(d => d.data);
            // console.log("doctors", doctors);

            for (let i = 0; i < doctors.length; i++) {
                let specialty = JSON.parse(doctors[i]["sub_specialty"]).map(s =>
                    all_sub_specialties.filter(a => a.id === s)[0]
                )

                // console.log("specialty[i].name", specialty[i].name);

                let specialtyString = ""
                for (let j = 0; j < specialty.length; j++) {
                    specialtyString = specialtyString + specialty[j].name + ", "
                }
                // console.log("specialtyString", specialtyString);
                doctors[i]["sub_specialty"] = specialtyString.slice(0, -2);
                doctors[i]["provider_id"] = getState().fetchData.providers.filter(p => p.provider_id === doctors[i]["provider_id"])[0];
            }
        }

        dispatch({
            type: GET_DOCTORS,
            payload: doctors
        })
    }).catch((err) => {
        console.log("err", err);
        err.response && dispatch(returnErrors(err.response.data, err.response.status))
    })
}

export const filterByDoctor = async () => () => {

}

export const setLocation = (loc) => async (dispatch) => {
    dispatch({
        type: SET_LOCATION,
        payload: loc

    })
}

export const handleReverseGeocoding = () => async (dispatch, getState) => {
    let user_address;
    let loc = getState().fetchData.location;
    await axios
        .get(
            //`https://maps.googleapis.com/maps/api/geocode/json?latlng=${loc[0]},${loc[1]}&key=${GOOGLE_MAPS_API_KEY}`
            `https://api.opencagedata.com/geocode/v1/json?q=${loc[0]}+${loc[1]}&key=${OPEN_CAGE_DATA_API_KEY}`
        )
        .then(res => {
            // console.log("res", res);
            user_address = res.data.results[0].formatted
        })
    dispatch({
        type: HANDLE_REVERSE_GEOCODING,
        payload: user_address

    })
}

export const handleGeocoding = (address) => async (dispatch) => {
    let address_enc = encodeURIComponent(address);
    let loc;
    await axios
        .get(
            // `https://api.opencagedata.com/geocode/v1/json?q=${address_enc}&key=${OPEN_CAGE_DATA_API_KEY}`
            `https://maps.googleapis.com/maps/api/geocode/json?address=${address_enc}&key=${GOOGLE_MAPS_API_KEY}`
        )
        .then(res => {
            loc = res.data.results[0].geometry.location
            // console.log("loc", loc);
            dispatch({
                type: HANDLE_GEOCODING,
                payload: {
                    user_address: address,
                    location: [loc.lat, loc.lng]
                }

            })
        })
}

export const filterByProximity = (user_loc, plans) => {
    let nearbyPlans = [];
    let p = 0.017453292519943295;    // Math.PI / 180
    let r = 10; //in km
    let d;
    let c = Math.cos;
    for (let i = 0; i < plans.length; i++) {
        // console.log("plans.length", plans.length);
        // console.log("plans[i].hmo_id.providers.length", plans[i].hmo_id.providers.length);
        for (let j = 0; j < plans[i].hmo_id.providers.length; j++) {
            if (plans[i].hmo_id.providers[j].gps) {

                let lat1, lat2, lng1, lng2;
                lat1 = user_loc[0];
                lng1 = user_loc[1];

                lat2 = plans[i].hmo_id.providers[j].gps.latitude.toFixed(6);
                lng2 = plans[i].hmo_id.providers[j].gps.longitude.toFixed(6);

                //console.log("lat1, lat2, lng1, lng2", lat1, lat2, lng1, lng2);

                let a = 0.5 - c((lat2 - lat1) * p) / 2 +
                    c(lat1 * p) * c(lat2 * p) *
                    (1 - c((lng2 - lng1) * p)) / 2;

                d = 12742 * Math.asin(Math.sqrt(a)); // 2 * R = 12742; R = 6371 km
                //  console.log("plans[i].hmo_id.name",
                // plans[i].hmo_id.name,
                //     "distance in km",
                //     d);

                if (d < r) {
                    let plans_in_nearby_plans_arr = nearbyPlans.map(n => n.service_id);
                    // console.log("plans_in_nearby_plans_arr", plans_in_nearby_plans_arr);
                    if (!plans_in_nearby_plans_arr.includes(plans[i].service_id)) {
                        // console.log("plans_in_nearby_plans_arr.includes(plans[i].service_id)", plans_in_nearby_plans_arr.includes(plans[i].service_id));
                        nearbyPlans.push(plans[i]);
                    }

                }
            }

        }
    }
    // console.log("nearbyPlans", nearbyPlans);
    return nearbyPlans;
}