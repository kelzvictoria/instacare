import React from "react";
import {
  Row,
  Col,
  Steps,
  message,
  AutoComplete,
  Form,
  Slider,
  Spin,
  Pagination,
  Icon,
} from "antd";
import InfiniteScroll from "react-infinite-scroll-component";

import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import styles from "../../pages/home/Home.module.scss";
import "../../custom.css";
import Modal from "react-bootstrap/Modal";

import "react-phone-number-input/style.css";

import check from "../../svgs/check.svg";
import uncheck from "../../svgs/uncheck.svg";

import HMOInfoSkeleton from "../../components/skeletons/SkeletonHMOInfo";

import * as home_utils from "../../utils/homeUtils";

import "./new-design.css";

import searching from "../../imgs/searching.svg";
import seniors from "../../imgs/seniors.png";
//import family from "../../imgs/family-pic.png";

import family from "../../imgs/fam-l-min.png";

import { formatAsCurrency } from "../../utils";
import DataCaptureModal from "../payment/DataCapture";

export interface homeProps {
  [x: string]: any;
  dispatch(args: any): any;
}

export interface homeState {}

const pageSize = 5;
const antIcon = <Icon type="loading" style={{ fontSize: 80 }} spin />;

class NewContent extends React.Component<homeProps, homeState> {
  constructor(props) {
    super(props);
    this.handleType = this.handleType.bind(this);
    this.decrementSonCount = this.decrementSonCount.bind(this);
    this.incrementSonCount = this.incrementSonCount.bind(this);
    this.decrementDaughterCount = this.decrementDaughterCount.bind(this);
    this.incrementDaughterCount = this.incrementDaughterCount.bind(this);
    this.handlePhone = this.handlePhone.bind(this);
  }
  state = {
    is_phone_valid: "null",
    show_provider_info: false,
    provider_info: [],

    plansByHMO: [],
    show_desktop_on_load_modal: false,
    show_mobile_on_load_modal: false,
    show_desktop_home_frm: true,
    show_filter: false,
    show_med_mgt_program_multiselect: false,
    plans_to_compare: [],
    show_compare_button: false,
    sticky_styles: "results-sticky c-sticky c-sticky--top",
    sticky_inner_optional_style: "",
    filter_params: {
      annual_range_min: undefined,
      annual_range_max: undefined,
      annual_deductible_min: undefined,
      annual_deductible_max: undefined,
      plan_types_checked: [],
      plan_range_checked: [],
      planID: "",
      hmo_selected: "",
      total_benefit_min: undefined,
      total_benefit_max: undefined,
      location: undefined,
      benefits_selected: [],
      doctors_selected: [],
      mgt_program_selected: [],
      providers_selected: [],
      prescriptions_selected: [],
      healthSA_eligibility: false,
    },
    plan_ids: [],
    plan_desc_show_less: true,

    totalPage: 0,
    current: 1,
    minIndex: 0,
    maxIndex: 0,
    //infiniteScrollData: this.props.infiniteScrollData,
    // this.props.match.path === "/hmos/*"
    //   ? this.props.plansByHMO.slice(0, pageSize)
    //   : this.props.planServices.slice(0, pageSize),
  };



  toggleModal = () => {
    if (this.state.show_desktop_on_load_modal) {
      this.closeDesktopOnLoadModal();
    }
    let data = { key: "isOpen", value: !this.props.isOpen };
    this.props.toggleDestopModal(data);
  };

  mobileToggleModal = () => {
    let data = {
      key: "isMobileViewModalOpen",
      value: !this.props.isMobileViewModalOpen,
    };

    this.props.toggleMobileModal(data);
  };

  toggleOthersInput = () => {
    let data = {
      key: "isOthersInputOpen",
      value: !this.props.isOthersInputOpen,
    };
    this.props.toggleOthersModal(data);
  };

  changePage = (action: string) => {
    let data = action;
    this.props.changePage(data);
  };

  // hmoBannerDiv(hmoId) {
  //   let hmoArr;

  //   let data;
  //   if (hmoId) {
  //     if (hmoId !== "hygeia") {
  //       data = this.props.hmos.filter((hmo) => hmo.name.id == hmoArr[0].name);
  //     } else {
  //       data = this.props.hmos.filter((hmo) => hmo.name.id == "1");
  //     }

  //     return (
  //       <Col
  //         xs={24}
  //         md={14}
  //         className=" left-side-info banner-container provider-banner"
  //       >
  //         <div className="svg-and-text provider-data">
  //           <div className="hmo-svg-img svg-img">
  //             <img src={data[0].logo}></img>
  //           </div>

  //           <div className={styles.bannerContent} id="bannertext">
  //             <p className={styles.textHeading}>
  //               {this.props.provider_info["title"]}
  //             </p>
  //           </div>
  //         </div>

  //         <div className="banner-bottom">
  //           <div className="row col-md-12">
  //             <div className="col-md-4 card mr-3">
  //               <img src={hospitalsvg} className="banner-icon" />
  //               <div className="card-text">
  //                 <p>Hospital Network</p>
  //                 <h5>
  //                   {data[0].provider_id
  //                     ? JSON.parse(data[0].provider_id).length
  //                     : ""}
  //                 </h5>
  //               </div>
  //             </div>
  //             <div className="col-md-4 card mr-3">
  //               <span className="naira banner-icon">₦</span>
  //               <div className="card-text">
  //                 <p>Plans Starting from</p>
  //                 <h5>
  //                   {this.numberwithCommas(this.props.cheapest_plan_by_hmo)}
  //                 </h5>
  //               </div>
  //             </div>
  //             <div className="col-md-4 card">
  //               <img src={ratiosvg} className="banner-icon" />
  //               <div className="card-text">
  //                 <p>Claim Ratio</p>
  //                 {/* <h5>{`${
  //                   (this.props.plansByHMO.length /
  //                     this.props.plans.length) *
  //                   100
  //                 }%`}</h5> */}

  //                 <h5>{`${
  //                   (this.props.plansByHMO.length / this.props.plans.length) *
  //                   100
  //                 }%`}</h5>
  //               </div>
  //             </div>
  //           </div>
  //         </div>
  //       </Col>
  //     );
  //   }
  // }

  homeBannerDiv() {
    // console.log("this.props.hmo", this.props.hmo);

    return (
      <Col xs={24} md={14} className="banner-container  left-side-info">
        <div className="view2-svg-and-text svg-and-text">
          <Col xs={24} md={24} className="svg-img-div">
            <div className="svg-img home-svg-img">
              {/* <img src={searching} /> */}
              {/* <img src={family} /> */}
            </div>
          </Col>
          <Col xs={24} md={14} className="view2-banner-text banner-text">
            <div className={styles.banner}>
              <div className={styles.bannerContent} id="bannertext">
                <p className={styles.textHeading}>
                  Find Health Plans Starting
                  <br />
                  <span className={styles.headingSpan}>
                    from
                    {this.props.plans.length == 0 && "..."}
                    {this.props.plans.length > 0 &&
                      ` ₦${this.numberwithCommas(this.props.cheapest_plan)}`}
                    /year
                  </span>
                </p>
              </div>
            </div>
          </Col>
        </div>
        <DataCaptureModal />
      </Col>
    );
  }

