import React from 'react';
import { Link } from 'react-router-dom';
import './style.css';
import logoSrc from './logo.svg'


function Logo({className, href, ...props}) {  
  const hrefValue = href ? href : null;
  return (
    <> 
    hrefValue 
      ?  <Link to={{pathname: hrefValue}}  className={className ? className : "logo"}>
        <img src={logoSrc} alt="Логотип" className='logo__pic' />
        </Link>
      : <a href='#'  className={className ? className : "logo"}>
          <img src={logoSrc} alt="Логотип" className='logo__pic' />
        </a> 
        </>
  )
}

export default React.memo(Logo);