import React, { Component } from "react";
import { withRouter } from "react-router-dom";

import { Row, Col, Typography, Icon } from "antd";

import styles from "./AppFooter.module.scss";
//import { connect } from "http2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faTwitter,
  faInstagram,
  faLinkedin,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import { resetInfiniteScrollData } from "../../actions/fetchDataActions";
import { resetType, updateType } from "../../actions/userInputActions";

import {
  getHMOs,
  filterByBudget_and_or_Type,
} from "../../actions/fetchDataActions";

import { connect } from "react-redux";
import * as actions from "../../actions/types";
import { faRoad } from "@fortawesome/free-solid-svg-icons";

const { Title } = Typography;

const companyLinks = [
  {
    label: "Home",
    url: "/",
  },

  // {
  //   label: "HMOs",
  //   url: "/hmos",
  // },
  {
    label: "About",
    url: "/about",
  },

  {
    label: "Services",
    url: "/services",
  },

  // {
  //   label: "Sales",
  //   url: "#",
  // },

  // {
  //   label: "Reliance HMO",
  //   url: "/reliance",
  //   id: "reliance",
  // },

  {
    label: "Contact Us",
    url: "/contact",
  },
  {
    label: "Privacy Policy",
    url: "/privacy-policy",
  },
];

const mediaLinks = [
  {
    label: "YCombinator",
    url: "https://ycombinator.com",
  },
  {
    label: "The Guardian",
    url: "https://theguardian.co.uk",
  },
  {
    label: "IIFL",
    url: "https://iiflinsurance.com",
  },
];

const contactLinks: { label: string; url: string; icon?: string }[] = [
  {
    label: "Facebook",
    url: "https://facebook.com",
  },
  {
    label: "Twitter",
    url: "https://twitter.com",
  },
  {
    label: "Instagram",
    url: "https://instagram.com",
  },
];

interface FooterProps {
  [x: string]: any;
  dispatch(args: any): any;
}

const pageSize = 5;

class AppFooter extends Component<FooterProps, {}> {
  constructor(props) {
    super(props);

    this.handleHMOClick = this.handleHMOClick.bind(this);
  }
  state = {
    open: false,
    current: 1,
    minIndex: 0,
    maxIndex: 0,
  };

  handleHMOClick = (hmo) => {
    console.log("this.props", this.props);
    // this.props.history.push({ pathname: `/${hmo}` });
  };
  filterPlansByHMO = (hmo) => {};

  changeType(val) {
    if (
      [
        "single",
        "couple",
        "parents",
        "corporate",
        "fam-of-4",
        "smes",
        "intl_coverage",
        "all",
      ].includes(val)
    ) {
      this.handleType(val);
    }
  }

  async handleType(val) {
    this.props.responses.type.length > 0 && this.props.resetType();
    let data = {
      key: "type",
      value: val.target ? val.target.id : val,
    };
    await this.props.updateType(data);
    // await this.props.getServices();
    // this.props.filterByPlanType(data.value);

    this.filterByBudget_and_or_Type();
  }

  async filterByBudget_and_or_Type() {
    let range =
      this.props.responses.price_range.length > 0
        ? this.props.responses.price_range
        : [];

    let budget =
      this.props.responses.budget.length > 0 ? this.props.responses.budget : [];

    let type =
      this.props.responses.type.length > 0 ? this.props.responses.type[0] : [];

    let params = {
      budget,
      type,
      range,
    };

    await this.props.filterByBudget_and_or_Type(params);
    //  await this.props.resetInfiniteScrollData();
    // this.infiniteScrollDataReInitOnFilterApplied();
  }

  infiniteScrollDataReInitOnFilterApplied = async () => {
    this.setState({
      current: 1,
      minIndex: 0,
      maxIndex: pageSize,
      // infiniteScrollData:
      //   this.props.match.path === "/hmos/*"
      //     ? this.props.plansByHMO.slice(0, pageSize)
      //     : this.props.planServices.slice(0, pageSize),
    });

    let page = this.state.current;
    let plansByHMO = this.props.plansByHMO;
    let allPlans = this.props.planServices;

    let apiData = this.props.match.path === "/hmos/*" ? plansByHMO : allPlans;

    console.log("apiData", apiData);

    let start_index = (page - 1) * pageSize;
    let end_index = pageSize * page;

    console.log("start_index", start_index);
    console.log("end_index", end_index);

    this.setState({
      current: page,
      minIndex: start_index,
      maxIndex: end_index,
    });

    await this.props.updateInfiniteScrollData(
      apiData,
      true,
      start_index,
      end_index
    );
  };

  goToHome = () => {
    this.props.history.push({
      pathname: "/",
    });
  };

  componentDidMount() {
    let sponsorsContainer = document.getElementById("box-mob-slider")!;
    let sponsorsScrollWidth: number = sponsorsContainer.scrollWidth;
    window.addEventListener("load", () => {
      window.self.setInterval(() => {
        console.log("in interval");
        console.log(
          'sponsorsContainer["scrollLeft"]',
          sponsorsContainer["scrollLeft"]
        );
        console.log("sponsorsScrollWidth", sponsorsScrollWidth);

        if (sponsorsContainer["scrollLeft"] !== sponsorsScrollWidth) {
          console.log("not");

          sponsorsContainer.scrollTo(sponsorsContainer.scrollLeft + 1, 0);
        } else {
          sponsorsContainer.scrollTo(sponsorsContainer.scrollLeft - 1, 0);
        }
      }, 15);
    });
  }

