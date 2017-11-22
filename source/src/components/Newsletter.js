import React from "react";

export default(props) => (
  <section className="newsletter" data-backgroundgradient="">
    <div className="wrapper">
      <h4>Subscribe to our Newsletter</h4>
      <input type="text" id="nlemail" placeholder="Enter your email here" />
      <a href="#" className="btn alternative">
        <span>Send</span>
      </a>
      <p>* Subscription sucess message</p>
    </div>
  </section>
)
