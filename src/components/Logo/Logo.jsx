import React from 'react';
import './style.css';
import logoSrc from './logo.svg'

function Logo({className, href, ...props}) {
  /* console.log(props); */
  return (
    <a href={href ? href : "#"} className={className ? className : "logo"} {...props}>
        <img src={logoSrc} alt="Логотип компании" className='logotype' />
    </a>
  )
}

export default Logo;