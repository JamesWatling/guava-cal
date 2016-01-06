//var Footer = require('./Footer.react');
var moment = require('moment');
var Calendar = require('./Calendar.react');
var Classes = require('./Classes.react');
var Header = require('./Header.react');
var Event = require('./Event.react');
var React = require('react');
var sortBy = require('sort-by');

var ClassStore = require('../stores/ClassStore');

/**
 * Retrieve the current TODO data from the ClassStore
 */
function getCalState() {
  return {
      month: "Jan 2016",
  };
}

var CalendarApp = React.createClass({

  getDefaultProps: function() {
    return { month: "Jan 2016" };
  },

  getInitialState: function() {
    return getCalState();
  },

  componentDidMount: function() {
    ClassStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    ClassStore.removeChangeListener(this._onChange);
  },

  /**
   * @return {object}
   */
  render: function() {
    return (
            <div>
              <Calendar month={moment(this.props.month).format("MMM YYYY")} />
              <Classes />
            </div>
    );
  },

  /**
   * Event handler for 'change' events coming from the ClassStore
   */
  _onChange: function() {
    this.setState(getTodoState());
  }

});

module.exports = CalendarApp;
