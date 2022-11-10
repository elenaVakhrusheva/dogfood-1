import React, { useEffect, useState } from "react";
import CardList from "./components/CardList/CardList";
import Header from "./components/Header/Header";
import Logo from "./components/Logo/Logo";
import Search from "./components/Search/Search";
import Searchinfo from "./components/SearchInfo/Searchinfo";
import Footer from "./components/Footer/Footer";
import Sort from "./components/Sort/Sort";
import "./style.css";
import data from "./assets/data.json";
import Button from "./components/Button/button";
import useDebounce from "./hooks/useDebounce.js"; 
import api from './utils/api'
import {isLiked} from "./utils/product";


function App() {
  const [cards, setCards] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentUser, setCurrentUser] = useState(null);
  const debounceSearchQuery = useDebounce(searchQuery, 200);

  const handleRequest = () => {
    // const filterCards = cards.filter( item => item.name.toUpperCase().includes(searchQuery.toUpperCase()));
    // setCards(filterCards);
    api
      .search(debounceSearchQuery)
      .then((searchResult) => {
        setCards(searchResult);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    Promise.all([api.getProductList(), api.getUserInfo()])
      .then(([productsData, userData]) => {
        setCurrentUser(userData);
        setCards(productsData.products);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    handleRequest();
    console.log("INPUT", debounceSearchQuery);
  }, [debounceSearchQuery]);  

  const handleFormSubmit = (e) => {
    e.preventDefault();
    handleRequest();
  };

  const handleInputChange = (inputValue) => {
    setSearchQuery(inputValue);
  };

  function handleUpadateUser(userUpdateData) {
    api.setUserInfo(userUpdateData)
      .then((newUserData)=>{
        setCurrentUser(newUserData)
      })
  }

  function handleproductLike(product) {
    const liked = isLiked(product.likes, currentUser._id);
    api.changeLikeProduct(product._id, liked)
      .then((newCard)=>{
        const newProducts = cards.map(cardState => {
         /*  console.log("Карточка из стейта", cardState);
          console.log("Карточка с сервера", newCard); */
          return cardState._id === newCard._id ? newCard : cardState 
        })
        setCards(newProducts)
      })
  }

  return (
    <>
      <Header user={currentUser} onUpdateUser={handleUpadateUser}>
        <>
          <Logo className="logo logo_header" href="/" />
          <Search onSubmit={handleFormSubmit} onInput={handleInputChange}/>
        </>
      </Header>
      <main className='content wrapper container cards-container'>

      {/* <Button type="primary">Купить</Button>
      <Button type="secondary">Подробнее</Button> */}
        
      <Searchinfo searchCount={cards.length} searchText={searchQuery}/>
       <Sort/>
        <div className='content__cards'>

        {
            currentUser
              ? <CardList goods={cards} onProductLike={handleproductLike} currentUser={currentUser}/>
              : <p>Loading...</p>
          }

         {/* <CardList goods={cards} onProductLike={handleproductLike} currentUser={currentUser}/> */}
        </div>
      </main>
      <Footer/>
    </>
  )
}

export default App;