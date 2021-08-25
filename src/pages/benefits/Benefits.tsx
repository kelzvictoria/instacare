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
  resetTextResponse,
  jumpToFilterBox,
} from "../../actions/userInputActions";

import { 
 //filterByBenefits
 } from "../../actions/fetchDataActions";

export interface BenefitsProps {
  [x: string]: any;
  dispatch(args: any): any;
}

class Benefits extends Component<BenefitsProps> {
  state = {
    search_arg: "",
    selected_benefits: [],
    selected_benefits_data: [],
    // show_benefits_listing_div: false,
  };

  onSearch = async (searchText: string) => {
    let tempBenefits: any[] = [];
    let benefits = await this.props.benefits.map((benefit) => benefit.title);

    //console.log("benefits", benefits);

    benefits.forEach((item: string) => {
      // console.log("item", item);
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

  onSelectChange = async (value: any) => {
    this.getBenefitInfo(value);

    // this.props.dispatch({
    //   type: actions.UPDATE_TEXT_RESPONSE,
    //   data: { key: "benefit", value },
    // });

    await this.props.updateTextResponse({ key: "benefit", value });

    //  console.log(this.props.responses.state);
  };

  getBenefitInfo = async (name) => {
    let info = this.props.benefits.filter((benefit) => benefit.title === name); //home_utils.benefitsInfo

    await this.setState({
      search_arg: info[0],
    });

    if (name) {
      this.addBenefitToSelectedList(name);
    }
  };

  addBenefitToSelectedList = (benefit) => {
    let arr: string[] =
      this.props.responses.benefits.length > 0
        ? this.props.responses.benefits.map((b) => b.title)
        : [...this.state.selected_benefits];

    let data_arr: string[] =
      this.props.responses.benefits.length > 0
        ? [...this.props.responses.benefits]
        : [...this.state.selected_benefits_data];

    let isBenefitSelected: number = arr.indexOf(benefit);

    if (isBenefitSelected > -1) {
      arr.splice(isBenefitSelected, 1);
      data_arr.splice(isBenefitSelected, 1);
    } else {
      if (this.state.search_arg) {
        arr.push(benefit);
        data_arr.push(this.state.search_arg);
      }

      this.setState({
        selected_benefits: arr,
        selected_benefits_data: data_arr,
      });
    }
  };

  // toggleShowSelectedBenefits = () => {
  //   this.setState({
  //     show_benefits_listing_div: !this.state.show_benefits_listing_div,
  //   });
  // };

  componentDidUpdate(prevProps) {}

  setBenefits = async () => {
    //;
    let benefits = this.state.selected_benefits_data;
    await this.props.setBenefits(benefits);
    //.map(b => b['id']));
    this.props.history.push({ pathname: "/" });
    this.props.resetTextResponse({
      key: "benefit",
      value: "",
    });
    this.props.jumpToFilterBox();
    //await this.filterByBenefits();
  };

  //   updateLocation = (benefit: any) => {
  //     this.props.dispatch({
  //       type: actions.UPDATE_TEXT_RESPONSE,
  //       data: { key: "state", value: benefit },
  //     });
  //     console.log(this.props.responses.state);
  //   };

  render() {
    //  console.log("this.state", this.state);

    let benefits_arr: string[] = this.state.selected_benefits;
    let selected_benefits_data =
      this.props.responses.benefits.length > 0 &&
      this.state.selected_benefits.length === 0
        ? this.props.responses.benefits
        : this.state.selected_benefits_data;

    return (
      <div className="main-body-content">
        <div className="container c-page-wrapper qa-benefit-search-page">
          <div
            className={
              //!this.state.show_benefits_listing_div ?
              "additions"
              // : "display--none"
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
                        allowClear={true}
                        style={{ width: "100%" }}
                        dataSource={this.props.benefitsDataSource}
                        onSearch={this.onSearch}
                        onChange={this.onSelectChange}
                        placeholder="Example: Optical Care"
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
                {/* {this.state.search_arg && (
                  <h2 className="ic-color margin-bottom--2 font-size--base font-weight--normal">
                    Showing results for{" "}
                    <span className="font-weight--bold">
                      {this.props.responses.benefit}
                    </span>
                  </h2>
                )} */}
                {selected_benefits_data.length > 0 && (
                  <ul className="c-coverables-search__results c-list--bare selected-providers-list">
                    {selected_benefits_data.map((selected_benefit, i) => {
                      return (
                        <li className="display--inline-block">
                          <div className="c-filter-tag margin-top--0">
                            <button
                              className="c-filter-tag__button"
                              onClick={() =>
                                this.addBenefitToSelectedList(
                                  selected_benefit["title"]
                                )
                              }
                            >
                              <span className="c-filter-tag__label">
                                {selected_benefit["title"]}
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
                      );
                    })}{" "}
                  </ul>
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
    benefitsDataSource: state.fetchData.benefitsDataSource,
    benefits: state.fetchData.benefits,
  };
};

export default connect(mapProps, {
  updateTextResponse,
  filterBenefits,
  setBenefits,
  //filterByBenefits,
  resetTextResponse,
  jumpToFilterBox,
})(Benefits);
