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
import { CatalogPage } from "./pages/CatalogPage/CatalogPage";
import { ProductPage } from "./pages/ProductPage";
import { Link, Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { UserContext } from "./Context/newContext";
import { CardContext } from "./Context/cardContext";
import { themes, ThemeContext } from './Context/themeContext'
import {NotFoundPage} from './pages/NotFoundPage/NotFoundPage'
import { FaqPage } from "./pages/FaqPage/FaqPage"; 
import { FavoritePage } from "./pages/FavoritePage/FavoritePage";
import Form from './components/Form/Form';
import RegistrationForm from './components/Form/RegistrationForm';
import Modal from './components/Modal/Modal';

function App() {
  const [cards, setCards] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading]= useState(true);
  const debounceSearchQuery = useDebounce(searchQuery, 200);
  const [theme, setTheme] = useState(themes.light);
  
  const[favorites, setFavorites] = useState([]);
  const [isOpenModalForm, setIsOpenModalForm] = useState(false)

  const location = useLocation()
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

  

  return (
      <UserContext.Provider value={{user:currentUser, isLoading}}>
         <CardContext.Provider value={{cards, favorites, handleLike: handleProductLike}}>
          <RegistrationForm/>
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
            
          <Searchinfo  searchText={searchQuery}/>

          <Routes location={(backgroundLocation && {...backgroundLocation, pathname: initialPath}) || location}>
            <Route index element={
              <CatalogPage />
            }/>
            <Route path='/product/:productId' element={
              <ProductPage
              //currentUser={currentUser}
              isLoading={isLoading}
              />
            }/>
            <Route path='/faq' element = {<FaqPage/>}/>
            <Route path='/favorites' element ={
              <FavoritePage  />}/>
            <Route path='/login' element={
                <>
                  Авторизация
                  <Link to='/register'>Зарегистрироваться</Link>
                </>
              }/>
              <Route path='/register' element={
                <Modal>
                  Регистрация
                  <Link to='/login'>Войти</Link>
                </Modal>
              }/>
            <Route path='*' element={<NotFoundPage />}/>
          </Routes>
          
          {backgroundLocation && (
              <Routes>
                 <Route path='/login' element={
                <Modal>
                  Авторизация
                  <Link to='/register' replace={true} state={{backgroundLocation: location, initialPath}}>Зарегистрироваться</Link>
                </Modal>
              }/>

              <Route path='/register' element={
                <Modal>
                  Регистрация
                  <Link to='/login' replace={true} state={{backgroundLocation: location, initialPath}}>Войти</Link>
                </Modal>
              }/>
              </Routes>
            )}
          </main>
           <Footer />
        </CardContext.Provider>
     
      </UserContext.Provider>
   
  )
}

export default App;