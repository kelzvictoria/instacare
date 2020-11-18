import React, { Component } from "react";
/*import { API_URL } from "../../config";*/
import styles from "./Compare.module.scss";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import * as actions from "../../utils/actions";
import numeral from "numeral";

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

const { Title } = Typography;
const { Panel } = Collapse;
let responses: any;
const API_URL = "https://dev-hmo-compare-api.herokuapp.com";
interface QuizProps {
  [x: string]: any;
  dispatch(args: any): any;
  page: number;
  minPage: number;
  maxPage: number;
  checked: string[];
  didRequestReturnEmptyResult: boolean;
  responses: {
    [x: string]: any;
    budget: number;
    type: string;
    firstName: string;
    lastName: string;
    region: string;
    services: any;
  };
  plans: Plan[];
  bestPlan: Plan;
  cheapestPlan: Plan;
  sort: {
    mode: string;
    icon: string;
    description: string;
  };
  fetching: boolean;
}

class Plans extends Component<QuizProps> {
  constructor(props) {
    super(props);
    this.goToHome = this.goToHome.bind(this);
    this.goToDetails = this.goToDetails.bind(this);
  }
  state = {
    toggleBar: false,
  };

  basicPlanOptions = [
    {
      label: "Malaria Care",
      value: "malaria",
    },
    {
      label: "Typhoid Care",
      value: "typhoid",
    },
    {
      label: "Consultations",
      value: "consultations",
    },
    {
      label: "Pharmacy",
      value: "pharmacy",
    },
  ];

  planOptions = [
    {
      label: "Dental care",
      value: "dentalOptions",
    },
    {
      label: "Optical care",
      value: "opticalOptions",
    },
    {
      label: "Immunizations",
      value: "immunizations",
    },
    {
      label: "Cancer care",
      value: "cancerCare",
    },
    {
      label: "Diagnostics",
      value: "diagnostics",
    },
    {
      label: "Physiotherapy",
      value: "physiotherapy",
    },
    {
      label: "Maternity",
      value: "natalCare",
    },

    {
      label: "Psychiatric care",
      value: "psychiatricTreatment",
    },
    {
      label: "Mortuary Care",
      value: "mortuaryServices",
    },
    {
      label: "Family-Planning",
      value: "familyPlanningServices",
    },
  ];
  planTypes = [
    {
      label: "Individual",
      value: "individual",
    },
    {
      label: "Family",
      value: "family",
    },
    {
      label: "Couples",
      value: "couple",
    },
    {
      label: "All",
      value: "",
    },
  ];

  marks = {
    300000: formatAsCurrency(300000),
    1500000: formatAsCurrency(1500000),
    3000000: formatAsCurrency(3000000),
  };
  formatBudget = (val: number) => {
    if (val < 1000000) {
      val = Math.round(val / 1000);
      return val;
    } else {
      val = parseFloat((val / 1000000).toFixed(2));
      return val;
    }
  };

