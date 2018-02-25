import React from "react";

export default class Cards extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (<div>
            <div id={this.props.id}
                data-column={this.props.column}
                data-currentVal={this.props.column + this.props.id}
                draggable='true'
                className={this.props.column + "-container-content"}
                onDragStart={this.props.onDragStart}
                value={this.props.currentvalue}>
                {this.props.currentvalue}
            </div>
            <div className="changable-block">
                <span onClick={this.props.editTrelloCard.bind(this, this.props.id, this.props.column, this.props.currentvalue)}>edit</span>
                <span onClick={this.props.deleteTrelloCard.bind(this, this.props.id, this.props.column, this.props.currentvalue)}>delete</span>
            </div>
        </div>
        )
    }
}