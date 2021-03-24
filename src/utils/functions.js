export const toggleModal = () => {
    this.props.dispatch({
        type: actions.TOGGLE_DESKTOP_MODAL,
        data: { key: "isOpen", value: !this.props.isOpen },
    });
};

export const mobileToggleModal = () => {
    // if (
    //   !this.props.responses.phone_num ||
    //   this.props.responses.phone_num.length < 14
    // ) {
    //   message.error("Please enter your phone number");
    //   return;
    // } else {
    this.props.dispatch({
        type: actions.TOGGLE_MOBILE_MODAL,
        data: {
            key: "isMobileViewModalOpen",
            value: !this.props.isMobileViewModalOpen,
        },
    });
    // }
};

export const toggleOthersInput = () => {
    this.props.dispatch({
        type: actions.TOGGLE_OTHERS_MODAL,
        data: { key: "isOthersInputOpen", value: !this.props.isOthersInputOpen },
    });
};

export const changePage = () => {
    this.props.dispatch({ type: actions.CHANGE_PAGE, data: action });
};


export function getCheapestPlan() {
    let lowest = Number.POSITIVE_INFINITY;
    let highest = Number.NEGATIVE_INFINITY;
    let tmp;

    let arr = this.props.plans;
    for (let i = arr.length - 1; i >= 0; i--) {
        tmp = arr[i]["individual_annual_price"];
        if (tmp < lowest) lowest = tmp;
        if (tmp > highest) highest = tmp;
    }
    console.log(highest, lowest);
    return lowest;
}

export function getCheapestPlanByHMO() {
    let lowest = Number.POSITIVE_INFINITY;
    let highest = Number.NEGATIVE_INFINITY;
    let tmp;

    let arr = this.state.provider_plans;
    for (let i = arr.length - 1; i >= 0; i--) {
        tmp = arr[i]["individual_annual_price"];
        if (tmp < lowest) lowest = tmp;
        if (tmp > highest) highest = tmp;
    }
    console.log(highest, lowest);
    return lowest;
}

export function hmoBannerDiv(hmoId) {
    const hmoArr = this.hmos.filter((hmo) => hmo["id"] == hmoId);

    let data;
    if (hmoId) {
        data = this.props.hmos.filter((hmo) => hmo.name.id == hmoArr[0].name);

        return (
            <Col xs={24} md={16} className="banner-container provider-banner">
                <div className="svg-and-text provider-data">
                    <div className="svg-img">
                        <img src={data[0].logo}></img>
                    </div>

                    <div className={styles.bannerContent} id="bannertext">
                        <p className={styles.textHeading}>
                            {this.state.provider_info["title"]}
                        </p>
                    </div>
                </div>

                <div className="banner-bottom">
                    <div className="row col-md-12">
                        <div className="col-md-4 card mr-3">
                            <img src={hospitalsvg} className="banner-icon" />
                            <div className="card-text">
                                <p>Hospital Network</p>
                                <h5>
                                    {data[0].provider_id
                                        ? JSON.parse(data[0].provider_id).length
                                        : ""}
                                </h5>
                            </div>
                        </div>
                        <div className="col-md-4 card mr-3">
                            <span className="naira banner-icon">₦</span>
                            <div className="card-text">
                                <p>Plans Starting from</p>
                                <h5>{this.numberwithCommas(this.getCheapestPlanByHMO())}</h5>
                            </div>
                        </div>
                        <div className="col-md-4 card">
                            <img src={ratiosvg} className="banner-icon" />
                            <div className="card-text">
                                <p>Claim Ratio</p>
                                <h5>{`${
                                    (this.state.provider_plans.length /
                                        this.props.plans.length) *
                                    100
                                    }%`}</h5>
                            </div>
                        </div>
                    </div>
                </div>
            </Col>
        );
    }
}

export function homeBannerDiv() {
    return (
        <Col xs={24} md={16} className="banner-container">
            <div className="svg-and-text">
                <Col xs={24} md={8} className="svg-img-div">
                    <div className="svg-img">
                        <img src="images/searching.svg"></img>
                    </div>
                </Col>
                <Col xs={24} md={16} className="banner-text">
                    <div className={styles.banner}>
                        <div className={styles.bannerContent} id="bannertext">
                            <p className={styles.textHeading}>
                                Find Health Plans Starting
                  <br />
                                <span className={styles.headingSpan}>
                                    from
                    {this.props.plans.length == 0 && (
                                        <Spin className="cheapest-plan" />
                                    )}
                                    {this.props.plans.length > 0 &&
                                        ` ₦${this.numberwithCommas(this.getCheapestPlan())}`}
                    /year
                  </span>
                            </p>
                        </div>
                    </div>
                </Col>
            </div>

            <div className="banner-bottom">
                <div className="row col-md-12">
                    <div className="col-md-4 card mr-3">
                        <FontAwesomeIcon className="banner-icon" icon={faShieldAlt} />
                        <div className="card-text">
                            <h5>Compare</h5>
                            <p>HMO Plans</p>
                        </div>
                    </div>
                    <div className="col-md-4 card mr-3">
                        <span className="naira banner-icon">₦</span>
                        <div className="card-text">
                            <h5>Purchase</h5>
                            <p>HMO Plans</p>
                        </div>
                    </div>
                    <div className="col-md-4 card">
                        <FontAwesomeIcon className="far banner-icon" icon={faSmile} />
                        <div className="card-text">
                            <h5>Insure</h5>
                            <p>You & your family</p>
                        </div>
                    </div>
                </div>
            </div>
        </Col>
    );
}

async export function getPlansByHMO(hmoId) {
    const hmoName = this.hmos.filter((hmo) => hmo["id"] == hmoId);

    if (hmoId) {
        const hmoPlans = await this.props.plans.filter((plan) => {
            return plan.hmo_id.name.id == hmoName[0].name;
        });

        this.setState({
            provider_plans: hmoPlans,
            filter_plans_by_hmo: true,
        });

        return {
            hmoPlans,
        };
    } else {
        return "home page has mounted";
    }
}

async export function fetchPlans() {
    this.props.dispatch({
        type: actions.IS_FETCHING_PLANS,
        data: true,
    });
    const res = await fetch(`${API_URL}/api/plans`, {
        headers: {
            "Content-Type": "application/json",
        },
        method: "GET",
    });

    if (res) {
        let plans = [];
        let formelo_resp = await res.json();
        this.props.dispatch({
            type: actions.IS_FETCHING_PLANS,
            data: false,
        });
        if (formelo_resp || formelo_resp.length !== 0) {
            plans = formelo_resp.map((obj) => obj.data);

            for (let j = 0; j < plans.length; j++) {
                let hmoID = plans[j]["hmo_id"].id;

                let servicesString = plans[j]["service_id"];
                let services = servicesString ? JSON.parse(servicesString) : "";

                let hmoDocumentID = hmoKeysMapping[hmoID];

                let hmo_res = this.props.hmos.filter(
                    (hmo) => hmo.id == hmoDocumentID
                );

                if (hmo_res) {
                    let hmo_resp = hmo_res[0];

                    plans[j]["hmo_id"] = hmo_resp;
                    plans[j]["service_id"] = services;
                }
            }

            this.props.dispatch({
                type: actions.GET_PLANS,
                data: plans,
            });
            return;
        }
    }
}

