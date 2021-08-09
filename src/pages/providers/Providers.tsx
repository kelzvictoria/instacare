import React, { Component } from "react";
import { Form, AutoComplete } from "antd";

import { connect } from "react-redux";
import * as actions from "../../actions/types";
import * as home_utils from "../../utils/homeUtils";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

import "../../components/home/new-design.css";
import "./providers.css";

import {
  updateTextResponse,
  filterProviders,
  setProviders,
  resetTextResponse,
} from "../../actions/userInputActions";

export interface ProvidersProps {
  [x: string]: any;
  dispatch(args: any): any;
}

class Providers extends Component<ProvidersProps> {
  state = {
    search_arg: "",
    selected_providers: [],
    selected_providers_data: [],
    // show_providers_listing_div: false,
  };

  onSearch = async (searchText: string) => {
    let tempProviders: any[] = [];
    console.log(
      "this.props.providersDataSource",
      this.props.providersDataSource
    );

    let providers = await this.props.providers.map(
      (provider) => provider.provider_name
    );
    console.log("providers", providers);
    console.log("searchText", searchText);

    providers.forEach((item: string) => {
      const _item = item.toLowerCase();
      if (_item.startsWith(searchText.toLowerCase())) {
        tempProviders.push(item);
      }
    });

    if (tempProviders.length > 0) {
      this.props.filterProviders(tempProviders);
    }
  };

  UNSAFE_componentWillMount() {}

  onSelectChange = async (value: any) => {
    this.getProviderInfo(value);

    await this.props.updateTextResponse({ key: "provider", value });
  };

  getProviderInfo = async (name) => {
    let info = this.props.providers.filter(
      (provider) => provider.provider_name === name
    );

    await this.setState({
      search_arg: info[0],
    });

    console.log("name", name);
    if (name) {
      this.addProviderToSelectedList(name);
    }
  };

  addProviderToSelectedList = async (prov_name) => {
    let arr: string[] =
      this.props.responses.providers.length > 0
        ? this.props.responses.providers.map((p) => p.provider_name)
        : [...this.state.selected_providers];

    let data_arr: string[] =
      this.props.responses.providers.length > 0
        ? [...this.props.responses.providers]
        : [...this.state.selected_providers_data];

    let isProviderSelected: number = arr.indexOf(prov_name);

    if (isProviderSelected > -1) {
      console.log(">-1");
      arr = arr.filter((a) => a !== prov_name);
      data_arr = data_arr.filter((d) => d["provider_name"] !== prov_name);
    } else {
      console.log("def");
      console.log(
        "prov_name",
        prov_name,
        "this.state.search_arg",
        this.state.search_arg
      );
      if (this.state.search_arg) {
        arr.push(prov_name);
        data_arr.push(this.state.search_arg);
      }
    }
    this.setState({
      selected_providers: arr,
      selected_providers_data: data_arr,
    });
  };

  // toggleShowSelectedProviders = () => {
  //   this.setState({
  //     show_providers_listing_div: !this.state.show_providers_listing_div,
  //   });
  // };

  componentDidUpdate(prevProps) {}

  setProviders = async () => {
    let providers = this.state.selected_providers_data;

    await this.props.setProviders(providers);
    this.props.history.push({ pathname: "/" });
    this.props.resetTextResponse({
      key: "provider",
      value: "",
    });
  };

