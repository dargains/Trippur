import React from "react";
import { Link } from "react-router-dom";

import LanguageMenu from "./LanguageMenu";
import lang from "../lang";

export default(props) => (
  <footer>
    <div className="wrapper">
      <ul>
        <li>
          <Link to="/About">{lang[props.lang].Footer.about}</Link>
        </li>
        <li>
          <a href="http://guides.trippur.com">{lang[props.lang].Footer.guides}</a>
        </li>
        <li>
          <a href="http://blog.trippur.com">{lang[props.lang].Footer.blog}</a>
        </li>
        <li>
          <Link to="/Privacy">{lang[props.lang].Footer.privacy}</Link>
        </li>
        <li>
          <Link to="/Terms">{lang[props.lang].Footer.terms}</Link>
        </li>
        <li>
          <LanguageMenu changeLang={props.changeLang} lang={props.lang}/>
        </li>
      </ul>
      <h6>{lang[props.lang].Footer.joinUs}</h6>
      <ul>
        <li>
          <a href="https://facebook.com/trippurcom">
            <i className="icon-facebook"></i>
          </a>
        </li>
        <li>
          <a href="https://www.instagram.com/trippurcom/">
            <i className="icon-instagram"></i>
          </a>
        </li>
        <li>
          <a href="https://www.linkedin.com/company/trippur">
            <i className="icon-linkedin"></i>
          </a>
        </li>
        <li>
          <a href="https://twitter.com/Trippurcom">
            <i className="icon-twitter"></i>
          </a>
        </li>
      </ul>
      <small>© 2017 trippur.com</small>
    </div>
  </footer>
)
