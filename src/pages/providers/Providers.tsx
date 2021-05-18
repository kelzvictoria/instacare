import React, { Component } from "react";
import { Form, AutoComplete } from "antd";

import { connect } from "react-redux";
import * as actions from "../../actions/types";
import * as home_utils from "../../utils/homeUtils";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

import "../../components/home/new-design.css";
import "./providers.css";

export interface ProvidersProps {
  [x: string]: any;
  dispatch(args: any): any;
}

class Providers extends Component<ProvidersProps> {
  state = {
    search_arg: "",
    selected_providers: [],
    selected_providers_data: [],
    show_providers_listing_div: false,
  };

  onSearch = (searchText: string) => {
    let tempProviders: any[] = [];
    home_utils.providers.forEach((item: string) => {
      // console.log("item['name']", item["name"]);
      // const _item = item["name"].toLowerCase();
      const _item = item.toLowerCase();
      if (_item.startsWith(searchText.toLowerCase())) {
        tempProviders.push(item);
      }
    });
    if (tempProviders.length > 0) {
      this.props.dispatch({
        type: actions.FILTER_PROVIDERS,
        data: tempProviders,
      });
    }
  };

  onSelectChange = (value: any) => {
    this.getProviderInfo(value);

    this.props.dispatch({
      type: actions.UPDATE_TEXT_RESPONSE,
      data: { key: "provider", value },
    });
    console.log(this.props.responses.state);
  };

  getProviderInfo = (name) => {
    let info = home_utils.providersInfo.filter(
      (provider) => provider.name == name
    );

    this.setState({
      search_arg: info[0],
    });
  };

  addProviderToSelectedList = (prov_name) => {
    let arr: string[] = this.state.selected_providers;
    let data_arr: string[] = this.state.selected_providers_data;

    let isProviderSelected: number = arr.indexOf(prov_name);

    if (isProviderSelected > -1) {
      arr.splice(isProviderSelected, 1);
      data_arr.splice(isProviderSelected, 1);
    } else {
      arr.push(prov_name);
      data_arr.push(this.state.search_arg);
    }

    // this.props.dispatch({
    //   type: actions.UPDATE_SELECTED_PROVIDERS,
    //   data: arr,
    // });

    this.setState({
      selected_providers: arr,
      selected_providers_data: data_arr,
    });
  };

  toggleShowSelectedProviders = () => {
    this.setState({
      show_providers_listing_div: !this.state.show_providers_listing_div,
    });
  };

  //   updateLocation = (provider: any) => {
  //     this.props.dispatch({
  //       type: actions.UPDATE_TEXT_RESPONSE,
  //       data: { key: "state", value: provider },
  //     });
  //     console.log(this.props.responses.state);
  //   };

  render() {
    console.log("this.state", this.state);

    let providers_arr: string[] = this.state.selected_providers;
    return (
      <div className="main-body-content">
        <div className="container c-page-wrapper qa-provider-search-page">
          <div
            className={
              !this.state.show_providers_listing_div
                ? "additions"
                : "display--none"
            }
          >
            <div className="c-coverables-search">
              <h1 className="font-size--h1 font-weight--normal margin-top--3 leading--base">
                Add your doctors & facilities
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
                          Begin typing to find & select your doctor or facility.
                        </span>{" "}
                      </label>

                      <AutoComplete
                        // size="large"
                        style={{ width: "100%" }}
                        dataSource={this.props.dataSource}
                        onSearch={this.onSearch}
                        onChange={this.onSelectChange}
                        placeholder="Example: Westcare Hospital"
                        value={this.props.responses.provider}
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
                {this.state.search_arg && (
                  <h2 className="ic-color margin-bottom--2 font-size--base font-weight--normal">
                    Showing results for{" "}
                    <span className="font-weight--bold">
                      {this.props.responses.provider}
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
                              this.addProviderToSelectedList(
                                this.state.search_arg["name"]
                              )
                            }
                          >
                            {" "}
                            {providers_arr.indexOf(
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
                          {this.state.search_arg["specialty"]}
                        </div>

                        {/* <div className="provider-search__result__specialties">
                          <span>primary care - nurse practioner</span>
                        </div> */}

                        <div className="provider-search__result__location">
                          <span className="text-transform--capitalize">
                            {this.state.search_arg["city"]},{" "}
                            {this.state.search_arg["state"]}
                          </span>
                        </div>
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
                {this.state.selected_providers.length > 0 && (
                  <div className="">
                    <div className="margin-bottom--1">
                      {this.state.selected_providers.length} doctor or facilty
                      selected
                    </div>
                    <a
                      className="c-button qa-edit-selections"
                      //href="#/find-provider/search/edit"
                      role="button"
                      onClick={this.toggleShowSelectedProviders}
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
                        {/* <span>
                          Doctors & facilities
                        </span>{" "} */}
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
                            {/* c-coverable-result--selected */}
                            <div className="display--flex justify-content--between align-items--start">
                              <h5 className="h5 margin-top--0 overflow-wrap--break-word c-coverable-result--title">
                                {selected_provider["name"]}
                              </h5>

                              <div>
                                <button
                                  className="c-button c-button--small"
                                  type="button"
                                  onClick={() =>
                                    this.addProviderToSelectedList(
                                      selected_provider["name"]
                                    )
                                  }
                                >
                                  {" "}
                                  {providers_arr.indexOf(
                                    selected_provider["name"]
                                  ) > -1
                                    ? "Remove"
                                    : "Add"}
                                  {/* Remove */}
                                </button>
                              </div>
                            </div>
                            <div>
                              <div className="provider-search__result__taxonomy">
                                {selected_provider["specialty"]}
                              </div>

                              {/* <div className="provider-search__result__specialties">
                            <span>primary care - nurse practioner</span>
                          </div> */}

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

export default connect(mapProps)(Providers);
