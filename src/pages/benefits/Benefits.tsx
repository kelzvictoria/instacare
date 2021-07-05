import React, { Component } from "react";
import { Form, AutoComplete } from "antd";

import { connect } from "react-redux";
import * as actions from "../../actions/types";
import * as home_utils from "../../utils/homeUtils";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

import "../../components/home/new-design.css";
import "./benefits.css";

import {
  updateTextResponse,
  filterBenefits,
  setBenefits,
} from "../../actions/userInputActions";

export interface BenefitsProps {
  [x: string]: any;
  dispatch(args: any): any;
}

class Benefits extends Component<BenefitsProps> {
  state = {
    search_arg: "",
    selected_benefits: [],
    selected_benefits_data: [],
    show_benefits_listing_div: false,
  };

  onSearch = async (searchText: string) => {
    let tempBenefits: any[] = [];
    let benefits = await this.props.benefits.map(
      (benefit) => benefit.title
    );

    console.log("benefits", benefits);
    
    benefits.forEach((item: string) => {
      console.log("item", item);
      // const _item = item["name"].toLowerCase();
      const _item = item.toLowerCase();
      if (_item.startsWith(searchText.toLowerCase())) {
        tempBenefits.push(item);
      }
    });

    if (tempBenefits.length > 0) {
      // this.props.dispatch({
      //   type: actions.FILTER_PROVIDERS,
      //   data: tempBenefits,
      // });
      this.props.filterBenefits(tempBenefits);
    }
  };

  onSelectChange = (value: any) => {
    this.getBenefitInfo(value);

    // this.props.dispatch({
    //   type: actions.UPDATE_TEXT_RESPONSE,
    //   data: { key: "benefit", value },
    // });

    this.props.updateTextResponse({ key: "benefit", value });

    console.log(this.props.responses.state);
  };

  getBenefitInfo = (name) => {
    let info = this.props.benefits.filter(
      (benefit) => benefit.title == name
    ); //home_utils.benefitsInfo

    this.setState({
      search_arg: info[0],
    });
  };

  addBenefitToSelectedList = (prov_name) => {
    let arr: string[] = this.state.selected_benefits;
    let data_arr: string[] = this.state.selected_benefits_data;

    let isBenefitSelected: number = arr.indexOf(prov_name);

    if (isBenefitSelected > -1) {
      arr.splice(isBenefitSelected, 1);
      data_arr.splice(isBenefitSelected, 1);
    } else {
      arr.push(prov_name);
      data_arr.push(this.state.search_arg);
    }

    // this.props.dispatch({
    //   type: actions.UPDATE_SELECTED_PROVIDERS,
    //   data: arr,
    // });

    this.setState({
      selected_benefits: arr,
      selected_benefits_data: data_arr,
    });
  };

  toggleShowSelectedBenefits = () => {
    this.setState({
      show_benefits_listing_div: !this.state.show_benefits_listing_div,
    });
  };

  componentDidUpdate(prevProps) {}

  setBenefits = async () => {
    //;
    await this.props.setBenefits(this.state.selected_benefits_data);
    this.props.history.push({ pathname: "/" });
  };

  //   updateLocation = (benefit: any) => {
  //     this.props.dispatch({
  //       type: actions.UPDATE_TEXT_RESPONSE,
  //       data: { key: "state", value: benefit },
  //     });
  //     console.log(this.props.responses.state);
  //   };

