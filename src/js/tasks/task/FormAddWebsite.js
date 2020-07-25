import React, { Component } from "react";

export default
  class FormAddWebsite extends Component {
  state = {
    title: "",
    url: "",
    placeholderTitle: "",
    placeholderURL: ""
  }

  validateInputs = () => {
    const { title, url } = this.state;
    const urlPattern = new RegExp(/(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/);
    const EMPTY_ERROR = "field cannot be empty";
    const errors = [];

    if (title.trim() === "") {
      this.setState({
        placeholderTitle: EMPTY_ERROR
      })
      errors.push(EMPTY_ERROR);
    }

    if (!urlPattern.test(url)) {
      this.setState({
        url: "",
        placeholderURL: "invalid URL"
      })
      errors.push("invalid URL");
    }
    if (url.trim() === "") {
      this.setState({
        placeholderURL: EMPTY_ERROR
      })
      errors.push(EMPTY_ERROR)
    }

    return errors;
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { updateWebsites, taskID, taskWebsites } = this.props;
    const { title, url } = this.state;
    const newWebsite = {
      title: title,
      link: url
    }
    const websitesArr = [...taskWebsites, newWebsite];
    const errors = this.validateInputs();
    if (typeof updateWebsites === "function" && errors.length === 0) {
      updateWebsites(taskID, {
        websites: websitesArr
      })
    }

    this.setState({
      title: "",
      url: ""
    })
  }

  render() {
    const { formWebStyle } = this.props;
    const { placeholderTitle, placeholderURL, url, title } = this.state;
    const titlePlaceholder = placeholderTitle !== "" ? placeholderTitle : "Title";
    const urlPlaceholder = placeholderURL !== "" ? placeholderURL : "URL";
    const errorBG = "form-control error-bg"
    return (
      <form className="form-web form-group" style={formWebStyle} onSubmit={this.handleSubmit}>
        <input
          type="text"
          name="title"
          value={title}
          className={placeholderTitle !== "" ? errorBG : "form-control"}
          placeholder={titlePlaceholder}
          onChange={this.handleChange}
        />
        <input
          type="text"
          name="url"
          value={url}
          className={placeholderURL !== "" ? errorBG : "form-control"}
          placeholder={urlPlaceholder}
          onChange={this.handleChange}
        />
        <input type="submit" className="btn btn-add" value="add" />
      </form>
    )
  }
}