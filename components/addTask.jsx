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
        <textarea rows="4" cols="22" className="addTask-data" onChange={this.handleInputChange}
          defaultValue={this.state.task} autoFocus>
        </textarea>

        <button onClick={this.props.addTask.bind(this, this.state.task)}>Add</button>
      </div>
    )
  }
}