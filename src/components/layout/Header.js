import React, {useContext} from 'react';
import { NavLink, useHistory, Link } from 'react-router-dom';
import HeaderCartButton from '../Cart/HeaderCartButton';
import '../../styles/header.css';
import BurgerMenu from '../UI/BurgerMenu';
import FavoritesContext from '../../store/favorites-context';
import CartContext from '../../store/cart-context';

const Header = (props) => {
  let history = useHistory();
  const cartCtx = useContext(CartContext);
  const favoritesCtx = useContext(FavoritesContext);

  function loginHandler(){
    props.onLogin(false, -1)
    favoritesCtx.clearFavorites();
    cartCtx.clearCart();

    localStorage.setItem("burgersCurrentPage", 1)
    localStorage.setItem("beersCurrentPage", 1)

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