async export function fetchHmos() {
    this.props.dispatch({
        type: actions.IS_FETCHING_HMOS,
        data: true,
    });
    const res = await fetch(`${API_URL}/api/hmos`, {
        headers: {
            "Content-Type": "application/json",
        },
        method: "GET",
    });

    if (res) {
        let hmos = [];
        let formelo_resp = await res.json();
        this.props.dispatch({
            type: actions.IS_FETCHING_HMOS,
            data: false,
        });
        if (formelo_resp || formelo_resp.length !== 0) {
            hmos = formelo_resp.map((obj) => {
                return { id: obj.id, ...obj.data };
            });

            this.props.dispatch({
                type: actions.GET_HMOS,
                data: hmos,
            });
            return;
        }
    }
}

async export function fetchServices() {
    this.props.dispatch({
        type: actions.IS_FETCHING_SERVICES,
        data: true,
    });
    const res = await fetch(`${API_URL}/api/services`, {
        headers: {
            "Content-Type": "application/json",
        },
        method: "GET",
    });

    if (res) {
        let services = [];
        let formelo_resp = await res.json();
        this.props.dispatch({
            type: actions.IS_FETCHING_SERVICES,
            data: false,
        });
        if (formelo_resp || formelo_resp.length !== 0) {
            services = formelo_resp.map((obj) => obj.data);

            this.props.dispatch({
                type: actions.GET_SERVICES,
                data: services,
            });
            return;
        }
    }
}

async export function fetchProviders() {
    this.props.dispatch({
        type: actions.IS_FETCHING_PROVIDERS,
        data: true,
    });
    const res = await fetch(`${API_URL}/api/providers`, {
        headers: {
            "Content-Type": "application/json",
        },
        method: "GET",
    });

    if (res) {
        let providers = [];
        let formelo_resp = await res.json();
        this.props.dispatch({
            type: actions.IS_FETCHING_PROVIDERS,
            data: false,
        });
        if (formelo_resp || formelo_resp.length !== 0) {
            providers = formelo_resp.map((obj) => obj.data);

            this.props.dispatch({
                type: actions.GET_PROVIDERS,
                data: providers,
            });
            return;
        }
    }
}

async export function fetchRecommendedPlans() {
    this.handleNumOfPeopleCount();
    let rec_plans = [];
    let family_plans = [];
    let individual_plans = [];

    this.props.dispatch({
        type: actions.IS_FETCHING_RECOMMENDED_PLANS,
        data: true,
    });
    let res = await this.props.plans;

    if (res) {
        if (res.length !== 0) {
            for (let i = 0; i < res.length; i++) {
                if (
                    res[i].category_id.id == "personal"
                ) {
                    individual_plans.push(res[i]);
                }

                if (
                    res[i].category_id.id == "famiy"
                ) {
                    family_plans.push(res[i]);
                }
            }

            this.props.dispatch({
                type: actions.GET_NUM_OF_PEOPLE,
                data: this.props.quiz.responses.num_of_people,
            });

            if (
                this.props.quiz.responses.type == "single"
            ) {
                rec_plans = individual_plans;
            } else if (this.props.quiz.responses.type !== "single") {
                rec_plans = family_plans;
            }

            this.props.dispatch({
                type: actions.GET_RECOMMENDED_PLANS,
                data: rec_plans,
            });

            this.props.dispatch({
                type: actions.IS_FETCHING_RECOMMENDED_PLANS,
                data: false,
            });
            return;
        }
    }
}

export function defaultGender() {
    return true;
}

export function handleGender(val) {
    this.props.dispatch({
        type: actions.UPDATE_GENDER,
        data: { key: "gender", value: val },
    });
}

export function handlePhone(val) {
    if (val) {
        console.log("val.length", val.length, "val", val);
        if (val.toString().length == 14) {
            this.setState({
                is_phone_valid: true,
            });
        } else if (val.toString().length > 0 && val.toString().length < 14) {
            this.setState({
                is_phone_valid: false,
            });
        }

        this.props.dispatch({
            type: actions.UPDATE_PHONE,
            data: { key: "phone_num", value: val },
        });
    }
}

export function handleFullName(val) {
    this.props.dispatch({
        type: actions.UPDATE_FULL_NAME,
        data: { key: "full_name", value: val },
    });
}

export function handleIndividualAge(val) {
    if (this.props.responses.type != "others") {
        //this.resetAges();
    }

    this.props.dispatch({
        type: actions.UPDATE_INDIVIDUAL_AGE,
        data: { key: "individual_age", value: val },
    });
}

export function handleFatherAge(val) {
    if (this.props.responses.type != "others") {
        //this.resetAges();
    }

    this.props.dispatch({
        type: actions.UPDATE_FATHER_AGE,
        data: { key: "father_age", value: val },
    });
}

export function handleMotherAge(val) {
    if (this.props.responses.type != "others") {
        //this.resetAges();
    }

    this.props.dispatch({
        type: actions.UPDATE_MOTHER_AGE,
        data: { key: "mother_age", value: val },
    });
}

export function handleGrandFatherAge(val) {
    if (this.props.responses.type != "others") {
        //this.resetAges();
    }

    this.props.dispatch({
        type: actions.UPDATE_GRAND_FATHER_AGE,
        data: { key: "phone_num", value: val },
    });
}

export function handleGrandMotherAge(val) {
    if (this.props.responses.type != "others") {
        //this.resetAges();
    }

    this.props.dispatch({
        type: actions.UPDATE_GRAND_MOTHER_AGE,
        data: { key: "grand_mother_age", value: val },
    });
}

export function handleFatherInLawAge(val) {
    if (this.props.responses.type != "others") {
        //this.resetAges();
    }

    this.props.dispatch({
        type: actions.UPDATE_FATHER_IN_LAW_AGE,
        data: { key: "father_in_law_age", value: val },
    });
}

export function handleMotherInLawAge(val) {
    if (this.props.responses.type != "others") {
        //this.resetAges();
    }

    this.props.dispatch({
        type: actions.UPDATE_MOTHER_IN_LAW_AGE,
        data: { key: "mother_in_law_age", value: val },
    });
}

export function handleSpouseAge(val) {
    if (this.props.responses.type != "others") {
        //this.resetAges();
    }

    this.props.dispatch({
        type: actions.UPDATE_SPOUSE_AGE,
        data: { key: "spouse_age", value: val },
    });
}

export function handleChild1Age(val) {
    if (this.props.responses.type != "others") {
        //this.resetAges();
    }

    this.props.dispatch({
        type: actions.UPDATE_CHILD_1_AGE,
        data: { key: "child_1_age", value: val },
    });
}

export function handleChild2Age(val) {
    if (this.props.responses.type != "others") {
        //this.resetAges();
    }

    this.props.dispatch({
        type: actions.UPDATE_CHILD_2_AGE,
        data: { key: "child_2_age", value: val },
    });
}

