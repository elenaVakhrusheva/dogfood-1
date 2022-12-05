import { Sort } from "@mui/icons-material";
import React from "react";
import CardList from "../../components/CardList/CardList";
import Spinner from "../../components/Spinner/Spinner";

export const CatalogPage = ({isLoading}) => {
  return (
    <>
      <Sort/>
        <div className='content__cards'>
        {isLoading 
          ? <Spinner/>
          : <CardList />
        }
        </div>
    </>
  )
}

/* export default catalogPage; */