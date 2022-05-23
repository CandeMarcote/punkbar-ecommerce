import React, { useState } from 'react';
import '../../styles/header.css';

const BurgerMenu = (props) => {
    const [showMenu, setShowMenu] = useState(false);

    function toggleMenuHandler() {
        setShowMenu(!showMenu);
    }

  return (
    <div onClick={toggleMenuHandler} className='burgerMenuContainer'>
        <div className='middleLine'></div>
        {showMenu && <div className='content'>{props.children}</div>}
    </div>
  )
}

export default BurgerMenu