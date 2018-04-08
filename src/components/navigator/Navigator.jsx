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
                    className="inp"
                    type="text" onChange={this.onChangePath} onKeyPress={this.onKeyPress}
                  />
                  <button
                    onClick={this.onClickNavigator}
                  >
                    <span><i className="fa fa-external-link" /></span>
                  </button>
                </div>

                <div className="col-12 col-lg-8 offset-lg-2 note">
                  <ul>
                    <li><h3>Don&apos;t login, just use a URL</h3></li>
                    <li><h3>Don&apos;t save, any changes is auto-saved</h3></li>
                    <li><h3>Format font-style, font-family, font-size, color</h3></li>
                    <li><h3>Format paragraph, headings, code, align, list</h3></li>
                    <li><h3>Insert link, image, table, video, file, symbol</h3></li>
                    <li><h3>Support familiar and utility shortcut</h3></li>
                    <li><h3>Support render to HTML code, Preview and Print</h3></li>
                    <li><h3>Realtime, don&apos;t refresh page when your friends change</h3></li>
                    <li><h3>Private, Security and No Advertising</h3></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
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
