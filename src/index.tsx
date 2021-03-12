import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store/store";

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
import PlanDetails from "./pages/details/PlanDetails";
import Details from "./pages/details/Details";
import Plans from "./pages/compare/Plans";
import SideBySideComparison from "./pages/compare/SideBySideComparison";

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/quiz" component={Quiz} />
        {/* <Route path="/compare" component={Compare} /> */}
        <Route path="/plans" component={Plans} />
        <Route path="/details-old" component={Details} />
        <Route path="/details" component={PlanDetails} />
        <Route path="/compare" component={SideBySideComparison} />
        <Route component={ErrorPage} />
      </Switch>
    </Router>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
