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
    GET_SPECIALTIES,
    SET_LOCATION,
    HANDLE_GEOCODING,
    HANDLE_REVERSE_GEOCODING,
    RESET_LOCATION,

    IS_FETCHING_DATA
} from "../actions/types";
import { returnErrors } from "../actions/errorActions"

import { stripNonNumeric, CAN_LOG } from "../utils/homeUtils"
import { tokenConfig } from "./authActions";

const API_URL = "https://instacareconnect.pmglobaltechnology.com";
const DEV_LABS_API_URL = "https://instacareconnect.pmglobaltechnology.com/devlabs"
const GOOGLE_MAPS_API_KEY = "AIzaSyBzVuBuJJ7S4g8gVjy-udL823dQTShK16I";
const OPEN_CAGE_DATA_API_KEY = "6b7ff1e8e7834c6f91ff3c02903ca44c";

export const getPlans = () => async (dispatch, getState) => { 
    dispatch(setIsFetchingData()) 
    if (!getState().fetchData.providers.length) {
         await dispatch(getProviders());
    }
    let providers = getState().fetchData.providers
    if (providers.length) {
            console.log("providers", providers);
     axios.get(`${DEV_LABS_API_URL}/api/data/plans`
    ).then(res => {
        if (res.data.length) {
            let plans = res.data.map(obj => obj.data);
            for (let i = 0; i < plans.length; i++) { 
                 plans[i].metal_level =  plans[i].metal_level.id;
                 if (plans[i].hmo) {
                    plans[i].hmo =  plans[i].hmo.data;
                    //plans[i].hmo_id = [plans[i].hmo.id];
                    plans[i].hmo = [plans[i].hmo.name];

                    plans[i].hmo.providers = providers.filter(p => p.hmo.includes(plans[i].hmo.id));
                    plans[i].providers = plans[i].hmo.providers.map(p => p.id);
                    plans[i].doctors = [].concat.apply([],plans[i].hmo.providers.map(p => p.doctors)).map(d => d.id); 
                 }              
            }
           dispatch({
                type: GET_PLANS,
                payload: plans
            })
            dispatch(getCheapestPlan());
            dispatch(getHMOs());
            dispatch(getSpecialties());

            dispatch(updateInfiniteScrollData(
                //this.props.planServices,
                plans,
                false,
                null,
                null))
        }
       
    }).catch(error=> {
        console.log("error", error);
    })
    }

}

export const multiPropsFilter = (plans, filters) => async (dispatch, getState) => {
    const filterKeys = Object.keys(filters);

    let status;
    let nearbyPlans = [];
    let p = 0.017453292519943295;    // Math.PI / 180
    let r = 10; //in km
    let d;
    let c = Math.cos;

    return await plans.filter(plan => {
        let plan_tbr = stripNonNumeric(plan.in_patient_limit) + stripNonNumeric(plan.out_patient_limit);
        return filterKeys.every(key => {
            if (!filters[key].length) {
                return true;
            }
            status = false
            if (plan[key] !== undefined) {
                if (filters[key][0] === "all" & key === "metal_level") {
                    filters[key] = ["bronze", "silver", "gold", "diamond", "platinum", "platinum_plus"]
                }

                if (filters[key][0] === "all" & key === "plan_type") {
                    filters[key] = ["individual", "couple", "family", "senior_citizens", "group", "corporate", "intl_coverage"]
                }

                console.log("filters[key]", filters[key], "plan[key]", plan[key]);      

                if (Array.isArray(plan[key])) {
                    if (plan[key].some(keyEle => filters[key].includes(keyEle))) {
                       // console.log("is arr", plan["name"]);
                        status = true;
                    }
                } if (filters[key].includes(plan[key])) {
                   // console.log("is string", plan["name"]);
                    status = true
                }
            } else if(key === "budget" && (
                stripNonNumeric(plan.price) >= filters[key][0]
                 && stripNonNumeric(plan.price) <= filters[key][1]
            )) {
               // console.log("key", key);
                status = true;
            } else if (key === "total_benefit_range" && (
                plan_tbr >= filters[key][0] && plan_tbr <= filters[key][1]
            )) {
                status = true
            }
            // else {
            //     status = false
            // }
            return status
        })
    })
}

