import React from "react";
import { Link } from "react-router-dom";

export default(props) => (
  <footer>
    <div className="wrapper">
      <ul>
        <li>
          <Link to="/Pages/About">About</Link>
        </li>
        <li>
          <Link to="/Pages/Privacy">Privacy</Link>
        </li>
        <li>
          <Link to="/Pages/Terms">Terms & Conditions</Link>
        </li>
        <li>
          <a href="">
            <img src="http://www.geonames.org/flags/s/pt.png" alt="Portugues"/>
          </a>
        </li>
        <li>
          <a href="">€</a>
        </li>
      </ul>
      <h6>Join us</h6>
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
