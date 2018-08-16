import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

// Styles
import './styles/index.css';

// Components
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';

import rootReducer from './redux/reducers';

const middlewares = [thunk];

if (process.env.NODE_ENV !== 'production') {
  middlewares.push(logger);
}

const store = createStore(rootReducer, applyMiddleware(...middlewares));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

registerServiceWorker();
