import React from "react";
import { forwardRef } from 'react';
import s from './index.module.css';

export const FormInput = forwardRef((props, ref) => {
  return (
    <input ref={ref} className={s.input} {...props}/>
  )
})

export default FormInput;