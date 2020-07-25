import React from "react";

import Tasks from "./Tasks";
import Form from "./Form";

class Item {
  constructor(id, title, description, status, timeSpent, websites) {
    this.id = id,
      this.title = title,
      this.description = description,
      this.status = status,
      this.timeSpent = timeSpent,
      this.websites = websites
  }
}

export default
  class Main extends React.Component {
  state = {
    apiURL: "http://localhost:3000/tasks",
    tasks: []
  }

  getAllTasks = async () => {
    const { apiURL } = this.state;
    try {
      const data = await fetch(apiURL);
      const newTasks = await data.json();

      const resulTasks = [];
      newTasks.forEach((task) => (
        resulTasks.push(
          new Item(task.id, task.title, task.description, task.status, task.timeSpent, task.websites
        ))
      ));

      this.setState({
        tasks: resulTasks
      })
    } catch (error) {
      console.error(error);
    }
  }

  addNewTask = async (task) => {
    const { apiURL } = this.state;
    try {
      return await fetch(apiURL, {
        method: "POST",
        body: JSON.stringify(task),
        headers: {
          "Content-Type": "application/json"
        }
      }), this.getAllTasks();
    } catch (error) {
      console.error(error);
    }
  }

  updateStatus = async (taskID, status) => {
    const { apiURL } = this.state;
    try {
      return await fetch(`${apiURL}/${taskID}`, {
        method: "PATCH",
        body: JSON.stringify(status),
        headers: {
          "Content-Type": "application/json"
        }
      }), this.getAllTasks();
    } catch (err) {
      console.error(err)
    }
  }

  updateWebsites = async (taskID, website) => {
    const { apiURL } = this.state;
    try {
      return await fetch(`${apiURL}/${taskID}`, {
        method: "PATCH",
        body: JSON.stringify(website),
        headers: {
          "Content-Type": "application/json"
        }
      }), this.getAllTasks();
    } catch (err) {
      console.error(err)
    }
  }

  deleteTask = async id => {
    const { apiURL } = this.state;
    try {
      return await fetch(`${apiURL}/${id}`, {
        method: "DELETE"
      }), await this.getAllTasks();
    } catch (err) {
      console.error(err);
    }
  };

  componentDidMount() {
    this.getAllTasks();
  }

  render() {
    return (
      <div className="jumbotron container todo-app">
        <Form
          addNewTask={this.addNewTask}
        />
        <Tasks
          tasks={this.state.tasks}
          removeTask={this.deleteTask}
          updateStatus={this.updateStatus}
          updateWebsites={this.updateWebsites}
        />
      </div>
    )
  }
}