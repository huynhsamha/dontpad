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
import settings from '../../api/settings';
import { generateSessionKey, encryptSessionKey, importServerSocketPublicKey,
  encryptData, decryptData
} from '../../utils/crypto';

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

    // fetch settings before join socket
    this.serverSettings = null;
    this.sk = null;

    /**
     * Timestamp on emitting model changed to save
     * use for not take flash show saving... for user
     */
    this.timeShowTextSaving = 0;
  }

  componentWillMount() {
    settings.getServerSettings().then((setting) => {
      this.serverSettings = setting;
      if (setting) {
        const { socket } = setting;
        if (socket) {
          const { publicKey, skLength } = socket;
          if (publicKey && skLength) {
            this.joinSocket();
            return;
          }
        }
      }
      this.handleError(new Error('Could not get server key to exchange session key for a secure connection'));

    }).catch((err) => {
      console.log(err);
      this.handleError(new Error('Could not get server key to exchange session key for a secure connection'));
    });
  }

  handleError(err = new Error('Something went wrong. Please try again!')) {
    console.log(err.message);
  }

  joinSocket() {
    try {
      const { publicKey, skLength } = this.serverSettings.socket;
      const sk = generateSessionKey(skLength);
      const rsaPubKey = importServerSocketPublicKey({ pubKey: publicKey });
      const encryptedSK = encryptSessionKey({ sk, rsaPubKey });
      this.sk = sk;
      this.room = window.location.pathname;
      socket.emit(conf.socket.client.joinRoom, {
        room: this.room,
        sk: encryptedSK
      });
      this._configSocket();

    } catch (err) {
      console.log(err);
      this.handleError(new Error('Could not exchange session key to server for a secure connection'));
    }
  }

  _configSocket = () => {
    socket.on(conf.socket.server.userInRoomChanged, (usersInRoom) => {
      this.setState({ usersInRoom });
    });

    socket.on(conf.socket.server.sendDataInRoom, (data) => {
      const rawData = decryptData({ enk: this.sk, data });
      if (!rawData) {
        this.handleError(new Error('Could not decrypt data from server. Please try again!'));
        return;
      }
      const { title, model, createdAt, updatedAt } = rawData;
      this.props.editModel(model);
      this._updateTitle(title);
      this._updateState(createdAt, updatedAt);
    });

    socket.on(conf.socket.server.modelChanged, (data) => {
      const rawData = decryptData({ enk: this.sk, data });
      if (!rawData) {
        this.handleError(new Error('Could not decrypt data from server. Please try again!'));
        return;
      }
      const { model } = rawData;
      this.props.editModel(model);
    });

    socket.on(conf.socket.server.titleChanged, (data) => {
      const rawData = decryptData({ enk: this.sk, data });
      if (!rawData) {
        this.handleError(new Error('Could not decrypt data from server. Please try again!'));
        return;
      }
      const { title } = rawData;
      this._updateTitle(title);
    });

    socket.on(conf.socket.server.dataSaved, () => {
      if (Date.now() - this.timeShowTextSaving > 500) {
        this.setState({ stateModel: msg.SAVE_ALL });
      } else {
        setTimeout(() => {
          this.setState({ stateModel: msg.SAVE_ALL });
        }, 500);
      }
    });

    socket.on(conf.socket.server.error, () => {
      this.setState({ stateModel: msg.ERROR_CONNECT });
    });
  }

  _onChangeModel = (model) => {
    this.timeShowTextSaving = Date.now();
    this.props.editModel(model);
    this.setState({ stateModel: msg.SAVING });
    const data = {
      model, room: this.room
    };
    const cipher = encryptData({ enk: this.sk, data });
    socket.emit(conf.socket.client.modelChanged, cipher);
  }

  _onChangeTitle = (_title) => {
    const title = String(_title).trim();
    if (title.length > 40) return;
    this.timeShowTextSaving = Date.now();
    this.setState({ stateModel: msg.SAVING });
    this._updateTitle(title);
    const data = {
      title, room: this.room
    };
    const cipher = encryptData({ enk: this.sk, data });
    socket.emit(conf.socket.client.titleChanged, cipher);
  }

  _updateTitle(title) {
    document.title = title || msg.EMPTY_DOC;
    if (this.state.title !== document.title) this.setState({ title });
  }

  _updateState = (createdAt, updatedAt) => {
    const time = updatedAt || createdAt;
    return this.setState({ stateModel: getLastTimeString(time) });
  }

  _navigateToViewer = () => {
    window.previousPath = window.location.pathname;
    this.props.history.push(`${window.location.pathname}/view`);
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
                  <button className="btn" onClick={this._navigateToViewer}>
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
