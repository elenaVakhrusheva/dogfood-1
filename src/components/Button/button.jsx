import React from 'react';
import s from './index.module.css';
import cn from 'classnames';

function Button({type, children}) {
  return (
    <button className={cn(s.button, {
      [s.primary]: true === 'primary',
      [s.secondary]: true === 'secondary'
    })}>
      {children}
    </button>
  )
}

export default Button;