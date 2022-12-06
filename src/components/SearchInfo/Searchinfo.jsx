import React, { useContext } from "react";
import { CardContext } from './../../Context/cardContext.js';
import './style.css';

const SeachInfo = ({searchText}) => {
	const {cards} = useContext(CardContext);
	const searchCount = cards.lenght;
	return (
		searchText && <section className="search-title">
			По запросу <span>{searchText}</span> найдено {searchCount} товаров
		</section>
	);
};

export default SeachInfo;