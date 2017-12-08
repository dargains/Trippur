import React, { Component } from "react";
import SubscribeFrom from 'react-mailchimp-subscribe'

const formProps = {
  action: "https://trippur.us12.list-manage.com/subscribe/post?u=87100550c4d531b44c9411bd1&amp;id=2e5a1968b0",
  messages: {
    inputPlaceholder: "Enter your email here",
    btnLabel: "Submit",
    sending: "Sending...",
    success: "Thank you for subscribing",
    error: "Impossible to register this email"
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


class Newsletter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      success: false
    }
  }
  render() {
    return (
      <section className="newsletter" data-backgroundgradient="">
        <div className="wrapper">
          <h4>Subscribe to our Newsletter</h4>
          <SubscribeFrom {...formProps}/>
        </div>
      </section>
    )
  }
}

export default Newsletter;
