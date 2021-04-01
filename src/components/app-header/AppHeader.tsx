import React from "react";
import styles from "./AppHeader.module.scss";
import { Link } from "react-router-dom";
import { Menu, Row, Col } from "antd";

import logo from "../../imgs/logo2.png";

function AppHeader() {
  const links = [
    {
      url: "/quiz",
      title: "Recommendations",
    },
    {
      url: "/about",
      title: "About",
    },
    {
      url: "/contact",
      title: "Contact",
    },
  ];

  return (
    <div className={styles.appHeader}>
      <div className="container">
        <Row>
          <Col xs={24} md={8}>
            <Link to="/">
              <img src={logo} alt="Logo" />
              {/* <div className={styles.connect}>hmo connect</div> */}
            </Link>
          </Col>
          {/*<Col xs={24} md={4}>
                        <Menu mode="horizontal" style={{ display: "inline-block" , float:"right"}}>
                            {links.map((link, index) => {
                                return (
                                    <Menu.Item key={index}><Link to={link.url}> {link.title} </Link></Menu.Item>
                                );
                            })}
                        </Menu>
                        </Col>  */}
        </Row>
      </div>
    </div>
  );
}

export default AppHeader;
