import React from "react";
import {
  Button,
  Row,
  Col,
  Steps,
  message,
  AutoComplete,
  Form,
  Slider,
} from "antd";
import {
  faShieldAlt,
  faArrowLeft,
  faSmile,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import styles from "../../pages/home/Home.module.scss";
import "../../custom.css";
import Modal from "react-bootstrap/Modal";

import * as actions from "../../utils/actions";

import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";

import hospitalsvg from "../../svgs/hospitals.svg";
import ratiosvg from "../../svgs/claim_ratio.svg";

import starfilled from "../../svgs/starfilled.svg";
import star from "../../svgs/star.svg";
import check from "../../svgs/check.svg";

import HMOInfoSkeleton from "../../components/skeletons/SkeletonHMOInfo";

import * as home_utils from "../../utils/homeUtils";

import { state } from "./state";

import "./new-design.css";

import searching from "../../imgs/searching.svg";

import { formatAsCurrency } from "../../utils";

const { Step } = Steps;

export interface homeProps {
  [x: string]: any;
  dispatch(args: any): any;
}

export interface homeState {}

class NewContent extends React.Component<homeProps, homeState> {
  constructor(props) {
    super(props);
    this.handleType = this.handleType.bind(this);
    this.decrementSonCount = this.decrementSonCount.bind(this);
    this.incrementSonCount = this.incrementSonCount.bind(this);
    this.decrementDaughterCount = this.decrementDaughterCount.bind(this);
    this.incrementDaughterCount = this.incrementDaughterCount.bind(this);
    //this.goToDetails = this.goToDetails.bind(this);
    this.handlePhone = this.handlePhone.bind(this);
    //this.handleSticky = this.handleSticky.bind(this);
    // this.toggleMedMgtProgramsMultiselect = this.toggleMedMgtProgramsMultiselect.bind(
    //   this
    // );
  }
  state = {
    is_phone_valid: "null",
    show_provider_info: false,
    provider_info: [],
    filter_plans_by_hmo: false,
    provider_plans: [],
    show_desktop_on_load_modal: false,
    show_mobile_on_load_modal: false,
    show_desktop_home_frm: true,
    type_selected: "medium",
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
      planID: undefined,
      hmo_selected: undefined,
      mgt_program_selected: [],
      providers_selected: [],
      prescriptions_selected: [],
      healthSA_eligibility: false,
    },
  };

  toggleModal = () => {
    if (this.state.show_desktop_on_load_modal) {
      this.closeDesktopOnLoadModal();
    }
    this.props.dispatch({
      type: actions.TOGGLE_DESKTOP_MODAL,
      data: { key: "isOpen", value: !this.props.isOpen },
    });
  };

  mobileToggleModal = () => {
    // if (
    //   !this.props.responses.phone_num ||
    //   this.props.responses.phone_num.length < 14
    // ) {
    //   message.error("Please enter your phone number");
    //   return;
    // } else {
    this.props.dispatch({
      type: actions.TOGGLE_MOBILE_MODAL,
      data: {
        key: "isMobileViewModalOpen",
        value: !this.props.isMobileViewModalOpen,
      },
    });
    // }
  };

  toggleOthersInput = () => {
    this.props.dispatch({
      type: actions.TOGGLE_OTHERS_MODAL,
      data: { key: "isOthersInputOpen", value: !this.props.isOthersInputOpen },
    });
  };

  changePage = (action: string) => {
    this.props.dispatch({ type: actions.CHANGE_PAGE, data: action });
  };

  hmoBannerDiv(hmoId) {
    let hmoArr;

    if (hmoId !== "hygeia") {
      hmoArr = home_utils.hmos.filter((hmo) => hmo["id"] == hmoId);
    } else {
      hmoArr = home_utils.hmos.filter((hmo) => hmo["id"] == "1");
    }

    //console.log"hmoArr", hmoArr);

    let data;
    if (hmoId) {
      if (hmoId !== "hygeia") {
        data = this.props.hmos.filter((hmo) => hmo.name.id == hmoArr[0].name);
      } else {
        data = this.props.hmos.filter((hmo) => hmo.name.id == "1");
      }

      //console.log"data", data);

      return (
        <Col
          xs={24}
          md={14}
          className=" left-side-info banner-container provider-banner"
        >
          <div className="svg-and-text provider-data">
            <div className="hmo-svg-img svg-img">
              <img src={data[0].logo}></img>
            </div>

            <div className={styles.bannerContent} id="bannertext">
              <p className={styles.textHeading}>
                {this.props.provider_info["title"]}
              </p>
            </div>
          </div>

          <div className="banner-bottom">
            <div className="row col-md-12">
              <div className="col-md-4 card mr-3">
                <img src={hospitalsvg} className="banner-icon" />
                <div className="card-text">
                  <p>Hospital Network</p>
                  <h5>
                    {data[0].provider_id
                      ? JSON.parse(data[0].provider_id).length
                      : ""}
                  </h5>
                </div>
              </div>
              <div className="col-md-4 card mr-3">
                <span className="naira banner-icon">₦</span>
                <div className="card-text">
                  <p>Plans Starting from</p>
                  <h5>
                    {this.numberwithCommas(this.props.cheapest_plan_by_hmo)}
                  </h5>
                </div>
              </div>
              <div className="col-md-4 card">
                <img src={ratiosvg} className="banner-icon" />
                <div className="card-text">
                  <p>Claim Ratio</p>
                  {/* <h5>{`${
                    (this.props.provider_plans.length /
                      this.props.plans.length) *
                    100
                  }%`}</h5> */}

                  <h5>{`${
                    (this.props.provider_plans.length / state.plans.length) *
                    100
                  }%`}</h5>
                </div>
              </div>
            </div>
          </div>
        </Col>
      );
    }
  }

  homeBannerDiv() {
    return (
      <Col xs={24} md={14} className="banner-container  left-side-info">
        <div className="view2-svg-and-text svg-and-text">
          <Col xs={24} md={24} className="svg-img-div">
            <div className="svg-img home-svg-img">
              <img
                src={searching}
                // "images/searching.svg"
              ></img>
              <p className="tiny-descrptn">
                Find HMO Plans Starting from{" "}
                <span className={styles.headingSpan}>
                  {
                    // this.props.plans.length == 0 && "..."
                    state.plans.length == 0 && "..."
                  }
                  {
                    // this.props.plans.length > 0
                    state.plans.length > 0 &&
                      ` ₦${this.numberwithCommas(this.props.cheapest_plan)}`
                  }
                  /year
                </span>
              </p>
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
                    {
                      // this.props.plans.length == 0
                      state.plans.length == 0 && "..."
                    }
                    {
                      // this.props.plans.length > 0
                      state.plans.length > 0 &&
                        ` ₦${this.numberwithCommas(this.props.cheapest_plan)}`
                    }
                    /year
                  </span>
                </p>
              </div>
            </div>
          </Col>
        </div>

        <div className="banner-bottom home-banner-bottom">
          <div className="row col-md-12">
            <div className="col-md-4 card mr-3">
              <FontAwesomeIcon className="banner-icon" icon={faShieldAlt} />
              <div className="card-text">
                <h5>Compare</h5>
                <p>HMO Plans</p>
              </div>
            </div>
            <div className="col-md-4 card mr-3">
              <span className="naira banner-icon">₦</span>
              <div className="card-text">
                <h5>Purchase</h5>
                <p>HMO Plans</p>
              </div>
            </div>
            <div className="col-md-4 card">
              <FontAwesomeIcon className="far banner-icon" icon={faSmile} />
              <div className="card-text">
                <h5>Insure</h5>
                <p>You & your family</p>
              </div>
            </div>
          </div>
        </div>
      </Col>
    );
  }

  numberwithCommas = (value) => {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  preventDefault(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
  }

  handlePhone(val) {
    if (val) {
      //console.log"val.length", val.length, "val", val);
      if (val.toString().length == 14) {
        this.setState({
          is_phone_valid: true,
        });
      } else if (val.toString().length > 0 && val.toString().length < 14) {
        this.setState({
          is_phone_valid: false,
        });
      }

      this.props.dispatch({
        type: actions.UPDATE_PHONE,
        data: { key: "phone_num", value: val },
      });
    }
  }

  defaultGender() {
    return true;
  }

  handleGender(val) {
    // this.setState ({
    //   gender: val
    // })
    // console.log('this:', this, "this.props:", this.props)
    this.props.dispatch({
      type: actions.UPDATE_GENDER,
      data: { key: "gender", value: val },
    });
  }

  handleFullName(val) {
    this.props.dispatch({
      type: actions.UPDATE_FULL_NAME,
      data: { key: "full_name", value: val },
    });
  }

  handleDesktopView() {
    // this.setState({
    //   isDesktopView: !this.props.isDesktopView,
    // });
    this.props.dispatch({
      type: actions.TOGGLE_DESKTOP_VIEW,
      data: { key: "isDesktopView", value: false },
    });
  }

  submitResponses() {
    let stringResp: any = JSON.stringify(this.props.responses);

    //console.log"this.props.responses", this.props.responses);
    localStorage.setItem("responses", stringResp);
    this.props.history.push({
      //pathname: "/compare",
      pathname: "/plans",
      data: this.props.responses,
    });
  }

  handleNavigation = (e: any) => {
    let currentPage = this.props.page;
    // console.log("currentPage:", currentPage);
    const targetId = e.target.id;
    // if (
    //   !this.props.responses.phone_num ||
    //   this.props.responses.phone_num.length < 14
    // ) {
    //   message.error("Please enter your phone number");
    //   return;
    // }
    if (targetId === "next") {
      //console.log('this.props.isDesktopView', this.props.isDesktopView);
      if (this.props.isMobileViewModalOpen) {
        if (currentPage == 4) {
          if (this.props.responses.state == "") {
            message.error("Please provide a location");
            return;
          } else {
            this.props.fetchRecommendedPlans();
          }
        }
      }
      if (currentPage == 3 && this.props.isDesktopView) {
        if (this.props.responses.state == "") {
          message.error("Please provide a location");
          return;
        } else {
          this.fetchRecommendedPlans();
        }
      }

      if (this.props.isDesktopView) {
        currentPage = currentPage + 1;
      }

      if (currentPage >= this.props.maxPage) {
        this.submitResponses();
        return;
      }

      this.changePage("next");
      // console.log('changePage("next")', this.props.page);
    } else if (targetId === "prev") {
      if (currentPage <= this.props.minPage) {
        // console.log("currentPage <= this.props.minPage");
        return;
      }
      this.changePage("prev");
      // console.log('changePage("prev")', this.props.page);
    }
  };

  handleNumOfPeopleCount() {
    // if (this.props.responses.type != "single") {
    //   this.props.dispatch({
    //     type: actions.RESET_NUM_OF_PEOPLE,
    //   });
    // }

    if (this.props.responses.type == "couple") {
      this.props.dispatch({
        type: actions.UPDATE_NUM_OF_PEOPLE,
        data: 1,
      });
    } else if (this.props.responses.type == "fam-of-4") {
      this.props.dispatch({
        type: actions.UPDATE_NUM_OF_PEOPLE,
        data: 3,
      });
    } else if (this.props.responses.type == "fam-of-3") {
      this.props.dispatch({
        type: actions.UPDATE_NUM_OF_PEOPLE,
        data: 2,
      });
    } else if (this.props.responses.type == "parents") {
      this.props.dispatch({
        type: actions.UPDATE_NUM_OF_PEOPLE,
        data: 1,
      });
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
        //console.log("ages[i]", ages[i]);
        if (parseInt(ages[i]) !== 0) {
          this.props.dispatch({
            type: actions.UPDATE_NUM_OF_PEOPLE,
            data: 1,
          });
        }
      }
    }

    // console.log(
    //   `
    //   this.props.responses.num_of_people
    //   `,
    //   this.props.responses.num_of_people
    // );
  }

  async fetchRecommendedPlans() {
    this.handleNumOfPeopleCount();
    let rec_plans: object[] = [];
    let family_plans: object[] = [];
    let individual_plans: object[] = [];

    this.props.dispatch({
      type: actions.IS_FETCHING_RECOMMENDED_PLANS,
      data: true,
    });
    let res = await this.props.plans;

    if (res) {
      if (res.length !== 0) {
        for (let i = 0; i < res.length; i++) {
          if (
            //this.props.responses.num_of_people == 1 &&
            res[i].category_id.id == "personal"
          ) {
            individual_plans.push(res[i]);
          }

          if (
            //this.props.responses.num_of_people > 1 &&
            res[i].category_id.id == "famiy"
          ) {
            family_plans.push(res[i]);
          }
        }

        this.props.dispatch({
          type: actions.GET_NUM_OF_PEOPLE,
          data: this.props.quiz.responses.num_of_people,
        });

        if (
          //this.props.responses.num_of_people === 1 ||
          this.props.quiz.responses.type == "single"
        ) {
          rec_plans = individual_plans;
        } else if (this.props.quiz.responses.type !== "single") {
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
  }

  handleType(val) {
    //let id = document.getElementById(val.target.id) as HTMLInputElement;

    this.props.dispatch({
      type: actions.UPDATE_TYPE,
      data: {
        key: "type",
        value: val.target.id,
      },
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

  handleSonBoxChecked() {
    //console.logthis);
    this.props.dispatch({
      type: actions.UPDATE_SON_CHECKED,
      data: {
        key: "isSonCheckboxChecked",
        value: !this.props.isSonCheckboxChecked,
      },
    });
  }

  handleDaughterBoxChecked() {
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

    //console.log"this.props.sonCount", this.props.sonCount);
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
    //console.logval);
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
                this.handleSpouseAge(e.target.value);
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
                  this.handleChild1Age(e.target.value);
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
                  this.handleChild2Age(e.target.value);
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
                  this.handleChild3Age(e.target.value);
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
                  this.handleChild4Age(e.target.value);
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
                  this.handleChild5Age(e.target.value);
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
                  this.handleChild6Age(e.target.value);
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
                  this.handleChild7Age(e.target.value);
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
                  this.handleChild8Age(e.target.value);
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
                this.handleFatherAge(e.target.value);
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
                this.handleMotherAge(e.target.value);
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
                this.handleGrandFatherAge(e.target.value);
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
                this.handleGrandMotherAge(e.target.value);
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
                this.handleFatherInLawAge(e.target.value);
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
                this.handleMotherInLawAge(e.target.value);
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
            this.handleIndividualAge(e.target.value);
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
              this.handleSpouseAge(e.target.value);
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
              this.handleChild1Age(e.target.value);
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
              this.handleFatherAge(e.target.value);
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
            this.handleSpouseAge(e.target.value);
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
              this.handleSpouseAge(e.target.value);
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
              this.handleChild1Age(e.target.value);
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
      this.props.dispatch({
        type: actions.FILTER_LOCATIONS,
        data: tempLocations,
      });
    }
  };

  onSelectChange = (value: any) => {
    this.props.dispatch({
      type: actions.UPDATE_TEXT_RESPONSE,
      data: { key: "state", value },
    });
    //console.logthis.props.responses.state);
  };

  updateLocation = (location: any) => {
    this.props.dispatch({
      type: actions.UPDATE_TEXT_RESPONSE,
      data: { key: "state", value: location },
    });
    //console.logthis.props.responses.state);
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
                  className="radio-group-num"
                  defaultChecked={this.props.responses.type === "single"}
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
                  defaultChecked={this.props.responses.type === "couple"}
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
                  defaultChecked={this.props.responses.type === "fam-of-3"}
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
                  defaultChecked={this.props.responses.type === "fam-of-4"}
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
                  defaultChecked={this.props.responses.type === "parents"}
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
                  defaultChecked={this.props.responses.type === "others"}
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
                  className="radio-group-num"
                  defaultChecked={this.props.responses.type === "single"}
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
                  defaultChecked={this.props.responses.type === "couple"}
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
                  defaultChecked={this.props.responses.type === "fam-of-3"}
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
                  defaultChecked={this.props.responses.type === "fam-of-4"}
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
                  defaultChecked={this.props.responses.type === "parents"}
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
                  defaultChecked={this.props.responses.type === "others"}
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

  goToDetails() {
    this.props.history.push({ pathname: "/details" });
  }

  getClickedPlan = (index) => {
    //console.log"index", index);
    this.props.provider_plans.length > 0 &&
      this.props.dispatch({
        type: actions.GET_CLICKED_PLAN,
        data: this.props.provider_plans[index],
        //data: this.props.recommended_plans[index],
      });

    this.props.provider_plans.length == 0 &&
      this.props.dispatch({
        type: actions.GET_CLICKED_PLAN,
        data: state.plans[index],
        //data: this.props.plans[index],
      });
  };

  renderDesktopQuizForm() {
    return (
      <form
        id="desktop-quiz-form1"
        onSubmit={this.preventDefault}
        className="form desktop"
      >
        <h3 className="no-med">
          Compare HMO plans in Nigeria from the comfort of your home
        </h3>
        <h3 className="no-med no-med-r">No medicals required</h3>

        <div
          className={
            //styles.optionsGroup +
            " price-slider"
          }
        >
          <p className={styles.sideBarHeadings}>
            What is your annual price range{" "}
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
                  onChange={this.handleType}
                  checked={this.props.responses.type === "single"}
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
                  checked={this.props.responses.type === "couple"}
                  onClick={this.handleType}
                  onChange={this.handleType}
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
                  checked={this.props.responses.type === "fam-of-4"}
                  onClick={this.handleType}
                  onChange={this.handleType}
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
                  checked={this.props.responses.type === "corporate"}
                  onClick={this.handleType}
                  onChange={this.handleType}
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
                  checked={this.props.responses.type === "parents"}
                  onClick={this.handleType}
                  onChange={this.handleType}
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
                  checked={this.props.responses.type === "others"}
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

        {/* <div className="form-group home-gender">
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
                  className="radio-group-gender"
                  onChange={(e) => {
                    this.handleGender(e.target.value);
                  }}
                ></input>
                <span>
                  <i className="gender icons-gender male female-icon"></i>
                  <em>Female</em>
                </span>
              </label>
            </div>
          </div>
        </div> */}

        {/* <div className="form-group home-fullname">
          <div className="col-md-12">
            <label>My name is</label>
          </div>

          <div className="col-md-12">
            <input
              className="form-control"
              placeholder="Full Name"
              // required={true}
              onChange={(e) => {
                this.handleFullName(e.target.value);
              }}
              value={this.props.responses.full_name}
            ></input>
          </div>
        </div>
        <div className="form-group home-phonenum">
          <div className="col-md-12">
            <label>My number is</label>
          </div>

          <div className="col-md-12">
            <PhoneInput
              className={
                this.state.is_phone_valid
                  ? "form-control"
                  : "form-control invalid"
              }
              placeholder="11 - digit mobile number"
              //required={true}
              defaultCountry="NG"
              onChange={
                // (e) => {
                this.handlePhone
                //   (e.target.value);
                // }
              }
              value={this.props.responses.phone_num}
              type="phone"
              maxLength="13"
            />
          </div>
        </div> */}
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
          Compare HMO plans in Nigeria from the comfort of your home
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
                  checked={this.props.responses.type === "single"}
                  onClick={this.handleType}
                  onChange={this.handleType}
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
                  checked={this.props.responses.type === "couple"}
                  onClick={this.handleType}
                  onChange={this.handleType}
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
                  checked={this.props.responses.type === "fam-of-3"}
                  onClick={this.handleType}
                  onChange={this.handleType}
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
                  checked={this.props.responses.type === "fam-of-4"}
                  onClick={this.handleType}
                  onChange={this.handleType}
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
                  checked={this.props.responses.type === "parents"}
                  onClick={this.handleType}
                  onChange={this.handleType}
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
                  checked={this.props.responses.type === "others"}
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
        {/* <div className="mobile-view-steps">
          <div className="col-md-12">
            <Steps current={0}>
              {home_utils.mobile_steps.map((step, i) => {
                return <Step key={i} />;
              })}
            </Steps>
          </div>
        </div>
        <div className="mobile-view-phone form-group">
          <div className="col-md-12">
            <label>Tell us about you</label>
            <PhoneInput
              className={
                this.state.is_phone_valid
                  ? "form-control"
                  : "form-control invalid"
              }
              placeholder="Enter phone number"
              defaultCountry="NG"
              // required={true}
              onChange={
                // (e) => {
                this.handlePhone
                //   (e.target.value);
                // }
              }
              value={this.props.responses.phone_num}
              type="phone"
              maxLength="13"
            />
          </div>
        </div> */}
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

  renderDesktopQuizModal() {
    let current;
    if (this.props.page != 0) {
      current = this.props.page - 1;
    } else {
      current = 0;
    }
    return (
      <Modal
        id="desktop-quiz-modal-form1"
        dialogClassName="custom-dialog"
        className="desktop-modal right"
        show={this.props.isOpen}
        onHide={this.toggleModal}
      >
        <Modal.Body>
          <form
            name="modalForm"
            onSubmit={this.preventDefault}
            className="form steppers"
          >
            <div className="modal-head" id="modal-head">
              <Button
                id="prev"
                type="default"
                onClick={
                  this.props.page < 3 ? this.toggleModal : this.handleNavigation
                }
              >
                <FontAwesomeIcon className="" icon={faArrowLeft} />
              </Button>
              <div className="modal-title">
                {this.props.isDesktopView ? (
                  current >= 0 && current < 3 ? (
                    <div>
                      <p>{home_utils.steps[current].p}</p>
                      <h3>{home_utils.steps[current].h3}</h3>
                    </div>
                  ) : current < 0 || current == 0 ? (
                    //this.toggleModal()
                    <div>
                      <p>{home_utils.steps[0].p}</p>
                      <h3>{home_utils.steps[0].h3}</h3>
                    </div>
                  ) : (
                    console.log("current is > 0", current)
                  )
                ) : (
                  console.log("!this.props.isDesktopView")
                )}

                <Steps current={current}>
                  {home_utils.steps.map((step, i) => {
                    return <Step key={i} />;
                  })}
                </Steps>
              </div>
            </div>
            {this.renderQuizPages()}
            <div className="nav-row row">
              <div className="col-md-12">
                <div className="form-group">
                  <button
                    className="btn btn-primary btn-large others-btn-cont view-plans btn-demo"
                    onClick={this.handleNavigation}
                    id="next"
                  >
                    Continue
                  </button>
                </div>
              </div>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    );
  }

  renderMobileQuizModal() {
    let current;
    if (this.props.page != 0) {
      current = this.props.page - 1;
    } else {
      current = 0;
    }
    return (
      <Modal
        id="mobile-quiz-modal-form1"
        dialogClassName="custom-dialog"
        className="mobile-modal right"
        show={this.props.isMobileViewModalOpen}
        onHide={this.mobileToggleModal}
      >
        <Modal.Body>
          <form
            name="modalForm"
            onSubmit={this.preventDefault}
            className="form steppers"
          >
            <div className="modal-head" id="modal-head">
              {/*
                    {this.props.page != 1 ? (
                    */}

              <Button
                id="prev"
                type="default"
                onClick={
                  this.props.page < 3
                    ? this.mobileToggleModal
                    : this.handleNavigation
                }
              >
                <FontAwesomeIcon className="" icon={faArrowLeft} />
              </Button>

              <div className="modal-title">
                {current >= 0 ? (
                  <div>
                    <p>{home_utils.mobile_steps[current].p}</p>
                    <h3>{home_utils.mobile_steps[current].h3}</h3>
                  </div>
                ) : current < 0 ? (
                  <div>
                    <p>{home_utils.mobile_steps[0].p}</p>
                    <h3>{home_utils.mobile_steps[0].h3}</h3>
                  </div>
                ) : (
                  ""
                )}

                <Steps current={current}>
                  {home_utils.mobile_steps.map((step, i) => {
                    return <Step key={i} />;
                  })}
                </Steps>
              </div>
            </div>
            {this.renderMobileViewQuizPages()}
            <div className="nav-row row">
              <div className="col-md-12">
                <div className="form-group">
                  <button
                    className="btn btn-primary btn-large others-btn-cont view-plans btn-demo"
                    onClick={this.handleNavigation}
                    id="next"
                  >
                    Continue
                  </button>
                </div>
              </div>
            </div>
            {/*here*/}
          </form>
        </Modal.Body>
        {/* <Modal.Footer>Goodbye!</Modal.Footer> */}
      </Modal>
    );
  }

  renderDesktopQuizForm2() {
    return (
      <form
        id="desktop-quiz-form2"
        onSubmit={this.preventDefault}
        className="form desktop"
      >
        <h3 className="no-med">
          Compare HMO plans in Nigeria from the comfort of your home
        </h3>
        <h3 className="no-med">No medicals required</h3>
        <div className="mobile-view-steps">
          <div className="col-md-12">
            <Steps current={0}>
              {home_utils.steps.map((step, i) => {
                return <Step key={i} />;
              })}
            </Steps>
          </div>
        </div>
        <div className="mobile-view-phone form-group">
          <div className="col-md-12">
            <label>Tell us about you</label>
            <PhoneInput
              className={
                this.state.is_phone_valid
                  ? "form-control"
                  : "form-control invalid"
              }
              placeholder="Enter phone number"
              type="phone"
              maxLength="13"
              defaultCountry="NG"
              //required={true}
              onChange={
                // (e) => {
                this.handlePhone
                //   (e.target.value);
                // }
              }
              value={this.props.responses.phone_num}
            />
          </div>
        </div>
        <div className="form-group home-gender">
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
                  className="radio-group-gender"
                  onChange={(e) => {
                    this.handleGender(e.target.value);
                  }}
                ></input>
                <span>
                  <i className="gender icons-gender male female-icon"></i>
                  <em>Female</em>
                </span>
              </label>
            </div>
          </div>
        </div>

        <div className="form-group home-fullname">
          <div className="col-md-12">
            <label>My name is</label>
          </div>

          <div className="col-md-12">
            <input
              className="form-control"
              placeholder="Full Name"
              // required={true}
              onChange={(e) => {
                this.handleFullName(e.target.value);
              }}
              value={this.props.responses.full_name}
            ></input>
          </div>
        </div>
        <div className="form-group home-phonenum">
          <div className="col-md-12">
            <label>My number is</label>
          </div>

          <div className="col-md-12">
            <PhoneInput
              className={
                this.state.is_phone_valid
                  ? "form-control"
                  : "form-control invalid"
              }
              placeholder="11 - digit mobile number"
              //required={true}
              defaultCountry="NG"
              onChange={
                // (e) => {
                this.handlePhone
                //   (e.target.value);
                // }
              }
              value={this.props.responses.phone_num}
              type="phone"
              maxLength="13"
            />
          </div>
        </div>
        <div className="form-group home-view-btn">
          <div className="col-md-12">
            <button
              className="btn btn-primary btn-large view-plans btn-demo"
              onClick={() => {
                // if (this.props.responses.phone_num) {
                //this.toggleModal();
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
              onClick={this.toggleModal}
            >
              Continue
            </button>
          </div>
        </div>
      </form>
    );
  }

  renderMobileQuizForm2() {
    return (
      <form
        id="mobile-quiz-form2"
        onSubmit={this.preventDefault}
        className="form mobile"
      >
        <h3 className="no-med">
          Compare HMO plans in Nigeria from the comfort of your home
        </h3>
        <h3 className="no-med">No medicals required</h3>
        <div className="mobile-view-steps">
          <div className="col-md-12">
            <Steps current={0}>
              {home_utils.mobile_steps.map((step, i) => {
                return <Step key={i} />;
              })}
            </Steps>
          </div>
        </div>
        <div className="mobile-view-phone form-group">
          <div className="col-md-12">
            <label>Tell us about you</label>
            <PhoneInput
              className={
                this.state.is_phone_valid
                  ? "form-control"
                  : "form-control invalid"
              }
              placeholder="Enter phone number"
              defaultCountry="NG"
              // required={true}
              onChange={
                // (e) => {
                this.handlePhone
                //   (e.target.value);
                // }
              }
              value={this.props.responses.phone_num}
              type="phone"
              maxLength="13"
            />
          </div>
        </div>
        <div className="form-group mobile-view-cont-btn">
          <div className="col-md-12">
            <button
              className="btn btn-primary btn-large view-plans btn-demo"
              onClick={() => {
                this.mobileToggleModal();
                this.handleDesktopView();
              }}
            >
              Continue
            </button>
          </div>
        </div>
      </form>
    );
  }

  renderDesktopQuizModal2() {
    let current;
    if (this.props.page != 0) {
      current = this.props.page - 1;
    } else {
      current = 0;
    }
    return (
      <Modal
        id="desktop-quiz-modal-form2"
        dialogClassName="custom-dialog"
        className="desktop-modal right"
        show={this.props.isOpen}
        onHide={this.toggleModal}
      >
        <Modal.Body>
          <form
            name="modalForm"
            onSubmit={this.preventDefault}
            className="form steppers"
          >
            <div className="modal-head" id="modal-head">
              <Button
                id="prev"
                type="default"
                onClick={
                  this.props.page < 3 ? this.toggleModal : this.handleNavigation
                }
              >
                <FontAwesomeIcon className="" icon={faArrowLeft} />
              </Button>
              <div className="modal-title">
                {this.props.isDesktopView ? (
                  current >= 0 && current < 3 ? (
                    <div>
                      <p>{home_utils.steps[current].p}</p>
                      <h3>{home_utils.steps[current].h3}</h3>
                    </div>
                  ) : current < 0 || current == 0 ? (
                    //this.toggleModal()
                    <div>
                      <p>{home_utils.steps[0].p}</p>
                      <h3>{home_utils.steps[0].h3}</h3>
                    </div>
                  ) : (
                    console.log("current is > 0", current)
                  )
                ) : (
                  console.log("!this.props.isDesktopView")
                )}

                <Steps current={current}>
                  {home_utils.steps.map((step, i) => {
                    return <Step key={i} />;
                  })}
                </Steps>
              </div>
            </div>
            {this.renderQuizPages()}
            <div className="nav-row row">
              <div className="col-md-12">
                <div className="form-group">
                  <button
                    className="btn btn-primary btn-large others-btn-cont view-plans btn-demo"
                    onClick={this.handleNavigation}
                    id="next"
                  >
                    Continue
                  </button>
                </div>
              </div>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    );
  }

  renderMobileQuizModal2() {
    let current;
    if (this.props.page != 0) {
      current = this.props.page - 1;
    } else {
      current = 0;
    }
    return (
      <Modal
        id="mobile-quiz-modal-form2"
        dialogClassName="custom-dialog"
        className="mobile-modal right"
        show={this.props.isMobileViewModalOpen}
        onHide={this.mobileToggleModal}
      >
        <Modal.Body>
          <form
            name="modalForm"
            onSubmit={this.preventDefault}
            className="form steppers"
          >
            <div className="modal-head" id="modal-head">
              {/*
  {this.props.page != 1 ? (
  */}

              <Button
                id="prev"
                type="default"
                onClick={
                  this.props.page < 3
                    ? this.mobileToggleModal
                    : this.handleNavigation
                }
              >
                <FontAwesomeIcon className="" icon={faArrowLeft} />
              </Button>

              <div className="modal-title">
                {current >= 0 ? (
                  <div>
                    <p>{home_utils.mobile_steps[current].p}</p>
                    <h3>{home_utils.mobile_steps[current].h3}</h3>
                  </div>
                ) : current < 0 ? (
                  <div>
                    <p>{home_utils.mobile_steps[0].p}</p>
                    <h3>{home_utils.mobile_steps[0].h3}</h3>
                  </div>
                ) : (
                  ""
                )}

                <Steps current={current}>
                  {home_utils.mobile_steps.map((step, i) => {
                    return <Step key={i} />;
                  })}
                </Steps>
              </div>
            </div>
            {this.renderMobileViewQuizPages()}
            <div className="nav-row row">
              <div className="col-md-12">
                <div className="form-group">
                  <button
                    className="btn btn-primary btn-large others-btn-cont view-plans btn-demo"
                    onClick={this.handleNavigation}
                    id="next"
                  >
                    Continue
                  </button>
                </div>
              </div>
            </div>
            {/*here*/}
          </form>
        </Modal.Body>
        {/* <Modal.Footer>Goodbye!</Modal.Footer> */}
      </Modal>
    );
  }

  renderDesktopQuizForm3() {
    return (
      <form
        id="desktop-quiz-form3"
        onSubmit={this.preventDefault}
        className="form desktop"
      >
        <h3 className="no-med">
          Compare HMO plans in Nigeria from the comfort of your home
        </h3>
        <h3 className="no-med">No medicals required</h3>
        <div className="mobile-view-steps">
          <div className="col-md-12">
            <Steps current={0}>
              {home_utils.steps.map((step, i) => {
                return <Step key={i} />;
              })}
            </Steps>
          </div>
        </div>
        <div className="mobile-view-phone form-group">
          <div className="col-md-12">
            <label>Tell us about you</label>
            <PhoneInput
              className={
                this.state.is_phone_valid
                  ? "form-control"
                  : "form-control invalid"
              }
              placeholder="Enter phone number"
              type="phone"
              maxLength="13"
              defaultCountry="NG"
              //required={true}
              onChange={
                // (e) => {
                this.handlePhone
                //   (e.target.value);
                // }
              }
              value={this.props.responses.phone_num}
            />
          </div>
        </div>
        <div className="form-group home-gender">
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
                  className="radio-group-gender"
                  onChange={(e) => {
                    this.handleGender(e.target.value);
                  }}
                ></input>
                <span>
                  <i className="gender icons-gender male female-icon"></i>
                  <em>Female</em>
                </span>
              </label>
            </div>
          </div>
        </div>

        <div className="form-group home-fullname">
          <div className="col-md-12">
            <label>My name is</label>
          </div>

          <div className="col-md-12">
            <input
              className="form-control"
              placeholder="Full Name"
              // required={true}
              onChange={(e) => {
                this.handleFullName(e.target.value);
              }}
              value={this.props.responses.full_name}
            ></input>
          </div>
        </div>
        <div className="form-group home-phonenum">
          <div className="col-md-12">
            <label>My number is</label>
          </div>

          <div className="col-md-12">
            <PhoneInput
              className={
                this.state.is_phone_valid
                  ? "form-control"
                  : "form-control invalid"
              }
              placeholder="11 - digit mobile number"
              //required={true}
              defaultCountry="NG"
              onChange={
                // (e) => {
                this.handlePhone
                //   (e.target.value);
                // }
              }
              value={this.props.responses.phone_num}
              type="phone"
              maxLength="13"
            />
          </div>
        </div>
        <div className="form-group home-view-btn">
          <div className="col-md-12">
            <button
              className="btn btn-primary btn-large view-plans btn-demo"
              onClick={() => {
                // if (this.props.responses.phone_num) {
                this.toggleModal();
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
              onClick={this.toggleModal}
            >
              Continue
            </button>
          </div>
        </div>
      </form>
    );
  }

  renderMobileQuizForm3() {
    return (
      <form
        id="mobile-quiz-form3"
        onSubmit={this.preventDefault}
        className="form mobile"
      >
        <h3 className="no-med">
          Compare HMO plans in Nigeria from the comfort of your home
        </h3>
        <h3 className="no-med">No medicals required</h3>
        <div className="mobile-view-steps">
          <div className="col-md-12">
            <Steps current={0}>
              {home_utils.mobile_steps.map((step, i) => {
                return <Step key={i} />;
              })}
            </Steps>
          </div>
        </div>
        <div className="mobile-view-phone form-group">
          <div className="col-md-12">
            <label>Tell us about you</label>
            <PhoneInput
              className={
                this.state.is_phone_valid
                  ? "form-control"
                  : "form-control invalid"
              }
              placeholder="Enter phone number"
              defaultCountry="NG"
              // required={true}
              onChange={
                // (e) => {
                this.handlePhone
                //   (e.target.value);
                // }
              }
              value={this.props.responses.phone_num}
              type="phone"
              maxLength="13"
            />
          </div>
        </div>
        <div className="form-group mobile-view-cont-btn">
          <div className="col-md-12">
            <button
              className="btn btn-primary btn-large view-plans btn-demo"
              onClick={() => {
                this.mobileToggleModal();
                this.handleDesktopView();
              }}
            >
              Continue
            </button>
          </div>
        </div>
      </form>
    );
  }

  renderDesktopQuizModal3() {
    let current;
    if (this.props.page != 0) {
      current = this.props.page - 1;
    } else {
      current = 0;
    }
    return (
      <Modal
        id="desktop-quiz-modal3"
        dialogClassName="custom-dialog"
        className="desktop-modal right"
        show={this.props.isOpen}
        onHide={this.toggleModal}
      >
        <Modal.Body>
          <form
            name="modalForm"
            onSubmit={this.preventDefault}
            className="form steppers"
          >
            <div className="modal-head" id="modal-head">
              <Button
                id="prev"
                type="default"
                onClick={
                  this.props.page < 3 ? this.toggleModal : this.handleNavigation
                }
              >
                <FontAwesomeIcon className="" icon={faArrowLeft} />
              </Button>
              <div className="modal-title">
                {this.props.isDesktopView ? (
                  current >= 0 && current < 3 ? (
                    <div>
                      <p>{home_utils.steps[current].p}</p>
                      <h3>{home_utils.steps[current].h3}</h3>
                    </div>
                  ) : current < 0 || current == 0 ? (
                    //this.toggleModal()
                    <div>
                      <p>{home_utils.steps[0].p}</p>
                      <h3>{home_utils.steps[0].h3}</h3>
                    </div>
                  ) : (
                    console.log("current is > 0", current)
                  )
                ) : (
                  console.log("!this.props.isDesktopView")
                )}

                <Steps current={current}>
                  {home_utils.steps.map((step, i) => {
                    return <Step key={i} />;
                  })}
                </Steps>
              </div>
            </div>
            {this.renderQuizPages()}
            <div className="nav-row row">
              <div className="col-md-12">
                <div className="form-group">
                  <button
                    className="btn btn-primary btn-large others-btn-cont view-plans btn-demo"
                    onClick={this.handleNavigation}
                    id="next"
                  >
                    Continue
                  </button>
                </div>
              </div>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    );
  }

  renderMobileQuizModal3() {
    let current;
    if (this.props.page != 0) {
      current = this.props.page - 1;
    } else {
      current = 0;
    }
    return (
      <Modal
        id="mobile-quiz-modal3"
        dialogClassName="custom-dialog"
        className="mobile-modal right"
        show={this.props.isMobileViewModalOpen}
        onHide={this.mobileToggleModal}
      >
        <Modal.Body>
          <form
            name="modalForm"
            onSubmit={this.preventDefault}
            className="form steppers"
          >
            <div className="modal-head" id="modal-head">
              {/*
  {this.props.page != 1 ? (
  */}

              <Button
                id="prev"
                type="default"
                onClick={
                  this.props.page < 3
                    ? this.mobileToggleModal
                    : this.handleNavigation
                }
              >
                <FontAwesomeIcon className="" icon={faArrowLeft} />
              </Button>

              <div className="modal-title">
                {current >= 0 ? (
                  <div>
                    <p>{home_utils.mobile_steps[current].p}</p>
                    <h3>{home_utils.mobile_steps[current].h3}</h3>
                  </div>
                ) : current < 0 ? (
                  <div>
                    <p>{home_utils.mobile_steps[0].p}</p>
                    <h3>{home_utils.mobile_steps[0].h3}</h3>
                  </div>
                ) : (
                  ""
                )}

                <Steps current={current}>
                  {home_utils.mobile_steps.map((step, i) => {
                    return <Step key={i} />;
                  })}
                </Steps>
              </div>
            </div>
            {this.renderMobileViewQuizPages()}
            <div className="nav-row row">
              <div className="col-md-12">
                <div className="form-group">
                  <button
                    className="btn btn-primary btn-large others-btn-cont view-plans btn-demo"
                    onClick={this.handleNavigation}
                    id="next"
                  >
                    Continue
                  </button>
                </div>
              </div>
            </div>
            {/*here*/}
          </form>
        </Modal.Body>
        {/* <Modal.Footer>Goodbye!</Modal.Footer> */}
      </Modal>
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

  mobileOnLoadModal() {
    return (
      <Modal
        id="mobile-on-page-load-modal"
        dialogClassName="custom-dialog"
        className="mobile-modal center"
        show={true}
        onHide={this.mobileToggleModal}
      >
        <Modal.Body>{this.renderMobileQuizForm()}</Modal.Body>
      </Modal>
    );
  }

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
    // await console.log(this.props.plans);
  }

  componentDidMount() {
    if (window.screen.width >= 501) {
      //console.log("window.screen.width >= 501", window.screen.width >= 501);
      setTimeout(() => {
        this.showDesktopOnLoadModal();
      }, 5000);

      //  this.desktopOnLoadModal();
    } else {
      //console.log"window.screen.width < 501", window.screen.width >= 501);
      //this.mobileOnLoadModal();
    }
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
      await this.props.dispatch({ type: actions.RESET_PLANS, data: true });
      await this.props.dispatch({ type: actions.UPDATE_BUDGET, budget: value });
      this.handlePriceRange();
      //this.eventHandlers.handleCheckbox(this.props.checked);
      /* await this.fetchData("recommend", this.props.responses);*/
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
      val == "single" ||
      val == "couple" ||
      val == "parents" ||
      val == "corporate" ||
      val == "fam-of-4"
    ) {
      this.handleType(val);
    }
  }

  handlePriceRange() {
    if (
      this.props.quiz.responses.budget[1] > 0 &&
      this.props.quiz.responses.budget[1] <= 30000
    ) {
      this.props.dispatch({
        type: actions.UPDATE_PRICE_RANGE,
        data: "small",
      });
      // this.setState({
      //   type_selected: "small",
      // });
    } else if (
      this.props.quiz.responses.budget[1] >= 30001 &&
      this.props.quiz.responses.budget[1] <= 99999
    ) {
      this.props.dispatch({
        type: actions.UPDATE_PRICE_RANGE,
        data: "medium",
      });
      // this.setState({
      //   type_selected: "medium",
      // });
    } else {
      this.props.dispatch({
        type: actions.UPDATE_PRICE_RANGE,
        data: "big",
      });
      // this.setState({ type_selected: "big" });
    }
  }

  toggleShowFilter = () => {
    this.setState({
      show_filter: !this.state.show_filter,
    });
  };

  toggleMedMgtProgramsMultiselect = () => {
    //console.log"toggle");

    this.setState({
      show_med_mgt_program_multiselect: !this.state
        .show_med_mgt_program_multiselect,
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
    //console.log"id", id);

    let arr: string[] = this.state.filter_params.plan_range_checked;

    let isPlanRangeChecked: number = arr.indexOf(id);

    //console.log"isPlanRangeChecked", isPlanRangeChecked);

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
    //console.log"id", id);

    let arr: string[] = this.state.filter_params.plan_types_checked;

    let isPlanChecked: number = arr.indexOf(id);

    //console.log"isPlanChecked", isPlanChecked);

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
    //let arr: string[] = this.state.filter_params.providers_selected;
    //arr.push(id);

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

  handlePlanIDChange(val) {
    this.setState({
      filter_params: {
        ...this.state.filter_params,
        planID: val,
      },
    });
  }

  handleHSAChange() {
    let v = this.state.filter_params.healthSA_eligibility;
    this.setState({
      filter_params: {
        ...this.state.filter_params,
        healthSA_eligibility: !v,
      },
    });
  }

  updateBugetWithFilterRange = () => {
    this.eventHandlers.changeBudget([
      this.state.filter_params.annual_range_min,
      this.state.filter_params.annual_range_max,
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
    this.setState({
      plans_to_compare: indexes,
    });
  }

  setRecPlansIndexesToCompare = () => {
    this.props.dispatch({
      type: "SET_PLANS_TO_COMPARE_ON_DESKTOP",
      data: this.state.plans_to_compare,
    });

    this.props.dispatch({
      type: "SET_PLANS_TO_COMPARE_ON_MOBILE",
      data: this.state.plans_to_compare,
    });

    // this.props.dispatch({
    //   type: "SET_CHECKED_PLANS",
    //   data: this.state.checked_plans_list,
    // });
  };

  buildQueryParams = () => {
    let query_string = "/plans/" + this.state.plans_to_compare[0];

    for (let i = 1; i < this.state.plans_to_compare.length; i++) {
      query_string += "/" + this.state.plans_to_compare[i];
    }

    console.log("query_string", query_string);
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

  render() {
    if (this.props.page != 0) {
    } else {
    }
    //console.log"this.state", this.state);
    //console.log"this.props", this.props);

    let med_mgt_programs_selected: string[] = this.state.filter_params[
      "mgt_program_selected"
    ];

    let plan_types_checked: string[] = this.state.filter_params[
      "plan_types_checked"
    ];

    let plan_range_checked: string[] = this.state.filter_params[
      "plan_range_checked"
    ];

    let plans_to_compare: number[] = this.state.plans_to_compare;

    //console.log"plan_range_checked", plan_range_checked);

    const {
      annual_range_min,
      annual_range_max,
      annual_deductible_min,
      annual_deductible_max,

      planID,
      healthSA_eligibility,
    } = this.state.filter_params;

    return (
      <div className="home">
        <div className="banner-div">
          {/* <AppHeader /> */}
          <div className="container home-c">
            {/* if the path is /hmo and data has been fetched*/}
            {
              //this.state.filter_plans_by_hmo &&
              this.props.match.params.id &&
                // this.props.plans.length > 0
                state.plans.length > 0 &&
                this.props.provider_plans.length > 0 && (
                  <Row className="banner-content">
                    {this.hmoBannerDiv(this.props.match.params.id)}

                    <Col md={10} className="quiz">
                      <div className="home-frm form-div">
                        {/* call desktop form 1 */ this.renderDesktopQuizForm()}

                        {/* call mobile form 1 */ this.renderMobileQuizForm()}
                        {
                          /* call desktop quiz modal 1 */ this.renderDesktopQuizModal()
                        }
                        {
                          /* call mobile quiz modal 1 */ this.renderMobileQuizModal()
                        }
                      </div>
                    </Col>
                  </Row>
                )
            }

            {/* if the path is /hmo and data is being fetched*/}
            {this.props.match.params.id &&
              // this.props.plans.length == 0
              state.plans.length == 0 && (
                <Row className="banner-content">
                  <Col
                    xs={24}
                    md={14}
                    className="banner-container provider-banner"
                  >
                    <HMOInfoSkeleton />
                  </Col>
                  <Col md={10} className="quiz">
                    <div className="home-frm form-div">
                      {/* call desktop form 2 */ this.renderDesktopQuizForm()}

                      {/* call mobile form 2 */ this.renderMobileQuizForm()}
                      {/* call desktop quiz modal 2 this.renderDesktopQuizModal()*/}
                      {/* call mobile quiz modal 2  this.renderMobileQuizModal()*/}
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
                        ? "home-frm form-div"
                        : "hide-desktop-home-frm"
                    }
                  >
                    {/* call desktop form 3 */ this.renderDesktopQuizForm()}

                    {/* call mobile form 3 */ this.renderMobileQuizForm()}
                    {/* {call the desktop modal } */ this.desktopOnLoadModal()}
                    {/* call desktop quiz modal 3  this.renderDesktopQuizModal()*/}
                    {/* call mobile quiz modal 3 this.renderMobileQuizModal()*/}
                  </div>
                </Col>
              </Row>
            )}
          </div>
        </div>

        {
          // this.props.plans.length > 0
          state.plans.length > 0 ? (
            <div className="home-plans-div container" id="plans">
              <div className="results-header margin-top--2">
                <div className={this.state.sticky_styles}>
                  <div
                    className={`padding-y--1 display--flex flex-wrap--wrap md-flex-wrap--nowrap justify-content--between ${this.state.sticky_inner_optional_style}`}
                  >
                    <div className="margin-bottom--1 md-margin-bottom--0 results-header-left">
                      <div className="font-size--lead font-weight--bold c-results_header_summary">
                        {/* {this.props.plans.length}  */}
                        {state.plans.length} plans available
                      </div>
                      <div>
                        <button
                          className="c-button  c-button--primary margin-right--2 margin-bottom--1 lg-margin-bottom--0 c-filter-plans"
                          type="button"
                          onClick={this.toggleShowFilter}
                        >
                          {this.state.show_filter ? "Cancel" : "Filter Plans"}
                        </button>

                        <a
                          className={
                            this.state.show_compare_button
                              ? "c-button c-button--secondary margin-right--2 qa-compare-plans"
                              : "display--none"
                          }
                          // href="#"
                          onClick={this.goToComparison}
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
                          onChange={(e) => this.changeType(e.target.value)}
                          value={this.props.responses.type}
                        >
                          <option value="single">Personal</option>
                          <option value="fam-of-4">Family</option>
                          <option value="parents">Senior Citizens</option>
                          <option value="couple">Couples</option>
                          <option value="corporate">Corporate</option>
                        </select>
                      </div>
                      <div className="margin-left--1 display--inline-block rh-sort-by-div">
                        <label className="c-label margin-top--0 rh-sort-by">
                          <span className="drop-ds-label">Plan range</span>
                        </label>
                        <select
                          className="c-field c-field--medium rh-sort-by-select"
                          //onChange={this.handlePriceRange}
                          value={this.props.responses.price_range}
                        >
                          <option value="small">Small</option>
                          <option value="medium">Medium</option>
                          <option value="big">Big</option>
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
                                    ( {this.formatter(this.minbudgett)} -{" "}
                                    {this.formatter(this.maxbudgett)})
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
                                        onChange={(e) =>
                                          this.handleMinRangeChange(
                                            e.target.value
                                          )
                                        }
                                        onKeyUp={
                                          this.updateBugetWithFilterRange
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
                                        name="premium-end"
                                        onChange={(e) =>
                                          this.handleMaxRangeChange(
                                            e.target.value
                                          )
                                        }
                                        onKeyUp={
                                          this.updateBugetWithFilterRange
                                        }
                                      />
                                    </div>
                                  </div>
                                  <button
                                    className="c-button c-button--secondary c-button--small c-range-field__button"
                                    disabled={
                                      annual_range_min != undefined ||
                                      annual_range_max != undefined
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
                          <div className="l-lg-col--6 c-plan-filter-container">
                            <div className="fill--gray-lightest padding--2">
                              <fieldset className="c-range-field c-fieldset margin-top--0">
                                <legend className="c-label c-range-field__label">
                                  <span className="bolden-it">
                                    Maximum yearly deductible
                                  </span>
                                  <span className="c-field__hint">
                                    Your yearly deductible range is{" "}
                                    {annual_deductible_min
                                      ? annual_deductible_min
                                      : ""}{" "}
                                    - {annual_range_max ? annual_range_max : ""}
                                    {/* ₦0 - ₦10,000 */}
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
                                        onChange={(e) =>
                                          this.handleMinDedChange(
                                            e.target.value
                                          )
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
                                        onChange={(e) =>
                                          this.handleMaxDedChange(
                                            e.target.value
                                          )
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
                                    value="personal"
                                    onChange={() =>
                                      this.handlePlanTypesCheck("personal")
                                    }
                                    checked={
                                      plan_types_checked
                                        ? plan_types_checked.includes(
                                            "personal"
                                          )
                                        : false
                                    }
                                  />
                                  <label
                                    className="c-label"
                                    onClick={() =>
                                      this.handlePlanTypesCheck("personal")
                                    }
                                  >
                                    <span className="">Personal (1)</span>
                                  </label>
                                </div>

                                <div className="">
                                  <input
                                    className="c-choice c-choice--small"
                                    type="checkbox"
                                    name=""
                                    value="family"
                                    onChange={() =>
                                      this.handlePlanTypesCheck("family")
                                    }
                                    checked={
                                      plan_types_checked
                                        ? plan_types_checked.includes("family")
                                        : false
                                    }
                                  />
                                  <label
                                    className="c-label"
                                    onClick={() =>
                                      this.handlePlanTypesCheck("family")
                                    }
                                  >
                                    <span className="">Family (2)</span>
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
                                      Senior Citizens (2)
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
                                    value="small"
                                    onChange={() =>
                                      this.handlePlanRangeCheck("small")
                                    }
                                    checked={
                                      plan_range_checked
                                        ? plan_range_checked.includes("small")
                                        : false
                                    }
                                  />
                                  <label
                                    className="c-label"
                                    onClick={() =>
                                      this.handlePlanRangeCheck("small")
                                    }
                                  >
                                    <span className="">Small</span>
                                  </label>
                                </div>

                                <div className="">
                                  <input
                                    className="c-choice c-choice--small"
                                    type="checkbox"
                                    name=""
                                    value="medium"
                                    onChange={() =>
                                      this.handlePlanRangeCheck("medium")
                                    }
                                    checked={
                                      plan_range_checked
                                        ? plan_range_checked.includes("medium")
                                        : false
                                    }
                                  />
                                  <label
                                    className="c-label"
                                    onClick={() =>
                                      this.handlePlanRangeCheck("medium")
                                    }
                                  >
                                    <span className="">Medium</span>
                                  </label>
                                </div>

                                <div className="">
                                  <input
                                    className="c-choice c-choice--small"
                                    type="checkbox"
                                    name=""
                                    value="big"
                                    onChange={() =>
                                      this.handlePlanRangeCheck("big")
                                    }
                                    checked={
                                      plan_range_checked
                                        ? plan_range_checked.includes("big")
                                        : false
                                    }
                                  />
                                  <label
                                    className="c-label"
                                    onClick={() =>
                                      this.handlePlanRangeCheck("big")
                                    }
                                  >
                                    <span className="">Big</span>
                                  </label>
                                </div>
                              </fieldset>
                            </div>
                          </div>
                        </div>

                        <div className="l-form-row">
                          <div className="l-lg-col--12">
                            <label className="c-label">
                              <span className="font-weight--bold">
                                Search by plan ID (10 characters)
                              </span>
                            </label>
                            <input
                              className="display--inline-block c-field"
                              id="plan-id-filter"
                              name="plan-id"
                              type="text"
                              maxLength={10}
                              placeholder="Example: HYG0123456"
                              onChange={(e) =>
                                this.handlePlanIDChange(e.target.value)
                              }
                            />
                            <button
                              className="c-button plan-id-search-button"
                              disabled={planID !== undefined ? false : true}
                              type="button"
                            >
                              Search
                            </button>
                          </div>
                        </div>

                        <div className="l-form-row">
                          <div className="l-lg-col--6">
                            <div className="hmo-filter">
                              <label className="c-label">
                                <span className="font-weight--bold">HMOs</span>
                              </label>
                              <select
                                className="c-field"
                                id="select_hmo_filter"
                              >
                                <option value="">Select an HMO</option>
                                <option value="hygeia">Hygeia</option>
                                <option value="avon">Avon</option>
                                <option value="reliance">Reliance</option>
                                <option value="metro-health">
                                  Metro Health
                                </option>
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
                                          High Blood Pressure and High
                                          Cholesterol
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
                                                  this.handleMedMgtProgCheck(
                                                    item
                                                  )
                                                }
                                              >
                                                {/* <span className="">Deselect</span> */}
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
                      </div>

                      <div className="l-lg-col--4">
                        <div className="l-form-row">
                          <div className="l-lg-col--12 c-plan-filter-container">
                            <div className="fill--gray-lightest padding--2">
                              <fieldset className="c-fieldset margin-top--0">
                                <legend className="c-label">
                                  <span className="bolden-it">
                                    Health Savings Account Eligibility (HSA)
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
                                      Eligible for an HSA
                                    </span>
                                  </label>
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
                              href="/find-provider"
                            >
                              Add Providers
                            </a>
                          </div>

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
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="l-row padding-y--2 display--none md-display--block margin-top--2 fill--gray-lightest">
                    <div className="l-col--12 text-align--right">
                      <button
                        className="c-button margin-right--2 qa-close-desktop"
                        type="button"
                      >
                        Cancel
                      </button>
                      <button
                        className="c-button c-button--secondary margin-right--2 text-transform--capitalize qa-clear-desktop"
                        type="button"
                      >
                        Clear filters
                      </button>
                      <button
                        className="c-button c-button--success qa-apply-desktop"
                        type="button"
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
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="" id="plans-section">
                <ul className="c-list--bare margin-top--2 home-plans-list">
                  {/* {this.props.plans.map((plan, i) => { */}
                  {state.plans.map((plan, i) => {
                    return (
                      <li className="margin-bottom--4">
                        <article
                          className={`plan-card c-base c-fill-white c-box-shadow c--health ${
                            plans_to_compare && plans_to_compare.includes(i)
                              ? // plans_to_compare && plans_to_compare.includes(i.toString())
                                "c-plan-card--compare-checked"
                              : ""
                          }`}
                        >
                          <div className="plan-card-inner c-clearfix">
                            <div className="plan-card__top-section display--flex justify-content--between lg-flex-wrap--nowrap flex-wrap--wrap">
                              <div>
                                <header className="plan-card-title">
                                  <div className="plan-c-provider font-weight--bold">
                                    {/* Hygeia */}
                                    {plan.hmo_id.name.text}
                                  </div>
                                  <h2 className="plan-c-name font-weight--normal margin-y--1">
                                    <a href="#">
                                      {/* HyBasic */}
                                      {plan.name}
                                    </a>
                                  </h2>
                                  <ul className="c-plan-title__info c-list--bare font-size--small plan-c-info">
                                    <li
                                      className="c-plan-title__info-item"
                                      key={plan.id}
                                    >
                                      <span className="">
                                        <span>
                                          {/* Personal */}
                                          {plan.category_id.name}
                                        </span>
                                      </span>
                                    </li>
                                    <li className="c-plan-title__info-item">
                                      <span className="">
                                        <span>HMO</span>
                                      </span>
                                    </li>
                                    <li className="c-plan-title__info-item">
                                      Plan ID:
                                      <span className="font-weight--bold">
                                        HYG00001
                                      </span>
                                    </li>
                                  </ul>
                                </header>
                              </div>

                              <div className="text-align--right plan-c-title-right">
                                <div className="quality-rating">
                                  <div className="valign--middle star-rating">
                                    <img
                                      src={starfilled}
                                      className="star-rating__star"
                                    />
                                    <img
                                      src={starfilled}
                                      className="star-rating__star"
                                    />
                                    <img
                                      src={star}
                                      className="star-rating__star"
                                    />
                                    <img
                                      src={star}
                                      className="star-rating__star"
                                    />
                                    <img
                                      src={star}
                                      className="star-rating__star"
                                    />
                                  </div>
                                  <button
                                    type="button"
                                    aria-label="Tooltip: "
                                    className="tooltip-trigger valign--middle"
                                  >
                                    <span className="tooltip-icon-container">
                                      <FontAwesomeIcon
                                        className=""
                                        icon={faInfoCircle}
                                      />
                                    </span>
                                  </button>
                                </div>
                                <div className="display--none lg-display--block plan-c-compare-button">
                                  <button
                                    id="desktop"
                                    className={`c-button c-check-button ${
                                      plans_to_compare &&
                                      plans_to_compare.includes(i)
                                        ? //plans_to_compare.includes(i.toString())
                                          "c-check-button--checked c-button--secondary"
                                        : ""
                                    } `}
                                    onClick={() => {
                                      this.handleCheckedPlanToCompare(i);
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
                                      plan.individual_annual_price
                                    )}
                                  </div>
                                  <ul className="plan-flags c-list--bare"></ul>
                                </div>
                                <div className="c-plan-summary__children">
                                  <div className="display--none lg-display--block c-plan-card__desktop-action-buttons margin-top--2">
                                    <a
                                      className="c-button c-button--secondary c-plan-card__action-button plan-c-card_action-button"
                                      // href=""
                                      onClick={() => {
                                        this.goToDetails();
                                        this.getClickedPlan(i);
                                      }}
                                      role="button"
                                      target="_self"
                                    >
                                      Plan Details
                                    </a>

                                    <a
                                      className="c-button c-button--primary c-plan-card__action-button plan-c-card_action-button"
                                      href=""
                                      role="button"
                                      target="_self"
                                    >
                                      Like This Plan
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
                                  Deductible
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
                                    <div className="font-size--h2">₦2,000</div>
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
                                  Out-of-pocket maximum
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
                                    <div className="font-size--h2">₦6,000</div>
                                    <div className="font-size--small">
                                      Individual total
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="plan-card__cost-display-yearly-cost display--flex">
                                <div className="plan-card-cost-display--info-needed fill--gray-lightest">
                                  <div
                                    className="font-size--small font-weight--bold
                              display--flex align-items--center"
                                  >
                                    Estimated total yearly costs
                                    <button
                                      type="button"
                                      aria-label="Tooltip: This estimate is based on how much care you told us each household member is likely to use. It’s useful for comparing plans based on total costs of care, not just monthly premiums. But your actual costs will depend on how much care you wind up using."
                                      className="tooltip-trigger padding--0"
                                    >
                                      <span className="tooltip-icon-container">
                                        <FontAwesomeIcon
                                          className=""
                                          icon={faInfoCircle}
                                        />
                                      </span>
                                    </button>
                                  </div>
                                  <a
                                    className="c-button c-button--small padding-x--2 margin-y--1"
                                    onClick={this.toggleShowFilter}
                                    role="button"
                                  >
                                    Add yearly costs
                                  </a>
                                </div>
                              </div>
                            </div>

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
                                  <div className="">₦6000</div>
                                </div>

                                <div className="limits-col--6 limits-lg-col--3 padding-top--1">
                                  <div className="font-weight--bold color--gray">
                                    Out-patient Limit
                                  </div>
                                  <div className="">₦6000</div>
                                </div>

                                <div className="limits-col--6 limits-lg-col--3 padding-top--1">
                                  <div className="font-weight--bold color--gray">
                                    In-patient Limit
                                  </div>
                                  <div className="">₦6000</div>
                                </div>

                                <div className="limits-col--6 limits-lg-col--3 padding-top--1">
                                  <div className="font-weight--bold color--gray">
                                    In-patient Limit
                                  </div>
                                  <div className="">₦6000</div>
                                </div>
                              </div>
                            </div>

                            <div className="plan-card__detail-section border--0 c-clearfix display--flex flex-wrap--wrap">
                              <div className="plan-card__plan-features-container">
                                <div>
                                  <div className="font-size--small font-weight--bold">
                                    Plan features
                                  </div>
                                  <ul className="c-status-list c-list--bare">
                                    <li className="c-status-list__item font-size--small">
                                      <img
                                        src={check}
                                        className="c-status-list__item__icon"
                                      />
                                      <span className="text-transform--capitalize">
                                        Admission
                                      </span>
                                    </li>
                                    <li className="c-status-list__item font-size--small">
                                      <img
                                        src={check}
                                        className="c-status-list__item__icon"
                                      />
                                      <span className="text-transform--capitalize">
                                        Accidents & Emergencies
                                      </span>
                                    </li>
                                    <li className="c-status-list__item font-size--small">
                                      <img
                                        src={check}
                                        className="c-status-list__item__icon"
                                      />
                                      <span className="text-transform--capitalize">
                                        Antenatal
                                      </span>
                                    </li>
                                  </ul>
                                </div>
                              </div>
                              <div className="c-plan-card__coverables-container">
                                <div className="c-plan-card-cost-display--info-needed fill--gray-lightest">
                                  <div className="justify-content--center display--flex">
                                    <a
                                      className="c-button c-button--small padding-x--2 margin-bottom--1"
                                      href="/find-provider"
                                    >
                                      Add medical providers
                                    </a>
                                  </div>
                                  <div className="font-size--small">
                                    Add your medical providers and we'll show
                                    you which plans cover them
                                  </div>
                                </div>
                              </div>

                              <div className="c-plan-card__coverables-container">
                                <div className="c-plan-card-cost-display--info-needed fill--gray-lightest">
                                  <div className="justify-content--center display--flex">
                                    <a
                                      className="c-button c-button--small padding-x--2 margin-bottom--1"
                                      href="/find-drugs"
                                    >
                                      Add prescription drugs
                                    </a>
                                  </div>
                                  <div className="font-size--small">
                                    Add your prescription drugs and we'll show
                                    you which plans cover them
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="lg-display--none margin-top--2">
                              <button
                                className="c-button c-check-button"
                                aria-pressed="false"
                                type="button"
                              >
                                <span
                                  className="c-check-button__checkbox"
                                  aria-hidden="true"
                                ></span>
                                Compare
                              </button>
                              <div className="c-plan-card__mobile-action-buttons">
                                <a
                                  className="c-button c-button--secondary c-plan-card__action-button"
                                  href="#"
                                  target="_self"
                                  role="button"
                                >
                                  Plan Details
                                </a>
                                <a
                                  className="c-button c-button--primary c-plan-card__action-button"
                                  href="#"
                                  target="_self"
                                  role="button"
                                >
                                  Like This Plan
                                </a>
                              </div>
                            </div>
                          </div>
                        </article>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          ) : (
            ""
          )
        }
      </div>
    );
  }
}

export default NewContent;
