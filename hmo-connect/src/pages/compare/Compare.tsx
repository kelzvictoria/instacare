import React, { Component } from "react";
/*import { API_URL } from "../../config";*/
import styles from "./Compare.module.scss";
import { connect } from "react-redux";
import {Link} from "react-router-dom";
import * as actions from "../../utils/actions";
import numeral from "numeral";
import {
    Card,
    Col,
    Row,
    Icon,
    Checkbox,
    Radio,
    Slider,
    Spin,
    Skeleton,
    Button,
    Divider,
    Typography,
    Empty,
    InputNumber,
    Collapse
} from "antd";
import { formatAsCurrency, NAIRA_SIGN } from "../../utils";
import { Plan } from "../../interfaces/Plan";


const { Title } = Typography;
const { Panel } = Collapse;
let responses:any;
const API_URL = "https://dev-hmo-compare-api.herokuapp.com"
interface QuizProps {
    [x: string]: any;
    dispatch(args: any): any;
    page: number;
    minPage: number;
    maxPage: number;
    checked: string[];
    didRequestReturnEmptyResult: boolean;
    responses: {
        [x: string]: any;
        budget: number;
        type: string;
        firstName: string;
        lastName: string;
        region: string;
        services: any;
    },
    plans: Plan[];
    bestPlan: Plan;
    cheapestPlan: Plan;
    sort: {
        mode: string;
        icon: string
        description: string;
    }
    fetching:boolean
}

class Compare extends Component<QuizProps> {


    state = {
       toggleBar : false
    }


    basicPlanOptions = [
        {
            label: "Malaria Care",
            value: "malaria",

        }, {
            label: "Typhoid Care",
            value: "typhoid"
        }, {
            label: "Consultations",
            value: "consultations"
        },
        {
            label: "Pharmacy",
            value: "pharmacy"
        }
    ];

    planOptions = [
        {
            label: "Dental care",
            value: "dentalOptions",

        }, {
            label: "Optical care",
            value: "opticalOptions"
        }, {
            label: "Immunizations",
            value: "immunizations"
        }, {
            label: "Cancer care",
            value: "cancerCare"
        }, {
            label: "Diagnostics",
            value: "diagnostics"
        }, {
            label: "Physiotherapy",
            value: "physiotherapy"
        },{
            label:"Maternity",
            value:"natalCare"
        },
        
        {
            label:"Psychiatric care",
            value:"psychiatricTreatment"
        },
        {
            label:"Mortuary Care",
            value:"mortuaryServices"
        },
        {
            label:"Family-Planning",
            value:"familyPlanningServices"
        },
    ];
    planTypes = [
        {
            label: "Individual",
            value: "individual"
        },
        {
            label: "Family",
            value: "family"
        },
        {
            label: "Couples",
            value: "couple"
        },
        {
            label: "All",
            value: ""
        },
    ];

    
    marks = {
        300000: formatAsCurrency(300000),
        1500000: formatAsCurrency(1500000),
        3000000: formatAsCurrency(3000000)
    };
    formatBudget = (val: number) => {
        if(val<1000000){
       val = Math.round(val/1000);
       return val
        }else{
       val =  parseFloat((val/1000000).toFixed(2))
       return val
        }
    }
       
