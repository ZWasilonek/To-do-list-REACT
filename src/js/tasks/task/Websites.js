import React, { Component } from "react";
import Link from "./Link.js";

export default
  class Websites extends Component {
  render() {
    const { task, websitesDivStyle, removeLink } = this.props;
    return (
      <div style={websitesDivStyle}>
        {task.websites.map((website, i) => (
          <Link
            key={i}
            website={website}
            removeLink={removeLink}
            index={i}
          />
        ))}
      </div>
    )
  }
}