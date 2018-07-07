import React from "react";
import AddTask from './addTask.jsx';
import EditTask from './editTask.jsx';
import Card from './cards.jsx';

require('../css/trello.css');

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
    this.deleteTrelloCard = this.deleteTrelloCard.bind(this);
    this.ondragLeave = this.ondragLeave.bind(this); 
  }

  //get data from localstorage
  componentWillMount() {
    if (localStorage) {
      if (localStorage.todo) {
        var todoData = JSON.parse(localStorage.getItem("todo"))
        this.setState({
          todo: todoData
        })
      }
      if (localStorage.progress) {
        var progressData = JSON.parse(localStorage.getItem("progress"))
        this.setState({
          progress: progressData
        })
      }
      if (localStorage.done) {
        var doneData = JSON.parse(localStorage.getItem("done"))
        this.setState({
          done: doneData
        })
      }
    }
  }

  ondragLeave(event) {
    var card = event.target.dataset.column;
    if (document.getElementById(card)) {
      var mainCrad = document.getElementById(card)
      mainCrad.classList.remove('addBorder')
    }
  }

  //edit data of the card
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
      }, function () {
        if (localStorage) {
          localStorage.setItem("todo", JSON.stringify(this.state.todo));
        }
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
      }, function () {
        if (localStorage) {
          localStorage.setItem([data.column], JSON.stringify(this.state[data.column]));
        }
      })
    }
  }

  deleteTrelloCard(id, card, value) {
    let cardState = this.state[card];
    cardState.splice(id, 1);
    this.setState({
      [card]: cardState,
    }, function () {
      if (localStorage) {
        localStorage.setItem([card], JSON.stringify(this.state[card]));
      }
    })
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
      let targetState = this.state[targetListClass];
      if (targetListClass !== currentList) {
        targetState.splice(targetList, 0, currentcardValue);
        let updatedCurrentList = (this.state[currentList]).splice(currentCard, 1);
        this.setState({
          [currentList]: this.state[currentList],
          [targetList]: targetState
        }, function () {
          if (localStorage) {
            localStorage.setItem(currentList, JSON.stringify(this.state[currentList]));
            localStorage.setItem(targetList, JSON.stringify(this.state[targetList]));
          }
        })
      }
      else {
        targetState[targetList] = currentcardValue;
        targetState[currentCard] = event.target.innerHTML;
        // let temp = aa;
        // aa = bb;
        // bb = temp;

        this.setState({
          [targetList]: targetState
        }, function () {
          if (localStorage) {
            localStorage.setItem(targetListClass, JSON.stringify(this.state[targetList]));
          }
        })
      }
    }
    else {
      if (this.state[targetList] && this.state[currentList]) {
        let updatedCurrentList = (this.state[currentList]).splice(currentCard, 1);
        let updatedTargetList = (this.state[targetList]).push(currentcardValue);
        event.dataTransfer.clearData()
        this.setState({
          [currentList]: this.state[currentList],
          [targetList]: this.state[targetList]
        }, function () {
          if (localStorage) {
            localStorage.setItem(targetList, JSON.stringify(this.state[targetList]));
            localStorage.setItem(currentList, JSON.stringify(this.state[currentList]));
          }
        })
      }
    }
  }

  dragStart(event) {
    var data = event.target.innerText;
    var card = event.target.dataset.column;

    var currentData = {
      id: event.target.id,
      value: data,
      column: card
    }
    event.dataTransfer.setData("text", JSON.stringify(currentData));
  }

  stopredirection(e) {
    e.preventDefault();
    var card = e.target.dataset.column;
    if (document.getElementById(card)) {
      var mainCrad = document.getElementById(card)
      mainCrad.classList.add('addBorder')
    }
  }

  render() {
    var addTaskBtn = '', todoData = [], progressData = [], doneData = [];
    var _this = this;
    if (this.state.showAddTask) {
      addTaskBtn = <AddTask addTask={this.addTask}></AddTask>
    }
    //display all todo list
    if (this.state.todo.length > 0) {
      this.state.todo.map(function (data, key) {
        if (_this.state.editToggle && "todo" === _this.state.info.column && _this.state.info.id === key) {
          todoData.push(<div><EditTask data={_this.state.info} editTask={_this.editTask}></EditTask></div>);
        }
        else {
          todoData.push(<Card id={key}
            column="todo"
            onDragStart={_this.dragStart}
            editTrelloCard={_this.editTrelloCard}
            currentValue={data}
            deleteTrelloCard={_this.deleteTrelloCard}>
          </Card>);
        }
      });
    }

    //display all progress list
    if (this.state.progress.length > 0) {
      this.state.progress.map(function (data, key) {
        if (_this.state.editToggle && "progress" === _this.state.info.column && _this.state.info.id === key) {
          progressData.push(<div><EditTask data={_this.state.info} editTask={_this.editTask}></EditTask></div>);
        }
        else {
          progressData.push(<Card id={key}
            column="progress"
            onDragStart={_this.dragStart}
            editTrelloCard={_this.editTrelloCard}
            currentValue={data}
            deleteTrelloCard={_this.deleteTrelloCard}>
          </Card>);
        }
      })
    }

    //display all done list
    if (this.state.done.length > 0) {
      this.state.done.map(function (data, key) {
        if (_this.state.editToggle && "done" === _this.state.info.column && _this.state.info.id === key) {
          doneData.push(<div><EditTask data={_this.state.info} editTask={_this.editTask}></EditTask></div>);
        }
        else {
          doneData.push(<Card id={key}
            column="done"
            onDragStart={_this.dragStart}
            editTrelloCard={_this.editTrelloCard}
            currentValue={data}
            deleteTrelloCard={_this.deleteTrelloCard}>
          </Card>)
        }
      })
    }

    return (
      <div className="trello-container">
        <div className="trello-title">Trello</div>
        <div className="trello-components-container">

          <div className="todo-container" onDrop={_this.drop}
            onDragOver={_this.stopredirection} id="todo" onDragLeave={_this.ondragLeave}>
            <div className="todo-container-title">Todo</div>
            {todoData}
            <div className="trello-add-component-block">
              <div onClick={this.toggleAddTask} className="add-card">Add a card</div>
              {addTaskBtn}
            </div>
          </div>

          <div className="progress-container" onDrop={_this.drop}
            onDragOver={_this.stopredirection} id="progress" onDragLeave={_this.ondragLeave}>
            <div className="progress-container-title">In Progress</div>
            {progressData}
          </div>

          <div className="done-container" onDrop={_this.drop}
            onDragOver={_this.stopredirection} id="done" onDragLeave={_this.ondragLeave}>
            <div className="done-container-title">Done</div>
            {doneData}
          </div>
        </div>
      </div>
    )
  }
}