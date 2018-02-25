import React from "react";

export default class Cards extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div
                id={this.props.id}
                data-column={this.props.column}
                data-currentVal={this.props.column + this.props.id}
                draggable='true'
                className={this.props.column + "-container-content"}
                onDragStart={this.props.onDragStart}
                onClick={this.props.editTrelloCard.bind(this, this.props.id, this.props.column, this.props.currentvalue)}
                value={this.props.currentvalue}>
                {this.props.currentvalue}
            </div>
        )
    }
}