import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Card from '../components/UI/Card';
import '../styles/main.css';
import getRequestData from '../services/services';

const Login = (props) => {
  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [emailWasTouched, setEmailWasTouched] = useState(false);
  const [passwordWasTouched, setPasswordWasTouched] = useState(false);
  const [formIsValid, setFormIsValid] = useState(false);
  const [user, setUser] = useState([]);

  //bind the front and the back for login test

  let getFetch = async () => {
    let resp = undefined;
    const url = "http://localhost:8080/users";
    //const url = "https://api.punkapi.com/v2/beers/1" 
    resp = await getRequestData(url)

    const existingItem =resp.filter(user => (user.username === emailInput) || (user.email === emailInput));
    setUser(existingItem)
  }
  
  useEffect(()=> {
    getFetch();
}, [emailInput])
  
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

    if(user.length === 0) {
      setFormIsValid(false)
    }

    if(emailInput === user[0].email && passwordInput === user[0].password || emailInput === user[0].username && passwordInput === user[0].password) {
      setFormIsValid(true);
      props.onLogin(true);
      history.push('/home');
    }
  }

  function logoutHandler(e) {
    props.onLogin(false);
  }


  return (
    <main className='login'>
    {!props.logStatus && (
      <Card>
        <h3>Login</h3>
        <form onSubmit={loginHandler}>
          <div>
            <label htmlFor="email">E-mail or username </label>
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