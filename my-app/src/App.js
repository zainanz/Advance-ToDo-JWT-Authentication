import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Provider } from 'react-redux';
import {store} from './app/store/store.js'
import { Outlet } from 'react-router-dom';
import { login } from "./app/store/authSlice";
import { useEffect } from 'react';
import Navbar from "./components/navbar/navbar"
import Cookies from "js-cookie"
// import { useSelector, useDispatch } from "react-redux";

function App() {

  // const auth = useSelector(state => state.auth);

  const handleUserData = (data) => {
    console.log("hahaha")
    // console.log(auth)
  }

  useEffect( () => {
    let isMounted = true;
    const token =  Cookies.get('token');
    if (isMounted && token){
      try{
        fetch("http://localhost:3000/verify/user", {
              method:"POST",
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
              }
        }).then(response => response.json()).then(data => handleUserData(data))
      }catch(err){

      }

    }

    return () => {
      isMounted = false;
    };

  }, [] )

  return (
    <div className="black-radial-back" style={{height:'100vh', position:'relative', overflow: 'hidden', boxSizing: 'border-box'}}>

    <Provider store={store}>
      <Navbar/>
      <main style={{height:'100%', overflow: 'auto'}} className="">
        <Outlet/>
      </main>
    </Provider>
    </div>
  );
}

export default App;
