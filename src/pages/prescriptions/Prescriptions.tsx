import React, { Component } from "react";
import { Form, AutoComplete } from "antd";

import { connect } from "react-redux";
import * as actions from "../../utils/actions";
import * as home_utils from "../../utils/homeUtils";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

import "../../components/home/new-design.css";
import "../providers/providers.css";
import "./prescriptions.css";

export interface PrescriptionsProps {
  [x: string]: any;
  dispatch(args: any): any;
}

class Prescriptions extends Component<PrescriptionsProps> {
  state = {
    search_arg: "",
    selected_prescriptions: [],
    selected_prescriptions_data: [],
    show_prescriptions_listing_div: false,
  };

  onSearch = (searchText: string) => {
    let tempPrescriptions: any[] = [];
    home_utils.prescriptions.forEach((item: string) => {
      // console.log("item['name']", item["name"]);
      // const _item = item["name"].toLowerCase();
      const _item = item.toLowerCase();
      if (_item.startsWith(searchText.toLowerCase())) {
        tempPrescriptions.push(item);
      }
    });
    if (tempPrescriptions.length > 0) {
      this.props.dispatch({
        type: actions.FILTER_PROVIDERS,
        data: tempPrescriptions,
      });
    }
  };

  onSelectChange = (value: any) => {
    this.getPrescriptionInfo(value);

    this.props.dispatch({
      type: actions.UPDATE_TEXT_RESPONSE,
      data: { key: "prescription", value },
    });
    console.log(this.props.responses.state);
  };

  getPrescriptionInfo = (name) => {
    let info = home_utils.prescriptionsInfo.filter(
      (prescription) => prescription.name == name
    );

    this.setState({
      search_arg: info[0],
    });
  };

  addPrescriptionToSelectedList = (prov_name) => {
    let arr: string[] = this.state.selected_prescriptions;
    let data_arr: string[] = this.state.selected_prescriptions_data;

    let isPrescriptionSelected: number = arr.indexOf(prov_name);

    if (isPrescriptionSelected > -1) {
      arr.splice(isPrescriptionSelected, 1);
      data_arr.splice(isPrescriptionSelected, 1);
    } else {
      arr.push(prov_name);
      data_arr.push(this.state.search_arg);
    }

    // this.props.dispatch({
    //   type: actions.UPDATE_SELECTED_PROVIDERS,
    //   data: arr,
    // });

    this.setState({
      selected_prescriptions: arr,
      selected_prescriptions_data: data_arr,
    });
  };

  toggleShowSelectedPrescriptions = () => {
    this.setState({
      show_prescriptions_listing_div: !this.state
        .show_prescriptions_listing_div,
    });
  };

  //   updateLocation = (prescription: any) => {
  //     this.props.dispatch({
  //       type: actions.UPDATE_TEXT_RESPONSE,
  //       data: { key: "state", value: prescription },
  //     });
  //     console.log(this.props.responses.state);
  //   };