  render() {
    console.log("this.props.hmos", this.props.hmos);
    return (
      <div className="app_footer" style={{ position: "relative" }}>
        <section className="section grey_background similar_plans">
          <div className="container box-mob-slider">
            <div className="slider-new " id="box-mob-slider">
              {this.props.hmos.map((hmo, i) => (
                <div className="box-new sponsor-box-new">
                  <ul className="similar_plan_ul">
                    <li>
                      <div className="box_block sponsor-img">
                        {/* <h2 className=""> */}
                        <a href={`/hmos/id/${hmo.hmo_id}`}>
                          {/* {hmo.name} */}
                          <img src={hmo.logo} />
                        </a>
                        {/* </h2> */}
                      </div>
                    </li>
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>
        <footer className={styles.appFooter}>
          <div className={styles.footer}>
            <div className={styles.h2Tag}>
              <h2>Help us spread the Word</h2>
            </div>
            <div className={styles.h4Tag}>
              <h4>
                Follow, like, tweet or post. We Would love to interact with you
              </h4>
            </div>
            <ul className={styles.social}>
              <li>
                <a href="#" className={styles.facebook}>
                  <FontAwesomeIcon icon={faFacebook} />
                </a>
              </li>
              <li>
                <a href="#" className={styles.twitter}>
                  <FontAwesomeIcon icon={faTwitter} />
                </a>
              </li>
              <li>
                <a href="#" className={styles.instalgram}>
                  <FontAwesomeIcon icon={faInstagram} />
                </a>
              </li>
              <li>
                <a href="#" className={styles.linkedin}>
                  <FontAwesomeIcon icon={faLinkedin} />
                </a>
              </li>
              <li>
                <a href="#" className={styles.youtube}>
                  <FontAwesomeIcon icon={faYoutube} />
                </a>
              </li>
            </ul>
            <div className={styles.blockContentWrapper}>
              <div className={`${styles.subfooter} container`}>
                <div className={styles.grid}>
                  <div className={styles.boxleft}>
                    <Title level={3} className={styles.title}>
                      Health Management Oganizations (HMO)
                    </Title>
                    <ul
                      className={styles.allInsurance}
                      style={{ padding: 0, margin: 0 }}
                    >
                      {this.props.hmos.map((hmo) => (
                        <li>
                          <a href={`/hmos/id/${hmo.hmo_id}`}>{hmo.name}</a>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className={styles.boxleft}>
                    <Title level={3} className={styles.title}>
                      Health Insurance Packages
                    </Title>
                    <ul
                      className={styles.allInsurance}
                      style={{ padding: 0, margin: 0 }}
                    >
                      <li>
                        <a href="/">Health Insurance Plans</a>
                      </li>
                      <li>
                        <a
                          href="#"
                          onClick={() => {
                            this.changeType("single");
                            // this.goToHome();
                          }}
                        >
                          Health Insurance for Indidivuals
                        </a>
                      </li>
                      <li>
                        <a
                          href="#"
                          onClick={() => {
                            this.changeType("fam-of-4");
                            // this.goToHome();
                          }}
                        >
                          Health Insurance for Family
                        </a>
                      </li>

                      <li>
                        <a
                          href="#"
                          onClick={() => {
                            this.changeType("couple");
                            // this.goToHome();
                          }}
                        >
                          Health Insurance for Couples
                        </a>
                      </li>

                      <li>
                        <a
                          href="#"
                          onClick={() => {
                            this.changeType("parents");
                            // this.goToHome();
                          }}
                        >
                          Health Insurance for Senior Citizens
                        </a>
                      </li>
                      <li>
                        <a
                          href="#"
                          onClick={() => {
                            this.changeType("smes");
                            // this.goToHome();
                          }}
                        >
                          Health Insurance for S.M.E.s
                        </a>
                      </li>
                      <li>
                        <a
                          href="#"
                          onClick={() => {
                            this.changeType("corporate");
                            // this.goToHome();
                          }}
                        >
                          Health Insurance for Corporate and Large Groups
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className={styles.grid}>
                  <ul className={styles.subfooterlinks} style={{ padding: 0 }}>
                    {companyLinks.map((link, index) => {
                      return (
                        <li key={index}>
                          {" "}
                          <a href={link.url}>{link.label}</a>{" "}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            </div>
            <div className={styles.footerBox}>
              <div className={styles.legalinfo}>
                <p className={styles.small}>
                  Insurance is the subject matter of solicitation.Visitors are
                  hereby informed that their information submitted on the
                  website may be shared with insurers.
                </p>
                <p className={styles.small}>
                  *The information provided on this website/page is only for
                  information sake. Instacare does not in any form or manner
                  endorse the information so provided on the website and strives
                  to provide factual and unbiased information to customers to
                  assist in making informed insurance choices.
                </p>
                <p className={styles.small}>
                  The product information for comparison displayed on this
                  website is of the insurers with whom our company has an
                  agreement.
                </p>
                <p>
                  Product information is authentic and solely based on the
                  information received from the Insurer © Copyright 2021
                  useinstacare.com/. All Rights Reserved..
                </p>
              </div>
            </div>
          </div>
        </footer>
      </div>
    );
  }
}

const mapProps = (state: any) => {
  return {
    // ...state.quiz.quiz,
    // ...state.quiz,
    plansByHMO: state.fetchData.plansByHMO,
    planServices: state.fetchData.services,
    hmos: state.fetchData.hmos,
    responses: state.quiz.responses,
  };
};

export default connect(mapProps, {
  resetType,
  updateType,
  filterByBudget_and_or_Type,
  resetInfiniteScrollData,
})(AppFooter);
