import React, { useEffect, useState, useCallback } from "react";
/* import CardList from "./components/CardList/CardList"; */
import Header from "./components/Header/Header";
import Logo from "./components/Logo/Logo";
import Search from "./components/Search/Search";
import Searchinfo from "./components/SearchInfo/Searchinfo";
import Footer from "./components/Footer/Footer";
/* import Sort from "./components/Sort/Sort"; */
import "./style.css";
/* import data from "./assets/data.json";
import Button from "./components/Button/button"; */
import useDebounce from "./hooks/useDebounce.js"; 
import api from './utils/api'
import {isLiked} from "./utils/product";
/* import Spinner from "./components/Spinner/Spinner" */
import { CatalogPage } from "./pages/CatalogPage/catalogPage";
import { ProductPage } from "./pages/ProductPage";
import { Routes, useNavigate } from "react-router-dom";
import { Route } from "@mui/icons-material";
import { UserContext } from "./Context/newContext";
import { CardContext } from "./Context/cardContext";

function App() {
  const [cards, setCards] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading]= useState(true);
  const debounceSearchQuery = useDebounce(searchQuery, 200);
  const navigate = useNavigate();
  const [theme, setTheme] = useState(themes.light);
    
  const handleRequest = useCallback(() => { 
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
  }, [searchQuery])

  

  useEffect(() => {
    setIsLoading (true);
    // при загрузке карточек покажи прелоадер
    Promise.all([api.getProductList(), api.getUserInfo()])
      .then(([productsData, userData]) => {
        setCurrentUser(userData);
        setCards(productsData.products);
      })
      .catch((err) => console.log(err))
      .finally(()=>{
        setIsLoading(false);// если загрузка карточек закончена, то выключи прелоадер
      })
  }, []);

  useEffect(() => {
    handleRequest();
    // console.log("INPUT", debounceSearchQuery);
  }, [debounceSearchQuery]);  

  const handleFormSubmit = (inputText) => {
   /*  e.preventDefault(); */
    // setIsLoading(true);
    navigate('/');
    setSearchQuery(inputText);
    handleRequest( );
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

  const handleProductLike = useCallback ((product) => {
    const liked = isLiked(product.likes, currentUser._id);
    return api.changeLikeProduct(product._id, liked)
      .then((updateCard)=>{
        const newProducts = cards.map(cardState => {
         /*  console.log("Карточка из стейта", cardState);
          console.log("Карточка с сервера", newCard); */
          return cardState._id === updateCard._id ? updateCard : cardState 
        })
        setCards(newProducts);

        return updateCard;
      })
  }, [currentUser]  )

  const toggleTheme = () => {
    theme === themes.dark ? setTheme(themes.light) : setTheme(themes.dark);
  }

  return (
    <ThemeContext.Provider value={{theme:themes.light, toggleTheme}}>
      <UserContext.Provider value={{user:currentUser}}>
        <CardContext.Provider value={{cards, handleLike:handleproductLike}}>
          <Header /* user={currentUser} onUpdateUser={handleUpadateUser} */>
            <>
              <Logo className="logo logo_header" href="/" />
              <Routes>
                <Route path='/' element={
                  <Search 
                    onSubmit={handleFormSubmit} 
                    onInput={handleInputChange}
                  />
                }/>
              </Routes>
            </>
          </Header>
          <main className='content wrapper container cards-container' style ={{backgroundColor:theme.background}}>

          {/* <Button type="primary">Купить</Button>
          <Button type="secondary">Подробнее</Button> */}
            
          <Searchinfo searchCount={cards.length} searchText={searchQuery}/>

          <Routes>
            <Route index element={
              <CatalogPage 
                isLoading={isLoading} 
              />
            }/>
            <Route path='/product/:productId' element={
              <ProductPage
              //currentUser={currentUser}
              isLoading={isLoading}
              />
            }/>
            <Route path='*' element={NotFoundPage}/>
          </Routes>
          </main>
        </CardContext.Provider>
        <Footer/>
      </UserContext.Provider>
    </ThemeContext.Provider>
   
  )
}

export default App;