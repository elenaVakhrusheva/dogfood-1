import React, {useState, useRef }  from 'react';
import { useForm } from "react-hook-form"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { EMAIL_REGEXP, PASSWORD_REGEXP, VALIDATE_CONFIG } from "../../utils/contants"
import Form from "../Form/Form"
import { FormButton } from "../FormButton/FormButton"
import { FormInput } from "../FormInput/FormInput"

export const Register = () => {
  const location = useLocation();
  const initialPath = location.state?.initialPath;
  const {register, handleSubmit, formState: { errors }} = useForm({ mode: "onBlur" });
  const navigate = useNavigate();
  const handleClickLoginButton = (e) => {
    e.preventDefault();
    navigate('/login', { replace: true, state: {backgroundLocation: location, initialPath}});}
  const sendRegisterApi = (data) => {
    console.log(data);}
  const emailRegister = register('email', {
    required:{
      value: true,
      message: VALIDATE_CONFIG.requiredMessage},
    pattern:{
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

  return(
    <Form title="Регистрация" handleFormSubmit={handleSubmit(sendRegisterApi)}>    
        <FormInput {...emailRegister}
            id="email"
            type="text"
            placeholder="email"/>
            
            {errors?.email && <p className='errorMessage'>{errors?.email?.message}</p>}

        <FormInput {...passwordRegister}
            id="password"
            type="password"
            placeholder="Пароль"/>

            {errors?.password && <p className='errorMessage'>{errors?.password?.message}</p>}

            <p className="infoText">Регистрируясь на сайте, вы соглашаетесь с нашими правилами и Политикой конфиденциальности и соглашаетесь на информационную рассылку.</p>
        
        <FormButton type="submit" color="yellow">Зарегистрироваться</FormButton>
        
        <FormButton color="white" type="button" onClick={handleClickLoginButton}>Войти</FormButton>

    </Form>
    
    )

}