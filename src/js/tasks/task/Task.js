import React, { Component } from "react";

import Websites from "./Websites";
import FormAddWebsite from "./FormAddWebsite";

export default
  class Task extends Component {
  millisToMinutesAndSeconds = (t) => {
    var cd = 24 * 60 * 60 * 1000,
      ch = 60 * 60 * 1000,
      d = Math.floor(t / cd),
      h = Math.floor((t - d * cd) / ch),
      m = Math.floor((t - d * cd - h * ch) / 60000),
      pad = function (n) { return n < 10 ? '0' + n : n; };
    if (m === 60) {
      h++;
      m = 0;
    }
    if (h === 24) {
      d++;
      h = 0;
    }
    return [d, pad(h), pad(m)].join(':');
  }

  state = {
    status: this.props.task.status,
    progress: this.props.task.timeSpent,
    time: this.millisToMinutesAndSeconds(this.props.task.timeSpent),
    apiURL: "http://localhost:3000/tasks",
    displayWebsites: false,
    showForm: false,
    zIndex : 1
  }

  timeOn = (status) => {
    const { updateStatus } = this.props;

    if (status === "open" && typeof updateStatus === "function") {
      this.timeInterval = setInterval(() => {
        this.setState((prevTime) => {
          return {
            progress: prevTime.progress + 1000,
            time: this.millisToMinutesAndSeconds(this.state.progress)
          };
        }, () => updateStatus(this.props.task.id, {
          timeSpent: this.state.progress
        }));
      }, 1000);
    } else if (status === "closed") {
      clearInterval(this.timeInterval);
    }
  }

  handleStatusAndTime = (id, status) => {
    const { updateStatus } = this.props;
    if (typeof updateStatus === "function") {
      updateStatus(id, status);
      this.timeOn(status.status)
    }
  }

  componentDidMount() {
    this.timeOn(this.state.status);
  }

  changeStatus = () => {
    const { status } = this.state;
    const { task } = this.props;
    this.setState({
      status: status === "closed" ? "open" : "closed"
    }, () => this.handleStatusAndTime(task.id, {
      status: this.state.status
    }))
  }

  handleStateBtn = (e) => {
    e.preventDefault();
    this.changeStatus();
  }

  handleRemoveBtn = (e) => {
    e.preventDefault();
    const { removeTask, task } = this.props;
    if (typeof removeTask === "function") {
      removeTask(task.id);
    }
  }

  handleShowFormBtn = (e) => {
    e.preventDefault();
    this.setState({
      showForm: !this.state.showForm,
      zIndex: this.state.zIndex + 1
    })
  }

  removeLink = (index) => {
    const { updateWebsites, task } = this.props;
    const newLinksList = []
    task.websites.filter((link, i) => {
      if (i !== index) {
        newLinksList.push(link);
      }
    })
    if (typeof updateWebsites === "function") {
      updateWebsites(task.id, {
        websites: newLinksList
      })
    }
  }

  toggleHover = () => {
    this.setState({
      displayWebsites: !this.state.displayWebsites,
      zIndex: this.state.zIndex + 1
    })
  }

  render() {
    const { task, updateWebsites } = this.props;
    const { status, time, displayWebsites, showForm, zIndex } = this.state;
    const taskColor = {
      backgroundColor: status === "open" ? " #AA5864" : "burlywood"
    }
    const websitesDivStyle = {
      display: displayWebsites ? "block" : "none",
    }
    const liStyle = {
      zIndex: displayWebsites || showForm ? zIndex : "auto",
    }
    const formWebStyle = {
      display: showForm ? "block" : "none"
    }
    return (
      <div className="task-item" style={taskColor}>
        <li className="list-group-item" style={liStyle}>
          <div className="d-flex w-100">
            <div className="mr-auto">
              <h2>{task.title}</h2>
              <p>{task.description}</p>
            </div>
            <div>
              <p>Time: {time}</p>
            </div>
          </div>
          <a href=""
            onClick={this.handleStateBtn}
            className="btn btn-status float-right">
            {status === "open" ? "Finish" : "Start"}
          </a>
          <a href=""
            onClick={this.handleRemoveBtn}
            className="btn btn-delete float-right">
            Remove
            </a>
          <div
            onDoubleClick={this.handleShowFormBtn}
            className="btn btn-add-website float-right">
            Add website
                <FormAddWebsite
              formWebStyle={formWebStyle}
              updateWebsites={updateWebsites}
              taskID={task.id}
              taskWebsites={task.websites}
            />
          </div>
          <div
            onMouseLeave={this.toggleHover}
            onMouseUp={this.toggleHover}
            className="btn btn-websites float-right">
            Websites
            <Websites
              removeLink={this.removeLink}
              websitesDivStyle={websitesDivStyle}
              task={task}
            />
          </div>
        </li>
      </div>
    )
  }
}