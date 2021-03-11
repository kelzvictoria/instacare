import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
  Button,
  Icon,
  Row,
  Col,
  Steps,
  message,
  AutoComplete,
  Form,
  Card,
  Spin,
} from "antd";
import {
  faHome,
  faShieldAlt,
  faMale,
  faFemale,
  faArrowLeft,
  faSmile,
  faProcedures,
  faGift,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AppHeader from "../../components/app-header/AppHeader";
import styles from "./Home.module.scss";
import "../../custom.css";
import Modal from "react-bootstrap/Modal";

import { connect } from "react-redux";
import * as actions from "../../utils/actions";

import { Select } from "./Select";
import { sections } from "./sections";

import { options } from "./Options";
import { child_options } from "./ChildOptions";

import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import Plans from "../compare/Plans";

import ic_logo from "../../imgs/logo2.png";
// import {
//   verifyPhoneNumber,
//   sanitizePhoneNumber,
//   COUNTRY_CODE,
// } from "nigerian-phone-number-validator";

const { Step } = Steps;
const { Meta } = Card;

const API_URL = "https://instacareconnect.pmglobaltechnology.com";
const TEST_URL = "http://localhost:5000";

interface QuizProps {
  [x: string]: any;
  dispatch(args: any): any;
  page: number;
  minPage: number;
  maxPage: number;
  checked: string[];
  covers: string;
  dataSource: [];
  isOpen: boolean;
  isMobileViewModalOpen: boolean;
  isOthersInputOpen: boolean;
  isDesktopView: boolean;
  isSonCheckboxChecked: boolean;
  isDaughterCheckboxChecked: boolean;
  sonCount: 1;
  daughterCount: 1;
  responses: {
    [x: string]: any;
    budget: number;
    num_of_people: number;
    type: string;
    firstName: string;
    lastName: string;
    email: string;
    state: string;
    adult: number;
    children: number;
    infants: number;
    services: any;
    gender: string;
    full_name: string;
    phone_num: string;
    individual_age: number;
    father_age: string;
    mother_age: string;
    grand_father_age: string;
    grand_mother_age: string;
    father_in_law_age: string;
    mother_in_law_age: string;
    spouse_age: string;
    child_1_age: string;
    child_2_age: string;
    child_3_age: string;
    child_4_age: string;
    child_5_age: string;
    child_6_age: string;
    child_7_age: string;
    child_8_age: string;
  };
}

class Home extends Component<QuizProps, {}> {
  //private sonCheck = React.createRef<HTMLInputElement>();
  constructor(props) {
    super(props);
    this.handleType = this.handleType.bind(this);
    this.decrementSonCount = this.decrementSonCount.bind(this);
    this.incrementSonCount = this.incrementSonCount.bind(this);
    this.decrementDaughterCount = this.decrementDaughterCount.bind(this);
    this.incrementDaughterCount = this.incrementDaughterCount.bind(this);
    this.goToDetails = this.goToDetails.bind(this);
    this.handlePhone = this.handlePhone.bind(this);
  }

  state = {
    is_phone_valid: "null",
  };

  steps: { p: string; h3: string }[] = [
    {
      h3: "No medicals required",
      p: "Compare HMO plans in Nigeria from the comfort of your home",
    },
    {
      h3: "Like to get HMO plans for",
      p: "Tell us who you would",
    },
    {
      h3: "Select your city",
      p: "Just one last detail",
    },
  ];

  mobile_steps: { p: string; h3: string }[] = [
    {
      h3: "",
      p: "",
    },
    {
      h3: "No medicals required",
      p: "Compare HMO plans in Nigeria from the comfort of your home",
    },
    {
      h3: "Like to get HMO plans for",
      p: "Tell us who you would",
    },
    {
      h3: "Select your city",
      p: "Just one last detail",
    },
  ];

  locations = [
    "Abia",
    "Adamawa",
    "Akwa Ibom",
    "Anambra",
    "Bauchi",
    "Bayelsa",
    "Benue",
    "Borno",
    "Cross River",
    "Delta",
    "Ebonyi",
    "Enugu",
    "Edo",
    "Ekiti",
    /* "Federal Capital Territory",*/
    "Gombe",
    "Imo",
    "Jigawa",
    "Kaduna",
    "Kano",
    "Katsina",
    "Kebbi",
    "Kogi",
    "Kwara",
    /* "Lagos",*/
    "Nasarawa",
    "Niger",
    "Ogun",
    "Ondo",
    "Osun",
    /* "Oyo",*/
    "Plateau",
    /*"Rivers",*/
    "Sokoto",
    "Taraba",
    "Yobe",
    "Zamfara",
  ];

  toggleModal = () => {
    this.props.dispatch({
      type: actions.TOGGLE_DESKTOP_MODAL,
      data: { key: "isOpen", value: !this.props.isOpen },
    });
  };

  mobileToggleModal = () => {
    // this.setState({
    //   isMobileViewModalOpen: !this.props.isMobileViewModalOpen,
    // });

    if (
      !this.props.responses.phone_num ||
      this.props.responses.phone_num.length < 14
    ) {
      message.error("Please enter your phone number");
      return;
    } else {
      this.props.dispatch({
        type: actions.TOGGLE_MOBILE_MODAL,
        data: {
          key: "isMobileViewModalOpen",
          value: !this.props.isMobileViewModalOpen,
        },
      });
    }
  };

  toggleOthersInput = () => {
    // this.setState({
    //   isOthersInputOpen: !this.props.isOthersInputOpen,
    // });
    this.props.dispatch({
      type: actions.TOGGLE_OTHERS_MODAL,
      data: { key: "isOthersInputOpen", value: !this.props.isOthersInputOpen },
    });
  };

  changePage = (action: string) => {
    //console.log('called me?');

    this.props.dispatch({ type: actions.CHANGE_PAGE, data: action });
  };

  componentDidMount() {
    document.title = "Instacare - Home";
    this.fetchHmos();
    this.fetchProviders();
    this.fetchServices();
    this.fetchPlans();
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
          let services = servicesString ? JSON.parse(servicesString) : "";

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

  async fetchHmos() {
    this.props.dispatch({
      type: actions.IS_FETCHING_HMOS,
      data: true,
    });
    const res = await fetch(`${API_URL}/api/hmos`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "GET",
    });

    if (res) {
      let hmos: object[] = [];
      let formelo_resp = await res.json();
      this.props.dispatch({
        type: actions.IS_FETCHING_HMOS,
        data: false,
      });
      if (formelo_resp || formelo_resp.length !== 0) {
        for (let i = 0; i < formelo_resp.length; i++) {
          hmos.push(formelo_resp[i].data);
        }

        // formelo_resp.map((hmo) => {
        //   hmos.push(hmo.data);
        // });

        this.props.dispatch({
          type: actions.GET_HMOS,
          data: hmos,
        });
        return;
      }
    }
  }

  async fetchServices() {
    this.props.dispatch({
      type: actions.IS_FETCHING_SERVICES,
      data: true,
    });
    const res = await fetch(`${API_URL}/api/services`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "GET",
    });

    if (res) {
      let services: object[] = [];
      let formelo_resp = await res.json();
      this.props.dispatch({
        type: actions.IS_FETCHING_SERVICES,
        data: false,
      });
      if (formelo_resp || formelo_resp.length !== 0) {
        for (let i = 0; i < formelo_resp.length; i++) {
          services.push(formelo_resp[i].data);
        }

        this.props.dispatch({
          type: actions.GET_SERVICES,
          data: services,
        });
        return;
      }
    }
  }

  async fetchProviders() {
    this.props.dispatch({
      type: actions.IS_FETCHING_PROVIDERS,
      data: true,
    });
    const res = await fetch(`${API_URL}/api/providers`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "GET",
    });

    if (res) {
      let providers: object[] = [];
      let formelo_resp = await res.json();
      this.props.dispatch({
        type: actions.IS_FETCHING_PROVIDERS,
        data: false,
      });
      if (formelo_resp || formelo_resp.length !== 0) {
        for (let i = 0; i < formelo_resp.length; i++) {
          providers.push(formelo_resp[i].data);
        }

        this.props.dispatch({
          type: actions.GET_PROVIDERS,
          data: providers,
        });
        return;
      }
      console.log("providers", providers);
    }
  }

  async fetchRecommendedPlans() {
    this.handleNumOfPeopleCount();
    // console.log("this.props", this.props);
    let rec_plans: object[] = [];
    let family_plans: object[] = [];
    let individual_plans: object[] = [];

    this.props.dispatch({
      type: actions.IS_FETCHING_RECOMMENDED_PLANS,
      data: true,
    });
    let res = await this.props.plans;
    console.log("res", res);
    if (res) {
      if (res.length !== 0) {
        for (let i = 0; i < res.length; i++) {
          console.log("res[i].category_id.id:", res[i].category_id.id);
          if (
            //this.props.responses.num_of_people == 1 &&
            res[i].category_id.id == "personal"
          ) {
            console.log("personal");
            individual_plans.push(res[i]);
            //rec_plans.push(res[i]);
          }

          if (
            //this.props.responses.num_of_people > 1 &&
            res[i].category_id.id == "famiy"
          ) {
            console.log("family");
            // rec_plans.push(res[i]);
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

  handlePhone(val) {
    if (val) {
      console.log("val.length", val.length, "val", val);
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

  handleFullName(val) {
    this.props.dispatch({
      type: actions.UPDATE_FULL_NAME,
      data: { key: "full_name", value: val },
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

  handleType(val) {
    //let id = document.getElementById(val.target.id) as HTMLInputElement;
    this.props.dispatch({
      type: actions.UPDATE_TYPE,
      data: { key: "type", value: val.target.id },
    });
  }

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

    console.log(
      `
      this.props.responses.num_of_people
      `,
      this.props.responses.num_of_people
    );
  }

  preventDefault(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
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
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    );

    return singleInput;
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
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    );

    return couplesInput;
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
            {options.map((option) => (
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
            {child_options.map((option) => (
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
            {options.map((option) => (
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
            {child_options.map((option) => (
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
            {options.map((option) => (
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
                {child_options.map((option) => (
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
                {child_options.map((option) => (
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
                {child_options.map((option) => (
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
                {child_options.map((option) => (
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
                {child_options.map((option) => (
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
                {child_options.map((option) => (
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
                {child_options.map((option) => (
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
                {child_options.map((option) => (
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

  // handleNumOfPeopleChange(num: any) {
  //   console.log(num.target.id);
  //   let id = document.getElementById(num.target.id) as HTMLInputElement;
  //   this.setState({
  //     numOfPersons: num.target.id,
  //   });
  //}

  handleNavigation = (e: any) => {
    let currentPage = this.props.page;
    // console.log("currentPage:", currentPage);
    const targetId = e.target.id;
    if (
      !this.props.responses.phone_num ||
      this.props.responses.phone_num.length < 14
    ) {
      message.error("Please enter your phone number");
      return;
    }
    if (targetId === "next") {
      //console.log('this.props.isDesktopView', this.props.isDesktopView);
      if (this.props.isMobileViewModalOpen) {
        if (currentPage == 4) {
          if (this.props.responses.state == "") {
            message.error("Please provide a location");
            return;
          } else {
            this.fetchRecommendedPlans();
          }
        }
        console.log(
          "this.props.isMobileViewModalOpen",
          this.props.isMobileViewModalOpen,
          "currentPage",
          currentPage,
          "this.props.isDesktopView",
          this.props.isDesktopView
        );
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
        console.log("this.props.responses", this.props.responses);
        console.log(
          "currentPage",
          currentPage,
          "this.props.maxPage",
          this.props.maxPage
        );
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

  /**
   * @param {any[]} value
   */
  handleCheckbox = (value: any[]) => {
    this.props.dispatch({ type: actions.UPDATE_PREFS, data: value });
  };

  handleInput = (e: any) => {
    console.log(
      "e.target.name",
      e.target.name,
      "e.target.value",
      e.target.value
    );
    this.props.dispatch({
      type: actions.UPDATE_TEXT_RESPONSE,
      data: { key: e.target.name, value: e.target.value },
    });
  };

  handleAdult = (value) => {
    this.props.dispatch({
      type: actions.UPDATE_TEXT_RESPONSE,
      data: { key: "adult", value },
    });

    if (value == 2 && this.props.responses.children == 0) {
      this.props.dispatch({ type: actions.CHANGE_PLAN_TYPE, data: "couple" });
    }
    console.log(this.props.responses.type);
  };

  handleChildren = (value) => {
    console.log(value);
    this.props.dispatch({
      type: actions.UPDATE_TEXT_RESPONSE,
      data: { key: "children", value },
    });
    if (value == 1 && this.props.responses.adult == 0) {
      this.props.dispatch({
        type: actions.CHANGE_PLAN_TYPE,
        data: "individual",
      });
    } else if (value > 1 && this.props.responses.adult != 0) {
      this.props.dispatch({ type: actions.CHANGE_PLAN_TYPE, data: "family" });
    }
    console.log(value);
    console.log(this.props.responses);
  };

  handleInfants = (value) => {
    this.props.dispatch({
      type: actions.UPDATE_TEXT_RESPONSE,
      data: { key: "infants", value },
    });
    if (value == 1 && this.props.responses.adult == 0) {
      this.props.dispatch({
        type: actions.CHANGE_PLAN_TYPE,
        data: "individual",
      });
    } else if (value > 1 && this.props.responses.adult != 0) {
      this.props.dispatch({ type: actions.CHANGE_PLAN_TYPE, data: "family" });
    }
  };

  updateBudget = (e: any) => {
    const budget = [0, e.target.value];
    console.log("updating budget with: " + budget);
    this.props.dispatch({ type: actions.UPDATE_BUDGET, budget });
  };

  submitResponses() {
    let stringResp: any = JSON.stringify(this.props.responses);

    console.log("this.props.responses", this.props.responses);
    localStorage.setItem("responses", stringResp);
    this.props.history.push({
      //pathname: "/compare",
      pathname: "/plans",
      data: this.props.responses,
    });
  }

  onSearch = (searchText: string) => {
    let tempLocations: any[] = [];
    this.locations.forEach((item: string) => {
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
    console.log(this.props.responses.state);
  };

  covers = (val: any) => {
    console.log(typeof val);
    this.props.dispatch({
      type: actions.UPDATE_COVERS,
      data: { key: "covers", value: val },
    });
    console.log(this.props.covers);
  };

  updateLocation = (location: any) => {
    this.props.dispatch({
      type: actions.UPDATE_TEXT_RESPONSE,
      data: { key: "state", value: location },
    });
    console.log(this.props.responses.state);
  };

  handleDesktopView() {
    // this.setState({
    //   isDesktopView: !this.props.isDesktopView,
    // });
    this.props.dispatch({
      type: actions.TOGGLE_DESKTOP_VIEW,
      data: { key: "isDesktopView", value: false },
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

  goToDetails() {
    this.props.history.push({ pathname: "/details" });
  }

  renderQuizPages() {
    //console.log('d open')
    const page1 = (
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
                  <FontAwesomeIcon
                    className="gender icons-gender male"
                    icon={faMale}
                  />

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
                  <FontAwesomeIcon
                    className="gender icons-gender female"
                    icon={faFemale}
                  />
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
              placeholder="Full Name"
              required={true}
              onChange={(e) => {
                this.handleFullName(e.target.value);
              }}
              value={this.props.responses.full_name}
            ></input>
          </div>
        </div>
        <div className="form-group">
          <div className="col-md-12">
            <label>My number is</label>
          </div>

          <div className="col-md-12">
            <PhoneInput
              className={
                this.state.is_phone_valid
                  ? "form-control input-phone input-phone-desktop"
                  : "form-control input-phone input-phone-desktop invalid"
              }
              placeholder="11 - digit mobile number"
              //required={true}
              onChange={
                // (e) => {
                this.handlePhone
                //   (e.target.value);
                // }
              }
              defaultCountry="NG"
              value={this.props.responses.phone_num}
              type="phone"
              maxLength="13"
            />
          </div>
        </div>
      </div>
    );

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
                    <p>{this.steps[1].p}</p>
                    <h3>{this.steps[1].h3}</h3>
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

    /*if(this.props.page === 0) {
      this.toggleModal()
    }
    elseif (this.props.page === 1 
      || this.props.page === 0
      ) {
      return page1;
    } else */ if (
      this.props.page === 2
    ) {
      return page2;
    } else if (this.props.page === 3) {
      return page3;
    }

    //console.log("this.props.page", this.props.page);
    //console.log(this.props.responses)
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
              required={true}
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
                    <p>{this.steps[1].p}</p>
                    <h3>{this.steps[1].h3}</h3>
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
      console.log("page4");
      return page4;
    }
    //console.log("this.props.page before return", this.props.page);
    return <p>Not enough responses collected!</p>;
  }

  getClickedPlan = (index) => {
    console.log("index", index);
    this.props.dispatch({
      type: actions.GET_CLICKED_PLAN,
      data: this.props.plans[index],
      //data: this.props.recommended_plans[index],
    });
  };

  render() {
    //console.log("this.props.page", this.props.page);
    //console.log("this.props.hmos", this.props.hmos);
    //console.log("this.props.services", this.props.services);
    //console.log("this.props.providers", this.props.providers);
    //console.log("this.props.plans", this.props.plans);
    console.log("this.props", this.props);
    let current;
    if (this.props.page != 0) {
      current = this.props.page - 1;
    } else {
      current = 0;
    }

    //console.log("current:", current);
    return (
      <React.Fragment>
        <div className="main">
          <AppHeader />
          <div className="home">
            <div className="banner-div">
              <div className="container">
                <Row className="banner-content">
                  <Col xs={24} md={16} className="banner-container">
                    <div className="svg-and-text">
                      <Col xs={24} md={8} className="svg-img-div">
                        <div className="svg-img">
                          <img src="images/searching.svg"></img>
                        </div>
                      </Col>
                      <Col xs={24} md={16} className="banner-text">
                        <div className={styles.banner}>
                          <div className={styles.bannerContent} id="bannertext">
                            <p className={styles.textHeading}>
                              Find Health Plans Starting
                              <br />
                              <span className={styles.headingSpan}>
                                @ ₦19,999/year
                              </span>
                            </p>
                          </div>
                        </div>
                      </Col>
                    </div>

                    <div className="banner-bottom">
                      <div className="row col-md-12">
                        <div className="col-md-4 card mr-3">
                          <FontAwesomeIcon
                            className="banner-icon"
                            icon={faShieldAlt}
                          />
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
                          <FontAwesomeIcon
                            className="far banner-icon"
                            icon={faSmile}
                          />
                          <div className="card-text">
                            <h5>Insure</h5>
                            <p>You & your family</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Col>

                  <Col md={8} className="quiz">
                    <div className="home-frm form-div">
                      <form
                        onSubmit={this.preventDefault}
                        className="form desktop"
                      >
                        <p>
                          Compare HMO plans in Nigeria from the comfort of your
                          home
                        </p>
                        <h3 className="no-med">No medicals required</h3>
                        <div className="mobile-view-steps">
                          <div className="col-md-12">
                            <Steps current={0}>
                              {this.steps.map((step, i) => {
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
                              required={true}
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
                                if (
                                  this.props.responses.full_name &&
                                  this.props.responses.phone_num
                                ) {
                                  this.toggleModal();
                                } else {
                                  console.log("Enter your details");
                                }
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
                      <form
                        onSubmit={this.preventDefault}
                        className="form mobile"
                      >
                        <p>
                          Compare HMO plans in Nigeria from the comfort of your
                          home
                        </p>
                        <h3 className="no-med">No medicals required</h3>
                        <div className="mobile-view-steps">
                          <div className="col-md-12">
                            <Steps current={0}>
                              {this.mobile_steps.map((step, i) => {
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
                      <Modal
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
                                  this.props.page < 3
                                    ? this.toggleModal
                                    : this.handleNavigation
                                }
                              >
                                <FontAwesomeIcon
                                  className=""
                                  icon={faArrowLeft}
                                />
                              </Button>
                              <div className="modal-title">
                                {this.props.isDesktopView ? (
                                  current >= 0 && current < 3 ? (
                                    <div>
                                      <p>{this.steps[current].p}</p>
                                      <h3>{this.steps[current].h3}</h3>
                                    </div>
                                  ) : current < 0 || current == 0 ? (
                                    //this.toggleModal()
                                    <div>
                                      <p>{this.steps[0].p}</p>
                                      <h3>{this.steps[0].h3}</h3>
                                    </div>
                                  ) : (
                                    console.log("current is > 0", current)
                                  )
                                ) : (
                                  console.log("!this.props.isDesktopView")
                                )}

                                <Steps current={current}>
                                  {this.steps.map((step, i) => {
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
                      <Modal
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
                                <FontAwesomeIcon
                                  className=""
                                  icon={faArrowLeft}
                                />
                              </Button>

                              <div className="modal-title">
                                {current >= 0 ? (
                                  <div>
                                    <p>{this.mobile_steps[current].p}</p>
                                    <h3>{this.mobile_steps[current].h3}</h3>
                                  </div>
                                ) : current < 0 ? (
                                  <div>
                                    <p>{this.mobile_steps[0].p}</p>
                                    <h3>{this.mobile_steps[0].h3}</h3>
                                  </div>
                                ) : (
                                  ""
                                )}

                                <Steps current={current}>
                                  {this.mobile_steps.map((step, i) => {
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
                    </div>
                  </Col>
                </Row>
              </div>
            </div>

            <div className={styles.content}>
              <div className="top-plans container">
                <p className="breadcrmb">
                  <span className="home-span">Home</span>
                  <span className="sep">
                    <FontAwesomeIcon className="chev" icon={faChevronRight} />
                  </span>
                  <span>HMO Plans</span>
                </p>

                <div className="container row top-plans-content-wrapper">
                  <div className="col-md-8">
                    <section className="tabs_wrapper">
                      <div className="tabs health_tab">
                        <ul>
                          <li className="active">
                            <a href="" data-class="top_plans">
                              TOP PLANS
                            </a>
                          </li>
                        </ul>
                      </div>
                      <div className="tabs_details top_plans">
                        {this.props.plans.length > 0 ? (
                          this.props.plans.map((plan, i) => {
                            return (
                              <div className="card">
                                <div className="insurer_card_top">
                                  <div className="logo_top 1">
                                    <span className="logo-widget widget-insurer-logo">
                                      <img src={plan.hmo_id.logo} />
                                    </span>
                                  </div>
                                  <div className="title-h6">
                                    <div>{plan.hmo_id.name}</div>
                                    <span>{plan.name}</span>
                                  </div>
                                </div>
                                <div className="tag_tabs">
                                  {plan.category_id.name}
                                </div>
                                <div className="top-features">
                                  <div className="plan-features">
                                    {plan.service_id
                                      ? plan.service_id
                                          .slice(0, 2)
                                          .map((service) => {
                                            return (
                                              <div className="features-block">
                                                <i
                                                  className="features-icon"
                                                  data-icon="Hospital Room Eligibility"
                                                >
                                                  <FontAwesomeIcon
                                                    className="gift-icon"
                                                    icon={faGift}
                                                  />
                                                </i>
                                                <div>
                                                  <p className="feature-head">
                                                    {service}
                                                  </p>
                                                  {/* <p>
                                          Single Private A/C Room, ICU Charges
                                          upto SI
                                        </p> */}
                                                </div>
                                              </div>
                                            );
                                          })
                                      : ""}

                                    {/* <div className="features-block">
                                      <i
                                        className="features-icon"
                                        data-icon="Bonus on No Claim"
                                      >
                                        <FontAwesomeIcon
                                          className="gift-icon"
                                          icon={faGift}
                                        />
                                      </i>
                                      <div>
                                        <p className="feature-head">
                                          Bonus on No Claim
                                        </p>
                                       
                                      </div>
                                    </div> */}
                                  </div>
                                  <div className="features-action-bar">
                                    <div className="price-btn">
                                      <div className="price">
                                        <span>Starting at </span>
                                        <h5 className="">
                                          {" "}
                                          ₦
                                          {plan.category_id.id == "personal" &&
                                          plan.individual_annual_price
                                            ? plan.individual_annual_price
                                            : plan.category_id.id ==
                                                "personal" &&
                                              plan.individual_monthly_price
                                            ? plan.individual_monthly_price
                                            : plan.category_id.id == "family" &&
                                              plan.family_annual_price
                                            ? plan.family_annual_price
                                            : plan.category_id.id == "family" &&
                                              plan.family_monthly_price
                                            ? plan.family_monthly_price
                                            : plan.individual_annual_price}
                                          {/* ₦ 900/ month */}
                                        </h5>
                                      </div>
                                      <button
                                        className="btn-check-prem"
                                        onClick={() => {
                                          this.goToDetails();
                                          this.getClickedPlan(i);
                                        }}
                                      >
                                        Check Premium
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            );
                          })
                        ) : (
                          <div className="card">
                            <Spin />
                          </div>
                        )}

                        <div className="card top_plans_see_more see_more">
                          <a href="">
                            SEE MORE PLANS
                            <FontAwesomeIcon
                              className="chev"
                              icon={faChevronRight}
                            />
                          </a>
                        </div>
                      </div>
                    </section>
                  </div>

                  <div className="col-md-4">
                    <div className="card insurers">
                      <div className="card_heading">HMO Providers</div>
                      {this.props.hmos ? (
                        this.props.hmos.map((hmo) => {
                          return (
                            <a href="">
                              <div className="insurer_block">
                                <div className="hmo-logo-div">
                                  <img
                                    className="supplier_icon insurer_logo
                            hygeia-general-icon
                            "
                                    src={hmo.logo ? hmo.logo : ic_logo}
                                    // "https://www.hygeiahmo.com/wp-content/uploads/2018/11/Hygeia-Final-No-Left-Padding@1x.svg"
                                  />
                                  &nbsp;
                                </div>
                                <div className="insurer_name">
                                  <span>
                                    {hmo.name}
                                    {/* HMO */}
                                  </span>
                                </div>
                              </div>
                            </a>
                          );
                        })
                      ) : (
                        <a href="">
                          <div className="insurer_block">
                            <Spin />
                          </div>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="information  container">
                <div className="col-md-8">
                  <div className="hmo-def">
                    <h5>Health Management Organizations (HMOs)</h5>
                    <p>
                      HMO is an acronym for a “Health Maintenance Organisation”.
                      HMOs are organizations mandated solely to manage the
                      provision of health care services through Health Care
                      Facilities (Hospitals, Opticians, Dentists etc) accredited
                      by the Scheme. Basically, they are an intermediary between
                      the hospital and individuals/ companies seeking to provide
                      healthcare for themselves, families or employees.
                    </p>
                  </div>
                  <div className="hmo-plans-dev"></div>
                  <h5>HMO Plans</h5>
                  <p>
                    HMO plans offer a wide range of healthcare services through
                    a network of providers who agree to supply services to
                    members. With an HMO you'll likely have coverage for a
                    broader range of preventive healthcare services than you
                    would through another type of plan.
                  </p>
                  <div className="hmo-plans-importance">
                    <h5>Importance of HMO plans</h5>
                    <p>
                      With the increased demand for quality healthcare services,
                      medical treatment has now become quite expensive,
                      especially in the private hospitals. And without health
                      insurance, the hospital bills are enough to drain one's
                      savings.
                    </p>
                    <p>
                      Therefore, an HMO plan becomes an absolute necessity as it
                      offers coverage to the insured individual, family members
                      against the exorbitant hospital expenses in case of an
                      accident or illness.
                    </p>
                    <p>
                      We at InstaCare can help you buy the right HMO plan that
                      suits your requirement below is the list of HMO plans with
                      the top providers. You can do the comparison and find the
                      best health plan for your family.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const mapProps = (state: any) => {
  return {
    ...state.quiz.quiz,
    ...state.quiz,
  };
};

export default connect(mapProps)(Home);
