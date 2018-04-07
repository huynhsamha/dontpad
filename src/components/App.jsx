import React, { Component } from 'react';
import io from 'socket.io-client';

import Editor from './editor/Editor';
import Viewer from './viewer/Viewer';

import ParseUrl from '../services/parse-url';
import DbService from '../services/db-service';

import './App.css';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      model: '',
      viewPage: false
    };
  }

  componentWillMount() {
    this.room = window.location.pathname;
    this.socket = io();
    this.socket.emit('CLIENT_JOIN_ROOM', this.room);

    this.socket.on('SERVER_MODEL_IN_ROOM', (model) => {
      this.setState({ model });
    });

    this.socket.on('SERVER_MODEL_CHANGED', (model) => {
      this.setState({ model });
    });

    this.socket.on('SERVER_ERROR_ON_LOAD_MODEL', () => {
      console.log('Error on load');
    });

    this.socket.on('SERVER_MODEL_SAVED', () => {
      console.log('Saved');
    });

    this.socket.on('SERVER_ERROR_ON_SAVE_MODEL', () => {
      console.log('Error on save model');
    });
  }

  onChangeModel = (model) => {
    this.socket.emit('CLIENT_MODEL_CHANGED', {
      model, room: this.room
    });
    this.setState({ model });
  }

  toggleView = (viewPage) => {
    this.setState({ viewPage });
  }

  render() {
    const { viewPage, model } = this.state;

    return (
      <div className="App">
        <Viewer show={viewPage} model={model} toggleView={this.toggleView} />
        <Editor show={!viewPage} model={model} onChange={this.onChangeModel} toggleView={this.toggleView} />
      </div>
    );
  }
}

export default App;
