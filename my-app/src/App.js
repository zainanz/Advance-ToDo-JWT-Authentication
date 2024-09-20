import React from 'react';
import './App.css';
import { Outlet, useLocation} from 'react-router-dom';
import { checkUser } from "./app/store/authSlice";
import { useEffect } from 'react';
import Navbar from "./components/navbar/navbar"
import { useDispatch } from "react-redux";

function App() {
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect( () => {
    dispatch(checkUser())
  }, []);

  return (
    <div className="black-radial-back" style={{height:'100vh', position:'relative', overflow: 'hidden', boxSizing: 'border-box'}}>

      {
        location.pathname === "/" ? "" : <Navbar/>
      }
      <main style={{height:'100%', overflow: 'auto'}} className="">
        <Outlet/>
      </main>
    </div>
  );
}

export default App;
