import React,{useState} from 'react';
import {Link} from 'react-router-dom';

const Login = () => {
  const [userData,setUserData]=useState({
    email: ' ',
    password: ' ',
  });
  const changeInputHandler=(e)=>{
    setUserData(prevState=>{
      return {...prevState,[e.target.name]:e.target.value}
    })
  };
  return (
    <section className='register'>
      <div className='container'>
        <h2>Sign In</h2>
      </div>
      <form className="form login_form">
        <p className="form_error-message">This is an Error Message</p>
        <input type='text' placeholder="Email" name='email' value={userData.email} onChange={changeInputHandler} />
        <input type='text' placeholder="Password" name='password' value={userData.password} onChange={changeInputHandler} />
        <button type="submit" className='btn-primary'>Log In</button>
      </form>
      <small>Don't Have an account?<Link to="/register">Sign Up</Link></small>
    </section>
  )
}


export default Login