import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FroalaEditor from 'react-froala-wysiwyg';

import DbService from '../../services/db-service';

class Editor extends Component {

  constructor(props) {
    super(props);

    this.state = {
      showAlert: false,
      textAlert: 'Saved'
    };
  }

  onClickView = () => {
    this.props.toggleView(true);
  }

  handleChangeModel = (model) => {
    this.props.onChange(model);
  }

  saveModel = () => {
    const modelUrl = window.location.pathname;
    DbService.updateModel(modelUrl, this.props.model)
      .then((res) => {
        console.log(res);
        const textAlert = res.message || 'Saved';
        this.setState({ showAlert: true, textAlert });
        setTimeout(() => this.setState({ showAlert: false }), 2000);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    /**
     * Configure for Frola Editor
     * https://www.froala.com/wysiwyg-editor/docs/options#fontFamily
     */
    const config = {
      placeholderText: 'Edit Your Content Here!',
      charCounterCount: false,
      indentMargin: 10,
      heightMin: 550,
      fontFamily: {
        'Roboto, sans-serif': 'Roboto',
        'Quicksand, sans-serif': 'Quicksand',
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
        'paragraphFormat', 'align', 'formatOL', 'formatUL', 'outdent', 'indent', 'quote', '-',
        'insertLink', 'insertImage', 'insertVideo', 'embedly', 'insertFile', 'insertTable', '|',
        'emoticons', 'specialCharacters', 'insertHR', 'selectAll', 'clearFormatting', '|',
        'print', 'spellChecker', 'help', 'html', '|', 'undo', 'redo'
      ]
    };

    return (
      <div className="container" style={{ display: this.props.show ? 'block' : 'none' }}>
        <FroalaEditor
          tag="textarea"
          model={this.props.model}
          config={config}
          onModelChange={this.handleChangeModel}
        />

        <button className="btn-fixed" onClick={this.onClickView}>
          <span><i className="fa fa-eye" /></span>
        </button>

        <button
          className="btn-fixed" style={{ right: 80 }}
          onClick={this.saveModel}
        >
          <span><i className="fa fa-save" /></span>
        </button>

        <div className={`alert ${this.state.showAlert ? 'show' : ''}`}>
          <i className="fa fa-info-circle" />{this.state.textAlert}
        </div>
      </div>
    );
  }
}

Editor.propTypes = {
  model: PropTypes.string,
  show: PropTypes.bool,
  onChange: PropTypes.func,
  toggleView: PropTypes.func
};

Editor.defaultProps = {
  model: '',
  show: false,
  onChange: () => { },
  toggleView: () => { }
};

export default Editor;
