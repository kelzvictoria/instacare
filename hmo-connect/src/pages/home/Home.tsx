import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Button, Icon, Row, Col, Steps, message } from "antd";
import {
  faHome,
  faMale,
  faFemale,
  faArrowLeft,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AppHeader from "../../components/app-header/AppHeader";
import styles from "./Home.module.scss";
import "../../custom.css";
import Modal from "react-bootstrap/Modal";

import { connect } from "react-redux";
import * as actions from "../../utils/actions";

const { Step } = Steps;

interface QuizProps {
  [x: string]: any;
  dispatch(args: any): any;
  page: number;
  minPage: number;
  maxPage: number;
  checked: string[];
  covers: string;
  dataSource: [];
  responses: {
    [x: string]: any;
    budget: number;
    type: string;
    firstName: string;
    lastName: string;
    email: string;
    state: string;
    adult: number;
    children: number;
    infants: number;
    services: any;
  };
}

class Home extends Component<
  QuizProps,
  { isOpen: boolean; numOfPersons: any; isOthersInputOpen: boolean }
> {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      isOthersInputOpen: false,
      numOfPersons: "parents",
    };

    this.handleNumOfPeopleChange = this.handleNumOfPeopleChange.bind(this);
  }

  sections = [
    {
      text:
        "Take our survey/quiz and we will provide you with plans tailored for your needs.",
      icon: "snippets",
      color: " #38A169",
    },
    {
      text:
        "We would ask you some personal questions, but we will treat the data you provide us with as anonymous.",
      icon: "key",
      color: " #38A169",
    },
    {
      text:
        "We select policies for you based on a wide range of criteria, using processed data from our rich database.",
      icon: "database",
      color: " #38A169",
    },
    {
      text: "Manage your active policy from an intuitive dashboard.",
      icon: "user",
      color: " #38A169",
    },
    {
      text:
        "Process payments to your providers securely. You sometimes get discounts!",
      icon: "safety-certificate",
      color: "#38A169",
    },
  ];

  steps: { p: string; h3: string }[] = [
    {
      h3: "No medicals required",
      p: "Get HMO plans from the comfort of your home",
    },
    {
      h3: "Like to get HMO plans for",
      p: "Tell us who you would",
    },
    {
      h3: "Select your city",
      p: "Just one last detail",
    },
  ];

  locations = [
    "Abia",
    "Adamawa",
    "Akwa Ibom",
    "Anambra",
    "Bauchi",
    "Bayelsa",
    "Benue",
    "Borno",
    "Cross River",
    "Delta",
    "Ebonyi",
    "Enugu",
    "Edo",
    "Ekiti",
    /* "Federal Capital Territory",*/
    "Gombe",
    "Imo",
    "Jigawa",
    "Kaduna",
    "Kano",
    "Katsina",
    "Kebbi",
    "Kogi",
    "Kwara",
    /* "Lagos",*/
    "Nasarawa",
    "Niger",
    "Ogun",
    "Ondo",
    "Osun",
    /* "Oyo",*/
    "Plateau",
    /*"Rivers",*/
    "Sokoto",
    "Taraba",
    "Yobe",
    "Zamfara",
  ];

  toggleModal = () => {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  };

  toggleOthersInput = () => {
    this.setState({
      isOthersInputOpen: !this.state.isOthersInputOpen,
    });
  };

  changePage = (action: string) => {
    this.props.dispatch({ type: actions.CHANGE_PAGE, data: action });
  };

  componentDidMount() {
    document.title = "HMO Connect - Home";
  }

  defaultGender() {
    return true;
  }

  preventDefault(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
  }

  showSingleInput() {
    const singleInput = (
      <div id="single-control">
        <label>Select Age</label>
        <select className="form-control" placeholder="Select Age">
          <option value="">Select Age</option>
          <option value="18">18 Years</option>
          <option value="19">19 Years</option>
          <option value="20">20 Years</option>
          <option value="21">21 Years</option>
          <option value="22">22 Years</option>
          <option value="23">23 Years</option>
          <option value="24">24 Years</option>
          <option value="25">25 Years</option>
          <option value="26">26 Years</option>
          <option value="27">27 Years</option>
          <option value="28">28 Years</option>
          <option value="29">29 Years</option>
          <option value="30">30 Years</option>
          <option value="31">31 Years</option>
          <option value="32">32 Years</option>
          <option value="33">33 Years</option>
          <option value="34">34 Years</option>
          <option value="35">35 Years</option>
          <option value="36">36 Years</option>
          <option value="37">37 Years</option>
          <option value="38">38 Years</option>
          <option value="39">39 Years</option>
          <option value="40">40 Years</option>
          <option value="41">41 Years</option>
          <option value="42">42 Years</option>
          <option value="43">43 Years</option>
          <option value="44">44 Years</option>
          <option value="45">45 Years</option>
          <option value="46">46 Years</option>
          <option value="47">47 Years</option>
          <option value="48">48 Years</option>
          <option value="49">49 Years</option>
          <option value="50">50 Years</option>
          <option value="51">51 Years</option>
          <option value="52">52 Years</option>
          <option value="53">53 Years</option>
          <option value="54">54 Years</option>
          <option value="55">55 Years</option>
          <option value="56">56 Years</option>
          <option value="57">57 Years</option>
          <option value="58">58 Years</option>
          <option value="59">59 Years</option>
          <option value="60">60 Years</option>
          <option value="61">61 Years</option>
          <option value="62">62 Years</option>
          <option value="63">63 Years</option>
          <option value="64">64 Years</option>
          <option value="65">65 Years</option>
          <option value="66">66 Years</option>
          <option value="67">67 Years</option>
          <option value="68">68 Years</option>
          <option value="69">69 Years</option>
          <option value="70">70 Years</option>
          <option value="71">71 Years</option>
          <option value="72">72 Years</option>
          <option value="73">73 Years</option>
          <option value="74">74 Years</option>
          <option value="75">75 Years</option>
          <option value="76">76 Years</option>
          <option value="77">77 Years</option>
          <option value="78">78 Years</option>
          <option value="79">79 Years</option>
          <option value="80">80 Years</option>
          <option value="81">81 Years</option>
          <option value="82">82 Years</option>
          <option value="83">83 Years</option>
          <option value="84">84 Years</option>
          <option value="85">85 Years</option>
          <option value="86">86 Years</option>
          <option value="87">87 Years</option>
          <option value="88">88 Years</option>
          <option value="89">89 Years</option>
          <option value="90">90 Years</option>
          <option value="91">91 Years</option>
          <option value="92">92 Years</option>
          <option value="93">93 Years</option>
          <option value="94">94 Years</option>
          <option value="95">95 Years</option>
          <option value="96">96 Years</option>
          <option value="97">97 Years</option>
          <option value="98">98 Years</option>
          <option value="99">99 Years</option>
          <option value="100">100 Years</option>
        </select>
      </div>
    );

    return singleInput;
  }

  showCouplesInput() {
    const couplesInput = (
      <div id="couples-control" className="col-md-6">
        <label>Age of the Eldest member</label>
        <select
          className="form-control"
          placeholder="Select Age"
          defaultValue="32"
        >
          <option value="">Select Age</option>
          <option value="18">18 Years</option>
          <option value="19">19 Years</option>
          <option value="20">20 Years</option>
          <option value="21">21 Years</option>
          <option value="22">22 Years</option>
          <option value="23">23 Years</option>
          <option value="24">24 Years</option>
          <option value="25">25 Years</option>
          <option value="26">26 Years</option>
          <option value="27">27 Years</option>
          <option value="28">28 Years</option>
          <option value="29">29 Years</option>
          <option value="30">30 Years</option>
          <option value="31">31 Years</option>
          <option value="32">32 Years</option>
          <option value="33">33 Years</option>
          <option value="34">34 Years</option>
          <option value="35">35 Years</option>
          <option value="36">36 Years</option>
          <option value="37">37 Years</option>
          <option value="38">38 Years</option>
          <option value="39">39 Years</option>
          <option value="40">40 Years</option>
          <option value="41">41 Years</option>
          <option value="42">42 Years</option>
          <option value="43">43 Years</option>
          <option value="44">44 Years</option>
          <option value="45">45 Years</option>
          <option value="46">46 Years</option>
          <option value="47">47 Years</option>
          <option value="48">48 Years</option>
          <option value="49">49 Years</option>
          <option value="50">50 Years</option>
          <option value="51">51 Years</option>
          <option value="52">52 Years</option>
          <option value="53">53 Years</option>
          <option value="54">54 Years</option>
          <option value="55">55 Years</option>
          <option value="56">56 Years</option>
          <option value="57">57 Years</option>
          <option value="58">58 Years</option>
          <option value="59">59 Years</option>
          <option value="60">60 Years</option>
          <option value="61">61 Years</option>
          <option value="62">62 Years</option>
          <option value="63">63 Years</option>
          <option value="64">64 Years</option>
          <option value="65">65 Years</option>
          <option value="66">66 Years</option>
          <option value="67">67 Years</option>
          <option value="68">68 Years</option>
          <option value="69">69 Years</option>
          <option value="70">70 Years</option>
          <option value="71">71 Years</option>
          <option value="72">72 Years</option>
          <option value="73">73 Years</option>
          <option value="74">74 Years</option>
          <option value="75">75 Years</option>
          <option value="76">76 Years</option>
          <option value="77">77 Years</option>
          <option value="78">78 Years</option>
          <option value="79">79 Years</option>
          <option value="80">80 Years</option>
          <option value="81">81 Years</option>
          <option value="82">82 Years</option>
          <option value="83">83 Years</option>
          <option value="84">84 Years</option>
          <option value="85">85 Years</option>
          <option value="86">86 Years</option>
          <option value="87">87 Years</option>
          <option value="88">88 Years</option>
          <option value="89">89 Years</option>
          <option value="90">90 Years</option>
          <option value="91">91 Years</option>
          <option value="92">92 Years</option>
          <option value="93">93 Years</option>
          <option value="94">94 Years</option>
          <option value="95">95 Years</option>
          <option value="96">96 Years</option>
          <option value="97">97 Years</option>
          <option value="98">98 Years</option>
          <option value="99">99 Years</option>
          <option value="100">100 Years</option>
        </select>
      </div>
    );

    return couplesInput;
  }

  showFamOf3Input() {
    const famOf3Input = (
      <div id="famOf3-controls" className="row">
        <div className="col-md-6">
          <label>Age of the Eldest member</label>
          <select className="form-control" placeholder="Select Age">
            <option value="">Select Age</option>
            <option value="18">18 Years</option>
            <option value="19">19 Years</option>
            <option value="20">20 Years</option>
            <option value="21">21 Years</option>
            <option value="22">22 Years</option>
            <option value="23">23 Years</option>
            <option value="24">24 Years</option>
            <option value="25">25 Years</option>
            <option value="26">26 Years</option>
            <option value="27">27 Years</option>
            <option value="28">28 Years</option>
            <option value="29">29 Years</option>
            <option value="30">30 Years</option>
            <option value="31">31 Years</option>
            <option value="32">32 Years</option>
            <option value="33">33 Years</option>
            <option value="34">34 Years</option>
            <option value="35">35 Years</option>
            <option value="36">36 Years</option>
            <option value="37">37 Years</option>
            <option value="38">38 Years</option>
            <option value="39">39 Years</option>
            <option value="40">40 Years</option>
            <option value="41">41 Years</option>
            <option value="42">42 Years</option>
            <option value="43">43 Years</option>
            <option value="44">44 Years</option>
            <option value="45">45 Years</option>
            <option value="46">46 Years</option>
            <option value="47">47 Years</option>
            <option value="48">48 Years</option>
            <option value="49">49 Years</option>
            <option value="50">50 Years</option>
            <option value="51">51 Years</option>
            <option value="52">52 Years</option>
            <option value="53">53 Years</option>
            <option value="54">54 Years</option>
            <option value="55">55 Years</option>
            <option value="56">56 Years</option>
            <option value="57">57 Years</option>
            <option value="58">58 Years</option>
            <option value="59">59 Years</option>
            <option value="60">60 Years</option>
            <option value="61">61 Years</option>
            <option value="62">62 Years</option>
            <option value="63">63 Years</option>
            <option value="64">64 Years</option>
            <option value="65">65 Years</option>
            <option value="66">66 Years</option>
            <option value="67">67 Years</option>
            <option value="68">68 Years</option>
            <option value="69">69 Years</option>
            <option value="70">70 Years</option>
            <option value="71">71 Years</option>
            <option value="72">72 Years</option>
            <option value="73">73 Years</option>
            <option value="74">74 Years</option>
            <option value="75">75 Years</option>
            <option value="76">76 Years</option>
            <option value="77">77 Years</option>
            <option value="78">78 Years</option>
            <option value="79">79 Years</option>
            <option value="80">80 Years</option>
            <option value="81">81 Years</option>
            <option value="82">82 Years</option>
            <option value="83">83 Years</option>
            <option value="84">84 Years</option>
            <option value="85">85 Years</option>
            <option value="86">86 Years</option>
            <option value="87">87 Years</option>
            <option value="88">88 Years</option>
            <option value="89">89 Years</option>
            <option value="90">90 Years</option>
            <option value="91">91 Years</option>
            <option value="92">92 Years</option>
            <option value="93">93 Years</option>
            <option value="94">94 Years</option>
            <option value="95">95 Years</option>
            <option value="96">96 Years</option>
            <option value="97">97 Years</option>
            <option value="98">98 Years</option>
            <option value="99">99 Years</option>
            <option value="100">100 Years</option>
          </select>
        </div>
        <div className="col-md-6">
          <label>Select Age of Child</label>
          <select className="form-control" placeholder="Select Age">
            <option value="">Select Age</option>
            <option value="18">18 Years</option>
            <option value="19">19 Years</option>
            <option value="20">20 Years</option>
            <option value="21">21 Years</option>
            <option value="22">22 Years</option>
            <option value="23">23 Years</option>
            <option value="24">24 Years</option>
            <option value="25">25 Years</option>
            <option value="26">26 Years</option>
            <option value="27">27 Years</option>
            <option value="28">28 Years</option>
            <option value="29">29 Years</option>
            <option value="30">30 Years</option>
            <option value="31">31 Years</option>
            <option value="32">32 Years</option>
            <option value="33">33 Years</option>
            <option value="34">34 Years</option>
            <option value="35">35 Years</option>
            <option value="36">36 Years</option>
            <option value="37">37 Years</option>
            <option value="38">38 Years</option>
            <option value="39">39 Years</option>
            <option value="40">40 Years</option>
            <option value="41">41 Years</option>
            <option value="42">42 Years</option>
            <option value="43">43 Years</option>
            <option value="44">44 Years</option>
            <option value="45">45 Years</option>
            <option value="46">46 Years</option>
            <option value="47">47 Years</option>
            <option value="48">48 Years</option>
            <option value="49">49 Years</option>
            <option value="50">50 Years</option>
            <option value="51">51 Years</option>
            <option value="52">52 Years</option>
            <option value="53">53 Years</option>
            <option value="54">54 Years</option>
            <option value="55">55 Years</option>
            <option value="56">56 Years</option>
            <option value="57">57 Years</option>
            <option value="58">58 Years</option>
            <option value="59">59 Years</option>
            <option value="60">60 Years</option>
            <option value="61">61 Years</option>
            <option value="62">62 Years</option>
            <option value="63">63 Years</option>
            <option value="64">64 Years</option>
            <option value="65">65 Years</option>
            <option value="66">66 Years</option>
            <option value="67">67 Years</option>
            <option value="68">68 Years</option>
            <option value="69">69 Years</option>
            <option value="70">70 Years</option>
            <option value="71">71 Years</option>
            <option value="72">72 Years</option>
            <option value="73">73 Years</option>
            <option value="74">74 Years</option>
            <option value="75">75 Years</option>
            <option value="76">76 Years</option>
            <option value="77">77 Years</option>
            <option value="78">78 Years</option>
            <option value="79">79 Years</option>
            <option value="80">80 Years</option>
            <option value="81">81 Years</option>
            <option value="82">82 Years</option>
            <option value="83">83 Years</option>
            <option value="84">84 Years</option>
            <option value="85">85 Years</option>
            <option value="86">86 Years</option>
            <option value="87">87 Years</option>
            <option value="88">88 Years</option>
            <option value="89">89 Years</option>
            <option value="90">90 Years</option>
            <option value="91">91 Years</option>
            <option value="92">92 Years</option>
            <option value="93">93 Years</option>
            <option value="94">94 Years</option>
            <option value="95">95 Years</option>
            <option value="96">96 Years</option>
            <option value="97">97 Years</option>
            <option value="98">98 Years</option>
            <option value="99">99 Years</option>
            <option value="100">100 Years</option>
          </select>
        </div>
      </div>
    );
    return famOf3Input;
  }

  showFamOf4Input() {
    const famOf4Input = (
      <div id="famOf4-controls" className="row">
        <div className="col-md-6">
          <label>Age of the Eldest member</label>
          <select className="form-control" placeholder="Select Age">
            <option value="">Select Age</option>
            <option value="18">18 Years</option>
            <option value="19">19 Years</option>
            <option value="20">20 Years</option>
            <option value="21">21 Years</option>
            <option value="22">22 Years</option>
            <option value="23">23 Years</option>
            <option value="24">24 Years</option>
            <option value="25">25 Years</option>
            <option value="26">26 Years</option>
            <option value="27">27 Years</option>
            <option value="28">28 Years</option>
            <option value="29">29 Years</option>
            <option value="30">30 Years</option>
            <option value="31">31 Years</option>
            <option value="32">32 Years</option>
            <option value="33">33 Years</option>
            <option value="34">34 Years</option>
            <option value="35">35 Years</option>
            <option value="36">36 Years</option>
            <option value="37">37 Years</option>
            <option value="38">38 Years</option>
            <option value="39">39 Years</option>
            <option value="40">40 Years</option>
            <option value="41">41 Years</option>
            <option value="42">42 Years</option>
            <option value="43">43 Years</option>
            <option value="44">44 Years</option>
            <option value="45">45 Years</option>
            <option value="46">46 Years</option>
            <option value="47">47 Years</option>
            <option value="48">48 Years</option>
            <option value="49">49 Years</option>
            <option value="50">50 Years</option>
            <option value="51">51 Years</option>
            <option value="52">52 Years</option>
            <option value="53">53 Years</option>
            <option value="54">54 Years</option>
            <option value="55">55 Years</option>
            <option value="56">56 Years</option>
            <option value="57">57 Years</option>
            <option value="58">58 Years</option>
            <option value="59">59 Years</option>
            <option value="60">60 Years</option>
            <option value="61">61 Years</option>
            <option value="62">62 Years</option>
            <option value="63">63 Years</option>
            <option value="64">64 Years</option>
            <option value="65">65 Years</option>
            <option value="66">66 Years</option>
            <option value="67">67 Years</option>
            <option value="68">68 Years</option>
            <option value="69">69 Years</option>
            <option value="70">70 Years</option>
            <option value="71">71 Years</option>
            <option value="72">72 Years</option>
            <option value="73">73 Years</option>
            <option value="74">74 Years</option>
            <option value="75">75 Years</option>
            <option value="76">76 Years</option>
            <option value="77">77 Years</option>
            <option value="78">78 Years</option>
            <option value="79">79 Years</option>
            <option value="80">80 Years</option>
            <option value="81">81 Years</option>
            <option value="82">82 Years</option>
            <option value="83">83 Years</option>
            <option value="84">84 Years</option>
            <option value="85">85 Years</option>
            <option value="86">86 Years</option>
            <option value="87">87 Years</option>
            <option value="88">88 Years</option>
            <option value="89">89 Years</option>
            <option value="90">90 Years</option>
            <option value="91">91 Years</option>
            <option value="92">92 Years</option>
            <option value="93">93 Years</option>
            <option value="94">94 Years</option>
            <option value="95">95 Years</option>
            <option value="96">96 Years</option>
            <option value="97">97 Years</option>
            <option value="98">98 Years</option>
            <option value="99">99 Years</option>
            <option value="100">100 Years</option>
          </select>
        </div>
        <div className="col-md-6">
          <label>Age of the Eldest Child</label>
          <select className="form-control" placeholder="Select Age">
            <option value="">Select Age</option>
            <option value="18">18 Years</option>
            <option value="19">19 Years</option>
            <option value="20">20 Years</option>
            <option value="21">21 Years</option>
            <option value="22">22 Years</option>
            <option value="23">23 Years</option>
            <option value="24">24 Years</option>
            <option value="25">25 Years</option>
            <option value="26">26 Years</option>
            <option value="27">27 Years</option>
            <option value="28">28 Years</option>
            <option value="29">29 Years</option>
            <option value="30">30 Years</option>
            <option value="31">31 Years</option>
            <option value="32">32 Years</option>
            <option value="33">33 Years</option>
            <option value="34">34 Years</option>
            <option value="35">35 Years</option>
            <option value="36">36 Years</option>
            <option value="37">37 Years</option>
            <option value="38">38 Years</option>
            <option value="39">39 Years</option>
            <option value="40">40 Years</option>
            <option value="41">41 Years</option>
            <option value="42">42 Years</option>
            <option value="43">43 Years</option>
            <option value="44">44 Years</option>
            <option value="45">45 Years</option>
            <option value="46">46 Years</option>
            <option value="47">47 Years</option>
            <option value="48">48 Years</option>
            <option value="49">49 Years</option>
            <option value="50">50 Years</option>
            <option value="51">51 Years</option>
            <option value="52">52 Years</option>
            <option value="53">53 Years</option>
            <option value="54">54 Years</option>
            <option value="55">55 Years</option>
            <option value="56">56 Years</option>
            <option value="57">57 Years</option>
            <option value="58">58 Years</option>
            <option value="59">59 Years</option>
            <option value="60">60 Years</option>
            <option value="61">61 Years</option>
            <option value="62">62 Years</option>
            <option value="63">63 Years</option>
            <option value="64">64 Years</option>
            <option value="65">65 Years</option>
            <option value="66">66 Years</option>
            <option value="67">67 Years</option>
            <option value="68">68 Years</option>
            <option value="69">69 Years</option>
            <option value="70">70 Years</option>
            <option value="71">71 Years</option>
            <option value="72">72 Years</option>
            <option value="73">73 Years</option>
            <option value="74">74 Years</option>
            <option value="75">75 Years</option>
            <option value="76">76 Years</option>
            <option value="77">77 Years</option>
            <option value="78">78 Years</option>
            <option value="79">79 Years</option>
            <option value="80">80 Years</option>
            <option value="81">81 Years</option>
            <option value="82">82 Years</option>
            <option value="83">83 Years</option>
            <option value="84">84 Years</option>
            <option value="85">85 Years</option>
            <option value="86">86 Years</option>
            <option value="87">87 Years</option>
            <option value="88">88 Years</option>
            <option value="89">89 Years</option>
            <option value="90">90 Years</option>
            <option value="91">91 Years</option>
            <option value="92">92 Years</option>
            <option value="93">93 Years</option>
            <option value="94">94 Years</option>
            <option value="95">95 Years</option>
            <option value="96">96 Years</option>
            <option value="97">97 Years</option>
            <option value="98">98 Years</option>
            <option value="99">99 Years</option>
            <option value="100">100 Years</option>
          </select>
        </div>
      </div>
    );
    return famOf4Input;
  }

  showParentsInput() {
    const parentsInput = (
      <div id="parents-control">
        <div className="col-md-6">
          <label>Age of the Eldest member</label>
          <select className="form-control" placeholder="Select Age">
            <option value="">Select Age</option>
            <option value="18">18 Years</option>
            <option value="19">19 Years</option>
            <option value="20">20 Years</option>
            <option value="21">21 Years</option>
            <option value="22">22 Years</option>
            <option value="23">23 Years</option>
            <option value="24">24 Years</option>
            <option value="25">25 Years</option>
            <option value="26">26 Years</option>
            <option value="27">27 Years</option>
            <option value="28">28 Years</option>
            <option value="29">29 Years</option>
            <option value="30">30 Years</option>
            <option value="31">31 Years</option>
            <option value="32">32 Years</option>
            <option value="33">33 Years</option>
            <option value="34">34 Years</option>
            <option value="35">35 Years</option>
            <option value="36">36 Years</option>
            <option value="37">37 Years</option>
            <option value="38">38 Years</option>
            <option value="39">39 Years</option>
            <option value="40">40 Years</option>
            <option value="41">41 Years</option>
            <option value="42">42 Years</option>
            <option value="43">43 Years</option>
            <option value="44">44 Years</option>
            <option value="45">45 Years</option>
            <option value="46">46 Years</option>
            <option value="47">47 Years</option>
            <option value="48">48 Years</option>
            <option value="49">49 Years</option>
            <option value="50">50 Years</option>
            <option value="51">51 Years</option>
            <option value="52">52 Years</option>
            <option value="53">53 Years</option>
            <option value="54">54 Years</option>
            <option value="55">55 Years</option>
            <option value="56">56 Years</option>
            <option value="57">57 Years</option>
            <option value="58">58 Years</option>
            <option value="59">59 Years</option>
            <option value="60">60 Years</option>
            <option value="61">61 Years</option>
            <option value="62">62 Years</option>
            <option value="63">63 Years</option>
            <option value="64">64 Years</option>
            <option value="65">65 Years</option>
            <option value="66">66 Years</option>
            <option value="67">67 Years</option>
            <option value="68">68 Years</option>
            <option value="69">69 Years</option>
            <option value="70">70 Years</option>
            <option value="71">71 Years</option>
            <option value="72">72 Years</option>
            <option value="73">73 Years</option>
            <option value="74">74 Years</option>
            <option value="75">75 Years</option>
            <option value="76">76 Years</option>
            <option value="77">77 Years</option>
            <option value="78">78 Years</option>
            <option value="79">79 Years</option>
            <option value="80">80 Years</option>
            <option value="81">81 Years</option>
            <option value="82">82 Years</option>
            <option value="83">83 Years</option>
            <option value="84">84 Years</option>
            <option value="85">85 Years</option>
            <option value="86">86 Years</option>
            <option value="87">87 Years</option>
            <option value="88">88 Years</option>
            <option value="89">89 Years</option>
            <option value="90">90 Years</option>
            <option value="91">91 Years</option>
            <option value="92">92 Years</option>
            <option value="93">93 Years</option>
            <option value="94">94 Years</option>
            <option value="95">95 Years</option>
            <option value="96">96 Years</option>
            <option value="97">97 Years</option>
            <option value="98">98 Years</option>
            <option value="99">99 Years</option>
            <option value="100">100 Years</option>
          </select>
        </div>

        <div className="col-md-6"></div>
      </div>
    );
    return parentsInput;
  }

  showOthersInput() {
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
              className="form-control age-select"
              placeholder="Select Age"
            >
              <option value="">Select Age</option>
              <option value="18">18 Years</option>
              <option value="19">19 Years</option>
              <option value="20">20 Years</option>
              <option value="21">21 Years</option>
              <option value="22">22 Years</option>
              <option value="23">23 Years</option>
              <option value="24">24 Years</option>
              <option value="25">25 Years</option>
              <option value="26">26 Years</option>
              <option value="27">27 Years</option>
              <option value="28">28 Years</option>
              <option value="29">29 Years</option>
              <option value="30">30 Years</option>
              <option value="31">31 Years</option>
              <option value="32">32 Years</option>
              <option value="33">33 Years</option>
              <option value="34">34 Years</option>
              <option value="35">35 Years</option>
              <option value="36">36 Years</option>
              <option value="37">37 Years</option>
              <option value="38">38 Years</option>
              <option value="39">39 Years</option>
              <option value="40">40 Years</option>
              <option value="41">41 Years</option>
              <option value="42">42 Years</option>
              <option value="43">43 Years</option>
              <option value="44">44 Years</option>
              <option value="45">45 Years</option>
              <option value="46">46 Years</option>
              <option value="47">47 Years</option>
              <option value="48">48 Years</option>
              <option value="49">49 Years</option>
              <option value="50">50 Years</option>
              <option value="51">51 Years</option>
              <option value="52">52 Years</option>
              <option value="53">53 Years</option>
              <option value="54">54 Years</option>
              <option value="55">55 Years</option>
              <option value="56">56 Years</option>
              <option value="57">57 Years</option>
              <option value="58">58 Years</option>
              <option value="59">59 Years</option>
              <option value="60">60 Years</option>
              <option value="61">61 Years</option>
              <option value="62">62 Years</option>
              <option value="63">63 Years</option>
              <option value="64">64 Years</option>
              <option value="65">65 Years</option>
              <option value="66">66 Years</option>
              <option value="67">67 Years</option>
              <option value="68">68 Years</option>
              <option value="69">69 Years</option>
              <option value="70">70 Years</option>
              <option value="71">71 Years</option>
              <option value="72">72 Years</option>
              <option value="73">73 Years</option>
              <option value="74">74 Years</option>
              <option value="75">75 Years</option>
              <option value="76">76 Years</option>
              <option value="77">77 Years</option>
              <option value="78">78 Years</option>
              <option value="79">79 Years</option>
              <option value="80">80 Years</option>
              <option value="81">81 Years</option>
              <option value="82">82 Years</option>
              <option value="83">83 Years</option>
              <option value="84">84 Years</option>
              <option value="85">85 Years</option>
              <option value="86">86 Years</option>
              <option value="87">87 Years</option>
              <option value="88">88 Years</option>
              <option value="89">89 Years</option>
              <option value="90">90 Years</option>
              <option value="91">91 Years</option>
              <option value="92">92 Years</option>
              <option value="93">93 Years</option>
              <option value="94">94 Years</option>
              <option value="95">95 Years</option>
              <option value="96">96 Years</option>
              <option value="97">97 Years</option>
              <option value="98">98 Years</option>
              <option value="99">99 Years</option>
              <option value="100">100 Years</option>
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
              className="form-control age-select"
              placeholder="Select Age"
            >
              <option value="">Select Age</option>
              <option value="18">18 Years</option>
              <option value="19">19 Years</option>
              <option value="20">20 Years</option>
              <option value="21">21 Years</option>
              <option value="22">22 Years</option>
              <option value="23">23 Years</option>
              <option value="24">24 Years</option>
              <option value="25">25 Years</option>
              <option value="26">26 Years</option>
              <option value="27">27 Years</option>
              <option value="28">28 Years</option>
              <option value="29">29 Years</option>
              <option value="30">30 Years</option>
              <option value="31">31 Years</option>
              <option value="32">32 Years</option>
              <option value="33">33 Years</option>
              <option value="34">34 Years</option>
              <option value="35">35 Years</option>
              <option value="36">36 Years</option>
              <option value="37">37 Years</option>
              <option value="38">38 Years</option>
              <option value="39">39 Years</option>
              <option value="40">40 Years</option>
              <option value="41">41 Years</option>
              <option value="42">42 Years</option>
              <option value="43">43 Years</option>
              <option value="44">44 Years</option>
              <option value="45">45 Years</option>
              <option value="46">46 Years</option>
              <option value="47">47 Years</option>
              <option value="48">48 Years</option>
              <option value="49">49 Years</option>
              <option value="50">50 Years</option>
              <option value="51">51 Years</option>
              <option value="52">52 Years</option>
              <option value="53">53 Years</option>
              <option value="54">54 Years</option>
              <option value="55">55 Years</option>
              <option value="56">56 Years</option>
              <option value="57">57 Years</option>
              <option value="58">58 Years</option>
              <option value="59">59 Years</option>
              <option value="60">60 Years</option>
              <option value="61">61 Years</option>
              <option value="62">62 Years</option>
              <option value="63">63 Years</option>
              <option value="64">64 Years</option>
              <option value="65">65 Years</option>
              <option value="66">66 Years</option>
              <option value="67">67 Years</option>
              <option value="68">68 Years</option>
              <option value="69">69 Years</option>
              <option value="70">70 Years</option>
              <option value="71">71 Years</option>
              <option value="72">72 Years</option>
              <option value="73">73 Years</option>
              <option value="74">74 Years</option>
              <option value="75">75 Years</option>
              <option value="76">76 Years</option>
              <option value="77">77 Years</option>
              <option value="78">78 Years</option>
              <option value="79">79 Years</option>
              <option value="80">80 Years</option>
              <option value="81">81 Years</option>
              <option value="82">82 Years</option>
              <option value="83">83 Years</option>
              <option value="84">84 Years</option>
              <option value="85">85 Years</option>
              <option value="86">86 Years</option>
              <option value="87">87 Years</option>
              <option value="88">88 Years</option>
              <option value="89">89 Years</option>
              <option value="90">90 Years</option>
              <option value="91">91 Years</option>
              <option value="92">92 Years</option>
              <option value="93">93 Years</option>
              <option value="94">94 Years</option>
              <option value="95">95 Years</option>
              <option value="96">96 Years</option>
              <option value="97">97 Years</option>
              <option value="98">98 Years</option>
              <option value="99">99 Years</option>
              <option value="100">100 Years</option>
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
                  // onClick={}
                  id="son"
                ></input>

                <span>Son</span>
              </label>
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
                  // onClick={}
                  id="daughter"
                ></input>

                <span>Daughter</span>
              </label>
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
              className="form-control age-select"
              placeholder="Select Age"
            >
              <option value="">Select Age</option>
              <option value="18">18 Years</option>
              <option value="19">19 Years</option>
              <option value="20">20 Years</option>
              <option value="21">21 Years</option>
              <option value="22">22 Years</option>
              <option value="23">23 Years</option>
              <option value="24">24 Years</option>
              <option value="25">25 Years</option>
              <option value="26">26 Years</option>
              <option value="27">27 Years</option>
              <option value="28">28 Years</option>
              <option value="29">29 Years</option>
              <option value="30">30 Years</option>
              <option value="31">31 Years</option>
              <option value="32">32 Years</option>
              <option value="33">33 Years</option>
              <option value="34">34 Years</option>
              <option value="35">35 Years</option>
              <option value="36">36 Years</option>
              <option value="37">37 Years</option>
              <option value="38">38 Years</option>
              <option value="39">39 Years</option>
              <option value="40">40 Years</option>
              <option value="41">41 Years</option>
              <option value="42">42 Years</option>
              <option value="43">43 Years</option>
              <option value="44">44 Years</option>
              <option value="45">45 Years</option>
              <option value="46">46 Years</option>
              <option value="47">47 Years</option>
              <option value="48">48 Years</option>
              <option value="49">49 Years</option>
              <option value="50">50 Years</option>
              <option value="51">51 Years</option>
              <option value="52">52 Years</option>
              <option value="53">53 Years</option>
              <option value="54">54 Years</option>
              <option value="55">55 Years</option>
              <option value="56">56 Years</option>
              <option value="57">57 Years</option>
              <option value="58">58 Years</option>
              <option value="59">59 Years</option>
              <option value="60">60 Years</option>
              <option value="61">61 Years</option>
              <option value="62">62 Years</option>
              <option value="63">63 Years</option>
              <option value="64">64 Years</option>
              <option value="65">65 Years</option>
              <option value="66">66 Years</option>
              <option value="67">67 Years</option>
              <option value="68">68 Years</option>
              <option value="69">69 Years</option>
              <option value="70">70 Years</option>
              <option value="71">71 Years</option>
              <option value="72">72 Years</option>
              <option value="73">73 Years</option>
              <option value="74">74 Years</option>
              <option value="75">75 Years</option>
              <option value="76">76 Years</option>
              <option value="77">77 Years</option>
              <option value="78">78 Years</option>
              <option value="79">79 Years</option>
              <option value="80">80 Years</option>
              <option value="81">81 Years</option>
              <option value="82">82 Years</option>
              <option value="83">83 Years</option>
              <option value="84">84 Years</option>
              <option value="85">85 Years</option>
              <option value="86">86 Years</option>
              <option value="87">87 Years</option>
              <option value="88">88 Years</option>
              <option value="89">89 Years</option>
              <option value="90">90 Years</option>
              <option value="91">91 Years</option>
              <option value="92">92 Years</option>
              <option value="93">93 Years</option>
              <option value="94">94 Years</option>
              <option value="95">95 Years</option>
              <option value="96">96 Years</option>
              <option value="97">97 Years</option>
              <option value="98">98 Years</option>
              <option value="99">99 Years</option>
              <option value="100">100 Years</option>
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
              className="form-control age-select"
              placeholder="Select Age"
            >
              <option value="">Select Age</option>
              <option value="18">18 Years</option>
              <option value="19">19 Years</option>
              <option value="20">20 Years</option>
              <option value="21">21 Years</option>
              <option value="22">22 Years</option>
              <option value="23">23 Years</option>
              <option value="24">24 Years</option>
              <option value="25">25 Years</option>
              <option value="26">26 Years</option>
              <option value="27">27 Years</option>
              <option value="28">28 Years</option>
              <option value="29">29 Years</option>
              <option value="30">30 Years</option>
              <option value="31">31 Years</option>
              <option value="32">32 Years</option>
              <option value="33">33 Years</option>
              <option value="34">34 Years</option>
              <option value="35">35 Years</option>
              <option value="36">36 Years</option>
              <option value="37">37 Years</option>
              <option value="38">38 Years</option>
              <option value="39">39 Years</option>
              <option value="40">40 Years</option>
              <option value="41">41 Years</option>
              <option value="42">42 Years</option>
              <option value="43">43 Years</option>
              <option value="44">44 Years</option>
              <option value="45">45 Years</option>
              <option value="46">46 Years</option>
              <option value="47">47 Years</option>
              <option value="48">48 Years</option>
              <option value="49">49 Years</option>
              <option value="50">50 Years</option>
              <option value="51">51 Years</option>
              <option value="52">52 Years</option>
              <option value="53">53 Years</option>
              <option value="54">54 Years</option>
              <option value="55">55 Years</option>
              <option value="56">56 Years</option>
              <option value="57">57 Years</option>
              <option value="58">58 Years</option>
              <option value="59">59 Years</option>
              <option value="60">60 Years</option>
              <option value="61">61 Years</option>
              <option value="62">62 Years</option>
              <option value="63">63 Years</option>
              <option value="64">64 Years</option>
              <option value="65">65 Years</option>
              <option value="66">66 Years</option>
              <option value="67">67 Years</option>
              <option value="68">68 Years</option>
              <option value="69">69 Years</option>
              <option value="70">70 Years</option>
              <option value="71">71 Years</option>
              <option value="72">72 Years</option>
              <option value="73">73 Years</option>
              <option value="74">74 Years</option>
              <option value="75">75 Years</option>
              <option value="76">76 Years</option>
              <option value="77">77 Years</option>
              <option value="78">78 Years</option>
              <option value="79">79 Years</option>
              <option value="80">80 Years</option>
              <option value="81">81 Years</option>
              <option value="82">82 Years</option>
              <option value="83">83 Years</option>
              <option value="84">84 Years</option>
              <option value="85">85 Years</option>
              <option value="86">86 Years</option>
              <option value="87">87 Years</option>
              <option value="88">88 Years</option>
              <option value="89">89 Years</option>
              <option value="90">90 Years</option>
              <option value="91">91 Years</option>
              <option value="92">92 Years</option>
              <option value="93">93 Years</option>
              <option value="94">94 Years</option>
              <option value="95">95 Years</option>
              <option value="96">96 Years</option>
              <option value="97">97 Years</option>
              <option value="98">98 Years</option>
              <option value="99">99 Years</option>
              <option value="100">100 Years</option>
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
              className="form-control age-select"
              placeholder="Select Age"
            >
              <option value="">Select Age</option>
              <option value="18">18 Years</option>
              <option value="19">19 Years</option>
              <option value="20">20 Years</option>
              <option value="21">21 Years</option>
              <option value="22">22 Years</option>
              <option value="23">23 Years</option>
              <option value="24">24 Years</option>
              <option value="25">25 Years</option>
              <option value="26">26 Years</option>
              <option value="27">27 Years</option>
              <option value="28">28 Years</option>
              <option value="29">29 Years</option>
              <option value="30">30 Years</option>
              <option value="31">31 Years</option>
              <option value="32">32 Years</option>
              <option value="33">33 Years</option>
              <option value="34">34 Years</option>
              <option value="35">35 Years</option>
              <option value="36">36 Years</option>
              <option value="37">37 Years</option>
              <option value="38">38 Years</option>
              <option value="39">39 Years</option>
              <option value="40">40 Years</option>
              <option value="41">41 Years</option>
              <option value="42">42 Years</option>
              <option value="43">43 Years</option>
              <option value="44">44 Years</option>
              <option value="45">45 Years</option>
              <option value="46">46 Years</option>
              <option value="47">47 Years</option>
              <option value="48">48 Years</option>
              <option value="49">49 Years</option>
              <option value="50">50 Years</option>
              <option value="51">51 Years</option>
              <option value="52">52 Years</option>
              <option value="53">53 Years</option>
              <option value="54">54 Years</option>
              <option value="55">55 Years</option>
              <option value="56">56 Years</option>
              <option value="57">57 Years</option>
              <option value="58">58 Years</option>
              <option value="59">59 Years</option>
              <option value="60">60 Years</option>
              <option value="61">61 Years</option>
              <option value="62">62 Years</option>
              <option value="63">63 Years</option>
              <option value="64">64 Years</option>
              <option value="65">65 Years</option>
              <option value="66">66 Years</option>
              <option value="67">67 Years</option>
              <option value="68">68 Years</option>
              <option value="69">69 Years</option>
              <option value="70">70 Years</option>
              <option value="71">71 Years</option>
              <option value="72">72 Years</option>
              <option value="73">73 Years</option>
              <option value="74">74 Years</option>
              <option value="75">75 Years</option>
              <option value="76">76 Years</option>
              <option value="77">77 Years</option>
              <option value="78">78 Years</option>
              <option value="79">79 Years</option>
              <option value="80">80 Years</option>
              <option value="81">81 Years</option>
              <option value="82">82 Years</option>
              <option value="83">83 Years</option>
              <option value="84">84 Years</option>
              <option value="85">85 Years</option>
              <option value="86">86 Years</option>
              <option value="87">87 Years</option>
              <option value="88">88 Years</option>
              <option value="89">89 Years</option>
              <option value="90">90 Years</option>
              <option value="91">91 Years</option>
              <option value="92">92 Years</option>
              <option value="93">93 Years</option>
              <option value="94">94 Years</option>
              <option value="95">95 Years</option>
              <option value="96">96 Years</option>
              <option value="97">97 Years</option>
              <option value="98">98 Years</option>
              <option value="99">99 Years</option>
              <option value="100">100 Years</option>
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
              className="form-control age-select"
              placeholder="Select Age"
            >
              <option value="">Select Age</option>
              <option value="18">18 Years</option>
              <option value="19">19 Years</option>
              <option value="20">20 Years</option>
              <option value="21">21 Years</option>
              <option value="22">22 Years</option>
              <option value="23">23 Years</option>
              <option value="24">24 Years</option>
              <option value="25">25 Years</option>
              <option value="26">26 Years</option>
              <option value="27">27 Years</option>
              <option value="28">28 Years</option>
              <option value="29">29 Years</option>
              <option value="30">30 Years</option>
              <option value="31">31 Years</option>
              <option value="32">32 Years</option>
              <option value="33">33 Years</option>
              <option value="34">34 Years</option>
              <option value="35">35 Years</option>
              <option value="36">36 Years</option>
              <option value="37">37 Years</option>
              <option value="38">38 Years</option>
              <option value="39">39 Years</option>
              <option value="40">40 Years</option>
              <option value="41">41 Years</option>
              <option value="42">42 Years</option>
              <option value="43">43 Years</option>
              <option value="44">44 Years</option>
              <option value="45">45 Years</option>
              <option value="46">46 Years</option>
              <option value="47">47 Years</option>
              <option value="48">48 Years</option>
              <option value="49">49 Years</option>
              <option value="50">50 Years</option>
              <option value="51">51 Years</option>
              <option value="52">52 Years</option>
              <option value="53">53 Years</option>
              <option value="54">54 Years</option>
              <option value="55">55 Years</option>
              <option value="56">56 Years</option>
              <option value="57">57 Years</option>
              <option value="58">58 Years</option>
              <option value="59">59 Years</option>
              <option value="60">60 Years</option>
              <option value="61">61 Years</option>
              <option value="62">62 Years</option>
              <option value="63">63 Years</option>
              <option value="64">64 Years</option>
              <option value="65">65 Years</option>
              <option value="66">66 Years</option>
              <option value="67">67 Years</option>
              <option value="68">68 Years</option>
              <option value="69">69 Years</option>
              <option value="70">70 Years</option>
              <option value="71">71 Years</option>
              <option value="72">72 Years</option>
              <option value="73">73 Years</option>
              <option value="74">74 Years</option>
              <option value="75">75 Years</option>
              <option value="76">76 Years</option>
              <option value="77">77 Years</option>
              <option value="78">78 Years</option>
              <option value="79">79 Years</option>
              <option value="80">80 Years</option>
              <option value="81">81 Years</option>
              <option value="82">82 Years</option>
              <option value="83">83 Years</option>
              <option value="84">84 Years</option>
              <option value="85">85 Years</option>
              <option value="86">86 Years</option>
              <option value="87">87 Years</option>
              <option value="88">88 Years</option>
              <option value="89">89 Years</option>
              <option value="90">90 Years</option>
              <option value="91">91 Years</option>
              <option value="92">92 Years</option>
              <option value="93">93 Years</option>
              <option value="94">94 Years</option>
              <option value="95">95 Years</option>
              <option value="96">96 Years</option>
              <option value="97">97 Years</option>
              <option value="98">98 Years</option>
              <option value="99">99 Years</option>
              <option value="100">100 Years</option>
            </select>
          </div>
        </div>
        <div className="col-md-12 row father-in-law">
          <div className="col-md-6 chkContainer">
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
              className="form-control age-select"
              placeholder="Select Age"
            >
              <option value="">Select Age</option>
              <option value="18">18 Years</option>
              <option value="19">19 Years</option>
              <option value="20">20 Years</option>
              <option value="21">21 Years</option>
              <option value="22">22 Years</option>
              <option value="23">23 Years</option>
              <option value="24">24 Years</option>
              <option value="25">25 Years</option>
              <option value="26">26 Years</option>
              <option value="27">27 Years</option>
              <option value="28">28 Years</option>
              <option value="29">29 Years</option>
              <option value="30">30 Years</option>
              <option value="31">31 Years</option>
              <option value="32">32 Years</option>
              <option value="33">33 Years</option>
              <option value="34">34 Years</option>
              <option value="35">35 Years</option>
              <option value="36">36 Years</option>
              <option value="37">37 Years</option>
              <option value="38">38 Years</option>
              <option value="39">39 Years</option>
              <option value="40">40 Years</option>
              <option value="41">41 Years</option>
              <option value="42">42 Years</option>
              <option value="43">43 Years</option>
              <option value="44">44 Years</option>
              <option value="45">45 Years</option>
              <option value="46">46 Years</option>
              <option value="47">47 Years</option>
              <option value="48">48 Years</option>
              <option value="49">49 Years</option>
              <option value="50">50 Years</option>
              <option value="51">51 Years</option>
              <option value="52">52 Years</option>
              <option value="53">53 Years</option>
              <option value="54">54 Years</option>
              <option value="55">55 Years</option>
              <option value="56">56 Years</option>
              <option value="57">57 Years</option>
              <option value="58">58 Years</option>
              <option value="59">59 Years</option>
              <option value="60">60 Years</option>
              <option value="61">61 Years</option>
              <option value="62">62 Years</option>
              <option value="63">63 Years</option>
              <option value="64">64 Years</option>
              <option value="65">65 Years</option>
              <option value="66">66 Years</option>
              <option value="67">67 Years</option>
              <option value="68">68 Years</option>
              <option value="69">69 Years</option>
              <option value="70">70 Years</option>
              <option value="71">71 Years</option>
              <option value="72">72 Years</option>
              <option value="73">73 Years</option>
              <option value="74">74 Years</option>
              <option value="75">75 Years</option>
              <option value="76">76 Years</option>
              <option value="77">77 Years</option>
              <option value="78">78 Years</option>
              <option value="79">79 Years</option>
              <option value="80">80 Years</option>
              <option value="81">81 Years</option>
              <option value="82">82 Years</option>
              <option value="83">83 Years</option>
              <option value="84">84 Years</option>
              <option value="85">85 Years</option>
              <option value="86">86 Years</option>
              <option value="87">87 Years</option>
              <option value="88">88 Years</option>
              <option value="89">89 Years</option>
              <option value="90">90 Years</option>
              <option value="91">91 Years</option>
              <option value="92">92 Years</option>
              <option value="93">93 Years</option>
              <option value="94">94 Years</option>
              <option value="95">95 Years</option>
              <option value="96">96 Years</option>
              <option value="97">97 Years</option>
              <option value="98">98 Years</option>
              <option value="99">99 Years</option>
              <option value="100">100 Years</option>
            </select>
          </div>
        </div>
        <div className="col-md-12 row mother-in-law">
          <div className="col-md-6 chkContainer">
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
              className="form-control age-select"
              placeholder="Select Age"
            >
              <option value="">Select Age</option>
              <option value="18">18 Years</option>
              <option value="19">19 Years</option>
              <option value="20">20 Years</option>
              <option value="21">21 Years</option>
              <option value="22">22 Years</option>
              <option value="23">23 Years</option>
              <option value="24">24 Years</option>
              <option value="25">25 Years</option>
              <option value="26">26 Years</option>
              <option value="27">27 Years</option>
              <option value="28">28 Years</option>
              <option value="29">29 Years</option>
              <option value="30">30 Years</option>
              <option value="31">31 Years</option>
              <option value="32">32 Years</option>
              <option value="33">33 Years</option>
              <option value="34">34 Years</option>
              <option value="35">35 Years</option>
              <option value="36">36 Years</option>
              <option value="37">37 Years</option>
              <option value="38">38 Years</option>
              <option value="39">39 Years</option>
              <option value="40">40 Years</option>
              <option value="41">41 Years</option>
              <option value="42">42 Years</option>
              <option value="43">43 Years</option>
              <option value="44">44 Years</option>
              <option value="45">45 Years</option>
              <option value="46">46 Years</option>
              <option value="47">47 Years</option>
              <option value="48">48 Years</option>
              <option value="49">49 Years</option>
              <option value="50">50 Years</option>
              <option value="51">51 Years</option>
              <option value="52">52 Years</option>
              <option value="53">53 Years</option>
              <option value="54">54 Years</option>
              <option value="55">55 Years</option>
              <option value="56">56 Years</option>
              <option value="57">57 Years</option>
              <option value="58">58 Years</option>
              <option value="59">59 Years</option>
              <option value="60">60 Years</option>
              <option value="61">61 Years</option>
              <option value="62">62 Years</option>
              <option value="63">63 Years</option>
              <option value="64">64 Years</option>
              <option value="65">65 Years</option>
              <option value="66">66 Years</option>
              <option value="67">67 Years</option>
              <option value="68">68 Years</option>
              <option value="69">69 Years</option>
              <option value="70">70 Years</option>
              <option value="71">71 Years</option>
              <option value="72">72 Years</option>
              <option value="73">73 Years</option>
              <option value="74">74 Years</option>
              <option value="75">75 Years</option>
              <option value="76">76 Years</option>
              <option value="77">77 Years</option>
              <option value="78">78 Years</option>
              <option value="79">79 Years</option>
              <option value="80">80 Years</option>
              <option value="81">81 Years</option>
              <option value="82">82 Years</option>
              <option value="83">83 Years</option>
              <option value="84">84 Years</option>
              <option value="85">85 Years</option>
              <option value="86">86 Years</option>
              <option value="87">87 Years</option>
              <option value="88">88 Years</option>
              <option value="89">89 Years</option>
              <option value="90">90 Years</option>
              <option value="91">91 Years</option>
              <option value="92">92 Years</option>
              <option value="93">93 Years</option>
              <option value="94">94 Years</option>
              <option value="95">95 Years</option>
              <option value="96">96 Years</option>
              <option value="97">97 Years</option>
              <option value="98">98 Years</option>
              <option value="99">99 Years</option>
              <option value="100">100 Years</option>
            </select>
          </div>
        </div>
      </div>
    );
    return othersInput;
  }

  handleNumOfPeopleChange(num: any) {
    console.log(num.target.id);
    let id = document.getElementById(num.target.id) as HTMLInputElement;
    this.setState({
      numOfPersons: num.target.id,
    });
    //console.log(this.state.numOfPersons);
  }

  handleNavigation = (e: any) => {
    let currentPage = this.props.page;
    // console.log("currentPage:", currentPage);
    const targetId = e.target.id;
    if (targetId === "next") {
      if (currentPage == 3 && this.props.responses.state == "") {
        message.error("Please provide a location");
        return;
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

  /**
   * @param {any[]} value
   */
  handleCheckbox = (value: any[]) => {
    this.props.dispatch({ type: actions.UPDATE_PREFS, data: value });
  };

  handleInput = (e: any) => {
    this.props.dispatch({
      type: actions.UPDATE_TEXT_RESPONSE,
      data: { key: e.target.name, value: e.target.value },
    });
  };

  handleAdult = (value) => {
    /* if(e.target.value=="family"){
            this.props.dispatch({type:actions.TOGGLE_FAMILY_PLAN_SELECTED, data:{ value:true}})
        }else if(e.target.value !="family"){
            this.props.dispatch({type:actions.TOGGLE_FAMILY_PLAN_SELECTED, data:{ value:false}})
        }*/
    this.props.dispatch({
      type: actions.UPDATE_TEXT_RESPONSE,
      data: { key: "adult", value },
    });

    if (value == 2 && this.props.responses.children == 0) {
      this.props.dispatch({ type: actions.CHANGE_PLAN_TYPE, data: "couple" });
    }
    console.log(this.props.responses.type);
  };

  handleChildren = (value) => {
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
  handleInfants = (value) => {
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

  updateBudget = (e: any) => {
    const budget = [0, e.target.value];
    console.log("updating budget with: " + budget);
    this.props.dispatch({ type: actions.UPDATE_BUDGET, budget });
  };

  submitResponses() {
    let stringResp: any = JSON.stringify(this.props.responses);
    localStorage.setItem("responses", stringResp);
    this.props.history.push({
      pathname: "/compare",
      data: this.props.responses,
    });
  }

  onSearch = (searchText: string) => {
    let tempLocations: any[] = [];
    this.locations.forEach((item: string) => {
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

  onSelectChange = (value: any) => {
    this.props.dispatch({
      type: actions.UPDATE_TEXT_RESPONSE,
      data: { key: "state", value },
    });
    console.log(this.props.responses.state);
  };

  covers = (val: any) => {
    console.log(typeof val);
    this.props.dispatch({
      type: actions.UPDATE_COVERS,
      data: { key: "covers", value: val },
    });
    console.log(this.props.covers);
  };
  updateLocation = (location: any) => {
    this.props.dispatch({
      type: actions.UPDATE_TEXT_RESPONSE,
      data: { key: "state", value: location },
    });
    console.log(this.props.responses.state);
  };

  renderQuizPages() {
    const page1 = (
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
                  className="radio-group-gender"
                ></input>
                <span>
                  <FontAwesomeIcon
                    className="gender icons-gender male"
                    icon={faMale}
                  />

                  <em>Male</em>
                </span>
              </label>
              <label>
                <input
                  type="radio"
                  value="f"
                  name="radio-group-gender"
                  className="radio-group-gender"
                ></input>
                <span>
                  <FontAwesomeIcon
                    className="gender icons-gender female"
                    icon={faFemale}
                  />
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
            <input className="form-control" placeholder="Full Name"></input>
          </div>
        </div>
        <div className="form-group">
          <div className="col-md-12">
            <label>My number is</label>
          </div>

          <div className="col-md-12">
            <input
              className="form-control"
              placeholder="11 - digit mobile number"
            ></input>
          </div>
        </div>
        {/* <div className="form-group">
          <div className="col-md-12">
            <button
              className="btn btn-primary btn-large view-plans btn-demo"
              onClick={this.handleNavigation}
              id="next"
            >
              Continue
            </button>
          </div>
        </div> */}
      </div>
    );

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
                  defaultChecked={this.state.numOfPersons === "single"}
                  onClick={this.handleNumOfPeopleChange}
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
                  defaultChecked={this.state.numOfPersons === "couple"}
                  onClick={this.handleNumOfPeopleChange}
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
                  defaultChecked={this.state.numOfPersons === "fam-of-3"}
                  onClick={this.handleNumOfPeopleChange}
                  // onClick={(e) =>
                  //   this.handleNumOfPeopleChange("fam-of-3")
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
                  defaultChecked={this.state.numOfPersons === "fam-of-4"}
                  onClick={this.handleNumOfPeopleChange}
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
                  defaultChecked={this.state.numOfPersons === "parents"}
                  onClick={this.handleNumOfPeopleChange}
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
                  defaultChecked={this.state.numOfPersons === "others"}
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
                show={this.state.isOthersInputOpen}
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
            {this.state.numOfPersons == "single" ? this.showSingleInput() : ""}
          </div>
        </div>

        <div className="form-group couple-input" id="couple-input">
          {this.state.numOfPersons == "couple" ? this.showCouplesInput() : ""}
        </div>

        <div
          className="form-group fam-of-3-input col-md-12"
          id="fam-of-3-input"
        >
          {this.state.numOfPersons == "fam-of-3" ? this.showFamOf3Input() : ""}
        </div>

        <div
          className="form-group fam-of-4-input col-md-12"
          id="fam-of-4-input"
        >
          {this.state.numOfPersons == "fam-of-4" ? this.showFamOf4Input() : ""}
        </div>

        <div className="form-group parents-age" id="parents-age">
          {this.state.numOfPersons == "parents" ? this.showParentsInput() : ""}
        </div>

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
              className="btn btn-primary btn-large view-plans btn-demo"
              data-toggle="modal"
              data-target="#myModal2"
              id="next"
            >
              Continue
            </button>
          </div>
        </div> */}
      </div>
    );

    if (this.props.page === 1 || this.props.page === 0) {
      return page1;
    } else if (this.props.page === 2) {
      return page2;
    } /*else if (this.props.page === 3) {
      return page3;
    }*/
    console.log("this.props.page", this.props.page);
    return <p>Not enough responses collected!</p>;
  }

  render() {
    let current = this.props.page - 1;

    //console.log("current:", current, "this.props.page:", this.props.page);
    return (
      <React.Fragment>
        <div className="main">
          <AppHeader />
          <div className="container home">
            <Row className="banner-content">
              <Col xs={24} md={16} className="svg-and-text">
                <Col xs={24} md={8} className="svg-img-div">
                  <div className="svg-img">
                    <img src="images/searching.svg"></img>
                  </div>
                </Col>
                <Col xs={24} md={16}>
                  <div className={styles.banner}>
                    <div className={styles.bannerContent} id="bannertext">
                      <p className={styles.textHeading}>
                        Find Health Plans Starting
                        <br />
                        <span className={styles.headingSpan}>
                          @ ₦18,000/year
                        </span>
                      </p>
                    </div>
                  </div>
                </Col>
              </Col>

              <Col md={8}>
                <div className="form-div">
                  <form onSubmit={this.preventDefault} className="form">
                    <p>Get HMO plans from the comfort of your home</p>
                    <h3>No medicals required</h3>
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
                              className="radio-group-gender"
                            ></input>
                            <span>
                              <FontAwesomeIcon
                                className="gender icons-gender male"
                                icon={faMale}
                              />

                              <em>Male</em>
                            </span>
                          </label>
                          <label>
                            <input
                              type="radio"
                              value="f"
                              name="radio-group-gender"
                              className="radio-group-gender"
                            ></input>
                            <span>
                              <FontAwesomeIcon
                                className="gender icons-gender female"
                                icon={faFemale}
                              />
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
                          placeholder="Full Name"
                        ></input>
                      </div>
                    </div>
                    <div className="form-group">
                      <div className="col-md-12">
                        <label>My number is</label>
                      </div>

                      <div className="col-md-12">
                        <input
                          className="form-control"
                          placeholder="11 - digit mobile number"
                        ></input>
                      </div>
                    </div>
                    <div className="form-group">
                      <div className="col-md-12">
                        <button
                          className="btn btn-primary btn-large view-plans btn-demo"
                          onClick={this.toggleModal}
                        >
                          View Plans
                        </button>
                      </div>
                    </div>
                  </form>
                  <Modal
                    dialogClassName="custom-dialog"
                    className="right"
                    show={this.state.isOpen}
                    onHide={this.toggleModal}
                  >
                    <Modal.Body>
                      <form
                        name="modalForm"
                        onSubmit={this.preventDefault}
                        className="form steppers"
                      >
                        <div className="modal-head" id="modal-head">
                          {/* {this.props.page != 1 ? (
                            <Button
                              onClick={this.handleNavigation}
                              id="prev"
                              type="default"
                            >
                              <FontAwesomeIcon
                                className=""
                                icon={faArrowLeft}
                              />
                            </Button>
                          ) : (
                            ""
                          )}*/}

                          <div className="modal-title">
                            {current >= 0 ? (
                              <div>
                                <p>{this.steps[current].p}</p>
                                <h3>{this.steps[current].h3}</h3>
                              </div>
                            ) : (
                              ""
                            )}

                            <Steps current={current}>
                              {this.steps.map((step, i) => {
                                return <Step key={i} />;
                              })}
                            </Steps>
                          </div>
                        </div>
                        {this.renderQuizPages()}
                        <div className="nav-row row">
                          <div className="col-md-6">
                            <div className="form-group">
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
                          </div>
                          <div
                            className={
                              this.props.page != 1 ? "col-md-6" : "col-md-12"
                            }
                          >
                            <div className="form-group">
                              <button
                                className="btn btn-primary btn-large others-btn-cont view-plans btn-demo"
                                onClick={this.handleNavigation}
                                id="next"
                              >
                                Continue
                              </button>
                            </div>
                          </div>
                        </div>
                        {/*here*/}
                      </form>
                    </Modal.Body>
                    {/* <Modal.Footer>Goodbye!</Modal.Footer> */}
                  </Modal>
                </div>
              </Col>
            </Row>

            <div className={styles.content}>
              <h1 className={styles.title}>How it works</h1>
              <Row gutter={{ md: 8 }}>
                {this.sections.map((section, i) => {
                  return (
                    <Col xs={24} md={{ span: 8 }} key={i}>
                      <div
                        className={styles.iconCard}
                        style={section.color ? { color: section.color } : {}}
                      >
                        <Icon type={section.icon} />
                      </div>
                      <p className={styles.sectionText}>{section.text}</p>
                    </Col>
                  );
                })}
              </Row>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const mapProps = (state: any) => {
  return {
    ...state.quiz.quiz,
  };
};

export default connect(mapProps)(Home);
