import React from 'react';
import { useContext } from "react";
import { CardContext } from "../../Context/cardContext";
import "./style.css";
import cn from 'classnames';

const tabs = [
    {
      id: "cheap",
      title: "Сначала дешёвые",
    },
    {
      id: "low",
      title: "Сначала дорогие",
    },
    {
      id: "sale",
      title: "По скидке",
    },
    ];


const Sort = () => {
    const {currentSort, setCurrentSort, onSortData} = useContext(CardContext);
	
	
	const handleClick = (e, tab) => {
		e.preventDefault(); 
		setCurrentSort(tab.id);
		onSortData(tab.id)
	}
	return (
		<div className="sort content__sort">
			{tabs.map(tab => (
				<div className={cn("sort__link", { "sort__link_selected": currentSort=== tab.id})}
					key={tab.id}
					id={tab.id}>

					<a onClick={(e) => handleClick(e, tab)}>{tab.title}</a>
				</div>
			))}
		</div>
	);
};

export default Sort;
