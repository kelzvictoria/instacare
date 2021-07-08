import React, { Component } from "react";
import { Form, AutoComplete } from "antd";

import { connect } from "react-redux";
import * as actions from "../../actions/types";
import * as home_utils from "../../utils/homeUtils";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

import "../../components/home/new-design.css";
import "./doctors.css";

import {
  updateTextResponse,
  filterDoctors,
  setDoctors,
} from "../../actions/userInputActions";

export interface DoctorsProps {
  [x: string]: any;
  dispatch(args: any): any;
}

class Doctors extends Component<DoctorsProps> {
  state = {
    search_arg: "",
    selected_doctors: [],
    selected_doctors_data: [],
    show_doctors_listing_div: false,
  };

  onSearch = async (searchText: string) => {
    // console.log("searchText", searchText);

    let tempDoctors: any[] = [];
    let doctors = await this.props.doctors.map(
      (doctor) => `${doctor.first_name + " " + doctor.last_name}`
    );
    // console.log("doctors", doctors);

    doctors.forEach((item: string) => {
      // console.log("item", item);

      const _item = item.toLowerCase();
      console.log("_item", _item);

      const itemArr = item.split(" ").map((text) => text.toLowerCase());
      //console.log("itemArr", itemArr);

      for (let i = 0; i < itemArr.length; i++) {
        console.log("itemArr[i]", itemArr[i]);

        if (itemArr[i].startsWith(searchText.toLowerCase())) {
          tempDoctors.includes(item) === false && tempDoctors.push(item);
        }
      }
    });

    if (tempDoctors.length > 0) {
      this.props.filterDoctors(tempDoctors);
    }
  };

  onSelectChange = (value: any) => {
    this.getDoctorInfo(value);

    this.props.updateTextResponse({ key: "doctor", value });

    console.log(this.props.responses.state);
  };

  getDoctorInfo = (name) => {
    let info = this.props.doctors.filter(
      (doctor) => `${doctor.first_name + " " + doctor.last_name}` == name
    ); //home_utils.doctorsInfo

    this.setState({
      search_arg: info[0],
    });
  };

  addDoctorToSelectedList = (prov_name) => {
    let arr: string[] = this.state.selected_doctors;
    let data_arr: string[] = this.state.selected_doctors_data;

    let isDoctorSelected: number = arr.indexOf(prov_name);

    if (isDoctorSelected > -1) {
      arr.splice(isDoctorSelected, 1);
      data_arr.splice(isDoctorSelected, 1);
    } else {
      arr.push(prov_name);
      data_arr.push(this.state.search_arg);
    }

    // this.props.dispatch({
    //   type: actions.UPDATE_SELECTED_PROVIDERS,
    //   data: arr,
    // });

    this.setState({
      selected_doctors: arr,
      selected_doctors_data: data_arr,
    });

    this.setDoctors();
  };

  toggleShowSelectedDoctors = () => {
    this.setState({
      show_doctors_listing_div: !this.state.show_doctors_listing_div,
    });
  };

  componentDidUpdate(prevProps) {}

  goBack = () => {
    this.props.history.push({ pathname: "/" });
  };

  setDoctors = async () => {
    //;
    await this.props.setDoctors(this.state.selected_doctors_data);
  };

  //   updateLocation = (doctor: any) => {
  //     this.props.dispatch({
  //       type: actions.UPDATE_TEXT_RESPONSE,
  //       data: { key: "state", value: doctor },
  //     });
  //     console.log(this.props.responses.state);
  //   };

