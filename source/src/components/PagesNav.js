import React from "react";
import { NavLink } from "react-router-dom";

const links = [
  {
    href: "/Pages/About",
    label: "About"
  },
  {
    href: "/Pages/Help",
    label: "Help"
  },
  {
    href: "/Pages/Jobs",
    label: "Jobs"
  },
  {
    href: "/Pages/Blog",
    label: "Blog"
  },
  {
    href: "/Pages/Partnerships",
    label: "Partnerships"
  },
  {
    href: "/Pages/Press",
    label: "Press"
  },
  {
    href: "/Pages/Privacy",
    label: "Privacy"
  },
  {
    href: "/Pages/Terms",
    label: "Terms & Conditions"
  },
  {
    href: "/Pages/Cookies",
    label: "Cookies Policy"
  },
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
