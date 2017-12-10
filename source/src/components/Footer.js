import React from "react";
import { Link } from "react-router-dom";

import LanguageMenu from "./LanguageMenu";
import lang from "../lang";

export default(props) => (
  <footer>
    <div className="wrapper">
      <ul>
        <li>
          <Link to="/Pages/About">{lang[props.lang].Footer.about}</Link>
        </li>
        <li>
          <Link to="/Pages/Privacy">{lang[props.lang].Footer.privacy}</Link>
        </li>
        <li>
          <Link to="/Pages/Terms">{lang[props.lang].Footer.terms}</Link>
        </li>
        <li>
          <LanguageMenu changeLang={props.changeLang} lang={props.lang}/>
        </li>
        {/* <li>
          <a href="">€</a>
        </li> */}
      </ul>
      <h6>{lang[props.lang].Footer.joinUs}</h6>
      <ul>
        <li>
          <a href="">
            <i className="icon-facebook"></i>
          </a>
        </li>
        <li>
          <a href="">
            <i className="icon-instagram"></i>
          </a>
        </li>
        <li>
          <a href="">
            <i className="icon-linkedin"></i>
          </a>
        </li>
        <li>
          <a href="">
            <i className="icon-twitter"></i>
          </a>
        </li>
      </ul>
      <small>© 2017 trippur.com</small>
    </div>
  </footer>
)
