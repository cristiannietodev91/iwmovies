import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import './index.css';
import App from './App';
import store from './app/store';

import { PersistGate } from 'redux-persist/integration/react';

import { persistStore } from 'redux-persist';


// Create Redux store with initial state
//const store = createStore(counterApp, preloadedState)

let persistor = persistStore(store);

ReactDOM.hydrate(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

