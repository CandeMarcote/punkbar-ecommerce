import React, { useState, useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Card from '../components/UI/Card';
import '../styles/main.css';
import postRequestData from '../services/postService';
import CartContext from '../store/cart-context';
import FavoritesContext from '../store/favorites-context';

const Login = (props) => {
  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [emailWasTouched, setEmailWasTouched] = useState(false);
  const [passwordWasTouched, setPasswordWasTouched] = useState(false);
  const [formIsValid, setFormIsValid] = useState(false);
  const cartCtx = useContext(CartContext);
  const favoritesCtx = useContext(FavoritesContext);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || {})

  useEffect(()=> {
    localStorage.setItem('user', JSON.stringify(user));
    console.log(user)
  }, [user])

  let postRequest = async () => {
    let resp = undefined;
    const url="http://localhost:8080/users/login";
    
    resp = await postRequestData(url, {
      email: emailInput,
      password: passwordInput
    })
    
    setUser(resp);
    if(resp === -1) {
      props.onLogin(false, resp.id);
    } else {
      props.onLogin(true, resp.id);
    }
  }

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
    cartCtx.clearCart();
    //favoritesCtx.clearFavorites();
    props.onLogin(false, -1);
    setUser({});
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
        <h2>Welcome {user.username}!</h2>
        <br/>
        <button type='submit' onClick={logoutHandler}>Log out</button>
      </Card>
      )}
    </main>

  )
}

export default Login;