export const filterPlans = (filtersApplied) => async (dispatch, getState) => {
    console.log("filtersApplied", filtersApplied);
    //dispatch(getPlans());
   const allPlans = getState().fetchData.plans;
   const filtered = getState().fetchData.filtered_plans
    const plans =  //filtered.length ? filtered : allPlans; 
    getState().fetchData.plans;
   console.log("plans", plans);
    let recommended_plans;
    let filteredPlans = await dispatch(multiPropsFilter(plans, filtersApplied));
   /* if (!filteredPlans.length) {
        filteredPlans = plans
    } */
    console.log("filteredPlans", filteredPlans);
    // !filteredPlans.length ?
    //     recommended_plans = plans : recommended_plans = filteredPlans;
    
     let final;
    
     let arr = [];
   /* if (filtersApplied["total_benefit_range"].length > 0) {

        let tbl = await filteredPlans.filter(plan => {
            let plan_tbr = stripNonNumeric(plan.in_patient_limit) + stripNonNumeric(plan.Out_patient_limit);
            return plan_tbr >= filtersApplied["total_benefit_range"][0] && plan_tbr <= filtersApplied["total_benefit_range"][1]
        })
        arr.push(...tbl)
    }

    */

    if (filtersApplied["lat_lng"].length > 0) {
        let nearbyPlans = [];
        let p = 0.017453292519943295;    // Math.PI / 180
        let r = 10; //in km
        let d;
        let c = Math.cos;

        let packages = arr.length > 0 ? arr : filteredPlans;
        for (let i = 0; i < packages.length; i++) {
            for (let j = 0; j < packages[i].hmo.providers.length; j++) {
                if (packages[i].hmo.providers[j].gps) {

                    let lat1, lat2, lng1, lng2;
                    lat1 = filtersApplied["lat_lng"][0];
                    lng1 = filtersApplied["lat_lng"][1];

                    lat2 = packages[i].hmo.providers[j].gps.latitude.toFixed(6);
                    lng2 = packages[i].hmo.providers[j].gps.longitude.toFixed(6);

                    let a = 0.5 - c((lat2 - lat1) * p) / 2 +
                        c(lat1 * p) * c(lat2 * p) *
                        (1 - c((lng2 - lng1) * p)) / 2;

                    d = 12742 * Math.asin(Math.sqrt(a)); // 2 * R = 12742; R = 6371 km

                    if (d < r) {
                        let plans_in_nearby_plans_arr = nearbyPlans.map(n => n.plan_id);
                        if (!plans_in_nearby_plans_arr.includes(packages[i].plan_id)) {
                            nearbyPlans.push(packages[i]);
                        }

                    }
                }

            }
        }
        arr = nearbyPlans;
    }

   /* if (filtersApplied["budget"].length > 0) {
        let packages = arr.length > 0 ? arr : filteredPlans;
        let bdgt = await packages.filter(p => {
            return (stripNonNumeric(p.price) >= filtersApplied["budget"][0] 
                && stripNonNumeric(p.price) <= filtersApplied["budget"][1])
        });

        arr = bdgt.length ? bdgt : packages ;
    } */

    final = arr.length ? arr: filteredPlans
    console.log("final", final);
    dispatch({
        type: GET_RECOMMENDED_PLANS,
        payload: final
    })

  
}

export const getPlan = (plan) => (dispatch) => {
    dispatch({
        type: GET_PLAN,
        payload: plan
    })
}

export const getPlanDetail = (planID) => async (dispatch, getState) => {
    let plans = getState().fetchData.plans;

    let plan = plans.filter(plan => plan.plan_id === planID)[0];
    dispatch(getSimilarPlans(plan));
    dispatch({
        type: GET_PLAN,
        payload: plan
    })
}

