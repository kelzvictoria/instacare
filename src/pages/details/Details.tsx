import React, { Component } from "react";
import { formatAsCurrency } from "../../utils/index";
import { Link } from "react-router-dom";
import styles from "./Details.module.scss";
import { connect } from "react-redux";
import { PAYSTACK_PUBLIC_KEY } from "../../utils/index";
import { UPDATE_PRICE, TOGGLE_BUYING_PLAN } from "../../actions/types";
import { UPDATE_NOTGETTINGPROVIDERS } from "../../actions/types";
import * as actions from "../../actions/types";
import Modal from "react-responsive-modal";
import {
  Card,
  Row,
  Col,
  Button,
  Icon,
  Divider,
  Table,
  Input,
  Collapse,
  Form,
  Tabs,
} from "antd";

import PaystackButton from "react-paystack";
import { CONNREFUSED } from "dns";

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

class Details extends Component<DetailsProps> {
  state = {
    searchText: "",

    open: false,
  };

  //search implenteation
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
    predetails = localStorage.getItem("services");
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

  precovers: any = localStorage.getItem("services");
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

  render() {
    {
      console.log(this.details);
    }
    const { open } = this.state;
    return (
      <div className={styles.content}>
        <Row gutter={8}>
          <Col xs={24} md={24}>
            <div style={{ marginBottom: "2.5rem" }}>
              <Link
                to={{
                  pathname: "/compare",
                }}
              >
                <Button
                  size="small"
                  onClick={this.notGettingProvidersView}
                  type="default"
                  className={styles.toLeft}
                >
                  <span style={{ float: "left" }}>
                    <Icon type="left" /> <Divider type="vertical"></Divider>Back
                  </span>
                </Button>
              </Link>
            </div>
          </Col>
          <Col xs={24} md={24}>
            <Tabs defaultActiveKey="1" onChange={this.toggleView}>
              <TabPane tab="Features" key="1"></TabPane>
              <TabPane tab="Providers" key="2"></TabPane>
            </Tabs>
          </Col>

          <Col xs={24} md={16}>
            <Modal open={open} onClose={this.onCloseModal} center>
              <Col xs={24}>
                <h2 style={{ textAlign: "center" }}>
                  To buy {this.details.name.toLowerCase()} , please fill the
                  form below
                </h2>
              </Col>
              <Col xs={12} style={{ marginBottom: "1rem" }}>
                <Form.Item
                  colon={false}
                  label="Enter first name"
                  style={{ textAlign: "left" }}
                >
                  <Input
                    size="large"
                    onChange={this.handleInput}
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    defaultValue={this.props.quiz.responses.firstName}
                  />
                </Form.Item>
              </Col>
              <Col xs={12} style={{ marginBottom: "1rem" }}>
                <Form.Item
                  colon={false}
                  label="Enter last name"
                  style={{ textAlign: "left" }}
                >
                  <Input
                    size="large"
                    onChange={this.handleInput}
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    defaultValue={this.props.quiz.responses.lastName}
                  />
                </Form.Item>
              </Col>
              <Col xs={24} style={{ marginBottom: "1rem" }}>
                <Form.Item
                  required={true}
                  colon={false}
                  label="Email address"
                  style={{ textAlign: "left" }}
                >
                  <Input
                    size="large"
                    onChange={this.handleInput}
                    type="email"
                    name="email"
                    placeholder="someone@example.com"
                    defaultValue={this.props.quiz.responses.email}
                  />
                </Form.Item>
              </Col>
              <Col xs={24} style={{ textAlign: "center" }}>
                <PaystackButton
                  text="Submit"
                  className="ant-btn ant-btn-primary ant-btn-lg"
                  callback={this.callback}
                  close={this.close}
                  email={this.props.email}
                  amount={this.props.details.price}
                  reference={this.getReference()}
                  paystackkey={PAYSTACK_PUBLIC_KEY}
                />
              </Col>
            </Modal>

            {notGettingProviders ? (
              <Row gutter={8}>
                <Col md={8}>
                  {this.details.covers == "1" ? (
                    <Card
                      style={{ width: "100%" }}
                      cover={
                        <img
                          alt="example"
                          src="../images/individual.svg"
                          height="200px"
                        />
                      }
                    >
                      <Meta
                        title={<h4>This plan covers one person</h4>}
                        // description="This Plan Covers One Person"
                      />
                    </Card>
                  ) : this.details.covers == "2" ? (
                    <Card
                      style={{ width: "100%" }}
                      cover={
                        <img
                          alt="example"
                          src="../images/couple.svg"
                          height="200px"
                        />
                      }
                    >
                      <Meta title="This Plan Covers Two People" />
                    </Card>
                  ) : (
                    <Card
                      style={{ width: "100%" }}
                      cover={
                        <img
                          alt="example"
                          src="../images/group.svg"
                          height="200px"
                        />
                      }
                    >
                      <Meta title="" />
                      <p>This plan covers {this.details.covers} people</p>
                    </Card>
                  )}
                </Col>

                <Col md={16}>
                  <Collapse defaultActiveKey={["1"]} onChange={this.callb}>
                    <Panel header="Benefits of this plan" key="1">
                      <h3>
                        Features <span style={{ float: "right" }}>Limits</span>
                      </h3>
                      <p>Malaria Treatment</p>
                      <p>Typhoid Treatment</p>
                      {this.AllServices[0] != 0 ? (
                        <p>
                          <span style={{ width: "80%" }}>
                            Accidents and Emergencies
                          </span>{" "}
                          <span style={{ float: "right" }}>
                            {formatAsCurrency(this.AllServices[0])}
                          </span>
                        </p>
                      ) : (
                        console.log("emergency zero")
                      )}
                      {this.AllServices[1] ? (
                        this.AllServices[1].limit > 0 ? (
                          <p>
                            <span style={{ width: "80%" }}>
                              Ambulance Services
                            </span>{" "}
                            <span style={{ float: "right" }}>
                              {formatAsCurrency(this.AllServices[1].limit)}
                            </span>
                          </p>
                        ) : (
                          <p>Ambulance Services</p>
                        )
                      ) : (
                        console.log("emergency zero")
                      )}
                      {this.AllServices[2] ? (
                        <p style={{ width: "80%" }}>
                          Cancer Care -{" "}
                          {this.covers.cancerCare.offerings.join(" , ")}
                        </p>
                      ) : (
                        console.log("no cancer care")
                      )}
                      {this.AllServices[3] && this.AllServices[3] != null ? (
                        <p style={{ width: "80%" }}>
                          Chronic Disease Medication
                        </p>
                      ) : (
                        console.log("cancer care")
                      )}
                      {this.AllServices[4] ? (
                        <p style={{ width: "80%" }}>
                          Consultations - {this.covers.consultations.join(" ,")}
                        </p>
                      ) : (
                        console.log("consultations")
                      )}
                      {this.AllServices[5] || this.AllServices[5] != 0 ? (
                        <p>Death Benefits</p>
                      ) : (
                        console.log("Death Benefits")
                      )}
                      {this.AllServices[6] ? (
                        <p style={{ width: "80%" }}>
                          Dental Options -{" "}
                          {this.covers.dentalOptions.offerings.join(" , ")}
                        </p>
                      ) : (
                        console.log("No dental")
                      )}
                      {this.AllServices[7] &&
                      typeof this.AllServices[7] != null ? (
                        this.covers.diagnostics.offerings[1] &&
                        this.covers.diagnostics.limit ? (
                          <p style={{ width: "80%" }}>
                            <span>Diagnostics</span> -{" "}
                            {this.covers.diagnostics.offerings[0]},
                            {this.covers.diagnostics.offerings[1]},{" "}
                            <span style={{ float: "right" }}>
                              {" "}
                              {formatAsCurrency(this.covers.diagnostics.limit)}
                            </span>
                          </p>
                        ) : (
                          <p style={{ width: "80%" }}>
                            <span>Diagnostics</span> -{" "}
                            {this.covers.diagnostics.offerings[0]}
                          </p>
                        )
                      ) : (
                        console.log("dental")
                      )}
                      {this.AllServices[8] ? (
                        <p>Dialysis</p>
                      ) : (
                        console.log("No dialysis")
                      )}
                      {this.AllServices[9] ? (
                        this.AllServices[9].length > 0 ? (
                          <p style={{ width: "80%" }}>
                            Family Planning Services -{" "}
                            {this.covers.familyPlanningServices.join(" , ")}
                          </p>
                        ) : (
                          console.log("no family planning")
                        )
                      ) : (
                        console.log("no family planning")
                      )}
                      {this.AllServices[10] ? (
                        <p>Hiv Treatment</p>
                      ) : (
                        console.log("hiv")
                      )}
                      {this.AllServices[11] ? (
                        <p style={{ width: "80%" }}>
                          Immunizations -{" "}
                          {this.covers.immunizations.offerings.join(" , ")}
                        </p>
                      ) : (
                        console.log("immunization")
                      )}
                      {this.AllServices[12] &&
                      this.AllServices[12].length > 0 ? (
                        <p style={{ width: "80%" }}>
                          Natal Care - {this.covers.natalCare.join(" , ")}
                        </p>
                      ) : (
                        console.log("natal")
                      )}
                      {this.AllServices[13] &&
                      this.AllServices[13].length > 0 ? (
                        <p style={{ width: "80%" }}>
                          Optical Options -{" "}
                          {this.covers.opticalOptions.offerings.join(" , ")}
                        </p>
                      ) : (
                        console.log("immunization")
                      )}
                      {this.AllServices[14] > 0 ? (
                        <p>
                          Pharmacy{" "}
                          <span style={{ float: "right" }}>
                            {formatAsCurrency(this.covers.pharmacyCover)}
                          </span>
                        </p>
                      ) : (
                        console.log("pharm")
                      )}
                    </Panel>
                  </Collapse>
                </Col>
              </Row>
            ) : (
              <Table dataSource={this.dataSourceA} columns={this.columns} />
            )}
          </Col>
          <Col xs={24} md={8}>
            <Card
              hoverable
              style={{
                width: "100%",
                backgroundColor: "#EEEEEE",
                textAlign: "center",
              }}
              cover={
                <img
                  alt="example"
                  style={{ margin: "20px auto", maxWidth: "70%" }}
                  src={this.details.imageUrl}
                />
              }
            >
              <Meta
                title={this.details.name}
                style={{
                  textAlign: "center",
                  marginBottom: "2%",
                  color: "white",
                }}
              />

              <p style={{ fontSize: "3rem" }}>
                {formatAsCurrency(this.details.price)}
              </p>
              <Button size="large" type="primary" onClick={this.onOpenModal}>
                Buy Plan
              </Button>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}
const mapProps = (state: any) => {
  return {
    // ...state.details,
    // email: state.quiz.quiz.responses.email,
    responses: state.quiz.responses,
    services: state.fetchData.services,
  };
};
export default connect(mapProps)(Details);
