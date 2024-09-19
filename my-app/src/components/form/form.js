// imports
import "./form.css"
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { login } from "../../app/store/authSlice";
import Frm from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';

//logic




export default function Form(){
  const [seconds, setSeconds] = useState(3);
  const [countdownStarted, setCountdownStarted] = useState(false);
  const dispatch = useDispatch();
  const [userData, setUserData] = useState({email: "", password: ""});
  const auth = useSelector(state => state.auth);
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

  useEffect( ()=> {
    let interval;
    if(auth.isLoggedIn && !countdownStarted){
      interval = setInterval(() => {
      setSeconds( prev => prev--);
    }, 1000);
    }

    return( () => clearInterval(interval))
  }, [auth.isLoggedIn, countdownStarted])
 //view

  if (auth.isLoggedIn){
    return (
      <div>

      <h1> Welcome back, {userData.email}</h1>
      <h2>Redirecting in:</h2>
        <h3>
          {
          seconds
          }
        </h3>
      </div>
    )
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
