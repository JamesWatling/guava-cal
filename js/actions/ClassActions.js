var AppDispatcher = require('../dispatcher/AppDispatcher');
var ClassConstants = require('../constants/ClassConstants');

var ClassActions = {

  create: function(text) {
    AppDispatcher.dispatch({
      actionType: ClassConstants.CLASS_CREATE,
      text: text
    });
  },

  destroy: function(id) {
    AppDispatcher.dispatch({
      actionType: ClassConstants.CLASS_DESTROY,
      id: id
    });
  },

  click: function(id) {
    AppDispatcher.dispatch({
      actionType: ClassConstants.CLASS_CLICK,
      id: id
    });
  },

  destroyCompleted: function() {
    AppDispatcher.dispatch({
      actionType: ClassConstants.CLASS_DESTROY_COMPLETED
    });
  }

};

module.exports = ClassActions;
