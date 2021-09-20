import React, { Component } from "react";
import { Steps } from "antd";

import "../../custom.css";

import { connect } from "react-redux";
import * as actions from "../../actions/types";

import "react-phone-number-input/style.css";

import * as home_utils from "../../utils/homeUtils";

import NewContent from "../../components/home/new-design";

import { state } from "../../components/home/state";

import {
  getHMOs,
   getPlans,
  getProviders,
  //getServices,
  getPlansByHMO,
  //getRecommendedPlans,
  getProviderInfo,
  getCheapestPlan,
  getCheapestPlanByHMO,
  setIsFetchingHMOs,
  setIsFetchingPlans,
  setIsFetchingProviders,
  setIsFetchingRecPlans,
  setIsFetchingServices,
  //filterByBudget,
  getPlanByID,
  //filterByPlanType,
  //filterByBudget_and_or_Type,
  //filterByPlanRange,
  getPlan,
  getSimilarPlans,
  togglePlanProviders,
  updateInfiniteScrollData,
  resetInfiniteScrollData,
  //filterByBenefits,
  //filterByTotalBenefitLimit,
  setLocation,
  getDoctors,
  handleGeocoding,
  handleReverseGeocoding,
  resetLocation,
  getSpecialties,
  filterPlans,
  setIsFetchingData
} from "../../actions/fetchDataActions";

import {
  updateNumOfPeople,
  toggleOthersModal,
  updateType,
  updateAge,
  toggleDesktopModal,
  toggleMobileModal,
  changePage,
  updatePhone,
  updateGender,
  updateFullName,
  toggleDesktopView,
  getNumOfPeople,
  updateSonCheck,
  incrementSonCount,
  incrementDaughterCount,
  decrementSonCount,
  decrementDaughterCount,
  resetResponses,
  updateDaughterCheck,
  updateTextResponse,
  updateBudget,
  getClickedPlan,
  resetPlans,
  updatePriceRange,
  setPlanID,
  setHMOID,
  resetType,
  resetBudget,
  resetRange,
  resetSelectedProviders,
  toggleDataCaptureModal,
  toggleFilterBox,
  compareTopThreePlans,
  resetSelectedDoctors,
  resetBenefits,
  resetPlanID,
  handlePlanRangeCheck,
  handlePlanTypesCheck,
  handleProviderSelected,
  handlePrescriptionSelected,
  handleMinRangeChange,
  handleMaxRangeChange,
  handleTotalBenefitMinChange,
  handleTotalBenefitMaxChange,
  handlePlanIDChange,
  enableSearchByProximity,
  handleMinDedChange,
  handleMaxDedChange,
  handleHMOSelected,
  resetFilterParams,
  setCoordinatesAndAddress,
  handleAddressImput,
  clearDoctorsFilter,
  clearProvidersFilter,
  clearBudgetFilter,
  clearPlanTypeFilter,
  clearPlanMetalLevelFilter,
  clearPlanIDFilter,
  clearHMOIDFilter,
  clearProximityFilter,
  clearBenefitsFilter,
  clearTotalBenefitRangeFilter,
  updateAppliedFilters,
  setProviders,
  setBenefits,
  setDoctors,
  jumpToFilterBox,
  updateURLParams,
  setDeepLinkParamsArr,
  updatePageIndex
} from "../../actions/userInputActions";

import {
  formatPrices,
  filterProviders,
  filterPrescriptions,
  updateSelectedProviders,
  filterLocations,
} from "../../actions/filterActions";

import {
  setPlansToCompareOnDesktop,
  setPlansToCompareOnMobile,
  resetPlansToCompare,
} from "../../actions/compareActions";

import { stripNonNumeric } from "../../utils/homeUtils";

interface QuizProps {
  [x: string]: any;
  dispatch(args: any): any;
}

class Home extends Component<QuizProps, {}> {
  constructor(props) {
    super(props);
  }

  state = {
    is_phone_valid: "null",
    show_provider_info: false,
    provider_info: [],
    filter_plans_by_hmo: false,
    plansByHMO: [],
  };

  componentDidUpdate(prevProps) {
    if (
      this.props.plans.length > 0
    ) {
      !localStorage["cheapest_plan"] && this.getCheapestPlan();
    } 
  }

