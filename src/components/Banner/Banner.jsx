import React from "react";
import cn from 'classnames';
import s from './index.module.css';

export const Banner = ({title, subtitle, bg, price, extraClass, colorBg}) => {
    console.log(bg);
    return (
        <div className={cn(s.banner,{ [s[extraClass]]: !!extraClass})} style={{backgroundImage: `url(${bg})`, backgroundColor:colorBg}}>
            <h2 className={s.title}>{title}</h2>
            <h2 className={s.subtitle}>{subtitle}</h2>
            <span className={s.price}>{price}</span>
        </div>
    )
}