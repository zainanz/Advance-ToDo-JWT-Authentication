import "./form.css"
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { login } from "../../app/store/authSlice";

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

  if (auth.isLoggedIn) return (<h1> Welcome back, {userData.email}</h1>)

  return (
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
  );
}
