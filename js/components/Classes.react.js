//var Footer = require('./Footer.react');
var Classes = require('./Classes.react');
var React = require('react');
//var TodoStore = require('../stores/TodoStore');

var CLASSES = [
    { id: 1, name: "Open Gym", date: '2016-01-12', time: '09:00'},
    { id: 5, name: "Cross Fit", date: '2016-01-13', time: '11:15'},
    { id: 9, name: "Cross Fit (Extreme)", date: '2016-01-13', time: '15:35'},
    { id: 6, name: "Spin Class", date: '2016-01-14', time: '17:00'}
]

var Classes = React.createClass({

    render: function() {
        var classes = CLASSES.map((event) => <li key={event.id}>{event.name} ({event.time})</li>);
        return (
            <div>
              <h1>Classes</h1>
              <ul>{classes}</ul>
            </div>
        );
    }
});

module.exports = Classes;
