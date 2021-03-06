import React, { Component } from "react";

/*import { API_URL } from "../../config";*/
import { connect } from "react-redux";

import { message, Spin } from "antd";
import { Plan } from "../../interfaces/Plan";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faChevronRight,
  faChevronDown,
  faChevronUp,
  faChevronLeft,
  faPrint,
  faEnvelope,
  faLink,
  faTimes,
  faCircle,
} from "@fortawesome/free-solid-svg-icons";

// import { state } from "../../components/home/state";

import "../../components/home/new-design.css";
import "./compare.css";

import { stripNonNumeric, CAN_LOG } from "../../utils/homeUtils";

import check from "../../svgs/check.svg";
import uncheck from "../../svgs/uncheck.svg";

import {
  setCheckedPlans,
  setPlansToCompareOnDesktop,
  setPlansToCompareOnMobile,
} from "../../actions/compareActions";

import {
  getSimilarPlans,
  getPlanDetail,
  getProviders,
  getPlans,
  //getServices,
  getCheapestPlan,
  //getPlan,
} from "../../actions/fetchDataActions";

import {
  addCompareURLParam,
  removeCompareURLParam,
  toggleDataCaptureModal,
} from "../../actions/userInputActions";

import DataCaptureModal from "../../components/payment/DataCapture";

interface ComparisonProps {
  [x: string]: any;
  dispatch(args: any): any;
  plans: Plan[];
}

class ComparePlans extends Component<ComparisonProps> {
  constructor(props) {
    super(props);
  }
  state = {
    limit_plans_to_compare_on_desktop: 3,
    limit_plans_to_compare_on_mobile: 2,
    device: "",
    plans_to_compare: [],
    collapse_star_rating: true,
    collapse_plan_documents: true,
    collapse_other_services: true,
    show_prev_button: false,
    show_next_button: true,
    num_of_pages: 0,
    current_page: 1,
  };

  showPrevBtn = () => {
    this.setState({
      show_prev_button: true,
    });
  };

  hidePrevBtn = () => {
    this.setState({
      show_prev_button: false,
    });
  };

  showNextBtn = () => {
    this.setState({
      show_next_button: true,
    });
  };

  hideNextBtn = () => {
    this.setState({
      show_next_button: false,
    });
  };

  onPrevBtnClick = () => {
    this.state.current_page <= this.state.num_of_pages &&
      this.state.current_page >= this.state.num_of_pages - 1 &&
      this.setState({
        current_page: this.state.current_page - 1,
      });
  };

  onNextBtnClick = () => {
    this.state.current_page < this.state.num_of_pages &&
      this.setState({
        current_page: this.state.current_page + 1,
      });
  };

  handleMobileNav = (btnType) => {
    if (btnType === "prev") {
      this.onPrevBtnClick();
    } else {
      this.onNextBtnClick();
    }

    if (this.state.current_page === 1) {
      this.showPrevBtn();
    } else if (this.state.current_page === this.state.num_of_pages) {
      this.showNextBtn();
    }
  };

  setPlansToCompare = async () => {
    let params = this.props.match.params[0];

    //console.log("params", params);

    let paramsArr = params.split("/");
    paramsArr = paramsArr.map((p) => p);
    this.propsParams = paramsArr;

    // for (let i = 0; i < paramsArr.length; i++) {
    //   this.props.addCompareURLParam(paramsArr[i])
    //   //this.updateUrlParams("add", paramsArr[i]);
    // }
    this.setState({
      plans_to_compare: paramsArr,
      num_of_pages: paramsArr.length,
    });

    await this.props.getProviders();
    //await this.props.getPlans();
    await this.props.getPlans();

    let firstPlanID = paramsArr[0];
    console.log("firstPlanID", firstPlanID, "this.props.plans", this.props.plans);
    
    let firstPlan = this.props.plans.filter(
      (plan) => {
        console.log("plan.plan_id", plan.plan_id, "firstPlanID", firstPlanID, "status", plan.plan_id === firstPlanID );
        
        return plan.plan_id === firstPlanID
      }
    )[0];
    console.log("firstPlanID", firstPlan);

    await this.props.getSimilarPlans(firstPlan);
    this.props.getCheapestPlan();
  };

  async UNSAFE_componentWillMount() {
    this.setPlansToCompare();

    if (window.screen.width >= 501) {
      this.setState({
        device: "desktop",
      });
    } else {
      this.setState({
        device: "mobile",
      });
    }
  }

  goToPlans = () => {
    this.props.history.push({ pathname: "/" });
  };

  numberwithCommas = (value) => {
    return value ? value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : "";
  };

  toggleStarRatingCollapsible = () => {
    this.setState({
      collapse_star_rating: !this.state.collapse_star_rating,
    });
  };

  togglePlanDocsCollapsible = () => {
    this.setState({
      collapse_star_rating: !this.state.collapse_star_rating,
    });
  };

  toggleOtherServicesCollapsible = () => {
    this.setState({
      collapse_other_services: !this.state.collapse_other_services,
    });
  };

  async handleCheckedPlanToCompare(index) {
    let indexes: string[] = [...this.state.plans_to_compare]; //[...this.props.compare_plans_desktop_indexes];

    let isPlanChecked = indexes.indexOf(index);

    if (isPlanChecked === -1 && indexes.length > 0) {
      // this.showCompareButton();
    }
    console.log("isPlanChecked", isPlanChecked);

    if (isPlanChecked > -1) {
      if (indexes.length === 1) {
        // console.log("in?");

        message.error("Add more plans to compare");
      } else {
        indexes.splice(isPlanChecked, 1);
      }
    } else {
      if (indexes.length <= 2) {
        indexes.push(index);
      } else {
        message.error("You can only compare a maximum of 3 plans at a time");
      }
    }
    console.log("indexes", indexes);

    await this.props.setPlansToCompareOnDesktop(indexes);

    this.setState({
      plans_to_compare: indexes,
    });

    CAN_LOG &&
      console.log(
        "this.props.compare_plans_desktop_indexes",
        this.props.compare_plans_desktop_indexes,
        "this.state.plans_to_compare",
        this.state.plans_to_compare,
        "indexes.length",
        indexes.length,
        "index",
        index,
        "typeof index",
        typeof index
      );

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

    // const body = document.querySelector("body")!;
    // body.scrollTo(0, 0);
  }

  updateURL() {
    let path = "/compare-plans/plans";

    if (
      this.props.compare_plan_id_param.length > 0 ||
      this.propsParams.length > 0
    ) {
      let params = this.buildQueryParams();
      path = path + params;

      this.props.history.push({
        pathname: path,
      });
    }
  }

  propsParams = this.props.params;

  buildQueryParams = () => {
    let query_string = "";
    console.log(
      "this.props.compare_plan_id_param",
      this.props.compare_plan_id_param,
      "this.state.plans_to_compare",
      this.state.plans_to_compare
    );

    if (this.state.plans_to_compare.length > 0) {
      for (let i = this.state.plans_to_compare.length; i > 0; i--) {
        query_string += "/" + this.state.plans_to_compare[i - 1];
      }
    } else if (this.propsParams.length > 0) {
      query_string += "/";
    }
    return query_string;
  };

  updateUrlParams = async (type, planID) => {
    console.log("type", type, "planID", planID);

    let is_planID_present = this.props.compare_plan_id_param.filter(
      (id) => id === planID
    );

    console.log("is_planID_present", is_planID_present);

    switch (type) {
      case "add":
        console.log("add");

        if (is_planID_present.length === 0) {
          await this.props.addCompareURLParam(planID);
        }
        break;

      case "remove":
        await this.props.removeCompareURLParam(planID);
        break;

      default:
        break;
    }
    this.updateURL();
    let firstPlan = await this.props.plans.filter(
      (plan) => plan.plan_id === this.state.plans_to_compare[0]
    )[0];
    console.log("firstPlan", firstPlan);
    this.setState({
      num_of_pages: this.state.plans_to_compare.length,
    });

    this.props.getSimilarPlans(firstPlan);
  };

  getClickedPlan = async (planID, type) => {
    let data = this.props.plans.filter((plan) => plan.plan_id === planID)[0];
    await this.props.getPlan(data);
  };

