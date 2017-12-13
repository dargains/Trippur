import React from "react";
import { NavLink } from "react-router-dom";

const links = [
  {
    href: "/Help",
    label: "Help"
  },
  {
    href: "/About",
    label: "About"
  },
  {
    href: "/Privacy",
    label: "Privacy"
  },
  {
    href: "/Partnerships",
    label: "Partnerships"
  },
  {
    href: "/Cookies",
    label: "Cookies Policy"
  },
  {
    href: "/Terms",
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