export const getSimilarPlans = (plan) => async (dispatch, getState) => {
    if (plan) {
        await dispatch(getPlans())
        if (plan.plan_id.category) {
            let type = plan.plan_id.category.map(cat => cat.name.toLowerCase());

            let planID = plan.plan_id;

            console.log("type", type, "planID", planID);

            let packages = getState().fetchData.plans;

            let res = groupPlansByType(packages, type);
            //console.log("res", res);

            let similar_plans = res.filter(plan => {
                // console.log("plan.plan_id", plan.plan_id);
                // console.log("planID", planID);
                return plan.plan_id !== planID
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
    await dispatch(getPlans());
    dispatch({
        type: IS_FILTERING_BY_PLAN_ID,
        payload: true
    });

    let plans = getState().fetchData.plans;
    CAN_LOG && console.log("planID", planID);
    let plansByID = plans.filter(plan => {
        return plan.plan_id === planID
    });

    CAN_LOG && console.log("plansByID", plansByID);

    dispatch({
        type: FILTER_BY_PLAN_ID,
        payload: plansByID
    })
}

export const getHMOs = () => async (dispatch, getState) => {
   // await dispatch(getProviders());
    // dispatch({
    //     type: IS_FETCHING_HMOS,
    //     payload: true
    // })
    await axios
        .get(`${DEV_LABS_API_URL}/api/data/hmos`
            //, tokenConfig(getState)
        )
        .then((res) => {
            let providers = getState().fetchData.providers;
            // console.log("providers", providers);
            if (res.data.length > 0) {
               let hmos = res.data.map(obj => obj.data);
                //console.log("providers.length", providers.length);
                if (providers.length > 0) {
                    for (let i = 0; i < hmos.length; i++) {
                        let hmoID = hmos[i]["id"]
                        // console.log("providers", providers);

                        let hmoProviders =
                            //providers.filter(provider => provider.hmo_id === hmoID);
                            providers.filter(provider => {
                                // console.log("provider", provider);
                                return provider.hmo.includes(hmoID)
                            });

                        //  console.log("hmoID", hmoID, "hmoProviders", hmoProviders);
                        if (hmoProviders.length > 0) {
                            hmos[i]["providers"] = hmoProviders;
                        }
                    }
                }
                console.log("hmos", hmos);
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

export const getProviders = () => async (dispatch, getState) => {
   // dispatch(setIsFetchingProviders());
  // await dispatch(getDoctors());
   let doctors = getState().fetchData.doctors;
  // console.log("doctors", doctors);
    await axios
        .get(`${DEV_LABS_API_URL}/api/data/providers`)
        .then((res) => {
          
            //console.log("res", res);
            if (res.data.length > 0) {
               let providers = res.data.map(obj => obj.data);
               for (let i = 0; i < providers.length; i++) {
                   providers[i].doctors = doctors.filter(d => {
                     //  console.log("providers[i].id", providers[i].id, "d.provider.id", d.provider.id );
                       return providers[i].id === d.provider.id
                   })
               }
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

        plansByHMO = getState().fetchData.plans.filter(plan => plan.hmo_id.hmo_id === hmoId)

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

        let arr = getState().fetchData.plans;//this.props.planServices;
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

export const setIsFetchingPlansByHMO = () => () => {

}

export const setIsFetchingPlans = () => (dispatch) => {
    dispatch({
        type: IS_FETCHING_PLANS,
        payload: true
    })
}

export const setIsFetchingData = () => (dispatch) => {
    dispatch({
        type: IS_FETCHING_DATA,
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
    // let allPlans = await getState().fetchData.plans;
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

export const getSpecialties = () => async (dispatch) => {
    await axios.get(
        `${DEV_LABS_API_URL}/api/data/specialties`
    ).then(res => {
        if (res.data.length > 0) {
           let specialties = res.data.map(d => d.data);

            dispatch({
                type: GET_SPECIALTIES,
                payload: specialties
            })
        }
    }).catch(err => {
        err.response && dispatch(returnErrors(err.response.data, err.response.status))
    })
}

export const getDoctors = () => async (dispatch, getState) => {
  //  let doctors = [];

   // await dispatch(getSpecialties());
  //  let all_specialties = getState().fetchData.specialties;

    await axios.get(
        `${DEV_LABS_API_URL}/api/data/doctors`
    ).then(res => {
        if (res.data.length > 0) {
          let  doctors = res.data.map(d => d.data);
            // console.log("doctors", doctors);

          /*  for (let i = 0; i < doctors.length; i++) {
                let specialty = JSON.parse(doctors[i]["sub_specialty"]).map(s =>
                    all_specialties.filter(a => a.id === s)[0]
                )

                // console.log("specialty[i].name", specialty[i].name);

                let specialtyString = ""
                for (let j = 0; j < specialty.length; j++) {
                    specialtyString = specialtyString + specialty[j].name + ", "
                }
                // console.log("specialtyString", specialtyString);
                doctors[i]["sub_specialty"] = specialtyString.slice(0, -2);
                doctors[i]["provider_id"] = getState().fetchData.providers.filter(p => p.provider_id === doctors[i]["provider_id"])[0];
            } */
            dispatch({
                type: GET_DOCTORS,
                payload: doctors
            })
        }

       
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

export const resetLocation = (loc) => async (dispatch) => {
    dispatch({
        type: RESET_LOCATION,
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