  componentDidMount() {
    let hmoArr;
    let hmoId = this.props.match.params.id;

    hmoArr = home_utils.hmos.filter((hmo) => hmo["id"] == hmoId);

    // document.title = hmoId
    //   ? `Instacare - ${hmoArr[0].title}`
    //   : "Instacare - Home";

    //this.props.getProviderInfo(hmoArr[0]);
  }

  // async fetchHmos() {
  //   await this.props.getHMOs();
  // }

  // async fetchPlans() {
  //   this.props.getPlans();
  // }

  handleNumOfPeopleCount() {
    if (this.props.responses.type == "couple") {
      this.props.updateNumOfPeople(1);
    } else if (this.props.responses.type == "fam-of-4") {
      this.props.updateNumOfPeople(3);
    } else if (this.props.responses.type == "fam-of-3") {
      this.props.updateNumOfPeople(2);
    } else if (this.props.responses.type == "parents") {
      this.props.updateNumOfPeople(1);
    } else if (this.props.responses.type == "others") {
      let ages = [
        this.props.responses.child_1_age,
        this.props.responses.child_2_age,
        this.props.responses.child_3_age,
        this.props.responses.child_4_age,
        this.props.responses.child_5_age,
        this.props.responses.child_6_age,
        this.props.responses.child_7_age,
        this.props.responses.child_8_age,
        this.props.responses.father_age,
        this.props.responses.mother_age,
        this.props.responses.father_in_law_age,
        this.props.responses.mother_in_law_age,
        this.props.responses.spouse_age,
        this.props.responses.grand_father_age,
        this.props.responses.grand_mother_age,
        this.props.individual_age,
      ];

      for (let i = 0; i < ages.length; i++) {
        if (parseInt(ages[i]) !== 0) {
          this.props.updateNumOfPeople(1);
        }
      }
    }
  }

  async fetchRecommendedPlans() {
    this.handleNumOfPeopleCount();
    this.props.getRecommendedPlans(this.props.responses.num_of_people);
  }

  async getPlansByHMO(hmoId) {
    console.log("hmoId", hmoId);
    this.props.getPlansByHMO(hmoId);
  }

  params: any[] = [];
  parsedParams: any[] = [];

  parseParams = async () => {
    let paramsArr: any[] = [];
   // console.log("this.props.match", this.props.match);

    if (this.props.match.path === "/filter/*") {
      let params = this.props.match.params[0].split("/");
      console.log("params", params);
      
      let p: object;
      for (let i = 0; i < params.length; i += 2) {
        p = {
          name: params[i],
          value: params[i + 1],
        };
        paramsArr.push(p);
      }

      console.log("paramsArr", paramsArr);
      
    await this.props.setDeepLinkParamsArr(paramsArr)
      }
  };

  // resetTypeAndRangeFilters() {
  //   this.changeType(
  //     this.props.filter_params.plan_types_checked[
  //       this.props.filter_params.plan_types_checked.length - 1
  //     ]
  //   );
  // }

  updateAppliedFilters = async (data) => {
    await this.props.updateAppliedFilters(data);
    //this.buildFilterQueryParams();
  };


