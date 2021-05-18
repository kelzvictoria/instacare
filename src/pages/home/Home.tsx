import React, { Component } from "react";
import {
  Button,
  Row,
  Col,
  Steps,
  message,
  AutoComplete,
  Form,
  Card,
  Spin,
} from "antd";
import {
  faShieldAlt,
  faMale,
  faFemale,
  faArrowLeft,
  faSmile,
  faGift,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AppHeader from "../../components/app-header/AppHeader";
import AppFooter from "../../components/app-footer/AppFooter";

import styles from "./Home.module.scss";
import "../../custom.css";
import Modal from "react-bootstrap/Modal";

import { connect } from "react-redux";
import * as actions from "../../actions/types";

import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";

import hospitalsvg from "../../svgs/hospitals.svg";
import ratiosvg from "../../svgs/claim_ratio.svg";

import HMOInfoSkeleton from "../../components/skeletons/SkeletonHMOInfo";

import * as home_utils from "../../utils/homeUtils";

import HomeContent from "../../components/home/home";

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

const { Step } = Steps;

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

    if (hmoId == "hygeia") {
      hmoArr = home_utils.hmos.filter((hmo) => hmo["id"] == "1");
    } else {
      hmoArr = home_utils.hmos.filter((hmo) => hmo["id"] == hmoId);
    }

    console.log("hmoArr", hmoArr);

    document.title = this.props.match.params.id
      ? `Instacare - ${hmoArr[0].title}`
      : "Instacare - Home";

    // this.setState({
    //   provider_info: hmoArr[0],
    // });

    // this.props.dispatch({
    //   type: "GET_PROVIDER_INFO",
    //   data: hmoArr[0],
    // });
    //this.props.getProviderInfo(hmoArr[0]);
  }

  async fetchHmos() {
    await this.props.getHMOs();
    // this.props.dispatch({
    //   type: actions.IS_FETCHING_HMOS,
    //   data: true,
    // });
    // const res = await fetch(`${API_URL}/api/hmos`, {
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   method: "GET",
    // });
    // if (res) {
    //   let hmos: object[] = [];
    //   let formelo_resp = await res.json();
    //   this.props.dispatch({
    //     type: actions.IS_FETCHING_HMOS,
    //     data: false,
    //   });
    //   if (formelo_resp || formelo_resp.length !== 0) {
    //     hmos = formelo_resp.map((obj) => {
    //       return { id: obj.id, ...obj.data };
    //     });
    //     this.props.dispatch({
    //       type: actions.GET_HMOS,
    //       data: hmos,
    //     });
    //     return;
    //   }
    // }
  }

  async fetchPlans() {
    this.props.getPlans();
    // this.props.dispatch({
    //   type: actions.IS_FETCHING_PLANS,
    //   data: true,
    // });
    // const res = await fetch(`${API_URL}/api/plans`, {
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   method: "GET",
    // });

    // if (res) {
    //   let plans: object[] = [];
    //   let formelo_resp = await res.json();
    //   this.props.dispatch({
    //     type: actions.IS_FETCHING_PLANS,
    //     data: false,
    //   });
    //   if (formelo_resp || formelo_resp.length !== 0) {
    //     plans = formelo_resp.map((obj) => obj.data);

    //     for (let j = 0; j < plans.length; j++) {
    //       let hmoID = plans[j]["hmo_id"].id;

    //       let servicesString = plans[j]["service_id"];
    //       let services = servicesString ? JSON.parse(servicesString) : "";

    //       let hmoDocumentID = home_utils.hmoKeysMapping[hmoID];

    //       let hmo_res = this.props.hmos.filter(
    //         (hmo) => hmo.id == hmoDocumentID
    //       );

    //       if (hmo_res) {
    //         let hmo_resp = hmo_res[0];

    //         plans[j]["hmo_id"] = hmo_resp;
    //         plans[j]["service_id"] = services;
    //       }
    //     }

    //     this.props.dispatch({
    //       type: actions.GET_PLANS,
    //       data: plans,
    //     });
    //     return;
    //   }
    // }
  }

  async getPlansByHMO(hmoId) {
    this.props.getPlansByHMO();
    // console.log("hmoId", hmoId);
    // let hmoName;

    // if (hmoId !== "hygeia") {
    //   hmoName = home_utils.hmos.filter((hmo) => hmo["id"] == hmoId);
    //   console.log("hmoName", hmoName);
    // } else {
    //   hmoName = home_utils.hmos.filter((hmo) => hmo["id"] == "1");
    //   console.log("hmoName", hmoName);
    // }

    // if (hmoId) {
    //   let hmoPlans;

    //   if (hmoId !== "hygeia") {
    //     hmoPlans = await this.props.plans.filter((plan) => {
    //       return plan.hmo_id.name.id == hmoName[0].name;
    //     });
    //   } else {
    //     hmoPlans = await this.props.plans.filter((plan) => {
    //       return plan.hmo_id.name.id == "1";
    //     });
    //   }

    //   this.props.dispatch({
    //     type: "GET_PLANS_BY_HMO",
    //     data: hmoPlans,
    //   });

    //   this.props.dispatch({
    //     type: "IS_FETCHING_PLANS_BY_HMO",
    //     data: true,
    //   });

    // } else {
    //   return "home page has mounted";
    // }
  }

  async UNSAFE_componentWillMount() {
    console.log("this.props", this.props);
    await this.fetchHmos();
    // this.fetchProviders();
    // this.fetchServices();
    await this.fetchPlans();

    console.log("this.props.match", this.props.match);

    const hmo = this.props.match.params ? this.props.match.params.id : "";

    // await this.getPlansByHMO(hmo);
    //this.getCheapestPlan();
    //this.getCheapestPlanByHMO();
  }

  getCheapestPlanByHMO() {
    let lowest = Number.POSITIVE_INFINITY;
    let highest = Number.NEGATIVE_INFINITY;
    let tmp;

    let arr = this.props.plansByHMO;
    console.log("arr", arr);
    for (let i = arr.length - 1; i >= 0; i--) {
      tmp = arr[i]["individual_annual_price"];
      if (tmp < lowest) lowest = tmp;
      if (tmp > highest) highest = tmp;
    }
    console.log(
      "most expensive plan by hmo",
      highest,
      "cheapest plan by hmo",
      lowest
    );

    // this.props.dispatch({
    //   type: "GET_CHEAPEST_PLAN_BY_HMO",
    //   data: lowest,
    // });

    this.props.getCheapestPlanByHMO(lowest);
    // return lowest;
  }

  getCheapestPlan() {
    let lowest = Number.POSITIVE_INFINITY;
    let highest = Number.NEGATIVE_INFINITY;
    let tmp;

    let arr = this.props.plans;
    for (let i = arr.length - 1; i >= 0; i--) {
      tmp = arr[i]["individual_annual_price"];
      if (tmp < lowest) lowest = tmp;
      if (tmp > highest) highest = tmp;
    }
    console.log("most expensive plan", highest, "cheapest plan", lowest);
    // this.props.dispatch({
    //   type: "GET_CHEAPEST_PLAN",
    //   data: lowest,
    // });
    this.props.getCheapestPlan();
    //return lowest;
  }

  render() {
    console.log("this.state.provider_info", this.state.provider_info);
    return (
      <React.Fragment>
        <HomeContent {...this.props} />
      </React.Fragment>
    );
  }
}

const mapProps = (state: any) => ({
  plans: state.fetchData.plans,
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
})(Home);
