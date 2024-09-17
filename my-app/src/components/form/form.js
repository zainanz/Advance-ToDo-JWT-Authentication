// imports
import "./form.css"
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { login } from "../../app/store/authSlice";
import Frm from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';



//logic


export default function Form(){
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


 //view

  if (auth.isLoggedIn) return (<h1> Welcome back, {userData.email}</h1>)

  return (
    <div style={{height: '100%'}} className="d-flex justify-content-center align-items-center border">
      <Frm onSubmit={handleFormSubmit} className="form-container p-5">
        <Frm.Group className="mb-3" controlId="formGroupEmail">
          <Frm.Label className=" text-white fw-bolder">Email address</Frm.Label>
          <Frm.Control value={userData.email} onChange={handleEmailInput} type="email" placeholder="Enter email" />
        </Frm.Group>
        <Frm.Group className="mb-3" controlId="formGroupPassword">
          <Frm.Label className=" text-white fw-bolder"value={userData.password} onChange={handlePasswordInput}>Password</Frm.Label>
          <Frm.Control type="password" placeholder="Password" />
        </Frm.Group>
        {
          auth.error ? <Alert className="d-flex justify-content-center align-items-center" style={{height:'10px'}}variant='danger'>{auth.error}</Alert>: ""
        }
        <Button className="w-100" variant="primary" type="submit">
          Submit
        </Button>
      </Frm>
    </div>

  );
}
{
/*
<div className="form-container">
 <form className="form-cover" onSubmit={handleFormSubmit}>
  <label htmlFor="email">Email</label>
  <input value={userData.email} onChange={handleEmailInput} id="email" type="email"/>
  <label htmlFor="password">Password</label>
  <input value={userData.password} onChange={handlePasswordInput} id="password" type="password"/>
  <input type="submit" value="login"/>
  <h2>{ auth.error ? auth.error : "Login to continue"}</h2>
</form>
</div>
*/}
