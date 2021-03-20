import React, { Component } from 'react';
import "./Skeleton.css"

class SkeletonElement extends Component {
    constructor(props) {
        super(props);
    }
    state = {}

    classes = `skeleton ${this.props.type}`
    render() {
        return (
            <div className={this.classes}>

            </div>
        );
    }
}

export default SkeletonElement;