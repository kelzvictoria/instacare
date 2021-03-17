import React, { Component } from "react";
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

import { AppFooter } from "../../components/app-footer/AppFooter";

import { options } from "../home/Options";

const { Title } = Typography;
const { Panel } = Collapse;
const { Meta } = Card;
const { TabPane } = Tabs;
let responses: any;
const API_URL = "https://instacareconnect.pmglobaltechnology.com";
interface PlansProps {
  [x: string]: any;
  dispatch(args: any): any;
  isFeaturesModalOpen: boolean;
  email: string;
  amount: number;
  notgettingproviders: boolean;
  buyingPlan: boolean;
  plans: Plan[];
  //fetching_plans: boolean;
}

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

class Plans extends Component<PlansProps> {
  constructor(props) {
    super(props);
    this.goToHome = this.goToHome.bind(this);
    this.goToDetails = this.goToDetails.bind(this);
    this.goToComparison = this.goToComparison.bind(this);
    this.handleTabChange = this.handleTabChange.bind(this);
    this.toggleFeaturePopUp = this.toggleFeaturePopUp.bind(this);
    this.showCashlessHospitals = this.showCashlessHospitals.bind(this);
  }
  state = {
    toggleBar: false,
    searchText: "",
    open: false,
    limit_plans_to_compare_on_mobile: 2,
    limit_plans_to_compare_on_desktop: 3,
    compare_plans_mobile_indexes: [],
    compare_plans_desktop_indexes: [],
    show_compare_checkbox: false,
    show_compare_widget: false,
    show_desktop_compare_widget: false,
    checked_plans_list: [],
  };

  /* setSelectedK: any;
  searchInput: any;

  getColumnSearchProps = (dataIndex: any) => ({
    filterDropdown: (data: FilterProps) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={(node) => {
            this.searchInput = node;
          }}
          placeholder={`Search ${dataIndex}`}
          value={data.selectedKeys[0]}
          onChange={(e) =>
            data.setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() =>
            this.handleSearch(data.selectedKeys, data.confirm)
          }
          style={{ width: 188, marginBottom: 8, display: "block" }}
        />
        <Button
          type="primary"
          onClick={() => this.handleSearch(data.selectedKeys, data.confirm)}
          icon="search"
          size="small"
          style={{ width: 90, marginRight: 8 }}
        >
          Search
        </Button>
        <Button
          onClick={() => this.handleReset(data.clearFilters)}
          size="small"
          style={{ width: 90 }}
        >
          Reset
        </Button>
      </div>
    ),
    filterIcon: (filtered: any) => (
      <Icon type="search" style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    onFilter: (value: any, record: any) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: (visible: any) => {
      if (visible) {
        this.searchInput.select();
      }
    },
  });

  handleSearch = (selectedKeys: any, confirm: any) => {
    confirm();
    this.setState({ searchText: selectedKeys[0] });
  };

  handleReset = (clearFilters: any) => {
    clearFilters();
    this.setState({ searchText: "" });
  };

  //search implentation

  details: any;
  // eslint-disable-next-line camelcase
  UNSAFE_componentWillMount() {
    predetails = localStorage.getItem("details");
    this.details = JSON.parse(predetails);
    this.services = JSON.parse(predetails).services;
    this.props.dispatch({
      type: UPDATE_PRICE,
      price: JSON.parse(predetails).price * 100,
    });
  }
  callback = () => {
    setTimeout(() => {
      this.props.history.push({ pathname: "/" });
    }, 2000);
    this.onCloseModal();
  };
  close = () => {
    //cons
  };
  getReference = () => {
    let text = "";
    let possible =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-.=";

    for (let i = 0; i < 15; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
  };

  notGettingProvidersView = () => {
    notGettingProviders = true;
    this.props.dispatch({
      type: UPDATE_NOTGETTINGPROVIDERS,
      status: notGettingProviders,
    });
    this.setState({ featuresColor: "#38A169", providersColor: "" });
  };
  gettingProviders = () => {
    notGettingProviders = false;
    this.props.dispatch({
      type: UPDATE_NOTGETTINGPROVIDERS,
      status: notGettingProviders,
    });
    this.setState({ featuresColor: "", providersColor: "#38A169" });
  };
  toggleBuyingPlan = () => {
    this.props.dispatch({ type: TOGGLE_BUYING_PLAN, status: true });
    console.log(this.props.details.buyingPlan);
  };

  onOpenModal = () => {
    this.setState({ open: true });
  };

  onCloseModal = () => {
    this.setState({ open: false });
  };
  columns = [
    {
      title: "Provider",
      dataIndex: "providerName",
      key: "providerName",
      ...this.getColumnSearchProps("providerName"),
    },
    {
      title: "Coverage",
      dataIndex: "coverageTypeName",
      key: "coverageTypeName",
      ...this.getColumnSearchProps("coverageTypeName"),
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
      ...this.getColumnSearchProps("address"),
    },
    {
      title: "LGA",
      dataIndex: "lga",
      key: "lga",
      ...this.getColumnSearchProps("lga"),
    },
    {
      title: "State",
      dataIndex: "stateName",
      key: "stateName",
    },
  ];

  dataSourceA: any = [];
  services: any;

  precovers: any = localStorage.getItem("details");
  covers = JSON.parse(this.precovers).services[0];
  AllServices = [
    this.covers.accidentsOrEmergenciesCover.limit,
    this.covers.ambulance,
    this.covers.cancerCare.offerings[0],
    this.covers.chronicDiseaseMedication,
    this.covers.consultations,
    this.covers.deathBenefits.benefit,
    this.covers.dentalOptions.offerings[0],
    this.covers.diagnostics.offerings[0],
    this.covers.dialysis,
    this.covers.familyPlanningServices[0],
    this.covers.hivTreatment,
    this.covers.immunizations.offerings[0],
    this.covers.natalCare,
    this.covers.opticalOptions.offerings[0],
    this.covers.pharmacyCover,
    this.covers.physiotherapy,
    this.covers.psychiatricTreatment,
    this.covers.surgeriesCover.minorSurgeries,
    this.covers.majorSurgeries,
    this.covers.intermediateSurgeries,
    this.covers.wellnessChecks,
  ];

  componentDidMount() {
    console.log(this.dataSourceA);
    console.log(this.details.hospitals);
    console.log(this.services);
    if (!this.details.hospitals) {
      return;
    }
    this.dataSourceA.push(...this.details.hospitals);
  }

  callb = (key) => {
    console.log(key);
  };

  handleInput = (e: any) => {
    this.props.dispatch({
      type: actions.UPDATE_TEXT_RESPONSE,
      data: { key: e.target.name, value: e.target.value },
    });
  };

  toggleView = (key) => {
    if (key == 1) {
      this.notGettingProvidersView();
    }
    if (key == 2) {
      this.gettingProviders();
    }
  };*/

  goToDetails() {
    //item: any
    this.props.history.push({ pathname: "/details" });
  }

  goToComparison() {
    if (
      this.state.compare_plans_desktop_indexes.length > 1 ||
      this.state.compare_plans_mobile_indexes.length > 1
    ) {
      this.setRecPlansIndexesToCompare();
      this.props.history.push({
        pathname: "/compare",
        // ,
        // state: {
        //   compare_plans_mobile_indexes: this.state.compare_plans_mobile_indexes,
        //   compare_plans_desktop_indexes: this.state.compare_plans_desktop_indexes,
        // },
      });
    } else {
      message.error("You need to select at least 2 plans to compare");
      return;
    }
  }

  toggleFeaturesModal = () => {
    this.props.dispatch({
      type: actions.TOGGLE_FEATURES_MODAL,
      data: {
        key: "isFeaturesModalOpen",
        value: !this.props.quiz.isFeaturesModalOpen,
      },
    });
  };