  minBudget: any = this.formatBudget(300000);
  maxBudget: any = this.formatBudget(3000000);
  popularIndex = 0;
  usePreviousSearch = false;
  timeout: any;
  k = "K";
  m = "M";
  minbudgett;
  maxbudgett = this.props.responses.budget[1];
  eventHandlers = {
    handleAdult: (value: any) => {
      clearTimeout(this.timeout);
      // this.props.responses.type = e.target.value;
      this.props.dispatch({
        type: actions.UPDATE_TEXT_RESPONSE,
        data: { key: "adult", value },
      });
      if (
        value == 1 &&
        this.props.responses.children == 0 &&
        this.props.responses.infants == 0
      ) {
        this.props.dispatch({
          type: actions.CHANGE_PLAN_TYPE,
          data: "individual",
        });
      } else if (
        value == 0 &&
        this.props.responses.children == 1 &&
        this.props.responses.infants == 0
      ) {
        this.props.dispatch({
          type: actions.CHANGE_PLAN_TYPE,
          data: "individual",
        });
      } else if (
        value == 0 &&
        this.props.responses.children == 0 &&
        this.props.responses.infants == 1
      ) {
        this.props.dispatch({
          type: actions.CHANGE_PLAN_TYPE,
          data: "individual",
        });
      } else if (value == 0 && this.props.responses.children > 1) {
        this.props.dispatch({ type: actions.CHANGE_PLAN_TYPE, data: "family" });
      } else if (value == 0 && this.props.responses.infants > 1) {
        this.props.dispatch({ type: actions.CHANGE_PLAN_TYPE, data: "family" });
      } else if (
        value == 2 &&
        this.props.responses.children == 0 &&
        this.props.responses.infants == 0
      ) {
        this.props.dispatch({ type: actions.CHANGE_PLAN_TYPE, data: "couple" });
      } else if (value > 2) {
        this.props.dispatch({ type: actions.CHANGE_PLAN_TYPE, data: "family" });
      } else if (value >= 1 && this.props.responses.children > 0) {
        this.props.dispatch({ type: actions.CHANGE_PLAN_TYPE, data: "family" });
      } else if (value >= 1 && this.props.responses.infants > 0) {
        this.props.dispatch({ type: actions.CHANGE_PLAN_TYPE, data: "family" });
      }

      this.timeout = setTimeout(() => {
        this.fetchData("recommend", this.props.responses);
      }, 2000);
    },
    handleChildren: (value: any) => {
      clearTimeout(this.timeout);
      // this.props.responses.type = e.target.value;
      this.props.dispatch({
        type: actions.UPDATE_TEXT_RESPONSE,
        data: { key: "children", value },
      });
      if (
        value == 1 &&
        this.props.responses.adult == 0 &&
        this.props.responses.infants == 0
      ) {
        this.props.dispatch({
          type: actions.CHANGE_PLAN_TYPE,
          data: "individual",
        });
      } else if (value >= 1 && this.props.responses.adult != 0) {
        this.props.dispatch({ type: actions.CHANGE_PLAN_TYPE, data: "family" });
      } else if (value >= 1 && this.props.responses.infants != 0) {
        this.props.dispatch({ type: actions.CHANGE_PLAN_TYPE, data: "family" });
      } else if (value == 0 && this.props.responses.adult == 2) {
        this.props.dispatch({ type: actions.CHANGE_PLAN_TYPE, data: "couple" });
      } else if (value == 0 && this.props.responses.adult == 1) {
        this.props.dispatch({
          type: actions.CHANGE_PLAN_TYPE,
          data: "individual",
        });
      }

      this.timeout = setTimeout(() => {
        this.fetchData("recommend", this.props.responses);
      }, 2000);
    },

    handleInfants: (value) => {
      clearTimeout(this.timeout);
      // this.props.responses.type = e.target.value;
      this.props.dispatch({
        type: actions.UPDATE_TEXT_RESPONSE,
        data: { key: "infants", value },
      });
      if (value == 1 && this.props.responses.adult == 0) {
        this.props.dispatch({
          type: actions.CHANGE_PLAN_TYPE,
          data: "individual",
        });
      } else if (value >= 1 && this.props.responses.adult != 0) {
        this.props.dispatch({ type: actions.CHANGE_PLAN_TYPE, data: "family" });
      } else if (value == 0 && this.props.responses.adult == 2) {
        this.props.dispatch({ type: actions.CHANGE_PLAN_TYPE, data: "couple" });
      } else if (value >= 1 && this.props.responses.children >= 1) {
        this.props.dispatch({ type: actions.CHANGE_PLAN_TYPE, data: "family" });
      }

      this.timeout = setTimeout(() => {
        this.fetchData("recommend", this.props.responses);
      }, 2000);
    },

    handleCheckbox: (value: any[]) => {
      clearTimeout(this.timeout);
      this.props.dispatch({ type: actions.RESET_PLANS, data: true });
      this.props.dispatch({ type: actions.UPDATE_PREFS, data: value });
      this.timeout = setTimeout(() => {
        this.fetchData("recommend", this.props.responses);
      }, 2000);
    },
    changeBudget: async (value: any) => {
      this.minBudget = this.formatBudget(value[0]);
      this.maxBudget = this.formatBudget(value[1]);
      this.changek(this.minBudget, this.maxBudget);
      this.props.dispatch({ type: actions.RESET_PLANS, data: true });
      this.props.dispatch({ type: actions.UPDATE_BUDGET, budget: value });
      this.eventHandlers.handleCheckbox(this.props.checked);
      /* await this.fetchData("recommend", this.props.responses);*/
    },
  };

  formatter(value: number) {
    return formatAsCurrency(value);
  }

  sortPlansByPrice = (plans: Plan[], mode = "desc") => {
    if (mode === "desc") {
      return plans.sort((a, b) => a.price - b.price);
    }
    return plans.sort((a, b) => b.price - a.price);
  };

