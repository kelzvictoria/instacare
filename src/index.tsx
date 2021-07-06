import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store/store";

import LoadingOverlay from "react-loading-overlay";
import { Spin } from "antd";

import "./index.scss";
import "./custom.css";
import "bootstrap/dist/css/bootstrap.css";
import "./fontawesome";
import "./modal.css";
//import $ from "jquery";
import * as serviceWorker from "./serviceWorker";

import Home from "./pages/home/Home";
import ErrorPage from "./pages/error-page/ErrorPage";
import Quiz from "./pages/quiz/Quiz";
import Compare from "./pages/compare/Compare";
import ComparePlans from "./pages/compare/Compare2";
import PlanDetails from "./pages/details/PlanDetails";
import Details from "./pages/details/Details";
import Plans from "./pages/compare/Plans";
import SideBySideComparison from "./pages/compare/SideBySideComparison";

import AppHeader from "./components/app-header/AppHeader";
import AppFooter from "./components/app-footer/AppFooter";
import Home2 from "./pages/home/Home2";
import Providers from "./pages/providers/Providers";
import Prescriptions from "./pages/prescriptions/Prescriptions";

import { getToken } from "../src/actions/authActions";
import {
  getProviders,
  //getPlans,
  getServices,
  getCheapestPlan,
} from "../src/actions/fetchDataActions";
import Doctors from "./pages/doctors/Doctors";
import Benefits from "./pages/benefits/Benefits";

//import HMO from "./pages/home/HMO";

export class App extends React.Component {
  state = {
    authCredLoaded: false,
  };

  // UNSAFE_componentWillMount() {
  //   // store.dispatch(getToken());
  // }

  async UNSAFE_componentWillMount() {
    // !localStorage["services"] && (await store.dispatch(getServices()));
    // !localStorage["cheapest_plan"] && (await store.dispatch(getCheapestPlan()));
  }

  render() {
    return (
      <Provider store={store}>
        <Router>
          {/* <LoadingOverlay
            active={true}
            spinner
            //={<Spin />}
            text="Please wait..."
          > */}
          <div className="main">
            <AppHeader />
            <Switch>
              {/* <Route exact path="/" component={Home} /> */}
              <Route exact path="/" component={Home2} />
              <Route path="/quiz" component={Quiz} />
              <Route path="/compare-old" component={Compare} />
              <Route path="/plans" component={Plans} />
              <Route path="/details-old" component={Details} />
              <Route exact path="/details" component={PlanDetails} />
              <Route exact path="/details/*" component={PlanDetails} />
              <Route exact path="/compare" component={SideBySideComparison} />
              <Route path="/compare-plans/plans/*" component={ComparePlans} />

              <Route path="/new-design" component={Home2} />
              <Route exact path="/hmos/*" component={Home2} />
              <Route exact path="/find-provider" component={Providers} />
              <Route exact path="/find-drugs" component={Prescriptions} />
              <Route exact path="/find-doctors" component={Doctors} />
              <Route exact path="/find-benefits" component={Benefits} />
              {/* <Route path= {`/${hmo}`} component = {HMO} /> */}
              <Route component={ErrorPage} />
            </Switch>
            <AppFooter />
          </div>
          {/* </LoadingOverlay> */}
        </Router>
      </Provider>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