  render() {
    console.log("this.state", this.state);

    let prescriptions_arr: string[] = this.state.selected_prescriptions;
    return (
      <div className="main-body-content">
        <div className="l-container c-page-wrapper qa-prescription-search-page">
          <div
            className={
              !this.state.show_prescriptions_listing_div
                ? "additions"
                : "display--none"
            }
          >
            <div className="c-coverables-search">
              <h1 className="font-size--h1 font-weight--normal margin-top--3 leading--base">
                Add your drugs
              </h1>
              <div className="padding-left--0">
                <div className="display--flex align-items--end">
                  <div className="clearfix c-autocomplete c-search-field__autocomplete margin-right--1">
                    <div className="clearfix">
                      <label
                        className="c-label margin-top--0"
                        id="autocomplete_providers"
                      >
                        <span>
                          Begin typing to find & select the drug you use
                          regularly.
                        </span>{" "}
                      </label>

                      <AutoComplete
                        // size="large"
                        style={{ width: "100%" }}
                        dataSource={this.props.dataSource}
                        onSearch={this.onSearch}
                        onChange={this.onSelectChange}
                        placeholder="Example: Coartem"
                        value={this.props.responses.prescription}
                        className="ic-auto-complete margin-bottom--0"
                      />
                    </div>
                  </div>
                  <button
                    className="c-button c-button--primary"
                    type="button"
                    onClick={() =>
                      this.getPrescriptionInfo(
                        this.props.responses.prescription
                      )
                    }
                  >
                    Find
                  </button>
                </div>
              </div>

              <div className="margin-top--5 margin-bottom--1 providers-results">
                {this.state.search_arg && (
                  <h2 className="ic-color margin-bottom--2 font-size--base font-weight--normal">
                    Showing results for{" "}
                    <span className="font-weight--bold">
                      {this.props.responses.prescription}
                    </span>
                  </h2>
                )}
                {this.state.search_arg && (
                  <ul className="c-coverables-search__results c-list--bare">
                    <li className="c-coverable-result box-shadow margin-top--1 margin-bottom--2">
                      {/* c-coverable-result--selected */}
                      <div className="display--flex justify-content--between align-items--start">
                        <h5 className="h5 margin-top--0 overflow-wrap--break-word c-coverable-result--title">
                          {this.state.search_arg["name"]}
                        </h5>

                        <div>
                          <button
                            className="c-button c-button--small"
                            type="button"
                            onClick={() =>
                              this.addPrescriptionToSelectedList(
                                this.state.search_arg["name"]
                              )
                            }
                          >
                            {" "}
                            {prescriptions_arr.indexOf(
                              this.state.search_arg["name"]
                            ) > -1
                              ? "Remove"
                              : "Add"}
                            {/* Remove */}
                          </button>
                        </div>
                      </div>
                      <div>
                        <div className="provider-search__result__taxonomy">
                          {this.state.search_arg["mg"]}
                        </div>

                        {/* <div className="prescription-search__result__location">
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

              <div className="c-sticky c-sticky--bottom c-coverables-search__selection-controls padding-y--2 providers-search-selection-controls">
                {this.state.selected_prescriptions.length > 0 && (
                  <div className="">
                    <div className="margin-bottom--1">
                      {this.state.selected_prescriptions.length} drug selected
                    </div>
                    <a
                      className="c-button qa-edit-selections"
                      //href="#/find-provider/search/edit"
                      role="button"
                      onClick={this.toggleShowSelectedPrescriptions}
                    >
                      See/Edit selections
                    </a>

                    <a
                      className="c-button c-button--primary margin-left--1 qa-continue"
                      href="#/plan/results"
                      role="button"
                    >
                      Continue
                    </a>
                  </div>
                )}
              </div>
            </div>
            <a href="/new-design/#plans">
              <button
                className="c-button c-button--secondary margin-top--2"
                type="button"
              >
                Back to Plans
              </button>
            </a>
          </div>

          <div
            className={
              this.state.show_prescriptions_listing_div
                ? "listings margin-top--3"
                : "display--none"
            }
          >
            <a
              onClick={this.toggleShowSelectedPrescriptions}
              className="text-transform--capitalize"
            >
              <FontAwesomeIcon className="margin-right--1" icon={faArrowLeft} />
              back
            </a>
            <div className="c-coverables-search">
              <h1 className="font-size--h1 font-weight--normal margin-top--3 leading--base">
                Drugs
              </h1>
              <div className="padding-left--0">
                <div className="display--flex align-items--end">
                  <div className="clearfix c-autocomplete c-search-field__autocomplete margin-right--1">
                    <div className="clearfix">
                      <label
                        className="c-label margin-top--0"
                        id="autocomplete_providers"
                      >
                        {/* <span>
                          Doctors & facilities
                        </span>{" "} */}
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              <div className="margin-bottom--1 providers-results">
                {this.state.selected_prescriptions_data.length !== 0 && (
                  <ul className="c-coverables-search__results c-list--bare">
                    {this.state.selected_prescriptions_data.map(
                      (selected_prescription, i) => {
                        return (
                          <li className="c-coverable-result box-shadow margin-top--1 margin-bottom--2">
                            {/* c-coverable-result--selected */}
                            <div className="display--flex justify-content--between align-items--start">
                              <h5 className="h5 margin-top--0 overflow-wrap--break-word c-coverable-result--title">
                                {selected_prescription["name"]}
                              </h5>

                              <div>
                                <button
                                  className="c-button c-button--small"
                                  type="button"
                                  onClick={() =>
                                    this.addPrescriptionToSelectedList(
                                      selected_prescription["name"]
                                    )
                                  }
                                >
                                  {" "}
                                  {prescriptions_arr.indexOf(
                                    selected_prescription["name"]
                                  ) > -1
                                    ? "Remove"
                                    : "Add"}
                                  {/* Remove */}
                                </button>
                              </div>
                            </div>
                            <div>
                              <div className="provider-search__result__taxonomy">
                                {selected_prescription["mg"]}
                              </div>

                              {/* <div className="provider-search__result__location">
                                <span className="text-transform--capitalize">
                                  {selected_prescription["city"]},{" "}
                                  {selected_prescription["state"]}
                                </span>
                              </div> */}
                            </div>
                          </li>
                        );
                      }
                    )}
                  </ul>
                )}

                {this.state.selected_prescriptions_data.length == 0 && (
                  <p className="p-nil">
                    No prescriptions have been selected yet.
                  </p>
                )}
                <div className="display--flex justify-content--between">
                  <div className="c-pagination__end-button"></div>

                  <div className="c-pagination__end-button"></div>
                </div>
              </div>

              <div className="c-sticky c-sticky--bottom c-coverables-search__selection-controls padding-y--2 providers-search-selection-controls">
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
    ...state.quiz,
    ...state.quiz.quiz,
  };
};

export default connect(mapProps)(Prescriptions);
