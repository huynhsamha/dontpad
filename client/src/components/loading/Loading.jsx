/**
 * @flow
 * @format
 */

import React from 'react';
import PropTypes from 'prop-types';

import './Loading.css';

export const Loading = (props) => {
  // console.log(props);

  /** component to load is error */
  if (props.error) {
    return (
      <div>error</div>
    );
  }

  /** component to load is timeout */
  if (props.timeOut) {
    return (
      <div>timeout</div>
    );
  }

  /** component to load is flash, dont have to render loading */
  if (!props.pastDelay) {
    return null;
  }

  /** component to load is longer time delay */
  return (
    <div className="Loading">
      <div className="la-ball-fussion la-3x" style={{ color: 'white' }}>
        <div />
        <div />
        <div />
        <div />
      </div>
    </div>
  );
};

Loading.propTypes = {
  error: PropTypes.bool,
  timeOut: PropTypes.bool,
  pastDelay: PropTypes.bool
};

Loading.defaultProps = {
  error: false,
  timeOut: false,
  pastDelay: true
};
