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

import { options } from "../home/Options";

import Modal from "react-bootstrap/Modal";

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
    this.decrementSonCount = this.decrementSonCount.bind(this);
    this.incrementSonCount = this.incrementSonCount.bind(this);
    this.decrementDaughterCount = this.decrementDaughterCount.bind(this);
    this.incrementDaughterCount = this.incrementDaughterCount.bind(this);
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

  handleIndividualAge(val) {
    if (this.props.responses.type != "others") {
      //this.resetAges();
    }

    this.props.dispatch({
      type: actions.UPDATE_INDIVIDUAL_AGE,
      data: { key: "individual_age", value: val },
    });
  }

  handleFatherAge(val) {
    if (this.props.responses.type != "others") {
      //this.resetAges();
    }

    this.props.dispatch({
      type: actions.UPDATE_FATHER_AGE,
      data: { key: "father_age", value: val },
    });
  }

  handleMotherAge(val) {
    if (this.props.responses.type != "others") {
      //this.resetAges();
    }

    this.props.dispatch({
      type: actions.UPDATE_MOTHER_AGE,
      data: { key: "mother_age", value: val },
    });
  }

  handleGrandFatherAge(val) {
    if (this.props.responses.type != "others") {
      //this.resetAges();
    }

    this.props.dispatch({
      type: actions.UPDATE_GRAND_FATHER_AGE,
      data: { key: "phone_num", value: val },
    });
  }

  handleGrandMotherAge(val) {
    if (this.props.responses.type != "others") {
      //this.resetAges();
    }

    this.props.dispatch({
      type: actions.UPDATE_GRAND_MOTHER_AGE,
      data: { key: "grand_mother_age", value: val },
    });
  }

  handleFatherInLawAge(val) {
    if (this.props.responses.type != "others") {
      //this.resetAges();
    }

    this.props.dispatch({
      type: actions.UPDATE_FATHER_IN_LAW_AGE,
      data: { key: "father_in_law_age", value: val },
    });
  }

  handleMotherInLawAge(val) {
    if (this.props.responses.type != "others") {
      //this.resetAges();
    }

    this.props.dispatch({
      type: actions.UPDATE_MOTHER_IN_LAW_AGE,
      data: { key: "mother_in_law_age", value: val },
    });
  }

  handleSpouseAge(val) {
    if (this.props.responses.type != "others") {
      //this.resetAges();
    }

    this.props.dispatch({
      type: actions.UPDATE_SPOUSE_AGE,
      data: { key: "spouse_age", value: val },
    });
  }

  handleChild1Age(val) {
    if (this.props.responses.type != "others") {
      //this.resetAges();
    }

    this.props.dispatch({
      type: actions.UPDATE_CHILD_1_AGE,
      data: { key: "child_1_age", value: val },
    });
  }

  handleChild2Age(val) {
    if (this.props.responses.type != "others") {
      //this.resetAges();
    }

    this.props.dispatch({
      type: actions.UPDATE_CHILD_2_AGE,
      data: { key: "child_2_age", value: val },
    });
  }

  handleChild3Age(val) {
    if (this.props.responses.type != "others") {
      //this.resetAges();
    }

    this.props.dispatch({
      type: actions.UPDATE_CHILD_3_AGE,
      data: { key: "child_3_age", value: val },
    });
  }

  handleChild4Age(val) {
    if (this.props.responses.type != "others") {
      //this.resetAges();
    }

    this.props.dispatch({
      type: actions.UPDATE_CHILD_4_AGE,
      data: { key: "child_4_age", value: val },
    });
  }

  handleChild5Age(val) {
    this.props.dispatch({
      type: actions.UPDATE_CHILD_5_AGE,
      data: { key: "child_5_age", value: val },
    });
  }

  handleChild6Age(val) {
    if (this.props.responses.type != "others") {
      //this.resetAges();
    }

    this.props.dispatch({
      type: actions.UPDATE_CHILD_6_AGE,
      data: { key: "child_6_age", value: val },
    });
  }

  handleChild7Age(val) {
    if (this.props.responses.type != "others") {
      //this.resetAges();
    }

    this.props.dispatch({
      type: actions.UPDATE_CHILD_7_AGE,
      data: { key: "child_7_age", value: val },
    });
  }

  handleChild8Age(val) {
    if (this.props.responses.type != "others") {
      //this.resetAges();
    }

    this.props.dispatch({
      type: actions.UPDATE_CHILD_8_AGE,
      data: { key: "child_8_age", value: val },
    });
  }

  handleSonBoxChecked(val) {
    console.log(this);
    this.props.dispatch({
      type: actions.UPDATE_SON_CHECKED,
      data: {
        key: "isSonCheckboxChecked",
        value: !this.props.isSonCheckboxChecked,
      },
    });
  }

  handleDaughterBoxChecked(val) {
    this.props.dispatch({
      type: actions.UPDATE_DAUGHTER_CHECKED,
      data: {
        key: "isDaughterCheckboxChecked",
        value: !this.props.isDaughterCheckboxChecked,
      },
    });
  }

  incrementSonCount() {
    if (this.props.sonCount < 4 && this.props.sonCount > 0) {
      this.props.dispatch({
        type: actions.INCREMENT_SON_COUNT,
        data: { key: "sonCount", value: this.props.sonCount + 1 },
      });
    }
  }

  decrementSonCount() {
    if (this.props.sonCount > 1) {
      this.props.dispatch({
        type: actions.DECREMENT_SON_COUNT,
        data: { key: "sonCount", value: this.props.sonCount - 1 },
      });
    }

    console.log("this.props.sonCount", this.props.sonCount);
  }

  incrementDaughterCount() {
    if (this.props.daughterCount < 4 && this.props.daughterCount > 0) {
      this.props.dispatch({
        type: actions.INCREMENT_DAUGHTER_COUNT,
        data: { key: "daughterCount", value: this.props.daughterCount + 1 },
      });
    }
  }

  decrementDaughterCount() {
    if (this.props.daughterCount > 1) {
      this.props.dispatch({
        type: actions.DECREMENT_DAUGHTER_COUNT,
        data: { key: "daughterCount", value: this.props.daughterCount - 1 },
      });
    }
  }

  handleChildrenCheckboxes(e) {
    let val = e.target.checked;
    console.log(val);
    // const node = this.sonCheck.current;
    // if (node) {
    //   node.focus();
    // if (val == true) {
    //   console.log('this.sonCheck',this.sonCheck)
    // }
    // }
  }

  resetAges() {
    this.props.dispatch({
      type: actions.RESET_RESPONSES,
      data: {
        individual_age: 0,
        father_age: 0,
        mother_age: 0,
        grand_father_age: 0,
        grand_mother_age: 0,
        father_in_law_age: 0,
        mother_in_law_age: 0,
        spouse_age: 0,
        child_1_age: 0,
        child_2_age: 0,
        child_3_age: 0,
        child_4_age: 0,
        child_5_age: 0,
        child_6_age: 0,
        child_7_age: 0,
        child_8_age: 0,
      },
    });
  }

  toggleOthersInput = () => {
    // this.setState({
    //   isOthersInputOpen: !this.props.isOthersInputOpen,
    // });
    this.props.dispatch({
      type: actions.TOGGLE_OTHERS_MODAL,
      data: { key: "isOthersInputOpen", value: !this.props.isOthersInputOpen },
    });
  };

  showOthersInput() {
    const othersInput = (
      <div id="others-controls">
        <div className="col-md-12 row self">
          <div className="col-md-6 chkContainer">
            <div className="checkbox">
              <label>
                <input
                  type="checkbox"
                  value="self"
                  className="chkMembers"
                  defaultChecked={true}
                  // onClick={}
                  id="self"
                ></input>

                <span>Self</span>
              </label>
            </div>
          </div>

          <div className="col-md-6">
            <select
              name="individual_age"
              className="form-control"
              onChange={(e) => {
                this.handleIndividualAge(e.target.value);
              }}
              value={this.props.responses.individual_age}
              placeholder="Select Age"
            >
              {options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="col-md-12 row spouse">
          <div className="col-md-6 chkContainer">
            <div className="checkbox">
              <label>
                <input
                  type="checkbox"
                  value="spouse"
                  className="chkMembers"
                  defaultChecked={false}
                  // onClick={}
                  id="spouse"
                ></input>

                <span>Spouse</span>
              </label>
            </div>
          </div>
          <div className="col-md-6">
            <select
              name="spouse_age"
              className="form-control"
              onChange={(e) => {
                this.handleSpouseAge(e.target.value);
              }}
              value={this.props.responses.spouse_age}
              placeholder="Select Age"
            >
              {options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="col-md-12 son">
          <div className="col-md-12 chkContainer">
            <div className="checkbox">
              <label>
                <input
                  type="checkbox"
                  value="son"
                  className="chkMembers"
                  defaultChecked={false}
                  onChange={(e) => {
                    this.handleSonBoxChecked(e.target.value);
                  }}
                  id="son"
                ></input>

                <span className="controls">
                  Son
                  <div
                    className={
                      this.props.isSonCheckboxChecked
                        ? "show-controls counter-controls"
                        : "hide-controls"
                    }
                  >
                    <button
                      className="minus"
                      id="dec-son"
                      onClick={this.decrementSonCount}
                    >
                      {" "}
                      -
                    </button>
                    <span className="count"> {this.props.sonCount} </span>
                    <button className="plus" onClick={this.incrementSonCount}>
                      {" "}
                      +{" "}
                    </button>
                  </div>
                </span>
              </label>
            </div>
          </div>
          <div
            className={
              this.props.isSonCheckboxChecked
                ? "col-md-12 row children"
                : "hide-controls"
            }
          >
            <div className="col-md-6 chkContainer">
              <div className="checkbox  children-check">
                <label className="children-label">
                  <span>Son 1</span>
                </label>
              </div>
            </div>
            <div className="col-md-6">
              <select
                name="child_1_age"
                className="form-control"
                onChange={(e) => {
                  this.handleChild1Age(e.target.value);
                }}
                value={this.props.responses.child_1_age}
                placeholder="Select Age"
              >
                {options.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div
            className={
              this.props.sonCount > 1
                ? "col-md-12 row children"
                : "hide-controls"
            }
          >
            <div className="col-md-6 chkContainer">
              <div className="checkbox children-check">
                <label className="children-label">
                  <span>Son 2</span>
                </label>
              </div>
            </div>
            <div className="col-md-6">
              <select
                name="child_2_age"
                className="form-control"
                onChange={(e) => {
                  this.handleChild2Age(e.target.value);
                }}
                value={this.props.responses.child_2_age}
                placeholder="Select Age"
              >
                {options.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div
            className={
              this.props.sonCount > 2
                ? "col-md-12 row children"
                : "hide-controls"
            }
          >
            <div className="col-md-6 chkContainer">
              <div className="checkbox children-check">
                <label className="children-label">
                  <span>Son 3</span>
                </label>
              </div>
            </div>
            <div className="col-md-6">
              <select
                name="child_3_age"
                className="form-control"
                onChange={(e) => {
                  this.handleChild3Age(e.target.value);
                }}
                value={this.props.responses.child_3_age}
                placeholder="Select Age"
              >
                {options.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div
            className={
              this.props.sonCount > 3
                ? "col-md-12 row children"
                : "hide-controls"
            }
          >
            <div className="col-md-6 chkContainer">
              <div className="checkbox children-check">
                <label className="children-label">
                  <span>Son 4</span>
                </label>
              </div>
            </div>
            <div className="col-md-6">
              <select
                name="child_4_age"
                className="form-control"
                onChange={(e) => {
                  this.handleChild4Age(e.target.value);
                }}
                value={this.props.responses.child_4_age}
                placeholder="Select Age"
              >
                {options.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
        <div className="col-md-12 daughter">
          <div className="col-md-12 chkContainer">
            <div className="checkbox">
              <label>
                <input
                  type="checkbox"
                  value="daughter"
                  className="chkMembers"
                  defaultChecked={false}
                  onChange={(e) => {
                    this.handleDaughterBoxChecked(e.target.value);
                  }}
                  id="daughter"
                ></input>

                <span className="controls">
                  Daughter
                  <div
                    className={
                      this.props.isDaughterCheckboxChecked
                        ? "show-controls counter-controls"
                        : "hide-controls"
                    }
                  >
                    <button
                      className="minus"
                      onClick={this.decrementDaughterCount}
                    >
                      {" "}
                      -{" "}
                    </button>
                    <span className="count"> {this.props.daughterCount} </span>
                    <button
                      className="plus"
                      onClick={this.incrementDaughterCount}
                    >
                      {" "}
                      +{" "}
                    </button>
                  </div>
                </span>
              </label>
            </div>
          </div>
          <div
            className={
              this.props.isDaughterCheckboxChecked
                ? "col-md-12 row children"
                : "hide-controls"
            }
          >
            <div className="col-md-6 chkContainer">
              <div className="checkbox children-check">
                <label className="children-label">
                  <span>Daughter 1</span>
                </label>
              </div>
            </div>
            <div className="col-md-6">
              <select
                name="child_5_age"
                className="form-control"
                onChange={(e) => {
                  this.handleChild5Age(e.target.value);
                }}
                value={this.props.responses.child_5_age}
                placeholder="Select Age"
              >
                {options.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div
            className={
              this.props.daughterCount > 1
                ? "col-md-12 row children"
                : "hide-controls"
            }
          >
            <div className="col-md-6 chkContainer">
              <div className="checkbox children-check">
                <label className="children-label">
                  <span>Daughter 2</span>
                </label>
              </div>
            </div>
            <div className="col-md-6">
              <select
                name="child_6_age"
                className="form-control"
                onChange={(e) => {
                  this.handleChild6Age(e.target.value);
                }}
                value={this.props.responses.child_6_age}
                placeholder="Select Age"
              >
                {options.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div
            className={
              this.props.daughterCount > 2
                ? "col-md-12 row children"
                : "hide-controls"
            }
          >
            <div className="col-md-6 chkContainer">
              <div className="checkbox children-check">
                <label className="children-label">
                  <span>Daughter 3</span>
                </label>
              </div>
            </div>
            <div className="col-md-6">
              <select
                name="child_7_age"
                className="form-control"
                onChange={(e) => {
                  this.handleChild7Age(e.target.value);
                }}
                value={this.props.responses.child_7_age}
                placeholder="Select Age"
              >
                {options.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div
            className={
              this.props.daughterCount > 3
                ? "col-md-12 row children"
                : "hide-controls"
            }
          >
            <div className="col-md-6 chkContainer">
              <div className="checkbox children-check">
                <label className="children-label">
                  <span>Daughter 4</span>
                </label>
              </div>
            </div>
            <div className="col-md-6">
              <select
                name="child_8_age"
                className="form-control"
                onChange={(e) => {
                  this.handleChild8Age(e.target.value);
                }}
                value={this.props.responses.child_8_age}
                placeholder="Select Age"
              >
                {options.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
        <div className="col-md-12 row father">
          <div className="col-md-6 chkContainer">
            <div className="checkbox">
              <label>
                <input
                  type="checkbox"
                  value="father"
                  className="chkMembers"
                  defaultChecked={false}
                  // onClick={}
                  id="father"
                ></input>

                <span>Father</span>
              </label>
            </div>
          </div>
          <div className="col-md-6">
            <select
              name="father_age"
              className="form-control"
              onChange={(e) => {
                this.handleFatherAge(e.target.value);
              }}
              value={this.props.responses.father_age}
              placeholder="Select Age"
            >
              {options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="col-md-12 row mother">
          <div className="col-md-6 chkContainer">
            <div className="checkbox">
              <label>
                <input
                  type="checkbox"
                  value="mother"
                  className="chkMembers"
                  defaultChecked={false}
                  // onClick={}
                  id="mother"
                ></input>

                <span>Mother</span>
              </label>
            </div>
          </div>
          <div className="col-md-6">
            <select
              name="mother_age"
              className="form-control"
              onChange={(e) => {
                this.handleMotherAge(e.target.value);
              }}
              value={this.props.responses.mother_age}
              placeholder="Select Age"
            >
              {options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="col-md-12 row grandfather">
          <div className="col-md-6 chkContainer">
            <div className="checkbox">
              <label>
                <input
                  type="checkbox"
                  value="grandfather"
                  className="chkMembers"
                  defaultChecked={false}
                  // onClick={}
                  id="grandfather"
                ></input>

                <span>Grandfather</span>
              </label>
            </div>
          </div>
          <div className="col-md-6">
            <select
              name="grand_father_age"
              className="form-control"
              onChange={(e) => {
                this.handleGrandFatherAge(e.target.value);
              }}
              value={this.props.responses.grand_father_age}
              placeholder="Select Age"
            >
              {options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="col-md-12 row grandmother">
          <div className="col-md-6 chkContainer">
            <div className="checkbox">
              <label>
                <input
                  type="checkbox"
                  value="grandmother"
                  className="chkMembers"
                  defaultChecked={false}
                  // onClick={}
                  id="grandmother"
                ></input>

                <span>Grandmother</span>
              </label>
            </div>
          </div>
          <div className="col-md-6">
            <select
              name="grand_mother_age"
              className="form-control"
              onChange={(e) => {
                this.handleGrandMotherAge(e.target.value);
              }}
              value={this.props.responses.grand_mother_age}
              placeholder="Select Age"
            >
              {options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="col-md-12 row father-in-law">
          <div className="col-md-6 chkContainer in-law">
            <div className="checkbox">
              <label>
                <input
                  type="checkbox"
                  value="father-in-law"
                  className="chkMembers"
                  defaultChecked={false}
                  // onClick={}
                  id="father-in-law"
                ></input>

                <span>Father-in-law</span>
              </label>
            </div>
          </div>
          <div className="col-md-6">
            <select
              name="father_in_law_age"
              className="form-control"
              onChange={(e) => {
                this.handleFatherInLawAge(e.target.value);
              }}
              value={this.props.responses.father_in_law_age}
              placeholder="Select Age"
            >
              {options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="col-md-12 row mother-in-law">
          <div className="col-md-6 chkContainer in-law">
            <div className="checkbox">
              <label>
                <input
                  type="checkbox"
                  value="mother-in-law"
                  className="chkMembers"
                  defaultChecked={false}
                  // onClick={}
                  id="mother-in-law"
                ></input>

                <span>Mother-in-law</span>
              </label>
            </div>
          </div>
          <div className="col-md-6">
            <select
              name="mother_in_law_age"
              className="form-control"
              onChange={(e) => {
                this.handleMotherInLawAge(e.target.value);
              }}
              value={this.props.responses.mother_in_law_age}
              placeholder="Select Age"
            >
              {options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    );
    return othersInput;
  }

  render() {
    return (
      <div className="details">
        {/*<Row>*/}
        <div className="mobile-view">
          <div className="row pl-3rem compare-plans-header">
            <div className="row nav-info details-mobile-header">
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
            <Col
              className="row nav-info  details-desktop-header"
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
          </div>

          <div className=" pl-3rem tiny-go-back">
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
                <h6 className="plan-type">Go back to Plans</h6>
              </div>
            </div>
          </div>

          <div className="row  pl-3rem ">
            <div className="col-md-8 two-third">
              <div className="row details-header-row">
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
                        <a href="" className="details-features">
                          SEE ALL FEATURES
                          <FontAwesomeIcon className="" icon={faChevronRight} />
                        </a>
                        <a href="" className="details-cashless-hosp">
                          300 Cashless Hospitals
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
                  <a
                    className="edit-members-modal"
                    onClick={this.toggleOthersInput}
                    href="#"
                  >
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
            </div>
            <div className="col-md-4 wrapper_right_product">
              <div className="inner_right_section">
                <h3>Summary</h3>
                <div className="scroll_space">
                  <div className="flexRow section_right">
                    <div className="">Base Plan</div>
                    <div>
                      <span>₦5000</span>
                    </div>
                  </div>
                  <div className="flexRow section_right">
                    <div>Cover Amount</div>
                    <div>
                      <span>₦5000</span>
                    </div>
                  </div>
                  <div className="flexRow section_right">
                    <div>Policy Period</div>
                    <div>
                      <span>1 Year</span>
                    </div>
                  </div>
                  <div className="premium_right">
                    <div className="flexRow section_premium">
                      <div>TOTAL PREMIUM</div>
                      <div>
                        <span>₦5000</span>
                      </div>
                    </div>
                    <button type="button">PROCEED TO CHECKOUT</button>
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
          <Modal
            dialogClassName="custom-dialog"
            className="right edit-members-popup"
            show={this.props.isOthersInputOpen}
            onHide={this.toggleOthersInput}
          >
            <Modal.Header translate="true" closeButton>
              <div className="others-mtitle edit-members-header">
                <h3>Edit Members</h3>
              </div>
            </Modal.Header>
            <Modal.Body>{this.showOthersInput()}</Modal.Body>
            <div className="bottom-menu details-bottom-menu row">
              <div className="col-md-12">
                <button
                  className="btn btn-danger checkout update-members-btn"
                  onClick={this.toggleOthersInput}
                >
                  UPDATE MEMBERS
                </button>
              </div>
            </div>
          </Modal>
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
