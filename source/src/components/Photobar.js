import React, { Component } from "react";
import scraper from "insta-scraper";
// import lang from "../lang";

class Photobar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      photos: [],
      size: 15
    }
  }
  componentWillMount() {
    scraper.getMediaByTag(`visit${this.props.city}`, [],
    (error,response) => {
      this.setState({photos:response.media.nodes});
    });
  }
  render() {
    return (
      <aside className="photobar">
        {/* <h2 className="photobar__title">{lang[this.props.lang].Photobar.title}{this.props.city}</h2> */}
        <ul>
          {this.state.photos.slice(0, this.state.size).map(photo => <li key={photo.id}><img src={photo.thumbnail_resources[2].src} alt={photo.caption}/></li>)}
        </ul>
      </aside>
    )
  }
}

export default Photobar;
