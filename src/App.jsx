import React, { useEffect, useState, useCallback } from "react";
 import CardList from "./components/CardList/CardList"; 
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
import { CatalogPage } from "./pages/CatalogPage/CatalogPage";
import { ProductPage } from "./pages/ProductPage";
import { Link, Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { UserContext } from "./Context/userContext";
import { CardContext } from "./Context/cardContext";
import { themes, ThemeContext } from './Context/themeContext'
import {NotFoundPage} from './pages/NotFoundPage/NotFoundPage'
import { FaqPage } from "./pages/FaqPage/FaqPage"; 
import { FavoritePage } from "./pages/FavoritePage/FavoritePage";
import Form from './components/Form/Form';
import RegistrationForm from './components/Form/RegistrationForm';
import Modal from './components/Modal/Modal';
import { FromModal } from './components/FormModal/FormModal';
import { Register } from './components/Register/Register';
import { Login } from './components/Login/Login';
import { ResetPassword } from './components/ResetPassword/ResetPassword';

function App() {
  const [cards, setCards] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading]= useState(true);
  const debounceSearchQuery = useDebounce(searchQuery, 200);
  const [theme, setTheme] = useState(themes.light);
  
  const[favorites, setFavorites] = useState([]);
  const [currentSort, setCurrentSort] = useState("");
  const [isOpenModalForm, setIsOpenModalForm] = useState(false);

  const location = useLocation();
  const backgroundLocation = location.state?.backgroundLocation;
  const initialPath = location.state?.initialPath;
  console.log('initialPath', initialPath);
  const navigate = useNavigate();
  const handleRequest = useCallback(() => { 
    setIsLoading (true); // при поиске загружаем прелоадер
    api
      .search(searchQuery)
      .then((searchResult) => {
        setCards(searchResult);
      })
      .catch(err => console.log(err))
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
        const favoriteProduct = productsData.filter(item =>isLiked(item.likes, userData._id));
        setFavorites(prevSate => favoriteProduct)
      })
      .catch(err => console.log(err))
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
          return cardState._id === updateCard._id ? updateCard : cardState 
        })

        if (!liked){
          setFavorites(prevState =>[...prevState, updateCard])
        } else {
          setFavorites(prevState =>prevState.filter(card => card._id !== updateCard._id))
        }

        setCards(newProducts);

        return updateCard;
      })
  }, [currentUser, cards]  )

  const sortedData = (currentSort) => {
    console.log(currentSort);
    switch (currentSort) {
      case 'low': setCards(cards.sort((a, b) => b.price - a.price)); break;
      case 'cheap': setCards(cards.sort((a, b) => a.price - b.price)); break;
      case 'sale': setCards(cards.sort((a, b) => b.discount - a.discount)); break;
      default: setCards(cards.sort((a, b) => a.price - b.price));
    }
  }

  return (
      <UserContext.Provider value={{user:currentUser, isLoading}}>
         <CardContext.Provider value={{cards, favorites, handleLike: handleProductLike, onSortData: sortedData, setCurrentSort }}>
          {/* <RegistrationForm/> */}
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
          <main className='content container cards-container' style ={{backgroundColor:theme.background}}>

          {/* <Button type="primary">Купить</Button>
          <Button type="secondary">Подробнее</Button> */}
            
          <Searchinfo  searchText={searchQuery}/>

          <Routes location={(backgroundLocation && {...backgroundLocation, pathname: initialPath}) || location}>
            <Route index element={
              <CatalogPage />
            }/>
            <Route path='/product/:productId' element={
              <ProductPage isLoading={isLoading}/>
            }/>
            <Route path='/faq' element = {<FaqPage/>}/>
            <Route path='/favorites' element ={
              <FavoritePage/>}/>
            <Route path='/login' element={
                <Login />
              }/>
              <Route path='/register' element={
                <Register />
              }/>
              <Route path='/reset-password' element={
              <ResetPassword />
            } />
            <Route path='*' element={<NotFoundPage />}/>
          </Routes>
          
          {backgroundLocation && (
              <Routes>
                 <Route path='/login' element={
                <Modal>
                   <Login />
                </Modal>
              }/>

              <Route path='/register' element={
                <Modal>
                  <Register />
                </Modal>
              }/>
              
              <Route path='/reset-password' element={
                <Modal>
                  <ResetPassword />
                </Modal>
              } />

            </Routes>

            )}
          </main>
           <Footer />
        </CardContext.Provider>
     
      </UserContext.Provider>
   
  )
}

export default App;