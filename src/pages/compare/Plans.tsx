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

const { Title } = Typography;
const { Panel } = Collapse;
const { Meta } = Card;
const { TabPane } = Tabs;
let responses: any;
const API_URL = "https://dev-hmo-compare-api.herokuapp.com";
interface PlansProps {
  [x: string]: any;
  dispatch(args: any): any;
  isFeaturesModalOpen: boolean;
  email: string;
  amount: number;
  notgettingproviders: boolean;
  buyingPlan: boolean;
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
    this.handleTabChange = this.handleTabChange.bind(this);
    this.toggleFeaturePopUp = this.toggleFeaturePopUp.bind(this);
    this.showCashlessHospitals = this.showCashlessHospitals.bind(this);
  }
  state = {
    toggleBar: false,
    searchText: "",
    open: false,
  };

  setSelectedK: any;
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
  };

  goToDetails(item: any) {
    this.props.history.push({ pathname: "/details" });
  }

  toggleFeaturesModal = () => {
    this.props.dispatch({
      type: actions.TOGGLE_FEATURES_MODAL,
      data: {
        key: "isFeaturesModalOpen",
        value: !this.props.isFeaturesModalOpen,
      },
    });
    console.log(
      "this.props.isFeaturesModalOpen",
      this.props.isFeaturesModalOpen
    );
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
        value: !this.props.isFeaturePopUpOpen,
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

  render() {
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
                    <a href="#" onClick={this.toggleFeaturesModal}>
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
                    <a onClick={this.showCashlessHospitals} href="#">
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
                    <a href="#" onClick={this.toggleFeaturesModal}>
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
                    <a onClick={this.showCashlessHospitals} href="#">
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
                    <a href="#" onClick={this.toggleFeaturesModal}>
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
                    <a onClick={this.showCashlessHospitals} href="#">
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
                    <a href="#" onClick={this.toggleFeaturesModal}>
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
                    <a onClick={this.showCashlessHospitals} href="#">
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
                    <a href="#" onClick={this.toggleFeaturesModal}>
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
                    <a onClick={this.showCashlessHospitals} href="#">
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
                    <a href="#" onClick={this.toggleFeaturesModal}>
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
                    <a onClick={this.showCashlessHospitals} href="#">
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
                  Showing 20 plans for self (24 Yrs)
                </span>
              </div>

              <div className="group_members_div">
                <div className="edit_profile_div_toolbar">
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
          <div className="main_quotes_div is-hidden-mobile is-hidden-tablet-only-custom">
            <div className="main_quotes_container">
              <div className="quotes_stack_content_container is-hidden-mobile is-hidden-tablet-only-custom">
                <div className="quotes_content_desktop is-hidden-mobile is-hidden-tablet-only-custom">
                  <div className="new_quotes_plan_container">
                    <div className="quotes_logo_container1">
                      <picture>
                        <source
                          type="image/webp"
                          srcSet="https://www.hygeiahmo.com/wp-content/uploads/2018/11/Hygeia-Final-No-Left-Padding@1x.svg"
                        ></source>
                        <source
                          type="image/png"
                          srcSet="https://www.hygeiahmo.com/wp-content/uploads/2018/11/Hygeia-Final-No-Left-Padding@1x.svg"
                        ></source>
                        <img
                          alt="Star Health"
                          className="img_contain"
                          // layout="fill"
                          src="https://www.hygeiahmo.com/wp-content/uploads/2018/11/Hygeia-Final-No-Left-Padding@1x.svg"
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
                        <span className="quotes_plan_name">Hygeia HMO</span>
                      </div>
                      <div className="cover_container">
                        <div className="div_cover">
                          <span className="span_cover">Covers</span>

                          <span className="span_cover_content">5</span>
                        </div>
                        <div className="div_network">
                          <span
                            className="span_network"
                            onClick={this.showCashlessHospitals}
                          >
                            Cashless Hospitals
                          </span>
                          <span
                            className="span_network_content"
                            onClick={this.showCashlessHospitals}
                          >
                            300
                          </span>
                        </div>
                      </div>
                      <div className="premium_container">
                        <div
                          className="premium_button"
                          onClick={this.goToDetails}
                        >
                          ₦5k/month
                        </div>
                        <span className="annually_premium">40k annually</span>
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
                            />
                            Add to Compare
                          </label>
                          <div className="request-loader"></div>
                        </div>
                        <div className="div_features">
                          <span
                            className="quotes_features"
                            onClick={this.toggleFeaturesModal}
                          >
                            View Features
                          </span>
                        </div>
                      </div>
                      <div className="div_cover_usp">
                        <span className="max_condition1">Best offer</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="quotes_stack_content_container is-hidden-mobile is-hidden-tablet-only-custom">
                <div className="quotes_content_desktop is-hidden-mobile is-hidden-tablet-only-custom">
                  <div className="new_quotes_plan_container">
                    <div className="quotes_logo_container1">
                      <picture>
                        <source
                          type="image/webp"
                          srcSet="https://www.hygeiahmo.com/wp-content/uploads/2018/11/Hygeia-Final-No-Left-Padding@1x.svg"
                        ></source>
                        <source
                          type="image/png"
                          srcSet="https://www.hygeiahmo.com/wp-content/uploads/2018/11/Hygeia-Final-No-Left-Padding@1x.svg"
                        ></source>
                        <img
                          alt="Star Health"
                          className="img_contain"
                          // layout="fill"
                          src="https://www.hygeiahmo.com/wp-content/uploads/2018/11/Hygeia-Final-No-Left-Padding@1x.svg"
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
                        <span className="quotes_plan_name">Hygeia HMO</span>
                      </div>
                      <div className="cover_container">
                        <div className="div_cover">
                          <span className="span_cover">Covers</span>

                          <span className="span_cover_content">5</span>
                        </div>
                        <div className="div_network">
                          <span
                            className="span_network"
                            onClick={this.showCashlessHospitals}
                          >
                            Cashless Hospitals
                          </span>
                          <span
                            className="span_network_content"
                            onClick={this.showCashlessHospitals}
                          >
                            300
                          </span>
                        </div>
                      </div>
                      <div className="premium_container">
                        <div
                          className="premium_button"
                          onClick={this.goToDetails}
                        >
                          ₦5k/month
                        </div>
                        <span className="annually_premium">40k annually</span>
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
                            />
                            Add to Compare
                          </label>
                          <div className="request-loader"></div>
                        </div>
                        <div className="div_features">
                          <span
                            className="quotes_features"
                            onClick={this.toggleFeaturesModal}
                          >
                            View Features
                          </span>
                        </div>
                      </div>
                      <div className="div_cover_usp">
                        <span className="max_condition1">Best offer</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Modal
          dialogClassName="custom-dialog"
          className="features-modal"
          show={this.props.isFeaturesModalOpen}
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
                    <img src="https://www.hygeiahmo.com/wp-content/uploads/2018/11/Hygeia-Final-No-Left-Padding@1x.svg" />
                  </div>
                </div>
                <div className="col-md-9">
                  <h6>Hygeia HMO</h6>
                  <div className="row features-header-inner">
                    <div className="col-md-3">
                      <p className="greyed-text">Covers</p>
                      <h6>2</h6>
                    </div>
                    <div className="col-md-7">
                      <p className="greyed-text">Premium</p>
                      <h6>₦5k/ month</h6>
                      <p className="greyed-text">₦50k paid annually</p>
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
                        this.props.tab_opened == "highlights"
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
                        this.props.tab_opened == "features"
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
                        this.props.tab_opened == "claim"
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
                        this.props.tab_opened == "hospitals"
                          ? "features_tab is-active"
                          : "features_tab"
                      }
                      id="li_plansHosp"
                    >
                      <a onClick={this.handleTabChange} id="hospitals">
                        Cashless Hospitals
                      </a>
                    </li>
                  </ul>
                </div>
                <div
                  className={
                    this.props.tab_opened == "claim"
                      ? "features_popup_table1 claim_process"
                      : this.props.tab_opened == "hospitals"
                      ? "features_popup_table1 hospitalSearchWrapper"
                      : "features_popup_table1"
                  }
                >
                  {this.props.tab_opened == "highlights" ? (
                    <div className="highlights-content">
                      <div
                        className="div_features_covered_main"
                        // onClick={this.toggleFeaturePopUp}
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
                            We are a certified 5 star partner for Health Care
                          </h2>
                          {/* <FontAwesomeIcon
                          className="chev"
                          icon={faChevronRight}
                        /> */}
                        </div>
                      </div>
                      <div
                        className="div_features_covered_main"
                        // onClick={this.toggleFeaturePopUp}
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
                            We are a certified 5 star partner for Health Care
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
                            We are a certified 5 star partner for Health Care
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
                            We are a certified 5 star partner for Health Care
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
                            We are a certified 5 star partner for Health Care
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
                            We are a certified 5 star partner for Health Care
                          </h2>
                          {/* <FontAwesomeIcon
                          className="chev"
                          icon={faChevronRight}
                        /> */}
                        </div>
                      </div>
                    </div>
                  ) : this.props.tab_opened == "features" ? (
                    <div className="features-content">
                      <p className="coveredHead">What's covered</p>
                      <div className="">
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
                                Hospital Room Eligibility
                              </h2>
                              <span className="span_feature_popup_sub_heading">
                                Single Private A/C Room
                              </span>
                            </div>
                          </div>
                        </div>
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
                                Hospital Room Eligibility
                              </h2>
                              <span className="span_feature_popup_sub_heading">
                                Single Private A/C Room
                              </span>
                            </div>
                          </div>
                        </div>
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
                                Hospital Room Eligibility
                              </h2>
                              <span className="span_feature_popup_sub_heading">
                                Single Private A/C Room
                              </span>
                            </div>
                          </div>
                        </div>
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
                                Hospital Room Eligibility
                              </h2>
                              <span className="span_feature_popup_sub_heading">
                                Single Private A/C Room
                              </span>
                            </div>
                          </div>
                        </div>
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
                                Hospital Room Eligibility
                              </h2>
                              <span className="span_feature_popup_sub_heading">
                                Single Private A/C Room
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : this.props.tab_opened == "claim" ? (
                    <div className="claim-content">
                      <h3>Cashless: Insurer directly pays network hospital</h3>
                      <div className="claim_process_text">
                        <h4>Inform Hygeia HMO</h4>
                        <ul>
                          <li>
                            Call Care Health Insurance (formerly known as
                            Religare Health Insurance) claims desk on Services
                            (1800-102-4488) and Sales (1800-102-4499) at least
                            24 Hrs in Emergency &amp; 48 hrs in case of Planned
                            Admission in advance.
                          </li>
                          <li>
                            The Provider may ask for:
                            <ul>
                              <li>Name of Insured</li>
                              <li>Name of Insured</li>
                              <li>Name of Insured</li>
                              <li>Name of Insured</li>
                              <li>Name of Insured</li>
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
                        <li>Living spring hospital</li>
                        <li>Living spring hospital</li>
                        <li>Living spring hospital</li>
                        <li>Living spring hospital</li>
                        <li>Living spring hospital</li>
                      </ul>
                      <div className="features_hospital_catHead">
                        Other Hospitals
                      </div>
                      <ul className="features_hosp_list">
                        <li>Kupa Medical Centre</li>
                        <li>Kupa Medical Centre</li>
                        <li>Kupa Medical Centre</li>
                        <li>Kupa Medical Centre</li>
                        <li>Kupa Medical Centre</li>
                      </ul>
                    </div>
                  )}
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
          </Modal.Body>
          <div className="claim_popup_main">
            <div className="claim_popup_black"></div>
            <Modal
              dialogClassName="custom-dialog"
              className="claim_popup_white"
              show={this.props.isFeaturePopUpOpen}
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
