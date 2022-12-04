import { Sort } from "@mui/icons-material";
import React from "react";
import CardList from "../../components/CardList/CardList";
import Spinner from "../../components/Spinner/Spinner";

export const CatalogPage = ({isLoading,currentUser,handleproductLike, cards}) => {
  return (
    <>
      <Sort/>
        <div className='content__cards'>
        {isLoading 
          ? <Spinner/>
          : <CardList goods={cards} onProductLike={handleproductLike} currentUser={currentUser}/>
        }
        </div>
    </>
  )
}

/* export default catalogPage; */