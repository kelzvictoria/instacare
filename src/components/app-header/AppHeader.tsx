import React from "react";
import styles from "./AppHeader.module.scss";
import { Link } from "react-router-dom";
import { Menu, Row, Col } from "antd";

import { withRouter, RouteComponentProps } from "react-router";

import {
  resetInfiniteScrollData,
  getServices
} from "../../actions/fetchDataActions";

import { connect } from "react-redux";

// import logo from "../../imgs/logo2.png";
//import logo from "../../imgs/logo-w.png";
import logo from "../../imgs/logo-alt.png";

type PathParamsType = {
  param1: string,
}

type PropsType = RouteComponentProps<PathParamsType> & {
 // someString: string,
}


class AppHeader extends React.Component<PropsType> {
 links = [
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

   clearFilters = async () => {
    this.props.history.push({
      pathname: '/'
    })
    
    window.location.reload();
  }

  render () {
     return (
    <div className={styles.appHeader}>
      <div className="container">
        <Row>
          <Col xs={24} md={8}>
            <Link to="/"
            onClick={this.clearFilters}
            >
              
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

 
}

const mapProps = (state: any) => ({
  
})

export default withRouter(connect(mapProps, {
  resetInfiniteScrollData,
  getServices
})(AppHeader));
