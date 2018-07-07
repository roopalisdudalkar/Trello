import React from "react";

export default class Cards extends React.Component {
    constructor(props) {
        super(props) 
    }

    render() {
        return (<div className="trello-cards">
            <div id={this.props.id}
                data-column={this.props.column}
                data-currentVal={this.props.column + this.props.id}
                draggable='true'
                className={this.props.column + "-container-content"}
                onDragStart={this.props.onDragStart}
                value={this.props.currentValue}
                onDragLeave={this.props.ondragLeave}>
                {this.props.currentValue} 
            </div>
            <div className="changable-block">
                <span onClick={this.props.editTrelloCard.bind(this, this.props.id, this.props.column, this.props.currentValue)}>
                    <img src="../images/edit_img.png" width="15px" height="15px" />
                </span>
                <span onClick={this.props.deleteTrelloCard.bind(this, this.props.id, this.props.column, this.props.currentValue)}>
                    <img src="../images/delete_img.png" width="15px" height="15px" />
                </span>
            </div>
        </div>
        )
    }
}