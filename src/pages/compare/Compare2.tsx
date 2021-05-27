import React, { Component } from "react";

/*import { API_URL } from "../../config";*/
import { connect } from "react-redux";

import { message } from "antd";
import { Plan } from "../../interfaces/Plan";
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

// import { state } from "../../components/home/state";

import "../../components/home/new-design.css";
import "./compare.css";

import starfilled from "../../svgs/starfilled.svg";
import star from "../../svgs/star.svg";
import { stripNonNumeric } from "../../utils/homeUtils";

import check from "../../svgs/check.svg";
import uncheck from "../../svgs/uncheck.svg";

interface ComparisonProps {
  [x: string]: any;
  dispatch(args: any): any;
  plans: Plan[];
}

class ComparePlans extends Component<ComparisonProps> {
  constructor(props) {
    super(props);
  }
  state = {
    limit_plans_to_compare_on_desktop: 3,
    limit_plans_to_compare_on_mobile: 2,
    device: "",
    plans_to_compare: [],
    collapse_star_rating: true,
    collapse_plan_documents: true,
    collapse_other_services: true,
    show_prev_button: false,
    show_next_button: true,
    num_of_pages: 0,
    current_page: 1,
  };

  showPrevBtn = () => {
    this.setState({
      show_prev_button: true,
    });
  };

  hidePrevBtn = () => {
    this.setState({
      show_prev_button: false,
    });
  };

  showNextBtn = () => {
    this.setState({
      show_next_button: true,
    });
  };

  hideNextBtn = () => {
    this.setState({
      show_next_button: false,
    });
  };

  onPrevBtnClick = () => {
    this.state.current_page <= this.state.num_of_pages &&
      this.state.current_page >= this.state.num_of_pages - 1 &&
      this.setState({
        current_page: this.state.current_page - 1,
      });
  };

  onNextBtnClick = () => {
    this.state.current_page < this.state.num_of_pages &&
      this.setState({
        current_page: this.state.current_page + 1,
      });
  };

  handleMobileNav = (btnType) => {
    //console.log("in here");
    if (btnType == "prev") {
      this.onPrevBtnClick();
    } else {
      this.onNextBtnClick();
    }

    if (this.state.current_page == 1) {
      // console.log("==1");
      this.showPrevBtn();
      // this.hidePrevBtn();
      // this.showNextBtn();
    } else if (this.state.current_page == this.state.num_of_pages - 1) {
      //this.hideNextBtn();
      // console.log("==2");
    } else if (this.state.current_page == this.state.num_of_pages) {
      this.showNextBtn();
    }

    console.log("this.state inside handleMob", this.state);
    // console.log("this.state.show_prev_button", this.state.show_next_button);
  };

  setPlansToCompare = () => {
    console.log("this.props.match.params[0]", this.props.match.params[0]);
    let params = this.props.match.params[0];
    let paramsArr = params.split("/");
    console.log("paramsArr", paramsArr);

    this.setState({
      plans_to_compare: paramsArr,
      num_of_pages: paramsArr.length,
    });
  };

  UNSAFE_componentWillMount() {
    this.setPlansToCompare();
    if (window.screen.width >= 501) {
      this.setState({
        device: "desktop",
      });
    } else {
      this.setState({
        device: "mobile",
      });
    }
  }

  componentDidMount() {}

  initializeValues = () => {
    // let checked_plans_mobile = this.props.location.state
    //   .this.state.plans_to_compare;
    // let checked_plans_desktop = this.props.location.state
    //   .this.state.plans_to_compare;
    // let recommended_plans = state.plans;
  };

  handleCheckedPlanToCompareOnDesktop(index) {
    // console.log("index", index);

    let value = index;

    //this.checkChecked(index);

    //  console.log(checked);

    let indexes: string[] = [];
    let checked_values: boolean[] = [];

    indexes = this.state.plans_to_compare;
    checked_values = this.props.checked_plans_list;

    let i: number = indexes.indexOf(value);
    let checked = i != 1;
    let j: number = checked_values.indexOf(checked);

    console.log("i", i, "j", j, "indexes.length", indexes.length);

    // if (i == 1 && indexes.length == 2) {
    //   // console.log("yes babe");
    //   this.toggleShowDesktopCompareCheckbox();
    // }

    if (
      indexes.length < this.state.limit_plans_to_compare_on_desktop &&
      i == 1 &&
      checked_values.length < this.state.limit_plans_to_compare_on_desktop
    ) {
      //  console.log("here");
      //this.toggleShowCompareWidget();

      this.props.dispatch({
        type: "SET_PLANS_TO_COMPARE_ON_DESKTOP",
        data: [...this.state.plans_to_compare, value],
      });

      this.props.dispatch({
        type: "SET_CHECKED_PLANS",
        data: [...this.props.checked_plans_list, checked],
      });
    } else if (i > 1 && j > 1) {
      // console.log(
      //   "there",
      //   this.state.this.state.plans_to_compare.splice(i, 1)
      // );

      this.props.dispatch({
        type: "SET_PLANS_TO_COMPARE_ON_DESKTOP",
        data: this.state.plans_to_compare.splice(i, 1),
      });

      this.props.dispatch({
        type: "SET_CHECKED_PLANS",
        data: this.props.checked_plans_list.splice(j, 1),
      });
    }
    if (indexes.length == this.state.limit_plans_to_compare_on_desktop) {
      // this.toggleShowDesktopCompareCheckbox();
      //this.state.this.state.plans_to_compare.filter((plan) => index !== plan);
    }

    // }
  }

  removePlanFromDesktopCheckedIndexes(index) {
    if (this.state.plans_to_compare.length < 3) {
      message.error("You need to select at least 2 plans to compare");
      return;
    }
    console.log("index", index);
    // console.log("let's see");

    if (index == undefined) {
      this.props.dispatch({
        type: "SET_PLANS_TO_COMPARE_ON_DESKTOP",
        data: [],
      });

      this.props.dispatch({
        type: "SET_CHECKED_PLANS",
        data: [],
      });
    }

    /* let value = index.value;*/
    //this.checkChecked(index);

    let indexes: string[] = [];

    indexes = this.state.plans_to_compare;

    let i: number = indexes.indexOf(index);
    let j: number = i;
    //checked_values.indexOf(checked);

    console.log("indexOf(index):i=", i, "indexOf(checked):j=", j);

    if (
      i > 1
      //&& j > 1
    ) {
      // console.log(
      //   "there",
      //   this.state.this.state.plans_to_compare.splice(i, 1)
      // );

      let x = [...this.state.plans_to_compare];
      let v = x.splice(i, 1) && x;

      let y = [...this.props.checked_plans_list];
      let k = y.splice(j, 1) && y;

      console.log("v", v, "k", k);
      this.props.dispatch({
        type: "SET_PLANS_TO_COMPARE_ON_DESKTOP",
        data: [...v],
      });

      this.props.dispatch({
        type: "SET_CHECKED_PLANS",
        data: [...k],
      });
    }
    if (indexes.length < this.state.limit_plans_to_compare_on_desktop) {
      // this.toggleShowCompareCheckbox();
    }
  }

  handleCheckedPlanToCompareOnMobile(index) {
    // console.log("index", index);

    let value = index;

    //this.checkChecked(index);

    //  console.log(checked);

    let indexes: string[] = [];
    let checked_values: boolean[] = [];

    indexes = this.state.plans_to_compare;
    checked_values = this.props.checked_plans_list;

    let i: number = indexes.indexOf(value);
    let checked = i != 1;
    let j: number = checked_values.indexOf(checked);

    console.log("i", i, "j", j, "indexes.length", indexes.length);

    // if (i == 1 && indexes.length == 2) {
    //   // console.log("yes babe");
    //   this.toggleShowDesktopCompareCheckbox();
    // }

    if (
      indexes.length < this.state.limit_plans_to_compare_on_mobile &&
      i == 1 &&
      checked_values.length < this.state.limit_plans_to_compare_on_mobile
    ) {
      //  console.log("here");
      //this.toggleShowCompareWidget();

      this.props.dispatch({
        type: "SET_PLANS_TO_COMPARE_ON_MOBILE",
        data: [...this.state.plans_to_compare, value],
      });

      this.props.dispatch({
        type: "SET_CHECKED_PLANS",
        data: [...this.props.checked_plans_list, checked],
      });
    } else if (i > 1 && j > 1) {
      // console.log(
      //   "there",
      //   this.state.this.state.plans_to_compare.splice(i, 1)
      // );

      this.props.dispatch({
        type: "SET_PLANS_TO_COMPARE_ON_MOBILE",
        data: this.state.plans_to_compare.splice(i, 1),
      });

      this.props.dispatch({
        type: "SET_CHECKED_PLANS",
        data: this.props.checked_plans_list.splice(j, 1),
      });
    }
    if (indexes.length == this.state.limit_plans_to_compare_on_mobile) {
      // this.toggleShowDesktopCompareCheckbox();
      //this.state.this.state.plans_to_compare.filter((plan) => index !== plan);
    }

    // }
  }

  removePlanFromMobileCheckedIndexes(index) {
    if (this.state.plans_to_compare.length < 2) {
      message.error("You need to select 2 plans to compare");
      return;
    }
    console.log("index", index);
    // console.log("let's see");

    if (index == undefined) {
      this.props.dispatch({
        type: "SET_PLANS_TO_COMPARE_ON_MOBILE",
        data: [],
      });

      this.props.dispatch({
        type: "SET_CHECKED_PLANS",
        data: [],
      });
    }

    /* let value = index.value;*/
    //this.checkChecked(index);

    let indexes: string[] = [];

    indexes = this.state.plans_to_compare;

    let i: number = indexes.indexOf(index);
    let j: number = i;
    //checked_values.indexOf(checked);

    console.log("indexOf(index):i=", i, "indexOf(checked):j=", j);

    if (
      i > 1
      //&& j > 1
    ) {
      // console.log(
      //   "there",
      //   this.state.this.state.plans_to_compare.splice(i, 1)
      // );

      let x = [...this.state.plans_to_compare];
      let v = x.splice(i, 1) && x;

      let y = [...this.props.checked_plans_list];
      let k = y.splice(j, 1) && y;

      console.log("v", v, "k", k);
      this.props.dispatch({
        type: "SET_PLANS_TO_COMPARE_ON_MOBILE",
        data: [...v],
      });

      this.props.dispatch({
        type: "SET_CHECKED_PLANS",
        data: [...k],
      });
    }
    if (indexes.length < this.state.limit_plans_to_compare_on_mobile) {
      // this.toggleShowCompareCheckbox();
    }
  }

  goToPlans = () => {
    this.props.history.push({ pathname: "/new-design/#plans" });
  };

  numberwithCommas = (value) => {
    return value ? value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : "";
  };

  toggleStarRatingCollapsible = () => {
    this.setState({
      collapse_star_rating: !this.state.collapse_star_rating,
    });
  };

  togglePlanDocsCollapsible = () => {
    this.setState({
      collapse_star_rating: !this.state.collapse_star_rating,
    });
  };

  toggleOtherServicesCollapsible = () => {
    this.setState({
      collapse_other_services: !this.state.collapse_other_services,
    });
  };

