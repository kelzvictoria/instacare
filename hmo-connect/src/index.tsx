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
import $ from "jquery";
import * as serviceWorker from "./serviceWorker";

import Home from "./pages/home/Home";
import ErrorPage from "./pages/error-page/ErrorPage";
import Quiz from "./pages/quiz/Quiz";
import Compare from "./pages/compare/Compare";
import Details from "./pages/details/Details";

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/quiz" component={Quiz} />
        <Route path="/compare" component={Compare} />
        <Route path="/details" component={Details} />
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
