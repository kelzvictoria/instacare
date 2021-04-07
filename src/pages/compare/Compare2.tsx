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
} from "@fortawesome/free-solid-svg-icons";

import { PAYSTACK_PUBLIC_KEY } from "../../utils/index";
import { UPDATE_PRICE, TOGGLE_BUYING_PLAN } from "../../utils/actions";
import { UPDATE_NOTGETTINGPROVIDERS } from "../../utils/actions";

import PaystackButton from "react-paystack";

import * as home_utils from "../../utils/homeUtils";

import { RouteComponentProps } from "react-router-dom";

import { state } from "../../components/home/state";

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
    plans_to_compare: "",
  };

  setPlansToCompare = () => {
    console.log("this.props.match.params[0]", this.props.match.params[0]);
    let params = this.props.match.params[0];
    let paramsArr = params.split("/");
    console.log("paramsArr", paramsArr);

    this.setState({
      plans_to_compare: paramsArr,
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
        data: [...this.props.this.state.plans_to_compare, value],
      });

      this.props.dispatch({
        type: "SET_CHECKED_PLANS",
        data: [...this.props.checked_plans_list, checked],
      });
    } else if (i > -1 && j > -1) {
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
      i > -1
      //&& j > -1
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
        data: [...this.props.this.state.plans_to_compare, value],
      });

      this.props.dispatch({
        type: "SET_CHECKED_PLANS",
        data: [...this.props.checked_plans_list, checked],
      });
    } else if (i > -1 && j > -1) {
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
      i > -1
      //&& j > -1
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

  render() {
    console.log(
      "copied state",
      state,
      "copied state.plans",
      state.plans,
      "this.state.plans_to_compare",
      this.state.plans_to_compare
    );

    return (
      <div className="side-by-side_comparison">
        {this.state.device == "mobile" ? (
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
                      <div className="column w_50 ">
                        <p className="box-plan-2">
                          <span className="plan-2">
                            {state.plans[this.state.plans_to_compare[0]].name}
                          </span>
                          <a className="is-inline-flex edit-plan-close">×</a>
                          <a className="close_plan edit-plan-close">×</a>
                        </p>
                      </div>
                      <div className="column w_50 ">
                        <p className="box-plan-2">
                          <span className="plan-2">
                            {state.plans[this.state.plans_to_compare[1]].name}
                          </span>
                          <a className="is-inline-flex is-hidden-mobile is-hidden-tablet-only edit-plan-close">
                            ×
                          </a>
                          <a
                            className="close_plan edit-plan-close"
                            // onClick={() => {
                            //   this.removePlanFromMobileCheckedIndexes(
                            //     this.state.plans_to_compare[1]
                            //   );
                            // }}
                          >
                            ×
                          </a>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <section className="section content_section">
                  <div className="column grey_background w_100 grey-bg-col">
                    Estimated monthly
                  </div>
                  <div className="columns green_background">
                    <div className="column w_50 grey-bg-col">
                      <h3 className="select">
                        {this.props.quiz.responses.type == "single"
                          ? `₦${this.numberwithCommas(
                              state.plans[this.state.plans_to_compare[0]]
                                .individual_annual_price
                            )}`
                          : `₦${this.numberwithCommas(
                              state.plans[this.state.plans_to_compare[0]]
                                .family_annual_price
                            )}`}{" "}
                      </h3>
                    </div>
                    <div className="column w_50 grey-bg-col">
                      <h3 className="select">
                        {this.props.quiz.responses.type == "single"
                          ? `₦${this.numberwithCommas(
                              state.plans[this.state.plans_to_compare[1]]
                                .individual_annual_price
                            )}`
                          : `₦${this.numberwithCommas(
                              state.plans[this.state.plans_to_compare[1]]
                                .family_annual_price
                            )}`}{" "}
                      </h3>
                    </div>
                  </div>
                  <div className="column grey_background w_100 grey-bg-col">
                    TERM
                  </div>
                  <div className="columns green_background">
                    <div className="column w_50 grey-bg-col">
                      <h3 className="select">
                        {state.plans[this.state.plans_to_compare[0]].duration}
                      </h3>
                    </div>
                    <div className="column w_50 grey-bg-col">
                      <h3 className="select">
                        {state.plans[this.state.plans_to_compare[1]].duration}
                      </h3>
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
                    </div>
                  </div>
                  <div className="columns">
                    <div className="column w_50 ">
                      <p className="feature-box">
                        {state.plans[
                          this.state.plans_to_compare[0]
                        ].service_id.includes("Accommodation")
                          ? "Covered"
                          : "Not Covered"}
                      </p>
                      {state.plans[
                        this.state.plans_to_compare[0]
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
                        {state.plans[
                          this.state.plans_to_compare[1]
                        ].service_id.includes("Accommodation")
                          ? "Covered"
                          : "Not Covered"}
                      </p>
                      {state.plans[
                        this.state.plans_to_compare[1]
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
                        {state.plans[
                          this.state.plans_to_compare[0]
                        ].service_id.includes("Accidents & Emergencies")
                          ? "Covered"
                          : "Not Covered"}
                      </p>
                      {state.plans[
                        this.state.plans_to_compare[0]
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
                        {state.plans[
                          this.state.plans_to_compare[1]
                        ].service_id.includes("Accidents & Emergencies")
                          ? "Covered"
                          : "Not Covered"}
                      </p>
                      {state.plans[
                        this.state.plans_to_compare[1]
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
                        {state.plans[
                          this.state.plans_to_compare[0]
                        ].service_id.includes("Investigations")
                          ? "Covered"
                          : "Not Covered"}
                      </p>
                      {state.plans[
                        this.state.plans_to_compare[0]
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
                        {state.plans[
                          this.state.plans_to_compare[1]
                        ].service_id.includes("Investigations")
                          ? "Covered"
                          : "Not Covered"}
                      </p>
                      {state.plans[
                        this.state.plans_to_compare[1]
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
                        {state.plans[
                          this.state.plans_to_compare[0]
                        ].service_id.includes("Minor Surgeries")
                          ? "Covered"
                          : "Not Covered"}
                      </p>
                      {state.plans[
                        this.state.plans_to_compare[0]
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
                        {state.plans[
                          this.state.plans_to_compare[1]
                        ].service_id.includes("Minor Surgeries")
                          ? "Covered"
                          : "Not Covered"}
                      </p>
                      {state.plans[
                        this.state.plans_to_compare[1]
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
                        {state.plans[
                          this.state.plans_to_compare[0]
                        ].service_id.includes("Intermediate Surgeries")
                          ? "Covered"
                          : "Not Covered"}
                      </p>
                      {state.plans[
                        this.state.plans_to_compare[0]
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
                        {state.plans[
                          this.state.plans_to_compare[1]
                        ].service_id.includes("Intermediate Surgeries")
                          ? "Covered"
                          : "Not Covered"}
                      </p>
                      {state.plans[
                        this.state.plans_to_compare[1]
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
                        {state.plans[
                          this.state.plans_to_compare[0]
                        ].service_id.includes("Major Surgeries")
                          ? "Covered"
                          : "Not Covered"}
                      </p>
                      {state.plans[
                        this.state.plans_to_compare[0]
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
                        {state.plans[
                          this.state.plans_to_compare[1]
                        ].service_id.includes("Major Surgeries")
                          ? "Covered"
                          : "Not Covered"}
                      </p>
                      {state.plans[
                        this.state.plans_to_compare[1]
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
                        {state.plans[
                          this.state.plans_to_compare[0]
                        ].service_id.includes("Intensive Care Services")
                          ? "Covered"
                          : "Not Covered"}
                      </p>
                      {state.plans[
                        this.state.plans_to_compare[0]
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
                        {state.plans[
                          this.state.plans_to_compare[1]
                        ].service_id.includes("Intensive Care Services")
                          ? "Covered"
                          : "Not Covered"}
                      </p>
                      {state.plans[
                        this.state.plans_to_compare[1]
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
                        {state.plans[
                          this.state.plans_to_compare[0]
                        ].service_id.includes("Maternity Services")
                          ? "Covered"
                          : "Not Covered"}
                      </p>
                      {state.plans[
                        this.state.plans_to_compare[0]
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
                        {state.plans[
                          this.state.plans_to_compare[1]
                        ].service_id.includes("Maternity Services")
                          ? "Covered"
                          : "Not Covered"}
                      </p>
                      {state.plans[
                        this.state.plans_to_compare[1]
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
                        {state.plans[
                          this.state.plans_to_compare[0]
                        ].service_id.includes("Ante Natal Services")
                          ? "Covered"
                          : "Not Covered"}
                      </p>
                      {state.plans[
                        this.state.plans_to_compare[0]
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
                        {state.plans[
                          this.state.plans_to_compare[1]
                        ].service_id.includes("Ante Natal Services")
                          ? "Covered"
                          : "Not Covered"}
                      </p>
                      {state.plans[
                        this.state.plans_to_compare[1]
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
                        {state.plans[
                          this.state.plans_to_compare[0]
                        ].service_id.includes("Post Natal Services")
                          ? "Covered"
                          : "Not Covered"}
                      </p>
                      {state.plans[
                        this.state.plans_to_compare[0]
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
                        {state.plans[
                          this.state.plans_to_compare[1]
                        ].service_id.includes("Post Natal Services")
                          ? "Covered"
                          : "Not Covered"}
                      </p>
                      {state.plans[
                        this.state.plans_to_compare[1]
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
                        {state.plans &&
                          JSON.parse(
                            state.plans[this.state.plans_to_compare[0]].hmo_id
                              .provider_id
                          ).map((prov) => prov + ", ")}
                      </p>
                      <a className="block is-active link-bottom">
                        View hospitals
                      </a>
                    </div>
                    <div className="column w_50 ">
                      <p className=" has-text-weight-bold sp-more">
                        {JSON.parse(
                          state.plans[this.state.plans_to_compare[1]].hmo_id
                            .provider_id
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
                        {state.plans[
                          this.state.plans_to_compare[0]
                        ].service_id.includes("Ambulance")
                          ? "Covered"
                          : "Not Covered"}
                      </p>
                      {state.plans[
                        this.state.plans_to_compare[0]
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
                        {state.plans[
                          this.state.plans_to_compare[1]
                        ].service_id.includes("Ambulance")
                          ? "Covered"
                          : "Not Covered"}
                      </p>
                      {state.plans[
                        this.state.plans_to_compare[1]
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
                          {state.plans.map((similar_plan, i) => {
                            return this.state.plans_to_compare.includes(
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

                                    <button
                                      className="button "
                                      disabled={
                                        this.state.plans_to_compare.length < 2
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
                          })}
                        </div>
                      </div>
                    </section>
                  </div>
                </section>
              </div>
            </section>
          </div>
        ) : this.state.device == "desktop" ? (
          <div className="desktop-view quotes_main_container">
            <section className="section hero compare_parent sp-top-main">
              <div className="container">
                <div className="sticky">
                  <div className="top_fixed_box column">
                    <div className="columns difference_column">
                      <div className="column tiny-nav">
                        <a
                          className="button back_btn  is-hidden-mobile is-hidden-tablet-only"
                          id="CompareBack"
                          onClick={this.goToPlans}
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
                            state.plans[this.state.plans_to_compare[0]].hmo_id
                              .logo
                          }
                          alt={state.plans[this.state.plans_to_compare[0]].name}
                          // width="80"
                          className="img-compare"
                        />
                        <p className="box-plan-2">
                          <span className="plan-2">
                            {state.plans[this.state.plans_to_compare[0]].name}
                          </span>
                          <a className="is-inline-flex is-hidden-mobile is-hidden-tablet-only edit-plan-close">
                            ×
                          </a>
                          <a
                            className="close_plan is-hidden-desktop edit-plan-close"
                            onClick={() => {
                              this.removePlanFromDesktopCheckedIndexes(
                                this.state.plans_to_compare[0]
                              );
                            }}
                          >
                            ×
                          </a>
                        </p>

                        <button className="button ">
                          {this.props.quiz.responses.type == "single"
                            ? `₦${this.numberwithCommas(
                                state.plans[this.state.plans_to_compare[0]]
                                  .individual_annual_price
                              )}`
                            : `₦${this.numberwithCommas(
                                state.plans[this.state.plans_to_compare[0]]
                                  .family_annual_price
                              )}`}{" "}
                          annually<span className="arrow-icon-right"></span>
                        </button>
                      </div>
                      <div className="column w_50 ">
                        <img
                          src={
                            state.plans[this.state.plans_to_compare[1]].hmo_id
                              .logo
                          }
                          alt={state.plans[this.state.plans_to_compare[1]].name}
                          // width="80"
                          className="img-compare"
                        />
                        <p className="box-plan-2">
                          <span className="plan-2">
                            {state.plans[this.state.plans_to_compare[1]].name}
                          </span>
                          <a className="is-inline-flex is-hidden-mobile is-hidden-tablet-only edit-plan-close">
                            ×
                          </a>
                          <a
                            className="close_plan is-hidden-desktop edit-plan-close"
                            onClick={() => {
                              this.removePlanFromDesktopCheckedIndexes(
                                this.state.plans_to_compare[1]
                              );
                            }}
                          >
                            ×
                          </a>
                        </p>
                        <button className="button ">
                          {this.props.quiz.responses.type == "single"
                            ? `₦${this.numberwithCommas(
                                state.plans[this.state.plans_to_compare[1]]
                                  .individual_annual_price
                              )}`
                            : `₦${this.numberwithCommas(
                                state.plans[this.state.plans_to_compare[1]]
                                  .family_annual_price
                              )}`}{" "}
                          annually<span className="arrow-icon-right"></span>
                        </button>
                      </div>
                      {this.state.plans_to_compare[2] ? (
                        <div className="column w_50 is-hidden-mobile is-hidden-tablet-only">
                          <img
                            src={
                              state.plans[this.state.plans_to_compare[2]].hmo_id
                                .logo
                            }
                            alt={
                              state.plans[this.state.plans_to_compare[2]].name
                            }
                            className="img-compare"
                            // width="80"
                          />
                          <p className="box-plan-2">
                            <span className="plan-2">
                              {state.plans[this.state.plans_to_compare[2]].name}
                            </span>
                            <a className="is-inline-flex is-hidden-mobile is-hidden-tablet-only edit-plan-close">
                              ×
                            </a>
                            <a
                              className="close_plan is-hidden-desktop edit-plan-close"
                              onClick={() => {
                                this.removePlanFromDesktopCheckedIndexes(
                                  this.state.plans_to_compare[2]
                                );
                              }}
                            >
                              ×
                            </a>
                          </p>
                          <button className="button ">
                            {this.props.quiz.responses.type == "single"
                              ? `₦${this.numberwithCommas(
                                  state.plans[this.state.plans_to_compare[2]]
                                    .individual_annual_price
                                )}`
                              : `₦${this.numberwithCommas(
                                  state.plans[this.state.plans_to_compare[2]]
                                    .family_annual_price
                                )}`}{" "}
                            annually<span className="arrow-icon-right"></span>
                          </button>
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
                          ? `₦${this.numberwithCommas(
                              state.plans[this.state.plans_to_compare[0]]
                                .individual_annual_price
                            )}`
                          : `₦${this.numberwithCommas(
                              state.plans[this.state.plans_to_compare[0]]
                                .family_annual_price
                            )}`}{" "}
                      </h3>
                    </div>
                    <div className="column w_50 ">
                      <h3 className="select">
                        {this.props.quiz.responses.type == "single"
                          ? `₦${this.numberwithCommas(
                              state.plans[this.state.plans_to_compare[1]]
                                .individual_annual_price
                            )}`
                          : `₦${this.numberwithCommas(
                              state.plans[this.state.plans_to_compare[1]]
                                .family_annual_price
                            )}`}{" "}
                      </h3>
                    </div>
                    {this.state.plans_to_compare[2] ? (
                      <div className="column w_50 is-hidden-mobile is-hidden-tablet-only">
                        <h3 className="select">
                          {this.props.quiz.responses.type == "single"
                            ? `₦${this.numberwithCommas(
                                state.plans[this.state.plans_to_compare[2]]
                                  .individual_annual_price
                              )}`
                            : `₦${this.numberwithCommas(
                                state.plans[this.state.plans_to_compare[2]]
                                  .family_annual_price
                              )}`}{" "}
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
                        {state.plans[this.state.plans_to_compare[0]].duration}
                      </h3>
                    </div>
                    <div className="column w_50 ">
                      <h3 className="select">
                        {state.plans[this.state.plans_to_compare[1]].duration}
                      </h3>
                    </div>
                    {this.state.plans_to_compare[2] ? (
                      <div className="column w_50 is-hidden-mobile is-hidden-tablet-only">
                        <h3 className="select">
                          {state.plans[this.state.plans_to_compare[2]].duration}
                        </h3>
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
                    </div>
                    <div className="column w_50 ">
                      <p className="feature-box">
                        {state.plans[
                          this.state.plans_to_compare[0]
                        ].service_id.includes("Accommodation")
                          ? "Covered"
                          : "Not Covered"}
                      </p>
                      {state.plans[
                        this.state.plans_to_compare[0]
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
                        {state.plans[
                          this.state.plans_to_compare[1]
                        ].service_id.includes("Accommodation")
                          ? "Covered"
                          : "Not Covered"}
                      </p>
                      {state.plans[
                        this.state.plans_to_compare[1]
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
                    {this.state.plans_to_compare[2] ? (
                      <div className="column w_50 is-hidden-mobile is-hidden-tablet-only">
                        <p className="feature-box">
                          {state.plans[
                            this.state.plans_to_compare[2]
                          ].service_id.includes("Accommodation")
                            ? "Covered"
                            : "Not Covered"}
                        </p>
                        {state.plans[
                          this.state.plans_to_compare[2]
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
                    </div>
                    <div className="column w_50 ">
                      <p className="feature-box">
                        {state.plans[
                          this.state.plans_to_compare[0]
                        ].service_id.includes("Accidents & Emergencies")
                          ? "Covered"
                          : "Not Covered"}
                      </p>
                      {state.plans[
                        this.state.plans_to_compare[0]
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
                        {state.plans[
                          this.state.plans_to_compare[1]
                        ].service_id.includes("Accidents & Emergencies")
                          ? "Covered"
                          : "Not Covered"}
                      </p>
                      {state.plans[
                        this.state.plans_to_compare[1]
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
                    {this.state.plans_to_compare[2] ? (
                      <div className="column w_50 is-hidden-mobile is-hidden-tablet-only">
                        <p className="feature-box">
                          {state.plans[
                            this.state.plans_to_compare[2]
                          ].service_id.includes("Accidents & Emergencies")
                            ? "Covered"
                            : "Not Covered"}
                        </p>
                        {state.plans[
                          this.state.plans_to_compare[2]
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
                        {state.plans[
                          this.state.plans_to_compare[0]
                        ].service_id.includes("Investigations")
                          ? "Covered"
                          : "Not Covered"}
                      </p>
                      {state.plans[
                        this.state.plans_to_compare[0]
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
                        {state.plans[
                          this.state.plans_to_compare[1]
                        ].service_id.includes("Investigations")
                          ? "Covered"
                          : "Not Covered"}
                      </p>
                      {state.plans[
                        this.state.plans_to_compare[1]
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
                    {this.state.plans_to_compare[2] ? (
                      <div className="column w_50 is-hidden-mobile is-hidden-tablet-only">
                        <p className="feature-box">
                          {state.plans[
                            this.state.plans_to_compare[2]
                          ].service_id.includes("Investigations")
                            ? "Covered"
                            : "Not Covered"}
                        </p>
                        {state.plans[
                          this.state.plans_to_compare[2]
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
                    </div>
                    <div className="column w_50 ">
                      <p className="feature-box">
                        {state.plans[
                          this.state.plans_to_compare[0]
                        ].service_id.includes("Minor Surgeries")
                          ? "Covered"
                          : "Not Covered"}
                      </p>
                      {state.plans[
                        this.state.plans_to_compare[0]
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
                        {state.plans[
                          this.state.plans_to_compare[1]
                        ].service_id.includes("Minor Surgeries")
                          ? "Covered"
                          : "Not Covered"}
                      </p>
                      {state.plans[
                        this.state.plans_to_compare[1]
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
                    {this.state.plans_to_compare[2] ? (
                      <div className="column w_50 is-hidden-mobile is-hidden-tablet-only">
                        <p className="feature-box">
                          {state.plans[
                            this.state.plans_to_compare[2]
                          ].service_id.includes("Minor Surgeries")
                            ? "Covered"
                            : "Not Covered"}
                        </p>
                        {state.plans[
                          this.state.plans_to_compare[2]
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
                        {state.plans[
                          this.state.plans_to_compare[0]
                        ].service_id.includes("Intermediate Surgeries")
                          ? "Covered"
                          : "Not Covered"}
                      </p>
                      {state.plans[
                        this.state.plans_to_compare[0]
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
                        {state.plans[
                          this.state.plans_to_compare[1]
                        ].service_id.includes("Intermediate Surgeries")
                          ? "Covered"
                          : "Not Covered"}
                      </p>
                      {state.plans[
                        this.state.plans_to_compare[1]
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
                    {this.state.plans_to_compare[2] ? (
                      <div className="column w_50 is-hidden-mobile is-hidden-tablet-only">
                        <p className="feature-box">
                          {state.plans[
                            this.state.plans_to_compare[2]
                          ].service_id.includes("Intermediate Surgeries")
                            ? "Covered"
                            : "Not Covered"}
                        </p>
                        {state.plans[
                          this.state.plans_to_compare[2]
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
                    </div>
                    <div className="column w_50 ">
                      <p className="feature-box">
                        {state.plans[
                          this.state.plans_to_compare[0]
                        ].service_id.includes("Major Surgeries")
                          ? "Covered"
                          : "Not Covered"}
                      </p>
                      {state.plans[
                        this.state.plans_to_compare[0]
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
                        {state.plans[
                          this.state.plans_to_compare[1]
                        ].service_id.includes("Major Surgeries")
                          ? "Covered"
                          : "Not Covered"}
                      </p>
                      {state.plans[
                        this.state.plans_to_compare[1]
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
                    {this.state.plans_to_compare[2] ? (
                      <div className="column w_50 is-hidden-mobile is-hidden-tablet-only">
                        <p className="feature-box">
                          {state.plans[
                            this.state.plans_to_compare[2]
                          ].service_id.includes("Major Surgeries")
                            ? "Covered"
                            : "Not Covered"}
                        </p>
                        {state.plans[
                          this.state.plans_to_compare[2]
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
                        {state.plans[
                          this.state.plans_to_compare[0]
                        ].service_id.includes("Intensive Care Services")
                          ? "Covered"
                          : "Not Covered"}
                      </p>
                      {state.plans[
                        this.state.plans_to_compare[0]
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
                        {state.plans[
                          this.state.plans_to_compare[1]
                        ].service_id.includes("Intensive Care Services")
                          ? "Covered"
                          : "Not Covered"}
                      </p>
                      {state.plans[
                        this.state.plans_to_compare[1]
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
                    {this.state.plans_to_compare[2] ? (
                      <div className="column w_50 is-hidden-mobile is-hidden-tablet-only">
                        <p className="feature-box">
                          {state.plans[
                            this.state.plans_to_compare[2]
                          ].service_id.includes("Intensive Care Services")
                            ? "Covered"
                            : "Not Covered"}
                        </p>
                        {state.plans[
                          this.state.plans_to_compare[2]
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
                        {state.plans[
                          this.state.plans_to_compare[0]
                        ].service_id.includes("Maternity Services")
                          ? "Covered"
                          : "Not Covered"}
                      </p>
                      {state.plans[
                        this.state.plans_to_compare[0]
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
                        {state.plans[
                          this.state.plans_to_compare[1]
                        ].service_id.includes("Maternity Services")
                          ? "Covered"
                          : "Not Covered"}
                      </p>
                      {state.plans[
                        this.state.plans_to_compare[1]
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
                    {this.state.plans_to_compare[2] ? (
                      <div className="column w_50 is-hidden-mobile is-hidden-tablet-only">
                        <p className="feature-box">
                          {state.plans[
                            this.state.plans_to_compare[2]
                          ].service_id.includes("Maternity Services")
                            ? "Covered"
                            : "Not Covered"}
                        </p>
                        {state.plans[
                          this.state.plans_to_compare[2]
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
                        {state.plans[
                          this.state.plans_to_compare[0]
                        ].service_id.includes("Ante Natal Services")
                          ? "Covered"
                          : "Not Covered"}
                      </p>
                      {state.plans[
                        this.state.plans_to_compare[0]
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
                        {state.plans[
                          this.state.plans_to_compare[1]
                        ].service_id.includes("Ante Natal Services")
                          ? "Covered"
                          : "Not Covered"}
                      </p>
                      {state.plans[
                        this.state.plans_to_compare[1]
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
                    {this.state.plans_to_compare[2] ? (
                      <div className="column w_50 is-hidden-mobile is-hidden-tablet-only">
                        <p className="feature-box">
                          {state.plans[
                            this.state.plans_to_compare[2]
                          ].service_id.includes("Ante Natal Services")
                            ? "Covered"
                            : "Not Covered"}
                        </p>
                        {state.plans[
                          this.state.plans_to_compare[2]
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
                        {state.plans[
                          this.state.plans_to_compare[0]
                        ].service_id.includes("Post Natal Services")
                          ? "Covered"
                          : "Not Covered"}
                      </p>
                      {state.plans[
                        this.state.plans_to_compare[0]
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
                        {state.plans[
                          this.state.plans_to_compare[1]
                        ].service_id.includes("Post Natal Services")
                          ? "Covered"
                          : "Not Covered"}
                      </p>
                      {state.plans[
                        this.state.plans_to_compare[1]
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
                    {this.state.plans_to_compare[2] ? (
                      <div className="column w_50 is-hidden-mobile is-hidden-tablet-only">
                        <p className="feature-box">
                          {state.plans[
                            this.state.plans_to_compare[2]
                          ].service_id.includes("Post Natal Services")
                            ? "Covered"
                            : "Not Covered"}
                        </p>
                        {state.plans[
                          this.state.plans_to_compare[2]
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
                        {state.plans[this.state.plans_to_compare[0]].hmo_id
                          .provider_id
                          ? JSON.parse(
                              state.plans[this.state.plans_to_compare[0]].hmo_id
                                .provider_id
                            ).map((prov) => prov + ", ")
                          : ""}
                      </p>
                      <a className="block is-active link-bottom">
                        View network hospitals
                      </a>
                    </div>
                    <div className="column w_50 ">
                      <p className=" has-text-weight-bold sp-more">
                        {state.plans[this.state.plans_to_compare[1]].hmo_id
                          .provider_id
                          ? JSON.parse(
                              state.plans[this.state.plans_to_compare[1]].hmo_id
                                .provider_id
                            ).map((prov) => prov + ", ")
                          : ""}
                      </p>
                      <a className="block is-active link-bottom">
                        View network hospitals
                      </a>
                    </div>
                    {this.state.plans_to_compare[2] ? (
                      <div className="column w_50 is-hidden-mobile is-hidden-tablet-only">
                        <p className=" has-text-weight-bold sp-more">
                          {state.plans[this.state.plans_to_compare[2]].hmo_id
                            .provider_id
                            ? JSON.parse(
                                state.plans[this.state.plans_to_compare[2]]
                                  .hmo_id.provider_id
                              ).map((prov) => prov + ", ")
                            : ""}
                        </p>
                        <a className="block is-active link-bottom">
                          View network hospitals
                        </a>
                      </div>
                    ) : (
                      ""
                    )}
                  </div>

                  <div className="column grey_background w_100">
                    Emergency Coverage
                  </div>
                  <div className="columns">
                    <div className="column w_100">
                      <p className="subtitle">Ambulance</p>
                    </div>
                    <div className="column w_50 ">
                      <p className="feature-box">
                        {state.plans[
                          this.state.plans_to_compare[0]
                        ].service_id.includes("Ambulance")
                          ? "Covered"
                          : "Not Covered"}
                      </p>
                      {state.plans[
                        this.state.plans_to_compare[0]
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
                        {state.plans[
                          this.state.plans_to_compare[1]
                        ].service_id.includes("Ambulance")
                          ? "Covered"
                          : "Not Covered"}
                      </p>
                      {state.plans[
                        this.state.plans_to_compare[1]
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
                    {this.state.plans_to_compare[2] ? (
                      <div className="column w_50 is-hidden-mobile is-hidden-tablet-only">
                        <p className="feature-box">
                          {state.plans[
                            this.state.plans_to_compare[2]
                          ].service_id.includes("Ambulance")
                            ? "Covered"
                            : "Not Covered"}
                        </p>
                        {state.plans[
                          this.state.plans_to_compare[2]
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

                  <div>
                    <section className="section grey_background similar_plans">
                      <h3>SIMILAR PLANS</h3>
                      <h4>
                        Users who compared these plans also compared the below{" "}
                      </h4>
                      <div className="box-mob-slider">
                        <div className="slider-new ">
                          {state.plans.map((similar_plan, i) => {
                            return this.state.plans_to_compare.includes(
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
          </div>
        ) : (
          this.goToPlans()
        )}
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