  filterPlans = async () => {
   
    const {
      plan_range_checked,
      plan_types_checked,
      annual_range_min,
      annual_range_max,

      hmo_selected,
      total_benefit_min,
      total_benefit_max,
      user_address,
    } = this.props.filter_params;

    if (user_address) {
      await this.props.handleGeocoding(user_address);
    }

    let filterBoxParams = {
      metal_level: this.props.responses.price_range,//plan_range_checked,
      plan_type: this.props.responses.type,//plan_types_checked,
      budget:
        annual_range_min && annual_range_max
          ? [annual_range_min, annual_range_max]
          : this.props.responses.budget.length > 0
          ? this.props.responses.budget
          : [],
      plan_id: this.props.filter_params.planID,
      hmo_name: hmo_selected,
      //hmo_id: hmo_selected,
      benefits: this.props.responses.benefits.map(b => b.id),
      total_benefit_range:
        total_benefit_min && total_benefit_max
          ? [total_benefit_min, total_benefit_max]
          : [],
      doctors: this.props.responses.doctors.map(d => 
        d.name
        //d.id
        ),
      lat_lng: this.props.location,
      providers: this.props.responses.providers.map(p => 
        p.name
       // p.id
        ),
    };

    const {
      metal_level,
      budget,
      plan_type,
      //hmo_id,
      hmo_name,
      plan_id,
      benefits,
      total_benefit_range,
      doctors,
      lat_lng,
      providers,
    } = filterBoxParams;

    if (
      metal_level.length > 0 ||
      budget.length > 0 ||
      plan_type.length > 0 ||
      hmo_name ||
      //hmo_id ||
      plan_id ||
      benefits.length > 0 ||
      total_benefit_range.length > 0 ||
      doctors.length > 0 ||
      lat_lng ||
      providers.length > 0
    ) {
      //this.resetTypeAndRangeFilters();
      console.log("in here");
      

      await this.props.filterPlans(filterBoxParams);

      if (budget.length > 0) {
        this.updateAppliedFilters({
          key: "budget",
          value: budget,
        });
      }

      if (plan_type.length > 0) {
        this.updateAppliedFilters({
          key: "plan_type",
          value: plan_type,
        });
      }

      if (metal_level.length > 0) {
        this.updateAppliedFilters({
          key: "metal_level",
          value: metal_level,
        });
      }

      if (
        hmo_name
       // hmo_id
        ) {
        this.updateAppliedFilters({
          key: "hmoID",
          value: hmo_name//hmo_id,
        });
      }

      if (plan_id) {
        this.updateAppliedFilters({
          key: "plan_ID",
          value: plan_id,
        });
      }

      if (benefits.length > 0) {
        this.updateAppliedFilters({
          key: "benefits",
          value: benefits,
        });
      }

      if (total_benefit_range.length) {
        this.updateAppliedFilters({
          key: "total_benefit_range",
          value: total_benefit_range,
        });
      }

      if (doctors.length) {
        this.updateAppliedFilters({
          key: "doctors",
          value: doctors,
        });
      }

      if (lat_lng) {
        this.updateAppliedFilters({
          key: "lat_lng",
          value: lat_lng,
        });
      }

      if (providers.length) {
        this.updateAppliedFilters({
          key: "providers",
          value: providers,
        });
      }

      await this.props.resetInfiniteScrollData();
      await this.infiniteScrollDataReInitOnFilterApplied();
    }

    if (this.props.filter_url ) {
      //console.log("this.props.history", this.props.history);
      this.props.history.push({
        pathname: this.props.filter_url
      })
    }
  };

  infiniteScrollDataReInitOnFilterApplied = async () => {
    //  console.log("in here");
      
     /* this.setState({
        current: 1,
        minIndex: 0,
        maxIndex: pageSize,
      }); */
      this.props.updatePageIndex(
        {
          current: 1,
          minIndex: 0,
          maxIndex: this.props.pageSize,
        }
      )
      let page = this.props.current;
      let plansByHMO = this.props.plansByHMO;
      let allPlans = this.props.is_filter_applied ? this.props.filtered_plans : this.props.plans;
  
      let apiData = //this.props.match.path === "/hmos/*" ? plansByHMO : 
      allPlans;
  
      let start_index = (page - 1) * this.props.pageSize;
      let end_index = this.props.pageSize * page;
  
     /* this.setState({
        current: page,
        minIndex: start_index,
        maxIndex: end_index,
      });*/
  
      this.props.updatePageIndex(
        {
          current: page,
          minIndex: start_index,
          maxIndex: end_index,
        }
      )
  
      await this.props.updateInfiniteScrollData(
        apiData,
        true,
        start_index,
        end_index
      );
    };

