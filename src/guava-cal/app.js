var React = require('react');
var sortBy = require('sort-by');
var moment = require('moment');

var BOOKINGS = [
    { id: 1, name: "James Watling", type: 'GuavaPass', classID: 1},
    { id: 2, name: "Justin Louie", type: 'KFit', classID: 5 },
    { id: 3, name: "Leon Mok", type: 'ClassPass', classID: 6 }
];

var CLASSES = [
    { id: 1, name: "Open Gym", date: '2015-12-12', time: '09:00'},
    { id: 5, name: "Cross Fit", date: '2015-12-13', time: '11:15'},
    { id: 9, name: "Cross Fit (Extreme)", date: '2015-12-13', time: '15:35'},
    { id: 6, name: "Spin Class", date: '2015-12-14', time: '17:00'}
];

var CalendarDate = React.createClass({
    render () {
        curMonth = moment(this.props.month, "MMM YYYY").format()
        curDate = moment(curMonth);
        index = this.props.date;

        daysInCurrentMonth = curDate.endOf('month').date();
        daysInLastMonth = moment(curMonth).subtract(1, 'month').endOf('month').date();
        dayLastMonthEnds = moment(curMonth).subtract(1, 'month').endOf('month').day();
        dayCurrentMonthStarts = moment(curDate.format("MMMM"), "MMMM").day();
        dayCurrentMonthEnds = moment(curDate.format("MMMM"), "MMMM").endOf('month').date();
        calendarDay = parseInt(this.props.date);
        inLastMonth = calendarDay <= parseInt(dayCurrentMonthStarts);

        dayDiff = daysInLastMonth - index;
        indexOfLastMonthEnd = dayCurrentMonthStarts + 1;
        inNextMonth = index - indexOfLastMonthEnd + 1 > daysInCurrentMonth;
        curDateClass = (inLastMonth || inNextMonth) ? 'nil' : '';


        if(inLastMonth){
            displayDate = daysInLastMonth - indexOfLastMonthEnd + index + 1;
        }
        else if(inNextMonth){
            displayDate = Math.abs(dayCurrentMonthEnds - index) - indexOfLastMonthEnd +1;
        }
        else {
            displayDate = index - indexOfLastMonthEnd + 1;
        }
        var events = CLASSES.map((event) => <Event name={event.name}/>)
        var events = CLASSES.filter((classes) => {
            return moment(classes.date).format("YYYY-MM-DD") === moment(moment(moment(curMonth).format("YYYY-M") + "-" + (index - indexOfLastMonthEnd + 1 ))).format("YYYY-MM-DD");
        }).map((event) => <Event time={event.time} name={event.name}/>);

        return(
            <td className={curDateClass}>
                <div className="calendar--day__events">
                {displayDate}
                {events}
                </div>
            </td>
        )
    }
});

var Event = React.createClass({
    render () {
        return(
            <div>
                <span className="time">{this.props.time}</span>
                {this.props.name}
            </div>
        )
    }
});

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
    getDefaultProps: function() {
        return { month: "Feb 2016" };
    },
    render () {
        return(
              <div>
                <Calendar month={moment(this.props.month).format("MMM YYYY")} />
                <Classes />
              </div>
        )
    }
});

React.render(<App />, document.body);
