export const EMAIL_REGEXP = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
export const PASSWORD_REGEXP = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

export const VALIDATE_CONFIG = {
    requiredMessage: "Обязательное поле",
    emailMessage: "Email не соотвествует формату электронной почты",
    passwordMesssage: "Пароль должен содержать минимум восемь символов, одну букву латинского алфавита и одну цифру"
}