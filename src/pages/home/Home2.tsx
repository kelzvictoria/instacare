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
  filterPlans
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
      //this.props.planServices.length > 0
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

  parseParams = () => {
    let paramsArr: any[] = [];
    let params = this.props.match.params[0].split("/");

    let p: object;
    for (let i = 0; i < params.length; i += 2) {
      p = {
        name: params[i],
        value: params[i + 1],
      };
      paramsArr.push(p);
    }
    this.params = paramsArr;
  };

  async UNSAFE_componentWillMount() {
    await this.props.getDoctors();
    await this.props.getProviders();
    await this.props.getPlans();

   // if (!localStorage["cheapest_plan"]) {
     // await this.props.getCheapestPlan();
    //}

   /* if (Object.keys(this.props.match.params).length) {
      this.parseParams();
      let idParamsObj = this.params.filter((param) => param.name == "id");

      if (idParamsObj.length > 0) {
        let id = idParamsObj[0].value;

        await this.props.getPlansByHMO(id);
        this.getCheapestPlanByHMO();
      }
    } */
    
   /* if (this.props.plansByHMO.length || this.props.plans.length) {
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
        
    }*/


  }

  getCheapestPlanByHMO() {
    let lowest = Number.POSITIVE_INFINITY;
    let highest = Number.NEGATIVE_INFINITY;
    let tmp;

    let arr = this.props.plansByHMO;
    //console.log("arr", arr);
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
  filterPlans
})(Home);
