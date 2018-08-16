import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import Fade from 'react-reveal/Fade';
import Zoom from 'react-reveal/Zoom';

import ShareButtons from '../share-buttons/ShareButtons';

import './Navigator.css';

class Navigator extends Component {

  constructor(props) {
    super(props);

    this.state = {
      path: ''
    };
  }

  _onNavigate = () => {
    this.props.history.push(this.state.path);
  }

  render() {
    return (
      <div className="Navigator">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="wrapper">

                <h1 className="title d-inline-flex">
                  <div><Zoom bottom cascade>Advanced</Zoom></div>
                  <div style={{ marginLeft: 15, marginRight: 15 }}>
                    <Zoom><img src="/favicon.ico" alt="favicon" width="48" height="48" /></Zoom>
                  </div>
                  <div><Zoom bottom cascade>Dontpad</Zoom></div>
                </h1>

                <Fade bottom>
                  <div className="input-group">
                    <span className="text-fixed">https://dontpad.herokuapp.com/</span>
                    <input
                      className="inp" autoFocus
                      type="text"
                      onChange={ev => this.setState({ path: ev.target.value })}
                      onKeyPress={(ev) => {
                        if (ev.key == 'Enter') this._onNavigate();
                      }}
                    />
                    <button className="btn" type="button" onClick={this._onNavigate}>
                      <span><i className="fa fa-paper-plane" /></span>
                    </button>
                  </div>
                </Fade>

                <div className="row">

                  <div className="col-12 col-lg-5 offset-lg-1 note">
                    <Fade bottom>
                      <ul>
                        <li><h4>Don&apos;t login, just use a URL</h4></li>
                        <li><h4>Format font-style, font-family, font-size, color</h4></li>
                        <li><h4>Format paragraph, headings, code, align, list</h4></li>
                        <li><h4>Support familiar and utility shortcut</h4></li>
                        <li><h4>Realtime, don&apos;t refresh page when your friends change</h4></li>
                      </ul>
                    </Fade>
                  </div>

                  <div className="col-12 col-lg-5 offset-lg-1 note">
                    <Fade bottom>
                      <ul>
                        <li><h4>Don&apos;t save, any changes is auto-saved</h4></li>
                        <li><h4>Format font-style, font-family, font-size, color</h4></li>
                        <li><h4>Insert link, image, table, video, file, symbol</h4></li>
                        <li><h4>Support render to HTML code, Preview and Print</h4></li>
                        <li><h4>Private, Security and No Advertising</h4></li>
                      </ul>
                    </Fade>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-12">
            <ShareButtons />
          </div>
        </div>

        <div className="col-12 copyright">
          <Zoom>
            <div>
              Copyright <i className="fa fa-copyright" /> 2018. Created by <a href="//github.com/huynhsamha">huynhsamha</a>
            </div>
          </Zoom>
        </div>
      </div>
    );
  }
}

Navigator.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired
};

Navigator.defaultProps = {
};

export default withRouter(Navigator);