    minBudget:any = this.formatBudget(300000);
    maxBudget:any = this.formatBudget(3000000);
    popularIndex = 0;
    usePreviousSearch = false;
    timeout: any;
    k = "K"
    m="M"
    minbudgett 
    maxbudgett = this.props.responses.budget[1]
    eventHandlers = {
        handleAdult: (value:any) => {
            clearTimeout(this.timeout);
            // this.props.responses.type = e.target.value;
            this.props.dispatch({type: actions.UPDATE_TEXT_RESPONSE, data: {key:"adult", value}});
            if(value==1 && this.props.responses.children==0 && this.props.responses.infants==0){
                this.props.dispatch({type: actions.CHANGE_PLAN_TYPE, data:"individual"})
            }
            else if(value==0 && this.props.responses.children==1 && this.props.responses.infants==0){
                this.props.dispatch({type: actions.CHANGE_PLAN_TYPE, data:"individual"})
            }
            else if(value==0 && this.props.responses.children==0 && this.props.responses.infants==1){
                this.props.dispatch({type: actions.CHANGE_PLAN_TYPE, data:"individual"}) 
            }
            else if(value==0 && this.props.responses.children>1){
                this.props.dispatch({type: actions.CHANGE_PLAN_TYPE, data:"family"})
            }
            else if(value==0 && this.props.responses.infants>1){
                this.props.dispatch({type: actions.CHANGE_PLAN_TYPE, data:"family"})
            }
            else if(value==2 && (this.props.responses.children==0 && this.props.responses.infants==0)){
                this.props.dispatch({type: actions.CHANGE_PLAN_TYPE, data:"couple"})
              }
            else if(value>2){
                this.props.dispatch({type: actions.CHANGE_PLAN_TYPE, data:"family"})

            }else if(value>=1 && this.props.responses.children> 0){
                this.props.dispatch({type: actions.CHANGE_PLAN_TYPE, data:"family"})
            }
            else if(value>=1 && this.props.responses.infants> 0){
                this.props.dispatch({type: actions.CHANGE_PLAN_TYPE, data:"family"})
            }

              
            this.timeout = setTimeout(() => {
                this.fetchData("recommend", this.props.responses);
            },2000);
        },
        handleChildren: (value:any) => {
            clearTimeout(this.timeout);
            // this.props.responses.type = e.target.value;
            this.props.dispatch({type: actions.UPDATE_TEXT_RESPONSE, data: {key:"children", value}});
            if(value==1 && this.props.responses.adult==0 &&this.props.responses.infants==0){
                this.props.dispatch({type: actions.CHANGE_PLAN_TYPE, data:"individual"})
            }else if(value>=1 && this.props.responses.adult!=0){ 
               this.props.dispatch({type: actions.CHANGE_PLAN_TYPE, data:"family"})
            }else if(value>=1 && this.props.responses.infants!=0){ 
                this.props.dispatch({type: actions.CHANGE_PLAN_TYPE, data:"family"})
             }
            
            else if(value==0 && this.props.responses.adult==2){
                this.props.dispatch({type: actions.CHANGE_PLAN_TYPE, data:"couple"})
            }
            else if(value==0 && this.props.responses.adult==1){
                this.props.dispatch({type: actions.CHANGE_PLAN_TYPE, data:"individual"}) 
            }
 
            this.timeout = setTimeout(() => {
                this.fetchData("recommend", this.props.responses);
            },2000);
        },

        handleInfants: (value) => {
            clearTimeout(this.timeout);
            // this.props.responses.type = e.target.value;
            this.props.dispatch({type: actions.UPDATE_TEXT_RESPONSE, data: {key:"infants", value}});
            if(value==1 && this.props.responses.adult==0){
                this.props.dispatch({type: actions.CHANGE_PLAN_TYPE, data:"individual"})
            }else if(value>=1 && this.props.responses.adult!=0){
              
               this.props.dispatch({type: actions.CHANGE_PLAN_TYPE, data:"family"})
    
            }else if(value==0 && this.props.responses.adult==2){
                this.props.dispatch({type: actions.CHANGE_PLAN_TYPE, data:"couple"})
            }else if(value>=1 && this.props.responses.children>=1){
                this.props.dispatch({type: actions.CHANGE_PLAN_TYPE, data:"family"})
            }
 
            this.timeout = setTimeout(() => {
                this.fetchData("recommend", this.props.responses);
            },2000);
        },
        
        handleCheckbox: (value: any[]) => {
            clearTimeout(this.timeout);
            this.props.dispatch({ type: actions.RESET_PLANS, data: true });
            this.props.dispatch({ type: actions.UPDATE_PREFS, data: value });
            this.timeout = setTimeout(() => {
                this.fetchData("recommend", this.props.responses);
               
            }, 2000);
           
        },
        changeBudget: async (value: any) => {
            this.minBudget = this.formatBudget(value[0]);
            this.maxBudget = this.formatBudget(value[1]);
            this.changek(this.minBudget,this.maxBudget)
            this.props.dispatch({ type: actions.RESET_PLANS, data: true })
            this.props.dispatch({ type: actions.UPDATE_BUDGET, budget: value });
            this.eventHandlers.handleCheckbox(this.props.checked)
           /* await this.fetchData("recommend", this.props.responses);*/
          
        }
    }

    formatter (value:number) {
        return formatAsCurrency(value);
    }

    sortPlansByPrice = (plans: Plan[], mode = "desc") => {
        if (mode === "desc") {
            return plans.sort((a, b) => a.price - b.price);
        }
        return plans.sort((a, b) => b.price - a.price);
    }