  render() {
    console.log("this.state", this.state);

    let providers_arr: string[] = this.state.selected_providers;
    let selected_providers_data =
      this.props.responses.providers.length > 0 &&
      this.state.selected_providers.length == 0
        ? this.props.responses.providers
        : this.state.selected_providers_data;
    return (
      <div className="main-body-content">
        <div className="container c-page-wrapper qa-provider-search-page">
          <div
            className={
              //  !this.state.show_providers_listing_div ?
              "additions"
              //  : "display--none"
            }
          >
            <div className="c-coverables-search">
              <h1 className="font-size--h1 font-weight--normal margin-top--3 leading--base">
                Add your facilities
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
                          Begin typing to find & select your facility.
                        </span>{" "}
                      </label>

                      <AutoComplete
                        // size="large"
                        allowClear={true}
                        style={{ width: "100%" }}
                        dataSource={this.props.providersDataSource}
                        onSearch={this.onSearch}
                        onChange={this.onSelectChange}
                        placeholder="Example: ST Nicholas Hospital"
                        value={this.props.responses.provider}
                        //value={this.state.search_arg}
                        className="ic-auto-complete margin-bottom--0"
                      />
                    </div>
                  </div>
                  <button
                    className="c-button c-button--primary"
                    type="button"
                    onClick={() =>
                      this.getProviderInfo(this.props.responses.provider)
                    }
                  >
                    Find
                  </button>
                </div>
              </div>

              <div className="margin-top--5 margin-bottom--1 providers-results">
                {/* {this.state.search_arg && (
                  <h2 className="ic-color margin-bottom--2 font-size--base font-weight--normal">
                    Showing results for{" "}
                    <span className="font-weight--bold">
                      {this.props.responses.provider}
                    </span>
                  </h2>
                )} */}
                {selected_providers_data.length > 0 && (
                  <ul className="c-coverables-search__results c-list--bare selected-providers-list">
                    {selected_providers_data.map((selected_provider, i) => {
                      return (
                        <li className="display--inline-block">
                          <div className="c-filter-tag margin-top--0">
                            <button
                              className="c-filter-tag__button"
                              onClick={() =>
                                this.addProviderToSelectedList(
                                  selected_provider["provider_name"]
                                )
                              }
                            >
                              <span className="c-filter-tag__label">
                                {selected_provider["provider_name"]}
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
                    {/*                     
                    <li className="c-coverable-result box-shadow margin-top--1 margin-bottom--2">
                  
                      <div className="display--flex justify-content--between align-items--start">
                        <h5 className="h5 margin-top--0 overflow-wrap--break-word c-coverable-result--title">
                          {this.state.search_arg["provider_name"]}
                        </h5>

                        <div>
                          <button
                            className="c-button c-button--small"
                            type="button"
                            onClick={() =>
                              this.addProviderToSelectedList(
                                this.state.search_arg["provider_name"]
                              )
                            }
                          >
                            {" "}
                            {providers_arr.indexOf(
                              this.state.search_arg["provider_name"]
                            ) > -1
                              ? "Remove"
                              : "Add"}
                            
                          </button>
                        </div>
                      </div>
                      <div>
                        <div className="provider-search__result__taxonomy">
                          {this.state.search_arg["coverage_type"]}
                        </div>

                        <div className="provider-search__result__location">
                          <span className="text-transform--capitalize">
                            {this.state.search_arg["city"]},{" "}
                            {this.state.search_arg["state"]}
                          </span>
                        </div>
                      </div>
                    </li>
                 */}
                  </ul>
                )}
                {/* <div className="display--flex justify-content--between">
                  <div className="c-pagination__end-button"></div>

                  <div className="c-pagination__end-button"></div>
                </div> */}
              </div>
              {/* 
              <div className="c-sticky c-sticky--bottom c-coverables-search__selection-controls padding-y--2 providers-search-selection-controls">
                {this.state.selected_providers.length > 0 && (
                  <div className="">
                    <div className="margin-bottom--1">
                      {this.state.selected_providers.length} doctor or facilty
                      selected
                    </div>
                    <a
                      className="c-button qa-edit-selections"
                     
                      role="button"
                      onClick={this.toggleShowSelectedProviders}
                    >
                      See/Edit selections
                    </a>

                    <a
                      className="c-button c-button--primary margin-left--1 qa-continue"
                      
                      onClick={this.setProviders}
                      role="button"
                    >
                      Continue
                    </a>
                  </div>
                )}
              </div>
             */}
            </div>

            <button
              className="c-button c-button--secondary margin-top--2"
              type="button"
              onClick={this.setProviders}
            >
              Back to Plans
            </button>
          </div>
          {/* 
          <div
            className={
              this.state.show_providers_listing_div
                ? "listings margin-top--3"
                : "display--none"
            }
          >
            <a
              onClick={this.toggleShowSelectedProviders}
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
                        id="autocomplete_providers"
                      >
                        
                      </label>
                    </div>
                  </div>
                </div>
              </div>
               
              <div className="margin-bottom--1 providers-results">
                {this.state.selected_providers_data.length !== 0 && (
                  <ul className="c-coverables-search__results c-list--bare">
                    {this.state.selected_providers_data.map(
                      (selected_provider, i) => {
                        return (
                          <li className="c-coverable-result box-shadow margin-top--1 margin-bottom--2">
                           
                            <div className="display--flex justify-content--between align-items--start">
                              <h5 className="h5 margin-top--0 overflow-wrap--break-word c-coverable-result--title">
                                {selected_provider["provider_name"]}
                              </h5>

                              <div>
                                <button
                                  className="c-button c-button--small"
                                  type="button"
                                  onClick={() =>
                                    this.addProviderToSelectedList(
                                      selected_provider["provider_name"]
                                    )
                                  }
                                >
                                  {" "}
                                  {providers_arr.indexOf(
                                    selected_provider["provider_name"]
                                  ) > -1
                                    ? "Remove"
                                    : "Add"}
                                 
                                </button>
                              </div>
                            </div>
                            <div>
                              <div className="provider-search__result__taxonomy">
                                {selected_provider["coverage_type"]}
                              </div>

                             

                              <div className="provider-search__result__location">
                                <span className="text-transform--capitalize">
                                  {selected_provider["city"]},{" "}
                                  {selected_provider["state"]}
                                </span>
                              </div>
                            </div>
                          </li>
                        );
                      }
                    )}
                  </ul>
                )}

                {this.state.selected_providers_data.length == 0 && (
                  <p className="p-nil">
                    No medical providers have been selected yet.
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
        */}
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
    providersDataSource: state.fetchData.providersDataSource,
    providers: state.fetchData.providers,
  };
};

export default connect(mapProps, {
  updateTextResponse,
  filterProviders,
  setProviders,
  resetTextResponse,
})(Providers);
