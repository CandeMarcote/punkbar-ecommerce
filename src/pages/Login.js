import React, { useRef } from 'react';
import { useHistory } from 'react-router-dom';
import Card from '../components/UI/Card';


const userEmail = '123@gmail.com';
const userPassword = '123456';

const Login = (props) => {
  let history = useHistory();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  function loginHandler(e) {
    e.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    if(enteredEmail === userEmail && enteredPassword === userPassword) {
      props.onLogin(true);
      history.push('/home')
    } else {
      return;
    }
  }

  function logoutHandler(e) {
    props.onLogin(false);
  }


  return (
    <>
    {!props.logStatus && (
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
          {!props.logStatus && <button type='submit'>Log in</button>}

        </form>
      </Card>)}
      {props.logStatus && (
      <Card>
        <h2>You're logged in</h2>
        <button type='submit' onClick={logoutHandler}>Log out</button>
      </Card>
      )}
    </>

  )
}

export default Login