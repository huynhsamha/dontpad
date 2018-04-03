import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FroalaEditorView from 'react-froala-wysiwyg/FroalaEditorView';

class Viewer extends Component {

  onClickEdit = () => {
    this.props.toggleView(false);
  }

  render() {
    return (
      <div className="container" style={{ display: this.props.show ? 'block' : 'none' }}>
        <FroalaEditorView
          model={this.props.model}
        />
        <button className="btn-fixed" onClick={this.onClickEdit}>
          <span><i className="fa fa-edit" /></span>
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
