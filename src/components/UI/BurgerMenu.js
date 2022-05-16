import React, { useState } from 'react';
import classes from './BurgerMenu.module.css';

const BurgerMenu = (props) => {
    const [showMenu, setShowMenu] = useState(false);

    function menuHandler() {
        setShowMenu(!showMenu);
    }

  return (
    <div onClick={menuHandler} className={classes.burgerMenuContainer}>
        <div className={classes.middleLine}></div>
        {showMenu && <div className={classes.content}>{props.children}</div>}
    </div>
  )
}

export default BurgerMenu