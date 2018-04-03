import React, { Component } from 'react';
import './App.css';

import Editor from './editor/Editor';
import Viewer from './viewer/Viewer';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      model: '',
      viewPage: true
    };
  }

  onChangeModel = (model) => {
    this.setState({ model });
  }

  toggleView = (viewPage) => {
    this.setState({ viewPage });
  }

  render() {
    const { viewPage, model } = this.state;

    return (
      <div className="App">
        <Viewer show={viewPage} model={model} toggleView={this.toggleView} />
        <Editor show={!viewPage} model={model} onChange={this.onChangeModel} toggleView={this.toggleView} />
      </div>
    );
  }
}

export default App;
