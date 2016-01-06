var React = require('react');
var moment = require('moment');
//var TodoStore = require('../stores/TodoStore');

var Header = React.createClass({

    getInitialState: function() {
        return {month: this.props.month};
    },

    handleClick: function(event) {
        curDate = moment(this.state.month, "MMM YYYY");
        if(event.target.id === 'next'){
            curDate = curDate.add(1, 'month');
        }
        else {
            curDate = curDate.subtract(1, 'month');
        }
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
