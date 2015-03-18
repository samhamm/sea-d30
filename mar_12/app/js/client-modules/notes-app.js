'use strict';

var React = require('react');
var Fluxxor = require('fluxxor');

var constants = {
  ADD_NOTE: 'ADD_NOTE',
  TOGGLE_EDIT_NOTE: 'TOGGLE_EDIT_NOTE',
  UPDATE_NOTE: 'UPDATE_NOTE',
  REMOVE_NOTE: 'REMOVE_NOTE'
};

var flux = new Fluxxor.Flux(stores, actions);

var FluxMixin = Fluxxor.FluxMixin(React);
var StoreWatchMixin = Fluxxor.StoreWatchMixin;

var NoteStore = require('./note-store.js');

var Note = require('./note.js');

var NoteForm = require('./note-form.js');

var NoteList = require('./note-list.js');

var stores = {
  NoteStore: new NoteStore()
};

var actions = {
  addNote: function(note) {
    this.dispatch(constants.ADD_NOTE, note);
  },

  deleteNote: function(note) {
    this.dispatch(constants.REMOVE_NOTE, note);
  }
};

module.exports = React.createClass({
  mixins: [FluxMixin, StoreWatchMixin('NoteStore')],

  getStateFromFlux: function() {
    return this.getFlux().store('NoteStore').getState();
  },
  render: function() {
    return (
      <main>
        <NoteForm />
        <NoteList data={this.state.notes} />
      </main>
    )
  }
});
