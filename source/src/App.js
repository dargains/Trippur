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
      lang:"en",
      currency: "EUR"
    }
  }
  render() {
    return (
        <BrowserRouter>
          <div>
            <Route render={() => <Header changeLang={lang => this.setState({lang})} lang={this.state.lang} changeCurrency={currency => this.setState({currency})} currency={this.state.currency}/>} />
            <Switch>
              <Route exact path="/" render={() => <Home lang={this.state.lang} currency={this.state.currency}/>} />
              <Route exact path="/Results" render={() => <Results lang={this.state.lang} currency={this.state.currency}/>} />
              <Pages>
                  <PagesNav />
                  <article>
                    {internalPages.map(page => <Route key={page} exact path={`/${page}`} render={() => <InternalPage page={page} lang={this.state.lang}/>}/>)}
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
