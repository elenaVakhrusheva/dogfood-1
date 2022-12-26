import React, { useContext } from "react";
import Sort from '../../components/Sort/Sort'
import CardList from "../../components/CardList/CardList";
// import Spinner from "../../components/Spinner/Spinner";
import { CardContext } from "../../Context/cardContext";
import { ContentHeader } from "../../components/ContentHeader/ContentHeader";

export const FavoritePage = () => {
   const {favorites} = useContext(CardContext); 
  return (
    <div className="container container_inner">
      <ContentHeader title="Избранное"/>
      <Sort/>
        <div className='content__cards'>
         {/*  <Spinner/> */}
          <CardList cards={favorites}/>
        </div>
    </div>
  )
}

/* export default catalogPage; */