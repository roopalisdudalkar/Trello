import React from "react";
import AddTask from './addTask.jsx';
import EditTask from './editTask.jsx';
require('../css/trello.css');
require('../storage');

export default class Bar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todo: [],
      progress: [],
      done: [],
      showAddTask: false,
      editToggle: false,
      info: []
    }

    this.addTask = this.addTask.bind(this);
    this.toggleAddTask = this.toggleAddTask.bind(this);
    this.drop = this.drop.bind(this);
    this.dragStart = this.dragStart.bind(this);
    this.stopredirection = this.stopredirection.bind(this);
    this.editTrelloCard = this.editTrelloCard.bind(this);
    this.editTask = this.editTask.bind(this);
  }

  editTrelloCard(id, card, value) {
    var info = {
      id: id,
      column: card,
      value: value
    }
    this.setState({
      info: info,
      editToggle: true
    })
  }

  toggleAddTask() {
    this.setState({
      showAddTask: !this.state.showAddTask
    })
  }

  addTask(data) {
    if (data === '' || data === null) {
      alert('Please enter a valid data for the card');
    }
    else {
      this.setState({
        todo: [...this.state.todo, data],
        showAddTask: !this.state.showAddTask
      })
    }
  }

  editTask(data) {
    if (data === '' || data === null) {
      alert('Please enter a valid data for the card');
    }
    else {
      let cardState = this.state[data.column];
      cardState[data.id] = data.value;
      this.setState({
        [data.column]: cardState,
        editToggle: false
      })
    }
  }

  drop(event) {
    event.preventDefault();
    let data = JSON.parse(event.dataTransfer.getData('text'));
    let currentCard = data.id;
    let currentList = data.column;
    let currentcardValue = data.value;
    let targetList = event.target.id;
    if (event.target.dataset.column) {
      let targetListClass = event.target.dataset.column;
      let vvv = this.state[targetListClass];
      if (targetListClass !== currentList) {
        vvv.splice(targetList, 0, currentcardValue);
        let updatedCurrentList = (this.state[currentList]).splice(currentCard, 1);
        this.setState({
          [currentList]: this.state[currentList],
          [targetList]: vvv
        })
      }
      else {
        vvv[targetList] = currentcardValue;
        vvv[currentCard] = event.target.innerHTML;
        // let temp = aa;
        // aa = bb;
        // bb = temp;

        this.setState({
          [targetList]: vvv
        })
      }
    }
    else {
      let updatedCurrentList = (this.state[currentList]).splice(currentCard, 1);
      let updatedTargetList = (this.state[targetList]).push(currentcardValue);
      event.dataTransfer.clearData()
      this.setState({
        [currentList]: this.state[currentList],
        [targetList]: this.state[targetList]
      }, () => {

        console.log(this.state);
      })
    }


    // if (id[0] === 'todo') {
    //   var aa = (this.state.todo).splice(id[1], 1);
    //   this.setState({
    //     todo: [...this.state.todo, aa]
    //   })
    // }
    // event.target.appendChild(document.getElementById(data));
    // this.setState({
    //   progress: [...this.state.progress, 'roopa']
    // }, event.dataTransfer.clearData())
  }

  dragStart(event) {

    var data = event.target.innerText;
    event.currentTarget.style.border = "dashed";

    var currentData = {
      id: event.target.id,
      value: data,
      column: event.target.dataset.column
    }

    event.dataTransfer.setData("text", JSON.stringify(currentData));
  }

  stopredirection(e) {
    e.preventDefault();
  }

  render() {
    var addTaskBtn = '', todoData = [], progressData = [], doneData = [];
    var _this = this;
    if (this.state.showAddTask) {
      addTaskBtn = <AddTask addTask={this.addTask}></AddTask>
    }

    if (this.state.todo.length > 0) {
      if (this.state.editToggle) {
        todoData.push(<div><EditTask data={this.state.info} task="hsdv" editTask={_this.editTask}></EditTask></div>);
      }
      else {
        this.state.todo.map(function (data, key) {
          todoData[key] = <input
            id={key}
            data-column="todo"
            data-currentVal={"todo" + key}
            draggable='true'
            className="todo-container-content"
            onDragStart={_this.dragStart}
            onClick={_this.editTrelloCard.bind(_this, key, 'todo', data)}
            value={data}>
          </input>
        })
      }
    }

    if (this.state.progress.length > 0) {
      if (this.state.editToggle) {
        todoData.push(<div><EditTask data={this.state.info} task="hsdv" editTask={_this.editTask}></EditTask></div>);
      }
      else {
        this.state.progress.map(function (data, key) {
          progressData[key] = <div
            draggable='true'
            data-currentVal={"progress" + key}
            data-column="progress"
            id={key}
            onDragStart={_this.dragStart}
            className="progress-container-content"
            onClick={_this.editTrelloCard.bind(_this, key, 'todo', data)}>
            {data}
          </div>
        })
      }
    }

    if (this.state.done.length > 0) {
      if (this.state.editToggle) {
        todoData.push(<div><EditTask data={this.state.info} task="hsdv" editTask={_this.editTask}></EditTask></div>);
      }
      else {
        this.state.done.map(function (data, key) {
          doneData[key] = <div
            draggable='true'
            data-currentVal={"done" + key}
            data-column="done"
            id={key}
            onDragStart={_this.dragStart}
            className="done-container-content"
            onClick={_this.editTrelloCard.bind(_this, key, 'todo', data)}>
            {data}
          </div>
        })
      }
    }

    return (
      <div className="trello-container">
        <div className="trello-title">Trello</div>
        <div className="trello-components-container">
          <div className="todo-container" onDrop={_this.drop}
            onDragOver={_this.stopredirection} id="todo">
            <div className="todo-container-title">Todo</div>
            {todoData}
            <div className="trello-add-component-block">
              <div onClick={this.toggleAddTask} className="add-card">Add a card</div>
              {addTaskBtn}
            </div>
          </div>
          <div className="progress-container" onDrop={_this.drop}
            onDragOver={_this.stopredirection} id="progress">
            <div className="progress-container-title">In Progress</div>
            {progressData}
          </div>
          <div className="done-container" onDrop={_this.drop}
            onDragOver={_this.stopredirection} id="done">
            <div className="done-container-title">Done</div>
            {doneData}
          </div>
        </div>
      </div>
    )
  }
}