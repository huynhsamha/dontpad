import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FroalaEditorView from 'react-froala-wysiwyg/FroalaEditorView';

import './Viewer.css';

class Viewer extends Component {

  onClickEdit = () => {
    this.props.toggleView(false);
  }

  render() {
    return (
      <div className="Viewer" style={{ display: this.props.show ? 'block' : 'none' }}>
        <div className="wrapper-view">
          <FroalaEditorView
            model={this.props.model}
          />
        </div>
        <button className="btn btn-fixed" onClick={this.onClickEdit}>
          <span><i className="fa fa-pencil" /></span>
        </button>
      </div>
    );
  }
}

Viewer.propTypes = {
  model: PropTypes.string,
  show: PropTypes.bool,
  toggleView: PropTypes.func
};

Viewer.defaultProps = {
  model: '',
  show: true,
  toggleView: () => {}
};

export default Viewer;
