import React from "react";
import './style.css';
import FormInput from "../FormInput/FormInput"
import { useForm } from "react-hook-form";

 

function RegistrationForm() {
    const {register, handleSubmit, formState} = useForm({mode: "onBlur"});
    const cbSubmit = (data) => {
        console.log(data);
    }
    console.log(formState);
	return (
		<form onSubmit={handleSubmit(cbSubmit)}>
			<h3>Регистрация</h3>    
			<FormInput
        {...register('name', {required: {
          value: true,
          message: "Имя пользователяе обязательно"},
          minLength: {
            value: 2,
            message: "Имя пользователя должно быть не менее 3 символов"}
        })} 
			  type="text"
			  placeholder="Имя"/>
          <div>
            {formState.errors?.name && <p className='errorMessage'>{formState.errors?.name?.message}</p>}
          </div>
		
			<input
        {...register('email')} 
		    type="text"
		    placeholder="Email"/>		
			<input
        {...register('password', {required: {
          value: true,
          message: "Поля является обязательным"},
          pattern: {
            value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
            message: "Пароль должен содержать минимум 8 символов, 1 букву латинского алфавита и 1 цифру."}
        })} 
		    type="password"
		    placeholder="Password"/>
        <div>
          {formState.errors?.password && <p className='errorMessage'>{formState.errors?.password?.message}</p>}
        </div>		
			<button>Зарегистрироваться</button>
		</form>
	);
};

export default RegistrationForm;