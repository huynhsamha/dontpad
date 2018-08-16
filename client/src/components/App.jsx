import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import io from 'socket.io-client';

import './App.css';

import Editor from './editor/Editor';
import Viewer from './viewer/Viewer';
import Navigator from './navigator/Navigator';

import { getLastTimeString } from '../utils/DateTime';
import * as msg from '../utils/Messages';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      model: '',
      title: '',
      viewPage: false,
      navigator: false,
      usersInRoom: 0,
      stateModel: ''
    };

    // flag for check if user changed file in first
    this.fileUsedToBeChanged = false;

    // timestamp on emit model changes to save
    // use for not take flash show saving... for user
    this.timeShowTextSaving = 0;


    // for root page, cannot edit
    if (window.location.pathname === '/') {
      this.state.navigator = true;
    } else {
      document.title = msg.EMPTY_DOC;
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
      const {
        title, model, createdAt, updatedAt
      } = data;
      this.setState({ model });
      this.updateTitle(title);
      this.updateState(createdAt, updatedAt);
    });

    this.socket.on('SERVER_MODEL_CHANGED', (model) => {
      this.setState({ model });
    });

    this.socket.on('SERVER_TITLE_CHANGED', (title) => {
      this.updateTitle(title);
    });

    this.socket.on('SERVER_DATA_SAVED', () => {
      if (this.fileUsedToBeChanged) {
        // this is reality that file changed by user
        // not take flash show saving...
        if (Date.now() - this.timeShowTextSaving > 500) {
          this.setState({ stateModel: msg.SAVE_ALL });
        } else {
          setTimeout(() => {
            this.setState({ stateModel: msg.SAVE_ALL });
          }, 500);
        }
      } else {
        // toggle flag for changes
        this.fileUsedToBeChanged = true;
      }
    });

    this.socket.on('SERVER_ERROR', () => {
      this.setState({ stateModel: msg.ERROR_CONNECT });
    });
  }

  onChangeModel = (model) => {
    this.timeShowTextSaving = Date.now();
    this.setState({ model, stateModel: 'Saving...' });
    this.socket.emit('CLIENT_MODEL_CHANGED', {
      model, room: this.room
    });
  }

  onChangeTitle = (title) => {
    console.log(title.length);
    if (title.length > 40) return;
    this.timeShowTextSaving = Date.now();
    this.setState({ stateModel: 'Saving...' });
    this.updateTitle(title);
    this.socket.emit('CLIENT_TITLE_CHANGED', {
      title, room: this.room
    });
  }

  toggleView = (viewPage) => {
    this.setState({ viewPage });
  }

  updateTitle(title) {
    if (window.location.pathname === '/') {
      document.title = 'Advanced Dontpad';
      return;
    }
    document.title = title || msg.EMPTY_DOC;
    if (this.state.title !== document.title) this.setState({ title });
  }

  updateState = (createdAt, updatedAt) => {
    const time = updatedAt || createdAt;
    const convertTime = getLastTimeString(time);
    return this.setState({ stateModel: convertTime });
  }

  render() {
    const {
      viewPage, model, stateModel, title, usersInRoom, navigator
    } = this.state;

    return (
      <div className="App">
        <Router>
          <div>
            <Switch>
              <Route exact path="/" component={Navigator} />
              <Route exact path="/*/view" component={() => <Viewer toggleView={this.toggleView} />} />
              <Route component={() => (
                <Editor
                  show={!navigator && !viewPage} model={model}
                  onChangeModel={this.onChangeModel}
                  onChangeTitle={this.onChangeTitle}
                  toggleView={this.toggleView}
                  stateModel={stateModel}
                  title={title}
                  usersInRoom={usersInRoom}
                />
              )}
              />
            </Switch>
          </div>
        </Router>
        {/* only 1 in 3 following components shows in one time */}
        {/* <Navigator show={navigator} />
        <Viewer show={!navigator && viewPage} model={model} toggleView={this.toggleView} />
        <Editor
          show={!navigator && !viewPage} model={model}
          onChangeModel={this.onChangeModel}
          onChangeTitle={this.onChangeTitle}
          toggleView={this.toggleView}
          stateModel={stateModel}
          title={title}
          usersInRoom={usersInRoom}
        /> */}
      </div>
    );
  }
}

export default App;
