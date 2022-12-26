import React, { useContext } from "react";
import { useNavigate } from 'react-router-dom';
import Card from "../Card/index";
import { CardContext } from '../../Context/cardContext';
import { UserContext } from '../../Context/userContext';
import { NotFound } from '../NotFound/NotFound';

import "./style.css";
 
 

const CardList = ({cards}) => {
const navigate = useNavigate();
 const user = useContext(UserContext)
 
  return (
    <>
			{!cards.length && !user?.isLoading && <NotFound buttonText='Назад' title="По вашему запросу ничего не найдено" buttonAction={()=>navigate(-1)}/>}
			<div className='cards'> 
				{cards.map((item, index) => <Card key={item._id} {...item}/>)}
			</div>
		</>
		
  );
};

export default CardList;