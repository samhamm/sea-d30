'use strict';

var React = require('react');
var Fluxxor = require('fluxxor');

var constants = {
  ADD_NOTE: 'ADD_NOTE',
  TOGGLE_EDIT_NOTE: 'TOGGLE_EDIT_NOTE',
  UPDATE_NOTE: 'UPDATE_NOTE',
  REMOVE_NOTE: 'REMOVE_NOTE'
};

var actions = {
  addNote: function(note) {
    this.dispatch(constants.ADD_NOTE, note);
  },

  deleteNote: function(note) {
    this.dispatch(constants.REMOVE_NOTE, note);
  }
};

var NoteStore = require('./client-modules/note-store.js');

var stores = {
  NoteStore: new NoteStore()
};

var flux = new Fluxxor.Flux(stores, actions);

var NoteForm = require('./client-modules/note-form.js');

var Note = require('./client-modules/note.js');

var NoteList = require('./client-modules/note-list.js');

var NotesApp = require('./client-modules/notes-app.js');

React.render(<NotesApp flux={flux}/>, document.body);
