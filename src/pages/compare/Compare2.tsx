import React, { Component } from "react";

import AppHeader from "../../components/app-header/AppHeader";
import AppFooter from "../../components/app-footer/AppFooter";

/*import { API_URL } from "../../config";*/
import styles from "./Compare.module.scss";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import * as actions from "../../utils/actions";
import numeral from "numeral";

import Modal from "react-bootstrap/Modal";

import shortlist from "../../imgs/shortlist-yellow.svg";
import bottom_filter from "../../imgs/bottom_filter.svg";
import bottom_shortlist from "../../imgs/bottom_shortlist.svg";
import bottom_compare from "../../imgs/bottom_compare.svg";

import {
  Card,
  Col,
  Row,
  Icon,
  Checkbox,
  Radio,
  Slider,
  Spin,
  Skeleton,
  Button,
  Divider,
  Typography,
  Empty,
  InputNumber,
  Collapse,
  message,
  Input,
  Tabs,
  Form,
  Table,
} from "antd";
import { formatAsCurrency, NAIRA_SIGN } from "../../utils";
import { Plan } from "../../interfaces/Plan";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBalanceScale,
  faArrowLeft,
  faFilter,
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

import { PAYSTACK_PUBLIC_KEY } from "../../utils/index";
import { UPDATE_PRICE, TOGGLE_BUYING_PLAN } from "../../utils/actions";
import { UPDATE_NOTGETTINGPROVIDERS } from "../../utils/actions";

import PaystackButton from "react-paystack";

import * as home_utils from "../../utils/homeUtils";

import { RouteComponentProps } from "react-router-dom";

import { state } from "../../components/home/state";

import "../../components/home/new-design.css";
import "./compare.css";

