import React, { Component } from 'react';
import './App.css';

import Editor from './editor/Editor';
import Viewer from './viewer/Viewer';

import DbService from '../services/db-service';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      model: '',
      viewPage: false
    };

    this.findModel();
  }

  onChangeModel = (model) => {
    this.setState({ model });
  }

  toggleView = (viewPage) => {
    this.setState({ viewPage });
  }

  findModel = () => {
    const modelUrl = window.location.pathname;
    DbService.findModel(modelUrl).then((res) => {
      console.log(res);
      this.setState({ model: res.value });
    }).catch(err => console.log(err));
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