  render() {
    console.log("this.state.current_page - 1", this.state.current_page - 1);
    let plans_to_compare: string[] = this.state.plans_to_compare;
    let plans = this.props.plans;

    let first = plans[this.state.plans_to_compare[0]];
    let second = plans[this.state.plans_to_compare[1]];
    let third = plans[this.state.plans_to_compare[2]];

    console.log("first", first, "second", second, "third", third);

    return (
      <div className="side-by-side_comparison c-plan-details-page">
        <div className="c-plan-details-page__header">
          <header className="c-plan-nav-bar">
            <div className="container padding-y--2 display--flex justify-content--between align-items--center">
              <div>
                <a
                  className="c-button c-button--transparent c-plan-nav-bar__back-link padding--0 text-decoration--underline"
                  href="#/plan/results/"
                  target="_self"
                  role="button"
                >
                  <FontAwesomeIcon
                    className="margin-right--1"
                    icon={faArrowLeft}
                  />
                  <span>Back to plans</span>
                </a>
                <h1
                  tabIndex={-1}
                  className="font-weight--normal font-size--h1 margin-y--1"
                >
                  Compare plans
                </h1>
              </div>
              <div className="c-plan-nav-bar__share">
                <div className="c-share-buttons text-align--right">
                  <div className="display--block md-display--inline-block">
                    <button
                      className="c-button c-button--small qa-print-button margin-left--1 margin-bottom--1 sm-padding-x--2"
                      title="Print"
                      type="button"
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
                  <div>
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

        <div className="c-plan-details-page__body">
          <div className="fill--primary md-display--none print-display--none">
            <div className="l-row justify-content--between">
              <div className="l-col--4 text-align--left">
                {this.state.show_prev_button && (
                  <button
                    className="c-button c-button--transparent color--white padding-x--1 qa-compare-prev"
                    type="button"
                    onClick={() => {
                      this.handleMobileNav("prev");
                    }}
                  >
                    <FontAwesomeIcon
                      icon={faChevronLeft}
                      className="margin-right--1"
                    />
                    Prev
                  </button>
                )}
              </div>
              <div className="l-col--4 text-align--center">
                {/* <button
                  className="c-button c-button--transparent padding-x--0 color--muted-inverse"
                  type="button"
                >
                  <FontAwesomeIcon icon={faCircle} />
                </button> */}

                {this.state.plans_to_compare.map((plan, i) => {
                  return (
                    <button
                      className={`c-button c-button--transparent padding-x--0 ${
                        i == this.state.current_page - 1
                          ? "color--muted-inverse"
                          : "color--white"
                      }`}
                      type="button"
                      id={i.toString()}
                    >
                      <FontAwesomeIcon icon={faCircle} />
                    </button>
                  );
                })}

                {/* <button
                  className="c-button c-button--transparent padding-x--0 color--white"
                  type="button"
                >
                  <FontAwesomeIcon icon={faCircle} />
                </button> */}
              </div>

              <div className="l-col--4 text-align--right">
                {this.state.show_next_button && (
                  <button
                    className="c-button c-button--transparent color--white padding-x--1 qa-compare-next"
                    type="button"
                    onClick={() => {
                      this.handleMobileNav("next");
                    }}
                  >
                    Next
                    <FontAwesomeIcon
                      icon={faChevronRight}
                      className="margin-left--1"
                    />
                  </button>
                )}
              </div>
            </div>
          </div>

          <div className="fill--white">
            <div className="container">
              <div className="margin-y--1">
                {/* mobile view begins */}
                <div className="md-display--none print-display--none">
                  <header className="c-plan-title">
                    <div className="c-plan-title__issuer font-weight--bold">
                      {this.state.current_page - 1 < 0
                        ? plans[this.state.plans_to_compare[0]].hmo_id.name
                        : plans[
                            this.state.plans_to_compare[
                              this.state.current_page - 1
                            ]
                          ].hmo_id.name}
                      {/* Blue Cross and Blue Shield of Illinois */}
                    </div>
                    <h2 className="c-plan-title__name font-weight--normal margin-y--1">
                      <a href={`details/serviceID/`} target="_self">
                        {this.state.current_page - 1 < 0
                          ? plans[this.state.plans_to_compare[0]].name
                          : plans[
                              this.state.plans_to_compare[
                                this.state.current_page - 1
                              ]
                            ].name}
                        {/* Blue FocusCare Bronze℠ 209 */}
                      </a>
                    </h2>
                    <ul className="c-plan-title__info c-list--bare font-size--small">
                      <li className="c-plan-title__info-item">
                        <span className="visibility--screen-reader">
                          Metal Level: <span>Bronze</span>
                        </span>
                        <span aria-hidden="true">
                          <span>Bronze</span>
                        </span>
                      </li>
                      <li className="c-plan-title__info-item">
                        <span className="visibility--screen-reader">
                          Plan type: <span>HMO</span>
                        </span>
                        <span aria-hidden="true">
                          <span>HMO</span>
                        </span>
                      </li>
                      <li className="c-plan-title__info-item">
                        Plan ID:
                        <span className="font-weight--bold">
                          36096IL1000009
                        </span>
                      </li>
                    </ul>
                  </header>
                  <button
                    className="c-button c-button--primary c-button--small margin-top--2 qa-mobile-visible-plan"
                    type="button"
                  >
                    Like This Plan? Take the Next Step
                  </button>
                  <section className="c-detail-section margin-bottom--4">
                    <h2 className="border-bottom--1 border--dark padding-bottom--2">
                      Highlights
                    </h2>
                    <div>
                      <table className="c-details-table">
                        <tbody className="valign--top">
                          {" "}
                          <tr>
                            <th scope="row">Plan metal level</th>
                            <td>
                              <span>Bronze</span>
                            </td>
                          </tr>{" "}
                          <tr>
                            <th scope="row">Plan ID</th>
                            <td>
                              <span>36096IL1000009</span>
                            </td>
                          </tr>
                          <tr className="print-display--none">
                            <th scope="row">Medical providers in-network</th>
                            <td>
                              <a
                                className="c-button c-button--small print-display--none padding-x--2 margin-y--1"
                                href="/find-provider"
                                role="button"
                              >
                                Add medical providers
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
                                Add prescription drugs
                              </a>
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
                        onClick={this.toggleStarRatingCollapsible}
                      >
                        Star rating
                        {this.state.collapse_star_rating ? (
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
                      hidden={this.state.collapse_star_rating ? true : false}
                    >
                      <table
                        className={
                          this.state.collapse_star_rating
                            ? "display--none"
                            : "c-details-table"
                        }
                      >
                        <tbody className="valign--top">
                          <tr className="border-bottom--2">
                            <th scope="row">
                              <span className="display--block">
                                Overall star rating
                              </span>
                              <p className="font-weight--normal margin-y--0">
                                Overall star rating is based on the categories
                                below
                              </p>
                            </th>
                            <td>
                              <div className="c-star-rating">
                                <div className="visibility--screen-reader">
                                  Quality Rating: 3 of 5 stars
                                </div>
                                <img
                                  src={starfilled}
                                  className="c-star-rating__star"
                                  alt=""
                                />
                                <img
                                  src={starfilled}
                                  className="c-star-rating__star"
                                  alt=""
                                />
                                <img
                                  src={starfilled}
                                  className="c-star-rating__star"
                                  alt=""
                                />
                                <img
                                  src={star}
                                  className="c-star-rating__star"
                                  alt=""
                                />
                                <img
                                  src={star}
                                  className="c-star-rating__star"
                                  alt=""
                                />
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <th scope="row">
                              <span className="display--block">
                                Member Experience
                              </span>
                              <p className="font-weight--normal margin-y--0">
                                Based on member satisfaction surveys about their
                                health care, doctors, and ease of getting
                                appointments and services
                              </p>
                            </th>
                            <td>
                              <div className="c-star-rating">
                                <div className="visibility--screen-reader">
                                  Quality Rating: 2 of 5 stars
                                </div>
                                <img
                                  src={starfilled}
                                  className="c-star-rating__star"
                                  alt=""
                                />
                                <img
                                  src={starfilled}
                                  className="c-star-rating__star"
                                  alt=""
                                />
                                <img
                                  src={star}
                                  className="c-star-rating__star"
                                  alt=""
                                />
                                <img
                                  src={star}
                                  className="c-star-rating__star"
                                  alt=""
                                />
                                <img
                                  src={star}
                                  className="c-star-rating__star"
                                  alt=""
                                />
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <th scope="row">
                              <span className="display--block">
                                Medical Care
                              </span>
                              <p className="font-weight--normal margin-y--0">
                                Based on providers improving or maintaining the
                                health of their patients with regular
                                screenings, tests, vaccines, and condition
                                monitoring.
                              </p>
                            </th>
                            <td>
                              <div className="c-star-rating">
                                <div className="visibility--screen-reader">
                                  Quality Rating: 3 of 5 stars
                                </div>
                                <img
                                  src={starfilled}
                                  className="c-star-rating__star"
                                  alt=""
                                />
                                <img
                                  src={starfilled}
                                  className="c-star-rating__star"
                                  alt=""
                                />
                                <img
                                  src={starfilled}
                                  className="c-star-rating__star"
                                  alt=""
                                />
                                <img
                                  src={star}
                                  className="c-star-rating__star"
                                  alt=""
                                />
                                <img
                                  src={star}
                                  className="c-star-rating__star"
                                  alt=""
                                />
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <th scope="row">
                              <span className="display--block">
                                Plan Administration
                              </span>
                              <p className="font-weight--normal margin-y--0">
                                Based on how well a plan is run, including
                                customer service, access to needed information,
                                and providers ordering appropriate tests and
                                treatment.
                              </p>
                            </th>
                            <td>
                              <div className="c-star-rating">
                                <div className="visibility--screen-reader">
                                  Quality Rating: 3 of 5 stars
                                </div>
                                <img
                                  src={starfilled}
                                  className="c-star-rating__star"
                                  alt=""
                                />
                                <img
                                  src={starfilled}
                                  className="c-star-rating__star"
                                  alt=""
                                />
                                <img
                                  src={starfilled}
                                  className="c-star-rating__star"
                                  alt=""
                                />
                                <img
                                  src={star}
                                  className="c-star-rating__star"
                                  alt=""
                                />
                                <img
                                  src={star}
                                  className="c-star-rating__star"
                                  alt=""
                                />
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
                        onClick={this.toggleOtherServicesCollapsible}
                      >
                        Other services
                        <FontAwesomeIcon
                          className="fas md-margin-right--1"
                          icon={faChevronDown}
                        />
                      </button>
                    </h2>
                    <div
                      hidden={this.state.collapse_other_services ? true : false}
                    >
                      <table className="c-details-table">
                        <tbody className="valign--top">
                          {" "}
                          <tr>
                            <th scope="row">Infertility treatment</th>
                            <td>
                              <ul className="c-list--bare">
                                <li>
                                  In Network: 50% Coinsurance after deductible
                                </li>
                                <li>Out of Network: Benefit Not Covered</li>
                              </ul>
                              <button
                                className="c-button c-button--transparent c-benefit-listing__modal-button display--block"
                                type="button"
                              >
                                View limits and exclusions
                                <span className="visibility--screen-reader">
                                  : Infertility treatment
                                </span>
                              </button>
                            </td>
                          </tr>
                          <tr>
                            <th scope="row">
                              <span>
                                Mental/
                                <span className="ws-wbr">
                                  <wbr />
                                </span>
                              </span>
                              behavioral health outpatient services
                            </th>
                            <td>
                              <ul className="c-list--bare">
                                <li>In Network: $60</li>
                                <li>Out of Network: $60</li>
                              </ul>
                            </td>
                          </tr>
                          <tr>
                            <th scope="row">
                              <span>
                                Mental/
                                <span className="ws-wbr">
                                  <wbr />
                                </span>
                              </span>
                              behavioral health inpatient services
                            </th>
                            <td>
                              <ul className="c-list--bare">
                                <li>In Network: $850 Copay per Day</li>
                                <li>Out of Network: $850 Copay per Day</li>
                              </ul>
                            </td>
                          </tr>{" "}
                        </tbody>
                      </table>
                    </div>
                  </section>
                </div>

                {/* mobile view ends */}
                <div className="display--none md-display--block print-display--block">
                  <div className="display--flex ">
                    <div className="l-col padding--0"></div>
                    <div className="l-col display--flex justify-content--between border--1 padding--0 c-compare-title__card">
                      <div className="c-compare-title__info padding--1">
                        <div className="font-size--small font-weight--bold">
                          {first.hmo_id.name}
                        </div>
                        <h2 className="font-size--h4 leading--heading font-weight--normal margin-y--1">
                          <a href={`/details/${first.service_id}`}>
                            {first.name}
                          </a>
                        </h2>
                        <div className="margin-top--auto print-display--none">
                          <button
                            className="c-button c-button--primary c-button--small qa-details"
                            type="button"
                          >
                            Like This Plan
                          </button>
                        </div>
                      </div>
                      <div className="fill--gray-lightest print-display--none">
                        <button
                          className="c-button c-button--transparent c-button--small fill--transparent qa-remove"
                          type="button"
                        >
                          <FontAwesomeIcon
                            className="fas  fa-lg color--primary"
                            icon={faTimes}
                          />

                          <span className="visibility--screen-reader">
                            Remove
                          </span>
                        </button>
                      </div>
                    </div>
                    <div className="l-col display--flex justify-content--between border--1 padding--0 c-compare-title__card">
                      <div className="c-compare-title__info padding--1">
                        <div className="font-size--small font-weight--bold">
                          {second.hmo_id.name}
                        </div>
                        <h2 className="font-size--h4 leading--heading font-weight--normal margin-y--1">
                          <a href={`/details/${second.service_id}`}>
                            {second.name}
                          </a>
                        </h2>
                        <div className="margin-top--auto print-display--none">
                          <button
                            className="c-button c-button--primary c-button--small qa-details"
                            type="button"
                          >
                            Like This Plan
                          </button>
                        </div>
                      </div>
                      <div className="fill--gray-lightest print-display--none">
                        <button
                          className="c-button c-button--transparent c-button--small fill--transparent qa-remove"
                          type="button"
                        >
                          <FontAwesomeIcon
                            className="fas  fa-lg color--primary"
                            icon={faTimes}
                          />
                          <span className="visibility--screen-reader">
                            Remove
                          </span>
                        </button>
                      </div>
                    </div>

                    {this.state.plans_to_compare[2] && (
                      <div className="l-col display--flex justify-content--between border--1 padding--0 c-compare-title__card">
                        <div className="c-compare-title__info padding--1">
                          <div className="font-size--small font-weight--bold">
                            {third.hmo_id.name}
                          </div>
                          <h2 className="font-size--h4 leading--heading font-weight--normal margin-y--1">
                            <a href={`/details/${third.service_id}`}>
                              {third.name}
                            </a>
                          </h2>
                          <div className="margin-top--auto print-display--none">
                            <button
                              className="c-button c-button--primary c-button--small qa-details"
                              type="button"
                            >
                              Like This Plan
                            </button>
                          </div>
                        </div>
                        <div className="fill--gray-lightest print-display--none">
                          <button
                            className="c-button c-button--transparent c-button--small fill--transparent qa-remove"
                            type="button"
                          >
                            <FontAwesomeIcon
                              className="fas  fa-lg color--primary"
                              icon={faTimes}
                            />
                            <span className="visibility--screen-reader">
                              Remove
                            </span>
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
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
                              <span>{first.price}</span>
                            </td>
                            <td>
                              <span>{second.price}</span>
                            </td>
                            {this.state.plans_to_compare[2] && (
                              <td>
                                <span>{third.price}</span>
                              </td>
                            )}
                          </tr>
                          <tr>
                            <th scope="row">Plan metal level</th>
                            <td>
                              <span>{first.category}</span>
                            </td>
                            <td>
                              <span>{second.category}</span>
                            </td>
                            {this.state.plans_to_compare[2] && (
                              <td>
                                <span>{third.category}</span>
                              </td>
                            )}
                          </tr>
                          <tr>
                            <th scope="row">Plan type</th>
                            <td>
                              <span>
                                {first.plan_id &&
                                  first.plan_id.category &&
                                  first.plan_id.category.map((cat, i) => {
                                    return (
                                      <b className="">
                                        {" "}
                                        {cat.name}
                                        {first.plan_id.category.length > 1 &&
                                          i <
                                            first.plan_id.category.length - 1 &&
                                          ", "}
                                      </b>
                                    );
                                  })}
                              </span>
                            </td>
                            <td>
                              <span>
                                {second.plan_id &&
                                  second.plan_id.category &&
                                  second.plan_id.category.map((cat, i) => {
                                    return (
                                      <b className="">
                                        {" "}
                                        {cat.name}
                                        {second.plan_id.category.length > 1 &&
                                          i <
                                            second.plan_id.category.length -
                                              1 &&
                                          ", "}
                                      </b>
                                    );
                                  })}
                              </span>
                            </td>
                            {this.state.plans_to_compare[2] && (
                              <td>
                                <span>
                                  {third.plan_id &&
                                    third.plan_id.category &&
                                    third.plan_id.category.map((cat, i) => {
                                      return (
                                        <b className="">
                                          {" "}
                                          {cat.name}
                                          {third.plan_id.category.length > 1 &&
                                            i <
                                              third.plan_id.category.length -
                                                1 &&
                                            ", "}
                                        </b>
                                      );
                                    })}
                                </span>
                              </td>
                            )}
                          </tr>
                          <tr>
                            <th scope="row">Plan ID</th>
                            <td>
                              <span>{first.plan_id.plan_id}</span>
                            </td>
                            <td>
                              <span>{second.plan_id.plan_id}</span>
                            </td>
                            {this.state.plans_to_compare[2] && (
                              <td>
                                <span>{third.plan_id.plan_id}</span>
                              </td>
                            )}
                          </tr>
                          <tr className="print-display--none">
                            <th scope="row">Medical providers in-network</th>
                            <td>
                              <a
                                className="c-button c-button--small print-display--none padding-x--2 margin-y--1"
                                href="/find-provider"
                                role="button"
                              >
                                Add medical providers
                              </a>
                            </td>
                            <td>
                              <a
                                className="c-button c-button--small print-display--none padding-x--2 margin-y--1"
                                href="/find-provider"
                                role="button"
                              >
                                Add medical providers
                              </a>
                            </td>
                            {this.state.plans_to_compare[2] && (
                              <td>
                                <a
                                  className="c-button c-button--small print-display--none padding-x--2 margin-y--1"
                                  href="/find-provider"
                                  role="button"
                                >
                                  Add medical providers
                                </a>
                              </td>
                            )}
                          </tr>
                          <tr className="print-display--none">
                            <th scope="row">Drugs covered/not covered</th>
                            <td>
                              <a
                                className="c-button c-button--small print-display--none padding-x--2 margin-y--1"
                                href="/find-drugs"
                                role="button"
                              >
                                Add prescription drugs
                              </a>
                            </td>
                            <td>
                              <a
                                className="c-button c-button--small print-display--none padding-x--2 margin-y--1"
                                href="/find-drugs"
                                role="button"
                              >
                                Add prescription drugs
                              </a>
                            </td>
                            {this.state.plans_to_compare[2] && (
                              <td>
                                <a
                                  className="c-button c-button--small print-display--none padding-x--2 margin-y--1"
                                  href="/find-drugs"
                                  role="button"
                                >
                                  Add prescription drugs
                                </a>
                              </td>
                            )}
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
                        onClick={this.toggleStarRatingCollapsible}
                      >
                        Services
                        {this.state.collapse_star_rating ? (
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
                      hidden={this.state.collapse_star_rating ? true : false}
                    >
                      <table className="c-details-table">
                        <tbody className="valign--top">
                          <tr className="border-bottom--2">
                            <th scope="row">
                              <span className="display--block">
                                Accidents & Emergencies
                              </span>
                            </th>
                            <td>
                              <div className="c-star-rating">
                                <img
                                  src={
                                    first.accidents_emergencies !== "No" &&
                                    first.accidents_emergencies !== ""
                                      ? check
                                      : uncheck
                                  }
                                  className=""
                                  alt=""
                                />
                              </div>
                            </td>
                            <td>
                              <div className="c-star-rating">
                                <img
                                  src={
                                    second.accidents_emergencies !== "No" &&
                                    second.accidents_emergencies !== ""
                                      ? check
                                      : uncheck
                                  }
                                  className=""
                                  alt=""
                                />
                              </div>
                            </td>
                            {this.state.plans_to_compare[2] && (
                              <td>
                                <div className="c-star-rating">
                                  <img
                                    src={
                                      third.accidents_emergencies !== "No" &&
                                      third.accidents_emergencies !== ""
                                        ? check
                                        : uncheck
                                    }
                                    className=""
                                    alt=""
                                  />
                                </div>
                              </td>
                            )}
                          </tr>
                          <tr>
                            <th scope="row">
                              <span className="display--block">
                                Additional Immunization
                              </span>
                            </th>
                            <td>
                              <div className="c-star-rating">
                                <img
                                  src={
                                    first.additional_ammunization !== "No" &&
                                    first.additional_ammunization !== ""
                                      ? check
                                      : uncheck
                                  }
                                  className=""
                                  alt=""
                                />
                              </div>
                            </td>
                            <td>
                              <div className="c-star-rating">
                                <img
                                  src={
                                    second.additional_ammunization !== "No" &&
                                    second.additional_ammunization !== ""
                                      ? check
                                      : uncheck
                                  }
                                  className=""
                                  alt=""
                                />
                              </div>
                            </td>
                            {this.state.plans_to_compare[2] && (
                              <td>
                                <div className="c-star-rating">
                                  <img
                                    src={
                                      third.additional_ammunization !== "No" &&
                                      third.additional_ammunization !== ""
                                        ? check
                                        : uncheck
                                    }
                                    className=""
                                    alt=""
                                  />
                                </div>
                              </td>
                            )}
                          </tr>
                          <tr>
                            <th scope="row">
                              <span className="display--block">
                                Admission Feeding
                              </span>
                            </th>
                            <td>
                              <div className="c-star-rating">
                                <img
                                  src={
                                    first.admission_feeding !== "No" &&
                                    first.admission_feeding !== ""
                                      ? check
                                      : uncheck
                                  }
                                  className=""
                                  alt=""
                                />
                              </div>
                            </td>
                            <td>
                              <div className="c-star-rating">
                                <img
                                  src={
                                    second.admission_feeding !== "No" &&
                                    second.admission_feeding !== ""
                                      ? check
                                      : uncheck
                                  }
                                  className=""
                                  alt=""
                                />
                              </div>
                            </td>
                            {this.state.plans_to_compare[2] && (
                              <td>
                                <div className="c-star-rating">
                                  <img
                                    src={
                                      third.admission_feeding !== "No" &&
                                      third.admission_feeding !== ""
                                        ? check
                                        : uncheck
                                    }
                                    className=""
                                    alt=""
                                  />
                                </div>
                              </td>
                            )}
                          </tr>
                          <tr>
                            <th scope="row">
                              <span className="display--block">
                                Admissions per annum
                              </span>
                            </th>
                            <td>
                              <div className="c-star-rating">
                                <img
                                  src={
                                    first.admissions_per_annum !== "No" &&
                                    first.admissions_per_annum !== ""
                                      ? check
                                      : uncheck
                                  }
                                  className=""
                                  alt=""
                                />
                              </div>
                            </td>
                            <td>
                              <div className="c-star-rating">
                                <img
                                  src={
                                    second.admissions_per_annum !== "No" &&
                                    second.admissions_per_annum !== ""
                                      ? check
                                      : uncheck
                                  }
                                  className=""
                                  alt=""
                                />
                              </div>
                            </td>
                            {this.state.plans_to_compare[2] && (
                              <td>
                                <div className="c-star-rating">
                                  <img
                                    src={
                                      third.admissions_per_annum !== "No" &&
                                      third.admissions_per_annum !== ""
                                        ? check
                                        : uncheck
                                    }
                                    className=""
                                    alt=""
                                  />
                                </div>
                              </td>
                            )}
                          </tr>

                          <tr>
                            <th scope="row">
                              <span className="display--block">
                                Antenatal Care Delivery
                              </span>
                            </th>
                            <td>
                              <div className="c-star-rating">
                                <img
                                  src={
                                    first.antenatal_care_delivery !== "No" &&
                                    first.antenatal_care_delivery !== ""
                                      ? check
                                      : uncheck
                                  }
                                  className=""
                                  alt=""
                                />
                              </div>
                            </td>
                            <td>
                              <div className="c-star-rating">
                                <img
                                  src={
                                    second.antenatal_care_delivery !== "No" &&
                                    second.antenatal_care_delivery !== ""
                                      ? check
                                      : uncheck
                                  }
                                  className=""
                                  alt=""
                                />
                              </div>
                            </td>
                            {this.state.plans_to_compare[2] && (
                              <td>
                                <div className="c-star-rating">
                                  <img
                                    src={
                                      third.antenatal_care_delivery !== "No" &&
                                      third.antenatal_care_delivery !== ""
                                        ? check
                                        : uncheck
                                    }
                                    className=""
                                    alt=""
                                  />
                                </div>
                              </td>
                            )}
                          </tr>

                          <tr>
                            <th scope="row">
                              <span className="display--block">
                                Cancer Care
                              </span>
                            </th>
                            <td>
                              <div className="c-star-rating">
                                <img
                                  src={
                                    first.cancer_care !== "No" &&
                                    first.cancer_care !== ""
                                      ? check
                                      : uncheck
                                  }
                                  className=""
                                  alt=""
                                />
                              </div>
                            </td>
                            <td>
                              <div className="c-star-rating">
                                <img
                                  src={
                                    second.cancer_care !== "No" &&
                                    second.cancer_care !== ""
                                      ? check
                                      : uncheck
                                  }
                                  className=""
                                  alt=""
                                />
                              </div>
                            </td>
                            {this.state.plans_to_compare[2] && (
                              <td>
                                <div className="c-star-rating">
                                  <img
                                    src={
                                      third.cancer_care !== "No" &&
                                      third.cancer_care !== ""
                                        ? check
                                        : uncheck
                                    }
                                    className=""
                                    alt=""
                                  />
                                </div>
                              </td>
                            )}
                          </tr>
                          <tr>
                            <th scope="row">
                              <span className="display--block">
                                Covid 19 Treatment
                              </span>
                            </th>
                            <td>
                              <div className="c-star-rating">
                                <img
                                  src={
                                    first.covid_19_treatment !== "No" &&
                                    first.covid_19_treatment !== ""
                                      ? check
                                      : uncheck
                                  }
                                  className=""
                                  alt=""
                                />
                              </div>
                            </td>
                            <td>
                              <div className="c-star-rating">
                                <img
                                  src={
                                    second.covid_19_treatment !== "No" &&
                                    second.covid_19_treatment !== ""
                                      ? check
                                      : uncheck
                                  }
                                  className=""
                                  alt=""
                                />
                              </div>
                            </td>
                            {this.state.plans_to_compare[2] && (
                              <td>
                                <div className="c-star-rating">
                                  <img
                                    src={
                                      third.covid_19_treatment !== "No" &&
                                      third.covid_19_treatment !== ""
                                        ? check
                                        : uncheck
                                    }
                                    className=""
                                    alt=""
                                  />
                                </div>
                              </td>
                            )}
                          </tr>

                          <tr>
                            <th scope="row">
                              <span className="display--block">
                                Dental Care
                              </span>
                            </th>
                            <td>
                              <div className="c-star-rating">
                                <img
                                  src={
                                    first.dental_care !== "No" &&
                                    first.dental_care !== ""
                                      ? check
                                      : uncheck
                                  }
                                  className=""
                                  alt=""
                                />
                              </div>
                            </td>
                            <td>
                              <div className="c-star-rating">
                                <img
                                  src={
                                    second.dental_care !== "No" &&
                                    second.dental_care !== ""
                                      ? check
                                      : uncheck
                                  }
                                  className=""
                                  alt=""
                                />
                              </div>
                            </td>
                            {this.state.plans_to_compare[2] && (
                              <td>
                                <div className="c-star-rating">
                                  <img
                                    src={
                                      third.dental_care !== "No" &&
                                      third.dental_care !== ""
                                        ? check
                                        : uncheck
                                    }
                                    className=""
                                    alt=""
                                  />
                                </div>
                              </td>
                            )}
                          </tr>

                          <tr>
                            <th scope="row">
                              <span className="display--block">
                                Drugs Infusions
                              </span>
                            </th>
                            <td>
                              <div className="c-star-rating">
                                <img
                                  src={
                                    first.drugs_infusions !== "No" &&
                                    first.drugs_infusions !== ""
                                      ? check
                                      : uncheck
                                  }
                                  className=""
                                  alt=""
                                />
                              </div>
                            </td>
                            <td>
                              <div className="c-star-rating">
                                <img
                                  src={
                                    second.drugs_infusions !== "No" &&
                                    second.drugs_infusions !== ""
                                      ? check
                                      : uncheck
                                  }
                                  className=""
                                  alt=""
                                />
                              </div>
                            </td>
                            {this.state.plans_to_compare[2] && (
                              <td>
                                <div className="c-star-rating">
                                  <img
                                    src={
                                      third.drugs_infusions !== "No" &&
                                      third.drugs_infusions !== ""
                                        ? check
                                        : uncheck
                                    }
                                    className=""
                                    alt=""
                                  />
                                </div>
                              </td>
                            )}
                          </tr>

                          <tr>
                            <th scope="row">
                              <span className="display--block">ENT Care</span>
                            </th>
                            <td>
                              <div className="c-star-rating">
                                <img
                                  src={
                                    first.ent_care !== "No" &&
                                    first.ent_care !== ""
                                      ? check
                                      : uncheck
                                  }
                                  className=""
                                  alt=""
                                />
                              </div>
                            </td>
                            <td>
                              <div className="c-star-rating">
                                <img
                                  src={
                                    second.ent_care !== "No" &&
                                    second.ent_care !== ""
                                      ? check
                                      : uncheck
                                  }
                                  className=""
                                  alt=""
                                />
                              </div>
                            </td>
                            {this.state.plans_to_compare[2] && (
                              <td>
                                <div className="c-star-rating">
                                  <img
                                    src={
                                      third.ent_care !== "No" &&
                                      third.ent_care !== ""
                                        ? check
                                        : uncheck
                                    }
                                    className=""
                                    alt=""
                                  />
                                </div>
                              </td>
                            )}
                          </tr>

                          <tr>
                            <th scope="row">
                              <span className="display--block">
                                Evacuations
                              </span>
                            </th>
                            <td>
                              <div className="c-star-rating">
                                <img
                                  src={
                                    first.evacuations !== "No" &&
                                    first.evacuations !== ""
                                      ? check
                                      : uncheck
                                  }
                                  className=""
                                  alt=""
                                />
                              </div>
                            </td>
                            <td>
                              <div className="c-star-rating">
                                <img
                                  src={
                                    second.evacuations !== "No" &&
                                    second.evacuations !== ""
                                      ? check
                                      : uncheck
                                  }
                                  className=""
                                  alt=""
                                />
                              </div>
                            </td>
                            {this.state.plans_to_compare[2] && (
                              <td>
                                <div className="c-star-rating">
                                  <img
                                    src={
                                      third.evacuations !== "No" &&
                                      third.evacuations !== ""
                                        ? check
                                        : uncheck
                                    }
                                    className=""
                                    alt=""
                                  />
                                </div>
                              </td>
                            )}
                          </tr>

                          <tr>
                            <th scope="row">
                              <span className="display--block">
                                Family Planning Services
                              </span>
                            </th>
                            <td>
                              <div className="c-star-rating">
                                <img
                                  src={
                                    first.family_planning_services !== "No" &&
                                    first.family_planning_services !== ""
                                      ? check
                                      : uncheck
                                  }
                                  className=""
                                  alt=""
                                />
                              </div>
                            </td>
                            <td>
                              <div className="c-star-rating">
                                <img
                                  src={
                                    second.family_planning_services !== "No" &&
                                    second.family_planning_services !== ""
                                      ? check
                                      : uncheck
                                  }
                                  className=""
                                  alt=""
                                />
                              </div>
                            </td>
                            {this.state.plans_to_compare[2] && (
                              <td>
                                <div className="c-star-rating">
                                  <img
                                    src={
                                      third.family_planning_services !== "No" &&
                                      third.family_planning_services !== ""
                                        ? check
                                        : uncheck
                                    }
                                    className=""
                                    alt=""
                                  />
                                </div>
                              </td>
                            )}
                          </tr>

                          <tr>
                            <th scope="row">
                              <span className="display--block">
                                Fertility Services
                              </span>
                            </th>
                            <td>
                              <div className="c-star-rating">
                                <img
                                  src={
                                    first.fertility_services !== "No" &&
                                    first.fertility_services !== ""
                                      ? check
                                      : uncheck
                                  }
                                  className=""
                                  alt=""
                                />
                              </div>
                            </td>
                            <td>
                              <div className="c-star-rating">
                                <img
                                  src={
                                    second.fertility_services !== "No" &&
                                    second.fertility_services !== ""
                                      ? check
                                      : uncheck
                                  }
                                  className=""
                                  alt=""
                                />
                              </div>
                            </td>
                            {this.state.plans_to_compare[2] && (
                              <td>
                                <div className="c-star-rating">
                                  <img
                                    src={
                                      third.fertility_services !== "No" &&
                                      third.fertility_services !== ""
                                        ? check
                                        : uncheck
                                    }
                                    className=""
                                    alt=""
                                  />
                                </div>
                              </td>
                            )}
                          </tr>

                          <tr>
                            <th scope="row">
                              <span className="display--block">
                                General Consultation
                              </span>
                            </th>
                            <td>
                              <div className="c-star-rating">
                                <img
                                  src={
                                    first.general_consultation !== "No" &&
                                    first.general_consultation !== ""
                                      ? check
                                      : uncheck
                                  }
                                  className=""
                                  alt=""
                                />
                              </div>
                            </td>
                            <td>
                              <div className="c-star-rating">
                                <img
                                  src={
                                    second.general_consultation !== "No" &&
                                    second.general_consultation !== ""
                                      ? check
                                      : uncheck
                                  }
                                  className=""
                                  alt=""
                                />
                              </div>
                            </td>
                            {this.state.plans_to_compare[2] && (
                              <td>
                                <div className="c-star-rating">
                                  <img
                                    src={
                                      third.general_consultation !== "No" &&
                                      third.general_consultation !== ""
                                        ? check
                                        : uncheck
                                    }
                                    className=""
                                    alt=""
                                  />
                                </div>
                              </td>
                            )}
                          </tr>

                          <tr>
                            <th scope="row">
                              <span className="display--block">
                                HIV/ AIDS Treatment
                              </span>
                            </th>
                            <td>
                              <div className="c-star-rating">
                                <img
                                  src={
                                    first.hiv_aids_treatment !== "No" &&
                                    first.hiv_aids_treatment !== ""
                                      ? check
                                      : uncheck
                                  }
                                  className=""
                                  alt=""
                                />
                              </div>
                            </td>
                            <td>
                              <div className="c-star-rating">
                                <img
                                  src={
                                    second.hiv_aids_treatment !== "No" &&
                                    second.hiv_aids_treatment !== ""
                                      ? check
                                      : uncheck
                                  }
                                  className=""
                                  alt=""
                                />
                              </div>
                            </td>
                            {this.state.plans_to_compare[2] && (
                              <td>
                                <div className="c-star-rating">
                                  <img
                                    src={
                                      third.hiv_aids_treatment !== "No" &&
                                      third.hiv_aids_treatment !== ""
                                        ? check
                                        : uncheck
                                    }
                                    className=""
                                    alt=""
                                  />
                                </div>
                              </td>
                            )}
                          </tr>

                          <tr>
                            <th scope="row">
                              <span className="display--block">
                                Hospital Admissions
                              </span>
                            </th>
                            <td>
                              <div className="c-star-rating">
                                <img
                                  src={
                                    first.hospital_admissions !== "No" &&
                                    first.hospital_admissions !== ""
                                      ? check
                                      : uncheck
                                  }
                                  className=""
                                  alt=""
                                />
                              </div>
                            </td>
                            <td>
                              <div className="c-star-rating">
                                <img
                                  src={
                                    second.hospital_admissions !== "No" &&
                                    second.hospital_admissions !== ""
                                      ? check
                                      : uncheck
                                  }
                                  className=""
                                  alt=""
                                />
                              </div>
                            </td>
                            {this.state.plans_to_compare[2] && (
                              <td>
                                <div className="c-star-rating">
                                  <img
                                    src={
                                      third.hospital_admissions !== "No" &&
                                      third.hospital_admissions !== ""
                                        ? check
                                        : uncheck
                                    }
                                    className=""
                                    alt=""
                                  />
                                </div>
                              </td>
                            )}
                          </tr>

                          <tr>
                            <th scope="row">
                              <span className="display--block">
                                Hospital Category
                              </span>
                            </th>
                            <td>
                              <div className="c-star-rating">
                                <span>{first.hospital_category[0].name}</span>
                              </div>
                            </td>
                            <td>
                              <div className="c-star-rating">
                                <span>{second.hospital_category[0].name}</span>
                              </div>
                            </td>
                            {this.state.plans_to_compare[2] && (
                              <td>
                                <div className="c-star-rating">
                                  <span>{third.hospital_category[0].name}</span>
                                </div>
                              </td>
                            )}
                          </tr>

                          <tr>
                            <th scope="row">
                              <span className="display--block">
                                In-patient Limit
                              </span>
                            </th>
                            <td>
                              <div className="c-star-rating">
                                <span>{first.in_patient_limit}</span>
                              </div>
                            </td>
                            <td>
                              <div className="c-star-rating">
                                <span>{second.in_patient_limit}</span>
                              </div>
                            </td>
                            {this.state.plans_to_compare[2] && (
                              <td>
                                <div className="c-star-rating">
                                  <span>{third.in_patient_limit}</span>
                                </div>
                              </td>
                            )}
                          </tr>

                          <tr>
                            <th scope="row">
                              <span className="display--block">
                                Intensive Care
                              </span>
                            </th>
                            <td>
                              <div className="c-star-rating">
                                <img
                                  src={
                                    first.intensive_care !== "No" &&
                                    first.intensive_care !== ""
                                      ? check
                                      : uncheck
                                  }
                                  className=""
                                  alt=""
                                />
                              </div>
                            </td>
                            <td>
                              <div className="c-star-rating">
                                <img
                                  src={
                                    second.intensive_care !== "No" &&
                                    second.intensive_care !== ""
                                      ? check
                                      : uncheck
                                  }
                                  className=""
                                  alt=""
                                />
                              </div>
                            </td>
                            {this.state.plans_to_compare[2] && (
                              <td>
                                <div className="c-star-rating">
                                  <img
                                    src={
                                      third.intensive_care !== "No" &&
                                      third.intensive_care !== ""
                                        ? check
                                        : uncheck
                                    }
                                    className=""
                                    alt=""
                                  />
                                </div>
                              </td>
                            )}
                          </tr>

                          <tr>
                            <th scope="row">
                              <span className="display--block">
                                Intermediate Surgeries
                              </span>
                            </th>
                            <td>
                              <div className="c-star-rating">
                                <img
                                  src={
                                    first.intermediate_surgeries !== "No" &&
                                    first.intermediate_surgeries !== ""
                                      ? check
                                      : uncheck
                                  }
                                  className=""
                                  alt=""
                                />
                              </div>
                            </td>
                            <td>
                              <div className="c-star-rating">
                                <img
                                  src={
                                    second.intermediate_surgeries !== "No" &&
                                    second.intermediate_surgeries !== ""
                                      ? check
                                      : uncheck
                                  }
                                  className=""
                                  alt=""
                                />
                              </div>
                            </td>
                            {this.state.plans_to_compare[2] && (
                              <td>
                                <div className="c-star-rating">
                                  <img
                                    src={
                                      third.intermediate_surgeries !== "No" &&
                                      third.intermediate_surgeries !== ""
                                        ? check
                                        : uncheck
                                    }
                                    className=""
                                    alt=""
                                  />
                                </div>
                              </td>
                            )}
                          </tr>

                          <tr>
                            <th scope="row">
                              <span className="display--block">
                                Lab Investigations
                              </span>
                            </th>
                            <td>
                              <div className="c-star-rating">
                                <img
                                  src={
                                    first.lab_investigations !== "No" &&
                                    first.lab_investigations !== ""
                                      ? check
                                      : uncheck
                                  }
                                  className=""
                                  alt=""
                                />
                              </div>
                            </td>
                            <td>
                              <div className="c-star-rating">
                                <img
                                  src={
                                    second.lab_investigations !== "No" &&
                                    second.lab_investigations !== ""
                                      ? check
                                      : uncheck
                                  }
                                  className=""
                                  alt=""
                                />
                              </div>
                            </td>
                            {this.state.plans_to_compare[2] && (
                              <td>
                                <div className="c-star-rating">
                                  <img
                                    src={
                                      third.lab_investigations !== "No" &&
                                      third.lab_investigations !== ""
                                        ? check
                                        : uncheck
                                    }
                                    className=""
                                    alt=""
                                  />
                                </div>
                              </td>
                            )}
                          </tr>

                          <tr>
                            <th scope="row">
                              <span className="display--block">
                                Major Surgeries
                              </span>
                            </th>
                            <td>
                              <div className="c-star-rating">
                                <img
                                  src={
                                    first.major_surgeries !== "No" &&
                                    first.major_surgeries !== ""
                                      ? check
                                      : uncheck
                                  }
                                  className=""
                                  alt=""
                                />
                              </div>
                            </td>
                            <td>
                              <div className="c-star-rating">
                                <img
                                  src={
                                    second.major_surgeries !== "No" &&
                                    second.major_surgeries !== ""
                                      ? check
                                      : uncheck
                                  }
                                  className=""
                                  alt=""
                                />
                              </div>
                            </td>
                            {this.state.plans_to_compare[2] && (
                              <td>
                                <div className="c-star-rating">
                                  <img
                                    src={
                                      third.major_surgeries !== "No" &&
                                      third.major_surgeries !== ""
                                        ? check
                                        : uncheck
                                    }
                                    className=""
                                    alt=""
                                  />
                                </div>
                              </td>
                            )}
                          </tr>

                          <tr>
                            <th scope="row">
                              <span className="display--block">
                                Mental Health Services
                              </span>
                            </th>
                            <td>
                              <div className="c-star-rating">
                                <img
                                  src={
                                    first.mental_health_services !== "No" &&
                                    first.mental_health_services !== ""
                                      ? check
                                      : uncheck
                                  }
                                  className=""
                                  alt=""
                                />
                              </div>
                            </td>
                            <td>
                              <div className="c-star-rating">
                                <img
                                  src={
                                    second.mental_health_services !== "No" &&
                                    second.mental_health_services !== ""
                                      ? check
                                      : uncheck
                                  }
                                  className=""
                                  alt=""
                                />
                              </div>
                            </td>
                            {this.state.plans_to_compare[2] && (
                              <td>
                                <div className="c-star-rating">
                                  <img
                                    src={
                                      third.mental_health_services !== "No" &&
                                      third.mental_health_services !== ""
                                        ? check
                                        : uncheck
                                    }
                                    className=""
                                    alt=""
                                  />
                                </div>
                              </td>
                            )}
                          </tr>

                          <tr>
                            <th scope="row">
                              <span className="display--block">
                                Minor Surgeries
                              </span>
                            </th>
                            <td>
                              <div className="c-star-rating">
                                <img
                                  src={
                                    first.minor_surgeries !== "No" &&
                                    first.minor_surgeries !== ""
                                      ? check
                                      : uncheck
                                  }
                                  className=""
                                  alt=""
                                />
                              </div>
                            </td>
                            <td>
                              <div className="c-star-rating">
                                <img
                                  src={
                                    second.minor_surgeries !== "No" &&
                                    second.minor_surgeries !== ""
                                      ? check
                                      : uncheck
                                  }
                                  className=""
                                  alt=""
                                />
                              </div>
                            </td>
                            {this.state.plans_to_compare[2] && (
                              <td>
                                <div className="c-star-rating">
                                  <img
                                    src={
                                      third.minor_surgeries !== "No" &&
                                      third.minor_surgeries !== ""
                                        ? check
                                        : uncheck
                                    }
                                    className=""
                                    alt=""
                                  />
                                </div>
                              </td>
                            )}
                          </tr>

                          <tr>
                            <th scope="row">
                              <span className="display--block">
                                Neonatal Care
                              </span>
                            </th>
                            <td>
                              <div className="c-star-rating">
                                <img
                                  src={
                                    first.neonatal_care !== "No" &&
                                    first.neonatal_care !== ""
                                      ? check
                                      : uncheck
                                  }
                                  className=""
                                  alt=""
                                />
                              </div>
                            </td>
                            <td>
                              <div className="c-star-rating">
                                <img
                                  src={
                                    second.neonatal_care !== "No" &&
                                    second.neonatal_care !== ""
                                      ? check
                                      : uncheck
                                  }
                                  className=""
                                  alt=""
                                />
                              </div>
                            </td>
                            {this.state.plans_to_compare[2] && (
                              <td>
                                <div className="c-star-rating">
                                  <img
                                    src={
                                      third.neonatal_care !== "No" &&
                                      third.neonatal_care !== ""
                                        ? check
                                        : uncheck
                                    }
                                    className=""
                                    alt=""
                                  />
                                </div>
                              </td>
                            )}
                          </tr>

                          <tr>
                            <th scope="row">
                              <span className="display--block">
                                Optical Care
                              </span>
                            </th>
                            <td>
                              <div className="c-star-rating">
                                <img
                                  src={
                                    first.optical_care !== "No" &&
                                    first.optical_care !== ""
                                      ? check
                                      : uncheck
                                  }
                                  className=""
                                  alt=""
                                />
                              </div>
                            </td>
                            <td>
                              <div className="c-star-rating">
                                <img
                                  src={
                                    second.optical_care !== "No" &&
                                    second.optical_care !== ""
                                      ? check
                                      : uncheck
                                  }
                                  className=""
                                  alt=""
                                />
                              </div>
                            </td>
                            {this.state.plans_to_compare[2] && (
                              <td>
                                <div className="c-star-rating">
                                  <img
                                    src={
                                      third.optical_care !== "No" &&
                                      third.optical_care !== ""
                                        ? check
                                        : uncheck
                                    }
                                    className=""
                                    alt=""
                                  />
                                </div>
                              </td>
                            )}
                          </tr>

                          <tr>
                            <th scope="row">
                              <span className="display--block">
                                Out-patient Limit
                              </span>
                            </th>
                            <td>
                              <div className="c-star-rating">
                                <span>{first.out_patient_limit}</span>
                              </div>
                            </td>
                            <td>
                              <div className="c-star-rating">
                                <span>{second.out_patient_limit}</span>
                              </div>
                            </td>
                            {this.state.plans_to_compare[2] && (
                              <td>
                                <div className="c-star-rating">
                                  <span>{third.out_patient_limit}</span>
                                </div>
                              </td>
                            )}
                          </tr>

                          <tr>
                            <th scope="row">
                              <span className="display--block">
                                Physiotherapy
                              </span>
                            </th>
                            <td>
                              <div className="c-star-rating">
                                <img
                                  src={
                                    first.physiotherapy !== "No" &&
                                    first.physiotherapy !== ""
                                      ? check
                                      : uncheck
                                  }
                                  className=""
                                  alt=""
                                />
                              </div>
                            </td>
                            <td>
                              <div className="c-star-rating">
                                <img
                                  src={
                                    second.physiotherapy !== "No" &&
                                    second.physiotherapy !== ""
                                      ? check
                                      : uncheck
                                  }
                                  className=""
                                  alt=""
                                />
                              </div>
                            </td>
                            {this.state.plans_to_compare[2] && (
                              <td>
                                <div className="c-star-rating">
                                  <img
                                    src={
                                      third.physiotherapy !== "No" &&
                                      third.physiotherapy !== ""
                                        ? check
                                        : uncheck
                                    }
                                    className=""
                                    alt=""
                                  />
                                </div>
                              </td>
                            )}
                          </tr>

                          <tr>
                            <th scope="row">
                              <span className="display--block">
                                Plain Contrast Xrays
                              </span>
                            </th>
                            <td>
                              <div className="c-star-rating">
                                <img
                                  src={
                                    first.plain_contrast_xrays !== "No" &&
                                    first.plain_contrast_xrays !== ""
                                      ? check
                                      : uncheck
                                  }
                                  className=""
                                  alt=""
                                />
                              </div>
                            </td>
                            <td>
                              <div className="c-star-rating">
                                <img
                                  src={
                                    second.plain_contrast_xrays !== "No" &&
                                    second.plain_contrast_xrays !== ""
                                      ? check
                                      : uncheck
                                  }
                                  className=""
                                  alt=""
                                />
                              </div>
                            </td>
                            {this.state.plans_to_compare[2] && (
                              <td>
                                <div className="c-star-rating">
                                  <img
                                    src={
                                      third.plain_contrast_xrays !== "No" &&
                                      third.plain_contrast_xrays !== ""
                                        ? check
                                        : uncheck
                                    }
                                    className=""
                                    alt=""
                                  />
                                </div>
                              </td>
                            )}
                          </tr>

                          <tr>
                            <th scope="row">
                              <span className="display--block">
                                Postnatal Care
                              </span>
                            </th>
                            <td>
                              <div className="c-star-rating">
                                <img
                                  src={
                                    first.postnatal_care !== "No" &&
                                    first.postnatal_care !== ""
                                      ? check
                                      : uncheck
                                  }
                                  className=""
                                  alt=""
                                />
                              </div>
                            </td>
                            <td>
                              <div className="c-star-rating">
                                <img
                                  src={
                                    second.postnatal_care !== "No" &&
                                    second.postnatal_care !== ""
                                      ? check
                                      : uncheck
                                  }
                                  className=""
                                  alt=""
                                />
                              </div>
                            </td>
                            {this.state.plans_to_compare[2] && (
                              <td>
                                <div className="c-star-rating">
                                  <img
                                    src={
                                      third.postnatal_care !== "No" &&
                                      third.postnatal_care !== ""
                                        ? check
                                        : uncheck
                                    }
                                    className=""
                                    alt=""
                                  />
                                </div>
                              </td>
                            )}
                          </tr>

                          <tr>
                            <th scope="row">
                              <span className="display--block">
                                Prescribed Drugs
                              </span>
                            </th>
                            <td>
                              <div className="c-star-rating">
                                <img
                                  src={
                                    first.prescribed_drugs !== "No" &&
                                    first.prescribed_drugs !== ""
                                      ? check
                                      : uncheck
                                  }
                                  className=""
                                  alt=""
                                />
                              </div>
                            </td>
                            <td>
                              <div className="c-star-rating">
                                <img
                                  src={
                                    second.prescribed_drugs !== "No" &&
                                    second.prescribed_drugs !== ""
                                      ? check
                                      : uncheck
                                  }
                                  className=""
                                  alt=""
                                />
                              </div>
                            </td>
                            {this.state.plans_to_compare[2] && (
                              <td>
                                <div className="c-star-rating">
                                  <img
                                    src={
                                      third.prescribed_drugs !== "No" &&
                                      third.prescribed_drugs !== ""
                                        ? check
                                        : uncheck
                                    }
                                    className=""
                                    alt=""
                                  />
                                </div>
                              </td>
                            )}
                          </tr>

                          <tr>
                            <th scope="row">
                              <span className="display--block">
                                Renal Dialysis
                              </span>
                            </th>
                            <td>
                              <div className="c-star-rating">
                                <img
                                  src={
                                    first.renal_dialysis !== "No" &&
                                    first.renal_dialysis !== ""
                                      ? check
                                      : uncheck
                                  }
                                  className=""
                                  alt=""
                                />
                              </div>
                            </td>
                            <td>
                              <div className="c-star-rating">
                                <img
                                  src={
                                    second.renal_dialysis !== "No" &&
                                    second.renal_dialysis !== ""
                                      ? check
                                      : uncheck
                                  }
                                  className=""
                                  alt=""
                                />
                              </div>
                            </td>
                            {this.state.plans_to_compare[2] && (
                              <td>
                                <div className="c-star-rating">
                                  <img
                                    src={
                                      third.renal_dialysis !== "No" &&
                                      third.renal_dialysis !== ""
                                        ? check
                                        : uncheck
                                    }
                                    className=""
                                    alt=""
                                  />
                                </div>
                              </td>
                            )}
                          </tr>

                          <tr>
                            <th scope="row">
                              <span className="display--block">
                                Routine Immunization
                              </span>
                            </th>
                            <td>
                              <div className="c-star-rating">
                                <span>{first.routine_immunization}</span>
                              </div>
                            </td>
                            <td>
                              <div className="c-star-rating">
                                <span>{second.routine_immunization}</span>
                              </div>
                            </td>
                            {this.state.plans_to_compare[2] && (
                              <td>
                                <div className="c-star-rating">
                                  <span>{third.routine_immunization}</span>
                                </div>
                              </td>
                            )}
                          </tr>

                          <tr>
                            <th scope="row">
                              <span className="display--block">
                                Specialist Consultation
                              </span>
                            </th>
                            <td>
                              <div className="c-star-rating">
                                <img
                                  src={
                                    first.specialist_consultation !== "No" &&
                                    first.specialist_consultation !== ""
                                      ? check
                                      : uncheck
                                  }
                                  className=""
                                  alt=""
                                />
                              </div>
                            </td>
                            <td>
                              <div className="c-star-rating">
                                <img
                                  src={
                                    second.specialist_consultation !== "No" &&
                                    second.specialist_consultation !== ""
                                      ? check
                                      : uncheck
                                  }
                                  className=""
                                  alt=""
                                />
                              </div>
                            </td>
                            {this.state.plans_to_compare[2] && (
                              <td>
                                <div className="c-star-rating">
                                  <img
                                    src={
                                      third.specialist_consultation !== "No" &&
                                      third.specialist_consultation !== ""
                                        ? check
                                        : uncheck
                                    }
                                    className=""
                                    alt=""
                                  />
                                </div>
                              </td>
                            )}
                          </tr>

                          <tr>
                            <th scope="row">
                              <span className="display--block">
                                Ultrasound Scans
                              </span>
                            </th>
                            <td>
                              <div className="c-star-rating">
                                <img
                                  src={
                                    first.ultrasound_scans !== "No" &&
                                    first.ultrasound_scans !== ""
                                      ? check
                                      : uncheck
                                  }
                                  className=""
                                  alt=""
                                />
                              </div>
                            </td>
                            <td>
                              <div className="c-star-rating">
                                <img
                                  src={
                                    second.ultrasound_scans !== "No" &&
                                    second.ultrasound_scans !== ""
                                      ? check
                                      : uncheck
                                  }
                                  className=""
                                  alt=""
                                />
                              </div>
                            </td>
                            {this.state.plans_to_compare[2] && (
                              <td>
                                <div className="c-star-rating">
                                  <img
                                    src={
                                      third.ultrasound_scans !== "No" &&
                                      third.ultrasound_scans !== ""
                                        ? check
                                        : uncheck
                                    }
                                    className=""
                                    alt=""
                                  />
                                </div>
                              </td>
                            )}
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
                        onClick={this.toggleOtherServicesCollapsible}
                      >
                        Details
                        {this.state.collapse_other_services ? (
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
                      hidden={this.state.collapse_other_services ? true : false}
                    >
                      <table className="c-details-table">
                        <tbody className="valign--top">
                          <tr className="border-bottom--2">
                            <th scope="row">
                              <span className="display--block">
                                Accidents & Emergencies
                              </span>
                            </th>
                            <td>
                              <div className="c-star-rating">
                                <span>{first.accidents_emergencies}</span>
                              </div>
                            </td>
                            <td>
                              <div className="c-star-rating">
                                <span>{second.accidents_emergencies}</span>
                              </div>
                            </td>
                            {this.state.plans_to_compare[2] && (
                              <td>
                                <div className="c-star-rating">
                                  <span>{third.accidents_emergencies}</span>
                                </div>
                              </td>
                            )}
                          </tr>
                          <tr>
                            <th scope="row">
                              <span className="display--block">
                                Additional Immunization
                              </span>
                            </th>
                            <td>
                              <div className="c-star-rating">
                                <span>{first.additional_ammunization}</span>
                              </div>
                            </td>
                            <td>
                              <div className="c-star-rating">
                                <span>{second.additional_ammunization}</span>
                              </div>
                            </td>
                            {this.state.plans_to_compare[2] && (
                              <td>
                                <div className="c-star-rating">
                                  <span>{third.additional_ammunization}</span>
                                </div>
                              </td>
                            )}
                          </tr>
                          <tr>
                            <th scope="row">
                              <span className="display--block">
                                Admission Feeding
                              </span>
                            </th>
                            <td>
                              <div className="c-star-rating">
                                <span>{first.admission_feeding}</span>
                              </div>
                            </td>
                            <td>
                              <div className="c-star-rating">
                                <span>{second.admission_feeding}</span>
                              </div>
                            </td>
                            {this.state.plans_to_compare[2] && (
                              <td>
                                <div className="c-star-rating">
                                  <span>{third.admission_feeding}</span>
                                </div>
                              </td>
                            )}
                          </tr>
                          <tr>
                            <th scope="row">
                              <span className="display--block">
                                Admissions per annum
                              </span>
                            </th>
                            <td>
                              <div className="c-star-rating">
                                <span>{first.admissions_per_annum}</span>
                              </div>
                            </td>
                            <td>
                              <div className="c-star-rating">
                                <span>{second.admissions_per_annum}</span>
                              </div>
                            </td>
                            {this.state.plans_to_compare[2] && (
                              <td>
                                <div className="c-star-rating">
                                  <span>{third.admissions_per_annum}</span>
                                </div>
                              </td>
                            )}
                          </tr>

                          <tr>
                            <th scope="row">
                              <span className="display--block">
                                Antenatal Care Delivery
                              </span>
                            </th>
                            <td>
                              <div className="c-star-rating">
                                <span>{first.antenatal_care_delivery}</span>
                              </div>
                            </td>
                            <td>
                              <div className="c-star-rating">
                                <span>{second.antenatal_care_delivery}</span>
                              </div>
                            </td>
                            {this.state.plans_to_compare[2] && (
                              <td>
                                <div className="c-star-rating">
                                  <span>{third.antenatal_care_delivery}</span>
                                </div>
                              </td>
                            )}
                          </tr>

                          <tr>
                            <th scope="row">
                              <span className="display--block">
                                Cancer Care
                              </span>
                            </th>
                            <td>
                              <div className="c-star-rating">
                                <span>{first.cancer_care}</span>
                              </div>
                            </td>
                            <td>
                              <div className="c-star-rating">
                                <span>{second.cancer_care}</span>
                              </div>
                            </td>
                            {this.state.plans_to_compare[2] && (
                              <td>
                                <div className="c-star-rating">
                                  <span>{third.cancer_care}</span>
                                </div>
                              </td>
                            )}
                          </tr>
                          <tr>
                            <th scope="row">
                              <span className="display--block">
                                Covid 19 Treatment
                              </span>
                            </th>
                            <td>
                              <div className="c-star-rating">
                                <span>{first.covid_19_treatment}</span>
                              </div>
                            </td>
                            <td>
                              <div className="c-star-rating">
                                <span>{second.covid_19_treatment}</span>
                              </div>
                            </td>
                            {this.state.plans_to_compare[2] && (
                              <td>
                                <div className="c-star-rating">
                                  <span>{third.covid_19_treatment}</span>
                                </div>
                              </td>
                            )}
                          </tr>

                          <tr>
                            <th scope="row">
                              <span className="display--block">
                                Dental Care
                              </span>
                            </th>
                            <td>
                              <div className="c-star-rating">
                                <span>{first.dental_care}</span>
                              </div>
                            </td>
                            <td>
                              <div className="c-star-rating">
                                <span>{second.dental_care}</span>
                              </div>
                            </td>
                            {this.state.plans_to_compare[2] && (
                              <td>
                                <div className="c-star-rating">
                                  <span>{third.dental_care}</span>
                                </div>
                              </td>
                            )}
                          </tr>

                          <tr>
                            <th scope="row">
                              <span className="display--block">
                                Drugs Infusions
                              </span>
                            </th>
                            <td>
                              <div className="c-star-rating">
                                <span>{first.drugs_infusions}</span>
                              </div>
                            </td>
                            <td>
                              <div className="c-star-rating">
                                <span>{second.drugs_infusions}</span>
                              </div>
                            </td>
                            {this.state.plans_to_compare[2] && (
                              <td>
                                <div className="c-star-rating">
                                  <span>{third.drugs_infusions}</span>
                                </div>
                              </td>
                            )}
                          </tr>

                          <tr>
                            <th scope="row">
                              <span className="display--block">ENT Care</span>
                            </th>
                            <td>
                              <div className="c-star-rating">
                                <span>{first.ent_care}</span>
                              </div>
                            </td>
                            <td>
                              <div className="c-star-rating">
                                <span>{second.ent_care}</span>
                              </div>
                            </td>
                            {this.state.plans_to_compare[2] && (
                              <td>
                                <div className="c-star-rating">
                                  <span>{third.ent_care}</span>
                                </div>
                              </td>
                            )}
                          </tr>

                          <tr>
                            <th scope="row">
                              <span className="display--block">
                                Evacuations
                              </span>
                            </th>
                            <td>
                              <div className="c-star-rating">
                                <span>{first.evacuations}</span>
                              </div>
                            </td>
                            <td>
                              <div className="c-star-rating">
                                <span>{second.evacuations}</span>
                              </div>
                            </td>
                            {this.state.plans_to_compare[2] && (
                              <td>
                                <div className="c-star-rating">
                                  <span>{third.evacuations}</span>
                                </div>
                              </td>
                            )}
                          </tr>

                          <tr>
                            <th scope="row">
                              <span className="display--block">
                                Family Planning Services
                              </span>
                            </th>
                            <td>
                              <div className="c-star-rating">
                                <span>{first.family_planning_services}</span>
                              </div>
                            </td>
                            <td>
                              <div className="c-star-rating">
                                <span>{second.family_planning_services}</span>
                              </div>
                            </td>
                            {this.state.plans_to_compare[2] && (
                              <td>
                                <div className="c-star-rating">
                                  <span>{third.family_planning_services}</span>
                                </div>
                              </td>
                            )}
                          </tr>

                          <tr>
                            <th scope="row">
                              <span className="display--block">
                                Fertility Services
                              </span>
                            </th>
                            <td>
                              <div className="c-star-rating">
                                <span>{first.fertility_services}</span>
                              </div>
                            </td>
                            <td>
                              <div className="c-star-rating">
                                <span>{second.fertility_services}</span>
                              </div>
                            </td>
                            {this.state.plans_to_compare[2] && (
                              <td>
                                <div className="c-star-rating">
                                  <span>{third.fertility_services}</span>
                                </div>
                              </td>
                            )}
                          </tr>

                          <tr>
                            <th scope="row">
                              <span className="display--block">
                                General Consultation
                              </span>
                            </th>
                            <td>
                              <div className="c-star-rating">
                                <span>{first.general_consultation}</span>
                              </div>
                            </td>
                            <td>
                              <div className="c-star-rating">
                                <span>{second.general_consultation}</span>
                              </div>
                            </td>
                            {this.state.plans_to_compare[2] && (
                              <td>
                                <div className="c-star-rating">
                                  <span>{third.general_consultation}</span>
                                </div>
                              </td>
                            )}
                          </tr>

                          <tr>
                            <th scope="row">
                              <span className="display--block">
                                HIV/ AIDS Treatment
                              </span>
                            </th>
                            <td>
                              <div className="c-star-rating">
                                <span>{first.hiv_aids_treatment}</span>
                              </div>
                            </td>
                            <td>
                              <div className="c-star-rating">
                                <span>{second.hiv_aids_treatment}</span>
                              </div>
                            </td>
                            {this.state.plans_to_compare[2] && (
                              <td>
                                <div className="c-star-rating">
                                  <span>{third.hiv_aids_treatment}</span>
                                </div>
                              </td>
                            )}
                          </tr>

                          <tr>
                            <th scope="row">
                              <span className="display--block">
                                Hospital Admissions
                              </span>
                            </th>
                            <td>
                              <div className="c-star-rating">
                                <span>{first.hospital_addmissions}</span>
                              </div>
                            </td>
                            <td>
                              <div className="c-star-rating">
                                <span>{second.hospital_addmissions}</span>
                              </div>
                            </td>
                            {this.state.plans_to_compare[2] && (
                              <td>
                                <div className="c-star-rating">
                                  <span>{third.hospital_admissions}</span>
                                </div>
                              </td>
                            )}
                          </tr>

                          <tr>
                            <th scope="row">
                              <span className="display--block">
                                Hospital Category
                              </span>
                            </th>
                            <td>
                              <div className="c-star-rating">
                                <span>{first.hospital_category[0].name}</span>
                              </div>
                            </td>
                            <td>
                              <div className="c-star-rating">
                                <span>{second.hospital_category[0].name}</span>
                              </div>
                            </td>
                            {this.state.plans_to_compare[2] && (
                              <td>
                                <div className="c-star-rating">
                                  <span>{third.hospital_category[0].name}</span>
                                </div>
                              </td>
                            )}
                          </tr>

                          <tr>
                            <th scope="row">
                              <span className="display--block">
                                In-patient Limit
                              </span>
                            </th>
                            <td>
                              <div className="c-star-rating">
                                <span>{first.in_patient_limit}</span>
                              </div>
                            </td>
                            <td>
                              <div className="c-star-rating">
                                <span>{second.in_patient_limit}</span>
                              </div>
                            </td>
                            {this.state.plans_to_compare[2] && (
                              <td>
                                <div className="c-star-rating">
                                  <span>{third.in_patient_limit}</span>
                                </div>
                              </td>
                            )}
                          </tr>

                          <tr>
                            <th scope="row">
                              <span className="display--block">
                                Intensive Care
                              </span>
                            </th>
                            <td>
                              <div className="c-star-rating">
                                <span>{first.intensive_care}</span>
                              </div>
                            </td>
                            <td>
                              <div className="c-star-rating">
                                <span>{second.intensive_care}</span>
                              </div>
                            </td>
                            {this.state.plans_to_compare[2] && (
                              <td>
                                <div className="c-star-rating">
                                  <span>{third.intensive_care}</span>
                                </div>
                              </td>
                            )}
                          </tr>

                          <tr>
                            <th scope="row">
                              <span className="display--block">
                                Intermediate Surgeries
                              </span>
                            </th>
                            <td>
                              <div className="c-star-rating">
                                <span>{first.intermediate_surgeries}</span>
                              </div>
                            </td>
                            <td>
                              <div className="c-star-rating">
                                <span>{second.intermediate_surgeries}</span>
                              </div>
                            </td>
                            {this.state.plans_to_compare[2] && (
                              <td>
                                <div className="c-star-rating">
                                  <span>{third.intermediate_surgeries}</span>
                                </div>
                              </td>
                            )}
                          </tr>

                          <tr>
                            <th scope="row">
                              <span className="display--block">
                                Lab Investigations
                              </span>
                            </th>
                            <td>
                              <div className="c-star-rating">
                                <span>{first.lab_investigations}</span>
                              </div>
                            </td>
                            <td>
                              <div className="c-star-rating">
                                <span>{second.lab_investigations}</span>
                              </div>
                            </td>
                            {this.state.plans_to_compare[2] && (
                              <td>
                                <div className="c-star-rating">
                                  <span>{third.lab_investigations}</span>
                                </div>
                              </td>
                            )}
                          </tr>

                          <tr>
                            <th scope="row">
                              <span className="display--block">
                                Major Surgeries
                              </span>
                            </th>
                            <td>
                              <div className="c-star-rating">
                                <span>{first.major_surgeries}</span>
                              </div>
                            </td>
                            <td>
                              <div className="c-star-rating">
                                <span>{second.major_surgeries}</span>
                              </div>
                            </td>
                            {this.state.plans_to_compare[2] && (
                              <td>
                                <div className="c-star-rating">
                                  <span>{third.major_surgeries}</span>
                                </div>
                              </td>
                            )}
                          </tr>

                          <tr>
                            <th scope="row">
                              <span className="display--block">
                                Mental Health Services
                              </span>
                            </th>
                            <td>
                              <div className="c-star-rating">
                                <span>{first.mental_health_services}</span>
                              </div>
                            </td>
                            <td>
                              <div className="c-star-rating">
                                <span>{second.mental_health_services}</span>
                              </div>
                            </td>
                            {this.state.plans_to_compare[2] && (
                              <td>
                                <div className="c-star-rating">
                                  <span>{third.mental_health_services}</span>
                                </div>
                              </td>
                            )}
                          </tr>

                          <tr>
                            <th scope="row">
                              <span className="display--block">
                                Minor Surgeries
                              </span>
                            </th>
                            <td>
                              <div className="c-star-rating">
                                <span>{first.minor_surgeries}</span>
                              </div>
                            </td>
                            <td>
                              <div className="c-star-rating">
                                <span>{second.minor_surgeries}</span>
                              </div>
                            </td>
                            {this.state.plans_to_compare[2] && (
                              <td>
                                <div className="c-star-rating">
                                  <span>{third.minor_surgeries}</span>
                                </div>
                              </td>
                            )}
                          </tr>

                          <tr>
                            <th scope="row">
                              <span className="display--block">
                                Neonatal Care
                              </span>
                            </th>
                            <td>
                              <div className="c-star-rating">
                                <span>{first.neonatal_care}</span>
                              </div>
                            </td>
                            <td>
                              <div className="c-star-rating">
                                <span>{second.neonatal_care}</span>
                              </div>
                            </td>
                            {this.state.plans_to_compare[2] && (
                              <td>
                                <div className="c-star-rating">
                                  <span>{third.neonatal_care}</span>
                                </div>
                              </td>
                            )}
                          </tr>

                          <tr>
                            <th scope="row">
                              <span className="display--block">
                                Optical Care
                              </span>
                            </th>
                            <td>
                              <div className="c-star-rating">
                                <span>{first.optical_care}</span>
                              </div>
                            </td>
                            <td>
                              <div className="c-star-rating">
                                <span>{second.optical_care}</span>
                              </div>
                            </td>
                            {this.state.plans_to_compare[2] && (
                              <td>
                                <div className="c-star-rating">
                                  <span>{third.optical_care}</span>
                                </div>
                              </td>
                            )}
                          </tr>

                          <tr>
                            <th scope="row">
                              <span className="display--block">
                                Out-patient Limit
                              </span>
                            </th>
                            <td>
                              <div className="c-star-rating">
                                <span>{first.out_patient_limit}</span>
                              </div>
                            </td>
                            <td>
                              <div className="c-star-rating">
                                <span>{second.out_patient_limit}</span>
                              </div>
                            </td>
                            {this.state.plans_to_compare[2] && (
                              <td>
                                <div className="c-star-rating">
                                  <span>{third.out_patient_limit}</span>
                                </div>
                              </td>
                            )}
                          </tr>

                          <tr>
                            <th scope="row">
                              <span className="display--block">
                                Physiotherapy
                              </span>
                            </th>
                            <td>
                              <div className="c-star-rating">
                                <span>{first.physiotherapy}</span>
                              </div>
                            </td>
                            <td>
                              <div className="c-star-rating">
                                <span>{second.physiotherapy}</span>
                              </div>
                            </td>
                            {this.state.plans_to_compare[2] && (
                              <td>
                                <div className="c-star-rating">
                                  <span>{third.physiotherapy}</span>
                                </div>
                              </td>
                            )}
                          </tr>

                          <tr>
                            <th scope="row">
                              <span className="display--block">
                                Plain Contrast Xrays
                              </span>
                            </th>
                            <td>
                              <div className="c-star-rating">
                                <span>{first.plain_contrast_xrays}</span>
                              </div>
                            </td>
                            <td>
                              <div className="c-star-rating">
                                <span>{second.plain_contrast_xrays}</span>
                              </div>
                            </td>
                            {this.state.plans_to_compare[2] && (
                              <td>
                                <div className="c-star-rating">
                                  <span>{third.plain_contrast_xrays}</span>
                                </div>
                              </td>
                            )}
                          </tr>

                          <tr>
                            <th scope="row">
                              <span className="display--block">
                                Postnatal Care
                              </span>
                            </th>
                            <td>
                              <div className="c-star-rating">
                                <span>{first.postnatal_care}</span>
                              </div>
                            </td>
                            <td>
                              <div className="c-star-rating">
                                <span>{second.postnatal_care}</span>
                              </div>
                            </td>
                            {this.state.plans_to_compare[2] && (
                              <td>
                                <div className="c-star-rating">
                                  <span>{third.postnatal_care}</span>
                                </div>
                              </td>
                            )}
                          </tr>

                          <tr>
                            <th scope="row">
                              <span className="display--block">
                                Prescribed Drugs
                              </span>
                            </th>
                            <td>
                              <div className="c-star-rating">
                                <span>{first.prescribed_drugs}</span>
                              </div>
                            </td>
                            <td>
                              <div className="c-star-rating">
                                <span>{first.prescribed_drugs}</span>
                              </div>
                            </td>
                            {this.state.plans_to_compare[2] && (
                              <td>
                                <div className="c-star-rating">
                                  <span>{third.prescribed_drugs}</span>
                                </div>
                              </td>
                            )}
                          </tr>

                          <tr>
                            <th scope="row">
                              <span className="display--block">
                                Renal Dialysis
                              </span>
                            </th>
                            <td>
                              <div className="c-star-rating">
                                <span>{first.renal_dialysis}</span>
                              </div>
                            </td>
                            <td>
                              <div className="c-star-rating">
                                <span>{second.renal_dialysis}</span>
                              </div>
                            </td>
                            {this.state.plans_to_compare[2] && (
                              <td>
                                <div className="c-star-rating">
                                  <span>{third.renal_dialysis}</span>
                                </div>
                              </td>
                            )}
                          </tr>

                          <tr>
                            <th scope="row">
                              <span className="display--block">
                                Routine Immunization
                              </span>
                            </th>
                            <td>
                              <div className="c-star-rating">
                                <span>{first.routine_immunization}</span>
                              </div>
                            </td>
                            <td>
                              <div className="c-star-rating">
                                <span>{second.routine_immunization}</span>
                              </div>
                            </td>
                            {this.state.plans_to_compare[2] && (
                              <td>
                                <div className="c-star-rating">
                                  <span>{third.routine_immunization}</span>
                                </div>
                              </td>
                            )}
                          </tr>

                          <tr>
                            <th scope="row">
                              <span className="display--block">
                                Specialist Consultation
                              </span>
                            </th>
                            <td>
                              <div className="c-star-rating">
                                <span>{first.specialist_consultation}</span>
                              </div>
                            </td>
                            <td>
                              <div className="c-star-rating">
                                <span>{second.specialist_consultation}</span>
                              </div>
                            </td>
                            {this.state.plans_to_compare[2] && (
                              <td>
                                <div className="c-star-rating">
                                  <span>{third.specialist_consultation}</span>
                                </div>
                              </td>
                            )}
                          </tr>

                          <tr>
                            <th scope="row">
                              <span className="display--block">
                                Ultrasound Scans
                              </span>
                            </th>
                            <td>
                              <div className="c-star-rating">
                                <span>{first.ultrasound_scans}</span>
                              </div>
                            </td>
                            <td>
                              <div className="c-star-rating">
                                <span>{second.ultrasound_scans}</span>
                              </div>
                            </td>
                            {this.state.plans_to_compare[2] && (
                              <td>
                                <div className="c-star-rating">
                                  <span>{third.ultrasound_scans}</span>
                                </div>
                              </td>
                            )}
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </section>
                </div>
              </div>
            </div>{" "}
          </div>
        </div>

        <section className="section container hero compare_parent sp-top-main">
          <div className="">
            <section className="section content_section mt-top">
              <div>
                <section className="section grey_background similar_plans">
                  <h3 className="font-weight--bold">Similar Plans</h3>
                  <h4>
                    Users who compared these plans also compared the below{" "}
                  </h4>
                  <div className="box-mob-slider">
                    <div className="slider-new ">
                      {plans_to_compare.length > 0 &&
                        plans.map((similar_plan, i: number) => {
                          return plans_to_compare.includes(i.toString()) ==
                            false ? (
                            <div className="box-new">
                              <ul className="similar_plan_ul">
                                <li>
                                  <div className="box_block">
                                    <div className="plan-c-provider font-weight--bold">
                                      {similar_plan.hmo_id.name["text"]}
                                    </div>
                                    <h2 className="plan-c-name font-weight--normal margin-y--1">
                                      <a href="#">{similar_plan.name}</a>
                                    </h2>
                                  </div>
                                  <p className="is-hidden-mobile">
                                    ₦
                                    {this.numberwithCommas(
                                      stripNonNumeric(similar_plan.price)
                                    )}
                                    / year
                                  </p>
                                  <ul>
                                    <li>
                                      {similar_plan.plan_id &&
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
                                      <span>Sum Insured</span>
                                    </li>
                                    <li>
                                      {similar_plan.hmo_id.provider_id
                                        ? JSON.parse(
                                            similar_plan.hmo_id.provider_id
                                          ).length
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
                                    disabled={
                                      this.state.plans_to_compare.length < 3
                                        ? false
                                        : true
                                    }
                                    onClick={() => {
                                      this.handleCheckedPlanToCompareOnDesktop(
                                        i.toString()
                                      );
                                    }}
                                  >
                                    <i className="fas fa-plus"></i>+ Add to
                                    compare
                                  </button>
                                </li>
                              </ul>
                            </div>
                          ) : (
                            ""
                          );
                        })}
                    </div>
                  </div>
                </section>
              </div>
            </section>
          </div>
        </section>

        {/* <AppFooter /> */}
      </div>
    );
  }
}

const mapProps = (state: any) => {
  return {
    plans: state.fetchData.services,
  };
};

export default connect(mapProps)(ComparePlans);
