import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Home from "./containers/Home";
import Results from "./containers/Results";
import Pages from "./containers/Pages";
import About from "./containers/About";
import Terms from "./containers/Terms";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Error404 from "./components/Error404";

export default (props) => (
    <BrowserRouter>
      <main>
        <Route component={Header} />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/results" component={Results} />
          <Pages>
              <aside>cenas</aside>
              <div>
                <Route exact path="/pages/about" component={About}/>
                <Route exact path="/pages/terms" component={Terms}/>
              </div>
          </Pages>
          <Route component={Error404} />
        </Switch>
        <Route component={Footer} />
    </main>
  </BrowserRouter>
);
