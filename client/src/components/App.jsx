import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import './App.css';

import Editor from './editor/Editor';
import Viewer from './viewer/Viewer';
import Home from './home/Home';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <div>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/*/view" component={Viewer} />
              <Route component={Editor} />
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
