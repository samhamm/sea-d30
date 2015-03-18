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

// require('./vars.js');

module.exports = Fluxxor.createStore({
  initialize: function() {
    this.notes = [];

    this.bindActions(
      constants.ADD_NOTE, this.onNewNote,
      constants.REMOVE_NOTE, this.onRemoveNote
    );

    request
      .get(baseUrl)
      .end(function(err, res) {
        if (err) return console.log(err);

        this.notes = res.body;
        this.emit('change');
      }.bind(this));
  },

  onNewNote: function(note) {
    request
      .post(baseUrl)
      .send(note)
      .end(function(err, res) {
        if (err) return console.log(err);

        this.notes.push(res.body);
        this.emit('change');
      }.bind(this));
  },

  onRemoveNote: function(note) {
    request
      .del(baseUrl + '/' + note._id)
      .end(function(err, res) {
        if (err) return console.log(err);

        this.notes.splice(this.notes.indexOf(note), 1);
        this.emit('change');
      }.bind(this));
  },

  getState: function() {
    return {notes: this.notes};
  }
});
