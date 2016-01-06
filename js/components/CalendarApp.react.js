//var Footer = require('./Footer.react');
var moment = require('moment');
var Calendar = require('./Calendar.react');
var Classes = require('./Classes.react');
var Header = require('./Header.react');
var Event = require('./Event.react');
var React = require('react');
var sortBy = require('sort-by');

var ClassStore = require('../stores/ClassStore');
var CalendarStore = require('../stores/CalendarStore');


function getCalendarState() {
    return {
        month: CalendarStore.currentMonth()
    }
}

var CalendarApp = React.createClass({

  _onChange: function() {
      this.setState(CalendarStore.currentMonth());
  },
  getInitialState: function() {
      return getCalendarState();
  },

  componentDidMount: function() {
    ClassStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    ClassStore.removeChangeListener(this._onChange);
  },

  render: function() {
    return (
            <div>
              <Calendar month={moment(this.state.month).format("MMM YYYY")} />
              <Classes />
            </div>
    );
  },
});

module.exports = CalendarApp;
