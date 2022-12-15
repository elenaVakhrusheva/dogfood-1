 import React, { useContext } from "react";
 import s from "./style.module.css";
 import cn from 'classnames'; 
 import {ReactComponent as FavoriteIcon} from './img/favorites.svg'
import { Link, useLocation } from "react-router-dom";
import { CardContext } from "../../Context/cardContext";

function Header({children, user, onUpdateUser}) { 
  const { favorites } = useContext(CardContext);
  const location = useLocation();
  return (
  <header className={cn(s.header,'cover')}>
    <div className="container">
      <div className={s.header__wrapper}> {children}
        <div className={s.iconsMenu}>
          <Link className={s.favoritesLink} to={{pathname:"/favorites"}}>
            <FavoriteIcon/>
            {favorites.length !== 0 && <span className={s.iconBubble}>{favorites.length}</span>}
          </Link>          
          <Link to='/login' state={{backgroundLocation: location, initialPath: location.pathname}} >Войти</Link>
        </div>
      </div>
    </div>
  </header>
  )
}

export default Header;