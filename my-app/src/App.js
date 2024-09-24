import React from 'react';
import './App.css';
import { Outlet, useLocation, useNavigate} from 'react-router-dom';
import { checkUser } from "./app/store/authSlice";
import { useEffect } from 'react';
import Navbar from "./components/navbar/navbar"
import { useDispatch, useSelector } from "react-redux";

function App() {
  const auth = useSelector(state => state.auth)
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate()

  useEffect( () => {
    const verifyUser = async () => {
      try {
        await dispatch(checkUser()).unwrap()
      } catch (err) {
        navigate("/")
      }
    }
    verifyUser();
  }, [auth.isLoggedIn, dispatch, navigate]);

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
