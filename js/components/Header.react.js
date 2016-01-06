var React = require('react');
var moment = require('moment');
var CalendarActions = require('../actions/CalendarActions')
var CalendarStore = require('../stores/CalendarStore');

var Header = React.createClass({

    getInitialState: function() {
        return {month: CalendarStore.currentMonth()};
    },

    handleClick: function(event) {
        CalendarActions.changeMonth(this.state.month, event.target.id);
        this.setState({month: curDate.format("MMM YYYY")});
    },

    render: function() {
        return(
            <div>
              <div className="header">
                <span className="left button" id="prev" onClick={this.handleClick}> &lang; </span>
                <span className="month-year" id="label"> {this.state.month} </span>
                <span className="right button" id="next" onClick={this.handleClick}> &rang; </span>
              </div>
              <table id="days">
                <thead>
                  <td>Sun</td>
                  <td>Mon</td>
                  <td>Tue</td>
                  <td>Wed</td>
                  <td>Thu</td>
                  <td>Fri</td>
                  <td>Sat</td>
                </thead>
              </table>
            </div>
        );
    }
});

module.exports = Header;
