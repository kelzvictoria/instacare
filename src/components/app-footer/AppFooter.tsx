import React, { Component } from "react";

import { Row, Col, Typography, Icon } from "antd";

import styles from "./AppFooter.module.scss";

const { Title } = Typography;

const companyLinks = [
  {
    label: "Home",
    url: "/",
  },
  {
    label: "About",
    url: "#",
  },

  {
    label: "Services",
    url: "#",
  },

  {
    label: "Sales",
    url: "#",
  },

  {
    label: "Contact Us",
    url: "#",
  },
  {
    label: "Privacy Policy",
    url: "#",
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

export class AppFooter extends Component {
  render() {
    return (
      <div className="app_footer" style={{ position: "relative" }}>
        <footer className={styles.appFooter}>
          <Row>
            {/* <Col xs={{ span: 24 }} md={{ span: 8 }}> */}
            {/* <Title level={3}>About</Title> */}
            <ul className="footer-links">
              {companyLinks.map((link, index) => {
                return (
                  <li key={index}>
                    {" "}
                    <a href={link.url}>{link.label}</a>{" "}
                  </li>
                );
              })}
            </ul>
            {/* </Col> */}
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
          </Row>
        </footer>
      </div>
    );
  }
}
