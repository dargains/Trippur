import React from "react";
import lang from "../lang";

export default (props) => {
  const jsonLang = lang[props.lang][props.page];
  return (
    <div>
      <header>{jsonLang.header}</header>
      {jsonLang.body.map((element, i) => {
        switch(element.type) {
          case "title":
            return <p key={i} className="title">{element.copy}</p>
            break;
          case "text":
            return <p key={i} dangerouslySetInnerHTML={{__html:element.copy}}/>
            break;
          case "list":
            return <ul key={i}>{element.copy.map(item => <li key={item} dangerouslySetInnerHTML={{__html:item}} />)}</ul>
            break;
          default:
            break;
        }
      })}
    </div>
  )
}
