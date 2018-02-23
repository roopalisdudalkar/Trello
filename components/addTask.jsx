import React from "react";

export default class AddTask extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      task: ''
    }

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(e) {
    this.setState({
      task: e.target.value
    })
  }

  render() {
    return (
      <div className="addTask-block">
        <input type="text"
          className="addTask-data"
          value={this.state.task}
          onChange={this.handleInputChange}>
        </input>
        <button onClick={this.props.addTask.bind(this, this.state.task)}>Add</button>
      </div>
    )
  }
}