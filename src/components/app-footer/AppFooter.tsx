import React, { Component } from "react";

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

import { connect } from "react-redux";
import * as actions from "../../utils/actions";

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

class AppFooter extends Component<FooterProps, {}> {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
    this.handleHMOClick = this.handleHMOClick.bind(this);
  }

  state = {};

  handleHMOClick = (hmo) => {
    console.log("this.props", this.props);
    // this.props.history.push({ pathname: `/${hmo}` });
  };
  filterPlansByHMO = (hmo) => {};

  render() {
    // console.log("this.props in footer", this.props);
    return (
      <div className="app_footer" style={{ position: "relative" }}>
        <footer className={styles.appFooter}>
          {/* <Row>
            <Col xs={{ span: 24 }} md={{ span: 8 }}>
              <Title level={3}>About</Title>
              <ul className="footer-links">
                {companyLinks.map((link, index) => {
                  return (
                    <li key={index}>
                      {" "}
                      <a
                        href={link.url}
                        onClick={() => this.handleHMOClick(link.id)}
                      >
                        {link.label}
                      </a>{" "}
                    </li>
                  );
                })}
              </ul>
              </Col> */}
          {/* <Col xs={{ span: 24 }} md={{ span: 8 }}>
                            <Title level={3}>In the Media</Title>
                            <ul className="footer-links">
                                {
                                    mediaLinks.map((link, index) => {
                                        return <li key={index}> <a href={link.url}>{link.label}</a> </li>;
                                    })
                                }
                            </ul>
                        </Col>
                        <Col xs={{ span: 24 }} md={{ span: 8 }}>
                            <Title level={3}>Contact</Title>
                            <ul className="footer-links">
                                {
                                    contactLinks.map((link, index) => {
                                        return <li key={index}> <a href={link.url}> {(link.icon) ? <Icon type={link.icon} /> : ""} {link.label}</a> </li>;
                                    })
                                }
                            </ul>
                        </Col> */}
          {/* </Row> */}
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
                      <li>
                        <a href="/hmos/hygeia">Hygeia HMO</a>
                      </li>
                      <li>
                        <a href="/hmos/metro-health">MetroHealth HMO</a>
                      </li>
                      <li>
                        <a href="/hmos/novo-health-africa">
                          Novo Health Africa HMO
                        </a>
                      </li>
                      <li>
                        <a href="/hmos/swift">Swift HMO Ltd</a>
                      </li>
                      <li>
                        <a href="/hmos/reliance">Reliance HMO</a>
                      </li>
                      <li>
                        <a href="/hmos/princeton-health-limited">
                          Princeton Health Limited
                        </a>
                      </li>
                      <li>
                        <a href="/hmos/aiico-multi-shield-nig-ltd">
                          AIICO Multi-Shield Nig. Ltd
                        </a>
                      </li>
                      <li>
                        <a href="/hmos/avon">Avon Health Insurance</a>
                      </li>
                      <li>
                        <a href="/hmos/integrated-healthcare-ltd">
                          Integrated Healthcare Limited
                        </a>
                      </li>
                      <li>
                        <a href="/hmos/total-health-trust">
                          Total Health Trust
                        </a>
                      </li>
                      <li>
                        <a
                          href="https://www.policybazaar.com/health-insurance/companies/"
                          className={styles.viewplan}
                        >
                          View All
                        </a>
                      </li>
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
                        <a href="https://www.policybazaar.com/health-insurance/family-health-insurance-plan/">
                          Health Insurance for Family
                        </a>
                      </li>
                      <li>
                        <a href="https://www.policybazaar.com/health-insurance/senior-citizen-health-insurance/">
                          Health Insurance for Senior Citizen
                        </a>
                      </li>
                      {/* <li><a href="https://www.policybazaar.com/health-insurance/mediclaim-insurance/">Mediclaim</a></li> */}
                      <li>
                        <a href="https://www.policybazaar.com/health-insurance/critical-illness-insurance/">
                          Critical Illness Insurance
                        </a>
                      </li>
                      <li>
                        <a href="https://www.policybazaar.com/health-insurance/health-insurance-premium-calculator/">
                          Health Insurance Premium Calculator
                        </a>
                      </li>
                      <li>
                        <a href="https://www.policybazaar.com/commercial-insurance/group-health-insurance/">
                          Group Health Insurance
                        </a>
                      </li>
                    </ul>
                  </div>
                  {/* <div className={styles.boxleft}>
                    <Title level={3} className={styles.title}>Important links</Title>
                    <ul className={styles.allInsurance} style={{ padding: 0, margin: 0 }}>
                      <li><a href="https://www.policybazaar.com/health-insurance/coronavirus-health-insurance/">Coronavirus Health Insurance</a></li>
                      <li><a href="https://www.policybazaar.com/health-insurance/corona-kavach-policy/">Corona Kavach</a></li>
                      <li><a href="https://www.policybazaar.com/health-insurance/corona-rakshak-policy/">Corona Rakshak</a></li>
                      <li><a href="https://www.policybazaar.com/health-insurance/articles/why-do-you-need-rs-1-crore-health-insurance-cover/">1 Crore Health Insurance</a></li>
                    </ul>
                  </div> */}
                  {/* <div className={styles.boxleft}>
                    <Title level={3} className={styles.title}>Health Guide </Title>
                    <ul className={styles.allInsurance} style={{ padding: 0, margin: 0 }}>
                      <li><a href="https://www.policybazaar.com/health-insurance/individual-health-insurance/articles/best-health-insurance-plans-in-india/">Best Health Insurance</a></li>
                      <li><a href="https://www.policybazaar.com/health-insurance/general-info/articles/top-health-insurance-companies-in-india/">Health Insurance Companies</a></li>
                      <li><a href="https://www.policybazaar.com/health-insurance/senior-citizen-health-insurance/articles/best-health-insurance-plans-for-senior-citizens/">Best Health Insurance Plans for Senior Citizens</a></li>
                      <li><a href="https://www.policybazaar.com/health-insurance/senior-citizen-health-insurance/articles/healthcare-insurance-for-parents/">Health Insurance for Parents</a></li>
                      <li><a href="https://www.policybazaar.com/health-insurance/general-info/articles/top-maternity-insurance-plans/">Top Maternity Insurance Plans</a></li>
                      <li><a href="https://www.policybazaar.com/health-insurance/critical-illness-insurance/articles/health-insurance-for-diabetics/">Health Insurance for Diabetics</a></li>
                    </ul>
                  </div> */}
                </div>
                <div className={styles.grid}>
                  <ul className={styles.subfooterlinks} style={{ padding: 0 }}>
                    {companyLinks.map((link, index) => {
                      return (
                        <li key={index}>
                          {" "}
                          <a
                            href={link.url}
                            // onClick={() => this.handleHMOClick(link.id)}
                          >
                            {link.label}
                          </a>{" "}
                        </li>
                      );
                    })}
                    {/* <li><a href="https://www.policybazaar.com/about-us/">About Us</a></li>
                    <li><a href="https://www.policybazaar.com/sitemap/">Sitemap</a></li>
                    <li><a href="https://www.policybazaar.com/careers/">Careers</a></li>
                    <li className="forhide"><a href="https://www.policybazaar.com/legal-and-admin-policies/">Legal and Admin Policies</a></li>
                    <li className="forhide"><a href="https://www.policybazaar.com/legal-and-admin-policies/#isnp">ISNP</a></li>
                    <li className={styles.footerlinks}><a href="https://www.policybazaar.com/insurance-companies/">Insurance Companies</a></li>
                    <li><a href="https://www.policybazaar.com/articles/">Articles</a></li>
                    <li><a href="https://www.policybazaar.com/contact-us/">Contact Us</a></li>
                    <li><a href="https://verification.policybazaar.com/">Know your advisor</a></li>
                    <li><a href="https://www.policybazaar.com/pblife/newsroom">Newsroom</a></li> */}
                  </ul>
                </div>
              </div>
              {/* <Row className={styles.subfooter}>
                                <Col xs={{ span: 24 }} md={{ span: 6 }} className={styles.grid}>
                                    <Title level={3} className={styles.title}>Health Insurance  <div className={styles.before}></div>
                                    </Title>
                                    <ul className={styles.allInsurance} style={{padding:0, margin:0}}>
                                        {
                                            companyLinks.map((link, index) => {
                                                return <li key={index}><a href={link.url}>{link.label}</a> </li>;
                                            })
                                        }
                                    </ul>
                                </Col>
                                <Col xs={{ span: 24 }} md={{ span: 6 }}>
                                    <Title level={3} className={styles.title}>Health Insurers <div className={styles.before}></div></Title>
                                    <ul style={{padding:0, margin:0}} className={styles.allInsurance}>
                                        {
                                            mediaLinks.map((link, index) => {
                                                return <li key={index}> <a href={link.url}>{link.label}</a> </li>;
                                            })
                                        }
                                    </ul>
                                </Col>
                                <Col xs={{ span: 24 }} md={{ span: 6 }}>
                                    <Title level={3} className={styles.title}>Important links <div className={styles.before}></div></Title>
                                    <ul style={{padding:0, margin:0}} className={styles.allInsurance}>
                                        {
                                            contactLinks.map((link, index) => {
                                                return <li key={index}> <a href={link.url}> {(link.icon) ? <Icon type={link.icon} /> : ""} {link.label}</a> </li>;
                                            })
                                        }
                                    </ul>
                                </Col>
                                <Col xs={{ span: 24 }} md={{ span: 6 }}>
                                    <Title level={3} className={styles.title}>Health Guide <div className={styles.before}></div></Title>
                                    <ul style={{padding:0, margin:0}} className={styles.allInsurance}>
                                        {
                                            contactLinks.map((link, index) => {
                                                return <li key={index}> <a href={link.url}> {(link.icon) ? <Icon type={link.icon} /> : ""} {link.label}</a> </li>;
                                            })
                                        }
                                    </ul>
                                </Col>
                            </Row> */}
            </div>
            <div className={styles.footerBox}>
              {/* <div className={styles.investor}>
                <h5>Our Partners</h5>
                <ul className={styles.invest} style={{ padding: 0, margin: 0 }}>
                  <li>
                    <a href="javascript:void(0)" className={styles.footerIcons} >
                      <img src={require("../../imgs/formelo.png")} width="70px" />
                    </a>
                  </li>
                  <li>
                    <a href="javascript:void(0)" className={styles.footerIcons}>
                      <img src={require("../../imgs/pm global.png")} width="70px" />
                    </a>
                  </li>
                  <li>
                    <a href="javascript:void(0)" className={styles.footerIcons}>
                      <img src={require("../../imgs/trafficspace.png")} width="70px" />
                    </a>
                  </li>
                </ul>
              </div> */}
              {/* <div className={styles.noticeMassage}>
                <span>**IMPORTANT NOTICE:</span> We have received in-principle approval from IRDAI for our insurance broking business. In accordance with the in principle approval, since 24th January 2020 we have changed our name from Policybazaar Insurance Web Aggregator Private Limited to Policybazaar Insurance Brokers Private Limited. We thank our customers for their continued support and assure that our customers remain our priority.
              </div> */}
              <div className={styles.legalinfo}>
                {/* <p>CIN: U74999HR2014PTC053454 Policybazaar Insurance Brokers Private Limited (formerly known as Policybazaar Insurance Web Aggregator Private Limited)<span> Policybazaar is currently registered as a Web aggregator by IRDAI. Approval for registration as an Insurance Broker is pending with the IRDAI.</span> Registered Office - Plot No.119, Sector - 44, Gurgaon, Haryana - 122001 </p> */}
                {/* <p><a href="https://www.policybazaar.com/legal-and-admin-policies/#license" >IRDAI Web aggregator Registration No. 06 Registration Code No. IRDAI/WBA21/15 Valid till 13/07/2021</a></p> */}
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
    ...state.quiz.quiz,
    ...state.quiz,
  };
};

export default connect(mapProps)(AppFooter);
