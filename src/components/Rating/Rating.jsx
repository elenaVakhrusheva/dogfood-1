import React from "react";
import cn  from "classnames";
import s from './style.module.css'
import { useEffect, useState, useCallback } from "react";
import { ReactComponent as StarIcon } from "./start.svg";

export const Rating = ({isEditable = false, rating, setRating = null}) => {
  const [ratingArray, setRatingArray] = useState(new Array(5).fill(<></>));
  
  const constructRating = useCallback((currentRating) => {
    
    const updateArray = ratingArray.map((ratingElement, index) => {
      return (
        <StarIcon className={cn(s.star, {[s.filled]: index < currentRating, [s.editable]: isEditable})}
          onMouseEnter={()=>changeDisplay(index + 1)}
          onMouseLeave={()=>changeDisplay(rating)}
          onClick={() => changeRating(index + 1)}/>
      )
    })
      setRatingArray(updateArray)},[rating, isEditable])
    
    const changeDisplay = (rating) => {
        if(!isEditable) return constructRating(rating)
    }

    const changeRating = (rating) => {
        if(!isEditable || !setRating) return setRating(rating)
    }

    useEffect(() => {
      constructRating(rating)}, [rating, constructRating])
        return (
          <div> 
            {ratingArray.map((r, i) => <span key={i}>{ r }</span>) }
          </div>
        )
  }