var React = require('react');
var sortBy = require('sort-by');
var moment = require('moment');

var BOOKINGS = [
    { id: 1, name: "James Watling", type: 'GuavaPass', classID: 1},
    { id: 2, name: "Justin Louie", type: 'KFit', classID: 5 },
    { id: 3, name: "Leon Mok", type: 'ClassPass', classID: 6 }
];

var CLASSES = [
    { id: 1, name: "Open Gym", time: '2015-12-12'},
    { id: 5, name: "Cross Fit", time: '2015-12-13'},
    { id: 6, name: "Spin Class", time: '2015-12-14'}
];

var CalendarDate = React.createClass({
    render () {
        curDate = moment();

        daysInMonth = curDate.endOf('month').date();
        daysInLastMonth = moment().endOf('month').subtract(1, 'month').date();

        lastMonthEndDay = moment().endOf('month').subtract(1, 'month').day();
        startDay = moment(curDate.format("MMMM"), "MMMM").day();
        calendarDay = parseInt(this.props.date);
        lastMonth = calendarDay <= parseInt(startDay);

        index = this.props.date; //TODO rename index from props
        dayDiff = daysInLastMonth - index;
        indexOfLastMonthEnd = startDay + 1;
        nextMonth = index - indexOfLastMonthEnd + 1 > daysInMonth;
        curDateClass = (lastMonth || nextMonth) ? 'nil' : '';


        if(lastMonth){
            displayDate = daysInLastMonth - indexOfLastMonthEnd + index + 1;
        }
        else if(nextMonth){
            displayDate = index - (daysInLastMonth + indexOfLastMonthEnd);
        }
        else {
            console.log("calc: ", index - indexOfLastMonthEnd + 1);
            displayDate = index - indexOfLastMonthEnd + 1;
        }

        return(
            <td className={curDateClass}>
                <div className="calendar--day__events">
                {displayDate}
                </div>
            </td>
        )
    }
});

var DAYS = [];
for (i=1; i<=35; i++){
    DAYS.push(<CalendarDate date={i}/>);
}
var WEEKS= [];
for (i=0; i<5; i++){
    WEEKS[i] = DAYS.splice(0,7);
}
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

    render() {
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
        )
    }
});


var Calendar = React.createClass({
    render () {
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
        )
    }
});

var Classes = React.createClass({
    render () {
        var classes = CLASSES.map((event) => <li key={event.id}>{event.name} ({event.time})</li>);
        return(
            <div>
                <h1>Classes</h1>
                <ul>{classes}</ul>
            </div>
        )
    }
});

var App = React.createClass({
    render () {
        return(
              <div>
                <Calendar month={moment().format("MMM YYYY")} />
                <Classes />
              </div>
        )
    }
});

React.render(<App />, document.body);