  render() {
    // console.log("this.state", this.state);

    let doctors_arr: string[] = this.state.selected_doctors;
    return (
      <div className="main-body-content">
        <div className="container c-page-wrapper qa-doctor-search-page">
          <div
            className={
              !this.state.show_doctors_listing_div
                ? "additions"
                : "display--none"
            }
          >
            <div className="c-coverables-search">
              <h1 className="font-size--h1 font-weight--normal margin-top--3 leading--base">
                Add your doctors
              </h1>
              <div className="padding-left--0">
                <div className="display--flex align-items--end">
                  <div className="clearfix c-autocomplete c-search-field__autocomplete margin-right--1">
                    <div className="clearfix">
                      <label
                        className="c-label margin-top--0"
                        id="autocomplete_doctors"
                      >
                        <span>Begin typing to find & select your doctor.</span>{" "}
                      </label>

                      <AutoComplete
                        // size="large"
                        style={{ width: "100%" }}
                        dataSource={this.props.dataSource}
                        onSearch={this.onSearch}
                        onChange={this.onSelectChange}
                        placeholder="Example: Dr Ohams Henry"
                        value={this.props.responses.doctor}
                        //value={this.state.search_arg}
                        className="ic-auto-complete margin-bottom--0"
                      />
                    </div>
                  </div>
                  <button
                    className="c-button c-button--primary"
                    type="button"
                    onClick={() =>
                      this.getDoctorInfo(this.props.responses.doctor)
                    }
                  >
                    Find
                  </button>
                </div>
              </div>

              <div className="margin-top--5 margin-bottom--1 doctors-results">
                {this.state.search_arg && (
                  <h2 className="ic-color margin-bottom--2 font-size--base font-weight--normal">
                    Showing results for{" "}
                    <span className="font-weight--bold">
                      {this.props.responses.doctor}
                    </span>
                  </h2>
                )}
                {this.state.search_arg && (
                  <ul className="c-coverables-search__results c-list--bare">
                    <li className="c-coverable-result box-shadow margin-top--1 margin-bottom--2">
                      {/* c-coverable-result--selected */}
                      <div className="display--flex justify-content--between align-items--start">
                        <h5 className="h5 margin-top--0 overflow-wrap--break-word c-coverable-result--title">
                          {/* {this.state.search_arg["full_name"]} */}
                          {`${
                            this.state.search_arg["first_name"] +
                            " " +
                            this.state.search_arg["last_name"]
                          }`}
                        </h5>

                        <div>
                          <button
                            className="c-button c-button--small"
                            type="button"
                            onClick={() => {
                              this.addDoctorToSelectedList(
                                //this.state.search_arg["full_name"]

                                this.state.search_arg["first_name"] +
                                  " " +
                                  this.state.search_arg["last_name"]
                              );
                            }}
                          >
                            {" "}
                            {doctors_arr.indexOf(
                              //this.state.search_arg["full_name"]
                              this.state.search_arg["first_name"] +
                                " " +
                                this.state.search_arg["last_name"]
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

                        {/* <div className="doctor-search__result__specialties">
                          <span>primary care - nurse practioner</span>
                        </div> */}

                        <div className="doctor-search__result__location">
                          <span className="text-transform--capitalize">
                            {
                              this.state.search_arg["provider_id"][
                                "provider_name"
                              ]
                            }
                            , {this.state.search_arg["provider_id"]["city"]}
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

              <div className="c-sticky c-sticky--bottom c-coverables-search__selection-controls padding-y--2 doctors-search-selection-controls">
                {this.state.selected_doctors.length > 0 && (
                  <div className="">
                    <div className="margin-bottom--1">
                      {this.state.selected_doctors.length} doctor or facilty
                      selected
                    </div>
                    <a
                      className="c-button qa-edit-selections"
                      //href="#/find-doctor/search/edit"
                      role="button"
                      onClick={this.toggleShowSelectedDoctors}
                    >
                      See/Edit selections
                    </a>

                    <a
                      className="c-button c-button--primary margin-left--1 qa-continue"
                      href="#"
                      //onClick={this.setDoctors}
                      onClick={this.goBack}
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
              //onClick={this.setDoctors}
              onClick={this.goBack}
            >
              Back to Plans
            </button>
            {/* </a> */}
          </div>

          <div
            className={
              this.state.show_doctors_listing_div
                ? "listings margin-top--3"
                : "display--none"
            }
          >
            <a
              onClick={this.toggleShowSelectedDoctors}
              className="text-transform--capitalize"
            >
              <FontAwesomeIcon className="margin-right--1" icon={faArrowLeft} />
              back
            </a>
            <div className="c-coverables-search">
              <h1 className="font-size--h1 font-weight--normal margin-top--3 leading--base">
                Doctors
              </h1>
              <div className="padding-left--0">
                <div className="display--flex align-items--end">
                  <div className="clearfix c-autocomplete c-search-field__autocomplete margin-right--1">
                    <div className="clearfix">
                      <label
                        className="c-label margin-top--0"
                        id="autocomplete_doctors"
                      >
                        {/* <span>
                          Doctors & facilities
                        </span>{" "} */}
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              <div className="margin-bottom--1 doctors-results">
                {this.state.selected_doctors_data.length !== 0 && (
                  <ul className="c-coverables-search__results c-list--bare">
                    {this.state.selected_doctors_data.map(
                      (selected_doctor, i) => {
                        return (
                          <li className="c-coverable-result box-shadow margin-top--1 margin-bottom--2">
                            {/* c-coverable-result--selected */}
                            <div className="display--flex justify-content--between align-items--start">
                              <h5 className="h5 margin-top--0 overflow-wrap--break-word c-coverable-result--title">
                                {selected_doctor["first_name"] +
                                  " " +
                                  selected_doctor["last_name"]}
                              </h5>

                              <div>
                                <button
                                  className="c-button c-button--small"
                                  type="button"
                                  onClick={() =>
                                    this.addDoctorToSelectedList(
                                      selected_doctor["first_name"] +
                                        " " +
                                        selected_doctor["last_name"]
                                    )
                                  }
                                >
                                  {" "}
                                  {doctors_arr.indexOf(
                                    selected_doctor["first_name"] +
                                      " " +
                                      selected_doctor["last_name"]
                                  ) > -1
                                    ? "Remove"
                                    : "Add"}
                                  {/* Remove */}
                                </button>
                              </div>
                            </div>
                            <div>
                              <div className="doctor-search__result__taxonomy">
                                {selected_doctor["specialty"]}
                              </div>

                              {/* <div className="doctor-search__result__specialties">
                                <span>{selected_doctor["sub_specialty"]}</span>
                              </div> */}

                              <div className="doctor-search__result__specialties">
                                <span>
                                  {
                                    selected_doctor["provider_id"][
                                      "provider_name"
                                    ]
                                  }
                                  , {selected_doctor["provider_id"]["city"]}
                                </span>
                              </div>

                              {/* <div className="doctor-search__result__location">
                                <span className="text-transform--capitalize">
                                  {selected_doctor["city"]},{" "}
                                  {selected_doctor["state"]}
                                </span>
                              </div> */}
                            </div>
                          </li>
                        );
                      }
                    )}
                  </ul>
                )}

                {this.state.selected_doctors_data.length == 0 && (
                  <p className="p-nil">
                    No medical doctors have been selected yet.
                  </p>
                )}
                <div className="display--flex justify-content--between">
                  <div className="c-pagination__end-button"></div>

                  <div className="c-pagination__end-button"></div>
                </div>
              </div>

              <div className="c-sticky c-sticky--bottom c-coverables-search__selection-controls padding-y--2 doctors-search-selection-controls">
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
    doctors: state.fetchData.doctors,
  };
};

export default connect(mapProps, {
  updateTextResponse,
  filterDoctors,
  setDoctors,
})(Doctors);