  async UNSAFE_componentWillMount() {
   !localStorage["plans"] && await this.props.setIsFetchingData(true);
   !localStorage["doctors"] && await this.props.getDoctors();
   !localStorage["providers"] && await this.props.getProviders();
   !localStorage["plans"] && await this.props.getPlans();
  // !localStorage["cheapest_plan"] && await this.props.getCheapestPlan();
  // this.props.match.params['0'].split("/")[0] === "hmoID" && await this.props.getCheapestPlanByHMO(this.props.match.params['0'].split("/")[1])

   // if (!localStorage["cheapest_plan"]) {
     // await this.props.getCheapestPlan();
    //}

    if (Object.keys(this.props.match.params).length) {
     await this.parseParams();
      //let idParamsObj = this.params.filter((param) => param.name == "id");

      if (
        //idParamsObj.length > 0
        this.props.match.params['0'].split("/")[0] === "hmoID"
        ) {
        //let id = idParamsObj[0].value;

        //await this.props.getPlansByHMO(id);
        await this.props.getPlansByHMO(this.props.match.params['0'].split("/")[1])
        this.getCheapestPlanByHMO();
      } 
    } 
    
    
    
    //console.log("this.props.plansByHMO", this.props.plansByHMO);
  
    /* 
    if (this.props.plansByHMO.length || this.props.plans.length) {
    //  console.log("inf");
      
      this.props.match.path === "/hmos/*" ?  await this.props.updateInfiniteScrollData(
        this.props.plansByHMO,
        false,
        null,
        null
      ) :  await this.props.updateInfiniteScrollData(
        //this.props.planServices,
        this.props.plans,
        false,
        null,
        null)
        
    } */

    let params = this.props.deep_link_params_arr;
    console.log("params", params);
    let filters = params.map(p => p.name);
    console.log("filters", filters);

    if (filters.includes("metal_level")) {
      await this.props.updatePriceRange(params.filter(p => p.name == "metal_level")[0].value)
    } 

    if (filters.includes("plan_type")) {
      let d = params.filter(p => p.name == "plan_type")[0];
      await this.props.updateType({
        key: "type",
        value: d.value
      })
    }

    if (filters.includes("budget")) {
      let d = params.filter(p => p.name == "budget")[0].value.split(",");

      this.props.handleMinRangeChange(d[0]);
      this.props.handleMaxRangeChange(d[1]);
    }

    if (filters.includes("plan_ID")) {
      let d = params.filter(p => p.name == "plan_ID")[0].value;
      this.props.handlePlanIDChange(d);
    }

    if (filters.includes("hmoID")) {
      let d = params.filter(p => p.name == "hmoID")[0].value;
      this.props.handleHMOSelected(d);
    }


    if (filters.includes("total_benefit_range")) {
      let d = params.filter(p => p.name == "total_benefit_range")[0].value.split(",");

      this.props.handleTotalBenefitMinChange(d[0]);
      this.props.handleTotalBenefitMaxChange(d[1]);
    }

    if (filters.includes("lat_lng")) {

    }

    if (filters.includes("benefits")) {
      let d = params.filter(p => p.name == "benefits")[0].value;
    }

    if (filters.includes("doctors")) {

    }

    if (filters.includes("providers")) {

    }

    await this.filterPlans();
  }

  getCheapestPlanByHMO() {
    let lowest = Number.POSITIVE_INFINITY;
    let highest = Number.NEGATIVE_INFINITY;
    let tmp;

    let arr = this.props.plansByHMO;
    console.log("arr", arr);
    for (let i = arr.length - 1; i >= 0; i--) {
      tmp = stripNonNumeric(arr[i]["price"]);
      if (tmp > 1000) {
        if (tmp < lowest) lowest = tmp;
        if (tmp > highest) highest = tmp;
      }
    }
    this.props.getCheapestPlanByHMO(lowest);
  }

  getCheapestPlan() {
    //this.props.getCheapestPlan();
  }

  render() {
    return (
      <React.Fragment>
        <NewContent {...this.props} />
      </React.Fragment>
    );
  }
}

