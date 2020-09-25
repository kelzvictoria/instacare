import React, { Component } from "react";
import {
  Input,
  Row,
  Col,
  Checkbox,
  Modal,
  Button,
  Icon,
  Steps,
  AutoComplete,
  Form,
  Select,
  Card,
  InputNumber,
  message,
} from "antd";
import styles from "./Quiz.module.scss";
import { NAIRA_SIGN } from "../../utils/index";
import { connect } from "react-redux";
import AppHeader from "../../components/app-header/AppHeader";
import * as actions from "../../utils/actions";
import { Redirect } from "react-router";

const { Step } = Steps;
const { Option } = Select;
const { Meta } = Card;
const { confirm } = Modal;

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

class Quiz extends Component<QuizProps> {
  changePage = (action: string) => {
    this.props.dispatch({ type: actions.CHANGE_PAGE, data: action });
  };

  componentDidMount() {
    document.title = "HMO Connect";
  }

  onChange(checkedValues) {
    console.log("checked = ", checkedValues);
  }

  checkboxOptions = [
    {
      label: "Dental care",
      value: "dentalOptions",
    },
    {
      label: "Immunization",
      value: "immunizations",
    },
    {
      label: "Optical care",
      value: "opticalOptions",
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
  ];

  steps: { title: string; description?: string }[] = [
    {
      title: "Basic information",
      description: "Please provide us with some details about yourself",
    },
    {
      title: "Healthcare benefits",
      description: "Optional, it helps us find the best plans for you",
    },
    {
      title: "Location",
      description: "Optional, helps us find providers near you",
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

  handleNavigation = (e: any) => {
    let currentPage = this.props.page;
    const targetId = e.target.id;
    if (targetId === "next") {
      if (currentPage == 3 && this.props.responses.state == "") {
        message.error("Please provide a location");
        return;
      }
      if (currentPage >= this.props.maxPage) {
        this.submitResponses();
        return;
      }
      /*if (!this.validateEmail(this.props.responses.email)) {
                const email: any = document.querySelector("input[type=email]");
                email.focus();
                message.error("Please enter a valid email");
                return;
            }
            if(currentPage==3 &&this.props.responses.state==""){
               const budget: any = document.querySelector("input[type=number]");
                budget.focus();
                message.error("Please provide a budget of least N20,000");
                return
            }*/
      this.changePage("next");
    } else if (targetId === "prev") {
      if (currentPage <= this.props.minPage) {
        return;
      }
      this.changePage("prev");
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
  /* validateEmail=(email:any) =>{
        if(emailRegex({exact: true}).test(email)){
            return true;
        }
        return false;
    }*/

  covers = (val: any) => {
    console.log(typeof val);
    this.props.dispatch({
      type: actions.UPDATE_COVERS,
      data: { key: "covers", value: val },
    });
    console.log(this.props.covers);
  };

  /*
      hello =()=>{
          if(this.props.responses.adult==2 && this.props.responses.children==0 && this.props.responses.infants==0){
          console.log("hello couples")
         
         let changeToCouple =() =>{
            this.props.dispatch({type: actions.CHANGE_PLAN_TYPE, data: {value:"couple"}})
        }
          confirm({
            title: 'would you like a couples plan?',
            content: '(because you selected a plan for two adults)',
            okText: 'Yes',
            okType: 'primary',
            okButtonProps: {
              disabled: false,
            },
            cancelText: 'No',
            onOk() {
               changeToCouple();
            },
            onCancel() {
              console.log('Cancel');
            },
          });
        
      }
      else{
          console.log("moved on to family")
      }
      }
      */
  updateLocation = (location: any) => {
    this.props.dispatch({
      type: actions.UPDATE_TEXT_RESPONSE,
      data: { key: "state", value: location },
    });
    console.log(this.props.responses.state);
  };

  renderQuizPages() {
    const page1 = (
      <div id="pageOne" style={{ textAlign: "center" }}>
        <Row gutter={16}></Row>
        <Row>
          <Col xs={24} md={24}>
            <Form.Item
              style={{ textAlign: "left" }}
              colon={false}
              label="How many people will be covered under the plan(s)?"
            ></Form.Item>
          </Col>
          <Col xs={24} md={24}>
            <div style={{ width: "100%", textAlign: "left" }}>
              <Row>
                <Col span={8}>
                  Adults{" "}
                  <InputNumber
                    min={0}
                    max={1000}
                    defaultValue={1}
                    onChange={this.handleAdult}
                  />
                </Col>
                <Col span={8}>
                  Children{" "}
                  <InputNumber
                    min={0}
                    max={1000}
                    defaultValue={0}
                    onChange={this.handleChildren}
                  />
                </Col>
                <Col span={8}>
                  Infants{" "}
                  <InputNumber
                    min={0}
                    max={1000}
                    defaultValue={0}
                    onChange={this.handleInfants}
                  />
                </Col>
              </Row>
            </div>
          </Col>
        </Row>
      </div>
    );
    // endOf Page 1

    const page2 = (
      <div id="pageTwo" style={{ textAlign: "left" }}>
        <Checkbox.Group
          onChange={this.handleCheckbox}
          options={this.checkboxOptions}
          defaultValue={this.props.checked}
          className={styles.checkbox}
        />
      </div>
    );
    // endOf Page 2

    const page3 = (
      <div id="pageThree" style={{ textAlign: "center" }}>
        <div>
          <Row gutter={48}>
            <Col xs={24} md={24}>
              <Form.Item
                style={{ textAlign: "left" }}
                colon={false}
                label="Where do you live?"
              ></Form.Item>
            </Col>
            {this.props.responses.state == "Lagos" ? (
              <Col xs={12} md={12} lg={6}>
                <Card
                  hoverable
                  style={{
                    width: 140,
                    height: 155,
                    filter: "drop-shadow(5px 5px 10px rgba(38, 166, 91, 1)",
                    border: "solid #38A169 3px",
                  }}
                  cover={<img alt="lagos" src="../images/Lagos.jpg" />}
                  onClick={() => this.updateLocation("Lagos")}
                >
                  <Meta title="Lagos" />
                </Card>
                ,
              </Col>
            ) : (
              <Col xs={12} md={12} lg={6}>
                <Card
                  hoverable
                  style={{ width: 140, height: 155, filter: "grayscale(60%)" }}
                  cover={<img alt="lagos" src="../images/Lagos.jpg" />}
                  onClick={() => this.updateLocation("Lagos")}
                >
                  <Meta title="Lagos" />
                </Card>
                ,
              </Col>
            )}
            {this.props.responses.state == "Federal Capital Territory" ? (
              <Col xs={12} md={12} lg={6}>
                <Card
                  hoverable
                  style={{
                    width: 140,
                    height: 155,
                    filter: "drop-shadow(5px 5px 10px rgba(38, 166, 91, 1)",
                    border: "solid #38A169 3px",
                  }}
                  cover={<img alt="Abuja" src="../images/Abuja.jpg" />}
                  onClick={() =>
                    this.updateLocation("Federal Capital Territory")
                  }
                >
                  <Meta title="Abuja" />
                </Card>
                ,
              </Col>
            ) : (
              <Col xs={12} md={12} lg={6}>
                <Card
                  hoverable
                  style={{ width: 140, height: 155, filter: "grayscale(60%)" }}
                  cover={<img alt="Abuja" src="../images/Abuja.jpg" />}
                  onClick={() =>
                    this.updateLocation("Federal Capital Territory")
                  }
                >
                  <Meta title="Abuja" />
                </Card>
                ,
              </Col>
            )}
            {this.props.responses.state == "Rivers" ? (
              <Col xs={12} md={12} lg={6}>
                <Card
                  hoverable
                  style={{
                    width: 140,
                    height: 155,
                    filter: "drop-shadow(5px 5px 10px rgba(38, 166, 91, 1)",
                    border: "solid #38A169 3px",
                  }}
                  cover={<img alt="Rivers" src="../images/rivers.jpg" />}
                  onClick={() => this.updateLocation("Rivers")}
                >
                  <Meta title="Rivers" />
                </Card>
              </Col>
            ) : (
              <Col xs={12} md={12} lg={6}>
                <Card
                  hoverable
                  style={{ width: 140, height: 155, filter: "grayscale(60%)" }}
                  cover={<img alt="Rivers" src="../images/rivers.jpg" />}
                  onClick={() => this.updateLocation("Rivers")}
                >
                  <Meta title="Rivers" />
                </Card>
              </Col>
            )}
            {this.props.responses.state == "Oyo" ? (
              <Col xs={12} md={12} lg={6}>
                <Card
                  hoverable
                  style={{
                    width: 140,
                    height: 155,
                    filter: "drop-shadow(5px 5px 10px rgba(38, 166, 91, 1)",
                    border: "solid #38A169 3px",
                  }}
                  cover={
                    <img alt="Oyo" height="93px" src="../images/oyo.jpg" />
                  }
                  onClick={() => this.updateLocation("Oyo")}
                >
                  <Meta title="Oyo" />
                </Card>
                ,
              </Col>
            ) : (
              <Col xs={12} md={12} lg={6}>
                <Card
                  hoverable
                  style={{ width: 140, height: 155, filter: "grayscale(60%)" }}
                  cover={
                    <img alt="Oyo" height="93px" src="../images/oyo.jpg" />
                  }
                  className={styles.cardhover}
                  onClick={() => this.updateLocation("Oyo")}
                >
                  <Meta title="Oyo" />
                </Card>
              </Col>
            )}
          </Row>
          <Form.Item
            colon={false}
            label="Other States"
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
      </div>
    );
    // endOf Page 3
    if (this.props.page === 1) {
      return page1;
    } else if (this.props.page === 2) {
      return page2;
    } else if (this.props.page === 3) {
      return page3;
    }

    return <p>Not enough responses collected!</p>;
  }

  render() {
    let current = this.props.page - 1;
    return (
      <React.Fragment>
        <AppHeader />

        <div className={styles.quizPage}>
          <Row>
            <Col md={24}>
              <Steps current={current}>
                {this.steps.map((step, i) => {
                  return (
                    <Step
                      title={step.title}
                      description={step.description}
                      key={i}
                    />
                  );
                })}
              </Steps>
            </Col>
          </Row>
          {this.props.page == 1 ? (
            <Col md={12} style={{ marginTop: "6rem" }}>
              <img width="80%" src="../../images/INFO.svg" alt="" />
            </Col>
          ) : this.props.page == 2 ? (
            <Col md={12} style={{ marginTop: "6rem" }}>
              <img width="80%" src="../../images/doctors.svg" alt="" />
            </Col>
          ) : (
            <Col md={12} style={{ marginTop: "6rem" }}>
              <img width="80%" src="../../images/map2.svg" alt="" />
            </Col>
          )}
          <Col className={styles.container} md={12}>
            {this.renderQuizPages()}

            <div className={styles.textCenter + " " + styles.navButtons}>
              {this.props.page != 1 ? (
                <Button
                  onClick={this.handleNavigation}
                  id="prev"
                  type="default"
                  size="large"
                >
                  <Icon type="left" />
                  Previous
                </Button>
              ) : (
                console.log("page 1")
              )}
              <Button
                onClick={this.handleNavigation}
                id="next"
                type="primary"
                size="large"
              >
                Next
                <Icon type="right" />
              </Button>
            </div>
          </Col>
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

export default connect(mapProps)(Quiz);