  render() {
    let plans_to_compare: number[] = this.state.plans_to_compare;
    let plans = this.props.plans;

    let planOneID = this.state.plans_to_compare[0];
    let planTwoID = this.state.plans_to_compare[1];
    let planThreeID = this.state.plans_to_compare[2];

    let first = plans.filter((plan) => plan.plan_id === planOneID)[0];
    let second = plans.filter((plan) => plan.plan_id === planTwoID)[0];
    let third = plans.filter((plan) => plan.plan_id === planThreeID)[0];



    // console.log(
    //   "this.state.current_page",
    //   this.state.current_page,
    //   "this.state.num_of_pages",
    //   this.state.num_of_pages
    // );

    console.log("this.props.params", this.props.params);

    console.log("first", first);
     console.log("second", second);
     console.log("third", third);

    return (
      <div className="side-by-side_comparison c-plan-details-page">
        <div className="c-plan-details-page__header">
          <header className="c-plan-nav-bar">
            <div className="container padding-y--2 display--flex justify-content--between align-items--center">
              <div>
                <a
                  className="c-button c-button--transparent c-plan-nav-bar__back-link padding--0 text-decoration--underline"
                  //href="/#plans"
                  onClick={this.goToPlans}
                  target="_self"
                  role="button"
                >
                  <FontAwesomeIcon
                    className="margin-right--1"
                    icon={faArrowLeft}
                  />
                  <span>Back to plans</span>
                </a>
                <h1
                  tabIndex={-1}
                  className="font-weight--normal font-size--h1 margin-y--1"
                >
                  Compare plans
                </h1>
              </div>
              <div className="c-plan-nav-bar__share">
                <div className="c-share-buttons text-align--right">
                  <div className="display--block md-display--inline-block">
                    <button
                      className="c-button c-button--small qa-print-button margin-left--1 margin-bottom--1 sm-padding-x--2"
                      title="Print"
                      type="button"
                    >
                      <FontAwesomeIcon
                        className="fas md-margin-right--1"
                        icon={faPrint}
                      />

                      <span className="display--none md-display--inline-block">
                        Print
                      </span>
                    </button>
                    <button
                      className="c-button c-button--small qa-email-button margin-left--1 margin-bottom--1 sm-padding-x--2"
                      title="Email"
                      type="button"
                    >
                      <FontAwesomeIcon
                        className="fas md-margin-right--1"
                        icon={faEnvelope}
                      />

                      <span className="display--none md-display--inline-block">
                        Email
                      </span>
                    </button>
                    <button
                      className="c-button c-button--small qa-share-link-button margin-left--1 margin-bottom--1 sm-padding-x--2"
                      title="Link"
                      type="button"
                    >
                      <FontAwesomeIcon
                        className="fas md-margin-right--1"
                        icon={faLink}
                      />

                      <span className="display--none md-display--inline-block">
                        Link
                      </span>
                    </button>
                  </div>
                  <div>
                    <button
                      type="button"
                      aria-label="Tooltip: "
                      className="tooltip-trigger padding-right--0"
                    >
                      <span className="c-base text-decoration--underline color--primary">
                        Sharing your information
                      </span>
                      <span className="tooltip-icon-container tooltip-icon-container--has-trigger-content trigger-inverse">
                        <svg
                          className="tooltip-icon"
                          width="16px"
                          height="16px"
                          viewBox="0 0 16 16"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g
                            stroke="none"
                            stroke-width="1"
                            fill="none"
                            fill-rule="evenodd"
                          >
                            <g
                              className="tooltip-icon-fill"
                              fill-rule="nonzero"
                            >
                              <g>
                                <path d="M8,16 C3.581722,16 0,12.418278 0,8 C0,3.581722 3.581722,0 8,0 C12.418278,0 16,3.581722 16,8 C16,12.418278 12.418278,16 8,16 Z M9,12.2760417 L9,6.375 L7,6.375 L7,12.2760417 L9,12.2760417 Z M7,4.90625 C7,5.50347521 7.33172745,5.80208333 7.99519231,5.80208333 C8.66506745,5.80208333 9,5.50347521 9,4.90625 C9,4.6076374 8.9198726,4.38194521 8.75961539,4.22916667 C8.59935818,4.07638813 8.34455303,4 7.99519231,4 C7.64583158,4 7.39262899,4.07465203 7.23557692,4.22395833 C7.07852485,4.37326464 7,4.60069292 7,4.90625 Z"></path>
                              </g>
                            </g>
                          </g>
                        </svg>
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </header>
        </div>
        {this.props.plans.length > 0 ? (
          this.props.plans.length > 0 &&
          first && (
            <div>
              <div className="c-plan-details-page__body">
                <div className="fill--primary md-display--none print-display--none">
                  <div className="l-row justify-content--between">
                    <div className="l-col--4 text-align--left">
                      {this.state.show_prev_button && (
                        <button
                          className={`c-button c-button--transparent color--white padding-x--1 qa-compare-prev ${
                            this.state.current_page <= 1 && "display--none"
                          }`}
                          type="button"
                          onClick={() => {
                            this.handleMobileNav("prev");
                          }}
                        >
                          <FontAwesomeIcon
                            icon={faChevronLeft}
                            className="margin-right--1"
                          />
                          Prev
                        </button>
                      )}
                    </div>
                    <div className="l-col--4 text-align--center">
                      {/* <button
                  className="c-button c-button--transparent padding-x--0 color--muted-inverse"
                  type="button"
                >
                  <FontAwesomeIcon icon={faCircle} />
                </button> */}

                      {this.state.plans_to_compare.map((plan, i) => {
                        return (
                          <button
                            className={`c-button c-button--transparent padding-x--0 ${
                              i === this.state.current_page - 1
                                ? "color--muted-inverse"
                                : "color--white"
                            }`}
                            type="button"
                            id={i.toString()}
                          >
                            <FontAwesomeIcon icon={faCircle} />
                          </button>
                        );
                      })}

                      {/* <button
                  className="c-button c-button--transparent padding-x--0 color--white"
                  type="button"
                >
                  <FontAwesomeIcon icon={faCircle} />
                </button> */}
                    </div>

                    <div className="l-col--4 text-align--right">
                      {this.state.show_next_button && (
                        <button
                          className={`c-button c-button--transparent color--white padding-x--1 qa-compare-next
                     ${
                       this.state.current_page ==
                         this.state.plans_to_compare.length && "display--none"
                     }`}
                          type="button"
                          onClick={() => {
                            this.handleMobileNav("next");
                          }}
                        >
                          Next
                          <FontAwesomeIcon
                            icon={faChevronRight}
                            className="margin-left--1"
                          />
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                <div className="fill--white">
                  <div className="container">
                    <div className="margin-y--1">
                      {/* mobile view begins */}
                      <div className="md-display--none print-display--none">
                        <header className="c-plan-title">
                          <div className="c-plan-title__issuer font-weight--bold">
                            {this.state.current_page === 1
                              ? first.hmo.name
                              : this.state.current_page === 2
                              ? second.hmo.name
                              : this.state.current_page === 3
                              ? third.hmo.name
                              : ""}
                          </div>
                          <h2 className="c-plan-title__name font-weight--normal margin-y--1">
                            <a href={`details/serviceID/`} target="_self">
                              {this.state.current_page === 1
                                ? first.name
                                : this.state.current_page === 2
                                ? second.name
                                : this.state.current_page === 3
                                ? third.name
                                : ""}
                            </a>
                          </h2>
                        </header>
                        <button
                          className="c-button c-button--primary c-button--small margin-top--2 qa-mobile-visible-plan"
                          type="button"
                          onClick={() => {
                            this.getClickedPlan(
                              this.state.current_page === 1
                                ? first.plan_id
                                : this.state.current_page === 2
                                ? second.plan_id
                                : this.state.current_page === 3
                                ? third.plan_id
                                : "",
                              "buy"
                            );
                            this.props.toggleDataCaptureModal(true);
                          }}
                        >
                          Like This Plan? Take the Next Step
                        </button>
                        <section className="c-detail-section margin-bottom--4">
                          <h2 className="border-bottom--1 border--dark padding-bottom--2">
                            Highlights
                          </h2>
                          <div>
                            <table className="c-details-table">
                              <tbody className="valign--top">
                                <tr>
                                  <th scope="row">Price</th>
                                  <td
                                    className={
                                      this.state.current_page === 1
                                        ? ""
                                        : "display--none"
                                    }
                                  >
                                    <span>???{
                                    
                                    this.numberwithCommas(
                                      stripNonNumeric(
                                    first.price))}</span>
                                  </td>
                                  {this.state.plans_to_compare[1] !==
                                    undefined && (
                                    <td
                                      className={
                                        this.state.current_page === 2
                                          ? ""
                                          : "display--none"
                                      }
                                    >
                                      <span>???{
                                    
                                    this.numberwithCommas(
                                      stripNonNumeric(second.price))}</span>
                                    </td>
                                  )}
                                  {this.state.plans_to_compare[2] !==
                                    undefined && (
                                    <td
                                      className={
                                        this.state.current_page === 3
                                          ? ""
                                          : "display--none"
                                      }
                                    >
                                      <span>???{
                                    
                                    this.numberwithCommas(
                                      stripNonNumeric(third.price))}</span>
                                    </td>
                                  )}
                                </tr>

                                <tr>
                                  <th scope="row">HMO</th>
                                  <td
                                    className={
                                      this.state.current_page === 1
                                        ? ""
                                        : "display--none"
                                    }
                                  >
                                    <span>{first.hmo.name}</span>
                                  </td>
                                  {this.state.plans_to_compare[1] !==
                                    undefined && (
                                    <td
                                      className={
                                        this.state.current_page === 2
                                          ? ""
                                          : "display--none"
                                      }
                                    >
                                      <span>{second.hmo.name}</span>
                                    </td>
                                  )}
                                  {this.state.plans_to_compare[2] !==
                                    undefined && (
                                    <td
                                      className={
                                        this.state.current_page === 3
                                          ? ""
                                          : "display--none"
                                      }
                                    >
                                      <span>{third.hmo.name}</span>
                                    </td>
                                  )}
                                </tr>

                                <tr>
                                  <th scope="row">Plan metal level</th>
                                  <td
                                    className={
                                      this.state.current_page === 1
                                        ? ""
                                        : "display--none"
                                    }
                                  >
                                    <span>{first.metal_level}</span>
                                  </td>
                                  {this.state.plans_to_compare[1] !==
                                    undefined && (
                                    <td
                                      className={
                                        this.state.current_page === 2
                                          ? ""
                                          : "display--none"
                                      }
                                    >
                                      <span>{second.metal_level}</span>
                                    </td>
                                  )}
                                  {this.state.plans_to_compare[2] !==
                                    undefined && (
                                    <td
                                      className={
                                        this.state.current_page === 3
                                          ? ""
                                          : "display--none"
                                      }
                                    >
                                      <span>{third.metal_level}</span>
                                    </td>
                                  )}
                                </tr>
                                <tr>
                                  <th scope="row">Plan type</th>
                                  <td
                                    className={
                                      this.state.current_page === 1
                                        ? ""
                                        : "display--none"
                                    }
                                  >
                                    <span>
                                      {first.plan_id &&
                                        first.plan_type &&
                                        first.plan_type.map((cat, i) => {
                                          return (
                                            <b className="">
                                              {" "}
                                              {cat}
                                              {first.plan_type.length >
                                                1 &&
                                                i <
                                                  first.plan_type
                                                    .length -
                                                    1 &&
                                                ", "}
                                            </b>
                                          );
                                        })}
                                    </span>
                                  </td>
                                  {this.state.plans_to_compare[1] !==
                                    undefined && (
                                    <td
                                      className={
                                        this.state.current_page === 2
                                          ? ""
                                          : "display--none"
                                      }
                                    >
                                      <span>
                                        {second.plan_id &&
                                          second.plan_type &&
                                          second.plan_type.map(
                                            (cat, i) => {
                                              return (
                                                <b className="">
                                                  {" "}
                                                  {cat}
                                                  {second.plan_type
                                                    .length > 1 &&
                                                    i <
                                                      second.plan_type
                                                        .length -
                                                        1 &&
                                                    ", "}
                                                </b>
                                              );
                                            }
                                          )}
                                      </span>
                                    </td>
                                  )}
                                  {this.state.plans_to_compare[2] !==
                                    undefined && (
                                    <td
                                      className={
                                        this.state.current_page === 3
                                          ? ""
                                          : "display--none"
                                      }
                                    >
                                      <span>
                                        {third.plan_id &&
                                          third.plan_type &&
                                          third.plan_type.map(
                                            (cat, i) => {
                                              return (
                                                <b className="">
                                                  {" "}
                                                  {cat}
                                                  {third.plan_type
                                                    .length > 1 &&
                                                    i <
                                                      third.plan_type
                                                        .length -
                                                        1 &&
                                                    ", "}
                                                </b>
                                              );
                                            }
                                          )}
                                      </span>
                                    </td>
                                  )}
                                </tr>

                                <tr className="print-display--none">
                                  <th scope="row">
                                    Medical providers in-network
                                  </th>
                                  <td
                                    className={
                                      this.state.current_page === 1
                                        ? ""
                                        : "display--none"
                                    }
                                  >
                                    <a
                                      className="c-button c-button--small print-display--none padding-x--2 margin-y--1"
                                      href={`/details/id/${first.plan_id}`}
                                      role="button"
                                    >
                                      View providers
                                    </a>
                                  </td>
                                  {this.state.plans_to_compare[1] !==
                                    undefined && (
                                    <td
                                      className={
                                        this.state.current_page === 2
                                          ? ""
                                          : "display--none"
                                      }
                                    >
                                      <a
                                        className="c-button c-button--small print-display--none padding-x--2 margin-y--1"
                                        href={`/details/id/${second.plan_id}`}
                                        role="button"
                                      >
                                        View providers
                                      </a>
                                    </td>
                                  )}
                                  {this.state.plans_to_compare[2] !==
                                    undefined && (
                                    <td
                                      className={
                                        this.state.current_page === 3
                                          ? ""
                                          : "display--none"
                                      }
                                    >
                                      <a
                                        className="c-button c-button--small print-display--none padding-x--2 margin-y--1"
                                        href={`/details/id/${third.plan_id}`}
                                        role="button"
                                      >
                                        View providers
                                      </a>
                                    </td>
                                  )}
                                </tr>
                                {/* 
                              <tr className="print-display--none">
                                <th scope="row">Drugs covered/not covered</th>
                                <td
                                  className={
                                    this.state.current_page === 1
                                      ? ""
                                      : "display--none"
                                  }
                                >
                                  <a
                                    className="c-button c-button--small print-display--none padding-x--2 margin-y--1"
                                    href="/find-drugs"
                                    role="button"
                                  >
                                    Add
                                  </a>
                                </td>
                                {this.state.plans_to_compare[1] !==
                                  undefined && (
                                  <td
                                    className={
                                      this.state.current_page === 2
                                        ? ""
                                        : "display--none"
                                    }
                                  >
                                    <a
                                      className="c-button c-button--small print-display--none padding-x--2 margin-y--1"
                                      href="/find-drugs"
                                      role="button"
                                    >
                                      Add
                                    </a>
                                  </td>
                                )}
                                {this.state.plans_to_compare[2] !==
                                  undefined && (
                                  <td
                                    className={
                                      this.state.current_page === 3
                                        ? ""
                                        : "display--none"
                                    }
                                  >
                                    <a
                                      className="c-button c-button--small print-display--none padding-x--2 margin-y--1"
                                      href="/find-drugs"
                                      role="button"
                                    >
                                      Add
                                    </a>
                                  </td>
                                )}
                              </tr>
                             */}
                              </tbody>
                            </table>
                          </div>
                        </section>

                        <section className="c-detail-section margin-bottom--4">
                          <h2 className="border-bottom--1 border--dark padding-bottom--2">
                            <button
                              className="ds-h2 text-align--left sans fill--transparent"
                              aria-expanded="false"
                              onClick={this.toggleOtherServicesCollapsible}
                            >
                              Services
                              {this.state.collapse_other_services ? (
                                <FontAwesomeIcon
                                  className="fas md-margin-right--1"
                                  icon={faChevronDown}
                                />
                              ) : (
                                <FontAwesomeIcon
                                  className="fas md-margin-right--1"
                                  icon={faChevronUp}
                                />
                              )}
                            </button>
                          </h2>
                          <div
                            hidden={
                              this.state.collapse_other_services ? true : false
                            }
                          >
                            <table className="c-details-table">
                              <tbody className="valign--top">
                                <tr className="border-bottom--2">
                                  <th scope="row">
                                    <span className="display--block">
                                      Accidents & Emergencies
                                    </span>
                                  </th>
                                  <td
                                    className={
                                      this.state.current_page === 1
                                        ? ""
                                        : "display--none"
                                    }
                                  >
                                    <div className="c-star-rating">
                                      <span>{first.accidents_emergencies}</span>
                                    </div>
                                  </td>
                                  {this.state.plans_to_compare[1] !==
                                    undefined && (
                                    <td
                                      className={
                                        this.state.current_page === 2
                                          ? ""
                                          : "display--none"
                                      }
                                    >
                                      <div className="c-star-rating">
                                        <span>
                                          {second.accidents_emergencies}
                                        </span>
                                      </div>
                                    </td>
                                  )}
                                  {this.state.plans_to_compare[2] !==
                                    undefined && (
                                    <td
                                      className={
                                        this.state.current_page === 3
                                          ? ""
                                          : "display--none"
                                      }
                                    >
                                      <div className="c-star-rating">
                                        <span>
                                          {third.accidents_emergencies}
                                        </span>
                                      </div>
                                    </td>
                                  )}
                                </tr>
                                <tr>
                                  <th scope="row">
                                    <span className="display--block">
                                      Additional Immunization
                                    </span>
                                  </th>
                                  <td
                                    className={
                                      this.state.current_page === 1
                                        ? ""
                                        : "display--none"
                                    }
                                  >
                                    <div className="c-star-rating">
                                      <span>
                                        {first.additional_ammunization}
                                      </span>
                                    </div>
                                  </td>
                                  {this.state.plans_to_compare[1] !==
                                    undefined && (
                                    <td
                                      className={
                                        this.state.current_page === 2
                                          ? ""
                                          : "display--none"
                                      }
                                    >
                                      <div className="c-star-rating">
                                        <span>
                                          {second.additional_ammunization}
                                        </span>
                                      </div>
                                    </td>
                                  )}
                                  {this.state.plans_to_compare[2] !==
                                    undefined && (
                                    <td
                                      className={
                                        this.state.current_page === 3
                                          ? ""
                                          : "display--none"
                                      }
                                    >
                                      <div className="c-star-rating">
                                        <span>
                                          {third.additional_ammunization}
                                        </span>
                                      </div>
                                    </td>
                                  )}
                                </tr>
                                <tr>
                                  <th scope="row">
                                    <span className="display--block">
                                      Admission Feeding
                                    </span>
                                  </th>
                                  <td
                                    className={
                                      this.state.current_page === 1
                                        ? ""
                                        : "display--none"
                                    }
                                  >
                                    <div className="c-star-rating">
                                      <span>{first.admission_feeding}</span>
                                    </div>
                                  </td>
                                  {this.state.plans_to_compare[1] !==
                                    undefined && (
                                    <td
                                      className={
                                        this.state.current_page === 2
                                          ? ""
                                          : "display--none"
                                      }
                                    >
                                      <div className="c-star-rating">
                                        <span>{second.admission_feeding}</span>
                                      </div>
                                    </td>
                                  )}
                                  {this.state.plans_to_compare[2] !==
                                    undefined && (
                                    <td
                                      className={
                                        this.state.current_page === 3
                                          ? ""
                                          : "display--none"
                                      }
                                    >
                                      <div className="c-star-rating">
                                        <span>{third.admission_feeding}</span>
                                      </div>
                                    </td>
                                  )}
                                </tr>
                                <tr>
                                  <th scope="row">
                                    <span className="display--block">
                                      Admissions per annum
                                    </span>
                                  </th>
                                  <td
                                    className={
                                      this.state.current_page === 1
                                        ? ""
                                        : "display--none"
                                    }
                                  >
                                    <div className="c-star-rating">
                                      <span>{first.admissions_per_annum}</span>
                                    </div>
                                  </td>
                                  {this.state.plans_to_compare[1] !==
                                    undefined && (
                                    <td
                                      className={
                                        this.state.current_page === 2
                                          ? ""
                                          : "display--none"
                                      }
                                    >
                                      <div className="c-star-rating">
                                        <span>
                                          {second.admissions_per_annum}
                                        </span>
                                      </div>
                                    </td>
                                  )}
                                  {this.state.plans_to_compare[2] !==
                                    undefined && (
                                    <td
                                      className={
                                        this.state.current_page === 3
                                          ? ""
                                          : "display--none"
                                      }
                                    >
                                      <div className="c-star-rating">
                                        <span>
                                          {third.admissions_per_annum}
                                        </span>
                                      </div>
                                    </td>
                                  )}
                                </tr>

                                <tr>
                                  <th scope="row">
                                    <span className="display--block">
                                      Antenatal Care Delivery
                                    </span>
                                  </th>
                                  <td
                                    className={
                                      this.state.current_page === 1
                                        ? ""
                                        : "display--none"
                                    }
                                  >
                                    <div className="c-star-rating">
                                      <span>
                                        {first.antenatal_care_delivery}
                                      </span>
                                    </div>
                                  </td>
                                  {this.state.plans_to_compare[1] !==
                                    undefined && (
                                    <td
                                      className={
                                        this.state.current_page === 2
                                          ? ""
                                          : "display--none"
                                      }
                                    >
                                      <div className="c-star-rating">
                                        <span>
                                          {second.antenatal_care_delivery}
                                        </span>
                                      </div>
                                    </td>
                                  )}
                                  {this.state.plans_to_compare[2] !==
                                    undefined && (
                                    <td
                                      className={
                                        this.state.current_page === 3
                                          ? ""
                                          : "display--none"
                                      }
                                    >
                                      <div className="c-star-rating">
                                        <span>
                                          {third.antenatal_care_delivery}
                                        </span>
                                      </div>
                                    </td>
                                  )}
                                </tr>

                                <tr>
                                  <th scope="row">
                                    <span className="display--block">
                                      Cancer Care
                                    </span>
                                  </th>
                                  <td
                                    className={
                                      this.state.current_page === 1
                                        ? ""
                                        : "display--none"
                                    }
                                  >
                                    <div className="c-star-rating">
                                      <span>{first.cancer_care}</span>
                                    </div>
                                  </td>
                                  {this.state.plans_to_compare[1] !==
                                    undefined && (
                                    <td
                                      className={
                                        this.state.current_page === 2
                                          ? ""
                                          : "display--none"
                                      }
                                    >
                                      <div className="c-star-rating">
                                        <span>{second.cancer_care}</span>
                                      </div>
                                    </td>
                                  )}
                                  {this.state.plans_to_compare[2] !==
                                    undefined && (
                                    <td
                                      className={
                                        this.state.current_page === 3
                                          ? ""
                                          : "display--none"
                                      }
                                    >
                                      <div className="c-star-rating">
                                        <span>{third.cancer_care}</span>
                                      </div>
                                    </td>
                                  )}
                                </tr>
                                <tr>
                                  <th scope="row">
                                    <span className="display--block">
                                      Covid 19 Treatment
                                    </span>
                                  </th>
                                  <td
                                    className={
                                      this.state.current_page === 1
                                        ? ""
                                        : "display--none"
                                    }
                                  >
                                    <div className="c-star-rating">
                                      <span>{first.covid_19_treatment}</span>
                                    </div>
                                  </td>
                                  {this.state.plans_to_compare[1] !==
                                    undefined && (
                                    <td
                                      className={
                                        this.state.current_page === 2
                                          ? ""
                                          : "display--none"
                                      }
                                    >
                                      <div className="c-star-rating">
                                        <span>{second.covid_19_treatment}</span>
                                      </div>
                                    </td>
                                  )}
                                  {this.state.plans_to_compare[2] !==
                                    undefined && (
                                    <td
                                      className={
                                        this.state.current_page === 3
                                          ? ""
                                          : "display--none"
                                      }
                                    >
                                      <div className="c-star-rating">
                                        <span>{third.covid_19_treatment}</span>
                                      </div>
                                    </td>
                                  )}
                                </tr>

                                <tr>
                                  <th scope="row">
                                    <span className="display--block">
                                      Dental Care
                                    </span>
                                  </th>
                                  <td
                                    className={
                                      this.state.current_page === 1
                                        ? ""
                                        : "display--none"
                                    }
                                  >
                                    <div className="c-star-rating">
                                      <span>{first.dental_care}</span>
                                    </div>
                                  </td>
                                  {this.state.plans_to_compare[1] !==
                                    undefined && (
                                    <td
                                      className={
                                        this.state.current_page === 2
                                          ? ""
                                          : "display--none"
                                      }
                                    >
                                      <div className="c-star-rating">
                                        <span>{second.dental_care}</span>
                                      </div>
                                    </td>
                                  )}
                                  {this.state.plans_to_compare[2] !==
                                    undefined && (
                                    <td
                                      className={
                                        this.state.current_page === 3
                                          ? ""
                                          : "display--none"
                                      }
                                    >
                                      <div className="c-star-rating">
                                        <span>{third.dental_care}</span>
                                      </div>
                                    </td>
                                  )}
                                </tr>

                                <tr>
                                  <th scope="row">
                                    <span className="display--block">
                                      Plastic Surgeries
                                    </span>
                                  </th>
                                  <td
                                    className={
                                      this.state.current_page === 1
                                        ? ""
                                        : "display--none"
                                    }
                                  >
                                    <div className="c-star-rating">
                                      <span>{first.plastic_surgeries}</span>
                                    </div>
                                  </td>
                                  {this.state.plans_to_compare[1] !==
                                    undefined && (
                                    <td
                                      className={
                                        this.state.current_page === 2
                                          ? ""
                                          : "display--none"
                                      }
                                    >
                                      <div className="c-star-rating">
                                        <span>{second.plastic_surgeries}</span>
                                      </div>
                                    </td>
                                  )}
                                  {this.state.plans_to_compare[2] !==
                                    undefined && (
                                    <td
                                      className={
                                        this.state.current_page === 3
                                          ? ""
                                          : "display--none"
                                      }
                                    >
                                      <div className="c-star-rating">
                                        <span>{third.plastic_surgeries}</span>
                                      </div>
                                    </td>
                                  )}
                                </tr>

                                <tr>
                                  <th scope="row">
                                    <span className="display--block">
                                      ENT Care
                                    </span>
                                  </th>
                                  <td
                                    className={
                                      this.state.current_page === 1
                                        ? ""
                                        : "display--none"
                                    }
                                  >
                                    <div className="c-star-rating">
                                      <span>{first.ent_care}</span>
                                    </div>
                                  </td>
                                  {this.state.plans_to_compare[1] !==
                                    undefined && (
                                    <td
                                      className={
                                        this.state.current_page === 2
                                          ? ""
                                          : "display--none"
                                      }
                                    >
                                      <div className="c-star-rating">
                                        <span>{second.ent_care}</span>
                                      </div>
                                    </td>
                                  )}
                                  {this.state.plans_to_compare[2] !==
                                    undefined && (
                                    <td
                                      className={
                                        this.state.current_page === 3
                                          ? ""
                                          : "display--none"
                                      }
                                    >
                                      <div className="c-star-rating">
                                        <span>{third.ent_care}</span>
                                      </div>
                                    </td>
                                  )}
                                </tr>

                                <tr>
                                  <th scope="row">
                                    <span className="display--block">
                                      Evacuations
                                    </span>
                                  </th>
                                  <td
                                    className={
                                      this.state.current_page === 1
                                        ? ""
                                        : "display--none"
                                    }
                                  >
                                    <div className="c-star-rating">
                                      <span>{first.evacuations}</span>
                                    </div>
                                  </td>
                                  {this.state.plans_to_compare[1] !==
                                    undefined && (
                                    <td
                                      className={
                                        this.state.current_page === 2
                                          ? ""
                                          : "display--none"
                                      }
                                    >
                                      <div className="c-star-rating">
                                        <span>{second.evacuations}</span>
                                      </div>
                                    </td>
                                  )}
                                  {this.state.plans_to_compare[2] !==
                                    undefined && (
                                    <td
                                      className={
                                        this.state.current_page === 3
                                          ? ""
                                          : "display--none"
                                      }
                                    >
                                      <div className="c-star-rating">
                                        <span>{third.evacuations}</span>
                                      </div>
                                    </td>
                                  )}
                                </tr>

                                <tr>
                                  <th scope="row">
                                    <span className="display--block">
                                      Family Planning Services
                                    </span>
                                  </th>
                                  <td
                                    className={
                                      this.state.current_page === 1
                                        ? ""
                                        : "display--none"
                                    }
                                  >
                                    <div className="c-star-rating">
                                      <span>
                                        {first.family_planning_services}
                                      </span>
                                    </div>
                                  </td>
                                  {this.state.plans_to_compare[1] !==
                                    undefined && (
                                    <td
                                      className={
                                        this.state.current_page === 2
                                          ? ""
                                          : "display--none"
                                      }
                                    >
                                      <div className="c-star-rating">
                                        <span>
                                          {second.family_planning_services}
                                        </span>
                                      </div>
                                    </td>
                                  )}
                                  {this.state.plans_to_compare[2] !==
                                    undefined && (
                                    <td
                                      className={
                                        this.state.current_page === 3
                                          ? ""
                                          : "display--none"
                                      }
                                    >
                                      <div className="c-star-rating">
                                        <span>
                                          {third.family_planning_services}
                                        </span>
                                      </div>
                                    </td>
                                  )}
                                </tr>

                                <tr>
                                  <th scope="row">
                                    <span className="display--block">
                                      Fertility Services
                                    </span>
                                  </th>
                                  <td
                                    className={
                                      this.state.current_page === 1
                                        ? ""
                                        : "display--none"
                                    }
                                  >
                                    <div className="c-star-rating">
                                      <span>{first.fertility_services}</span>
                                    </div>
                                  </td>
                                  {this.state.plans_to_compare[1] !==
                                    undefined && (
                                    <td
                                      className={
                                        this.state.current_page === 2
                                          ? ""
                                          : "display--none"
                                      }
                                    >
                                      <div className="c-star-rating">
                                        <span>{second.fertility_services}</span>
                                      </div>
                                    </td>
                                  )}
                                  {this.state.plans_to_compare[2] !==
                                    undefined && (
                                    <td
                                      className={
                                        this.state.current_page === 3
                                          ? ""
                                          : "display--none"
                                      }
                                    >
                                      <div className="c-star-rating">
                                        <span>{third.fertility_services}</span>
                                      </div>
                                    </td>
                                  )}
                                </tr>

                                <tr>
                                  <th scope="row">
                                    <span className="display--block">
                                      General Consultation
                                    </span>
                                  </th>
                                  <td
                                    className={
                                      this.state.current_page === 1
                                        ? ""
                                        : "display--none"
                                    }
                                  >
                                    <div className="c-star-rating">
                                      <span>{first.general_consultation}</span>
                                    </div>
                                  </td>
                                  {this.state.plans_to_compare[1] !==
                                    undefined && (
                                    <td
                                      className={
                                        this.state.current_page === 2
                                          ? ""
                                          : "display--none"
                                      }
                                    >
                                      <div className="c-star-rating">
                                        <span>
                                          {second.general_consultation}
                                        </span>
                                      </div>
                                    </td>
                                  )}
                                  {this.state.plans_to_compare[2] !==
                                    undefined && (
                                    <td
                                      className={
                                        this.state.current_page === 3
                                          ? ""
                                          : "display--none"
                                      }
                                    >
                                      <div className="c-star-rating">
                                        <span>
                                          {third.general_consultation}
                                        </span>
                                      </div>
                                    </td>
                                  )}
                                </tr>

                                <tr>
                                  <th scope="row">
                                    <span className="display--block">
                                      HIV/ AIDS Treatment
                                    </span>
                                  </th>
                                  <td
                                    className={
                                      this.state.current_page === 1
                                        ? ""
                                        : "display--none"
                                    }
                                  >
                                    <div className="c-star-rating">
                                      <span>{first.hiv_aids_treatment}</span>
                                    </div>
                                  </td>
                                  {this.state.plans_to_compare[1] !==
                                    undefined && (
                                    <td
                                      className={
                                        this.state.current_page === 2
                                          ? ""
                                          : "display--none"
                                      }
                                    >
                                      <div className="c-star-rating">
                                        <span>{second.hiv_aids_treatment}</span>
                                      </div>
                                    </td>
                                  )}
                                  {this.state.plans_to_compare[2] !==
                                    undefined && (
                                    <td
                                      className={
                                        this.state.current_page === 3
                                          ? ""
                                          : "display--none"
                                      }
                                    >
                                      <div className="c-star-rating">
                                        <span>{third.hiv_aids_treatment}</span>
                                      </div>
                                    </td>
                                  )}
                                </tr>

                                <tr>
                                  <th scope="row">
                                    <span className="display--block">
                                      Hospital Admissions
                                    </span>
                                  </th>
                                  <td
                                    className={
                                      this.state.current_page === 1
                                        ? ""
                                        : "display--none"
                                    }
                                  >
                                    <div className="c-star-rating">
                                      <span>{first.hospital_addmissions}</span>
                                    </div>
                                  </td>
                                  {this.state.plans_to_compare[1] !==
                                    undefined && (
                                    <td
                                      className={
                                        this.state.current_page === 2
                                          ? ""
                                          : "display--none"
                                      }
                                    >
                                      <div className="c-star-rating">
                                        <span>
                                          {second.hospital_addmissions}
                                        </span>
                                      </div>
                                    </td>
                                  )}
                                  {this.state.plans_to_compare[2] !==
                                    undefined && (
                                    <td
                                      className={
                                        this.state.current_page === 3
                                          ? ""
                                          : "display--none"
                                      }
                                    >
                                      <div className="c-star-rating">
                                        <span>{third.hospital_admissions}</span>
                                      </div>
                                    </td>
                                  )}
                                </tr>

                                <tr>
                                  <th scope="row">
                                    <span className="display--block">
                                      Hospital Category
                                    </span>
                                  </th>
                                  <td
                                    className={
                                      this.state.current_page === 1
                                        ? ""
                                        : "display--none"
                                    }
                                  >
                                    <div className="c-star-rating">
                                      <span>
                                        {first.hmo.providers.map(h => h.category[0], ", ")}
                                      </span>
                                    </div>
                                  </td>
                                  {this.state.plans_to_compare[1] !==
                                    undefined && (
                                    <td
                                      className={
                                        this.state.current_page === 2
                                          ? ""
                                          : "display--none"
                                      }
                                    >
                                      <div className="c-star-rating">
                                        <span>
                                          {second.hmo.providers.map(h => h.category[0], ", ")}
                                        </span>
                                      </div>
                                    </td>
                                  )}
                                  {this.state.plans_to_compare[2] !==
                                    undefined && (
                                    <td
                                      className={
                                        this.state.current_page === 3
                                          ? ""
                                          : "display--none"
                                      }
                                    >
                                      <div className="c-star-rating">
                                        <span>
                                          {third.hmo.providers.map(h => h.category[0], ", ")}
                                        </span>
                                      </div>
                                    </td>
                                  )}
                                </tr>

                                <tr>
                                  <th scope="row">
                                    <span className="display--block">
                                      In-patient Limit
                                    </span>
                                  </th>
                                  <td
                                    className={
                                      this.state.current_page === 1
                                        ? ""
                                        : "display--none"
                                    }
                                  >
                                    <div className="c-star-rating">
                                      <span>{first.in_patient_limit}</span>
                                    </div>
                                  </td>
                                  {this.state.plans_to_compare[1] !==
                                    undefined && (
                                    <td
                                      className={
                                        this.state.current_page === 2
                                          ? ""
                                          : "display--none"
                                      }
                                    >
                                      <div className="c-star-rating">
                                        <span>{second.in_patient_limit}</span>
                                      </div>
                                    </td>
                                  )}
                                  {this.state.plans_to_compare[2] !==
                                    undefined && (
                                    <td
                                      className={
                                        this.state.current_page === 3
                                          ? ""
                                          : "display--none"
                                      }
                                    >
                                      <div className="c-star-rating">
                                        <span>{third.in_patient_limit}</span>
                                      </div>
                                    </td>
                                  )}
                                </tr>

                                <tr>
                                  <th scope="row">
                                    <span className="display--block">
                                      Intensive Care
                                    </span>
                                  </th>
                                  <td
                                    className={
                                      this.state.current_page === 1
                                        ? ""
                                        : "display--none"
                                    }
                                  >
                                    <div className="c-star-rating">
                                      <span>{first.intensive_care}</span>
                                    </div>
                                  </td>
                                  {this.state.plans_to_compare[1] !==
                                    undefined && (
                                    <td
                                      className={
                                        this.state.current_page === 2
                                          ? ""
                                          : "display--none"
                                      }
                                    >
                                      <div className="c-star-rating">
                                        <span>{second.intensive_care}</span>
                                      </div>
                                    </td>
                                  )}
                                  {this.state.plans_to_compare[2] !==
                                    undefined && (
                                    <td
                                      className={
                                        this.state.current_page === 3
                                          ? ""
                                          : "display--none"
                                      }
                                    >
                                      <div className="c-star-rating">
                                        <span>{third.intensive_care}</span>
                                      </div>
                                    </td>
                                  )}
                                </tr>

                                <tr>
                                  <th scope="row">
                                    <span className="display--block">
                                      Telemedicine
                                    </span>
                                  </th>
                                  <td
                                    className={
                                      this.state.current_page === 1
                                        ? ""
                                        : "display--none"
                                    }
                                  >
                                    <div className="c-star-rating">
                                      <span>{first.telemedicine}</span>
                                    </div>
                                  </td>
                                  {this.state.plans_to_compare[1] !==
                                    undefined && (
                                    <td
                                      className={
                                        this.state.current_page === 2
                                          ? ""
                                          : "display--none"
                                      }
                                    >
                                      <div className="c-star-rating">
                                        <span>{second.telemedicine}</span>
                                      </div>
                                    </td>
                                  )}
                                  {this.state.plans_to_compare[2] !==
                                    undefined && (
                                    <td
                                      className={
                                        this.state.current_page === 3
                                          ? ""
                                          : "display--none"
                                      }
                                    >
                                      <div className="c-star-rating">
                                        <span>{third.telemedicine}</span>
                                      </div>
                                    </td>
                                  )}
                                </tr>

                                <tr>
                                  <th scope="row">
                                    <span className="display--block">
                                      Lab Investigations
                                    </span>
                                  </th>
                                  <td
                                    className={
                                      this.state.current_page === 1
                                        ? ""
                                        : "display--none"
                                    }
                                  >
                                    <div className="c-star-rating">
                                      <span>{first.lab_investigations}</span>
                                    </div>
                                  </td>
                                  {this.state.plans_to_compare[1] !==
                                    undefined && (
                                    <td
                                      className={
                                        this.state.current_page === 2
                                          ? ""
                                          : "display--none"
                                      }
                                    >
                                      <div className="c-star-rating">
                                        <span>{second.lab_investigations}</span>
                                      </div>
                                    </td>
                                  )}
                                  {this.state.plans_to_compare[2] !==
                                    undefined && (
                                    <td
                                      className={
                                        this.state.current_page === 3
                                          ? ""
                                          : "display--none"
                                      }
                                    >
                                      <div className="c-star-rating">
                                        <span>{third.lab_investigations}</span>
                                      </div>
                                    </td>
                                  )}
                                </tr>

                                <tr>
                                  <th scope="row">
                                    <span className="display--block">
                                      Congenital Abnormalities
                                    </span>
                                  </th>
                                  <td
                                    className={
                                      this.state.current_page === 1
                                        ? ""
                                        : "display--none"
                                    }
                                  >
                                    <div className="c-star-rating">
                                      <span>
                                        {first.congenital_abnormalities}
                                      </span>
                                    </div>
                                  </td>
                                  {this.state.plans_to_compare[1] !==
                                    undefined && (
                                    <td
                                      className={
                                        this.state.current_page === 2
                                          ? ""
                                          : "display--none"
                                      }
                                    >
                                      <div className="c-star-rating">
                                        <span>
                                          {second.congenital_abnormalities}
                                        </span>
                                      </div>
                                    </td>
                                  )}
                                  {this.state.plans_to_compare[2] !==
                                    undefined && (
                                    <td
                                      className={
                                        this.state.current_page === 3
                                          ? ""
                                          : "display--none"
                                      }
                                    >
                                      <div className="c-star-rating">
                                        <span>
                                          {third.congenital_abnormalities}
                                        </span>
                                      </div>
                                    </td>
                                  )}
                                </tr>

                                <tr>
                                  <th scope="row">
                                    <span className="display--block">
                                      Mental Health Services
                                    </span>
                                  </th>
                                  <td
                                    className={
                                      this.state.current_page === 1
                                        ? ""
                                        : "display--none"
                                    }
                                  >
                                    <div className="c-star-rating">
                                      <span>
                                        {first.mental_health_services}
                                      </span>
                                    </div>
                                  </td>
                                  {this.state.plans_to_compare[1] !==
                                    undefined && (
                                    <td
                                      className={
                                        this.state.current_page === 2
                                          ? ""
                                          : "display--none"
                                      }
                                    >
                                      <div className="c-star-rating">
                                        <span>
                                          {second.mental_health_services}
                                        </span>
                                      </div>
                                    </td>
                                  )}
                                  {this.state.plans_to_compare[2] !==
                                    undefined && (
                                    <td
                                      className={
                                        this.state.current_page === 3
                                          ? ""
                                          : "display--none"
                                      }
                                    >
                                      <div className="c-star-rating">
                                        <span>
                                          {third.mental_health_services}
                                        </span>
                                      </div>
                                    </td>
                                  )}
                                </tr>

                                <tr>
                                  <th scope="row">
                                    <span className="display--block">
                                      Surgeries
                                    </span>
                                  </th>
                                  <td
                                    className={
                                      this.state.current_page === 1
                                        ? ""
                                        : "display--none"
                                    }
                                  >
                                    <div className="c-star-rating">
                                      <span>{first.surgeries}</span>
                                    </div>
                                  </td>
                                  {this.state.plans_to_compare[1] !==
                                    undefined && (
                                    <td
                                      className={
                                        this.state.current_page === 2
                                          ? ""
                                          : "display--none"
                                      }
                                    >
                                      <div className="c-star-rating">
                                        <span>{second.surgeries}</span>
                                      </div>
                                    </td>
                                  )}
                                  {this.state.plans_to_compare[2] !==
                                    undefined && (
                                    <td
                                      className={
                                        this.state.current_page === 3
                                          ? ""
                                          : "display--none"
                                      }
                                    >
                                      <div className="c-star-rating">
                                        <span>{third.surgeries}</span>
                                      </div>
                                    </td>
                                  )}
                                </tr>

                                <tr>
                                  <th scope="row">
                                    <span className="display--block">
                                      Neonatal Care
                                    </span>
                                  </th>
                                  <td
                                    className={
                                      this.state.current_page === 1
                                        ? ""
                                        : "display--none"
                                    }
                                  >
                                    <div className="c-star-rating">
                                      <span>{first.neonatal_care}</span>
                                    </div>
                                  </td>
                                  {this.state.plans_to_compare[1] !==
                                    undefined && (
                                    <td
                                      className={
                                        this.state.current_page === 2
                                          ? ""
                                          : "display--none"
                                      }
                                    >
                                      <div className="c-star-rating">
                                        <span>{second.neonatal_care}</span>
                                      </div>
                                    </td>
                                  )}
                                  {this.state.plans_to_compare[2] !==
                                    undefined && (
                                    <td
                                      className={
                                        this.state.current_page === 3
                                          ? ""
                                          : "display--none"
                                      }
                                    >
                                      <div className="c-star-rating">
                                        <span>{third.neonatal_care}</span>
                                      </div>
                                    </td>
                                  )}
                                </tr>

                                <tr>
                                  <th scope="row">
                                    <span className="display--block">
                                      Optical Care
                                    </span>
                                  </th>
                                  <td
                                    className={
                                      this.state.current_page === 1
                                        ? ""
                                        : "display--none"
                                    }
                                  >
                                    <div className="c-star-rating">
                                      <span>{first.optical_care}</span>
                                    </div>
                                  </td>
                                  {this.state.plans_to_compare[1] !==
                                    undefined && (
                                    <td
                                      className={
                                        this.state.current_page === 2
                                          ? ""
                                          : "display--none"
                                      }
                                    >
                                      <div className="c-star-rating">
                                        <span>{second.optical_care}</span>
                                      </div>
                                    </td>
                                  )}
                                  {this.state.plans_to_compare[2] !==
                                    undefined && (
                                    <td
                                      className={
                                        this.state.current_page === 3
                                          ? ""
                                          : "display--none"
                                      }
                                    >
                                      <div className="c-star-rating">
                                        <span>{third.optical_care}</span>
                                      </div>
                                    </td>
                                  )}
                                </tr>

                                <tr>
                                  <th scope="row">
                                    <span className="display--block">
                                      Out-patient Limit
                                    </span>
                                  </th>
                                  <td
                                    className={
                                      this.state.current_page === 1
                                        ? ""
                                        : "display--none"
                                    }
                                  >
                                    <div className="c-star-rating">
                                      <span>{first.out_patient_limit}</span>
                                    </div>
                                  </td>
                                  {this.state.plans_to_compare[1] !==
                                    undefined && (
                                    <td
                                      className={
                                        this.state.current_page === 2
                                          ? ""
                                          : "display--none"
                                      }
                                    >
                                      <div className="c-star-rating">
                                        <span>{second.out_patient_limit}</span>
                                      </div>
                                    </td>
                                  )}
                                  {this.state.plans_to_compare[2] !==
                                    undefined && (
                                    <td
                                      className={
                                        this.state.current_page === 3
                                          ? ""
                                          : "display--none"
                                      }
                                    >
                                      <div className="c-star-rating">
                                        <span>{third.out_patient_limit}</span>
                                      </div>
                                    </td>
                                  )}
                                </tr>

                                <tr>
                                  <th scope="row">
                                    <span className="display--block">
                                      Physiotherapy
                                    </span>
                                  </th>
                                  <td
                                    className={
                                      this.state.current_page === 1
                                        ? ""
                                        : "display--none"
                                    }
                                  >
                                    <div className="c-star-rating">
                                      <span>{first.physiotherapy}</span>
                                    </div>
                                  </td>
                                  {this.state.plans_to_compare[1] !==
                                    undefined && (
                                    <td
                                      className={
                                        this.state.current_page === 2
                                          ? ""
                                          : "display--none"
                                      }
                                    >
                                      <div className="c-star-rating">
                                        <span>{second.physiotherapy}</span>
                                      </div>
                                    </td>
                                  )}
                                  {this.state.plans_to_compare[2] !==
                                    undefined && (
                                    <td
                                      className={
                                        this.state.current_page === 3
                                          ? ""
                                          : "display--none"
                                      }
                                    >
                                      <div className="c-star-rating">
                                        <span>{third.physiotherapy}</span>
                                      </div>
                                    </td>
                                  )}
                                </tr>

                                <tr>
                                  <th scope="row">
                                    <span className="display--block">
                                      Plain Contrast Xrays
                                    </span>
                                  </th>
                                  <td
                                    className={
                                      this.state.current_page === 1
                                        ? ""
                                        : "display--none"
                                    }
                                  >
                                    <div className="c-star-rating">
                                      <span>{first.plain_contrast_xrays}</span>
                                    </div>
                                  </td>
                                  {this.state.plans_to_compare[1] !==
                                    undefined && (
                                    <td
                                      className={
                                        this.state.current_page === 2
                                          ? ""
                                          : "display--none"
                                      }
                                    >
                                      <div className="c-star-rating">
                                        <span>
                                          {second.plain_contrast_xrays}
                                        </span>
                                      </div>
                                    </td>
                                  )}
                                  {this.state.plans_to_compare[2] !==
                                    undefined && (
                                    <td
                                      className={
                                        this.state.current_page === 3
                                          ? ""
                                          : "display--none"
                                      }
                                    >
                                      <div className="c-star-rating">
                                        <span>
                                          {third.plain_contrast_xrays}
                                        </span>
                                      </div>
                                    </td>
                                  )}
                                </tr>

                                <tr>
                                  <th scope="row">
                                    <span className="display--block">
                                      Postnatal Care
                                    </span>
                                  </th>
                                  <td
                                    className={
                                      this.state.current_page === 1
                                        ? ""
                                        : "display--none"
                                    }
                                  >
                                    <div className="c-star-rating">
                                      <span>{first.postnatal_care}</span>
                                    </div>
                                  </td>
                                  {this.state.plans_to_compare[1] !==
                                    undefined && (
                                    <td
                                      className={
                                        this.state.current_page === 2
                                          ? ""
                                          : "display--none"
                                      }
                                    >
                                      <div className="c-star-rating">
                                        <span>{second.postnatal_care}</span>
                                      </div>
                                    </td>
                                  )}
                                  {this.state.plans_to_compare[2] !==
                                    undefined && (
                                    <td
                                      className={
                                        this.state.current_page === 3
                                          ? ""
                                          : "display--none"
                                      }
                                    >
                                      <div className="c-star-rating">
                                        <span>{third.postnatal_care}</span>
                                      </div>
                                    </td>
                                  )}
                                </tr>

                                <tr>
                                  <th scope="row">
                                    <span className="display--block">
                                      Outpatient Prescribed Drugs
                                    </span>
                                  </th>
                                  <td
                                    className={
                                      this.state.current_page === 1
                                        ? ""
                                        : "display--none"
                                    }
                                  >
                                    <div className="c-star-rating">
                                      <span>
                                        {first.outpatient_prescribed_drugs}
                                      </span>
                                    </div>
                                  </td>
                                  {this.state.plans_to_compare[1] !==
                                    undefined && (
                                    <td
                                      className={
                                        this.state.current_page === 2
                                          ? ""
                                          : "display--none"
                                      }
                                    >
                                      <div className="c-star-rating">
                                        <span>
                                          {first.outpatient_prescribed_drugs}
                                        </span>
                                      </div>
                                    </td>
                                  )}
                                  {this.state.plans_to_compare[2] !==
                                    undefined && (
                                    <td
                                      className={
                                        this.state.current_page === 3
                                          ? ""
                                          : "display--none"
                                      }
                                    >
                                      <div className="c-star-rating">
                                        <span>
                                          {third.outpatient_prescribed_drugs}
                                        </span>
                                      </div>
                                    </td>
                                  )}
                                </tr>

                                <tr>
                                  <th scope="row">
                                    <span className="display--block">
                                      Renal Dialysis
                                    </span>
                                  </th>
                                  <td
                                    className={
                                      this.state.current_page === 1
                                        ? ""
                                        : "display--none"
                                    }
                                  >
                                    <div className="c-star-rating">
                                      <span>{first.renal_dialysis}</span>
                                    </div>
                                  </td>
                                  {this.state.plans_to_compare[1] !==
                                    undefined && (
                                    <td
                                      className={
                                        this.state.current_page === 2
                                          ? ""
                                          : "display--none"
                                      }
                                    >
                                      <div className="c-star-rating">
                                        <span>{second.renal_dialysis}</span>
                                      </div>
                                    </td>
                                  )}
                                  {this.state.plans_to_compare[2] !==
                                    undefined && (
                                    <td
                                      className={
                                        this.state.current_page === 3
                                          ? ""
                                          : "display--none"
                                      }
                                    >
                                      <div className="c-star-rating">
                                        <span>{third.renal_dialysis}</span>
                                      </div>
                                    </td>
                                  )}
                                </tr>

                                <tr>
                                  <th scope="row">
                                    <span className="display--block">
                                      Routine Immunization
                                    </span>
                                  </th>
                                  <td
                                    className={
                                      this.state.current_page === 1
                                        ? ""
                                        : "display--none"
                                    }
                                  >
                                    <div className="c-star-rating">
                                      <span>{first.routine_immunization}</span>
                                    </div>
                                  </td>
                                  {this.state.plans_to_compare[1] !==
                                    undefined && (
                                    <td
                                      className={
                                        this.state.current_page === 2
                                          ? ""
                                          : "display--none"
                                      }
                                    >
                                      <div className="c-star-rating">
                                        <span>
                                          {second.routine_immunization}
                                        </span>
                                      </div>
                                    </td>
                                  )}
                                  {this.state.plans_to_compare[2] !==
                                    undefined && (
                                    <td
                                      className={
                                        this.state.current_page === 3
                                          ? ""
                                          : "display--none"
                                      }
                                    >
                                      <div className="c-star-rating">
                                        <span>
                                          {third.routine_immunization}
                                        </span>
                                      </div>
                                    </td>
                                  )}
                                </tr>

                                <tr>
                                  <th scope="row">
                                    <span className="display--block">
                                      Specialist Consultation
                                    </span>
                                  </th>
                                  <td
                                    className={
                                      this.state.current_page === 1
                                        ? ""
                                        : "display--none"
                                    }
                                  >
                                    <div className="c-star-rating">
                                      <span>
                                        {first.specialist_consultation}
                                      </span>
                                    </div>
                                  </td>
                                  {this.state.plans_to_compare[1] !==
                                    undefined && (
                                    <td
                                      className={
                                        this.state.current_page === 2
                                          ? ""
                                          : "display--none"
                                      }
                                    >
                                      <div className="c-star-rating">
                                        <span>
                                          {second.specialist_consultation}
                                        </span>
                                      </div>
                                    </td>
                                  )}
                                  {this.state.plans_to_compare[2] !==
                                    undefined && (
                                    <td
                                      className={
                                        this.state.current_page === 3
                                          ? ""
                                          : "display--none"
                                      }
                                    >
                                      <div className="c-star-rating">
                                        <span>
                                          {third.specialist_consultation}
                                        </span>
                                      </div>
                                    </td>
                                  )}
                                </tr>

                                <tr>
                                  <th scope="row">
                                    <span className="display--block">
                                      Ultrasound Scans
                                    </span>
                                  </th>
                                  <td
                                    className={
                                      this.state.current_page === 1
                                        ? ""
                                        : "display--none"
                                    }
                                  >
                                    <div className="c-star-rating">
                                      <span>{first.ultrasound_scans}</span>
                                    </div>
                                  </td>
                                  {this.state.plans_to_compare[1] !==
                                    undefined && (
                                    <td
                                      className={
                                        this.state.current_page === 2
                                          ? ""
                                          : "display--none"
                                      }
                                    >
                                      <div className="c-star-rating">
                                        <span>{second.ultrasound_scans}</span>
                                      </div>
                                    </td>
                                  )}
                                  {this.state.plans_to_compare[2] !==
                                    undefined && (
                                    <td
                                      className={
                                        this.state.current_page === 3
                                          ? ""
                                          : "display--none"
                                      }
                                    >
                                      <div className="c-star-rating">
                                        <span>{third.ultrasound_scans}</span>
                                      </div>
                                    </td>
                                  )}
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </section>
                      </div>

                      {/* mobile view ends */}
                      <div className="display--none md-display--block print-display--block">
                        <div className="display--flex ">
                          <div className="l-col padding--0"></div>
                          <div className="l-col display--flex justify-content--between border--1 padding--0 c-compare-title__card">
                            <div className="c-compare-title__info padding--1">
                              <div className="font-size--small font-weight--bold">
                                {first.hmo.name}
                              </div>
                              <h2 className="font-size--h4 leading--heading font-weight--normal margin-y--1">
                                <a href={`/details/id/${first.plan_id}`}>
                                  {first.name}
                                </a>
                              </h2>
                              <div className="margin-top--auto print-display--none">
                                <button
                                  className="c-button c-button--primary c-button--small qa-details"
                                  type="button"
                                  onClick={() => {
                                    this.getClickedPlan(
                                      first.plan_id,
                                      "buy"
                                    );
                                    this.props.toggleDataCaptureModal(true);
                                  }}
                                >
                                  Buy This Plan
                                </button>
                              </div>
                            </div>
                            <div className="fill--gray-lightest print-display--none">
                              <button
                                className="c-button c-button--transparent c-button--small fill--transparent qa-remove"
                                type="button"
                                onClick={() => {
                                  this.handleCheckedPlanToCompare(
                                    // parseInt(
                                    this.state.plans_to_compare[0]
                                    // )
                                  );

                                  this.updateUrlParams(
                                    "remove",
                                    this.state.plans_to_compare[0]
                                  );

                                  // this.handleCheckedPlanToCompareOnDesktop("0");
                                }}
                              >
                                <FontAwesomeIcon
                                  className="fas  fa-lg color--primary"
                                  icon={faTimes}
                                />

                                <span className="visibility--screen-reader">
                                  Remove
                                </span>
                              </button>
                            </div>
                          </div>
                          {this.state.plans_to_compare[1] !== undefined && (
                            <div className="l-col display--flex justify-content--between border--1 padding--0 c-compare-title__card">
                              <div className="c-compare-title__info padding--1">
                                <div className="font-size--small font-weight--bold">
                                  {second.hmo.name}
                                </div>
                                <h2 className="font-size--h4 leading--heading font-weight--normal margin-y--1">
                                  <a href={`/details/id/${second.plan_id}`}>
                                    {second.name}
                                  </a>
                                </h2>
                                <div className="margin-top--auto print-display--none">
                                  <button
                                    className="c-button c-button--primary c-button--small qa-details"
                                    type="button"
                                    onClick={() => {
                                      this.getClickedPlan(
                                        second.plan_id,
                                        "buy"
                                      );
                                      this.props.toggleDataCaptureModal(true);
                                    }}
                                  >
                                    Buy This Plan
                                  </button>
                                </div>
                              </div>
                              <div className="fill--gray-lightest print-display--none">
                                <button
                                  className="c-button c-button--transparent c-button--small fill--transparent qa-remove"
                                  type="button"
                                  onClick={() => {
                                    this.handleCheckedPlanToCompare(
                                      // parseInt(
                                      this.state.plans_to_compare[1]
                                      //)
                                    );

                                    this.updateUrlParams(
                                      "remove",
                                      this.state.plans_to_compare[1]
                                    );
                                    //this.handleCheckedPlanToCompareOnDesktop("1");
                                  }}
                                >
                                  <FontAwesomeIcon
                                    className="fas  fa-lg color--primary"
                                    icon={faTimes}
                                  />
                                  <span className="visibility--screen-reader">
                                    Remove
                                  </span>
                                </button>
                              </div>
                            </div>
                          )}

                          {this.state.plans_to_compare[2] !== undefined && (
                            <div className="l-col display--flex justify-content--between border--1 padding--0 c-compare-title__card">
                              <div className="c-compare-title__info padding--1">
                                <div className="font-size--small font-weight--bold">
                                  {third.hmo.name}
                                </div>
                                <h2 className="font-size--h4 leading--heading font-weight--normal margin-y--1">
                                  <a href={`/details/id/${third.plan_id}`}>
                                    {third.name}
                                  </a>
                                </h2>
                                <div className="margin-top--auto print-display--none">
                                  <button
                                    className="c-button c-button--primary c-button--small qa-details"
                                    type="button"
                                    onClick={() => {
                                      this.getClickedPlan(
                                        third.plan_id,
                                        "buy"
                                      );
                                      this.props.toggleDataCaptureModal(true);
                                    }}
                                  >
                                    Buy This Plan
                                  </button>
                                </div>
                              </div>
                              <div className="fill--gray-lightest print-display--none">
                                <button
                                  className="c-button c-button--transparent c-button--small fill--transparent qa-remove"
                                  type="button"
                                  onClick={() => {
                                    this.handleCheckedPlanToCompare(
                                      // parseInt(
                                      this.state.plans_to_compare[2]
                                      // )
                                    );

                                    this.updateUrlParams(
                                      "remove",
                                      this.state.plans_to_compare[2]
                                    );
                                    // this.handleCheckedPlanToCompareOnDesktop("2");
                                  }}
                                >
                                  <FontAwesomeIcon
                                    className="fas  fa-lg color--primary"
                                    icon={faTimes}
                                  />
                                  <span className="visibility--screen-reader">
                                    Remove
                                  </span>
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                        <section className="c-detail-section margin-bottom--4">
                          <h2 className="border-bottom--1 border--dark padding-bottom--2">
                            Highlights
                          </h2>
                          <div>
                            <table className="c-details-table">
                              <tbody className="valign--top">
                                <tr>
                                  <th scope="row">Price</th>
                                  <td>
                                    <span>???{
                                    
                                    this.numberwithCommas(
                                      stripNonNumeric(first.price))}</span>
                                  </td>
                                  {this.state.plans_to_compare[1] !==
                                    undefined && (
                                    <td>
                                      <span>???{
                                    
                                    this.numberwithCommas(
                                      stripNonNumeric(second.price))}</span>
                                    </td>
                                  )}
                                  {this.state.plans_to_compare[2] !==
                                    undefined && (
                                    <td>
                                      <span>???{
                                    
                                    this.numberwithCommas(
                                      stripNonNumeric(third.price))}</span>
                                    </td>
                                  )}
                                </tr>

                                <tr>
                                  <th scope="row">HMO</th>
                                  <td>
                                    <span>{first.hmo.name}</span>
                                  </td>
                                  {this.state.plans_to_compare[1] !==
                                    undefined && (
                                    <td>
                                      <span>{second.hmo.name}</span>
                                    </td>
                                  )}
                                  {this.state.plans_to_compare[2] !==
                                    undefined && (
                                    <td>
                                      <span>{third.hmo.name}</span>
                                    </td>
                                  )}
                                </tr>

                                <tr>
                                  <th scope="row">Plan metal level</th>
                                  <td>
                                    <span>{first.metal_level}</span>
                                  </td>
                                  {this.state.plans_to_compare[1] !==
                                    undefined && (
                                    <td>
                                      <span>{second.metal_level}</span>
                                    </td>
                                  )}
                                  {this.state.plans_to_compare[2] !==
                                    undefined && (
                                    <td>
                                      <span>{third.metal_level}</span>
                                    </td>
                                  )}
                                </tr>
                                <tr>
                                  <th scope="row">Plan type</th>
                                  <td>
                                    <span>
                                      {first.plan_id &&
                                        first.plan_type &&
                                        first.plan_type.map((cat, i) => {
                                          return (
                                            <b className="">
                                              {" "}
                                              {cat}
                                              {first.plan_type.length >
                                                1 &&
                                                i <
                                                  first.plan_type
                                                    .length -
                                                    1 &&
                                                ", "}
                                            </b>
                                          );
                                        })}
                                    </span>
                                  </td>
                                  {this.state.plans_to_compare[1] !==
                                    undefined && (
                                    <td>
                                      <span>
                                        {second.plan_id &&
                                          second.plan_type &&
                                          second.plan_type.map(
                                            (cat, i) => {
                                              return (
                                                <b className="">
                                                  {" "}
                                                  {cat}
                                                  {second.plan_type
                                                    .length > 1 &&
                                                    i <
                                                      second.plan_type
                                                        .length -
                                                        1 &&
                                                    ", "}
                                                </b>
                                              );
                                            }
                                          )}
                                      </span>
                                    </td>
                                  )}
                                  {this.state.plans_to_compare[2] !==
                                    undefined && (
                                    <td>
                                      <span>
                                        {third.plan_id &&
                                          third.plan_type &&
                                          third.plan_type.map(
                                            (cat, i) => {
                                              return (
                                                <b className="">
                                                  {" "}
                                                  {cat}
                                                  {third.plan_type
                                                    .length > 1 &&
                                                    i <
                                                      third.plan_type
                                                        .length -
                                                        1 &&
                                                    ", "}
                                                </b>
                                              );
                                            }
                                          )}
                                      </span>
                                    </td>
                                  )}
                                </tr>
                                <tr>
                                  <th scope="row">Plan ID</th>
                                  <td>
                                    <span>{first.plan_id}</span>
                                  </td>
                                  {this.state.plans_to_compare[1] !==
                                    undefined && (
                                    <td>
                                      <span>{second.plan_id}</span>
                                    </td>
                                  )}
                                  {this.state.plans_to_compare[2] !==
                                    undefined && (
                                    <td>
                                      <span>{third.plan_id}</span>
                                    </td>
                                  )}
                                </tr>
                                <tr className="print-display--none">
                                  <th scope="row">
                                    Medical providers in-network
                                  </th>
                                  <td>
                                    <a
                                      className="c-button c-button--small print-display--none padding-x--2 margin-y--1"
                                      href={`/details/id/${first.plan_id}`}
                                      role="button"
                                    >
                                      View medical providers
                                    </a>
                                  </td>
                                  {this.state.plans_to_compare[1] !==
                                    undefined && (
                                    <td>
                                      <a
                                        className="c-button c-button--small print-display--none padding-x--2 margin-y--1"
                                        href={`/details/id/${second.plan_id}`}
                                        role="button"
                                      >
                                        View medical providers
                                      </a>
                                    </td>
                                  )}
                                  {this.state.plans_to_compare[2] !==
                                    undefined && (
                                    <td>
                                      <a
                                        className="c-button c-button--small print-display--none padding-x--2 margin-y--1"
                                        href={`/details/id/${third.plan_id}`}
                                        role="button"
                                      >
                                        View medical providers
                                      </a>
                                    </td>
                                  )}
                                </tr>
                                {/* 
                              <tr className="print-display--none">
                                <th scope="row">Drugs covered/not covered</th>
                                <td>
                                  <a
                                    className="c-button c-button--small print-display--none padding-x--2 margin-y--1"
                                    href="/find-drugs"
                                    role="button"
                                  >
                                    Add prescription drugs
                                  </a>
                                </td>
                                {this.state.plans_to_compare[1] !==
                                  undefined && (
                                  <td>
                                    <a
                                      className="c-button c-button--small print-display--none padding-x--2 margin-y--1"
                                      href="/find-drugs"
                                      role="button"
                                    >
                                      Add prescription drugs
                                    </a>
                                  </td>
                                )}
                                {this.state.plans_to_compare[2] !==
                                  undefined && (
                                  <td>
                                    <a
                                      className="c-button c-button--small print-display--none padding-x--2 margin-y--1"
                                      href="/find-drugs"
                                      role="button"
                                    >
                                      Add prescription drugs
                                    </a>
                                  </td>
                                )}
                              </tr>
                            */}
                              </tbody>
                            </table>
                          </div>
                        </section>
                        <section className="c-detail-section margin-bottom--4">
                          <h2 className="border-bottom--1 border--dark padding-bottom--2">
                            <button
                              className="ds-h2 text-align--left sans fill--transparent"
                              aria-expanded="false"
                              onClick={this.toggleStarRatingCollapsible}
                            >
                              Services
                              {this.state.collapse_star_rating ? (
                                <FontAwesomeIcon
                                  className="fas md-margin-right--1"
                                  icon={faChevronDown}
                                />
                              ) : (
                                <FontAwesomeIcon
                                  className="fas md-margin-right--1"
                                  icon={faChevronUp}
                                />
                              )}
                            </button>
                          </h2>
                          <div
                            hidden={
                              this.state.collapse_star_rating ? true : false
                            }
                          >
                            <table className="c-details-table">
                              <tbody className="valign--top">
                                <tr className="border-bottom--2">
                                  <th scope="row">
                                    <span className="display--block">
                                      Accidents & Emergencies
                                    </span>
                                  </th>
                                  <td>
                                    <div className="c-star-rating">
                                      <img
                                        src={
                                          first.benefits.includes("accidents_emergencies")
                                            ? check
                                            : uncheck
                                        }
                                        className=""
                                        alt=""
                                      />
                                    </div>
                                  </td>
                                  {this.state.plans_to_compare[1] !==
                                    undefined && (
                                    <td>
                                      <div className="c-star-rating">
                                        <img
                                          src={
                                            second.benefits.includes("accidents_emergencies")
                                            ? check
                                              : uncheck
                                          }
                                          className=""
                                          alt=""
                                        />
                                      </div>
                                    </td>
                                  )}
                                  {this.state.plans_to_compare[2] !==
                                    undefined && (
                                    <td>
                                      <div className="c-star-rating">
                                        <img
                                          src={
                                            third.benefits.includes("accidents_emergencies") 
                                              ? check
                                              : uncheck
                                          }
                                          className=""
                                          alt=""
                                        />
                                      </div>
                                    </td>
                                  )}
                                </tr>
                                <tr>
                                  <th scope="row">
                                    <span className="display--block">
                                      Additional Immunization
                                    </span>
                                  </th>
                                  <td>
                                    <div className="c-star-rating">
                                      <img
                                        src={
                                          first.benefits.includes("additional_immunization") 
                                            ? check
                                            : uncheck
                                        }
                                        className=""
                                        alt=""
                                      />
                                    </div>
                                  </td>
                                  {this.state.plans_to_compare[1] !==
                                    undefined && (
                                    <td>
                                      <div className="c-star-rating">
                                        <img
                                          src={
                                            second.benefits.includes("additional_immunization") 
                                              ? check
                                              : uncheck
                                          }
                                          className=""
                                          alt=""
                                        />
                                      </div>
                                    </td>
                                  )}
                                  {this.state.plans_to_compare[2] !==
                                    undefined && (
                                    <td>
                                      <div className="c-star-rating">
                                        <img
                                          src={
                                            third.benefits.includes("additional_immunization")
                                              ? check
                                              : uncheck
                                          }
                                          className=""
                                          alt=""
                                        />
                                      </div>
                                    </td>
                                  )}
                                </tr>
                                <tr>
                                  <th scope="row">
                                    <span className="display--block">
                                      Admission Feeding
                                    </span>
                                  </th>
                                  <td>
                                    <div className="c-star-rating">
                                      <img
                                        src={
                                          first.benefits.includes("admission_feeding") 
                                            ? check
                                            : uncheck
                                        }
                                        className=""
                                        alt=""
                                      />
                                    </div>
                                  </td>
                                  {this.state.plans_to_compare[1] !==
                                    undefined && (
                                    <td>
                                      <div className="c-star-rating">
                                        <img
                                          src={
                                            second.benefits.includes("admission_feeding") 
                                              ? check
                                              : uncheck
                                          }
                                          className=""
                                          alt=""
                                        />
                                      </div>
                                    </td>
                                  )}
                                  {this.state.plans_to_compare[2] !==
                                    undefined && (
                                    <td>
                                      <div className="c-star-rating">
                                        <img
                                          src={
                                            third.benefits.includes("admission_feeding") 
                                              ? check
                                              : uncheck
                                          }
                                          className=""
                                          alt=""
                                        />
                                      </div>
                                    </td>
                                  )}
                                </tr>
                                <tr>
                                  <th scope="row">
                                    <span className="display--block">
                                      Admissions per annum
                                    </span>
                                  </th>
                                  <td>
                                    <div className="c-star-rating">
                                      <img
                                        src={
                                          first.benefits.includes("admissions_per_annum") 
                                            ? check
                                            : uncheck
                                        }
                                        className=""
                                        alt=""
                                      />
                                    </div>
                                  </td>
                                  {this.state.plans_to_compare[1] !==
                                    undefined && (
                                    <td>
                                      <div className="c-star-rating">
                                        <img
                                          src={
                                            second.benefits.includes("admissions_per_annum ")
                                              ? check
                                              : uncheck
                                          }
                                          className=""
                                          alt=""
                                        />
                                      </div>
                                    </td>
                                  )}
                                  {this.state.plans_to_compare[2] !==
                                    undefined && (
                                    <td>
                                      <div className="c-star-rating">
                                        <img
                                          src={
                                            third.benefits.includes("admissions_per_annum")
                                              ? check
                                              : uncheck
                                          }
                                          className=""
                                          alt=""
                                        />
                                      </div>
                                    </td>
                                  )}
                                </tr>

                                <tr>
                                  <th scope="row">
                                    <span className="display--block">
                                      Antenatal Care Delivery
                                    </span>
                                  </th>
                                  <td>
                                    <div className="c-star-rating">
                                      <img
                                        src={
                                          first.benefits.includes("antenatal_care_delivery")
                                            ? check
                                            : uncheck
                                        }
                                        className=""
                                        alt=""
                                      />
                                    </div>
                                  </td>
                                  {this.state.plans_to_compare[1] !==
                                    undefined && (
                                    <td>
                                      <div className="c-star-rating">
                                        <img
                                          src={
                                            second.benefits.includes("antenatal_care_delivery")
                                              ? check
                                              : uncheck
                                          }
                                          className=""
                                          alt=""
                                        />
                                      </div>
                                    </td>
                                  )}
                                  {this.state.plans_to_compare[2] !==
                                    undefined && (
                                    <td>
                                      <div className="c-star-rating">
                                        <img
                                          src={
                                            third.benefits.includes("antenatal_care_delivery")
                                              ? check
                                              : uncheck
                                          }
                                          className=""
                                          alt=""
                                        />
                                      </div>
                                    </td>
                                  )}
                                </tr>

                                <tr>
                                  <th scope="row">
                                    <span className="display--block">
                                      Cancer Care
                                    </span>
                                  </th>
                                  <td>
                                    <div className="c-star-rating">
                                      <img
                                        src={
                                          first.benefits.includes("cancer_care")
                                            ? check
                                            : uncheck
                                        }
                                        className=""
                                        alt=""
                                      />
                                    </div>
                                  </td>
                                  {this.state.plans_to_compare[1] !==
                                    undefined && (
                                    <td>
                                      <div className="c-star-rating">
                                        <img
                                          src={
                                            second.benefits.includes("cancer_care")
                                              ? check
                                              : uncheck
                                          }
                                          className=""
                                          alt=""
                                        />
                                      </div>
                                    </td>
                                  )}
                                  {this.state.plans_to_compare[2] !==
                                    undefined && (
                                    <td>
                                      <div className="c-star-rating">
                                        <img
                                          src={
                                            third.benefits.includes("cancer_care")
                                              ? check
                                              : uncheck
                                          }
                                          className=""
                                          alt=""
                                        />
                                      </div>
                                    </td>
                                  )}
                                </tr>
                                <tr>
                                  <th scope="row">
                                    <span className="display--block">
                                      Covid 19 Treatment
                                    </span>
                                  </th>
                                  <td>
                                    <div className="c-star-rating">
                                      <img
                                        src={
                                          first.benefits.includes("covid_19_treatment")
                                            ? check
                                            : uncheck
                                        }
                                        className=""
                                        alt=""
                                      />
                                    </div>
                                  </td>
                                  {this.state.plans_to_compare[1] !==
                                    undefined && (
                                    <td>
                                      <div className="c-star-rating">
                                        <img
                                          src={
                                            second.benefits.includes("covid_19_treatment")
                                              ? check
                                              : uncheck
                                          }
                                          className=""
                                          alt=""
                                        />
                                      </div>
                                    </td>
                                  )}
                                  {this.state.plans_to_compare[2] !==
                                    undefined && (
                                    <td>
                                      <div className="c-star-rating">
                                        <img
                                          src={
                                            third.benefits.includes("covid_19_treatment")
                                              ? check
                                              : uncheck
                                          }
                                          className=""
                                          alt=""
                                        />
                                      </div>
                                    </td>
                                  )}
                                </tr>

                                <tr>
                                  <th scope="row">
                                    <span className="display--block">
                                      Dental Care
                                    </span>
                                  </th>
                                  <td>
                                    <div className="c-star-rating">
                                      <img
                                        src={
                                          first.benefits.includes("dental_care")
                                            ? check
                                            : uncheck
                                        }
                                        className=""
                                        alt=""
                                      />
                                    </div>
                                  </td>
                                  {this.state.plans_to_compare[1] !==
                                    undefined && (
                                    <td>
                                      <div className="c-star-rating">
                                        <img
                                          src={
                                            second.benefits.includes("dental_care")
                                              ? check
                                              : uncheck
                                          }
                                          className=""
                                          alt=""
                                        />
                                      </div>
                                    </td>
                                  )}
                                  {this.state.plans_to_compare[2] !==
                                    undefined && (
                                    <td>
                                      <div className="c-star-rating">
                                        <img
                                          src={
                                            third.benefits.includes("dental_care")
                                              ? check
                                              : uncheck
                                          }
                                          className=""
                                          alt=""
                                        />
                                      </div>
                                    </td>
                                  )}
                                </tr>

                                <tr>
                                  <th scope="row">
                                    <span className="display--block">
                                      Plastic Surgeries
                                    </span>
                                  </th>
                                  <td>
                                    <div className="c-star-rating">
                                      <img
                                        src={
                                          first.benefits.includes("plastic_surgeries")
                                            ? check
                                            : uncheck
                                        }
                                        className=""
                                        alt=""
                                      />
                                    </div>
                                  </td>
                                  {this.state.plans_to_compare[1] !==
                                    undefined && (
                                    <td>
                                      <div className="c-star-rating">
                                        <img
                                          src={
                                            second.benefits.includes("plastic_surgeries")
                                              ? check
                                              : uncheck
                                          }
                                          className=""
                                          alt=""
                                        />
                                      </div>
                                    </td>
                                  )}
                                  {this.state.plans_to_compare[2] !==
                                    undefined && (
                                    <td>
                                      <div className="c-star-rating">
                                        <img
                                          src={
                                            third.benefits.includes("plastic_surgeries")
                                              ? check
                                              : uncheck
                                          }
                                          className=""
                                          alt=""
                                        />
                                      </div>
                                    </td>
                                  )}
                                </tr>

                                <tr>
                                  <th scope="row">
                                    <span className="display--block">
                                      ENT Care
                                    </span>
                                  </th>
                                  <td>
                                    <div className="c-star-rating">
                                      <img
                                        src={
                                          first.benefits.includes("ent_care")
                                            ? check
                                            : uncheck
                                        }
                                        className=""
                                        alt=""
                                      />
                                    </div>
                                  </td>
                                  {this.state.plans_to_compare[1] !==
                                    undefined && (
                                    <td>
                                      <div className="c-star-rating">
                                        <img
                                          src={
                                            second.benefits.includes("ent_care")
                                              ? check
                                              : uncheck
                                          }
                                          className=""
                                          alt=""
                                        />
                                      </div>
                                    </td>
                                  )}
                                  {this.state.plans_to_compare[2] !==
                                    undefined && (
                                    <td>
                                      <div className="c-star-rating">
                                        <img
                                          src={
                                            third.benefits.includes("ent_care")
                                              ? check
                                              : uncheck
                                          }
                                          className=""
                                          alt=""
                                        />
                                      </div>
                                    </td>
                                  )}
                                </tr>

                                <tr>
                                  <th scope="row">
                                    <span className="display--block">
                                      Evacuations
                                    </span>
                                  </th>
                                  <td>
                                    <div className="c-star-rating">
                                      <img
                                        src={
                                          first.benefits.includes("evacuations")
                                            ? check
                                            : uncheck
                                        }
                                        className=""
                                        alt=""
                                      />
                                    </div>
                                  </td>
                                  {this.state.plans_to_compare[1] !==
                                    undefined && (
                                    <td>
                                      <div className="c-star-rating">
                                        <img
                                          src={
                                            second.benefits.includes("evacuations")
                                              ? check
                                              : uncheck
                                          }
                                          className=""
                                          alt=""
                                        />
                                      </div>
                                    </td>
                                  )}
                                  {this.state.plans_to_compare[2] !==
                                    undefined && (
                                    <td>
                                      <div className="c-star-rating">
                                        <img
                                          src={
                                            third.benefits.includes("evacuations")
                                              ? check
                                              : uncheck
                                          }
                                          className=""
                                          alt=""
                                        />
                                      </div>
                                    </td>
                                  )}
                                </tr>

                                <tr>
                                  <th scope="row">
                                    <span className="display--block">
                                      Family Planning Services
                                    </span>
                                  </th>
                                  <td>
                                    <div className="c-star-rating">
                                      <img
                                        src={
                                          first.benefits.includes("family_planning_services")
                                            ? check
                                            : uncheck
                                        }
                                        className=""
                                        alt=""
                                      />
                                    </div>
                                  </td>
                                  {this.state.plans_to_compare[1] !==
                                    undefined && (
                                    <td>
                                      <div className="c-star-rating">
                                        <img
                                          src={
                                            second.benefits.includes("family_planning_services")
                                              ? check
                                              : uncheck
                                          }
                                          className=""
                                          alt=""
                                        />
                                      </div>
                                    </td>
                                  )}
                                  {this.state.plans_to_compare[2] !==
                                    undefined && (
                                    <td>
                                      <div className="c-star-rating">
                                        <img
                                          src={
                                            third.benefits.includes("family_planning_services ")
                                            ? check
                                              : uncheck
                                          }
                                          className=""
                                          alt=""
                                        />
                                      </div>
                                    </td>
                                  )}
                                </tr>

                                <tr>
                                  <th scope="row">
                                    <span className="display--block">
                                      Fertility Services
                                    </span>
                                  </th>
                                  <td>
                                    <div className="c-star-rating">
                                      <img
                                        src={
                                          first.benefits.includes("fertility_services")
                                            ? check
                                            : uncheck
                                        }
                                        className=""
                                        alt=""
                                      />
                                    </div>
                                  </td>
                                  {this.state.plans_to_compare[1] !==
                                    undefined && (
                                    <td>
                                      <div className="c-star-rating">
                                        <img
                                          src={
                                            second.benefits.includes("fertility_services")
                                              ? check
                                              : uncheck
                                          }
                                          className=""
                                          alt=""
                                        />
                                      </div>
                                    </td>
                                  )}
                                  {this.state.plans_to_compare[2] !==
                                    undefined && (
                                    <td>
                                      <div className="c-star-rating">
                                        <img
                                          src={
                                            third.benefits.includes("fertility_services")
                                              ? check
                                              : uncheck
                                          }
                                          className=""
                                          alt=""
                                        />
                                      </div>
                                    </td>
                                  )}
                                </tr>

                                <tr>
                                  <th scope="row">
                                    <span className="display--block">
                                      General Consultation
                                    </span>
                                  </th>
                                  <td>
                                    <div className="c-star-rating">
                                      <img
                                        src={
                                          first.benefits.includes("general_consultation")
                                            ? check
                                            : uncheck
                                        }
                                        className=""
                                        alt=""
                                      />
                                    </div>
                                  </td>
                                  {this.state.plans_to_compare[1] !==
                                    undefined && (
                                    <td>
                                      <div className="c-star-rating">
                                        <img
                                          src={
                                            second.benefits.includes("general_consultation")
                                              ? check
                                              : uncheck
                                          }
                                          className=""
                                          alt=""
                                        />
                                      </div>
                                    </td>
                                  )}
                                  {this.state.plans_to_compare[2] !==
                                    undefined && (
                                    <td>
                                      <div className="c-star-rating">
                                        <img
                                          src={
                                            third.benefits.includes("general_consultation") 
                                              ? check
                                              : uncheck
                                          }
                                          className=""
                                          alt=""
                                        />
                                      </div>
                                    </td>
                                  )}
                                </tr>

                                <tr>
                                  <th scope="row">
                                    <span className="display--block">
                                      HIV/ AIDS Treatment
                                    </span>
                                  </th>
                                  <td>
                                    <div className="c-star-rating">
                                      <img
                                        src={
                                          first.benefits.includes("hiv_aids_treatment")
                                            ? check
                                            : uncheck
                                        }
                                        className=""
                                        alt=""
                                      />
                                    </div>
                                  </td>
                                  {this.state.plans_to_compare[1] !==
                                    undefined && (
                                    <td>
                                      <div className="c-star-rating">
                                        <img
                                          src={
                                            second.benefits.includes("hiv_aids_treatment")
                                              ? check
                                              : uncheck
                                          }
                                          className=""
                                          alt=""
                                        />
                                      </div>
                                    </td>
                                  )}
                                  {this.state.plans_to_compare[2] !==
                                    undefined && (
                                    <td>
                                      <div className="c-star-rating">
                                        <img
                                          src={
                                            third.benefits.includes("hiv_aids_treatment")
                                              ? check
                                              : uncheck
                                          }
                                          className=""
                                          alt=""
                                        />
                                      </div>
                                    </td>
                                  )}
                                </tr>

                                <tr>
                                  <th scope="row">
                                    <span className="display--block">
                                      Hospital Admissions
                                    </span>
                                  </th>
                                  <td>
                                    <div className="c-star-rating">
                                      <img
                                        src={
                                          first.benefits.includes("hospital_admissions")
                                            ? check
                                            : uncheck
                                        }
                                        className=""
                                        alt=""
                                      />
                                    </div>
                                  </td>
                                  {this.state.plans_to_compare[1] !==
                                    undefined && (
                                    <td>
                                      <div className="c-star-rating">
                                        <img
                                          src={
                                            second.benefits.includes("hospital_admissions")
                                              ? check
                                              : uncheck
                                          }
                                          className=""
                                          alt=""
                                        />
                                      </div>
                                    </td>
                                  )}
                                  {this.state.plans_to_compare[2] !==
                                    undefined && (
                                    <td>
                                      <div className="c-star-rating">
                                        <img
                                          src={
                                            third.benefits.includes("hospital_admissions")
                                              ? check
                                              : uncheck
                                          }
                                          className=""
                                          alt=""
                                        />
                                      </div>
                                    </td>
                                  )}
                                </tr>

                                <tr>
                                  <th scope="row">
                                    <span className="display--block">
                                      Hospital Category
                                    </span>
                                  </th>
                                  <td>
                                    <div className="c-star-rating t">
                                      
                                        {
                                          first.hmo.providers.map((h) =>
                                            h.category[0], ", ").map((c, i) => <span> {c} 
                                            {first.hmo.providers.map((h) =>
                                            h.category[0], ", ")
                                              .length > 1 &&
                                              i <
                                              first.hmo.providers.map((h) =>
                                              h.category[0], ", ")
                                                  .length -
                                                  1 &&
                                              ", "}</span>)
                                        }
                                      
                                    </div>
                                  </td>
                                  {this.state.plans_to_compare[1] !==
                                    undefined && (
                                    <td>
                                      <div className="c-star-rating">
                                        <span>
                                        {
                                          second.hmo.providers.map((h) =>
                                            h.category[0], ", ").map((c, i) => <span> {c} 
                                            {second.hmo.providers.map((h) =>
                                            h.category[0], ", ")
                                              .length > 1 &&
                                              i <
                                              second.hmo.providers.map((h) =>
                                              h.category[0], ", ")
                                                  .length -
                                                  1 &&
                                              ", "}</span>)
                                        }
                                        </span>
                                      </div>
                                    </td>
                                  )}
                                  {this.state.plans_to_compare[2] !==
                                    undefined && (
                                    <td>
                                      <div className="c-star-rating">
                                        <span>
                                        {
                                          third.hmo.providers.map((h) =>
                                            h.category[0], ", ").map((c, i) => <span> {c} 
                                            {third.hmo.providers.map((h) =>
                                            h.category[0], ", ")
                                              .length > 1 &&
                                              i <
                                              third.hmo.providers.map((h) =>
                                              h.category[0], ", ")
                                                  .length -
                                                  1 &&
                                              ", "}</span>)
                                        }
                                        </span>
                                      </div>
                                    </td>
                                  )}
                                </tr>

                                <tr>
                                  <th scope="row">
                                    <span className="display--block">
                                      In-patient Limit
                                    </span>
                                  </th>
                                  <td>
                                    <div className="c-star-rating">
                                      <span>???{
                                    
                                    this.numberwithCommas(
                                      stripNonNumeric(first.in_patient_limit))}</span>
                                    </div>
                                  </td>
                                  {this.state.plans_to_compare[1] !==
                                    undefined && (
                                    <td>
                                      <div className="c-star-rating">
                                        <span>???{this.numberwithCommas(
                                          stripNonNumeric(second.in_patient_limit))}</span>
                                      </div>
                                    </td>
                                  )}
                                  {this.state.plans_to_compare[2] !==
                                    undefined && (
                                    <td>
                                      <div className="c-star-rating">
                                        <span>???{
                                    
                                    this.numberwithCommas(
                                      stripNonNumeric(third.in_patient_limit))}</span>
                                      </div>
                                    </td>
                                  )}
                                </tr>

                                <tr>
                                  <th scope="row">
                                    <span className="display--block">
                                      Intensive Care
                                    </span>
                                  </th>
                                  <td>
                                    <div className="c-star-rating">
                                      <img
                                        src={
                                          first.benefits.includes("intensive_care")
                                            ? check
                                            : uncheck
                                        }
                                        className=""
                                        alt=""
                                      />
                                    </div>
                                  </td>
                                  {this.state.plans_to_compare[1] !==
                                    undefined && (
                                    <td>
                                      <div className="c-star-rating">
                                        <img
                                          src={
                                            second.benefits.includes("intensive_care")
                                              ? check
                                              : uncheck
                                          }
                                          className=""
                                          alt=""
                                        />
                                      </div>
                                    </td>
                                  )}
                                  {this.state.plans_to_compare[2] !==
                                    undefined && (
                                    <td>
                                      <div className="c-star-rating">
                                        <img
                                          src={
                                            third.benefits.includes("intensive_care")
                                              ? check
                                              : uncheck
                                          }
                                          className=""
                                          alt=""
                                        />
                                      </div>
                                    </td>
                                  )}
                                </tr>

                                <tr>
                                  <th scope="row">
                                    <span className="display--block">
                                     Telemedicine
                                    </span>
                                  </th>
                                  <td>
                                    <div className="c-star-rating">
                                      <img
                                        src={
                                          first.benefits.includes("telemedicine")
                                            ? check
                                            : uncheck
                                        }
                                        className=""
                                        alt=""
                                      />
                                    </div>
                                  </td>
                                  {this.state.plans_to_compare[1] !==
                                    undefined && (
                                    <td>
                                      <div className="c-star-rating">
                                        <img
                                          src={
                                            second.benefits.includes("telemedicine")
                                              ? check
                                              : uncheck
                                          }
                                          className=""
                                          alt=""
                                        />
                                      </div>
                                    </td>
                                  )}
                                  {this.state.plans_to_compare[2] !==
                                    undefined && (
                                    <td>
                                      <div className="c-star-rating">
                                        <img
                                          src={
                                            third.benefits.includes("telemedicine")
                                            ? check
                                              : uncheck
                                          }
                                          className=""
                                          alt=""
                                        />
                                      </div>
                                    </td>
                                  )}
                                </tr>

                                <tr>
                                  <th scope="row">
                                    <span className="display--block">
                                      Lab Investigations
                                    </span>
                                  </th>
                                  <td>
                                    <div className="c-star-rating">
                                      <img
                                        src={
                                          first.benefits.includes("lab_investigations")
                                            ? check
                                            : uncheck
                                        }
                                        className=""
                                        alt=""
                                      />
                                    </div>
                                  </td>
                                  {this.state.plans_to_compare[1] !==
                                    undefined && (
                                    <td>
                                      <div className="c-star-rating">
                                        <img
                                          src={
                                            second.benefits.includes("lab_investigations")
                                              ? check
                                              : uncheck
                                          }
                                          className=""
                                          alt=""
                                        />
                                      </div>
                                    </td>
                                  )}
                                  {this.state.plans_to_compare[2] !==
                                    undefined && (
                                    <td>
                                      <div className="c-star-rating">
                                        <img
                                          src={
                                            third.benefits.includes("lab_investigations")
                                              ? check
                                              : uncheck
                                          }
                                          className=""
                                          alt=""
                                        />
                                      </div>
                                    </td>
                                  )}
                                </tr>

                                <tr>
                                  <th scope="row">
                                    <span className="display--block">
                                      Congenital Abnormalities
                                    </span>
                                  </th>
                                  <td>
                                    <div className="c-star-rating">
                                      <img
                                        src={
                                          first.benefits.includes("congenital_abnormalities")
                                            ? check
                                            : uncheck
                                        }
                                        className=""
                                        alt=""
                                      />
                                    </div>
                                  </td>
                                  {this.state.plans_to_compare[1] !==
                                    undefined && (
                                    <td>
                                      <div className="c-star-rating">
                                        <img
                                          src={
                                            second.benefits.includes("congenital_abnormalities")
                                              ? check
                                              : uncheck
                                          }
                                          className=""
                                          alt=""
                                        />
                                      </div>
                                    </td>
                                  )}
                                  {this.state.plans_to_compare[2] !==
                                    undefined && (
                                    <td>
                                      <div className="c-star-rating">
                                        <img
                                          src={
                                            third.benefits.includes("congenital_abnormalities")
                                              ? check
                                              : uncheck
                                          }
                                          className=""
                                          alt=""
                                        />
                                      </div>
                                    </td>
                                  )}
                                </tr>

                                <tr>
                                  <th scope="row">
                                    <span className="display--block">
                                      Mental Health Services
                                    </span>
                                  </th>
                                  <td>
                                    <div className="c-star-rating">
                                      <img
                                        src={
                                          first.benefits.includes("mental_health_services")
                                            ? check
                                            : uncheck
                                        }
                                        className=""
                                        alt=""
                                      />
                                    </div>
                                  </td>
                                  {this.state.plans_to_compare[1] !==
                                    undefined && (
                                    <td>
                                      <div className="c-star-rating">
                                        <img
                                          src={
                                            second.benefits.includes("mental_health_services")
                                              ? check
                                              : uncheck
                                          }
                                          className=""
                                          alt=""
                                        />
                                      </div>
                                    </td>
                                  )}
                                  {this.state.plans_to_compare[2] !==
                                    undefined && (
                                    <td>
                                      <div className="c-star-rating">
                                        <img
                                          src={
                                            third.benefits.includes("mental_health_services")
                                              ? check
                                              : uncheck
                                          }
                                          className=""
                                          alt=""
                                        />
                                      </div>
                                    </td>
                                  )}
                                </tr>

                                <tr>
                                  <th scope="row">
                                    <span className="display--block">
                                      Surgeries
                                    </span>
                                  </th>
                                  <td>
                                    <div className="c-star-rating">
                                      <img
                                        src={
                                          first.benefits.includes("surgeries")
                                            ? check
                                            : uncheck
                                        }
                                        className=""
                                        alt=""
                                      />
                                    </div>
                                  </td>
                                  {this.state.plans_to_compare[1] !==
                                    undefined && (
                                    <td>
                                      <div className="c-star-rating">
                                        <img
                                          src={
                                            second.benefits.includes("surgeries")
                                              ? check
                                              : uncheck
                                          }
                                          className=""
                                          alt=""
                                        />
                                      </div>
                                    </td>
                                  )}
                                  {this.state.plans_to_compare[2] !==
                                    undefined && (
                                    <td>
                                      <div className="c-star-rating">
                                        <img
                                          src={
                                            third.benefits.includes("surgeries")
                                              ? check
                                              : uncheck
                                          }
                                          className=""
                                          alt=""
                                        />
                                      </div>
                                    </td>
                                  )}
                                </tr>

                                <tr>
                                  <th scope="row">
                                    <span className="display--block">
                                      Neonatal Care
                                    </span>
                                  </th>
                                  <td>
                                    <div className="c-star-rating">
                                      <img
                                        src={
                                          first.benefits.includes("neonatal_care")
                                            ? check
                                            : uncheck
                                        }
                                        className=""
                                        alt=""
                                      />
                                    </div>
                                  </td>
                                  {this.state.plans_to_compare[1] !==
                                    undefined && (
                                    <td>
                                      <div className="c-star-rating">
                                        <img
                                          src={
                                            second.benefits.includes("neonatal_care")
                                              ? check
                                              : uncheck
                                          }
                                          className=""
                                          alt=""
                                        />
                                      </div>
                                    </td>
                                  )}
                                  {this.state.plans_to_compare[2] !==
                                    undefined && (
                                    <td>
                                      <div className="c-star-rating">
                                        <img
                                          src={
                                            third.benefits.includes("neonatal_care")
                                              ? check
                                              : uncheck
                                          }
                                          className=""
                                          alt=""
                                        />
                                      </div>
                                    </td>
                                  )}
                                </tr>

                                <tr>
                                  <th scope="row">
                                    <span className="display--block">
                                      Optical Care
                                    </span>
                                  </th>
                                  <td>
                                    <div className="c-star-rating">
                                      <img
                                        src={
                                          first.benefits.includes("optical_care")
                                            ? check
                                            : uncheck
                                        }
                                        className=""
                                        alt=""
                                      />
                                    </div>
                                  </td>
                                  {this.state.plans_to_compare[1] !==
                                    undefined && (
                                    <td>
                                      <div className="c-star-rating">
                                        <img
                                          src={
                                            second.benefits.includes("optical_care")
                                              ? check
                                              : uncheck
                                          }
                                          className=""
                                          alt=""
                                        />
                                      </div>
                                    </td>
                                  )}
                                  {this.state.plans_to_compare[2] !==
                                    undefined && (
                                    <td>
                                      <div className="c-star-rating">
                                        <img
                                          src={
                                            third.benefits.includes("optical_care")
                                              ? check
                                              : uncheck
                                          }
                                          className=""
                                          alt=""
                                        />
                                      </div>
                                    </td>
                                  )}
                                </tr>

                                <tr>
                                  <th scope="row">
                                    <span className="display--block">
                                      Out-patient Limit
                                    </span>
                                  </th>
                                  <td>
                                    <div className="c-star-rating">
                                      <span>???{
                                    
                                    this.numberwithCommas(
                                      stripNonNumeric(first.out_patient_limit))}</span>
                                    </div>
                                  </td>
                                  {this.state.plans_to_compare[1] !==
                                    undefined && (
                                    <td>
                                      <div className="c-star-rating">
                                        <span>???{
                                    
                                    this.numberwithCommas(
                                      stripNonNumeric(second.out_patient_limit))}</span>
                                      </div>
                                    </td>
                                  )}
                                  {this.state.plans_to_compare[2] !==
                                    undefined && (
                                    <td>
                                      <div className="c-star-rating">
                                        <span>???{
                                    
                                    this.numberwithCommas(
                                      stripNonNumeric(third.out_patient_limit))}</span>
                                      </div>
                                    </td>
                                  )}
                                </tr>

                                <tr>
                                  <th scope="row">
                                    <span className="display--block">
                                      Physiotherapy
                                    </span>
                                  </th>
                                  <td>
                                    <div className="c-star-rating">
                                      <img
                                        src={
                                          first.benefits.includes("physiotherapy")
                                            ? check
                                            : uncheck
                                        }
                                        className=""
                                        alt=""
                                      />

                                     
                                    </div>
                                  </td>
                                  {this.state.plans_to_compare[1] !==
                                    undefined && (
                                    <td>
                                      <div className="c-star-rating">
                                        <img
                                          src={
                                            second.benefits.includes("physiotherapy")
                                              ? check
                                              : uncheck
                                          }
                                          className=""
                                          alt=""
                                        />
                                      </div>
                                    </td>
                                  )}
                                  {this.state.plans_to_compare[2] !==
                                    undefined && (
                                    <td>
                                      <div className="c-star-rating">
                                        <img
                                          src={
                                            third.benefits.includes("physiotherapy")
                                              ? check
                                              : uncheck
                                          }
                                          className=""
                                          alt=""
                                        />
                                      </div>
                                    </td>
                                  )}
                                </tr>

                                <tr>
                                  <th scope="row">
                                    <span className="display--block">
                                      Plain Contrast Xrays
                                    </span>
                                  </th>
                                  <td>
                                    <div className="c-star-rating">
                                      <img
                                        src={
                                          first.benefits.includes("plain_contrast_xrays")
                                            ? check
                                            : uncheck
                                        }
                                        className=""
                                        alt=""
                                      />
                                    </div>
                                  </td>
                                  {this.state.plans_to_compare[1] !==
                                    undefined && (
                                    <td>
                                      <div className="c-star-rating">
                                        <img
                                          src={
                                            second.benefits.includes("plain_contrast_xrays")
                                              ? check
                                              : uncheck
                                          }
                                          className=""
                                          alt=""
                                        />
                                      </div>
                                    </td>
                                  )}
                                  {this.state.plans_to_compare[2] !==
                                    undefined && (
                                    <td>
                                      <div className="c-star-rating">
                                        <img
                                          src={
                                            third.benefits.includes("plain_contrast_xrays")
                                              ? check
                                              : uncheck
                                          }
                                          className=""
                                          alt=""
                                        />
                                      </div>
                                    </td>
                                  )}
                                </tr>

                                <tr>
                                  <th scope="row">
                                    <span className="display--block">
                                      Postnatal Care
                                    </span>
                                  </th>
                                  <td>
                                    <div className="c-star-rating">
                                      <img
                                        src={
                                          first.benefits.includes("postnatal_care")
                                            ? check
                                            : uncheck
                                        }
                                        className=""
                                        alt=""
                                      />
                                    </div>
                                  </td>
                                  {this.state.plans_to_compare[1] !==
                                    undefined && (
                                    <td>
                                      <div className="c-star-rating">
                                        <img
                                          src={
                                            second.benefits.includes("postnatal_care")
                                              ? check
                                              : uncheck
                                          }
                                          className=""
                                          alt=""
                                        />
                                      </div>
                                    </td>
                                  )}
                                  {this.state.plans_to_compare[2] !==
                                    undefined && (
                                    <td>
                                      <div className="c-star-rating">
                                        <img
                                          src={
                                            third.benefits.includes("postnatal_care")
                                              ? check
                                              : uncheck
                                          }
                                          className=""
                                          alt=""
                                        />
                                      </div>
                                    </td>
                                  )}
                                </tr>

                                <tr>
                                  <th scope="row">
                                    <span className="display--block">
                                      Outpatient Prescribed Drugs
                                    </span>
                                  </th>
                                  <td>
                                    <div className="c-star-rating">
                                      <img
                                        src={
                                          first.benefits.includes("outpatient_prescribed_drugs")
                                            
                                            ? check
                                            : uncheck
                                        }
                                        className=""
                                        alt=""
                                      />
                                    </div>
                                  </td>
                                  {this.state.plans_to_compare[1] !==
                                    undefined && (
                                    <td>
                                      <div className="c-star-rating">
                                        <img
                                          src={
                                            second.benefits.includes("outpatient_prescribed_drugs")
                                              ? check
                                              : uncheck
                                          }
                                          className=""
                                          alt=""
                                        />
                                      </div>
                                    </td>
                                  )}
                                  {this.state.plans_to_compare[2] !==
                                    undefined && (
                                    <td>
                                      <div className="c-star-rating">
                                        <img
                                          src={
                                            third.benefits.includes("outpatient_prescribed_drugs")
                                            ? check
                                              : uncheck
                                          }
                                          className=""
                                          alt=""
                                        />
                                      </div>
                                    </td>
                                  )}
                                </tr>

                                <tr>
                                  <th scope="row">
                                    <span className="display--block">
                                      Renal Dialysis
                                    </span>
                                  </th>
                                  <td>
                                    <div className="c-star-rating">
                                      <img
                                        src={
                                          first.benefits.includes("renal_dialysis")
                                            ? check
                                            : uncheck
                                        }
                                        className=""
                                        alt=""
                                      />
                                    </div>
                                  </td>
                                  {this.state.plans_to_compare[1] !==
                                    undefined && (
                                    <td>
                                      <div className="c-star-rating">
                                        <img
                                          src={
                                            second.benefits.includes("renal_dialysis")
                                              ? check
                                              : uncheck
                                          }
                                          className=""
                                          alt=""
                                        />
                                      </div>
                                    </td>
                                  )}
                                  {this.state.plans_to_compare[2] !==
                                    undefined && (
                                    <td>
                                      <div className="c-star-rating">
                                        <img
                                          src={
                                            third.benefits.includes("renal_dialysis")
                                              ? check
                                              : uncheck
                                          }
                                          className=""
                                          alt=""
                                        />
                                      </div>
                                    </td>
                                  )}
                                </tr>

                                <tr>
                                  <th scope="row">
                                    <span className="display--block">
                                      Routine Immunization
                                    </span>
                                  </th>
                                  <td>
                                    <div className="c-star-rating">
                                      <span>
                                      <img
                                        src={
                                          first.benefits.includes("routine_immunization")? check
                                              : uncheck
                                        }
                                        className=""
                                        alt=""
                                      />
                                        </span>
                                    </div>
                                  </td>
                                  {this.state.plans_to_compare[1] !==
                                    undefined && (
                                    <td>
                                      <div className="c-star-rating">
                                        <span>
                                        <img
                                        src={
                                          second.benefits.includes("routine_immunization")? check
                                              : uncheck
                                        }
                                        className=""
                                        alt=""
                                      />
                                        </span>
                                      </div>
                                    </td>
                                  )}
                                  {this.state.plans_to_compare[2] !==
                                    undefined && (
                                    <td>
                                      <div className="c-star-rating">
                                        <span>
                                        <img
                                        src={
                                          third.benefits.includes("routine_immunization")? check
                                              : uncheck
                                        }
                                        className=""
                                        alt=""
                                      />
                                          
                                        </span>
                                      </div>
                                    </td>
                                  )}
                                </tr>

                                <tr>
                                  <th scope="row">
                                    <span className="display--block">
                                      Specialist Consultation
                                    </span>
                                  </th>
                                  <td>
                                    <div className="c-star-rating">
                                      <img
                                        src={
                                          first.benefits.includes("specialist_consultation")? check
                                          : uncheck
                                        }
                                        className=""
                                        alt=""
                                      />
                                    </div>
                                  </td>
                                  {this.state.plans_to_compare[1] !==
                                    undefined && (
                                    <td>
                                      <div className="c-star-rating">
                                        <img
                                          src={
                                            second.benefits.includes("specialist_consultation ")
                                              ? check
                                              : uncheck
                                          }
                                          className=""
                                          alt=""
                                        />
                                      </div>
                                    </td>
                                  )}
                                  {this.state.plans_to_compare[2] !==
                                    undefined && (
                                    <td>
                                      <div className="c-star-rating">
                                        <img
                                          src={
                                            third.benefits.includes("specialist_consultation")
                                              ? check
                                              : uncheck
                                          }
                                          className=""
                                          alt=""
                                        />
                                      </div>
                                    </td>
                                  )}
                                </tr>

                                <tr>
                                  <th scope="row">
                                    <span className="display--block">
                                      Ultrasound Scans
                                    </span>
                                  </th>
                                  <td>
                                    <div className="c-star-rating">
                                      <img
                                        src={
                                          first.benefits.includes("ultrasound_scans")
                                            ? check
                                            : uncheck
                                        }
                                        className=""
                                        alt=""
                                      />
                                    </div>
                                  </td>
                                  {this.state.plans_to_compare[1] !==
                                    undefined && (
                                    <td>
                                      <div className="c-star-rating">
                                        <img
                                          src={
                                            second.benefits.includes("ultrasound_scans")
                                              ? check
                                              : uncheck
                                          }
                                          className=""
                                          alt=""
                                        />
                                      </div>
                                    </td>
                                  )}
                                  {this.state.plans_to_compare[2] !==
                                    undefined && (
                                    <td>
                                      <div className="c-star-rating">
                                        <img
                                          src={
                                            third.benefits.includes("ultrasound_scans") 
                                              ? check
                                              : uncheck
                                          }
                                          className=""
                                          alt=""
                                        />
                                      </div>
                                    </td>
                                  )}
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </section>
{/* 

                        <section className="c-detail-section margin-bottom--4">
                          <h2 className="border-bottom--1 border--dark padding-bottom--2">
                            <button
                              className="ds-h2 text-align--left sans fill--transparent"
                              aria-expanded="false"
                              onClick={this.toggleOtherServicesCollapsible}
                            >
                              Details
                              {this.state.collapse_other_services ? (
                                <FontAwesomeIcon
                                  className="fas md-margin-right--1"
                                  icon={faChevronDown}
                                />
                              ) : (
                                <FontAwesomeIcon
                                  className="fas md-margin-right--1"
                                  icon={faChevronUp}
                                />
                              )}
                            </button>
                          </h2>
                          <div
                            hidden={
                              this.state.collapse_other_services ? true : false
                            }
                          >
                            <table className="c-details-table">
                              <tbody className="valign--top">
                                <tr className="border-bottom--2">
                                  <th scope="row">
                                    <span className="display--block">
                                      Accidents & Emergencies
                                    </span>
                                  </th>
                                  <td>
                                    <div className="c-star-rating">
                                      <span>{first.accidents_emergencies}</span>
                                    </div>
                                  </td>
                                  {this.state.plans_to_compare[1] !==
                                    undefined && (
                                    <td>
                                      <div className="c-star-rating">
                                        <span>
                                          {second.accidents_emergencies}
                                        </span>
                                      </div>
                                    </td>
                                  )}
                                  {this.state.plans_to_compare[2] !==
                                    undefined && (
                                    <td>
                                      <div className="c-star-rating">
                                        <span>
                                          {third.accidents_emergencies}
                                        </span>
                                      </div>
                                    </td>
                                  )}
                                </tr>
                                <tr>
                                  <th scope="row">
                                    <span className="display--block">
                                      Additional Immunization
                                    </span>
                                  </th>
                                  <td>
                                    <div className="c-star-rating">
                                      <span>
                                        {first.additional_ammunization}
                                      </span>
                                    </div>
                                  </td>
                                  {this.state.plans_to_compare[1] !==
                                    undefined && (
                                    <td>
                                      <div className="c-star-rating">
                                        <span>
                                          {second.additional_ammunization}
                                        </span>
                                      </div>
                                    </td>
                                  )}
                                  {this.state.plans_to_compare[2] !==
                                    undefined && (
                                    <td>
                                      <div className="c-star-rating">
                                        <span>
                                          {third.additional_ammunization}
                                        </span>
                                      </div>
                                    </td>
                                  )}
                                </tr>
                                <tr>
                                  <th scope="row">
                                    <span className="display--block">
                                      Admission Feeding
                                    </span>
                                  </th>
                                  <td>
                                    <div className="c-star-rating">
                                      <span>{first.admission_feeding}</span>
                                    </div>
                                  </td>
                                  {this.state.plans_to_compare[1] !==
                                    undefined && (
                                    <td>
                                      <div className="c-star-rating">
                                        <span>{second.admission_feeding}</span>
                                      </div>
                                    </td>
                                  )}
                                  {this.state.plans_to_compare[2] !==
                                    undefined && (
                                    <td>
                                      <div className="c-star-rating">
                                        <span>{third.admission_feeding}</span>
                                      </div>
                                    </td>
                                  )}
                                </tr>
                                <tr>
                                  <th scope="row">
                                    <span className="display--block">
                                      Admissions per annum
                                    </span>
                                  </th>
                                  <td>
                                    <div className="c-star-rating">
                                      <span>{first.admissions_per_annum}</span>
                                    </div>
                                  </td>
                                  {this.state.plans_to_compare[1] !==
                                    undefined && (
                                    <td>
                                      <div className="c-star-rating">
                                        <span>
                                          {second.admissions_per_annum}
                                        </span>
                                      </div>
                                    </td>
                                  )}
                                  {this.state.plans_to_compare[2] !==
                                    undefined && (
                                    <td>
                                      <div className="c-star-rating">
                                        <span>
                                          {third.admissions_per_annum}
                                        </span>
                                      </div>
                                    </td>
                                  )}
                                </tr>

                                <tr>
                                  <th scope="row">
                                    <span className="display--block">
                                      Antenatal Care Delivery
                                    </span>
                                  </th>
                                  <td>
                                    <div className="c-star-rating">
                                      <span>
                                        {first.antenatal_care_delivery}
                                      </span>
                                    </div>
                                  </td>
                                  {this.state.plans_to_compare[1] !==
                                    undefined && (
                                    <td>
                                      <div className="c-star-rating">
                                        <span>
                                          {second.antenatal_care_delivery}
                                        </span>
                                      </div>
                                    </td>
                                  )}
                                  {this.state.plans_to_compare[2] !==
                                    undefined && (
                                    <td>
                                      <div className="c-star-rating">
                                        <span>
                                          {third.antenatal_care_delivery}
                                        </span>
                                      </div>
                                    </td>
                                  )}
                                </tr>

                                <tr>
                                  <th scope="row">
                                    <span className="display--block">
                                      Cancer Care
                                    </span>
                                  </th>
                                  <td>
                                    <div className="c-star-rating">
                                      <span>{first.cancer_care}</span>
                                    </div>
                                  </td>
                                  {this.state.plans_to_compare[1] !==
                                    undefined && (
                                    <td>
                                      <div className="c-star-rating">
                                        <span>{second.cancer_care}</span>
                                      </div>
                                    </td>
                                  )}
                                  {this.state.plans_to_compare[2] !==
                                    undefined && (
                                    <td>
                                      <div className="c-star-rating">
                                        <span>{third.cancer_care}</span>
                                      </div>
                                    </td>
                                  )}
                                </tr>
                                <tr>
                                  <th scope="row">
                                    <span className="display--block">
                                      Covid 19 Treatment
                                    </span>
                                  </th>
                                  <td>
                                    <div className="c-star-rating">
                                      <span>{first.covid_19_treatment}</span>
                                    </div>
                                  </td>
                                  {this.state.plans_to_compare[1] !==
                                    undefined && (
                                    <td>
                                      <div className="c-star-rating">
                                        <span>{second.covid_19_treatment}</span>
                                      </div>
                                    </td>
                                  )}
                                  {this.state.plans_to_compare[2] !==
                                    undefined && (
                                    <td>
                                      <div className="c-star-rating">
                                        <span>{third.covid_19_treatment}</span>
                                      </div>
                                    </td>
                                  )}
                                </tr>

                                <tr>
                                  <th scope="row">
                                    <span className="display--block">
                                      Dental Care
                                    </span>
                                  </th>
                                  <td>
                                    <div className="c-star-rating">
                                      <span>{first.dental_care}</span>
                                    </div>
                                  </td>
                                  {this.state.plans_to_compare[1] !==
                                    undefined && (
                                    <td>
                                      <div className="c-star-rating">
                                        <span>{second.dental_care}</span>
                                      </div>
                                    </td>
                                  )}
                                  {this.state.plans_to_compare[2] !==
                                    undefined && (
                                    <td>
                                      <div className="c-star-rating">
                                        <span>{third.dental_care}</span>
                                      </div>
                                    </td>
                                  )}
                                </tr>

                                <tr>
                                  <th scope="row">
                                    <span className="display--block">
                                      Plastic Surgeries
                                    </span>
                                  </th>
                                  <td>
                                    <div className="c-star-rating">
                                      <span>{first.plastic_surgeries}</span>
                                    </div>
                                  </td>
                                  {this.state.plans_to_compare[1] !==
                                    undefined && (
                                    <td>
                                      <div className="c-star-rating">
                                        <span>{second.plastic_surgeries}</span>
                                      </div>
                                    </td>
                                  )}
                                  {this.state.plans_to_compare[2] !==
                                    undefined && (
                                    <td>
                                      <div className="c-star-rating">
                                        <span>{third.plastic_surgeries}</span>
                                      </div>
                                    </td>
                                  )}
                                </tr>

                                <tr>
                                  <th scope="row">
                                    <span className="display--block">
                                      ENT Care
                                    </span>
                                  </th>
                                  <td>
                                    <div className="c-star-rating">
                                      <span>{first.ent_care}</span>
                                    </div>
                                  </td>
                                  {this.state.plans_to_compare[1] !==
                                    undefined && (
                                    <td>
                                      <div className="c-star-rating">
                                        <span>{second.ent_care}</span>
                                      </div>
                                    </td>
                                  )}
                                  {this.state.plans_to_compare[2] !==
                                    undefined && (
                                    <td>
                                      <div className="c-star-rating">
                                        <span>{third.ent_care}</span>
                                      </div>
                                    </td>
                                  )}
                                </tr>

                                <tr>
                                  <th scope="row">
                                    <span className="display--block">
                                      Evacuations
                                    </span>
                                  </th>
                                  <td>
                                    <div className="c-star-rating">
                                      <span>{first.evacuations}</span>
                                    </div>
                                  </td>
                                  {this.state.plans_to_compare[1] !==
                                    undefined && (
                                    <td>
                                      <div className="c-star-rating">
                                        <span>{second.evacuations}</span>
                                      </div>
                                    </td>
                                  )}
                                  {this.state.plans_to_compare[2] !==
                                    undefined && (
                                    <td>
                                      <div className="c-star-rating">
                                        <span>{third.evacuations}</span>
                                      </div>
                                    </td>
                                  )}
                                </tr>

                                <tr>
                                  <th scope="row">
                                    <span className="display--block">
                                      Family Planning Services
                                    </span>
                                  </th>
                                  <td>
                                    <div className="c-star-rating">
                                      <span>
                                        {first.family_planning_services}
                                      </span>
                                    </div>
                                  </td>
                                  {this.state.plans_to_compare[1] !==
                                    undefined && (
                                    <td>
                                      <div className="c-star-rating">
                                        <span>
                                          {second.family_planning_services}
                                        </span>
                                      </div>
                                    </td>
                                  )}
                                  {this.state.plans_to_compare[2] !==
                                    undefined && (
                                    <td>
                                      <div className="c-star-rating">
                                        <span>
                                          {third.family_planning_services}
                                        </span>
                                      </div>
                                    </td>
                                  )}
                                </tr>

                                <tr>
                                  <th scope="row">
                                    <span className="display--block">
                                      Fertility Services
                                    </span>
                                  </th>
                                  <td>
                                    <div className="c-star-rating">
                                      <span>{first.fertility_services}</span>
                                    </div>
                                  </td>
                                  {this.state.plans_to_compare[1] !==
                                    undefined && (
                                    <td>
                                      <div className="c-star-rating">
                                        <span>{second.fertility_services}</span>
                                      </div>
                                    </td>
                                  )}
                                  {this.state.plans_to_compare[2] !==
                                    undefined && (
                                    <td>
                                      <div className="c-star-rating">
                                        <span>{third.fertility_services}</span>
                                      </div>
                                    </td>
                                  )}
                                </tr>

                                <tr>
                                  <th scope="row">
                                    <span className="display--block">
                                      General Consultation
                                    </span>
                                  </th>
                                  <td>
                                    <div className="c-star-rating">
                                      <span>{first.general_consultation}</span>
                                    </div>
                                  </td>
                                  {this.state.plans_to_compare[1] !==
                                    undefined && (
                                    <td>
                                      <div className="c-star-rating">
                                        <span>
                                          {second.general_consultation}
                                        </span>
                                      </div>
                                    </td>
                                  )}
                                  {this.state.plans_to_compare[2] !==
                                    undefined && (
                                    <td>
                                      <div className="c-star-rating">
                                        <span>
                                          {third.general_consultation}
                                        </span>
                                      </div>
                                    </td>
                                  )}
                                </tr>

                                <tr>
                                  <th scope="row">
                                    <span className="display--block">
                                      HIV/ AIDS Treatment
                                    </span>
                                  </th>
                                  <td>
                                    <div className="c-star-rating">
                                      <span>{first.hiv_aids_treatment}</span>
                                    </div>
                                  </td>
                                  {this.state.plans_to_compare[1] !==
                                    undefined && (
                                    <td>
                                      <div className="c-star-rating">
                                        <span>{second.hiv_aids_treatment}</span>
                                      </div>
                                    </td>
                                  )}
                                  {this.state.plans_to_compare[2] !==
                                    undefined && (
                                    <td>
                                      <div className="c-star-rating">
                                        <span>{third.hiv_aids_treatment}</span>
                                      </div>
                                    </td>
                                  )}
                                </tr>

                                <tr>
                                  <th scope="row">
                                    <span className="display--block">
                                      Hospital Admissions
                                    </span>
                                  </th>
                                  <td>
                                    <div className="c-star-rating">
                                      <span>{first.hospital_addmissions}</span>
                                    </div>
                                  </td>
                                  {this.state.plans_to_compare[1] !==
                                    undefined && (
                                    <td>
                                      <div className="c-star-rating">
                                        <span>
                                          {second.hospital_addmissions}
                                        </span>
                                      </div>
                                    </td>
                                  )}
                                  {this.state.plans_to_compare[2] !==
                                    undefined && (
                                    <td>
                                      <div className="c-star-rating">
                                        <span>{third.hospital_admissions}</span>
                                      </div>
                                    </td>
                                  )}
                                </tr>

                                <tr>
                                  <th scope="row">
                                    <span className="display--block">
                                      Hospital Category
                                    </span>
                                  </th>
                                  <td>
                                    <div className="c-star-rating">
                                      <span>
                                        {first.hmo.providers.map(h => h.category[0], ", ")}
                                      </span>
                                    </div>
                                  </td>
                                  {this.state.plans_to_compare[1] !==
                                    undefined && (
                                    <td>
                                      <div className="c-star-rating">
                                        <span>
                                          {second.hmo.providers.map(h => h.category[0], ", ")}
                                        </span>
                                      </div>
                                    </td>
                                  )}
                                  {this.state.plans_to_compare[2] !==
                                    undefined && (
                                    <td>
                                      <div className="c-star-rating">
                                        <span>
                                          {third.hmo.providers.map(h => h.category[0], ", ")}
                                        </span>
                                      </div>
                                    </td>
                                  )}
                                </tr>

                                <tr>
                                  <th scope="row">
                                    <span className="display--block">
                                      In-patient Limit
                                    </span>
                                  </th>
                                  <td>
                                    <div className="c-star-rating">
                                      <span>{first.in_patient_limit}</span>
                                    </div>
                                  </td>
                                  {this.state.plans_to_compare[1] !==
                                    undefined && (
                                    <td>
                                      <div className="c-star-rating">
                                        <span>{second.in_patient_limit}</span>
                                      </div>
                                    </td>
                                  )}
                                  {this.state.plans_to_compare[2] !==
                                    undefined && (
                                    <td>
                                      <div className="c-star-rating">
                                        <span>{third.in_patient_limit}</span>
                                      </div>
                                    </td>
                                  )}
                                </tr>

                                <tr>
                                  <th scope="row">
                                    <span className="display--block">
                                      Intensive Care
                                    </span>
                                  </th>
                                  <td>
                                    <div className="c-star-rating">
                                      <span>{first.intensive_care}</span>
                                    </div>
                                  </td>
                                  {this.state.plans_to_compare[1] !==
                                    undefined && (
                                    <td>
                                      <div className="c-star-rating">
                                        <span>{second.intensive_care}</span>
                                      </div>
                                    </td>
                                  )}
                                  {this.state.plans_to_compare[2] !==
                                    undefined && (
                                    <td>
                                      <div className="c-star-rating">
                                        <span>{third.intensive_care}</span>
                                      </div>
                                    </td>
                                  )}
                                </tr>

                                <tr>
                                  <th scope="row">
                                    <span className="display--block">
                                      Intermediate Surgeries
                                    </span>
                                  </th>
                                  <td>
                                    <div className="c-star-rating">
                                      <span>{first.telemedicine}</span>
                                    </div>
                                  </td>
                                  {this.state.plans_to_compare[1] !==
                                    undefined && (
                                    <td>
                                      <div className="c-star-rating">
                                        <span>{second.telemedicine}</span>
                                      </div>
                                    </td>
                                  )}
                                  {this.state.plans_to_compare[2] !==
                                    undefined && (
                                    <td>
                                      <div className="c-star-rating">
                                        <span>{third.telemedicine}</span>
                                      </div>
                                    </td>
                                  )}
                                </tr>

                                <tr>
                                  <th scope="row">
                                    <span className="display--block">
                                      Lab Investigations
                                    </span>
                                  </th>
                                  <td>
                                    <div className="c-star-rating">
                                      <span>{first.lab_investigations}</span>
                                    </div>
                                  </td>
                                  {this.state.plans_to_compare[1] !==
                                    undefined && (
                                    <td>
                                      <div className="c-star-rating">
                                        <span>{second.lab_investigations}</span>
                                      </div>
                                    </td>
                                  )}
                                  {this.state.plans_to_compare[2] !==
                                    undefined && (
                                    <td>
                                      <div className="c-star-rating">
                                        <span>{third.lab_investigations}</span>
                                      </div>
                                    </td>
                                  )}
                                </tr>

                                <tr>
                                  <th scope="row">
                                    <span className="display--block">
                                      Congenital Abnormalities
                                    </span>
                                  </th>
                                  <td>
                                    <div className="c-star-rating">
                                      <span>
                                        {first.congenital_abnormalities}
                                      </span>
                                    </div>
                                  </td>
                                  {this.state.plans_to_compare[1] !==
                                    undefined && (
                                    <td>
                                      <div className="c-star-rating">
                                        <span>
                                          {second.congenital_abnormalities}
                                        </span>
                                      </div>
                                    </td>
                                  )}
                                  {this.state.plans_to_compare[2] !==
                                    undefined && (
                                    <td>
                                      <div className="c-star-rating">
                                        <span>
                                          {third.congenital_abnormalities}
                                        </span>
                                      </div>
                                    </td>
                                  )}
                                </tr>

                                <tr>
                                  <th scope="row">
                                    <span className="display--block">
                                      Mental Health Services
                                    </span>
                                  </th>
                                  <td>
                                    <div className="c-star-rating">
                                      <span>
                                        {first.mental_health_services}
                                      </span>
                                    </div>
                                  </td>
                                  {this.state.plans_to_compare[1] !==
                                    undefined && (
                                    <td>
                                      <div className="c-star-rating">
                                        <span>
                                          {second.mental_health_services}
                                        </span>
                                      </div>
                                    </td>
                                  )}
                                  {this.state.plans_to_compare[2] !==
                                    undefined && (
                                    <td>
                                      <div className="c-star-rating">
                                        <span>
                                          {third.mental_health_services}
                                        </span>
                                      </div>
                                    </td>
                                  )}
                                </tr>

                                <tr>
                                  <th scope="row">
                                    <span className="display--block">
                                      Surgeries
                                    </span>
                                  </th>
                                  <td>
                                    <div className="c-star-rating">
                                      <span>{first.surgeries}</span>
                                    </div>
                                  </td>
                                  {this.state.plans_to_compare[1] !==
                                    undefined && (
                                    <td>
                                      <div className="c-star-rating">
                                        <span>{second.surgeries}</span>
                                      </div>
                                    </td>
                                  )}
                                  {this.state.plans_to_compare[2] !==
                                    undefined && (
                                    <td>
                                      <div className="c-star-rating">
                                        <span>{third.surgeries}</span>
                                      </div>
                                    </td>
                                  )}
                                </tr>

                                <tr>
                                  <th scope="row">
                                    <span className="display--block">
                                      Neonatal Care
                                    </span>
                                  </th>
                                  <td>
                                    <div className="c-star-rating">
                                      <span>{first.neonatal_care}</span>
                                    </div>
                                  </td>
                                  {this.state.plans_to_compare[1] !==
                                    undefined && (
                                    <td>
                                      <div className="c-star-rating">
                                        <span>{second.neonatal_care}</span>
                                      </div>
                                    </td>
                                  )}
                                  {this.state.plans_to_compare[2] !==
                                    undefined && (
                                    <td>
                                      <div className="c-star-rating">
                                        <span>{third.neonatal_care}</span>
                                      </div>
                                    </td>
                                  )}
                                </tr>

                                <tr>
                                  <th scope="row">
                                    <span className="display--block">
                                      Optical Care
                                    </span>
                                  </th>
                                  <td>
                                    <div className="c-star-rating">
                                      <span>{first.optical_care}</span>
                                    </div>
                                  </td>
                                  {this.state.plans_to_compare[1] !==
                                    undefined && (
                                    <td>
                                      <div className="c-star-rating">
                                        <span>{second.optical_care}</span>
                                      </div>
                                    </td>
                                  )}
                                  {this.state.plans_to_compare[2] !==
                                    undefined && (
                                    <td>
                                      <div className="c-star-rating">
                                        <span>{third.optical_care}</span>
                                      </div>
                                    </td>
                                  )}
                                </tr>

                                <tr>
                                  <th scope="row">
                                    <span className="display--block">
                                      Out-patient Limit
                                    </span>
                                  </th>
                                  <td>
                                    <div className="c-star-rating">
                                      <span>{first.out_patient_limit}</span>
                                    </div>
                                  </td>
                                  {this.state.plans_to_compare[1] !==
                                    undefined && (
                                    <td>
                                      <div className="c-star-rating">
                                        <span>{second.out_patient_limit}</span>
                                      </div>
                                    </td>
                                  )}
                                  {this.state.plans_to_compare[2] !==
                                    undefined && (
                                    <td>
                                      <div className="c-star-rating">
                                        <span>{third.out_patient_limit}</span>
                                      </div>
                                    </td>
                                  )}
                                </tr>

                                <tr>
                                  <th scope="row">
                                    <span className="display--block">
                                      Physiotherapy
                                    </span>
                                  </th>
                                  <td>
                                    <div className="c-star-rating">
                                      <span>{first.physiotherapy}</span>
                                    </div>
                                  </td>
                                  {this.state.plans_to_compare[1] !==
                                    undefined && (
                                    <td>
                                      <div className="c-star-rating">
                                        <span>{second.physiotherapy}</span>
                                      </div>
                                    </td>
                                  )}
                                  {this.state.plans_to_compare[2] !==
                                    undefined && (
                                    <td>
                                      <div className="c-star-rating">
                                        <span>{third.physiotherapy}</span>
                                      </div>
                                    </td>
                                  )}
                                </tr>

                                <tr>
                                  <th scope="row">
                                    <span className="display--block">
                                      Plain Contrast Xrays
                                    </span>
                                  </th>
                                  <td>
                                    <div className="c-star-rating">
                                      <span>{first.plain_contrast_xrays}</span>
                                    </div>
                                  </td>
                                  {this.state.plans_to_compare[1] !==
                                    undefined && (
                                    <td>
                                      <div className="c-star-rating">
                                        <span>
                                          {second.plain_contrast_xrays}
                                        </span>
                                      </div>
                                    </td>
                                  )}
                                  {this.state.plans_to_compare[2] !==
                                    undefined && (
                                    <td>
                                      <div className="c-star-rating">
                                        <span>
                                          {third.plain_contrast_xrays}
                                        </span>
                                      </div>
                                    </td>
                                  )}
                                </tr>

                                <tr>
                                  <th scope="row">
                                    <span className="display--block">
                                      Postnatal Care
                                    </span>
                                  </th>
                                  <td>
                                    <div className="c-star-rating">
                                      <span>{first.postnatal_care}</span>
                                    </div>
                                  </td>
                                  {this.state.plans_to_compare[1] !==
                                    undefined && (
                                    <td>
                                      <div className="c-star-rating">
                                        <span>{second.postnatal_care}</span>
                                      </div>
                                    </td>
                                  )}
                                  {this.state.plans_to_compare[2] !==
                                    undefined && (
                                    <td>
                                      <div className="c-star-rating">
                                        <span>{third.postnatal_care}</span>
                                      </div>
                                    </td>
                                  )}
                                </tr>

                                <tr>
                                  <th scope="row">
                                    <span className="display--block">
                                      Outpatient Prescribed Drugs
                                    </span>
                                  </th>
                                  <td>
                                    <div className="c-star-rating">
                                      <span>
                                        {first.outpatient_prescribed_drugs}
                                      </span>
                                    </div>
                                  </td>
                                  {this.state.plans_to_compare[1] !==
                                    undefined && (
                                    <td>
                                      <div className="c-star-rating">
                                        <span>
                                          {first.outpatient_prescribed_drugs}
                                        </span>
                                      </div>
                                    </td>
                                  )}
                                  {this.state.plans_to_compare[2] !==
                                    undefined && (
                                    <td>
                                      <div className="c-star-rating">
                                        <span>
                                          {third.outpatient_prescribed_drugs}
                                        </span>
                                      </div>
                                    </td>
                                  )}
                                </tr>

                                <tr>
                                  <th scope="row">
                                    <span className="display--block">
                                      Renal Dialysis
                                    </span>
                                  </th>
                                  <td>
                                    <div className="c-star-rating">
                                      <span>{first.renal_dialysis}</span>
                                    </div>
                                  </td>
                                  {this.state.plans_to_compare[1] !==
                                    undefined && (
                                    <td>
                                      <div className="c-star-rating">
                                        <span>{second.renal_dialysis}</span>
                                      </div>
                                    </td>
                                  )}
                                  {this.state.plans_to_compare[2] !==
                                    undefined && (
                                    <td>
                                      <div className="c-star-rating">
                                        <span>{third.renal_dialysis}</span>
                                      </div>
                                    </td>
                                  )}
                                </tr>

                                <tr>
                                  <th scope="row">
                                    <span className="display--block">
                                      Routine Immunization
                                    </span>
                                  </th>
                                  <td>
                                    <div className="c-star-rating">
                                      <span>{first.routine_immunization}</span>
                                    </div>
                                  </td>
                                  {this.state.plans_to_compare[1] !==
                                    undefined && (
                                    <td>
                                      <div className="c-star-rating">
                                        <span>
                                          {second.routine_immunization}
                                        </span>
                                      </div>
                                    </td>
                                  )}
                                  {this.state.plans_to_compare[2] !==
                                    undefined && (
                                    <td>
                                      <div className="c-star-rating">
                                        <span>
                                          {third.routine_immunization}
                                        </span>
                                      </div>
                                    </td>
                                  )}
                                </tr>

                                <tr>
                                  <th scope="row">
                                    <span className="display--block">
                                      Specialist Consultation
                                    </span>
                                  </th>
                                  <td>
                                    <div className="c-star-rating">
                                      <span>
                                        {first.specialist_consultation}
                                      </span>
                                    </div>
                                  </td>
                                  {this.state.plans_to_compare[1] !==
                                    undefined && (
                                    <td>
                                      <div className="c-star-rating">
                                        <span>
                                          {second.specialist_consultation}
                                        </span>
                                      </div>
                                    </td>
                                  )}
                                  {this.state.plans_to_compare[2] !==
                                    undefined && (
                                    <td>
                                      <div className="c-star-rating">
                                        <span>
                                          {third.specialist_consultation}
                                        </span>
                                      </div>
                                    </td>
                                  )}
                                </tr>

                                <tr>
                                  <th scope="row">
                                    <span className="display--block">
                                      Ultrasound Scans
                                    </span>
                                  </th>
                                  <td>
                                    <div className="c-star-rating">
                                      <span>{first.ultrasound_scans}</span>
                                    </div>
                                  </td>
                                  {this.state.plans_to_compare[1] !==
                                    undefined && (
                                    <td>
                                      <div className="c-star-rating">
                                        <span>{second.ultrasound_scans}</span>
                                      </div>
                                    </td>
                                  )}
                                  {this.state.plans_to_compare[2] !==
                                    undefined && (
                                    <td>
                                      <div className="c-star-rating">
                                        <span>{third.ultrasound_scans}</span>
                                      </div>
                                    </td>
                                  )}
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </section>
                     
                      */}
                      </div>
                    </div>
                  </div>{" "}
                </div>
              </div>

              <section className="section container hero compare_parent sp-top-main">
                <div className="">
                  <section className="section content_section mt-top">
                    <div>
                      <section className="section grey_background similar_plans">
                        <h3 className="font-weight--bold">Similar Plans</h3>
                        <h4>
                          Users who compared these plans also compared the below{" "}
                        </h4>
                        <div className="box-mob-slider">
                          <div className="slider-new similar-slider-new">
                            {this.props.similar_plans.length > 0 ? (
                              plans_to_compare.length > 0 &&
                              this.props.similar_plans.map(
                                (similar_plan, i) => {
                                  return plans_to_compare.includes(
                                    similar_plan.plan_id
                                    //i
                                    // .toString()
                                  ) === false ? (
                                    <div className="box-new similar-box-new">
                                      <ul className="similar_plan_ul">
                                        <li>
                                          <div className="box_block">
                                            <div className="plan-c-provider font-weight--bold">
                                              {similar_plan.hmo.name["text"]}
                                            </div>
                                            <h2 className="plan-c-name font-weight--normal margin-y--1">
                                              <a
                                                href={`/details/id/${similar_plan.plan_id}`}
                                              >
                                                {similar_plan.name}
                                              </a>
                                            </h2>
                                          </div>
                                          <p className="is-hidden-mobile">
                                            ???
                                            {this.numberwithCommas(
                                              stripNonNumeric(
                                                similar_plan.price
                                              )
                                            )}
                                            / year
                                          </p>
                                          <ul>
                                            <li>{similar_plan.hmo.name}</li>
                                            <li>
                                              {similar_plan.hmo.providers
                                                ? similar_plan.hmo.providers
                                                    .length
                                                : 0}{" "}
                                              <span>Hospitals</span>
                                            </li>
                                          </ul>

                                          <button
                                            className="button "
                                            disabled={
                                              this.state.plans_to_compare
                                                .length < 3
                                                ? false
                                                : true
                                            }
                                            onClick={() => {
                                              // this.handleCheckedPlanToCompareOnDesktop(
                                              //   i.toString()
                                              // );
                                              this.handleCheckedPlanToCompare(
                                                similar_plan.plan_id
                                              );

                                              this.updateUrlParams(
                                                "add",
                                                similar_plan.plan_id
                                              );
                                            }}
                                          >
                                            <i className="fas fa-plus"></i>+ Add
                                            to compare
                                          </button>
                                        </li>
                                      </ul>
                                    </div>
                                  ) : (
                                    ""
                                  );
                                }
                              )
                            ) : (
                              <Spin
                                size="large"
                                className="large-loader float--left"
                              />
                            )}
                          </div>
                        </div>
                      </section>
                    </div>
                  </section>
                </div>
              </section>
            </div>
          )
        ) : (
          <Spin size="large" className="large-loader" />
        )}
        <DataCaptureModal />
      </div>
    );
  }
}

const mapProps = (state: any) => {
  return {
    plans: state.fetchData.plans,
    plan: state.fetchData.plan,
    checked_plans_list: state.compare.checked_plans_list,
    compare_plans_desktop_indexes: state.compare.compare_plans_desktop_indexes,
    similar_plans: state.fetchData.similar_plans,
    compare_plan_id_param: state.quiz.responses.compare_plan_id_param,
  };
};

export default connect(mapProps, {
  setCheckedPlans,
  setPlansToCompareOnDesktop,
  setPlansToCompareOnMobile,
  getSimilarPlans,
  getPlanDetail,
  getProviders,
  getPlans,
  //getServices,
  getCheapestPlan,
  addCompareURLParam,
  removeCompareURLParam,
  //getPlan,
  toggleDataCaptureModal,
})(ComparePlans);
