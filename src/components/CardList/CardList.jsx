import React, { useContext } from "react";
import Card from "../Card/index.jsx";
import "./style.css";
 import { CardContext } from "../../Context/cardContext";
 import { useNavigate } from 'react-router-dom';
import { NotFound } from "../NotFound/NotFound.jsx";
import { UserContext } from "../../Context/newContext.js";


const CardList = () => {
  const navigate = useNavigate();
  const {isLoading} = useContext(UserContext);
  const {cards} = useContext(CardContext);
  return (
    <>
			{!cards.length && !isLoading && <NotFound buttonText='Назад' title="Ничего не найдено" buttonAction={()=>navigate(-1)}/>}
			<div className='cards'>
				{
					cards.map( (item, index) => <Card key={item._id} {...item}/>)
				}
			</div>
		</>
		
  );
};

export default CardList;