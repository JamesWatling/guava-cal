var AppDispatcher = require('../dispatcher/AppDispatcher');
var CalendarConstants = require('../constants/CalendarConstants');

var CalendarActions = {

    changeMonth: function(month, direction) {
    AppDispatcher.dispatch({
      actionType: CalendarConstants.CALENDAR_CHANGE_MONTH,
      month: month,
      direction: direction
    });
  },

};

module.exports = CalendarActions;
