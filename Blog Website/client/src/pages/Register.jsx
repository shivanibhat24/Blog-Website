import React,{useState} from 'react';
import {Link,useNavigate} from 'react-router-dom';
import axios from 'axios';

const Register = () => {
  const [userData,setUserData]=useState({
    name:' ',
    email: ' ',
    password: ' ',
    password2: ' ',
  });
  const [error,setError]=useState();
  const navigate=useNavigate();
  const changeInputHandler=(e)=>{
    setUserData(prevState=>{
      return {...prevState,[e.target.name]:e.target.value}
    })
  };
  const registerUser=async(e)=>{
    e.preventDefault()
    setError(err)
    try {
      const response= await axios.post
    } catch (err) {
      setError(err.response.data.message)
    }
  }
  return (
    <section className='register'>
      <div className='container'>
        <h2>Sign Up</h2>
      </div>
      <form className="form register_form" onSubmit={registerUser}>
        <p className="form_error-message">This is an Error Message</p>
        <input type='text' placeholder='Full Name' name='name' value={userData.name} onChange={changeInputHandler} autoFocus/>
        <input type='text' placeholder='Email' name='email' value={userData.email} onChange={changeInputHandler} />
        <input type='text' placeholder='Password' name='password' value={userData.password} onChange={changeInputHandler} />
        <input type='text' placeholder='Confirm Password' name='' value={userData.password2} onChange={changeInputHandler} />
        <button type="submit" className='btn-primary'>Confirm Registration</button>
      </form>
      <small>Already Have an account?<Link to="/login">Sign In</Link></small>
    </section>
  )
}

export default Register