  getClickedPlan = (index) => {
    // console.log("index", index);
    this.props.dispatch({
      type: actions.GET_CLICKED_PLAN,
      data: this.props.recommended_plans[index],
    });
  };

  toggle = () => {
    this.setState({ toggleBar: !this.state.toggleBar });
    console.log(this.state.toggleBar);
  };

  handleNavigation = (e: any) => {};

  goToHome() {
    this.props.history.push({ pathname: "/" });
  }

  handleTabChange(val) {
    //let id = document.getElementById(val.target.id) as HTMLInputElement;
    this.props.dispatch({
      type: actions.UPDATE_FEATURES_TAB_OPENED,
      data: { key: "tab_opened", value: val.target.id },
    });
    //console.log("this.props.tab_opened", this.props.tab_opened);
  }

  toggleFeaturePopUp() {
    this.props.dispatch({
      type: actions.TOGGLE_FEATURE_POPUP,
      data: {
        key: "isFeaturePopUpOpen",
        value: !this.props.quiz.isFeaturePopUpOpen,
      },
    });
  }

  showCashlessHospitals() {
    this.props.dispatch({
      type: actions.UPDATE_FEATURES_TAB_OPENED,
      data: { key: "tab_opened", value: "hospitals" },
    });
    this.toggleFeaturesModal();
  }

  async fetchPlans() {
    this.props.dispatch({
      type: actions.IS_FETCHING_PLANS,
      data: true,
    });
    const res = await fetch(`${API_URL}/api/plans`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "GET",
    });

