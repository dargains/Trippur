import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Home from "./containers/Home";
import Results from "./containers/Results";
import Pages from "./containers/Pages";

import Header from "./components/Header";
import Footer from "./components/Footer";
import Error404 from "./components/Error404";

import PagesNav from "./components/PagesNav";
import InternalPage from "./components/InternalPage";


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lang:"en"
    }
  }
  render() {
    return (
        <BrowserRouter>
          <div>
            <Route render={() => <Header changeLang={lang => this.setState({lang})} lang={this.state.lang}/>} />
            <Switch>
              <Route exact path="/" render={() => <Home lang={this.state.lang}/>} />
              <Route exact path="/Results" render={() => <Results lang={this.state.lang}/>} />
              <Pages>
                  <PagesNav />
                  <article>
                    <Route exact path="/Pages/About" render={() => <InternalPage page="About" lang={this.state.lang}/>}/>
                    <Route exact path="/Pages/Terms" render={() => <InternalPage page="Terms" lang={this.state.lang}/>}/>
                    <Route exact path="/Pages/Help" render={() => <InternalPage page="Help" lang={this.state.lang}/>}/>
                    <Route exact path="/Pages/Cookies" render={() => <InternalPage page="Cookies" lang={this.state.lang}/>}/>
                    <Route exact path="/Pages/Privacy" render={() => <InternalPage page="Privacy" lang={this.state.lang}/>}/>
                    <Route exact path="/Pages/Partnerships" render={() => <InternalPage page="Partnerships" lang={this.state.lang}/>}/>
                  </article>
              </Pages>
              <Route component={Error404} />
            </Switch>
            <Route render={() => <Footer changeLang={lang => this.setState({lang})} lang={this.state.lang}/>} />
        </div>
      </BrowserRouter>
    )
  }
}
export default App;
