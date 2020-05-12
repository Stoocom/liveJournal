import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'connected-react-router'

import { history } from './history'
import App from './app'
import store from './store'

// Передача ссылки store на 11 строке в redux
ReactDOM.render(
  <Provider store={store}> 
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
);