    getBestPlan = () => {
        const _plans = this.props.plans.slice();
        const bestPlan = _plans.sort((a, b) => b.matches - a.matches)[0];
        this.props.dispatch({
            type: actions.UPDATE_BEST_PLAN,
            data: bestPlan,
        });
    }

    
    updateSortOrder = (mode = "desc") => {
        let plans = this.props.plans.slice();
        if (mode === "desc") {
            plans = this.sortPlansByPrice(plans, "asc");
            this.props.dispatch({ type: actions.UPDATE_SORT_ORDER, data: {
                mode: "asc",
                icon: "sort-descending",
                description: "Sort by price (cheapest first)"
            }});
        } else if (mode === "asc") {
            plans = this.sortPlansByPrice(plans, "desc");
            this.props.dispatch({ type: actions.UPDATE_SORT_ORDER, data: {
                mode: "desc",
                icon: "sort-ascending",
                description: "Sort by price (most expensive first)"
            }});
        }
        this.props.dispatch({ type: actions.UPDATE_PLANS, data: plans });
    }

    goToDetails(item: any) {
        if(item){
            console.log(item)
            localStorage.setItem("details",JSON.stringify(item))
            this.props.history.push({ pathname: "/details", data: item });
        }
    }
 changek(minBudget, maxBudget){
     if(minBudget<4){
         this.minbudgett = this.minBudget + this.m
     }
     if(minBudget > 4){
         this.minbudgett= this.minBudget + this.k
     }
     if(maxBudget < 4){
         this.maxbudgett = this.maxBudget + this.m
     }
     if(maxBudget > 4){
       this.maxbudgett =this.maxBudget + this.k
     }
 }
    
    
    async fetchData(path:any, params:any) {
      
        const res = await fetch(`${API_URL}/plans/${path}`, {
            headers: {
                "Content-Type": "application/json",
                
            },
            
            method: "POST",
            body: JSON.stringify(params)
        });
        if (res) {
            let asJson = await res.json();
            if (!asJson.data || asJson.data.length === 0) {
                this.props.dispatch({ type: actions.UPDATE_PLANS, data: [] });
               
                return;
                
            }
            console.log(asJson.data)
            this.props.dispatch({ type: actions.RESET_PLANS, data: false });
            asJson = this.sortPlansByPrice(asJson.data, "desc");
            this.popularIndex = Math.round(Math.random() * 4);
            this.popularIndex = (this.popularIndex < asJson.length) ? this.popularIndex : 0;
            this.props.dispatch({type: actions.UPDATE_PLANS, data: asJson});
            this.props.dispatch({
                type: actions.UPDATE_CHEAPEST_PLAN,
                data: this.sortPlansByPrice(asJson)[0],
            });
            this.props.dispatch({
                type: actions.UPDATE_MOSTEXPENSIVE_PLAN,
                data: this.sortPlansByPrice(asJson)[asJson.length - 1],
            });
            this.getBestPlan();
        }
    }

    componentDidMount() {
        if (!this.usePreviousSearch) {
            responses = localStorage.getItem("responses")
            this.props.dispatch({type:actions.RESET_RESPONSES, data:JSON.parse(responses)})
            fetch(`${API_URL}/plans/recommend`, {
                method: "POST",
                headers : {
                    "Content-Type":"application/json"
                },
                
                body:responses
            })
                .then((res) => res.json())
                .then((data) => {
                    if (data.data.length === 0) {
                        this.props.dispatch({ type: actions.UPDATE_PLANS, data: [] });
                        return;
                    }
                   
                    this.popularIndex = Math.round(Math.random() * 4);
                    data = this.sortPlansByPrice(data.data);
                    this.popularIndex = (this.popularIndex < data.length) ? this.popularIndex : 0;
                    this.props.dispatch({type: actions.UPDATE_PLANS, data});
                    this.getBestPlan();
                    this.props.dispatch({
                        type: actions.UPDATE_CHEAPEST_PLAN,
                        data: this.sortPlansByPrice(data)[0],
                    });
                    this.props.dispatch({
                        type: actions.UPDATE_MOSTEXPENSIVE_PLAN,
                        data: this.sortPlansByPrice(data)[data.length - 1],
                    })
                }).catch((err)=>console.log(err));
        }
    }

    callb = (key)=> {
        console.log(key);
      }
    
    callb2 = (key) => {
        console.log(key)
    }

