import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import FroalaEditorView from 'react-froala-wysiwyg/FroalaEditorView';

import './Viewer.css';

class Viewer extends Component {
  constructor(props) {
    super(props);

    const path = `/${this.props.match.params[0]}`;
    if (window.previousPath !== path) {
      this.props.history.push(path);
    }
  }

  render() {
    return (
      <div className="Viewer">
        <div className="wrapper-view">
          <FroalaEditorView model={this.props.model} />
        </div>
        <button className="btn btn-fixed" onClick={() => this.props.history.goBack()}>
          <span><i className="fa fa-pencil" /></span>
        </button>
      </div>
    );
  }
}

Viewer.propTypes = {
  model: PropTypes.string,
  history: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired
};

Viewer.defaultProps = {
  model: ''
};

const mapStateToProps = state => ({
  model: state.Model
});

const mapDispatchToProps = dispatch => ({});


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Viewer));
