 
import React, { useState } from "react";  
import { useForm } from "react-hook-form";
import './style.css';

function Form({title, formType, button, input, infoText, infoTextHeader, changeType, redirect}) {
    const {register, handleSubmit, formState: { errors }} = useForm({mode: "onBlur"})

    const cbSubmit = (data) => {console.log(data);}
    const emailRegexp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const passwordRegexp = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    const emailRegister = register('email', {
        required: {
          value: true,
          message: "Это обязательное поле"
        },
        pattern: {
          value: emailRegexp,
          message: "Email не соотвествует формату электронной почты"
        }
    })
    const passwordRegister = register('password', {
        required: {
          value: true,
          message: "Это обязательное поле"
        },
        pattern: {
          value: passwordRegexp,
          message: "Пароль должен содержать минимум 8 символов, 1 букву лат.алфавита и 1 цифру"
        }
    })
    return (
        <form onSubmit={handleSubmit(cbSubmit)}>
            <h1>{}</h1>
            <input
                type="text"
                name="name"
                placeholder="Имя"
                value={formData.name}
                onChange={handleChange}
            />
            <input
                type="text"
                name="lastName"
                placeholder="Фамилия"
                value={formData.lastName}
                onChange={handleChange}
            />
            <input
                type="number"
                name="phoneNumber"
                placeholder="Номер телефона"
                value={formData.phoneNumber}
                onChange={handleChange} 
            />
            <button>Отправить</button>
        </form>
    );
};

export default Form;