import React, { Component } from 'react';
import Modal from "react-responsive-modal";
import { PAYSTACK_PUBLIC_KEY } from "../../utils/index";
import PaystackButton from "react-paystack";
import { connect } from "react-redux";
import styles from "./Details.module.scss";
import {
    Card,
    Row,
    Col,
    Button,
    Icon,
    Divider,
    Table,
    Input,
    Collapse,
    Form,
    Tabs
} from "antd";

import { toggleDataCaptureModal, updateTextResponse } from "../../actions/userInputActions"
import { stripNonNumeric } from '../../utils/homeUtils';

class DataCaptureModal extends Component {
    state = {}
    handleInput = (e) => {
        this.props.updateTextResponse({
            key: e.target.name, value: e.target.value
        })
    }

    callback = () => {

        // setTimeout(() => {
        //     this.props.history.push({ pathname: "/" });
        // }, 2000);
        this.onCloseDCModal();
    }

    close = () => {
        //cons

    }

    onCloseDCModal = () => {
        this.props.toggleDataCaptureModal(false)
    }

    getReference = () => {

        let text = "";
        let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-.=";

        for (let i = 0; i < 15; i++)
            text += possible.charAt(Math.floor(Math.random() * possible.length));

        return text;
    }

    render() {
        let is_open = this.props.is_data_capture_modal_open;
        //  console.log("is_open", is_open);
        // console.log("stripNonNumeric(this.props.price)", stripNonNumeric(this.props.price), "typeof", typeof stripNonNumeric(this.props.price));
        //let details = this.props.plan
        return (
            <div className={styles.content}>
                <Row gutter={8}>
                    <Col xs={24} md={16}>


                        <Modal open={is_open} onClose={() => this.onCloseDCModal()} center className="dc-modal">
                            <Col xs={24}>
                                <h2
                                    style={{ textAlign: "left" }}
                                    className="dc-modal-title"
                                >To buy {this.props.name}, please fill the form below</h2>
                            </Col>
                            <Col xs={12}
                            // style={{ marginBottom: "1rem" }}
                            >
                                <Form.Item colon={false} label="Enter first name" style={{ textAlign: "left" }}>
                                    <Input size="large" onChange={this.handleInput} type="text" name="firstName" placeholder="First Name" defaultValue={this.props.responses.firstName} />
                                </Form.Item>
                            </Col>
                            <Col xs={12}
                            // style={{ marginBottom: "1rem" }}
                            >
                                <Form.Item colon={false} label="Enter last name" style={{ textAlign: "left" }}>
                                    <Input size="large" onChange={this.handleInput} type="text" name="lastName" placeholder="Last Name" defaultValue={this.props.responses.lastName} />
                                </Form.Item>
                            </Col>
                            <Col xs={24}
                            //style={{ marginBottom: "1rem" }}
                            >
                                <Form.Item required={true} colon={false} label="Email address" style={{ textAlign: "left" }}>
                                    <Input size="large" onChange={this.handleInput} type="email" name="email" placeholder="someone@example.com" defaultValue={this.props.responses.email} />
                                </Form.Item>
                            </Col>
                            <Col xs={24}
                            //style={{ textAlign: "center" }}
                            >
                                <PaystackButton
                                    text="Submit"
                                    className="ant-btn ant-btn-primary ant-btn-lg"
                                    callback={this.callback}
                                    close={this.close}
                                    email={this.props.email}
                                    amount={stripNonNumeric(this.props.price) * 100}
                                    reference={this.getReference()}
                                    paystackkey={PAYSTACK_PUBLIC_KEY}

                                />
                            </Col>
                        </Modal>
                    </Col>
                </Row>
            </div>
        );
    }
}

const mapProps = (state) => {
    return {
        is_data_capture_modal_open: state.quiz.is_data_capture_modal_open,
        plan: state.fetchData.plan,
        name: state.fetchData.plan ? state.fetchData.plan.name : "",
        email: state.quiz.responses.email,
        price: state.fetchData.plan ? state.fetchData.plan.price : "",
        responses: state.quiz.responses
    }
}

export default connect(mapProps, {
    toggleDataCaptureModal,
    updateTextResponse
})(DataCaptureModal);