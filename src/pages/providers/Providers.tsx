import React, { Component } from "react";
import { Form, AutoComplete } from "antd";

import { connect } from "react-redux";
import * as actions from "../../utils/actions";
import * as home_utils from "../../utils/homeUtils";

import "../../components/home/new-design.css";
import "./providers.css";

export interface ProvidersProps {
  [x: string]: any;
  dispatch(args: any): any;
}

class Providers extends Component<ProvidersProps> {
  onSearch = (searchText: string) => {
    let tempProviders: any[] = [];
    home_utils.providers.forEach((item: string) => {
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
    this.props.dispatch({
      type: actions.UPDATE_TEXT_RESPONSE,
      data: { key: "provider", value },
    });
    console.log(this.props.responses.state);
  };

  //   updateLocation = (provider: any) => {
  //     this.props.dispatch({
  //       type: actions.UPDATE_TEXT_RESPONSE,
  //       data: { key: "state", value: provider },
  //     });
  //     console.log(this.props.responses.state);
  //   };

  render() {
    return (
      <div className="main-body-content">
        <div className="l-container c-page-wrapper qa-provider-search-page">
          <div className="">
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
                        placeholder="Hospital (name)"
                        value={this.props.responses.provider}
                        className="ic-auto-complete margin-bottom--0"
                      />
                    </div>
                  </div>
                  <button className="c-button c-button--primary" type="button">
                    Find
                  </button>
                </div>
              </div>

              <div className="margin-top--5 margin-bottom--1">
                <h2 className="ic-color margin-bottom--2 font-size--base font-weight--normal">
                  Showing results for{" "}
                  <span className="font-weight--bold">
                    Living Spring Hospital & Maternity Home
                  </span>
                </h2>

                <ul className="c-coverables-search__results c-list--bare">
                  <li className="c-coverable-result box-shadow margin-top--1 margin-bottom--2">
                    {/* c-coverable-result--selected */}
                    <div className="display--flex justify-content--between align-items--start">
                      <h5 className="h5 margin-top--0 overflow-wrap--break-word c-coverable-result--title">
                        Dr Akinde
                      </h5>

                      <div>
                        <button
                          className="c-button c-button--small"
                          type="button"
                        >
                          Add
                          {/* Remove */}
                        </button>
                      </div>
                    </div>
                    <div>
                      <div className="provider-search__result__taxonomy">
                        Nurse Practioner · Family
                      </div>

                      <div className="provider-search__result__specialties">
                        <span>primary care - nurse practioner</span>
                      </div>

                      <div className="provider-search__result__location">
                        <span className="text-transform--capitalize">
                          Alafia Avenue, Ejigbo
                        </span>
                      </div>
                    </div>
                  </li>
                </ul>

                <div className="display--flex justify-content--between">
                  <div className="c-pagination__end-button"></div>

                  <div className="c-pagination__end-button"></div>
                </div>
              </div>

              <div className="c-sticky c-sticky--bottom c-coverables-search__selection-controls padding-y--2">
                <div className="">
                  <div className="margin-bottom--1">
                    1 doctor or facilty selected
                  </div>
                  <a
                    className="c-button qa-edit-selections"
                    href="#/find-provider/search/edit"
                    role="button"
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
