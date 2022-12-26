import React, { useState } from "react";
import { useForm } from "react-hook-form";
import api from "../../utils/api";
import { EMAIL_REGEXP, PASSWORD_REGEXP, VALIDATE_CONFIG } from "../../utils/contants";
import Form from "../Form/Form";
import { FormButton } from "../FormButton/FormButton";
import { FormInput } from "../FormInput/FormInput";
import { Rating } from "../Rating/Rating"; 

export const FormReview = ({ title = 'Отзыв о товаре', productId, setProduct}) => {
  const {register, handleSubmit, formState: {errors}} = useForm({mode:"onBlur"})

  const [ratingClasses, setRating] = useState(1)

  const sendReviewProduct= (data) => {
    api.createReviewProduct(productId, {...data, rating})
      .then(newProduct=> {
        setProduct && setProduct(newProduct)
      })}

  const textRewiew = register('text', {
    required: {
      value:true, 
      message: VALIDATE_CONFIG.requiredMessage
    }
  })

  return (
    <Form title = {title} handleFormSubmit = {handleSubmit(sendReviewProduct)}>
      <Rating rating = {rating} isEditable setRating = {setRating} />

      <FormInput {...textReview} 
        id="text"
        typeinput ="textarea"
        placeholder="Напишите текст отзыва"/>

      {errors?.email && <p className="errorMessage">
        {errors?.email?.message} </p>}

      <FormButton type="submit" color="yellow">Отправить отзыв</FormButton>
      
    </Form>
  )


}