const mapProps = (state: any) => ({
  //plans: state.fetchData.plans,
  //plan: state.fetchData.plan,
  //planServices: state.fetchData.services,
  plans: state.fetchData.plans,
  filtered_plans: state.fetchData.filtered_plans,
  is_filter_applied: state.fetchData.is_filter_applied,
  hmos: state.fetchData.hmos,
  hmo: state.fetchData.hmo,
  responses: state.quiz.responses,
  plansByHMO: state.fetchData.plansByHMO,
  cheapest_plan_by_hmo: state.fetchData.cheapest_plan_by_hmo,
  cheapest_plan: state.fetchData.cheapest_plan,
  isOthersInputOpen: state.quiz.isOthersInputOpen,
  dataSource: state.filter.dataSource,
  sonCount: state.quiz.sonCount,
  daughterCount: state.quiz.daughterCount,
  isSonCheckboxChecked: state.quiz.isSonCheckboxChecked,
  isDaughterCheckboxChecked: state.quiz.isDaughterCheckboxChecked,
  is_fetching_data: state.fetchData.is_fetching_data,
  infiniteScrollData: state.fetchData.infiniteScrollData,
  is_filter_box_open: state.quiz.is_filter_box_open,
  location: state.fetchData.location,
  doctors: state.fetchData.doctors,
  user_address: state.fetchData.user_address,
  compare_top_three_plans: state.quiz.responses.compare_top_three_plans,
  applied_filters: state.quiz.applied_filters,
  filter_params: state.quiz.filter_params,
  jump_to_filter_box: state.quiz.jump_to_filter_box,
  total_benefit_limit: state.quiz.total_benefit_limit,
  filter_url: state.quiz.filter_url,
  deep_link_params_arr: state.quiz.deep_link_params_arr,
  current: state.quiz.current,
  minIndex: state.quiz.minIndex,
  maxIndex: state.quiz.maxIndex,
  pageSize: state.quiz.pageSize
});

export default connect(mapProps, {
  getHMOs,
  getPlans,
  getProviders,
  //getServices,
  getPlansByHMO,
  //getRecommendedPlans,
  getCheapestPlan,
  getProviderInfo,
  getCheapestPlanByHMO,
  setIsFetchingHMOs,
  setIsFetchingPlans,
  setIsFetchingProviders,
  setIsFetchingRecPlans,
  setIsFetchingServices,
  updateNumOfPeople,
  toggleOthersModal,
  updateType,
  formatPrices,
  filterProviders,
  filterPrescriptions,
  updateSelectedProviders,
  filterLocations,
  getClickedPlan,
  updateAge,
  toggleDesktopModal,
  toggleMobileModal,
  changePage,
  updatePhone,
  updateGender,
  updateFullName,
  toggleDesktopView,
  getNumOfPeople,
  updateSonCheck,
  incrementSonCount,
  incrementDaughterCount,
  decrementSonCount,
  decrementDaughterCount,
  resetResponses,
  updateDaughterCheck,
  updateTextResponse,
  updateBudget,
  setPlansToCompareOnDesktop,
  setPlansToCompareOnMobile,
  resetPlans,
  updatePriceRange,
  //filterByBudget,
  getPlanByID,
  //filterByPlanType,
  setPlanID,
  setHMOID,
  //filterByBudget_and_or_Type,
  resetType,
  resetBudget,
  //filterByPlanRange,
  resetRange,
  getPlan,
  getSimilarPlans,
  resetSelectedProviders,
  toggleDataCaptureModal,
  togglePlanProviders,
  updateInfiniteScrollData,
  resetInfiniteScrollData,
  //filterByBenefits,
  //filterByTotalBenefitLimit,
  toggleFilterBox,
  setLocation,
  getDoctors,
  handleGeocoding,
  handleReverseGeocoding,
  compareTopThreePlans,
  resetPlansToCompare,
  resetSelectedDoctors,
  resetBenefits,
  resetLocation,
  resetPlanID,

  handlePlanRangeCheck,
  handlePlanTypesCheck,
  handleProviderSelected,
  handlePrescriptionSelected,
  handleMinRangeChange,
  handleMaxRangeChange,
  handleTotalBenefitMinChange,
  handleTotalBenefitMaxChange,
  handlePlanIDChange,
  enableSearchByProximity,
  handleMinDedChange,
  handleMaxDedChange,
  handleHMOSelected,
  resetFilterParams,
  setCoordinatesAndAddress,
  handleAddressImput,
  clearDoctorsFilter,
  clearProvidersFilter,
  clearBudgetFilter,
  clearPlanTypeFilter,
  clearPlanMetalLevelFilter,
  clearPlanIDFilter,
  clearHMOIDFilter,
  clearProximityFilter,
  clearBenefitsFilter,
  clearTotalBenefitRangeFilter,
  updateAppliedFilters,
  setProviders,
  setBenefits,
  setDoctors,
  jumpToFilterBox,
  getSpecialties,
  filterPlans,
  setIsFetchingData,
  updateURLParams,
  setDeepLinkParamsArr, 
  updatePageIndex
})(Home);
