import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import FroalaEditor from 'react-froala-wysiwyg';
import io from 'socket.io-client';
import conf from '../../config';

import './Editor.css';

import { getLastTimeString } from '../../utils/DateTime';
import { config as configFrolaEditor } from '../../utils/FroalaWysiwyg';
import * as msg from '../../utils/Messages';

import * as actions from '../../redux/actions';

const socket = io();


class Editor extends Component {

  constructor(props) {
    super(props);

    document.title = msg.EMPTY_DOC;

    this.state = {
      title: '',
      usersInRoom: 0,
      stateModel: ''
    };

    /** Flag checking if user changed file first */
    this.fileUsedToBeChanged = false;

    /**
     * Timestamp on emitting model changed to save
     * use for not take flash show saving... for user
     */
    this.timeShowTextSaving = 0;
  }

  componentWillMount() {
    this.room = window.location.pathname;
    socket.emit(conf.socket.client.joinRoom, this.room);
    this._configSocket();
  }

  _configSocket = () => {
    socket.on(conf.socket.server.userInRoomChanged, (usersInRoom) => {
      this.setState({ usersInRoom });
    });

    socket.on(conf.socket.server.sendDataInRoom, (data) => {
      const { title, model, createdAt, updatedAt } = data;
      this.props.editModel(model);
      this._updateTitle(title);
      this._updateState(createdAt, updatedAt);
    });

    socket.on(conf.socket.server.modelChanged, (model) => {
      this.props.editModel(model);
    });

    socket.on(conf.socket.server.titleChanged, (title) => {
      this._updateTitle(title);
    });

    socket.on(conf.socket.server.dataSaved, () => {
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

    socket.on(conf.socket.server.error, () => {
      this.setState({ stateModel: msg.ERROR_CONNECT });
    });
  }

  _onChangeModel = (model) => {
    this.timeShowTextSaving = Date.now();
    this.setState({ stateModel: msg.SAVING });
    this.props.editModel(model);
    socket.emit(conf.socket.client.modelChanged, {
      model, room: this.room
    });
  }

  _onChangeTitle = (_title) => {
    const title = String(_title).trim();
    if (title.length > 40) return;
    this.timeShowTextSaving = Date.now();
    this.setState({ stateModel: msg.SAVING });
    this._updateTitle(title);
    socket.emit(conf.socket.client.titleChanged, {
      title, room: this.room
    });
  }

  _updateTitle(title) {
    document.title = title || msg.EMPTY_DOC;
    if (this.state.title !== document.title) this.setState({ title });
  }

  _updateState = (createdAt, updatedAt) => {
    const time = updatedAt || createdAt;
    return this.setState({ stateModel: getLastTimeString(time) });
  }

  render() {
    return (
      <div className="Editor">

        <div className="header">
          <div className="container-fluid">
            <div className="row">

              <div className="col-12 col-lg-4 col-md-4">
                <div className="header-wrapper-left">
                  <div className="wrapper-logo">
                    <a href="/">
                      <img src="/favicon.ico" alt="favicon" width="32" height="32" />
                    </a>
                  </div>
                  <div className="wrapper-input">
                    <input
                      type="text" maxLength="40"
                      placeholder={msg.EMPTY_DOC}
                      defaultValue={this.state.title}
                      onChange={ev => this._onChangeTitle(ev.target.value)}
                    />
                  </div>
                </div>
              </div>

              <div className="col-12 col-lg-4 col-md-4">
                <div className="state">
                  {this.state.stateModel}
                </div>
              </div>

              <div className="col-12 col-lg-4 col-md-4">
                <div className="options">
                  {
                    this.state.usersInRoom > 0 ?
                      <span className="badge">
                        <span className="number">{this.state.usersInRoom}</span>
                        <span className="text">other{this.state.usersInRoom > 1 ? 's' : ''} online</span>
                      </span>
                      :
                      ''
                  }
                  <button
                    className="btn"
                    onClick={() => {
                      window.previousPath = window.location.pathname;
                      this.props.history.push(`${window.location.pathname}/view`);
                    }
                    }
                  >
                    <span><i className="fa fa-html5" />View Page</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="editor">
          <FroalaEditor
            tag="textarea"
            model={this.props.model}
            config={configFrolaEditor}
            onModelChange={this._onChangeModel}
          />
        </div>
      </div>
    );
  }
}

Editor.propTypes = {
  model: PropTypes.string,
  editModel: PropTypes.func,
  history: PropTypes.object.isRequired
};

Editor.defaultProps = {
  model: '',
  editModel: () => {}
};

const mapStateToProps = state => ({
  model: state.Model
});

const mapDispatchToProps = dispatch => ({
  editModel: (model) => {
    dispatch(actions.editModel(model));
  }
});


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Editor));
