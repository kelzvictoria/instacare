import React, { Component } from "react";

import AppHeader from "../../components/app-header/AppHeader";
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
} from "@fortawesome/free-solid-svg-icons";

import { PAYSTACK_PUBLIC_KEY } from "../../utils/index";
import { UPDATE_PRICE, TOGGLE_BUYING_PLAN } from "../../utils/actions";
import { UPDATE_NOTGETTINGPROVIDERS } from "../../utils/actions";

import PaystackButton from "react-paystack";

import { options } from "../home/Options";
import { RouteComponentProps } from "react-router-dom";

interface ComparisonProps {
  [x: string]: any;
  dispatch(args: any): any;
  plans: Plan[];
}

class SideBySideComparison extends Component<ComparisonProps> {
  constructor(props) {
    super(props);
  }
  state = {
    limit_plans_to_compare_on_desktop: 3,
    limit_plans_to_compare_on_mobile: 2,
  };

  componentDidMount() {}

  initializeValues = () => {
    // let checked_plans_mobile = this.props.location.state
    //   .compare_plans_mobile_indexes;
    // let checked_plans_desktop = this.props.location.state
    //   .compare_plans_desktop_indexes;
    // let recommended_plans = this.props.recommended_plans;
  };

  handleCheckedPlanToCompareOnDesktop(index) {
    // console.log("index", index);

    let value = index;

    //this.checkChecked(index);

    //  console.log(checked);

    let indexes: string[] = [];
    let checked_values: boolean[] = [];

    indexes = this.props.compare_plans_desktop_indexes;
    checked_values = this.props.checked_plans_list;

    let i: number = indexes.indexOf(value);
    let checked = i != -1;
    let j: number = checked_values.indexOf(checked);

    console.log("i", i, "j", j, "indexes.length", indexes.length);

    // if (i == -1 && indexes.length == 2) {
    //   // console.log("yes babe");
    //   this.toggleShowDesktopCompareCheckbox();
    // }

    if (
      indexes.length < this.state.limit_plans_to_compare_on_desktop &&
      i == -1 &&
      checked_values.length < this.state.limit_plans_to_compare_on_desktop
    ) {
      //  console.log("here");
      //this.toggleShowCompareWidget();

      this.props.dispatch({
        type: "SET_PLANS_TO_COMPARE_ON_DESKTOP",
        data: [...this.props.compare_plans_desktop_indexes, value],
      });

      this.props.dispatch({
        type: "SET_CHECKED_PLANS",
        data: [...this.props.checked_plans_list, checked],
      });
    } else if (i > -1 && j > -1) {
      // console.log(
      //   "there",
      //   this.state.compare_plans_mobile_indexes.splice(i, 1)
      // );

      this.props.dispatch({
        type: "SET_PLANS_TO_COMPARE_ON_DESKTOP",
        data: this.props.compare_plans_desktop_indexes.splice(i, 1),
      });

      this.props.dispatch({
        type: "SET_CHECKED_PLANS",
        data: this.props.checked_plans_list.splice(j, 1),
      });
    }
    if (indexes.length == this.state.limit_plans_to_compare_on_desktop) {
      // this.toggleShowDesktopCompareCheckbox();
      //this.state.compare_plans_mobile_indexes.filter((plan) => index !== plan);
    }

    // }
  }