  getBestPlan = () => {
    const _plans = this.props.plans.slice();
    const bestPlan = _plans.sort((a, b) => b.matches - a.matches)[0];
    this.props.dispatch({
      type: actions.UPDATE_BEST_PLAN,
      data: bestPlan,
    });
  };

  updateSortOrder = (mode = "desc") => {
    let plans = this.props.plans.slice();
    if (mode === "desc") {
      plans = this.sortPlansByPrice(plans, "asc");
      this.props.dispatch({
        type: actions.UPDATE_SORT_ORDER,
        data: {
          mode: "asc",
          icon: "sort-descending",
          description: "Sort by price (cheapest first)",
        },
      });
    } else if (mode === "asc") {
      plans = this.sortPlansByPrice(plans, "desc");
      this.props.dispatch({
        type: actions.UPDATE_SORT_ORDER,
        data: {
          mode: "desc",
          icon: "sort-ascending",
          description: "Sort by price (most expensive first)",
        },
      });
    }
    this.props.dispatch({ type: actions.UPDATE_PLANS, data: plans });
  };

  goToDetails(item: any) {
    // if (item) {
    //   console.log(item);
    //   localStorage.setItem("details", JSON.stringify(item));
    //   this.props.history.push({ pathname: "/details", data: item });
    // }
    this.props.history.push({ pathname: "/details" });
  }
  changek(minBudget, maxBudget) {
    if (minBudget < 4) {
      this.minbudgett = this.minBudget + this.m;
    }
    if (minBudget > 4) {
      this.minbudgett = this.minBudget + this.k;
    }
    if (maxBudget < 4) {
      this.maxbudgett = this.maxBudget + this.m;
    }
    if (maxBudget > 4) {
      this.maxbudgett = this.maxBudget + this.k;
    }
  }

  async fetchData(path: any, params: any) {
    const res = await fetch(`${API_URL}/plans/${path}`, {
      headers: {
        "Content-Type": "application/json",
      },

      method: "POST",
      body: JSON.stringify(params),
    });
    if (res) {
      let asJson = await res.json();
      if (!asJson.data || asJson.data.length === 0) {
        this.props.dispatch({ type: actions.UPDATE_PLANS, data: [] });

        return;
      }
      console.log(asJson.data);
      this.props.dispatch({ type: actions.RESET_PLANS, data: false });
      asJson = this.sortPlansByPrice(asJson.data, "desc");
      this.popularIndex = Math.round(Math.random() * 4);
      this.popularIndex =
        this.popularIndex < asJson.length ? this.popularIndex : 0;
      this.props.dispatch({ type: actions.UPDATE_PLANS, data: asJson });
      this.props.dispatch({
        type: actions.UPDATE_CHEAPEST_PLAN,
        data: this.sortPlansByPrice(asJson)[0],
      });
      this.props.dispatch({
        type: actions.UPDATE_MOSTEXPENSIVE_PLAN,
        data: this.sortPlansByPrice(asJson)[asJson.length - 1],
      });
      this.getBestPlan();
    }
  }

