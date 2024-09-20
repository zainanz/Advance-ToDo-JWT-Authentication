// imports
import "./form.css"
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { login } from "../../app/store/authSlice";
import Frm from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import { useNavigate } from "react-router-dom";
//logic




export default function Form(){

  // Initialization

  const [seconds, setSeconds] = useState(3);
  const dispatch = useDispatch();
  const [userData, setUserData] = useState({email: "", password: ""});
  const auth = useSelector(state => state.auth);
  const navigate = useNavigate();

  // Funcs
  const handleFormSubmit = (e) => {
    e.preventDefault();
    dispatch(login(userData));
  }
  const handlePasswordInput = (e) => {
    setUserData( prev => ({...prev, ['password']:e.target.value}));
    console.log(userData);
  }
  const handleEmailInput = (e) => {
    setUserData( prev => ({...prev, ['email']:e.target.value}));
    console.log(userData);
  }

  useEffect(() => {
      if(auth.isLoggedIn){
        const interval = setInterval(() => {
        setSeconds( prev => prev - 1);
      }, 1000);
      const timeout = setTimeout(() => {
        navigate("/dashboard")
      }, 3000);
      return () => {
        clearTimeout(timeout);
        clearInterval(interval);
      };
      }
    }, [auth.isLoggedIn]);


  if (auth.isLoggedIn) {
    return (
      <div>
        <h1>Welcome back, {auth.user.username}</h1>
        <h2>Redirecting in: {seconds}</h2>
      </div>
    );
  }

  return (
    <div style={{height: '100%'}} className="d-flex justify-content-center align-items-center">
      <Frm onSubmit={handleFormSubmit} className="form-container border p-5">
        <Frm.Group className="mb-3" controlId="formGroupEmail">
          <Frm.Label className="fw-bolder">Email address</Frm.Label>
          <Frm.Control value={userData.email} onChange={handleEmailInput} type="text" placeholder="Email or Username" />
        </Frm.Group>
        <Frm.Group className="mb-3" controlId="formGroupPassword">
          <Frm.Label className=" fw-bolder">Password</Frm.Label>
          <Frm.Control type="password" value={userData.password} onChange={handlePasswordInput} placeholder="Password" />
        </Frm.Group>
        {
          auth.error ? <Alert className="d-flex justify-content-center align-items-center" style={{height:'10px'}}variant='danger'>{auth.error}</Alert>: ""
        }
        <Button className="w-100" variant="primary" type="submit">
          Login
        </Button>
      </Frm>
    </div>

  );
}
