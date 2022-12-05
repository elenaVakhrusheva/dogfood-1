 import React, { useContext } from "react";
 import s from "./style.module.css";
 import cn from 'classnames';
import { ThemeContext } from "@emotion/react";


function Header({children, user, onUpdateUser }) {
  const {toggleTheme} = useContext(ThemeContext)
/*   const handleClickButtonEdit = (e) => {
    e.preventDefault();
    onUpdateUser({name:'Василий', about:'Ментор'})
  } */

  return (
    <header className={cn(s.header, 'cover')}>
      <div className="container">
       {/*  {user?.email && <span>{user?.email}</span>}
        {user?.name && <span>{user?.name}</span>}
*/}
        <button className="btn" onClick={toggleTheme}>Изменить</button> 

        <div className={s.header__wrapper}>
          {children}
        </div>
      </div>
    </header>
  )
}

export default Header;