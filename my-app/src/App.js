import React from 'react';
import logo from './logo.svg';
import Form from './components/form/form';
import './App.css';
import { Provider } from 'react-redux';
import {store} from './app/store/store.js'
function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <h1>
          Components
        </h1>
        <Form />
      </div>
    </Provider>
  );
}

export default App;
