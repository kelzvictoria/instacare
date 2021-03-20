import React, { Component } from 'react';
import SkeletonElement from './SkeletonElement';
import Shimmer from './Shimmer';

class SkeletonCheapestPlan extends Component {
    constructor(props) {
        super(props)
    }

    themeClass = this.props.theme || "";
    state = {}
    render() {
        return (
            <div className={`skeleton-wrapper ${this.themeClass}`}>
                <SkeletonElement type="cheapest-plan" />
                <Shimmer />
            </div>
        );
    }
}

export default SkeletonCheapestPlan;