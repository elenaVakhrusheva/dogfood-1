import React from 'react';
import './style.css';

const SeachInfo = ({searchText, searchCount}) => {
	return (
		searchText && <section className="search-title">
			По запросу <span>{searchText}</span> найдено {searchCount} товаров
		</section>
	);
};

export default SeachInfo;