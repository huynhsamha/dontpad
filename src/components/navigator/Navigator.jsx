import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './Navigator.css';

class Navigator extends Component {

  constructor(props) {
    super(props);
    this.state = {
      path: ''
    };

  }

  onChangePath = (event) => {
    const path = event.target.value;
    this.setState({ path });
  }

  onClickNavigator = () => {
    window.location.href = this.state.path;
  }

  onKeyPress = (event) => {
    if (event.key === 'Enter') {
      window.location.href = this.state.path;
    }
  }

  render() {
    const { show } = this.props;
    return (
      <div className="Navigator" style={{ display: show ? 'block' : 'none' }}>
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="wrapper">

                <h1 className="title">Advanced Dontpad</h1>

                <div className="input-group">
                  <span className="text-fixed">
                    https://dontpad.herokuapp.com/
                  </span>
                  <input
                    className="inp" autoFocus
                    type="text" onChange={this.onChangePath} onKeyPress={this.onKeyPress}
                  />
                  <button
                    onClick={this.onClickNavigator}
                  >
                    <span><i className="fa fa-external-link" /></span>
                    Go
                  </button>
                </div>

                <div className="row">

                  <div className="col-12 col-lg-5 offset-lg-1 note">
                    <ul>
                      <li><h4>Don&apos;t login, just use a URL</h4></li>
                      <li><h4>Format font-style, font-family, font-size, color</h4></li>
                      <li><h4>Format paragraph, headings, code, align, list</h4></li>
                      <li><h4>Support familiar and utility shortcut</h4></li>
                      <li><h4>Realtime, don&apos;t refresh page when your friends change</h4></li>
                    </ul>
                  </div>

                  <div className="col-12 col-lg-5 offset-lg-1 note">
                    <ul>
                      <li><h4>Don&apos;t save, any changes is auto-saved</h4></li>
                      <li><h4>Format font-style, font-family, font-size, color</h4></li>
                      <li><h4>Insert link, image, table, video, file, symbol</h4></li>
                      <li><h4>Support render to HTML code, Preview and Print</h4></li>
                      <li><h4>Private, Security and No Advertising</h4></li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-12 social">
            <span className="col-social">
              <button><a href="https://www.linkedin.com/in/huynhsamha/"><i className="fa fa-linkedin" /></a></button>
              <button><a href="https://github.com/huynhsamha/"><i className="fa fa-github" /></a></button>
              <button><a href="https://www.facebook.com/huynhsamha"><i className="fa fa-facebook" /></a></button>
            </span>
            <span className="col-social">
              <button><a href="https://plus.google.com/u/0/104401180645424242142"><i className="fa fa-google-plus" /></a></button>
              <button><a href="https://twitter.com/huynhsamha"><i className="fa fa-twitter" /></a></button>
              <button><a href="https://www.instagram.com/huynhsamha/"><i className="fa fa-instagram" /></a></button>
            </span>
          </div>
        </div>

        <div className="col-12 copyright">
          Copyright <i className="fa fa-copyright" /> 2018. Created by <a href="https://github.com/huynhsamha">huynhsamha</a>
        </div>
      </div>
    );
  }
}

Navigator.propTypes = {
  show: PropTypes.bool
};

Navigator.defaultProps = {
  show: window.location.path === '/'
};

export default Navigator;
