import React, { Component } from "react";
/*import { API_URL } from "../../config";*/
//import styles from "../compare/Compare.module.scss";
import { connect } from "react-redux";
import * as actions from "../../actions/types";

import shortlist from "../../imgs/shortlist-yellow.svg";

import { Card, Button, Typography, Collapse, Tabs, message, Spin } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faChevronRight,
  faChevronDown,
  faChevronUp,
  faChevronLeft,
  faPrint,
  faEnvelope,
  faLink,
  faTimes,
  faCircle,
} from "@fortawesome/free-solid-svg-icons";

import * as home_utils from "../../utils/homeUtils";

import Modal from "react-bootstrap/Modal";

import {
  getPlanDetail,
  getProviders,
  //getPlans,
 // getServices,
  getCheapestPlan,
  getPlan,
  getSimilarPlans,
  togglePlanProviders,
} from "../../actions/fetchDataActions";

import { toggleDataCaptureModal } from "../../actions/userInputActions";

import { state } from "../../components/home/state";
import { stripNonNumeric } from "../../utils/homeUtils";
import DataCaptureModal from "../../components/payment/DataCapture";

interface DetailsProps {
  email: string;
  amount: number;
  [x: string]: any;
  notgettingproviders: boolean;
  buyingPlan: boolean;
}

class PlanDetails extends Component<DetailsProps> {
  constructor(props) {
    super(props);
    this.goToPlans = this.goToPlans.bind(this);
  }
  state = {
    searchText: "",
    open: false,
    planID: null,
    collapse_accidents_n_emerg: true,
    collapse_immunizations: true,
    collapse_admissions: true,
    collapse_maternity: true,
    collapse_chronic_conds: true,
    collapse_prescriptions: true,
    collapse_investigations: true,
    collapse_consultations: true,
    collapse_ent: true,
    collapse_others: true,
    collapse_providers: true,
  };

  toggleCollapsible = (prop: string) => {
    this.setState({
      collapse_accidents_n_emerg: true,
      collapse_immunizations: true,
      collapse_admissions: true,
      collapse_maternity: true,
      collapse_chronic_conds: true,
      collapse_prescriptions: true,
      collapse_investigations: true,
      collapse_consultations: true,
      collapse_ent: true,
      collapse_others: true,
      collapse_providers: true,
      [prop]: !this.state[prop],
    });
  };

  goToPlans() {
    this.props.history.push({ pathname: "/" });
  }

  goToHome = () => {
    this.props.history.push({ pathname: "/" });
  };

  numberwithCommas = (value) => {
    return value ? value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : "";
  };

  individual_plans = [];
  group_plans = [];
  family_plans = [];
  couple_plans = [];
  international_plans = [];
  senior_plans = [];
  corporate_plans = [];

  componentDidMount() {
    // if (!this.props.plan.name) {
    //   //this.goToHome();
    // }
  }

  componentDidUpdate() {
    // console.log("hafa");
  }

  params: any[] = [];
  parsedParams: any[] = [];

  parseParams = () => {
    let paramsArr: any[] = [];
    let params = this.props.match.params[0].split("/");

    let p: object;
    for (let i = 0; i < params.length; i += 2) {
      p = {
        name: params[i],
        value: params[i + 1],
      };
      paramsArr.push(p);
    }
    this.params = paramsArr;
  };

  // getClickedPlan = async (planID, type) => {
  //   let data = this.props.plans.filter((plan) => plan.service_id === planID)[0];
  //   await this.props.getPlan(data);
  // };

  goToDetails(serviceID) {
    this.props.history.push({ pathname: `/details/id/${serviceID}` });
  }

  getClickedPlan = async (index, type) => {
    console.log("index", index);

    let data = this.props.plans.filter((p) => p.service_id === index)[0]; //this.props.plans[index];
    console.log("this.props.plans", this.props.plans);
    console.log("data", data);

    let serviceID = data.service_id;

    await this.props.getPlan(data);
    this.props.getSimilarPlans(data);
    type == "view" && this.goToDetails(serviceID);
  };

  async UNSAFE_componentWillMount() {
    if (Object.keys(this.props.match.params).length) {
      this.parseParams();
      let idParamsObj = this.params.filter((param) => param.name == "id");

      if (idParamsObj.length > 0) {
        let id = idParamsObj[0].value;
        this.setState({
          planID: id,
        });
        console.log("id", id);
        await this.props.getProviders();
        // await this.props.getPlans();
        await this.props.getServices();
        await this.props.getPlanDetail(id);
        this.props.getCheapestPlan();
      }
    }
  }

