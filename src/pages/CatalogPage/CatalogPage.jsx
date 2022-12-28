import React, { useContext } from "react";
import Sort from '../../components/Sort/Sort'
import CardList from "../../components/CardList/CardList";
//import Spinner from "../../components/Spinner/Spinner";
import { CardContext } from "../../Context/cardContext";

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

export const CatalogPage = () => {
  const {cards} = useContext(CardContext); 
  return (
    <>
		<div className="container container__inner">
      <Sort tabs={tabs}/>
        <div className='content__cards'>
          {/* <Spinner/> */}
           <CardList cards={cards}/>          
        </div>
			</div>
    </>
  )
}

/* export default catalogPage; */