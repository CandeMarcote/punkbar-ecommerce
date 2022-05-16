import React, { useState, useRef, useEffect } from 'react';
import Card from '../components/UI/Card';


const userEmail = '123@gmail.com';
const userPassword = '123456';

const Login = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(JSON.parse(localStorage.getItem('isLoggedIn')) || false)
  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  function loginHandler(e) {
    e.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    if(enteredEmail === userEmail && enteredPassword === userPassword) {
      setIsLoggedIn(true);
    } else {
      return;
    }
  }

  function logoutHandler(e) {
    setIsLoggedIn(false);
  }

  useEffect(()=>{
    localStorage.setItem('isLoggedIn', isLoggedIn);
    props.onLogin(isLoggedIn);
  }, [isLoggedIn])


  return (
    <>
    {!isLoggedIn && (
      <Card>
        <h3>Login</h3>
        <br />
        <form onSubmit={loginHandler}>
          <div>
            <label htmlFor="email">E-mail or username </label>
            <input type="text" id='email' placeholder='type here' ref={emailInputRef} />
          </div>
          <br />
          <div>
            <label htmlFor="password">Password </label>
            <input type="password" id="password" placeholder='type here' ref={passwordInputRef} />
          </div>
          <br />
          {!isLoggedIn && <button type='submit'>Log in</button>}

        </form>
      </Card>)}
      {isLoggedIn && (
      <Card>
        <h2>You're logged in</h2>
        <button type='submit' onClick={logoutHandler}>Log out</button>
      </Card>
      )}
    </>

  )
}

export default Login