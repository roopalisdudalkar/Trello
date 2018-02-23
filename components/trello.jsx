import React from "react";
import AddTask from './addTask.jsx';
require('../css/trello.css');
require('../storage');

export default class Bar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todo: [],
      progress: [],
      done: [],
      showAddTask: false
    }

    this.addTask = this.addTask.bind(this);
    this.toggleAddTask = this.toggleAddTask.bind(this);
    this.drop = this.drop.bind(this);
    this.dragStart = this.dragStart.bind(this);
  }

  toggleAddTask() {
    this.setState({
      showAddTask: !this.state.showAddTask
    })
  }

  addTask(data) {
    this.setState({
      todo: [...this.state.todo, data],
      showAddTask: !this.state.showAddTask
    })
  }

  drop(event) {
    event.preventDefault();
    var data;
    try {
      data = JSON.parse(event.dataTransfer.getData('text'));
    } catch (e) {
      return;
    }
    console.log(data)
    this.setState({
      progress: [...this.state.progress, 'sdv']
    })
  }

  dragStart(event) {

    var data = {
      name: 'foobar',
      age: 15
    };

    event.dataTransfer.setData('text', JSON.stringify(data));

  }

  render() {
    var addTaskBtn = '', todoData = [], progressData = [];
    var _this = this;
    if (this.state.showAddTask) {
      addTaskBtn = <AddTask addTask={this.addTask}></AddTask>
    }

    if (this.state.todo.length > 0) {
      this.state.todo.map(function (data, key) {
        todoData[key] = <div onDragStart={_this.dragStart}
          draggable='true'
          onDrop={_this.drop}
          className="todo-container-content"
          onDragOver={event.preventDefault()}>
          {data}
        </div>
      })
    }

    if (this.state.progress.length > 0) {
      this.state.progress.map(function (data, key) {
        progressData[key] = <div onDragStart={_this.dragStart}
          draggable='true'
          onDrop={_this.drop}
          className="progress-container-content"
          onDragOver={event.preventDefault()}>
          {data}
        </div>
      })
    }

    return (
      <div className="trello-container">
        <div className="trello-title">Trello</div>
        <div className="trello-add-component-block">
          <span onClick={this.toggleAddTask}>Add</span>
          {addTaskBtn}
        </div>
        <div className="trello-components-container">
          <div className="todo-container">
            <div className="todo-container-title">Todo</div>
            {todoData}
          </div>
          <div className="progress-container">
            <div className="progress-container-title">In Progress</div>
            {progressData}
          </div>
          <div className="done-container">
            <div className="done-container-title">Done</div>
            <div draggable='true' onDrop={this.drop} className="done-container-content">sdvsvd</div>
          </div>
        </div>
      </div>
    )
  }
}