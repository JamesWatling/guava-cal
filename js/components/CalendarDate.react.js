var React = require('react');
var moment = require('moment');
var Event = require('../components/Event.react');
var CalendarStore = require('../stores/CalendarStore');
//var TodoStore = require('../stores/TodoStore');

var CLASSES = [
    { id: 1, name: "Open Gym", date: '2016-01-12', time: '09:00'},
    { id: 5, name: "Cross Fit", date: '2016-01-13', time: '11:15'},
    { id: 9, name: "Cross Fit (Extreme)", date: '2016-01-13', time: '15:35'},
    { id: 6, name: "Spin Class", date: '2016-01-14', time: '17:00'}
]

function getCurrentMonth() {
    return CalendarStore.currentMonth()
}

var CalendarDate = React.createClass({
    componentDidMount: function() {
        CalendarStore.addChangeListener(this._onChange);
    },

    componentWillUnmount: function() {
        CalendarStore.removeChangeListener(this._onChange);
    },
    _onChange: function() {
        this.setState({month: getCurrentMonth()});
    },
    getInitialState: function() {
        return {
            month: getCurrentMonth()
        }
    },

    render: function() {
        curMonth = moment(this.state.month, "MMM YYYY").format()
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

        var events = CLASSES.filter((classes) => {
            return moment(classes.date).format("YYYY-MM-DD") === moment(moment(moment(curMonth).format("YYYY-M") + "-" + (index - indexOfLastMonthEnd + 1 ))).format("YYYY-MM-DD");
        }).map((event) => <Event time={event.time} name={event.name} id={event.id}/>);

        return(
            <td className={curDateClass}>
            <div className="calendar--day__events">
            {displayDate}
            {events}
            </div>
            </td>
        );
    }
});

module.exports = CalendarDate;
