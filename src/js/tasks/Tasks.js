import React from "react";
import Task from "./task/Task";

export default
  class Tasks extends React.Component {
  render() {
    const { tasks, updateStatus, updateWebsites, removeTask } = this.props;
    return (
      <div>
        <ul className="tasksList">
          {tasks.map((task, i) => (
            <Task
              removeTask={removeTask}
              updateStatus={updateStatus}
              updateWebsites={updateWebsites}
              key={i}
              task={task}
            />
          ))}
        </ul>
      </div>
    )
  }
}