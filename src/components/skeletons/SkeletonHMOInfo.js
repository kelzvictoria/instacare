import React, { Component } from 'react';
import SkeletonElement from './SkeletonElement';
import Shimmer from './Shimmer';

class SkeletonHMOInfo extends Component {
    constructor(props) {
        super(props)
    }

    themeClass = this.props.theme || "";
    state = {}
    render() {
        return (
            <div className={`skeleton-wrapper ${this.themeClass}`}>
                <div className="svg-and-text provider-data">
                    {/* <SkeletonElement type="hmo-info-logo" /> */}
                    <SkeletonElement type="avatar" />
                    <SkeletonElement type="hmo-name" />

                    <div className="row col-md-12">
                        <SkeletonElement type="hmo-info-card mr-3" />
                        <SkeletonElement type="hmo-info-card mr-3" />
                        <SkeletonElement type="hmo-info-card" />
                    </div>

                </div>
                <Shimmer />
            </div>
        );
    }
}

export default SkeletonHMOInfo;