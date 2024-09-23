import React from 'react';
import './App.css';
import { Outlet, useLocation, useNavigate} from 'react-router-dom';
import { checkUser } from "./app/store/authSlice";
import { useEffect, useState } from 'react';
import Navbar from "./components/navbar/navbar"
import { useDispatch, useSelector } from "react-redux";

function App() {
  const [authCheck, setAuthCheck] = useState(false);
  const auth = useSelector(state => state.auth)
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate()

  // useEffect( () => {
  //   dispatch(checkUser())
  // }, []);

  return (
    <div className="background-svg" style={{ minHeight:'100vh', position:'relative', overflow: 'hidden', boxSizing: 'border-box'}}>

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
