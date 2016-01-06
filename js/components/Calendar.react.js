var React = require('react');
var CalendarDate = require('./CalendarDate.react');
var Header = require('./Header.react');
//var TodoStore = require('../stores/TodoStore');

var Calendar = React.createClass({

    render: function() {
        var DAYS = [];
        for (i=1; i<=42; i++){
            DAYS.push(<CalendarDate date={i} month={this.props.month}/>);
        }
        var WEEKS= [];
        for (i=0; i<6; i++){
            WEEKS[i] = DAYS.splice(0,7);
        }
        var month = WEEKS.map((week) => <tr> {week} </tr>);
        return(
                <div className="container">
                <div id="cal">
                <Header month={this.props.month} />
                <div id="calframe">
                <table className="curr">
                <tbody id='calendar-body'>
                <table>
                <tr>
                {month}
            </tr>
                </table>
                </tbody>
                </table>
                </div>
                </div>
                </div>
        );
    }
});

module.exports = Calendar;
