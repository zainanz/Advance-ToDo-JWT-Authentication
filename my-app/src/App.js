import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Provider } from 'react-redux';
import {store} from './app/store/store.js'
import { Outlet } from 'react-router-dom';
function App() {
  return (
    <Provider store={store}>
      <div>Nav Bar Goes here</div>
      <main>
        <Outlet/>
      </main>
    </Provider>
  );
}

export default App;
