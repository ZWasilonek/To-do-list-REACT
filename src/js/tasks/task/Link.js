import React, { Component } from "react";
import { FaTrashAlt } from "react-icons/fa";

export default
  class Link extends Component {
  handleDeleteLink = (e) => {
    e.preventDefault();
    const { removeLink, index } = this.props;
    if (typeof removeLink === "function") {
      removeLink(index);
    }
  }

  render() {
    const { website } = this.props;
    return (
      <div className="links">
        <div>
          <a
            target="_blank"
            href={website.link}>
            {website.title}
          </a>
        </div>

        <div>
          <button className="btn">
            <FaTrashAlt
              className="icon"
              size="15px"
              onClick={this.handleDeleteLink}
            />
          </button>
        </div>
      </div>
    )
  }
}