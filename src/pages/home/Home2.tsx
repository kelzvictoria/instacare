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
  getServices,
  getPlansByHMO,
  getRecommendedPlans,
  getProviderInfo,
  getCheapestPlan,
  getCheapestPlanByHMO,
  setIsFetchingHMOs,
  setIsFetchingPlans,
  setIsFetchingProviders,
  setIsFetchingRecPlans,
  setIsFetchingServices,
  filterByBudget,
  getPlansByID,
  filterByPlanType,
  filterByBudget_and_or_Type,
  filterByPlanRange,
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
  resetRange,
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
} from "../../actions/compareActions";

import { stripNonNumeric } from "../../utils/homeUtils";

const API_URL = "https://instacareconnect.pmglobaltechnology.com";

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

  componentDidMount() {
    let hmoArr;
    let hmoId = this.props.match.params.id;

    hmoArr = home_utils.hmos.filter((hmo) => hmo["id"] == hmoId);

    document.title = hmoId
      ? `Instacare - ${hmoArr[0].title}`
      : "Instacare - Home";

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

  async UNSAFE_componentWillMount() {
    !localStorage["plans"] && (await this.props.getPlans());
    !localStorage["services"] && (await this.props.getServices());
    const hmo = this.props.match.params ? this.props.match.params.id : "";

    !localStorage["cheapest_plan"] && this.getCheapestPlan();
    // this.getCheapestPlanByHMO();
  }

  getCheapestPlanByHMO() {
    let lowest = Number.POSITIVE_INFINITY;
    let highest = Number.NEGATIVE_INFINITY;
    let tmp;

    let arr = this.props.plansByHMO;
    //console.log("arr", arr);
    for (let i = arr.length - 1; i >= 0; i--) {
      tmp = arr[i]["individual_annual_price"];
      if (tmp < lowest) lowest = tmp;
      if (tmp > highest) highest = tmp;
    }
    this.props.getCheapestPlanByHMO(lowest);
  }

  getCheapestPlan() {
    let lowest = Number.POSITIVE_INFINITY;
    let highest = Number.NEGATIVE_INFINITY;
    let tmp;

    let arr = this.props.planServices;
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

    //return this.props.cheapest_plan;
    this.props.getCheapestPlan(lowest);
    // this.props.dispatch({
    //   type: "GET_CHEAPEST_PLAN",
    //   data: lowest,
    // });
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
  plans: state.fetchData.plans,
  planServices: state.fetchData.services,
  hmos: state.fetchData.hmos,
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
});

export default connect(mapProps, {
  getHMOs,
  getPlans,
  getProviders,
  getServices,
  getPlansByHMO,
  getRecommendedPlans,
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
  filterByBudget,
  getPlansByID,
  filterByPlanType,
  setPlanID,
  setHMOID,
  filterByBudget_and_or_Type,
  resetType,
  filterByPlanRange,
  resetRange,
})(Home);