  render() {
    const plan = this.props.plan;
    console.log("this.props", this.props);
    console.log("this.state", this.state);

    return (
      <div className="details">
        <div className="">
          <div className="c-plan-details-page__header">
            <header className="c-plan-nav-bar">
              <div className="container padding-y--2 display--flex justify-content--between align-items--center">
                <div>
                  <a
                    className="c-button c-button--transparent c-plan-nav-bar__back-link padding--0 text-decoration--underline"
                    href="#"
                    onClick={this.goToPlans}
                    target="_self"
                    role="button"
                  >
                    <FontAwesomeIcon
                      className="margin-right--1"
                      icon={faArrowLeft}
                    />
                    <span>Back to plans</span>
                  </a>
                </div>
                <div className="c-plan-nav-bar__share">
                  <div className="c-share-buttons text-align--right">
                    <div className="display--block md-display--inline-block">
                      <button
                        className="c-button c-button--small qa-print-button margin-left--1 margin-bottom--1 sm-padding-x--2"
                        title="Print"
                        type="button"
                        onClick={() => window.print()}
                      >
                        <FontAwesomeIcon
                          className="fas md-margin-right--1"
                          icon={faPrint}
                        />

                        <span className="display--none md-display--inline-block">
                          Print
                        </span>
                      </button>
                      <button
                        className="c-button c-button--small qa-email-button margin-left--1 margin-bottom--1 sm-padding-x--2"
                        title="Email"
                        type="button"
                        onClick={(e) => {
                          window.location.href = "mailto:no-reply@example.com";
                          e.preventDefault();
                        }}
                      >
                        <FontAwesomeIcon
                          className="fas md-margin-right--1"
                          icon={faEnvelope}
                        />

                        <span className="display--none md-display--inline-block">
                          Email
                        </span>
                      </button>
                      <button
                        className="c-button c-button--small qa-share-link-button margin-left--1 margin-bottom--1 sm-padding-x--2"
                        title="Link"
                        type="button"
                        onClick={() => {
                          navigator.clipboard.writeText(window.location.href);
                          message.success("Link has been copied!");
                        }}
                      >
                        <FontAwesomeIcon
                          className="fas md-margin-right--1"
                          icon={faLink}
                        />

                        <span className="display--none md-display--inline-block">
                          Link
                        </span>
                      </button>
                    </div>
                    <div className="display--none">
                      <button
                        type="button"
                        aria-label="Tooltip: "
                        className="tooltip-trigger padding-right--0"
                      >
                        <span className="c-base text-decoration--underline color--primary">
                          Sharing your information
                        </span>
                        <span className="tooltip-icon-container tooltip-icon-container--has-trigger-content trigger-inverse">
                          <svg
                            className="tooltip-icon"
                            width="16px"
                            height="16px"
                            viewBox="0 0 16 16"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <g
                              stroke="none"
                              stroke-width="1"
                              fill="none"
                              fill-rule="evenodd"
                            >
                              <g
                                className="tooltip-icon-fill"
                                fill-rule="nonzero"
                              >
                                <g>
                                  <path d="M8,16 C3.581722,16 0,12.418278 0,8 C0,3.581722 3.581722,0 8,0 C12.418278,0 16,3.581722 16,8 C16,12.418278 12.418278,16 8,16 Z M9,12.2760417 L9,6.375 L7,6.375 L7,12.2760417 L9,12.2760417 Z M7,4.90625 C7,5.50347521 7.33172745,5.80208333 7.99519231,5.80208333 C8.66506745,5.80208333 9,5.50347521 9,4.90625 C9,4.6076374 8.9198726,4.38194521 8.75961539,4.22916667 C8.59935818,4.07638813 8.34455303,4 7.99519231,4 C7.64583158,4 7.39262899,4.07465203 7.23557692,4.22395833 C7.07852485,4.37326464 7,4.60069292 7,4.90625 Z"></path>
                                </g>
                              </g>
                            </g>
                          </svg>
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </header>
          </div>
          {plan && plan.name ? (
            <div className="c-plan-details-page__body">
              <div className="fill--white">
                <div className="container">
                  <div className="margin-y--1">
                    <header className="md-display--flex justify--content-between align-items--center border-bottom--1 padding-bottom--2 ">
                      <header className="c-plan-title">
                        <div className="c-plan-title__issuer font-weight--bold">
                          {plan.hmo_id.name}
                        </div>
                        <h2 className="c-plan-title__name font-weight--normal margin-y--1 font-size--h1">
                          {/* <a href={`details/${plan.service_id}`} target="_self"> */}
                          {plan.name}
                          {/* </a> */}
                        </h2>

                        <ul className="c-plan-title__info c-list--bare font-size--small plan-c-info">
                          <li className="c-plan-title__info-item" key={plan.id}>
                            {plan.plan_id &&
                              plan.plan_id.category &&
                              plan.plan_id.category.map((cat, i) => {
                                return (
                                  <span className="">
                                    {" "}
                                    {cat.name}
                                    {plan.plan_id.category.length > 1 &&
                                      i < plan.plan_id.category.length - 1 &&
                                      ", "}
                                  </span>
                                );
                              })}
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
                                // plan.plan_id && plan.plan_id.category
                                //   ? plan.plan_id.plan_id
                                //   : plan.plan_id
                                plan.service_id
                              }
                            </span>
                          </li>
                        </ul>
                      </header>
                      <div className="padding-y--2">
                        <a
                          className="c-button c-button--primary qa-next-step-button"
                          href="#"
                          role="button"
                          onClick={() => {
                            this.getClickedPlan(plan.service_id, "buy");
                            this.props.toggleDataCaptureModal(true);
                          }}
                        >
                          Like This Plan? Take the Next Step
                        </a>
                      </div>
                    </header>

                    <section className="c-detail-section margin-bottom--4">
                      <h2 className="border-bottom--1 border--dark padding-bottom--2">
                        Highlights
                      </h2>
                      <div>
                        <table className="c-details-table">
                          <tbody className="valign--top">
                            <tr>
                              <th scope="row">Price</th>
                              <td>
                                <span>{plan.price}</span>
                              </td>
                            </tr>

                            <tr>
                              <th scope="row">HMO</th>
                              <td>
                                <span>{plan.hmo_id.name}</span>
                              </td>
                            </tr>

                            <tr>
                              <th scope="row">Plan metal level</th>
                              <td>
                                <span>{plan.category}</span>
                              </td>
                            </tr>
                            <tr>
                              <th scope="row">Plan type</th>
                              <td>
                                <span>
                                  {plan.plan_id &&
                                    plan.plan_id.category &&
                                    plan.plan_id.category.map((cat, i) => {
                                      return (
                                        <b className="">
                                          {" "}
                                          {cat.name}
                                          {plan.plan_id.category.length > 1 &&
                                            i <
                                              plan.plan_id.category.length -
                                                1 &&
                                            ", "}
                                        </b>
                                      );
                                    })}
                                </span>
                              </td>
                            </tr>
                            {/* 
                            <tr className="print-display--none">
                              <th scope="row">Medical providers in-network</th>
                              <td>
                                <a
                                  className="c-button c-button--small print-display--none padding-x--2 margin-y--1"
                                  href="/find-provider"
                                  role="button"
                                >
                                  Add
                                </a>
                              </td>
                            </tr>
                            <tr className="print-display--none">
                              <th scope="row">Drugs covered/not covered</th>
                              <td>
                                <a
                                  className="c-button c-button--small print-display--none padding-x--2 margin-y--1"
                                  href="/find-drugs"
                                  role="button"
                                >
                                  Add
                                </a>
                              </td>
                            </tr>
                         
                          */}
                          </tbody>
                        </table>
                      </div>
                    </section>
                  </div>

                  {/*                 
                <div className="col-md-4 wrapper_right_product">
                  <div className="inner_right_section">
                    <h3>Summary</h3>
                    <div className="scroll_space">
                      <div className="flexRow section_right">
                        <div>Cover Amount</div>
                        <div>
                          <span>
                            ₦
                            {this.numberwithCommas(
                              home_utils.stripNonNumeric(plan.price)
                            )}
                          </span>
                        </div>
                      </div>
                      <div className="flexRow section_right">
                        <div>Policy Period</div>
                        <div>
                          <span>1 year</span>
                        </div>
                      </div>
                      <div className="premium_right">
                        <div className="flexRow section_premium">
                          <div>TOTAL PREMIUM</div>
                          <div>
                            <span>
                              ₦
                              {this.numberwithCommas(
                                home_utils.stripNonNumeric(plan.price)
                              )}
                            </span>
                          </div>
                        </div>
                        <button type="button">PROCEED TO CHECKOUT</button>
                      </div>
                    </div>
                  </div>
                </div>
               */}

                  <section className="c-detail-section margin-bottom--4">
                    <h2 className="border-bottom--1 border--dark padding-bottom--2">
                      <button
                        className="ds-h2 text-align--left sans fill--transparent"
                        aria-expanded="false"
                        onClick={() =>
                          this.toggleCollapsible("collapse_accidents_n_emerg")
                        }
                      >
                        Accidents & Emergencies
                        {this.state.collapse_accidents_n_emerg ? (
                          <FontAwesomeIcon
                            className="fas md-margin-right--1"
                            icon={faChevronDown}
                          />
                        ) : (
                          <FontAwesomeIcon
                            className="fas md-margin-right--1"
                            icon={faChevronUp}
                          />
                        )}
                      </button>
                    </h2>
                    <div
                      hidden={
                        this.state.collapse_accidents_n_emerg ? true : false
                      }
                    >
                      <table className="c-details-table">
                        <tbody
                          className={`${
                            !this.state.collapse_accidents_n_emerg
                              ? "service-in-view "
                              : ""
                          } valign--top`}
                        >
                          <tr className="border-bottom--2">
                            <th scope="row">
                              <span className="display--block">
                                Accidents & Emergencies
                              </span>
                            </th>
                            <td>
                              <div className="c-star-rating">
                                <span>{plan.accidents_emergencies}</span>
                              </div>
                            </td>
                          </tr>

                          <tr className="border-bottom--2">
                            <th scope="row">
                              <span className="display--block">Evacuation</span>
                            </th>
                            <td>
                              <div className="c-star-rating">
                                <span>{plan.evacuations}</span>
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </section>

                  <section className="c-detail-section margin-bottom--4">
                    <h2 className="border-bottom--1 border--dark padding-bottom--2">
                      <button
                        className="ds-h2 text-align--left sans fill--transparent"
                        aria-expanded="false"
                        onClick={() => this.toggleCollapsible("collapse_ent")}
                      >
                        E.N.T
                        {this.state.collapse_ent ? (
                          <FontAwesomeIcon
                            className="fas md-margin-right--1"
                            icon={faChevronDown}
                          />
                        ) : (
                          <FontAwesomeIcon
                            className="fas md-margin-right--1"
                            icon={faChevronUp}
                          />
                        )}
                      </button>
                    </h2>
                    <div hidden={this.state.collapse_ent ? true : false}>
                      <table className="c-details-table">
                        <tbody
                          className={`${
                            !this.state.collapse_ent ? "service-in-view " : ""
                          } valign--top`}
                        >
                          <tr className="border-bottom--2">
                            <th scope="row">
                              <span className="display--block">
                                Dental Care
                              </span>
                            </th>
                            <td>
                              <div className="c-star-rating">
                                <span>{plan.dental_care}</span>
                              </div>
                            </td>
                          </tr>

                          <tr className="border-bottom--2">
                            <th scope="row">
                              <span className="display--block">
                                Optical Care
                              </span>
                            </th>
                            <td>
                              <div className="c-star-rating">
                                <span>{plan.optical_care}</span>
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </section>

                  <section className="c-detail-section margin-bottom--4">
                    <h2 className="border-bottom--1 border--dark padding-bottom--2">
                      <button
                        className="ds-h2 text-align--left sans fill--transparent"
                        aria-expanded="false"
                        onClick={() =>
                          this.toggleCollapsible("collapse_immunizations")
                        }
                      >
                        Immunizations
                        {this.state.collapse_immunizations ? (
                          <FontAwesomeIcon
                            className="fas md-margin-right--1"
                            icon={faChevronDown}
                          />
                        ) : (
                          <FontAwesomeIcon
                            className="fas md-margin-right--1"
                            icon={faChevronUp}
                          />
                        )}
                      </button>
                    </h2>
                    <div
                      hidden={this.state.collapse_immunizations ? true : false}
                    >
                      <table className="c-details-table">
                        <tbody
                          className={`${
                            !this.state.collapse_immunizations
                              ? "service-in-view "
                              : ""
                          } valign--top`}
                        >
                          <tr className="border-bottom--2">
                            <th scope="row">
                              <span className="display--block">
                                Additional Immunizations
                              </span>
                            </th>
                            <td>
                              <div className="c-star-rating">
                                <span>{plan.additional_ammunization}</span>
                              </div>
                            </td>
                          </tr>

                          <tr className="border-bottom--2">
                            <th scope="row">
                              <span className="display--block">
                                Routine Immunizations
                              </span>
                            </th>
                            <td>
                              <div className="c-star-rating">
                                <span>{plan.routine_immunization}</span>
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </section>

                  <section className="c-detail-section margin-bottom--4">
                    <h2 className="border-bottom--1 border--dark padding-bottom--2">
                      <button
                        className="ds-h2 text-align--left sans fill--transparent"
                        aria-expanded="false"
                        onClick={() =>
                          this.toggleCollapsible("collapse_admissions")
                        }
                      >
                        Admissions
                        {this.state.collapse_admissions ? (
                          <FontAwesomeIcon
                            className="fas md-margin-right--1"
                            icon={faChevronDown}
                          />
                        ) : (
                          <FontAwesomeIcon
                            className="fas md-margin-right--1"
                            icon={faChevronUp}
                          />
                        )}
                      </button>
                    </h2>
                    <div hidden={this.state.collapse_admissions ? true : false}>
                      <table className="c-details-table">
                        <tbody
                          className={`${
                            !this.state.collapse_admissions
                              ? "service-in-view "
                              : ""
                          } valign--top`}
                        >
                          <tr className="border-bottom--2">
                            <th scope="row">
                              <span className="display--block">
                                Admission Feeding
                              </span>
                            </th>
                            <td>
                              <div className="c-star-rating">
                                <span>{plan.admission_feeding}</span>
                              </div>
                            </td>
                          </tr>

                          <tr className="border-bottom--2">
                            <th scope="row">
                              <span className="display--block">
                                Hospital Admission
                              </span>
                            </th>
                            <td>
                              <div className="c-star-rating">
                                <span>{plan.hospital_addmissions}</span>
                              </div>
                            </td>
                          </tr>

                          <tr className="border-bottom--2">
                            <th scope="row">
                              <span className="display--block">
                                Admission per Annum
                              </span>
                            </th>
                            <td>
                              <div className="c-star-rating">
                                <span>{plan.admissions_per_annum}</span>
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </section>

                  <section className="c-detail-section margin-bottom--4">
                    <h2 className="border-bottom--1 border--dark padding-bottom--2">
                      <button
                        className="ds-h2 text-align--left sans fill--transparent"
                        aria-expanded="false"
                        onClick={() =>
                          this.toggleCollapsible("collapse_maternity")
                        }
                      >
                        Maternity
                        {this.state.collapse_maternity ? (
                          <FontAwesomeIcon
                            className="fas md-margin-right--1"
                            icon={faChevronDown}
                          />
                        ) : (
                          <FontAwesomeIcon
                            className="fas md-margin-right--1"
                            icon={faChevronUp}
                          />
                        )}
                      </button>
                    </h2>
                    <div hidden={this.state.collapse_maternity ? true : false}>
                      <table className="c-details-table">
                        <tbody
                          className={`${
                            !this.state.collapse_maternity
                              ? "service-in-view "
                              : ""
                          } valign--top`}
                        >
                          <tr className="border-bottom--2">
                            <th scope="row">
                              <span className="display--block">
                                Antenatal Care
                              </span>
                            </th>
                            <td>
                              <div className="c-star-rating">
                                <span>{plan.antenatal_care_delivery}</span>
                              </div>
                            </td>
                          </tr>

                          <tr className="border-bottom--2">
                            <th scope="row">
                              <span className="display--block">
                                Fertility Services
                              </span>
                            </th>
                            <td>
                              <div className="c-star-rating">
                                <span>{plan.fertility_services}</span>
                              </div>
                            </td>
                          </tr>

                          <tr className="border-bottom--2">
                            <th scope="row">
                              <span className="display--block">
                                Family Planning
                              </span>
                            </th>
                            <td>
                              <div className="c-star-rating">
                                <span>{plan.family_planning_services}</span>
                              </div>
                            </td>
                          </tr>

                          <tr className="border-bottom--2">
                            <th scope="row">
                              <span className="display--block">
                                Neonatal Care
                              </span>
                            </th>
                            <td>
                              <div className="c-star-rating">
                                <span>{plan.neonatal_care}</span>
                              </div>
                            </td>
                          </tr>

                          <tr className="border-bottom--2">
                            <th scope="row">
                              <span className="display--block">
                                Postnatal Care
                              </span>
                            </th>
                            <td>
                              <div className="c-star-rating">
                                <span>{plan.postnatal_care}</span>
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </section>

                  <section className="c-detail-section margin-bottom--4">
                    <h2 className="border-bottom--1 border--dark padding-bottom--2">
                      <button
                        className="ds-h2 text-align--left sans fill--transparent"
                        aria-expanded="false"
                        onClick={() =>
                          this.toggleCollapsible("collapse_chronic_conds")
                        }
                      >
                        Chronic Conditions Mgt
                        {this.state.collapse_chronic_conds ? (
                          <FontAwesomeIcon
                            className="fas md-margin-right--1"
                            icon={faChevronDown}
                          />
                        ) : (
                          <FontAwesomeIcon
                            className="fas md-margin-right--1"
                            icon={faChevronUp}
                          />
                        )}
                      </button>
                    </h2>
                    <div
                      hidden={this.state.collapse_chronic_conds ? true : false}
                    >
                      <table className="c-details-table">
                        <tbody
                          className={`${
                            !this.state.collapse_chronic_conds
                              ? "service-in-view "
                              : ""
                          } valign--top`}
                        >
                          <tr className="border-bottom--2">
                            <th scope="row">
                              <span className="display--block">
                                Cancer Care
                              </span>
                            </th>
                            <td>
                              <div className="c-star-rating">
                                <span>{plan.cancer_care}</span>
                              </div>
                            </td>
                          </tr>

                          <tr className="border-bottom--2">
                            <th scope="row">
                              <span className="display--block">
                                HIV/ AIDS Treatment
                              </span>
                            </th>
                            <td>
                              <div className="c-star-rating">
                                <span>{plan.hiv_aids_treatment}</span>
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </section>

                  <section className="c-detail-section margin-bottom--4">
                    <h2 className="border-bottom--1 border--dark padding-bottom--2">
                      <button
                        className="ds-h2 text-align--left sans fill--transparent"
                        aria-expanded="false"
                        onClick={() =>
                          this.toggleCollapsible("collapse_prescriptions")
                        }
                      >
                        Outpatient Prescribed Drugs
                        {this.state.collapse_prescriptions ? (
                          <FontAwesomeIcon
                            className="fas md-margin-right--1"
                            icon={faChevronDown}
                          />
                        ) : (
                          <FontAwesomeIcon
                            className="fas md-margin-right--1"
                            icon={faChevronUp}
                          />
                        )}
                      </button>
                    </h2>
                    <div
                      hidden={this.state.collapse_prescriptions ? true : false}
                    >
                      <table className="c-details-table">
                        <tbody
                          className={`${
                            !this.state.collapse_prescriptions
                              ? "service-in-view "
                              : ""
                          } valign--top`}
                        >
                          <tr className="border-bottom--2">
                            <th scope="row">
                              <span className="display--block">
                                Outpatient Prescribed Drugs
                              </span>
                            </th>
                            <td>
                              <div className="c-star-rating">
                                <span>{plan.outpatient_prescribed_drugs}</span>
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </section>

                  <section className="c-detail-section margin-bottom--4">
                    <h2 className="border-bottom--1 border--dark padding-bottom--2">
                      <button
                        className="ds-h2 text-align--left sans fill--transparent"
                        aria-expanded="false"
                        onClick={() =>
                          this.toggleCollapsible("collapse_investigations")
                        }
                      >
                        Investigations
                        {this.state.collapse_investigations ? (
                          <FontAwesomeIcon
                            className="fas md-margin-right--1"
                            icon={faChevronDown}
                          />
                        ) : (
                          <FontAwesomeIcon
                            className="fas md-margin-right--1"
                            icon={faChevronUp}
                          />
                        )}
                      </button>
                    </h2>
                    <div
                      hidden={this.state.collapse_investigations ? true : false}
                    >
                      <table className="c-details-table">
                        <tbody
                          className={`${
                            !this.state.collapse_investigations
                              ? "service-in-view "
                              : ""
                          } valign--top`}
                        >
                          <tr className="border-bottom--2">
                            <th scope="row">
                              <span className="display--block">
                                Lab Investigations
                              </span>
                            </th>
                            <td>
                              <div className="c-star-rating">
                                <span>{plan.lab_investigations}</span>
                              </div>
                            </td>
                          </tr>

                          <tr className="border-bottom--2">
                            <th scope="row">
                              <span className="display--block">
                                Renal Dialysis
                              </span>
                            </th>
                            <td>
                              <div className="c-star-rating">
                                <span>{plan.renal_dialysis}</span>
                              </div>
                            </td>
                          </tr>

                          <tr className="border-bottom--2">
                            <th scope="row">
                              <span className="display--block">
                                Ultrasound Scans
                              </span>
                            </th>
                            <td>
                              <div className="c-star-rating">
                                <span>{plan.ultrasound_plans}</span>
                              </div>
                            </td>
                          </tr>

                          <tr className="border-bottom--2">
                            <th scope="row">
                              <span className="display--block">
                                Plain Contrast X-rays
                              </span>
                            </th>
                            <td>
                              <div className="c-star-rating">
                                <span>{plan.plain_contrast_xrays}</span>
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </section>

                  <section className="c-detail-section margin-bottom--4">
                    <h2 className="border-bottom--1 border--dark padding-bottom--2">
                      <button
                        className="ds-h2 text-align--left sans fill--transparent"
                        aria-expanded="false"
                        onClick={() =>
                          this.toggleCollapsible("collapse_consultations")
                        }
                      >
                        Consultations
                        {this.state.collapse_consultations ? (
                          <FontAwesomeIcon
                            className="fas md-margin-right--1"
                            icon={faChevronDown}
                          />
                        ) : (
                          <FontAwesomeIcon
                            className="fas md-margin-right--1"
                            icon={faChevronUp}
                          />
                        )}
                      </button>
                    </h2>
                    <div
                      hidden={this.state.collapse_consultations ? true : false}
                    >
                      <table className="c-details-table">
                        <tbody
                          className={`${
                            !this.state.collapse_consultations
                              ? "service-in-view "
                              : ""
                          } valign--top`}
                        >
                          <tr className="border-bottom--2">
                            <th scope="row">
                              <span className="display--block">
                                General Consultations
                              </span>
                            </th>
                            <td>
                              <div className="c-star-rating">
                                <span>{plan.general_consultation}</span>
                              </div>
                            </td>
                          </tr>

                          <tr className="border-bottom--2">
                            <th scope="row">
                              <span className="display--block">
                                Specialist Consultation
                              </span>
                            </th>
                            <td>
                              <div className="c-star-rating">
                                <span>{plan.specialist_consultation}</span>
                              </div>
                            </td>
                          </tr>

                          <tr className="border-bottom--2">
                            <th scope="row">
                              <span className="display--block">
                                Physiotherapy
                              </span>
                            </th>
                            <td>
                              <div className="c-star-rating">
                                <span>{plan.physiotherapy}</span>
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </section>

                  <section className="c-detail-section margin-bottom--4">
                    <h2 className="border-bottom--1 border--dark padding-bottom--2">
                      <button
                        className="ds-h2 text-align--left sans fill--transparent"
                        aria-expanded="false"
                        onClick={() =>
                          this.toggleCollapsible("collapse_others")
                        }
                      >
                        Others
                        {this.state.collapse_others ? (
                          <FontAwesomeIcon
                            className="fas md-margin-right--1"
                            icon={faChevronDown}
                          />
                        ) : (
                          <FontAwesomeIcon
                            className="fas md-margin-right--1"
                            icon={faChevronUp}
                          />
                        )}
                      </button>
                    </h2>
                    <div hidden={this.state.collapse_others ? true : false}>
                      <table className="c-details-table">
                        <tbody
                          className={`${
                            !this.state.collapse_others
                              ? "service-in-view "
                              : ""
                          } valign--top`}
                        >
                          <tr className="border-bottom--2">
                            <th scope="row">
                              <span className="display--block">
                                Intensive Care
                              </span>
                            </th>
                            <td>
                              <div className="c-star-rating">
                                <span>{plan.intensive_care}</span>
                              </div>
                            </td>
                          </tr>

                          <tr className="border-bottom--2">
                            <th scope="row">
                              <span className="display--block">
                                Covid 19 Treatment
                              </span>
                            </th>
                            <td>
                              <div className="c-star-rating">
                                <span>{plan.covid_19_treatment}</span>
                              </div>
                            </td>
                          </tr>

                          <tr className="border-bottom--2">
                            <th scope="row">
                              <span className="display--block">
                                Plastic Surgeries
                              </span>
                            </th>
                            <td>
                              <div className="c-star-rating">
                                <span>{plan.plastic_surgeries}</span>
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </section>

                  <section
                    className="c-detail-section margin-bottom--4"
                    id="providers"
                  >
                    <h2 className="border-bottom--1 border--dark padding-bottom--2">
                      <button
                        className="ds-h2 text-align--left sans fill--transparent"
                        aria-expanded="false"
                        onClick={() => this.props.togglePlanProviders()}
                      >
                        Medical Providers
                        {this.props.collapse_providers ? (
                          <FontAwesomeIcon
                            className="fas md-margin-right--1"
                            icon={faChevronDown}
                          />
                        ) : (
                          <FontAwesomeIcon
                            className="fas md-margin-right--1"
                            icon={faChevronUp}
                          />
                        )}
                      </button>
                    </h2>
                    <div hidden={this.props.collapse_providers ? true : false}>
                      <table className="c-details-table">
                        <tbody
                          className={`${
                            !this.props.collapse_providers
                              ? "service-in-view "
                              : ""
                          } valign--top`}
                        >
                          {plan.hmo_id.providers.map((provider) => {
                            return (
                              <tr className="border-bottom--2">
                                <th scope="row">
                                  <span className="display--block">
                                    {provider.provider_name}
                                  </span>
                                </th>
                                {/* <td>
                              <div className="c-star-rating">
                                <span>{provider.hospital_rating}</span>
                              </div>
                            </td> */}
                                <td>
                                  <div className="c-star-rating">
                                    <span>{provider.address}</span>
                                  </div>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </section>
                </div>{" "}
              </div>
              <section className="section container hero compare_parent sp-top-main">
                <div className="">
                  <section className="section content_section mt-top">
                    <div>
                      <section className="section grey_background similar_plans">
                        <h3 className="font-weight--bold">Similar Plans</h3>
                        <h4>
                          Users who viewed this plan also viewed the below{" "}
                        </h4>
                        <div className="box-mob-slider">
                          <div className="slider-new ">
                            {this.props.similar_plans.length > 0 ? (
                              this.props.similar_plans.map(
                                (similar_plan, i) => {
                                  return (
                                    <div className="box-new">
                                      <ul className="similar_plan_ul">
                                        <li>
                                          <div className="box_block">
                                            <div className="plan-c-provider font-weight--bold">
                                              {similar_plan.hmo_id.name["text"]}
                                            </div>
                                            <h2 className="plan-c-name font-weight--normal margin-y--1">
                                              <a
                                                href={`/details/id/${similar_plan.service_id}`}
                                              >
                                                {similar_plan.name}
                                              </a>
                                            </h2>
                                          </div>
                                          <p className="is-hidden-mobile">
                                            ₦
                                            {this.numberwithCommas(
                                              stripNonNumeric(
                                                similar_plan.price
                                              )
                                            )}
                                            / year
                                          </p>
                                          <ul>
                                            <li>
                                              {similar_plan.hmo_id.name}
                                              {/* {similar_plan.plan_id &&
                                        similar_plan.plan_id.category &&
                                        similar_plan.plan_id.category.map(
                                          (cat, i) => {
                                            return (
                                              <b className="">
                                                {" "}
                                                {cat.name}
                                                {similar_plan.plan_id.category
                                                  .length > 1 &&
                                                  i <
                                                    similar_plan.plan_id
                                                      .category.length -
                                                      1 &&
                                                  ", "}
                                              </b>
                                            );
                                          }
                                        )}
                                       <span>Sum Insured</span>  */}
                                            </li>
                                            <li>
                                              {similar_plan.hmo_id.providers
                                                ? similar_plan.hmo_id.providers
                                                    .length
                                                : 0}{" "}
                                              <span>Hospitals</span>
                                            </li>
                                          </ul>
                                          {/* <div className="like-covers">
                                  <div className="usp_image"></div>1 Cr in less
                                  premium
                                </div> */}
                                          <button
                                            className="button "
                                            onClick={() => {
                                              this.getClickedPlan(i, "view");
                                              window.scrollTo({
                                                top: 0,
                                                behavior: "smooth",
                                              });
                                              // this.goToPlans();
                                              //this.handleCheckedPlanToCompare(i);
                                            }}
                                          >
                                            <i className="fas fa-plus"></i>
                                            View Details
                                          </button>
                                        </li>
                                      </ul>
                                    </div>
                                  );
                                }
                              )
                            ) : (
                              <Spin size="large" className="large-loader" />
                            )}
                          </div>
                        </div>
                      </section>
                    </div>
                  </section>
                </div>
              </section>

              {/* <div className="bottom-menu details-bottom-menu row">
                <div className="col-md-4">
                  <p>Total Premium</p>
                  <p>
                    ₦
                    {this.numberwithCommas(
                      home_utils.stripNonNumeric(plan.price)
                    )}
                  </p>
                </div>
                <div className="col-md-8">
                  <button className="btn btn-danger checkout">
                    PROCEED TO CHECKOUT
                  </button>
                </div>
              </div> */}
            </div>
          ) : (
            <Spin size="large" className="large-loader" />
          )}
        </div>
        <DataCaptureModal />
      </div>
    );
  }
}

const mapProps = (state: any) => {
  return {
    collapse_providers: state.fetchData.collapse_providers,
    plans: state.fetchData.services,
    plan: state.fetchData.plan,
    similar_plans: state.fetchData.similar_plans,
    responses: state.quiz.responses,
  };
};

export default connect(mapProps, {
  getPlanDetail,
  getProviders,
  // getPlans,
  getPlan,
 // getServices,
  getCheapestPlan,
  toggleDataCaptureModal,
  getSimilarPlans,
  togglePlanProviders,
})(PlanDetails);
