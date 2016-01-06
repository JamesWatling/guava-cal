var React = require('react');
var ClassActions = require('../actions/ClassActions')
//var TodoStore = require('../stores/TodoStore');

var Event = React.createClass({

    render: function() {
        return(
                <div onClick={this._onClick}>
                <span className="time">{this.props.time}</span>
                {this.props.name}
            </div>
        );
    },
    _onClick: function() {
        ClassActions.click(this.props.id);
    },
});

module.exports = Event;
