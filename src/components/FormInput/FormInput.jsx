import React from "react";
import { forwardRef } from 'react';
import s from './index.module.css';
import cn from 'classnames';

export const FormInput = forwardRef((props, ref) => {
  return (
    props.typeinput === 'textarea'
    ? <textarea ref={ref} className={cn(s.input, s.textarea)} {...props}/>
    : <input ref={ref} className={s.input} {...props}/>
  )
})

export default FormInput;