export function handleChild3Age(val) {
    if (this.props.responses.type != "others") {
        //this.resetAges();
    }

    this.props.dispatch({
        type: actions.UPDATE_CHILD_3_AGE,
        data: { key: "child_3_age", value: val },
    });
}

export function handleChild4Age(val) {
    if (this.props.responses.type != "others") {
        //this.resetAges();
    }

    this.props.dispatch({
        type: actions.UPDATE_CHILD_4_AGE,
        data: { key: "child_4_age", value: val },
    });
}

export function handleChild5Age(val) {
    this.props.dispatch({
        type: actions.UPDATE_CHILD_5_AGE,
        data: { key: "child_5_age", value: val },
    });
}

export function handleChild6Age(val) {
    if (this.props.responses.type != "others") {
        //this.resetAges();
    }

    this.props.dispatch({
        type: actions.UPDATE_CHILD_6_AGE,
        data: { key: "child_6_age", value: val },
    });
}

export function handleChild7Age(val) {
    if (this.props.responses.type != "others") {
        //this.resetAges();
    }

    this.props.dispatch({
        type: actions.UPDATE_CHILD_7_AGE,
        data: { key: "child_7_age", value: val },
    });
}

export function handleChild8Age(val) {
    if (this.props.responses.type != "others") {
        //this.resetAges();
    }

    this.props.dispatch({
        type: actions.UPDATE_CHILD_8_AGE,
        data: { key: "child_8_age", value: val },
    });
}

export function resetAges() {
    this.props.dispatch({
        type: actions.RESET_RESPONSES,
        data: {
            individual_age: 0,
            father_age: 0,
            mother_age: 0,
            grand_father_age: 0,
            grand_mother_age: 0,
            father_in_law_age: 0,
            mother_in_law_age: 0,
            spouse_age: 0,
            child_1_age: 0,
            child_2_age: 0,
            child_3_age: 0,
            child_4_age: 0,
            child_5_age: 0,
            child_6_age: 0,
            child_7_age: 0,
            child_8_age: 0,
        },
    });
}

export function handleType(val) {
    this.props.dispatch({
        type: actions.UPDATE_TYPE,
        data: { key: "type", value: val.target.id },
    });
}

export function handleNumOfPeopleCount() {
    if (this.props.responses.type == "couple") {
        this.props.dispatch({
            type: actions.UPDATE_NUM_OF_PEOPLE,
            data: 1,
        });
    } else if (this.props.responses.type == "fam-of-4") {
        this.props.dispatch({
            type: actions.UPDATE_NUM_OF_PEOPLE,
            data: 3,
        });
    } else if (this.props.responses.type == "fam-of-3") {
        this.props.dispatch({
            type: actions.UPDATE_NUM_OF_PEOPLE,
            data: 2,
        });
    } else if (this.props.responses.type == "parents") {
        this.props.dispatch({
            type: actions.UPDATE_NUM_OF_PEOPLE,
            data: 1,
        });
    } else if (this.props.responses.type == "others") {
        let ages = [
            this.props.responses.child_1_age,
            this.props.responses.child_2_age,
            this.props.responses.child_3_age,
            this.props.responses.child_4_age,
            this.props.responses.child_5_age,
            this.props.responses.child_6_age,
            this.props.responses.child_7_age,
            this.props.responses.child_8_age,
            this.props.responses.father_age,
            this.props.responses.mother_age,
            this.props.responses.father_in_law_age,
            this.props.responses.mother_in_law_age,
            this.props.responses.spouse_age,
            this.props.responses.grand_father_age,
            this.props.responses.grand_mother_age,
            this.props.individual_age,
        ];

        for (let i = 0; i < ages.length; i++) {
            //console.log("ages[i]", ages[i]);
            if (parseInt(ages[i]) !== 0) {
                this.props.dispatch({
                    type: actions.UPDATE_NUM_OF_PEOPLE,
                    data: 1,
                });
            }
        }
    }

    // console.log(
    //     `
    //   this.props.responses.num_of_people
    //   `,
    //     this.props.responses.num_of_people
    // );
}

export function preventDefault() {
    e.preventDefault();
}

export function showSingleInput() {
    const singleInput = (
        <div id="single-control">
            <label>Select Age</label>
            <select
                name="individual"
                className="form-control"
                onChange={(e) => {
                    this.handleIndividualAge(e.target.value);
                }}
                value={this.props.responses.individual_age}
                placeholder="Select Age"
            >
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    );

    return singleInput;
}

export function showCouplesInput() {
    const couplesInput = (
        <div id="couples-control" className="col-md-6">
            <label>Age of the Eldest member</label>
            <select
                name="spouse_age"
                className="form-control"
                value={this.props.responses.spouse_age}
                onChange={(e) => {
                    this.handleSpouseAge(e.target.value);
                }}
                placeholder="Select Age"
            >
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    );

    return couplesInput;
}

