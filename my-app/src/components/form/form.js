// imports
import "./form.css"
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { login } from "../../app/store/authSlice";
import Frm from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from "@fortawesome/free-solid-svg-icons";



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
  }
  const handleEmailInput = (e) => {
    setUserData( prev => ({...prev, ['email']:e.target.value}));
  }

  useEffect(() => {
      if(auth.isLoggedIn){
        console.log(auth);
        const interval = setInterval(() => {
        setSeconds( prev => prev - 1);
      }, 1000);
      const timeout = setTimeout(() => {
        navigate("/todos")
      }, 3000);
      return () => {
        clearTimeout(timeout);
        clearInterval(interval);
      };
      }
    }, [auth.isLoggedIn, navigate]);


  if (auth.isLoggedIn) {
    console.log(auth)
    return (
      <div style={{minHeight:'100vh'}} className="d-flex flex-column justify-content-center align-items-center">
        <h1 className="playwrite-de-grund">Welcome back, {auth.user.username}</h1>
        <h5 className="text-gray">Redirecting in: {seconds}</h5> <FontAwesomeIcon className="fs-3 loading-animate" icon={faSpinner} />

      </div>
    );
  }

  return (
    <>


    <div style={{minHeight:'100vh'}} className="d-flex justify-content-evenly align-items-center">
      <div>
       <h1 className="sofadi-one-regular">Sort your <span style={{padding: "0px 10px", backgroundColor: "#CEDF9F"}}>life</span> with us</h1>
        <h5>fulfill your <span  className="sofadi-one-regular fs-3" style={{ padding: "0px 10px", backgroundColor: "#CEDF9F"}}>dreams</span></h5>
      </div>
      <div>
        <h3 className="text-center playwrite-de-grund ls-5 my-5">Log in to continue</h3>
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
    </div>
    </>
  );
}
