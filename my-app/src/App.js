import React from 'react';
import './App.css';
import { Outlet, useLocation} from 'react-router-dom';
import { setUser } from "./app/store/authSlice";
import { useEffect } from 'react';
import Navbar from "./components/navbar/navbar"
import Cookies from "js-cookie"
import { useSelector, useDispatch } from "react-redux";

function App() {
  const location = useLocation();
  const auth = useSelector(state => state.auth);
  const dispatch = useDispatch();

  const handleUserData = async (data) => {
    data = await JSON.parse(data.message);
    console.log(data)
    dispatch(setUser(data))
  }

  useEffect( () => {
    const token =  Cookies.get('token');
    if (token){
        fetch("http://localhost:3000/verify/user", {
              method:"POST",
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
              }
        }).then(response => response.json()).then(data => handleUserData(data))
  }
  },[])

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
