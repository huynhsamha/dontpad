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

                <h1>Advanced Dontpad</h1>

                <div className="input-group">
                  <span className="text-fixed d-block d-lg-inline d-md-inline">https://dontpad.herokuapp.com/</span>
                  <input className="inp" type="text" onChange={this.onChangePath} onKeyPress={this.onKeyPress} />
                  <button onClick={this.onClickNavigator} >
                    <span><i className="fa fa-external-link" /></span>
                  </button>
                </div>

                <div className="col-12 col-lg-8 offset-2">
                  <ul style={{ textAlign: 'left', listStyle: 'none', marginTop: '50px' }}>
                    <li><h3>Don&apos;t login</h3></li>
                    <li><h3>Format font, text, color, paragraph</h3></li>
                    <li><h3>Insert link, image, video, file, symbol</h3></li>
                    <li><h3>HTML Code, Preview page html, Print</h3></li>
                    <li><h3>Realtime, multiple users connect</h3></li>
                    <li><h3>Auto save on changes</h3></li>
                    <li><h3>Private and Security</h3></li>
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
