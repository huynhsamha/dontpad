import React, { Component } from 'react';
import io from 'socket.io-client';

import Editor from './editor/Editor';
import Viewer from './viewer/Viewer';
import Navigator from './navigator/Navigator';

import './App.css';

class App extends Component {

  constructor(props) {
    super(props);

    this.UNTITLED_DOCUMENT = 'Untitled document';
    this.ALL_CHAGNES_SAVED = 'All changes saved';
    this.ERROR = 'Error, please reconnect to try again';

    this.state = {
      model: '',
      title: '',
      viewPage: false,
      navigator: false,
      usersInRoom: 0,
      stateModel: ''
    };

    document.title = this.UNTITLED_DOCUMENT;

    if (window.location.pathname === '/') {
      this.state.navigator = true;
    }
  }

  componentWillMount() {
    this.room = window.location.pathname;
    this.socket = io();
    this.socket.emit('CLIENT_JOIN_ROOM', this.room);

    this.socket.on('SERVER_USER_IN_ROOM_CHANGED', (usersInRoom) => {
      this.setState({ usersInRoom });
    });

    this.socket.on('SERVER_SEND_DATA_IN_ROOM', (data) => {
      const { title, model } = data;
      this.setState({ model });
      this.updateTitle(title);
    });

    this.socket.on('SERVER_MODEL_CHANGED', (model) => {
      this.setState({ model });
    });

    this.socket.on('SERVER_TITLE_CHANGED', (title) => {
      this.updateTitle(title);
    });

    this.socket.on('SERVER_DATA_SAVED', () => {
      this.setState({ stateModel: this.ALL_CHAGNES_SAVED });
      setTimeout(() => {
        this.setState({ stateModel: '' });
      }, 5000);
    });

    this.socket.on('SERVER_ERROR', () => {
      this.setState({ stateModel: this.ERROR });
    });
  }

  onChangeModel = (model) => {
    this.socket.emit('CLIENT_MODEL_CHANGED', {
      model, room: this.room
    });
    this.setState({ model });
  }

  onChangeTitle = (title) => {
    this.socket.emit('CLIENT_TITLE_CHANGED', {
      title, room: this.room
    });
    this.updateTitle(title);
  }

  toggleView = (viewPage) => {
    this.setState({ viewPage });
  }

  updateTitle(title) {
    document.title = title || this.UNTITLED_DOCUMENT;
    this.setState({ title });
  }

  render() {
    const {
      viewPage, model, stateModel, title, usersInRoom, navigator
    } = this.state;

    return (
      <div className="App">
        <Navigator show={navigator} />
        <Viewer show={!navigator && viewPage} model={model} toggleView={this.toggleView} />
        <Editor
          show={!navigator && !viewPage} model={model} onChange={this.onChangeModel}
          toggleView={this.toggleView}
          onChangeTitle={this.onChangeTitle}
          stateModel={stateModel}
          title={title}
          usersInRoom={usersInRoom}
        />
      </div>
    );
  }
}

export default App;
