import React from "react";
import { NavLink } from "react-router-dom";

const links = [
  {
    href: "/Pages/Help",
    label: "Help"
  },
  {
    href: "/Pages/About",
    label: "About"
  },
  {
    href: "/Pages/Privacy",
    label: "Privacy"
  },
  {
    href: "/Pages/Partnerships",
    label: "Partnerships"
  },
  {
    href: "/Pages/Cookies",
    label: "Cookies Policy"
  },
  {
    href: "/Pages/Terms",
    label: "Terms & Conditions"
  }
]

export default (props) => (
  <aside>
    <nav>
      <ul>
        {links.map(link => <li key={link.label}><NavLink to={link.href} activeClassName="selected">{link.label}</NavLink></li>)}
      </ul>
    </nav>
  </aside>
)