export function showFamOf3Input() {
    const famOf3Input = (
        <div id="famOf3-controls" className="row">
            <div className="col-md-6">
                <label>Age of the Eldest member</label>
                <select
                    name="spouse_age"
                    className="form-control"
                    onChange={(e) => {
                        this.handleSpouseAge(e.target.value);
                    }}
                    value={this.props.responses.spouse_age}
                    placeholder="Select Age"
                >
                    {options.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
            </div>
            <div className="col-md-6 mt-1rem">
                <label>Select Age of Child</label>
                <select
                    name="child_1_age"
                    className="form-control"
                    onChange={(e) => {
                        this.handleChild1Age(e.target.value);
                    }}
                    value={this.props.responses.child_1_age}
                    placeholder="Select Age"
                >
                    {child_options.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
    return famOf3Input;
}

export function showFamOf4Input() {
    const famOf4Input = (
        <div id="famOf4-controls" className="row">
            <div className="col-md-6">
                <label>Age of the Eldest member</label>
                <select
                    name="spouse_age"
                    className="form-control"
                    onChange={(e) => {
                        this.handleSpouseAge(e.target.value);
                    }}
                    value={this.props.responses.spouse_age}
                    placeholder="Select Age"
                >
                    {options.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
            </div>
            <div className="col-md-6 mt-1rem">
                <label>Age of the Eldest Child</label>
                <select
                    name="child_1_age"
                    className="form-control"
                    onChange={(e) => {
                        this.handleChild1Age(e.target.value);
                    }}
                    value={this.props.responses.child_1_age}
                    placeholder="Select Age"
                >
                    {child_options.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
    return famOf4Input;
}

export function showParentsInput() {
    const parentsInput = (
        <div id="parents-control">
            <div className="col-md-6">
                <label>Age of the Eldest member</label>
                <select
                    name="father_age"
                    className="form-control"
                    onChange={(e) => {
                        this.handleFatherAge(e.target.value);
                    }}
                    value={this.props.responses.father_age}
                    placeholder="Select Age"
                >
                    {options.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
            </div>

            <div className="col-md-6"></div>
        </div>
    );
    return parentsInput;
}

export function showOthersInput() {
    const othersInput = (
        <div id="others-controls">
            <div className="col-md-12 row self">
                <div className="col-md-6 chkContainer">
                    <div className="checkbox">
                        <label>
                            <input
                                type="checkbox"
                                value="self"
                                className="chkMembers"
                                defaultChecked={true}
                                // onClick={}
                                id="self"
                            ></input>

                            <span>Self</span>
                        </label>
                    </div>
                </div>

                <div className="col-md-6">
                    <select
                        name="individual_age"
                        className="form-control"
                        onChange={(e) => {
                            this.handleIndividualAge(e.target.value);
                        }}
                        value={this.props.responses.individual_age}
                        placeholder="Select Age"
                    >
                        {options.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
            <div className="col-md-12 row spouse">
                <div className="col-md-6 chkContainer">
                    <div className="checkbox">
                        <label>
                            <input
                                type="checkbox"
                                value="spouse"
                                className="chkMembers"
                                defaultChecked={false}
                                // onClick={}
                                id="spouse"
                            ></input>

                            <span>Spouse</span>
                        </label>
                    </div>
                </div>
                <div className="col-md-6">
                    <select
                        name="spouse_age"
                        className="form-control"
                        onChange={(e) => {
                            this.handleSpouseAge(e.target.value);
                        }}
                        value={this.props.responses.spouse_age}
                        placeholder="Select Age"
                    >
                        {options.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
            <div className="col-md-12 son">
                <div className="col-md-12 chkContainer">
                    <div className="checkbox">
                        <label>
                            <input
                                type="checkbox"
                                value="son"
                                className="chkMembers"
                                defaultChecked={false}
                                onChange={(e) => {
                                    this.handleSonBoxChecked();
                                }}
                                id="son"
                            ></input>

                            <span className="controls">
                                Son
                  <div
                                    className={
                                        this.props.isSonCheckboxChecked
                                            ? "show-controls counter-controls"
                                            : "hide-controls"
                                    }
                                >
                                    <button
                                        className="minus"
                                        id="dec-son"
                                        onClick={this.decrementSonCount}
                                    >
                                        {" "}
                      -
                    </button>
                                    <span className="count"> {this.props.sonCount} </span>
                                    <button className="plus" onClick={this.incrementSonCount}>
                                        {" "}
                      +{" "}
                                    </button>
                                </div>
                            </span>
                        </label>
                    </div>
                </div>
                <div
                    className={
                        this.props.isSonCheckboxChecked
                            ? "col-md-12 row children"
                            : "hide-controls"
                    }
                >
                    <div className="col-md-6 chkContainer">
                        <div className="checkbox  children-check">
                            <label className="children-label">
                                <span>Son 1</span>
                            </label>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <select
                            name="child_1_age"
                            className="form-control"
                            onChange={(e) => {
                                this.handleChild1Age(e.target.value);
                            }}
                            value={this.props.responses.child_1_age}
                            placeholder="Select Age"
                        >
                            {child_options.map((option) => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
                <div
                    className={
                        this.props.sonCount > 1
                            ? "col-md-12 row children"
                            : "hide-controls"
                    }
                >
                    <div className="col-md-6 chkContainer">
                        <div className="checkbox children-check">
                            <label className="children-label">
                                <span>Son 2</span>
                            </label>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <select
                            name="child_2_age"
                            className="form-control"
                            onChange={(e) => {
                                this.handleChild2Age(e.target.value);
                            }}
                            value={this.props.responses.child_2_age}
                            placeholder="Select Age"
                        >
                            {child_options.map((option) => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
                <div
                    className={
                        this.props.sonCount > 2
                            ? "col-md-12 row children"
                            : "hide-controls"
                    }
                >
                    <div className="col-md-6 chkContainer">
                        <div className="checkbox children-check">
                            <label className="children-label">
                                <span>Son 3</span>
                            </label>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <select
                            name="child_3_age"
                            className="form-control"
                            onChange={(e) => {
                                this.handleChild3Age(e.target.value);
                            }}
                            value={this.props.responses.child_3_age}
                            placeholder="Select Age"
                        >
                            {child_options.map((option) => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
                <div
                    className={
                        this.props.sonCount > 3
                            ? "col-md-12 row children"
                            : "hide-controls"
                    }
                >
                    <div className="col-md-6 chkContainer">
                        <div className="checkbox children-check">
                            <label className="children-label">
                                <span>Son 4</span>
                            </label>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <select
                            name="child_4_age"
                            className="form-control"
                            onChange={(e) => {
                                this.handleChild4Age(e.target.value);
                            }}
                            value={this.props.responses.child_4_age}
                            placeholder="Select Age"
                        >
                            {child_options.map((option) => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>
            <div className="col-md-12 daughter">
                <div className="col-md-12 chkContainer">
                    <div className="checkbox">
                        <label>
                            <input
                                type="checkbox"
                                value="daughter"
                                className="chkMembers"
                                defaultChecked={false}
                                onChange={(e) => {
                                    this.handleDaughterBoxChecked();
                                }}
                                id="daughter"
                            ></input>

                            <span className="controls">
                                Daughter
                  <div
                                    className={
                                        this.props.isDaughterCheckboxChecked
                                            ? "show-controls counter-controls"
                                            : "hide-controls"
                                    }
                                >
                                    <button
                                        className="minus"
                                        onClick={this.decrementDaughterCount}
                                    >
                                        {" "}
                      -{" "}
                                    </button>
                                    <span className="count"> {this.props.daughterCount} </span>
                                    <button
                                        className="plus"
                                        onClick={this.incrementDaughterCount}
                                    >
                                        {" "}
                      +{" "}
                                    </button>
                                </div>
                            </span>
                        </label>
                    </div>
                </div>
                <div
                    className={
                        this.props.isDaughterCheckboxChecked
                            ? "col-md-12 row children"
                            : "hide-controls"
                    }
                >
                    <div className="col-md-6 chkContainer">
                        <div className="checkbox children-check">
                            <label className="children-label">
                                <span>Daughter 1</span>
                            </label>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <select
                            name="child_5_age"
                            className="form-control"
                            onChange={(e) => {
                                this.handleChild5Age(e.target.value);
                            }}
                            value={this.props.responses.child_5_age}
                            placeholder="Select Age"
                        >
                            {child_options.map((option) => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
                <div
                    className={
                        this.props.daughterCount > 1
                            ? "col-md-12 row children"
                            : "hide-controls"
                    }
                >
                    <div className="col-md-6 chkContainer">
                        <div className="checkbox children-check">
                            <label className="children-label">
                                <span>Daughter 2</span>
                            </label>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <select
                            name="child_6_age"
                            className="form-control"
                            onChange={(e) => {
                                this.handleChild6Age(e.target.value);
                            }}
                            value={this.props.responses.child_6_age}
                            placeholder="Select Age"
                        >
                            {child_options.map((option) => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
                <div
                    className={
                        this.props.daughterCount > 2
                            ? "col-md-12 row children"
                            : "hide-controls"
                    }
                >
                    <div className="col-md-6 chkContainer">
                        <div className="checkbox children-check">
                            <label className="children-label">
                                <span>Daughter 3</span>
                            </label>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <select
                            name="child_7_age"
                            className="form-control"
                            onChange={(e) => {
                                this.handleChild7Age(e.target.value);
                            }}
                            value={this.props.responses.child_7_age}
                            placeholder="Select Age"
                        >
                            {child_options.map((option) => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
                <div
                    className={
                        this.props.daughterCount > 3
                            ? "col-md-12 row children"
                            : "hide-controls"
                    }
                >
                    <div className="col-md-6 chkContainer">
                        <div className="checkbox children-check">
                            <label className="children-label">
                                <span>Daughter 4</span>
                            </label>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <select
                            name="child_8_age"
                            className="form-control"
                            onChange={(e) => {
                                this.handleChild8Age(e.target.value);
                            }}
                            value={this.props.responses.child_8_age}
                            placeholder="Select Age"
                        >
                            {child_options.map((option) => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>
            <div className="col-md-12 row father">
                <div className="col-md-6 chkContainer">
                    <div className="checkbox">
                        <label>
                            <input
                                type="checkbox"
                                value="father"
                                className="chkMembers"
                                defaultChecked={false}
                                // onClick={}
                                id="father"
                            ></input>

                            <span>Father</span>
                        </label>
                    </div>
                </div>
                <div className="col-md-6">
                    <select
                        name="father_age"
                        className="form-control"
                        onChange={(e) => {
                            this.handleFatherAge(e.target.value);
                        }}
                        value={this.props.responses.father_age}
                        placeholder="Select Age"
                    >
                        {options.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
            <div className="col-md-12 row mother">
                <div className="col-md-6 chkContainer">
                    <div className="checkbox">
                        <label>
                            <input
                                type="checkbox"
                                value="mother"
                                className="chkMembers"
                                defaultChecked={false}
                                // onClick={}
                                id="mother"
                            ></input>

                            <span>Mother</span>
                        </label>
                    </div>
                </div>
                <div className="col-md-6">
                    <select
                        name="mother_age"
                        className="form-control"
                        onChange={(e) => {
                            this.handleMotherAge(e.target.value);
                        }}
                        value={this.props.responses.mother_age}
                        placeholder="Select Age"
                    >
                        {options.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
            <div className="col-md-12 row grandfather">
                <div className="col-md-6 chkContainer">
                    <div className="checkbox">
                        <label>
                            <input
                                type="checkbox"
                                value="grandfather"
                                className="chkMembers"
                                defaultChecked={false}
                                // onClick={}
                                id="grandfather"
                            ></input>

                            <span>Grandfather</span>
                        </label>
                    </div>
                </div>
                <div className="col-md-6">
                    <select
                        name="grand_father_age"
                        className="form-control"
                        onChange={(e) => {
                            this.handleGrandFatherAge(e.target.value);
                        }}
                        value={this.props.responses.grand_father_age}
                        placeholder="Select Age"
                    >
                        {options.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
            <div className="col-md-12 row grandmother">
                <div className="col-md-6 chkContainer">
                    <div className="checkbox">
                        <label>
                            <input
                                type="checkbox"
                                value="grandmother"
                                className="chkMembers"
                                defaultChecked={false}
                                // onClick={}
                                id="grandmother"
                            ></input>

                            <span>Grandmother</span>
                        </label>
                    </div>
                </div>
                <div className="col-md-6">
                    <select
                        name="grand_mother_age"
                        className="form-control"
                        onChange={(e) => {
                            this.handleGrandMotherAge(e.target.value);
                        }}
                        value={this.props.responses.grand_mother_age}
                        placeholder="Select Age"
                    >
                        {options.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
            <div className="col-md-12 row father-in-law">
                <div className="col-md-6 chkContainer in-law">
                    <div className="checkbox">
                        <label>
                            <input
                                type="checkbox"
                                value="father-in-law"
                                className="chkMembers"
                                defaultChecked={false}
                                // onClick={}
                                id="father-in-law"
                            ></input>

                            <span>Father-in-law</span>
                        </label>
                    </div>
                </div>
                <div className="col-md-6">
                    <select
                        name="father_in_law_age"
                        className="form-control"
                        onChange={(e) => {
                            this.handleFatherInLawAge(e.target.value);
                        }}
                        value={this.props.responses.father_in_law_age}
                        placeholder="Select Age"
                    >
                        {options.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
            <div className="col-md-12 row mother-in-law">
                <div className="col-md-6 chkContainer in-law">
                    <div className="checkbox">
                        <label>
                            <input
                                type="checkbox"
                                value="mother-in-law"
                                className="chkMembers"
                                defaultChecked={false}
                                // onClick={}
                                id="mother-in-law"
                            ></input>

                            <span>Mother-in-law</span>
                        </label>
                    </div>
                </div>
                <div className="col-md-6">
                    <select
                        name="mother_in_law_age"
                        className="form-control"
                        onChange={(e) => {
                            this.handleMotherInLawAge(e.target.value);
                        }}
                        value={this.props.responses.mother_in_law_age}
                        placeholder="Select Age"
                    >
                        {options.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
        </div>
    );
    return othersInput;
}

// handleNumOfPeopleChange(num: any) {
//   console.log(num.target.id);
//   let id = document.getElementById(num.target.id) as HTMLInputElement;
//   this.setState({
//     numOfPersons: num.target.id,
//   });
//}

export const handleNavigation = (e) => {
    let currentPage = this.props.page;
    // console.log("currentPage:", currentPage);
    const targetId = e.target.id;
    // if (
    //   !this.props.responses.phone_num ||
    //   this.props.responses.phone_num.length < 14
    // ) {
    //   message.error("Please enter your phone number");
    //   return;
    // }
    if (targetId === "next") {
        //console.log('this.props.isDesktopView', this.props.isDesktopView);
        if (this.props.isMobileViewModalOpen) {
            if (currentPage == 4) {
                if (this.props.responses.state == "") {
                    message.error("Please provide a location");
                    return;
                } else {
                    this.fetchRecommendedPlans();
                }
            }

        }
        if (currentPage == 3 && this.props.isDesktopView) {
            if (this.props.responses.state == "") {
                message.error("Please provide a location");
                return;
            } else {
                this.fetchRecommendedPlans();
            }
        }

        if (this.props.isDesktopView) {
            currentPage = currentPage + 1;
        }

        if (currentPage >= this.props.maxPage) {

            this.submitResponses();
            return;
        }

        this.changePage("next");
        // console.log('changePage("next")', this.props.page);
    } else if (targetId === "prev") {
        if (currentPage <= this.props.minPage) {
            // console.log("currentPage <= this.props.minPage");
            return;
        }
        this.changePage("prev");
        // console.log('changePage("prev")', this.props.page);
    }
};

export const phoneNumError = () => {
    message.error("Your phone number is required");
};

/**
 * @param {any[]} value
 */
export const handleCheckbox = (value) => {
    this.props.dispatch({ type: actions.UPDATE_PREFS, data: value });
};

export const handleInput = (e) => {
    // console.log(
    //     "e.target.name",
    //     e.target.name,
    //     "e.target.value",
    //     e.target.value
    // );
    this.props.dispatch({
        type: actions.UPDATE_TEXT_RESPONSE,
        data: { key: e.target.name, value: e.target.value },
    });
};

export const handleAdult = (value) => {
    this.props.dispatch({
        type: actions.UPDATE_TEXT_RESPONSE,
        data: { key: "adult", value },
    });

    if (value == 2 && this.props.responses.children == 0) {
        this.props.dispatch({ type: actions.CHANGE_PLAN_TYPE, data: "couple" });
    }
    //console.log(this.props.responses.type);
};

export const handleChildren = (value) => {
    console.log(value);
    this.props.dispatch({
        type: actions.UPDATE_TEXT_RESPONSE,
        data: { key: "children", value },
    });
    if (value == 1 && this.props.responses.adult == 0) {
        this.props.dispatch({
            type: actions.CHANGE_PLAN_TYPE,
            data: "individual",
        });
    } else if (value > 1 && this.props.responses.adult != 0) {
        this.props.dispatch({ type: actions.CHANGE_PLAN_TYPE, data: "family" });
    }
    console.log(value);
    console.log(this.props.responses);
};

export const handleInfants = (value) => {
    this.props.dispatch({
        type: actions.UPDATE_TEXT_RESPONSE,
        data: { key: "infants", value },
    });
    if (value == 1 && this.props.responses.adult == 0) {
        this.props.dispatch({
            type: actions.CHANGE_PLAN_TYPE,
            data: "individual",
        });
    } else if (value > 1 && this.props.responses.adult != 0) {
        this.props.dispatch({ type: actions.CHANGE_PLAN_TYPE, data: "family" });
    }
};

export const updateBudget = (e) => {
    const budget = [0, e.target.value];
    //console.log("updating budget with: " + budget);
    this.props.dispatch({ type: actions.UPDATE_BUDGET, budget });
};

export function submitResponses() {
    let stringResp = JSON.stringify(this.props.responses);

    // console.log("this.props.responses", this.props.responses);
    localStorage.setItem("responses", stringResp);
    this.props.history.push({
        //pathname: "/compare",
        pathname: "/plans",
        data: this.props.responses,
    });
}

export const onSearch = (searchText) => {
    let tempLocations = [];
    this.locations.forEach((item) => {
        const _item = item.toLowerCase();
        if (_item.startsWith(searchText.toLowerCase())) {
            tempLocations.push(item);
        }
    });
    if (tempLocations.length > 0) {
        this.props.dispatch({
            type: actions.FILTER_LOCATIONS,
            data: tempLocations,
        });
    }
};

export const onSelectChange = (value) => {
    this.props.dispatch({
        type: actions.UPDATE_TEXT_RESPONSE,
        data: { key: "state", value },
    });
    // console.log(this.props.responses.state);
};

export const covers = (val) => {
    //console.log(typeof val);
    this.props.dispatch({
        type: actions.UPDATE_COVERS,
        data: { key: "covers", value: val },
    });
    // console.log(this.props.covers);
};

export const updateLocation = (location) => {
    this.props.dispatch({
        type: actions.UPDATE_TEXT_RESPONSE,
        data: { key: "state", value: location },
    });
    // console.log(this.props.responses.state);
};

export function handleDesktopView() {
    // this.setState({
    //   isDesktopView: !this.props.isDesktopView,
    // });
    this.props.dispatch({
        type: actions.TOGGLE_DESKTOP_VIEW,
        data: { key: "isDesktopView", value: false },
    });
}

export function handleSonBoxChecked() {
    this.props.dispatch({
        type: actions.UPDATE_SON_CHECKED,
        data: {
            key: "isSonCheckboxChecked",
            value: !this.props.isSonCheckboxChecked,
        },
    });
}

export function handleDaughterBoxChecked() {
    this.props.dispatch({
        type: actions.UPDATE_DAUGHTER_CHECKED,
        data: {
            key: "isDaughterCheckboxChecked",
            value: !this.props.isDaughterCheckboxChecked,
        },
    });
}

export function incrementSonCount() {
    if (this.props.sonCount < 4 && this.props.sonCount > 0) {
        this.props.dispatch({
            type: actions.INCREMENT_SON_COUNT,
            data: { key: "sonCount", value: this.props.sonCount + 1 },
        });
    }
}

export function decrementSonCount() {
    if (this.props.sonCount > 1) {
        this.props.dispatch({
            type: actions.DECREMENT_SON_COUNT,
            data: { key: "sonCount", value: this.props.sonCount - 1 },
        });
    }
}

export function incrementDaughterCount() {
    if (this.props.daughterCount < 4 && this.props.daughterCount > 0) {
        this.props.dispatch({
            type: actions.INCREMENT_DAUGHTER_COUNT,
            data: { key: "daughterCount", value: this.props.daughterCount + 1 },
        });
    }
}

export function decrementDaughterCount() {
    if (this.props.daughterCount > 1) {
        this.props.dispatch({
            type: actions.DECREMENT_DAUGHTER_COUNT,
            data: { key: "daughterCount", value: this.props.daughterCount - 1 },
        });
    }
}

export function handleChildrenCheckboxes(e) {
    let val = e.target.checked;
    console.log(val);
    // const node = this.sonCheck.current;
    // if (node) {
    //   node.focus();
    // if (val == true) {
    //   console.log('this.sonCheck',this.sonCheck)
    // }
    // }
}

export function goToDetails() {
    this.props.history.push({ pathname: "/details" });
}

export function renderQuizPages() {
    //console.log('d open')

    const page2 = (
        <div id="secondPage">
            <div className="form-group num-div">
                <div className="col-md-12 top-row">
                    <div className="radios num-of-people">
                        <label>
                            <input
                                type="radio"
                                value="single"
                                name="numOfPeople"
                                className="radio-group-num"
                                defaultChecked={this.props.responses.type === "single"}
                                onClick={this.handleType}
                                id="single"
                            ></input>
                            <span className="num-div-inner">
                                <span>
                                    <i className="gender icons-gender male me"></i>
                                </span>
                                <span id="num-text" className="num-text">
                                    Me
                  </span>
                            </span>
                        </label>
                        <label>
                            <input
                                type="radio"
                                id="couple"
                                value="couple"
                                name="numOfPeople"
                                className="radio-group-num"
                                defaultChecked={this.props.responses.type === "couple"}
                                onClick={this.handleType}
                            ></input>
                            <span className="num-div-inner">
                                <span>
                                    <i className="gender icons-gender male couple"></i>
                                </span>
                                <span id="num-text" className="num-text">
                                    Me + My Wife
                  </span>
                            </span>
                        </label>
                        <label>
                            <input
                                id="fam-of-3"
                                type="radio"
                                value="fam-of-3"
                                name="numOfPeople"
                                className="radio-group-num"
                                defaultChecked={this.props.responses.type === "fam-of-3"}
                                onClick={this.handleType}
                            // onClick={(e) =>
                            //   this.handleType("fam-of-3")
                            // }
                            ></input>
                            <span className="num-div-inner">
                                <span>
                                    <i className="gender icons-gender male fam-of-3"></i>
                                </span>
                                <span id="num-text" className="num-text">
                                    Me + My wife & 1 kid
                  </span>
                            </span>
                        </label>
                    </div>
                </div>
                <div className="col-md-12">
                    <div className="radios num-of-people">
                        <label>
                            <input
                                id="fam-of-4"
                                type="radio"
                                value="fam-of-4"
                                name="numOfPeople"
                                defaultChecked={this.props.responses.type === "fam-of-4"}
                                onClick={this.handleType}
                                className="radio-group-num"
                            ></input>
                            <span className="num-div-inner">
                                <span>
                                    <i className="gender icons-gender male fam-of-4"></i>
                                </span>
                                <span id="num-text" className="num-text">
                                    Me + My wife & 2 kids
                  </span>
                            </span>
                        </label>
                        <label>
                            <input
                                id="parents"
                                type="radio"
                                value="parents"
                                name="numOfPeople"
                                defaultChecked={this.props.responses.type === "parents"}
                                onClick={this.handleType}
                                className="radio-group-num"
                            ></input>
                            <span className="num-div-inner">
                                <span>
                                    <i className="gender icons-gender male parents"></i>
                                </span>
                                <span id="num-text" className="num-text">
                                    My Parents
                  </span>
                            </span>
                        </label>
                        <label>
                            <input
                                id="others"
                                type="radio"
                                value="others"
                                name="numOfPeople"
                                className="radio-group-num"
                                defaultChecked={this.props.responses.type === "others"}
                                onClick={(e) => {
                                    this.toggleOthersInput();
                                    this.handleType(e);
                                }}
                            ></input>
                            <span className="num-div-inner">
                                <span>
                                    <i className="gender icons-gender male others"></i>
                                </span>
                                <span id="num-text" className="num-text">
                                    Others
                  </span>
                            </span>
                        </label>
                        <Modal
                            dialogClassName="custom-dialog"
                            className="right"
                            show={this.props.isOthersInputOpen}
                            onHide={this.toggleOthersInput}
                        >
                            <Modal.Header translate="true" closeButton>
                                <div className="others-mtitle">
                                    <p>{this.steps[1].p}</p>
                                    <h3>{this.steps[1].h3}</h3>
                                </div>
                            </Modal.Header>
                            <Modal.Body>{this.showOthersInput()}</Modal.Body>
                        </Modal>
                    </div>
                </div>
            </div>

            <div className="form-group single-age-input" id="single-input">
                <div className="col-md-6">
                    {this.props.responses.type == "single"
                        ? this.showSingleInput()
                        : ""}
                </div>
            </div>

            <div className="form-group couple-input" id="couple-input">
                {this.props.responses.type == "couple" ? this.showCouplesInput() : ""}
            </div>

            <div
                className="form-group fam-of-3-input col-md-12"
                id="fam-of-3-input"
            >
                {this.props.responses.type == "fam-of-3"
                    ? this.showFamOf3Input()
                    : ""}
            </div>

            <div
                className="form-group fam-of-4-input col-md-12"
                id="fam-of-4-input"
            >
                {this.props.responses.type == "fam-of-4"
                    ? this.showFamOf4Input()
                    : ""}
            </div>

            <div className="form-group parents-age" id="parents-age">
                {this.props.responses.type == "parents"
                    ? this.showParentsInput()
                    : ""}
            </div>
        </div>
    );

    const page3 = (
        <div id="thirdPage">
            <div className="col-md-12">
                <Form.Item
                    colon={false}
                    label="City living in"
                    style={{ textAlign: "left" }}
                >
                    <AutoComplete
                        size="large"
                        style={{ width: "100%" }}
                        dataSource={this.props.dataSource}
                        onSearch={this.onSearch}
                        onChange={this.onSelectChange}
                        placeholder="Location (state)"
                        value={this.props.responses.state}
                    />
                </Form.Item>
            </div>
            <div className="row col-md-12 popular-cities">
                <div className="col-md-3">
                    <button
                        className="form-control state-btn"
                        onClick={() => this.updateLocation("Lagos")}
                    >
                        Lagos
            </button>
                </div>
                <div className="col-md-3">
                    <button
                        className="form-control state-btn"
                        onClick={() => this.updateLocation("Abuja")}
                    >
                        Abuja
            </button>
                </div>
                <div className="col-md-3">
                    <button
                        className="form-control state-btn"
                        onClick={() => this.updateLocation("Rivers")}
                    >
                        Rivers
            </button>
                </div>
                <div className="col-md-3">
                    <button
                        className="form-control state-btn"
                        onClick={() => this.updateLocation("Oyo")}
                    >
                        Oyo
            </button>
                </div>
            </div>
        </div>
    );

    if (
        this.props.page === 2
    ) {
        return page2;
    } else if (this.props.page === 3) {
        return page3;
    }

    return <p>Not enough responses collected!</p>;
}

export function renderMobileViewQuizPages() {
    //console.log('m open')
    const page2 = (
        <div id="firstPage">
            <div className="form-group">
                <div className="col-md-12">
                    <label>I am a</label>
                    <div className="radios">
                        <label>
                            <input
                                type="radio"
                                value="m"
                                name="radio-group-gender"
                                defaultChecked={this.defaultGender()}
                                onChange={(e) => {
                                    this.handleGender(e.target.value);
                                }}
                                className="radio-group-gender"
                            ></input>
                            <span>
                                <i className="gender icons-gender male male-icon"></i>

                                <em>Male</em>
                            </span>
                        </label>
                        <label>
                            <input
                                type="radio"
                                value="f"
                                name="radio-group-gender"
                                onChange={(e) => {
                                    this.handleGender(e.target.value);
                                }}
                                className="radio-group-gender"
                            ></input>
                            <span>
                                <i className="gender icons-gender male female-icon"></i>
                                <em>Female</em>
                            </span>
                        </label>
                    </div>
                </div>
            </div>

            <div className="form-group">
                <div className="col-md-12">
                    <label>My name is</label>
                </div>

                <div className="col-md-12">
                    <input
                        className="form-control"
                        onChange={(e) => {
                            this.handleFullName(e.target.value);
                        }}
                        // required={true}
                        value={this.props.responses.full_name}
                        placeholder="Full Name"
                    ></input>
                </div>
            </div>
        </div>
    );

    const page3 = (
        <div id="secondPage">
            <div className="form-group num-div">
                <div className="col-md-12 top-row">
                    <div className="radios num-of-people">
                        <label>
                            <input
                                type="radio"
                                value="single"
                                name="numOfPeople"
                                className="radio-group-num"
                                defaultChecked={this.props.responses.type === "single"}
                                onClick={this.handleType}
                                id="single"
                            ></input>
                            <span className="num-div-inner">
                                <span>
                                    <i className="gender icons-gender male me"></i>
                                </span>
                                <span id="num-text" className="num-text">
                                    Me
                  </span>
                            </span>
                        </label>
                        <label>
                            <input
                                type="radio"
                                id="couple"
                                value="couple"
                                name="numOfPeople"
                                className="radio-group-num"
                                defaultChecked={this.props.responses.type === "couple"}
                                onClick={this.handleType}
                            ></input>
                            <span className="num-div-inner">
                                <span>
                                    <i className="gender icons-gender male couple"></i>
                                </span>
                                <span id="num-text" className="num-text">
                                    Me + My Wife
                  </span>
                            </span>
                        </label>
                        <label>
                            <input
                                id="fam-of-3"
                                type="radio"
                                value="fam-of-3"
                                name="numOfPeople"
                                className="radio-group-num"
                                defaultChecked={this.props.responses.type === "fam-of-3"}
                                onClick={this.handleType}
                            ></input>
                            <span className="num-div-inner">
                                <span>
                                    <i className="gender icons-gender male fam-of-3"></i>
                                </span>
                                <span id="num-text" className="num-text">
                                    Me + My wife & 1 kid
                  </span>
                            </span>
                        </label>
                    </div>
                </div>
                <div className="col-md-12">
                    <div className="radios num-of-people">
                        <label>
                            <input
                                id="fam-of-4"
                                type="radio"
                                value="fam-of-4"
                                name="numOfPeople"
                                defaultChecked={this.props.responses.type === "fam-of-4"}
                                onClick={this.handleType}
                                className="radio-group-num"
                            ></input>
                            <span className="num-div-inner">
                                <span>
                                    <i className="gender icons-gender male fam-of-4"></i>
                                </span>
                                <span id="num-text" className="num-text">
                                    Me + My wife & 2 kids
                  </span>
                            </span>
                        </label>
                        <label>
                            <input
                                id="parents"
                                type="radio"
                                value="parents"
                                name="numOfPeople"
                                defaultChecked={this.props.responses.type === "parents"}
                                onClick={this.handleType}
                                className="radio-group-num"
                            ></input>
                            <span className="num-div-inner">
                                <span>
                                    <i className="gender icons-gender male parents"></i>
                                </span>
                                <span id="num-text" className="num-text">
                                    My Parents
                  </span>
                            </span>
                        </label>
                        <label>
                            <input
                                id="others"
                                type="radio"
                                value="others"
                                name="numOfPeople"
                                className="radio-group-num"
                                defaultChecked={this.props.responses.type === "others"}
                                onClick={this.toggleOthersInput}
                            ></input>
                            <span className="num-div-inner">
                                <span>
                                    <i className="gender icons-gender male others"></i>
                                </span>
                                <span id="num-text" className="num-text">
                                    Others
                  </span>
                            </span>
                        </label>
                        <Modal
                            dialogClassName="custom-dialog"
                            className="right"
                            show={this.props.isOthersInputOpen}
                            onHide={this.toggleOthersInput}
                        >
                            <Modal.Header translate="true" closeButton>
                                <div className="others-mtitle">
                                    <p>{this.steps[1].p}</p>
                                    <h3>{this.steps[1].h3}</h3>
                                </div>
                            </Modal.Header>
                            <Modal.Body>
                                {this.showOthersInput()}
                                {/* <div className="form-group">
                    <div className="col-md-6">
                      {this.props.page != 1 ? (
                        <button
                          className="btn btn-primary btn-large view-plans btn-demo"
                          onClick={this.handleNavigation}
                          id="prev"
                        >
                          Previous
                        </button>
                      ) : (
                        ""
                      )}
                    </div>
                    <div className="col-md-6">
                      <button
                        className="btn btn-primary btn-large others-btn-cont view-plans btn-demo"
                        onClick={this.handleNavigation}
                        id="next"
                      >
                        Continue
                      </button>
                    </div>
                  </div> */}
                            </Modal.Body>
                        </Modal>
                    </div>
                </div>
            </div>

            <div className="form-group single-age-input" id="single-input">
                <div className="col-md-6">
                    {this.props.responses.type == "single"
                        ? this.showSingleInput()
                        : ""}
                </div>
            </div>

            <div className="form-group couple-input" id="couple-input">
                {this.props.responses.type == "couple" ? this.showCouplesInput() : ""}
            </div>

            <div
                className="form-group fam-of-3-input col-md-12"
                id="fam-of-3-input"
            >
                {this.props.responses.type == "fam-of-3"
                    ? this.showFamOf3Input()
                    : ""}
            </div>

            <div
                className="form-group fam-of-4-input col-md-12"
                id="fam-of-4-input"
            >
                {this.props.responses.type == "fam-of-4"
                    ? this.showFamOf4Input()
                    : ""}
            </div>

            <div className="form-group parents-age" id="parents-age">
                {this.props.responses.type == "parents"
                    ? this.showParentsInput()
                    : ""}
            </div>
        </div>
    );

    const page4 = (
        <div id="thirdPage">
            <div className="col-md-12">
                <Form.Item
                    colon={false}
                    label="City living in"
                    style={{ textAlign: "left" }}
                >
                    <AutoComplete
                        size="large"
                        style={{ width: "100%" }}
                        dataSource={this.props.dataSource}
                        onSearch={this.onSearch}
                        onChange={this.onSelectChange}
                        value={this.props.responses.state}
                        placeholder="Location (state)"
                    />
                </Form.Item>
            </div>
            <div className="row col-md-12">
                <div className="col-md-3">
                    <button
                        className="form-control state-btn"
                        onClick={() => this.updateLocation("Lagos")}
                    >
                        Lagos
            </button>
                </div>
                <div className="col-md-3">
                    <button
                        className="form-control state-btn"
                        onClick={() => this.updateLocation("Abuja")}
                    >
                        Abuja
            </button>
                </div>
                <div className="col-md-3">
                    <button
                        className="form-control state-btn"
                        onClick={() => this.updateLocation("Rivers")}
                    >
                        Rivers
            </button>
                </div>
                <div className="col-md-3">
                    <button
                        className="form-control state-btn"
                        onClick={() => this.updateLocation("Oyo")}
                    >
                        Oyo
            </button>
                </div>
            </div>
        </div>
    );
    //console.log("this.props.page", this.props.page);
    /*if (this.props.page === 0) {
      return page2;
    }
    else*/ if (
        this.props.page === 2
        //|| this.props.page === 1
    ) {
        //console.log("page2");
        return page2;
    } else if (this.props.page === 3) {
        //console.log("page3");
        return page3;
    } else if (this.props.page === 4) {
        console.log("page4");
        return page4;
    }
    //console.log("this.props.page before return", this.props.page);
    return <p>Not enough responses collected!</p>;
}

export const numberwithCommas = (value) => {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export const getClickedPlan = (index) => {
    // console.log("index", index);
    this.props.dispatch({
        type: actions.GET_CLICKED_PLAN,
        data: this.props.plans[index],
        //data: this.props.recommended_plans[index],
    });
};

export const onClickProvider = (hmoIndex) => {
    // console.log("hmoIndex", hmoIndex);
    let data = this.props.hmos.filter((hmo, i) => i == hmoIndex);
    //  console.log("data[0]", data[0]);
    //this.providerInfo(data[0]);

    this.setState({
        show_provider_info: true,
        provider_info: data[0],
    });
};

async export function providerInfo(data) {
    const hmoPlans = await this.props.plans.filter(
        (plan) => plan.hmo_id.name.id == data.name.id
    );

    this.setState({
        provider_plans: hmoPlans,
    });

    let hospitals = data.provider_id ? JSON.parse(data.provider_id).length : 0;
    console.log("hospitals", hospitals);

    //const cheapestPrice = hmoPlans
    console.log("hmoPlans", hmoPlans);

    return {
        hmoPlans,
        hospitals,
    };
}