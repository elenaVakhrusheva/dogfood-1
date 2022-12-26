import React, { useCallback, useContext, useEffect, useState } from "react";
/* import { Sort } from '../components/Sort/Sort';
import Search from "antd/lib/transfer/search";
import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";
import Logo from "../components/Logo/Logo"; */
import Spinner from "../components/Spinner/Spinner";
import api from "../utils/api";
/* import { isLiked } from "../utils/product"; */
import { Product } from "../components/Product/product";
import { useParams } from "react-router-dom";
import { NotFound } from "../components/NotFound/NotFound";
/* import { UserContext } from "../Context/newContext"; */
import { CardContext } from "../Context/cardContext";
import { useApi } from "../hooks/useApi";

// const ID_PRODUCT = '622c77e877d63f6e70967d22';

export const ProductPage = () => {
  const {productId} = useParams();
  const {handleLike} = useContext(CardContext);

  const handleGetProduct = useCallback(() =>  api.getProductById(productId), [productId]);
  
  const {
    data:product, 
    setData:setProduct, 
    loading: isLoading,
    error: errorState
  } = useApi(handleGetProduct) 
 
  const handleProductLike = useCallback(
    ()=>{ 
      handleLike(product).then((updateProduct)=> {
        setProduct(updateProduct); 
    });
  }, [product, handleLike, setProduct] )  

  return (
      
       <div className='content__cards'>
        {isLoading 
          ? <Spinner/>
          : !errorState && <Product {...product} setProduct={setProduct}  onProductLike={handleProductLike} />
        }
        {!isLoading && errorState && <NotFound/>}
        </div>
     
  )
}