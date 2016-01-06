var React = require('react');
var CalendarDate = require('./CalendarDate.react');
var Header = require('./Header.react');
var CalendarStore = require('../stores/CalendarStore');

function getCurrentMonth() {
    return {
        month: CalendarStore.currentMonth()
    }
}
var Calendar = React.createClass({
    getInitialState: function() {
        return {
            month: CalendarStore.currentMonth()
        }
    },

    render: function() {
        var DAYS = [];
        for (i=1; i<=42; i++){
            DAYS.push(<CalendarDate date={i} month={getCurrentMonth().month}/>);
        }
        var WEEKS= [];
        for (i=0; i<6; i++){
            WEEKS[i] = DAYS.splice(0,7);
        }
        var month = WEEKS.map((week) => <tr> {week} </tr>);
        return(
                <div className="container">
                  <div id="cal">
                    <Header month={getCurrentMonth().month} />
                    <div id="calframe">
                      <table className="curr">
                        <tbody id='calendar-body'>
                          <tr>
                            {month}
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
        );
    },
});

module.exports = Calendar;
