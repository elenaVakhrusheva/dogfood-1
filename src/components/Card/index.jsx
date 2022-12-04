import React from "react";
import cn from 'classnames';

import "./style.css";
import {ReactComponent as Save} from "./save.svg"
import {isLiked} from "../../utils/product";
import { calcDiscountPrice} from "../../utils/product";

const Card = ({name, price, _id, likes, discount,wight,description, pictures, tags, onProductLike, currentUser}) => {
  const discount__price = calcDiscountPrice(price, discount);
  const liked = isLiked(likes, currentUser?._id)

  function handleLikeClick() {
    onProductLike({_id, likes})
  }

  return (
    <div className="card">
      <div className="card__attribute card__attribute-flag">
        {discount !==0 && <span className="card__discount"> {`-${discount}%`}</span>}
        {tags && tags.map(tag => <span key={tag} className={cn('tag', {[`tag tag_type_${tag}`]:true})}>{tag}</span>)}
      </div>
      <div className="card__attribute card__attribute-like">
        <button className={cn('like-img',{'like-img_is-active': liked})} onClick={handleLikeClick}>
          <Save className="like-img"/>           
        </button>
      </div>

      <a href="/product" className="card__link">
        <img src={pictures} alt={description} className="card__img" />
        <div className="card__descript">
          <span className = {discount !==0 ? "card__price-old" : "card__price"}>{price}&nbsp;₽          </span>
          { discount !==0 && 
          <span className="card__price-new">
            {discount__price}&nbsp;₽
            </span>}
          <span className="card__wight">{wight}</span>
          <p className="card__name">{name}</p>
        </div>
      </a>
      <a href="#" className="card__cart btn btn_primary">В корзину</a>
    </div>
  )
}
/*const Card = ({text, price, img}) => {
  const imgStyle = {
    backgroundImage: `url(${img})`
  };
  return(
    <div className="card">
      <div className="card__image" style={imgStyle}></div>
      <div className="card__price">{price}</div>
      <div className="card__text">{text}</div>
      <button className="btn">В корзину</button>
    </div>
  )
}
*/
export default Card;