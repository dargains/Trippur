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

const internalPages = [
  "About",
  "Terms",
  "Help",
  "Cookies",
  "Privacy",
  "Partnerships"
]

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
                    {internalPages.map(page => <Route exact path={`/${page}`} render={() => <InternalPage page={page} lang={this.state.lang}/>}/>)}
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