  render() {
    console.log("this.state", this.state);

    let benefits_arr: string[] = this.state.selected_benefits;
    return (
      <div className="main-body-content">
        <div className="container c-page-wrapper qa-benefit-search-page">
          <div
            className={
              !this.state.show_benefits_listing_div
                ? "additions"
                : "display--none"
            }
          >
            <div className="c-coverables-search">
              <h1 className="font-size--h1 font-weight--normal margin-top--3 leading--base">
                Add your desired benefits
              </h1>
              <div className="padding-left--0">
                <div className="display--flex align-items--end">
                  <div className="clearfix c-autocomplete c-search-field__autocomplete margin-right--1">
                    <div className="clearfix">
                      <label
                        className="c-label margin-top--0"
                        id="autocomplete_benefits"
                      >
                        <span>
                          Begin typing to find & select desired benefits.
                        </span>{" "}
                      </label>

                      <AutoComplete
                        // size="large"
                        style={{ width: "100%" }}
                        dataSource={this.props.dataSource}
                        onSearch={this.onSearch}
                        onChange={this.onSelectChange}
                        placeholder="Example: Plastic Surgery"
                        value={this.props.responses.benefit}
                        //value={this.state.search_arg}
                        className="ic-auto-complete margin-bottom--0"
                      />
                    </div>
                  </div>
                  <button
                    className="c-button c-button--primary"
                    type="button"
                    onClick={() =>
                      this.getBenefitInfo(this.props.responses.benefit)
                    }
                  >
                    Find
                  </button>
                </div>
              </div>

              <div className="margin-top--5 margin-bottom--1 benefits-results">
                {this.state.search_arg && (
                  <h2 className="ic-color margin-bottom--2 font-size--base font-weight--normal">
                    Showing results for{" "}
                    <span className="font-weight--bold">
                      {this.props.responses.benefit}
                    </span>
                  </h2>
                )}
                {this.state.search_arg && (
                  <ul className="c-coverables-search__results c-list--bare">
                    <li className="c-coverable-result box-shadow margin-top--1 margin-bottom--2">
                      {/* c-coverable-result--selected */}
                      <div className="display--flex justify-content--between align-items--start">
                        <h5 className="h5 margin-top--0 overflow-wrap--break-word c-coverable-result--title">
                          {this.state.search_arg["title"]}
                        </h5>

                        <div>
                          <button
                            className="c-button c-button--small"
                            type="button"
                            onClick={() =>
                              this.addBenefitToSelectedList(
                                this.state.search_arg["title"]
                              )
                            }
                          >
                            {" "}
                            {benefits_arr.indexOf(
                              this.state.search_arg["title"]
                            ) > -1
                              ? "Remove"
                              : "Add"}
                            {/* Remove */}
                          </button>
                        </div>
                      </div>
                      <div>
                        {/* <div className="benefit-search__result__taxonomy">
                          {this.state.search_arg["title"]}
                        </div> */}

                        {/* <div className="benefit-search__result__specialties">
                          <span>primary care - nurse practioner</span>
                        </div> */}

                        {/* <div className="benefit-search__result__location">
                          <span className="text-transform--capitalize">
                            {this.state.search_arg["city"]},{" "}
                            {this.state.search_arg["state"]}
                          </span>
                        </div> */}
                      </div>
                    </li>
                  </ul>
                )}
                <div className="display--flex justify-content--between">
                  <div className="c-pagination__end-button"></div>

                  <div className="c-pagination__end-button"></div>
                </div>
              </div>

              <div className="c-sticky c-sticky--bottom c-coverables-search__selection-controls padding-y--2 benefits-search-selection-controls">
                {this.state.selected_benefits.length > 0 && (
                  <div className="">
                    <div className="margin-bottom--1">
                      {this.state.selected_benefits.length}benefit
                      selected
                    </div>
                    <a
                      className="c-button qa-edit-selections"
                      //href="#/find-benefit/search/edit"
                      role="button"
                      onClick={this.toggleShowSelectedBenefits}
                    >
                      See/Edit selections
                    </a>

                    <a
                      className="c-button c-button--primary margin-left--1 qa-continue"
                      href="#"
                      onClick={this.setBenefits}
                      role="button"
                    >
                      Continue
                    </a>
                  </div>
                )}
              </div>
            </div>
            {/* <a href="/#plans"> */}
            <button
              className="c-button c-button--secondary margin-top--2"
              type="button"
              onClick={this.setBenefits}
            >
              Back to Plans
            </button>
            {/* </a> */}
          </div>

          <div
            className={
              this.state.show_benefits_listing_div
                ? "listings margin-top--3"
                : "display--none"
            }
          >
            <a
              onClick={this.toggleShowSelectedBenefits}
              className="text-transform--capitalize"
            >
              <FontAwesomeIcon className="margin-right--1" icon={faArrowLeft} />
              back
            </a>
            <div className="c-coverables-search">
              <h1 className="font-size--h1 font-weight--normal margin-top--3 leading--base">
                Doctors & facilities
              </h1>
              <div className="padding-left--0">
                <div className="display--flex align-items--end">
                  <div className="clearfix c-autocomplete c-search-field__autocomplete margin-right--1">
                    <div className="clearfix">
                      <label
                        className="c-label margin-top--0"
                        id="autocomplete_benefits"
                      >
                        {/* <span>
                          Doctors & facilities
                        </span>{" "} */}
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              <div className="margin-bottom--1 benefits-results">
                {this.state.selected_benefits_data.length !== 0 && (
                  <ul className="c-coverables-search__results c-list--bare">
                    {this.state.selected_benefits_data.map(
                      (selected_benefit, i) => {
                        return (
                          <li className="c-coverable-result box-shadow margin-top--1 margin-bottom--2">
                            {/* c-coverable-result--selected */}
                            <div className="display--flex justify-content--between align-items--start">
                              <h5 className="h5 margin-top--0 overflow-wrap--break-word c-coverable-result--title">
                                {selected_benefit["benefit_name"]}
                              </h5>

                              <div>
                                <button
                                  className="c-button c-button--small"
                                  type="button"
                                  onClick={() =>
                                    this.addBenefitToSelectedList(
                                      selected_benefit["benefit_name"]
                                    )
                                  }
                                >
                                  {" "}
                                  {benefits_arr.indexOf(
                                    selected_benefit["benefit_name"]
                                  ) > -1
                                    ? "Remove"
                                    : "Add"}
                                  {/* Remove */}
                                </button>
                              </div>
                            </div>
                            <div>
                              <div className="benefit-search__result__taxonomy">
                                {selected_benefit["coverage_type"]}
                              </div>

                              {/* <div className="benefit-search__result__specialties">
                            <span>primary care - nurse practioner</span>
                          </div> */}

                              <div className="benefit-search__result__location">
                                <span className="text-transform--capitalize">
                                  {selected_benefit["city"]},{" "}
                                  {selected_benefit["state"]}
                                </span>
                              </div>
                            </div>
                          </li>
                        );
                      }
                    )}
                  </ul>
                )}

                {this.state.selected_benefits_data.length == 0 && (
                  <p className="p-nil">
                    No medical benefits have been selected yet.
                  </p>
                )}
                <div className="display--flex justify-content--between">
                  <div className="c-pagination__end-button"></div>

                  <div className="c-pagination__end-button"></div>
                </div>
              </div>

              <div className="c-sticky c-sticky--bottom c-coverables-search__selection-controls padding-y--2 benefits-search-selection-controls">
                <a
                  className="c-button c-button--primary qa-continue"
                  href="#/plan/results"
                  role="button"
                >
                  Continue to plans
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapProps = (state: any) => {
  return {
    // ...state.quiz,
    // ...state.quiz.quiz,
    responses: state.quiz.responses,
    dataSource: state.quiz.dataSource,
    benefits: state.fetchData.benefits,
  };
};

export default connect(mapProps, {
  updateTextResponse,
  filterBenefits,
  setBenefits,
})(Benefits);
