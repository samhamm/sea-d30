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

var NoteStore = require('./note-store.js');

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
  mixins: [FluxMixin],
  handleDelete: function() {
    this.getFlux().actions.deleteNote(this.props.data);
  },
  render: function() {
    return <li><span>{this.props.data.author + ': '}</span>{this.props.data.noteBody}<button onClick={this.handleDelete}>Delete</button></li>
  }
});