  numberwithCommas = (value) => {
    return value && value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  preventDefault(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
  }

  handlePhone(val) {
    if (val) {
      if (val.toString().length == 14) {
        this.setState({
          is_phone_valid: true,
        });
      } else if (val.toString().length > 0 && val.toString().length < 14) {
        this.setState({
          is_phone_valid: false,
        });
      }
      let data = { key: "phone_num", value: val };
      this.props.updatePhone(data);
    }
  }

  defaultGender() {
    return true;
  }

  handleGender(val) {
    let data = { key: "gender", value: val };
    this.props.updateGender(data);
  }

  handleFullName(val) {
    let data = { key: "full_name", value: val };
    this.props.updateFullName(data);
  }

  handleDesktopView() {
    let data = { key: "isDesktopView", value: false };
    this.props.toggleDesktopView(data);
  }

  submitResponses() {
    let stringResp: any = JSON.stringify(this.props.responses);
    localStorage.setItem("responses", stringResp);
    this.props.history.push({
      pathname: "/plans",
      data: this.props.responses,
    });
  }

  handleNumOfPeopleCount() {
    let data;

    if (this.props.responses.type == "couple") {
      data = 1;
      this.props.updateNumOfPeople(data);
    } else if (this.props.responses.type == "fam-of-4") {
      data = 3;
      this.props.updateNumOfPeople(data);
    } else if (this.props.responses.type == "fam-of-3") {
      data = 2;
      this.props.updateNumOfPeople(data);
    } else if (this.props.responses.type == "parents") {
      data = 1;
      this.props.updateNumOfPeople(data);
    } else if (this.props.responses.type == "others") {
      let ages = [
        this.props.responses.child_1_age,
        this.props.responses.child_2_age,
        this.props.responses.child_3_age,
        this.props.responses.child_4_age,
        this.props.responses.child_5_age,
        this.props.responses.child_6_age,
        this.props.responses.child_7_age,
        this.props.responses.child_8_age,
        this.props.responses.father_age,
        this.props.responses.mother_age,
        this.props.responses.father_in_law_age,
        this.props.responses.mother_in_law_age,
        this.props.responses.spouse_age,
        this.props.responses.grand_father_age,
        this.props.responses.grand_mother_age,
        this.props.individual_age,
      ];

      for (let i = 0; i < ages.length; i++) {
        if (parseInt(ages[i]) !== 0) {
          data = 1;
          this.props.updateNumOfPeople(data);
        }
      }
    }
  }

  async handleType(val) {
    this.props.responses.type.length > 0 && this.props.resetType();
    let data = {
      key: "type",
      value: val.target ? val.target.id : val,
    };
    await this.props.updateType(data);
    // await this.props.getServices();
    // this.props.filterByPlanType(data.value);

    this.filterByBudget_and_or_Type();
  }

  async filterByBudget_and_or_Type() {
    console.log("in filt");

    let range =
      this.props.responses.price_range.length > 0
        ? this.props.responses.price_range
        : [];
    let budget =
      this.props.responses.budget.length > 0 ? this.props.responses.budget : [];
    let type =
      this.props.responses.type.length > 0 ? this.props.responses.type[0] : [];

    let params = {
      budget,
      type,
      range,
    };

    await this.props.filterByBudget_and_or_Type(params);
    await this.props.resetInfiniteScrollData();
    this.infiniteScrollDataReInitOnFilterApplied();
  }

  handleAge(key, val) {
    let data = { key: key, value: val };

    this.props.updateAge(data);
  }

  handleSonBoxChecked() {
    let data = {
      key: "isSonCheckboxChecked",
      value: !this.props.isSonCheckboxChecked,
    };
    this.props.updateSonCheck(data);
  }

  handleDaughterBoxChecked() {
    let data = {
      key: "isDaughterCheckboxChecked",
      value: !this.props.isDaughterCheckboxChecked,
    };

    this.props.updateDaughterCheck(data);
  }

  incrementSonCount() {
    if (this.props.sonCount < 4 && this.props.sonCount > 0) {
      let data = { key: "sonCount", value: this.props.sonCount + 1 };
      this.props.incrementSonCount(data);
    }
  }

  decrementSonCount() {
    if (this.props.sonCount > 1) {
      let data = { key: "sonCount", value: this.props.sonCount - 1 };
      this.props.decrementSonCount(data);
    }
  }

  incrementDaughterCount() {
    if (this.props.daughterCount < 4 && this.props.daughterCount > 0) {
      let data = { key: "daughterCount", value: this.props.daughterCount + 1 };
      this.props.incrementDaughterCount(data);
    }
  }

  decrementDaughterCount() {
    if (this.props.daughterCount > 1) {
      let data = { key: "daughterCount", value: this.props.daughterCount - 1 };
      this.props.decrementDaughterCount(data);
    }
  }

  handleChildrenCheckboxes(e) {}

  resetAges() {
    let data = {
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
    };
    this.props.resetResponses(data);
  }

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
                this.handleAge("individual_age", e.target.value);
              }}
              value={this.props.responses.individual_age}
              placeholder="Select Age"
            >
              {home_utils.options.map((option) => (
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
                this.handleAge("spouse_age", e.target.value);
              }}
              value={this.props.responses.spouse_age}
              placeholder="Select Age"
            >
              {home_utils.options.map((option) => (
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
                  onChange={() => {
                    this.handleSonBoxChecked();
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
                  this.handleAge("child_1_age", e.target.value);
                }}
                value={this.props.responses.child_1_age}
                placeholder="Select Age"
              >
                {home_utils.child_options.map((option) => (
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
                  this.handleAge("child_2_age", e.target.value);
                }}
                value={this.props.responses.child_2_age}
                placeholder="Select Age"
              >
                {home_utils.child_options.map((option) => (
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
                  this.handleAge("child_3_age", e.target.value);
                }}
                value={this.props.responses.child_3_age}
                placeholder="Select Age"
              >
                {home_utils.child_options.map((option) => (
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
                  this.handleAge("child_4_age", e.target.value);
                }}
                value={this.props.responses.child_4_age}
                placeholder="Select Age"
              >
                {home_utils.child_options.map((option) => (
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
                  onChange={() => {
                    this.handleDaughterBoxChecked();
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
                  this.handleAge("child_5_age", e.target.value);
                }}
                value={this.props.responses.child_5_age}
                placeholder="Select Age"
              >
                {home_utils.child_options.map((option) => (
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
                  this.handleAge("child_6_age", e.target.value);
                }}
                value={this.props.responses.child_6_age}
                placeholder="Select Age"
              >
                {home_utils.child_options.map((option) => (
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
                  this.handleAge("child_7_age", e.target.value);
                }}
                value={this.props.responses.child_7_age}
                placeholder="Select Age"
              >
                {home_utils.child_options.map((option) => (
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
                  this.handleAge("child_8_age", e.target.value);
                }}
                value={this.props.responses.child_8_age}
                placeholder="Select Age"
              >
                {home_utils.child_options.map((option) => (
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
                this.handleAge("father_age", e.target.value);
              }}
              value={this.props.responses.father_age}
              placeholder="Select Age"
            >
              {home_utils.options.map((option) => (
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
                this.handleAge("mother_age", e.target.value);
              }}
              value={this.props.responses.mother_age}
              placeholder="Select Age"
            >
              {home_utils.options.map((option) => (
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
                this.handleAge("grand_father_age", e.target.value);
              }}
              value={this.props.responses.grand_father_age}
              placeholder="Select Age"
            >
              {home_utils.options.map((option) => (
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
                this.handleAge("grand_mother_age", e.target.value);
              }}
              value={this.props.responses.grand_mother_age}
              placeholder="Select Age"
            >
              {home_utils.options.map((option) => (
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
                this.handleAge("father_in_law_age", e.target.value);
              }}
              value={this.props.responses.father_in_law_age}
              placeholder="Select Age"
            >
              {home_utils.options.map((option) => (
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
                this.handleAge("mother_in_law_age", e.target.value);
              }}
              value={this.props.responses.mother_in_law_age}
              placeholder="Select Age"
            >
              {home_utils.options.map((option) => (
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

  showSingleInput() {
    const singleInput = (
      <div id="single-control">
        <label>Select Age</label>
        <select
          name="individual"
          className="form-control"
          onChange={(e) => {
            this.handleAge("individual_age", e.target.value);
          }}
          value={this.props.responses.individual_age}
          placeholder="Select Age"
        >
          {home_utils.options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    );

    return singleInput;
  }

  showFamOf3Input() {
    const famOf3Input = (
      <div id="famOf3-controls" className="row">
        <div className="col-md-6">
          <label>Age of the Eldest member</label>
          <select
            name="spouse_age"
            className="form-control"
            onChange={(e) => {
              this.handleAge("spouse_age", e.target.value);
            }}
            value={this.props.responses.spouse_age}
            placeholder="Select Age"
          >
            {home_utils.options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        <div className="col-md-6 mt-1rem">
          <label>Select Age of Child</label>
          <select
            name="child_1_age"
            className="form-control"
            onChange={(e) => {
              this.handleAge("child_1_age", e.target.value);
            }}
            value={this.props.responses.child_1_age}
            placeholder="Select Age"
          >
            {home_utils.child_options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    );
    return famOf3Input;
  }

  showParentsInput() {
    const parentsInput = (
      <div id="parents-control">
        <div className="col-md-6">
          <label>Age of the Eldest member</label>
          <select
            name="father_age"
            className="form-control"
            onChange={(e) => {
              this.handleAge("father_age", e.target.value);
            }}
            value={this.props.responses.father_age}
            placeholder="Select Age"
          >
            {home_utils.options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div className="col-md-6"></div>
      </div>
    );
    return parentsInput;
  }

  showCouplesInput() {
    const couplesInput = (
      <div id="couples-control" className="col-md-6">
        <label>Age of the Eldest member</label>
        <select
          name="spouse_age"
          className="form-control"
          value={this.props.responses.spouse_age}
          onChange={(e) => {
            this.handleAge("spouse_age", e.target.value);
          }}
          placeholder="Select Age"
        >
          {home_utils.options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    );

    return couplesInput;
  }

  showFamOf4Input() {
    const famOf4Input = (
      <div id="famOf4-controls" className="row">
        <div className="col-md-6">
          <label>Age of the Eldest member</label>
          <select
            name="spouse_age"
            className="form-control"
            onChange={(e) => {
              this.handleAge("spouse_age", e.target.value);
            }}
            value={this.props.responses.spouse_age}
            placeholder="Select Age"
          >
            {home_utils.options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        <div className="col-md-6 mt-1rem">
          <label>Age of the Eldest Child</label>
          <select
            name="child_1_age"
            className="form-control"
            onChange={(e) => {
              this.handleAge("child_1_age", e.target.value);
            }}
            value={this.props.responses.child_1_age}
            placeholder="Select Age"
          >
            {home_utils.child_options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    );
    return famOf4Input;
  }

  onSearch = (searchText: string) => {
    let tempLocations: any[] = [];
    home_utils.locations.forEach((item: string) => {
      const _item = item.toLowerCase();
      if (_item.startsWith(searchText.toLowerCase())) {
        tempLocations.push(item);
      }
    });
    if (tempLocations.length > 0) {
      this.props.filterLocations(tempLocations);
    }
  };

  onSelectChange = (value: any) => {
    let data = { key: "state", value };
    this.props.updateTextResponse(data);
  };

  updateLocation = (location: any) => {
    let data = { key: "state", value: location };
    this.props.updateTextResponse(data);
  };

  renderQuizPages() {
    //console.log('d open')

    const page2 = (
      <div id="secondPage">
        <div className="form-group num-div">
          <div className="col-md-12 top-row">
            <div className="radios num-of-people">
              <label>
                <input
                  type="radio"
                  value="single"
                  name="numOfPeople"
                  className="radio-group-num here"
                  // defaultChecked={
                  //   this.props.responses.type[
                  //     this.props.responses.type.length - 1
                  //   ] === "single"
                  // }
                  onClick={this.handleType}
                  id="single"
                ></input>
                <span className="num-div-inner">
                  <span>
                    <i className="gender icons-gender male me"></i>
                  </span>
                  <span id="num-text" className="num-text">
                    Me
                  </span>
                </span>
              </label>
              <label>
                <input
                  type="radio"
                  id="couple"
                  value="couple"
                  name="numOfPeople"
                  className="radio-group-num"
                  // defaultChecked={
                  //   this.props.responses.type[
                  //     this.props.responses.type.length - 1
                  //   ] === "couple"
                  // }
                  onClick={this.handleType}
                ></input>
                <span className="num-div-inner">
                  <span>
                    <i className="gender icons-gender male couple"></i>
                  </span>
                  <span id="num-text" className="num-text">
                    Me + My Wife
                  </span>
                </span>
              </label>
              <label>
                <input
                  id="fam-of-3"
                  type="radio"
                  value="fam-of-3"
                  name="numOfPeople"
                  className="radio-group-num"
                  // defaultChecked={
                  //   this.props.responses.type[
                  //     this.props.responses.type.length - 1
                  //   ] === "fam-of-3"
                  // }
                  onClick={this.handleType}
                  // onClick={(e) =>
                  //   this.handleType("fam-of-3")
                  // }
                ></input>
                <span className="num-div-inner">
                  <span>
                    <i className="gender icons-gender male fam-of-3"></i>
                  </span>
                  <span id="num-text" className="num-text">
                    Me + My wife & 1 kid
                  </span>
                </span>
              </label>
            </div>
          </div>
          <div className="col-md-12">
            <div className="radios num-of-people">
              <label>
                <input
                  id="fam-of-4"
                  type="radio"
                  value="fam-of-4"
                  name="numOfPeople"
                  // defaultChecked={
                  //   this.props.responses.type[
                  //     this.props.responses.type.length - 1
                  //   ] === "fam-of-4"
                  // }
                  onClick={this.handleType}
                  className="radio-group-num"
                ></input>
                <span className="num-div-inner">
                  <span>
                    <i className="gender icons-gender male fam-of-4"></i>
                  </span>
                  <span id="num-text" className="num-text">
                    Me + My wife & 2 kids
                  </span>
                </span>
              </label>
              <label>
                <input
                  id="parents"
                  type="radio"
                  value="parents"
                  name="numOfPeople"
                  // defaultChecked={
                  //   this.props.responses.type[
                  //     this.props.responses.type.length - 1
                  //   ] === "parents"
                  // }
                  onClick={this.handleType}
                  className="radio-group-num"
                ></input>
                <span className="num-div-inner">
                  <span>
                    <i className="gender icons-gender male parents"></i>
                  </span>
                  <span id="num-text" className="num-text">
                    My Parents
                  </span>
                </span>
              </label>
              <label>
                <input
                  id="others"
                  type="radio"
                  value="others"
                  name="numOfPeople"
                  className="radio-group-num"
                  defaultChecked={["others", "smes", "intl_coverage"].includes(
                    this.props.responses.type
                  )}
                  //{this.props.responses.type === "others"}
                  onClick={(e) => {
                    this.toggleOthersInput();
                    this.handleType(e);
                  }}
                ></input>
                <span className="num-div-inner">
                  <span>
                    <i className="gender icons-gender male others"></i>
                  </span>
                  <span id="num-text" className="num-text">
                    Others
                  </span>
                </span>
              </label>
              <Modal
                dialogClassName="custom-dialog"
                className="right"
                show={this.props.isOthersInputOpen}
                onHide={this.toggleOthersInput}
              >
                <Modal.Header translate="true" closeButton>
                  <div className="others-mtitle">
                    <p>{home_utils.steps[1].p}</p>
                    <h3>{home_utils.steps[1].h3}</h3>
                  </div>
                </Modal.Header>
                <Modal.Body>{this.showOthersInput()}</Modal.Body>
              </Modal>
            </div>
          </div>
        </div>

        <div className="form-group single-age-input" id="single-input">
          <div className="col-md-6">
            {this.props.responses.type == "single"
              ? this.showSingleInput()
              : ""}
          </div>
        </div>

        <div className="form-group couple-input" id="couple-input">
          {this.props.responses.type == "couple" ? this.showCouplesInput() : ""}
        </div>

        <div
          className="form-group fam-of-3-input col-md-12"
          id="fam-of-3-input"
        >
          {this.props.responses.type == "fam-of-3"
            ? this.showFamOf3Input()
            : ""}
        </div>

        <div
          className="form-group fam-of-4-input col-md-12"
          id="fam-of-4-input"
        >
          {this.props.responses.type == "fam-of-4"
            ? this.showFamOf4Input()
            : ""}
        </div>

        <div className="form-group parents-age" id="parents-age">
          {this.props.responses.type == "parents"
            ? this.showParentsInput()
            : ""}
        </div>
      </div>
    );

    const page3 = (
      <div id="thirdPage">
        <div className="col-md-12">
          <Form.Item
            colon={false}
            label="City living in"
            style={{ textAlign: "left" }}
          >
            <AutoComplete
              size="large"
              style={{ width: "100%" }}
              dataSource={this.props.dataSource}
              onSearch={this.onSearch}
              onChange={this.onSelectChange}
              placeholder="Location (state)"
              value={this.props.responses.state}
            />
          </Form.Item>
        </div>
        <div className="row col-md-12 popular-cities">
          <div className="col-md-3">
            <button
              className="form-control state-btn"
              onClick={() => this.updateLocation("Lagos")}
            >
              Lagos
            </button>
          </div>
          <div className="col-md-3">
            <button
              className="form-control state-btn"
              onClick={() => this.updateLocation("Abuja")}
            >
              Abuja
            </button>
          </div>
          <div className="col-md-3">
            <button
              className="form-control state-btn"
              onClick={() => this.updateLocation("Rivers")}
            >
              Rivers
            </button>
          </div>
          <div className="col-md-3">
            <button
              className="form-control state-btn"
              onClick={() => this.updateLocation("Oyo")}
            >
              Oyo
            </button>
          </div>
        </div>
      </div>
    );

    if (this.props.page === 2) {
      return page2;
    } else if (this.props.page === 3) {
      return page3;
    }

    return <p>Not enough responses collected!</p>;
  }

  renderMobileViewQuizPages() {
    //console.log('m open')
    const page2 = (
      <div id="firstPage">
        <div className="form-group">
          <div className="col-md-12">
            <label>I am a</label>
            <div className="radios">
              <label>
                <input
                  type="radio"
                  value="m"
                  name="radio-group-gender"
                  defaultChecked={this.defaultGender()}
                  onChange={(e) => {
                    this.handleGender(e.target.value);
                  }}
                  className="radio-group-gender"
                ></input>
                <span>
                  <i className="gender icons-gender male male-icon"></i>

                  <em>Male</em>
                </span>
              </label>
              <label>
                <input
                  type="radio"
                  value="f"
                  name="radio-group-gender"
                  onChange={(e) => {
                    this.handleGender(e.target.value);
                  }}
                  className="radio-group-gender"
                ></input>
                <span>
                  <i className="gender icons-gender male female-icon"></i>
                  <em>Female</em>
                </span>
              </label>
            </div>
          </div>
        </div>

        <div className="form-group">
          <div className="col-md-12">
            <label>My name is</label>
          </div>

          <div className="col-md-12">
            <input
              className="form-control"
              onChange={(e) => {
                this.handleFullName(e.target.value);
              }}
              // required={true}
              value={this.props.responses.full_name}
              placeholder="Full Name"
            ></input>
          </div>
        </div>
      </div>
    );

    const page3 = (
      <div id="secondPage">
        <div className="form-group num-div">
          <div className="col-md-12 top-row">
            <div className="radios num-of-people">
              <label>
                <input
                  type="radio"
                  value="single"
                  name="numOfPeople"
                  className="radio-group-num two"
                  // defaultChecked={
                  //   this.props.responses.type[
                  //     this.props.responses.type.length - 1
                  //   ] === "single"
                  // }
                  onClick={this.handleType}
                  id="single"
                ></input>
                <span className="num-div-inner">
                  <span>
                    <i className="gender icons-gender male me"></i>
                  </span>
                  <span id="num-text" className="num-text">
                    Me
                  </span>
                </span>
              </label>
              <label>
                <input
                  type="radio"
                  id="couple"
                  value="couple"
                  name="numOfPeople"
                  className="radio-group-num"
                  // defaultChecked={
                  //   this.props.responses.type[
                  //     this.props.responses.type.length - 1
                  //   ] === "couple"
                  // }
                  onClick={this.handleType}
                ></input>
                <span className="num-div-inner">
                  <span>
                    <i className="gender icons-gender male couple"></i>
                  </span>
                  <span id="num-text" className="num-text">
                    Me + My Wife
                  </span>
                </span>
              </label>
              <label>
                <input
                  id="fam-of-3"
                  type="radio"
                  value="fam-of-3"
                  name="numOfPeople"
                  className="radio-group-num"
                  // defaultChecked={
                  //   this.props.responses.type[
                  //     this.props.responses.type.length - 1
                  //   ] === "fam-of-3"
                  // }
                  onClick={this.handleType}
                ></input>
                <span className="num-div-inner">
                  <span>
                    <i className="gender icons-gender male fam-of-3"></i>
                  </span>
                  <span id="num-text" className="num-text">
                    Me + My wife & 1 kid
                  </span>
                </span>
              </label>
            </div>
          </div>
          <div className="col-md-12">
            <div className="radios num-of-people">
              <label>
                <input
                  id="fam-of-4"
                  type="radio"
                  value="fam-of-4"
                  name="numOfPeople"
                  // defaultChecked={
                  //   this.props.responses.type[
                  //     this.props.responses.type.length - 1
                  //   ] === "fam-of-4"
                  // }
                  onClick={this.handleType}
                  className="radio-group-num"
                ></input>
                <span className="num-div-inner">
                  <span>
                    <i className="gender icons-gender male fam-of-4"></i>
                  </span>
                  <span id="num-text" className="num-text">
                    Me + My wife & 2 kids
                  </span>
                </span>
              </label>
              <label>
                <input
                  id="parents"
                  type="radio"
                  value="parents"
                  name="numOfPeople"
                  // defaultChecked={
                  //   this.props.responses.type[
                  //     this.props.responses.type.length - 1
                  //   ] === "parents"
                  // }
                  onClick={this.handleType}
                  className="radio-group-num"
                ></input>
                <span className="num-div-inner">
                  <span>
                    <i className="gender icons-gender male parents"></i>
                  </span>
                  <span id="num-text" className="num-text">
                    My Parents
                  </span>
                </span>
              </label>
              <label>
                <input
                  id="others"
                  type="radio"
                  value="others"
                  name="numOfPeople"
                  className="radio-group-num"
                  defaultChecked={["others", "smes", "intl_coverage"].includes(
                    this.props.responses.type
                  )}
                  //{this.props.responses.type === "others"}
                  onClick={this.toggleOthersInput}
                ></input>
                <span className="num-div-inner">
                  <span>
                    <i className="gender icons-gender male others"></i>
                  </span>
                  <span id="num-text" className="num-text">
                    Others
                  </span>
                </span>
              </label>
              <Modal
                dialogClassName="custom-dialog"
                className="right"
                show={this.props.isOthersInputOpen}
                onHide={this.toggleOthersInput}
              >
                <Modal.Header translate="true" closeButton>
                  <div className="others-mtitle">
                    <p>{home_utils.steps[1].p}</p>
                    <h3>{home_utils.steps[1].h3}</h3>
                  </div>
                </Modal.Header>
                <Modal.Body>
                  {this.showOthersInput()}
                  {/* <div className="form-group">
                    <div className="col-md-6">
                      {this.props.page != 1 ? (
                        <button
                          className="btn btn-primary btn-large view-plans btn-demo"
                          onClick={this.handleNavigation}
                          id="prev"
                        >
                          Previous
                        </button>
                      ) : (
                        ""
                      )}
                    </div>
                    <div className="col-md-6">
                      <button
                        className="btn btn-primary btn-large others-btn-cont view-plans btn-demo"
                        onClick={this.handleNavigation}
                        id="next"
                      >
                        Continue
                      </button>
                    </div>
                  </div> */}
                </Modal.Body>
              </Modal>
            </div>
          </div>
        </div>

        <div className="form-group single-age-input" id="single-input">
          <div className="col-md-6">
            {this.props.responses.type == "single"
              ? this.showSingleInput()
              : ""}
          </div>
        </div>

        <div className="form-group couple-input" id="couple-input">
          {this.props.responses.type == "couple" ? this.showCouplesInput() : ""}
        </div>

        <div
          className="form-group fam-of-3-input col-md-12"
          id="fam-of-3-input"
        >
          {this.props.responses.type == "fam-of-3"
            ? this.showFamOf3Input()
            : ""}
        </div>

        <div
          className="form-group fam-of-4-input col-md-12"
          id="fam-of-4-input"
        >
          {this.props.responses.type == "fam-of-4"
            ? this.showFamOf4Input()
            : ""}
        </div>

        <div className="form-group parents-age" id="parents-age">
          {this.props.responses.type == "parents"
            ? this.showParentsInput()
            : ""}
        </div>
      </div>
    );

    const page4 = (
      <div id="thirdPage">
        <div className="col-md-12">
          <Form.Item
            colon={false}
            label="City living in"
            style={{ textAlign: "left" }}
          >
            <AutoComplete
              size="large"
              style={{ width: "100%" }}
              dataSource={this.props.dataSource}
              onSearch={this.onSearch}
              onChange={this.onSelectChange}
              value={this.props.responses.state}
              placeholder="Location (state)"
            />
          </Form.Item>
        </div>
        <div className="row col-md-12">
          <div className="col-md-3">
            <button
              className="form-control state-btn"
              onClick={() => this.updateLocation("Lagos")}
            >
              Lagos
            </button>
          </div>
          <div className="col-md-3">
            <button
              className="form-control state-btn"
              onClick={() => this.updateLocation("Abuja")}
            >
              Abuja
            </button>
          </div>
          <div className="col-md-3">
            <button
              className="form-control state-btn"
              onClick={() => this.updateLocation("Rivers")}
            >
              Rivers
            </button>
          </div>
          <div className="col-md-3">
            <button
              className="form-control state-btn"
              onClick={() => this.updateLocation("Oyo")}
            >
              Oyo
            </button>
          </div>
        </div>
      </div>
    );
    //console.log("this.props.page", this.props.page);
    /*if (this.props.page === 0) {
      return page2;
    }
    else*/ if (
      this.props.page === 2
      //|| this.props.page === 1
    ) {
      //console.log("page2");
      return page2;
    } else if (this.props.page === 3) {
      //console.log("page3");
      return page3;
    } else if (this.props.page === 4) {
      //console.log"page4");
      return page4;
    }
    //console.log("this.props.page before return", this.props.page);
    return <p>Not enough responses collected!</p>;
  }

  goToDetails(serviceID) {
    this.props.history.push({ pathname: `/details/id/${serviceID}` });
  }

  goToPlanProviders(serviceID) {
    this.props.history.push({
      pathname: `/details/id/${serviceID}/#providers`,
    });
  }

  getClickedPlan = async (index, type) => {
    let data = this.props.planServices[index];
    console.log("data", data);

    let serviceID = data.service_id;

    await this.props.getPlan(data);
    this.props.getSimilarPlans(data);
    type == "view" && this.goToDetails(serviceID);
  };

  renderDesktopQuizForm() {
    return (
      <form
        id="desktop-quiz-form1"
        onSubmit={this.preventDefault}
        className="form desktop"
      >
        <h3 className="no-med">
          Compare and buy HMO plans in Nigeria from the comfort of your home
        </h3>
        <h3 className="no-med no-med-r">No medicals required</h3>

        <div
          className={
            //styles.optionsGroup +
            " price-slider"
          }
        >
          <p className={styles.sideBarHeadings}>
            {/* What is your annual price range{" "} */}
            What is the maximum you can afford to pay per year?
            <span className="price-range">
              ( {this.formatter(this.minbudgett)} -{" "}
              {this.formatter(this.maxbudgett)})
            </span>{" "}
            ?
          </p>
          <Slider
            style={{ width: "80%", margin: "0px auto" }}
            marks={this.marks}
            range
            tipFormatter={this.formatter}
            // min={300000}
            min={5000}
            max={1000000}
            onAfterChange={this.eventHandlers.changeBudget}
            defaultValue={this.props.responses.budget}
          />
        </div>
        <div className="form-group num-div">
          <div className="col-md-12">
            <label>Who is in your household?</label>
          </div>

          <div className="col-md-12 top-row">
            <div className="radios num-of-people">
              <label>
                <input
                  type="radio"
                  value="single"
                  name="numOfPeople"
                  className="radio-group-num"
                  // onChange={this.handleType}
                  checked={
                    this.props.responses.type[
                      this.props.responses.type.length - 1
                    ] === "single"
                  }
                  onClick={this.handleType}
                  id="single"
                ></input>
                <span className="num-div-inner">
                  <span>
                    <i className="gender icons-gender male me household-num"></i>
                  </span>
                  <span
                    id="num-text"
                    className={
                      this.props.responses.type == "single"
                        ? "num-text num-text-active"
                        : "num-text"
                    }
                  >
                    Me
                  </span>
                </span>
              </label>
              <label>
                <input
                  type="radio"
                  id="couple"
                  value="couple"
                  name="numOfPeople"
                  className="radio-group-num"
                  checked={
                    this.props.responses.type[
                      this.props.responses.type.length - 1
                    ] === "couple"
                  }
                  onClick={this.handleType}
                  // onChange={this.handleType}
                ></input>
                <span className="num-div-inner">
                  <span>
                    <i className="gender icons-gender male couple household-num"></i>
                  </span>
                  <span
                    id="num-text"
                    className={
                      this.props.responses.type == "couple"
                        ? "num-text num-text-active"
                        : "num-text"
                    }
                  >
                    Me + My Wife
                  </span>
                </span>
              </label>
              <label>
                <input
                  id="fam-of-4"
                  type="radio"
                  value="fam-of-4"
                  name="numOfPeople"
                  checked={
                    this.props.responses.type[
                      this.props.responses.type.length - 1
                    ] === "fam-of-4"
                  }
                  onClick={this.handleType}
                  //onChange={this.handleType}
                  className="radio-group-num"
                ></input>
                <span className="num-div-inner">
                  <span>
                    <i className="gender icons-gender male fam-of-4 household-num"></i>
                  </span>
                  <span
                    id="num-text"
                    className={
                      this.props.responses.type == "fam-of-4"
                        ? "num-text num-text-active"
                        : "num-text"
                    }
                  >
                    Me + My wife & 2 kids
                  </span>
                </span>
              </label>
            </div>
          </div>
          <div className="col-md-12">
            <div className="radios num-of-people">
              <label>
                <input
                  id="corporate"
                  type="radio"
                  value="corporate"
                  name="numOfPeople"
                  checked={
                    this.props.responses.type[
                      this.props.responses.type.length - 1
                    ] === "corporate"
                  }
                  onClick={this.handleType}
                  // onChange={this.handleType}
                  className="radio-group-num"
                ></input>
                <span className="num-div-inner">
                  <span>
                    <i className="gender icons-gender male fam-of-4 household-num"></i>
                  </span>
                  <span
                    id="num-text"
                    className={
                      this.props.responses.type == "corporate"
                        ? "num-text num-text-active"
                        : "num-text"
                    }
                  >
                    Corporate
                  </span>
                </span>
              </label>
              <label>
                <input
                  id="parents"
                  type="radio"
                  value="parents"
                  name="numOfPeople"
                  checked={
                    this.props.responses.type[
                      this.props.responses.type.length - 1
                    ] === "parents"
                  }
                  onClick={this.handleType}
                  // onChange={this.handleType}
                  className="radio-group-num"
                ></input>
                <span className="num-div-inner">
                  <span>
                    <i className="gender icons-gender male parents household-num"></i>
                  </span>
                  <span
                    id="num-text"
                    className={
                      this.props.responses.type == "parents"
                        ? "num-text num-text-active"
                        : "num-text"
                    }
                  >
                    My Parents
                  </span>
                </span>
              </label>
              <label>
                <input
                  id="others"
                  type="radio"
                  value="others"
                  name="numOfPeople"
                  className="radio-group-num"
                  checked={["others", "smes", "intl_coverage"].includes(
                    //{this.props.responses.type === "others"}
                    this.props.responses.type
                  )}
                  onChange={this.handleType}
                  onClick={(e) => {
                    this.toggleOthersInput();
                    this.handleType(e);
                  }}
                ></input>
                <span className="num-div-inner">
                  <span>
                    <i className="gender icons-gender male others household-num"></i>
                  </span>
                  <span
                    id="num-text"
                    className={
                      this.props.responses.type == "others"
                        ? "num-text num-text-active"
                        : "num-text"
                    }
                  >
                    Others
                  </span>
                </span>
              </label>
              <Modal
                dialogClassName="custom-dialog"
                className="right"
                show={this.props.isOthersInputOpen}
                onHide={this.toggleOthersInput}
              >
                <Modal.Header translate="true" closeButton>
                  <div className="others-mtitle">
                    <p>{home_utils.steps[1].p}</p>
                    <h3>{home_utils.steps[1].h3}</h3>
                  </div>
                </Modal.Header>
                <Modal.Body>{this.showOthersInput()}</Modal.Body>
              </Modal>
            </div>
          </div>
        </div>

        <div className="form-group home-view-btn">
          <div className="col-md-12">
            <button
              className="btn btn-primary btn-large view-plans btn-demo"
              onClick={() => {
                this.closeDesktopOnLoadModal();
                // if (this.props.responses.phone_num) {
                //  this.toggleModal();
                // } else {
                //   this.phoneNumError();
                // }
              }}
            >
              View Plans
            </button>
          </div>
        </div>
        <div className="form-group mobile-view-cont-btn">
          <div className="col-md-12">
            <button
              className="btn btn-primary btn-large view-plans btn-demo"
              // onClick={this.toggleModal}
            >
              Continue
            </button>
          </div>
        </div>
      </form>
    );
  }

  renderMobileQuizForm() {
    return (
      <form
        id="mobile-quiz-form1"
        onSubmit={this.preventDefault}
        className="form mobile"
      >
        <h3 className="no-med no-med-mobile">
          Compare and buy HMO plans in Nigeria from the comfort of your home
        </h3>
        <h3 className="no-med no-med-r">No medicals required</h3>
        <div
          className={
            //styles.optionsGroup +
            " price-slider"
          }
        >
          <p className={styles.sideBarHeadings}>
            What is your price range?
            <span className="price-range">
              ( {this.formatter(this.minbudgett)} -{" "}
              {this.formatter(this.maxbudgett)})
            </span>
          </p>
          <Slider
            style={{ width: "80%", margin: "0px auto" }}
            marks={this.marks}
            range
            tipFormatter={this.formatter}
            // min={300000}
            min={5000}
            max={1000000}
            onAfterChange={this.eventHandlers.changeBudget}
            defaultValue={this.props.responses.budget}
          />
        </div>
        <div className="form-group num-div">
          <div className="col-md-12">
            <label>Who is in your household?</label>
          </div>

          <div className="col-md-12 top-row">
            <div className="radios num-of-people">
              <label>
                <input
                  type="radio"
                  value="single"
                  name="numOfPeople"
                  className="radio-group-num"
                  checked={
                    this.props.responses.type[
                      this.props.responses.type.length - 1
                    ] === "single"
                  }
                  onClick={this.handleType}
                  //onChange={this.handleType}
                  id="single"
                ></input>
                <span className="num-div-inner">
                  <span>
                    <i className="gender icons-gender male me household-num"></i>
                  </span>
                  <span
                    id="num-text"
                    className={
                      this.props.responses.type == "single"
                        ? "num-text num-text-active"
                        : "num-text"
                    }
                  >
                    Me
                  </span>
                </span>
              </label>
              <label>
                <input
                  type="radio"
                  id="couple"
                  value="couple"
                  name="numOfPeople"
                  className="radio-group-num"
                  checked={
                    this.props.responses.type[
                      this.props.responses.type.length - 1
                    ] === "couple"
                  }
                  onClick={this.handleType}
                  // onChange={this.handleType}
                ></input>
                <span className="num-div-inner">
                  <span>
                    <i className="gender icons-gender male couple household-num"></i>
                  </span>
                  <span
                    id="num-text"
                    className={
                      this.props.responses.type == "couple"
                        ? "num-text num-text-active"
                        : "num-text"
                    }
                  >
                    Me + My Wife
                  </span>
                </span>
              </label>
              <label>
                <input
                  id="fam-of-3"
                  type="radio"
                  value="fam-of-3"
                  name="numOfPeople"
                  className="radio-group-num"
                  checked={
                    this.props.responses.type[
                      this.props.responses.type.length - 1
                    ] === "fam-of-3"
                  }
                  onClick={this.handleType}
                  //onChange={this.handleType}
                  // onClick={(e) =>
                  //   this.handleType("fam-of-3")
                  // }
                ></input>
                <span className="num-div-inner">
                  <span>
                    <i className="gender icons-gender male fam-of-3 household-num"></i>
                  </span>
                  <span
                    id="num-text"
                    className={
                      this.props.responses.type == "fam-of-3"
                        ? "num-text num-text-active"
                        : "num-text"
                    }
                  >
                    Me + My wife & 1 kid
                  </span>
                </span>
              </label>
            </div>
          </div>
          <div className="col-md-12">
            <div className="radios num-of-people">
              <label>
                <input
                  id="fam-of-4"
                  type="radio"
                  value="fam-of-4"
                  name="numOfPeople"
                  checked={
                    this.props.responses.type[
                      this.props.responses.type.length - 1
                    ] === "fam-of-4"
                  }
                  onClick={this.handleType}
                  // onChange={this.handleType}
                  className="radio-group-num"
                ></input>
                <span className="num-div-inner">
                  <span>
                    <i className="gender icons-gender male fam-of-4 household-num"></i>
                  </span>
                  <span
                    id="num-text"
                    className={
                      this.props.responses.type == "fam-of-4"
                        ? "num-text num-text-active"
                        : "num-text"
                    }
                  >
                    Me + My wife & 2 kids
                  </span>
                </span>
              </label>
              <label>
                <input
                  id="parents"
                  type="radio"
                  value="parents"
                  name="numOfPeople"
                  checked={
                    this.props.responses.type[
                      this.props.responses.type.length - 1
                    ] === "parents"
                  }
                  onClick={this.handleType}
                  // onChange={this.handleType}
                  className="radio-group-num"
                ></input>
                <span className="num-div-inner">
                  <span>
                    <i className="gender icons-gender male parents household-num"></i>
                  </span>
                  <span
                    id="num-text"
                    className={
                      this.props.responses.type == "parents"
                        ? "num-text num-text-active"
                        : "num-text"
                    }
                  >
                    My Parents
                  </span>
                </span>
              </label>
              <label>
                <input
                  id="others"
                  type="radio"
                  value="others"
                  name="numOfPeople"
                  className="radio-group-num"
                  checked={["others", "smes", "intl_coverage"].includes(
                    //{this.props.responses.type === "others"}
                    this.props.responses.type
                  )}
                  onClick={(e) => {
                    this.toggleOthersInput();
                    this.handleType(e);
                  }}
                  onChange={this.handleType}
                ></input>
                <span className="num-div-inner">
                  <span>
                    <i className="gender icons-gender male others household-num"></i>
                  </span>
                  <span
                    id="num-text"
                    className={
                      this.props.responses.type == "others"
                        ? "num-text num-text-active"
                        : "num-text"
                    }
                  >
                    Others
                  </span>
                </span>
              </label>
              <Modal
                dialogClassName="custom-dialog"
                className="right"
                show={this.props.isOthersInputOpen}
                onHide={this.toggleOthersInput}
              >
                <Modal.Header translate="true" closeButton>
                  <div className="others-mtitle">
                    <p>{home_utils.steps[1].p}</p>
                    <h3>{home_utils.steps[1].h3}</h3>
                  </div>
                </Modal.Header>
                <Modal.Body>{this.showOthersInput()}</Modal.Body>
              </Modal>
            </div>
          </div>
        </div>

        <div className="form-group mobile-view-cont-btn">
          <div className="col-md-12">
            <button
              className="btn btn-primary btn-large view-plans btn-demo"
              onClick={() => {
                // this.mobileToggleModal();
                //this.handleDesktopView();
              }}
            >
              Continue
            </button>
          </div>
        </div>
      </form>
    );
  }

  showDesktopOnLoadModal = () => {
    this.hideDesktopHomeFrm();
    this.setState({
      show_desktop_on_load_modal: true,
    });
  };

  closeDesktopOnLoadModal = () => {
    //console.log"close me");
    this.showDesktopHomeFrm();
    this.setState({
      show_desktop_on_load_modal: false,
    });
  };

  desktopOnLoadModal() {
    return (
      <Modal
        id="desktop-on-page-load-modal"
        dialogClassName="custom-dialog"
        className="desktop-modal center"
        show={this.state.show_desktop_on_load_modal}
        onHide={() => this.closeDesktopOnLoadModal()}
        backdrop="static"
      >
        <Modal.Header translate="true" closeButton></Modal.Header>
        <Modal.Body>{this.renderDesktopQuizForm()}</Modal.Body>
      </Modal>
    );
  }

  // mobileOnLoadModal() {
  //   return (
  //     <Modal
  //       id="mobile-on-page-load-modal"
  //       dialogClassName="custom-dialog"
  //       className="mobile-modal center"
  //       show={true}
  //       onHide={this.mobileToggleModal}
  //     >
  //       <Modal.Body>{this.renderMobileQuizForm()}</Modal.Body>
  //     </Modal>
  //   );
  // }

  hideDesktopHomeFrm() {
    this.setState({
      show_desktop_home_frm: false,
    });
  }

  showDesktopHomeFrm() {
    this.setState({
      show_desktop_home_frm: true,
    });
  }

  async UNSAFE_componentWillMount() {
    //this.handlePlanTypesCheck(this.props.responses.type);
    //this.handlePlanRangeCheck(this.props.responses.price_range);
  }

  componentDidMount() {
    if (window.screen.width >= 600) {
      //console.log("window.screen.width >= 501", window.screen.width >= 501);
      setTimeout(() => {
        // this.showDesktopOnLoadModal();
      }, 5000);

      //  this.desktopOnLoadModal();
    } else {
      //console.log"window.screen.width < 501", window.screen.width >= 501);
      //this.mobileOnLoadModal();
    }

    this.setState({
      // data: apiData,
      // totalPage: apiData.length / pageSize,
      minIndex: 0,
      maxIndex: pageSize,
    });
  }

  componentWillMount() {
    document.addEventListener("scroll", this.trackScrolling);
  }

  componentWillUnmount() {
    //window.removeEventListener("scroll", this.handleSticky);
    document.removeEventListener("scroll", this.trackScrolling);
  }

  marks = {
    //300000: formatAsCurrency(300000),
    8000: formatAsCurrency(8000),
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

  // minBudget: any = this.formatBudget(300000);
  minBudget: any = this.formatBudget(8000);

  maxBudget: any = this.formatBudget(3000000);
  popularIndex = 0;
  usePreviousSearch = false;
  timeout: any;
  k = "K";
  m = "M";
  minbudgett = this.props.responses.budget[0];
  maxbudgett = this.props.responses.budget[1];

  eventHandlers = {
    changeBudget: async (value: any) => {
      this.minBudget = value[0];
      this.maxBudget = value[1];
      this.changek(this.minBudget, this.maxBudget);

      let data = true;
      let budget = value;

      //  await this.props.resetPlans(data);
      await this.props.updateBudget(budget);
      //await this.props.getServices();
      //this.props.filterByBudget(budget);

      //this.handlePriceRangeTitle();

      this.filterByBudget_and_or_Type();
    },
  };
  formatter(value: number) {
    return formatAsCurrency(value);
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

  changeType(val) {
    if (
      [
        "single",
        "couple",
        "parents",
        "corporate",
        "fam-of-4",
        "smes",
        "intl_coverage",
        "all",
      ].includes(val)
    ) {
      this.handleType(val);
    }
  }

  // updatePriceRange(title) {
  //   let data = title;
  //   this.props.updatePriceRange(data);
  // }

  handlePriceRangeTitle() {
    // console.log(
    //   "hit handle",
    //   "this.props.responses.budget[0]",
    //   this.props.responses.budget[0],
    //   "this.props.responses.budget[1]",
    //   this.props.responses.budget[1],

    //   "this.props.responses.price_range",
    //   this.props.responses.price_range
    // );

    if (
      this.props.responses.budget[1] > 0 &&
      this.props.responses.budget[1] <= 49999
    ) {
      console.log("bronze");

      this.props.updatePriceRange("bronze");
    } else if (
      this.props.responses.budget[1] >= 50000 &&
      this.props.responses.budget[1] <= 149999
    ) {
      console.log("silver");

      this.props.updatePriceRange("silver");
    } else if (
      this.props.responses.budget[1] >= 150000 &&
      this.props.responses.budget[1] <= 299999
    ) {
      console.log("gold");

      this.props.updatePriceRange("gold");
    } else if (
      this.props.responses.budget[1] >= 300000 &&
      this.props.responses.budget[1] <= 599999
    ) {
      console.log("platinum");
      this.props.updatePriceRange("platinum");
    } else if (this.props.responses.budget[1] >= 600000) {
      console.log("platinum_plus");

      this.props.updatePriceRange("platinum_plus");
    } else {
      console.log("all");
    }
    console.log(
      "this.props.responses.price_range",
      this.props.responses.price_range
    );
  }

  setPriceRangeBasedOnTitle = async (e) => {
    this.props.resetRange();
    //console.log("e.target", e.target);

    this.setState({
      range_selected: e, //.target.value,
    });

    let title = e; //.target.value;
    console.log("title", title);

    switch (title) {
      case "bronze":
        //this.eventHandlers.changeBudget([0, 20000]);
        await this.props.updatePriceRange("bronze");

        break;

      case "silver":
        //this.eventHandlers.changeBudget([20001, 49999]);
        await this.props.updatePriceRange("silver");
        break;

      case "gold":
        // this.eventHandlers.changeBudget([50000, 99999]);
        await this.props.updatePriceRange("gold");

        break;

      case "diamond":
        await this.props.updatePriceRange("diamond");
        break;

      case "platinum":
        // this.eventHandlers.changeBudget([100000, 149000]);
        await this.props.updatePriceRange("platinum");

        break;

      case "platinum_plus":
        //this.eventHandlers.changeBudget([150000, 1000000]);
        await this.props.updatePriceRange("platinum_plus");

        break;

      default:
        //this.eventHandlers.changeBudget([0, 2000000]);
        await this.props.updatePriceRange("all");
        break;
    }
    //this.props.filterByPlanRange();
    this.filterByBudget_and_or_Type();
  };

  toggleShowFilter = () => {
    this.setState({
      show_filter: !this.state.show_filter,
    });
  };

  toggleMedMgtProgramsMultiselect = () => {
    //console.log"toggle");

    this.setState({
      show_med_mgt_program_multiselect:
        !this.state.show_med_mgt_program_multiselect,
    });
  };

  openMedMgtProgramsMultiselect = () => {
    this.setState({
      show_med_mgt_program_multiselect: true,
    });
  };

  closeMedMgtProgramsMultiselect = () => {
    this.setState({
      show_med_mgt_program_multiselect: false,
    });
  };

  handleMedMgtProgCheck(id) {
    //console.log"id", id);

    let arr: string[] = this.state.filter_params.mgt_program_selected;

    let isProgChecked: number = arr.indexOf(id);

    //console.log"isProgChecked", isProgChecked);

    if (isProgChecked > -1) {
      arr.splice(isProgChecked, 1);
    } else {
      arr.push(id);
    }

    this.setState({
      filter_params: {
        ...this.state.filter_params,
        mgt_program_selected: arr,
      },
    });
  }

  handlePlanRangeCheck(id) {
    let arr: string[] = this.state.filter_params.plan_range_checked;

    let isPlanRangeChecked: number = arr.indexOf(id);

    if (isPlanRangeChecked > -1) {
      arr.splice(isPlanRangeChecked, 1);
    } else {
      arr.push(id);
    }

    this.setState({
      filter_params: {
        ...this.state.filter_params,
        plan_range_checked: arr,
      },
    });
  }

  handlePlanTypesCheck(id) {
    let arr: string[] = this.state.filter_params.plan_types_checked;

    let isPlanChecked: number = arr.indexOf(id);

    if (isPlanChecked > -1) {
      arr.splice(isPlanChecked, 1);
    } else {
      arr.push(id);
    }

    this.setState({
      filter_params: {
        ...this.state.filter_params,
        plan_types_checked: arr,
      },
    });
  }

  handleProviderSelected = (id) => {
    this.setState({
      filter_params: {
        ...this.state.filter_params,
        providers_selected: id,
      },
    });
  };

  handlePrescriptionSelected = (id) => {
    let arr: string[] = this.state.filter_params.prescriptions_selected;
    arr.push(id);

    this.setState({
      filter_params: {
        ...this.state.filter_params,
        arr,
      },
    });
  };

  handleMinRangeChange(val) {
    console.log(
      "this.state.filter_params.annual_range_min",

      this.state.filter_params.annual_range_min
    );

    console.log("val", val);

    this.setState({
      filter_params: {
        ...this.state.filter_params,
        annual_range_min: val,
      },
    });
  }

  handleMaxRangeChange(val) {
    this.setState({
      filter_params: {
        ...this.state.filter_params,
        annual_range_max: val,
      },
    });
  }

  handleTotalBenefitMinChange(val) {
    console.log("val", val);

    this.setState({
      filter_params: {
        ...this.state.filter_params,
        total_benefit_min: val,
      },
    });
  }

  handleTotalBenefitMaxChange(val) {
    this.setState({
      filter_params: {
        ...this.state.filter_params,
        total_benefit_max: val,
      },
    });
  }

  handlePlanIDChange(val) {
    this.setState({
      filter_params: {
        ...this.state.filter_params,
        planID: val,
      },
    });

    // this.props.setPlanID(this.state.filter_params.planID)
  }

  async handleHSAChange() {
   await this.getLocation()

    let v = this.state.filter_params.healthSA_eligibility;
    this.setState({
      filter_params: {
        ...this.state.filter_params,
        healthSA_eligibility: !v,
       // location: 
      },
    });


  }

  updateBudgetWithFilterRange = () => {
    this.eventHandlers.changeBudget([
      this.state.filter_params.annual_range_min
        ? this.state.filter_params.annual_range_min
        : this.props.responses.budget[0],
      this.state.filter_params.annual_range_max
        ? this.state.filter_params.annual_range_max
        : this.props.responses.budget[1],
    ]);
  };

  handleMinDedChange(val) {
    this.setState({
      filter_params: {
        ...this.state.filter_params,
        annual_deductible_min: val,
      },
    });
  }

  handleMaxDedChange(val) {
    this.setState({
      filter_params: {
        ...this.state.filter_params,
        annual_deductible_max: val,
      },
    });
  }

  handleHMOSelected(val) {
    this.setState({
      filter_params: {
        ...this.state.filter_params,
        hmo_selected: val,
      },
    });
  }

  showCompareButton() {
    this.setState({
      show_compare_button: true,
    });
  }

  hideCompareButton() {
    this.setState({
      show_compare_button: true,
    });
  }

  handleCheckedPlanToCompare(index) {
    let indexes: string[] = this.state.plans_to_compare;

    let isPlanChecked = indexes.indexOf(index);

    if (isPlanChecked == -1 && indexes.length > 0) {
      this.showCompareButton();
    }

    if (isPlanChecked > -1) {
      indexes.splice(isPlanChecked, 1);
    } else {
      if (indexes.length <= 2) {
        indexes.push(index);
      } else {
        message.error("You can only compare a maximum of 3 plans at a time");
      }
    }

    if (indexes.length === 1 && !this.state.show_compare_button) {
      message.success("Plan selected. Select more plans to compare...");
    }

    this.setState({
      plans_to_compare: indexes,
    });
  }

  setRecPlansIndexesToCompare = () => {
    let data = this.state.plans_to_compare;

    this.props.setPlansToCompareOnDesktop(data);
    this.props.setPlansToCompareOnMobile(data);
  };

  buildQueryParams = () => {
    let query_string = "/plans/" + this.state.plans_to_compare[0];

    for (let i = 1; i < this.state.plans_to_compare.length; i++) {
      query_string += "/" + this.state.plans_to_compare[i];
    }
    return query_string;
  };

  goToComparison = () => {
    if (this.state.plans_to_compare.length > 1) {
      let q = this.buildQueryParams();

      this.setRecPlansIndexesToCompare();
      this.props.history.push({
        pathname: `/compare-plans${q}`,
      });
    } else {
      message.error("You need to select at least 2 plans to compare");
      return;
    }
  };

  initialStickyPosition() {
    let css = `results-sticky c-sticky c-sticky--top results-sticky-top--initial`;
    this.setState({
      sticky_styles: css,
      sticky_inner_optional_style: "",
    });
  }

  onScrollDownStickyPosition() {
    let css = `results-sticky c-sticky c-sticky--top border-bottom--2 fill--background c-sticky--fixed results-sticky-top--zero `;
    this.setState({
      sticky_styles: css,
      sticky_inner_optional_style: "l-container",
    });
  }

  onScrollUpStickyPosition() {
    let css = `results-sticky-top--zero results-sticky c-sticky c-sticky--top border-bottom--2 fill--background c-sticky--fixed c-sticky--animated`;
    this.setState({
      sticky_styles: css,
    });
  }
  // }

  isBottom(el) {
    return el ? el.getBoundingClientRect().top <= 120 : false;
  }

  trackScrolling = () => {
    const wrappedElement = document.getElementById("plans-section");
    //console.logwrappedElement, "wrappedElement");
    // console.log("this.isBottom(wrappedElement)", this.isBottom(wrappedElement))
    if (this.isBottom(wrappedElement)) {
      //console.log"sticky sticky");
      this.onScrollDownStickyPosition();
      //document.removeEventListener("scroll", this.trackScrolling);
    } else {
      this.initialStickyPosition();
    }
  };

  togglePlanCollapse = (plan_id) => {
    this.handleExpandedPlan(plan_id);
  };

  handleExpandedPlan = (plan_id) => {
    let plan_ids: string[] = this.state.plan_ids;
    let isPlanExpanded = plan_ids.indexOf(plan_id);

    if (isPlanExpanded > -1) {
      plan_ids.splice(isPlanExpanded, 1);
    } else {
      plan_ids.push(plan_id);
    }

    this.setState({
      plan_ids: plan_ids,
    });
  };

  planDescCollapse() {
    return <button></button>;
  }

  stripNonNumeric(x) {
    x = x !== undefined ? x.toString() : "";
    var n = parseFloat(
      (x.charAt(0) == "-" ? "-" : "") + x.replace(/[^0-9]+/g, "")
    );
    return isNaN(n) ? 0 : n;
  }

  handleTotalBenefitLimit(in_limit, out_limit) {
    let inLimit = this.stripNonNumeric(in_limit); //parseInt(in_limit.split("₦")[1]);
    let outLimit = this.stripNonNumeric(out_limit); //parseInt(out_limit.split("₦")[1]);

    if (inLimit && outLimit) {
      return inLimit + outLimit;
    }
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  // handlePlanID_HMOID_paramChange = () => {

  // }

  getRecommendedPlans = async () => {
    // this.state.filter_params.plan_range_checked.map((range) =>
    //   this.handlePlanRangeCheck(range)
    // );

    //  await this.clearFilters();

    let filterBoxParams = {
      range: this.state.filter_params.plan_range_checked,
      type: this.state.filter_params.plan_types_checked,
      budget:
        this.state.filter_params.annual_range_min &&
        this.state.filter_params.annual_range_max
          ? [
              this.state.filter_params.annual_range_min,
              this.state.filter_params.annual_range_max,
            ]
          : [],
      planID: this.state.filter_params.planID,
      hmoID: this.state.filter_params.hmo_selected,
    };

    const { range, budget, type, hmoID, planID } = filterBoxParams;

    if (
      range.length > 0 ||
      budget.length > 0 ||
      type.length > 0 ||
      hmoID ||
      planID
    ) {
      this.resetTypeAndRangeFilters();
      await this.props.getRecommendedPlans(filterBoxParams);
      await this.props.resetInfiniteScrollData();
      this.infiniteScrollDataReInitOnFilterApplied();
      this.state.show_filter && this.toggleShowFilter();
    }
  };

  getPlanByID = async (planID) => {
    await this.props.getPlanByID(planID);
    await this.props.resetInfiniteScrollData();
    this.infiniteScrollDataReInitOnFilterApplied();
  };

  resetServices() {
    this.props.getServices();
  }

  resetTypeAndRangeFilters() {
    this.changeType(
      this.state.filter_params.plan_types_checked[
        this.state.filter_params.plan_types_checked.length - 1
      ]
    );
    this.setPriceRangeBasedOnTitle(
      this.state.filter_params.plan_range_checked[
        this.state.filter_params.plan_range_checked.length - 1
      ]
    );
  }

  clearFilters = async () => {
    console.log("clear");

    this.props.resetSelectedProviders();

    this.setState({
      filter_params: {
        ...this.state.filter_params,
        annual_range_min: "",
        annual_range_max: "",
        annual_deductible_min: "",
        annual_deductible_max: "",
        plan_types_checked: [],
        plan_range_checked: [],
        planID: "",
        hmo_selected: "", // undefined,
        mgt_program_selected: [],
        providers_selected: [],
        prescriptions_selected: [],
        healthSA_eligibility: false,
      },
    });
    await this.eventHandlers.changeBudget([100, 300000]);
    this.props.resetType();
    this.props.resetRange();
    await this.props.resetInfiniteScrollData();
    this.state.show_filter && this.toggleShowFilter();
    await this.props.getServices();
    console.log("this.props.planServices", this.props.planServices);

    this.props.match.path === "/hmos/*"
      ? await this.props.updateInfiniteScrollData(
          this.props.plansByHMO,
          false,
          null,
          null
        )
      : await this.props.updateInfiniteScrollData(
          this.props.planServices,
          false,
          null,
          null
        );
  };

  goToProviders = () => {
    this.props.history.push({
      pathname: "/find-provider",
    });
  };

  infiniteScrollDataReInitOnFilterApplied = async () => {
    this.setState({
      current: 1,
      minIndex: 0,
      maxIndex: pageSize,
      // infiniteScrollData:
      //   this.props.match.path === "/hmos/*"
      //     ? this.props.plansByHMO.slice(0, pageSize)
      //     : this.props.planServices.slice(0, pageSize),
    });
    let page = this.state.current;
    let plansByHMO = this.props.plansByHMO;
    let allPlans = this.props.planServices;

    let apiData = this.props.match.path === "/hmos/*" ? plansByHMO : allPlans;

    console.log("apiData", apiData);

    let start_index = (page - 1) * pageSize;
    let end_index = pageSize * page;

    console.log("start_index", start_index);
    console.log("end_index", end_index);

    this.setState({
      current: page,
      minIndex: start_index,
      maxIndex: end_index,
    });

    await this.props.updateInfiniteScrollData(
      apiData,
      true,
      start_index,
      end_index
    );
  };

  handlePageChange = async (page) => {
    console.log("page", page);

    let plansByHMO = this.props.plansByHMO;
    let allPlans = this.props.planServices;

    let apiData = this.props.match.path === "/hmos/*" ? plansByHMO : allPlans;

    console.log("apiData", apiData);

    let total_num_of_pages = apiData.length / pageSize;

    console.log("total_num_of_pages", total_num_of_pages);

    if (page < total_num_of_pages) {
      page = page + 1;

      //console.log("page + 1", page);

      //  setTimeout(() => {
      // this.setState({
      //   infiniteScrollData: this.state.infiniteScrollData.concat(
      //     apiData.slice(start_index, end_index)
      //   ),
      // });
      // }, 1500);
    }

    let start_index = (page - 1) * pageSize;
    let end_index = pageSize * page;

    console.log("start_index", start_index);
    console.log("end_index", end_index);

    this.setState({
      current: page,
      minIndex: start_index,
      maxIndex: end_index,
    });

    await this.props.updateInfiniteScrollData(
      apiData,
      true,
      start_index,
      end_index
    );
  };

  componentDidUpdate() {}

  getLocation = () => {
    if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(this.showPosition, this.showError);
    
    } else {
    console.log( "The Browser Does not Support Geolocation");
    
    }
    }

    showPosition = (position) => {
     console.log("Latitude: " + position.coords.latitude + "Longitude: " + position.coords.longitude);

     if (position.coords.latitude && position.coords.longitude) {
          this.setState({
            filter_params: {
              ...this.state.filter_params,
              location:`${position.coords.latitude}, ${position.coords.longitude}`
            }
     
     })
     }
  
     
      }

      showError = (error) => {
        if(error.PERMISSION_DENIED){
        console.log("The User have denied the request for Geolocation.");
         ;
        }
        }

  render() {
    //  console.log("this.props.infiniteScrollData", this.props.infiniteScrollData);

    let plansByHMO = this.props.plansByHMO;
    let allPlans = this.props.planServices;
    // console.log("allPlans", allPlans);

    //   console.log("apiData", apiData);

    let data = this.props.match.path === "/hmos/*" ? plansByHMO : allPlans;

    //this.state.maxIndex < data.length

    // console.log("this.state.maxIndex", this.state.maxIndex);
    //  console.log("data", data);

    //  console.log("data", data);
    // console.log("this.state.maxIndex", this.state.maxIndex);

    let apiData = this.props.infiniteScrollData;
    //  console.log("apiData", apiData);

    let {
      //  data,
      current,
      minIndex,
      maxIndex,
      totalPage,
    } = this.state;

    if (this.props.page != 0) {
    } else {
    }
    // console.log("this.state.range_selected", this.state.range_selected);
    //console.log"this.props", this.props);

    let med_mgt_programs_selected: string[] =
      this.state.filter_params["mgt_program_selected"];

    let plan_types_checked: string[] =
      this.state.filter_params["plan_types_checked"];

    let plan_range_checked: string[] =
      this.state.filter_params["plan_range_checked"];

    let plans_to_compare: number[] = this.state.plans_to_compare;

    // let plansWithPackages =
    //   this.props.plans &&
    //   this.props.plans.filter((plan) => plan.packages.length > 0);

    // console.log("plan_range_checked", plan_range_checked);
    // console.log("plan_types_checked", plan_types_checked);

    const {
      annual_range_min,
      annual_range_max,
      annual_deductible_min,
      annual_deductible_max,

      total_benefit_min,
      total_benefit_max,
      location,
      benefits_selected,
      doctors_selected,

      planID,
      healthSA_eligibility,
    } = this.state.filter_params;

    let providersArr;

    //console.log("total_benefit_min", total_benefit_min);
  //  console.log("total_benefit_max", total_benefit_max);
    

    return (
      <div className="home">
        <div className="banner-div">
          <div className="container home-c">
            <h1 className="tiny-descrptn">
              {
                //this.props.plansByHMO.length > 0
                this.props.hmo.length > 0 &&
                this.props.plansByHMO.length > 0 &&
                this.props.match.path === "/hmos/*"
                  ? `${this.props.hmo[0].name} plans starting from `
                  : this.props.hmo.length > 0 &&
                    this.props.plansByHMO.length === 0 &&
                    this.props.match.path === "/hmos/*"
                  ? `Sorry, there are currently no ${this.props.hmo[0].name} plans.`
                  : `Protect your health from just`
              }
              {this.props.plansByHMO.length === 0 &&
              this.props.match.path === "/hmos/*" ? (
                ""
              ) : (
                <span className={styles.headingSpan}>
                  {this.props.is_fetching_data && !this.props.cheapest_plan ? (
                    <Spin className="cheapest-plan" />
                  ) : (
                    ` ₦${this.numberwithCommas(
                      // this.props.plansByHMO.length > 0
                      this.props.hmo.length > 0 &&
                        this.props.match.path === "/hmos/*"
                        ? this.props.cheapest_plan_by_hmo
                        : this.props.cheapest_plan
                    )} per year`
                  )}
                </span>
              )}
            </h1>

            {/* if the path is /hmo and data has been fetched*/}
            {/* {
              this.props.match.params.id &&
                this.props.plansByHMO.length > 0 && (
                  <Row className="banner-content">
                    {this.hmoBannerDiv(this.props.match.params.id)}

                    <Col md={10} className="quiz">
                      <div className="home-frm form-div">
                        { this.renderDesktopQuizForm()}

                        {this.renderMobileQuizForm()}
                        
                      </div>
                    </Col>
                  </Row>
                )
            } */}

            {/* if the path is /hmo and data is being fetched*/}
            {this.props.match.params.id && this.props.plans.length == 0 && (
              <Row className="banner-content">
                <Col
                  xs={24}
                  md={14}
                  className="banner-container provider-banner"
                >
                  <p className="tiny-descrptn">
                    {
                      //this.props.plansByHMO.length > 0
                      this.props.hmo.length > 0 &&
                      this.props.plansByHMO.length > 0 &&
                      this.props.match.path === "/hmos/*"
                        ? `${this.props.hmo[0].name} plans starting from `
                        : this.props.hmo.length > 0 &&
                          this.props.plansByHMO.length === 0 &&
                          this.props.match.path === "/hmos/*"
                        ? `Sorry, there are currently no ${this.props.hmo[0].name} plans.`
                        : `Protect your health from just`
                    }
                    {this.props.plansByHMO.length === 0 &&
                    this.props.match.path === "/hmos/*" ? (
                      ""
                    ) : (
                      <span className={styles.headingSpan}>
                        {this.props.is_fetching_data &&
                        !this.props.cheapest_plan ? (
                          <Spin className="cheapest-plan" />
                        ) : (
                          ` ₦${this.numberwithCommas(
                            // this.props.plansByHMO.length > 0
                            this.props.hmo.length > 0 &&
                              this.props.match.path === "/hmos/*"
                              ? this.props.cheapest_plan_by_hmo
                              : this.props.cheapest_plan
                          )} per year`
                        )}
                      </span>
                    )}
                  </p>

                  <HMOInfoSkeleton />
                </Col>
                <Col md={10} className="quiz">
                  <div className="home-frm form-div  test2">
                    {this.renderDesktopQuizForm()}

                    {/* {this.renderMobileQuizForm()} */}
                  </div>
                </Col>
              </Row>
            )}

            {/* if the path is / */}

            {!this.props.match.params.id && (
              <Row className="banner-content">
                {this.homeBannerDiv()}
                <Col md={10} className="quiz">
                  <div
                    className={
                      this.state.show_desktop_home_frm
                        ? "home-frm form-div test3"
                        : "hide-desktop-home-frm"
                    }
                  >
                    {/* call desktop form 3 */ this.renderDesktopQuizForm()}

                    {/* {this.renderMobileQuizForm()} */}
                    {/* {call the desktop modal } */ this.desktopOnLoadModal()}
                    {/* call desktop quiz modal 3  this.renderDesktopQuizModal()*/}
                    {/* call mobile quiz modal 3 this.renderMobileQuizModal()*/}
                  </div>
                </Col>
              </Row>
            )}
          </div>
        </div>
        {!this.props.is_fetching_data ? (
          <div className="home-plans-div container" id="plans">
            <div className="results-header margin-top--2">
              <div className={this.state.sticky_styles}>
                <div
                  className={`padding-y--1 display--flex flex-wrap--wrap md-flex-wrap--nowrap justify-content--between ${this.state.sticky_inner_optional_style}`}
                >
                  <div className="margin-bottom--1 md-margin-bottom--0 results-header-left">
                    <div className="font-size--lead font-weight--bold c-results_header_summary">
                      {/* {this.props.plans.length} plans available */}
                      {data.length} plan
                      {data.length > 1 && "s"} available
                    </div>
                    <div className="filt_comp_btns">
                      <button
                        className={`c-button  c-button--primary margin-right--2 margin-bottom--1 lg-margin-bottom--0 c-filter-plans btn-filter ${
                          this.state.show_filter && "display--none"
                        }`}
                        type="button"
                        onClick={() => {
                          this.toggleShowFilter();

                          // this.resetServices();
                        }}
                      >
                        Filter Plans
                      </button>

                      <button
                        className={`c-button  c-button--primary margin-right--2 margin-bottom--1 lg-margin-bottom--0 c-filter-plans ${
                          !this.state.show_filter && "display--none"
                        }`}
                        type="button"
                        onClick={() => {
                          this.toggleShowFilter();
                        }}
                      >
                        Cancel
                      </button>

                      <a
                        className={
                          this.state.show_compare_button
                            ? "c-button c-button--secondary margin-right--2 qa-compare-plans"
                            : "display--none"
                        }
                        // href="#"
                        onClick={() => {
                          this.goToComparison();
                        }}
                        role="button"
                      >
                        Compare {plans_to_compare.length}{" "}
                        {plans_to_compare.length > 1 ? "plans" : "plan"}
                      </a>
                    </div>
                  </div>
                  <div className="results-header-right">
                    <div className="c-division display--inline-block rh-plan-type-div">
                      <label className="rh-plan-type c-label margin-top--0">
                        <span className="drop-ds-label">Plan type</span>
                      </label>
                      <select
                        className="c-field rh-plan-type-select"
                        onChange={(e) => {
                          this.changeType(e.target.value);
                        }}
                        value={
                          this.props.responses.type[
                            this.props.responses.type.length - 1
                          ]
                        }
                      >
                        {/* <option
                          value="all"
                          id="all"
                          onClick={this.resetServices}
                        >
                          All
                        </option> */}
                        {home_utils.plan_types.map((plan_type) => {
                          return (
                            <option value={plan_type.id} id={plan_type.id}>
                              {plan_type.name}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                    <div
                      className={`${
                        window.screen.width >= 501 && "margin-left--1"
                      } display--inline-block rh-sort-by-div`}
                    >
                      <label className="c-label margin-top--0 rh-sort-by">
                        <span className="drop-ds-label">Plan range</span>
                      </label>
                      <select
                        className="c-field c-field--medium rh-sort-by-select"
                        onChange={(e) =>
                          this.setPriceRangeBasedOnTitle(e.target.value)
                        }
                        value={
                          this.props.responses.price_range[
                            this.props.responses.price_range.length - 1
                          ] //{this.state.range_selected}
                        }
                      >
                        {home_utils.plan_range.map((plan_range) => {
                          return (
                            <option value={plan_range.id}>
                              {plan_range.name}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              <div
                className={
                  this.state.show_filter
                    ? "l-col fill--white c-filter-panel"
                    : "display--none"
                }
              >
                <div className="c-filter-panel-margin-for-mobile-buttons">
                  <div className="l-form-row margin-y--2">
                    <div className="l-lg-col--8">
                      <div className="l-form-row margin-bottom--2">
                        <div className="l-lg-col--6 c-plan-filter-container">
                          <div className="fill--gray-lightest padding--2">
                            <fieldset className="c-range-field c-fieldset margin-top--0">
                              <legend className="c-label c-range-field__label">
                                <span className="bolden-it">
                                  Annual premium
                                </span>
                                <span className="c-field__hint">
                                  Your annual premium range is
                                  {/* { annual_range_min ? annual_range_min : "" }  - {annual_range_min ? annual_range_max : ""} */}
                                  {/* ( {this.formatter(this.minbudgett)} -{" "}
                                  {this.formatter(this.maxbudgett)}) */}
                                  {/* ₦20,000 ₦50,000 */}
                                </span>
                              </legend>
                              <div className="display--flex justify-content--between align-items--center">
                                <div className="clearfix c-range-field__input">
                                  <div className="c-field-mask c-field-mask--currency">
                                    <div className="c-field__before c-field__before--currency">
                                      ₦
                                    </div>
                                    <input
                                      className="c-field c-field--currency"
                                      inputMode="numeric"
                                      pattern="[0-9.,-]*"
                                      type="text"
                                      name="premium-start"
                                      value={
                                        this.state.filter_params
                                          .annual_range_min
                                      }
                                      // value={this.props.responses.budget[0]}
                                      onChange={(e) =>
                                        this.handleMinRangeChange(
                                          e.target.value
                                        )
                                      }
                                      // onKeyUp={this.updateBugetWithFilterRange}
                                    />
                                  </div>
                                </div>
                                <div
                                  className="c-range-field__to"
                                  aria-hidden="true"
                                >
                                  to
                                </div>

                                <div className="clearfix c-range-field__input">
                                  <div className="c-field-mask c-field-mask--currency">
                                    <div className="c-field__before c-field__before--currency">
                                      ₦
                                    </div>
                                    <input
                                      className="c-field c-field--currency"
                                      inputMode="numeric"
                                      pattern="[0-9.,-]*"
                                      type="text"
                                      name="premium-end"
                                      value={annual_range_max}
                                      // value={this.props.responses.budget[1]}
                                      onChange={(e) =>
                                        this.handleMaxRangeChange(
                                          e.target.value
                                        )
                                      }
                                      // onKeyUp={this.updateBugetWithFilterRange}
                                    />
                                  </div>
                                </div>
                                <button
                                  className="c-button c-button--secondary c-button--small c-range-field__button"
                                  disabled={
                                    annual_range_min != undefined &&
                                    annual_range_max != undefined
                                      ? false
                                      : true
                                  }
                                  type="button"
                                  onClick={() => {
                                    this.updateBudgetWithFilterRange();
                                    //this.getRecommendedPlans();
                                  }}
                                >
                                  Apply range
                                </button>
                              </div>
                              <div></div>
                            </fieldset>
                          </div>
                        </div>
                        <div className="l-lg-col--6 c-plan-filter-container">
                          <div className="fill--gray-lightest padding--2">
                            <fieldset className="c-range-field c-fieldset margin-top--0">
                              <legend className="c-label c-range-field__label">
                                <span className="bolden-it">
                                  Total Benefit Limit
                                </span>
                                <span className="c-field__hint">
                                  
                                  Your annual Total Benefit range is
                                  {/* {total_benefit_min
                                    ? total_benefit_min
                                    : ""}{" "}
                                  
                                  {total_benefit_min
                                    ? total_benefit_max
                                    : ""}
                                   */}
                                </span>
                              </legend>
                              <div className="display--flex justify-content--between align-items--center">
                                <div className="clearfix c-range-field__input">
                                  <div className="c-field-mask c-field-mask--currency">
                                    <div className="c-field__before c-field__before--currency">
                                      ₦
                                    </div>
                                    <input
                                      className="c-field c-field--currency"
                                      inputMode="numeric"
                                      pattern="[0-9.,-]*"
                                      type="text"
                                      name="deductible-start"
                                      value={total_benefit_min}
                                      onChange={(e) =>
                                        this.handleTotalBenefitMinChange(e.target.value)
                                      }
                                    />
                                  </div>
                                </div>
                                <div
                                  className="c-range-field__to"
                                  aria-hidden="true"
                                >
                                  to
                                </div>
                                <div className="clearfix c-range-field__input">
                                  <div className="c-field-mask c-field-mask--currency">
                                    <div className="c-field__before c-field__before--currency">
                                      ₦
                                    </div>
                                    <input
                                      className="c-field c-field--currency"
                                      inputMode="numeric"
                                      pattern="[0-9.,-]*"
                                      type="text"
                                      name="deductible-end"
                                      value={total_benefit_max}
                                      onChange={(e) =>
                                        this.handleTotalBenefitMaxChange(e.target.value)
                                      }
                                    />
                                  </div>
                                </div>

                                <button
                                  className="c-button c-button--secondary c-button--small c-range-field__button"
                                  disabled={
                                    annual_deductible_min != undefined ||
                                    annual_deductible_max != undefined
                                      ? false
                                      : true
                                  }
                                  type="button"
                                >
                                  Apply range
                                </button>
                              </div>
                              <div></div>
                            </fieldset>
                          </div>
                        </div>
                      </div>
                      <div className="l-form-row">
                        <div className="l-lg-col--6 c-plan-filter-container">
                          <div className="fill--gray-lightest padding--2">
                            <fieldset className="c-fieldset margin-top--0">
                              <legend className="c-label">Plan Types</legend>
                              <div className="">
                                <input
                                  className="c-choice c-choice--small"
                                  type="checkbox"
                                  name=""
                                  value="single"
                                  onChange={() =>
                                    this.handlePlanTypesCheck("single")
                                  }
                                  checked={
                                    plan_types_checked
                                      ? plan_types_checked.includes("single")
                                      : false
                                  }
                                />
                                <label
                                  className="c-label"
                                  onClick={() =>
                                    this.handlePlanTypesCheck("single")
                                  }
                                >
                                  <span className="">Individual</span>
                                </label>
                              </div>

                              <div className="">
                                <input
                                  className="c-choice c-choice--small"
                                  type="checkbox"
                                  name=""
                                  value="fam-of-4"
                                  onChange={() =>
                                    this.handlePlanTypesCheck("fam-of-4")
                                  }
                                  checked={
                                    plan_types_checked
                                      ? plan_types_checked.includes("fam-of-4")
                                      : false
                                  }
                                />
                                <label
                                  className="c-label"
                                  onClick={() =>
                                    this.handlePlanTypesCheck("fam-of-4")
                                  }
                                >
                                  <span className="">Family</span>
                                </label>
                              </div>

                              <div className="">
                                <input
                                  className="c-choice c-choice--small"
                                  type="checkbox"
                                  name=""
                                  value="couple"
                                  onChange={() =>
                                    this.handlePlanTypesCheck("couple")
                                  }
                                  checked={
                                    plan_types_checked
                                      ? plan_types_checked.includes("couple")
                                      : false
                                  }
                                />
                                <label
                                  className="c-label"
                                  onClick={() =>
                                    this.handlePlanTypesCheck("couple")
                                  }
                                >
                                  <span className="">
                                    Couples
                                    {/* (2) */}
                                  </span>
                                </label>
                              </div>

                              <div className="">
                                <input
                                  className="c-choice c-choice--small"
                                  type="checkbox"
                                  name=""
                                  value="parents"
                                  onChange={() =>
                                    this.handlePlanTypesCheck("parents")
                                  }
                                  checked={
                                    plan_types_checked
                                      ? plan_types_checked.includes("parents")
                                      : false
                                  }
                                />
                                <label
                                  className="c-label"
                                  onClick={() =>
                                    this.handlePlanTypesCheck("parents")
                                  }
                                >
                                  <span className="">
                                    Senior Citizens
                                    {/* (2) */}
                                  </span>
                                </label>
                              </div>

                              <div className="">
                                <input
                                  className="c-choice c-choice--small"
                                  type="checkbox"
                                  name=""
                                  value="smes"
                                  onChange={() =>
                                    this.handlePlanTypesCheck("smes")
                                  }
                                  checked={
                                    plan_types_checked
                                      ? plan_types_checked.includes("smes")
                                      : false
                                  }
                                />
                                <label
                                  className="c-label"
                                  onClick={() =>
                                    this.handlePlanTypesCheck("smes")
                                  }
                                >
                                  <span className="">
                                    SMEs and Small Groups
                                    {/* (2) */}
                                  </span>
                                </label>
                              </div>

                              <div className="">
                                <input
                                  className="c-choice c-choice--small"
                                  type="checkbox"
                                  name=""
                                  value="corporate"
                                  onChange={() =>
                                    this.handlePlanTypesCheck("corporate")
                                  }
                                  checked={
                                    plan_types_checked
                                      ? plan_types_checked.includes("corporate")
                                      : false
                                  }
                                />
                                <label
                                  className="c-label"
                                  onClick={() =>
                                    this.handlePlanTypesCheck("corporate")
                                  }
                                >
                                  <span className="">
                                    Corporate and Large Groups
                                    {/* (2) */}
                                  </span>
                                </label>
                              </div>

                              <div className="">
                                <input
                                  className="c-choice c-choice--small"
                                  type="checkbox"
                                  name=""
                                  value="intl_coverage"
                                  onChange={() =>
                                    this.handlePlanTypesCheck("intl_coverage")
                                  }
                                  checked={
                                    plan_types_checked
                                      ? plan_types_checked.includes(
                                          "intl_coverage"
                                        )
                                      : false
                                  }
                                />
                                <label
                                  className="c-label"
                                  onClick={() =>
                                    this.handlePlanTypesCheck("intl_coverage")
                                  }
                                >
                                  <span className="">
                                    International Coverage
                                    {/* (2) */}
                                  </span>
                                </label>
                              </div>
                            </fieldset>
                          </div>
                        </div>

                        <div className="l-lg-col--6 c-plan-filter-container">
                          <div className="fill--gray-lightest padding--2">
                            <fieldset className="c-fieldset margin-top--0">
                              <legend className="c-label">Plan Range</legend>

                              <div className="">
                                <input
                                  className="c-choice c-choice--small"
                                  type="checkbox"
                                  name=""
                                  value="bronze"
                                  onChange={() =>
                                    this.handlePlanRangeCheck("bronze")
                                  }
                                  checked={
                                    plan_range_checked
                                      ? plan_range_checked.includes("bronze")
                                      : false
                                  }
                                />
                                <label
                                  className="c-label"
                                  onClick={() =>
                                    this.handlePlanRangeCheck("bronze")
                                  }
                                >
                                  <span className="">Bronze</span>
                                </label>
                              </div>

                              <div className="">
                                <input
                                  className="c-choice c-choice--small"
                                  type="checkbox"
                                  name=""
                                  value="silver"
                                  onChange={() =>
                                    this.handlePlanRangeCheck("silver")
                                  }
                                  checked={
                                    plan_range_checked
                                      ? plan_range_checked.includes("silver")
                                      : false
                                  }
                                />
                                <label
                                  className="c-label"
                                  onClick={() =>
                                    this.handlePlanRangeCheck("silver")
                                  }
                                >
                                  <span className="">Silver</span>
                                </label>
                              </div>

                              <div className="">
                                <input
                                  className="c-choice c-choice--small"
                                  type="checkbox"
                                  name=""
                                  value="gold"
                                  onChange={() =>
                                    this.handlePlanRangeCheck("gold")
                                  }
                                  checked={
                                    plan_range_checked
                                      ? plan_range_checked.includes("gold")
                                      : false
                                  }
                                />
                                <label
                                  className="c-label"
                                  onClick={() =>
                                    this.handlePlanRangeCheck("gold")
                                  }
                                >
                                  <span className="">Gold</span>
                                </label>
                              </div>

                              <div className="">
                                <input
                                  className="c-choice c-choice--small"
                                  type="checkbox"
                                  name=""
                                  value="diamond"
                                  onChange={() =>
                                    this.handlePlanRangeCheck("diamond")
                                  }
                                  checked={
                                    plan_range_checked
                                      ? plan_range_checked.includes("diamond")
                                      : false
                                  }
                                />
                                <label
                                  className="c-label"
                                  onClick={() =>
                                    this.handlePlanRangeCheck("diamond")
                                  }
                                >
                                  <span className="">Diamond</span>
                                </label>
                              </div>

                              <div className="">
                                <input
                                  className="c-choice c-choice--small"
                                  type="checkbox"
                                  name=""
                                  value="platinum"
                                  onChange={() =>
                                    this.handlePlanRangeCheck("platinum")
                                  }
                                  checked={
                                    plan_range_checked
                                      ? plan_range_checked.includes("platinum")
                                      : false
                                  }
                                />
                                <label
                                  className="c-label"
                                  onClick={() =>
                                    this.handlePlanRangeCheck("platinum")
                                  }
                                >
                                  <span className="">Platinum</span>
                                </label>
                              </div>

                              <div className="">
                                <input
                                  className="c-choice c-choice--small"
                                  type="checkbox"
                                  name=""
                                  value="platinum_plus"
                                  onChange={() =>
                                    this.handlePlanRangeCheck("platinum_plus")
                                  }
                                  checked={
                                    plan_range_checked
                                      ? plan_range_checked.includes(
                                          "platinum_plus"
                                        )
                                      : false
                                  }
                                />
                                <label
                                  className="c-label"
                                  onClick={() =>
                                    this.handlePlanRangeCheck("platinum_plus")
                                  }
                                >
                                  <span className="">Platinum Plus</span>
                                </label>
                              </div>
                            </fieldset>
                          </div>
                        </div>
                      </div>

                      <div className="l-form-row">
                        <div className="l-lg-col--6">
                          <label className="c-label">
                            <span className="font-weight--bold">
                              Search by plan ID
                              {/* (10 characters) */}
                            </span>
                          </label>
                          <input
                            className="display--inline-block c-field"
                            id="plan-id-filter"
                            name="plan-id"
                            type="text"
                            // maxLength={10}
                            placeholder="Example: HYGIND00001"
                            value={planID}
                            onChange={(e) => {
                              this.handlePlanIDChange(e.target.value);
                            }}
                          />
                          <button
                            className="c-button plan-id-search-button"
                            disabled={planID !== undefined ? false : true}
                            type="button"
                            onClick={() => {
                              //this.props.getServices();
                              this.getPlanByID(planID);
                              this.state.show_filter && this.toggleShowFilter();
                            }}
                          >
                            Search
                          </button>
                        </div>

                        <div className="l-lg-col--6">
                          <div className="hmo-filter">
                            <label className="c-label">
                              <span className="font-weight--bold">HMOs</span>
                            </label>
                            <select
                              className="c-field"
                              id="select_hmo_filter"
                              value={this.state.filter_params.hmo_selected}
                              onChange={(e) =>
                                this.handleHMOSelected(e.target.value)
                              }
                            >
                              <option value="">Select an HMO</option>
                              {this.props.hmos.map((hmo) => (
                                <option value={hmo.hmo_id}>{hmo.name}</option>
                              ))}
                            </select>
                          </div>
                        </div>
                      </div>
                      {/* 
                      <div className="l-form-row">

                        <div className="l-lg-col--6">
                          <div className="hmo-filter">
                            <label className="c-label">
                              <span className="font-weight--bold">HMOs</span>
                            </label>
                            <select
                              className="c-field"
                              id="select_hmo_filter"
                              value={this.state.filter_params.hmo_selected}
                              onChange={(e) =>
                                this.handleHMOSelected(e.target.value)
                              }
                            >
                              <option value="">Select an HMO</option>
                              {this.props.hmos.map((hmo) => (
                                <option value={hmo.hmo_id}>{hmo.name}</option>
                              ))}
                            </select>
                          </div>
                        </div>
                        
                        <div className="l-lg-col--6">
                          <div className="c-multiselect-dropdown">
                            <label className="c-label">
                              <span className="font-weight--bold">
                                Health management program
                              </span>
                            </label>

                            <div
                              className="c-multiselect-dropdown__button-wrapper"
                              tabIndex={0}
                            >
                              <button
                                aria-expanded="false"
                                className="c-field c-multiselect-dropdown__button"
                                onClick={this.toggleMedMgtProgramsMultiselect}
                                // onBlur={this.closeMedMgtProgramsMultiselect}
                                // onFocus={this.openMedMgtProgramsMultiselect}
                              >
                                Select any program
                              </button>
                              <ul
                                className={
                                  this.state.show_med_mgt_program_multiselect
                                    ? "c-multiselect-dropdown__list c-list--bare"
                                    : "display--none"
                                }
                              >
                                <li
                                  className="c-multiselect-dropdown__list-item"
                                  value="Asthma"
                                  id="asthma"
                                  onClick={() => {
                                    this.handleMedMgtProgCheck("asthma");
                                  }}
                                >
                                  <div>
                                    <input
                                      className="c-choice c-choice--small"
                                      id="asthma"
                                      type="checkbox"
                                      value="Asthma"
                                      onChange={() => {
                                        this.handleMedMgtProgCheck("asthma");
                                      }}
                                      checked={
                                        med_mgt_programs_selected
                                          ? med_mgt_programs_selected.includes(
                                              "asthma"
                                            )
                                          : false
                                      }
                                    />
                                    <label className="c-label">
                                      <span>Asthma</span>
                                    </label>
                                  </div>
                                </li>

                                <li
                                  className="c-multiselect-dropdown__list-item"
                                  value="HBP and High Cholesterol"
                                  id="hbp_and_h_cholesterol"
                                  onClick={() =>
                                    this.handleMedMgtProgCheck(
                                      "hbp_and_h_cholesterol"
                                    )
                                  }
                                >
                                  <div>
                                    <input
                                      className="c-choice c-choice--small"
                                      id="hbp_and_h_cholesterol"
                                      type="checkbox"
                                      value="HBP and High Cholesterol"
                                      checked={
                                        med_mgt_programs_selected
                                          ? med_mgt_programs_selected.includes(
                                              "hbp_and_h_cholesterol"
                                            )
                                          : false
                                      }
                                      onChange={() =>
                                        this.handleMedMgtProgCheck(
                                          "hbp_and_h_cholesterol"
                                        )
                                      }
                                    />
                                    <label className="c-label">
                                      <span>
                                        High Blood Pressure and High Cholesterol
                                      </span>
                                    </label>
                                  </div>
                                </li>
                              </ul>
                            </div>
                            {this.state.filter_params.mgt_program_selected
                              ? this.state.filter_params.mgt_program_selected.map(
                                  (item) => {
                                    return (
                                      <ul className="c-list--bare">
                                        <li className="display--inline-block">
                                          <div className="c-filter-tag">
                                            <button
                                              className="c-filter-tag__button"
                                              id="Asthma (43)-tag"
                                              onClick={() =>
                                                this.handleMedMgtProgCheck(item)
                                              }
                                            >
                                              
                                              <span className="c-filter-tag__label">
                                                {item}
                                              </span>
                                              <span className="c-filter-tag__clear-icon">
                                                <svg
                                                  className="c-clear-icon"
                                                  width="15px"
                                                  height="15px"
                                                  viewBox="0 0 15 15"
                                                  version="1.1"
                                                  xmlns="http://www.w3.org/2000/svg"
                                                  focusable="false"
                                                  role="presentation"
                                                  pointer-events="none"
                                                >
                                                  <path
                                                    className="c-clear-icon__x"
                                                    d="M14.6467778,11.2126037 C14.8818403,11.4476661 15,11.7342663 15,12.0711472 C15,12.4080282 14.8818403,12.6946283 14.6467778,12.9296908 L12.9296908,14.6467778 C12.6933713,14.8830973 12.4067711,15.001257 12.0698902,15.001257 C11.7342663,15.001257 11.4476661,14.8830973 11.2126037,14.6467778 L7.49937149,10.9348026 L3.7873963,14.6467778 C3.55233386,14.8830973 3.26573368,15.001257 2.92885276,15.001257 C2.59197184,15.001257 2.30662868,14.8830973 2.07030923,14.6467778 L0.353222157,12.9296908 C0.116902707,12.6946283 0,12.4080282 0,12.0711472 C0,11.7342663 0.116902707,11.4476661 0.353222157,11.2126037 L4.06519735,7.50062851 L0.353222157,3.78865331 C0.116902707,3.55233386 0,3.2669907 0,2.92885276 C0,2.59322886 0.116902707,2.30662868 0.353222157,2.07156624 L2.07030923,0.353222157 C2.30662868,0.118159725 2.59197184,0 2.92885276,0 C3.26573368,0 3.55233386,0.118159725 3.7873963,0.353222157 L7.49937149,4.06519735 L11.2126037,0.353222157 C11.4476661,0.118159725 11.7342663,0 12.0698902,0 C12.4067711,0 12.6933713,0.118159725 12.9296908,0.353222157 L14.6467778,2.07156624 C14.8818403,2.30662868 15,2.59322886 15,2.92885276 C15,3.2669907 14.8818403,3.55233386 14.6467778,3.78865331 L10.9348026,7.50062851 L14.6467778,11.2126037 Z"
                                                  ></path>
                                                </svg>
                                              </span>
                                            </button>
                                          </div>
                                        </li>
                                      </ul>
                                    );
                                  }
                                )
                              : ""}
                          </div>
                        </div>
                      </div>
                    */}
                    </div>

                    <div className="l-lg-col--4">
                      <div className="l-form-row">
                        <div className="l-lg-col--12 c-plan-filter-container">
                          <div className="fill--gray-lightest padding--2">
                            <fieldset className="c-fieldset margin-top--0">
                              <legend className="c-label">
                                <span className="bolden-it">
                                  {/* Health Savings Account Eligibility (HSA) */}
                                  Proximity search
                                </span>
                              </legend>
                              <div>
                                <input
                                  className="c-choice c-choice--small"
                                  type="checkbox"
                                  value="hsa-true"
                                  checked={healthSA_eligibility}
                                  onChange={() => this.handleHSAChange()}
                                />
                                <label
                                  className="c-label"
                                  onClick={() => this.handleHSAChange()}
                                >
                                  <span className="">
                                    Find plans near me ? 
                                  </span>
                                </label>

                              {location && 
                              <ul className="c-list--bare">
                                <li className="display--inline-block">
                                  <div className="c-filter-tag margin-top--0">
                                    <button
                                      className="c-filter-tag__button"
                                      //id="Asthma (43)-tag"
                                      // onClick={() =>
                                      //   this.handleMedMgtProgCheck(item)
                                      // }
                                    >
                                      {/* <span className="">Deselect</span> */}
                                      <span className="c-filter-tag__label">
                                        {`Lat,Lng: ${location}`}
                                      </span>
                                      {/* <span className="c-filter-tag__clear-icon">
                                      <svg
                                        className="c-clear-icon"
                                        width="15px"
                                        height="15px"
                                        viewBox="0 0 15 15"
                                        version="1.1"
                                        xmlns="http://www.w3.org/2000/svg"
                                        focusable="false"
                                        role="presentation"
                                        pointer-events="none"
                                      >
                                        <path
                                          className="c-clear-icon__x"
                                          d="M14.6467778,11.2126037 C14.8818403,11.4476661 15,11.7342663 15,12.0711472 C15,12.4080282 14.8818403,12.6946283 14.6467778,12.9296908 L12.9296908,14.6467778 C12.6933713,14.8830973 12.4067711,15.001257 12.0698902,15.001257 C11.7342663,15.001257 11.4476661,14.8830973 11.2126037,14.6467778 L7.49937149,10.9348026 L3.7873963,14.6467778 C3.55233386,14.8830973 3.26573368,15.001257 2.92885276,15.001257 C2.59197184,15.001257 2.30662868,14.8830973 2.07030923,14.6467778 L0.353222157,12.9296908 C0.116902707,12.6946283 0,12.4080282 0,12.0711472 C0,11.7342663 0.116902707,11.4476661 0.353222157,11.2126037 L4.06519735,7.50062851 L0.353222157,3.78865331 C0.116902707,3.55233386 0,3.2669907 0,2.92885276 C0,2.59322886 0.116902707,2.30662868 0.353222157,2.07156624 L2.07030923,0.353222157 C2.30662868,0.118159725 2.59197184,0 2.92885276,0 C3.26573368,0 3.55233386,0.118159725 3.7873963,0.353222157 L7.49937149,4.06519735 L11.2126037,0.353222157 C11.4476661,0.118159725 11.7342663,0 12.0698902,0 C12.4067711,0 12.6933713,0.118159725 12.9296908,0.353222157 L14.6467778,2.07156624 C14.8818403,2.30662868 15,2.59322886 15,2.92885276 C15,3.2669907 14.8818403,3.55233386 14.6467778,3.78865331 L10.9348026,7.50062851 L14.6467778,11.2126037 Z"
                                        ></path>
                                      </svg>
                                    </span> */}
                                    </button>
                                  </div>
                                </li>
                              </ul>
                           }
                              </div>
                            </fieldset>
                          </div>
                        </div>

                        <div className="padding--2 c-plan-filter-container">
                          <fieldset className="c-fieldset margin-top--0">
                            <legend className="c-label">
                              Medical providers
                            </legend>
                          </fieldset>
                          <a
                            className="c-button c-button--small font-weight--bold c-plan-filter-container__add-coverables qa-add-providers margin-top--1"
                            href="#"
                            onClick={this.goToProviders}
                          >
                            Add Providers
                          </a>

                          {this.props.responses.providers.map((prov) => {
                            return (
                              <ul className="c-list--bare">
                                <li className="display--inline-block">
                                  <div className="c-filter-tag">
                                    <button
                                      className="c-filter-tag__button"
                                      //id="Asthma (43)-tag"
                                      // onClick={() =>
                                      //   this.handleMedMgtProgCheck(item)
                                      // }
                                    >
                                      {/* <span className="">Deselect</span> */}
                                      <span className="c-filter-tag__label">
                                        {prov.provider_name}
                                      </span>
                                      {/* <span className="c-filter-tag__clear-icon">
                                      <svg
                                        className="c-clear-icon"
                                        width="15px"
                                        height="15px"
                                        viewBox="0 0 15 15"
                                        version="1.1"
                                        xmlns="http://www.w3.org/2000/svg"
                                        focusable="false"
                                        role="presentation"
                                        pointer-events="none"
                                      >
                                        <path
                                          className="c-clear-icon__x"
                                          d="M14.6467778,11.2126037 C14.8818403,11.4476661 15,11.7342663 15,12.0711472 C15,12.4080282 14.8818403,12.6946283 14.6467778,12.9296908 L12.9296908,14.6467778 C12.6933713,14.8830973 12.4067711,15.001257 12.0698902,15.001257 C11.7342663,15.001257 11.4476661,14.8830973 11.2126037,14.6467778 L7.49937149,10.9348026 L3.7873963,14.6467778 C3.55233386,14.8830973 3.26573368,15.001257 2.92885276,15.001257 C2.59197184,15.001257 2.30662868,14.8830973 2.07030923,14.6467778 L0.353222157,12.9296908 C0.116902707,12.6946283 0,12.4080282 0,12.0711472 C0,11.7342663 0.116902707,11.4476661 0.353222157,11.2126037 L4.06519735,7.50062851 L0.353222157,3.78865331 C0.116902707,3.55233386 0,3.2669907 0,2.92885276 C0,2.59322886 0.116902707,2.30662868 0.353222157,2.07156624 L2.07030923,0.353222157 C2.30662868,0.118159725 2.59197184,0 2.92885276,0 C3.26573368,0 3.55233386,0.118159725 3.7873963,0.353222157 L7.49937149,4.06519735 L11.2126037,0.353222157 C11.4476661,0.118159725 11.7342663,0 12.0698902,0 C12.4067711,0 12.6933713,0.118159725 12.9296908,0.353222157 L14.6467778,2.07156624 C14.8818403,2.30662868 15,2.59322886 15,2.92885276 C15,3.2669907 14.8818403,3.55233386 14.6467778,3.78865331 L10.9348026,7.50062851 L14.6467778,11.2126037 Z"
                                        ></path>
                                      </svg>
                                    </span> */}
                                    </button>
                                  </div>
                                </li>
                              </ul>
                            );
                          })}
                        </div>
{/* 
                        <div className="padding--2 c-plan-filter-container">
                          <fieldset className="c-fieldset margin-top--0">
                            <legend className="c-label">
                              Prescription Drugs
                            </legend>
                          </fieldset>
                          <a
                            className="c-button c-button--small font-weight--bold c-plan-filter-container__add-coverables qa-add-providers margin-top--1"
                            href="/find-drugs"
                          >
                            Add Drugs
                          </a>
                        </div>
                     
                      */}
                          
                        <div className="padding--2 c-plan-filter-container">
                          <fieldset className="c-fieldset margin-top--0">
                            <legend className="c-label">
                              Plan Benefits
                            </legend>
                          </fieldset>
                          <a
                            className="c-button c-button--small font-weight--bold c-plan-filter-container__add-coverables qa-add-providers margin-top--1"
                            href="/find-benefits"
                          >
                            Add Benefits
                          </a>
                        </div>
                     
                         
                        <div className="padding--2 c-plan-filter-container">
                          <fieldset className="c-fieldset margin-top--0">
                            <legend className="c-label">
                              Find Doctor
                            </legend>
                          </fieldset>
                          <a
                            className="c-button c-button--small font-weight--bold c-plan-filter-container__add-coverables qa-add-providers margin-top--1"
                            href="/find-doctors"
                          >
                            Add Doctors
                          </a>
                        </div>
                     
                      </div>
                    </div>
                  </div>
                </div>

                <div className="l-row padding-y--2 display--none md-display--block margin-top--2 fill--gray-lightest">
                  <div className="l-col--12 text-align--right">
                    <button
                      className="c-button margin-right--2 qa-close-desktop"
                      type="button"
                      onClick={() => {
                        this.toggleShowFilter();
                      }}
                    >
                      Cancel
                    </button>
                    <button
                      className="c-button c-button--secondary margin-right--2 text-transform--capitalize qa-clear-desktop"
                      type="button"
                      onClick={() => {
                        this.clearFilters();

                        //this.resetServices();
                      }}
                    >
                      Clear filters
                    </button>
                    <button
                      className="c-button c-button--success qa-apply-desktop"
                      type="button"
                      onClick={() => {
                        // this.resetServices();

                        this.getRecommendedPlans();
                      }}
                    >
                      Apply filters
                    </button>
                  </div>
                </div>

                <div className="l-col c-filter-panel-fixed-mobile-buttons fill--gray-lightest md-display--none">
                  <div className="l-row">
                    <div className="l-col--12">
                      <button
                        className="c-button c-button--success margin-top--2 qa-apply-mobile"
                        type="button"
                      >
                        Apply Filters
                      </button>
                    </div>
                  </div>

                  <div className="l-row">
                    <div className="l-col--6">
                      <button
                        className="c-button c-button--secondary margin-y--2 text-transform--capitalize qa-clear-mobile"
                        type="button"
                      >
                        Clear filters
                      </button>
                    </div>

                    <div className="l-col--6">
                      <button
                        className="c-button margin-y--2 qa-close-mobile"
                        type="button"
                        onClick={() => {
                          this.toggleShowFilter();
                        }}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <InfiniteScroll
              dataLength={this.props.infiniteScrollData.length}
              next={() => {
                this.handlePageChange(this.state.current);
              }}
              hasMore={
                data.length > 1 && this.state.maxIndex < data.length
                  ? true
                  : false
              }
              loader={<h4>Loading more plans...</h4>}
            >
              <div className="" id="plans-section">
                <ul className="c-list--bare margin-top--2 home-plans-list">
                  {apiData.length > 0 &&
                    apiData.map(
                      (plan, i) => (
                        // i >= minIndex &&
                        //  i < maxIndex && (
                        <li className="margin-bottom--4">
                          <section className="c-detail-section margin-bottom--4">
                            <article
                              className={`plan-card c-base c-fill-white c-box-shadow c--health margin-bottom--4 ${
                                plans_to_compare && plans_to_compare.includes(i)
                                  ? "c-plan-card--compare-checked"
                                  : ""
                              }
                          
                          `}
                            >
                              <div className="plan-card-inner c-clearfix">
                                <div className="plan-card__top-section display--flex justify-content--between lg-flex-wrap--nowrap flex-wrap--wrap">
                                  <div>
                                    <header className="plan-card-title">
                                      <div className="plan-c-provider font-weight--bold">
                                        {/* Hygeia */}
                                        {plan.hmo_id && plan.hmo_id.name}
                                      </div>
                                      <h2 className="plan-c-name font-weight--normal margin-y--1">
                                        <a
                                          href="#"
                                          onClick={() => {
                                            //this.goToDetails();
                                            this.getClickedPlan(i, "view");
                                          }}
                                        >
                                          {/* HyBasic */}
                                          {plan.name}
                                        </a>
                                      </h2>
                                      <ul className="c-plan-title__info c-list--bare font-size--small plan-c-info">
                                        <li
                                          className="c-plan-title__info-item"
                                          key={plan.id}
                                        >
                                          {plan.plan_id &&
                                            plan.plan_id.category &&
                                            plan.plan_id.category.map(
                                              (cat, i) => {
                                                return (
                                                  <span className="">
                                                    {" "}
                                                    {cat.name}
                                                    {plan.plan_id.category
                                                      .length > 1 &&
                                                      i <
                                                        plan.plan_id.category
                                                          .length -
                                                          1 &&
                                                      ", "}
                                                  </span>
                                                );
                                              }
                                            )}
                                        </li>
                                        <li className="c-plan-title__info-item">
                                          <span className="">
                                            <span>
                                              {/* {plan.hmo_id && plan.hmo_id.hmo_id} */}
                                              {plan.category}
                                            </span>
                                          </span>
                                        </li>
                                        <li className="c-plan-title__info-item">
                                          Plan ID:
                                          <span className="font-weight--bold">
                                            {
                                              plan.service_id
                                              // plan.plan_id && plan.plan_id.category
                                              //   ? plan.plan_id.plan_id
                                              //   : plan.plan_id
                                            }
                                          </span>
                                        </li>
                                      </ul>
                                    </header>
                                  </div>

                                  <div className="text-align--right plan-c-title-right">
                                    <div className="display--none lg-display--block plan-c-compare-button">
                                      <button
                                        id="desktop"
                                        className={`c-button c-check-button ${
                                          plans_to_compare &&
                                          // plans_to_compare.includes(i)
                                          plans_to_compare.includes(
                                            plan.service_id
                                          )
                                            ? "c-check-button--checked c-button--secondary"
                                            : ""
                                        } `}
                                        onClick={() => {
                                          //this.handleCheckedPlanToCompare(i);
                                          this.handleCheckedPlanToCompare(
                                            plan.service_id
                                          );
                                        }}
                                      >
                                        <span className="c-check-button__checkbox">
                                          <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="16"
                                            height="16"
                                            viewBox="0 0 216 146"
                                            className="check-plan display--none"
                                          >
                                            <path d="M168.86 37.966l-11.08-11.08c-1.52-1.52-3.367-2.28-5.54-2.28-2.172 0-4.02.76-5.54 2.28L93.254 80.414 69.3 56.38c-1.52-1.522-3.367-2.282-5.54-2.282-2.172 0-4.02.76-5.54 2.28L47.14 67.46c-1.52 1.522-2.28 3.37-2.28 5.542 0 2.172.76 4.02 2.28 5.54l29.493 29.493 11.08 11.08c1.52 1.52 3.368 2.28 5.54 2.28 2.173 0 4.02-.76 5.54-2.28l11.082-11.08L168.86 49.05c1.52-1.52 2.283-3.37 2.283-5.54 0-2.174-.76-4.02-2.28-5.54z"></path>
                                          </svg>
                                        </span>
                                        Compare
                                      </button>
                                    </div>
                                  </div>
                                </div>

                                <div className="plan-card__summary-section">
                                  <div className="c-plan-summary fill--gray-lightest padding--1 lg-padding--2">
                                    <div className="c-plan-summary__summary">
                                      <div id="">Estimated yearly premium</div>
                                      <div className="c-plan-summary__price">
                                        {/* 18,000 */}
                                        {"₦"}
                                        {this.numberwithCommas(
                                          this.stripNonNumeric(plan.price)
                                        )}
                                      </div>
                                      <ul className="plan-flags c-list--bare"></ul>
                                    </div>
                                    <div className="c-plan-summary__children">
                                      <div className="display--none lg-display--block c-plan-card__desktop-action-buttons margin-top--2">
                                        <a
                                          className="c-button c-button--secondary c-plan-card__action-button plan-c-card_action-button background--white"
                                          href="#"
                                          onClick={() => {
                                            //this.goToDetails();
                                            this.getClickedPlan(i, "view");
                                          }}
                                          role="button"
                                          target="_self"
                                        >
                                          View Details
                                        </a>

                                        <a
                                          className="c-button c-button--primary c-plan-card__action-button plan-c-card_action-button"
                                          href="#"
                                          role="button"
                                          target="_self"
                                          onClick={() => {
                                            this.getClickedPlan(i, "buy");
                                            this.props.toggleDataCaptureModal(
                                              true
                                            );
                                          }}
                                        >
                                          Buy This Plan
                                        </a>
                                      </div>
                                    </div>
                                  </div>
                                </div>

                                <div className="plan-card__detail-section c-clearfix display--flex flex-wrap--wrap hide-maybe">
                                  <div className="plan-card__cost-display">
                                    <div
                                      className="font-size--small font-weight--bold
                              display--flex aligh-items--center
                              "
                                    >
                                      In-patient Limit
                                      <button
                                        type="button"
                                        aria-label="Admitted patient limit"
                                        className="tooltip-trigger padding--0"
                                      >
                                        <span className="tooltip-icon-container  tooltip-hover">
                                          <FontAwesomeIcon
                                            className="mt---2"
                                            icon={faInfoCircle}
                                          />
                                        </span>
                                      </button>
                                    </div>
                                    <div className="display--flex flex-wrap--wrap plan-flex-wrap">
                                      <div className="cost-display__amount">
                                        <div className="font-size--h2">
                                          {plan.in_patient_limit == "N/A"
                                            ? "N/A"
                                            : `₦${this.numberwithCommas(
                                                this.stripNonNumeric(
                                                  plan.in_patient_limit
                                                )
                                              )}`}
                                        </div>
                                        <div className="font-size--small">
                                          Individual total
                                        </div>
                                      </div>
                                    </div>
                                  </div>

                                  <div className="plan-card__cost-display">
                                    <div
                                      className="font-size--small font-weight--bold
                              display--flex aligh-items--center"
                                    >
                                      Out-patient Limiit
                                      <button
                                        type="button"
                                        aria-label="Walk-in patient limit"
                                        className="tooltip-trigger padding--0"
                                      >
                                        <span className="tooltip-icon-container tooltip-hover">
                                          <FontAwesomeIcon
                                            className="mt---2"
                                            icon={faInfoCircle}
                                          />
                                        </span>
                                      </button>
                                    </div>

                                    <div className="display--flex flex-wrap--wrap plan-flex-wrap">
                                      <div className="cost-display__amount">
                                        <div className="font-size--h2">
                                          {plan.out_patient_limit == "N/A"
                                            ? "N/A"
                                            : `₦${this.numberwithCommas(
                                                this.stripNonNumeric(
                                                  plan.out_patient_limit
                                                )
                                              )}`}
                                        </div>
                                        <div className="font-size--small">
                                          Individual total
                                        </div>
                                      </div>
                                    </div>
                                  </div>

                                  <div className="plan-card__cost-display-yearly-cost display--flex">
                                    <div className="plan-card-cost-display--info-needed">
                                      {/* fill--gray-lightest */}
                                      <div
                                        className="font-size--small font-weight--bold
                              display--flex align-items--center"
                                      >
                                        Total Benefit Limit
                                        <button
                                          type="button"
                                          aria-label="Out-patient + In-patient Limit"
                                          className="tooltip-trigger padding--0"
                                        >
                                          <span className="tooltip-icon-container tooltip-hover">
                                            <FontAwesomeIcon
                                              className=""
                                              icon={faInfoCircle}
                                            />
                                          </span>
                                        </button>
                                      </div>
                                      <div className="font-size--h2">
                                        {plan.out_patient_limit == "N/A" ||
                                        plan.in_patient_limit == "N/A"
                                          ? "N/A"
                                          : `₦${this.numberwithCommas(
                                              this.handleTotalBenefitLimit(
                                                plan.out_patient_limit,
                                                plan.in_patient_limit
                                              )
                                            )}`}
                                        {/* ₦2,000 */}
                                      </div>
                                    </div>
                                  </div>
                                </div>

                                <div className="plan-card__detail-section c-clearfix display--flex flex-wrap--wrap hide-maybe">
                                  {/*                                   
                                  <div className="plan-card__cost-display">
                                    <div
                                      className="font-size--small font-weight--bold
                              display--flex aligh-items--center
                              "
                                    >
                                      Medical Providers
                                      <button
                                        type="button"
                                        aria-label="Tooltip: The amount you pay for covered services before the plan starts to pay."
                                        className="tooltip-trigger padding--0"
                                      >
                                        <span className="tooltip-icon-container">
                                          <FontAwesomeIcon
                                            className="mt---2"
                                            icon={faInfoCircle}
                                          />
                                        </span>
                                      </button>
                                    </div>
                                    <div className="display--flex flex-wrap--wrap plan-flex-wrap">
                                      <div className="cost-display__amount">
                                        <div className="font-size--h2">
                                          <a
                                            onClick={() =>
                                              this.goToDetails(plan.service_id)
                                            }
                                            className="c-button c-button--small font-weight--bold c-plan-filter-container__add-coverables qa-add-providers margin-top--1"
                                            //href={`/details/id/${plan.service_id}/#providers`}
                                            href="#"
                                          >
                                            {this.props.responses.providers
                                              .length > 0
                                              ? `View All ${
                                                  plan.hmo_id.providers
                                                    ? plan.hmo_id.providers
                                                        .length
                                                    : ""
                                                } Providers`
                                              : `View Providers (${
                                                  plan.hmo_id.providers
                                                    ? plan.hmo_id.providers
                                                        .length
                                                    : ""
                                                })`}
                                          </a>
                                        </div>
                                        
                                        {this.props.responses.providers.length >
                                          0 && (
                                          <ul className="c-status-list c-list--bare">
                                            {
                                              this.props.responses.providers.map(
                                                (provider) => {
                                                  providersArr = plan.hmo_id.providers.map(
                                                    (prvdr) =>
                                                      prvdr.provider_name
                                                  );
                                                  console.log(
                                                    "provider.provider_name",
                                                    provider.provider_name
                                                  );
                                                  console.log(
                                                    "providersArr",
                                                    providersArr
                                                  );

                                                  return (
                                                    <li className="c-status-list__item font-size--small">
                                                      <img
                                                        src={
                                                          providersArr.includes(
                                                            provider.provider_name
                                                          )
                                                            ? check
                                                            : uncheck
                                                        }
                                                        className="c-status-list__item__icon"
                                                      />
                                                      <span className="text-transform--capitalize">
                                                        {provider.provider_name}
                                                      </span>
                                                    </li>
                                                  );
                                                }
                                              )
                                            }
                                          </ul>
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                  */}
                                  {/* 
                                  <div className="plan-card__cost-display">
                                    <div
                                      className="font-size--small font-weight--bold
                              display--flex aligh-items--center"
                                    >
                                      Hospital Category
                                      <button
                                        type="button"
                                        aria-label="Tooltip: The amount you pay for covered services before the plan starts to pay."
                                        className="tooltip-trigger padding--0"
                                      >
                                        <span className="tooltip-icon-container">
                                          <FontAwesomeIcon
                                            className="mt---2"
                                            icon={faInfoCircle}
                                          />
                                        </span>
                                      </button>
                                    </div>

                                    <div className="display--flex flex-wrap--wrap plan-flex-wrap">
                                      <div className="cost-display__amount">
                                        <div className="font-size--h2">
                                          {plan.hospital_category[0].name
                                            ? plan.hospital_category[0].name
                                            : "N/A"}
                                        </div>
                                        
                                      </div>
                                    </div>
                                  </div>
 */}

                                  <div className="plan-card__cost-display">
                                    <div
                                    //  className="plan-card-cost-display--info-needed"
                                    >
                                      {/* fill--gray-lightest */}
                                      <div
                                        className="font-size--small font-weight--bold
                              display--flex align-items--center"
                                      >
                                        Hospital Category
                                        <button
                                          type="button"
                                          aria-label="The category of hospitals that provide this plan."
                                          className="tooltip-trigger padding--0"
                                        >
                                          <span className="tooltip-icon-container tooltip-hover">
                                            <FontAwesomeIcon
                                              className=""
                                              icon={faInfoCircle}
                                            />
                                          </span>
                                        </button>
                                      </div>
                                      <div className="font-size--h2">
                                        {plan.hospital_category[0].name
                                          ? plan.hospital_category[0].name
                                          : "N/A"}
                                        {/* ₦2,000 */}
                                      </div>
                                    </div>
                                  </div>

                                  <div className="plan-card__cost-display">
                                    <div
                                    //  className="plan-card-cost-display--info-needed"
                                    >
                                      {/* fill--gray-lightest */}
                                      <div
                                        className="font-size--small font-weight--bold
                              display--flex align-items--center"
                                      >
                                        Region of Cover
                                        <button
                                          type="button"
                                          aria-label="The region of cover can be either local or international."
                                          className="tooltip-trigger padding--0"
                                        >
                                          <span className="tooltip-icon-container tooltip-hover">
                                            <FontAwesomeIcon
                                              className=""
                                              icon={faInfoCircle}
                                            />
                                          </span>
                                        </button>
                                      </div>
                                      <div className="font-size--h2">
                                        {plan.cover_region
                                          ? plan.cover_region
                                          : "N/A"}
                                        {/* ₦2,000 */}
                                      </div>
                                    </div>
                                  </div>

                                  <div className="plan-card__cost-display-yearly-cost display--flex">
                                    <div
                                    //  className="plan-card-cost-display--info-needed"
                                    >
                                      {/* fill--gray-lightest */}
                                      <div
                                        className="font-size--small font-weight--bold
                              display--flex align-items--center"
                                      >
                                        Medical Providers
                                        <button
                                          type="button"
                                          aria-label="Hospitals networks under the plan"
                                          className="tooltip-trigger padding--0"
                                        >
                                          <span className="tooltip-icon-container tooltip-hover">
                                            <FontAwesomeIcon
                                              className=""
                                              icon={faInfoCircle}
                                            />
                                          </span>
                                        </button>
                                      </div>
                                      <div className="font-size--h2">
                                        <div className="font-size--h2">
                                          <a
                                            onClick={() => {
                                              this.goToPlanProviders(
                                                plan.service_id
                                              );
                                              this.props.togglePlanProviders();
                                            }}
                                            className="c-button c-button--small font-weight--bold c-plan-filter-container__add-coverables qa-add-providers margin-top--1"
                                            //href={`/details/id/${plan.service_id}/#providers`}
                                            // href="#"
                                          >
                                            {this.props.responses.providers
                                              .length > 0
                                              ? `View All ${
                                                  plan.hmo_id.providers
                                                    ? plan.hmo_id.providers
                                                        .length
                                                    : ""
                                                } Providers`
                                              : `View Providers (${
                                                  plan.hmo_id.providers
                                                    ? plan.hmo_id.providers
                                                        .length
                                                    : ""
                                                })`}
                                          </a>
                                        </div>

                                        {this.props.responses.providers.length >
                                          0 && (
                                          <ul className="c-status-list c-list--bare">
                                            {this.props.responses.providers.map(
                                              (provider) => {
                                                providersArr =
                                                  plan.hmo_id.providers.map(
                                                    (prvdr) =>
                                                      prvdr.provider_name
                                                  );
                                                console.log(
                                                  "provider.provider_name",
                                                  provider.provider_name
                                                );
                                                console.log(
                                                  "providersArr",
                                                  providersArr
                                                );

                                                return (
                                                  <li className="c-status-list__item font-size--small">
                                                    <img
                                                      src={
                                                        providersArr.includes(
                                                          provider.provider_name
                                                        )
                                                          ? check
                                                          : uncheck
                                                      }
                                                      className="c-status-list__item__icon"
                                                    />
                                                    <span className="text-transform--capitalize">
                                                      {provider.provider_name}
                                                    </span>
                                                  </li>
                                                );
                                              }
                                            )}
                                          </ul>
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                </div>

                                {/* 
                              <div
                                className="plan-card__detail-section c-clearfix display--flex flex-wrap--wrap
                          display--none sm-display--block
                          "
                              >
                                <div className="font-size--small font-weight--bold display--flex align-items--center">
                                  Benefit Limits
                                  <button
                                    type="button"
                                    aria-label="Tooltip: Limits on Coverage"
                                    className="tooltip-trigger padding--0"
                                  >
                                    <span className="tooltip-icon-container">
                                      <FontAwesomeIcon
                                        className="mt---2"
                                        icon={faInfoCircle}
                                      />
                                    </span>
                                  </button>
                                </div>
                                <div className="limits-row font-size--small">
                                  <div className="limits-col--6 limits-lg-col--3 padding-top--1">
                                    <div className="font-weight--bold color--gray">
                                      In-patient Limit
                                    </div>
                                    <div className="">
                                      {plan.in_patient_limit == "N/A"
                                        ? "N/A"
                                        : `₦${this.numberwithCommas(
                                            this.stripNonNumeric(
                                              plan.in_patient_limit
                                            )
                                          )}`}
                                    </div>
                                  </div>

                                  <div className="limits-col--6 limits-lg-col--3 padding-top--1">
                                    <div className="font-weight--bold color--gray">
                                      Out-patient Limit
                                    </div>
                                    <div className="">
                                      {plan.out_patient_limit == "N/A"
                                        ? "N/A"
                                        : `₦${this.numberwithCommas(
                                            this.stripNonNumeric(
                                              plan.out_patient_limit
                                            )
                                          )}`}
                                    </div>
                                  </div>

                                  <div className="limits-col--6 limits-lg-col--3 padding-top--1">
                                    <div className="font-weight--bold color--gray">
                                      Age Limit
                                    </div>
                                    <div className="">
                                      Not yet in Collection
                                    </div>
                                  </div>

                                  <div className="limits-col--6 limits-lg-col--3 padding-top--1">
                                    <div className="font-weight--bold color--gray">
                                      Plan Range
                                    </div>
                                    <div className="">{plan.category}</div>
                                  </div>
                                </div>
                              </div>
    */}
                                <div className="plan-card__detail-section border--0 c-clearfix display--flex flex-wrap--wrap">
                                  <div className="plan-card__plan-features-container">
                                    <div className="col--12">
                                      <div className="font-size--small font-weight--bold">
                                        Plan features
                                      </div>
                                      <div className="plan_feat_cont">
                                        <ul className="c-status-list c-list--bare feature-col">
                                          <li className="c-status-list__item font-size--small">
                                            <img
                                              src={
                                                plan.surgeries !== "No" &&
                                                plan.surgeries !== ""
                                                  ? check
                                                  : uncheck
                                              }
                                              className="c-status-list__item__icon"
                                            />
                                            <span className="text-transform--capitalize">
                                              Surgeries
                                            </span>
                                          </li>
                                          <li className="c-status-list__item font-size--small">
                                            <img
                                              src={
                                                plan.telemedicine !== "No" &&
                                                plan.telemedicine !== ""
                                                  ? check
                                                  : uncheck
                                              }
                                              className="c-status-list__item__icon"
                                            />
                                            <span className="text-transform--capitalize">
                                              Telemedicine
                                            </span>
                                          </li>
                                          <li className="c-status-list__item font-size--small">
                                            <img
                                              src={
                                                plan.congenital_abnormalities !==
                                                  "No" &&
                                                plan.congenital_abnormalities !==
                                                  ""
                                                  ? check
                                                  : uncheck
                                              }
                                              className="c-status-list__item__icon"
                                            />
                                            <span className="text-transform--capitalize">
                                              Congenital Abnormalities
                                            </span>
                                          </li>{" "}
                                        </ul>

                                        <div className="feature-col">
                                          <ul className="c-status-list c-list--bare">
                                            <li className="c-status-list__item font-size--small">
                                              <img
                                                src={
                                                  plan.hospital_admissions !==
                                                    "No" &&
                                                  plan.hospital_admissions !==
                                                    ""
                                                    ? check
                                                    : uncheck
                                                }
                                                className="c-status-list__item__icon"
                                              />
                                              <span className="text-transform--capitalize">
                                                Hospital Admissions
                                              </span>
                                            </li>

                                            <li className="c-status-list__item font-size--small">
                                              <img
                                                src={
                                                  plan.optical_care !== "No" &&
                                                  plan.optical_care !== ""
                                                    ? check
                                                    : uncheck
                                                }
                                                className="c-status-list__item__icon"
                                              />
                                              <span className="text-transform--capitalize">
                                                Optical Care
                                              </span>
                                            </li>

                                            <li className="c-status-list__item font-size--small">
                                              <img
                                                src={
                                                  plan.lab_investigations !==
                                                    "No" &&
                                                  plan.lab_investigations !== ""
                                                    ? check
                                                    : uncheck
                                                }
                                                className="c-status-list__item__icon"
                                              />
                                              <span className="text-transform--capitalize">
                                                Lab Investigations
                                              </span>
                                            </li>
                                          </ul>
                                        </div>

                                        <div className="feature-col">
                                          <ul className="c-status-list c-list--bare">
                                            <li className="c-status-list__item font-size--small">
                                              <img
                                                src={
                                                  plan.accidents_emergencies !==
                                                    "No" &&
                                                  plan.accidents_emergencies !==
                                                    ""
                                                    ? check
                                                    : uncheck
                                                }
                                                className="c-status-list__item__icon"
                                              />
                                              <span className="text-transform--capitalize">
                                                Accidents & Emergencies
                                              </span>
                                            </li>

                                            <li className="c-status-list__item font-size--small">
                                              <img
                                                src={
                                                  plan.cancer_care !== "No" &&
                                                  plan.cancer_care !== ""
                                                    ? check
                                                    : uncheck
                                                }
                                                className="c-status-list__item__icon"
                                              />
                                              <span className="text-transform--capitalize">
                                                Cancer Care
                                              </span>
                                            </li>
                                            <li className="c-status-list__item font-size--small">
                                              <img
                                                src={
                                                  plan.covid_19_treatment !==
                                                    "No" &&
                                                  plan.covid_19_treatment !== ""
                                                    ? check
                                                    : uncheck
                                                }
                                                className="c-status-list__item__icon"
                                              />
                                              <span className="text-transform--capitalize">
                                                Covid 19 Treatment
                                              </span>
                                            </li>
                                          </ul>
                                        </div>
                                      </div>
                                    </div>
                                  </div>

                                  {/* 
                                  <div className="prov-cat">
                                    <div className="margin-right--1 prov-num">
                                      <div
                                        className={`${
                                          window.screen.width > 500
                                            ? "plan-card-cost-display--info-needed"
                                            : "col--12  margin-y--1"
                                        }`}
                                      >
                                        
                                        <div className="justify-content--center display--flex">
                                          <div
                                            className="font-size--small font-weight--bold
                              display--flex aligh-items--center
                              "
                                          >
                                            Medical providers
                                          </div>
                                        </div>
                                        <div className="font-size--h2">
                                          <a
                                            onClick={() =>
                                              this.goToDetails(plan.service_id)
                                            }
                                            className="c-button c-button--small font-weight--bold c-plan-filter-container__add-coverables qa-add-providers margin-top--1"
                                            //href={`/details/id/${plan.service_id}/#providers`}
                                            href="#"
                                          >
                                            {this.props.responses.providers
                                              .length > 0
                                              ? `View All ${
                                                  plan.hmo_id.providers
                                                    ? plan.hmo_id.providers
                                                        .length
                                                    : ""
                                                } Providers`
                                              : `View Providers (${
                                                  plan.hmo_id.providers
                                                    ? plan.hmo_id.providers
                                                        .length
                                                    : ""
                                                })`}
                                          </a>

                               
                                        </div>
                                        {this.props.responses.providers.length >
                                          0 && (
                                          <ul className="c-status-list c-list--bare">
                                            {
                                              // this.props.responses.providers
                                              //   .filter((prov) => {
                                              //     let namesArr = plan.hmo_id.providers.map(
                                              //       (prvdr) => prvdr.provider_name
                                              //     );

                                              //     return namesArr.includes(
                                              //       prov.provider_name
                                              //     );
                                              //   });

                                              this.props.responses.providers.map(
                                                (provider) => {
                                                  providersArr = plan.hmo_id.providers.map(
                                                    (prvdr) =>
                                                      prvdr.provider_name
                                                  );
                                                  console.log(
                                                    "provider.provider_name",
                                                    provider.provider_name
                                                  );
                                                  console.log(
                                                    "providersArr",
                                                    providersArr
                                                  );

                                                  return (
                                                    <li className="c-status-list__item font-size--small">
                                                      <img
                                                        src={
                                                          providersArr.includes(
                                                            provider.provider_name
                                                          )
                                                            ? check
                                                            : uncheck
                                                        }
                                                        className="c-status-list__item__icon"
                                                      />
                                                      <span className="text-transform--capitalize">
                                                        {provider.provider_name}
                                                      </span>
                                                    </li>
                                                  );
                                                }
                                              )
                                            }
                                          </ul>
                                        )}
                                      </div>
                                    </div>

                                    <div className="prov-category">
                                      <div
                                        className={`${
                                          window.screen.width > 500
                                            ? "plan-card-cost-display--info-needed"
                                            : "col--12"
                                        }`}
                                      >
                                        
                                        <div
                                          className="font-size--small font-weight--bold
                              display--flex aligh-items--center
                              "
                                        >
                                          Hospital Category
                                          
                                        </div>

                                        <div className="font-size--h2">
                                          {plan.hospital_category[0].name
                                            ? plan.hospital_category[0].name
                                            : "N/A"}
                                          
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                 */}
                                </div>
                                <div className="lg-display--none margin-top--2">
                                  <button
                                    className={`c-button c-check-button ${
                                      plans_to_compare &&
                                      // plans_to_compare.includes(i)
                                      plans_to_compare.includes(plan.service_id)
                                        ? "c-check-button--checked c-button--secondary"
                                        : ""
                                    } `}
                                    onClick={() => {
                                      // this.handleCheckedPlanToCompare(i);
                                      this.handleCheckedPlanToCompare(
                                        plan.service_id
                                      );
                                    }}
                                  >
                                    <span
                                      className="c-check-button__checkbox"
                                      aria-hidden="true"
                                    >
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="16"
                                        height="16"
                                        viewBox="0 0 216 146"
                                        className="check-plan display--none"
                                      >
                                        <path d="M168.86 37.966l-11.08-11.08c-1.52-1.52-3.367-2.28-5.54-2.28-2.172 0-4.02.76-5.54 2.28L93.254 80.414 69.3 56.38c-1.52-1.522-3.367-2.282-5.54-2.282-2.172 0-4.02.76-5.54 2.28L47.14 67.46c-1.52 1.522-2.28 3.37-2.28 5.542 0 2.172.76 4.02 2.28 5.54l29.493 29.493 11.08 11.08c1.52 1.52 3.368 2.28 5.54 2.28 2.173 0 4.02-.76 5.54-2.28l11.082-11.08L168.86 49.05c1.52-1.52 2.283-3.37 2.283-5.54 0-2.174-.76-4.02-2.28-5.54z"></path>
                                      </svg>
                                    </span>
                                    Compare
                                  </button>
                                  <div className="c-plan-card__mobile-action-buttons">
                                    <a
                                      className="c-button c-button--secondary c-plan-card__action-button background--white"
                                      href="#"
                                      onClick={() => {
                                        //this.goToDetails();
                                        this.getClickedPlan(i, "view");
                                      }}
                                      target="_self"
                                      role="button"
                                    >
                                      View Details
                                    </a>
                                    <a
                                      className="c-button c-button--primary c-plan-card__action-button"
                                      href="#"
                                      target="_self"
                                      onClick={() => {
                                        this.getClickedPlan(i, "buy");
                                        this.props.toggleDataCaptureModal(true);
                                      }}
                                      role="button"
                                    >
                                      Buy This Plan
                                    </a>
                                  </div>
                                </div>
                              </div>
                            </article>

                            {/* );
                         })}{" "} */}
                          </section>{" "}
                        </li>
                      )
                      // )
                      //)
                    )}
                </ul>

                {/* <div className="pag-div">
                  <Pagination
                    total={data.length}
                    showTotal={(total, range) =>
                      `${range[0]} - ${range[1]} of ${total} items`
                    }
                    // defaultPageSize={pageSize}
                    //defaultCurrent={1}
                    pageSize={pageSize}
                    current={current}
                    onChange={this.handlePageChange}
                  />
                </div> */}
              </div>
            </InfiniteScroll>
          </div>
        ) : (
          // <Spin indicator={antIcon} className="large-loader" />
          <Spin size="large" className="large-loader" />
        )}
      </div>
    );
  }
}

export default NewContent;
