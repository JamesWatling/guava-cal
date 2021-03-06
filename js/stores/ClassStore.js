var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var ClassConstants = require('../constants/ClassConstants');
var assign = require('object-assign');

var CHANGE_EVENT = 'change';

// Remove after refactoring
var _classes = {};

/**
 * Create a TODO item.
 * @param  {string} text The content of the TODO
 */
function create(text) {
  // Hand waving here -- not showing how this interacts with XHR or persistent
  // server-side storage.
  // Using the current timestamp + random number in place of a real id.
  var id = (+new Date() + Math.floor(Math.random() * 999999)).toString(36);
  _classes[id] = {
    id: id,
    complete: false,
    text: text
  };
}

function classClicked(id) {
  console.log(id)
}

/**
 * Update a TODO item.
 * @param  {string} id
 * @param {object} updates An object literal containing only the data to be
 *     updated.
 */
function update(id, updates) {
  _classes[id] = assign({}, _classes[id], updates);
}

/**
 * Update all of the TODO items with the same object.
 * @param  {object} updates An object literal containing only the data to be
 *     updated.
 */
function updateAll(updates) {
  for (var id in _classes) {
    update(id, updates);
  }
}

/**
 * Delete a TODO item.
 * @param  {string} id
 */
function destroy(id) {
  delete _classes[id];
}

/**
 * Delete all the completed TODO items.
 */
function destroyCompleted() {
  for (var id in _classes) {
    if (_classes[id].complete) {
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
    for (var id in _classes) {
      if (!_classes[id].complete) {
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
    return _classes;
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
    case ClassConstants.CLASS_CREATE:
      text = action.text.trim();
      if (text !== '') {
        create(text);
        ClassStore.emitChange();
      }
      break;
    case ClassConstants.CLASS_CLICK:
      classClicked(action);
      ClassStore.emitChange();
      break;
    case ClassConstants.CLASS_DESTROY:
      destroyCompleted();
      ClassStore.emitChange();
      break;
    case ClassConstants.CLASS_DESTROY_COMPLETED:
      destroyCompleted();
      ClassStore.emitChange();
      break;

    default:
      // no op
  }
});

module.exports = ClassStore;
