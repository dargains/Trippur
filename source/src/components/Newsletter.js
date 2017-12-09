import React, { Component } from "react";
import SubscribeFrom from 'react-mailchimp-subscribe'

import lang from "../lang";

class Newsletter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      success: false
    }
  }
  render() {
    const formProps = {
      action: "https://trippur.us12.list-manage.com/subscribe/post?u=87100550c4d531b44c9411bd1&amp;id=2e5a1968b0",
      messages: {
        inputPlaceholder: lang[this.props.lang].Newsletter.placeholder,
        btnLabel: lang[this.props.lang].Newsletter.btnLabel,
        sending: lang[this.props.lang].Newsletter.sending,
        success: lang[this.props.lang].Newsletter.success,
        error: lang[this.props.lang].Newsletter.error
      },
      styles: {
        sending: {
          fontSize: 14,
          color: "auto"
        },
        success: {
          fontSize: 14,
          color: "green"
        },
        error: {
          fontSize: 14,
          color: "red"
        }
      }
    }
    return (
      <section className="newsletter" data-backgroundgradient="">
        <div className="wrapper">
          <h4>{lang[this.props.lang].Newsletter.title}</h4>
          <SubscribeFrom {...formProps}/>
        </div>
      </section>
    )
  }
}

export default Newsletter;
