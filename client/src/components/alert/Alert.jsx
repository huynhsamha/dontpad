import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import * as actions from '../../redux/actions';

import './Alert.css';

class Alert extends Component {

  render() {
    const { message, show, hideAlert } = this.props;

    if (show) {
      setTimeout(() => hideAlert(), 3000);
    }

    return (
      <div className={`Alert ${!show ? 'hide' : ''}`}>
        {message}
        <i
          className="fa fa-close" role="button" tabIndex="0"
          onClick={hideAlert} onKeyDown={() => {}}
        />
      </div>
    );
  }

}

Alert.propTypes = {
  show: PropTypes.bool.isRequired,
  message: PropTypes.string.isRequired,
  hideAlert: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  message: state.Alert.message,
  show: state.Alert.show
});

const mapDispatchToProps = dispatch => ({
  hideAlert: () => {
    dispatch(actions.hideAlert());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Alert);