import starfilled from "../../svgs/starfilled.svg";
import star from "../../svgs/star.svg";

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
    //console.log("in here");
    if (btnType == "prev") {
      this.onPrevBtnClick();
    } else {
      this.onNextBtnClick();
    }

    if (this.state.current_page == 1) {
      // console.log("==1");
      this.showPrevBtn();
      // this.hidePrevBtn();
      // this.showNextBtn();
    } else if (this.state.current_page == this.state.num_of_pages - 1) {
      //this.hideNextBtn();
      // console.log("==2");
    } else if (this.state.current_page == this.state.num_of_pages) {
      this.showNextBtn();
    }

    console.log("this.state inside handleMob", this.state);
    // console.log("this.state.show_prev_button", this.state.show_next_button);
  };

  setPlansToCompare = () => {
    console.log("this.props.match.params[0]", this.props.match.params[0]);
    let params = this.props.match.params[0];
    let paramsArr = params.split("/");
    console.log("paramsArr", paramsArr);

    this.setState({
      plans_to_compare: paramsArr,
      num_of_pages: paramsArr.length,
    });
  };

  UNSAFE_componentWillMount() {
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

  componentDidMount() {}

  initializeValues = () => {
    // let checked_plans_mobile = this.props.location.state
    //   .this.state.plans_to_compare;
    // let checked_plans_desktop = this.props.location.state
    //   .this.state.plans_to_compare;
    // let recommended_plans = state.plans;
  };

  handleCheckedPlanToCompareOnDesktop(index) {
    // console.log("index", index);

    let value = index;

    //this.checkChecked(index);

    //  console.log(checked);

    let indexes: string[] = [];
    let checked_values: boolean[] = [];

    indexes = this.props.this.state.plans_to_compare;
    checked_values = this.props.checked_plans_list;

    let i: number = indexes.indexOf(value);
    let checked = i != 1;
    let j: number = checked_values.indexOf(checked);

    console.log("i", i, "j", j, "indexes.length", indexes.length);

    // if (i == 1 && indexes.length == 2) {
    //   // console.log("yes babe");
    //   this.toggleShowDesktopCompareCheckbox();
    // }

    if (
      indexes.length < this.state.limit_plans_to_compare_on_desktop &&
      i == 1 &&
      checked_values.length < this.state.limit_plans_to_compare_on_desktop
    ) {
      //  console.log("here");
      //this.toggleShowCompareWidget();

      this.props.dispatch({
        type: "SET_PLANS_TO_COMPARE_ON_DESKTOP",
        data: [...this.props.this.state.plans_to_compare, value],
      });

      this.props.dispatch({
        type: "SET_CHECKED_PLANS",
        data: [...this.props.checked_plans_list, checked],
      });
    } else if (i > 1 && j > 1) {
      // console.log(
      //   "there",
      //   this.state.this.state.plans_to_compare.splice(i, 1)
      // );

      this.props.dispatch({
        type: "SET_PLANS_TO_COMPARE_ON_DESKTOP",
        data: this.props.this.state.plans_to_compare.splice(i, 1),
      });

      this.props.dispatch({
        type: "SET_CHECKED_PLANS",
        data: this.props.checked_plans_list.splice(j, 1),
      });
    }
    if (indexes.length == this.state.limit_plans_to_compare_on_desktop) {
      // this.toggleShowDesktopCompareCheckbox();
      //this.state.this.state.plans_to_compare.filter((plan) => index !== plan);
    }

    // }
  }

  removePlanFromDesktopCheckedIndexes(index) {
    if (this.props.this.state.plans_to_compare.length < 3) {
      message.error("You need to select at least 2 plans to compare");
      return;
    }
    console.log("index", index);
    // console.log("let's see");

    if (index == undefined) {
      this.props.dispatch({
        type: "SET_PLANS_TO_COMPARE_ON_DESKTOP",
        data: [],
      });

      this.props.dispatch({
        type: "SET_CHECKED_PLANS",
        data: [],
      });
    }

    /* let value = index.value;*/
    let checked = this.props.checked_plans_list[index];
    //this.checkChecked(index);

    let indexes: string[] = [];
    let checked_values: boolean[] = [];

    indexes = this.props.this.state.plans_to_compare;
    checked_values = this.props.checked_plans_list;

    let i: number = indexes.indexOf(index);
    let j: number = i;
    //checked_values.indexOf(checked);

    console.log("indexOf(index):i=", i, "indexOf(checked):j=", j);

    if (
      i > 1
      //&& j > 1
    ) {
      // console.log(
      //   "there",
      //   this.state.this.state.plans_to_compare.splice(i, 1)
      // );

      let x = [...this.props.this.state.plans_to_compare];
      let v = x.splice(i, 1) && x;

      let y = [...this.props.checked_plans_list];
      let k = y.splice(j, 1) && y;

      console.log("v", v, "k", k);
      this.props.dispatch({
        type: "SET_PLANS_TO_COMPARE_ON_DESKTOP",
        data: [...v],
      });

      this.props.dispatch({
        type: "SET_CHECKED_PLANS",
        data: [...k],
      });
    }
    if (indexes.length < this.state.limit_plans_to_compare_on_desktop) {
      // this.toggleShowCompareCheckbox();
    }
  }

  handleCheckedPlanToCompareOnMobile(index) {
    // console.log("index", index);

    let value = index;

    //this.checkChecked(index);

    //  console.log(checked);

    let indexes: string[] = [];
    let checked_values: boolean[] = [];

    indexes = this.props.this.state.plans_to_compare;
    checked_values = this.props.checked_plans_list;

    let i: number = indexes.indexOf(value);
    let checked = i != 1;
    let j: number = checked_values.indexOf(checked);

    console.log("i", i, "j", j, "indexes.length", indexes.length);

    // if (i == 1 && indexes.length == 2) {
    //   // console.log("yes babe");
    //   this.toggleShowDesktopCompareCheckbox();
    // }

    if (
      indexes.length < this.state.limit_plans_to_compare_on_mobile &&
      i == 1 &&
      checked_values.length < this.state.limit_plans_to_compare_on_mobile
    ) {
      //  console.log("here");
      //this.toggleShowCompareWidget();

      this.props.dispatch({
        type: "SET_PLANS_TO_COMPARE_ON_MOBILE",
        data: [...this.props.this.state.plans_to_compare, value],
      });

      this.props.dispatch({
        type: "SET_CHECKED_PLANS",
        data: [...this.props.checked_plans_list, checked],
      });
    } else if (i > 1 && j > 1) {
      // console.log(
      //   "there",
      //   this.state.this.state.plans_to_compare.splice(i, 1)
      // );

      this.props.dispatch({
        type: "SET_PLANS_TO_COMPARE_ON_MOBILE",
        data: this.props.this.state.plans_to_compare.splice(i, 1),
      });

      this.props.dispatch({
        type: "SET_CHECKED_PLANS",
        data: this.props.checked_plans_list.splice(j, 1),
      });
    }
    if (indexes.length == this.state.limit_plans_to_compare_on_mobile) {
      // this.toggleShowDesktopCompareCheckbox();
      //this.state.this.state.plans_to_compare.filter((plan) => index !== plan);
    }

    // }
  }

  removePlanFromMobileCheckedIndexes(index) {
    if (this.props.this.state.plans_to_compare.length < 2) {
      message.error("You need to select 2 plans to compare");
      return;
    }
    console.log("index", index);
    // console.log("let's see");

    if (index == undefined) {
      this.props.dispatch({
        type: "SET_PLANS_TO_COMPARE_ON_MOBILE",
        data: [],
      });

      this.props.dispatch({
        type: "SET_CHECKED_PLANS",
        data: [],
      });
    }

    /* let value = index.value;*/
    let checked = this.props.checked_plans_list[index];
    //this.checkChecked(index);

    let indexes: string[] = [];
    let checked_values: boolean[] = [];

    indexes = this.props.this.state.plans_to_compare;
    checked_values = this.props.checked_plans_list;

    let i: number = indexes.indexOf(index);
    let j: number = i;
    //checked_values.indexOf(checked);

    console.log("indexOf(index):i=", i, "indexOf(checked):j=", j);

    if (
      i > 1
      //&& j > 1
    ) {
      // console.log(
      //   "there",
      //   this.state.this.state.plans_to_compare.splice(i, 1)
      // );

      let x = [...this.props.this.state.plans_to_compare];
      let v = x.splice(i, 1) && x;

      let y = [...this.props.checked_plans_list];
      let k = y.splice(j, 1) && y;

      console.log("v", v, "k", k);
      this.props.dispatch({
        type: "SET_PLANS_TO_COMPARE_ON_MOBILE",
        data: [...v],
      });

      this.props.dispatch({
        type: "SET_CHECKED_PLANS",
        data: [...k],
      });
    }
    if (indexes.length < this.state.limit_plans_to_compare_on_mobile) {
      // this.toggleShowCompareCheckbox();
    }
  }

  goToPlans = () => {
    this.props.history.push({ pathname: "/new-design/#plans" });
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

  render() {
    // console.log(
    //   "copied state",
    //   state,
    //   "copied state.plans",
    //   state.plans,
    //   "this.state",
    //   this.state
    // );
    console.log("this.state.current_page - 1", this.state.current_page - 1);
    let plans_to_compare: string[] = this.state.plans_to_compare;

    return (
      <div className="side-by-side_comparison c-plan-details-page">
        <div className="c-plan-details-page__header">
          <header className="c-plan-nav-bar">
            <div className="container padding-y--2 display--flex justify-content--between align-items--center">
              <div>
                <a
                  className="c-button c-button--transparent c-plan-nav-bar__back-link padding--0 text-decoration--underline"
                  href="#/plan/results/"
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

        <div className="c-plan-details-page__body">
          <div className="fill--primary md-display--none print-display--none">
            <div className="l-row justify-content--between">
              <div className="l-col--4 text-align--left">
                {this.state.show_prev_button && (
                  <button
                    className="c-button c-button--transparent color--white padding-x--1 qa-compare-prev"
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
                        i == this.state.current_page - 1
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
                    className="c-button c-button--transparent color--white padding-x--1 qa-compare-next"
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
                      {this.state.current_page - 1 < 0
                        ? state.plans[this.state.plans_to_compare[0]].hmo_id
                            .name.text
                        : state.plans[
                            this.state.plans_to_compare[
                              this.state.current_page - 1
                            ]
                          ].hmo_id.name.text}
                      {/* Blue Cross and Blue Shield of Illinois */}
                    </div>
                    <h2 className="c-plan-title__name font-weight--normal margin-y--1">
                      <a
                        href="#/plan/results/36096IL1000009/details"
                        target="_self"
                      >
                        {this.state.current_page - 1 < 0
                          ? state.plans[this.state.plans_to_compare[0]].name
                          : state.plans[
                              this.state.plans_to_compare[
                                this.state.current_page - 1
                              ]
                            ].name}
                        {/* Blue FocusCare Bronze℠ 209 */}
                      </a>
                    </h2>
                    <ul className="c-plan-title__info c-list--bare font-size--small">
                      <li className="c-plan-title__info-item">
                        <span className="visibility--screen-reader">
                          Metal Level: <span>Bronze</span>
                        </span>
                        <span aria-hidden="true">
                          <span>Bronze</span>
                        </span>
                      </li>
                      <li className="c-plan-title__info-item">
                        <span className="visibility--screen-reader">
                          Plan type: <span>HMO</span>
                        </span>
                        <span aria-hidden="true">
                          <span>HMO</span>
                        </span>
                      </li>
                      <li className="c-plan-title__info-item">
                        Plan ID:
                        <span className="font-weight--bold">
                          36096IL1000009
                        </span>
                      </li>
                    </ul>
                  </header>
                  <button
                    className="c-button c-button--primary c-button--small margin-top--2 qa-mobile-visible-plan"
                    type="button"
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
                          {" "}
                          <tr>
                            <th scope="row">Plan metal level</th>
                            <td>
                              <span>Bronze</span>
                            </td>
                          </tr>{" "}
                          <tr>
                            <th scope="row">Plan ID</th>
                            <td>
                              <span>36096IL1000009</span>
                            </td>
                          </tr>
                          <tr className="print-display--none">
                            <th scope="row">Medical providers in-network</th>
                            <td>
                              <a
                                className="c-button c-button--small print-display--none padding-x--2 margin-y--1"
                                href="/find-provider"
                                role="button"
                              >
                                Add medical providers
                              </a>
                            </td>
                          </tr>
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
                          </tr>
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
                        Star rating
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
                      hidden={this.state.collapse_star_rating ? true : false}
                    >
                      <table
                        className={
                          this.state.collapse_star_rating
                            ? "display--none"
                            : "c-details-table"
                        }
                      >
                        <tbody className="valign--top">
                          <tr className="border-bottom--2">
                            <th scope="row">
                              <span className="display--block">
                                Overall star rating
                              </span>
                              <p className="font-weight--normal margin-y--0">
                                Overall star rating is based on the categories
                                below
                              </p>
                            </th>
                            <td>
                              <div className="c-star-rating">
                                <div className="visibility--screen-reader">
                                  Quality Rating: 3 of 5 stars
                                </div>
                                <img
                                  src={starfilled}
                                  className="c-star-rating__star"
                                  alt=""
                                />
                                <img
                                  src={starfilled}
                                  className="c-star-rating__star"
                                  alt=""
                                />
                                <img
                                  src={starfilled}
                                  className="c-star-rating__star"
                                  alt=""
                                />
                                <img
                                  src={star}
                                  className="c-star-rating__star"
                                  alt=""
                                />
                                <img
                                  src={star}
                                  className="c-star-rating__star"
                                  alt=""
                                />
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <th scope="row">
                              <span className="display--block">
                                Member Experience
                              </span>
                              <p className="font-weight--normal margin-y--0">
                                Based on member satisfaction surveys about their
                                health care, doctors, and ease of getting
                                appointments and services
                              </p>
                            </th>
                            <td>
                              <div className="c-star-rating">
                                <div className="visibility--screen-reader">
                                  Quality Rating: 2 of 5 stars
                                </div>
                                <img
                                  src={starfilled}
                                  className="c-star-rating__star"
                                  alt=""
                                />
                                <img
                                  src={starfilled}
                                  className="c-star-rating__star"
                                  alt=""
                                />
                                <img
                                  src={star}
                                  className="c-star-rating__star"
                                  alt=""
                                />
                                <img
                                  src={star}
                                  className="c-star-rating__star"
                                  alt=""
                                />
                                <img
                                  src={star}
                                  className="c-star-rating__star"
                                  alt=""
                                />
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <th scope="row">
                              <span className="display--block">
                                Medical Care
                              </span>
                              <p className="font-weight--normal margin-y--0">
                                Based on providers improving or maintaining the
                                health of their patients with regular
                                screenings, tests, vaccines, and condition
                                monitoring.
                              </p>
                            </th>
                            <td>
                              <div className="c-star-rating">
                                <div className="visibility--screen-reader">
                                  Quality Rating: 3 of 5 stars
                                </div>
                                <img
                                  src={starfilled}
                                  className="c-star-rating__star"
                                  alt=""
                                />
                                <img
                                  src={starfilled}
                                  className="c-star-rating__star"
                                  alt=""
                                />
                                <img
                                  src={starfilled}
                                  className="c-star-rating__star"
                                  alt=""
                                />
                                <img
                                  src={star}
                                  className="c-star-rating__star"
                                  alt=""
                                />
                                <img
                                  src={star}
                                  className="c-star-rating__star"
                                  alt=""
                                />
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <th scope="row">
                              <span className="display--block">
                                Plan Administration
                              </span>
                              <p className="font-weight--normal margin-y--0">
                                Based on how well a plan is run, including
                                customer service, access to needed information,
                                and providers ordering appropriate tests and
                                treatment.
                              </p>
                            </th>
                            <td>
                              <div className="c-star-rating">
                                <div className="visibility--screen-reader">
                                  Quality Rating: 3 of 5 stars
                                </div>
                                <img
                                  src={starfilled}
                                  className="c-star-rating__star"
                                  alt=""
                                />
                                <img
                                  src={starfilled}
                                  className="c-star-rating__star"
                                  alt=""
                                />
                                <img
                                  src={starfilled}
                                  className="c-star-rating__star"
                                  alt=""
                                />
                                <img
                                  src={star}
                                  className="c-star-rating__star"
                                  alt=""
                                />
                                <img
                                  src={star}
                                  className="c-star-rating__star"
                                  alt=""
                                />
                              </div>
                            </td>
                          </tr>
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
                        Other services
                        <FontAwesomeIcon
                          className="fas md-margin-right--1"
                          icon={faChevronDown}
                        />
                      </button>
                    </h2>
                    <div
                      hidden={this.state.collapse_other_services ? true : false}
                    >
                      <table className="c-details-table">
                        <tbody className="valign--top">
                          {" "}
                          <tr>
                            <th scope="row">Infertility treatment</th>
                            <td>
                              <ul className="c-list--bare">
                                <li>
                                  In Network: 50% Coinsurance after deductible
                                </li>
                                <li>Out of Network: Benefit Not Covered</li>
                              </ul>
                              <button
                                className="c-button c-button--transparent c-benefit-listing__modal-button display--block"
                                type="button"
                              >
                                View limits and exclusions
                                <span className="visibility--screen-reader">
                                  : Infertility treatment
                                </span>
                              </button>
                            </td>
                          </tr>
                          <tr>
                            <th scope="row">
                              <span>
                                Mental/
                                <span className="ws-wbr">
                                  <wbr />
                                </span>
                              </span>
                              behavioral health outpatient services
                            </th>
                            <td>
                              <ul className="c-list--bare">
                                <li>In Network: $60</li>
                                <li>Out of Network: $60</li>
                              </ul>
                            </td>
                          </tr>
                          <tr>
                            <th scope="row">
                              <span>
                                Mental/
                                <span className="ws-wbr">
                                  <wbr />
                                </span>
                              </span>
                              behavioral health inpatient services
                            </th>
                            <td>
                              <ul className="c-list--bare">
                                <li>In Network: $850 Copay per Day</li>
                                <li>Out of Network: $850 Copay per Day</li>
                              </ul>
                            </td>
                          </tr>{" "}
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
                          {
                            state.plans[this.state.plans_to_compare[0]].hmo_id
                              .name.text
                          }
                        </div>
                        <h2 className="font-size--h4 leading--heading font-weight--normal margin-y--1">
                          <a href="javascript:;">
                            {state.plans[this.state.plans_to_compare[0]].name}
                          </a>
                        </h2>
                        <div className="margin-top--auto print-display--none">
                          <button
                            className="c-button c-button--primary c-button--small qa-details"
                            type="button"
                          >
                            Like This Plan
                          </button>
                        </div>
                      </div>
                      <div className="fill--gray-lightest print-display--none">
                        <button
                          className="c-button c-button--transparent c-button--small fill--transparent qa-remove"
                          type="button"
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
                    <div className="l-col display--flex justify-content--between border--1 padding--0 c-compare-title__card">
                      <div className="c-compare-title__info padding--1">
                        <div className="font-size--small font-weight--bold">
                          {
                            state.plans[this.state.plans_to_compare[1]].hmo_id
                              .name.text
                          }
                        </div>
                        <h2 className="font-size--h4 leading--heading font-weight--normal margin-y--1">
                          <a href="javascript:;">
                            {state.plans[this.state.plans_to_compare[1]].name}
                          </a>
                        </h2>
                        <div className="margin-top--auto print-display--none">
                          <button
                            className="c-button c-button--primary c-button--small qa-details"
                            type="button"
                          >
                            Like This Plan
                          </button>
                        </div>
                      </div>
                      <div className="fill--gray-lightest print-display--none">
                        <button
                          className="c-button c-button--transparent c-button--small fill--transparent qa-remove"
                          type="button"
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

                    {this.state.plans_to_compare[2] && (
                      <div className="l-col display--flex justify-content--between border--1 padding--0 c-compare-title__card">
                        <div className="c-compare-title__info padding--1">
                          <div className="font-size--small font-weight--bold">
                            {
                              state.plans[this.state.plans_to_compare[2]].hmo_id
                                .name.text
                            }
                          </div>
                          <h2 className="font-size--h4 leading--heading font-weight--normal margin-y--1">
                            <a href="javascript:;">
                              {state.plans[this.state.plans_to_compare[2]].name}
                            </a>
                          </h2>
                          <div className="margin-top--auto print-display--none">
                            <button
                              className="c-button c-button--primary c-button--small qa-details"
                              type="button"
                            >
                              Like This Plan
                            </button>
                          </div>
                        </div>
                        <div className="fill--gray-lightest print-display--none">
                          <button
                            className="c-button c-button--transparent c-button--small fill--transparent qa-remove"
                            type="button"
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
                            <th scope="row">Plan metal level</th>
                            <td>
                              <span>Bronze</span>
                            </td>
                            <td>
                              <span>Bronze</span>
                            </td>
                            <td>
                              <span>Bronze</span>
                            </td>
                          </tr>
                          <tr>
                            <th scope="row">Plan type</th>
                            <td>
                              <span>HMO</span>
                            </td>
                            <td>
                              <span>HMO</span>
                            </td>
                            <td>
                              <span>HMO</span>
                            </td>
                          </tr>
                          <tr>
                            <th scope="row">Plan ID</th>
                            <td>
                              <span>36096IL1000009</span>
                            </td>
                            <td>
                              <span>44522IL0010008</span>
                            </td>
                            <td>
                              <span>27833IL0140016</span>
                            </td>
                          </tr>
                          <tr className="print-display--none">
                            <th scope="row">Medical providers in-network</th>
                            <td>
                              <a
                                className="c-button c-button--small print-display--none padding-x--2 margin-y--1"
                                href="/find-provider"
                                role="button"
                              >
                                Add medical providers
                              </a>
                            </td>
                            <td>
                              <a
                                className="c-button c-button--small print-display--none padding-x--2 margin-y--1"
                                href="/find-provider"
                                role="button"
                              >
                                Add medical providers
                              </a>
                            </td>
                            <td>
                              <a
                                className="c-button c-button--small print-display--none padding-x--2 margin-y--1"
                                href="/find-provider"
                                role="button"
                              >
                                Add medical providers
                              </a>
                            </td>
                          </tr>
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
                            <td>
                              <a
                                className="c-button c-button--small print-display--none padding-x--2 margin-y--1"
                                href="/find-drugs"
                                role="button"
                              >
                                Add prescription drugs
                              </a>
                            </td>
                            <td>
                              <a
                                className="c-button c-button--small print-display--none padding-x--2 margin-y--1"
                                href="/find-drugs"
                                role="button"
                              >
                                Add prescription drugs
                              </a>
                            </td>
                          </tr>
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
                        Star rating
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
                      hidden={this.state.collapse_star_rating ? true : false}
                    >
                      <table className="c-details-table">
                        <tbody className="valign--top">
                          <tr className="border-bottom--2">
                            <th scope="row">
                              <span className="display--block">
                                Overall star rating
                              </span>
                              <p className="font-weight--normal margin-y--0">
                                Overall star rating is based on the categories
                                below
                              </p>
                            </th>
                            <td>
                              <div className="c-star-rating">
                                <div className="visibility--screen-reader">
                                  Quality Rating: 3 of 5 stars
                                </div>
                                <img
                                  src={starfilled}
                                  className="c-star-rating__star"
                                  alt=""
                                />
                                <img
                                  src={starfilled}
                                  className="c-star-rating__star"
                                  alt=""
                                />
                                <img
                                  src={starfilled}
                                  className="c-star-rating__star"
                                  alt=""
                                />
                                <img
                                  src={star}
                                  className="c-star-rating__star"
                                  alt=""
                                />
                                <img
                                  src={star}
                                  className="c-star-rating__star"
                                  alt=""
                                />
                              </div>
                            </td>
                            <td>
                              <span>New plan Not rated</span>
                            </td>
                            <td>
                              <div className="c-star-rating">
                                <div className="visibility--screen-reader">
                                  Quality Rating: 3 of 5 stars
                                </div>
                                <img
                                  src={starfilled}
                                  className="c-star-rating__star"
                                  alt=""
                                />
                                <img
                                  src={starfilled}
                                  className="c-star-rating__star"
                                  alt=""
                                />
                                <img
                                  src={starfilled}
                                  className="c-star-rating__star"
                                  alt=""
                                />
                                <img
                                  src={star}
                                  className="c-star-rating__star"
                                  alt=""
                                />
                                <img
                                  src={star}
                                  className="c-star-rating__star"
                                  alt=""
                                />
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <th scope="row">
                              <span className="display--block">
                                Member Experience
                              </span>
                              <p className="font-weight--normal margin-y--0">
                                Based on member satisfaction surveys about their
                                health care, doctors, and ease of getting
                                appointments and services
                              </p>
                            </th>
                            <td>
                              <div className="c-star-rating">
                                <div className="visibility--screen-reader">
                                  Quality Rating: 2 of 5 stars
                                </div>
                                <img
                                  src={starfilled}
                                  className="c-star-rating__star"
                                  alt=""
                                />
                                <img
                                  src={starfilled}
                                  className="c-star-rating__star"
                                  alt=""
                                />
                                <img
                                  src={star}
                                  className="c-star-rating__star"
                                  alt=""
                                />
                                <img
                                  src={star}
                                  className="c-star-rating__star"
                                  alt=""
                                />
                                <img
                                  src={star}
                                  className="c-star-rating__star"
                                  alt=""
                                />
                              </div>
                            </td>
                            <td>
                              <span>Not rated</span>
                            </td>
                            <td>
                              <div className="c-star-rating">
                                <div className="visibility--screen-reader">
                                  Quality Rating: 2 of 5 stars
                                </div>
                                <img
                                  src={starfilled}
                                  className="c-star-rating__star"
                                  alt=""
                                />
                                <img
                                  src={starfilled}
                                  className="c-star-rating__star"
                                  alt=""
                                />
                                <img
                                  src={star}
                                  className="c-star-rating__star"
                                  alt=""
                                />
                                <img
                                  src={star}
                                  className="c-star-rating__star"
                                  alt=""
                                />
                                <img
                                  src={star}
                                  className="c-star-rating__star"
                                  alt=""
                                />
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <th scope="row">
                              <span className="display--block">
                                Medical Care
                              </span>
                              <p className="font-weight--normal margin-y--0">
                                Based on providers improving or maintaining the
                                health of their patients with regular
                                screenings, tests, vaccines, and condition
                                monitoring.
                              </p>
                            </th>
                            <td>
                              <div className="c-star-rating">
                                <div className="visibility--screen-reader">
                                  Quality Rating: 3 of 5 stars
                                </div>
                                <img
                                  src={starfilled}
                                  className="c-star-rating__star"
                                  alt=""
                                />
                                <img
                                  src={starfilled}
                                  className="c-star-rating__star"
                                  alt=""
                                />
                                <img
                                  src={starfilled}
                                  className="c-star-rating__star"
                                  alt=""
                                />
                                <img
                                  src={star}
                                  className="c-star-rating__star"
                                  alt=""
                                />
                                <img
                                  src={star}
                                  className="c-star-rating__star"
                                  alt=""
                                />
                              </div>
                            </td>
                            <td>
                              <span>Not rated</span>
                            </td>
                            <td>
                              <div className="c-star-rating">
                                <div className="visibility--screen-reader">
                                  Quality Rating: 3 of 5 stars
                                </div>
                                <img
                                  src={starfilled}
                                  className="c-star-rating__star"
                                  alt=""
                                />
                                <img
                                  src={starfilled}
                                  className="c-star-rating__star"
                                  alt=""
                                />
                                <img
                                  src={starfilled}
                                  className="c-star-rating__star"
                                  alt=""
                                />
                                <img
                                  src={star}
                                  className="c-star-rating__star"
                                  alt=""
                                />
                                <img
                                  src={star}
                                  className="c-star-rating__star"
                                  alt=""
                                />
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <th scope="row">
                              <span className="display--block">
                                Plan Administration
                              </span>
                              <p className="font-weight--normal margin-y--0">
                                Based on how well a plan is run, including
                                customer service, access to needed information,
                                and providers ordering appropriate tests and
                                treatment.
                              </p>
                            </th>
                            <td>
                              <div className="c-star-rating">
                                <div className="visibility--screen-reader">
                                  Quality Rating: 3 of 5 stars
                                </div>
                                <img
                                  src={starfilled}
                                  className="c-star-rating__star"
                                  alt=""
                                />
                                <img
                                  src={starfilled}
                                  className="c-star-rating__star"
                                  alt=""
                                />
                                <img
                                  src={starfilled}
                                  className="c-star-rating__star"
                                  alt=""
                                />
                                <img
                                  src={star}
                                  className="c-star-rating__star"
                                  alt=""
                                />
                                <img
                                  src={star}
                                  className="c-star-rating__star"
                                  alt=""
                                />
                              </div>
                            </td>
                            <td>
                              <span>Not rated</span>
                            </td>
                            <td>
                              <div className="c-star-rating">
                                <div className="visibility--screen-reader">
                                  Quality Rating: 3 of 5 stars
                                </div>
                                <img
                                  src={starfilled}
                                  className="c-star-rating__star"
                                  alt=""
                                />
                                <img
                                  src={starfilled}
                                  className="c-star-rating__star"
                                  alt=""
                                />
                                <img
                                  src={starfilled}
                                  className="c-star-rating__star"
                                  alt=""
                                />
                                <img
                                  src={star}
                                  className="c-star-rating__star"
                                  alt=""
                                />
                                <img
                                  src={star}
                                  className="c-star-rating__star"
                                  alt=""
                                />
                              </div>
                            </td>
                          </tr>
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
                        Other services
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
                      hidden={this.state.collapse_other_services ? true : false}
                    >
                      <table className="c-details-table">
                        <tbody className="valign--top">
                          {" "}
                          <tr>
                            <th scope="row">Infertility treatment</th>
                            <td>
                              <ul className="c-list--bare">
                                <li>
                                  In Network: 50% Coinsurance after deductible
                                </li>
                                <li>Out of Network: Benefit Not Covered</li>
                              </ul>
                              <button
                                className="c-button c-button--transparent c-benefit-listing__modal-button display--block"
                                type="button"
                              >
                                View limits and exclusions
                                <span className="visibility--screen-reader">
                                  : Infertility treatment
                                </span>
                              </button>
                            </td>
                            <td>
                              <ul className="c-list--bare">
                                <li>In Network: No Charge After Deductible</li>
                                <li>Out of Network: Benefit Not Covered</li>
                              </ul>
                              <button
                                className="c-button c-button--transparent c-benefit-listing__modal-button display--block"
                                type="button"
                              >
                                View limits and exclusions
                                <span className="visibility--screen-reader">
                                  : Infertility treatment
                                </span>
                              </button>
                            </td>
                            <td>
                              <ul className="c-list--bare">
                                <li>
                                  In Network: 50% Coinsurance after deductible
                                </li>
                                <li>Out of Network: Benefit Not Covered</li>
                              </ul>
                            </td>
                          </tr>
                          <tr>
                            <th scope="row">
                              <span>
                                Mental/
                                <span className="ws-wbr">
                                  <wbr />
                                </span>
                              </span>
                              behavioral health outpatient services
                            </th>
                            <td>
                              <ul className="c-list--bare">
                                <li>In Network: $60</li>
                                <li>Out of Network: $60</li>
                              </ul>
                            </td>
                            <td>
                              <ul className="c-list--bare">
                                <li>In Network: No Charge After Deductible</li>
                                <li>Out of Network: Benefit Not Covered</li>
                              </ul>
                            </td>
                            <td>
                              <ul className="c-list--bare">
                                <li>In Network: $40</li>
                                <li>Out of Network: Benefit Not Covered</li>
                              </ul>
                            </td>
                          </tr>
                          <tr>
                            <th scope="row">
                              <span>
                                Mental/
                                <span className="ws-wbr">
                                  <wbr />
                                </span>
                              </span>
                              behavioral health inpatient services
                            </th>
                            <td>
                              <ul className="c-list--bare">
                                <li>In Network: $850 Copay per Day</li>
                                <li>Out of Network: $850 Copay per Day</li>
                              </ul>
                            </td>
                            <td>
                              <ul className="c-list--bare">
                                <li>In Network: No Charge After Deductible</li>
                                <li>Out of Network: Benefit Not Covered</li>
                              </ul>
                              <button
                                className="c-button c-button--transparent c-benefit-listing__modal-button display--block"
                                type="button"
                              >
                                View limits and exclusions
                                <span className="visibility--screen-reader">
                                  : Mental/behavioral health inpatient services
                                </span>
                              </button>
                            </td>
                            <td>
                              <ul className="c-list--bare">
                                <li>
                                  In Network: 50% Coinsurance after deductible
                                </li>
                                <li>Out of Network: Benefit Not Covered</li>
                              </ul>
                            </td>
                          </tr>{" "}
                        </tbody>
                      </table>
                    </div>
                  </section>
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
                    <div className="slider-new ">
                      {plans_to_compare.length > 0 &&
                        state.plans.map((similar_plan, i: number) => {
                          return plans_to_compare.includes(i.toString()) ==
                            false ? (
                            <div className="box-new">
                              <ul className="similar_plan_ul">
                                <li>
                                  <div className="box_block">
                                    <div className="plan-c-provider font-weight--bold">
                                      {similar_plan.hmo_id.name["text"]}
                                    </div>
                                    <h2 className="plan-c-name font-weight--normal margin-y--1">
                                      <a href="#">{similar_plan.name}</a>
                                    </h2>
                                  </div>
                                  <p className="is-hidden-mobile">
                                    ₦
                                    {this.props.quiz.responses.type == "single"
                                      ? this.numberwithCommas(
                                          similar_plan.individual_annual_price
                                        )
                                      : this.numberwithCommas(
                                          similar_plan.family_annual_price
                                        )}
                                    / year
                                  </p>
                                  <ul>
                                    <li>
                                      {this.props.quiz.responses.num_of_people}{" "}
                                      {this.props.quiz.responses.num_of_people >
                                      1
                                        ? " people"
                                        : " person"}{" "}
                                      <span>Sum Insured</span>
                                    </li>
                                    <li>
                                      {similar_plan.hmo_id.provider_id
                                        ? JSON.parse(
                                            similar_plan.hmo_id.provider_id
                                          ).length
                                        : 0}{" "}
                                      <span>Hospitals</span>
                                    </li>
                                  </ul>
                                  {/* <div className="like-covers">
                                  <div className="usp_image"></div>1 Cr in less
                                  premium
                                </div> */}
                                  <button
                                    className="button "
                                    disabled={
                                      this.state.plans_to_compare.length < 3
                                        ? false
                                        : true
                                    }
                                    onClick={() => {
                                      this.handleCheckedPlanToCompareOnDesktop(
                                        i.toString()
                                      );
                                    }}
                                  >
                                    <i className="fas fa-plus"></i>+ Add to
                                    compare
                                  </button>
                                </li>
                              </ul>
                            </div>
                          ) : (
                            ""
                          );
                        })}
                    </div>
                  </div>
                </section>
              </div>
            </section>
          </div>
        </section>

        {/* <AppFooter /> */}
      </div>
    );
  }
}

const mapProps = (state: any) => {
  return {
    ...state.quiz,
  };
};

export default connect(mapProps)(ComparePlans);
