import React from "react";
import Card from "../Card/index.jsx"
import "./style.css";


const CardList = ({ goods, onProductLike, currentUser  }) => {
  return (
    <div className="cards">
      {goods.map((item, index) => (
        <Card key={item._id} {...item} onProductLike={onProductLike} currentUser={currentUser}/>
      ))}
    </div>
  );
};

export default CardList;