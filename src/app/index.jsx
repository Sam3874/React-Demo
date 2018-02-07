import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import { BrowserRouter as Router } from 'react-router-dom';

import App from './components/rootComponent';

render(
    <Provider store={store}>
      <div  style={{ height: '100%' }}>
        <Router>
          <App />
        </Router>
      </div>
    </Provider>,
  document.getElementById('app')
);