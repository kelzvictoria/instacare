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
} from "antd";
import {
  faHome,
  faMale,
  faFemale,
  faArrowLeft,
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

const { Step } = Steps;
const { Meta } = Card;

interface QuizProps {
  [x: string]: any;
  dispatch(args: any): any;
  page: number;
  minPage: number;
  maxPage: number;
  checked: string[];
  covers: string;
  dataSource: [];
  responses: {
    [x: string]: any;
    budget: number;
    type: string;
    firstName: string;
    lastName: string;
    email: string;
    state: string;
    adult: number;
    children: number;
    infants: number;
    services: any;
  };
}

class Home extends Component<
  QuizProps,
  {
    isOpen: boolean;
    numOfPersons: any;
    isOthersInputOpen: boolean;
    isMobileViewModalOpen: boolean;
    isDesktopView: boolean;
  }
> {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      isMobileViewModalOpen: false,
      isOthersInputOpen: false,
      numOfPersons: "parents",
      isDesktopView: false,
    };

    this.handleNumOfPeopleChange = this.handleNumOfPeopleChange.bind(this);
  }

  steps: { p: string; h3: string }[] = [
    {
      h3: "No medicals required",
      p: "Get HMO plans from the comfort of your home",
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
      p: "Get HMO plans from the comfort of your home",
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
    this.setState({
      isOpen: !this.state.isOpen,
    });
  };

  mobileToggleModal = () => {
    this.setState({
      isMobileViewModalOpen: !this.state.isMobileViewModalOpen,
    });
  };

  toggleOthersInput = () => {
    this.setState({
      isOthersInputOpen: !this.state.isOthersInputOpen,
    });
  };

  changePage = (action: string) => {
    this.props.dispatch({ type: actions.CHANGE_PAGE, data: action });
  };

  componentDidMount() {
    document.title = "Instacare - Home";
  }

  defaultGender() {
    return true;
  }

  preventDefault(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
  }

  showSingleInput() {
    const singleInput = (
      <div id="single-control">
        <label>Select Age</label>
        <Select key="single_age" />
      </div>
    );

    return singleInput;
  }

  showCouplesInput() {
    const couplesInput = (
      <div id="couples-control" className="col-md-6">
        <label>Age of the Eldest member</label>
        <Select key="couples_age" />
      </div>
    );

    return couplesInput;
  }

  showFamOf3Input() {
    const famOf3Input = (
      <div id="famOf3-controls" className="row">
        <div className="col-md-6">
          <label>Age of the Eldest member</label>
          <Select key="fam_of_3_eldest_age" />
        </div>
        <div className="col-md-6">
          <label>Select Age of Child</label>
          <Select key="fam_of_3_child_age" />
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
          <Select key="fam_of_4_adult_age" />
        </div>
        <div className="col-md-6">
          <label>Age of the Eldest Child</label>
          <Select key="fam_of_4_child_age" />
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
          <Select key="parent_age" />
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
            <Select key="self_age" />
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
            <Select key="spouse_age" />
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
                  // onClick={}
                  id="son"
                ></input>

                <span>Son</span>
              </label>
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
                  // onClick={}
                  id="daughter"
                ></input>

                <span>Daughter</span>
              </label>
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
            <Select key="father_age" />
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
            <Select key="mother_age" />
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
            <Select key="grandfather_age" />
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
            <Select key="grandmother_age" />
          </div>
        </div>
        <div className="col-md-12 row father-in-law">
          <div className="col-md-6 chkContainer">
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
            <Select key="father_in_law_age" />
          </div>
        </div>
        <div className="col-md-12 row mother-in-law">
          <div className="col-md-6 chkContainer">
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
            <Select key="mother_in_law_age" />
          </div>
        </div>
      </div>
    );
    return othersInput;
  }

  handleNumOfPeopleChange(num: any) {
    console.log(num.target.id);
    let id = document.getElementById(num.target.id) as HTMLInputElement;
    this.setState({
      numOfPersons: num.target.id,
    });
    //console.log(this.state.numOfPersons);
  }

  handleNavigation = (e: any) => {
    let currentPage = this.props.page;
    // console.log("currentPage:", currentPage);
    const targetId = e.target.id;
    if (targetId === "next") {
      if (currentPage == 4 && this.props.responses.state == "") {
        message.error("Please provide a location");
        return;
      }
      if (currentPage >= this.props.maxPage) {
        console.log("this.props.maxPage", this.props.maxPage);
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
    this.props.dispatch({
      type: actions.UPDATE_TEXT_RESPONSE,
      data: { key: e.target.name, value: e.target.value },
    });
  };

  handleAdult = (value) => {
    /* if(e.target.value=="family"){
            this.props.dispatch({type:actions.TOGGLE_FAMILY_PLAN_SELECTED, data:{ value:true}})
        }else if(e.target.value !="family"){
            this.props.dispatch({type:actions.TOGGLE_FAMILY_PLAN_SELECTED, data:{ value:false}})
        }*/
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
    localStorage.setItem("responses", stringResp);
    this.props.history.push({
      pathname: "/compare",
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
    this.setState({
      isDesktopView: !this.state.isDesktopView,
    });
  }

  renderQuizPages() {
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
            <input className="form-control" placeholder="Full Name"></input>
          </div>
        </div>
        <div className="form-group">
          <div className="col-md-12">
            <label>My number is</label>
          </div>

          <div className="col-md-12">
            <input
              className="form-control input-phone input-phone-desktop "
              placeholder="11 - digit mobile number"
            ></input>
          </div>
        </div>
        {/* <div className="form-group">
          <div className="col-md-12">
            <button
              className="btn btn-primary btn-large view-plans btn-demo"
              onClick={this.handleNavigation}
              id="next"
            >
              Continue
            </button>
          </div>
        </div> */}
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
                  defaultChecked={this.state.numOfPersons === "single"}
                  onClick={this.handleNumOfPeopleChange}
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
                  defaultChecked={this.state.numOfPersons === "couple"}
                  onClick={this.handleNumOfPeopleChange}
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
                  defaultChecked={this.state.numOfPersons === "fam-of-3"}
                  onClick={this.handleNumOfPeopleChange}
                  // onClick={(e) =>
                  //   this.handleNumOfPeopleChange("fam-of-3")
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
                  defaultChecked={this.state.numOfPersons === "fam-of-4"}
                  onClick={this.handleNumOfPeopleChange}
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
                  defaultChecked={this.state.numOfPersons === "parents"}
                  onClick={this.handleNumOfPeopleChange}
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
                  defaultChecked={this.state.numOfPersons === "others"}
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
                show={this.state.isOthersInputOpen}
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
            {this.state.numOfPersons == "single" ? this.showSingleInput() : ""}
          </div>
        </div>

        <div className="form-group couple-input" id="couple-input">
          {this.state.numOfPersons == "couple" ? this.showCouplesInput() : ""}
        </div>

        <div
          className="form-group fam-of-3-input col-md-12"
          id="fam-of-3-input"
        >
          {this.state.numOfPersons == "fam-of-3" ? this.showFamOf3Input() : ""}
        </div>

        <div
          className="form-group fam-of-4-input col-md-12"
          id="fam-of-4-input"
        >
          {this.state.numOfPersons == "fam-of-4" ? this.showFamOf4Input() : ""}
        </div>

        <div className="form-group parents-age" id="parents-age">
          {this.state.numOfPersons == "parents" ? this.showParentsInput() : ""}
        </div>

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
              className="btn btn-primary btn-large view-plans btn-demo"
              data-toggle="modal"
              data-target="#myModal2"
              id="next"
            >
              Continue
            </button>
          </div>
        </div> */}
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
    if (this.props.page === 1 || this.props.page === 0) {
      return page1;
    } else if (this.props.page === 2) {
      return page2;
    } else if (this.props.page === 3) {
      return page3;
    }
    console.log("this.props.page", this.props.page);
    return <p>Not enough responses collected!</p>;
  }

  renderMobileViewQuizPages() {
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
            <input className="form-control" placeholder="Full Name"></input>
          </div>
        </div>

        {/* <div className="form-group">
          <div className="col-md-12">
            <button
              className="btn btn-primary btn-large view-plans btn-demo"
              onClick={this.handleNavigation}
              id="next"
            >
              Continue
            </button>
          </div>
        </div> */}
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
                  defaultChecked={this.state.numOfPersons === "single"}
                  onClick={this.handleNumOfPeopleChange}
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
                  defaultChecked={this.state.numOfPersons === "couple"}
                  onClick={this.handleNumOfPeopleChange}
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
                  defaultChecked={this.state.numOfPersons === "fam-of-3"}
                  onClick={this.handleNumOfPeopleChange}
                  // onClick={(e) =>
                  //   this.handleNumOfPeopleChange("fam-of-3")
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
                  defaultChecked={this.state.numOfPersons === "fam-of-4"}
                  onClick={this.handleNumOfPeopleChange}
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
                  defaultChecked={this.state.numOfPersons === "parents"}
                  onClick={this.handleNumOfPeopleChange}
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
                  defaultChecked={this.state.numOfPersons === "others"}
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
                show={this.state.isOthersInputOpen}
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
            {this.state.numOfPersons == "single" ? this.showSingleInput() : ""}
          </div>
        </div>

        <div className="form-group couple-input" id="couple-input">
          {this.state.numOfPersons == "couple" ? this.showCouplesInput() : ""}
        </div>

        <div
          className="form-group fam-of-3-input col-md-12"
          id="fam-of-3-input"
        >
          {this.state.numOfPersons == "fam-of-3" ? this.showFamOf3Input() : ""}
        </div>

        <div
          className="form-group fam-of-4-input col-md-12"
          id="fam-of-4-input"
        >
          {this.state.numOfPersons == "fam-of-4" ? this.showFamOf4Input() : ""}
        </div>

        <div className="form-group parents-age" id="parents-age">
          {this.state.numOfPersons == "parents" ? this.showParentsInput() : ""}
        </div>

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
              className="btn btn-primary btn-large view-plans btn-demo"
              data-toggle="modal"
              data-target="#myModal2"
              id="next"
            >
              Continue
            </button>
          </div>
        </div> */}
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
    console.log("this.props.page", this.props.page);
    if (this.props.page === 2 || this.props.page === 1) {
      console.log("page2");
      return page2;
    } else if (this.props.page === 3) {
      console.log("page3");
      return page3;
    } else if (this.props.page === 4) {
      console.log("page4");
      return page4;
    }
    console.log("this.props.page before return", this.props.page);
    return <p>Not enough responses collected!</p>;
  }

  render() {
    //console.log("this.props.page", this.props.page);
    let current = this.props.page - 1;

    //console.log("current:", current);
    return (
      <React.Fragment>
        <div className="main">
          <AppHeader />
          <div className="container home">
            <Row className="banner-content">
              <Col xs={24} md={16} className="svg-and-text">
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
                          @ ₦18,000/year
                        </span>
                      </p>
                    </div>
                  </div>
                </Col>
              </Col>

              <Col md={8} className="quiz">
                <div className="home-frm form-div">
                  <form onSubmit={this.preventDefault} className="form desktop">
                    <p>Get HMO plans from the comfort of your home</p>
                    <h3>No medicals required</h3>
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
                        <input
                          className="form-control"
                          placeholder="Enter phone number"
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

                    <div className="form-group home-fullname">
                      <div className="col-md-12">
                        <label>My name is</label>
                      </div>

                      <div className="col-md-12">
                        <input
                          className="form-control"
                          placeholder="Full Name"
                        ></input>
                      </div>
                    </div>
                    <div className="form-group home-phonenum">
                      <div className="col-md-12">
                        <label>My number is</label>
                      </div>

                      <div className="col-md-12">
                        <input
                          className="form-control"
                          placeholder="11 - digit mobile number"
                        ></input>
                      </div>
                    </div>
                    <div className="form-group home-view-btn">
                      <div className="col-md-12">
                        <button
                          className="btn btn-primary btn-large view-plans btn-demo"
                          onClick={() => {
                            this.toggleModal();
                            this.handleDesktopView();
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
                  <form onSubmit={this.preventDefault} className="form mobile">
                    <p>Get HMO plans from the comfort of your home</p>
                    <h3>No medicals required</h3>
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
                        <input
                          className="form-control"
                          placeholder="Enter phone number"
                        />
                      </div>
                    </div>
                    <div className="form-group mobile-view-cont-btn">
                      <div className="col-md-12">
                        <button
                          className="btn btn-primary btn-large view-plans btn-demo"
                          onClick={this.mobileToggleModal}
                        >
                          Continue
                        </button>
                      </div>
                    </div>
                  </form>
                  <Modal
                    dialogClassName="custom-dialog"
                    className="right"
                    show={this.state.isOpen}
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
                              this.props.page < 2
                                ? this.toggleModal
                                : this.handleNavigation
                            }
                          >
                            <FontAwesomeIcon className="" icon={faArrowLeft} />
                          </Button>
                          <div className="modal-title">
                            {this.state.isDesktopView ? (
                              current >= 0 ? (
                                <div>
                                  <p>{this.steps[current].p}</p>
                                  <h3>{this.steps[current].h3}</h3>
                                </div>
                              ) : current < 0 ? (
                                <div>
                                  <p>{this.steps[0].p}</p>
                                  <h3>{this.steps[0].h3}</h3>
                                </div>
                              ) : (
                                ""
                              )
                            ) : (
                              ""
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
                    className="right"
                    show={this.state.isMobileViewModalOpen}
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
                              this.props.page < 2
                                ? this.mobileToggleModal
                                : this.handleNavigation
                            }
                          >
                            <FontAwesomeIcon
                              className=""
                              icon={faArrowLeft}
                              // onClick={
                              //   this.props.page < 2
                              //     ? this.toggleModal
                              //     : this.handleNavigation
                              // }
                            />
                          </Button>
                          {/*
                        ) : (
                            ""
                          )}

                        */}
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
                          {/*<div className="col-md-6">
                            <div className="form-group">
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
                          </div>*/}
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

            <div className={styles.content}>
              <h1 className={styles.title}>How it works</h1>
              <Row gutter={{ md: 8 }}>
                {sections.map((section, i) => {
                  return (
                    <Col xs={24} md={{ span: 8 }} key={i}>
                      <div
                        className={styles.iconCard}
                        style={section.color ? { color: section.color } : {}}
                      >
                        <Icon type={section.icon} />
                      </div>
                      <p className={styles.sectionText}>{section.text}</p>
                    </Col>
                  );
                })}
              </Row>
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
  };
};

export default connect(mapProps)(Home);
