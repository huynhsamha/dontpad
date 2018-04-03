import React from 'react';
import ReactDOM from 'react-dom';

// Styles
import './styles/index.css';

// Components
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(

  <App />,

  document.getElementById('root')
);

registerServiceWorker();
