import React, { Component } from "react";
/*import { API_URL } from "../../config";*/
//import styles from "../compare/Compare.module.scss";
import { connect } from "react-redux";
import * as actions from "../../utils/actions";

import bottom_filter from "../../imgs/bottom_filter.svg";
import bottom_shortlist from "../../imgs/bottom_shortlist.svg";
import bottom_compare from "../../imgs/bottom_compare.svg";

import { Link } from "react-router-dom";
import { PAYSTACK_PUBLIC_KEY } from "../../utils/index";
import { UPDATE_PRICE, TOGGLE_BUYING_PLAN } from "../../utils/actions";
import { UPDATE_NOTGETTINGPROVIDERS } from "../../utils/actions";
import PaystackButton from "react-paystack";

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
  Tabs,
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

const { Title } = Typography;

let responses: any;
const API_URL = "https://dev-hmo-compare-api.herokuapp.com";

interface DetailsProps {
  email: string;
  amount: number;
  [x: string]: any;
  notgettingproviders: boolean;
  buyingPlan: boolean;
}

interface FilterProps {
  [x: string]: any;
}

let notGettingProviders = true;
let predetails: any;
const { Panel } = Collapse;
const { Meta } = Card;
const { TabPane } = Tabs;

class PlanDetails extends Component<DetailsProps> {
  constructor(props) {
    super(props);
    this.handlePlanDuration = this.handlePlanDuration.bind(this);
    this.goToPlans = this.goToPlans.bind(this);
  }
  state = {
    searchText: "",
    open: false,
  };

  goToPlans() {
    this.props.history.push({ pathname: "/plans" });
  }

  handlePlanDuration(val) {
    this.props.dispatch({
      type: actions.UPDATE_PLAN_DURATION,
      data: { key: "plan_duration", value: val.target.value },
    });
  }

  render() {
    return (
      <div className="details">
        {/*<Row>*/}
        <div className="mobile-view">
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

              <div>
                <h6 className="plan-type">Select plan options</h6>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-md-12 details-header">
              <div className="">
                <div className="compare-first-row row">
                  <div className="col-md-4">
                    <img
                      className="provider-logo"
                      src="https://www.hygeiahmo.com/wp-content/uploads/2018/11/Hygeia-Final-No-Left-Padding@1x.svg"
                    />
                  </div>
                  <div className="col-md-8 middle-col">
                    <h6>Hygeia Prime</h6>
                    <a href="">
                      SEE ALL FEATURES{" "}
                      <FontAwesomeIcon className="" icon={faChevronRight} />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="duration">
            <h6>Plan Duration</h6>
            <p>
              Choosing a multi-year gets you a discount and saves you the
              trouble of renewing your HMO Plan yearly
            </p>
            <div
              className={
                this.props.responses.plan_duration === "1"
                  ? "hmo_period_inner selected_term"
                  : "hmo_period_inner"
              }
            >
              <div>
                <div className="label-term-radiobox">
                  <label>
                    <input
                      type="radio"
                      name="term"
                      className="input-radio"
                      value="1"
                      defaultChecked={
                        this.props.responses.plan_duration === "1"
                      }
                      onClick={this.handlePlanDuration}
                    />{" "}
                    1 Year
                  </label>
                </div>
              </div>
              <div className="text_right">
                <span className="mr-2">Premium</span>
                ₦5000
              </div>
            </div>
            <div
              className={
                this.props.responses.plan_duration === "2"
                  ? "hmo_period_inner selected_term"
                  : "hmo_period_inner"
              }
            >
              <div>
                <div className="label-term-radiobox">
                  <label>
                    <input
                      type="radio"
                      name="term"
                      className="input-radio"
                      value="2"
                      defaultChecked={
                        this.props.responses.plan_duration === "2"
                      }
                      onClick={this.handlePlanDuration}
                    />{" "}
                    2 Years
                  </label>
                </div>
              </div>
              <div className="text_right">
                <span className="mr-2">Premium</span>
                ₦8000
              </div>
            </div>
            <div
              className={
                this.props.responses.plan_duration === "3"
                  ? "hmo_period_inner selected_term"
                  : "hmo_period_inner"
              }
            >
              <div>
                <div className="label-term-radiobox">
                  <label>
                    <input
                      type="radio"
                      name="term"
                      className="input-radio"
                      value="3"
                      defaultChecked={
                        this.props.responses.plan_duration === "3"
                      }
                      onClick={this.handlePlanDuration}
                    />{" "}
                    3 Years
                  </label>
                </div>
              </div>
              <div className="text_right">
                <span className="mr-2">Premium</span>
                ₦12000
              </div>
            </div>
          </div>
          <div className="members-covered">
            <h6>Members Covered</h6>
            <div className="row">
              <p>Victoria Kazeem(24 years)</p>
              <a className="edit-members-modal" href="">
                <FontAwesomeIcon
                  className="members-chev"
                  icon={faChevronRight}
                />
              </a>
            </div>
          </div>
          <div className="similar-plans">
            <div className="similar-plans-inner">
              <div className="heading_section">
                <h6>Compare with similar plans</h6>
              </div>
              <div className="similar_plan_feature">
                <div className="box-slider">
                  <div className="slider-plans">
                    <div className="box">
                      <ul className="similar-plan-ul">
                        <li>
                          <div className="box_block">
                            <div className="img-box-logo-similar">
                              <img src="https://www.hygeiahmo.com/wp-content/uploads/2018/11/Hygeia-Final-No-Left-Padding@1x.svg" />
                            </div>
                            <span className="greyed-text">Hygeia Plus</span>
                          </div>
                          <ul>
                            <li>
                              <span>
                                Covers <b>2 people</b>
                              </span>
                            </li>
                            <li>
                              <span>
                                Premium <b>₦5k/ month</b>
                              </span>
                            </li>
                          </ul>
                          <div className="similar-plans-btm">
                            <button className="btn">COMPARE NOW</button>
                          </div>
                        </li>
                      </ul>
                    </div>
                    <div className="box">
                      <ul className="similar-plan-ul">
                        <li>
                          <div className="box_block">
                            <div className="img-box-logo-similar">
                              <img src="https://www.hygeiahmo.com/wp-content/uploads/2018/11/Hygeia-Final-No-Left-Padding@1x.svg" />
                            </div>
                            <span className="greyed-text">Hygeia Plus</span>
                          </div>
                          <ul>
                            <li>
                              <span>
                                Covers <b>2 people</b>
                              </span>
                            </li>
                            <li>
                              <span>
                                Premium <b>₦5k/ month</b>
                              </span>
                            </li>
                          </ul>
                          <div className="similar-plans-btm">
                            <button className="btn">COMPARE NOW</button>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="bottom-menu details-bottom-menu row">
            <div className="col-md-4">
              <p>Total Premium</p>
              <p>₦5000</p>
            </div>
            <div className="col-md-8">
              <button className="btn btn-danger checkout">
                PROCEED TO CHECKOUT
              </button>
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

export default connect(mapProps)(PlanDetails);
