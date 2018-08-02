import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FroalaEditor from 'react-froala-wysiwyg';

import './Editor.css';

class Editor extends Component {

  constructor(props) {
    super(props);

    this.state = {};
  }

  onClickView = () => {
    this.props.toggleView(true);
  }

  onChangeTitle = (event) => {
    this.props.onChangeTitle(event.target.value);
  }

  onChangeModel = (model) => {
    this.props.onChangeModel(model);
  }

  configFrolaEditor = {
    placeholderText: 'Edit Your Content Here!',
    charCounterCount: false,
    theme: 'custom',
    indentMargin: 10,
    heightMin: window.screen.availHeight,
    fontFamily: {
      'Roboto, sans-serif': 'Roboto',
      'Quicksand, sans-serif': 'Quicksand',
      'Nunito, sans-serif': 'Nunito',
      'Open Sans, sans-serif': 'Open Sans',
      'Open Sans Condensed, sans-serif': 'Open Sans Condensed',
      'Arial,Helvetica,sans-serif': 'Arial',
      'Georgia,serif': 'Georgia',
      'Impact,Charcoal,sans-serif': 'Impact',
      'Tahoma,Geneva,sans-serif': 'Tahoma',
      '\'Times New Roman\',Times,serif': 'Times New Roman',
      'Verdana,Geneva,sans-serif': 'Verdana'
    },
    toolbarButtons: [
      'bold', 'italic', 'underline', 'strikeThrough', 'subscript', 'superscript', '|',
      'fontFamily', 'fontSize', 'color', 'paragraphStyle', '|',
      'paragraphFormat', 'align', 'formatOL', 'formatUL', 'outdent', 'indent', 'quote',
      'insertLink', 'insertImage', 'insertVideo', 'embedly', 'insertFile', 'insertTable', '|',
      'emoticons', 'specialCharacters', 'insertHR', 'selectAll', 'clearFormatting', '|',
      'print', 'spellChecker', 'help', 'html', '|', 'undo', 'redo', '|', 'fullscreen'
    ]
  };

  render() {
    /**
     * Configure for Frola Editor
     * https://www.froala.com/wysiwyg-editor/docs/options#fontFamily
     */
    const {
      usersInRoom, stateModel, show, model, title
    } = this.props;

    return (
      <div className="Editor" style={{ display: show ? 'block' : 'none' }}>

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
                      type="text" placeholder="Untitled document" onChange={this.onChangeTitle}
                      defaultValue={title} maxLength="40"
                    />
                  </div>
                </div>
              </div>

              <div className="col-12 col-lg-4 col-md-4">
                <div className="state">
                  {stateModel}
                </div>
              </div>

              <div className="col-12 col-lg-4 col-md-4">
                <div className="options">
                  {
                    usersInRoom > 0 ?
                      <span className="badge">
                        <span className="number">{usersInRoom}</span>
                        <span className="text">other{usersInRoom > 1 ? 's' : ''} online</span>
                      </span>
                      :
                      ''
                  }
                  <button className="btn" onClick={this.onClickView}>
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
            model={model}
            config={this.configFrolaEditor}
            onModelChange={this.onChangeModel}
          />
        </div>
      </div>
    );
  }
}

Editor.propTypes = {
  model: PropTypes.string,
  show: PropTypes.bool,
  onChangeModel: PropTypes.func,
  toggleView: PropTypes.func,
  onChangeTitle: PropTypes.func,
  stateModel: PropTypes.string.isRequired,
  title: PropTypes.string,
  usersInRoom: PropTypes.number
};

Editor.defaultProps = {
  model: '',
  show: false,
  title: '',
  usersInRoom: 0,
  onChangeModel: () => { },
  toggleView: () => { },
  onChangeTitle: () => { }
};

export default Editor;
