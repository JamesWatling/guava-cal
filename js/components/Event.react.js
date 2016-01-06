var React = require('react');
//var TodoStore = require('../stores/TodoStore');

var Event = React.createClass({

    render: function() {
        return(
            <div>
                <span className="time">{this.props.time}</span>
                {this.props.name}
            </div>
        );
    }
});

module.exports = Event;
