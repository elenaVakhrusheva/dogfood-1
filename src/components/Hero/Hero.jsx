import React from "react";
import { Link } from 'react-router-dom';
import s from './index.module.css';
import banner from './img/banner.png';
import arrow from './img/arrow.svg';
import cn from 'classnames';

export const Hero = () => {
    return (
        <div className={s.banner}>
            <div className={cn("container", s.banner__container)}>
                <div className={s.left}>
                    <h1 className={s.title}>Крафтовые лакомства для собак</h1>
                    <p className={s.subtitle}>Всегда свежие лакомства ручной работы с доставкой по России и всему миру</p>
                    
                    <Link to="catalog" className={s.link}>
                        Каталог <img src={arrow} alt="arrow"/>
                    </Link>

                </div>
                <div className={s.right}>
                    <img src={banner} alt="Баннер" />
                </div>
            </div>
        </div>
    )
}