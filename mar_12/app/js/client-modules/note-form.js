'use strict';

var React = require('react');
var Fluxxor = require('fluxxor');
var request = require('superagent');

var constants = {
  ADD_NOTE: 'ADD_NOTE',
  TOGGLE_EDIT_NOTE: 'TOGGLE_EDIT_NOTE',
  UPDATE_NOTE: 'UPDATE_NOTE',
  REMOVE_NOTE: 'REMOVE_NOTE'
};

var baseUrl = '/api/v1/notes';

var flux = new Fluxxor.Flux(stores, actions);

var FluxMixin = Fluxxor.FluxMixin(React);
var StoreWatchMixin = Fluxxor.StoreWatchMixin;

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
  getInitialState: function() {
    return {newNote: {noteBody: ''}};
  },
  handleChange: function(event) {
    event.preventDefault();

    var stateCopy = this.state;
    if (event.target.name === 'new-note-body')
      stateCopy.newNote.noteBody = event.target.value;
    if (event.target.name === 'new-note-author')
      stateCopy.newNote.author = event.target.value;

    this.setState(stateCopy);
  },
  handleSubmit: function(event) {
    event.preventDefault();

    this.getFlux().actions.addNote(this.state.newNote);
    this.setState({newNote: {noteBody: ''}});
  },
  render: function() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label htmlFor="new-note-body">New Note</label>
        <input id="new-note-body" type="text" value={this.state.newNote.noteBody} onChange={this.handleChange} name="new-note-body"/>
        <label htmlFor="new-note-author">Your Name:</label>
        <input id="new-note-author" type="text" value={this.state.newNote.author} onChange={this.handleChange} name="new-note-author" />
        <button type="submit">Create New Note</button>
      </form>
    )
  }
});
