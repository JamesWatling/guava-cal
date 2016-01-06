var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var CalendarConstants = require('../constants/CalendarConstants');
var assign = require('object-assign');
var moment = require('moment');

var CHANGE_EVENT = 'change';
var data = {
    month: moment().format("MMM YYYY")
}

function changeMonth (month, direction) {
  curDate = moment(month, "MMM YYYY");
  if(direction === 'next'){
      curDate = curDate.add(1, 'month');
  }
  else {
      curDate = curDate.subtract(1, 'month');
  }
    console.log(data);
  data.month = curDate.format("MMM YYYY");
}

var CalendarStore = assign({}, EventEmitter.prototype, {

    currentMonth: function () {
        return data.month;
    },


    emitChange: function() {
        this.emit(CHANGE_EVENT);
    },

    addChangeListener: function(callback) {
        this.on(CHANGE_EVENT, callback);
    },

    removeChangeListener: function(callback) {
        this.removeListener(CHANGE_EVENT, callback);
    }
});

AppDispatcher.register(function(action) {

    switch(action.actionType) {
    case CalendarConstants.CALENDAR_CHANGE_MONTH:
        changeMonth(action.month, action.direction);
        CalendarStore.emitChange();
        break;

    default:
        // no op
    }
});

module.exports = CalendarStore;