  removePlanFromDesktopCheckedIndexes(index) {
    if (this.props.compare_plans_desktop_indexes.length < 3) {
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

    indexes = this.props.compare_plans_desktop_indexes;
    checked_values = this.props.checked_plans_list;

    let i: number = indexes.indexOf(index);
    let j: number = i;
    //checked_values.indexOf(checked);

    console.log("indexOf(index):i=", i, "indexOf(checked):j=", j);

    if (
      i > -1
      //&& j > -1
    ) {
      // console.log(
      //   "there",
      //   this.state.compare_plans_desktop_indexes.splice(i, 1)
      // );

      let x = [...this.props.compare_plans_desktop_indexes];
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

    indexes = this.props.compare_plans_mobile_indexes;
    checked_values = this.props.checked_plans_list;

    let i: number = indexes.indexOf(value);
    let checked = i != -1;
    let j: number = checked_values.indexOf(checked);

    console.log("i", i, "j", j, "indexes.length", indexes.length);

    // if (i == -1 && indexes.length == 2) {
    //   // console.log("yes babe");
    //   this.toggleShowDesktopCompareCheckbox();
    // }

    if (
      indexes.length < this.state.limit_plans_to_compare_on_mobile &&
      i == -1 &&
      checked_values.length < this.state.limit_plans_to_compare_on_mobile
    ) {
      //  console.log("here");
      //this.toggleShowCompareWidget();

      this.props.dispatch({
        type: "SET_PLANS_TO_COMPARE_ON_MOBILE",
        data: [...this.props.compare_plans_mobile_indexes, value],
      });

      this.props.dispatch({
        type: "SET_CHECKED_PLANS",
        data: [...this.props.checked_plans_list, checked],
      });
    } else if (i > -1 && j > -1) {
      // console.log(
      //   "there",
      //   this.state.compare_plans_mobile_indexes.splice(i, 1)
      // );

      this.props.dispatch({
        type: "SET_PLANS_TO_COMPARE_ON_MOBILE",
        data: this.props.compare_plans_mobile_indexes.splice(i, 1),
      });

      this.props.dispatch({
        type: "SET_CHECKED_PLANS",
        data: this.props.checked_plans_list.splice(j, 1),
      });
    }
    if (indexes.length == this.state.limit_plans_to_compare_on_mobile) {
      // this.toggleShowDesktopCompareCheckbox();
      //this.state.compare_plans_mobile_indexes.filter((plan) => index !== plan);
    }

    // }
  }

  removePlanFromMobileCheckedIndexes(index) {
    if (this.props.compare_plans_mobile_indexes.length < 2) {
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

    indexes = this.props.compare_plans_mobile_indexes;
    checked_values = this.props.checked_plans_list;

    let i: number = indexes.indexOf(index);
    let j: number = i;
    //checked_values.indexOf(checked);

    console.log("indexOf(index):i=", i, "indexOf(checked):j=", j);

    if (
      i > -1
      //&& j > -1
    ) {
      // console.log(
      //   "there",
      //   this.state.compare_plans_desktop_indexes.splice(i, 1)
      // );

      let x = [...this.props.compare_plans_mobile_indexes];
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
    this.props.history.push({ pathname: "/plans" });
  };

  render() {
    const {
      compare_plans_desktop_indexes,
      compare_plans_mobile_indexes,
    } = this.props;
    console.log("this.props", this.props);
    return (
      <div>
        {compare_plans_mobile_indexes ? (
          <div className="mobile-comparison-view quotes_main_container">
            <div className="row compare-plans-header">
              <div className="row nav-info">
                <Button
                  className="nav-btn"
                  id="prev"
                  type="default"
                  onClick={this.goToPlans}
                >
                  <FontAwesomeIcon className="nav-btn" icon={faArrowLeft} />
                </Button>

                <div className="rec_info">
                  <h6 className="plan-type">Plans</h6>
                </div>
              </div>
            </div>

            <section className="section hero compare_parent sp-top-main">
              <div className="container">
                <div className="sticky">
                  <div className="top_fixed_box column">
                    <div className="columns difference_column">
                      {/* <div className="column">
                        <a className="button back_btn" id="CompareBack">
                          <span className="arrow-icon"></span> Back
                        </a>
                        <div className=" w_100 desktop_diff">
                          <label className="checkbox_label">
                            <input type="checkbox" className="checkbox" />
                            <span className="checkbox_custm"></span>Show
                            differences
                          </label>
                        </div>
                      </div> */}
                      <div className="column w_50 ">
                        <img
                          src={
                            this.props.recommended_plans[
                              compare_plans_mobile_indexes[0]
                            ].hmo_id.logo
                          }
                          alt="Care Health"
                          width="80"
                        />
                        <p className="box-plan-2">
                          <span className="plan-2">
                            {
                              this.props.recommended_plans[
                                compare_plans_mobile_indexes[0]
                              ].name
                            }
                          </span>
                          <a className="is-inline-flex edit-plan-close">×</a>
                          <a
                            className="close_plan edit-plan-close"
                            onClick={() => {
                              this.removePlanFromMobileCheckedIndexes(
                                compare_plans_mobile_indexes[0]
                              );
                            }}
                          >
                            ×
                          </a>
                        </p>

                        <button className="button ">
                          {this.props.quiz.responses.type == "single"
                            ? `₦${
                                this.props.recommended_plans[
                                  compare_plans_mobile_indexes[0]
                                ].individual_annual_price
                              }`
                            : `₦${
                                this.props.recommended_plans[
                                  compare_plans_mobile_indexes[0]
                                ].family_annual_price
                              }`}{" "}
                          annually<span className="arrow-icon-right"></span>
                        </button>
                        {/* <span className="yearly-text"> ₹ 7,921 paid annually</span> */}
                      </div>
                      <div className="column w_50 ">
                        <img
                          src={
                            this.props.recommended_plans[
                              compare_plans_mobile_indexes[1]
                            ].hmo_id.logo
                          }
                          alt="Max Bupa"
                          width="80"
                        />
                        <p className="box-plan-2">
                          <span className="plan-2">
                            {
                              this.props.recommended_plans[
                                compare_plans_mobile_indexes[1]
                              ].name
                            }
                          </span>
                          <a className="is-inline-flex is-hidden-mobile is-hidden-tablet-only edit-plan-close">
                            ×
                          </a>
                          <a
                            className="close_plan edit-plan-close"
                            onClick={() => {
                              this.removePlanFromMobileCheckedIndexes(
                                compare_plans_mobile_indexes[1]
                              );
                            }}
                          >
                            ×
                          </a>
                        </p>
                        <button className="button ">
                          {this.props.quiz.responses.type == "single"
                            ? `₦${
                                this.props.recommended_plans[
                                  compare_plans_mobile_indexes[1]
                                ].individual_annual_price
                              }`
                            : `₦${
                                this.props.recommended_plans[
                                  compare_plans_mobile_indexes[1]
                                ].family_annual_price
                              }`}{" "}
                          annually<span className="arrow-icon-right"></span>
                        </button>
                        {/* <span className="yearly-text"> ₹ 10,992 paid annually</span> */}
                      </div>
                    </div>
                  </div>
                </div>
                <section className="section content_section">
                  <div className="column grey_background w_100 grey-bg-col">
                    SUM INSURED
                  </div>
                  <div className="columns green_background">
                    {/* <div className="column w_100">SUM INSURED</div> */}
                    <div className="column w_50 grey-bg-col">
                      <h3 className="select">
                        {this.props.quiz.responses.type == "single"
                          ? `₦${
                              this.props.recommended_plans[
                                compare_plans_mobile_indexes[0]
                              ].individual_annual_price
                            }`
                          : `₦${
                              this.props.recommended_plans[
                                compare_plans_mobile_indexes[0]
                              ].family_annual_price
                            }`}{" "}
                      </h3>
                    </div>
                    <div className="column w_50 grey-bg-col">
                      <h3 className="select">
                        {this.props.quiz.responses.type == "single"
                          ? `₦${
                              this.props.recommended_plans[
                                compare_plans_mobile_indexes[1]
                              ].individual_annual_price
                            }`
                          : `₦${
                              this.props.recommended_plans[
                                compare_plans_mobile_indexes[1]
                              ].family_annual_price
                            }`}{" "}
                      </h3>
                    </div>
                  </div>
                  <div className="column grey_background w_100 grey-bg-col">
                    TERM
                  </div>
                  <div className="columns green_background">
                    {/* <div className="column w_100">TERM</div> */}
                    <div className="column w_50 grey-bg-col">
                      <h3 className="select">
                        {
                          this.props.recommended_plans[
                            compare_plans_mobile_indexes[0]
                          ].duration
                        }
                      </h3>
                      {/* <span className="span_saves">&nbsp;</span> */}
                    </div>
                    <div className="column w_50 grey-bg-col">
                      <h3 className="select">
                        {
                          this.props.recommended_plans[
                            compare_plans_mobile_indexes[1]
                          ].duration
                        }
                      </h3>
                      {/* <span className="span_saves">&nbsp;</span> */}
                    </div>
                  </div>
                </section>
                <section className="section content_section mt-top">
                  <div className="column grey_background w_100 top-features">
                    TOP FEATURES
                  </div>
                  <div className="columns">
                    <div className="column w_100">
                      <h3 className="subtitle">Admission</h3>
                      {/* <a
                    className="is-primary tooltip is-tooltip-multiline is-tooltip-right tip-box"
                    data-tooltip="Room rent capping have a direct implication on your claim payout, (Eg.Room rent limit is 4K and You have availed 5k room rent, then also you will be eligible for only 4K i.e 80% of total room rent.)"
                  >
                    Why is it important?
                  </a> */}
                    </div>
                  </div>
                  <div className="columns">
                    <div className="column w_50 ">
                      <p className="feature-box">
                        {this.props.recommended_plans[
                          compare_plans_mobile_indexes[0]
                        ].service_id.includes("Accommodation")
                          ? "Covered"
                          : "Not Covered"}
                      </p>
                      {this.props.recommended_plans[
                        compare_plans_mobile_indexes[0]
                      ].service_id.includes("Accommodation") ? (
                        <ul className="progress_bar">
                          <li className="green">
                            <span></span>
                          </li>
                          <li className="green">
                            <span></span>
                          </li>
                          <li className="green">
                            <span></span>
                          </li>
                          <li className="green">
                            <span></span>
                          </li>
                          <li className="green">
                            <span></span>
                          </li>
                        </ul>
                      ) : (
                        <ul className="progress_bar">
                          <li className="">
                            <span></span>
                          </li>
                          <li className="">
                            <span></span>
                          </li>
                          <li className="">
                            <span></span>
                          </li>
                          <li className="">
                            <span></span>
                          </li>
                          <li className="">
                            <span></span>
                          </li>
                        </ul>
                      )}
                    </div>
                    <div className="column w_50 ">
                      <p className="feature-box">
                        {this.props.recommended_plans[
                          compare_plans_mobile_indexes[1]
                        ].service_id.includes("Accommodation")
                          ? "Covered"
                          : "Not Covered"}
                      </p>
                      {this.props.recommended_plans[
                        compare_plans_mobile_indexes[1]
                      ].service_id.includes("Accommodation") ? (
                        <ul className="progress_bar">
                          <li className="green">
                            <span></span>
                          </li>
                          <li className="green">
                            <span></span>
                          </li>
                          <li className="green">
                            <span></span>
                          </li>
                          <li className="green">
                            <span></span>
                          </li>
                          <li className="green">
                            <span></span>
                          </li>
                        </ul>
                      ) : (
                        <ul className="progress_bar">
                          <li className="">
                            <span></span>
                          </li>
                          <li className="">
                            <span></span>
                          </li>
                          <li className="">
                            <span></span>
                          </li>
                          <li className="">
                            <span></span>
                          </li>
                          <li className="">
                            <span></span>
                          </li>
                        </ul>
                      )}
                    </div>
                  </div>

                  <div className="columns">
                    <div className="column w_100">
                      <h3 className="subtitle">Accidents & Emergencies</h3>
                    </div>
                  </div>
                  <div className="columns">
                    <div className="column w_50 ">
                      <p className="feature-box">
                        {this.props.recommended_plans[
                          compare_plans_mobile_indexes[0]
                        ].service_id.includes("Accidents & Emergencies")
                          ? "Covered"
                          : "Not Covered"}
                      </p>
                      {this.props.recommended_plans[
                        compare_plans_mobile_indexes[0]
                      ].service_id.includes("Accidents & Emergencies") ? (
                        <ul className="progress_bar">
                          <li className="green">
                            <span></span>
                          </li>
                          <li className="green">
                            <span></span>
                          </li>
                          <li className="green">
                            <span></span>
                          </li>
                          <li className="green">
                            <span></span>
                          </li>
                          <li className="green">
                            <span></span>
                          </li>
                        </ul>
                      ) : (
                        <ul className="progress_bar">
                          <li className="">
                            <span></span>
                          </li>
                          <li className="">
                            <span></span>
                          </li>
                          <li className="">
                            <span></span>
                          </li>
                          <li className="">
                            <span></span>
                          </li>
                          <li className="">
                            <span></span>
                          </li>
                        </ul>
                      )}
                    </div>
                    <div className="column w_50 ">
                      <p className="feature-box">
                        {this.props.recommended_plans[
                          compare_plans_mobile_indexes[1]
                        ].service_id.includes("Accidents & Emergencies")
                          ? "Covered"
                          : "Not Covered"}
                      </p>
                      {this.props.recommended_plans[
                        compare_plans_mobile_indexes[1]
                      ].service_id.includes("Accidents & Emergencies") ? (
                        <ul className="progress_bar">
                          <li className="green">
                            <span></span>
                          </li>
                          <li className="green">
                            <span></span>
                          </li>
                          <li className="green">
                            <span></span>
                          </li>
                          <li className="green">
                            <span></span>
                          </li>
                          <li className="green">
                            <span></span>
                          </li>
                        </ul>
                      ) : (
                        <ul className="progress_bar">
                          <li className="">
                            <span></span>
                          </li>
                          <li className="">
                            <span></span>
                          </li>
                          <li className="">
                            <span></span>
                          </li>
                          <li className="">
                            <span></span>
                          </li>
                          <li className="">
                            <span></span>
                          </li>
                        </ul>
                      )}
                    </div>
                  </div>

                  <div className="columns">
                    <div className="column w_100">
                      <h3 className="subtitle">Investigations</h3>
                    </div>
                  </div>
                  <div className="columns">
                    <div className="column w_50 ">
                      <p className="feature-box">
                        {this.props.recommended_plans[
                          compare_plans_mobile_indexes[0]
                        ].service_id.includes("Investigations")
                          ? "Covered"
                          : "Not Covered"}
                      </p>
                      {this.props.recommended_plans[
                        compare_plans_mobile_indexes[0]
                      ].service_id.includes("Investigations") ? (
                        <ul className="progress_bar">
                          <li className="green">
                            <span></span>
                          </li>
                          <li className="green">
                            <span></span>
                          </li>
                          <li className="green">
                            <span></span>
                          </li>
                          <li className="green">
                            <span></span>
                          </li>
                          <li className="green">
                            <span></span>
                          </li>
                        </ul>
                      ) : (
                        <ul className="progress_bar">
                          <li className="">
                            <span></span>
                          </li>
                          <li className="">
                            <span></span>
                          </li>
                          <li className="">
                            <span></span>
                          </li>
                          <li className="">
                            <span></span>
                          </li>
                          <li className="">
                            <span></span>
                          </li>
                        </ul>
                      )}
                    </div>
                    <div className="column w_50 ">
                      <p className="feature-box">
                        {this.props.recommended_plans[
                          compare_plans_mobile_indexes[1]
                        ].service_id.includes("Investigations")
                          ? "Covered"
                          : "Not Covered"}
                      </p>
                      {this.props.recommended_plans[
                        compare_plans_mobile_indexes[1]
                      ].service_id.includes("Investigations") ? (
                        <ul className="progress_bar">
                          <li className="green">
                            <span></span>
                          </li>
                          <li className="green">
                            <span></span>
                          </li>
                          <li className="green">
                            <span></span>
                          </li>
                          <li className="green">
                            <span></span>
                          </li>
                          <li className="green">
                            <span></span>
                          </li>
                        </ul>
                      ) : (
                        <ul className="progress_bar">
                          <li className="">
                            <span></span>
                          </li>
                          <li className="">
                            <span></span>
                          </li>
                          <li className="">
                            <span></span>
                          </li>
                          <li className="">
                            <span></span>
                          </li>
                          <li className="">
                            <span></span>
                          </li>
                        </ul>
                      )}
                    </div>
                  </div>

                  <div className="columns">
                    <div className="column w_100">
                      <h3 className="subtitle">Minor Surgeries</h3>
                    </div>
                  </div>
                  <div className="columns">
                    <div className="column w_50 ">
                      <p className="feature-box">
                        {this.props.recommended_plans[
                          compare_plans_mobile_indexes[0]
                        ].service_id.includes("Minor Surgeries")
                          ? "Covered"
                          : "Not Covered"}
                      </p>
                      {this.props.recommended_plans[
                        compare_plans_mobile_indexes[0]
                      ].service_id.includes("Minor Surgeries") ? (
                        <ul className="progress_bar">
                          <li className="green">
                            <span></span>
                          </li>
                          <li className="green">
                            <span></span>
                          </li>
                          <li className="green">
                            <span></span>
                          </li>
                          <li className="green">
                            <span></span>
                          </li>
                          <li className="green">
                            <span></span>
                          </li>
                        </ul>
                      ) : (
                        <ul className="progress_bar">
                          <li className="">
                            <span></span>
                          </li>
                          <li className="">
                            <span></span>
                          </li>
                          <li className="">
                            <span></span>
                          </li>
                          <li className="">
                            <span></span>
                          </li>
                          <li className="">
                            <span></span>
                          </li>
                        </ul>
                      )}
                    </div>
                    <div className="column w_50 ">
                      <p className="feature-box">
                        {this.props.recommended_plans[
                          compare_plans_mobile_indexes[1]
                        ].service_id.includes("Minor Surgeries")
                          ? "Covered"
                          : "Not Covered"}
                      </p>
                      {this.props.recommended_plans[
                        compare_plans_mobile_indexes[1]
                      ].service_id.includes("Minor Surgeries") ? (
                        <ul className="progress_bar">
                          <li className="green">
                            <span></span>
                          </li>
                          <li className="green">
                            <span></span>
                          </li>
                          <li className="green">
                            <span></span>
                          </li>
                          <li className="green">
                            <span></span>
                          </li>
                          <li className="green">
                            <span></span>
                          </li>
                        </ul>
                      ) : (
                        <ul className="progress_bar">
                          <li className="">
                            <span></span>
                          </li>
                          <li className="">
                            <span></span>
                          </li>
                          <li className="">
                            <span></span>
                          </li>
                          <li className="">
                            <span></span>
                          </li>
                          <li className="">
                            <span></span>
                          </li>
                        </ul>
                      )}
                    </div>
                  </div>

                  <div className="columns">
                    <div className="column w_100">
                      <h3 className="subtitle">Intermediate Surgeries</h3>
                    </div>
                  </div>

                  <div className="columns">
                    <div className="column w_50 ">
                      <p className="feature-box">
                        {this.props.recommended_plans[
                          compare_plans_mobile_indexes[0]
                        ].service_id.includes("Intermediate Surgeries")
                          ? "Covered"
                          : "Not Covered"}
                      </p>
                      {this.props.recommended_plans[
                        compare_plans_mobile_indexes[0]
                      ].service_id.includes("Intermediate Surgeries") ? (
                        <ul className="progress_bar">
                          <li className="green">
                            <span></span>
                          </li>
                          <li className="green">
                            <span></span>
                          </li>
                          <li className="green">
                            <span></span>
                          </li>
                          <li className="green">
                            <span></span>
                          </li>
                          <li className="green">
                            <span></span>
                          </li>
                        </ul>
                      ) : (
                        <ul className="progress_bar">
                          <li className="">
                            <span></span>
                          </li>
                          <li className="">
                            <span></span>
                          </li>
                          <li className="">
                            <span></span>
                          </li>
                          <li className="">
                            <span></span>
                          </li>
                          <li className="">
                            <span></span>
                          </li>
                        </ul>
                      )}
                    </div>
                    <div className="column w_50 ">
                      <p className="feature-box">
                        {this.props.recommended_plans[
                          compare_plans_mobile_indexes[1]
                        ].service_id.includes("Intermediate Surgeries")
                          ? "Covered"
                          : "Not Covered"}
                      </p>
                      {this.props.recommended_plans[
                        compare_plans_mobile_indexes[1]
                      ].service_id.includes("Intermediate Surgeries") ? (
                        <ul className="progress_bar">
                          <li className="green">
                            <span></span>
                          </li>
                          <li className="green">
                            <span></span>
                          </li>
                          <li className="green">
                            <span></span>
                          </li>
                          <li className="green">
                            <span></span>
                          </li>
                          <li className="green">
                            <span></span>
                          </li>
                        </ul>
                      ) : (
                        <ul className="progress_bar">
                          <li className="">
                            <span></span>
                          </li>
                          <li className="">
                            <span></span>
                          </li>
                          <li className="">
                            <span></span>
                          </li>
                          <li className="">
                            <span></span>
                          </li>
                          <li className="">
                            <span></span>
                          </li>
                        </ul>
                      )}
                    </div>
                  </div>

                  <div className="columns">
                    <div className="column w_100">
                      <h3 className="subtitle">Major Surgeries</h3>
                    </div>
                  </div>

                  <div className="columns">
                    <div className="column w_50 ">
                      <p className="feature-box">
                        {this.props.recommended_plans[
                          compare_plans_mobile_indexes[0]
                        ].service_id.includes("Major Surgeries")
                          ? "Covered"
                          : "Not Covered"}
                      </p>
                      {this.props.recommended_plans[
                        compare_plans_mobile_indexes[0]
                      ].service_id.includes("Major Surgeries") ? (
                        <ul className="progress_bar">
                          <li className="green">
                            <span></span>
                          </li>
                          <li className="green">
                            <span></span>
                          </li>
                          <li className="green">
                            <span></span>
                          </li>
                          <li className="green">
                            <span></span>
                          </li>
                          <li className="green">
                            <span></span>
                          </li>
                        </ul>
                      ) : (
                        <ul className="progress_bar">
                          <li className="">
                            <span></span>
                          </li>
                          <li className="">
                            <span></span>
                          </li>
                          <li className="">
                            <span></span>
                          </li>
                          <li className="">
                            <span></span>
                          </li>
                          <li className="">
                            <span></span>
                          </li>
                        </ul>
                      )}
                    </div>
                    <div className="column w_50 ">
                      <p className="feature-box">
                        {this.props.recommended_plans[
                          compare_plans_mobile_indexes[1]
                        ].service_id.includes("Major Surgeries")
                          ? "Covered"
                          : "Not Covered"}
                      </p>
                      {this.props.recommended_plans[
                        compare_plans_mobile_indexes[1]
                      ].service_id.includes("Major Surgeries") ? (
                        <ul className="progress_bar">
                          <li className="green">
                            <span></span>
                          </li>
                          <li className="green">
                            <span></span>
                          </li>
                          <li className="green">
                            <span></span>
                          </li>
                          <li className="green">
                            <span></span>
                          </li>
                          <li className="green">
                            <span></span>
                          </li>
                        </ul>
                      ) : (
                        <ul className="progress_bar">
                          <li className="">
                            <span></span>
                          </li>
                          <li className="">
                            <span></span>
                          </li>
                          <li className="">
                            <span></span>
                          </li>
                          <li className="">
                            <span></span>
                          </li>
                          <li className="">
                            <span></span>
                          </li>
                        </ul>
                      )}
                    </div>
                  </div>

                  <div className="columns">
                    <div className="column w_100">
                      <h3 className="subtitle">Intensive Care</h3>
                    </div>
                  </div>
                  <div className="columns">
                    <div className="column w_50 ">
                      <p className="feature-box">
                        {this.props.recommended_plans[
                          compare_plans_mobile_indexes[0]
                        ].service_id.includes("Intensive Care Services")
                          ? "Covered"
                          : "Not Covered"}
                      </p>
                      {this.props.recommended_plans[
                        compare_plans_mobile_indexes[0]
                      ].service_id.includes("Intensive Care Services") ? (
                        <ul className="progress_bar">
                          <li className="green">
                            <span></span>
                          </li>
                          <li className="green">
                            <span></span>
                          </li>
                          <li className="green">
                            <span></span>
                          </li>
                          <li className="green">
                            <span></span>
                          </li>
                          <li className="green">
                            <span></span>
                          </li>
                        </ul>
                      ) : (
                        <ul className="progress_bar">
                          <li className="">
                            <span></span>
                          </li>
                          <li className="">
                            <span></span>
                          </li>
                          <li className="">
                            <span></span>
                          </li>
                          <li className="">
                            <span></span>
                          </li>
                          <li className="">
                            <span></span>
                          </li>
                        </ul>
                      )}
                    </div>
                    <div className="column w_50 ">
                      <p className="feature-box">
                        {this.props.recommended_plans[
                          compare_plans_mobile_indexes[1]
                        ].service_id.includes("Intensive Care Services")
                          ? "Covered"
                          : "Not Covered"}
                      </p>
                      {this.props.recommended_plans[
                        compare_plans_mobile_indexes[1]
                      ].service_id.includes("Intensive Care Services") ? (
                        <ul className="progress_bar">
                          <li className="green">
                            <span></span>
                          </li>
                          <li className="green">
                            <span></span>
                          </li>
                          <li className="green">
                            <span></span>
                          </li>
                          <li className="green">
                            <span></span>
                          </li>
                          <li className="green">
                            <span></span>
                          </li>
                        </ul>
                      ) : (
                        <ul className="progress_bar">
                          <li className="">
                            <span></span>
                          </li>
                          <li className="">
                            <span></span>
                          </li>
                          <li className="">
                            <span></span>
                          </li>
                          <li className="">
                            <span></span>
                          </li>
                          <li className="">
                            <span></span>
                          </li>
                        </ul>
                      )}
                    </div>
                  </div>

                  <div className="columns">
                    <div className="column w_100">
                      <h3 className="subtitle">Maternity Services</h3>
                    </div>
                  </div>
                  <div className="columns">
                    <div className="column w_50 ">
                      <p className="feature-box">
                        {this.props.recommended_plans[
                          compare_plans_mobile_indexes[0]
                        ].service_id.includes("Maternity Services")
                          ? "Covered"
                          : "Not Covered"}
                      </p>
                      {this.props.recommended_plans[
                        compare_plans_mobile_indexes[0]
                      ].service_id.includes("Maternity Services") ? (
                        <ul className="progress_bar">
                          <li className="green">
                            <span></span>
                          </li>
                          <li className="green">
                            <span></span>
                          </li>
                          <li className="green">
                            <span></span>
                          </li>
                          <li className="green">
                            <span></span>
                          </li>
                          <li className="green">
                            <span></span>
                          </li>
                        </ul>
                      ) : (
                        <ul className="progress_bar">
                          <li className="">
                            <span></span>
                          </li>
                          <li className="">
                            <span></span>
                          </li>
                          <li className="">
                            <span></span>
                          </li>
                          <li className="">
                            <span></span>
                          </li>
                          <li className="">
                            <span></span>
                          </li>
                        </ul>
                      )}
                    </div>
                    <div className="column w_50 ">
                      <p className="feature-box">
                        {this.props.recommended_plans[
                          compare_plans_mobile_indexes[1]
                        ].service_id.includes("Maternity Services")
                          ? "Covered"
                          : "Not Covered"}
                      </p>
                      {this.props.recommended_plans[
                        compare_plans_mobile_indexes[1]
                      ].service_id.includes("Maternity Services") ? (
                        <ul className="progress_bar">
                          <li className="green">
                            <span></span>
                          </li>
                          <li className="green">
                            <span></span>
                          </li>
                          <li className="green">
                            <span></span>
                          </li>
                          <li className="green">
                            <span></span>
                          </li>
                          <li className="green">
                            <span></span>
                          </li>
                        </ul>
                      ) : (
                        <ul className="progress_bar">
                          <li className="">
                            <span></span>
                          </li>
                          <li className="">
                            <span></span>
                          </li>
                          <li className="">
                            <span></span>
                          </li>
                          <li className="">
                            <span></span>
                          </li>
                          <li className="">
                            <span></span>
                          </li>
                        </ul>
                      )}
                    </div>
                  </div>

                  <div className="columns">
                    <div className="column w_100">
                      <h3 className="subtitle">Antenatal Services</h3>
                    </div>
                  </div>
                  <div className="columns">
                    <div className="column w_50 ">
                      <p className="feature-box">
                        {this.props.recommended_plans[
                          compare_plans_mobile_indexes[0]
                        ].service_id.includes("Ante Natal Services")
                          ? "Covered"
                          : "Not Covered"}
                      </p>
                      {this.props.recommended_plans[
                        compare_plans_mobile_indexes[0]
                      ].service_id.includes("Ante Natal Services") ? (
                        <ul className="progress_bar">
                          <li className="green">
                            <span></span>
                          </li>
                          <li className="green">
                            <span></span>
                          </li>
                          <li className="green">
                            <span></span>
                          </li>
                          <li className="green">
                            <span></span>
                          </li>
                          <li className="green">
                            <span></span>
                          </li>
                        </ul>
                      ) : (
                        <ul className="progress_bar">
                          <li className="">
                            <span></span>
                          </li>
                          <li className="">
                            <span></span>
                          </li>
                          <li className="">
                            <span></span>
                          </li>
                          <li className="">
                            <span></span>
                          </li>
                          <li className="">
                            <span></span>
                          </li>
                        </ul>
                      )}
                    </div>
                    <div className="column w_50 ">
                      <p className="feature-box">
                        {this.props.recommended_plans[
                          compare_plans_mobile_indexes[1]
                        ].service_id.includes("Ante Natal Services")
                          ? "Covered"
                          : "Not Covered"}
                      </p>
                      {this.props.recommended_plans[
                        compare_plans_mobile_indexes[1]
                      ].service_id.includes("Ante Natal Services") ? (
                        <ul className="progress_bar">
                          <li className="green">
                            <span></span>
                          </li>
                          <li className="green">
                            <span></span>
                          </li>
                          <li className="green">
                            <span></span>
                          </li>
                          <li className="green">
                            <span></span>
                          </li>
                          <li className="green">
                            <span></span>
                          </li>
                        </ul>
                      ) : (
                        <ul className="progress_bar">
                          <li className="">
                            <span></span>
                          </li>
                          <li className="">
                            <span></span>
                          </li>
                          <li className="">
                            <span></span>
                          </li>
                          <li className="">
                            <span></span>
                          </li>
                          <li className="">
                            <span></span>
                          </li>
                        </ul>
                      )}
                    </div>
                  </div>

                  <div className="columns">
                    <div className="column w_100">
                      <h3 className="subtitle">Postnatal Services</h3>
                    </div>
                  </div>

                  <div className="columns">
                    <div className="column w_50 ">
                      <p className="feature-box">
                        {this.props.recommended_plans[
                          compare_plans_mobile_indexes[0]
                        ].service_id.includes("Post Natal Services")
                          ? "Covered"
                          : "Not Covered"}
                      </p>
                      {this.props.recommended_plans[
                        compare_plans_mobile_indexes[0]
                      ].service_id.includes("Post Natal Services") ? (
                        <ul className="progress_bar">
                          <li className="green">
                            <span></span>
                          </li>
                          <li className="green">
                            <span></span>
                          </li>
                          <li className="green">
                            <span></span>
                          </li>
                          <li className="green">
                            <span></span>
                          </li>
                          <li className="green">
                            <span></span>
                          </li>
                        </ul>
                      ) : (
                        <ul className="progress_bar">
                          <li className="">
                            <span></span>
                          </li>
                          <li className="">
                            <span></span>
                          </li>
                          <li className="">
                            <span></span>
                          </li>
                          <li className="">
                            <span></span>
                          </li>
                          <li className="">
                            <span></span>
                          </li>
                        </ul>
                      )}
                    </div>
                    <div className="column w_50 ">
                      <p className="feature-box">
                        {this.props.recommended_plans[
                          compare_plans_mobile_indexes[1]
                        ].service_id.includes("Post Natal Services")
                          ? "Covered"
                          : "Not Covered"}
                      </p>
                      {this.props.recommended_plans[
                        compare_plans_mobile_indexes[1]
                      ].service_id.includes("Post Natal Services") ? (
                        <ul className="progress_bar">
                          <li className="green">
                            <span></span>
                          </li>
                          <li className="green">
                            <span></span>
                          </li>
                          <li className="green">
                            <span></span>
                          </li>
                          <li className="green">
                            <span></span>
                          </li>
                          <li className="green">
                            <span></span>
                          </li>
                        </ul>
                      ) : (
                        <ul className="progress_bar">
                          <li className="">
                            <span></span>
                          </li>
                          <li className="">
                            <span></span>
                          </li>
                          <li className="">
                            <span></span>
                          </li>
                          <li className="">
                            <span></span>
                          </li>
                          <li className="">
                            <span></span>
                          </li>
                        </ul>
                      )}
                    </div>
                  </div>
                  {/* <div>
                    <section className="section grey_background similar_plans call_scheduling_compare"></section>
                  </div> */}

                  <div className="columns  call_schedule_hospitals">
                    <div className="column w_100">
                      <h3 className="subtitle">Hospital Network</h3>
                      <a
                        className="is-primary tooltip is-tooltip-right tip-box"
                        data-tooltip="Pincode:- 110001"
                      >
                        in Nigeria
                      </a>
                    </div>
                  </div>
                  <div className="columns">
                    <div className="column w_50 ">
                      <p className=" has-text-weight-bold sp-more">
                        {JSON.parse(
                          this.props.recommended_plans[
                            compare_plans_mobile_indexes[0]
                          ].hmo_id.provider_id
                        ).map((prov) => prov + ", ")}
                      </p>
                      <a className="block is-active link-bottom">
                        View hospitals
                      </a>
                    </div>
                    <div className="column w_50 ">
                      <p className=" has-text-weight-bold sp-more">
                        {JSON.parse(
                          this.props.recommended_plans[
                            compare_plans_mobile_indexes[1]
                          ].hmo_id.provider_id
                        ).map((prov) => prov + ", ")}
                      </p>
                      <a className="block is-active link-bottom">
                        View network hospitals
                      </a>
                    </div>
                  </div>

                  <div className="column grey_background w_100">
                    Emergency Coverage
                  </div>

                  <div className="columns">
                    <div className="column w_100">
                      <h3 className="subtitle">Ambulance</h3>
                    </div>
                  </div>
                  <div className="columns">
                    <div className="column w_50 ">
                      <p className="feature-box">
                        {this.props.recommended_plans[
                          compare_plans_mobile_indexes[0]
                        ].service_id.includes("Ambulance")
                          ? "Covered"
                          : "Not Covered"}
                      </p>
                      {this.props.recommended_plans[
                        compare_plans_mobile_indexes[0]
                      ].service_id.includes("Ambulance") ? (
                        <ul className="progress_bar">
                          <li className="green">
                            <span></span>
                          </li>
                          <li className="green">
                            <span></span>
                          </li>
                          <li className="green">
                            <span></span>
                          </li>
                          <li className="green">
                            <span></span>
                          </li>
                          <li className="green">
                            <span></span>
                          </li>
                        </ul>
                      ) : (
                        <ul className="progress_bar">
                          <li className="">
                            <span></span>
                          </li>
                          <li className="">
                            <span></span>
                          </li>
                          <li className="">
                            <span></span>
                          </li>
                          <li className="">
                            <span></span>
                          </li>
                          <li className="">
                            <span></span>
                          </li>
                        </ul>
                      )}
                    </div>
                    <div className="column w_50 ">
                      <p className="feature-box">
                        {this.props.recommended_plans[
                          compare_plans_mobile_indexes[1]
                        ].service_id.includes("Ambulance")
                          ? "Covered"
                          : "Not Covered"}
                      </p>
                      {this.props.recommended_plans[
                        compare_plans_mobile_indexes[1]
                      ].service_id.includes("Ambulance") ? (
                        <ul className="progress_bar">
                          <li className="green">
                            <span></span>
                          </li>
                          <li className="green">
                            <span></span>
                          </li>
                          <li className="green">
                            <span></span>
                          </li>
                          <li className="green">
                            <span></span>
                          </li>
                          <li className="green">
                            <span></span>
                          </li>
                        </ul>
                      ) : (
                        <ul className="progress_bar">
                          <li className="">
                            <span></span>
                          </li>
                          <li className="">
                            <span></span>
                          </li>
                          <li className="">
                            <span></span>
                          </li>
                          <li className="">
                            <span></span>
                          </li>
                          <li className="">
                            <span></span>
                          </li>
                        </ul>
                      )}
                    </div>
                  </div>

                  <div>
                    <section className="section grey_background similar_plans">
                      <h3>SIMILAR PLANS</h3>
                      <h4>
                        Users who compared these plans also compared the below{" "}
                      </h4>
                      <div className="box-mob-slider">
                        <div className="slider-new ">
                          {this.props.recommended_plans.map(
                            (similar_plan, i) => {
                              // console.log(
                              //   "i",
                              //   i,
                              //   "compare_plans_mobile_indexes",
                              //   compare_plans_mobile_indexes,
                              //   "compare_plans_mobile_indexes.includes(i.toString())",
                              //   compare_plans_mobile_indexes.includes(i.toString())
                              // );
                              return compare_plans_mobile_indexes.includes(
                                i.toString()
                              ) == false ? (
                                <div className="box-new">
                                  <ul className="similar_plan_ul">
                                    <li>
                                      <div className="box_block">
                                        <div className="img-box-logo-similar">
                                          <img
                                            src={similar_plan.hmo_id.logo}
                                            alt="Aditya Birla"
                                            width="100"
                                          />
                                        </div>
                                        <span className="grey-mob">
                                          {similar_plan.name}
                                        </span>
                                      </div>
                                      <p className="is-hidden-mobile">
                                        ₦
                                        {this.props.quiz.responses.type ==
                                        "single"
                                          ? similar_plan.individual_annual_price
                                          : similar_plan.family_annual_price}
                                        / year
                                      </p>
                                      <ul>
                                        <li>
                                          {
                                            this.props.quiz.responses
                                              .num_of_people
                                          }{" "}
                                          {this.props.quiz.responses
                                            .num_of_people > 1
                                            ? " people"
                                            : " person"}{" "}
                                          <span>Sum Insured</span>
                                        </li>
                                        <li>
                                          {
                                            JSON.parse(
                                              similar_plan.hmo_id.provider_id
                                            ).length
                                          }{" "}
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
                                          compare_plans_mobile_indexes.length <
                                          2
                                            ? false
                                            : true
                                        }
                                        onClick={() => {
                                          this.handleCheckedPlanToCompareOnMobile(
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
                            }
                          )}
                        </div>
                      </div>
                    </section>
                  </div>
                </section>
              </div>
            </section>
          </div>
        ) : compare_plans_desktop_indexes ? (
          <div className="desktop-view quotes_main_container">
            <div className="navbarWrapper">
              <div className="">
                <nav
                  className="green_theme navbar"
                  role="navigation"
                  aria-label="main navigation"
                >
                  <Col
                    className="row nav-info plans-desktop header  details-desktop-header"
                    xs={24}
                    md={8}
                  >
                    <Link to="/">
                      <img
                        src="images/logo2.png"
                        alt="Logo"
                        className="details-ic-logo"
                      />
                      {/* <div className={styles.connect}>hmo connect</div> */}
                    </Link>
                  </Col>
                </nav>
              </div>
            </div>
            <section className="section hero compare_parent sp-top-main">
              <div className="container">
                <div className="sticky">
                  <div className="top_fixed_box column">
                    <div className="columns difference_column">
                      <div className="column">
                        <a
                          className="button back_btn  is-hidden-mobile is-hidden-tablet-only"
                          id="CompareBack"
                        >
                          <span className="arrow-icon"></span> Back
                        </a>
                        <div className=" w_100 mobile_diff">
                          <label className="checkbox_label">
                            <input type="checkbox" className="checkbox" />
                            <span className="checkbox_custm"></span>Show
                            differences
                          </label>
                        </div>
                      </div>
                      <div className="column w_50 ">
                        <img
                          src={
                            this.props.recommended_plans[
                              compare_plans_desktop_indexes[0]
                            ].hmo_id.logo
                          }
                          alt="Care Health"
                          width="80"
                        />
                        <p className="box-plan-2">
                          <span className="plan-2">
                            {
                              this.props.recommended_plans[
                                compare_plans_desktop_indexes[0]
                              ].name
                            }
                          </span>
                          <a className="is-inline-flex is-hidden-mobile is-hidden-tablet-only edit-plan-close">
                            ×
                          </a>
                          <a
                            className="close_plan is-hidden-desktop edit-plan-close"
                            onClick={() => {
                              this.removePlanFromDesktopCheckedIndexes(
                                compare_plans_desktop_indexes[0]
                              );
                            }}
                          >
                            ×
                          </a>
                        </p>

                        <button className="button ">
                          {this.props.quiz.responses.type == "single"
                            ? `₦${
                                this.props.recommended_plans[
                                  compare_plans_desktop_indexes[0]
                                ].individual_annual_price
                              }`
                            : `₦${
                                this.props.recommended_plans[
                                  compare_plans_desktop_indexes[0]
                                ].family_annual_price
                              }`}{" "}
                          annually<span className="arrow-icon-right"></span>
                        </button>
                        {/* <span className="yearly-text"> ₹ 7,921 paid annually</span> */}
                      </div>
                      <div className="column w_50 ">
                        <img
                          src={
                            this.props.recommended_plans[
                              compare_plans_desktop_indexes[1]
                            ].hmo_id.logo
                          }
                          alt="Max Bupa"
                          width="80"
                        />
                        <p className="box-plan-2">
                          <span className="plan-2">
                            {
                              this.props.recommended_plans[
                                compare_plans_desktop_indexes[1]
                              ].name
                            }
                          </span>
                          <a className="is-inline-flex is-hidden-mobile is-hidden-tablet-only edit-plan-close">
                            ×
                          </a>
                          <a
                            className="close_plan is-hidden-desktop edit-plan-close"
                            onClick={() => {
                              this.removePlanFromDesktopCheckedIndexes(
                                compare_plans_desktop_indexes[1]
                              );
                            }}
                          >
                            ×
                          </a>
                        </p>
                        <button className="button ">
                          {this.props.quiz.responses.type == "single"
                            ? `₦${
                                this.props.recommended_plans[
                                  compare_plans_desktop_indexes[1]
                                ].individual_annual_price
                              }`
                            : `₦${
                                this.props.recommended_plans[
                                  compare_plans_desktop_indexes[1]
                                ].family_annual_price
                              }`}{" "}
                          annually<span className="arrow-icon-right"></span>
                        </button>
                        {/* <span className="yearly-text"> ₹ 10,992 paid annually</span> */}
                      </div>
                      {compare_plans_desktop_indexes[2] ? (
                        <div className="column w_50 is-hidden-mobile is-hidden-tablet-only">
                          <img
                            src={
                              this.props.recommended_plans[
                                compare_plans_desktop_indexes[2]
                              ].hmo_id.logo
                            }
                            alt="Star Health"
                            width="80"
                          />
                          <p className="box-plan-2">
                            <span className="plan-2">
                              {
                                this.props.recommended_plans[
                                  compare_plans_desktop_indexes[2]
                                ].name
                              }
                            </span>
                            <a className="is-inline-flex is-hidden-mobile is-hidden-tablet-only edit-plan-close">
                              ×
                            </a>
                            <a
                              className="close_plan is-hidden-desktop edit-plan-close"
                              onClick={() => {
                                this.removePlanFromDesktopCheckedIndexes(
                                  compare_plans_desktop_indexes[2]
                                );
                              }}
                            >
                              ×
                            </a>
                          </p>
                          <button className="button ">
                            {this.props.quiz.responses.type == "single"
                              ? `₦${
                                  this.props.recommended_plans[
                                    compare_plans_desktop_indexes[2]
                                  ].individual_annual_price
                                }`
                              : `₦${
                                  this.props.recommended_plans[
                                    compare_plans_desktop_indexes[2]
                                  ].family_annual_price
                                }`}{" "}
                            annually<span className="arrow-icon-right"></span>
                          </button>
                          {/* <span className="yearly-text"> ₹ 7,432 paid annually</span> */}
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                </div>
                <section className="section content_section">
                  <div className="columns green_background">
                    <div className="column w_100">SUM INSURED</div>
                    <div className="column w_50 ">
                      <h3 className="select">
                        {this.props.quiz.responses.type == "single"
                          ? `₦${
                              this.props.recommended_plans[
                                compare_plans_desktop_indexes[0]
                              ].individual_annual_price
                            }`
                          : `₦${
                              this.props.recommended_plans[
                                compare_plans_desktop_indexes[0]
                              ].family_annual_price
                            }`}{" "}
                      </h3>
                    </div>
                    <div className="column w_50 ">
                      <h3 className="select">
                        {this.props.quiz.responses.type == "single"
                          ? `₦${
                              this.props.recommended_plans[
                                compare_plans_desktop_indexes[1]
                              ].individual_annual_price
                            }`
                          : `₦${
                              this.props.recommended_plans[
                                compare_plans_desktop_indexes[1]
                              ].family_annual_price
                            }`}{" "}
                      </h3>
                    </div>
                    {compare_plans_desktop_indexes[2] ? (
                      <div className="column w_50 is-hidden-mobile is-hidden-tablet-only">
                        <h3 className="select">
                          {this.props.quiz.responses.type == "single"
                            ? `₦${
                                this.props.recommended_plans[
                                  compare_plans_desktop_indexes[2]
                                ].individual_annual_price
                              }`
                            : `₦${
                                this.props.recommended_plans[
                                  compare_plans_desktop_indexes[2]
                                ].family_annual_price
                              }`}{" "}
                        </h3>
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                  <div className="columns green_background">
                    <div className="column w_100">TERM</div>
                    <div className="column w_50 ">
                      <h3 className="select">
                        {
                          this.props.recommended_plans[
                            compare_plans_desktop_indexes[0]
                          ].duration
                        }
                      </h3>
                      {/* <span className="span_saves">&nbsp;</span> */}
                    </div>
                    <div className="column w_50 ">
                      <h3 className="select">
                        {
                          this.props.recommended_plans[
                            compare_plans_desktop_indexes[1]
                          ].duration
                        }
                      </h3>
                      {/* <span className="span_saves">&nbsp;</span> */}
                    </div>
                    {compare_plans_desktop_indexes[2] ? (
                      <div className="column w_50 is-hidden-mobile is-hidden-tablet-only">
                        <h3 className="select">
                          {
                            this.props.recommended_plans[
                              compare_plans_desktop_indexes[2]
                            ].duration
                          }
                        </h3>
                        {/* <span className="span_saves">&nbsp;</span> */}
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                </section>
                <section className="section content_section mt-top">
                  <div className="column grey_background w_100">
                    TOP FEATURES
                  </div>
                  <div className="columns">
                    <div className="column w_100">
                      <p className="subtitle">Admission</p>
                      {/* <a
                    className="is-primary tooltip is-tooltip-multiline is-tooltip-right tip-box"
                    data-tooltip="Room rent capping have a direct implication on your claim payout, (Eg.Room rent limit is 4K and You have availed 5k room rent, then also you will be eligible for only 4K i.e 80% of total room rent.)"
                  >
                    Why is it important?
                  </a> */}
                    </div>
                    <div className="column w_50 ">
                      <p className="feature-box">
                        {this.props.recommended_plans[
                          compare_plans_desktop_indexes[0]
                        ].service_id.includes("Accommodation")
                          ? "Covered"
                          : "Not Covered"}
                      </p>
                      {this.props.recommended_plans[
                        compare_plans_desktop_indexes[0]
                      ].service_id.includes("Accommodation") ? (
                        <ul className="progress_bar">
                          <li className="green">
                            <span></span>
                          </li>
                          <li className="green">
                            <span></span>
                          </li>
                          <li className="green">
                            <span></span>
                          </li>
                          <li className="green">
                            <span></span>
                          </li>
                          <li className="green">
                            <span></span>
                          </li>
                        </ul>
                      ) : (
                        <ul className="progress_bar">
                          <li className="">
                            <span></span>
                          </li>
                          <li className="">
                            <span></span>
                          </li>
                          <li className="">
                            <span></span>
                          </li>
                          <li className="">
                            <span></span>
                          </li>
                          <li className="">
                            <span></span>
                          </li>
                        </ul>
                      )}
                    </div>
                    <div className="column w_50 ">
                      <p className="feature-box">
                        {this.props.recommended_plans[
                          compare_plans_desktop_indexes[1]
                        ].service_id.includes("Accommodation")
                          ? "Covered"
                          : "Not Covered"}
                      </p>
                      {this.props.recommended_plans[
                        compare_plans_desktop_indexes[1]
                      ].service_id.includes("Accommodation") ? (
                        <ul className="progress_bar">
                          <li className="green">
                            <span></span>
                          </li>
                          <li className="green">
                            <span></span>
                          </li>
                          <li className="green">
                            <span></span>
                          </li>
                          <li className="green">
                            <span></span>
                          </li>
                          <li className="green">
                            <span></span>
                          </li>
                        </ul>
                      ) : (
                        <ul className="progress_bar">
                          <li className="">
                            <span></span>
                          </li>
                          <li className="">
                            <span></span>
                          </li>
                          <li className="">
                            <span></span>
                          </li>
                          <li className="">
                            <span></span>
                          </li>
                          <li className="">
                            <span></span>
                          </li>
                        </ul>
                      )}
                    </div>
                    {compare_plans_desktop_indexes[2] ? (
                      <div className="column w_50 is-hidden-mobile is-hidden-tablet-only">
                        <p className="feature-box">
                          {this.props.recommended_plans[
                            compare_plans_desktop_indexes[2]
                          ].service_id.includes("Accommodation")
                            ? "Covered"
                            : "Not Covered"}
                        </p>
                        {this.props.recommended_plans[
                          compare_plans_desktop_indexes[2]
                        ].service_id.includes("Accommodation") ? (
                          <ul className="progress_bar">
                            <li className="green">
                              <span></span>
                            </li>
                            <li className="green">
                              <span></span>
                            </li>
                            <li className="green">
                              <span></span>
                            </li>
                            <li className="green">
                              <span></span>
                            </li>
                            <li className="green">
                              <span></span>
                            </li>
                          </ul>
                        ) : (
                          <ul className="progress_bar">
                            <li className="">
                              <span></span>
                            </li>
                            <li className="">
                              <span></span>
                            </li>
                            <li className="">
                              <span></span>
                            </li>
                            <li className="">
                              <span></span>
                            </li>
                            <li className="">
                              <span></span>
                            </li>
                          </ul>
                        )}
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                  <div className="columns">
                    <div className="column w_100">
                      <p className="subtitle">Accidents & Emergencies</p>
                      {/* <a
                    className="is-primary tooltip is-tooltip-multiline is-tooltip-right tip-box"
                    data-tooltip="Percentage of Current SumInsured will be added at the same premium if Claim is not taken in current policy year, So higher the Percentage, better the coverage"
                  >
                    Why is it important?
                  </a> */}
                    </div>
                    <div className="column w_50 ">
                      <p className="feature-box">
                        {this.props.recommended_plans[
                          compare_plans_desktop_indexes[0]
                        ].service_id.includes("Accidents & Emergencies")
                          ? "Covered"
                          : "Not Covered"}
                      </p>
                      {this.props.recommended_plans[
                        compare_plans_desktop_indexes[0]
                      ].service_id.includes("Accidents & Emergencies") ? (
                        <ul className="progress_bar">
                          <li className="green">
                            <span></span>
                          </li>
                          <li className="green">
                            <span></span>
                          </li>
                          <li className="green">
                            <span></span>
                          </li>
                          <li className="green">
                            <span></span>
                          </li>
                          <li className="green">
                            <span></span>
                          </li>
                        </ul>
                      ) : (
                        <ul className="progress_bar">
                          <li className="">
                            <span></span>
                          </li>
                          <li className="">
                            <span></span>
                          </li>
                          <li className="">
                            <span></span>
                          </li>
                          <li className="">
                            <span></span>
                          </li>
                          <li className="">
                            <span></span>
                          </li>
                        </ul>
                      )}
                    </div>
                    <div className="column w_50 ">
                      <p className="feature-box">
                        {this.props.recommended_plans[
                          compare_plans_desktop_indexes[1]
                        ].service_id.includes("Accidents & Emergencies")
                          ? "Covered"
                          : "Not Covered"}
                      </p>
                      {this.props.recommended_plans[
                        compare_plans_desktop_indexes[1]
                      ].service_id.includes("Accidents & Emergencies") ? (
                        <ul className="progress_bar">
                          <li className="green">
                            <span></span>
                          </li>
                          <li className="green">
                            <span></span>
                          </li>
                          <li className="green">
                            <span></span>
                          </li>
                          <li className="green">
                            <span></span>
                          </li>
                          <li className="green">
                            <span></span>
                          </li>
                        </ul>
                      ) : (
                        <ul className="progress_bar">
                          <li className="">
                            <span></span>
                          </li>
                          <li className="">
                            <span></span>
                          </li>
                          <li className="">
                            <span></span>
                          </li>
                          <li className="">
                            <span></span>
                          </li>
                          <li className="">
                            <span></span>
                          </li>
                        </ul>
                      )}
                    </div>
                    {compare_plans_desktop_indexes[2] ? (
                      <div className="column w_50 is-hidden-mobile is-hidden-tablet-only">
                        <p className="feature-box">
                          {this.props.recommended_plans[
                            compare_plans_desktop_indexes[2]
                          ].service_id.includes("Accidents & Emergencies")
                            ? "Covered"
                            : "Not Covered"}
                        </p>
                        {this.props.recommended_plans[
                          compare_plans_desktop_indexes[2]
                        ].service_id.includes("Accidents & Emergencies") ? (
                          <ul className="progress_bar">
                            <li className="green">
                              <span></span>
                            </li>
                            <li className="green">
                              <span></span>
                            </li>
                            <li className="green">
                              <span></span>
                            </li>
                            <li className="green">
                              <span></span>
                            </li>
                            <li className="green">
                              <span></span>
                            </li>
                          </ul>
                        ) : (
                          <ul className="progress_bar">
                            <li className="">
                              <span></span>
                            </li>
                            <li className="">
                              <span></span>
                            </li>
                            <li className="">
                              <span></span>
                            </li>
                            <li className="">
                              <span></span>
                            </li>
                            <li className="">
                              <span></span>
                            </li>
                          </ul>
                        )}
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                  <div className="columns">
                    <div className="column w_100">
                      <p className="subtitle">Investigations</p>
                    </div>
                    <div className="column w_50 ">
                      <p className="feature-box">
                        {this.props.recommended_plans[
                          compare_plans_desktop_indexes[0]
                        ].service_id.includes("Investigations")
                          ? "Covered"
                          : "Not Covered"}
                      </p>
                      {this.props.recommended_plans[
                        compare_plans_desktop_indexes[0]
                      ].service_id.includes("Investigations") ? (
                        <ul className="progress_bar">
                          <li className="green">
                            <span></span>
                          </li>
                          <li className="green">
                            <span></span>
                          </li>
                          <li className="green">
                            <span></span>
                          </li>
                          <li className="green">
                            <span></span>
                          </li>
                          <li className="green">
                            <span></span>
                          </li>
                        </ul>
                      ) : (
                        <ul className="progress_bar">
                          <li className="">
                            <span></span>
                          </li>
                          <li className="">
                            <span></span>
                          </li>
                          <li className="">
                            <span></span>
                          </li>
                          <li className="">
                            <span></span>
                          </li>
                          <li className="">
                            <span></span>
                          </li>
                        </ul>
                      )}
                    </div>
                    <div className="column w_50 ">
                      <p className="feature-box">
                        {this.props.recommended_plans[
                          compare_plans_desktop_indexes[1]
                        ].service_id.includes("Investigations")
                          ? "Covered"
                          : "Not Covered"}
                      </p>
                      {this.props.recommended_plans[
                        compare_plans_desktop_indexes[1]
                      ].service_id.includes("Investigations") ? (
                        <ul className="progress_bar">
                          <li className="green">
                            <span></span>
                          </li>
                          <li className="green">
                            <span></span>
                          </li>
                          <li className="green">
                            <span></span>
                          </li>
                          <li className="green">
                            <span></span>
                          </li>
                          <li className="green">
                            <span></span>
                          </li>
                        </ul>
                      ) : (
                        <ul className="progress_bar">
                          <li className="">
                            <span></span>
                          </li>
                          <li className="">
                            <span></span>
                          </li>
                          <li className="">
                            <span></span>
                          </li>
                          <li className="">
                            <span></span>
                          </li>
                          <li className="">
                            <span></span>
                          </li>
                        </ul>
                      )}
                    </div>
                    {compare_plans_desktop_indexes[2] ? (
                      <div className="column w_50 is-hidden-mobile is-hidden-tablet-only">
                        <p className="feature-box">
                          {this.props.recommended_plans[
                            compare_plans_desktop_indexes[2]
                          ].service_id.includes("Investigations")
                            ? "Covered"
                            : "Not Covered"}
                        </p>
                        {this.props.recommended_plans[
                          compare_plans_desktop_indexes[2]
                        ].service_id.includes("Investigations") ? (
                          <ul className="progress_bar">
                            <li className="green">
                              <span></span>
                            </li>
                            <li className="green">
                              <span></span>
                            </li>
                            <li className="green">
                              <span></span>
                            </li>
                            <li className="green">
                              <span></span>
                            </li>
                            <li className="green">
                              <span></span>
                            </li>
                          </ul>
                        ) : (
                          <ul className="progress_bar">
                            <li className="">
                              <span></span>
                            </li>
                            <li className="">
                              <span></span>
                            </li>
                            <li className="">
                              <span></span>
                            </li>
                            <li className="">
                              <span></span>
                            </li>
                            <li className="">
                              <span></span>
                            </li>
                          </ul>
                        )}
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                  <div className="columns">
                    <div className="column w_100">
                      <p className="subtitle">Minor Surgeries</p>
                      {/* <a
                    className="is-primary tooltip is-tooltip-multiline is-tooltip-right tip-box"
                    data-tooltip="Insurance companies will deduct this share and then settle the claim. Lower the Co-Pay, better the coverage"
                  >
                    Why is it important?
                  </a> */}
                    </div>
                    <div className="column w_50 ">
                      <p className="feature-box">
                        {this.props.recommended_plans[
                          compare_plans_desktop_indexes[0]
                        ].service_id.includes("Minor Surgeries")
                          ? "Covered"
                          : "Not Covered"}
                      </p>
                      {this.props.recommended_plans[
                        compare_plans_desktop_indexes[0]
                      ].service_id.includes("Minor Surgeries") ? (
                        <ul className="progress_bar">
                          <li className="green">
                            <span></span>
                          </li>
                          <li className="green">
                            <span></span>
                          </li>
                          <li className="green">
                            <span></span>
                          </li>
                          <li className="green">
                            <span></span>
                          </li>
                          <li className="green">
                            <span></span>
                          </li>
                        </ul>
                      ) : (
                        <ul className="progress_bar">
                          <li className="">
                            <span></span>
                          </li>
                          <li className="">
                            <span></span>
                          </li>
                          <li className="">
                            <span></span>
                          </li>
                          <li className="">
                            <span></span>
                          </li>
                          <li className="">
                            <span></span>
                          </li>
                        </ul>
                      )}
                    </div>
                    <div className="column w_50 ">
                      <p className="feature-box">
                        {this.props.recommended_plans[
                          compare_plans_desktop_indexes[1]
                        ].service_id.includes("Minor Surgeries")
                          ? "Covered"
                          : "Not Covered"}
                      </p>
                      {this.props.recommended_plans[
                        compare_plans_desktop_indexes[1]
                      ].service_id.includes("Minor Surgeries") ? (
                        <ul className="progress_bar">
                          <li className="green">
                            <span></span>
                          </li>
                          <li className="green">
                            <span></span>
                          </li>
                          <li className="green">
                            <span></span>
                          </li>
                          <li className="green">
                            <span></span>
                          </li>
                          <li className="green">
                            <span></span>
                          </li>
                        </ul>
                      ) : (
                        <ul className="progress_bar">
                          <li className="">
                            <span></span>
                          </li>
                          <li className="">
                            <span></span>
                          </li>
                          <li className="">
                            <span></span>
                          </li>
                          <li className="">
                            <span></span>
                          </li>
                          <li className="">
                            <span></span>
                          </li>
                        </ul>
                      )}
                    </div>
                    {compare_plans_desktop_indexes[2] ? (
                      <div className="column w_50 is-hidden-mobile is-hidden-tablet-only">
                        <p className="feature-box">
                          {this.props.recommended_plans[
                            compare_plans_desktop_indexes[2]
                          ].service_id.includes("Minor Surgeries")
                            ? "Covered"
                            : "Not Covered"}
                        </p>
                        {this.props.recommended_plans[
                          compare_plans_desktop_indexes[2]
                        ].service_id.includes("Minor Surgeries") ? (
                          <ul className="progress_bar">
                            <li className="green">
                              <span></span>
                            </li>
                            <li className="green">
                              <span></span>
                            </li>
                            <li className="green">
                              <span></span>
                            </li>
                            <li className="green">
                              <span></span>
                            </li>
                            <li className="green">
                              <span></span>
                            </li>
                          </ul>
                        ) : (
                          <ul className="progress_bar">
                            <li className="">
                              <span></span>
                            </li>
                            <li className="">
                              <span></span>
                            </li>
                            <li className="">
                              <span></span>
                            </li>
                            <li className="">
                              <span></span>
                            </li>
                            <li className="">
                              <span></span>
                            </li>
                          </ul>
                        )}
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                  <div className="columns">
                    <div className="column w_100">
                      <p className="subtitle">Intermediate Surgeries</p>
                    </div>
                    <div className="column w_50 ">
                      <p className="feature-box">
                        {this.props.recommended_plans[
                          compare_plans_desktop_indexes[0]
                        ].service_id.includes("Intermediate Surgeries")
                          ? "Covered"
                          : "Not Covered"}
                      </p>
                      {this.props.recommended_plans[
                        compare_plans_desktop_indexes[0]
                      ].service_id.includes("Intermediate Surgeries") ? (
                        <ul className="progress_bar">
                          <li className="green">
                            <span></span>
                          </li>
                          <li className="green">
                            <span></span>
                          </li>
                          <li className="green">
                            <span></span>
                          </li>
                          <li className="green">
                            <span></span>
                          </li>
                          <li className="green">
                            <span></span>
                          </li>
                        </ul>
                      ) : (
                        <ul className="progress_bar">
                          <li className="">
                            <span></span>
                          </li>
                          <li className="">
                            <span></span>
                          </li>
                          <li className="">
                            <span></span>
                          </li>
                          <li className="">
                            <span></span>
                          </li>
                          <li className="">
                            <span></span>
                          </li>
                        </ul>
                      )}
                    </div>
                    <div className="column w_50 ">
                      <p className="feature-box">
                        {this.props.recommended_plans[
                          compare_plans_desktop_indexes[1]
                        ].service_id.includes("Intermediate Surgeries")
                          ? "Covered"
                          : "Not Covered"}
                      </p>
                      {this.props.recommended_plans[
                        compare_plans_desktop_indexes[1]
                      ].service_id.includes("Intermediate Surgeries") ? (
                        <ul className="progress_bar">
                          <li className="green">
                            <span></span>
                          </li>
                          <li className="green">
                            <span></span>
                          </li>
                          <li className="green">
                            <span></span>
                          </li>
                          <li className="green">
                            <span></span>
                          </li>
                          <li className="green">
                            <span></span>
                          </li>
                        </ul>
                      ) : (
                        <ul className="progress_bar">
                          <li className="">
                            <span></span>
                          </li>
                          <li className="">
                            <span></span>
                          </li>
                          <li className="">
                            <span></span>
                          </li>
                          <li className="">
                            <span></span>
                          </li>
                          <li className="">
                            <span></span>
                          </li>
                        </ul>
                      )}
                    </div>
                    {compare_plans_desktop_indexes[2] ? (
                      <div className="column w_50 is-hidden-mobile is-hidden-tablet-only">
                        <p className="feature-box">
                          {this.props.recommended_plans[
                            compare_plans_desktop_indexes[2]
                          ].service_id.includes("Intermediate Surgeries")
                            ? "Covered"
                            : "Not Covered"}
                        </p>
                        {this.props.recommended_plans[
                          compare_plans_desktop_indexes[2]
                        ].service_id.includes("Intermediate Surgeries") ? (
                          <ul className="progress_bar">
                            <li className="green">
                              <span></span>
                            </li>
                            <li className="green">
                              <span></span>
                            </li>
                            <li className="green">
                              <span></span>
                            </li>
                            <li className="green">
                              <span></span>
                            </li>
                            <li className="green">
                              <span></span>
                            </li>
                          </ul>
                        ) : (
                          <ul className="progress_bar">
                            <li className="">
                              <span></span>
                            </li>
                            <li className="">
                              <span></span>
                            </li>
                            <li className="">
                              <span></span>
                            </li>
                            <li className="">
                              <span></span>
                            </li>
                            <li className="">
                              <span></span>
                            </li>
                          </ul>
                        )}
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                  <div className="columns">
                    <div className="column w_100">
                      <p className="subtitle">Major Surgeries</p>
                      {/* <a
                    className="is-primary tooltip is-tooltip-multiline is-tooltip-right tip-box"
                    data-tooltip="Covers Normal and Caesarean delivery expenses and may cover lawful medical complication of pregnancy"
                  >
                    Why is it important?
                  </a> */}
                    </div>
                    <div className="column w_50 ">
                      <p className="feature-box">
                        {this.props.recommended_plans[
                          compare_plans_desktop_indexes[0]
                        ].service_id.includes("Major Surgeries")
                          ? "Covered"
                          : "Not Covered"}
                      </p>
                      {this.props.recommended_plans[
                        compare_plans_desktop_indexes[0]
                      ].service_id.includes("Major Surgeries") ? (
                        <ul className="progress_bar">
                          <li className="green">
                            <span></span>
                          </li>
                          <li className="green">
                            <span></span>
                          </li>
                          <li className="green">
                            <span></span>
                          </li>
                          <li className="green">
                            <span></span>
                          </li>
                          <li className="green">
                            <span></span>
                          </li>
                        </ul>
                      ) : (
                        <ul className="progress_bar">
                          <li className="">
                            <span></span>
                          </li>
                          <li className="">
                            <span></span>
                          </li>
                          <li className="">
                            <span></span>
                          </li>
                          <li className="">
                            <span></span>
                          </li>
                          <li className="">
                            <span></span>
                          </li>
                        </ul>
                      )}
                    </div>
                    <div className="column w_50 ">
                      <p className="feature-box">
                        {this.props.recommended_plans[
                          compare_plans_desktop_indexes[1]
                        ].service_id.includes("Major Surgeries")
                          ? "Covered"
                          : "Not Covered"}
                      </p>
                      {this.props.recommended_plans[
                        compare_plans_desktop_indexes[1]
                      ].service_id.includes("Major Surgeries") ? (
                        <ul className="progress_bar">
                          <li className="green">
                            <span></span>
                          </li>
                          <li className="green">
                            <span></span>
                          </li>
                          <li className="green">
                            <span></span>
                          </li>
                          <li className="green">
                            <span></span>
                          </li>
                          <li className="green">
                            <span></span>
                          </li>
                        </ul>
                      ) : (
                        <ul className="progress_bar">
                          <li className="">
                            <span></span>
                          </li>
                          <li className="">
                            <span></span>
                          </li>
                          <li className="">
                            <span></span>
                          </li>
                          <li className="">
                            <span></span>
                          </li>
                          <li className="">
                            <span></span>
                          </li>
                        </ul>
                      )}
                    </div>
                    {compare_plans_desktop_indexes[2] ? (
                      <div className="column w_50 is-hidden-mobile is-hidden-tablet-only">
                        <p className="feature-box">
                          {this.props.recommended_plans[
                            compare_plans_desktop_indexes[2]
                          ].service_id.includes("Major Surgeries")
                            ? "Covered"
                            : "Not Covered"}
                        </p>
                        {this.props.recommended_plans[
                          compare_plans_desktop_indexes[2]
                        ].service_id.includes("Major Surgeries") ? (
                          <ul className="progress_bar">
                            <li className="green">
                              <span></span>
                            </li>
                            <li className="green">
                              <span></span>
                            </li>
                            <li className="green">
                              <span></span>
                            </li>
                            <li className="green">
                              <span></span>
                            </li>
                            <li className="green">
                              <span></span>
                            </li>
                          </ul>
                        ) : (
                          <ul className="progress_bar">
                            <li className="">
                              <span></span>
                            </li>
                            <li className="">
                              <span></span>
                            </li>
                            <li className="">
                              <span></span>
                            </li>
                            <li className="">
                              <span></span>
                            </li>
                            <li className="">
                              <span></span>
                            </li>
                          </ul>
                        )}
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                  <div className="columns">
                    <div className="column w_100">
                      <p className="subtitle">Intensive Care</p>
                    </div>
                    <div className="column w_50 ">
                      <p className="feature-box">
                        {this.props.recommended_plans[
                          compare_plans_desktop_indexes[0]
                        ].service_id.includes("Intensive Care Services")
                          ? "Covered"
                          : "Not Covered"}
                      </p>
                      {this.props.recommended_plans[
                        compare_plans_desktop_indexes[0]
                      ].service_id.includes("Intensive Care Services") ? (
                        <ul className="progress_bar">
                          <li className="green">
                            <span></span>
                          </li>
                          <li className="green">
                            <span></span>
                          </li>
                          <li className="green">
                            <span></span>
                          </li>
                          <li className="green">
                            <span></span>
                          </li>
                          <li className="green">
                            <span></span>
                          </li>
                        </ul>
                      ) : (
                        <ul className="progress_bar">
                          <li className="">
                            <span></span>
                          </li>
                          <li className="">
                            <span></span>
                          </li>
                          <li className="">
                            <span></span>
                          </li>
                          <li className="">
                            <span></span>
                          </li>
                          <li className="">
                            <span></span>
                          </li>
                        </ul>
                      )}
                    </div>
                    <div className="column w_50 ">
                      <p className="feature-box">
                        {this.props.recommended_plans[
                          compare_plans_desktop_indexes[1]
                        ].service_id.includes("Intensive Care Services")
                          ? "Covered"
                          : "Not Covered"}
                      </p>
                      {this.props.recommended_plans[
                        compare_plans_desktop_indexes[1]
                      ].service_id.includes("Intensive Care Services") ? (
                        <ul className="progress_bar">
                          <li className="green">
                            <span></span>
                          </li>
                          <li className="green">
                            <span></span>
                          </li>
                          <li className="green">
                            <span></span>
                          </li>
                          <li className="green">
                            <span></span>
                          </li>
                          <li className="green">
                            <span></span>
                          </li>
                        </ul>
                      ) : (
                        <ul className="progress_bar">
                          <li className="">
                            <span></span>
                          </li>
                          <li className="">
                            <span></span>
                          </li>
                          <li className="">
                            <span></span>
                          </li>
                          <li className="">
                            <span></span>
                          </li>
                          <li className="">
                            <span></span>
                          </li>
                        </ul>
                      )}
                    </div>
                    {compare_plans_desktop_indexes[2] ? (
                      <div className="column w_50 is-hidden-mobile is-hidden-tablet-only">
                        <p className="feature-box">
                          {this.props.recommended_plans[
                            compare_plans_desktop_indexes[2]
                          ].service_id.includes("Intensive Care Services")
                            ? "Covered"
                            : "Not Covered"}
                        </p>
                        {this.props.recommended_plans[
                          compare_plans_desktop_indexes[2]
                        ].service_id.includes("Intensive Care Services") ? (
                          <ul className="progress_bar">
                            <li className="green">
                              <span></span>
                            </li>
                            <li className="green">
                              <span></span>
                            </li>
                            <li className="green">
                              <span></span>
                            </li>
                            <li className="green">
                              <span></span>
                            </li>
                            <li className="green">
                              <span></span>
                            </li>
                          </ul>
                        ) : (
                          <ul className="progress_bar">
                            <li className="">
                              <span></span>
                            </li>
                            <li className="">
                              <span></span>
                            </li>
                            <li className="">
                              <span></span>
                            </li>
                            <li className="">
                              <span></span>
                            </li>
                            <li className="">
                              <span></span>
                            </li>
                          </ul>
                        )}
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                  <div className="columns">
                    <div className="column w_100">
                      <p className="subtitle">Maternity Services</p>
                    </div>
                    <div className="column w_50 ">
                      <p className="feature-box">
                        {this.props.recommended_plans[
                          compare_plans_desktop_indexes[0]
                        ].service_id.includes("Maternity Services")
                          ? "Covered"
                          : "Not Covered"}
                      </p>
                      {this.props.recommended_plans[
                        compare_plans_desktop_indexes[0]
                      ].service_id.includes("Maternity Services") ? (
                        <ul className="progress_bar">
                          <li className="green">
                            <span></span>
                          </li>
                          <li className="green">
                            <span></span>
                          </li>
                          <li className="green">
                            <span></span>
                          </li>
                          <li className="green">
                            <span></span>
                          </li>
                          <li className="green">
                            <span></span>
                          </li>
                        </ul>
                      ) : (
                        <ul className="progress_bar">
                          <li className="">
                            <span></span>
                          </li>
                          <li className="">
                            <span></span>
                          </li>
                          <li className="">
                            <span></span>
                          </li>
                          <li className="">
                            <span></span>
                          </li>
                          <li className="">
                            <span></span>
                          </li>
                        </ul>
                      )}
                    </div>
                    <div className="column w_50 ">
                      <p className="feature-box">
                        {this.props.recommended_plans[
                          compare_plans_desktop_indexes[1]
                        ].service_id.includes("Maternity Services")
                          ? "Covered"
                          : "Not Covered"}
                      </p>
                      {this.props.recommended_plans[
                        compare_plans_desktop_indexes[1]
                      ].service_id.includes("Maternity Services") ? (
                        <ul className="progress_bar">
                          <li className="green">
                            <span></span>
                          </li>
                          <li className="green">
                            <span></span>
                          </li>
                          <li className="green">
                            <span></span>
                          </li>
                          <li className="green">
                            <span></span>
                          </li>
                          <li className="green">
                            <span></span>
                          </li>
                        </ul>
                      ) : (
                        <ul className="progress_bar">
                          <li className="">
                            <span></span>
                          </li>
                          <li className="">
                            <span></span>
                          </li>
                          <li className="">
                            <span></span>
                          </li>
                          <li className="">
                            <span></span>
                          </li>
                          <li className="">
                            <span></span>
                          </li>
                        </ul>
                      )}
                    </div>
                    {compare_plans_desktop_indexes[2] ? (
                      <div className="column w_50 is-hidden-mobile is-hidden-tablet-only">
                        <p className="feature-box">
                          {this.props.recommended_plans[
                            compare_plans_desktop_indexes[2]
                          ].service_id.includes("Maternity Services")
                            ? "Covered"
                            : "Not Covered"}
                        </p>
                        {this.props.recommended_plans[
                          compare_plans_desktop_indexes[2]
                        ].service_id.includes("Maternity Services") ? (
                          <ul className="progress_bar">
                            <li className="green">
                              <span></span>
                            </li>
                            <li className="green">
                              <span></span>
                            </li>
                            <li className="green">
                              <span></span>
                            </li>
                            <li className="green">
                              <span></span>
                            </li>
                            <li className="green">
                              <span></span>
                            </li>
                          </ul>
                        ) : (
                          <ul className="progress_bar">
                            <li className="">
                              <span></span>
                            </li>
                            <li className="">
                              <span></span>
                            </li>
                            <li className="">
                              <span></span>
                            </li>
                            <li className="">
                              <span></span>
                            </li>
                            <li className="">
                              <span></span>
                            </li>
                          </ul>
                        )}
                      </div>
                    ) : (
                      ""
                    )}
                  </div>

                  <div className="columns">
                    <div className="column w_100">
                      <p className="subtitle">Antenatal Services</p>
                    </div>
                    <div className="column w_50 ">
                      <p className="feature-box">
                        {this.props.recommended_plans[
                          compare_plans_desktop_indexes[0]
                        ].service_id.includes("Ante Natal Services")
                          ? "Covered"
                          : "Not Covered"}
                      </p>
                      {this.props.recommended_plans[
                        compare_plans_desktop_indexes[0]
                      ].service_id.includes("Ante Natal Services") ? (
                        <ul className="progress_bar">
                          <li className="green">
                            <span></span>
                          </li>
                          <li className="green">
                            <span></span>
                          </li>
                          <li className="green">
                            <span></span>
                          </li>
                          <li className="green">
                            <span></span>
                          </li>
                          <li className="green">
                            <span></span>
                          </li>
                        </ul>
                      ) : (
                        <ul className="progress_bar">
                          <li className="">
                            <span></span>
                          </li>
                          <li className="">
                            <span></span>
                          </li>
                          <li className="">
                            <span></span>
                          </li>
                          <li className="">
                            <span></span>
                          </li>
                          <li className="">
                            <span></span>
                          </li>
                        </ul>
                      )}
                    </div>
                    <div className="column w_50 ">
                      <p className="feature-box">
                        {this.props.recommended_plans[
                          compare_plans_desktop_indexes[1]
                        ].service_id.includes("Ante Natal Services")
                          ? "Covered"
                          : "Not Covered"}
                      </p>
                      {this.props.recommended_plans[
                        compare_plans_desktop_indexes[1]
                      ].service_id.includes("Ante Natal Services") ? (
                        <ul className="progress_bar">
                          <li className="green">
                            <span></span>
                          </li>
                          <li className="green">
                            <span></span>
                          </li>
                          <li className="green">
                            <span></span>
                          </li>
                          <li className="green">
                            <span></span>
                          </li>
                          <li className="green">
                            <span></span>
                          </li>
                        </ul>
                      ) : (
                        <ul className="progress_bar">
                          <li className="">
                            <span></span>
                          </li>
                          <li className="">
                            <span></span>
                          </li>
                          <li className="">
                            <span></span>
                          </li>
                          <li className="">
                            <span></span>
                          </li>
                          <li className="">
                            <span></span>
                          </li>
                        </ul>
                      )}
                    </div>
                    {compare_plans_desktop_indexes[2] ? (
                      <div className="column w_50 is-hidden-mobile is-hidden-tablet-only">
                        <p className="feature-box">
                          {this.props.recommended_plans[
                            compare_plans_desktop_indexes[2]
                          ].service_id.includes("Ante Natal Services")
                            ? "Covered"
                            : "Not Covered"}
                        </p>
                        {this.props.recommended_plans[
                          compare_plans_desktop_indexes[2]
                        ].service_id.includes("Ante Natal Services") ? (
                          <ul className="progress_bar">
                            <li className="green">
                              <span></span>
                            </li>
                            <li className="green">
                              <span></span>
                            </li>
                            <li className="green">
                              <span></span>
                            </li>
                            <li className="green">
                              <span></span>
                            </li>
                            <li className="green">
                              <span></span>
                            </li>
                          </ul>
                        ) : (
                          <ul className="progress_bar">
                            <li className="">
                              <span></span>
                            </li>
                            <li className="">
                              <span></span>
                            </li>
                            <li className="">
                              <span></span>
                            </li>
                            <li className="">
                              <span></span>
                            </li>
                            <li className="">
                              <span></span>
                            </li>
                          </ul>
                        )}
                      </div>
                    ) : (
                      ""
                    )}
                  </div>

                  <div className="columns">
                    <div className="column w_100">
                      <p className="subtitle">Postnatal Services</p>
                    </div>
                    <div className="column w_50 ">
                      <p className="feature-box">
                        {this.props.recommended_plans[
                          compare_plans_desktop_indexes[0]
                        ].service_id.includes("Post Natal Services")
                          ? "Covered"
                          : "Not Covered"}
                      </p>
                      {this.props.recommended_plans[
                        compare_plans_desktop_indexes[0]
                      ].service_id.includes("Post Natal Services") ? (
                        <ul className="progress_bar">
                          <li className="green">
                            <span></span>
                          </li>
                          <li className="green">
                            <span></span>
                          </li>
                          <li className="green">
                            <span></span>
                          </li>
                          <li className="green">
                            <span></span>
                          </li>
                          <li className="green">
                            <span></span>
                          </li>
                        </ul>
                      ) : (
                        <ul className="progress_bar">
                          <li className="">
                            <span></span>
                          </li>
                          <li className="">
                            <span></span>
                          </li>
                          <li className="">
                            <span></span>
                          </li>
                          <li className="">
                            <span></span>
                          </li>
                          <li className="">
                            <span></span>
                          </li>
                        </ul>
                      )}
                    </div>
                    <div className="column w_50 ">
                      <p className="feature-box">
                        {this.props.recommended_plans[
                          compare_plans_desktop_indexes[1]
                        ].service_id.includes("Post Natal Services")
                          ? "Covered"
                          : "Not Covered"}
                      </p>
                      {this.props.recommended_plans[
                        compare_plans_desktop_indexes[1]
                      ].service_id.includes("Post Natal Services") ? (
                        <ul className="progress_bar">
                          <li className="green">
                            <span></span>
                          </li>
                          <li className="green">
                            <span></span>
                          </li>
                          <li className="green">
                            <span></span>
                          </li>
                          <li className="green">
                            <span></span>
                          </li>
                          <li className="green">
                            <span></span>
                          </li>
                        </ul>
                      ) : (
                        <ul className="progress_bar">
                          <li className="">
                            <span></span>
                          </li>
                          <li className="">
                            <span></span>
                          </li>
                          <li className="">
                            <span></span>
                          </li>
                          <li className="">
                            <span></span>
                          </li>
                          <li className="">
                            <span></span>
                          </li>
                        </ul>
                      )}
                    </div>
                    {compare_plans_desktop_indexes[2] ? (
                      <div className="column w_50 is-hidden-mobile is-hidden-tablet-only">
                        <p className="feature-box">
                          {this.props.recommended_plans[
                            compare_plans_desktop_indexes[2]
                          ].service_id.includes("Post Natal Services")
                            ? "Covered"
                            : "Not Covered"}
                        </p>
                        {this.props.recommended_plans[
                          compare_plans_desktop_indexes[2]
                        ].service_id.includes("Post Natal Services") ? (
                          <ul className="progress_bar">
                            <li className="green">
                              <span></span>
                            </li>
                            <li className="green">
                              <span></span>
                            </li>
                            <li className="green">
                              <span></span>
                            </li>
                            <li className="green">
                              <span></span>
                            </li>
                            <li className="green">
                              <span></span>
                            </li>
                          </ul>
                        ) : (
                          <ul className="progress_bar">
                            <li className="">
                              <span></span>
                            </li>
                            <li className="">
                              <span></span>
                            </li>
                            <li className="">
                              <span></span>
                            </li>
                            <li className="">
                              <span></span>
                            </li>
                            <li className="">
                              <span></span>
                            </li>
                          </ul>
                        )}
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                  <div>
                    <section className="section grey_background similar_plans call_scheduling_compare"></section>
                  </div>

                  <div className="columns call_schedule_hospitals">
                    <div className="column w_100">
                      <p className="subtitle">Cashless Hospital Network</p>
                      <a
                        className="is-primary tooltip is-tooltip-right tip-box"
                        data-tooltip="Pincode:- 110001"
                      >
                        in Nigeria
                      </a>
                    </div>
                    <div className="column w_50 ">
                      <p className=" has-text-weight-bold sp-more">
                        {JSON.parse(
                          this.props.recommended_plans[
                            compare_plans_desktop_indexes[0]
                          ].hmo_id.provider_id
                        ).map((prov) => prov + ", ")}
                      </p>
                      <a className="block is-active link-bottom">
                        View network hospitals
                      </a>
                    </div>
                    <div className="column w_50 ">
                      <p className=" has-text-weight-bold sp-more">
                        {JSON.parse(
                          this.props.recommended_plans[
                            compare_plans_desktop_indexes[1]
                          ].hmo_id.provider_id
                        ).map((prov) => prov + ", ")}
                      </p>
                      <a className="block is-active link-bottom">
                        View network hospitals
                      </a>
                    </div>
                    {compare_plans_desktop_indexes[2] ? (
                      <div className="column w_50 is-hidden-mobile is-hidden-tablet-only">
                        <p className=" has-text-weight-bold sp-more">
                          {JSON.parse(
                            this.props.recommended_plans[
                              compare_plans_desktop_indexes[2]
                            ].hmo_id.provider_id
                          ).map((prov) => prov + ", ")}
                        </p>
                        <a className="block is-active link-bottom">
                          View network hospitals
                        </a>
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                  {/* <div className="column grey_background w_100">
                In-patient Care
              </div>
              <div className="columns">
                <div className="column w_100">
                  <p className="subtitle">Before Hospitalization</p>
                </div>
                <div className="column w_50 ">
                  <p className="feature-box">
                    Medical expenses that are incurred in 30 days before
                    hospitalisation are covered up to SI
                  </p>
                  <ul className="progress_bar">
                    <li className="green">
                      <span></span>
                    </li>
                    <li className="green">
                      <span></span>
                    </li>
                    <li className="green">
                      <span></span>
                    </li>
                    <li className="green half">
                      <span></span>
                    </li>
                    <li className="">
                      <span></span>
                    </li>
                  </ul>
                </div>
                <div className="column w_50 ">
                  <p className="feature-box">
                    Medical expenses that are incurred in 30 days before
                    hospitalization are covered upto SI.
                  </p>
                  <ul className="progress_bar">
                    <li className="green">
                      <span></span>
                    </li>
                    <li className="green">
                      <span></span>
                    </li>
                    <li className="green">
                      <span></span>
                    </li>
                    <li className="green half">
                      <span></span>
                    </li>
                    <li className="">
                      <span></span>
                    </li>
                  </ul>
                </div>
                <div className="column w_50 is-hidden-mobile is-hidden-tablet-only">
                  <p className="feature-box">
                    Medical Expenses Up to 30 days before hospitalization will
                    be covered
                  </p>
                  <ul className="progress_bar">
                    <li className="green">
                      <span></span>
                    </li>
                    <li className="green">
                      <span></span>
                    </li>
                    <li className="green">
                      <span></span>
                    </li>
                    <li className="green half">
                      <span></span>
                    </li>
                    <li className="">
                      <span></span>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="columns">
                <div className="column w_100">
                  <p className="subtitle">After Hospitalization</p>
                </div>
                <div className="column w_50 ">
                  <p className="feature-box">
                    Medical expenses that are incurred in 60 days post
                    hospitalization are covered Upto SI
                  </p>
                  <ul className="progress_bar">
                    <li className="green">
                      <span></span>
                    </li>
                    <li className="green">
                      <span></span>
                    </li>
                    <li className="green">
                      <span></span>
                    </li>
                    <li className="green">
                      <span></span>
                    </li>
                    <li className="">
                      <span></span>
                    </li>
                  </ul>
                </div>
                <div className="column w_50 ">
                  <p className="feature-box">
                    Medical expenses that are incurred in 60 days post
                    hospitalization are covered Upto SI
                  </p>
                  <ul className="progress_bar">
                    <li className="green">
                      <span></span>
                    </li>
                    <li className="green">
                      <span></span>
                    </li>
                    <li className="green">
                      <span></span>
                    </li>
                    <li className="green">
                      <span></span>
                    </li>
                    <li className="">
                      <span></span>
                    </li>
                  </ul>
                </div>
                <div className="column w_50 is-hidden-mobile is-hidden-tablet-only">
                  <p className="feature-box">
                    Medical expenses Up to 60 days(Up to 7% of hospitalisation
                    charges,Max Up to Rs 5,000)
                  </p>
                  <ul className="progress_bar">
                    <li className="green yellow">
                      <span></span>
                    </li>
                    <li className="green yellow">
                      <span></span>
                    </li>
                    <li className="green yellow">
                      <span></span>
                    </li>
                    <li className="">
                      <span></span>
                    </li>
                    <li className="">
                      <span></span>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="columns">
                <div className="column w_100">
                  <p className="subtitle">Day Care Treatments</p>
                </div>
                <div className="column w_50 ">
                  <p className="feature-box">
                    541 Day care treatments that take less than 24 hours of
                    hospitalization due to technological advancement but
                    otherwise would have needed a day are covered
                  </p>
                  <ul className="progress_bar">
                    <li className="green">
                      <span></span>
                    </li>
                    <li className="green">
                      <span></span>
                    </li>
                    <li className="green">
                      <span></span>
                    </li>
                    <li className="green">
                      <span></span>
                    </li>
                    <li className="green">
                      <span></span>
                    </li>
                  </ul>
                </div>
                <div className="column w_50 ">
                  <p className="feature-box">All Day Care Procedures covered</p>
                  <ul className="progress_bar">
                    <li className="green">
                      <span></span>
                    </li>
                    <li className="green">
                      <span></span>
                    </li>
                    <li className="green">
                      <span></span>
                    </li>
                    <li className="green">
                      <span></span>
                    </li>
                    <li className="green">
                      <span></span>
                    </li>
                  </ul>
                </div>
                <div className="column w_50 is-hidden-mobile is-hidden-tablet-only">
                  <p className="feature-box">
                    101 Day care treatments are covered
                  </p>
                  <ul className="progress_bar">
                    <li className="green red">
                      <span></span>
                    </li>
                    <li className="">
                      <span></span>
                    </li>
                    <li className="">
                      <span></span>
                    </li>
                    <li className="">
                      <span></span>
                    </li>
                    <li className="">
                      <span></span>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="columns">
                <div className="column w_100">
                  <p className="subtitle">Hospitalization at Home</p>
                </div>
                <div className="column w_50 ">
                  <p className="feature-box">Not Applicable</p>
                  <ul className="progress_bar">
                    <li className="">
                      <span></span>
                    </li>
                    <li className="">
                      <span></span>
                    </li>
                    <li className="">
                      <span></span>
                    </li>
                    <li className="">
                      <span></span>
                    </li>
                    <li className="">
                      <span></span>
                    </li>
                  </ul>
                </div>
                <div className="column w_50 ">
                  <p className="feature-box">
                    Treatments done at home due to patient condition or
                    unavailability of hospital bed are covered Up to Sum Insured
                  </p>
                  <ul className="progress_bar">
                    <li className="green">
                      <span></span>
                    </li>
                    <li className="green">
                      <span></span>
                    </li>
                    <li className="green">
                      <span></span>
                    </li>
                    <li className="green">
                      <span></span>
                    </li>
                    <li className="green">
                      <span></span>
                    </li>
                  </ul>
                </div>
                <div className="column w_50 is-hidden-mobile is-hidden-tablet-only">
                  <p className="feature-box">Not covered</p>
                  <ul className="progress_bar">
                    <li className="">
                      <span></span>
                    </li>
                    <li className="">
                      <span></span>
                    </li>
                    <li className="">
                      <span></span>
                    </li>
                    <li className="">
                      <span></span>
                    </li>
                    <li className="">
                      <span></span>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="columns">
                <div className="column w_100">
                  <p className="subtitle">Alternate Medicine</p>
                </div>
                <div className="column w_50 ">
                  <p className="feature-box">Not Applicable</p>
                  <ul className="progress_bar">
                    <li className="">
                      <span></span>
                    </li>
                    <li className="">
                      <span></span>
                    </li>
                    <li className="">
                      <span></span>
                    </li>
                    <li className="">
                      <span></span>
                    </li>
                    <li className="">
                      <span></span>
                    </li>
                  </ul>
                </div>
                <div className="column w_50 ">
                  <p className="feature-box">Up to SI for utilizing AYUSH</p>
                  <ul className="progress_bar">
                    <li className="green">
                      <span></span>
                    </li>
                    <li className="green">
                      <span></span>
                    </li>
                    <li className="green">
                      <span></span>
                    </li>
                    <li className="green">
                      <span></span>
                    </li>
                    <li className="green">
                      <span></span>
                    </li>
                  </ul>
                </div>
                <div className="column w_50 is-hidden-mobile is-hidden-tablet-only">
                  <p className="feature-box">
                    Up to Rs 25,000 for utilizing AYUSH
                  </p>
                  <ul className="progress_bar">
                    <li className="green yellow">
                      <span></span>
                    </li>
                    <li className="green yellow">
                      <span></span>
                    </li>
                    <li className="green yellow">
                      <span></span>
                    </li>
                    <li className="">
                      <span></span>
                    </li>
                    <li className="">
                      <span></span>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="columns">
                <div className="column w_100">
                  <p className="subtitle">Network Hospitals Covered</p>
                </div>
                <div className="column w_50 ">
                  <p className="feature-box">
                    6500+ Network hospitals offer cashless hospitalisation
                  </p>
                  <ul className="progress_bar">
                    <li className="green">
                      <span></span>
                    </li>
                    <li className="green">
                      <span></span>
                    </li>
                    <li className="green">
                      <span></span>
                    </li>
                    <li className="green half">
                      <span></span>
                    </li>
                    <li className="">
                      <span></span>
                    </li>
                  </ul>
                </div>
                <div className="column w_50 ">
                  <p className="feature-box">
                    6100+ Network hospitals offer cashless hospitalisation
                  </p>
                  <ul className="progress_bar">
                    <li className="green">
                      <span></span>
                    </li>
                    <li className="green">
                      <span></span>
                    </li>
                    <li className="green">
                      <span></span>
                    </li>
                    <li className="green">
                      <span></span>
                    </li>
                    <li className="">
                      <span></span>
                    </li>
                  </ul>
                </div>
                <div className="column w_50 is-hidden-mobile is-hidden-tablet-only">
                  <p className="feature-box">9900+ Network hospitals</p>
                  <ul className="progress_bar">
                    <li className="green">
                      <span></span>
                    </li>
                    <li className="green">
                      <span></span>
                    </li>
                    <li className="green">
                      <span></span>
                    </li>
                    <li className="green">
                      <span></span>
                    </li>
                    <li className="green half">
                      <span></span>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="column grey_background w_100">Coverage Terms</div>
              <div className="columns">
                <div className="column w_100">
                  <p className="subtitle">Family Floater Option</p>
                </div>
                <div className="column w_50 ">
                  <p className="feature-box">Upto 2 Adult and 4 Children</p>
                  <ul className="progress_bar">
                    <li className="green">
                      <span></span>
                    </li>
                    <li className="green">
                      <span></span>
                    </li>
                    <li className="green">
                      <span></span>
                    </li>
                    <li className="green">
                      <span></span>
                    </li>
                    <li className="green">
                      <span></span>
                    </li>
                  </ul>
                </div>
                <div className="column w_50 ">
                  <p className="feature-box">Up to 2 Adults and 4 Children</p>
                  <ul className="progress_bar">
                    <li className="green">
                      <span></span>
                    </li>
                    <li className="green">
                      <span></span>
                    </li>
                    <li className="green">
                      <span></span>
                    </li>
                    <li className="green">
                      <span></span>
                    </li>
                    <li className="green">
                      <span></span>
                    </li>
                  </ul>
                </div>
                <div className="column w_50 is-hidden-mobile is-hidden-tablet-only">
                  <p className="feature-box">Only 1 Adult</p>
                  <ul className="progress_bar">
                    <li className="green">
                      <span></span>
                    </li>
                    <li className="green">
                      <span></span>
                    </li>
                    <li className="green">
                      <span></span>
                    </li>
                    <li className="green">
                      <span></span>
                    </li>
                    <li className="green">
                      <span></span>
                    </li>
                  </ul>
                </div>
              </div>
               */}

                  <div className="column grey_background w_100">
                    Emergency Coverage
                  </div>
                  <div className="columns">
                    <div className="column w_100">
                      <p className="subtitle">Ambulance</p>
                    </div>
                    <div className="column w_50 ">
                      <p className="feature-box">
                        {this.props.recommended_plans[
                          compare_plans_desktop_indexes[0]
                        ].service_id.includes("Ambulance")
                          ? "Covered"
                          : "Not Covered"}
                      </p>
                      {this.props.recommended_plans[
                        compare_plans_desktop_indexes[0]
                      ].service_id.includes("Ambulance") ? (
                        <ul className="progress_bar">
                          <li className="green">
                            <span></span>
                          </li>
                          <li className="green">
                            <span></span>
                          </li>
                          <li className="green">
                            <span></span>
                          </li>
                          <li className="green">
                            <span></span>
                          </li>
                          <li className="green">
                            <span></span>
                          </li>
                        </ul>
                      ) : (
                        <ul className="progress_bar">
                          <li className="">
                            <span></span>
                          </li>
                          <li className="">
                            <span></span>
                          </li>
                          <li className="">
                            <span></span>
                          </li>
                          <li className="">
                            <span></span>
                          </li>
                          <li className="">
                            <span></span>
                          </li>
                        </ul>
                      )}
                    </div>
                    <div className="column w_50 ">
                      <p className="feature-box">
                        {this.props.recommended_plans[
                          compare_plans_desktop_indexes[1]
                        ].service_id.includes("Ambulance")
                          ? "Covered"
                          : "Not Covered"}
                      </p>
                      {this.props.recommended_plans[
                        compare_plans_desktop_indexes[1]
                      ].service_id.includes("Ambulance") ? (
                        <ul className="progress_bar">
                          <li className="green">
                            <span></span>
                          </li>
                          <li className="green">
                            <span></span>
                          </li>
                          <li className="green">
                            <span></span>
                          </li>
                          <li className="green">
                            <span></span>
                          </li>
                          <li className="green">
                            <span></span>
                          </li>
                        </ul>
                      ) : (
                        <ul className="progress_bar">
                          <li className="">
                            <span></span>
                          </li>
                          <li className="">
                            <span></span>
                          </li>
                          <li className="">
                            <span></span>
                          </li>
                          <li className="">
                            <span></span>
                          </li>
                          <li className="">
                            <span></span>
                          </li>
                        </ul>
                      )}
                    </div>
                    {compare_plans_desktop_indexes[2] ? (
                      <div className="column w_50 is-hidden-mobile is-hidden-tablet-only">
                        <p className="feature-box">
                          {this.props.recommended_plans[
                            compare_plans_desktop_indexes[2]
                          ].service_id.includes("Ambulance")
                            ? "Covered"
                            : "Not Covered"}
                        </p>
                        {this.props.recommended_plans[
                          compare_plans_desktop_indexes[2]
                        ].service_id.includes("Ambulance") ? (
                          <ul className="progress_bar">
                            <li className="green">
                              <span></span>
                            </li>
                            <li className="green">
                              <span></span>
                            </li>
                            <li className="green">
                              <span></span>
                            </li>
                            <li className="green">
                              <span></span>
                            </li>
                            <li className="green">
                              <span></span>
                            </li>
                          </ul>
                        ) : (
                          <ul className="progress_bar">
                            <li className="">
                              <span></span>
                            </li>
                            <li className="">
                              <span></span>
                            </li>
                            <li className="">
                              <span></span>
                            </li>
                            <li className="">
                              <span></span>
                            </li>
                            <li className="">
                              <span></span>
                            </li>
                          </ul>
                        )}
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                  {/* <div className="columns">
                <div className="column w_100">
                  <p className="subtitle">Worldwide Emergency</p>
                </div>
                <div className="column w_50 ">
                  <p className="feature-box">Not covered</p>
                  <ul className="progress_bar">
                    <li className="">
                      <span></span>
                    </li>
                    <li className="">
                      <span></span>
                    </li>
                    <li className="">
                      <span></span>
                    </li>
                    <li className="">
                      <span></span>
                    </li>
                    <li className="">
                      <span></span>
                    </li>
                  </ul>
                </div>
                <div className="column w_50 ">
                  <p className="feature-box">Not Covered</p>
                  <ul className="progress_bar">
                    <li className="">
                      <span></span>
                    </li>
                    <li className="">
                      <span></span>
                    </li>
                    <li className="">
                      <span></span>
                    </li>
                    <li className="">
                      <span></span>
                    </li>
                    <li className="">
                      <span></span>
                    </li>
                  </ul>
                </div>
                {compare_plans_desktop_indexes[2] ? (<div className="column w_50 is-hidden-mobile is-hidden-tablet-only">
                  <p className="feature-box">Not Covered</p>
                  <ul className="progress_bar">
                    <li className="">
                      <span></span>
                    </li>
                    <li className="">
                      <span></span>
                    </li>
                    <li className="">
                      <span></span>
                    </li>
                    <li className="">
                      <span></span>
                    </li>
                    <li className="">
                      <span></span>
                    </li>
                  </ul>
                </div>) : ""}
              </div>
              <div className="column grey_background w_100">
                Wellness Benefits
              </div>
              <div className="columns">
                <div className="column w_100">
                  <p className="subtitle">Telemedicine</p>
                </div>
                <div className="column w_50 ">
                  <p className="feature-box">Not Covered</p>
                  <ul className="progress_bar">
                    <li className="">
                      <span></span>
                    </li>
                    <li className="">
                      <span></span>
                    </li>
                    <li className="">
                      <span></span>
                    </li>
                    <li className="">
                      <span></span>
                    </li>
                    <li className="">
                      <span></span>
                    </li>
                  </ul>
                </div>
                <div className="column w_50 ">
                  <p className="feature-box">Not Covered</p>
                  <ul className="progress_bar">
                    <li className="">
                      <span></span>
                    </li>
                    <li className="">
                      <span></span>
                    </li>
                    <li className="">
                      <span></span>
                    </li>
                    <li className="">
                      <span></span>
                    </li>
                    <li className="">
                      <span></span>
                    </li>
                  </ul>
                </div>
                {compare_plans_desktop_indexes[2] ? (<div className="column w_50 is-hidden-mobile is-hidden-tablet-only">
                  <p className="feature-box">Not Covered</p>
                  <ul className="progress_bar">
                    <li className="">
                      <span></span>
                    </li>
                    <li className="">
                      <span></span>
                    </li>
                    <li className="">
                      <span></span>
                    </li>
                    <li className="">
                      <span></span>
                    </li>
                    <li className="">
                      <span></span>
                    </li>
                  </ul>
                </div>) : ""}
              </div>
              <div className="columns">
                <div className="column w_100">
                  <p className="subtitle">Health Checks</p>
                </div>
                <div className="column w_50 ">
                  <p className="feature-box">Not covered</p>
                  <ul className="progress_bar">
                    <li className="">
                      <span></span>
                    </li>
                    <li className="">
                      <span></span>
                    </li>
                    <li className="">
                      <span></span>
                    </li>
                    <li className="">
                      <span></span>
                    </li>
                    <li className="">
                      <span></span>
                    </li>
                  </ul>
                </div>
                <div className="column w_50 ">
                  <p className="feature-box">Not Covered</p>
                  <ul className="progress_bar">
                    <li className="">
                      <span></span>
                    </li>
                    <li className="">
                      <span></span>
                    </li>
                    <li className="">
                      <span></span>
                    </li>
                    <li className="">
                      <span></span>
                    </li>
                    <li className="">
                      <span></span>
                    </li>
                  </ul>
                </div>
                {compare_plans_desktop_indexes[2] ? ( <div className="column w_50 is-hidden-mobile is-hidden-tablet-only">
                  <p className="feature-box">Not Covered</p>
                  <ul className="progress_bar">
                    <li className="">
                      <span></span>
                    </li>
                    <li className="">
                      <span></span>
                    </li>
                    <li className="">
                      <span></span>
                    </li>
                    <li className="">
                      <span></span>
                    </li>
                    <li className="">
                      <span></span>
                    </li>
                  </ul>
                </div>) : ""}
              </div>
              <div className="columns">
                <div className="column w_100">
                  <p className="subtitle">Wellness Factors</p>
                </div>
                <div className="column w_50 ">
                  <p className="feature-box">Not covered</p>
                  <ul className="progress_bar">
                    <li className="">
                      <span></span>
                    </li>
                    <li className="">
                      <span></span>
                    </li>
                    <li className="">
                      <span></span>
                    </li>
                    <li className="">
                      <span></span>
                    </li>
                    <li className="">
                      <span></span>
                    </li>
                  </ul>
                </div>
                <div className="column w_50 ">
                  <p className="feature-box">Not Covered</p>
                  <ul className="progress_bar">
                    <li className="">
                      <span></span>
                    </li>
                    <li className="">
                      <span></span>
                    </li>
                    <li className="">
                      <span></span>
                    </li>
                    <li className="">
                      <span></span>
                    </li>
                    <li className="">
                      <span></span>
                    </li>
                  </ul>
                </div>
                <div className="column w_50 is-hidden-mobile is-hidden-tablet-only">
                  <p className="feature-box">Provide wellness benefits</p>
                  <ul className="progress_bar">
                    <li className="green">
                      <span></span>
                    </li>
                    <li className="green">
                      <span></span>
                    </li>
                    <li className="green">
                      <span></span>
                    </li>
                    <li className="green">
                      <span></span>
                    </li>
                    <li className="green">
                      <span></span>
                    </li>
                  </ul>
                </div>
              </div> */}
                  <div>
                    <section className="section grey_background similar_plans">
                      <h3>SIMILAR PLANS</h3>
                      <h4>
                        Users who compared these plans also compared the below{" "}
                      </h4>
                      <div className="box-mob-slider">
                        <div className="slider-new ">
                          {this.props.recommended_plans.map(
                            (similar_plan, i) => {
                              // console.log(
                              //   "i",
                              //   i,
                              //   "compare_plans_desktop_indexes",
                              //   compare_plans_desktop_indexes,
                              //   "compare_plans_desktop_indexes.includes(i.toString())",
                              //   compare_plans_desktop_indexes.includes(i.toString())
                              // );
                              return compare_plans_desktop_indexes.includes(
                                i.toString()
                              ) == false ? (
                                <div className="box-new">
                                  <ul className="similar_plan_ul">
                                    <li>
                                      <div className="box_block">
                                        <div className="img-box-logo-similar">
                                          <img
                                            src={similar_plan.hmo_id.logo}
                                            alt="Aditya Birla"
                                            width="100"
                                          />
                                        </div>
                                        <span className="grey-mob">
                                          {similar_plan.name}
                                        </span>
                                      </div>
                                      <p className="is-hidden-mobile">
                                        ₦
                                        {this.props.quiz.responses.type ==
                                        "single"
                                          ? similar_plan.individual_annual_price
                                          : similar_plan.family_annual_price}
                                        / year
                                      </p>
                                      <ul>
                                        <li>
                                          {
                                            this.props.quiz.responses
                                              .num_of_people
                                          }{" "}
                                          {this.props.quiz.responses
                                            .num_of_people > 1
                                            ? " people"
                                            : " person"}{" "}
                                          <span>Sum Insured</span>
                                        </li>
                                        <li>
                                          {
                                            JSON.parse(
                                              similar_plan.hmo_id.provider_id
                                            ).length
                                          }{" "}
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
                                          compare_plans_desktop_indexes.length <
                                          3
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
                            }
                          )}
                        </div>
                      </div>
                    </section>
                  </div>
                </section>
              </div>
            </section>
          </div>
        ) : (
          "Nothing"
        )}
      </div>
    );
  }
}

const mapProps = (state: any) => {
  return {
    ...state.quiz,
  };
};

export default connect(mapProps)(SideBySideComparison);
