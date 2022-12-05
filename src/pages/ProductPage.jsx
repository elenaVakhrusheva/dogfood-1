import React, { useCallback, useContext, useEffect, useState } from "react";
import { Sort } from "@mui/icons-material";
import Search from "antd/lib/transfer/search";
import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";
import Logo from "../components/Logo/Logo";
import Spinner from "../components/Spinner/Spinner";
import api from "../utils/api";
import { isLiked } from "../utils/product";
import { Product } from "../components/Product/product";
import { useParams } from "react-router-dom";
import { NotFound } from "../components/NotFound/NotFound";
import { UserContext } from "../Context/newContext";
import { CardContext } from "../Context/cardContext";

// const ID_PRODUCT = '622c77e877d63f6e70967d22';

export const ProductPage = ({isLoading}) => {
  const {productId} = useParams();
  const [product, setProduct]= useState(null);
  const [errorState, setErrorState]= useState(null);

  const {handleLike} = useContext(CardContext);
 
  const handleProductLike = useCallback(
    ()=>{ 
      handleLike(product).then((updateProduct)=> {
        setProduct(updateProduct); 
    });
    
    /* const liked = isLiked(product.likes, currentUser._id);
    api.changeLikeProduct(product._id, liked)
      .then((newProduct)=>{ 
        
      }) */
  }, [product, handleLike] )  

  

    useEffect(() => {
    //setIsLoading (true);
    // при загрузке карточек покажи прелоадер
    api.getProductById(productId)
      .then(([productsData ]) => {
        /* setCurrentUser(userData); */
        setProduct(productsData);
      })
      .catch(err => setErrorState(err))
     /*  .finally(()=>{
        setIsLoading(false);// если загрузка карточек закончена, то выключи прелоадер
      }) */
  }, [])



  return (
     <>
       <div className='content__cards'>
        {isLoading 
          ? <Spinner/>
          : !errorState && <Product {...product} setProduct={setProduct}  onProductLike={handleProductLike} />
        }
        {!isLoading && errorState && <NotFound/>}
        </div>
    </>
  )
}