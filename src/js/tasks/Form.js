import React from "react";


export default
  class Form extends React.Component {
  state = {
    formErrors: [],
    placeholder: "",
    title: "",
    description: ""
  }

  validateForm = () => {
    const { title, description } = this.state;
    const emptyError = "cannot be empty";
    const formErrors = [];

    if (title.trim() === "") {
      const error = {
        fieldName: "title",
        message: emptyError
      }
      this.setState({
        placeholder: error.message
      })
      formErrors.push(error);
    }

    if (description.trim() === "") {
      const error = {
        fieldName: "description",
        message: emptyError
      }
      this.setState({
        placeholder: error.message
      })
      formErrors.push(error);
    }

    return formErrors;
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
      placeholder: ""
    })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { title, description } = this.state;
    const {addNewTask} = this.props;

    const errorsArray = this.validateForm();

    if (errorsArray.length === 0 && typeof addNewTask === "function") {
      const task = {
        title: title,
        description: description,
        status: "closed",
        timeSpent: 0,
        websites: []
      }
      addNewTask(task);
    }

    this.setState({
      formErrors: errorsArray,
      title: "",
      description: ""
    }) 
  }

  render() {
    const { placeholder, description, title } = this.state;
    const titlePlaceholder = placeholder !== "" ? `title ${placeholder}` : "Title";
    const descPlaceholder = placeholder !== "" ? `description ${placeholder}` : "Description";
    const classList = placeholder !== "" 
      && (placeholder !== "Title" || placeholder !== "Description")
      && (title === "" || description === "") ?
      "form-control error-bg" : "form-control"

    return (
      <form onSubmit={this.handleSubmit} className="form-group new-task">
        <h2>ADD NEW TASK</h2>
        <input
          type="text"
          className={classList}
          name="title"
          placeholder={titlePlaceholder}
          value={title}
          onChange={this.handleChange}
        />
        <input
          type="text"
          className={classList}
          name="description"
          placeholder={descPlaceholder}
          value={description}
          onChange={this.handleChange}
        />
        <input
          type="submit"
          value="Add"
          className="btn btn-add"
        />
      </form>
    )
  }
}