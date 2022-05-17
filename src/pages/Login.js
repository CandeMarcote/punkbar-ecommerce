import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Card from '../components/UI/Card';
import classes from './Login.module.css'


const userEmail = '123@gmail.com';
const userPassword = '123456';
const userName = '123';

const Login = (props) => {
  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [emailWasTouched, setEmailWasTouched] = useState(false);
  const [passwordWasTouched, setPasswordWasTouched] = useState(false);
  const [formIsValid, setFormIsValid] = useState(false);

  let history = useHistory();

  function emailChangeHandler(e){
    setEmailInput(e.target.value)
    setFormIsValid(true)
  }

  function passwordChangeHandler(e){
    setPasswordInput(e.target.value)
    setFormIsValid(true)
  }

  function emailBlurHandler() {
    setEmailWasTouched(true);
  }

  function passwordBlurHandler() {
    setPasswordWasTouched(true);
  }

  function loginHandler(e) {
    e.preventDefault();
    setEmailWasTouched(true);
    setPasswordWasTouched(true);

    if(emailInput === userEmail && passwordInput === userPassword || emailInput === userName && passwordInput === userPassword) {
      setFormIsValid(true);
      props.onLogin(true);
      history.push('/home');
    } else {
      setFormIsValid(false);
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
            <input className={!emailInput && emailWasTouched? classes.invalid : ''} onBlur={emailBlurHandler} type="text" id='email' placeholder='type here' onChange={emailChangeHandler} />
          </div>
          <br />
          <div>
            <label htmlFor="password">Password </label>
            <input className={!passwordInput && passwordWasTouched? classes.invalid : ''} onBlur={passwordBlurHandler} type="password" id="password" placeholder='type here' onChange={passwordChangeHandler} />
          </div>
          <br />
          {!formIsValid && emailWasTouched && passwordWasTouched && <p>Your e-mail, username or password is incorrect!</p>}
          {!props.logStatus && <button type='submit' disabled={!emailInput || !passwordInput}>Log in</button>}
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