    if (res) {
      let plans: object[] = [];
      let formelo_resp = await res.json();
      this.props.dispatch({
        type: actions.IS_FETCHING_PLANS,
        data: false,
      });
      if (formelo_resp || formelo_resp.length !== 0) {
        for (let i = 0; i < formelo_resp.length; i++) {
          plans.push(formelo_resp[i].data);
        }

        for (let j = 0; j < plans.length; j++) {
          let hmoID = plans[j]["hmo_id"].id;
          let servicesString = plans[j]["service_id"];
          //let providersString = plans[j]["hmo_id"].provider_id;
          //console.log("providersString", providersString);
          let services = servicesString ? JSON.parse(servicesString) : "";
          //let providers = providersString ? JSON.parse(providersString) : "";
          //console.log("providers", providers);

          const hmo_res = await fetch(`${API_URL}/api/hmos?id=${hmoID}`, {
            headers: {
              "Content-Type": "application/json",
            },
            method: "GET",
          });

          if (hmo_res) {
            let hmo_resp = await hmo_res.json();
            //console.log("hmo_resp", hmo_resp);

            plans[j]["hmo_id"] = hmo_resp.data;
            plans[j]["service_id"] = services;
            //plans[j]["hmo_id"].provider_id = providers;
          }
        }

        this.props.dispatch({
          type: actions.GET_PLANS,
          data: plans,
        });
        return;
      }
    }
  }

  async loadRecommendations() {
    this.props.dispatch({
      type: actions.GET_NUM_OF_PEOPLE,
      data: this.props.quiz.responses.num_of_people,
    });

    let rec_plans: object[] = [];
    let family_plans: object[] = [];
    let individual_plans: object[] = [];
    let others: object[] = [];
    await this.fetchPlans();
    console.log("this.props.plans", this.props.plans);
    if (this.props.plans) {
      for (let i = 0; i < this.props.plans.length; i++) {
        if (
          //this.props.this.props.plansponses.num_of_people == 1 &&
          this.props.plans[i].category_id["id"] == "personal"
        ) {
          console.log("personal");
          individual_plans.push(this.props.plans[i]);
          //rec_plans.push(this.props.plans[i]);
        } else if (
          //this.props.this.props.plansponses.num_of_people > 1 &&
          this.props.plans[i].category_id["id"] == "family"
        ) {
          console.log("family");
          // rec_plans.push(this.props.plans[i]);
          family_plans.push(this.props.plans[i]);
        } else {
          console.log("others");
          others.push(this.props.plans[i]);
        }
      }

      console.log(
        "this.props.quiz.responses.num_of_people",
        this.props.quiz.responses.num_of_people
      );
      if (
        //this.props.quiz.responses.num_of_people === 1
        this.props.quiz.responses.type == "single"
      ) {
        rec_plans = individual_plans;
      } else {
        rec_plans = family_plans;
      }

      this.props.dispatch({
        type: actions.GET_RECOMMENDED_PLANS,
        data: rec_plans,
      });

      this.props.dispatch({
        type: actions.IS_FETCHING_RECOMMENDED_PLANS,
        data: false,
      });
      return;
    }
  }

  componentDidMount() {
    this.loadRecommendations();
  }

  handleIndividualAge(val) {
    if (this.props.quiz.responses.type != "others") {
      //this.resetAges();
    }

    this.props.dispatch({
      type: actions.UPDATE_INDIVIDUAL_AGE,
      data: { key: "individual_age", value: val },
    });
  }

  handleFatherAge(val) {
    if (this.props.quiz.responses.type != "others") {
      //this.resetAges();
    }

    this.props.dispatch({
      type: actions.UPDATE_FATHER_AGE,
      data: { key: "father_age", value: val },
    });
  }

  handleMotherAge(val) {
    if (this.props.quiz.responses.type != "others") {
      //this.resetAges();
    }

    this.props.dispatch({
      type: actions.UPDATE_MOTHER_AGE,
      data: { key: "mother_age", value: val },
    });
  }

  handleGrandFatherAge(val) {
    if (this.props.quiz.responses.type != "others") {
      //this.resetAges();
    }

    this.props.dispatch({
      type: actions.UPDATE_GRAND_FATHER_AGE,
      data: { key: "phone_num", value: val },
    });
  }

  handleGrandMotherAge(val) {
    if (this.props.quiz.responses.type != "others") {
      //this.resetAges();
    }

    this.props.dispatch({
      type: actions.UPDATE_GRAND_MOTHER_AGE,
      data: { key: "grand_mother_age", value: val },
    });
  }

  handleFatherInLawAge(val) {
    if (this.props.quiz.responses.type != "others") {
      //this.resetAges();
    }

    this.props.dispatch({
      type: actions.UPDATE_FATHER_IN_LAW_AGE,
      data: { key: "father_in_law_age", value: val },
    });
  }

  handleMotherInLawAge(val) {
    if (this.props.quiz.responses.type != "others") {
      //this.resetAges();
    }

    this.props.dispatch({
      type: actions.UPDATE_MOTHER_IN_LAW_AGE,
      data: { key: "mother_in_law_age", value: val },
    });
  }

  handleSpouseAge(val) {
    if (this.props.quiz.responses.type != "others") {
      //this.resetAges();
    }

    this.props.dispatch({
      type: actions.UPDATE_SPOUSE_AGE,
      data: { key: "spouse_age", value: val },
    });
  }

  handleChild1Age(val) {
    if (this.props.quiz.responses.type != "others") {
      //this.resetAges();
    }

    this.props.dispatch({
      type: actions.UPDATE_CHILD_1_AGE,
      data: { key: "child_1_age", value: val },
    });
  }

  handleChild2Age(val) {
    if (this.props.quiz.responses.type != "others") {
      //this.resetAges();
    }

    this.props.dispatch({
      type: actions.UPDATE_CHILD_2_AGE,
      data: { key: "child_2_age", value: val },
    });
  }

  handleChild3Age(val) {
    if (this.props.quiz.responses.type != "others") {
      //this.resetAges();
    }

    this.props.dispatch({
      type: actions.UPDATE_CHILD_3_AGE,
      data: { key: "child_3_age", value: val },
    });
  }

  handleChild4Age(val) {
    if (this.props.quiz.responses.type != "others") {
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
    if (this.props.quiz.responses.type != "others") {
      //this.resetAges();
    }

    this.props.dispatch({
      type: actions.UPDATE_CHILD_6_AGE,
      data: { key: "child_6_age", value: val },
    });
  }

  handleChild7Age(val) {
    if (this.props.quiz.responses.type != "others") {
      //this.resetAges();
    }

    this.props.dispatch({
      type: actions.UPDATE_CHILD_7_AGE,
      data: { key: "child_7_age", value: val },
    });
  }

  handleChild8Age(val) {
    if (this.props.quiz.responses.type != "others") {
      //this.resetAges();
    }

    this.props.dispatch({
      type: actions.UPDATE_CHILD_8_AGE,
      data: { key: "child_8_age", value: val },
    });
  }

  handleSonBoxChecked(val) {
    //console.log(this);
    this.props.dispatch({
      type: actions.UPDATE_SON_CHECKED,
      data: {
        key: "isSonCheckboxChecked",
        value: !this.props.quiz.isSonCheckboxChecked,
      },
    });
  }

  handleDaughterBoxChecked(val) {
    this.props.dispatch({
      type: actions.UPDATE_DAUGHTER_CHECKED,
      data: {
        key: "isDaughterCheckboxChecked",
        value: !this.props.quiz.isDaughterCheckboxChecked,
      },
    });
  }

  incrementSonCount() {
    if (this.props.quiz.sonCount < 4 && this.props.quiz.sonCount > 0) {
      this.props.dispatch({
        type: actions.INCREMENT_SON_COUNT,
        data: { key: "sonCount", value: this.props.quiz.sonCount + 1 },
      });
    }
  }

  decrementSonCount() {
    if (this.props.quiz.sonCount > 1) {
      this.props.dispatch({
        type: actions.DECREMENT_SON_COUNT,
        data: { key: "sonCount", value: this.props.quiz.sonCount - 1 },
      });
    }

    // console.log("this.props.quiz.sonCount", this.props.quiz.sonCount);
  }

  incrementDaughterCount() {
    if (
      this.props.quiz.daughterCount < 4 &&
      this.props.quiz.daughterCount > 0
    ) {
      this.props.dispatch({
        type: actions.INCREMENT_DAUGHTER_COUNT,
        data: {
          key: "daughterCount",
          value: this.props.quiz.daughterCount + 1,
        },
      });
    }
  }

  decrementDaughterCount() {
    if (this.props.quiz.daughterCount > 1) {
      this.props.dispatch({
        type: actions.DECREMENT_DAUGHTER_COUNT,
        data: {
          key: "daughterCount",
          value: this.props.quiz.daughterCount - 1,
        },
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
    //   isOthersInputOpen: !this.props.quiz.isOthersInputOpen,
    // });
    this.props.dispatch({
      type: actions.TOGGLE_OTHERS_MODAL,
      data: {
        key: "isOthersInputOpen",
        value: !this.props.quiz.isOthersInputOpen,
      },
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
              value={this.props.quiz.responses.individual_age}
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
              value={this.props.quiz.responses.spouse_age}
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
                      this.props.quiz.isSonCheckboxChecked
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
                    <span className="count"> {this.props.quiz.sonCount} </span>
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
              this.props.quiz.isSonCheckboxChecked
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
                value={this.props.quiz.responses.child_1_age}
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
              this.props.quiz.sonCount > 1
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
                value={this.props.quiz.responses.child_2_age}
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
              this.props.quiz.sonCount > 2
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
                value={this.props.quiz.responses.child_3_age}
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
              this.props.quiz.sonCount > 3
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
                value={this.props.quiz.responses.child_4_age}
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
                      this.props.quiz.isDaughterCheckboxChecked
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
                    <span className="count">
                      {" "}
                      {this.props.quiz.daughterCount}{" "}
                    </span>
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
              this.props.quiz.isDaughterCheckboxChecked
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
                value={this.props.quiz.responses.child_5_age}
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
              this.props.quiz.daughterCount > 1
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
                value={this.props.quiz.responses.child_6_age}
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
              this.props.quiz.daughterCount > 2
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
                value={this.props.quiz.responses.child_7_age}
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
              this.props.quiz.daughterCount > 3
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
                value={this.props.quiz.responses.child_8_age}
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
              value={this.props.quiz.responses.father_age}
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
              value={this.props.quiz.responses.mother_age}
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
              value={this.props.quiz.responses.grand_father_age}
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
              value={this.props.quiz.responses.grand_mother_age}
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
              value={this.props.quiz.responses.father_in_law_age}
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
              value={this.props.quiz.responses.mother_in_law_age}
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

  plansToCompareOnMobile(firsIndex, secondIndex) {}

  plansToCompareOnDesktop(firsIndex, secondIndex, thirdIndex) {}

  handleCheckedPlanToCompareOnMobile(index) {
    console.log("index", index);

    let value = index.value;
    let checked = index.checked;
    //this.checkChecked(index);

    //  console.log(checked);

    let indexes: string[] = [];
    let checked_values: boolean[] = [];

    indexes = this.state.compare_plans_mobile_indexes;
    checked_values = this.state.checked_plans_list;

    let i: number = indexes.indexOf(value);
    let j: number = checked_values.indexOf(checked);

    // console.log("i", i, "j", j);

    if (i == -1 && indexes.length == 1) {
      //console.log("yes babe");
      this.toggleShowCompareCheckbox();
    }

    if (
      indexes.length < this.state.limit_plans_to_compare_on_mobile &&
      i == -1 &&
      checked_values.length < this.state.limit_plans_to_compare_on_mobile
    ) {
      //  console.log("here");
      //this.toggleShowCompareWidget();
      this.setState({
        compare_plans_mobile_indexes: [
          ...this.state.compare_plans_mobile_indexes,
          value,
        ],

        checked_plans_list: [...this.state.checked_plans_list, checked],
      });
    } else if (i > -1) {
      // console.log("remove", "value", value, "i", i);

      // if (value == 0 && i == 0) {
      //   this.removePlanFromCheckedIndexes("1");
      // } else if (value == 1 && i == 1) {
      //   this.removePlanFromCheckedIndexes("0");
      // }
      //

      this.setState({
        compare_plans_mobile_indexes: this.state.compare_plans_mobile_indexes.splice(
          i,
          1
        ),

        checked_plans_list: this.state.checked_plans_list.splice(j, 1),
      });
    }
    if (indexes.length == this.state.limit_plans_to_compare_on_mobile) {
      this.toggleShowCompareCheckbox();
      //this.state.compare_plans_mobile_indexes.filter((plan) => index !== plan);
    }
    // }
  }

  handleCheckedPlanToCompareOnDesktop(index) {
    // console.log("index", index);

    let value = index.value;
    let checked = index.checked;
    //this.checkChecked(index);

    //  console.log(checked);

    let indexes: string[] = [];
    let checked_values: boolean[] = [];

    indexes = this.state.compare_plans_desktop_indexes;
    checked_values = this.state.checked_plans_list;

    let i: number = indexes.indexOf(value);
    let j: number = checked_values.indexOf(checked);

    console.log("i", i, "j", j, "indexes.length", indexes.length);

    if (i == -1 && indexes.length == 2) {
      // console.log("yes babe");
      this.toggleShowDesktopCompareCheckbox();
    }

    if (i > -1) {
      this.removePlanFromDesktopCheckedIndexes(value);
    }

    if (
      indexes.length < this.state.limit_plans_to_compare_on_desktop &&
      i == -1 &&
      checked_values.length < this.state.limit_plans_to_compare_on_desktop
    ) {
      //  console.log("here");
      //this.toggleShowCompareWidget();
      this.setState({
        compare_plans_desktop_indexes: [
          ...this.state.compare_plans_desktop_indexes,
          value,
        ],

        checked_plans_list: [...this.state.checked_plans_list, checked],
      });
    } else if (i > -1 && j > -1) {
      // console.log(
      //   "there",
      //   this.state.compare_plans_mobile_indexes.splice(i, 1)
      // );
      this.setState({
        compare_plans_desktop_indexes: this.state.compare_plans_desktop_indexes.splice(
          i,
          1
        ),

        checked_plans_list: this.state.checked_plans_list.splice(j, 1),
      });
    }
    if (indexes.length == this.state.limit_plans_to_compare_on_desktop) {
      this.toggleShowDesktopCompareCheckbox();
      //this.state.compare_plans_mobile_indexes.filter((plan) => index !== plan);
    }

    // }
  }

  setRecPlansIndexesToCompare = () => {
    this.props.dispatch({
      type: "SET_PLANS_TO_COMPARE_ON_DESKTOP",
      data: this.state.compare_plans_desktop_indexes,
    });

    this.props.dispatch({
      type: "SET_PLANS_TO_COMPARE_ON_MOBILE",
      data: this.state.compare_plans_mobile_indexes,
    });

    this.props.dispatch({
      type: "SET_CHECKED_PLANS",
      data: this.state.checked_plans_list,
    });
  };

  removePlanFromCheckedIndexes(index) {
    console.log("index", index);
    // console.log("let's see");

    if (index == undefined) {
      this.setState({
        compare_plans_mobile_indexes: [],
        checked_plans_list: [],
      });
    }

    /* let value = index.value;*/
    let checked = this.state.checked_plans_list[index];
    //this.checkChecked(index);

    let indexes: string[] = [];
    let checked_values: boolean[] = [];

    indexes = this.state.compare_plans_mobile_indexes;
    checked_values = this.state.checked_plans_list;

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
      //   this.state.compare_plans_mobile_indexes.splice(i, 1)
      // );
      this.setState({
        compare_plans_mobile_indexes: this.state.compare_plans_mobile_indexes.splice(
          i,
          1
        ),
        checked_plans_list: this.state.checked_plans_list.splice(j, 1),
      });
    }
    if (indexes.length < this.state.limit_plans_to_compare_on_mobile) {
      this.toggleShowCompareCheckbox();
      //this.state.compare_plans_mobile_indexes.filter((plan) => index !== plan);
    }
  }

  removePlanFromDesktopCheckedIndexes(index) {
    console.log("index", index);
    // console.log("let's see");

    if (index == undefined) {
      this.setState({
        compare_plans_desktop_indexes: [],
        checked_plans_list: [],
      });
    }

    /* let value = index.value;*/
    let checked = this.state.checked_plans_list[index];
    //this.checkChecked(index);

    let indexes: string[] = [];
    let checked_values: boolean[] = [];

    indexes = this.state.compare_plans_desktop_indexes;
    checked_values = this.state.checked_plans_list;

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

      let x = this.state.compare_plans_desktop_indexes;
      x.splice(i, 1);

      let y = this.state.checked_plans_list;
      y.splice(j, 1);

      this.setState({
        compare_plans_desktop_indexes: x,
        checked_plans_list: y,
      });
    }
    if (indexes.length < this.state.limit_plans_to_compare_on_desktop) {
      this.toggleShowCompareCheckbox();
      //this.state.compare_plans_desktop_indexes.filter((plan) => index !== plan);
    }
  }

  checkChecked(et) {
    let checked = et.checked;
    console.log(checked);
  }

  toggleShowCompareCheckbox = () => {
    //console.log("toggleShowCompareCheckbox");
    this.setState({
      show_compare_checkbox: !this.state.show_compare_checkbox,
    });
  };

  toggleShowDesktopCompareCheckbox = () => {
    //console.log("toggleShowCompareCheckbox");
    this.setState({
      show_compare_checkbox: !this.state.show_compare_checkbox,
    });
  };

  toggleShowCompareWidget = () => {
    this.setState({
      show_compare_widget: !this.state.show_compare_widget,
    });
  };

  showDesktopCompareWidget = () => {
    console.log("show");
    this.setState({
      //show_desktop_compare_widget: !this.state.show_desktop_compare_widget,
      show_desktop_compare_widget: true,
    });
  };

  hideDesktopCompareWidget = () => {
    console.log("hide");
    this.setState({
      //show_desktop_compare_widget: !this.state.show_desktop_compare_widget,
      show_desktop_compare_widget: false,
    });
  };

  numberwithCommas = (value) => {
    return value ? value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : "";
  };

  render() {
    console.log("this.props", this.props);
    const recPlansArr = this.props.recommended_plans;
    // console.log("recPlansArr", recPlansArr);

    console.log("this.state", this.state);

    console.log("this.state.checked_plans_list", this.state.checked_plans_list);
    // console.log(
    //   "this.state.compare_plans_mobile_indexes",
    //   this.state.compare_plans_mobile_indexes
    // );
    console.log(
      "this.state.compare_plans_desktop_indexes",
      this.state.compare_plans_desktop_indexes
    );

    return (
      <div
        className="recommended-plans"
        //  id={styles.wrapper}
      >
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

              <div className="rec_info">
                <p className="plans-num">
                  {recPlansArr ? recPlansArr.length : "Fetching "} Plans for
                </p>
                <h6 className="plan-type">
                  {this.props.quiz.responses.type == "single"
                    ? "Self"
                    : "Family"}
                </h6>
              </div>
            </div>
            {/* <div className="plan-select-div">
              <select className="plan-select">
                <option>Base Plans</option>
                <option>Base Plans</option>
              </select>
            </div> */}
          </div>

          <div className="row compare-page-body">
            <div className="col-md-8 wrap">
              {this.props.fetching_plans == true || recPlansArr.length == 0 ? (
                <Col xs={24} className={styles.example}>
                  <Spin />
                </Col>
              ) : (
                //  this.props.plans.length < 1 ? (
                //   <Col xs={24} className={styles.example}>
                //     <Empty />
                //   </Col>
                // ) :
                <div>
                  {recPlansArr ? (
                    recPlansArr.map((rec_plan, i) => {
                      return (
                        <div className="quotes_mobile_row">
                          <div
                            className={
                              this.state.show_compare_checkbox
                                ? "quotes_mobile_compare"
                                : "quotes_mobile_compare hide"
                            }
                          >
                            <div className="checkbox_container_mobile">
                              <label>
                                <input
                                  type="checkbox"
                                  className="checkbox_quotes"
                                  value={i}
                                  checked={
                                    this.state
                                      .compare_plans_mobile_indexes[0] == i ||
                                    this.state
                                      .compare_plans_mobile_indexes[1] == i
                                      ? true
                                      : false
                                  }
                                  // disabled={
                                  //   this.state.compare_plans_mobile_indexes
                                  //     .length ==
                                  //   this.state.limit_plans_to_compare_on_mobile
                                  // }
                                  //defaultChecked={false}
                                  onChange={(e) => {
                                    this.handleCheckedPlanToCompareOnMobile(
                                      // e.target.value
                                      e.target
                                    );
                                  }}
                                />
                              </label>
                            </div>
                          </div>

                          <div
                            className={
                              this.state.show_compare_checkbox
                                ? "single-plan"
                                : "single-plan  sp-without-compare-checkbox"
                            }
                          >
                            <div className="compare-first-row row">
                              <div className="col-md-2">
                                <img
                                  className="provider-logo"
                                  src={rec_plan.hmo_id.logo}
                                  //"https://www.hygeiahmo.com/wp-content/uploads/2018/11/Hygeia-Final-No-Left-Padding@1x.svg"
                                />
                              </div>
                              <div className="col-md-8 middle-col">
                                <h6>{rec_plan.name}</h6>
                                <a
                                  href="#"
                                  onClick={() => {
                                    this.toggleFeaturesModal();
                                    this.getClickedPlan(i);
                                  }}
                                >
                                  View Features
                                  <FontAwesomeIcon
                                    className="chev"
                                    icon={faChevronRight}
                                  />
                                </a>
                              </div>
                              <div className="col-md-2">
                                <img
                                  className="shortlist-yellow"
                                  src={shortlist}
                                />
                              </div>
                            </div>
                            <div className="compare-second-row row">
                              <div className="col-md-2">
                                <p>Covers</p>
                                <h6>
                                  {this.props.quiz.responses.num_of_people}
                                </h6>
                              </div>
                              <div className="col-md-4 middle-col">
                                <p>Hospitals</p>
                                <a
                                  onClick={this.showCashlessHospitals}
                                  href="#"
                                >
                                  <h6>
                                    {rec_plan.hmo_id["provider_id"]
                                      ? JSON.parse(
                                          rec_plan.hmo_id["provider_id"]
                                        ).length
                                      : 0}
                                    <FontAwesomeIcon
                                      className="chev"
                                      icon={faChevronRight}
                                    />
                                  </h6>
                                </a>
                              </div>
                              <div className="col-md-6 red-btn">
                                <button
                                  className="btn-plan"
                                  onClick={() => {
                                    this.goToDetails();
                                    this.getClickedPlan(i);
                                  }}
                                >
                                  ₦
                                  {this.props.quiz.responses.type == "single"
                                    ? this.numberwithCommas(
                                        rec_plan.individual_annual_price
                                      )
                                    : this.numberwithCommas(
                                        rec_plan.family_annual_price
                                      )}{" "}
                                  annually
                                  {/* ₦5k/month */}
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <div className="single-plan">
                      <Empty />
                    </div>
                  )}
                </div>
              )}
            </div>
            {/* <div className="col-md-4">
              <img className="shortlist-yellow" src={shortlist} />
            </div> */}
          </div>
          <div className="bottom-menu row">
            <div className="col-md-4" onClick={this.toggleShowCompareWidget}>
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

          <div
            className={
              this.state.show_compare_widget
                ? "quotes_compare_container is-hidden-desktop-custom"
                : "hide"
            }
          >
            <div className="div_compare_plans_heading">
              <span className="compare_plans_heading">Compare Plans</span>
              <span
                className="compare_remove"
                onClick={this.toggleShowCompareWidget}
              >
                Close
              </span>
            </div>
            <div className="quotes_compare_row">
              <div className="quotes_compare_div">
                <div className="quotes_compare_plan_name">
                  <div className="quotes_compare_plan_main">
                    <div className="quotes_compare_image">
                      {this.state.compare_plans_mobile_indexes[0] ? (
                        <img
                          src={
                            this.props.recommended_plans[
                              this.state.compare_plans_mobile_indexes[0]
                            ].hmo_id.logo
                          }
                          alt=""
                          width="48"
                          className="quotes_img_compare1"
                          onClick={this.toggleShowCompareCheckbox}
                        />
                      ) : (
                        <i className="quotes_img_compare1 others"></i>
                      )}
                    </div>
                    <div className="quotes_compare_plan_block">
                      <span
                        className={
                          this.state.compare_plans_mobile_indexes[0]
                            ? "quotes_compare_span_plan_name"
                            : "add-plan"
                        }
                        onClick={this.toggleShowCompareCheckbox}
                      >
                        {this.state.compare_plans_mobile_indexes[0]
                          ? this.props.recommended_plans[
                              this.state.compare_plans_mobile_indexes[0]
                            ].name
                          : "Add Plan"}
                      </span>
                      <div
                        className={
                          this.state.compare_plans_mobile_indexes[0]
                            ? "cover_compare"
                            : "hide"
                        }
                      >
                        {this.state.compare_plans_mobile_indexes[0]
                          ? this.props.quiz.responses.type == "single"
                            ? `₦${this.numberwithCommas(
                                this.props.recommended_plans[
                                  this.state.compare_plans_mobile_indexes[0]
                                ].individual_annual_price
                              )}`
                            : `₦${this.numberwithCommas(
                                this.props.recommended_plans[
                                  this.state.compare_plans_mobile_indexes[0]
                                ].family_annual_price
                              )}`
                          : ""}
                      </div>
                    </div>
                  </div>
                  <div
                    className="div_remove_compare"
                    onClick={() => {
                      //this.state.compare_plans_mobile_indexes.length == 2 ?

                      this.removePlanFromCheckedIndexes(
                        this.state.compare_plans_mobile_indexes[1]
                      ); //:
                    }}
                  >
                    <span className="span_cross">x</span>
                  </div>
                </div>
                <div className="quotes_compare_plan_name">
                  <div className="quotes_compare_plan_main">
                    <div className="quotes_compare_image">
                      {this.state.compare_plans_mobile_indexes[1] ? (
                        <img
                          src={
                            this.props.recommended_plans[
                              this.state.compare_plans_mobile_indexes[1]
                            ].hmo_id.logo
                          }
                          alt=""
                          width="48"
                          className="quotes_img_compare1"
                        />
                      ) : (
                        <i className="quotes_img_compare1 others"></i>
                      )}
                    </div>
                    <div className="quotes_compare_plan_block">
                      <span
                        className={
                          this.state.compare_plans_mobile_indexes[1]
                            ? "quotes_compare_span_plan_name"
                            : "add-plan"
                        }
                        onClick={this.toggleShowCompareCheckbox}
                      >
                        {this.state.compare_plans_mobile_indexes[1]
                          ? this.props.recommended_plans[
                              this.state.compare_plans_mobile_indexes[1]
                            ].name
                          : "Add Plan"}
                      </span>
                      <div
                        className={
                          this.state.compare_plans_mobile_indexes[1]
                            ? "cover_compare"
                            : "hide"
                        }
                      >
                        {this.state.compare_plans_mobile_indexes[1]
                          ? this.props.quiz.responses.type == "single"
                            ? this.numberwithCommas(
                                this.props.recommended_plans[
                                  this.state.compare_plans_mobile_indexes[1]
                                ].individual_annual_price
                              )
                            : this.numberwithCommas(
                                this.props.recommended_plans[
                                  this.state.compare_plans_mobile_indexes[1]
                                ].family_annual_price
                              )
                          : ""}
                      </div>
                    </div>
                  </div>
                  <div
                    className="div_remove_compare"
                    onClick={() => {
                      this.removePlanFromCheckedIndexes(
                        this.state.compare_plans_mobile_indexes[0]
                      );
                    }}
                  >
                    <span className="span_cross">x</span>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="compare_quotes_button disabled"
              id="CompareNow"
              // className="quotes_compare_button "
              onClick={this.goToComparison}
            >
              COMPARE NOW
            </div>
          </div>
        </div>
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
          <div className="quotes_toolbar is-hidden-mobile is-hidden-tablet-only-custom">
            <div className="quotes_toolbar_wrapper">
              <div className="insured_members_div">
                <span className="span_insured_heading">
                  Showing {recPlansArr ? recPlansArr.length : "Fetching "} plans
                  for{" "}
                  {this.props.quiz.responses.type == "single"
                    ? "Self"
                    : "Family"}
                  {" ("}
                  {this.props.quiz.responses.type == "single"
                    ? this.props.quiz.responses.individual_age
                    : ""}{" "}
                  {" years)"}
                </span>
              </div>

              <div className="group_members_div">
                <div
                  className="edit_profile_div_toolbar"
                  onClick={this.toggleOthersInput}
                >
                  <img
                    src="https://health.policybazaar.com/insurer-logo/quotes-logos/edit_profile.svg"
                    className="img_edit_profile"
                  />
                  <span className="edit_insured_member">Edit Members</span>
                </div>
                <div className="edit_profile_div_toolbar">
                  <div className="filter_mobile_quote_icon">
                    <img
                      src="https://health.policybazaar.com/insurer-logo/quotes-logos/bottom_shortlist.svg"
                      className="img_edit_profile"
                    />
                  </div>
                  <span className="edit_insured_member">Shortlist</span>
                </div>
              </div>
            </div>
          </div>

          <div className="quotes_filterBar is-hidden-mobile is-hidden-tablet-only-custom">
            <div className="quotes_sorting">
              <img
                alt="filter"
                className="img_filter"
                src="https://health.policybazaar.com/insurer-logo/quotes-logos/quotes_filter.svg"
              />
            </div>
            <div className="quotes_filter_insurer1">
              <span className="span_quotes_filter_insurer">Insurers</span>
              <div className="img_arrow"></div>
              <div className="insurer_popup1">
                <div className="insurer_popup_heading">
                  <span className="span_insurer_popup_heading">Insurers</span>
                </div>
                <div className="cover_div">
                  <div className="insurer_div">
                    <div className="insurer_checkbox_container">
                      <label className="insurer_checkbox_label">
                        <input type="checkbox" className="checkbox_quotes" />
                        <div className="supplier_icon Insta_Care_icon"> </div>
                        <div className="supplier_name">
                          <span className="span_supplier_name">InstaCare</span>
                        </div>
                      </label>
                    </div>
                  </div>
                  <div className="insurer_div">
                    <div className="insurer_checkbox_container">
                      <label className="insurer_checkbox_label">
                        <input type="checkbox" className="checkbox_quotes" />
                        <div className="supplier_icon Insta_Care_icon"> </div>
                        <div className="supplier_name">
                          <span className="span_supplier_name">InstaCare</span>
                        </div>
                      </label>
                    </div>
                  </div>
                </div>
                <div className="cover_buttons">
                  <div className="close_button">Close</div>
                  <div className="apply_button">Apply</div>
                </div>
              </div>
            </div>
          </div>
          <div className="main_quotes_div is-hidden-mobile is-hidden-tablet-only-custom container col-md-12 row">
            <div className="col-md-8 main_quotes_container">
              {this.props.fetching_plans == true || recPlansArr.length == 0 ? (
                <Col xs={24} className={styles.example}>
                  <Spin />
                </Col>
              ) : (
                <div>
                  {recPlansArr.map((rec_plan, i) => {
                    return (
                      <div className="quotes_stack_content_container is-hidden-mobile is-hidden-tablet-only-custom">
                        <div className="quotes_content_desktop is-hidden-mobile is-hidden-tablet-only-custom">
                          <div className="new_quotes_plan_container">
                            <div className="quotes_logo_container1">
                              <picture>
                                {/* <source
                                type="image/webp"
                                srcSet="https://www.hygeiahmo.com/wp-content/uploads/2018/11/Hygeia-Final-No-Left-Padding@1x.svg"
                              ></source>
                              <source
                                type="image/png"
                                srcSet="https://www.hygeiahmo.com/wp-content/uploads/2018/11/Hygeia-Final-No-Left-Padding@1x.svg"
                              ></source> */}
                                <img
                                  alt="HMO Logo"
                                  className="img_contain"
                                  // layout="fill"
                                  src={rec_plan.hmo_id.logo}

                                  //"https://www.hygeiahmo.com/wp-content/uploads/2018/11/Hygeia-Final-No-Left-Padding@1x.svg"
                                />
                              </picture>
                            </div>
                            <div className="features_container">
                              <span className="quotes_more_plans more">
                                <span>6 More Plans</span>
                              </span>
                            </div>
                          </div>
                          <div className="quotes_content_container is-hidden-mobile is-hidden-tablet-only-custom">
                            <div className="top_quotes_content">
                              <div className="planContent_container">
                                <span className="quotes_plan_name">
                                  {rec_plan.name}
                                  {/* HMO */}
                                </span>
                              </div>
                              <div className="cover_container">
                                <div className="div_cover">
                                  <span className="span_cover">Covers</span>

                                  <span className="span_cover_content">
                                    {this.props.quiz.responses.num_of_people}
                                  </span>
                                </div>
                                <div className="div_network">
                                  <span
                                    className="span_network"
                                    onClick={this.showCashlessHospitals}
                                  >
                                    Network Hospitals
                                  </span>
                                  <span
                                    className="span_network_content"
                                    onClick={this.showCashlessHospitals}
                                  >
                                    {rec_plan.hmo_id["provider_id"]
                                      ? JSON.parse(
                                          rec_plan.hmo_id["provider_id"]
                                        ).length
                                      : 0}
                                    {/* {rec_plan.hmo_id.provider_id.length} */}
                                  </span>
                                </div>
                              </div>
                              <div className="premium_container">
                                <div
                                  className="premium_button"
                                  onClick={() => {
                                    this.goToDetails();
                                    this.getClickedPlan(i);
                                  }}
                                >
                                  ₦
                                  {this.props.quiz.responses.type == "single"
                                    ? this.numberwithCommas(
                                        rec_plan.individual_annual_price
                                      )
                                    : this.numberwithCommas(
                                        rec_plan.family_annual_price
                                      )}{" "}
                                  annually
                                </div>
                                <span className="annually_premium">
                                  ₦
                                  {this.props.quiz.responses.type == "single"
                                    ? this.numberwithCommas(
                                        rec_plan.individual_monthly_price
                                      )
                                    : this.numberwithCommas(
                                        rec_plan.family_annual_price
                                      )}
                                  /month
                                </span>
                              </div>
                              <div className="shortlist_container">
                                <div className="Path_shortlist coachMark">
                                  <img
                                    className="shortlist_icon"
                                    src="https://health.policybazaar.com/insurer-logo/quotes-logos/shortlist.svg"
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="bottom_quotes_content">
                              <div className="check_features_cont">
                                <div className="checkbox_container">
                                  <label className="label_checkbox_plan">
                                    <input
                                      type="checkbox"
                                      className="checkbox_quotes"
                                      value={i}
                                      checked={
                                        this.state
                                          .compare_plans_desktop_indexes[0] ==
                                          i ||
                                        this.state
                                          .compare_plans_desktop_indexes[1] ==
                                          i ||
                                        this.state
                                          .compare_plans_desktop_indexes[2] == i
                                          ? true
                                          : false
                                      }
                                      onChange={(e) => {
                                        this.handleCheckedPlanToCompareOnDesktop(
                                          e.target
                                        );
                                        this.showDesktopCompareWidget();
                                      }}
                                    />
                                    Add to Compare
                                  </label>
                                  <div className="request-loader"></div>
                                </div>
                                <div className="div_features">
                                  <span
                                    className="quotes_features"
                                    onClick={() => {
                                      this.toggleFeaturesModal();
                                      this.getClickedPlan(i);
                                    }}
                                  >
                                    View Features
                                  </span>
                                </div>
                              </div>
                              <div className="div_cover_usp">
                                <span className="max_condition1">
                                  Best offer
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            <div className="col-md-4 chat-bot">
              <div className="bot-title">
                <h3>Health Insurance Assistant</h3>
              </div>
              <div className="bot-body">
                <div className="card">
                  <p>
                    What is most important to you, while choosing your perfect
                    health insurance plan?
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div
            className={
              this.state.show_desktop_compare_widget
                ? "quotes_compare_container is-hidden-mobile is-hidden-tablet-only-custom"
                : "hide"
            }
          >
            <div className="quotes_compare_container_wrapper">
              <div className="quotes_compare_div">
                {this.state.compare_plans_desktop_indexes[0] ? (
                  <div className="quotes_compare_plan_name">
                    <div className="quotes_compare_image">
                      <img
                        src={
                          this.props.recommended_plans[
                            this.state.compare_plans_desktop_indexes[0]
                          ].hmo_id.logo
                        }
                        alt="Care Health"
                        width="48"
                        className="quotes_img_compare1"
                      />
                    </div>
                    <div className="quotes_compare_span_plan_name">
                      <span className="compare_plan_name2">
                        {
                          this.props.recommended_plans[
                            this.state.compare_plans_desktop_indexes[0]
                          ].name
                        }
                      </span>
                      <div className="cover_compare">
                        <span>
                          {this.props.quiz.responses.type == "single"
                            ? `₦${this.numberwithCommas(
                                this.props.recommended_plans[
                                  this.state.compare_plans_desktop_indexes[0]
                                ].individual_annual_price
                              )}`
                            : `₦${this.numberwithCommas(
                                this.props.recommended_plans[
                                  this.state.compare_plans_desktop_indexes[0]
                                ].family_annual_price
                              )}`}
                        </span>
                      </div>
                    </div>
                    <div
                      className="div_remove_compare"
                      onClick={() => {
                        this.removePlanFromDesktopCheckedIndexes(
                          this.state.compare_plans_desktop_indexes[0]
                        );
                      }}
                    >
                      <span className="span_cross">x</span>
                    </div>
                  </div>
                ) : (
                  <div className="quotes_compare_plan_add">
                    <span className="quotes_compare_span_add_plan">
                      Add a Plan
                    </span>
                  </div>
                )}

                {this.state.compare_plans_desktop_indexes[1] ? (
                  <div className="quotes_compare_plan_name">
                    <div className="quotes_compare_image">
                      <img
                        src={
                          this.props.recommended_plans[
                            this.state.compare_plans_desktop_indexes[1]
                          ].hmo_id.logo
                        }
                        alt="Care Health"
                        width="48"
                        className="quotes_img_compare1"
                      />
                    </div>
                    <div className="quotes_compare_span_plan_name">
                      <span className="compare_plan_name2">
                        {
                          this.props.recommended_plans[
                            this.state.compare_plans_desktop_indexes[1]
                          ].name
                        }
                      </span>
                      <div className="cover_compare">
                        <span>
                          {this.props.quiz.responses.type == "single"
                            ? `₦${this.numberwithCommas(
                                this.props.recommended_plans[
                                  this.state.compare_plans_desktop_indexes[1]
                                ].individual_annual_price
                              )}`
                            : `₦${this.numberwithCommas(
                                this.props.recommended_plans[
                                  this.state.compare_plans_desktop_indexes[1]
                                ].family_annual_price
                              )}`}
                        </span>
                      </div>
                    </div>
                    <div
                      className="div_remove_compare"
                      onClick={() => {
                        this.removePlanFromDesktopCheckedIndexes(
                          this.state.compare_plans_desktop_indexes[1]
                        );
                      }}
                    >
                      <span className="span_cross">x</span>
                    </div>
                  </div>
                ) : (
                  <div className="quotes_compare_plan_add">
                    <span className="quotes_compare_span_add_plan">
                      Add a Plan
                    </span>
                  </div>
                )}

                {this.state.compare_plans_desktop_indexes[2] ? (
                  <div className="quotes_compare_plan_name">
                    <div className="quotes_compare_image">
                      <img
                        src={
                          this.props.recommended_plans[
                            this.state.compare_plans_desktop_indexes[2]
                          ].hmo_id.logo
                        }
                        alt="Care Health"
                        width="48"
                        className="quotes_img_compare1"
                      />
                    </div>
                    <div className="quotes_compare_span_plan_name">
                      <span className="compare_plan_name2">
                        {
                          this.props.recommended_plans[
                            this.state.compare_plans_desktop_indexes[2]
                          ].name
                        }
                      </span>
                      <div className="cover_compare">
                        <span>
                          {this.props.quiz.responses.type == "single"
                            ? `₦${this.numberwithCommas(
                                this.props.recommended_plans[
                                  this.state.compare_plans_desktop_indexes[2]
                                ].individual_annual_price
                              )}`
                            : `₦${this.numberwithCommas(
                                this.props.recommended_plans[
                                  this.state.compare_plans_desktop_indexes[2]
                                ].family_annual_price
                              )}`}
                        </span>
                      </div>
                    </div>
                    <div
                      className="div_remove_compare"
                      onClick={() => {
                        this.removePlanFromDesktopCheckedIndexes(
                          this.state.compare_plans_desktop_indexes[2]
                        );
                      }}
                    >
                      <span className="span_cross">x</span>
                    </div>
                  </div>
                ) : (
                  <div className="quotes_compare_plan_add">
                    <span className="quotes_compare_span_add_plan">
                      Add a Plan
                    </span>
                  </div>
                )}
              </div>
              <div className="quotes_compare_buttons_div">
                <div
                  className="quotes_compare_button disabled"
                  onClick={this.goToComparison}
                >
                  Compare Now
                </div>
                <div
                  className="quotes_compare_remove_button"
                  onClick={this.hideDesktopCompareWidget}
                >
                  Close
                </div>
              </div>
            </div>
          </div>
        </div>

        <Modal
          dialogClassName="custom-dialog"
          className="features-modal"
          show={this.props.quiz.isFeaturesModalOpen}
          onHide={this.toggleFeaturesModal}
        >
          <Modal.Header
            className="features-modal-header"
            translate="true"
            closeButton
          >
            <div className="">
              <div className="features-header row">
                <div className="col-md-3">
                  <div className="box-logo">
                    <img
                      src={
                        this.props.clicked_plan.hmo_id
                          ? this.props.clicked_plan.hmo_id.logo
                          : ""
                      }
                    />
                  </div>
                </div>
                <div className="col-md-9">
                  <h6>{this.props.clicked_plan.name}</h6>
                  <div className="row features-header-inner">
                    <div className="col-md-3">
                      <p className="greyed-text">Covers</p>
                      <h6>{this.props.quiz.responses.num_of_people}</h6>
                    </div>
                    <div className="col-md-7">
                      <p className="greyed-text">Premium</p>
                      <h6>
                        ₦
                        {this.props.quiz.responses.type == "single"
                          ? this.numberwithCommas(
                              this.props.clicked_plan.individual_annual_price
                            )
                          : this.numberwithCommas(
                              this.props.clicked_plan.family_annual_price
                            )}
                        / year
                      </h6>
                      {this.props.clicked_plan.individual_monthly_price ? (
                        <p className="greyed-text">
                          ₦
                          {this.numberwithCommas(
                            this.props.clicked_plan.individual_monthly_price
                          )}{" "}
                          paid monthly
                        </p>
                      ) : (
                        ""
                      )}
                    </div>
                    <div className="col-md-2 shortlist-div">
                      <img className="shortlist-yellow" src={shortlist} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Modal.Header>
          <Modal.Body className="features-modal-body">
            {/* <Row gutter={8}>
              <Col xs={24} md={24}>
                <Tabs defaultActiveKey="1" onChange={this.toggleView}>
                  <TabPane tab="Features" key="1">
                    <Row gutter={8}></Row>
                  </TabPane>
                  <TabPane tab="Cashless Hospitals" key="2"></TabPane>
                  <TabPane tab="Providers" key="3">
                    <Table
                      dataSource={this.dataSourceA}
                      columns={this.columns}
                    />
                  </TabPane>
                </Tabs>
              </Col>

              <Col xs={24} md={16}>
                {/* {notGettingProviders ? (
                  <Row gutter={8}></Row>
                ) : (
                  <Table dataSource={this.dataSourceA} columns={this.columns} />
                )} */}
            {/*</Col>
              <Col xs={24} md={8}></Col>
            </Row> */}
            <div className="features-modal">
              <div className="feature_card">
                <div className="tabs tabs-feature" id="tabs-feature">
                  <ul>
                    <li
                      className={
                        this.props.quiz.tab_opened == "highlights"
                          ? "features_tab is-active"
                          : "features_tab"
                      }
                      id="li_plansHigh"
                    >
                      <a onClick={this.handleTabChange} id="highlights">
                        Highlights
                      </a>
                    </li>
                    <li
                      className={
                        this.props.quiz.tab_opened == "features"
                          ? "features_tab is-active"
                          : "features_tab"
                      }
                      id="li_plansFeat"
                    >
                      <a onClick={this.handleTabChange} id="features">
                        Features
                      </a>
                    </li>
                    <li
                      className={
                        this.props.quiz.tab_opened == "claim"
                          ? "features_tab is-active"
                          : "features_tab"
                      }
                      id="li_plansClaim"
                    >
                      <a onClick={this.handleTabChange} id="claim">
                        Claim Process
                      </a>
                    </li>
                    <li
                      className={
                        this.props.quiz.tab_opened == "hospitals"
                          ? "features_tab is-active"
                          : "features_tab"
                      }
                      id="li_plansHosp"
                    >
                      <a onClick={this.handleTabChange} id="hospitals">
                        Network Hospitals
                      </a>
                    </li>
                  </ul>
                </div>
                <div
                  className={
                    this.props.quiz.tab_opened == "claim"
                      ? "features_popup_table1 claim_process"
                      : this.props.quiz.tab_opened == "hospitals"
                      ? "features_popup_table1 hospitalSearchWrapper"
                      : "features_popup_table1"
                  }
                >
                  {this.props.quiz.tab_opened == "highlights" ? (
                    <div className="highlights-content">
                      <div
                        className="div_features_covered_main"
                        //onClick={this.toggleFeaturePopUp}
                      >
                        <div className="features_icons">
                          <div className="feature-icon1">
                            <img
                              alt=""
                              className=""
                              src="https://health.policybazaar.com/insurer-logo/quotes-logos/feature5Star44.png"
                            />
                          </div>
                        </div>
                        <div className="div_features_covered_border">
                          <h2 className="span_feature_popup_heading">
                            Out-patient Limit: ₦
                            {this.numberwithCommas(
                              this.props.clicked_plan.outpatient_limit
                            )}
                          </h2>
                          {/* <FontAwesomeIcon
                          className="chev"
                          icon={faChevronRight}
                        /> */}
                        </div>
                      </div>
                      <div
                        className="div_features_covered_main"
                        //onClick={this.toggleFeaturePopUp}
                      >
                        <div className="features_icons">
                          <div className="feature-icon1">
                            <img
                              alt=""
                              className=""
                              src="https://health.policybazaar.com/insurer-logo/quotes-logos/feature5Star44.png"
                            />
                          </div>
                        </div>
                        <div className="div_features_covered_border">
                          <h2 className="span_feature_popup_heading">
                            In-patient Limit: ₦
                            {this.numberwithCommas(
                              this.props.clicked_plan.inpatient_limit
                            )}
                          </h2>
                          {/* <FontAwesomeIcon
                          className="chev"
                          icon={faChevronRight}
                        /> */}
                        </div>
                      </div>
                      <div className="div_features_covered_main">
                        <div className="features_icons">
                          <div className="feature-icon1">
                            <img
                              alt=""
                              className=""
                              src="https://health.policybazaar.com/insurer-logo/quotes-logos/feature5Star44.png"
                            />
                          </div>
                        </div>
                        <div className="div_features_covered_border">
                          <h2 className="span_feature_popup_heading">
                            Cover Region:{" "}
                            {this.props.clicked_plan.cover_region_id
                              ? this.props.clicked_plan.cover_region_id.name
                              : ""}
                          </h2>
                          {/* <FontAwesomeIcon
                          className="chev"
                          icon={faChevronRight}
                        /> */}
                        </div>
                      </div>
                    </div>
                  ) : this.props.quiz.tab_opened == "features" ? (
                    <div className="features-content">
                      <p className="coveredHead">What's covered</p>
                      <div className="">
                        {this.props.clicked_plan.service_id
                          ? this.props.clicked_plan.service_id.map(
                              (service) => {
                                return (
                                  <div className="div_features_covered_main">
                                    <div className="div_features_covered_inside">
                                      <div className="features_icons">
                                        <div className="feature-icon1">
                                          <img
                                            alt="feature"
                                            className="feature_icon_img"
                                            src="https://health.policybazaar.com/insurer-logo/quotes-logos/feature5.svg"
                                          />
                                        </div>
                                      </div>
                                      <div className="div_features_covered_border">
                                        <h2 className="span_feature_popup_heading">
                                          {service}
                                        </h2>
                                        {/* <span className="span_feature_popup_sub_heading">
                            Single Private A/C Room
                          </span> */}
                                      </div>
                                    </div>
                                  </div>
                                );
                              }
                            )
                          : ""}
                      </div>
                    </div>
                  ) : this.props.quiz.tab_opened == "claim" ? (
                    <div className="claim-content">
                      <h3>HMO directly pays network hospital</h3>
                      <div className="claim_process_text">
                        {/* <h4>Inform Hygeia HMO</h4> */}
                        <ul>
                          <li></li>
                          <li>
                            The Provider may ask for:
                            <ul>
                              <li>Name of Insured</li>
                              {/* <li>Name of Insured</li>
                              <li>Name of Insured</li>
                              <li>Name of Insured</li>
                              <li>Name of Insured</li> */}
                            </ul>
                          </li>
                        </ul>
                      </div>
                    </div>
                  ) : (
                    <div className="cashless-hosp-content">
                      <div className="features_search_hosp">
                        <input
                          type="text"
                          placeholder="Search Hospitals"
                          id="input_hospital"
                          // disabled
                        />
                        <p className="searchIcon"></p>
                      </div>
                      <div className="features_hospital_catHead">
                        Top Hospitals
                      </div>
                      <ul className="features_hosp_list">
                        {this.props.clicked_plan.hmo_id.provider_id
                          ? JSON.parse(
                              this.props.clicked_plan.hmo_id.provider_id
                            ).map((provider) => {
                              return <li>{provider}</li>;
                            })
                          : ""}
                      </ul>
                      {/* <div className="features_hospital_catHead">
                        Other Hospitals
                      </div>
                      <ul className="features_hosp_list">
                        <li>Kupa Medical Centre</li>
                        <li>Kupa Medical Centre</li>
                        <li>Kupa Medical Centre</li>
                        <li>Kupa Medical Centre</li>
                        <li>Kupa Medical Centre</li>
                      </ul> */}
                    </div>
                  )}
                </div>
                <div className="bottom-menu details-bottom-menu row">
                  <div className="col-md-4">
                    <p>Total Premium</p>
                    <p>
                      ₦{" "}
                      {this.props.quiz.responses.type == "single"
                        ? this.numberwithCommas(
                            this.props.clicked_plan.individual_annual_price
                          )
                        : this.numberwithCommas(
                            this.props.clicked_plan.family_annual_price
                          )}
                    </p>
                  </div>
                  <div className="col-md-8">
                    <button className="btn btn-danger checkout">
                      PROCEED TO CHECKOUT
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </Modal.Body>
          <div className="claim_popup_main">
            <div className="claim_popup_black"></div>
            <Modal
              dialogClassName="custom-dialog"
              className="claim_popup_white"
              show={this.props.quiz.isFeaturePopUpOpen}
              onHide={this.toggleFeaturePopUp}
            >
              <Modal.Header
                className="div_claim_popup_heading"
                translate="true"
                closeButton
              >
                <span className="claim_popup_heading">Value for money</span>
              </Modal.Header>
              <Modal.Body className="">
                <div className="div_feature_explain">
                  <span>
                    You get 1 year health cover at a very affordable price. No
                    catch and complete peace of mind.
                  </span>
                </div>
                <div className="div_feature_what">
                  <p>Why it is Important</p>
                  <span>
                    Opting for 1 year cover means you are insured against all
                    possible illnesses, be it cancer, heart problems or an
                    accident. This guarantees complete peace of ming at a very
                    reasonable price.
                  </span>
                </div>
              </Modal.Body>
            </Modal>
          </div>
        </Modal>

        <Modal
          dialogClassName="custom-dialog"
          className="right edit-members-popup"
          show={this.props.quiz.isOthersInputOpen}
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
        <AppFooter />
      </div>
    );
  }
}

/*export default Compare;*/
const mapProps = (state: any) => {
  return {
    // ...state.quiz.quiz,
    // ...state.quiz.compare,
    ...state.quiz,
  };
};

export default connect(mapProps)(Plans);
