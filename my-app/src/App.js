import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Provider } from 'react-redux';
import {store} from './app/store/store.js'
import { Outlet } from 'react-router-dom';
function App() {
  return (
    <div className="black-radial-back" style={{height:'100vh', position:'relative', overflow: 'hidden', boxSizing: 'border-box'}}>

    <Provider store={store}>
      <div>Nav Bar Goes here</div>
      <main style={{height:'100%', overflow: 'auto'}} className="">
        <Outlet/>
      </main>
    </Provider>
    </div>
  );
}

export default App;
