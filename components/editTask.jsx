import React from "react";

export default class EditTask extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            value: props.data.value
        }

        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleInputChange(e) {
        this.setState({
            value: e.target.value
        })
    }

    render() {
        var data = this.props.data;
        data.value = this.state.value;

        return (
            <div className="addTask-block">
                <textarea rows="4" cols="22" className="addTask-data" onChange={this.handleInputChange}
                    defaultValue={this.state.value}>
                </textarea>

                <button onClick={this.props.editTask.bind(this, data)}>Done</button>
            </div>
        )
    }
}