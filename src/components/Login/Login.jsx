import React from 'react';
import { useForm } from "react-hook-form";
import {  useLocation, useNavigate } from "react-router-dom";
import { EMAIL_REGEXP, PASSWORD_REGEXP, VALIDATE_CONFIG } from "../../utils/contants";
import Form from "../Form/Form";
import { FormButton } from "../FormButton/FormButton";
import { FormInput } from "../FormInput/FormInput";
import s from "./index.module.css"

export const Login = () => {
  
  const location = useLocation();
  const initialPath = location.state?.initialPath;
  const { register, handleSubmit, formState: { errors }} = useForm({mode: "onBlur"});
  const navigate = useNavigate();
  const handleClickResetButton= (e) => {
    e.preventDefault();
    navigate('/reset-password', {
      replace: true, 
      state: {backgroundLocation: location, initialPath}});}
  const handleClickRegistrationButton= (e) => {
    e.preventDefault();
    navigate('/register', {
      replace: true, 
      state: {backgroundLocation: location,initialPath}});
    }
  const sendRegisterApi = (data) => {
    console.log(data);}
 
  const emailRegister = register('email', {
    required: {
      value: true,
      message: VALIDATE_CONFIG.requiredMessage},
    pattern: {
      value: EMAIL_REGEXP,
      message: VALIDATE_CONFIG.emailMessage}
    })
  
  const passwordRegister = register('password', {
    required: {
      value: true,
      message: VALIDATE_CONFIG.requiredMessage},
    pattern: {
      value: PASSWORD_REGEXP,
      message: VALIDATE_CONFIG.passwordMesssage}
    })

  return (
    <Form title="Вход" handleFormSubmit={handleSubmit(sendRegisterApi)}>
    
      <FormInput {...emailRegister}
        id="email"
        type="text"
        placeholder="email"/>
          {errors?.email && <p className='errorMessage'>{errors?.email?.message}</p>}

      <FormInput {...passwordRegister}
        id="password"
        type="password"
        placeholder="Пароль"/>
          {errors?.password && <p className='errorMessage'>
          {errors?.password?.message}</p>}

      <p className="infoText link" onClick={handleClickResetButton}>Восстановить пароль</p>
      
      <FormButton type="submit" color="yellow" className={s.enterLk}>Войти</FormButton>
      
      <FormButton color="white" type="button" onClick={handleClickRegistrationButton}>Регистрация</FormButton>
    
    </Form>
  )
}