  componentDidMount() {
    if (!this.usePreviousSearch) {
      responses = localStorage.getItem("responses");
      this.props.dispatch({
        type: actions.RESET_RESPONSES,
        data: JSON.parse(responses),
      });
      fetch(`${API_URL}/plans/recommend`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: responses,
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.data.length === 0) {
            this.props.dispatch({ type: actions.UPDATE_PLANS, data: [] });
            return;
          }

          this.popularIndex = Math.round(Math.random() * 4);
          data = this.sortPlansByPrice(data.data);
          this.popularIndex =
            this.popularIndex < data.length ? this.popularIndex : 0;
          this.props.dispatch({ type: actions.UPDATE_PLANS, data });
          this.getBestPlan();
          this.props.dispatch({
            type: actions.UPDATE_CHEAPEST_PLAN,
            data: this.sortPlansByPrice(data)[0],
          });
          this.props.dispatch({
            type: actions.UPDATE_MOSTEXPENSIVE_PLAN,
            data: this.sortPlansByPrice(data)[data.length - 1],
          });
        })
        .catch((err) => console.log(err));
    }
  }

  callb = (key) => {
    console.log(key);
  };

  callb2 = (key) => {
    console.log(key);
  };

  toggle = () => {
    this.setState({ toggleBar: !this.state.toggleBar });
    console.log(this.state.toggleBar);
  };

  handleNavigation = (e: any) => {};

  goToHome() {
    this.props.history.push({ pathname: "/" });
  }

  render() {
    return (
      <div id={styles.wrapper}>
        {/*<Row>*/}
        <div className="mobile-view">
          <div className="row compare-plans-header">
            <div className="row nav-info">
              <Button
                className="nav-btn"
                id="prev"
                type="default"
                onClick={this.goToHome}
              >
                <FontAwesomeIcon className="nav-btn" icon={faArrowLeft} />
              </Button>

              <div>
                <p className="plans-num">20 Plans for</p>
                <h6 className="plan-type">Self</h6>
              </div>
            </div>
            <div className="plan-select-div">
              <select className="plan-select">
                <option>Base Plans</option>
                <option>Base Plans</option>
              </select>
            </div>
          </div>

          <div className="row compare-page-body">
            <div className="col-md-8">
              <div className="single-plan">
                <div className="compare-first-row row">
                  <div className="col-md-2">
                    <img
                      className="provider-logo"
                      src="https://www.hygeiahmo.com/wp-content/uploads/2018/11/Hygeia-Final-No-Left-Padding@1x.svg"
                    />
                  </div>
                  <div className="col-md-6 middle-col">
                    <h6>Hygeia</h6>
                    <a href="/details">
                      View Features
                      <FontAwesomeIcon className="chev" icon={faChevronRight} />
                    </a>
                  </div>
                  <div className="col-md-4">
                    <img className="shortlist-yellow" src={shortlist} />
                  </div>
                </div>
                <div className="compare-second-row row">
                  <div className="col-md-2">
                    <p>Covers</p>
                    <h6>5</h6>
                  </div>
                  <div className="col-md-6 middle-col">
                    <p>Cashless Hospitals</p>
                    <a href="#">
                      <h6>
                        300
                        <FontAwesomeIcon
                          className="chev"
                          icon={faChevronRight}
                        />
                      </h6>
                    </a>
                  </div>
                  <div className="col-md-4">
                    <button className="btn-plan" onClick={this.goToDetails}>
                      ₦5k/month
                    </button>
                  </div>
                </div>
              </div>

              <div className="single-plan">
                <div className="compare-first-row row">
                  <div className="col-md-2">
                    <img
                      className="provider-logo"
                      src="https://www.hygeiahmo.com/wp-content/uploads/2018/11/Hygeia-Final-No-Left-Padding@1x.svg"
                    />
                  </div>
                  <div className="col-md-6 middle-col">
                    <h6>Hygeia</h6>
                    <a href="/details">
                      View Features
                      <FontAwesomeIcon className="chev" icon={faChevronRight} />
                    </a>
                  </div>
                  <div className="col-md-4">
                    <img className="shortlist-yellow" src={shortlist} />
                  </div>
                </div>
                <div className="compare-second-row row">
                  <div className="col-md-2">
                    <p>Covers</p>
                    <h6>5</h6>
                  </div>
                  <div className="col-md-6 middle-col">
                    <p>Cashless Hospitals</p>
                    <a href="#">
                      <h6>
                        300
                        <FontAwesomeIcon
                          className="chev"
                          icon={faChevronRight}
                        />
                      </h6>
                    </a>
                  </div>
                  <div className="col-md-4">
                    <button className="btn-plan" onClick={this.goToDetails}>
                      ₦5k/month
                    </button>
                  </div>
                </div>
              </div>

              <div className="single-plan">
                <div className="compare-first-row row">
                  <div className="col-md-2">
                    <img
                      className="provider-logo"
                      src="https://www.hygeiahmo.com/wp-content/uploads/2018/11/Hygeia-Final-No-Left-Padding@1x.svg"
                    />
                  </div>
                  <div className="col-md-6 middle-col">
                    <h6>Hygeia</h6>
                    <a href="/details">
                      View Features
                      <FontAwesomeIcon className="chev" icon={faChevronRight} />
                    </a>
                  </div>
                  <div className="col-md-4">
                    <img className="shortlist-yellow" src={shortlist} />
                  </div>
                </div>
                <div className="compare-second-row row">
                  <div className="col-md-2">
                    <p>Covers</p>
                    <h6>5</h6>
                  </div>
                  <div className="col-md-6 middle-col">
                    <p>Cashless Hospitals</p>
                    <a href="#">
                      <h6>
                        300
                        <FontAwesomeIcon
                          className="chev"
                          icon={faChevronRight}
                        />
                      </h6>
                    </a>
                  </div>
                  <div className="col-md-4">
                    <button className="btn-plan" onClick={this.goToDetails}>
                      ₦5k/month
                    </button>
                  </div>
                </div>
              </div>

              <div className="single-plan">
                <div className="compare-first-row row">
                  <div className="col-md-2">
                    <img
                      className="provider-logo"
                      src="https://www.hygeiahmo.com/wp-content/uploads/2018/11/Hygeia-Final-No-Left-Padding@1x.svg"
                    />
                  </div>
                  <div className="col-md-6 middle-col">
                    <h6>Hygeia</h6>
                    <a href="/details">
                      View Features
                      <FontAwesomeIcon className="chev" icon={faChevronRight} />
                    </a>
                  </div>
                  <div className="col-md-4">
                    <img className="shortlist-yellow" src={shortlist} />
                  </div>
                </div>
                <div className="compare-second-row row">
                  <div className="col-md-2">
                    <p>Covers</p>
                    <h6>5</h6>
                  </div>
                  <div className="col-md-6 middle-col">
                    <p>Cashless Hospitals</p>
                    <a href="#">
                      <h6>
                        300
                        <FontAwesomeIcon
                          className="chev"
                          icon={faChevronRight}
                        />
                      </h6>
                    </a>
                  </div>
                  <div className="col-md-4">
                    <button className="btn-plan" onClick={this.goToDetails}>
                      ₦5k/month
                    </button>
                  </div>
                </div>
              </div>

              <div className="single-plan">
                <div className="compare-first-row row">
                  <div className="col-md-2">
                    <img
                      className="provider-logo"
                      src="https://www.hygeiahmo.com/wp-content/uploads/2018/11/Hygeia-Final-No-Left-Padding@1x.svg"
                    />
                  </div>
                  <div className="col-md-6 middle-col">
                    <h6>Hygeia</h6>
                    <a href="/details">
                      View Features
                      <FontAwesomeIcon className="chev" icon={faChevronRight} />
                    </a>
                  </div>
                  <div className="col-md-4">
                    <img className="shortlist-yellow" src={shortlist} />
                  </div>
                </div>
                <div className="compare-second-row row">
                  <div className="col-md-2">
                    <p>Covers</p>
                    <h6>5</h6>
                  </div>
                  <div className="col-md-6 middle-col">
                    <p>Cashless Hospitals</p>
                    <a href="#">
                      <h6>
                        300
                        <FontAwesomeIcon
                          className="chev"
                          icon={faChevronRight}
                        />
                      </h6>
                    </a>
                  </div>
                  <div className="col-md-4">
                    <button className="btn-plan" onClick={this.goToDetails}>
                      ₦5k/month
                    </button>
                  </div>
                </div>
              </div>

              <div className="single-plan">
                <div className="compare-first-row row">
                  <div className="col-md-2">
                    <img
                      className="provider-logo"
                      src="https://www.hygeiahmo.com/wp-content/uploads/2018/11/Hygeia-Final-No-Left-Padding@1x.svg"
                    />
                  </div>
                  <div className="col-md-6 middle-col">
                    <h6>Hygeia</h6>
                    <a href="/details">
                      View Features
                      <FontAwesomeIcon className="chev" icon={faChevronRight} />
                    </a>
                  </div>
                  <div className="col-md-4">
                    <img className="shortlist-yellow" src={shortlist} />
                  </div>
                </div>
                <div className="compare-second-row row">
                  <div className="col-md-2">
                    <p>Covers</p>
                    <h6>5</h6>
                  </div>
                  <div className="col-md-6 middle-col">
                    <p>Cashless Hospitals</p>
                    <a href="#">
                      <h6>
                        300
                        <FontAwesomeIcon
                          className="chev"
                          icon={faChevronRight}
                        />
                      </h6>
                    </a>
                  </div>
                  <div className="col-md-4">
                    <button className="btn-plan" onClick={this.goToDetails}>
                      ₦5k/month
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <img className="shortlist-yellow" src={shortlist} />
            </div>
          </div>
          <div className="bottom-menu row">
            <div className="col-md-4">
              <img className="img_icon" src={bottom_compare} />
              <p>Compare</p>
            </div>
            <div className="col-md-4">
              <img className="img_icon" src={bottom_filter} />
              <p>Filter</p>
            </div>
            <div className="col-md-4">
              <img className="img_icon" src={bottom_shortlist} />
              <p>Shortlist</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

/*export default Compare;*/
const mapProps = (state: any) => {
  return {
    ...state.quiz.quiz,
    ...state.quiz.compare,
  };
};

export default connect(mapProps)(Plans);
