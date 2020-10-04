import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Empty, Typography, Button, Icon, Divider } from "antd";

import styles from "./ErrorPage.module.scss";

export default class ErrorPage extends Component {
    render() {
        return (
            <div className={styles.errorPage} style={{ paddingTop: "3rem" }}>
                <Empty
                    image="images/404.svg"
                    imageStyle={{ height: "220px" }}
                    description={""}
                >
                    <Typography.Title level={4}>We're sorry, but that page does not exist!</Typography.Title>

                    <Link
                        to={{ pathname: "/" }}
                    >
                        <Button size="large" style={{ marginTop: "2rem" }}>
                            <Icon type="home" />
                            <Divider type="vertical" />
                            Go home
                        </Button>
                    </Link>
                </Empty>
            </div>
        );
    }
}