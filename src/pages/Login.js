import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Card from '../components/UI/Card';
import '../styles/main.css';
import postRequestData from '../services/postService';
const Login = (props) => {
  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [emailWasTouched, setEmailWasTouched] = useState(false);
  const [passwordWasTouched, setPasswordWasTouched] = useState(false);
  const [formIsValid, setFormIsValid] = useState(false);
  //bind the front and the back for login test

  let postRequest = async () => {
    let resp = undefined;
    const url="http://localhost:8080/users/login";
    
    resp = await postRequestData(url, {
      email: emailInput,
      password: passwordInput
    })
    console.log(resp)
    if(resp === -1) {
      props.onLogin(false, resp);
    } else {
      props.onLogin(true, resp);
    }
  }
  //finish test binding
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

    postRequest();

    if(props.logStatus && formIsValid) {
      history.push('/home');
    }
  }

  function logoutHandler(e) {
    setEmailInput('')
    setEmailWasTouched(false)
    props.onLogin(false, -1);
  }

  return (
    <main className='login'>
    {!props.logStatus && (
      <Card>
        <h3>Login</h3>
        <form onSubmit={loginHandler}>
          <div>
            <label htmlFor="email">E-mail </label>
            <input className={!emailInput && emailWasTouched? 'invalid' : ''} onBlur={emailBlurHandler} type="text" id='email' placeholder='type here' onChange={emailChangeHandler} />
          </div>
          <div>
            <label htmlFor="password">Password </label>
            <input className={!passwordInput && passwordWasTouched? 'invalid' : ''} onBlur={passwordBlurHandler} type="password" id="password" placeholder='type here' onChange={passwordChangeHandler} />
          </div>
          {!formIsValid && emailWasTouched && passwordWasTouched && <p>Your e-mail, username or password is incorrect!</p>}
          {!props.logStatus && <button type='submit' className='loginBtn' disabled={!emailInput || !passwordInput}>Log in</button>}
        </form>
      </Card>)}
      {props.logStatus && (
      <Card>
        <h2>You're logged in</h2>
        <button type='submit' onClick={logoutHandler}>Log out</button>
      </Card>
      )}
    </main>

  )
}

export default Login