    toggle = () =>  {
        this.setState({toggleBar:!this.state.toggleBar})
        console.log(this.state.toggleBar)
    }
      
    render() {
        return (


            

            <div id={styles.wrapper}>
                {/*<Row>*/}
                
               

                <div id={styles.sideBar} className={styles.sideBar} style={{backgroundColor:"#FFFFFF"}}>
                        
                      
                        <div className={styles.logo}>
                          <Link to="/">
                              <img src="images/logo2.png" width="70%" height="auto" alt="Logo" />
                              <div className={styles.connect}>
                                hmo connect
                            </div>
                          
                          </Link>
                        </div> 
                           { /*<h3>Filter Plans</h3>*/}
                           <div id={styles.filterBtn}>
                            {(this.state.toggleBar == true)?
                            <Button type="ghost"  onClick={this.toggle}>Hide filters</Button>
                            :
                            <Button type="ghost"  onClick={this.toggle}>Show filters</Button>
                        }
                        </div> 
                      

                      <div className={styles.bigScreenSidebar}> 
                        <div className={styles.optionsGroup}>
                            <p className={styles.sideBarHeadings}>No of People</p>
                            {/*<Radio.Group options={this.planTypes} onChange={this.eventHandlers.handleRadio} value={this.props.responses.type} />*/}
                            <Row>
                                <Col xs={8} md={24}  className={styles.inputLabels}>
                                   <Row>
                                       <Col md={12}>
                                           Adults 
                                       </Col>
                                       <Col md={12} className={styles.peopleBoxes}>
                                            <InputNumber min={0} max={1000} defaultValue={this.props.responses.adult}  onChange={this.eventHandlers.handleAdult} />
                                       </Col>
                                   </Row> 
                                </Col>
                                <Col xs={8} md={24} className={styles.inputLabels}>
                                    <Row>
                                        <Col md={12} >
                                            Children
                                        </Col>
                                        <Col md={12} className={styles.peopleBoxes}>
                                            <InputNumber min={0} max={1000} defaultValue={this.props.responses.children} onChange={this.eventHandlers.handleChildren}/>
                                         </Col>
                                   </Row>
                                </Col>

                                <Col xs={8} md={24} className={styles.inputLabels}>
                                    <Row>
                                        <Col md={12}> 
                                            Infants
                                        </Col>
                                        <Col md={12}>
                                            <InputNumber min={0} max={1000} defaultValue={this.props.responses.children} onChange={this.eventHandlers.handleInfants} name="infants"/>
                                        </Col>
                                    </Row>
                                   
                                </Col>
                               
                               </Row>
                        </div>
                        <div className={styles.optionsGroup} >
                        <Collapse defaultActiveKey={['1']} onChange={this.callb}>
                            <Panel header="Basic features" key="1">
                               {/* <p className={styles.sideBarHeadings}>Basic Features</p>*/}
                                <Checkbox.Group  className={styles.smallScreenCheckbox}options={this.basicPlanOptions} value={["malaria","typhoid","consultations","pharmacy"]}style={{display:"grid",gridGap:"5px", gridTemplateColumns: "repeat(2, minmax(100px, 200px))"}} disabled/>

                                <Checkbox.Group className={styles.bigScreenCheckbox}options={this.basicPlanOptions} value={["malaria","typhoid","consultations","pharmacy"]} disabled/>
                            </Panel>

                       </Collapse>
                        </div>


                        <div className={styles.optionsGroup} >
                           <Collapse defaultActiveKey={['1']} onChange={this.callb2}>
                                <Panel header="Additional features" key="2">
                                    {/*<p className={styles.sideBarHeadings}>Additional Features</p>*/}
                                    <Checkbox.Group  className={styles.smallScreenCheckbox} options={this.planOptions} onChange={this.eventHandlers.handleCheckbox} value={this.props.checked}style={{display:"grid",gridGap:"5px", gridTemplateColumns: "repeat(2, minmax(100px, 200px))",}} />
                                    <Checkbox.Group  className={styles.bigScreenCheckbox} options={this.planOptions} onChange={this.eventHandlers.handleCheckbox} value={this.props.checked}/>
                                </Panel>
                           </Collapse>
                        </div>
                             
                            <div className={styles.optionsGroup}>
                        
                            <p className={styles.sideBarHeadings}>
                            
                               Total Benefit Limit <span>({this.minbudgett}, {this.maxbudgett})</span>
                            </p>
                            <Slider style={{width:"80%", margin: "0px auto"}} marks={this.marks} range tipFormatter={this.formatter} min={300000} max={3000000} onAfterChange={this.eventHandlers.changeBudget} defaultValue={this.props.responses.budget}/>
                        </div>

                </div>

                {this.state.toggleBar==true?
                <div className={styles.smallScreenSidebar}> 
                        <div className={styles.optionsGroup}>
                            <p className={styles.sideBarHeadings}>No of People</p>
                            {/*<Radio.Group options={this.planTypes} onChange={this.eventHandlers.handleRadio} value={this.props.responses.type} />*/}
                            <Row>
                                <Col xs={8} md={24}  className={styles.inputLabels}>
                                   <Row>
                                       <Col md={12}>
                                           Adults 
                                       </Col>
                                       <Col md={12} className={styles.peopleBoxes}>
                                            <InputNumber min={0} max={1000} defaultValue={this.props.responses.adult}  onChange={this.eventHandlers.handleAdult} />
                                       </Col>
                                   </Row> 
                                </Col>
                                <Col xs={8} md={24} className={styles.inputLabels}>
                                    <Row>
                                        <Col md={12} >
                                            Children
                                        </Col>
                                        <Col md={12} className={styles.peopleBoxes}>
                                            <InputNumber min={0} max={1000} defaultValue={this.props.responses.children} onChange={this.eventHandlers.handleChildren}/>
                                         </Col>
                                   </Row>
                                </Col>

                                <Col xs={8} md={24} className={styles.inputLabels}>
                                    <Row>
                                        <Col md={12}> 
                                            Infants
                                        </Col>
                                        <Col md={12}>
                                            <InputNumber min={0} max={1000} defaultValue={this.props.responses.children} onChange={this.eventHandlers.handleInfants} name="infants"/>
                                        </Col>
                                    </Row>
                                   
                                </Col>
                               
                               </Row>
                        </div>
                        <div className={styles.optionsGroup} >
                        <Collapse defaultActiveKey={['1']} onChange={this.callb}>
                            <Panel header="Basic features" key="1">
                               {/* <p className={styles.sideBarHeadings}>Basic Features</p>*/}
                                <Checkbox.Group  className={styles.smallScreenCheckbox}options={this.basicPlanOptions} value={["malaria","typhoid","consultations","pharmacy"]}style={{display:"grid",gridGap:"5px", gridTemplateColumns: "repeat(2, minmax(100px, 200px))"}} disabled/>

                                <Checkbox.Group className={styles.bigScreenCheckbox}options={this.basicPlanOptions} value={["malaria","typhoid","consultations","pharmacy"]} disabled/>
                            </Panel>

                       </Collapse>
                        </div>


                        <div className={styles.optionsGroup} >
                           <Collapse defaultActiveKey={['1']} onChange={this.callb2}>
                                <Panel header="Additional features" key="2">
                                    {/*<p className={styles.sideBarHeadings}>Additional Features</p>*/}
                                    <Checkbox.Group  className={styles.smallScreenCheckbox} options={this.planOptions} onChange={this.eventHandlers.handleCheckbox} value={this.props.checked}style={{display:"grid",gridGap:"5px", gridTemplateColumns: "repeat(2, minmax(100px, 200px))",}} />
                                    <Checkbox.Group  className={styles.bigScreenCheckbox} options={this.planOptions} onChange={this.eventHandlers.handleCheckbox} value={this.props.checked}/>
                                </Panel>
                           </Collapse>
                        </div>
                             
                            <div className={styles.optionsGroup}>
                        
                            <p className={styles.sideBarHeadings}>
                            
                               Total Benefit Limit <span>({this.minbudgett}, {this.maxbudgett})</span>
                            </p>
                            <Slider style={{width:"80%", margin: "0px auto"}} marks={this.marks} range tipFormatter={this.formatter} min={300000} max={3000000} onAfterChange={this.eventHandlers.changeBudget} defaultValue={this.props.responses.budget}/>
                        </div>

                </div> 
                :console.log("untoggled")}
            </div>
                    
                    
                    
            <div id={styles.main} className={styles.displayOptions} style={{marginTop:"2.5em"}}>

                    <div>
                            <Row>
                                <Col xs={24} md={8} className={styles.cardColumn}>

                                    <Card className={styles.customCard} style={{height:"100%"}} title="Sponsored" headStyle={{ background: "#1A7749", color: "#ffffff" }} onClick={() => {
                                        if (!this.props.didRequestReturnEmptyResult) {
                                            this.goToDetails(this.props.plans[this.popularIndex]);
                                        }}}>
                                        {(this.props.plans.length > 0 && !this.props.didRequestReturnEmptyResult)
                                            ?
                                            <div>
                                                <Title level={4}><Title level={4}><div style={{width:"200px"}}><img className={styles.responsive + " " + styles.planImage2} src={this.props.plans[this.popularIndex].imageUrl}></img></div></Title></Title>
                                                <ul style={{paddingTop:"10px", fontSize:"0.9rem", paddingLeft: "0px", listStyle: "none"}} >
                                                    <li>
                                                        <sup style={{fontSize:"1.25rem", verticalAlign:"top", position:"relative",top:"auto",lineHeight:"100%",color:"#1A7749"}}>{NAIRA_SIGN}
                                                        </sup>
                                                        <span style={{fontWeight:"normal", fontSize:"3rem", color:"#1A7749",lineHeight:"100%", textAlign:"center"}}>
                                                        {numeral(this.props.plans[this.popularIndex].price).format("0,0")}
                                                        </span>
                                                    </li>
                                                    {/*<li><p className={styles.subtitle}>Benefits of this plan are only available for {this.props.cheapestPlan.covers}</p></li>*/}
                                                </ul>
                                            </div>
                                            :
                                            (this.props.didRequestReturnEmptyResult)
                                                ?
                                                <Empty />
                                                :
                                                <Skeleton />
                                        }
                                    </Card>

                                </Col>
                                <Col xs={24} md={8} className={styles.cardColumn}>
                                    <Card className={styles.customCard} style={{ height: "100%"}}  title="Least Expensive" headStyle={{background: "#EEEEEE", color: "#00000"}} onClick={() => {
                                        if (this.props.cheapestPlan.price) {
                                            this.goToDetails(this.props.cheapestPlan);
                                        }
                                    }}>
                                        {(this.props.cheapestPlan.price > 0 && !this.props.didRequestReturnEmptyResult)
                                            ?
                                            <div>
                                                <Title level={4}><div style={{width:"200px"}}><img className={styles.responsive + " " + styles.planImage2} src={this.props.cheapestPlan.imageUrl}></img></div></Title>
                                                <ul style={{ paddingTop: "10px", fontSize: "0.9rem", paddingLeft: "0px", listStyle: "none" }} >
                                                    <li>
                                                        <sup style={{fontSize:"1.25rem", verticalAlign:"top", position:"relative",top:"auto",lineHeight:"100%",color:"#1A7749"}}>{NAIRA_SIGN}
                                                        </sup>
                                                        <span style={{fontWeight:"normal", fontSize:"3rem", color:"#1A7749",lineHeight:"100%", textAlign:"center"}}>
                                                        {numeral(this.props.cheapestPlan.price).format("0,0")}
                                                        </span>
                                                    </li>
                                                   {/* <li><p className={styles.subtitle}>Benefits of this plan are only available for {this.props.bestPlan.covers}</p></li>*/}
                                                </ul>
                                            </div>
                                            :
                                            (this.props.didRequestReturnEmptyResult)
                                                ?
                                                <Empty />
                                                :
                                                <Skeleton />
                                        }
                                    </Card>
                                </Col>
                                <Col xs={24} md={8} className={styles.cardColumn}>
                                    <Card className={styles.customCard} title="Most Expensive" style={{height:"100%"}}headStyle={{background: "#EEEEEE", color: "#000000"}} onClick={() => {
                                        if (this.props.mostExpensivePlan.price) {
                                            this.goToDetails(this.props.mostExpensivePlan);
                                        }
                                    }}>
                                        {
                                            (this.props.plans
                                                && this.popularIndex < this.props.plans.length
                                                && !this.props.didRequestReturnEmptyResult
                                            )
                                                ?
                                                <div>
                                                    <Title level={4}><div style={{width:"200px"}}><img className={styles.responsive + " " + styles.planImage2} src={this.props.mostExpensivePlan.imageUrl}></img></div></Title>
                                                    <ul style={{ paddingTop: "10px", fontSize: "0.9rem", paddingLeft: "0px", listStyle: "none" }} >
                                                        <li>
                                                            <sup style={{fontSize:"1.25rem", verticalAlign:"top", position:"relative",top:"auto",lineHeight:"100%",color:"#1A7749"}}>{NAIRA_SIGN}
                                                            </sup>
                                                            <span style={{fontWeight:"normal", fontSize:"3rem", color:"#1A7749",lineHeight:"100%", textAlign:"center"}}>
                                                            {numeral(this.props.mostExpensivePlan.price).format("0,0")}
                                                            </span>
                                                        </li>
                                                       {/* <li><p className={styles.subtitle}>Benefits of this plan are only available for {this.props.plans[this.popularIndex].covers}</p></li>*/}
                                                    </ul>
                                                </div>
                                                :
                                                (this.props.didRequestReturnEmptyResult)
                                                    ?
                                                    <Empty />
                                                    :
                                                    <Skeleton />
                                        }
                                    </Card>
                                </Col>
                            </Row>
                        </div>
                      <Row>
                            {/* <Col xs={24} md={12} style={{textAlign: "left"}}>
                             {(this.props.fetching==true)? <p id={styles.pageHeading}>Finding plans...</p>:(this.props.plans.length > 0 )? <p id={styles.pageHeading}>We found <span style={{color:"#38A169"}}>
                            {this.props.plans.length} plans</span> based on your search</p>: this.props.didRequestReturnEmptyResult? <p id={styles.pageHeading}>No matching plans</p>:<p id={styles.pageHeading}>Finding plans...</p>}
                            </Col>
                            <Col xs={24} md={12} style={{textAlign: "right"}}>
                                <div className={styles.sortRow}>
                                    <Button style={{minWidth:"100%"}} type="default" size="large" onClick={() => this.updateSortOrder(this.props.sort.mode)}>
                                        <span>{this.props.sort.description} </span>
                                        <Divider type="vertical" />
                                        <Icon type={this.props.sort.icon} />
                                    </Button>
                                </div>
                      </Col>*/}
                            {
                                   (this.props.fetching==true)?
                                   <Col xs={24} className={styles.example}>
                                   <Spin />
                                   </Col>
                                   :
                                    (this.props.plans.length < 1)
                                    ?
                                    (this.props.didRequestReturnEmptyResult)
                                        ?
                                        <Col xs={24} className={styles.example}>
                                            <Empty />
                                        </Col>
                                     
                                        :
                                        <Col xs={24} className={styles.example}>
                                            <Spin />
                                        </Col>
                                    :

                                    this.props.plans.map((item:any, i:number) => {
                                        return <Col key={i} className={styles.planRow} id={"card-" + i} xs={24} md={24} lg={24}>
                                            <Card>
                                                <Row >
                                                    <Col md={6} className={styles.cardProperties}>
                                                        <img className={styles.responsive + " " + styles.planImage} src={item.imageUrl} alt="" />
                                                        {/*<p style={{fontSize:"0.8rem", width:"100%", paddingTop:"10px"}}>{item.name}</p>*/}
                                                    </Col>
                                                    <Row>
                                                        <Col md={8}>
                                                            <div className={styles.cardProperties}>
                                                                <sup style={{fontSize:"1.25rem", verticalAlign:"top",position:"relative",top:"auto",lineHeight:"100%",color:"#1A7749"}}>
                                                                {NAIRA_SIGN}</sup>

                                                                <span style={{fontWeight:"normal", fontSize:"3rem", color:"#1A7749",lineHeight:"100%", textAlign:"center"}}>
                                                                {numeral(item.price).format("0,0")}
                                                                </span>

                                                            </div>
                                                        </Col>

                                                      

                                                        <Col md={4} className={styles.cardPropertiesCovers}>
                                                            <Icon type="user" className={styles.istyle}/> 
                                                            <p><span style={{fontSize:"0.8rem"}}>Covers: {item.covers}</span></p>
                                                        </Col>



                                                        <div style={{textAlign:"right"}}>

                                                            <img onClick={() => this.goToDetails(item)} src="../images/arrow-right.svg" style={{height:"60px"}}>
                                                            </img>

                                                        </div>
                                                    </Row>
                                                </Row>
                                            </Card>
                                        </Col>;
                                    })
                            }
                        </Row>
                    </div>
               {/*} </Row>*/}
            </div>
        );
    }
}

/*export default Compare;*/
const mapProps = (state: any) => {
    return {
        ...state.quiz.quiz,
        ...state.quiz.compare
    };
};

export default connect(mapProps)(Compare);
