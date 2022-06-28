import React from 'react';
import { NavLink, useHistory, Link } from 'react-router-dom';
import HeaderCartButton from '../Cart/HeaderCartButton';
import '../../styles/header.css';
import BurgerMenu from '../UI/BurgerMenu';

const Header = (props) => {
  let history = useHistory();

  function loginHandler(){
    props.onLogin(false)
    history.push('/login')
  }

  return (
  <header className='header'>
    <div>
      <NavLink to='/cart' activeClassName='active'><HeaderCartButton logStatus={props.logStatus}/></NavLink>
      <Link to='/home'><h1 className='header__title'>Punk API</h1></Link>
    </div>
    {props.logStatus && <BurgerMenu>
    <nav className='nav'>
        <ul>
            <div>
              <li><NavLink to='/home' activeClassName='active'><strong>Home</strong></NavLink></li>
              <li><NavLink to='/beers' activeClassName='active'>Beers</NavLink></li>
              <li><NavLink to='/burgers' activeClassName='active'>Burgers</NavLink></li>
              <li><NavLink to='/favorites' activeClassName='active'>Favorites</NavLink></li>
            </div>
            <br />
            <li><button onClick={loginHandler}><p>Log out</p></button></li>
        </ul>
    </nav>
    </BurgerMenu>}

  </header>
  )
}

export default Header