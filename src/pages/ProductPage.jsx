import React, { useCallback, useEffect, useState } from "react";
import { Sort } from "@mui/icons-material";
import Search from "antd/lib/transfer/search";
import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";
import Logo from "../components/Logo/Logo";
import Spinner from "../components/Spinner/Spinner";
import api from "../utils/api";
import { isLiked } from "../utils/product";
import { Product } from "../components/Product/product";

const ID_PRODUCT = '622c77e877d63f6e70967d22';

export const ProductPage = () => {
  /*  const [searchQuery, setSearchQuery] = useState(""); */
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading]= useState(true);
  const [product, setProduct]= useState(null);
  
  const handleRequest = useCallback((searchQuery) => {

   /*  const query = searchQueryDefault || searchQuery; */
    // const filterCards = cards.filter( item => item.name.toUpperCase().includes(searchQuery.toUpperCase()));
    // setCards(filterCards);
    setIsLoading (true); // при поиске загружаем прелоадер
    api
      .search(searchQuery)
      .then((searchResult) => {
        console.log(searchResult);
      })
      .catch((err) => console.log(err))
      .finally(()=>{
        setIsLoading(false); // если загрузка закончена, то выключи прелоадер
      })
  }, [])


/*   const handleFormSubmit = (value) => {
   setSearchQuery(value); 
    handleRequest(value);
  } */

  const handleProductLike = useCallback(
    ()=>{
    const liked = isLiked(product.likes, currentUser._id);
    api.changeLikeProduct(product._id, liked)
      .then((newProduct)=>{
       /*  const newProducts = cards.map(cardState => {
          console.log("Карточка из стейта", cardState);
          console.log("Карточка с сервера", newCard); 
          return cardState._id === newCard._id ? newCard : cardState 
        }) */
        setProduct(newProduct);
      })
  }, [product, currentUser] ) 

  

    useEffect(() => {
    setIsLoading (true);
    // при загрузке карточек покажи прелоадер
    Promise.all([api.getProductById(ID_PRODUCT), api.getUserInfo()])
      .then(([productsData, userData]) => {
        setCurrentUser(userData);
        setProduct(productsData);
      })
      .catch((err) => console.log(err))
      .finally(()=>{
        setIsLoading(false);// если загрузка карточек закончена, то выключи прелоадер
      })
  }, [])



  return (
     <>
      <Header>
        <>
          <Logo className="logo logo_header" href="/" />
          <Search onSubmit={handleRequest} />
        </>
      </Header>
      <main className='content wrapper container cards-container'>

      {/* <Button type="primary">Купить</Button>
      <Button type="secondary">Подробнее</Button> */}
        
      {/* <Searchinfo searchCount={cards.length} searchText={searchQuery}/> */}
       <Sort/>
        <div className='content__cards'>
        {isLoading 
          ? <Spinner/>
          : <Product {...product} currentUser={currentUser} onProductLike={handleProductLike}/>
        }
        </div>
      </main>
      <Footer/>
    </>
  )
}