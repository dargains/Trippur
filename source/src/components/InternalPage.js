import React from "react";
import lang from "../lang";

export default (props) => {
  const jsonLang = lang[props.lang][props.page];
  return (
    <div>
      <div className="header">{jsonLang.header}</div>
      {jsonLang.body.map((element, i) => {
        let domElement = "";
        switch(element.type) {
          case "title":
            domElement = <p key={i} className="title">{element.copy}</p>
            break;
          case "text":
            domElement = <p key={i} dangerouslySetInnerHTML={{__html:element.copy}}/>
            break;
          case "list":
            domElement = <ul key={i}>{element.copy.map(item => <li key={item} dangerouslySetInnerHTML={{__html:item}} />)}</ul>
            break;
          default:
            break;
        }
        return domElement;
      })}
    </div>
  )
}
