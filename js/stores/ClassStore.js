var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var ClassConstants = require('../constants/ClassConstants');
var assign = require('object-assign');

var CHANGE_EVENT = 'change';

// Remove after refactoring
var _todos = {};

/**
 * Create a TODO item.
 * @param  {string} text The content of the TODO
 */
function create(text) {
  // Hand waving here -- not showing how this interacts with XHR or persistent
  // server-side storage.
  // Using the current timestamp + random number in place of a real id.
  var id = (+new Date() + Math.floor(Math.random() * 999999)).toString(36);
  _todos[id] = {
    id: id,
    complete: false,
    text: text
  };
}

/**
 * Update a TODO item.
 * @param  {string} id
 * @param {object} updates An object literal containing only the data to be
 *     updated.
 */
function update(id, updates) {
  _todos[id] = assign({}, _todos[id], updates);
}

/**
 * Update all of the TODO items with the same object.
 * @param  {object} updates An object literal containing only the data to be
 *     updated.
 */
function updateAll(updates) {
  for (var id in _todos) {
    update(id, updates);
  }
}

/**
 * Delete a TODO item.
 * @param  {string} id
 */
function destroy(id) {
  delete _todos[id];
}

/**
 * Delete all the completed TODO items.
 */
function destroyCompleted() {
  for (var id in _todos) {
    if (_todos[id].complete) {
      destroy(id);
    }
  }
}

var ClassStore = assign({}, EventEmitter.prototype, {

  /**
   * Tests whether all the remaining TODO items are marked as completed.
   * @return {boolean}
   */
  areAllComplete: function() {
    for (var id in _todos) {
      if (!_todos[id].complete) {
        return false;
      }
    }
    return true;
  },

  /**
   * Get the entire collection of TODOs.
   * @return {object}
   */
  getAll: function() {
    return _todos;
  },

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  /**
   * @param {function} callback
   */
  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  /**
   * @param {function} callback
   */
  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }
});

// Register callback to handle all updates
AppDispatcher.register(function(action) {
  var text;

  switch(action.actionType) {
    case ClassConstants.TODO_CREATE:
      text = action.text.trim();
      if (text !== '') {
        create(text);
        ClassStore.emitChange();
      }
      break;

    case ClassConstants.TODO_TOGGLE_COMPLETE_ALL:
      if (ClassStore.areAllComplete()) {
        updateAll({complete: false});
      } else {
        updateAll({complete: true});
      }
      ClassStore.emitChange();
      break;

    case ClassConstants.TODO_UNDO_COMPLETE:
      update(action.id, {complete: false});
      ClassStore.emitChange();
      break;

    case ClassConstants.TODO_COMPLETE:
      update(action.id, {complete: true});
      ClassStore.emitChange();
      break;

    case ClassConstants.TODO_UPDATE_TEXT:
      text = action.text.trim();
      if (text !== '') {
        update(action.id, {text: text});
        ClassStore.emitChange();
      }
      break;

    case ClassConstants.TODO_DESTROY:
      destroy(action.id);
      ClassStore.emitChange();
      break;

    case ClassConstants.TODO_DESTROY_COMPLETED:
      destroyCompleted();
      ClassStore.emitChange();
      break;

    default:
      // no op
  }
});

module.exports = ClassStore;
